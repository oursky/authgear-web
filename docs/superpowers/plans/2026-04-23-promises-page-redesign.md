# Promises Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the legacy Webflow-era `/promises` page with a minimal, standalone layout built from existing `ds-*` design system tokens.

**Architecture:** A single Astro component (`PromisesPage.astro`) rendered by both `src/pages/promises.astro` and `src/pages/zh-TW/promises.astro`. Three sections: a dark `ds-hero-banner` hero, a single-column numbered promises list, and the same inlined footer-form CTA used by the About page. Copy lives in the existing `Promises` namespace in `src/i18n/en.json` and `src/i18n/zh-TW.json`.

**Tech Stack:** Astro 5, existing `ds-*` CSS in `src/styles/authgear-design-system.css`, `@/i18n` helper `t()`, `@/lib/i18n` helper `localizedPath()`, `@/components/islands/ContactForm` React island.

**Spec:** `docs/superpowers/specs/2026-04-23-promises-page-redesign-design.md`

---

## Task 1: Add i18n keys

**Files:**
- Modify: `src/i18n/en.json` (the `Promises` block, currently around lines 367–370)
- Modify: `src/i18n/zh-TW.json` (the `Promises` block, currently around lines 367–370)

- [ ] **Step 1: Update `src/i18n/en.json`**

Replace the existing `"Promises": { ... }` block with:

```json
  "Promises": {
    "title": "Authgear Promises",
    "description": "The commitments we make to every Authgear customer.",
    "eyebrow": "Our commitments",
    "heroTitle": "Authgear Promises",
    "lede": "A short list of the things we commit to, and the things we don't.",
    "item1": "You own your code and data, not us.",
    "item2": "We won't lock you in from other vendors.",
    "item3": "We will do everything we can to achieve 100% uptime.",
    "item4": "We will never achieve 100% uptime, but when we fall short, we'll explain why and how we'll do better next time.",
    "footerTitle": "Get started with Authgear",
    "footerBody": "Talk to us about your authentication needs, or start building for free today."
  },
```

- [ ] **Step 2: Update `src/i18n/zh-TW.json`**

Replace the existing `"Promises": { ... }` block with the same shape, English placeholders (matches the current behavior — the legacy page renders English body for zh-TW):

```json
  "Promises": {
    "title": "Authgear Promises",
    "description": "The commitments we make to every Authgear customer.",
    "eyebrow": "Our commitments",
    "heroTitle": "Authgear Promises",
    "lede": "A short list of the things we commit to, and the things we don't.",
    "item1": "You own your code and data, not us.",
    "item2": "We won't lock you in from other vendors.",
    "item3": "We will do everything we can to achieve 100% uptime.",
    "item4": "We will never achieve 100% uptime, but when we fall short, we'll explain why and how we'll do better next time.",
    "footerTitle": "Get started with Authgear",
    "footerBody": "Talk to us about your authentication needs, or start building for free today."
  },
```

- [ ] **Step 3: Verify JSON is valid**

Run: `node -e "JSON.parse(require('fs').readFileSync('src/i18n/en.json','utf8')); JSON.parse(require('fs').readFileSync('src/i18n/zh-TW.json','utf8')); console.log('ok')"`
Expected: `ok`

- [ ] **Step 4: Commit**

```bash
git add src/i18n/en.json src/i18n/zh-TW.json
git commit -m "feat(promises): add i18n keys for redesigned page"
```

---

## Task 2: Rewrite `PromisesPage.astro`

**Files:**
- Modify (full rewrite): `src/components/pages/PromisesPage.astro`

- [ ] **Step 1: Replace the file contents**

Overwrite `src/components/pages/PromisesPage.astro` with:

