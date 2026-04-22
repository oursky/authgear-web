# Astro Migration — Phase 2d-1: SMS Cost Calculator Island

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port `SmsCostCalculator` as a React island, replace the Phase 2c-2 `data-placeholder="SmsCostCalculator"` stub on `/solutions/reduce-sms-otp-cost`, and verify the calculator works end-to-end. Unblocks the only remaining placeholder in the Astro build.

**Architecture:** `SmsCostCalculator` is a complex React component (344 LOC, stateful, uses `useTranslations`, `useMemo`, `useRef`). It becomes a React island at `src/components/islands/sms-calculator/SmsCostCalculator.tsx` with `client:visible` hydration (it's below the fold on `/solutions/reduce-sms-otp-cost`, not above the hero). The component is adapted to take `locale` as a prop and call the Phase 1 `t(locale, key)` helper instead of `useTranslations`. `PlausibleButton` / `PlausibleLink` usages convert to class-based tracking (`plausible-event-name--*`) matching the pattern established in Phases 1/2a.

**Tech Stack:** Same as prior phases. No new dependencies.

**References:**
- `docs/ARCHITECTURE-ASTRO.md`
- `docs/superpowers/plans/2026-04-21-astro-phase2c2-solutions.md` — Task 4 introduced the stub
- `docs/superpowers/plans/2026-04-21-astro-phase2a-islands.md` — established the React-island pattern (ContactForm / LogoMarquee)

**What this phase does NOT do:** port tools pages (Phase 2d-2).

**Exit criteria:**

1. `npm run build` succeeds; `/solutions/reduce-sms-otp-cost` prerenders without the placeholder div
2. `npm test` — at least 108 passed (107 existing + 1 new calculator-hydration test; the stub-present assertion from Phase 2c-2 is updated to assert the calc exists)
3. Manual verification: at `/solutions/reduce-sms-otp-cost`, the calculator mounts on scroll, country dropdown works, sliders update results
4. zh-TW version at `/zh-TW/solutions/reduce-sms-otp-cost` shows translated labels

---

## File structure (new / modified)

```
frontend-astro/
├── src/
│   ├── components/
│   │   ├── islands/
│   │   │   └── sms-calculator/
│   │   │       ├── SmsCostCalculator.tsx        # Ported island
│   │   │       ├── AgSmsCalculator.css          # Copied verbatim
│   │   │       ├── agSmsCalculatorData.ts       # Copied verbatim
│   │   │       └── agSmsCalculatorData.json     # Copied verbatim (~20KB)
│   │   └── pages/
│   │       └── solutions/
│   │           └── ReduceSmsOtpCostPage.astro   # MODIFY — replace stub
└── tests/
    └── phase2c2-solutions.spec.ts               # MODIFY — flip stub test
```

---

## Task 1: Copy static data + CSS

**Files:**
- Create: `frontend-astro/src/components/islands/sms-calculator/agSmsCalculatorData.json`
- Create: `frontend-astro/src/components/islands/sms-calculator/agSmsCalculatorData.ts`
- Create: `frontend-astro/src/components/islands/sms-calculator/AgSmsCalculator.css`

- [ ] **Step 1: Create directory + copy data files**

```bash
mkdir -p /Users/fung/dev/authgear-web/frontend-astro/src/components/islands/sms-calculator
cp /Users/fung/dev/authgear-web/frontend/components/sms-calculator/agSmsCalculatorData.json \
   /Users/fung/dev/authgear-web/frontend-astro/src/components/islands/sms-calculator/agSmsCalculatorData.json
cp /Users/fung/dev/authgear-web/frontend/components/sms-calculator/agSmsCalculatorData.ts \
   /Users/fung/dev/authgear-web/frontend-astro/src/components/islands/sms-calculator/agSmsCalculatorData.ts
cp /Users/fung/dev/authgear-web/frontend/components/sms-calculator/AgSmsCalculator.css \
   /Users/fung/dev/authgear-web/frontend-astro/src/components/islands/sms-calculator/AgSmsCalculator.css
```

- [ ] **Step 2: Verify size + presence**

```bash
ls -la /Users/fung/dev/authgear-web/frontend-astro/src/components/islands/sms-calculator/
```

Expected output: four files (data.ts ~11 lines, data.json ~20KB, CSS ~389 lines, and the .tsx from Task 2).

- [ ] **Step 3: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/islands/sms-calculator/
git -C /Users/fung/dev/authgear-web commit -m "chore(astro): copy SMS calculator data + CSS"
```

---

## Task 2: Port `SmsCostCalculator` as React island

**Files:**
- Create: `frontend-astro/src/components/islands/sms-calculator/SmsCostCalculator.tsx`

- [ ] **Step 1: Copy the source as a starting point**

```bash
cp /Users/fung/dev/authgear-web/frontend/components/sms-calculator/SmsCostCalculator.tsx \
   /Users/fung/dev/authgear-web/frontend-astro/src/components/islands/sms-calculator/SmsCostCalculator.tsx
```

- [ ] **Step 2: Adapt the component for Astro islands**

Edit `/Users/fung/dev/authgear-web/frontend-astro/src/components/islands/sms-calculator/SmsCostCalculator.tsx`. Apply these transformations:

**a. Remove Next-specific imports**

Remove these from the top of the file:
```ts
import PlausibleButton from '@/components/PlausibleButton';
import PlausibleLink from '@/components/PlausibleLink';
import { useTranslations } from 'next-intl';
```

Replace with:
```ts
import { trackEvent } from '@/lib/plausible';
```

**b. Drop `'use client';`**

Astro islands don't need this directive — delete the first line.

**c. Accept `locale` as a prop**

Find the component signature:
```ts
export default function SmsCostCalculator() {
```
Change to:
```ts
interface Props { locale: string }
export default function SmsCostCalculator({ locale }: Props) {
```

**d. Replace `useTranslations` with `t(locale, key)`**

Find `const t = useTranslations('SmsCostCalculator');` and delete it. Then find every call site that reads `t('foo')` (note: the `t` variable name is reused from the hook — the find/replace is local to this file).

Add at the top of the file, after the imports:
```ts
import { t as tFn } from '@/i18n';
```

And after the component's function signature, immediately create a local adapter with interpolation support:

```ts
function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));
}
const t = (key: string, vars?: Record<string, string | number>): string => {
  const s = tFn(locale, `SmsCostCalculator.${key}`);
  return vars ? interpolate(s, vars) : s;
};
```

This preserves every existing call site — both plain `t('foo')` AND interpolated forms like `t('annualSavingsPct', { pct: outputs.savingsPct.toFixed(0) })`. The source has ~15 interpolating calls using `{varName}` placeholders in the translation strings; this adapter substitutes them at call time.

**Why not extend Phase 1's `t()` helper?** Keeping interpolation local avoids changing infrastructure mid-migration. If future islands need interpolation, we can promote this helper to `@/i18n` later.

**e. Replace `<PlausibleButton>` / `<PlausibleLink>` with class-based tracking**

Every `<PlausibleButton eventName="x" className="z" ...>` becomes:
```tsx
<button className={`z plausible-event-name--x`} ...>
```

Every `<PlausibleLink eventName="x" className="z" href="y" ...>` becomes:
```tsx
<a className={`z plausible-event-name--x`} href="y" ...>
```

The loaded Plausible `script.tagged-events.js` (from BaseLayout) reads those classes automatically. If the component also needs programmatic event tracking (e.g. inside a handler), use `trackEvent('event-name')` from `@/lib/plausible`. Inspect the source for any such usages.

**f. Keep everything else intact**

- Keep `useState`, `useMemo`, `useRef`, `useCallback`, all internal logic
- Keep the CSS import: `import './AgSmsCalculator.css';`
- Keep the data import: `import { AG_DATA, type AgCountryRow } from './agSmsCalculatorData';`

- [ ] **Step 3: Typecheck**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 4: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/islands/sms-calculator/SmsCostCalculator.tsx
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port SmsCostCalculator as React island"
```

