"""HTTP bridge for browser playground to call MCP tools.

Wraps the same tool_* functions from server.py over a minimal HTTP API
with CORS enabled so the file:// or localhost:8000 playground can fetch
search results directly.

Usage:
    python -m src.http_bridge [--port 8766]

Endpoints:
    GET  /health
    GET  /tools/list_sources
    POST /tools/search_sources   body: {"query": str, "source_ids"?: [str], "top_k"?: int}
    POST /tools/semantic_search  body: {"query": str, "source_ids"?: [str], "top_k"?: int}
    GET  /tools/get_excerpt?source_id=X&page=N&context_pages=0
    POST /tools/verify_claim     body: {"claim": str, "source_ids"?: [str], "top_k"?: int}
    POST /tools/format_citation  body: {"source_id": str, "style": "chicago", "page"?: int}

NOT for production — local dev convenience only. Single-threaded, no auth.
"""
from __future__ import annotations

import argparse
import json
import sys
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs

# Import tool functions from server.py (sibling module)
try:
    from . import server as srv
except ImportError:
    # Allow direct execution: python src/http_bridge.py
    import server as srv  # type: ignore


# Module-level state for async reindex jobs
_reindex_thread: threading.Thread | None = None
_reindex_result: dict | None = None
_reindex_lock = threading.Lock()


def _start_reindex_background(force: bool, auto_add: bool, semantic: bool) -> dict:
    """Kick off reindex in a background thread; return immediately with a
    started/already-running status. The caller can poll /tools/reindex_progress
    for live progress and check the result via the same endpoint when status
    becomes 'completed' or 'failed'.
    """
    global _reindex_thread, _reindex_result
    with _reindex_lock:
        if _reindex_thread is not None and _reindex_thread.is_alive():
            return {"status": "already_running", "message": "Reindex in progress; poll /tools/reindex_progress"}
        _reindex_result = None

        def _run():
            global _reindex_result
            try:
                _reindex_result = srv.tool_reindex_sources(
                    force=force, auto_add=auto_add, semantic=semantic
                )
            except Exception as e:
                _reindex_result = {"error": str(e), "failed": [{"id": "_async", "error": str(e)}]}

        _reindex_thread = threading.Thread(target=_run, name="reindex", daemon=True)
        _reindex_thread.start()
    return {"status": "started", "message": "Reindex started in background. Poll /tools/reindex_progress."}


def _get_reindex_progress_with_result() -> dict:
    """Return progress + final result if completed."""
    progress = srv.tool_reindex_progress()
    with _reindex_lock:
        if _reindex_result is not None:
            progress["result"] = _reindex_result
    return progress


def _json_response(handler: BaseHTTPRequestHandler, status: int, payload: dict | list) -> None:
    body = json.dumps(payload, ensure_ascii=False, indent=2).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Content-Length", str(len(body)))
    # Permissive CORS for local dev (any origin)
    handler.send_header("Access-Control-Allow-Origin", "*")
    handler.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    handler.send_header("Access-Control-Allow-Headers", "Content-Type")
    handler.end_headers()
    handler.wfile.write(body)


def _read_json_body(handler: BaseHTTPRequestHandler) -> dict:
    length = int(handler.headers.get("Content-Length", "0") or "0")
    if length == 0:
        return {}
    raw = handler.rfile.read(length)
    try:
        return json.loads(raw.decode("utf-8"))
    except json.JSONDecodeError:
        return {}


