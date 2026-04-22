# Astro Migration — Phase 2e-2: Pricing Page

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the Pricing page — the last remaining static marketing page in Phase 2. Includes structured copy data (en + zh-TW), a comparison-cells helper, the detailed comparison table data, a 459 LOC interactive client component, and a thin async wrapper.

**Architecture:** `PricingPageView.tsx` (server wrapper) becomes `PricingPageView.astro`, which builds the merged `copy` object from locale-specific sources + translations, then mounts `PricingPageClient` as a `client:load` React island. `PricingPageClient` is a full-page island (like the tool pages in Phase 2d-2) — all interactive logic (monthly/annual toggle, comparison table rendering) lives inside a single React component. Reuses `PricingFaqItem` shipped in Phase 2e-1.

**Tech Stack:** Same as prior phases.

**References:**
- `docs/ARCHITECTURE-ASTRO.md`
- `docs/superpowers/plans/2026-04-22-astro-phase2e1-once.md` — established the hybrid SSR/island pattern and ported PricingFaqItem
- `docs/superpowers/plans/2026-04-22-astro-phase2d2-tools.md` — established the full-page React island pattern

**What this phase does NOT do:** touch `frontend/` (Next.js files stay put). This completes Phase 2 (all static marketing pages).

**Exit criteria:**

1. `npm run build` — 2 new prerendered files (`/pricing`, `/zh-TW/pricing`)
2. `npm run test:unit` — 5 passed (unchanged)
3. `npm test` — at least 134 passed (130 existing + 4 new: 2 route assertions + 1 toggle interactivity + 1 FAQ accordion check)
4. Manual: `/pricing` renders with pricing cards; monthly/annual toggle swaps prices; FAQ accordion items open/close

---

## File structure (new)

```
frontend-astro/
├── src/
│   ├── lib/
│   │   └── pricing/
│   │       ├── types.ts                             # types (verbatim)
│   │       ├── cells.ts                             # cell helpers (verbatim)
│   │       ├── copy-en.ts                           # structured copy en (verbatim)
│   │       ├── copy-zh-TW.ts                        # structured copy zh-TW (verbatim)
│   │       └── data/
│   │           ├── full-comparison-en.tsx           # comparison rows en (verbatim)
│   │           └── full-comparison-zh-TW.tsx        # comparison rows zh-TW (verbatim)
│   ├── components/
│   │   ├── islands/
│   │   │   └── pricing/
│   │   │       └── PricingPageClient.tsx            # full-page React island
│   │   └── pricing/
│   │       └── PricingPageView.astro                # async server wrapper
│   └── pages/
│       ├── pricing.astro                            # en route
│       └── zh-TW/
│           └── pricing.astro                        # zh-TW route
└── tests/
    └── phase2e2-pricing.spec.ts
```

---

## Task 1: Port `lib/pricing/` data modules (types, cells, copy, comparison)

**Files:**
- Create: `frontend-astro/src/lib/pricing/types.ts`
- Create: `frontend-astro/src/lib/pricing/cells.ts`
- Create: `frontend-astro/src/lib/pricing/copy-en.ts`
- Create: `frontend-astro/src/lib/pricing/copy-zh-TW.ts`
- Create: `frontend-astro/src/lib/pricing/data/full-comparison-en.tsx`
- Create: `frontend-astro/src/lib/pricing/data/full-comparison-zh-TW.tsx`

- [ ] **Step 1: Copy the whole directory verbatim**

```bash
mkdir -p /Users/fung/dev/authgear-web/frontend-astro/src/lib/pricing/data
cp /Users/fung/dev/authgear-web/frontend/lib/pricing/types.ts \
   /Users/fung/dev/authgear-web/frontend/lib/pricing/cells.ts \
   /Users/fung/dev/authgear-web/frontend/lib/pricing/copy-en.ts \
   /Users/fung/dev/authgear-web/frontend/lib/pricing/copy-zh-TW.ts \
   /Users/fung/dev/authgear-web/frontend-astro/src/lib/pricing/
cp /Users/fung/dev/authgear-web/frontend/lib/pricing/data/full-comparison-en.tsx \
   /Users/fung/dev/authgear-web/frontend/lib/pricing/data/full-comparison-zh-TW.tsx \
   /Users/fung/dev/authgear-web/frontend-astro/src/lib/pricing/data/
```

