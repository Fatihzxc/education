"""
iktisat-kb MCP server.

Tools exposed:
  - list_sources       - list cataloged sources + indexed status
  - reindex_sources    - extract PDF text, build FTS5 and passage indexes
  - search_sources     - BM25 full-text search across indexed pages
  - semantic_search    - passage-level semantic search, neural if installed
  - get_excerpt        - fetch a specific page range from a source
  - format_citation    - Chicago/APA/MLA citation formatter
  - verify_claim       - hybrid BM25 + semantic evidence finder

Generated storage:
  - data/index.db      - SQLite FTS5 pages + passage index
"""
from __future__ import annotations

import json
import math
import os
import re
import sqlite3
import sys
from collections import Counter
from contextlib import contextmanager
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import fcntl

try:
    from mcp.server import Server
    from mcp.server.stdio import stdio_server
    import mcp.types as types
except ImportError:
    print("ERROR: mcp package not installed. Run: pip install mcp", file=sys.stderr)
    sys.exit(1)

try:
    from pypdf import PdfReader
    HAS_PYPDF = True
except ImportError:
    HAS_PYPDF = False

try:
    from sentence_transformers import SentenceTransformer
    HAS_SENTENCE_TRANSFORMERS = True
except Exception:
    SentenceTransformer = None  # type: ignore[assignment]
    HAS_SENTENCE_TRANSFORMERS = False

try:
    from .turkish_normalizer import normalize as tr_normalize
except ImportError:
    try:
        from turkish_normalizer import normalize as tr_normalize
    except ImportError:
        def tr_normalize(s: str) -> str:
            return s.lower()


ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "data"
DATA_DIR.mkdir(exist_ok=True)
SOURCES_DIR = ROOT.parent / "sources"
CATALOG_PATH = DATA_DIR / "catalog.json"
DB_PATH = DATA_DIR / "index.db"
REINDEX_LOCK_PATH = DATA_DIR / "reindex.lock"
PROGRESS_PATH = DATA_DIR / "progress.json"

SEMANTIC_MODEL_NAME = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
MAX_PASSAGE_CHARS = 1200
PASSAGE_OVERLAP_CHARS = 180
SUPPORTED_SOURCE_SUFFIXES = {".pdf", ".txt", ".md"}

_EMBEDDER: Any | None = None


# -----------------------------------------------------------------------------
# Catalog
# -----------------------------------------------------------------------------
def load_catalog() -> dict:
    if not CATALOG_PATH.exists():
        return {"_schema_version": "1.0", "sources": []}
    return json.loads(CATALOG_PATH.read_text(encoding="utf-8"))


def save_catalog(cat: dict) -> None:
    CATALOG_PATH.write_text(json.dumps(cat, ensure_ascii=False, indent=2), encoding="utf-8")


def source_lookup() -> dict[str, dict]:
    return {s["id"]: s for s in load_catalog().get("sources", [])}


def _slugify_filename(name: str) -> str:
    base = name.rsplit(".", 1)[0].lower()
    tr = str.maketrans({
        "ı": "i", "İ": "i", "ş": "s", "Ş": "s", "ç": "c", "Ç": "c",
        "ğ": "g", "Ğ": "g", "ü": "u", "Ü": "u", "ö": "o", "Ö": "o",
    })
    base = base.translate(tr)
    base = re.sub(r"[^\w\s-]", "", base)
    base = re.sub(r"[\s_]+", "-", base.strip())
    return re.sub(r"-+", "-", base).strip("-") or "source"


