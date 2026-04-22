# Astro Migration — Phase 2e-1: Once Page

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the ONCE product page (504 LOC) and its three sub-components — SDK framework tabs, inline code-snippet rendering, and FAQ accordion — to Astro.

**Architecture:** `OncePage.tsx` is a server-rendered page (async `getTranslations`), so it ports to `.astro`. The SDK tab switcher is a hybrid: static Webflow markup with 7 framework tabs + 7 code panels is rendered in `.astro`, wrapped by a small React island (`OnceSdkFrameworkHarness`, `client:visible`) that attaches click handlers to toggle active-class styling on the pre-rendered DOM via `data-once-sdk` / `data-once-panel` attributes. `OnceSdkCode.tsx` (inline code highlighter) stays as a regular React component — Astro SSRs it during build, no hydration. `OncePageFaq.tsx` is an island that uses `PricingFaqItem` (also an island, shared with Phase 2e-2 — ported here since Once needs it first).

**Tech Stack:** Same as prior phases.

**References:**
- `docs/ARCHITECTURE-ASTRO.md`
- `docs/superpowers/plans/2026-04-22-astro-phase2d2-tools.md` — React-island-with-local-`t()`-adapter pattern reused

**What this phase does NOT do:** Pricing page (Phase 2e-2). Port only `PricingFaqItem` — the rest of pricing stays in Phase 2e-2.

**Exit criteria:**

1. `npm run build` — 2 new prerendered files (`/once`, `/zh-TW/once`)
2. `npm run test:unit` — 5 passed (unchanged)
3. `npm test` — at least 130 passed (127 existing + 3 new: 2 route assertions + 1 SDK tab-switch interactivity)
4. Manual: `/once` renders with 7 SDK tabs; clicking each pill swaps visible code; FAQ accordion items open/close

---

## File structure (new)

```
frontend-astro/
├── src/
│   ├── lib/
│   │   └── once-sdk-code-samples.ts            # data module (verbatim)
│   ├── components/
│   │   ├── islands/
│   │   │   ├── pricing/
│   │   │   │   └── PricingFaqItem.tsx          # shared FAQ accordion item
│   │   │   └── once/
│   │   │       ├── OnceSdkFrameworkHarness.tsx # click-handler island
│   │   │       └── OncePageFaq.tsx             # FAQ island
│   │   └── pages/
│   │       ├── OnceSdkCode.tsx                 # React code highlighter (SSR-only)
│   │       └── OncePage.astro                  # the page body
│   └── pages/
│       ├── once.astro                          # en route
│       └── zh-TW/
│           └── once.astro                      # zh-TW route
└── tests/
    └── phase2e1-once.spec.ts
```

---

## Task 1: Port `once-sdk-code-samples.ts` (data module)

**Files:**
- Create: `frontend-astro/src/lib/once-sdk-code-samples.ts`

- [ ] **Step 1: Copy verbatim**

```bash
cp /Users/fung/dev/authgear-web/frontend/lib/once-sdk-code-samples.ts \
   /Users/fung/dev/authgear-web/frontend-astro/src/lib/once-sdk-code-samples.ts
```

- [ ] **Step 2: Typecheck**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
```

Expected: no errors (it's a pure string-literals module).

- [ ] **Step 3: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/lib/once-sdk-code-samples.ts
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port once-sdk-code-samples data module"
```

---

## Task 2: Port `PricingFaqItem` as React island

**Files:**
- Create: `frontend-astro/src/components/islands/pricing/PricingFaqItem.tsx`

- [ ] **Step 1: Copy source, remove Next directive**

```bash
mkdir -p /Users/fung/dev/authgear-web/frontend-astro/src/components/islands/pricing
cp /Users/fung/dev/authgear-web/frontend/components/pricing/PricingFaqAccordion.tsx \
   /Users/fung/dev/authgear-web/frontend-astro/src/components/islands/pricing/PricingFaqItem.tsx
```

- [ ] **Step 2: Adapt**

Edit the destination file:
- Delete the `'use client';` directive (top line) — not needed; Astro islands don't use it
- Keep everything else (React hooks: `useId`, `useState`; props type; default export)