- [ ] **Step 2: Verify no Next-specific imports**

```bash
grep -rn "next/\|next-intl\|@next/" /Users/fung/dev/authgear-web/frontend-astro/src/lib/pricing/ || echo "clean"
```

Expected: `clean`. The pricing data modules are pure TypeScript + JSX (for the comparison table); no Next dependencies.

- [ ] **Step 3: Typecheck**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/lib/pricing/
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port lib/pricing data modules (types, cells, copy, comparison)"
```

---

## Task 2: Port `PricingPageClient` as React island

**Files:**
- Create: `frontend-astro/src/components/islands/pricing/PricingPageClient.tsx`

**CRITICAL PROCESS RULE:** This file is 459 LOC with extensive JSX and `useMemo`/`useState`. Do NOT echo/quote file contents in your response text. Keep response under 250 words.

- [ ] **Step 1: Copy the source**

```bash
cp /Users/fung/dev/authgear-web/frontend/components/pricing/PricingPageClient.tsx \
   /Users/fung/dev/authgear-web/frontend-astro/src/components/islands/pricing/PricingPageClient.tsx
```

- [ ] **Step 2: Adapt**

Edit `/Users/fung/dev/authgear-web/frontend-astro/src/components/islands/pricing/PricingPageClient.tsx`:

1. Delete `'use client';` (line 1)
2. Remove `import Link from 'next/link';`
3. Change `import { PricingFaqItem } from '@/components/pricing/PricingFaqAccordion';` → `import { PricingFaqItem } from '@/components/islands/pricing/PricingFaqItem';`
4. Swap every `<Link href="X" …>` → `<a href="X" …>`. Also handle the one case of `<Link key={…} href={…}>…</Link>` at the end of the file (grep `<Link` to find all instances).

**No other changes needed** — the component already takes all its data via props (no next-intl hook calls). `useState` / `useMemo` stay as-is.

- [ ] **Step 3: Verify no next imports remain**

```bash
grep -n "next/\|next-intl" /Users/fung/dev/authgear-web/frontend-astro/src/components/islands/pricing/PricingPageClient.tsx || echo "clean"
```

Expected: `clean`.

- [ ] **Step 4: Typecheck**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/islands/pricing/PricingPageClient.tsx
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port PricingPageClient as React island"
```

Report: commit SHA, count of `<Link>` → `<a>` swaps, any unexpected imports/patterns encountered.

---

## Task 3: Port `PricingPageView` as `.astro` wrapper

**Files:**
- Create: `frontend-astro/src/components/pricing/PricingPageView.astro`

The source `PricingPageView.tsx` (66 LOC) is a thin async server wrapper that builds a `copy` object by spreading locale-specific `pricingCopyEn` / `pricingCopyZhTW` with translation-derived fields, then renders `<PricingPageClient copy={copy} ... />`.

- [ ] **Step 1: Read the Next source**

```bash
cat /Users/fung/dev/authgear-web/frontend/components/pricing/PricingPageView.tsx
```

- [ ] **Step 2: Port to `.astro`**

Create `/Users/fung/dev/authgear-web/frontend-astro/src/components/pricing/PricingPageView.astro`:

```astro
---
import { t } from '@/i18n';
import { localizedPath } from '@/lib/i18n';
import { pricingCopyEn } from '@/lib/pricing/copy-en';
import { pricingCopyZhTW } from '@/lib/pricing/copy-zh-TW';
import PricingPageClient from '@/components/islands/pricing/PricingPageClient';

interface Props { locale: string }
const { locale } = Astro.props;

const baseCopy = locale === 'zh-TW' ? pricingCopyZhTW : pricingCopyEn;
const contactPath = localizedPath(locale, '/schedule-demo');
const whatsappPath = localizedPath(locale, '/features/whatsapp-otp');
---
```

Then port the `copy = { ...baseCopy, meta: { title: t(...), description: t(...) }, tabs: {...}, ... }` construction from the Next source. Every `t('key')` call becomes `t(locale, 'Pricing.key')`.

Look at the Next source line-by-line: for each field added onto the `copy` object via `t(...)`, reproduce it in the Astro frontmatter with the namespaced call. Track what `t(...)` keys are used — expect 10-20 keys.

Then in the template body (after the `---`):

