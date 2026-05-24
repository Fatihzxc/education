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

import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheHandler(SimpleHTTPRequestHandler):
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
