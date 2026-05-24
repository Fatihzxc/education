# Education Repo Expansion: "Değer Kavramının Tarihi" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Evolve the education repo from a single-book (Merkantilizm) project into a multi-theme social-sciences library, then write the first new theme — a 12-chapter book on the history of the concept of value, from Aristotle to Amartya Sen.

**Architecture:** Hoist `modules/`, `styles/`, and `vendor/` out of `merkantilizm/` into the repo root so multiple themes can share them. Add a root landing page (`/index.html`) driven by a new `theme-registry.js`. Each theme becomes a sibling folder (`merkantilizm/`, `deger/`) containing only its own `book.html` shell + `chapters/_index.json` + chapter markdown. The book reader, MCP bridge, terminology engine, Cmd+K palette, bookmarks, and reindex panel are all reused unchanged.

**Tech Stack:** Vanilla HTML/CSS/ES5 IIFE modules (no build system); marked.js as a vendored markdown parser; Python `http.server` (no-cache dev server) for local dev; kb-mcp HTTP bridge (Python ThreadingHTTPServer over SQLite FTS5 + sentence-transformers) for semantic search and verify_claim during chapter authoring.

---

## File Structure

After Faz 5A completes, the repo top-level looks like this. **Bold = new or moved.**

```
iktisat/
├── README.md                        # MODIFIED
├── serve.py                         # UNCHANGED (no-cache dev server)
├── index.html                       # NEW — landing page (theme grid)
├── styles/                          # MOVED from merkantilizm/styles/
│   ├── book.css                     # unchanged content, new path
│   └── landing.css                  # NEW — theme card grid
├── vendor/                          # MOVED from merkantilizm/vendor/
│   └── marked.min.js
├── modules/                         # MOVED from merkantilizm/modules/
│   ├── book/                        # reader.js, toc.js, progress.js (unchanged)
│   ├── content-fragments/           # merkantilizm-namespaced content (unchanged)
│   ├── theme-registry.js            # NEW — single source of truth for themes
│   ├── bookmarks.js                 # unchanged
│   ├── command-palette.js           # MODIFIED — adds theme-switch entries
│   ├── concept-map.js               # unchanged
│   ├── content-data.js              # unchanged
│   ├── deep-dive.js                 # unchanged
│   ├── mcp-config.js                # unchanged
│   ├── reindex-panel.js             # unchanged
│   ├── terminology.js               # unchanged
│   └── (other modules…)             # unchanged
├── merkantilizm/                    # MODIFIED — only paths in HTML touched
│   ├── book.html                    # MODIFIED — script/link paths now `../modules/...`
│   ├── chapters/                    # unchanged
│   └── appendix/
│       └── playground.html          # MODIFIED — `../../modules/...` paths
├── deger/                           # NEW — first new theme
│   ├── book.html                    # NEW — copy of merkantilizm/book.html
│   └── chapters/
│       ├── _index.json              # NEW — 12 pending chapter stubs
│       └── 01..12-*.md              # NEW (Faz 5B) — chapter markdown
├── kb-mcp/                          # UNCHANGED (shared corpus)
├── sources/                         # MODIFIED — Marx/Menger/Jevons/Walras/Marshall/Sraffa/Sen PDFs added (Faz 5B)
└── docs/superpowers/
    ├── specs/2026-05-24-education-expansion-design.md   # source of truth
    └── plans/2026-05-24-education-deger-book.md         # this file
```

**Why this layout:** spec section 1 explicitly puts shared infrastructure at the repo root and gives each theme a sibling subfolder with only theme-specific HTML and content. The hoist makes the merkantilizm-vs-deger boundary clear: HTML and markdown is theme-specific, everything else is shared.

---

## Faz 5A — Mimari Geçiş (detaylı sıralı görevler)

### Task 1: Hoist `modules/`, `styles/`, `vendor/` out of `merkantilizm/`

**Files:**
- Move: `merkantilizm/modules/` → `modules/`
- Move: `merkantilizm/styles/` → `styles/`
- Move: `merkantilizm/vendor/` → `vendor/`
- Modify: `merkantilizm/book.html` (all `modules/...` → `../modules/...`, `styles/...` → `../styles/...`, `vendor/...` → `../vendor/...`)
- Modify: `merkantilizm/appendix/playground.html` (all `../modules/...` → `../../modules/...`, same for `../styles/`, `../vendor/`)

- [ ] **Step 1.1: Confirm clean working tree before the move**

Run: `cd /Users/fatihoner/learn/iktisat && git status --porcelain`
Expected: empty output (no pending changes; the hoist is destructive on paths and must be the only delta in its commit).

If there are pending changes, stash or commit them first. Do NOT mix the hoist with unrelated edits.

- [ ] **Step 1.2: Move the three directories with `git mv` (preserves history)**

```bash
cd /Users/fatihoner/learn/iktisat
git mv merkantilizm/modules modules
git mv merkantilizm/styles styles
git mv merkantilizm/vendor vendor
```

Verify: `ls -d modules styles vendor` should list all three at the repo root; `ls merkantilizm/` should no longer contain them.

