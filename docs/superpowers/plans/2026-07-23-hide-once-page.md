# Hide /once Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Retire the Authgear ONCE marketing surface: delete /once pages (301 → homepage), remove nav/footer links, and make the pricing page Cloud-only — while keeping /once/license live.

**Architecture:** Pure removal on a prerendered Astro 6 site. Pages under `src/pages/` are deleted (the build-time sitemap drops them automatically), redirects live in `public/_redirects` (Netlify static rules, matched with or without trailing slash), and the pricing page is a React island fed a serializable `copy` object — ONCE is removed from the copy types, data, and JSX together.

**Tech Stack:** Astro 6, React 19 islands, TypeScript, Playwright (e2e), Vitest (unit).

**Spec:** `docs/superpowers/specs/2026-07-23-hide-once-page-design.md`

## Global Constraints

- **Keep `/once/license` reachable**: `src/pages/once/license.astro` is untouched; no `/once/*` splat redirect may be added.
- **Keep the homepage hero product-switch block unchanged** (`src/components/pages/HomePage.astro`), including the `Home.productSwitchServer` i18n key — explicit user decision, reworked in a later step.
- Do not commit directly to `main` — all work on branch `restructure/hide-once-page`.
- i18n cleanup is limited to keys used only by removed components; `ja.json` has none of them.
- Before deleting any shared export/file, verify it has no remaining importers (`grep -rn` shown in the step).

---

### Task 1: Delete /once pages and redirect them to the homepage

**Files:**
- Delete: `src/pages/once.astro`, `src/pages/zh-hant/once.astro`
- Delete: `src/components/pages/OncePage.astro`
- Delete: `src/components/islands/once/OncePageFaq.tsx`, `src/components/islands/once/OnceSdkFrameworkHarness.tsx` (whole `src/components/islands/once/` dir)
- Delete: `tests/phase2e1-once.spec.ts` (e2e suite for the deleted page)
- Modify: `src/components/islands/LogoMarquee.tsx` (remove `ONCE_SDK_MARQUEE_LOGOS`, lines 14–~22)
- Modify: `src/i18n/en.json`, `src/i18n/zh-Hant.json` (remove the top-level `"Once"` namespace)
- Modify: `public/_redirects`

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: a build with no `/once` or `/zh-hant/once` route. Task 4 verifies `dist/once/license/index.html` still exists.

- [ ] **Step 1: Create the working branch**

```bash
git checkout -b restructure/hide-once-page
```

- [ ] **Step 2: Verify the ONCE components have no importers outside the pages being deleted**

Run:
```bash
grep -rn "OncePage\|OncePageFaq\|OnceSdkFrameworkHarness\|ONCE_SDK_MARQUEE_LOGOS" src tests \
  | grep -v "src/pages/once.astro\|src/pages/zh-hant/once.astro\|src/components/pages/OncePage.astro\|src/components/islands/once/"
```
Expected: the only remaining line is the definition `src/components/islands/LogoMarquee.tsx:14:export const ONCE_SDK_MARQUEE_LOGOS = [`. If anything else appears, STOP and report it — do not delete.

- [ ] **Step 3: Delete the pages, component, islands, and e2e spec**

```bash
git rm src/pages/once.astro src/pages/zh-hant/once.astro \
       src/components/pages/OncePage.astro \
       tests/phase2e1-once.spec.ts
git rm -r src/components/islands/once
```

- [ ] **Step 4: Remove `ONCE_SDK_MARQUEE_LOGOS` from LogoMarquee.tsx**

In `src/components/islands/LogoMarquee.tsx`, delete the whole exported const starting at line 14:

```tsx
export const ONCE_SDK_MARQUEE_LOGOS = [
  { src: '/images/once_build-for-developer-lang-01-react.svg', alt: 'React' },
  ...
];
```
(delete from `export const ONCE_SDK_MARQUEE_LOGOS = [` through its closing `];`). Leave the rest of the file — the `LogoMarquee` component itself is used by `HomePage.astro`.

- [ ] **Step 5: Remove the `Once` i18n namespace**

