# SVG-Card Tailwind/Webflow Collision Reset Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the page-scoped fix on `SingleSignOnPage.astro` with one global, unlayered CSS reset so Tailwind v4's auto-generated `.size-N` utilities can no longer clamp the width/height of Webflow card-text elements anywhere on the site.

**Architecture:** The site loads Tailwind v4 (`@import 'tailwindcss'`) and a vendored Webflow stylesheet side by side. Tailwind emits a standalone `.size-18 { width/height }` utility; Webflow only uses `size-18` as a combo-class *label* inside compound font-size selectors (`.svg-card-content-title.….size-18 { font-size }`) and never sets a box. The Tailwind utility therefore clamps card titles/descriptions, wrapping each word onto its own line. The fix is a single unlayered rule in `authgear-design-system.css` that resets `width`/`height` to `auto` on the four Webflow card-text classes; because it is unlayered it wins over Tailwind's `@layer utilities` without `!important`. A Playwright spec locks the behaviour in using the biometric page (which carries the unfixed collision in a hidden section) as the regression witness.

**Tech Stack:** Astro 6, Tailwind CSS v4, vendored Webflow CSS (`public/css/authgear-new.webflow.css`), Playwright (`@playwright/test`, chromium project, baseURL `http://localhost:4321`, dev server auto-started by the test runner).

---

## File Structure

| File | Responsibility | Change |
|---|---|---|
| `tests/svg-card-text-collision.spec.ts` | Playwright regression test proving the global reset reaches every card-text element (witness: biometric page) and that SSO still renders full-width | Create |
| `src/styles/authgear-design-system.css` | Site-wide design-system CSS, imported (unlayered) after Tailwind via `global.css`. Home of the new collision reset | Modify (insert before the `SVG card padding in ds-grids` section, ~line 1508) |
| `src/components/pages/features/SingleSignOnPage.astro` | SSO marketing page. Currently holds chpapa's page-scoped `<style>` patch, now made redundant by the global reset | Modify (delete the scoped `<style>` block, lines 7–16) |
| `docs/tool-pages.md` | Tool-page authoring guide; already documents Webflow-leak resets. Gains a sibling note for the reverse (Tailwind→Webflow) collision | Modify (insert before `### Library choices`) |

---

## Setup

- [ ] **Create the feature branch** (do not work on `main`; do not push to `live`)

```bash
cd /Users/fung/dev/authgear-web
git checkout main && git pull --ff-only
git checkout -b fix/svg-card-tailwind-collision
```

---

### Task 1: Failing regression test for the global reset

**Files:**
- Test: `tests/svg-card-text-collision.spec.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/svg-card-text-collision.spec.ts` with exactly:

```ts
import { test, expect } from '@playwright/test';

// Tailwind v4 emits a standalone `.size-N { width/height }` utility. Webflow uses
// those same names only as font-size combo-class labels on card text, so the Tailwind
// utility clamps `.svg-card-content-*` boxes and wraps the text one word per line.
// The global reset lives (unlayered) in src/styles/authgear-design-system.css.
test.describe('svg-card text — Tailwind .size-N collision reset', () => {
  test('biometric page: .size-22 card title is not clamped (width:auto)', async ({ page }) => {
    // Trailing slash is required: astro.config.mjs sets `trailingSlash: 'always'`,
    // so the no-slash form 404s under `astro dev` (the Playwright webServer).
    await page.goto('/features/biometric-authentication/');
    const width = await page
      .locator('.svg-card-content-title.size-22')
      .first()
      .evaluate((el) => getComputedStyle(el).width);
    // Before the reset the Tailwind utility resolves this to "88px" (22 × 4px).
    expect(width).toBe('auto');
  });

  test('single-sign-on page: .size-18 step card title renders full width', async ({ page }) => {
    await page.goto('/features/single-sign-on/');
    const boxWidth = await page
      .locator('.svg-card-content-title.size-18')
      .first()
      .evaluate((el) => el.getBoundingClientRect().width);
    // Clamped state is ~72px (18 × 4px); full-width step cards measure 300px+.
    expect(boxWidth).toBeGreaterThan(200);
  });
});
```

- [ ] **Step 2: Run the test to verify the biometric case fails**