def _auto_discover_sources(cat: dict) -> list[dict]:
    known_files = {s["filename"] for s in cat.get("sources", [])}
    known_ids = {s["id"] for s in cat.get("sources", [])}
    discovered = []

    for kind in ("primary", "secondary"):
        dir_ = SOURCES_DIR / kind
        if not dir_.exists():
            continue
        sources = [p for p in dir_.iterdir() if p.is_file() and p.suffix.lower() in SUPPORTED_SOURCE_SUFFIXES]
        for source in sorted(sources):
            rel = f"{kind}/{source.name}"
            if rel in known_files:
                continue
            sid = _slugify_filename(source.name)
            base_sid = sid
            n = 1
            while sid in known_ids:
                n += 1
                sid = f"{base_sid}-{n}"
            entry = {
                "id": sid,
                "title": source.stem,
                "author": None,
                "year": None,
                "language": None,
                "type": kind,
                "filename": rel,
                "pages": None,
                "tags": [],
                "indexed": False,
                "indexedAt": None,
                "_auto_added": True,
            }
            cat.setdefault("sources", []).append(entry)
            known_files.add(rel)
            known_ids.add(sid)
            discovered.append(entry)

    return discovered


def _write_progress(status: str, current: int, total: int,
                    current_source: str = "", passages: int = 0,
                    failed: int = 0, semantic: bool = False) -> None:
    try:
        progress = {
            "status": status,
            "current": current,
            "total": total,
            "currentSource": current_source,
            "passagesIndexed": passages,
            "failed": failed,
            "semantic": semantic,
            "percent": round(current / total * 100, 1) if total > 0 else 0,
            "updatedAt": datetime.now(timezone.utc).isoformat(),
        }
        PROGRESS_PATH.write_text(json.dumps(progress, ensure_ascii=False), encoding="utf-8")
    except Exception:
        pass


def _clear_progress() -> None:
    try:
        if PROGRESS_PATH.exists():
            PROGRESS_PATH.unlink()
    except Exception:
        pass


# -----------------------------------------------------------------------------
# SQLite index
# -----------------------------------------------------------------------------
def db() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH, timeout=30)
    # WAL mode: readers don't block writers; rolled-back writes don't leave
    # the DB stuck behind a journal file. Set once per connection (cheap).
    conn.execute("PRAGMA journal_mode = WAL")
    conn.execute("PRAGMA busy_timeout = 30000")
    conn.execute("PRAGMA synchronous = NORMAL")  # safe with WAL, much faster
    conn.row_factory = sqlite3.Row
    return conn


@contextmanager
def db_conn():
    """Context manager that BOTH commits/rollbacks AND closes the connection.
    `with conn:` alone only handles transactions; the connection itself
    persists and on heavy traffic accumulates as a leak. This wrapper closes
    cleanly even on exception.
    """
    conn = db()
    try:
        with conn:
            yield conn
    finally:
        conn.close()


@contextmanager
def _exclusive_reindex_lock():
    with REINDEX_LOCK_PATH.open("w", encoding="utf-8") as lock:
        try:
            fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError as exc:
            raise RuntimeError("reindex already running; wait for the active reindex to finish") from exc
        lock.seek(0)
        lock.truncate()
        lock.write(f"pid={os.getpid()}\n")
        lock.flush()
        try:
            yield
        finally:
            fcntl.flock(lock, fcntl.LOCK_UN)


def init_db() -> None:
    with db_conn() as conn:
        conn.executescript("""
            CREATE TABLE IF NOT EXISTS pages (
                source_id TEXT NOT NULL,
                page INTEGER NOT NULL,
                text TEXT NOT NULL,
                PRIMARY KEY (source_id, page)
            );
            CREATE VIRTUAL TABLE IF NOT EXISTS pages_fts USING fts5(
                source_id UNINDEXED,
                page UNINDEXED,
                text,
                tokenize = 'unicode61 remove_diacritics 2'
            );
            CREATE TABLE IF NOT EXISTS passages (
                source_id TEXT NOT NULL,
                page INTEGER NOT NULL,
                chunk INTEGER NOT NULL,
                text TEXT NOT NULL,
                normalized_text TEXT NOT NULL,
                embedding_json TEXT,
                PRIMARY KEY (source_id, page, chunk)
            );
            CREATE INDEX IF NOT EXISTS idx_passages_source ON passages(source_id);
        """)


def extract_pdf_pages(pdf_path: Path) -> list[str]:
    if not HAS_PYPDF:
        raise RuntimeError("pypdf not installed; cannot extract PDFs")
    reader = PdfReader(str(pdf_path))
    return [(p.extract_text() or "") for p in reader.pages]