- [ ] **Step 1.3: Rewrite all script/link paths in `merkantilizm/book.html`**

Open `merkantilizm/book.html`. Every `<script src="modules/...` becomes `<script src="../modules/...`. Every `<script src="vendor/...` becomes `<script src="../vendor/...`. The single `<link rel="stylesheet" href="styles/book.css">` becomes `href="../styles/book.css"`. There are no other relative asset references in this file.

Exact substitutions (use `Edit` with `replace_all=true` per pattern):

```text
src="modules/      →  src="../modules/
src="vendor/       →  src="../vendor/
href="styles/      →  href="../styles/
```

Do NOT touch `href="appendix/...` (these stay relative to `merkantilizm/`) or `href="#bolum/...` (URL hashes).

- [ ] **Step 1.4: Rewrite all script/link paths in `merkantilizm/appendix/playground.html`**

`appendix/playground.html` lives one folder deeper, so its references already use `../`. After the hoist, they need one more `../`.

```text
src="../modules/   →  src="../../modules/
src="../vendor/    →  src="../../vendor/
href="../styles/   →  href="../../styles/
```

The `href` back-link to the book (typically `href="../book.html"` or similar) stays as-is.

- [ ] **Step 1.5: Start the dev server and smoke-test merkantilizm**

Run in one terminal: `cd /Users/fatihoner/learn/iktisat && python3 serve.py` (default port 8772, no-cache headers).
Open in browser: `http://localhost:8772/merkantilizm/book.html`

Verify (open DevTools Console, no red errors):
- TOC renders 12 chapter entries in the left sidebar
- Chapter 4 loads when clicked; footnotes are clickable
- `Cmd+K` opens command palette; type "Mun" → returns hits
- ⭐ favorite button on a deep-dive in appendix works (open `http://localhost:8772/merkantilizm/appendix/playground.html`)
- Reindex topbar indicator updates (✓ green when MCP bridge is up at 8766)

- [ ] **Step 1.6: Commit the hoist**

```bash
cd /Users/fatihoner/learn/iktisat
git add modules styles vendor merkantilizm/book.html merkantilizm/appendix/playground.html
git status   # verify only those paths are staged
git commit -m "$(cat <<'EOF'
refactor: hoist modules/styles/vendor to repo root for multi-theme sharing

Move shared infrastructure out of merkantilizm/ so future theme folders
(deger/, etc.) can reference the same reader, MCP bridge, terminology
engine, and palette without duplication.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Create `modules/theme-registry.js`

**Files:**
- Create: `modules/theme-registry.js`

**Why this comes second:** the landing page (Task 4) and the Cmd+K extension (Task 7) both read from this single source. Locking the shape first prevents drift.

- [ ] **Step 2.1: Write the registry**

Create `modules/theme-registry.js` with this exact content:

```javascript
/**
 * theme-registry.js — Single source of truth for the library's themes.
 *
 * Consumed by:
 *   - index.html (landing) — renders a card per theme
 *   - command-palette.js  — "Diğer tema'ya geç..." entries
 *   - future export tools
 *
 * Each entry MUST have: slug (folder name), title, subtitle, chapterCount,
 * status ('completed' | 'draft' | 'pending'), primaryAuthors (array of strings).
 * Optional: description (1-2 sentences for landing card body).
 *
 * Expose: window.MerkantilizmThemes
 */
(function() {
  'use strict';

  window.MerkantilizmThemes = [
    {
      slug: 'merkantilizm',
      title: 'Merkantilizm',
      subtitle: '16-18. yüzyıl iktisat düşüncesi',
      description: 'Osmanlı ve Batı perspektifinden, Mun ve Colbert\'ten Genç ve İbn Haldun\'a uzun-form okuma.',
      chapterCount: 12,
      status: 'completed',
      primaryAuthors: ['Mun', 'Smith', 'Colbert', 'Genç', 'Pamuk', 'İbn Haldun'],
    },
    {
      slug: 'deger',
      title: 'Değer kavramının tarihi',
      subtitle: 'Aristoteles\'ten Sen\'e',
      description: 'Emek-değer, marjinalizm, kapabiliteler — değerin antik kökeninden 21. yüzyıla.',
      chapterCount: 12,
      status: 'draft',
      primaryAuthors: ['Aristoteles', 'Aquinas', 'Smith', 'Ricardo', 'Marx', 'Menger', 'Jevons', 'Marshall', 'Sen'],
    },
  ];

  console.log('[theme-registry] Loaded', window.MerkantilizmThemes.length, 'themes');
})();
```

- [ ] **Step 2.2: Smoke-test the registry in a console**

Start `python3 serve.py` if not running. Open `http://localhost:8772/merkantilizm/book.html` (any page) and in DevTools console:

```javascript
fetch('../modules/theme-registry.js').then(r => r.text()).then(t => console.log(t.length, 'bytes'));
```

Expected: a non-zero byte count (the file is reachable). Then run:

