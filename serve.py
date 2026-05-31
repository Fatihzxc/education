#!/usr/bin/env python3
"""serve.py — Cache-disabled HTTP server for local development.

Plain `python3 -m http.server` serves with no Cache-Control header, so Chrome
treats every asset as cacheable. After editing JS/CSS, a normal reload (Cmd+R)
still uses the old cached file. This wrapper sends `Cache-Control: no-store`
on every response so every reload pulls fresh from disk.

Usage:
    python3 serve.py [PORT]      # default port 8772
"""
from __future__ import annotations

import json
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


ANNOTATIONS_SCHEMA = "iktisat.annotations.v1"
ANNOTATIONS_PATH = Path("notes") / "annotations.json"


def annotations_response(root: Path) -> dict:
    path = root / ANNOTATIONS_PATH
    if not path.exists():
        return {"schema": ANNOTATIONS_SCHEMA, "annotations": []}
    try:
        payload = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return {"schema": ANNOTATIONS_SCHEMA, "annotations": []}
    if isinstance(payload, list):
        return {"schema": ANNOTATIONS_SCHEMA, "annotations": payload}
    if not isinstance(payload, dict):
        return {"schema": ANNOTATIONS_SCHEMA, "annotations": []}
    annotations = payload.get("annotations")
    return {
        "schema": str(payload.get("schema") or ANNOTATIONS_SCHEMA),
        "updatedAt": payload.get("updatedAt"),
        "annotations": annotations if isinstance(annotations, list) else [],
    }


def write_annotations_payload(root: Path, payload: object) -> dict:
    if isinstance(payload, list):
        annotations = payload
    elif isinstance(payload, dict) and isinstance(payload.get("annotations"), list):
        annotations = payload["annotations"]
    else:
        raise ValueError("expected JSON object with annotations array")

    out = {
        "schema": ANNOTATIONS_SCHEMA,
        "updatedAt": payload.get("updatedAt") if isinstance(payload, dict) else None,
        "annotations": annotations,
    }
    path = root / ANNOTATIONS_PATH
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp_path = path.with_suffix(".json.tmp")
    tmp_path.write_text(json.dumps(out, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    tmp_path.replace(path)
    return {"ok": True, "count": len(annotations), "path": str(ANNOTATIONS_PATH)}


class NoCacheHandler(SimpleHTTPRequestHandler):
    def _repo_root(self) -> Path:
        return Path.cwd()

    def _send_json(self, status: int, payload: object):
        raw = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(raw)))
        self.end_headers()
        self.wfile.write(raw)

    def do_GET(self):
        if self.path.split("?", 1)[0] == "/api/annotations":
            self._send_json(200, annotations_response(self._repo_root()))
            return
        super().do_GET()

    def do_POST(self):
        if self.path.split("?", 1)[0] != "/api/annotations":
            self.send_error(404)
            return
        try:
            length = int(self.headers.get("Content-Length") or "0")
        except ValueError:
            self._send_json(400, {"ok": False, "error": "invalid content length"})
            return
        if length > 2_000_000:
            self._send_json(413, {"ok": False, "error": "payload too large"})
            return
        try:
            payload = json.loads(self.rfile.read(length).decode("utf-8") or "{}")
            result = write_annotations_payload(self._repo_root(), payload)
        except (UnicodeDecodeError, json.JSONDecodeError, ValueError) as exc:
            self._send_json(400, {"ok": False, "error": str(exc)})
            return
        except OSError as exc:
            self._send_json(500, {"ok": False, "error": str(exc)})
            return
        self._send_json(200, result)

    def end_headers(self):
        # Aggressive no-cache: ensures every reload pulls fresh from disk.
        # Required because the old playground.html and book.html share many
        # script files; without this, edits to deep-dive.js / reindex-panel.js
        # require a hard reload (Cmd+Shift+R) to take effect.
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, fmt, *args):
        # Quieter than the default; still useful for debugging
        sys.stderr.write("[serve] %s\n" % (fmt % args))


def main():
    port = 8772
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print(f"Usage: python3 serve.py [PORT]   (got: {sys.argv[1]!r})", file=sys.stderr)
            sys.exit(2)

    handler = partial(NoCacheHandler)
    httpd = ThreadingHTTPServer(("127.0.0.1", port), handler)
    print(f"[serve] http://127.0.0.1:{port} (no-cache, threaded)")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[serve] shutting down")
        httpd.shutdown()


if __name__ == "__main__":
    main()