In `src/i18n/en.json` and `src/i18n/zh-Hant.json`, delete the entire top-level `"Once": { ... }` object (it holds `title`/`description` and OncePage strings; only the deleted files read `Once.*` — verified in Step 2 pattern; double-check with `grep -rn "'Once\." src` → no matches after Step 3).

- [ ] **Step 6: Update `public/_redirects`**

Re-point the two legacy rules that target `/once/` (keep their column alignment style):

```
/authgear-once-v2                                                                   /                                                                                                                       301
/old-home-2                                                                         /                                                                                                                       301
```

Add exact-path rules for the retired page (place them next to the other page-level 301s, before the `/zh-hant/*` comment block). No splat — `/once/license` must not match:

```
/once                                                                               /                                                                                                                       301
/zh-hant/once                                                                       /zh-hant/                                                                                                               301
```

Leave `/zh-hant/once/license  /once/license/  301` and `/campaign/once  /  301` unchanged.

- [ ] **Step 7: Build and verify routes**

Run: `npm run build`
Expected: build succeeds. Then:

```bash
ls dist/once            # expect: only "license" directory, no index.html
ls dist/once/license/index.html   # expect: exists
ls dist/zh-hant/ | grep -i once   # expect: no output
grep -c "^/once " dist/_redirects # expect: 1
```

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "restructure: remove /once pages, redirect to homepage (keep /once/license)"
```

---

### Task 2: Remove nav and footer links to /once

**Files:**
- Modify: `src/lib/navigation-data.ts:80` (nav item) and `:126` (footer string)
- Modify: `src/components/nav/SiteFooter.astro:145-149`

**Interfaces:**
- Consumes: nothing from Task 1 (independent, but keep task order for clean review).
- Produces: no `href` to `/once` in nav/footer. The homepage hero link to /once remains by design.

- [ ] **Step 1: Remove the nav product link**

In `src/lib/navigation-data.ts`, in the `productColumn` links array, delete the line:

```ts
      { path: '/once', label: { en: 'On your Server', 'zh-Hant': '自建版' } },
```

leaving `On the Cloud` and `Migrate to Authgear` as the column's links.

- [ ] **Step 2: Remove the footer string**

In the same file, in `footerStrings`, delete:

```ts
  onYourServer: { en: 'On your Server (ONCE)', 'zh-Hant': '自建版（ONCE）' },
```

- [ ] **Step 3: Remove the footer link markup**

In `src/components/nav/SiteFooter.astro`, delete the list item (lines 145–149):

```astro
              <li class="footer-menu-list-item">
                <a href={lp('/once')} class="footer-menu-link workshop-footer-link w-inline-block">
                  <div>{L('onYourServer')}</div>
                </a>
              </li>