---

## Task 3: Wire the island into `ReduceSmsOtpCostPage.astro`

**Files:**
- Modify: `frontend-astro/src/components/pages/solutions/ReduceSmsOtpCostPage.astro`

- [ ] **Step 1: Locate the stub**

```bash
grep -n "data-placeholder=\"SmsCostCalculator\"" /Users/fung/dev/authgear-web/frontend-astro/src/components/pages/solutions/ReduceSmsOtpCostPage.astro
```

Expected: one match — the placeholder div from Phase 2c-2 Task 4.

- [ ] **Step 2: Add the import to the frontmatter**

Edit the file. In the frontmatter block (between the two `---` fences), add this import after the existing ones:

```ts
import SmsCostCalculator from '@/components/islands/sms-calculator/SmsCostCalculator';
```

- [ ] **Step 3: Replace the stub**

Find:

```astro
<!-- Phase 2d: SmsCostCalculator -->
<div data-placeholder="SmsCostCalculator" aria-label="SMS cost calculator (pending port)"></div>
```

Replace with:

```astro
<SmsCostCalculator client:visible locale={locale} />
```

- [ ] **Step 4: Build**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npm run build 2>&1 | tail -10
```

Expected: build succeeds. The `/solutions/reduce-sms-otp-cost` and `/zh-TW/solutions/reduce-sms-otp-cost` pages prerender.

- [ ] **Step 5: Verify no stub remains**

```bash
grep -n "data-placeholder=\"SmsCostCalculator\"" /Users/fung/dev/authgear-web/frontend-astro/src/components/pages/solutions/ReduceSmsOtpCostPage.astro || echo "clean"
```

Expected: `clean`.

- [ ] **Step 6: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/solutions/ReduceSmsOtpCostPage.astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): wire SmsCostCalculator island into ReduceSmsOtpCostPage"
```

---

## Task 4: Update Playwright smoke test

**Files:**
- Modify: `frontend-astro/tests/phase2c2-solutions.spec.ts`

- [ ] **Step 1: Flip the stub assertion**