```javascript
const s = document.createElement('script'); s.src = '../modules/theme-registry.js'; document.head.appendChild(s);
setTimeout(() => console.log(window.MerkantilizmThemes), 200);
```

Expected: an array of two objects with the right slugs.

- [ ] **Step 2.3: Commit**

```bash
git add modules/theme-registry.js
git commit -m "feat: add theme-registry for multi-theme library

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Write `styles/landing.css`

**Files:**
- Create: `styles/landing.css`

**Why before the landing HTML:** lets us reference real class names in the HTML without forward declarations.

- [ ] **Step 3.1: Write the stylesheet**

Create `styles/landing.css` with:

```css
/* landing.css — repo root landing page. Pairs with book.css custom properties. */

:root {
  --landing-card-bg: var(--bg-card);
  --landing-card-hover: var(--bg-card-hover);
}

body.landing {
  margin: 0;
  font-family: 'Inter', system-ui, sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.landing-header {
  padding: 64px 32px 24px;
  text-align: center;
  border-bottom: 1px solid var(--border);
}
.landing-header h1 {
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: 42px;
  margin: 0 0 12px;
  letter-spacing: -0.02em;
}
.landing-header .subtitle {
  margin: 0;
  color: var(--text-secondary);
  font-size: 17px;
}

.theme-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  padding: 40px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  flex: 1;
}

.theme-card {
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: var(--landing-card-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: background 150ms, border-color 150ms, transform 150ms;
}
.theme-card:hover {
  background: var(--landing-card-hover);
  border-color: var(--accent);
  transform: translateY(-2px);
}
.theme-card h2 {
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: 24px;
  margin: 0 0 6px;
}
.theme-card .card-subtitle {
  color: var(--text-secondary);
  font-size: 14px;
  margin: 0 0 16px;
}
.theme-card .card-description {
  flex: 1;
  font-size: 15px;
  line-height: 1.55;
  color: var(--text-primary);
  margin: 0 0 16px;
}
.theme-card .card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'JetBrains Mono', Menlo, monospace;
  font-size: 12px;
  color: var(--text-muted);
}
.theme-card .status-badge {
  padding: 3px 9px;
  border-radius: 12px;
  background: var(--bg-tertiary);
}
.theme-card.status-completed .status-badge { color: var(--success); }
.theme-card.status-draft .status-badge { color: var(--warning); }
.theme-card.status-pending .status-badge { color: var(--text-muted); opacity: 0.7; }

.landing-footer {
  padding: 24px 32px;
  text-align: center;
  border-top: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 13px;
}
.landing-footer a {
  color: var(--accent);
  text-decoration: none;
  margin: 0 8px;
}
.landing-footer a:hover { text-decoration: underline; }

@media (max-width: 480px) {
  .landing-header { padding: 40px 20px 18px; }
  .landing-header h1 { font-size: 30px; }
  .theme-grid { padding: 24px 16px; gap: 14px; grid-template-columns: 1fr; }
  .theme-card { padding: 18px; }
}
```

- [ ] **Step 3.2: Commit**

```bash
git add styles/landing.css
git commit -m "feat: add landing.css for multi-theme grid

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Write the root `index.html` landing page

**Files:**
- Create: `index.html` (repo root — there is currently no file at this path)

- [ ] **Step 4.1: Write the landing HTML**

Create `/Users/fatihoner/learn/iktisat/index.html`:

```html
<!doctype html>
<html lang="tr" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sosyal Bilimler Kütüphanesi</title>
  <meta name="description" content="Tematik kesişmeler: iktisat, felsefe, hukuk, siyaset bilimi — uzun-form okuma kitapları.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles/book.css">
  <link rel="stylesheet" href="styles/landing.css">
</head>
<body class="landing">

  <header class="landing-header">
    <h1>Sosyal Bilimler Kütüphanesi</h1>
    <p class="subtitle">Tematik kesişmeler — iktisat, felsefe, hukuk, siyaset bilimi</p>
  </header>

  <main class="theme-grid" id="themeGrid">
    <!-- theme-registry.js doldurur -->
  </main>

  <footer class="landing-footer">
    <a href="merkantilizm/appendix/playground.html">Merkantilizm Appendix</a>
    ·
    <a href="https://github.com/Fatihzxc/education">github.com/Fatihzxc/education</a>
  </footer>

  <script src="modules/theme-registry.js"></script>
  <script>
  (function() {
    'use strict';
    const themes = window.MerkantilizmThemes || [];
    const grid = document.getElementById('themeGrid');
    function esc(s) {
      return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
    }
    const statusLabel = { completed: 'tamamlandı', draft: 'taslak', pending: 'planlandı' };
    grid.innerHTML = themes.map(t => `
      <a class="theme-card status-${esc(t.status)}" href="${esc(t.slug)}/book.html">
        <h2>${esc(t.title)}</h2>
        <p class="card-subtitle">${esc(t.subtitle)}</p>
        <p class="card-description">${esc(t.description || '')}</p>
        <div class="card-meta">
          <span>${t.chapterCount} bölüm</span>
          <span class="status-badge">${esc(statusLabel[t.status] || t.status)}</span>
        </div>
      </a>
    `).join('');
  })();
  </script>

</body>
</html>
```

