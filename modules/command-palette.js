/**
 * command-palette.js — Cmd+K global fuzzy search (J6)
 * Searches across concepts, events, cases, terminology.
 * Triggers: Cmd+K / Ctrl+K / "/" key when no input focused.
 * Expose: window.CommandPalette
 */
(function() {
  'use strict';

  function injectStyles() {
    if (document.getElementById('command-palette-styles')) return;
    const style = document.createElement('style');
    style.id = 'command-palette-styles';
    style.textContent = `
      .cmdk-overlay {
        position: fixed; inset: 0; background: rgba(0,0,0,0.5);
        display: none; align-items: flex-start; justify-content: center;
        z-index: 10000; padding-top: clamp(40px, 12vh, 100px);
      }
      .cmdk-overlay.open { display: flex; }
      .cmdk-modal {
        width: min(640px, calc(100vw - 16px)); max-height: min(60vh, calc(100vh - 120px));
        background: var(--bg-card); border: 1px solid var(--border);
        border-radius: 8px; box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        display: flex; flex-direction: column; overflow: hidden;
      }
      .cmdk-input-wrap {
        display: flex; align-items: center; padding: 12px 16px;
        border-bottom: 1px solid var(--border); gap: 10px;
      }
      .cmdk-input-wrap .icon { color: var(--text-muted); font-size: 16px; }
      .cmdk-input {
        flex: 1; background: transparent; border: none; outline: none;
        color: var(--text-primary); font-size: 14px;
        font-family: var(--font-sans);
      }
      .cmdk-input::placeholder { color: var(--text-muted); }
      .cmdk-shortcut {
        background: var(--bg-tertiary); padding: 2px 6px; border-radius: 3px;
        font-size: 10px; color: var(--text-muted); font-family: var(--font-mono);
      }
      .cmdk-results {
        flex: 1; overflow-y: auto; padding: 6px;
      }
      .cmdk-empty {
        padding: 24px; text-align: center; color: var(--text-muted);
        font-style: italic; font-size: 13px;
      }
      .cmdk-section-label {
        padding: 6px 10px; font-size: 10px; color: var(--text-muted);
        text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;
      }
      .cmdk-result {
        display: flex; align-items: center; gap: 10px; padding: 8px 12px;
        cursor: pointer; border-radius: 4px;
        color: var(--text-primary); font-size: 13px;
      }
      .cmdk-result.active { background: var(--accent); color: #000; }
      .cmdk-result.active .cmdk-meta { color: rgba(0,0,0,0.6); }
      .cmdk-result:hover:not(.active) { background: var(--bg-card-hover); }
      .cmdk-result .icon { font-size: 14px; opacity: 0.8; }
      .cmdk-result .label { flex: 1; }
      .cmdk-meta { color: var(--text-muted); font-size: 11px; font-family: var(--font-mono); }
      .cmdk-footer {
        padding: 6px 14px; border-top: 1px solid var(--border);
        font-size: 10px; color: var(--text-muted); display: flex; gap: 14px;
        font-family: var(--font-mono);
      }
      .cmdk-footer kbd {
        background: var(--bg-tertiary); padding: 1px 5px; border-radius: 2px;
        font-family: var(--font-mono); font-size: 10px;
      }
    `;
    document.head.appendChild(style);
  }

  const TYPE_LABEL = {
    concept: 'Kavram', event: 'Olay', case: 'Vaka', term: 'Terim',
    chapter: 'Bölüm', section: 'Bölüm', theme: 'Tema'
  };
  const TYPE_ICON = {
    concept: '🧠', event: '⏱', case: '📋', term: '📖',
    chapter: '📕', section: '§', theme: '🏛'
  };

  // Use the central helper from mcp-config.js when available; fall back to sniff.
  function inBookMode() {
    return (window.Merkantilizm && window.Merkantilizm.inBookMode)
      ? window.Merkantilizm.inBookMode()
      : typeof window.BookReader !== 'undefined';
  }
  function appendixHref(hash) {
    return (window.Merkantilizm && window.Merkantilizm.appendixHref)
      ? window.Merkantilizm.appendixHref(hash)
      : (inBookMode() ? 'appendix/playground.html' + hash : hash);
  }

  // Turkish-aware lowercase (handles İ → i, I → ı)
  function trLower(s) {
    return String(s || '')
      .replace(/İ/g, 'i').replace(/I/g, 'ı')
      .toLowerCase();
  }

  function score(haystack, needle) {
    if (!needle) return 0;
    const h = trLower(haystack);
    const n = trLower(needle);
    if (h === n) return 1000;
    if (h.startsWith(n)) return 500 - (h.length - n.length);
    // Word-boundary match (after space or hyphen)
    const re = new RegExp('(^|[\\s\\-])' + n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    if (re.test(h)) return 300 - (h.length - n.length);
    const idx = h.indexOf(n);
    if (idx !== -1) return 100 - idx - (h.length - n.length) * 0.1;
    return -1;
  }

  function CommandPalette() {
    this.open = false;
    this.query = '';
    this.results = [];
    this.activeIdx = 0;
    this.overlay = null;
    this.input = null;
    this.resultsEl = null;
  }

  CommandPalette.prototype.build = function() {
    if (this.overlay) return;
    const overlay = document.createElement('div');
    overlay.className = 'cmdk-overlay';
    overlay.innerHTML = `
      <div class="cmdk-modal" role="dialog" aria-label="Hızlı arama">
        <div class="cmdk-input-wrap">
          <span class="icon">🔍</span>
          <input type="text" class="cmdk-input" id="cmdkInput"
                 placeholder="Kavram, olay, vaka veya terim ara…"
                 autocomplete="off" spellcheck="false">
          <span class="cmdk-shortcut">esc</span>
        </div>
        <div class="cmdk-results" id="cmdkResults"></div>
        <div class="cmdk-footer">
          <span><kbd>↑↓</kbd> gez</span>
          <span><kbd>enter</kbd> seç</span>
          <span><kbd>esc</kbd> kapat</span>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    this.overlay = overlay;
    this.input = overlay.querySelector('#cmdkInput');
    this.resultsEl = overlay.querySelector('#cmdkResults');

    const self = this;
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) self.close();
    });
    this.input.addEventListener('input', () => {
      self.query = self.input.value;
      self.activeIdx = 0;
      self.search();
    });
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        self.activeIdx = Math.min(self.results.length - 1, self.activeIdx + 1);
        self.renderResults();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        self.activeIdx = Math.max(0, self.activeIdx - 1);
        self.renderResults();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const r = self.results[self.activeIdx];
        if (r) { self.selectResult(r); }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        self.close();
      } else if (e.key === 'Tab') {
        // Trap focus inside palette — there's only the input so just prevent escape.
        e.preventDefault();
      }
    });
    // Make role + aria explicit for assistive tech
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
  };

  // Track opener so we can restore focus on close
  CommandPalette.prototype._restoreEl = null;

  CommandPalette.prototype.search = function() {
    const q = this.query.trim();
    if (!q) {
      this.results = this._recentOrAll().slice(0, 10);
      this.renderResults();
      return;
    }
    const C = window.CONTENT || {};
    const candidates = [];

    // Theme switcher — surfaces every theme except the current one. Slightly
    // lower weight than chapter/section hits so it doesn't dominate when the
    // user is searching within a book.
    getThemeSwitchEntries().forEach(t => {
      const s = Math.max(
        score(t.label, q),
        score(t.detail || '', q) * 0.5,
        score((t.primaryAuthors || []).join(' '), q) * 0.4
      );
      if (s > 0) candidates.push({
        type: 'theme', id: 'theme:' + t.slug, label: t.label,
        meta: t.detail, score: s * 0.8, raw: t
      });
    });

    (C.CONCEPTS || []).forEach(c => {
      const s = Math.max(
        score(c.label, q),
        score(((c.depth || {}).intro || '').slice(0, 80), q) * 0.5
      );
      if (s > 0) candidates.push({ type: 'concept', id: c.id, label: c.label, meta: c.category || '', score: s, raw: c });
    });
    (C.EVENTS || []).forEach(e => {
      const s = Math.max(score(e.title || '', q), score(String(e.year || ''), q));
      if (s > 0) candidates.push({ type: 'event', id: e.id, label: e.title, meta: `${e.year} ${e.country || ''}`, score: s, raw: e });
    });
    (C.CASES || []).forEach(cs => {
      const s = score(cs.title || cs.label || '', q);
      if (s > 0) candidates.push({ type: 'case', id: cs.id, label: cs.title || cs.label, meta: cs.country || '', score: s, raw: cs });
    });
    (C.TERMINOLOGY || []).forEach(t => {
      const s = Math.max(score(t.tr, q), score(t.en, q), score(t.ar || '', q));
      if (s > 0) candidates.push({ type: 'term', id: t.id, label: t.tr, meta: t.en || '', score: s, raw: t });
    });

    // Chapter + section search (book mode only)
    if (window.BookManifest && window.BookManifest.chapters) {
      window.BookManifest.chapters.forEach(ch => {
        const s = Math.max(score(ch.title, q), score(ch.subtitle || '', q) * 0.6);
        if (s > 0) candidates.push({ type: 'chapter', id: 'chapter:' + ch.num, label: `Bölüm ${ch.num}: ${ch.title}`, meta: ch.subtitle || '', score: s, raw: ch });
        // Sections loaded only after a chapter is rendered; still searchable
        (ch._sections || []).forEach(sec => {
          const ss = score(sec.title, q);
          if (ss > 0) candidates.push({ type: 'section', id: ch.num + '/' + sec.num, label: sec.title, meta: `§${sec.num} · Bölüm ${ch.num}`, score: ss, raw: { chapter: ch, section: sec } });
        });
      });
    }

    candidates.sort((a, b) => b.score - a.score);
    this.results = candidates.slice(0, 30);
    this.activeIdx = 0;
    this.renderResults();
  };

  CommandPalette.prototype._recentOrAll = function() {
    // No query → show theme switcher entries, then favorites, then chapters/concepts
    const C = window.CONTENT || {};
    const bm = window.Bookmarks;
    const out = [];
    // Theme switcher always visible at top of empty palette (discoverability)
    getThemeSwitchEntries().forEach(t => {
      out.push({ type: 'theme', id: 'theme:' + t.slug, label: t.label, meta: t.detail, raw: t });
    });
    if (bm && C.getConceptById) {
      bm.favorites.forEach(id => {
        const it = C.getConceptById(id) || (C.getEventById && C.getEventById(id));
        if (it) out.push({ type: it.depth ? 'concept' : 'event', id, label: it.label || it.title, meta: '⭐', raw: it });
      });
    }
    // In book mode without concepts (e.g., Deger), list chapter titles instead
    if (!(C.CONCEPTS && C.CONCEPTS.length) && window.BookManifest && window.BookManifest.chapters) {
      window.BookManifest.chapters.slice(0, 10).forEach(ch => {
        out.push({ type: 'chapter', id: 'chapter:' + ch.num, label: `Bölüm ${ch.num}: ${ch.title}`, meta: ch.subtitle || '', raw: ch });
      });
    } else {
      (C.CONCEPTS || []).slice(0, 10).forEach(c => {
        if (!out.find(x => x.id === c.id)) {
          out.push({ type: 'concept', id: c.id, label: c.label, meta: c.category || '', raw: c });
        }
      });
    }
    return out;
  };

  function getThemeSwitchEntries() {
    const themes = window.MerkantilizmThemes;
    if (!Array.isArray(themes)) return [];
    // Derive current slug from path. Landing returns '' which matches no theme,
    // so all themes are surfaced there too.
    const segs = location.pathname.split('/').filter(Boolean);
    const currentSlug = (segs[0] || '').toLowerCase();
    return themes
      .filter(t => t.slug !== currentSlug)
      .map(t => ({
        slug: t.slug,
        label: '→ ' + t.title,
        detail: t.subtitle || '',
        primaryAuthors: t.primaryAuthors || [],
        href: '../' + t.slug + '/book.html',
      }));
  }

  CommandPalette.prototype.renderResults = function() {
    if (!this.results.length) {
      this.resultsEl.innerHTML = `<div class="cmdk-empty">Eşleşme yok.</div>`;
      return;
    }
    const self = this;
    const html = this.results.map((r, i) => {
      const cls = i === self.activeIdx ? 'cmdk-result active' : 'cmdk-result';
      return `<div class="${cls}" data-idx="${i}">
        <span class="icon">${TYPE_ICON[r.type] || '•'}</span>
        <span class="label">${escapeHtml(r.label)}</span>
        <span class="cmdk-meta">${escapeHtml(r.meta || TYPE_LABEL[r.type] || '')}</span>
      </div>`;
    }).join('');
    this.resultsEl.innerHTML = html;
    this.resultsEl.querySelectorAll('.cmdk-result').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.dataset.idx);
        self.selectResult(self.results[idx]);
      });
      el.addEventListener('mousemove', () => {
        const idx = parseInt(el.dataset.idx);
        if (idx !== self.activeIdx) {
          self.activeIdx = idx;
          self.renderResults();
        }
      });
    });
    // Scroll active into view
    const active = this.resultsEl.querySelector('.cmdk-result.active');
    if (active && active.scrollIntoView) active.scrollIntoView({ block: 'nearest' });
  };

  CommandPalette.prototype.selectResult = function(r) {
    this.close();
    if (!r) return;
    if (r.type === 'theme') {
      if (r.raw && r.raw.href) location.href = r.raw.href;
    } else if (r.type === 'chapter') {
      if (window.BookReader) window.BookReader.go(r.raw.num);
    } else if (r.type === 'section') {
      if (window.BookReader) window.BookReader.go(r.raw.chapter.num, r.raw.section.num);
    } else if (r.type === 'concept' || r.type === 'event') {
      if (inBookMode()) {
        location.href = appendixHref('#' + r.type + '/' + r.id);
      } else if (typeof window.showDeepDive === 'function') {
        window.showDeepDive(r.raw);
      }
    } else if (r.type === 'case') {
      if (inBookMode()) {
        location.href = appendixHref('#tabCases');
      } else {
        const tabBtn = document.getElementById('tabCases');
        if (tabBtn) tabBtn.click();
      }
    } else if (r.type === 'term') {
      const conceptId = r.raw.conceptRef && (r.raw.conceptRef.startsWith('concept.') ? r.raw.conceptRef.slice(8) : r.raw.conceptRef);
      if (inBookMode()) {
        location.href = conceptId
          ? appendixHref('#concept/' + conceptId)
          : appendixHref('#tabTerminology');
      } else {
        const c = conceptId && window.CONTENT.getConceptById(conceptId);
        if (c && typeof window.showDeepDive === 'function') {
          window.showDeepDive(c);
        } else {
          const tabBtn = document.getElementById('tabTerminology');
          if (tabBtn) tabBtn.click();
        }
      }
    }
  };

  CommandPalette.prototype.show = function() {
    this.build();
    this.open = true;
    this._restoreEl = document.activeElement;
    this.overlay.classList.add('open');
    this.input.value = '';
    this.query = '';
    this.activeIdx = 0;
    this.search();
    setTimeout(() => this.input.focus(), 0);
  };

  CommandPalette.prototype.close = function() {
    this.open = false;
    if (this.overlay) this.overlay.classList.remove('open');
    // Restore focus to opener (Cmd+K button or last focused element)
    if (this._restoreEl && typeof this._restoreEl.focus === 'function') {
      try { this._restoreEl.focus(); } catch (e) {}
    }
    this._restoreEl = null;
  };

  function escapeHtml(v) {
    return String(v || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  CommandPalette.prototype.init = function() {
    injectStyles();
    const self = this;

    // Global keyboard trigger
    document.addEventListener('keydown', (e) => {
      const isMod = e.metaKey || e.ctrlKey;
      const target = e.target;
      const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);

      // Cmd+K / Ctrl+K always works
      if (isMod && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        self.show();
        return;
      }
      // "/" works when no input focused
      if (e.key === '/' && !isInput && !self.open) {
        e.preventDefault();
        self.show();
      }
    });
  };

  window.CommandPalette = new CommandPalette();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.CommandPalette.init());
  } else {
    window.CommandPalette.init();
  }
  console.log('[command-palette] Module loaded — Cmd+K to open');
})();