The test at `frontend-astro/tests/phase2c2-solutions.spec.ts` currently asserts the stub EXISTS:

```ts
test('reduce-sms-otp-cost has SmsCostCalculator stub (Phase 2d pending)', async ({ page }) => {
  await page.goto('/solutions/reduce-sms-otp-cost');
  const stub = page.locator('[data-placeholder="SmsCostCalculator"]');
  await expect(stub).toHaveCount(1);
});
```

Edit the file and replace that test with a real island-hydration check:

```ts
test('reduce-sms-otp-cost: SmsCostCalculator island hydrates', async ({ page }) => {
  await page.goto('/solutions/reduce-sms-otp-cost');
  // Scroll into view — client:visible requires intersection
  const section = page.locator('.ag-sms-calculator, [class*="sms-calculator"], input[type="range"]').first();
  await section.scrollIntoViewIfNeeded();
  // The calculator has a volume slider (range input) — its presence proves hydration
  const slider = page.locator('input[type="range"]').first();
  await expect(slider).toBeVisible();
  // No placeholder stub should remain
  const stubs = page.locator('[data-placeholder="SmsCostCalculator"]');
  await expect(stubs).toHaveCount(0);
});
```

**Note on selector:** the CSS imported from `AgSmsCalculator.css` likely defines classes that the component uses. If `.ag-sms-calculator` doesn't match the actual root class, inspect `dist/client/solutions/reduce-sms-otp-cost/index.html` after build to see the rendered root element's class and update the selector. The `input[type="range"]` check is the reliable fallback.

- [ ] **Step 2: Run just this test first**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx playwright test tests/phase2c2-solutions.spec.ts -g "SmsCostCalculator" --reporter=line 2>&1 | tail -10
```

Expected: 1 passed.

- [ ] **Step 3: Full suite regression check**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx playwright test --reporter=line 2>&1 | tail -10
```

Expected: 107 still passed (test count unchanged — one test was modified, not added).

- [ ] **Step 4: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/tests/phase2c2-solutions.spec.ts
git -C /Users/fung/dev/authgear-web commit -m "test(astro): flip SmsCostCalculator stub assertion to hydration check"
```

---

## Task 5: Docs update

**Files:**
- Modify: `frontend-astro/README.md`
- Modify: `docs/ARCHITECTURE-ASTRO.md`

- [ ] **Step 1: Update README**

Edit `frontend-astro/README.md`. Find the Phase status list. Replace `- [ ] Phase 2d — Tools subtree + SMS calculator` with two finer entries:

```markdown
- [x] Phase 2d-1 — SMS Cost Calculator island (unblocks Phase 2c-2 stub)
- [ ] Phase 2d-2 — Tools subtree (9 interactive dev-tool pages as React islands)
```

- [ ] **Step 2: Update ARCHITECTURE status marker**

In `docs/ARCHITECTURE-ASTRO.md`, replace the `**Migration status` line with:

```markdown
**Migration status (2026-04-21):** Phases 1 + 2a + 2b + 2c + 2d-1 shipped on branch `migration/nextjs-to-astro`. Home + 13 static + 4 compare + 7 solutions + 19 features live in both locales. SMS Cost Calculator island now hydrates on `/solutions/reduce-sms-otp-cost` (no more placeholders remain in Phase 2c-2 output). Phase 2d-2 (tools subtree) plan pending.
```

- [ ] **Step 3: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/README.md docs/ARCHITECTURE-ASTRO.md
git -C /Users/fung/dev/authgear-web commit -m "docs(astro): Phase 2d-1 complete — SMS calculator shipped"
```

---

## Phase 2d-1 complete

Verification gate before Phase 2d-2:

1. `npm run build` — builds clean
2. `npm test` — 107 passed (same count; one test rewritten)
3. Manual: `PORT=3000 npm start`, visit `/solutions/reduce-sms-otp-cost` — scroll to the calculator section; dropdown + sliders respond to interaction; totals update. Repeat for `/zh-TW/solutions/reduce-sms-otp-cost` — labels translated, functionality identical.
4. No `data-placeholder` attributes anywhere in the Astro build:
   ```bash
   grep -rn "data-placeholder" /Users/fung/dev/authgear-web/frontend-astro/src/ 2>/dev/null || echo "clean"
   ```
   Expected: `clean`.

---

## Phase 2d-2 outline (tools subtree — separate plan)

- 9 interactive tool pages (base64, HMAC, JWK, JWT, OIDC, password-hash, SSL, TOTP, UUID v7) — all `'use client'` in source, all become full-page React islands with `client:load`
- 8 shared Tool* components in `frontend/components/tools/` (4 client, 4 server — all become regular `.tsx` files imported by the page islands)
- `lib/tools/toolSlugPrefix.ts` port
- Dynamic `tools/[slug].astro` route that mounts each tool page as a client island
- Smoke tests verifying each tool renders + a minimal interactivity check per page (e.g., base64 encode, UUID v7 generate)
- Expected scale: ~15 tasks, matches Phase 2c-2 size