- [ ] **Step 4.2: Smoke-test the landing**

With `python3 serve.py` running, open `http://localhost:8772/`.
Expected: header "Sosyal Bilimler Kütüphanesi", two cards (Merkantilizm — tamamlandı, Değer kavramının tarihi — taslak). Click Merkantilizm card → loads `merkantilizm/book.html` and the TOC populates. Click Değer card → expect 404 because `deger/book.html` doesn't exist yet (this is fine; fixed in Task 5).

- [ ] **Step 4.3: Commit**

```bash
git add index.html
git commit -m "feat: add landing page for multi-theme library

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: Create `deger/book.html` (theme shell)

**Files:**
- Create: `deger/book.html`

**Why it's a copy, not a template:** the merkantilizm/book.html is a thin shell already; spec section 1 says "Her tema kendi `book.html`'ini taşır (HTML kopyası), çünkü chapter path'i farklı." Duplication is intentional — page titles, lang, and content-fragment scripts are theme-specific and a templating layer would be over-engineering.

- [ ] **Step 5.1: Create deger/ directory and copy the shell**

```bash
cd /Users/fatihoner/learn/iktisat
mkdir -p deger/chapters
cp merkantilizm/book.html deger/book.html
```

- [ ] **Step 5.2: Edit `deger/book.html` — title, h1, content-fragment scripts**

Only four edits to the copy. All script src paths stay `../modules/...` (deger/ is at the same depth as merkantilizm/, so the path is identical).

1. `<title>...</title>` → `<title>Değer kavramının tarihi — Aristoteles'ten Sen'e</title>`
2. `<meta name="description" content="...">` → `<meta name="description" content="Değer kavramının antik kökeninden 21. yüzyıla — emek-değer, marjinalizm, kapabiliteler.">`
3. `<h1><a href="#bolum/1">Merkantilizm</a></h1>` → `<h1><a href="#bolum/1">Değer</a></h1>`
4. Remove or comment out merkantilizm-specific content-fragment script tags (concepts-osmanli, concepts-bati-klasik, etc.) — these populate `window.CONTENT` for the *merkantilizm* appendix and aren't relevant in deger/. Leave the reading modules (`book/`, `terminology`, `bookmarks`, `mcp-config`, `command-palette`, `reindex-panel`) plus `vendor/marked.min.js`. Also leave `content-data.js` because some modules check `window.CONTENT` existence — but with no fragments loaded it'll be an empty registry, which is harmless.

The replacement block for the content-fragment scripts:

```html
<!-- Reuse content registry. Deger theme has no fragments yet; bookmarks/Cmd+K
     still work because they fall back to chapter+section sources. -->
<script src="../modules/content-data.js?v=1"></script>
```

(Originally there were 9 fragment script tags here; collapse to just `content-data.js`.)

- [ ] **Step 5.3: Verify `deger/book.html` loads (will show empty TOC since chapters/_index.json missing)**

Open `http://localhost:8772/deger/book.html`.
Expected DevTools console: a single `fetch('chapters/_index.json')` 404. The page itself loads (header, theme toggle, Cmd+K button) but TOC is empty. This is fine — fixed in Task 6.

- [ ] **Step 5.4: Commit**