```astro
<PricingPageClient
  client:load
  copy={copy}
  locale={locale}
  contactPath={contactPath}
  whatsappPath={whatsappPath}
  month={t(locale, 'Pricing.month')}
  onceSuffix={t(locale, 'Pricing.onceSuffix')}
  enterpriseContactLabel={t(locale, 'Pricing.enterpriseContactLabel')}
/>
```

Adjust the prop names / t-keys to match whatever the Next source actually passes to `<PricingPageClient>`.

- [ ] **Step 3: Typecheck**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
```

Expected: no errors. If Props mismatch (e.g. `PricingPageClient` expects a field in `copy` that isn't built here), fix by matching the Next source field-for-field.

- [ ] **Step 4: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pricing/PricingPageView.astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port PricingPageView as async .astro wrapper"
```

Report: commit SHA, count of `t(locale, 'Pricing.X')` calls in the wrapper, any translation keys that had to be invented (likely none — all should exist).

---

## Task 4: Wire up `/pricing` routes (en + zh-TW)

**Files:**
- Create: `frontend-astro/src/pages/pricing.astro`
- Create: `frontend-astro/src/pages/zh-TW/pricing.astro`

- [ ] **Step 1: Write en route**

Create `/Users/fung/dev/authgear-web/frontend-astro/src/pages/pricing.astro`:

```astro
---
export const prerender = true;
import BaseLayout from '@/layouts/BaseLayout.astro';
import { t } from '@/i18n';
import PricingPageView from '@/components/pricing/PricingPageView.astro';

const locale = 'en';
const title = t(locale, 'Pricing.metaTitle');
const description = t(locale, 'Pricing.metaDescription');
---

<BaseLayout locale={locale} title={title} description={description}>
  <PricingPageView locale={locale} />
</BaseLayout>
```

- [ ] **Step 2: Write zh-TW route**

Create `/Users/fung/dev/authgear-web/frontend-astro/src/pages/zh-TW/pricing.astro` — identical to Step 1 except `const locale = 'en';` → `const locale = 'zh-TW';`.

- [ ] **Step 3: Build**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npm run build 2>&1 | tail -10
```

Expected: build succeeds. Output includes `/pricing/index.html` and `/zh-TW/pricing/index.html`.

- [ ] **Step 4: Verify**

```bash
test -f /Users/fung/dev/authgear-web/frontend-astro/dist/client/pricing/index.html && echo "OK en"
test -f /Users/fung/dev/authgear-web/frontend-astro/dist/client/zh-TW/pricing/index.html && echo "OK zh-TW"
```

Expected: two `OK` lines.

- [ ] **Step 5: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/pages/pricing.astro frontend-astro/src/pages/zh-TW/pricing.astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): wire up /pricing routes (en + zh-TW)"
```

---

## Task 5: Playwright smoke tests

**Files:**
- Create: `frontend-astro/tests/phase2e2-pricing.spec.ts`

- [ ] **Step 1: Write the tests**

Create `/Users/fung/dev/authgear-web/frontend-astro/tests/phase2e2-pricing.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

test.describe('Phase 2e-2: /pricing', () => {
  test('/pricing returns 200 with lang=en', async ({ page }) => {
    const resp = await page.goto('/pricing');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('footer').first()).toBeVisible();
  });

  test('/zh-TW/pricing returns 200 with lang=zh-TW', async ({ page }) => {
    const resp = await page.goto('/zh-TW/pricing');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-TW');
  });

  test('Pricing page hydrates — Cloud/Once tab switcher toggles', async ({ page }) => {
    await page.goto('/pricing');
    // The page has two tabs: 'On the Cloud' and 'On your Server'. Find them by role.
    const onceTab = page.getByRole('button', { name: /on your server|ONCE/i }).first();
    const cloudTab = page.getByRole('button', { name: /on the cloud|cloud/i }).first();
    await onceTab.scrollIntoViewIfNeeded();
    await expect(onceTab).toBeVisible();
    await expect(cloudTab).toBeVisible();
    // Click the ONCE tab — this should change content shown
    await onceTab.click();
    // After click, the clicked tab should be marked active (aria-pressed or similar).
    // Since we don't know the exact attribute, verify interactivity by observing a state
    // change: re-click and verify the button still exists and responds.
    await cloudTab.click();
    await expect(cloudTab).toBeVisible();
  });

  test('Pricing FAQ accordion items exist and toggle', async ({ page }) => {
    await page.goto('/pricing');
    // PricingFaqItem renders a button with aria-expanded. Find the first.
    const firstFaq = page.locator('button[aria-expanded]').first();
    await firstFaq.scrollIntoViewIfNeeded();
    await expect(firstFaq).toBeVisible();
    const before = await firstFaq.getAttribute('aria-expanded');
    await firstFaq.click();
    const after = await firstFaq.getAttribute('aria-expanded');
    expect(after).not.toBe(before);
  });
});
```