class BridgeHandler(BaseHTTPRequestHandler):
    # Reduce noise in test runs
    def log_message(self, format, *args):
        if "--quiet" not in sys.argv:
            super().log_message(format, *args)

    def do_OPTIONS(self):  # noqa: N802
        _json_response(self, 204, {})

    def do_GET(self):  # noqa: N802
        url = urlparse(self.path)
        path = url.path.rstrip("/")
        qs = parse_qs(url.query)

        try:
            if path == "/health":
                _json_response(self, 200, {"ok": True, "service": "iktisat-kb-bridge"})
            elif path == "/tools/list_sources":
                _json_response(self, 200, srv.tool_list_sources())
            elif path == "/tools/get_excerpt":
                source_id = qs.get("source_id", [None])[0]
                page = int(qs.get("page", ["0"])[0])
                ctx = int(qs.get("context_pages", ["0"])[0])
                if not source_id or not page:
                    _json_response(self, 400, {"error": "source_id and page required"})
                    return
                _json_response(self, 200, srv.tool_get_excerpt(source_id, page, ctx))
            elif path == "/tools/reindex_progress":
                _json_response(self, 200, _get_reindex_progress_with_result())
            else:
                _json_response(self, 404, {"error": f"unknown endpoint: {path}"})
        except Exception as e:
            _json_response(self, 500, {"error": str(e), "path": path})

    def do_POST(self):  # noqa: N802
        url = urlparse(self.path)
        path = url.path.rstrip("/")
        body = _read_json_body(self)

        try:
            if path == "/tools/reindex_sources":
                # Async by default — kick off in background, return 202.
                # Set body.async=false for synchronous (blocking) reindex.
                run_async = bool(body.get("async", True))
                if run_async:
                    _json_response(self, 202, _start_reindex_background(
                        force=bool(body.get("force", False)),
                        auto_add=bool(body.get("auto_add", False)),
                        semantic=bool(body.get("semantic", False))
                    ))
                else:
                    _json_response(self, 200, srv.tool_reindex_sources(
                        force=bool(body.get("force", False)),
                        auto_add=bool(body.get("auto_add", False)),
                        semantic=bool(body.get("semantic", False))
                    ))
            elif path == "/tools/search_sources":
                query = body.get("query", "")
                if not query:
                    _json_response(self, 400, {"error": "query required"})
                    return
                _json_response(self, 200, srv.tool_search_sources(
                    query=query,
                    source_ids=body.get("source_ids"),
                    top_k=int(body.get("top_k", 5))
                ))
            elif path == "/tools/semantic_search":
                query = body.get("query", "")
                if not query:
                    _json_response(self, 400, {"error": "query required"})
                    return
                _json_response(self, 200, srv.tool_semantic_search(
                    query=query,
                    source_ids=body.get("source_ids"),
                    top_k=int(body.get("top_k", 5))
                ))
            elif path == "/tools/verify_claim":
                claim = body.get("claim", "")
                if not claim:
                    _json_response(self, 400, {"error": "claim required"})
                    return
                _json_response(self, 200, srv.tool_verify_claim(
                    claim,
                    int(body.get("top_k", 5)),
                    body.get("source_ids")
                ))
            elif path == "/tools/format_citation":
                source_id = body.get("source_id")
                if not source_id:
                    _json_response(self, 400, {"error": "source_id required"})
                    return
                _json_response(self, 200, srv.tool_format_citation(
                    source_id,
                    body.get("style", "chicago"),
                    body.get("page")
                ))
            else:
                _json_response(self, 404, {"error": f"unknown endpoint: {path}"})
        except Exception as e:
            _json_response(self, 500, {"error": str(e), "path": path})


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8766)
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--quiet", action="store_true")
    args = parser.parse_args()

    httpd = ThreadingHTTPServer((args.host, args.port), BridgeHandler)
    print(f"[iktisat-kb-bridge] Listening on http://{args.host}:{args.port} (threaded)")
    print(f"  Try: curl http://{args.host}:{args.port}/health")
    print(f"  Try: curl -X POST http://{args.host}:{args.port}/tools/search_sources \\")
    print(f"         -H 'Content-Type: application/json' -d '{{\"query\":\"vergi\"}}'")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[iktisat-kb-bridge] Shutting down")
        httpd.shutdown()


if __name__ == "__main__":
    main()