```bash
git add deger/book.html
git commit -m "feat: add deger/book.html shell for 'Değer kavramının tarihi'

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: Write `deger/chapters/_index.json` with 12 pending chapter stubs

**Files:**
- Create: `deger/chapters/_index.json`

- [ ] **Step 6.1: Write the manifest**

Use the bölüm haritası from spec section 4. All chapters start at `status: pending` so the reader shows a placeholder (`reader.js` already handles this). The `estWords` and slug+title+subtitle come from the spec.

Create `deger/chapters/_index.json`:

```json
{
  "title": "Değer kavramının tarihi",
  "subtitle": "Aristoteles'ten Sen'e — emek-değer, marjinalizm, kapabiliteler",
  "chapters": [
    {
      "num": 1,
      "slug": "01-niye-deger",
      "title": "Niye \"değer\"?",
      "subtitle": "Terimin sorunu ve okumanın çerçevesi",
      "estWords": 3000,
      "status": "pending"
    },
    {
      "num": 2,
      "slug": "02-antik-temeller",
      "title": "Antik temeller",
      "subtitle": "Aristoteles ve adil değiş",
      "estWords": 3000,
      "status": "pending"
    },
    {
      "num": 3,
      "slug": "03-skolastik-fiyat",
      "title": "Skolastik fiyat doktrini",
      "subtitle": "Aquinas ve Salamanca okulu",
      "estWords": 3000,
      "status": "pending"
    },
    {
      "num": 4,
      "slug": "04-ibn-haldun-emek-deger",
      "title": "İbn Haldun ve emek-değer'in çekirdeği",
      "subtitle": "Mukaddime'de değerin kökeni",
      "estWords": 3500,
      "status": "pending"
    },
    {
      "num": 5,
      "slug": "05-smith-sentez",
      "title": "Smith'in büyük sentezi",
      "subtitle": "Wealth of Nations I.5-7",
      "estWords": 3500,
      "status": "pending"
    },
    {
      "num": 6,
      "slug": "06-ricardo-emek-deger",
      "title": "Ricardo ve emek-değer'in inceltilmesi",
      "subtitle": "Principles 1817",
      "estWords": 3500,
      "status": "pending"
    },
    {
      "num": 7,
      "slug": "07-marx-elestiri",
      "title": "Marx'ın eleştirisi",
      "subtitle": "Kapital I ve değerin iki yüzü",
      "estWords": 4000,
      "status": "pending"
    },
    {
      "num": 8,
      "slug": "08-avusturya-subjektif",
      "title": "Avusturya okulu ve sübjektif değer",
      "subtitle": "Menger 1871 ve Böhm-Bawerk",
      "estWords": 3500,
      "status": "pending"
    },
    {
      "num": 9,
      "slug": "09-marjinalist-devrim",
      "title": "Jevons ve Walras — marjinalist devrim",
      "subtitle": "Theory of Political Economy ve Eléments",
      "estWords": 3500,
      "status": "pending"
    },
    {
      "num": 10,
      "slug": "10-marshall-sentez",
      "title": "Marshall ve neoklasik sentez",
      "subtitle": "Principles 1890 — talep ve arz",
      "estWords": 3500,
      "status": "pending"
    },
    {
      "num": 11,
      "slug": "11-cambridge-sraffa",
      "title": "Cambridge controversy ve Sraffa",
      "subtitle": "Production of Commodities ve neo-Ricardyen okul",
      "estWords": 3500,
      "status": "pending"
    },
    {
      "num": 12,
      "slug": "12-sen-kapabiliteler",
      "title": "Sen, kapabiliteler ve değerin yeni anlamı",
      "subtitle": "Inequality Re-examined",
      "estWords": 3000,
      "status": "pending"
    }
  ]
}
```

- [ ] **Step 6.2: Smoke-test the deger reader**

Reload `http://localhost:8772/deger/book.html`.
Expected: TOC populates with all 12 chapter titles (faded because status: pending). Click chapter 1 → reader shows the "pending stub" placeholder text rendered by `reader.js` `renderPendingStub()` ("Bu bölüm henüz yazılmadı. Hedef uzunluk: ~3,000 kelime."). Click chapter 4 → similar placeholder with 3,500 word target. Cmd+K → opens palette.

- [ ] **Step 6.3: Commit**

```bash
git add deger/chapters/_index.json
git commit -m "feat: add deger chapter manifest (12 pending chapters)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 7: Extend `modules/command-palette.js` with theme-switch entries

**Files:**
- Modify: `modules/command-palette.js`

**Why now and not later:** with two themes live, the user wants to be able to hop between them without going back to the landing. This is the only behavioral change in 5A — everything else has been content/layout.

- [ ] **Step 7.1: Read `modules/command-palette.js` to find the sources array**

Open the file. Locate the function that assembles search sources (chapter headings, terminology terms, etc.). It's typically called `gatherSources()` or similar — search for where chapter titles get pushed in book mode.

- [ ] **Step 7.2: Add a `getThemeSwitchEntries()` helper and call it**

Add this helper near the other source-builders:

```javascript
function getThemeSwitchEntries() {
  const themes = window.MerkantilizmThemes;
  if (!Array.isArray(themes)) return [];
  const currentSlug = (location.pathname.split('/').filter(Boolean)[0] || '').toLowerCase();
  return themes
    .filter(t => t.slug !== currentSlug)
    .map(t => ({
      kind: 'theme',
      label: '→ ' + t.title,
      detail: t.subtitle,
      href: '../' + t.slug + '/book.html',
      // weight slightly lower than chapter/section hits so theme-switch
      // doesn't dominate when the user is searching within a book
      weight: 0.5,
    }));
}
```

Then in the function that concatenates all sources for the palette, append `...getThemeSwitchEntries()` to the array. The palette's existing renderer needs to handle `kind: 'theme'` — if it currently switches on a `kind` discriminator, add a case that uses `entry.label`, `entry.detail`, and navigates to `entry.href` on Enter. If the renderer is duck-typed (just reads `label`/`detail`/`href`), no additional change needed beyond adding the entries.

The `href` is relative to the current `book.html` (which lives in a theme subfolder), so `../<other-slug>/book.html` resolves correctly.

- [ ] **Step 7.3: Wire the registry script into both book.html files**

Edit `merkantilizm/book.html` and `deger/book.html`: add `<script src="../modules/theme-registry.js?v=1"></script>` immediately before the `<script src="../modules/command-palette.js?v=1"></script>` line in each. The palette needs the registry to be on `window` before it runs.

- [ ] **Step 7.4: Smoke-test theme-switch**

Open `http://localhost:8772/merkantilizm/book.html`, press Cmd+K, type "değer".
Expected: a "→ Değer kavramının tarihi" entry appears. Press Enter → navigates to `deger/book.html`. From there, Cmd+K → "merkantilizm" → enter → back to merkantilizm/book.html.