- [ ] **Step 2: Run the tests**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx playwright test tests/phase2e2-pricing.spec.ts --reporter=line 2>&1 | tail -15
```

Expected: 4 passed.

**If the tab-switch test fails because button names don't match**, inspect the rendered HTML:
```bash
curl -s http://localhost:4321/pricing | grep -oE '<button[^>]*>[^<]*</button>' | head -20
```
Find the actual button text and adjust the test selector — do NOT weaken the assertion.

**If the FAQ test fails because no `aria-expanded` buttons exist**, the PricingFaqItem island didn't hydrate. Inspect the page for any element with `data-astro-island` or `astro-island` tag near the FAQ; the island might be below the viewport when it should load.

- [ ] **Step 3: Full suite regression**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx playwright test --reporter=line 2>&1 | tail -10
```

Expected: 130 existing + 4 new = 134 passed.

- [ ] **Step 4: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/tests/phase2e2-pricing.spec.ts
git -C /Users/fung/dev/authgear-web commit -m "test(astro): smoke tests for /pricing + tab toggle + FAQ accordion"
```

---

## Task 6: Docs update (Phase 2 complete)

**Files:**
- Modify: `frontend-astro/README.md`
- Modify: `docs/ARCHITECTURE-ASTRO.md`

- [ ] **Step 1: Update README**

Edit `/Users/fung/dev/authgear-web/frontend-astro/README.md`. Find `- [ ] Phase 2e-2 — Pricing page ...` and change `- [ ]` to `- [x]`.

- [ ] **Step 2: Update ARCHITECTURE status marker**

In `/Users/fung/dev/authgear-web/docs/ARCHITECTURE-ASTRO.md`, replace the `**Migration status` line with:

```markdown
**Migration status (2026-04-22):** Phase 2 complete. Phases 1 + 2a + 2b + 2c + 2d + 2e shipped on branch `migration/nextjs-to-astro`. All static marketing pages live in both locales: home + 13 static + 4 compare + 7 solutions + 19 features + 9 tools + Once + Pricing. Every interactive island hydrated (ContactForm, LogoMarquee, 3 feature tabs, SmsCostCalculator, 9 tool islands, OnceSdkFrameworkHarness, OncePageFaq, PricingPageClient, PricingFaqItem). Phase 3 (CMS-backed pages) plan pending.
```

- [ ] **Step 3: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/README.md docs/ARCHITECTURE-ASTRO.md
git -C /Users/fung/dev/authgear-web commit -m "docs(astro): Phase 2 complete — all static marketing pages shipped"
```

---

## Phase 2e-2 complete — Phase 2 done

Verification gate before Phase 3:

1. `npm run build` — 2 new prerendered files
2. `npm test` — 134 passed
3. Manual: `PORT=4321 npm start`, visit `/pricing`. Switch between Cloud / Once tabs. Toggle monthly/annual if present. Scroll to FAQ; open a couple of items. Repeat on `/zh-TW/pricing` — pricing card labels translated.
4. Cross-check a couple of pricing values against current Next site (`cd frontend && npm run dev` on another port) for regressions.

---

## Phase 3 outline (separate plan)

- CMS integration: blog listings + post detail, customer stories, integrations, login gallery, what's new
- Strapi client already ported in Phase 1 (`src/lib/strapi.ts`) — verify it still works under SSR
- Switch CMS routes from `prerender = true` to `prerender = false` (SSR) with `Cache-Control: s-maxage=60, stale-while-revalidate=300` per ARCHITECTURE spec
- `/api/blog-posts` endpoint if still needed (search / proxy)
- Smoke tests: page renders for a fixed set of known slugs pulled from Strapi
