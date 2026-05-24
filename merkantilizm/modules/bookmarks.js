/**
 * bookmarks.js — Visited tracking + favorites + progress (J7)
 * Storage keys:
 *   merkantilizm.visited   — JSON string array of concept/event IDs
 *   merkantilizm.favorites — JSON string array of concept/event IDs
 * Surfaces:
 *   - Top bar progress badge: "5/73 ✓"
 *   - Deep-dive ⭐ button (toggle favorite of current item)
 *   - "⭐ Favoriler" tab content
 *   - concept-map opacity (via window.Bookmarks.isVisited)
 * Expose: window.Bookmarks
 */
(function() {
  'use strict';

  const STORAGE_VISITED = 'merkantilizm.visited';
  const STORAGE_FAVORITES = 'merkantilizm.favorites';

  function injectStyles() {
    if (document.getElementById('bookmarks-styles')) return;
    const style = document.createElement('style');
    style.id = 'bookmarks-styles';
    style.textContent = `
      .progress-badge {
        display: inline-flex; align-items: center; gap: 4px;
        margin-left: 12px; padding: 4px 9px;
        background: var(--bg-tertiary); border: 1px solid var(--border);
        border-radius: 12px; font-size: 11px; color: var(--text-secondary);
        font-family: var(--font-mono); cursor: default; user-select: none;
      }
      .progress-badge .progress-fill { color: var(--success); font-weight: 700; }
      .deep-dive__fav-btn {
        background: none; border: 1px solid var(--border); color: var(--text-muted);
        font-size: 16px; padding: 3px 9px; border-radius: 14px; cursor: pointer;
        transition: all 150ms; margin-left: 8px;
      }
      .deep-dive__fav-btn:hover { border-color: var(--warning); color: var(--warning); }
      .deep-dive__fav-btn.active { background: rgba(251,191,36,0.15); border-color: var(--warning); color: var(--warning); }
      .favorites-list { display: grid; gap: 8px; padding: 4px; }
      .favorites-list .empty { color: var(--text-muted); font-style: italic; text-align: center; padding: 20px; }
      .favorites-list .fav-item {
        display: flex; align-items: center; justify-content: space-between;
        padding: 8px 12px; background: var(--bg-tertiary); border-left: 3px solid var(--warning);
        border-radius: 4px; cursor: pointer; transition: background 120ms;
      }
      .favorites-list .fav-item:hover { background: var(--bg-card-hover); }
      .favorites-list .fav-meta { color: var(--text-muted); font-size: 11px; }
      .favorites-list .fav-remove { background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 14px; padding: 0 6px; }
      .favorites-list .fav-remove:hover { color: var(--accent-secondary); }
    `;
    document.head.appendChild(style);
  }

  // Prefer safeStorage (handles schema versioning + corrupt payloads)
  const store = (window.MerkantilizmMCP && window.MerkantilizmMCP.safeStorage) || null;

  function readSet(key) {
    if (store) {
      const v = store.get(key, []);
      return new Set(Array.isArray(v) ? v : []);
    }
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return new Set();
      const arr = JSON.parse(raw);
      return new Set(Array.isArray(arr) ? arr : []);
    } catch (e) {
      return new Set();
    }
  }

  function writeSet(key, set) {
    if (store) { store.set(key, Array.from(set)); return; }
    try {
      localStorage.setItem(key, JSON.stringify(Array.from(set)));
    } catch (e) {
      console.warn('[bookmarks] storage write failed:', e.message);
    }
  }

  function Bookmarks() {
    this.visited = readSet(STORAGE_VISITED);
    this.favorites = readSet(STORAGE_FAVORITES);
  }

  Bookmarks.prototype.isVisited = function(id) { return this.visited.has(id); };
  Bookmarks.prototype.isFavorite = function(id) { return this.favorites.has(id); };

  Bookmarks.prototype.markVisited = function(id) {
    if (!id || this.visited.has(id)) return;
    this.visited.add(id);
    writeSet(STORAGE_VISITED, this.visited);
    this.updateBadge();
  };

  Bookmarks.prototype.toggleFavorite = function(id) {
    if (!id) return false;
    if (this.favorites.has(id)) this.favorites.delete(id);
    else this.favorites.add(id);
    writeSet(STORAGE_FAVORITES, this.favorites);
    this.renderFavoritesTab();
    return this.favorites.has(id);
  };

  // Use central helper if available (mcp-config.js); fall back to local sniff.
  function inBookMode() {
    if (window.Merkantilizm && typeof window.Merkantilizm.inBookMode === 'function') {
      return window.Merkantilizm.inBookMode() && !!(window.BookManifest && window.BookManifest.chapters);
    }
    return !!(window.BookManifest && window.BookManifest.chapters);
  }

  Bookmarks.prototype.getStats = function() {
    if (inBookMode()) {
      const total = window.BookManifest.chapters.length;
      const visited = window.BookManifest.chapters.filter(c => this.visited.has('chapter:' + c.num)).length;
      return { visited, total, mode: 'chapter' };
    }
    const total = (window.CONTENT && window.CONTENT.CONCEPTS && window.CONTENT.CONCEPTS.length) || 0;
    const visited = (window.CONTENT && window.CONTENT.CONCEPTS || [])
      .filter(c => this.visited.has(c.id)).length;
    return { visited, total, mode: 'concept' };
  };

  Bookmarks.prototype.updateBadge = function() {
    const el = document.getElementById('progressBadge');
    if (!el) return;
    const { visited, total, mode } = this.getStats();
    el.innerHTML = `<span class="progress-fill">${visited}</span>/${total} ✓`;
    el.title = mode === 'chapter'
      ? `${visited} bölüm okundu (toplam ${total})`
      : `${visited} kavram okundu (toplam ${total})`;
  };

  Bookmarks.prototype.renderFavoritesTab = function() {
    const panel = document.getElementById('panelFavorites');
    if (!panel) return;
    const ids = Array.from(this.favorites);
    if (ids.length === 0) {
      panel.innerHTML = `<div class="favorites-list"><div class="empty">Henüz favori yok. Detay panelinde ⭐ ile favori ekleyin.</div></div>`;
      return;
    }
    const items = ids.map(id => {
      const concept = window.CONTENT && window.CONTENT.getConceptById && window.CONTENT.getConceptById(id);
      const event = window.CONTENT && window.CONTENT.getEventById && window.CONTENT.getEventById(id);
      const item = concept || event;
      if (!item) return null;
      const label = item.label || item.title || id;
      const meta = concept ? (concept.category || '') : (event ? `${event.year} — ${event.country || ''}` : '');
      return `<div class="fav-item" data-id="${id}">
        <div>
          <div>${escapeHtml(label)}</div>
          <div class="fav-meta">${escapeHtml(meta)}</div>
        </div>
        <button class="fav-remove" data-remove="${id}" title="Favorilerden kaldır">✕</button>
      </div>`;
    }).filter(Boolean).join('');
    panel.innerHTML = `<div class="favorites-list">${items || `<div class="empty">Favoriler artık mevcut değil (içerik silinmiş olabilir).</div>`}</div>`;
    panel.querySelectorAll('.fav-item').forEach(row => {
      row.addEventListener('click', (e) => {
        if (e.target.dataset.remove) return;  // handled separately
        const id = row.dataset.id;
        const item = (window.CONTENT.getConceptById(id)) || (window.CONTENT.getEventById(id));
        if (item && typeof window.showDeepDive === 'function') window.showDeepDive(item);
      });
    });
    panel.querySelectorAll('.fav-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        window.Bookmarks.toggleFavorite(btn.dataset.remove);
        window.Bookmarks.refreshFavoriteBtn();
      });
    });
  };

  Bookmarks.prototype.refreshFavoriteBtn = function() {
    const btn = document.getElementById('deepDiveFavBtn');
    if (!btn) return;
    const id = btn.dataset.id;
    if (!id) {
      btn.style.display = 'none';
      return;
    }
    btn.style.display = 'inline-flex';
    const fav = this.isFavorite(id);
    btn.classList.toggle('active', fav);
    btn.textContent = fav ? '⭐' : '☆';
    btn.title = fav ? 'Favorilerden çıkar' : 'Favorilere ekle';
  };

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  Bookmarks.prototype.init = function() {
    injectStyles();
    const self = this;

    // 1) Inject progress badge into topbar (after theme toggle)
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle && !document.getElementById('progressBadge')) {
      const badge = document.createElement('span');
      badge.id = 'progressBadge';
      badge.className = 'progress-badge';
      themeToggle.parentNode.insertBefore(badge, themeToggle);
    }

    // 2) Inject favorite button into deep-dive header
    const ddHeader = document.querySelector('.deep-dive__header');
    if (ddHeader && !document.getElementById('deepDiveFavBtn')) {
      const btn = document.createElement('button');
      btn.id = 'deepDiveFavBtn';
      btn.className = 'deep-dive__fav-btn';
      btn.textContent = '☆';
      btn.style.display = 'none';
      btn.addEventListener('click', () => {
        if (btn.dataset.id) {
          self.toggleFavorite(btn.dataset.id);
          self.refreshFavoriteBtn();
        }
      });
      ddHeader.appendChild(btn);
    }

    // 3) Wrap window.showDeepDive to record visited + refresh fav button
    const prev = window.showDeepDive;
    if (typeof prev === 'function') {
      window.showDeepDive = function(item) {
        prev(item);
        if (item && item.id) {
          self.markVisited(item.id);
          const btn = document.getElementById('deepDiveFavBtn');
          if (btn) {
            btn.dataset.id = item.id;
            self.refreshFavoriteBtn();
          }
        }
      };
    }

    // 4) Initial renders
    this.updateBadge();
    this.renderFavoritesTab();
  };

  window.Bookmarks = new Bookmarks();
  // Defer init so DOM is ready, deep-dive wrap is in place, and CONTENT registry built
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(() => window.Bookmarks.init(), 400));
  } else {
    setTimeout(() => window.Bookmarks.init(), 400);
  }
  console.log('[bookmarks] Module loaded');
})();