- [ ] **Step 7.5: Commit**

```bash
git add modules/command-palette.js merkantilizm/book.html deger/book.html
git commit -m "feat: Cmd+K theme switcher across themes

Reads window.MerkantilizmThemes (theme-registry.js) and surfaces a
'→ <other theme>' entry in the palette so a reader can hop between
books without going back to the landing.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 8: End-to-end smoke test + README update

**Files:**
- Modify: `README.md`

- [ ] **Step 8.1: Full smoke walk**

With `python3 serve.py` running:

1. Open `http://localhost:8772/` — landing renders both cards.
2. Click Merkantilizm card → book opens, chapter 4 reads correctly, footnotes expand, term tooltips appear.
3. From merkantilizm/book.html press Cmd+K → "değer" → Enter → lands on deger/book.html.
4. From deger/book.html → click chapter 7 → "pending" stub rendered, "Sonraki bölüm" link present.
5. Cmd+K on deger/book.html → "merkantilizm" → Enter → back to merkantilizm/book.html, chapter loading works.
6. Refresh deger/book.html → progress and current-chapter restored (localStorage works in theme subfolder).
7. Open `http://localhost:8772/merkantilizm/appendix/playground.html` → playground still renders concept map, timeline, terminology — confirming the appendix paths survived the hoist.

Any failure here is a Faz 5A blocker; fix before proceeding to Faz 5B.

- [ ] **Step 8.2: Update README.md to reflect multi-theme layout**

In `README.md`, replace the "Project structure" or equivalent section to describe `index.html` as the landing, `modules/styles/vendor` as shared, and `merkantilizm/`+`deger/` as theme subfolders. Add a "Themes" subsection listing current themes (read from spec section 5 for ordering of future ones, but mark them as "planned" not committed).

If `README.md` doesn't have these sections yet, add them. Keep the existing description of `kb-mcp/` and `sources/` unchanged.

- [ ] **Step 8.3: Commit Faz 5A closure**

```bash
git add README.md
git commit -m "docs: README reflects multi-theme layout + deger theme

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

**Faz 5A is now complete.** The repo has a landing, two theme folders share infrastructure cleanly, and the "Değer" book has a pending stub ready for content.

---

## Faz 5B — "Değer Kavramının Tarihi" Kitap Yazımı (özet milestone'lar)

Faz 5B is content-heavy and benefits from being executed milestone-by-milestone with user review after each chapter. Detail for each chapter is intentionally NOT pre-baked because the spec calls out that the chapter's structure emerges during MCP probing (step 2 of the per-chapter cycle). The pattern below is the same loop applied 12 times.

### Milestone 0: Kaynak temin (Faz 5B önkoşulu, ~8-10 saat)

**Goal:** Each primary text in `deger/`'s bibliography is indexed in kb-mcp.

- [ ] **Step 0.1: Inventory missing sources**

Run: `cd kb-mcp && .venv/bin/python -c "from src.server import list_sources; import json; print(json.dumps(list_sources({}), indent=2, ensure_ascii=False))" | grep -iE "(marx|menger|jevons|walras|marshall|sraffa|sen|ricardo)"`

Cross-check against spec section 4 "Eksik kaynaklar (eklenmesi gerekir)". Missing = needs to be downloaded.

- [ ] **Step 0.2: Acquire each missing PDF (public-domain first)**

For each missing primary author, find a public-domain edition (archive.org, gutenberg.org, Mises Institute for German→English translations). Place in `sources/primary/` or `sources/secondary/` per existing convention. Filename: `<author>-<short-title>-<year>.pdf` (e.g., `marx-kapital-bd1-1867.pdf`).

Telifli olanlar (Sraffa 1960, Sen 1992) için yalnızca alıntı yapacağımız bölümleri içeren temiz PDF — alıntılar fair-use ≤15 kelime kalır.

- [ ] **Step 0.3: Index each source**

Open `http://localhost:8772/merkantilizm/book.html`, click the reindex topbar indicator, switch to the "Yeniden indeksle" tab, run "BM25 + Semantik". Watch progress until each new source completes. Confirm via the "Kaynaklar" tab that author, year, title fields are populated (manually edit `kb-mcp/data/catalog.json` if auto-discovery missed something).

- [ ] **Step 0.4: Verify with a probe per source**

For each newly indexed source, run a single semantic search to confirm it's reachable. From a terminal:

```bash
curl -s -X POST http://127.0.0.1:8766/tools/semantic_search \
  -H 'Content-Type: application/json' \
  -d '{"query":"marginal utility","top_k":3,"source_filter":"jevons"}' | jq '.results | length'
```

Expected: ≥1. Repeat for each new author with a topic appropriate to that work.

- [ ] **Step 0.5: Commit catalog updates**