def extract_text_pages(text_path: Path) -> list[str]:
    text = text_path.read_text(encoding="utf-8", errors="replace")
    pages = [p.strip() for p in text.split("\f")]
    if len(pages) > 1:
        return pages

    clean = re.sub(r"\n{3,}", "\n\n", text).strip()
    if not clean:
        return []

    chunks = []
    start = 0
    max_chars = 5000
    overlap = 250
    while start < len(clean):
        end = min(len(clean), start + max_chars)
        if end < len(clean):
            split = max(clean.rfind("\n\n", start, end), clean.rfind(". ", start, end))
            if split > start + max_chars // 2:
                end = split + 1
        chunk = clean[start:end].strip()
        if chunk:
            chunks.append(chunk)
        if end >= len(clean):
            break
        start = max(0, end - overlap)
    return chunks


def extract_source_pages(src: dict) -> tuple[list[str], Path]:
    sidecar = src.get("textFilename") or src.get("ocrTextFilename")
    if sidecar:
        text_path = SOURCES_DIR / sidecar
        if not text_path.exists():
            raise FileNotFoundError(f"text sidecar not found: {text_path}")
        return extract_text_pages(text_path), text_path

    source_path = SOURCES_DIR / src["filename"]
    if not source_path.exists():
        raise FileNotFoundError(f"file not found: {source_path}")
    suffix = source_path.suffix.lower()
    if suffix == ".pdf":
        return extract_pdf_pages(source_path), source_path
    if suffix in {".txt", ".md"}:
        return extract_text_pages(source_path), source_path
    raise RuntimeError(f"unsupported source file type: {source_path.suffix}")


def _chunk_text(text: str, max_chars: int = MAX_PASSAGE_CHARS, overlap: int = PASSAGE_OVERLAP_CHARS) -> list[str]:
    text = re.sub(r"\s+", " ", text).strip()
    if not text:
        return []
    if len(text) <= max_chars:
        return [text]

    chunks = []
    start = 0
    while start < len(text):
        end = min(len(text), start + max_chars)
        if end < len(text):
            split = max(text.rfind(". ", start, end), text.rfind("; ", start, end), text.rfind(" ", start, end))
            if split > start + max_chars // 2:
                end = split + 1
        chunk = text[start:end].strip()
        if chunk:
            chunks.append(chunk)
        if end >= len(text):
            break
        start = max(0, end - overlap)
    return chunks


def _load_embedder() -> Any | None:
    global _EMBEDDER
    if _EMBEDDER is not None:
        return _EMBEDDER
    if not HAS_SENTENCE_TRANSFORMERS or SentenceTransformer is None:
        return None
    try:
        _EMBEDDER = SentenceTransformer(SEMANTIC_MODEL_NAME, local_files_only=True)
    except Exception:
        _EMBEDDER = SentenceTransformer(SEMANTIC_MODEL_NAME)
    return _EMBEDDER


def _embed_texts(texts: list[str]) -> list[list[float]] | None:
    model = _load_embedder()
    if model is None:
        return None
    vectors = model.encode(texts, normalize_embeddings=True, show_progress_bar=False)
    return [[float(x) for x in row] for row in vectors]


def _cosine(a: list[float], b: list[float]) -> float:
    if not a or not b:
        return 0.0
    return sum(x * y for x, y in zip(a, b))


_STOPWORDS = {
    "the", "and", "that", "this", "with", "from", "for", "are", "was", "were",
    "bir", "bu", "ile", "ve", "de", "da", "icin", "olan", "olarak", "daha",
    "of", "to", "in", "on", "as", "is", "it", "its", "be", "by",
}


def _token_counter(text: str) -> Counter[str]:
    tokens = re.findall(r"[a-zA-Z0-9ığüşöçİĞÜŞÖÇ]+", tr_normalize(text).lower())
    return Counter(t for t in tokens if len(t) > 2 and t not in _STOPWORDS)