```

- [ ] **Step 4: Typecheck and verify built output**

Run: `npx astro check && npm run build`
Expected: no errors. Then:

```bash
grep -o 'href="[^"]*once[^"]*"' dist/index.html
```
Expected: exactly one match, `href="/once"` (the kept homepage product switch), and:

```bash
grep -o 'href="[^"]*/once[^"]*"' dist/pricing/index.html dist/about-us/index.html | sort -u
```
Expected: no output (footer/nav clean on non-home pages).

- [ ] **Step 5: Commit**

```bash
git add src/lib/navigation-data.ts src/components/nav/SiteFooter.astro
git commit -m "restructure: remove ONCE links from nav and footer"
```

---

### Task 3: Make the pricing page Cloud-only

**Files:**
- Test: `tests/phase2e2-pricing.spec.ts:17-24` (rewrite the tab-switcher test first — TDD)
- Modify: `src/components/islands/pricing/PricingPageClient.tsx`
- Modify: `src/components/pricing/PricingPageView.astro`
- Modify: `src/lib/pricing/types.ts`, `src/lib/pricing/copy-en.ts`, `src/lib/pricing/copy-zh-Hant.ts`, `src/lib/pricing/comparison-rows.ts`
- Delete: `src/lib/pricing/data/once-core-en.ts`, `src/lib/pricing/data/once-core-zh-Hant.ts`
- Modify: `src/components/islands/pricing/PricingPlanFinder.css` (drop `.once-row--section` rule at ~line 626)
- Modify: `src/i18n/en.json`, `src/i18n/zh-Hant.json` (Pricing.* ONCE keys)

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `PricingCopy` type without `tabs` and `once` fields; `PricingPageClient` props without `onceSuffix` (and without `enterpriseContactLabel` if the check in Step 4 confirms it is only used by the removed ONCE table). Task 4 relies on `npx astro check` passing with these narrowed types.

- [ ] **Step 1: Rewrite the pricing e2e test to expect no ONCE tab (failing first)**

In `tests/phase2e2-pricing.spec.ts`, replace the test at lines 17–24 (`'Pricing page hydrates — Cloud/Once tab switcher toggles'`) with:

```ts
  test('Pricing page is Cloud-only — no ONCE tab, plans visible', async ({ page }) => {
    await page.goto('/pricing');
    await expect(page.getByRole('button', { name: /on your server|ONCE/i })).toHaveCount(0);
    await expect(page.locator('#cards-section')).toBeVisible();
    await expect(page.locator('.pricing-card').first()).toBeVisible();
  });
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx playwright test tests/phase2e2-pricing.spec.ts`
Expected: FAIL — the ONCE tab button count is 1, not 0.

- [ ] **Step 3: Strip ONCE from `PricingPageClient.tsx`**

All in `src/components/islands/pricing/PricingPageClient.tsx`:

a. Props (line ~49): remove `onceSuffix: string;` from `Props` and `onceSuffix,` from the component destructuring (line ~1315).

b. Delete the tab state (line ~1319): `const [tab, setTab] = useState(0);`

c. Delete the whole tab switcher block (lines ~1337–1371): the `<div className="w-layout-hflex tab-background">` element containing both `tab-switcher` buttons.

d. On the two Cloud sections, remove the now-meaningless inline style `style={{ display: tab === 0 ? 'flex' : 'none' }}` (lines ~1376 and ~1425) — they are always visible.

e. Delete both ONCE sections entirely:
   - `<section className="section pricing-new once pricing-info" ...>` (lines ~1473–1536, plans cards), and
   - `<section className="once pricing-info" ...>` (lines ~1538–1574, core-features table).

f. Delete the `OnceCoreValue` function (line ~1199) and the `enterpriseLink` `useMemo` (lines ~1322–1333) — both are only referenced from the deleted core-features table.

g. Remove imports/types that become unused (`OnceCoreRow`, `useMemo` if nothing else uses it — check with `grep -n "useMemo" src/components/islands/pricing/PricingPageClient.tsx`; PlanFinder code also uses `useMemo`, so likely keep the import).

- [ ] **Step 4: Check whether `enterpriseContactLabel` is still used**

Run: `grep -n "enterpriseContactLabel" src/components/islands/pricing/PricingPageClient.tsx`
Expected after Step 3: only the `Props` field and destructuring remain. If so, remove both, and remove the `enterpriseContactLabel={t(locale, 'Pricing.enterpriseContactLabel')}` prop from `PricingPageView.astro` plus the `Pricing.enterpriseContactLabel` key from both i18n files. If it IS still used elsewhere, keep all of it.

- [ ] **Step 5: Strip ONCE from the copy layer**

a. `src/lib/pricing/types.ts`: in `PricingCopy`, delete the `tabs` field (line 41) and the whole `once` field (lines 58–68). Delete the `OnceCoreRow` type (lines 35–37).

b. `src/lib/pricing/copy-en.ts`: delete `import { onceCoreEn } from './data/once-core-en';` (line 3), the `tabs: { cloud: 'On the Cloud', once: 'On your Server' },` line (11), and the whole `once: { ... },` object (lines 93–135, from `once: {` through `enterpriseContactSuffix: ' for Enterprise version',\n  },`).

c. `src/lib/pricing/copy-zh-Hant.ts`: same shape — delete the `onceCoreZhHant` import, the `tabs:` line (10), and the `once: { ... },` object (starting line 90).

d. `src/lib/pricing/comparison-rows.ts`: delete `onceCoreSection` and `onceCoreFeature` (lines 14–20) and drop `OnceCoreRow` from the type import on line 1.

e. Delete the data files:

```bash
git rm src/lib/pricing/data/once-core-en.ts src/lib/pricing/data/once-core-zh-Hant.ts
```

- [ ] **Step 6: Strip ONCE from `PricingPageView.astro`**

In `src/components/pricing/PricingPageView.astro`:
- Delete the `tabs: { ... },` object (lines 24–27) and the whole `once: { ... },` object (lines 40–49) from the `copy` literal.
- Delete `onceSuffix={t(locale, 'Pricing.onceSuffix')}` (line 104) from the `<PricingPageClient>` props (and `enterpriseContactLabel` per Step 4's outcome).

- [ ] **Step 7: Remove dead i18n keys and CSS**

a. In `src/i18n/en.json` and `src/i18n/zh-Hant.json`, under `"Pricing"`, delete these keys: `tabCloud`, `tabOnce`, `onceTitleLine1`, `onceTitleHighlight`, `onceTitleLine2`, `onceSubtitle`, `onceIntro`, `onceCoreTitle`, `onceEnterpriseContactSuffix`, `onceSuffix` (both tab labels die with the switcher). Confirm nothing else reads them: `grep -rn "tabCloud\|tabOnce\|onceTitle\|onceSubtitle\|onceIntro\|onceCore\|onceEnterprise\|onceSuffix" src` → expect no matches.

b. In `src/components/islands/pricing/PricingPlanFinder.css`, delete the rule at ~line 626:

```css
.comparison.static-table .comparison-row--section.once-row--section {
  ...
}
```

Leave shared `.comparison*` classes and everything in `src/styles/global.css` alone (Webflow-shared, out of scope).

- [ ] **Step 8: Typecheck, then run the pricing e2e**

Run: `npx astro check`
Expected: 0 errors (this catches any missed `copy.once` / `tabs` / `onceSuffix` reference).

Run: `npx playwright test tests/phase2e2-pricing.spec.ts`
Expected: PASS, including the rewritten Cloud-only test.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "restructure: make pricing page Cloud-only, remove ONCE tab and copy"
```

