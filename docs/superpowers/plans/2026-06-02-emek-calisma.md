# Emek ve Çalışma Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `Emek ve Çalışma` theme as a completed long-form wisdom-depth book.

**Architecture:** Reuse the existing static book shell and reader. Add `emek-calisma/` with a completed 12-chapter manifest and Markdown chapters. Promote the theme from planned placeholder data into completed main themes.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript registry, Markdown rendered by existing reader, Node built-in tests.

---

### Task 1: Regression Test

**Files:**
- Modify: `tools/navigation-pages.test.mjs`

- [x] Require `MerkantilizmThemes.length` to include Emek.
- [x] Require `emek-calisma/book.html` to expose the top `Ana menü` link.
- [x] Require Emek to be `completed` + `main`, with 12 completed chapters.
- [x] Require all Emek chapters to include the philosophical and wisdom headings.
- [x] Run `node --test tools/navigation-pages.test.mjs` and confirm it fails because Emek files are missing.

### Task 2: Book Shell and Manifest

**Files:**
- Create: `emek-calisma/book.html`
- Create: `emek-calisma/chapters/_index.json`

- [x] Add the standard book shell with Emek title, meta description, sidebar links, and `Ana menü`.
- [x] Add 12 stable chapter slugs.
- [x] Mark all chapters `completed`.

### Task 3: Chapter Content

**Files:**
- Create: `emek-calisma/chapters/01-niye-emek-calisma.md`
- Create: `emek-calisma/chapters/02-antik-dunya-emek-kolelik.md`
- Create: `emek-calisma/chapters/03-toprak-serflik-angarya.md`
- Create: `emek-calisma/chapters/04-loncalar-zanaat-emegi.md`
- Create: `emek-calisma/chapters/05-ilkel-birikim-zorla-emek.md`
- Create: `emek-calisma/chapters/06-smith-is-bolumu-verimlilik.md`
- Create: `emek-calisma/chapters/07-marx-yabancilasma-arti-deger.md`
- Create: `emek-calisma/chapters/08-taylor-ford-zaman-disiplini.md`
- Create: `emek-calisma/chapters/09-polanyi-emek-meta-mi.md`
- Create: `emek-calisma/chapters/10-bakim-emegi-feminist-iktisat.md`
- Create: `emek-calisma/chapters/11-sendika-sosyal-devlet-guvencesizlik.md`
- Create: `emek-calisma/chapters/12-platform-yapay-zeka-gelecek.md`

- [x] Each chapter starts from the basic idea and increases complexity.
- [x] Each chapter includes `Temel varsayım`, `Akıl yürütme`, `Bölümün argümanı`, `Kök sebep ve karşı okuma`, and `İleri düzey okuma`.
- [x] Each chapter includes `Yanlış sezgi`, `Tarihsel sahne`, `Bilgelik sorusu`, and `Bugüne bakan sonuç`.
- [x] Each chapter has at least 1000 words and no placeholder text.

### Task 4: Registry and Roadmap

**Files:**
- Modify: `modules/theme-registry.js`
- Modify: `docs/superpowers/themes-roadmap-2026-05-24.md`

- [x] Add `emek-calisma` to `MerkantilizmThemes` as `completed` + `main`.
- [x] Remove `emek-calisma` from `MerkantilizmPlannedThemes`.
- [x] Update roadmap status and planned theme wording.

### Task 5: Verification

**Files:**
- Verify: `tools/navigation-pages.test.mjs`
- Verify: `emek-calisma/book.html`

- [x] Run `node --test tools/navigation-pages.test.mjs`.
- [x] Run a content audit for all 12 chapter files.
- [x] Run `git diff --check`.
- [x] Load `http://127.0.0.1:8772/emek-calisma/book.html#bolum/1` in the browser and check nonblank content plus console health.

### Task 6: Second-Pass Content Depth

**Files:**
- Modify: `emek-calisma/chapters/*.md`
- Modify: `docs/superpowers/reviews/2026-06-02-emek-calisma-bilgelik-review.md`

- [x] Add source/anchor author cues into chapter bodies, not only roadmap metadata.
- [x] Add Osmanlı-Türkiye labor context to the land, guild, and union/social-state chapters.
- [x] Add mini-case anchors for Polanyi, Fordism, platform work, data labor, and care work.
- [x] Preserve the warm explanatory voice and required wisdom headings.
