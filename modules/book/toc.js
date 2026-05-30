/**
 * toc.js — Sol panel TOC + IntersectionObserver scroll-spy
 * Builds chapter list from manifest; on each chapter load, populates
 * a sub-list of its h2 sections and highlights the active one as the
 * user scrolls.
 * Expose: window.BookToc
 */
(function() {
  'use strict';

  let _observer = null;
  let _currentChapterNum = null;

  function escapeHtml(v) {
    return String(v || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function BookToc() {}

  BookToc.prototype.build = function(manifest) {
    const list = document.getElementById('tocList');
    if (!list || !manifest) return;
    const rows = manifest.chapters.map(ch => {
      const pendingMark = ch.status === 'pending' ? ' style="opacity:0.55;"' : '';
      return `<li>
        <a class="chapter-link" href="#bolum/${ch.num}" data-chapter-num="${ch.num}"${pendingMark}>
          <span class="chapter-num">${ch.num}.</span>${escapeHtml(ch.title)}
        </a>
        <ol class="section-list" data-for-chapter="${ch.num}"></ol>
      </li>`;
    }).join('');
    list.innerHTML = rows;
  };

  BookToc.prototype.onChapterLoaded = function(chapter) {
    _currentChapterNum = chapter.num;
    // Highlight current chapter
    document.querySelectorAll('#tocList .chapter-link').forEach(el => {
      el.classList.toggle('current', parseInt(el.dataset.chapterNum) === chapter.num);
    });
    // Build section sublist
    const subList = document.querySelector('.section-list[data-for-chapter="' + chapter.num + '"]');
    if (subList) {
      const sections = chapter._sections || [];
      subList.innerHTML = sections.map(s =>
        `<li><a class="section-link" href="#bolum/${chapter.num}/${s.num}" data-section-id="${s.id}">
          ${escapeHtml(s.num)} · ${escapeHtml(s.title)}
        </a></li>`
      ).join('');
    }
    // Re-wire scroll-spy for new sections
    setupScrollSpy(chapter);
  };

  BookToc.prototype.onContentsLoaded = function() {
    _currentChapterNum = null;
    if (_observer) { _observer.disconnect(); _observer = null; }
    document.querySelectorAll('#tocList .chapter-link.current').forEach(el => {
      el.classList.remove('current');
    });
    document.querySelectorAll('#tocList .section-link.active').forEach(el => {
      el.classList.remove('active');
    });
  };

  function setupScrollSpy(chapter) {
    if (_observer) { _observer.disconnect(); _observer = null; }
    const reader = document.getElementById('bookReader');
    if (!reader) return;
    const headings = Array.from(document.querySelectorAll('#bookArticle h2'));
    if (!headings.length) return;

    // Use the reader element as root so scroll inside it triggers correctly
    _observer = new IntersectionObserver((entries) => {
      // Pick the topmost heading currently intersecting; if none, fall back to last one above viewport
      const visible = entries.filter(e => e.isIntersecting);
      let activeId = null;
      if (visible.length) {
        visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        activeId = visible[0].target.id;
      }
      if (activeId) highlightSection(activeId);
    }, {
      root: reader,
      rootMargin: '0px 0px -70% 0px',
      threshold: 0
    });
    headings.forEach(h => _observer.observe(h));
  }

  function highlightSection(secId) {
    document.querySelectorAll('#tocList .section-link').forEach(el => {
      el.classList.toggle('active', el.dataset.sectionId === secId);
    });
  }

  window.BookToc = new BookToc();
  console.log('[book/toc] Module loaded');
})();
