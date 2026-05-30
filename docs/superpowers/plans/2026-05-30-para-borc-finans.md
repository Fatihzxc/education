# Para, Borç ve Finans Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `Para, Borç ve Finans` theme as a readable long-form book, from basic concepts to advanced contemporary finance.

**Architecture:** Reuse the existing static book shell. Add a new `para-borc-finans/` folder with `book.html`, a 12-chapter manifest, and Markdown chapters. Promote the theme from planned placeholder data into `MerkantilizmThemes`. Chapters must feel like a philosophy book: each one builds assumptions, shows reasoning, and lands on an argument.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript registry, Markdown chapters rendered by the existing reader, Node built-in tests.

---

### Task 1: Red Test

**Files:**
- Modify: `tools/navigation-pages.test.mjs`

- [x] Add a failing test that requires `para-borc-finans` to exist as a readable staged book.
- [x] Run `node --test tools/navigation-pages.test.mjs` and verify it fails because the registry and manifest are missing.

### Task 2: Design Spec

**Files:**
- Create: `docs/superpowers/specs/2026-05-30-para-borc-finans-design.md`

- [x] Record the integrated-book decision.
- [x] Define the 12-chapter progression from basic money to digital finance.
- [x] Preserve `AGENTS.md` requirements: warm Turkish, root cause, counter-reading, public-eye lens, and advanced layer.

### Task 3: Book Shell

**Files:**
- Create: `para-borc-finans/book.html`
- Create: `para-borc-finans/chapters/_index.json`

- [x] Copy the existing book shell pattern.
- [x] Set title, meta description, sidebar links, and theme label.
- [x] Add 12 chapter entries with stable slugs and promote them to `completed` status after the wisdom-depth pass.

### Task 4: Chapter Content

**Files:**
- Create: `para-borc-finans/chapters/01-niye-para-borc-finans.md`
- Create: `para-borc-finans/chapters/02-paranin-en-basit-hali.md`
- Create: `para-borc-finans/chapters/03-borc-gelecegin-bugune-baglanmasi.md`
- Create: `para-borc-finans/chapters/04-faiz-zamanin-fiyati-mi.md`
- Create: `para-borc-finans/chapters/05-antik-dunya-sikke-borc-affi.md`
- Create: `para-borc-finans/chapters/06-din-ahlak-riba.md`
- Create: `para-borc-finans/chapters/07-erken-modern-devlet-kredisi.md`
- Create: `para-borc-finans/chapters/08-bankalar-merkez-bankalari.md`
- Create: `para-borc-finans/chapters/09-kapitalizm-finansallasma.md`
- Create: `para-borc-finans/chapters/10-krizler-1929-1971-2008.md`
- Create: `para-borc-finans/chapters/11-osmanli-turkiye-hatti.md`
- Create: `para-borc-finans/chapters/12-bugun-kart-konut-kripto.md`

- [x] Each chapter starts from the basic idea and increases complexity.
- [x] Each chapter includes `Temel varsayım`.
- [x] Each chapter includes `Akıl yürütme`.
- [x] Each chapter includes `Bölümün argümanı`.
- [x] Each chapter includes `Kök sebep ve karşı okuma`.
- [x] Each chapter includes `İleri düzey okuma`.
- [x] Each chapter includes at least one reader-facing concrete example.

### Task 5: Registry and Roadmap

**Files:**
- Modify: `modules/theme-registry.js`
- Modify: `docs/superpowers/themes-roadmap-2026-05-24.md`

- [x] Add `para-borc-finans` to `MerkantilizmThemes`.
- [x] Remove `para-borc-finans` from `MerkantilizmPlannedThemes`.
- [x] Note that the theme has moved from planned to completed book.

### Task 6: Wisdom-Depth Review

**Files:**
- Create: `docs/superpowers/reviews/2026-05-30-para-borc-finans-bilgelik-review.md`
- Modify: `tools/navigation-pages.test.mjs`
- Modify: all `para-borc-finans/chapters/*.md`

- [x] Review the first draft against the user's "bilgelik seviyesi" requirement.
- [x] Add test coverage for the wisdom layers.
- [x] Add `Yanlış sezgi` to every chapter.
- [x] Add `Tarihsel sahne` to every chapter.
- [x] Add `Bilgelik sorusu` to every chapter.
- [x] Add `Bugüne bakan sonuç` to every chapter.
- [x] Require each chapter to cross a minimum depth threshold of 1000 words.
- [x] Promote `para-borc-finans` to `completed` + `main` after the user accepted the completed state.

### Task 7: Verification

**Files:**
- Verify: `tools/navigation-pages.test.mjs`
- Verify: `para-borc-finans/book.html`

- [x] Run `node --test tools/navigation-pages.test.mjs`.
- [x] Run a content audit that all 12 chapter files contain required section headings.
- [x] Load `http://127.0.0.1:8772/para-borc-finans/book.html#bolum/1` in the browser and check title, nonblank content, and console health.
