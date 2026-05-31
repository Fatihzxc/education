/**
 * reader.js — Markdown chapter loader, hash router, footnote engine
 *
 * Markdown convention for footnotes (custom, simpler than GFM):
 *   Inline:  ...Mun bunu açıkça söyler.^[1]
 *   At end of chapter (after a `## Kaynakça` heading):
 *     [^1]: Mun, T. (1664). *England's Treasure by Forraign Trade*, s. 4.
 *
 * Reader rewrites ^[N] into clickable <sup class="footnote-ref" data-fn="N">N</sup>
 * and turns the Kaynakça section into a hidden definition list. Clicking a
 * footnote-ref toggles a .footnote-inline expander right under the paragraph.
 *
 * URL hash:  #bolum/4         → load chapter 4 from top
 *            #bolum/4/4.2     → load chapter 4, scroll to section 4.2
 *
 * Expose: window.BookReader
 */
(function() {
  'use strict';

  const INDEX_URL = 'chapters/_index.json';
  let _manifest = null;
  let _currentChapter = null;
  let _footnotes = {};  // current chapter's {num: html}

  function escapeHtml(v) {
    return String(v || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  async function loadManifest() {
    // Keep local authoring honest: chapter and manifest edits should be visible
    // on the next navigation, not after the browser cache happens to expire.
    const resp = await fetch(INDEX_URL, { cache: 'no-store' });
    if (!resp.ok) throw new Error('chapter manifest fetch failed: ' + resp.status);
    _manifest = await resp.json();
    window.BookManifest = _manifest;
    // Now that book mode is detectable, refresh any progress badge that may
    // have rendered in concept mode while manifest was still loading.
    if (window.Bookmarks && window.Bookmarks.updateBadge) window.Bookmarks.updateBadge();
    return _manifest;
  }

  async function loadChapter(num, signal) {
    const manifest = await loadManifest();
    const chapter = manifest.chapters.find(c => c.num === num);
    if (!chapter) throw new Error('chapter ' + num + ' not found');
    if (chapter.status === 'pending') {
      return { chapter, html: renderPendingStub(chapter, manifest) };
    }
    const resp = await fetch('chapters/' + chapter.slug + '.md', { cache: 'no-store', signal });
    if (!resp.ok) throw new Error('chapter file fetch failed: ' + resp.status);
    const raw = await resp.text();
    const html = renderMarkdown(raw, chapter, manifest);
    return { chapter, html };
  }

  function renderPendingStub(chapter, manifest) {
    return `
      <div class="chapter-meta">Bölüm ${chapter.num}</div>
      <h1><span class="chapter-num-prefix">Bölüm ${chapter.num}</span>${escapeHtml(chapter.title)}</h1>
      <p class="chapter-subtitle">${escapeHtml(chapter.subtitle || '')}</p>
      <p style="margin-top:48px;color:var(--text-muted);font-style:italic;">
        Bu bölüm henüz yazılmadı. Hedef uzunluk: ~${chapter.estWords.toLocaleString('tr-TR')} kelime.
      </p>
      <p style="color:var(--text-muted);">
        Hazır bölümler için sol panelden başka bir bölüm seçebilirsin.
      </p>
      ${chapterNavFooter(chapter, manifest)}
    `;
  }

  function chapterNavFooter(chapter, manifest) {
    const prev = manifest.chapters.find(c => c.num === chapter.num - 1);
    const next = manifest.chapters.find(c => c.num === chapter.num + 1);
    const prevHtml = prev
      ? `<a class="nav-link prev" href="#bolum/${prev.num}">
           <span class="nav-arrow">← Önceki</span>
           <span class="nav-title">${escapeHtml(prev.num)}. ${escapeHtml(prev.title)}</span>
         </a>`
      : `<span class="nav-link prev disabled"><span class="nav-arrow">Başlangıç</span><span class="nav-title"></span></span>`;
    const nextHtml = next
      ? `<a class="nav-link next" href="#bolum/${next.num}">
           <span class="nav-arrow">Sonraki →</span>
           <span class="nav-title">${escapeHtml(next.num)}. ${escapeHtml(next.title)}</span>
         </a>`
      : `<span class="nav-link next disabled"><span class="nav-arrow">Son</span><span class="nav-title"></span></span>`;
    return `<nav class="chapter-nav" aria-label="Bölüm gezintisi">${prevHtml}${nextHtml}</nav>`;
  }

  // Render a real contents screen for links that should not open chapter 1.
  function formatWords(value) {
    const num = Number(value || 0);
    if (!num) return '';
    return num.toLocaleString('tr-TR') + ' kelime';
  }

  function scrollReaderToTop() {
    const reader = document.getElementById('bookReader');
    if (reader) reader.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    else window.scrollTo(0, 0);
  }

  function renderContentsPage(manifest) {
    const chapters = manifest.chapters || [];
    const totalWords = chapters.reduce((sum, ch) => sum + Number(ch.estWords || 0), 0);
    const totalWordsText = totalWords ? totalWords.toLocaleString('tr-TR') + ' hedef kelime' : '';
    const rows = chapters.map(ch => {
      const statusText = ch.status === 'pending' ? 'Planlandı' : 'Hazır';
      const words = formatWords(ch.estWords);
      return `
        <li class="book-contents-item status-${escapeHtml(ch.status || 'draft')}">
          <a class="book-contents-link" href="#bolum/${ch.num}">
            <span class="book-contents-num">${escapeHtml(ch.num)}.</span>
            <span class="book-contents-main">
              <strong>${escapeHtml(ch.title)}</strong>
              ${ch.subtitle ? `<span>${escapeHtml(ch.subtitle)}</span>` : ''}
            </span>
            <span class="book-contents-meta">
              ${words ? `<em>${escapeHtml(words)}</em>` : ''}
              <small>${escapeHtml(statusText)}</small>
            </span>
          </a>
        </li>
      `;
    }).join('');

    return `
      <div class="chapter-meta">İçindekiler</div>
      <h1>${escapeHtml(manifest.title || 'Kitap')}</h1>
      ${manifest.subtitle ? `<p class="chapter-subtitle">${escapeHtml(manifest.subtitle)}</p>` : ''}
      <div class="book-contents-summary">
        <span>${chapters.length.toLocaleString('tr-TR')} bölüm</span>
        ${totalWordsText ? `<span>${escapeHtml(totalWordsText)}</span>` : ''}
      </div>
      <ol class="book-contents-list">${rows}</ol>
    `;
  }

  async function showContents() {
    const article = document.getElementById('bookArticle');
    if (!article) return;
    if (_activeNavController) {
      try { _activeNavController.abort('contents'); } catch (e) {}
    }
    article.innerHTML = '<div class="book-loading">Yükleniyor…</div>';
    const manifest = await loadManifest();
    _currentChapter = null;
    _footnotes = {};
    article.innerHTML = renderContentsPage(manifest);
    if (window.BookToc && window.BookToc.onContentsLoaded) {
      window.BookToc.onContentsLoaded();
    }
    scrollReaderToTop();
    document.title = `İçindekiler — ${manifest.title || 'Kütüphane'}`;
  }

  // Extract `[^N]: ...` definitions (after rendering) and stash them, then strip the Kaynakça section
  function extractFootnoteDefs(raw) {
    const defs = {};
    const cleaned = raw.replace(/^\[\^(\d+)\]:\s*([^\n]+(?:\n {2,}[^\n]+)*)/gm, (_, num, body) => {
      defs[num] = body.trim();
      return '';
    });
    return { defs, cleaned };
  }

  function renderMarkdown(raw, chapter, manifest) {
    // 1) Pull footnote definitions out so marked doesn't render them as orphan paragraphs
    const { defs, cleaned } = extractFootnoteDefs(raw);
    _footnotes = defs;

    // 2) Replace inline ^[N] markers with placeholders the markdown parser won't touch
    const withMarkers = cleaned.replace(/\^\[(\d+)\]/g, (_, num) => `<sup class="footnote-ref" data-fn="${num}">${num}</sup>`);

    // 3) marked.js render
    if (!window.marked) {
      return '<p style="color:var(--accent-secondary)">marked.js yüklenmedi.</p>';
    }
    const body = window.marked.parse(withMarkers, { breaks: false, gfm: true });

    // 4) Number h2 sections (4.1, 4.2, …) and assign IDs
    const dom = document.createElement('div');
    dom.innerHTML = body;
    let sec = 0;
    dom.querySelectorAll('h2').forEach(h2 => {
      sec++;
      const num = chapter.num + '.' + sec;
      h2.setAttribute('data-num', num);
      h2.setAttribute('id', 'sec-' + num);
    });

    // 5) Convert markdown blockquote citation pattern: paragraph ending with "— Author Year, s.N" gets cite class
    dom.querySelectorAll('blockquote > p:last-child').forEach(p => {
      const txt = p.textContent.trim();
      if (/^—\s/.test(txt)) {
        p.classList.add('cite');
        // Strip the em-dash from textContent (CSS adds it via ::before)
        p.innerHTML = p.innerHTML.replace(/^—\s/, '');
      }
    });

    // 6) Build the chapter wrapper
    const sectionList = collectSections(dom, chapter.num);
    chapter._sections = sectionList;
    const head = `
      <div class="chapter-meta">Bölüm ${chapter.num}</div>
      <h1><span class="chapter-num-prefix">Bölüm ${chapter.num}</span>${escapeHtml(chapter.title)}</h1>
      <p class="chapter-subtitle">${escapeHtml(chapter.subtitle || '')}</p>
    `;
    return head + dom.innerHTML + chapterNavFooter(chapter, manifest);
  }

  function collectSections(dom, chapterNum) {
    const sections = [];
    dom.querySelectorAll('h2').forEach(h2 => {
      sections.push({
        id: h2.getAttribute('id'),
        num: h2.getAttribute('data-num'),
        title: h2.textContent.trim()
      });
    });
    return sections;
  }

  function wireFootnotes(rootEl) {
    rootEl.querySelectorAll('.footnote-ref').forEach(sup => {
      sup.addEventListener('click', (e) => {
        e.preventDefault();
        const num = sup.dataset.fn;
        const def = _footnotes[num];
        if (!def) return;
        // Find or create inline expander after the containing paragraph
        let p = sup.closest('p, li, blockquote');
        if (!p) p = sup.parentNode;
        const next = p.nextElementSibling;
        if (next && next.classList && next.classList.contains('footnote-inline') && next.dataset.fn === num) {
          next.classList.toggle('open');
          return;
        }
        const inline = document.createElement('div');
        inline.className = 'footnote-inline open';
        inline.dataset.fn = num;
        inline.innerHTML = `<span class="fn-num">${num}.</span>${window.marked ? window.marked.parseInline(def) : escapeHtml(def)}`;
        p.parentNode.insertBefore(inline, p.nextSibling);
      });
    });
  }

  let _activeNavController = null;

  async function go(num, sectionNum) {
    const article = document.getElementById('bookArticle');
    if (!article) return;

    // Cancel any in-flight chapter fetch from a previous nav
    if (_activeNavController) {
      try { _activeNavController.abort('superseded'); } catch (e) {}
    }
    _activeNavController = new AbortController();
    const myController = _activeNavController;

    article.innerHTML = '<div class="book-loading">Yükleniyor…</div>';
    try {
      const { chapter, html } = await loadChapter(num, myController.signal);
      // If we were superseded by a newer nav before we got here, bail.
      if (myController.signal.aborted || myController !== _activeNavController) return;

      _currentChapter = chapter;
      article.innerHTML = html;
      wireFootnotes(article);
      if (window.Terminology && window.Terminology.decorate) {
        window.Terminology.decorate(article);
      }
      if (window.BookAnnotations && window.BookAnnotations.onChapterLoaded) {
        window.BookAnnotations.onChapterLoaded(chapter, article);
      }
      if (window.BookToc && window.BookToc.onChapterLoaded) {
        window.BookToc.onChapterLoaded(chapter);
      }
      if (sectionNum) {
        const target = document.getElementById('sec-' + sectionNum);
        if (target) target.scrollIntoView({ behavior: 'auto', block: 'start' });
      } else if (window.BookProgress && window.BookProgress.restore) {
        window.BookProgress.restore(chapter.num);
      } else {
        scrollReaderToTop();
      }
      if (window.Bookmarks && window.Bookmarks.markVisited) {
        window.Bookmarks.markVisited('chapter:' + chapter.num);
      }
      const bookTitle = (_manifest && _manifest.title) || 'Kütüphane';
      document.title = `${chapter.num}. ${chapter.title} — ${bookTitle}`;
    } catch (e) {
      // Aborted by a newer nav — don't render error
      if (e.name === 'AbortError' || (myController && myController.signal.aborted)) return;
      console.error('[reader]', e);
      article.innerHTML = `<div class="book-loading" style="color:var(--accent-secondary);">
        Bölüm yüklenemedi: ${escapeHtml(e.message)}
        <div style="margin-top:12px;"><button onclick="window.BookReader.go(${num})" style="background:var(--bg-tertiary);border:1px solid var(--border);color:var(--text-primary);padding:6px 14px;border-radius:4px;cursor:pointer;font-family:var(--font-sans);">Tekrar dene</button></div>
      </div>`;
    }
  }

  function parseHash() {
    if (/^#(?:icindekiler|toc)$/.test(location.hash || '')) {
      return { contents: true };
    }
    const m = (location.hash || '').match(/^#bolum\/(\d+)(?:\/(\d+\.\d+))?$/);
    if (!m) return { contents: false, num: 1, sectionNum: null };
    return { contents: false, num: parseInt(m[1]), sectionNum: m[2] || null };
  }

  function onHashChange() {
    const route = parseHash();
    if (route.contents) showContents();
    else go(route.num, route.sectionNum);
  }

  function BookReader() {}
  BookReader.prototype.go = function(num, sectionNum) {
    const hash = '#bolum/' + num + (sectionNum ? '/' + sectionNum : '');
    if (location.hash !== hash) location.hash = hash;
    else go(num, sectionNum);
  };
  BookReader.prototype.contents = function() {
    if (location.hash !== '#icindekiler') location.hash = '#icindekiler';
    else showContents();
  };
  BookReader.prototype.currentChapter = function() { return _currentChapter; };
  BookReader.prototype.getManifest = function() { return _manifest; };

  window.BookReader = new BookReader();

  async function init() {
    await loadManifest();
    // TOC builds itself once manifest is ready
    if (window.BookToc && window.BookToc.build) window.BookToc.build(_manifest);
    window.addEventListener('hashchange', onHashChange);
    onHashChange();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  console.log('[book/reader] Module loaded');
})();