def _counter_cosine(a: Counter[str], b: Counter[str]) -> float:
    if not a or not b:
        return 0.0
    dot = sum(a[k] * b.get(k, 0) for k in a)
    na = math.sqrt(sum(v * v for v in a.values()))
    nb = math.sqrt(sum(v * v for v in b.values()))
    if na == 0 or nb == 0:
        return 0.0
    return dot / (na * nb)


def _short_quote(text: str, max_words: int = 36) -> str:
    clean = re.sub(r"\s+", " ", text).strip()
    words = clean.split()
    if len(words) <= max_words:
        return clean
    return " ".join(words[:max_words]).rstrip(" ,.;:") + "..."


def _citation_for(source_id: str, page: int | None) -> str:
    result = tool_format_citation(source_id, "chicago", page)
    return result.get("citation", source_id)


def _insert_passages(conn: sqlite3.Connection, source_id: str, pages: list[str], semantic: bool) -> dict:
    conn.execute("DELETE FROM passages WHERE source_id=?", (source_id,))
    passage_rows: list[tuple[int, int, str, str]] = []
    for page, text in enumerate(pages, start=1):
        for chunk, passage in enumerate(_chunk_text(text), start=1):
            passage_rows.append((page, chunk, passage, tr_normalize(passage)))

    embeddings: list[list[float]] | None = None
    if semantic and passage_rows:
      embeddings = _embed_texts([row[2] for row in passage_rows])

    for idx, (page, chunk, passage, normalized) in enumerate(passage_rows):
        embedding_json = json.dumps(embeddings[idx]) if embeddings is not None else None
        conn.execute(
            "INSERT INTO passages (source_id, page, chunk, text, normalized_text, embedding_json) VALUES (?, ?, ?, ?, ?, ?)",
            (source_id, page, chunk, passage, normalized, embedding_json),
        )

    return {
        "passages": len(passage_rows),
        "semanticModel": SEMANTIC_MODEL_NAME if embeddings is not None else None,
        "semanticFallback": embeddings is None,
    }


# -----------------------------------------------------------------------------
# Tools
# -----------------------------------------------------------------------------
def tool_list_sources() -> dict:
    init_db()
    cat = load_catalog()
    with db_conn() as conn:
        indexed_ids = {
            row["source_id"]
            for row in conn.execute("SELECT DISTINCT source_id FROM pages")
        }
        passage_counts = {
            row["source_id"]: row["n"]
            for row in conn.execute("SELECT source_id, count(*) AS n FROM passages GROUP BY source_id")
        }
    return {
        "sources": [
            {
                "id": s["id"],
                "title": s.get("title"),
                "shortTitle": s.get("shortTitle"),
                "author": s.get("author"),
                "year": s.get("year"),
                "type": s.get("type"),
                "language": s.get("language"),
                "filename": s.get("filename"),
                "indexedPath": s.get("indexedPath"),
                "sourceUrl": s.get("sourceUrl"),
                "license": s.get("license"),
                "tags": s.get("tags", []),
                "indexed": s.get("indexed", False) and s["id"] in indexed_ids,
                "pages": s.get("pages"),
                "passages": passage_counts.get(s["id"], 0),
            }
            for s in cat.get("sources", [])
        ],
        "count": len(cat.get("sources", [])),
        "indexedCount": len(indexed_ids),
        "semanticAvailable": HAS_SENTENCE_TRANSFORMERS,
        "semanticModel": SEMANTIC_MODEL_NAME if HAS_SENTENCE_TRANSFORMERS else None,
    }


def tool_reindex_sources(force: bool = False, auto_add: bool = False, semantic: bool = False) -> dict:
    try:
        with _exclusive_reindex_lock():
            return _tool_reindex_sources(force=force, auto_add=auto_add, semantic=semantic)
    except RuntimeError as e:
        cat = load_catalog()
        return {
            "indexed": 0,
            "discovered": [],
            "failed": [{"id": "_reindex", "error": str(e)}],
            "total": len(cat.get("sources", [])),
            "semanticRequested": semantic,
            "semanticAvailable": HAS_SENTENCE_TRANSFORMERS,
            "semanticModel": SEMANTIC_MODEL_NAME if HAS_SENTENCE_TRANSFORMERS else None,
            "passageStats": {},
        }