---

### Task 4: Full verification sweep

**Files:** none (verification only)

**Interfaces:**
- Consumes: the completed Tasks 1–3.
- Produces: evidence the spec's verification checklist passes.

- [ ] **Step 1: Full build + unit tests**

Run: `npm run build && npm run test:unit`
Expected: build succeeds; Vitest suite passes (includes `sms-cost` calc tests, unrelated but must stay green).

- [ ] **Step 2: No stray /once links in built HTML**

```bash
grep -rlo 'href="[^"]*/once' dist --include="*.html" | grep -v "dist/once/license"
```
Expected: only `dist/index.html` and `dist/zh-hant/index.html` (the kept homepage product switch). Any other file is a missed link — fix before proceeding.

- [ ] **Step 3: Redirects sanity**

```bash
grep -n "once" dist/_redirects
```
Expected: `/once → /`, `/zh-hant/once → /zh-hant/`, `/campaign/once → /`, `/zh-hant/once/license → /once/license/`, and the re-pointed `/authgear-once-v2` + `/old-home-2` rules → `/`. No `/once/*` splat anywhere.

- [ ] **Step 4: Full e2e suite**

Run: `npm test`
Expected: PASS (phase2e1-once.spec.ts is gone; pricing spec updated; everything else untouched).

- [ ] **Step 5: Dev-server spot check**

Run `npm run dev` (or use the already-running server) and eyeball:
- `/` and `/zh-hant/` — nav "Products" column has no "On your Server"; footer has no ONCE link; hero product switch still shows both pills.
- `/pricing` and `/zh-hant/pricing` — no tab switcher; Cloud plans, plan finder, comparison table, CTA, and FAQ all render.
- `/once/license` — still renders.

- [ ] **Step 6: Report**

Report results to the user. Do NOT push or open a PR — the user gates those explicitly (push goes to the `fork` remote, PR from `fungc-io:restructure/hide-once-page` when asked).