```astro
---
import { t } from '@/i18n';
import ContactForm from '@/components/islands/ContactForm';

interface Props { locale: string }
const { locale } = Astro.props;

const items = [
  t(locale, 'Promises.item1'),
  t(locale, 'Promises.item2'),
  t(locale, 'Promises.item3'),
  t(locale, 'Promises.item4'),
];
---

<div class="page-wrapper">
  <!-- SECTION: Hero -->
  <section class="ds-hero-banner--dark">
    <div class="ds-container ds-container--hero">
      <div class="ds-hero-banner__row">
        <div class="ds-hero-banner__body">
          <p class="ds-section-eyebrow promises-hero__eyebrow">{t(locale, 'Promises.eyebrow')}</p>
          <h1 class="ds-hero-banner__title">{t(locale, 'Promises.heroTitle')}</h1>
          <p class="ds-hero-banner__description">{t(locale, 'Promises.lede')}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION: Promises list -->
  <section class="ds-section">
    <div class="ds-container">
      <ol class="promises-list" role="list">
        {items.map((text, i) => (
          <li class="promises-list__item">
            <span class="promises-list__num" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p class="promises-list__text">{text}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>

  <!-- SECTION: Footer Form (matches About page) -->
  <div class="footer-form-section form__bg-dark">
    <div class="container-default">
      <div class="container-default-inner px-0">
        <div class="_2-block-flex footer-form">
          <div class="_2-block-flex-content footer-form">
            <div class="_2-block-flex-content-text-wrap footer-form">
              <h2 class="form-heading color-white footer-form">{t(locale, 'Promises.footerTitle')}</h2>
              <div class="footerform__divider-sm"></div>
              <div class="color-white footer-get-started-text">{t(locale, 'Promises.footerBody')}</div>
            </div>
          </div>
          <div class="_2-block-flex-image footer-form">
            <ContactForm client:load />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .promises-hero__eyebrow {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 0.75rem;
  }
  .promises-list {
    list-style: none;
    padding: 0;
    margin: 0 auto;
    max-width: 720px;
    display: flex;
    flex-direction: column;
  }
  .promises-list__item {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1.5rem;
    align-items: baseline;
    padding: 2rem 0;
    border-bottom: 1px solid rgba(62, 79, 111, 0.15);
  }
  .promises-list__item:last-child {
    border-bottom: none;
  }
  .promises-list__num {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.9375rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: #6366f1;
    line-height: 1.4;
  }
  .promises-list__text {
    margin: 0;
    font-size: 1.375rem;
    line-height: 1.5;
    color: #0f172a;
    font-weight: 500;
  }
  @media (max-width: 640px) {
    .promises-list__item {
      padding: 1.5rem 0;
      gap: 1rem;
    }
    .promises-list__text {
      font-size: 1.125rem;
    }
  }
</style>
```

- [ ] **Step 2: Type-check / build**

Run: `npm run build`
Expected: build succeeds, produces `dist/client` and `dist/server`. No TS errors.

If `npm run build` fails because `t(locale, 'Promises.xxx')` cannot be found, re-check Task 1's JSON — the keys must be saved before this task builds.

- [ ] **Step 3: Visual check via dev server**

Run `npm run dev` in the worktree (background). Open:
- `http://localhost:4321/promises`
- `http://localhost:4321/zh-TW/promises`

Confirm:
- Dark hero with eyebrow + title + lede renders
- Four numbered promises with hairline dividers between them, no divider after the last
- Footer contact-form section renders with the contact form island
- No console errors
- Mobile viewport (≤640px) — numerals and text reflow cleanly

Stop the dev server when done.

- [ ] **Step 4: Commit**

```bash
git add src/components/pages/PromisesPage.astro
git commit -m "feat(promises): rewrite page with ds-* hero, numbered list, and footer CTA"
```

---

## Task 3: Final build verification

**Files:**
- None (verification only)

- [ ] **Step 1: Clean build**

Run: `npm run build`
Expected: succeeds with no errors.

- [ ] **Step 2: Confirm legacy classes are gone**

Run: `git grep -n "container-medium-761px\|inner-page-hero\|split-content cta-left\|split-content cta-right" src/components/pages/PromisesPage.astro`
Expected: no matches (empty output, non-zero exit).

- [ ] **Step 3: Confirm branch is ready**

Run: `git log --oneline main..HEAD`
Expected: three commits — spec, i18n keys, page rewrite (the spec commit from brainstorming plus the two new commits from Tasks 1–2).

No final commit needed — this task is verification only.

---

## Out of scope (do NOT do)

- Do not add Playwright or Vitest tests for this page. The spec explicitly excludes them — this page has no interactive behavior beyond the shared contact form.
- Do not modify `src/pages/promises.astro` or `src/pages/zh-TW/promises.astro`. They already pass `locale` to `PromisesPage` and need no change.
- Do not modify the About page, shared nav, or any `ds-*` CSS. If a style token seems missing, add a scoped style inside the component (as Task 2 already does for `.promises-list*`).
- Do not touch other i18n namespaces. Only the `Promises` block changes.