def _tool_reindex_sources(force: bool = False, auto_add: bool = False, semantic: bool = False) -> dict:
    cat = load_catalog()
    init_db()
    now = datetime.now(timezone.utc).isoformat()
    indexed_n = 0
    failed = []
    passage_stats = {}
    total_passages = 0

    discovered = _auto_discover_sources(cat) if auto_add else []
    current_ids = {src["id"] for src in cat.get("sources", [])}
    sources_list = cat.get("sources", [])
    total_sources = len(sources_list)

    _write_progress("running", 0, total_sources, semantic=semantic)

    with db_conn() as conn:
        if force:
            placeholders = ",".join("?" * len(current_ids))
            if placeholders:
                conn.execute(f"DELETE FROM pages WHERE source_id NOT IN ({placeholders})", tuple(current_ids))
                conn.execute(f"DELETE FROM pages_fts WHERE source_id NOT IN ({placeholders})", tuple(current_ids))
                conn.execute(f"DELETE FROM passages WHERE source_id NOT IN ({placeholders})", tuple(current_ids))
        for i, src in enumerate(sources_list):
            _write_progress("running", i, total_sources,
                            current_source=src["id"],
                            passages=total_passages,
                            failed=len(failed),
                            semantic=semantic)
            source_path = SOURCES_DIR / src["filename"]
            if not source_path.exists():
                src["indexed"] = False
                failed.append({"id": src["id"], "error": f"file not found: {source_path}"})
                continue
            if src.get("indexed") and not force:
                continue

            try:
                pages, indexed_path = extract_source_pages(src)
                conn.execute("DELETE FROM pages WHERE source_id=?", (src["id"],))
                conn.execute("DELETE FROM pages_fts WHERE source_id=?", (src["id"],))
                nonempty_pages = 0
                for pidx, txt in enumerate(pages, start=1):
                    if not txt.strip():
                        continue
                    nonempty_pages += 1
                    conn.execute(
                        "INSERT INTO pages (source_id, page, text) VALUES (?, ?, ?)",
                        (src["id"], pidx, txt),
                    )
                    conn.execute(
                        "INSERT INTO pages_fts (source_id, page, text) VALUES (?, ?, ?)",
                        (src["id"], pidx, tr_normalize(txt)),
                    )
                if nonempty_pages == 0:
                    conn.execute("DELETE FROM passages WHERE source_id=?", (src["id"],))
                    src["pages"] = len(pages)
                    src["indexed"] = False
                    src["indexedAt"] = None
                    src["semanticIndexed"] = False
                    src["semanticModel"] = None
                    failed.append({"id": src["id"], "error": "no extractable text; OCR needed"})
                    continue
                passage_stats[src["id"]] = _insert_passages(conn, src["id"], pages, semantic)
                total_passages += passage_stats[src["id"]]["passages"]
                src["pages"] = len(pages)
                src["indexed"] = True
                src["indexedAt"] = now
                src["indexedPath"] = str(indexed_path.relative_to(SOURCES_DIR))
                src["semanticIndexed"] = bool(semantic)
                src["semanticModel"] = passage_stats[src["id"]]["semanticModel"]
                indexed_n += 1
            except Exception as e:
                src["indexed"] = False
                failed.append({"id": src["id"], "error": str(e)})
        conn.commit()

    _write_progress("completed", total_sources, total_sources,
                    passages=total_passages,
                    failed=len(failed),
                    semantic=semantic)
    save_catalog(cat)
    return {
        "indexed": indexed_n,
        "discovered": [s["id"] for s in discovered],
        "failed": failed,
        "total": len(cat.get("sources", [])),
        "semanticRequested": semantic,
        "semanticAvailable": HAS_SENTENCE_TRANSFORMERS,
        "semanticModel": SEMANTIC_MODEL_NAME if HAS_SENTENCE_TRANSFORMERS else None,
        "passageStats": passage_stats,
    }


