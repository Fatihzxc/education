/**
 * progress.js — Per-chapter scroll position to localStorage; resume on revisit.
 * Storage:
 *   merkantilizm.book.lastChapter — int, last chapter visited
 *   merkantilizm.book.scroll      — { "4": 0.42, "7": 0.13, ... } fraction of scrollHeight
 * Expose: window.BookProgress
 */
(function() {
  'use strict';

  // Per-theme keys; falls back to legacy 'merkantilizm.*' if theme detection
  // hasn't run (e.g. older standalone test pages).
  function _keyFor(suffix) {
    if (window.Merkantilizm && typeof window.Merkantilizm.storageKey === 'function') {
      return window.Merkantilizm.storageKey(suffix);
    }
    return 'merkantilizm.' + suffix;
  }
  const KEY_LAST = _keyFor('book.lastChapter');
  const KEY_SCROLL = _keyFor('book.scroll');
  let _saveTimer = null;
  let _currentChapter = null;

  const store = (window.MerkantilizmMCP && window.MerkantilizmMCP.safeStorage) || null;

  function readMap() {
    if (store) {
      const v = store.get(KEY_SCROLL, {});
      return (v && typeof v === 'object' && !Array.isArray(v)) ? v : {};
    }
    try { return JSON.parse(localStorage.getItem(KEY_SCROLL) || '{}'); }
    catch (e) { return {}; }
  }
  function writeMap(m) {
    if (store) { store.set(KEY_SCROLL, m); return; }
    try { localStorage.setItem(KEY_SCROLL, JSON.stringify(m)); }
    catch (e) {}
  }

  function BookProgress() {}

  BookProgress.prototype.restore = function(chapterNum) {
    _currentChapter = chapterNum;
    localStorage.setItem(KEY_LAST, String(chapterNum));
    const reader = document.getElementById('bookReader');
    if (!reader) return;
    const map = readMap();
    const frac = map[chapterNum];
    if (typeof frac === 'number' && frac > 0.02) {
      // Defer to allow layout to settle
      setTimeout(() => {
        const max = reader.scrollHeight - reader.clientHeight;
        reader.scrollTop = max * frac;
      }, 50);
    } else {
      reader.scrollTop = 0;
    }
  };

  BookProgress.prototype.lastChapter = function() {
    const v = parseInt(localStorage.getItem(KEY_LAST));
    return Number.isFinite(v) ? v : null;
  };

  function onScroll() {
    if (!_currentChapter) return;
    const reader = document.getElementById('bookReader');
    if (!reader) return;
    const max = reader.scrollHeight - reader.clientHeight;
    if (max <= 0) return;
    const frac = reader.scrollTop / max;
    // Debounce writes
    if (_saveTimer) clearTimeout(_saveTimer);
    _saveTimer = setTimeout(() => {
      const map = readMap();
      map[_currentChapter] = Math.max(0, Math.min(1, frac));
      writeMap(map);
    }, 250);
  }

  function init() {
    const reader = document.getElementById('bookReader');
    if (!reader) return;
    reader.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('beforeunload', () => {
      if (_saveTimer) { clearTimeout(_saveTimer); _saveTimer = null; }
      onScroll();
    });
  }

  window.BookProgress = new BookProgress();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  console.log('[book/progress] Module loaded');
})();
