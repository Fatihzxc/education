# iktisat-kb — MCP Server

Local Model Context Protocol server that indexes PDF research sources under `iktisat/sources/` and exposes them as searchable tools to Claude. Mirrors the `datasheet-kb` pattern from the user's existing `.mcp.json`.

## Workflow

1. Drop PDFs into `iktisat/sources/primary/` or `iktisat/sources/secondary/`
2. Edit `data/catalog.json` to register them (or future feature: auto-detect)
3. Call `reindex_sources(force=true, semantic=true)` from Claude → extracts text + builds SQLite FTS5 + passage index
4. Claude can now call `search_sources("ticaret dengesi")`, `semantic_search(...)`, or `verify_claim(...)`

## Install

```bash
cd iktisat/kb-mcp
pip install -e .
```

Optional semantic verification (sentence-transformers + faiss):
```bash
pip install -e ".[semantic]"
```

If `sentence-transformers` is not installed, `semantic_search` still works with
a deterministic lexical-cosine fallback over passage chunks. Install the
semantic extras for neural multilingual embeddings.

## Run (manual test)

**stdio mode** (for Claude CLI as MCP server):
```bash
python -m src.server
# Or: iktisat-kb
```

**HTTP bridge mode** (for browser playground at deep-dive "Kaynakta ara"):
```bash
python -m src.http_bridge          # default: 127.0.0.1:8766
python -m src.http_bridge --port 9000 --quiet
# Test:
curl http://127.0.0.1:8766/health
curl -X POST http://127.0.0.1:8766/tools/search_sources \
     -H 'Content-Type: application/json' \
     -d '{"query":"vergi"}'
```

The HTTP bridge wraps the same `tool_*` functions as the MCP server but
serves them over HTTP with permissive CORS (local dev only). Endpoints:
- `GET /health`
- `GET /tools/list_sources`
- `POST /tools/reindex_sources` `{force?:bool, auto_add?:bool, semantic?:bool}`
- `POST /tools/search_sources` `{query, source_ids?, top_k?}`
- `POST /tools/semantic_search` `{query, source_ids?, top_k?}`
- `GET /tools/get_excerpt?source_id=X&page=N&context_pages=0`
- `POST /tools/verify_claim` `{claim, source_ids?, top_k?}`
- `POST /tools/format_citation` `{source_id, style?, page?}`

## Adding new PDFs (auto-discovery)

1. Drop PDF into `iktisat/sources/primary/` or `iktisat/sources/secondary/`
2. Call `reindex_sources` with `auto_add=true`:
   ```bash
   curl -X POST http://127.0.0.1:8766/tools/reindex_sources \
        -H 'Content-Type: application/json' \
        -d '{"auto_add": true}'
   ```
   Or in Claude: invoke `reindex_sources` MCP tool with `auto_add: true`
3. Edit `data/catalog.json` to enrich the auto-added entries — set proper
   `author`, `year`, `language`, `translator`, etc. (auto-discovery uses
   filename as title and leaves metadata null with `_auto_added: true`).
4. Content fragments can now reference the new source IDs in their
   `sourceRefs` arrays.

## Register with Claude CLI

Add to `.mcp.json`:

```json
{
  "mcpServers": {
    "iktisat-kb": {
      "command": "python",
      "args": ["-m", "src.server"],
      "cwd": "/Users/fatihoner/learn/iktisat/kb-mcp"
    }
  }
}
```

## Tools

| Tool | Description |
|---|---|
| `list_sources` | List all cataloged sources + indexed status |
| `reindex_sources` | (Re)index all PDFs in `iktisat/sources/` |
| `search_sources` | BM25 full-text search across indexed sources |
| `semantic_search` | Passage-level semantic search; sentence-transformers if installed, lexical-cosine fallback otherwise |
| `get_excerpt` | Fetch a specific page (+ surrounding pages) from a source |
| `format_citation` | Chicago/APA/MLA citation formatter |
| `verify_claim` | Hybrid BM25 + semantic evidence finder with verdict/confidence |

## Storage

- `data/catalog.json` — source metadata (you edit this)
- `data/index.db` — SQLite FTS5 full-text + passage index (auto-built by reindex)

## Turkish Support

GLM's `turkish_normalizer.py` (B7) is auto-loaded if present:
- Accent folding (Türkçe diacritics)
- Turkish-aware lowercase (İ→i, I→ı)
- Indexer normalizes text before FTS5 insert, so Turkish queries hit
  diacritic-insensitive matches

## TODO (out of scope for MVP)

- OCR for image-only PDFs (Tesseract)
- Multi-language tokenization variants
- Excerpt highlighting in returned snippets