def tool_search_sources(query: str, source_ids: list[str] | None = None, top_k: int = 5) -> dict:
    init_db()
    norm = tr_normalize(query)
    with db_conn() as conn:
        sql = """
            SELECT source_id, page, snippet(pages_fts, 2, '[', ']', '...', 30) AS excerpt,
                   bm25(pages_fts) AS score
            FROM pages_fts
            WHERE pages_fts MATCH ?
        """
        params: list[Any] = [norm]
        if source_ids:
            sql += " AND source_id IN ({})".format(",".join("?" * len(source_ids)))
            params.extend(source_ids)
        sql += " ORDER BY score LIMIT ?"
        params.append(top_k)
        try:
            rows = list(conn.execute(sql, params))
        except sqlite3.OperationalError as e:
            return {"hits": [], "error": str(e), "query": query}

    cat = source_lookup()
    return {
        "query": query,
        "method": "bm25",
        "hits": [
            {
                "sourceId": r["source_id"],
                "title": cat.get(r["source_id"], {}).get("title"),
                "author": cat.get(r["source_id"], {}).get("author"),
                "page": r["page"],
                "score": r["score"],
                "excerpt": r["excerpt"],
                "citation": _citation_for(r["source_id"], r["page"]),
            }
            for r in rows
        ],
    }


def tool_semantic_search(query: str, source_ids: list[str] | None = None, top_k: int = 5) -> dict:
    init_db()
    params: list[Any] = []
    sql = "SELECT source_id, page, chunk, text, embedding_json FROM passages"
    if source_ids:
        sql += " WHERE source_id IN ({})".format(",".join("?" * len(source_ids)))
        params.extend(source_ids)

    with db_conn() as conn:
        rows = list(conn.execute(sql, params))

    if not rows:
        return {"query": query, "method": "semantic", "hits": [], "error": "semantic passage index is empty; run reindex_sources(semantic=true)"}

    cat = source_lookup()
    scored = []
    query_embedding = _embed_texts([query])[0] if HAS_SENTENCE_TRANSFORMERS else None
    query_counter = _token_counter(query)
    used_neural = False

    for r in rows:
        score = 0.0
        method = "lexical-cosine"
        if query_embedding is not None and r["embedding_json"]:
            try:
                score = _cosine(query_embedding, json.loads(r["embedding_json"]))
                method = "sentence-transformer"
                used_neural = True
            except Exception:
                score = 0.0
        if score == 0.0:
            score = _counter_cosine(query_counter, _token_counter(r["text"]))
        if score > 0:
            scored.append((score, r, method))

    scored.sort(key=lambda item: item[0], reverse=True)
    hits = []
    for score, r, method in scored[:top_k]:
        hits.append({
            "sourceId": r["source_id"],
            "title": cat.get(r["source_id"], {}).get("title"),
            "author": cat.get(r["source_id"], {}).get("author"),
            "page": r["page"],
            "chunk": r["chunk"],
            "score": score,
            "method": method,
            "quote": _short_quote(r["text"]),
            "citation": _citation_for(r["source_id"], r["page"]),
        })

    return {
        "query": query,
        "method": "sentence-transformer" if used_neural else "lexical-cosine",
        "semanticAvailable": HAS_SENTENCE_TRANSFORMERS,
        "model": SEMANTIC_MODEL_NAME if used_neural else None,
        "hits": hits,
    }


def tool_get_excerpt(source_id: str, page: int, context_pages: int = 0) -> dict:
    with db_conn() as conn:
        rows = list(conn.execute(
            "SELECT page, text FROM pages WHERE source_id=? AND page BETWEEN ? AND ? ORDER BY page",
            (source_id, page - context_pages, page + context_pages),
        ))
    cat = source_lookup()
    return {
        "sourceId": source_id,
        "title": cat.get(source_id, {}).get("title"),
        "author": cat.get(source_id, {}).get("author"),
        "pages": [{"page": r["page"], "text": r["text"]} for r in rows],
    }