```bash
git add kb-mcp/data/catalog.json
git commit -m "data: index new primary sources for 'Değer' book (Marx, Menger, Jevons, Walras, Marshall, Sraffa, Sen, Ricardo)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

PDF binaries are excluded by `.gitignore` (`sources/**/*.pdf`); only the catalog metadata is versioned.

---

### Milestones 1–12: Per-chapter authoring cycle (~2-2.5 saat each)

Each chapter is one milestone. The same six-step loop runs for every chapter — only the chapter number, slug, and source emphasis change. **Author one chapter, get user review, then proceed to the next.** Do not draft multiple chapters in parallel; each shapes the next.

#### Per-chapter cycle (the spec section 4 process, encoded as concrete steps):

For chapter N with slug `NN-slug` (e.g., chapter 4 = `04-ibn-haldun-emek-deger`):

- [ ] **Step N.1: MCP keşif (~15 min)**

Run 3-5 semantic searches scoped to the chapter's primary authors. Capture top hits' page references. Example for chapter 7 (Marx):

```bash
curl -s -X POST http://127.0.0.1:8766/tools/semantic_search \
  -H 'Content-Type: application/json' \
  -d '{"query":"use value exchange value commodity","top_k":8,"source_filter":"marx"}'
```

Save the top 8-10 passages with their page numbers in a scratchpad (do not commit the scratchpad).

- [ ] **Step N.2: İskelet (~10 min)**

In a scratch document, list 8-10 H2 headings for the chapter, each with a one-sentence summary of what it argues. This is the chapter's skeleton — the order should be: problem framing → primary-source close reading → counter-arguments → connection to next chapter.

- [ ] **Step N.3: Yazma (~60-90 min)**

Create `deger/chapters/NN-slug.md` and write 3,000-3,500 words (per the chapter's `estWords` in `_index.json`). Conventions inherited from merkantilizm chapters:

- H1 is implicit (reader.js prepends the chapter title from manifest); the markdown starts with H2 sections.
- Footnotes use the custom `^[N]` syntax inline; definitions go at the bottom under `## Kaynakça` as `[^N]: <full citation>`.
- Blockquotes use markdown `>` syntax with the citation as the last `>` line, dash-prefixed (`> — Marx 1867, s. 49`).
- Each major claim gets at least one footnote. Aim for ≥5 footnotes and ≥3 blockquotes per chapter (verification gate).

- [ ] **Step N.4: Doğrulama (~15 min)**

Pick 3 quotes from the chapter at random and run `verify_claim`:

```bash
curl -s -X POST http://127.0.0.1:8766/tools/verify_claim \
  -H 'Content-Type: application/json' \
  -d '{"claim":"<exact quote text>","top_k":5}'
```

Expected verdict per quote: `supported` or `weak`. Any `no-evidence` verdict means the quote is either misattributed or the page number is wrong — fix the citation or drop the quote.

- [ ] **Step N.5: Render testi (~10 min)**

Reload `http://localhost:8772/deger/book.html#bolum/N`. Verify:
- Chapter renders with correct typography.
- All footnote refs are clickable; inline expand toggles cleanly.
- Term tooltips appear over any glossary terms (note: deger may need its own glossary later; for now, merkantilizm's 78-term dict is loaded if `terminology-dict.js` is included, otherwise terms just won't highlight — acceptable for now).
- Cmd+K → search for a quoted author → the chapter shows up.
- Scroll-spy: scrolling to section 3 updates the TOC highlight.

- [ ] **Step N.6: Manifest + commit (~5 min)**

In `deger/chapters/_index.json`, change chapter N's `"status": "pending"` to `"status": "draft"`. Update `estWords` only if the final draft significantly diverged from the target.