The exported name stays `PricingFaqItem` (it's a named export `export function PricingFaqItem`). Verify:

```bash
grep -n "export" /Users/fung/dev/authgear-web/frontend-astro/src/components/islands/pricing/PricingFaqItem.tsx
```

Expected: `export function PricingFaqItem`.

- [ ] **Step 3: Typecheck + commit**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/islands/pricing/PricingFaqItem.tsx
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port PricingFaqItem as React island"
```

---

## Task 3: Port `OnceSdkCode` as React component

**Files:**
- Create: `frontend-astro/src/components/pages/OnceSdkCode.tsx`

- [ ] **Step 1: Copy verbatim**

```bash
cp /Users/fung/dev/authgear-web/frontend/components/pages/OnceSdkCode.tsx \
   /Users/fung/dev/authgear-web/frontend-astro/src/components/pages/OnceSdkCode.tsx
```

The source has no `'use client';` directive, no Next imports. Pure React with `ReactNode` type.

- [ ] **Step 2: Typecheck + commit**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/OnceSdkCode.tsx
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port OnceSdkCode (server-rendered React)"
```

---

## Task 4: Port `OnceSdkFrameworkHarness` as React island

**Files:**
- Create: `frontend-astro/src/components/islands/once/OnceSdkFrameworkHarness.tsx`

- [ ] **Step 1: Copy + adapt**

```bash
mkdir -p /Users/fung/dev/authgear-web/frontend-astro/src/components/islands/once
cp /Users/fung/dev/authgear-web/frontend/components/pages/OnceSdkFrameworkHarness.tsx \
   /Users/fung/dev/authgear-web/frontend-astro/src/components/islands/once/OnceSdkFrameworkHarness.tsx
```

- [ ] **Step 2: Remove `'use client'`**

Edit the file, delete line 1 (`'use client';`).

Everything else stays: `useEffect`, `useRef`, the DOM-enhancer pattern (querySelectorAll over `data-once-sdk` / `data-once-panel`), `display: contents` wrapper. The component still accepts `children: ReactNode`.

- [ ] **Step 3: Typecheck + commit**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/islands/once/OnceSdkFrameworkHarness.tsx
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port OnceSdkFrameworkHarness as React island"
```

---

## Task 5: Port `OncePageFaq` as React island

**Files:**
- Create: `frontend-astro/src/components/islands/once/OncePageFaq.tsx`

- [ ] **Step 1: Copy source**

```bash
cp /Users/fung/dev/authgear-web/frontend/components/pages/OncePageFaq.tsx \
   /Users/fung/dev/authgear-web/frontend-astro/src/components/islands/once/OncePageFaq.tsx
```

- [ ] **Step 2: Adapt**

Edit `/Users/fung/dev/authgear-web/frontend-astro/src/components/islands/once/OncePageFaq.tsx`:

1. Delete line 1: `'use client';`
2. Remove `import { useTranslations } from 'next-intl';`
3. Replace `import { PricingFaqItem } from '@/components/pricing/PricingFaqAccordion';` with `import { PricingFaqItem } from '@/components/islands/pricing/PricingFaqItem';`
4. Add `import { t as tFn } from '@/i18n';` at top
5. Find the component signature. It currently reads something like `export default function OncePageFaq() {` with `const t = useTranslations('Once');` inside. Change to:

```tsx
interface Props { locale: string }
export default function OncePageFaq({ locale }: Props) {
  const t = (key: string): string => tFn(locale, `Once.${key}`);
  // ... rest of the function body unchanged
```

And delete the old `const t = useTranslations('Once');` line.

- [ ] **Step 3: Typecheck + commit**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/islands/once/OncePageFaq.tsx
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port OncePageFaq as React island"
```

---

## Task 6: Port `OncePage.astro` body (504 LOC — chunked strategy)

**Files:**
- Create: `frontend-astro/src/components/pages/OncePage.astro`

**CRITICAL PROCESS RULE**: This file is 504 LOC with extensive inline SVGs + 7 code panels. Your response text MUST stay under 300 words. Do NOT echo/quote/summarize file contents. Use Write (scaffold) + multiple Edit calls per section.

- [ ] **Step 1: Read the source**

```bash
cat /Users/fung/dev/authgear-web/frontend/components/pages/OncePage.tsx
```

- [ ] **Step 2: Write scaffold**

Write `/Users/fung/dev/authgear-web/frontend-astro/src/components/pages/OncePage.astro` with frontmatter:

```astro
---
import { t } from '@/i18n';
import { localizedPath } from '@/lib/i18n';
import LogoMarquee, { ONCE_SDK_MARQUEE_LOGOS } from '@/components/islands/LogoMarquee';
import OncePageFaq from '@/components/islands/once/OncePageFaq';
import OnceSdkFrameworkHarness from '@/components/islands/once/OnceSdkFrameworkHarness';
import OnceSdkCode from '@/components/pages/OnceSdkCode';
import { ONCE_SDK_CODE_SAMPLES } from '@/lib/once-sdk-code-samples';

interface Props { locale: string }
const { locale } = Astro.props;
---

<div class="page-wrapper">
</div>
```

Note: `ONCE_SDK_MARQUEE_LOGOS` is exported from the existing Phase 2a `LogoMarquee` island at `@/components/islands/LogoMarquee`. Verify with `grep "ONCE_SDK_MARQUEE_LOGOS" /Users/fung/dev/authgear-web/frontend-astro/src/components/islands/LogoMarquee.tsx`.

- [ ] **Step 3: Section-by-section Edit**

Port the OncePage body section-by-section. Apply these rules:

- `className`→`class`; `<Link>`→`<a>` (drop next/link); `'use client'`→delete
- `t('key')` from `useTranslations('Once')` → `{t(locale, 'Once.key')}`
- `t('key')` from `useTranslations('Home')` → `{t(locale, 'Home.key')}` (OncePage uses both)
- `t.rich('key', { br: () => <br /> })` → read raw string from JSON + regex substitute `<br>` → `<br />` + `set:html`
- `<LogoMarquee logos={ONCE_SDK_MARQUEE_LOGOS} ...props>` → `<LogoMarquee client:idle logos={ONCE_SDK_MARQUEE_LOGOS} customerStoriesHref={localizedPath(locale, '/customer-stories')} ...props />`
- `<OnceSdkFrameworkHarness>...children...</OnceSdkFrameworkHarness>` → `<OnceSdkFrameworkHarness client:visible>...children...</OnceSdkFrameworkHarness>` — children stay SSR-rendered
- `<OnceSdkCode source={ONCE_SDK_CODE_SAMPLES.xyz} />` → unchanged (renders SSR inside the harness)
- `<OncePageFaq />` → `<OncePageFaq client:visible locale={locale} />`
- `<PlausibleLink eventName="x" className="z" href="y">` → `<a href="y" class="z plausible-event-name--x">`
- `dangerouslySetInnerHTML` → `set:html`
- SVG camelCase → kebab-case

Preserve all Webflow classes, `plausible-event-name--*` classes, ids, `data-once-sdk` / `data-once-panel` attrs (critical — the harness queries by these), inline SVGs, alt text.

- [ ] **Step 4: Typecheck + commit**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/OncePage.astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port OncePage body"
```

Reporting format for this task's agent: Status, commit SHA, LOC of output, number of Edit sections used, count of t(locale) calls, whether any surprises (e.g. missing translations, nested components not covered by rules). Do NOT echo file contents.

---

## Task 7: Wire up `/once` routes

**Files:**
- Create: `frontend-astro/src/pages/once.astro`
- Create: `frontend-astro/src/pages/zh-TW/once.astro`

- [ ] **Step 1: Check translation keys**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && node -e "const d=require('./src/i18n/en.json'); console.log('Once.title:', d.Once?.title); console.log('Once.description:', d.Once?.description);"
```

If `Once.title` / `Once.description` are missing, add them to `frontend-astro/src/i18n/en.json` and `zh-TW.json` only (NOT Next.js messages). If present, proceed.

- [ ] **Step 2: Write en route**

Create `/Users/fung/dev/authgear-web/frontend-astro/src/pages/once.astro`:

```astro
---
export const prerender = true;
import BaseLayout from '@/layouts/BaseLayout.astro';
import { t } from '@/i18n';
import OncePage from '@/components/pages/OncePage.astro';

const locale = 'en';
const title = t(locale, 'Once.title');
const description = t(locale, 'Once.description');
---

<BaseLayout locale={locale} title={title} description={description}>
  <OncePage locale={locale} />
</BaseLayout>
```

- [ ] **Step 3: Write zh-TW route**

Create `/Users/fung/dev/authgear-web/frontend-astro/src/pages/zh-TW/once.astro` — identical to en except `const locale = 'en';` → `const locale = 'zh-TW';`.

- [ ] **Step 4: Build**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npm run build 2>&1 | tail -10
```

Expected: build succeeds. Output includes `/once/index.html` and `/zh-TW/once/index.html`.

- [ ] **Step 5: Verify**

```bash
test -f /Users/fung/dev/authgear-web/frontend-astro/dist/client/once/index.html && echo "OK en"
test -f /Users/fung/dev/authgear-web/frontend-astro/dist/client/zh-TW/once/index.html && echo "OK zh-TW"
```

Expected: `OK en` and `OK zh-TW`.

- [ ] **Step 6: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/pages/once.astro frontend-astro/src/pages/zh-TW/once.astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): wire up /once routes (en + zh-TW)"
```

---

## Task 8: Playwright smoke tests

**Files:**
- Create: `frontend-astro/tests/phase2e1-once.spec.ts`

- [ ] **Step 1: Write the tests**

Create `/Users/fung/dev/authgear-web/frontend-astro/tests/phase2e1-once.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

test.describe('Phase 2e-1: /once', () => {
  test('/once returns 200 with lang=en', async ({ page }) => {
    const resp = await page.goto('/once');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('footer').first()).toBeVisible();
  });

  test('/zh-TW/once returns 200 with lang=zh-TW', async ({ page }) => {
    const resp = await page.goto('/zh-TW/once');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-TW');
  });

  test('SDK framework tabs switch visible code on click', async ({ page }) => {
    await page.goto('/once');
    // Find the framework picker; each tab has data-once-sdk="react|vue|angular|…"
    const reactTab = page.locator('[data-once-sdk="react"]').first();
    const vueTab = page.locator('[data-once-sdk="vue"]').first();
    await reactTab.scrollIntoViewIfNeeded();
    await expect(reactTab).toBeVisible();
    await expect(vueTab).toBeVisible();

    // Initially react panel should be visible (harness calls setActive('react') on mount)
    const reactPanel = page.locator('[data-once-panel="react"]');
    const vuePanel = page.locator('[data-once-panel="vue"]');

    // Click Vue tab — should hide react panel, show vue panel
    await vueTab.click();
    // Vue panel becomes visible (display !== 'none')
    await expect(vuePanel).toBeVisible();
    // React panel hides (display: none set by harness)
    await expect(reactPanel).toHaveCSS('display', 'none');
  });
});
```

- [ ] **Step 2: Run the tests**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx playwright test tests/phase2e1-once.spec.ts --reporter=line 2>&1 | tail -15
```

Expected: 3 passed.

**If the SDK tab-switch test fails**, the harness didn't hydrate or the `data-once-sdk` attributes didn't survive porting. Inspect the rendered HTML:

```bash
curl -s http://localhost:4321/once | grep -oE 'data-once-(sdk|panel)="[^"]+"' | sort -u | head -20
```

Expected output: 7 `data-once-sdk="..."` lines (react, vue, angular, react-native, flutter, ios, android) + 7 matching `data-once-panel="..."` lines. If fewer, attributes were lost in the port — go fix OncePage.astro.

- [ ] **Step 3: Full regression**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx playwright test --reporter=line 2>&1 | tail -10
```

Expected: 127 existing + 3 new = 130 passed.

- [ ] **Step 4: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/tests/phase2e1-once.spec.ts
git -C /Users/fung/dev/authgear-web commit -m "test(astro): smoke tests for /once + SDK tab interactivity"
```

---

## Task 9: Docs update

**Files:**
- Modify: `frontend-astro/README.md`
- Modify: `docs/ARCHITECTURE-ASTRO.md`

- [ ] **Step 1: Update README**

Edit `frontend-astro/README.md`. Find the Phase status list. Replace the single `- [ ] Phase 2e — Once page + Pricing page` entry with two finer entries:

```markdown
- [x] Phase 2e-1 — Once page (SDK tab switcher + FAQ accordion)
- [ ] Phase 2e-2 — Pricing page (comparison table + toggle + FAQ)
```

- [ ] **Step 2: Update ARCHITECTURE status marker**

In `docs/ARCHITECTURE-ASTRO.md`, replace the `**Migration status` line with:

```markdown
**Migration status (2026-04-22):** Phases 1 + 2a + 2b + 2c + 2d + 2e-1 shipped on branch `migration/nextjs-to-astro`. Home + 13 static + 4 compare + 7 solutions + 19 features + 9 tools + Once page live in both locales. SDK framework tab switcher and OncePageFaq accordion hydrate. Phase 2e-2 (Pricing) plan pending.
```

- [ ] **Step 3: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/README.md docs/ARCHITECTURE-ASTRO.md
git -C /Users/fung/dev/authgear-web commit -m "docs(astro): Phase 2e-1 complete — Once page shipped"
```

---

## Phase 2e-1 complete

Verification gate before Phase 2e-2:

1. `npm run build` — 2 new prerendered files
2. `npm test` — 130 passed
3. Manual: `PORT=4321 npm start`, visit `/once`. Click each framework tab — code should swap. Scroll to FAQ — accordion items should open/close when clicked. Repeat on `/zh-TW/once`.

---

## Phase 2e-2 outline (separate plan)

- Port `lib/pricing/` — `copy-en.ts`, `copy-zh-TW.ts`, `types.ts`, `cells.ts`, `data/*` (structured pricing data)
- Port `PricingPageClient.tsx` (459 LOC — the interactive toggle + comparison table) as a React island
- Port `PricingPageView.tsx` as `.astro` (thin wrapper that passes copy + locale)
- Reuse `PricingFaqItem` (shipped in Phase 2e-1)
- Wire `/pricing` + `/zh-TW/pricing` routes
- Smoke tests: route render + monthly/annual toggle + FAQ interactivity