def tool_format_citation(source_id: str, style: str = "chicago", page: int | None = None) -> dict:
    s = source_lookup().get(source_id)
    if not s:
        return {"error": f"source not found: {source_id}"}

    author = s.get("author") or "Unknown"
    title = s.get("title") or source_id
    year = s.get("editionYear") or s.get("year") or "n.d."
    publisher = s.get("publisher") or ""
    page_str = f", p. {page}" if page else ""

    if style == "chicago":
        cit = f"{author}. *{title}*. {publisher + ', ' if publisher else ''}{year}{page_str}."
    elif style == "apa":
        cit = f"{author} ({year}). *{title}*. {publisher}.{page_str}"
    elif style == "mla":
        cit = f"{author}. *{title}*. {publisher + ', ' if publisher else ''}{year}.{page_str}"
    else:
        return {"error": f"unknown style: {style}"}

    return {"citation": cit, "style": style, "sourceId": source_id}


def tool_reindex_progress() -> dict:
    if not PROGRESS_PATH.exists():
        return {"status": "idle", "message": "No reindex in progress"}
    try:
        return json.loads(PROGRESS_PATH.read_text(encoding="utf-8"))
    except Exception:
        return {"status": "unknown", "message": "Could not read progress file"}


def tool_verify_claim(claim: str, top_k: int = 5, source_ids: list[str] | None = None) -> dict:
    bm25 = tool_search_sources(claim, source_ids=source_ids, top_k=top_k)
    semantic = tool_semantic_search(claim, source_ids=source_ids, top_k=top_k)

    evidence_by_key: dict[tuple[str, int], dict] = {}
    for rank, hit in enumerate(bm25.get("hits", []), start=1):
        key = (hit["sourceId"], hit["page"])
        evidence_by_key.setdefault(key, {
            "sourceId": hit["sourceId"],
            "page": hit["page"],
            "title": hit.get("title"),
            "author": hit.get("author"),
            "quote": hit.get("excerpt", ""),
            "citation": hit.get("citation"),
            "bm25Score": hit.get("score"),
            "bm25Rank": rank,
            "semanticScore": 0.0,
        })

    for hit in semantic.get("hits", []):
        key = (hit["sourceId"], hit["page"])
        item = evidence_by_key.setdefault(key, {
            "sourceId": hit["sourceId"],
            "page": hit["page"],
            "title": hit.get("title"),
            "author": hit.get("author"),
            "quote": hit.get("quote", ""),
            "citation": hit.get("citation"),
            "bm25Score": None,
            "bm25Rank": None,
            "semanticScore": 0.0,
        })
        item["semanticScore"] = max(float(item.get("semanticScore") or 0), float(hit.get("score") or 0))
        if not item.get("quote") or "[" in str(item["quote"]):
            item["quote"] = hit.get("quote", item.get("quote", ""))

    evidence = list(evidence_by_key.values())
    evidence.sort(key=lambda e: (e.get("semanticScore") or 0, -(e.get("bm25Rank") or 99)), reverse=True)
    evidence = evidence[:top_k]

    best_semantic = max([float(e.get("semanticScore") or 0) for e in evidence] or [0.0])
    has_bm25 = any(e.get("bm25Rank") for e in evidence)
    if best_semantic >= 0.28 or (has_bm25 and best_semantic >= 0.12):
        verdict = "supported"
    elif evidence:
        verdict = "weak"
    else:
        verdict = "no-evidence"
    confidence = min(0.95, round(max(best_semantic, 0.35 if has_bm25 else 0.0), 3))

    return {
        "claim": claim,
        "verdict": verdict,
        "confidence": confidence,
        "method": "hybrid-bm25-semantic",
        "semanticMethod": semantic.get("method"),
        "semanticAvailable": semantic.get("semanticAvailable", False),
        "evidence": evidence,
        "bm25Error": bm25.get("error"),
        "semanticError": semantic.get("error"),
    }


# -----------------------------------------------------------------------------
# MCP server registration
# -----------------------------------------------------------------------------
server = Server("iktisat-kb")


