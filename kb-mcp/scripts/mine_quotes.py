#!/usr/bin/env python3
"""
mine_quotes.py — Mine one distinct verified quote per concept from the local
MCP-indexed PDF corpus. Output: quotes-mined.json consumed by
content-validation-overrides.js (J1 of Phase 3 improvement plan).

Strategy:
  1. Parse 73 concept entries from content-fragments/*.js (id + label).
  2. For each concept, call server.tool_semantic_search(label, top_k=5).
  3. Pick the highest-scored hit whose (sourceId, page) is not yet used
     by another concept (distinctness constraint relaxed if pool exhausted).
  4. Emit a JSON map: {conceptId: {source, page, quote, claim, score}}.
"""
from __future__ import annotations

import json
import re
import sys
import types
from pathlib import Path

# Stub out MCP since this script is a CLI tool, not an MCP server
for mod in ("mcp", "mcp.server", "mcp.server.stdio", "mcp.types"):
    sys.modules.setdefault(mod, types.ModuleType(mod))

class _StubServer:
    def __init__(self, *a, **k): pass
    def list_tools(self): return lambda f: f
    def call_tool(self): return lambda f: f

sys.modules["mcp.server"].Server = _StubServer
sys.modules["mcp.server.stdio"].stdio_server = lambda: None

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from src import server  # noqa: E402

FRAGMENTS_DIR = ROOT.parent / "merkantilizm" / "modules" / "content-fragments"
OUTPUT_PATH = FRAGMENTS_DIR / "quotes-mined.json"
OUTPUT_JS_PATH = FRAGMENTS_DIR / "quotes-mined.js"

# Concept entries appear in two formats:
#   { id: "foo", label: "Foo Bar", ... }   (JS object literal w/ bare keys)
#   { "id": "foo", "label": "Foo Bar", ... }  (JSON-style)
ID_RX = re.compile(r'(?:"id"|id)\s*:\s*["`\']([\w\-]+)["`\']')
LABEL_RX = re.compile(r'(?:"label"|label)\s*:\s*["`\']([^"\'`\n]+)["`\']')


def parse_concepts() -> list[tuple[str, str]]:
    """Return [(concept_id, label)] from all concept fragments (de-dup by id)."""
    seen: dict[str, str] = {}
    concept_files = sorted(
        f for f in FRAGMENTS_DIR.glob("*.js")
        if f.name.startswith("concepts-") or f.name == "satellite-concepts.js"
    )
    for f in concept_files:
        content = f.read_text(encoding="utf-8")
        # Walk paired id/label that appear close together (within ~300 chars)
        for m in ID_RX.finditer(content):
            cid = m.group(1)
            if cid in seen:
                continue
            # Find the label that follows this id within ~400 chars
            tail = content[m.end(): m.end() + 400]
            lm = LABEL_RX.search(tail)
            if lm:
                seen[cid] = lm.group(1)
    return list(seen.items())


def short_quote(text: str, max_words: int = 28) -> str:
    """Trim to a single readable sentence/clause."""
    clean = re.sub(r"\s+", " ", text or "").strip()
    # Drop FTS5 snippet markers like […, ]
    clean = clean.replace("[", "").replace("]", "").replace("…", "")
    words = clean.split()
    if len(words) > max_words:
        clean = " ".join(words[:max_words]).rstrip(",.;:") + "..."
    return clean


def mine_quote(concept_id: str, label: str, used_keys: set[tuple[str, int]],
               relaxed: bool = False) -> dict | None:
    """Call MCP semantic_search and pick the best distinct hit."""
    result = server.tool_semantic_search(label, top_k=8)
    hits = result.get("hits") or []
    if not hits:
        return None
    for hit in hits:
        key = (hit["sourceId"], hit["page"])
        if not relaxed and key in used_keys:
            continue
        quote = short_quote(hit.get("quote") or hit.get("excerpt") or "")
        if not quote:
            continue
        return {
            "source": hit["sourceId"],
            "page": hit["page"],
            "quote": quote,
            "score": round(float(hit.get("score") or 0.0), 4),
            "method": hit.get("method", "unknown"),
            "claim": f"Local semantic match for '{label}'.",
        }
    # If all distinct hits exhausted, allow re-use on second pass
    return None


def main() -> None:
    concepts = parse_concepts()
    print(f"Parsed {len(concepts)} concept entries from fragments")

    out: dict[str, dict] = {}
    used: set[tuple[str, int]] = set()
    pending: list[tuple[str, str]] = []

    # First pass: prefer distinct (source, page) keys
    for cid, label in concepts:
        ref = mine_quote(cid, label, used, relaxed=False)
        if ref:
            out[cid] = ref
            used.add((ref["source"], ref["page"]))
        else:
            pending.append((cid, label))

    # Second pass: relax distinctness for concepts that had no novel hit
    for cid, label in pending:
        ref = mine_quote(cid, label, used, relaxed=True)
        if ref:
            ref["_distinctRelaxed"] = True
            out[cid] = ref

    print(f"Mined: {len(out)} / {len(concepts)} concepts")
    print(f"Distinct (source, page) pairs: {len(used)}")
    missing = [cid for cid, _ in concepts if cid not in out]
    if missing:
        print(f"Missing ({len(missing)}): {missing[:10]}{'...' if len(missing) > 10 else ''}")

    payload = {
        "_generated": "mine_quotes.py",
        "_method": "semantic_search top-k=8, distinct (source,page)",
        "_conceptCount": len(out),
        "_distinctPages": len(used),
        "quotes": out,
    }
    OUTPUT_PATH.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"Wrote {OUTPUT_PATH} ({OUTPUT_PATH.stat().st_size} bytes)")

    # Also emit a self-registering JS wrapper so the playground can consume it
    # without fetch() (file:// CORS would otherwise block JSON loading).
    js_payload = json.dumps(out, ensure_ascii=False, indent=2)
    js_content = f"""// quotes-mined.js — auto-generated by kb-mcp/scripts/mine_quotes.py
// DO NOT EDIT BY HAND. Regenerate with: python -m scripts.mine_quotes
// Provides window._minedQuotes (conceptId → {{source, page, quote, claim, score}})
(function() {{
  'use strict';
  window._minedQuotes = {js_payload};
  console.log('[quotes-mined] loaded', Object.keys(window._minedQuotes).length, 'concept quotes');
}})();
"""
    OUTPUT_JS_PATH.write_text(js_content, encoding="utf-8")
    print(f"Wrote {OUTPUT_JS_PATH} ({OUTPUT_JS_PATH.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