```bash
git add deger/chapters/NN-slug.md deger/chapters/_index.json
git commit -m "feat(deger): write chapter N — <short title>

~3,200 words; <N> footnotes, <N> blockquotes; primary sources: <list>.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

Then surface the chapter to the user for review before starting chapter N+1.

#### Chapter milestone sequence:

The spec doesn't mandate a write-order but the natural pedagogical flow is chapter 1 → 12 in numerical order. Authoring sequence:

| # | Slug | Primary sources | Pedagogical role |
|---|------|---|---|
| 1 | `01-niye-deger` | Aristoteles, Marx I.1 | Frame the problem: "value" has meant different things |
| 2 | `02-antik-temeller` | Aristoteles Nikomakhos V, Plato Devlet | Set the antique baseline |
| 3 | `03-skolastik-fiyat` | Aquinas Summa II-II, Salamanca | Just price and the medieval bridge |
| 4 | `04-ibn-haldun-emek-deger` | Mukaddime II/695, II/713 | Deep-dive on Merkantilizm Bölüm 8 |
| 5 | `05-smith-sentez` | WoN I.5-7 | The pivot — Smith reconciles |
| 6 | `06-ricardo-emek-deger` | Principles 1817 | The hardening of labor theory |
| 7 | `07-marx-elestiri` | Kapital I | The radical critique |
| 8 | `08-avusturya-subjektif` | Menger 1871, Böhm-Bawerk | The first marginalist axis |
| 9 | `09-marjinalist-devrim` | Jevons 1871, Walras Eléments | The marginalist sweep |
| 10 | `10-marshall-sentez` | Principles 1890 | Neoclassical reconciliation |
| 11 | `11-cambridge-sraffa` | Sraffa 1960 | The 20th-century controversy |
| 12 | `12-sen-kapabiliteler` | Sen 1992 | The contemporary turn |

After each chapter is committed, the user can choose to stop, continue, or re-order. If they stop after chapter 4, the book remains in `status: draft` for chapters 1-4 and `pending` for the rest — the reader handles both cleanly.

---

### Milestone 13: Faz 5B closure (end-to-end verification, ~2-3 hours)

- [ ] **Step 13.1: Source audit**

Pick 5 random quotes spanning all 12 chapters. Run `verify_claim` on each. At least 4 of 5 must return `supported`. Any `no-evidence` → fix or remove.

- [ ] **Step 13.2: Mobile readability check**

Use Chrome DevTools device toolbar (375px width). Open each of the 12 chapters. Confirm: TOC collapses to hamburger, body font is ≥16px, footnote expanders fit width, no horizontal scroll.

- [ ] **Step 13.3: Cross-theme integration check**

From `deger/book.html` chapter 12, press Cmd+K → "Mun" → expect a → Merkantilizm theme-switch hit. From `merkantilizm/book.html` chapter 8 (Ibn Haldun), Cmd+K → "değer" → expect → Değer theme-switch hit. (Cross-theme deep-linking to specific chapters is out of scope; only theme-level switching is verified.)

- [ ] **Step 13.4: Update theme-registry status**

In `modules/theme-registry.js`, change deger's `status: 'draft'` to `'completed'` once all 12 chapters are at least `status: 'draft'` in their manifest.

- [ ] **Step 13.5: Final commit + tag**

```bash
git add modules/theme-registry.js
git commit -m "feat: mark 'Değer' theme as completed in registry

All 12 chapters drafted; source audit passed; cross-theme navigation
verified.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git tag -a deger-v1 -m "First draft of Değer kavramının tarihi"
```

The "Değer" book is now usable end-to-end. The repo has a working two-theme layout; future themes follow the same pattern (Mülkiyet, Egemenlik, Adalet, etc. — see spec section 5).

---

## Self-Review

**Spec coverage check (against `2026-05-24-education-expansion-design.md`):**

| Spec section | Covered by |
|---|---|
| §1 Repo Mimarisi (modules/styles/vendor at root) | Task 1 (hoist) |
| §2 Landing page | Tasks 3-4 |
| §3 theme-registry.js | Task 2 |
| §4 "Değer" bölüm haritası (12 chapters) | Task 6 (manifest) + Milestones 1-12 |
| §4 Kaynak temin | Milestone 0 |
| §4 İçerik üretim akışı (6-step cycle) | Per-chapter cycle definition |
| §5 Sonraki temalar | Intentionally not in plan — spec calls them out as "öneri, taahhüt değil" |
| §6 Reused mevcut altyapı | Tasks 1 + 7 (hoist + palette extension) |
| §7 Doğrulama kriterleri | Milestone 13 |
| §8 Zaman çerçevesi | Tasks 1-8 = Faz 5A (~6-8 saat); Milestones 0-13 = Faz 5B (~35-40 saat) |
| §9 Kapsam dışı | Honored — no i18n, TTS, print export, interactive elements, or annotation system |
| §10 Riskler | Milestone 0 (source acquisition risk); per-chapter cycle (stuck-chapter risk via user review between milestones) |

**Placeholder scan:** No TBD/TODO markers in Faz 5A tasks. Faz 5B per-chapter cycle is intentionally template-driven (one cycle definition × 12 milestones) per the user's request — "her bölüm bir döngü, detay üretim sırasında." This is explicit by design, not a gap.

**Type/path consistency check:** `_index.json` schema (num, slug, title, subtitle, estWords, status) matches the merkantilizm version verbatim, so reader.js consumes it unchanged. The `status` enum (`completed`/`draft`/`pending`) is consistent across theme-registry.js and chapter manifests. `window.MerkantilizmThemes` is the property name used in both `theme-registry.js`, `index.html`, and `command-palette.js` getThemeSwitchEntries — confirmed.

**One nuance flagged for the executor:** Task 5 strips the merkantilizm-specific content-fragment scripts from `deger/book.html`. The deger theme starts with no terminology dictionary, which means `terminology.js` will run `decorate()` over chapter text but find no terms to highlight. This is intentional — a deger-specific glossary is a future enhancement, not a 5A blocker.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-24-education-deger-book.md`. Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task (Tasks 1-8 for Faz 5A), review between tasks, fast iteration. After Faz 5A you decide whether to proceed to Faz 5B and at what pace (one chapter milestone at a time, with user review after each).

**2. Inline Execution** — Execute Faz 5A tasks in this session using executing-plans, with checkpoints after Tasks 1 (hoist), 4 (landing live), and 7 (Cmd+K cross-theme). Faz 5B chapters proceed one-by-one with user review.

Which approach?
