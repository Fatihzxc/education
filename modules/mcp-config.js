/**
 * mcp-config.js — Centralized MCP HTTP bridge configuration + fetch helper.
 *
 * Resolves the bridge URL with this priority:
 *   1. URL query parameter: ?mcp=http://otherhost:9001
 *   2. localStorage:        merkantilizm.mcpUrl
 *   3. window.MCP_URL       (set by an inline <script> in book.html if desired)
 *   4. Default:             http://127.0.0.1:8766
 *
 * Also exposes mcpFetch(path, opts) — wraps fetch() with:
 *   - Automatic bridge URL prefix
 *   - AbortController timeout (default 30s; configurable via opts.timeoutMs)
 *   - Normalized error: { ok, status, data, error, kind: 'offline'|'timeout'|'http'|'parse' }
 *
 * Expose: window.MerkantilizmMCP
 */
(function() {
  'use strict';

  const DEFAULT_URL = 'http://127.0.0.1:8766';
  const STORAGE_KEY = 'merkantilizm.mcpUrl';
  const DEFAULT_TIMEOUT_MS = 30000;
  const QUICK_TIMEOUT_MS = 8000; // for health checks / list_sources

  function resolveUrl() {
    try {
      const u = new URL(location.href);
      const qp = u.searchParams.get('mcp');
      if (qp) {
        // Persist for follow-up navigations
        try { localStorage.setItem(STORAGE_KEY, qp); } catch (e) {}
        return qp.replace(/\/+$/, '');
      }
    } catch (e) {}
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return stored.replace(/\/+$/, '');
    } catch (e) {}
    if (typeof window.MCP_URL === 'string' && window.MCP_URL) {
      return window.MCP_URL.replace(/\/+$/, '');
    }
    return DEFAULT_URL;
  }

  let _currentUrl = resolveUrl();

  function setUrl(url) {
    if (!url) {
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
      _currentUrl = DEFAULT_URL;
      return _currentUrl;
    }
    const clean = String(url).trim().replace(/\/+$/, '');
    try { localStorage.setItem(STORAGE_KEY, clean); } catch (e) {}
    _currentUrl = clean;
    return _currentUrl;
  }

  function getUrl() { return _currentUrl; }

  /**
   * mcpFetch — single source of truth for talking to the bridge.
   *
   *   const { ok, data, error, kind } = await mcpFetch('/tools/semantic_search', {
   *     method: 'POST',
   *     body: { query: 'foo', top_k: 3 },
   *     timeoutMs: 15000,
   *     signal: externalAbortSignal,   // optional, combined with timeout
   *   });
   *
   * Always resolves (never rejects). Inspect .ok or .kind.
   */
  async function mcpFetch(path, opts) {
    opts = opts || {};
    const timeoutMs = opts.timeoutMs || DEFAULT_TIMEOUT_MS;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort('timeout'), timeoutMs);

    // Combine external signal with internal timeout signal
    if (opts.signal) {
      if (opts.signal.aborted) controller.abort('external-abort');
      else opts.signal.addEventListener('abort', () => controller.abort('external-abort'), { once: true });
    }

    const init = {
      method: opts.method || 'GET',
      signal: controller.signal,
    };
    if (opts.body !== undefined) {
      init.headers = Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {});
      init.body = typeof opts.body === 'string' ? opts.body : JSON.stringify(opts.body);
    } else if (opts.headers) {
      init.headers = opts.headers;
    }

    const url = _currentUrl + path;
    try {
      const resp = await fetch(url, init);
      clearTimeout(timer);
      let data = null;
      const text = await resp.text();
      try { data = text ? JSON.parse(text) : null; }
      catch (e) {
        return { ok: false, status: resp.status, data: null, error: 'parse failed: ' + e.message, kind: 'parse', url };
      }
      if (!resp.ok) {
        return { ok: false, status: resp.status, data, error: (data && data.error) || ('HTTP ' + resp.status), kind: 'http', url };
      }
      return { ok: true, status: resp.status, data, error: null, kind: 'ok', url };
    } catch (e) {
      clearTimeout(timer);
      if (controller.signal.aborted) {
        const reason = controller.signal.reason;
        if (reason === 'external-abort') {
          return { ok: false, status: 0, data: null, error: 'cancelled', kind: 'cancelled', url };
        }
        return { ok: false, status: 0, data: null, error: 'timeout after ' + timeoutMs + 'ms', kind: 'timeout', url };
      }
      return { ok: false, status: 0, data: null, error: e.message || 'network error', kind: 'offline', url };
    }
  }

  // Convenience: fast health check (short timeout, returns boolean)
  async function isOnline() {
    const r = await mcpFetch('/health', { timeoutMs: 3000 });
    return r.ok;
  }

  window.MerkantilizmMCP = {
    getUrl,
    setUrl,
    mcpFetch,
    isOnline,
    QUICK_TIMEOUT_MS,
    DEFAULT_TIMEOUT_MS,
    safeStorage,
  };

  // ---- Safe localStorage with schema version ----
  // All keys read/written via this helper get migration support and graceful
  // handling of corrupted or absent payloads. The schema version is global
  // (per-app) and incremented when on-disk shape changes are incompatible.
  const SCHEMA_VERSION = 1;
  const SCHEMA_KEY = 'merkantilizm.schemaVersion';

  function _migrate(fromVersion) {
    // No migrations yet; placeholder for future shape changes.
    // e.g. if (fromVersion < 2) { reshape 'merkantilizm.book.scroll' from string to object }
  }

  function _ensureSchema() {
    try {
      const v = parseInt(localStorage.getItem(SCHEMA_KEY) || '0');
      if (v !== SCHEMA_VERSION) {
        if (v > 0 && v < SCHEMA_VERSION) _migrate(v);
        localStorage.setItem(SCHEMA_KEY, String(SCHEMA_VERSION));
      }
    } catch (e) {
      // localStorage unavailable (private mode); operations will silently no-op
    }
  }
  _ensureSchema();

  const safeStorage = {
    get(key, defaultValue) {
      try {
        const raw = localStorage.getItem(key);
        if (raw == null) return defaultValue;
        return JSON.parse(raw);
      } catch (e) {
        // Corrupted JSON — wipe it so the next set succeeds clean
        try { localStorage.removeItem(key); } catch (e2) {}
        return defaultValue;
      }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); return true; }
      catch (e) { return false; }
    },
    getRaw(key, defaultValue) {
      try { const v = localStorage.getItem(key); return v == null ? defaultValue : v; }
      catch (e) { return defaultValue; }
    },
    setRaw(key, value) {
      try { localStorage.setItem(key, String(value)); return true; }
      catch (e) { return false; }
    },
    delete(key) { try { localStorage.removeItem(key); } catch (e) {} },
    schemaVersion: SCHEMA_VERSION,
  };

  // ---- Mode detection (book vs appendix) ----
  // Centralized so bookmarks.js + command-palette.js can stop sniffing
  // window.BookManifest / window.BookReader themselves.
  window.Merkantilizm = window.Merkantilizm || {};
  Object.defineProperty(window.Merkantilizm, 'mode', {
    get() {
      if (typeof window.BookReader !== 'undefined' || typeof window.BookManifest !== 'undefined') {
        return 'book';
      }
      return 'appendix';
    }
  });
  window.Merkantilizm.inBookMode = function() { return window.Merkantilizm.mode === 'book'; };
  window.Merkantilizm.inAppendixMode = function() { return window.Merkantilizm.mode === 'appendix'; };
  /** Returns 'appendix/playground.html#x' from a hash 'x' when called from book mode;
   *  returns just the hash when already in appendix. */
  window.Merkantilizm.appendixHref = function(hashFragment) {
    return window.Merkantilizm.inBookMode()
      ? 'appendix/playground.html' + hashFragment
      : hashFragment;
  };

  console.log('[mcp-config] Bridge URL =', _currentUrl, '· mode =', window.Merkantilizm.mode);
})();
