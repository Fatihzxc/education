/**
 * modern-links.js — Güncel olay kartları
 * Her kart: Bugün → Tarihsel paralel → Önemli fark
 * Expose: window.ModernLinks
 */
(function() {
  'use strict';

  function injectStyles() {
    if (document.getElementById('modern-links-styles')) return;
    const style = document.createElement('style');
    style.id = 'modern-links-styles';
    style.textContent = `
      .modern-wrap { padding: 16px; max-width: 1100px; margin: 0 auto; }
      .modern-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px; }
      .modern-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 16px; transition: transform 200ms; }
      .modern-card:hover { transform: translateY(-2px); border-color: var(--accent); }
      .modern-card h3 { color: var(--accent); font-size: 15px; font-weight: 600; margin-bottom: 12px; }
      .modern-section { margin: 10px 0; }
      .modern-section-label { display: inline-block; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; margin-bottom: 4px; }
      .modern-section-label.today { background: rgba(0,212,255,0.15); color: var(--accent); }
      .modern-section-label.history { background: rgba(168,139,250,0.15); color: #a78bfa; }
      .modern-section-label.diff { background: rgba(251,191,36,0.15); color: var(--warning); }
      .modern-section-label.update { background: rgba(34,197,94,0.14); color: var(--success); }
      .modern-section p { color: var(--text-primary); font-size: 13px; line-height: 1.6; }
      .modern-freshness { margin: 10px 0; padding: 10px; background: rgba(34,197,94,0.06); border: 1px solid rgba(34,197,94,0.18); border-radius: var(--radius-sm); }
      .modern-freshness p { margin-top: 5px; color: var(--text-primary); font-size: 12px; line-height: 1.55; }
      .modern-updated { display: block; color: var(--text-muted); font-size: 11px; line-height: 1.4; }
      .modern-source-links { margin-top: 8px; display: flex; flex-wrap: wrap; gap: 6px; }
      .modern-source-links a { display: inline-flex; align-items: center; min-height: 24px; padding: 3px 8px; border: 1px solid var(--border); border-radius: 999px; color: var(--text-secondary); background: var(--bg-card); font-size: 11px; text-decoration: none; }
      .modern-source-links a:hover { color: var(--accent); border-color: var(--accent); }
      .modern-lens { margin: 12px 0; padding: 10px; background: var(--bg-tertiary); border: 1px solid var(--border); border-radius: var(--radius-sm); }
      .modern-lens-title { color: var(--text-primary); font-size: 12px; font-weight: 700; margin-bottom: 8px; }
      .modern-lens-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(145px, 1fr)); gap: 7px; }
      .modern-lens-item { padding: 8px; background: var(--bg-card); border-left: 3px solid var(--accent); border-radius: var(--radius-sm); }
      .modern-lens-item b { display: block; color: var(--text-muted); font-size: 10px; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 4px; }
      .modern-lens-item span { display: block; color: var(--text-primary); font-size: 12px; line-height: 1.5; }
      .modern-refs { margin-top: 12px; padding-top: 12px; border-top: 1px dashed var(--border); }
      .modern-refs .case-ref-chip { display: inline-block; padding: 2px 8px; margin: 2px; font-size: 11px; background: var(--bg-tertiary); border-radius: 10px; color: var(--text-muted); cursor: pointer; }
      .modern-refs .case-ref-chip:hover { background: var(--accent); color: #000; }
    `;
    document.head.appendChild(style);
  }

  function ModernLinks() {}

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderLens(lens) {
    if (!lens) return '';
    const rows = [
      ['Kök sebep', lens.root],
      ['Baskın bakış', lens.dominant],
      ['Karşı fikir', lens.counter],
      ['Halkta görünüm', lens.publicEye],
      ['Öğrenme desteği', lens.aid]
    ].filter(row => row[1]);
    if (!rows.length) return '';
    return `
      <div class="modern-lens" aria-label="Okuma merceği">
        <div class="modern-lens-title">Okuma merceği</div>
        <div class="modern-lens-grid">
          ${rows.map(row => `<div class="modern-lens-item"><b>${escapeHtml(row[0])}</b><span>${escapeHtml(row[1])}</span></div>`).join('')}
        </div>
      </div>
    `;
  }

  function safeHref(value) {
    try {
      const url = new URL(String(value || ''), window.location.href);
      return (url.protocol === 'http:' || url.protocol === 'https:') ? url.href : '#';
    } catch (err) {
      return '#';
    }
  }

  function renderSourceLinks(sourceLinks) {
    const rows = (sourceLinks || []).filter(link => link && link.url && link.label);
    if (!rows.length) return '';
    return `
      <div class="modern-source-links" aria-label="Kontrol kaynakları">
        ${rows.map(link => `<a href="${escapeHtml(safeHref(link.url))}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a>`).join('')}
      </div>
    `;
  }

  function renderFreshness(item) {
    if (!item.updatedAt && !item.evidence && !(item.sourceLinks || []).length) return '';
    return `
      <div class="modern-freshness">
        <span class="modern-section-label update">GÜNCELLİK NOTU</span>
        ${item.updatedAt ? `<span class="modern-updated">${escapeHtml(item.updatedAt)} itibarıyla kontrol edildi.</span>` : ''}
        ${item.evidence ? `<p>${escapeHtml(item.evidence)}</p>` : ''}
        ${renderSourceLinks(item.sourceLinks)}
      </div>
    `;
  }

  ModernLinks.prototype.init = function(containerId) {
    injectStyles();
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    this.render();
  };

  ModernLinks.prototype.render = function() {
    const links = (window.CONTENT && window.CONTENT.MODERN_LINKS) || [];
    if (links.length === 0) {
      this.container.innerHTML = '<div class="modern-wrap"><p>Güncel bağlantı yok.</p></div>';
      return;
    }
    const cardsHTML = links.map(l => {
      const refsHTML = (l.conceptRefs || []).map(id => `<span class="case-ref-chip" data-cid="${id}">${id}</span>`).join('');
      return `
        <div class="modern-card">
          <h3>${l.title}</h3>
          ${renderLens(l.lens)}
          ${renderFreshness(l)}
          ${l.today ? `<div class="modern-section"><span class="modern-section-label today">BUGÜN</span><p>${l.today}</p></div>` : ''}
          ${l.historical ? `<div class="modern-section"><span class="modern-section-label history">TARİHSEL PARALEL</span><p>${l.historical}</p></div>` : ''}
          ${l.difference ? `<div class="modern-section"><span class="modern-section-label diff">ÖNEMLİ FARK</span><p>${l.difference}</p></div>` : ''}
          ${refsHTML ? `<div class="modern-refs">${refsHTML}</div>` : ''}
        </div>
      `;
    }).join('');

    this.container.innerHTML = `<div class="modern-wrap"><div class="modern-grid">${cardsHTML}</div></div>`;

    this.container.querySelectorAll('.case-ref-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const id = chip.dataset.cid;
        const concept = window.CONTENT && window.CONTENT.getConceptById(id);
        if (concept && typeof window.showDeepDive === 'function') window.showDeepDive(concept);
      });
    });
  };

  window.ModernLinks = new ModernLinks();

  function autoInit() {
    if (document.getElementById('panelModern')) window.ModernLinks.init('panelModern');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', autoInit);
  else autoInit();
  console.log('[modern-links] Module loaded');
})();
