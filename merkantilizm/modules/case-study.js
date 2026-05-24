/**
 * case-study.js — Vaka çalışmaları render (3-katmanlı, collapsible, tetikleyici sorular)
 * Expose: window.CaseStudy
 */
(function() {
  'use strict';

  function injectStyles() {
    if (document.getElementById('case-study-styles')) return;
    const style = document.createElement('style');
    style.id = 'case-study-styles';
    style.textContent = `
      .case-wrap { padding: 16px; max-width: 900px; margin: 0 auto; }
      .case-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-md); margin-bottom: 16px; overflow: hidden; }
      .case-header { padding: 14px 18px; cursor: pointer; user-select: none; display: flex; justify-content: space-between; align-items: center; transition: background 150ms; }
      .case-header:hover { background: var(--bg-card-hover); }
      .case-header h3 { color: var(--accent); font-size: 16px; font-weight: 600; }
      .case-toggle { color: var(--text-muted); font-size: 18px; transition: transform 200ms; }
      .case-card.open .case-toggle { transform: rotate(90deg); }
      .case-body { display: none; padding: 0 18px 18px; border-top: 1px solid var(--border); }
      .case-card.open .case-body { display: block; }
      .case-layer { padding: 14px 0; border-bottom: 1px dashed var(--border); }
      .case-layer:last-child { border-bottom: none; }
      .case-layer-label { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; margin-bottom: 8px; }
      .case-layer-label.intro { background: rgba(74,222,128,0.2); color: var(--depth-1); }
      .case-layer-label.intermediate { background: rgba(251,191,36,0.2); color: var(--depth-2); }
      .case-layer-label.advanced { background: rgba(239,68,68,0.2); color: var(--depth-3); }
      .case-layer p { color: var(--text-primary); line-height: 1.7; font-size: 14px; }
      .case-trigger { margin-top: 16px; padding: 12px; background: var(--bg-tertiary); border-left: 3px solid var(--warning); border-radius: var(--radius-sm); font-style: italic; color: var(--text-secondary); }
      .case-refs { margin-top: 12px; }
      .case-ref-chip { display: inline-block; padding: 3px 9px; margin: 2px; font-size: 12px; background: var(--bg-tertiary); border-radius: 12px; color: var(--text-secondary); cursor: pointer; }
      .case-ref-chip:hover { background: var(--accent); color: #000; }
    `;
    document.head.appendChild(style);
  }

  function CaseStudy() {}

  CaseStudy.prototype.init = function(containerId) {
    injectStyles();
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    this.render();
  };

  CaseStudy.prototype.render = function() {
    const cases = (window.CONTENT && window.CONTENT.CASES) || [];
    if (cases.length === 0) {
      this.container.innerHTML = '<div class="case-wrap"><p>Vaka yok.</p></div>';
      return;
    }
    const cardsHTML = cases.map((c, i) => {
      const d = c.depth || {};
      const refsHTML = (c.conceptRefs || []).map(id => `<span class="case-ref-chip" data-cid="${id}">${id}</span>`).join('');
      return `
        <div class="case-card" data-idx="${i}">
          <div class="case-header"><h3>${c.title}</h3><span class="case-toggle">▶</span></div>
          <div class="case-body">
            ${d.intro ? `<div class="case-layer depth-1"><span class="case-layer-label intro">🌱 Giriş</span><p>${d.intro}</p></div>` : ''}
            ${d.intermediate ? `<div class="case-layer depth-2"><span class="case-layer-label intermediate">🌳 Orta</span><p>${d.intermediate}</p></div>` : ''}
            ${d.advanced ? `<div class="case-layer depth-3"><span class="case-layer-label advanced">🌲 İleri</span><p>${d.advanced}</p></div>` : ''}
            ${d['tetikleyici-soru'] ? `<div class="case-trigger">💭 ${d['tetikleyici-soru']}</div>` : ''}
            ${refsHTML ? `<div class="case-refs"><strong style="font-size:12px;color:var(--text-muted);">İlgili kavramlar:</strong> ${refsHTML}</div>` : ''}
          </div>
        </div>
      `;
    }).join('');

    this.container.innerHTML = `<div class="case-wrap">${cardsHTML}</div>`;

    this.container.querySelectorAll('.case-header').forEach(h => {
      h.addEventListener('click', () => {
        h.parentElement.classList.toggle('open');
      });
    });

    this.container.querySelectorAll('.case-ref-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = chip.dataset.cid;
        const concept = window.CONTENT && window.CONTENT.getConceptById(id);
        if (concept && typeof window.showDeepDive === 'function') window.showDeepDive(concept);
      });
    });
  };

  window.CaseStudy = new CaseStudy();

  function autoInit() {
    if (document.getElementById('panelCases')) window.CaseStudy.init('panelCases');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', autoInit);
  else autoInit();
  console.log('[case-study] Module loaded');
})();