Run: `npx playwright test tests/svg-card-text-collision.spec.ts --project=chromium`
Expected: the runner auto-starts `astro dev` on 4321, then:
- `biometric page: .size-22 card title is not clamped (width:auto)` → **FAIL**, `expect(received).toBe('auto')` / `Received: "88px"`.
- `single-sign-on page: .size-18 step card title renders full width` → **PASS** (SSO is still covered by chpapa's scoped patch at this point).

1 failed, 1 passed.

- [ ] **Step 3: Commit the failing test**

```bash
git add tests/svg-card-text-collision.spec.ts
git commit -m "test(features): regression test for Tailwind .size-N svg-card collision"
```

---

### Task 2: Add the global, unlayered reset

**Files:**
- Modify: `src/styles/authgear-design-system.css` (insert immediately before the `/* SVG card padding in ds-grids` comment block, ~line 1508)

- [ ] **Step 1: Insert the reset block**

In `src/styles/authgear-design-system.css`, find this existing block start:

```css
/*
 * SVG card padding in ds-grids: Webflow `authgear-new.webflow.css` has unlayered `.svg-card { padding: 48px 32px }`,
```

Insert the following **immediately before** it (keeping a blank line between the new block and the existing comment):

```css
/*
 * Tailwind v4 ↔ Webflow class-name collision reset.
 *
 * Tailwind v4 auto-generates standalone `.size-N` utilities (`width`/`height`).
 * Webflow reuses those same names (`size-14/18/22`) only as combo-class *labels*
 * inside compound font-size selectors on card text (e.g.
 * `.svg-card-content-title.inter.color-2e2e2e.size-18 { font-size }`) — it never
 * sets width/height. The Tailwind utility therefore clamps card titles/descriptions
 * to a tiny box, wrapping every word onto its own line. Reset width/height here —
 * unlayered, so it beats Tailwind's `@layer utilities` without `!important`.
 *
 * See docs/tool-pages.md "Tailwind-vs-Webflow utility collisions".
 */
.svg-card-content-title,
.svg-card-content-description,
.tools-svg-card-content-title,
.tools-svg-card-content-description {
  width: auto;
  height: auto;
}
```

(Placement matters: this region of the file is unlayered — confirm the new block is **not** nested inside any `@layer { … }` brace. The adjacent `SVG card padding` block is also unlayered, so inserting before it is correct.)

- [ ] **Step 2: Run the test to verify the biometric case now passes**

Run: `npx playwright test tests/svg-card-text-collision.spec.ts --project=chromium`
Expected: 2 passed. The biometric `.size-22` title now resolves to `width: auto`; SSO still > 200px.

- [ ] **Step 3: Commit the reset**

```bash
git add src/styles/authgear-design-system.css
git commit -m "fix(css): globally reset Tailwind .size-N width/height on Webflow svg-card text"
```

---

### Task 3: Remove the now-redundant page-scoped patch

**Files:**
- Modify: `src/components/pages/features/SingleSignOnPage.astro` (delete the scoped `<style>` block, lines 7–16)

- [ ] **Step 1: Delete the scoped `<style>` block**

In `src/components/pages/features/SingleSignOnPage.astro`, delete this entire block (it sits between the closing frontmatter `---` and the first `<div class="featurespage__hero_v2 …">`):

```html
<style>
  /* Tailwind v4 .size-N utilities set width/height which collides with Webflow's use
     of these class names as font-size/icon-size modifiers on svg-card elements. Reset them. */
  .svg-card-content-title.size-18,
  .svg-card-content-title.size-22,
  .svg-card-content-description.size-14 {
    width: auto;
    height: auto;
  }
</style>
```

After deletion, the closing frontmatter `---` is immediately followed by `<div class="featurespage__hero_v2 featurespage__hero_bg">`.

- [ ] **Step 2: Run the test to verify SSO is still full-width via the global reset**

Run: `npx playwright test tests/svg-card-text-collision.spec.ts --project=chromium`
Expected: 2 passed. (The SSO `.size-18` title stays > 200px — now covered by the global reset instead of the deleted scoped style. This is the proof the scoped patch was redundant.)

- [ ] **Step 3: Commit the cleanup**

```bash
git add src/components/pages/features/SingleSignOnPage.astro
git commit -m "refactor(features): drop SSO page-scoped svg-card reset, now global"
```

---

### Task 4: Document the collision pattern

**Files:**
- Modify: `docs/tool-pages.md` (insert before `### Library choices`)

- [ ] **Step 1: Add the documentation subsection**

In `docs/tool-pages.md`, find this line:

```markdown
### Library choices
```

Insert the following **immediately before** it (with a blank line separating the new content from `### Library choices`):

```markdown
#### Tailwind-vs-Webflow utility collisions

Distinct from the Webflow-leak resets above — this is the *reverse* direction. **Tailwind v4 auto-generates utilities whose names collide with Webflow combo-class labels.** The known offender is `.size-N`: Tailwind emits a standalone `.size-18 { width/height }`, while Webflow uses `size-18` only as one chained class inside a font-size selector (`.svg-card-content-title.….size-18 { font-size }`). The Tailwind utility then clamps the element's box and wraps card text one word per line.

These will **not** show up in the `^\.${c} {` collision-check grep above, because the leak source is Tailwind, not `webflow.css`. The fix lives globally in `src/styles/authgear-design-system.css` (unlayered, so it wins over Tailwind's `@layer utilities`):

```css
.svg-card-content-title, .svg-card-content-description,
.tools-svg-card-content-title, .tools-svg-card-content-description { width: auto; height: auto; }
```

If a new Webflow combo class collides with a *different* Tailwind utility (same name, different property), add a matching reset alongside it. If such collisions become frequent, the structural fix is a Tailwind prefix (`@import "tailwindcss" prefix(tw);`), which costs a one-time rewrite of every existing Tailwind class in the React islands.
```

- [ ] **Step 2: Commit the docs**

```bash
git add docs/tool-pages.md
git commit -m "docs(tool-pages): document Tailwind-vs-Webflow utility collision + reset"
```

---

### Task 5: Final verification

**Files:** none (verification only)

- [ ] **Step 1: Type-check**

Run: `npm run check`
Expected: `0 errors` (warnings, if any, unchanged from baseline).

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: build completes, `dist/` emitted, no errors.

- [ ] **Step 3: Run the new collision spec (covers SSO + biometric)**

Run: `npx playwright test tests/svg-card-text-collision.spec.ts --project=chromium`
Expected: 2 passed.

> Note: do **not** add `tests/phase2c3-features.spec.ts` here. That suite uses no-trailing-slash URLs and only passes in CI against a built environment; under `astro dev` (the Playwright webServer) it 404s due to `trailingSlash: 'always'`. That is a pre-existing discrepancy unrelated to this change. The global reset only touches `width/height` on four card-text classes, so sibling-page regression risk is covered by the build (Step 2) plus the visual check (Step 4).

- [ ] **Step 4: Manual visual confirmation (one screenshot)**

Open `http://localhost:4321/features/single-sign-on/` (trailing slash) at a 1512px-wide viewport. Confirm:
- "How OIDC-Based SSO Works?" shows 6 numbered cards with full, readable, multi-word-per-line titles (not one word per line).
- "OIDC-Based SSO" and "Why Authgear?" sections remain image+text side-by-side.

- [ ] **Step 5: Push the branch (do not open the PR or touch `live` until the user says so)**

```bash
git push fork fix/svg-card-tailwind-collision
```

Then stop and report. Per repo convention, open the PR with `gh pr create --repo oursky/authgear-web --head fungc-io:fix/svg-card-tailwind-collision --base main` only after the user gives the go-ahead.

---

## Self-Review

**1. Spec coverage** — The request was "implement #1": (a) the global reset → Task 2; (b) remove the redundant SSO scoped patch → Task 3; (c) the doc note distinguishing this from the existing Webflow-leak pattern → Task 4; (d) verification incl. the latent biometric occurrence → Task 1 (witness) + Task 5. The four card-text classes in the reset cover both the marketing pages (`.svg-card-content-*`, used on `SingleSignOnPage.astro` and the hidden biometric section) and the tool-page React variants (`.tools-svg-card-content-*`, used in `MoreDevTools.tsx` / `ToolFeatureCards.tsx`). All covered.

**2. Placeholder scan** — No TBD/TODO/"handle edge cases"/"similar to". Every code step shows complete, paste-ready content and every command states its expected output.

**3. Type/identifier consistency** — The four selector names (`.svg-card-content-title`, `.svg-card-content-description`, `.tools-svg-card-content-title`, `.tools-svg-card-content-description`) are identical across the reset (Task 2), the docs snippet (Task 4), and the test selectors (`.svg-card-content-title.size-22` / `.size-18`, Task 1). The spec filename `tests/svg-card-text-collision.spec.ts` is identical in Tasks 1, 2, 3, and 5. Test command and `--project=chromium` flag consistent throughout.

**Safety note verified during planning:** a grep of `public/css/authgear-new.webflow.css` for `width`/`height` declarations on `.svg-card-content-*` / `.tools-svg-card-content-*` returned only `line-height-*` matches — Webflow never sets a deliberate box on these text elements, so resetting `width/height: auto` cannot remove an intended dimension. If a future audit finds one, narrow the selectors to the `…[class*="size-"]` variants instead of the bare classes.