@server.list_tools()
async def list_tools() -> list[types.Tool]:
    return [
        types.Tool(name="list_sources", description="List all cataloged sources + indexed status.",
                   inputSchema={"type": "object", "properties": {}}),
        types.Tool(name="reindex_sources",
                   description="(Re)index PDFs. Set semantic=true to build passage embeddings or lexical passage index.",
                   inputSchema={"type": "object", "properties": {
                       "force": {"type": "boolean"},
                       "auto_add": {"type": "boolean"},
                       "semantic": {"type": "boolean"},
                   }}),
        types.Tool(name="search_sources",
                   description="BM25 full-text search across indexed pages.",
                   inputSchema={"type": "object", "required": ["query"],
                                "properties": {
                                    "query": {"type": "string"},
                                    "source_ids": {"type": "array", "items": {"type": "string"}},
                                    "top_k": {"type": "integer", "default": 5},
                                }}),
        types.Tool(name="semantic_search",
                   description="Passage-level semantic search. Uses sentence-transformers if installed, lexical cosine fallback otherwise.",
                   inputSchema={"type": "object", "required": ["query"],
                                "properties": {
                                    "query": {"type": "string"},
                                    "source_ids": {"type": "array", "items": {"type": "string"}},
                                    "top_k": {"type": "integer", "default": 5},
                                }}),
        types.Tool(name="get_excerpt",
                   description="Fetch a specific page and optional surrounding pages from an indexed source.",
                   inputSchema={"type": "object", "required": ["source_id", "page"],
                                "properties": {
                                    "source_id": {"type": "string"},
                                    "page": {"type": "integer"},
                                    "context_pages": {"type": "integer", "default": 0},
                                }}),
        types.Tool(name="format_citation",
                   description="Format a Chicago/APA/MLA citation for a cataloged source.",
                   inputSchema={"type": "object", "required": ["source_id"],
                                "properties": {
                                    "source_id": {"type": "string"},
                                    "style": {"type": "string", "enum": ["chicago", "apa", "mla"], "default": "chicago"},
                                    "page": {"type": "integer"},
                                }}),
        types.Tool(name="verify_claim",
                   description="Hybrid BM25 + semantic evidence finder for a claim.",
                   inputSchema={"type": "object", "required": ["claim"],
                                "properties": {
                                    "claim": {"type": "string"},
                                    "source_ids": {"type": "array", "items": {"type": "string"}},
                                    "top_k": {"type": "integer", "default": 5},
                                }}),
        types.Tool(name="reindex_progress",
                   description="Returns current reindex progress (percent, current source, passage count).",
                   inputSchema={"type": "object", "properties": {}}),
    ]


@server.call_tool()
async def call_tool(name: str, args: dict) -> list[types.TextContent]:
    tools = {
        "list_sources": lambda: tool_list_sources(),
        "reindex_sources": lambda: tool_reindex_sources(
            force=args.get("force", False),
            auto_add=args.get("auto_add", False),
            semantic=args.get("semantic", False),
        ),
        "search_sources": lambda: tool_search_sources(args["query"], args.get("source_ids"), args.get("top_k", 5)),
        "semantic_search": lambda: tool_semantic_search(args["query"], args.get("source_ids"), args.get("top_k", 5)),
        "get_excerpt": lambda: tool_get_excerpt(args["source_id"], args["page"], args.get("context_pages", 0)),
        "format_citation": lambda: tool_format_citation(args["source_id"], args.get("style", "chicago"), args.get("page")),
        "verify_claim": lambda: tool_verify_claim(args["claim"], args.get("top_k", 5), args.get("source_ids")),
        "reindex_progress": lambda: tool_reindex_progress(),
    }
    if name not in tools:
        return [types.TextContent(type="text", text=json.dumps({"error": f"unknown tool: {name}"}))]
    try:
        result = tools[name]()
    except Exception as e:
        result = {"error": str(e), "tool": name}
    return [types.TextContent(type="text", text=json.dumps(result, ensure_ascii=False, indent=2))]


async def _async_main() -> None:
    async with stdio_server() as (r, w):
        await server.run(r, w, server.create_initialization_options())


def main() -> None:
    import asyncio
    asyncio.run(_async_main())


if __name__ == "__main__":
    main()
