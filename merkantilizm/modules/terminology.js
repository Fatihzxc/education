/**
 * terminology.js — Sözlük tab + inline term decoration (J5)
 * Renders the "📖 Sözlük" tab and decorates Turkish terms in deep-dive text
 * with hover tooltips + click navigation to related concept.
 * Expose: window.Terminology
 */
(function() {
  'use strict';

  function injectStyles() {
    if (document.getElementById('terminology-styles')) return;
    const style = document.createElement('style');
    style.id = 'terminology-styles';
    style.textContent = `
      .terminology-wrap { padding: 8px; }
      .terminology-search {
        display: flex; gap: 8px; margin-bottom: 12px; align-items: center;
      }
      .terminology-search input {
        flex: 1; padding: 6px 10px; background: var(--bg-tertiary);
        border: 1px solid var(--border); border-radius: 4px; color: var(--text-primary);
        font-size: 13px; outline: none;
      }
      .terminology-search input:focus { border-color: var(--accent); }
      .terminology-count { font-size: 11px; color: var(--text-muted); font-family: var(--font-mono); }
      .terminology-table {
        width: 100%; border-collapse: collapse; font-size: 12px;
      }
      .terminology-table th, .terminology-table td {
        text-align: left; padding: 6px 10px; border-bottom: 1px solid var(--border);
        vertical-align: top;
      }
      .terminology-table th {
        position: sticky; top: 0; background: var(--bg-card);
        color: var(--text-secondary); font-weight: 600; font-size: 11px;
        text-transform: uppercase; letter-spacing: 0.5px;
      }
      .terminology-table tr:hover td { background: var(--bg-card-hover); }
      .terminology-table .lang { color: var(--text-muted); font-family: var(--font-mono); font-size: 11px; }
      .terminology-table .def { color: var(--text-secondary); line-height: 1.5; }
      .terminology-table .link-concept {
        color: var(--accent); cursor: pointer; text-decoration: underline; font-size: 11px;
      }
      .terminology-table .link-concept:hover { color: var(--text-primary); }

      /* Inline term decoration in deep-dive paragraphs */
      .term-link {
        border-bottom: 1px dotted var(--accent);
        cursor: help;
        position: relative;
      }
      .term-link:hover { color: var(--accent); }
      .term-tooltip {
        position: absolute; left: 0; bottom: 100%; margin-bottom: 6px;
        background: var(--bg-card); border: 1px solid var(--accent); border-radius: 4px;
        padding: 8px 10px; min-width: 220px; max-width: 320px; z-index: 1000;
        font-size: 11px; line-height: 1.5; color: var(--text-primary);
        box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        opacity: 0; pointer-events: none; transition: opacity 120ms;
      }
      .term-link:hover .term-tooltip,
      .term-link.touch-open .term-tooltip { opacity: 1; pointer-events: auto; }
      .term-link .term-tooltip .goto { cursor: pointer; }
      .term-link .term-tooltip .goto:hover { text-decoration: underline; }
      .term-tooltip .langs { color: var(--text-muted); font-family: var(--font-mono); font-size: 10px; margin-bottom: 4px; }
      .term-tooltip .def { color: var(--text-secondary); }
      .term-tooltip .goto { display: block; margin-top: 6px; color: var(--accent); font-size: 10px; }
    `;
    document.head.appendChild(style);
  }

  function escapeHtml(v) {
    return String(v || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Strip the "concept." prefix that terminology fragments use (e.g. concept.bullionism → bullionism)
  function resolveConceptId(ref) {
    if (!ref) return null;
    return ref.startsWith('concept.') ? ref.slice(8) : ref;
  }

  function Terminology() {
    this._termsByLabel = null;  // built lazily; map of lowercase TR label → term
    this._sortedLabels = null;  // labels sorted by length desc for greedy matching
  }

  Terminology.prototype._buildIndex = function() {
    if (this._termsByLabel) return;
    const terms = (window.CONTENT && window.CONTENT.TERMINOLOGY) || [];
    const map = {};
    terms.forEach(t => {
      if (t.tr) map[t.tr.toLowerCase()] = t;
    });
    this._termsByLabel = map;
    this._sortedLabels = Object.keys(map).sort((a, b) => b.length - a.length);
  };

  Terminology.prototype.getTermByLabel = function(label) {
    this._buildIndex();
    return this._termsByLabel[String(label).toLowerCase()] || null;
  };

  Terminology.prototype.renderTab = function(filter) {
    const panel = document.getElementById('panelTerminology');
    if (!panel) return;
    const terms = (window.CONTENT && window.CONTENT.TERMINOLOGY) || [];
    const q = (filter || '').trim().toLowerCase();
    const filtered = q
      ? terms.filter(t => {
          const haystack = [t.tr, t.en, t.la, t.ar, t.definition && t.definition.tr]
            .filter(Boolean).join(' ').toLowerCase();
          return haystack.includes(q);
        })
      : terms;

    const rows = filtered.map(t => {
      const conceptId = resolveConceptId(t.conceptRef);
      const concept = conceptId && window.CONTENT.getConceptById(conceptId);
      const link = concept
        ? `<span class="link-concept" data-concept="${conceptId}">→ ${escapeHtml(concept.label)}</span>`
        : '';
      const langs = [
        t.en ? `<span class="lang">EN: ${escapeHtml(t.en)}</span>` : '',
        t.ar ? `<span class="lang">AR: ${escapeHtml(t.ar)}</span>` : '',
        t.la ? `<span class="lang">LA: ${escapeHtml(t.la)}</span>` : ''
      ].filter(Boolean).join('<br>');
      const def = (t.definition && t.definition.tr) || '';
      return `<tr>
        <td><strong>${escapeHtml(t.tr)}</strong></td>
        <td>${langs}</td>
        <td class="def">${escapeHtml(def)}</td>
        <td>${link}</td>
      </tr>`;
    }).join('');

    panel.innerHTML = `
      <div class="terminology-wrap">
        <div class="terminology-search">
          <input type="text" id="terminologySearch" placeholder="Türkçe / İngilizce / Arapça ara…" value="${escapeHtml(filter || '')}">
          <span class="terminology-count">${filtered.length}/${terms.length}</span>
        </div>
        <table class="terminology-table">
          <thead>
            <tr><th>Türkçe</th><th>Diğer Diller</th><th>Tanım</th><th></th></tr>
          </thead>
          <tbody>${rows || `<tr><td colspan="4" style="text-align:center;color:var(--text-muted);">Eşleşme yok</td></tr>`}</tbody>
        </table>
      </div>
    `;

    const input = panel.querySelector('#terminologySearch');
    if (input) {
      input.addEventListener('input', () => this.renderTab(input.value));
      // Restore focus + caret
      if (filter) {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
    }
    panel.querySelectorAll('.link-concept').forEach(el => {
      el.addEventListener('click', () => {
        const concept = window.CONTENT.getConceptById(el.dataset.concept);
        if (concept && typeof window.showDeepDive === 'function') window.showDeepDive(concept);
      });
    });
  };

  Terminology.prototype.decorate = function(rootEl) {
    if (!rootEl) return;
    this._buildIndex();
    if (!this._sortedLabels || !this._sortedLabels.length) return;

    // Build a single alternation regex from all labels (longest first ensures greedy match)
    // \b doesn't play nice with Turkish chars (ı, ş, ğ etc.), so use lookarounds + non-letter boundaries.
    const pattern = new RegExp(
      '(?<![\\wçğıİöşüâîûÇĞIÖŞÜÂÎÛ])(' +
      this._sortedLabels.map(escapeRegex).join('|') +
      ')(?![\\wçğıİöşüâîûÇĞIÖŞÜÂÎÛ])',
      'gi'
    );

    // Walk only text nodes inside paragraphs to avoid clobbering existing markup
    const paragraphs = rootEl.querySelectorAll('p');
    paragraphs.forEach(p => this._decorateNode(p, pattern));
  };

  Terminology.prototype._decorateNode = function(p, pattern) {
    const self = this;
    const walker = document.createTreeWalker(p, NodeFilter.SHOW_TEXT, null);
    const replacements = [];
    let n;
    while ((n = walker.nextNode())) {
      const txt = n.nodeValue;
      if (!txt || txt.length < 3) continue;
      pattern.lastIndex = 0;
      if (!pattern.test(txt)) continue;
      replacements.push(n);
    }
    replacements.forEach(node => {
      const txt = node.nodeValue;
      pattern.lastIndex = 0;
      const frag = document.createDocumentFragment();
      let lastIdx = 0, m;
      while ((m = pattern.exec(txt)) !== null) {
        if (m.index > lastIdx) frag.appendChild(document.createTextNode(txt.slice(lastIdx, m.index)));
        const term = self.getTermByLabel(m[0]);
        if (term) {
          frag.appendChild(self._makeTermSpan(m[0], term));
        } else {
          frag.appendChild(document.createTextNode(m[0]));
        }
        lastIdx = m.index + m[0].length;
      }
      if (lastIdx < txt.length) frag.appendChild(document.createTextNode(txt.slice(lastIdx)));
      node.parentNode.replaceChild(frag, node);
    });
  };

  Terminology.prototype._makeTermSpan = function(matchedText, term) {
    const span = document.createElement('span');
    span.className = 'term-link';
    span.textContent = matchedText;
    span.setAttribute('tabindex', '0');
    span.setAttribute('role', 'button');
    span.setAttribute('aria-label', matchedText + ' — terim bilgisi');
    const conceptId = resolveConceptId(term.conceptRef);
    const def = (term.definition && term.definition.tr) || '';
    const langs = [
      term.en ? `EN: ${term.en}` : '',
      term.ar ? `AR: ${term.ar}` : '',
      term.la ? `LA: ${term.la}` : ''
    ].filter(Boolean).join(' · ');
    const goto = conceptId ? `<span class="goto" data-goto="${conceptId}">→ İlgili kavrama git</span>` : '';
    const tooltip = document.createElement('span');
    tooltip.className = 'term-tooltip';
    tooltip.innerHTML = `<div class="langs">${escapeHtml(langs)}</div><div class="def">${escapeHtml(def)}</div>${goto}`;
    span.appendChild(tooltip);

    // Click on the term itself toggles the tooltip (works for touch + desktop).
    // Click on the "→ İlgili kavrama git" link navigates.
    span.addEventListener('click', (e) => {
      // If user tapped the goto link inside, navigate
      if (e.target.dataset && e.target.dataset.goto) {
        e.stopPropagation();
        const c = window.CONTENT.getConceptById(e.target.dataset.goto);
        if (c && typeof window.showDeepDive === 'function') window.showDeepDive(c);
        span.classList.remove('touch-open');
        return;
      }
      e.stopPropagation();
      // Close any other open tooltips
      document.querySelectorAll('.term-link.touch-open').forEach(el => {
        if (el !== span) el.classList.remove('touch-open');
      });
      span.classList.toggle('touch-open');
    });
    // Keyboard: Enter or Space toggles tooltip, Esc closes
    span.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        span.classList.toggle('touch-open');
      } else if (e.key === 'Escape') {
        span.classList.remove('touch-open');
      }
    });
    return span;
  };

  Terminology.prototype.init = function() {
    injectStyles();
    const self = this;
    // Initial render
    this.renderTab('');
    // Wrap window.showDeepDive to auto-decorate after each render
    const prev = window.showDeepDive;
    if (typeof prev === 'function') {
      window.showDeepDive = function(item) {
        prev(item);
        const content = document.getElementById('deepDiveContent');
        if (content) self.decorate(content);
      };
    }
    // Close touch-open tooltips when user taps elsewhere
    document.addEventListener('click', (e) => {
      if (e.target.closest('.term-link')) return;
      document.querySelectorAll('.term-link.touch-open').forEach(el => el.classList.remove('touch-open'));
    });
  };

  window.Terminology = new Terminology();
  // Defer init so deep-dive wrap is in place and CONTENT is built
  // (matches bookmarks.js delay so wrap order is: inline → deep-dive → terminology → bookmarks)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(() => window.Terminology.init(), 350));
  } else {
    setTimeout(() => window.Terminology.init(), 350);
  }
  console.log('[terminology] Module loaded');
})();
