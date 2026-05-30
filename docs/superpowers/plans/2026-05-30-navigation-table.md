# Navigation Table Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the landing page into a reading desk while moving the full book and roadmap inventory to a filterable library page.

**Architecture:** Keep `modules/theme-registry.js` as the source for readable books, add separate planned-theme and pane datasets to avoid broken `slug/book.html` links, render the homepage from curated subsets, and render `library.html` from the full datasets. Use a small Node smoke test to enforce the page contract.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node built-in test runner.

---

### Task 1: Navigation Contract Test

**Files:**
- Create: `tools/navigation-pages.test.mjs`
- Test: `node --test tools/navigation-pages.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';

async function loadRegistry() {
  const source = await readFile(new URL('../modules/theme-registry.js', import.meta.url), 'utf8');
  const context = {
    window: {},
    console: { log() {} },
  };
  vm.runInNewContext(source, context, { filename: 'theme-registry.js' });
  return context.window;
}

test('registry separates readable books, pane shortcuts, and planned themes', async () => {
  const registry = await loadRegistry();
  assert.equal(registry.MerkantilizmThemes.length, 8);
  assert.ok(Array.isArray(registry.MerkantilizmPaneShortcuts));
  assert.ok(Array.isArray(registry.MerkantilizmPlannedThemes));
  assert.ok(registry.MerkantilizmPlannedThemes.length >= 5);
  assert.ok(registry.MerkantilizmPlannedThemes.every((theme) => !theme.href));
});
```

- [ ] **Step 2: Verify the test fails**

Run: `node --test tools/navigation-pages.test.mjs`
Expected: FAIL because planned themes and pane shortcuts are not yet exported by `theme-registry.js`.

### Task 2: Shared Navigation Data

**Files:**
- Modify: `modules/theme-registry.js`
- Test: `node --test tools/navigation-pages.test.mjs`

- [ ] **Step 1: Add `homeGroup` to readable themes**

Set completed core books to `homeGroup: 'main'`, atlas/map books to `homeGroup: 'start'`, and draft continuation books to `homeGroup: 'continue'`.

- [ ] **Step 2: Export pane shortcuts and planned themes**

Move the landing pane data into `window.MerkantilizmPaneShortcuts` and add planned theme stubs with `question`, `root`, `dominant`, `counter`, `publicEye`, and `plannedChapters`.

- [ ] **Step 3: Run the contract test**

Run: `node --test tools/navigation-pages.test.mjs`
Expected: PASS.

### Task 3: Reading Desk Homepage

**Files:**
- Modify: `index.html`
- Modify: `styles/landing.css`
- Test: `node --test tools/navigation-pages.test.mjs`

- [ ] **Step 1: Replace all-theme grid with curated sections**

Render `Okumaya başla`, `Ana kitaplar`, `Devam edilenler`, `Atlas pane mini kitapları`, and compact `Planlanan temalar`.

- [ ] **Step 2: Keep detail content one click away**

On homepage cards, show short summaries only. Full root/counter/public-eye detail belongs on `library.html`.

- [ ] **Step 3: Update footer navigation**

Link to `library.html` as the full catalog and keep `roadmap.html` for the long roadmap document.

### Task 4: Filterable Library Page

**Files:**
- Create: `library.html`
- Modify: `styles/landing.css`
- Test: `node --test tools/navigation-pages.test.mjs`

- [ ] **Step 1: Build status filters**

Provide segmented buttons for all, completed, draft, planned, and pane entries.

- [ ] **Step 2: Render full detail cards**

Show root cause, dominant view, counter idea, public-eye lens, and links when available. Planned themes must not render broken book links.

- [ ] **Step 3: Verify filter interaction**

Use rendered frontend validation to click the filters and confirm visible counts change.

### Task 5: Rendered QA

**Files:**
- Verify: `index.html`
- Verify: `library.html`
- Verify: `roadmap.html`

- [ ] **Step 1: Start the no-cache server**

Run: `python serve.py`
Expected: local server serves the static pages.

- [ ] **Step 2: Browser or Playwright checks**

Open homepage and library. Verify page identity, nonblank content, console health, desktop screenshot, mobile screenshot, and one filter interaction.

- [ ] **Step 3: Final verification**

Run: `node --test tools/navigation-pages.test.mjs`
Expected: PASS.
