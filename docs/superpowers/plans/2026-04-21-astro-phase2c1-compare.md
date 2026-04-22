# Astro Migration — Phase 2c-1: Compare Subtree + Dynamic Route Pattern

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the 4 competitor-comparison pages (`auth0-alternative`, `cognito-alternative`, `firebase-alternative`, `okta-alternative`) to Astro using a single dynamic `[slug]` route per locale. This validates the dynamic route pattern before committing to solutions (7 pages) and features (22 pages).

**Architecture:** Two files replace eight. `src/pages/compare/[slug].astro` handles all 4 English routes via `getStaticPaths()` enumerating a static `pageMap`. `src/pages/zh-TW/compare/[slug].astro` mirrors it. Page bodies live in `src/components/pages/compare/*.astro` and are imported statically at the top of each route file. Metadata comes from the existing per-slug translation namespaces (`Auth0Alternative.metaTitle`, etc.) — verified to already exist in both `en.json` and `zh-TW.json`. No `lib/compare/data.ts` port needed (translations cover everything).

**Tech Stack:** Same as Phase 1/2a/2b — Astro 5, React 19 islands (ContactForm and LogoMarquee from Phase 2a if needed), Playwright smoke tests.

**References:**
- `docs/ARCHITECTURE-ASTRO.md` — target design
- `docs/superpowers/plans/2026-04-21-astro-phase2b-static-pages.md` — Standard Conversion Rules section applies here too
- Next source: `frontend/app/[locale]/compare/[slug]/page.tsx` (the route pattern we're porting)

**What this phase does NOT do:** solutions or features subtrees (separate plans). Does not port `lib/compare/data.ts` — it's redundant with translations; leave it.

**Exit criteria:**

1. `cd frontend-astro && npm run build` — succeeds; dist contains 8 prerendered files (4 compare slugs × 2 locales) under `dist/client/compare/` and `dist/client/zh-TW/compare/`
2. `npm run test:unit` — 5 passed (unchanged)
3. `npm test` — at least 53 passed (45 existing + 8 new compare smoke assertions)
4. All 4 compare slugs return 200 at `/compare/<slug>` and `/zh-TW/compare/<slug>` with correct `<html lang>`

---

## File structure (new)

```
frontend-astro/
├── src/
│   ├── components/
│   │   └── pages/
│   │       └── compare/
│   │           ├── Auth0AlternativePage.astro
│   │           ├── CognitoAlternativePage.astro
│   │           ├── FirebaseAlternativePage.astro
│   │           └── OktaAlternativePage.astro
│   └── pages/
│       ├── compare/
│       │   └── [slug].astro              # en route (covers 4 slugs)
│       └── zh-TW/
│           └── compare/
│               └── [slug].astro          # zh-TW route (covers 4 slugs)
└── tests/
    └── phase2c1-compare.spec.ts
```

**LOC per page (source):**

| Page | LOC |
|---|---|
| `FirebaseAlternativePage.tsx` | 206 |
| `OktaAlternativePage.tsx` | 192 |
| `Auth0AlternativePage.tsx` | 236 |
| `CognitoAlternativePage.tsx` | 238 |

All under 300 LOC — no chunked-Edit strategy required, but work silently (do not echo file contents in response text).

---

## Standard Conversion Rules (shared reference)

Same as Phase 2b. Summary:

| Before | After |
|---|---|
| `className=` | `class=` |
| `<Link href>` | `<a href>`; drop `import Link from 'next/link'` |
| `'use client'` | delete |
| `getTranslations({ locale, namespace: 'XxxAlternative' })` + `{t('key')}` | `import { t } from '@/i18n'`, call `t(locale, 'XxxAlternative.key')` |
| `t.rich(...)` | read raw string + regex-substitute inline tags + `set:html` (pattern established in HomePage/AboutPage) |
| `<PlausibleLink eventName="x" className="z" href="y">` | `<a href="y" class="z plausible-event-name--x">` |
| `<ContactForm>` | `<ContactForm client:load />` — import from `@/components/islands/ContactForm` |
| `<LogoMarquee>` | `<LogoMarquee client:idle customerStoriesHref={localizedPath(locale, '/customer-stories')} ... />` — import from `@/components/islands/LogoMarquee` |
| `dangerouslySetInnerHTML` | `set:html` |
| SVG camelCase | kebab-case: `strokeWidth` → `stroke-width`, `fillRule` → `fill-rule`, `clipRule` → `clip-rule`, `strokeLinecap` → `stroke-linecap`, `strokeLinejoin` → `stroke-linejoin`, `strokeMiterlimit` → `stroke-miterlimit` |

### Body component frontmatter

```astro
---
import { t } from '@/i18n';
import { localizedPath } from '@/lib/i18n';
// import ContactForm / LogoMarquee only if used
interface Props { locale: string }
const { locale } = Astro.props;
---
```

### Preserve verbatim

Every Webflow class, every `plausible-event-name--*` class, every `id` / `data-*` attribute, every inline SVG path, every alt text.

### Out-of-scope rules

- Do NOT modify `frontend/messages/*.json` (Next.js files, out of migration scope). If a translation key is missing, add to `frontend-astro/src/i18n/*.json` only.
- Do NOT port `frontend/lib/compare/data.ts` — the per-slug translation namespace already has `metaTitle` / `metaDescription`.

---

## Task 1: Port `OktaAlternativePage` (192 LOC — smallest; establishes compare pattern)

**Files:**
- Read: `/Users/fung/dev/authgear-web/frontend/components/pages/compare/OktaAlternativePage.tsx`
- Create: `/Users/fung/dev/authgear-web/frontend-astro/src/components/pages/compare/OktaAlternativePage.astro`

- [ ] **Step 1: Read the source**

```bash
cat /Users/fung/dev/authgear-web/frontend/components/pages/compare/OktaAlternativePage.tsx
```

- [ ] **Step 2: Port the body**

Create the .astro file with the standard body frontmatter and apply the Standard Conversion Rules. Namespace used inside the component: `OktaAlternative`.

- [ ] **Step 3: Typecheck**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
```

Expected: no errors. The component is not yet referenced by any route, so a passing typecheck is the only gate at this point — build without a route file would still succeed but produce nothing for this page.

- [ ] **Step 4: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/compare/OktaAlternativePage.astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port OktaAlternativePage body"
```

---

## Task 2: Port `FirebaseAlternativePage` (206 LOC)

**Files:**
- Read: `/Users/fung/dev/authgear-web/frontend/components/pages/compare/FirebaseAlternativePage.tsx`
- Create: `/Users/fung/dev/authgear-web/frontend-astro/src/components/pages/compare/FirebaseAlternativePage.astro`

- [ ] **Step 1: Read the source**

```bash
cat /Users/fung/dev/authgear-web/frontend/components/pages/compare/FirebaseAlternativePage.tsx
```

- [ ] **Step 2: Port the body**

Apply Standard Conversion Rules. Namespace: `FirebaseAlternative`.

- [ ] **Step 3: Typecheck**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/compare/FirebaseAlternativePage.astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port FirebaseAlternativePage body"
```

---

## Task 3: Port `Auth0AlternativePage` (236 LOC)

**Files:**
- Read: `/Users/fung/dev/authgear-web/frontend/components/pages/compare/Auth0AlternativePage.tsx`
- Create: `/Users/fung/dev/authgear-web/frontend-astro/src/components/pages/compare/Auth0AlternativePage.astro`

- [ ] **Step 1: Read the source**

```bash
cat /Users/fung/dev/authgear-web/frontend/components/pages/compare/Auth0AlternativePage.tsx
```

- [ ] **Step 2: Port the body**

Apply Standard Conversion Rules. Namespace: `Auth0Alternative`.

- [ ] **Step 3: Typecheck**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/compare/Auth0AlternativePage.astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port Auth0AlternativePage body"
```

---

## Task 4: Port `CognitoAlternativePage` (238 LOC)

**Files:**
- Read: `/Users/fung/dev/authgear-web/frontend/components/pages/compare/CognitoAlternativePage.tsx`
- Create: `/Users/fung/dev/authgear-web/frontend-astro/src/components/pages/compare/CognitoAlternativePage.astro`

- [ ] **Step 1: Read the source**

```bash
cat /Users/fung/dev/authgear-web/frontend/components/pages/compare/CognitoAlternativePage.tsx
```

- [ ] **Step 2: Port the body**

Apply Standard Conversion Rules. Namespace: `CognitoAlternative`. Note the `CognitoAlternative` JSON uses split `heroTitlePrefix` + `heroTitleSuffix` keys (not a single `heroTitle`) — check the component's usage and port accordingly.

- [ ] **Step 3: Typecheck**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/compare/CognitoAlternativePage.astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port CognitoAlternativePage body"
```

---

## Task 5: Create dynamic `[slug]` route files (en + zh-TW)

**Files:**
- Create: `/Users/fung/dev/authgear-web/frontend-astro/src/pages/compare/[slug].astro`
- Create: `/Users/fung/dev/authgear-web/frontend-astro/src/pages/zh-TW/compare/[slug].astro`

- [ ] **Step 1: Write the en route**

Create `/Users/fung/dev/authgear-web/frontend-astro/src/pages/compare/[slug].astro`:

```astro
---
export const prerender = true;

import BaseLayout from '@/layouts/BaseLayout.astro';
import { t } from '@/i18n';
import Auth0AlternativePage from '@/components/pages/compare/Auth0AlternativePage.astro';
import CognitoAlternativePage from '@/components/pages/compare/CognitoAlternativePage.astro';
import FirebaseAlternativePage from '@/components/pages/compare/FirebaseAlternativePage.astro';
import OktaAlternativePage from '@/components/pages/compare/OktaAlternativePage.astro';

const pageMap = {
  'auth0-alternative': { component: Auth0AlternativePage, namespace: 'Auth0Alternative' },
  'cognito-alternative': { component: CognitoAlternativePage, namespace: 'CognitoAlternative' },
  'firebase-alternative': { component: FirebaseAlternativePage, namespace: 'FirebaseAlternative' },
  'okta-alternative': { component: OktaAlternativePage, namespace: 'OktaAlternative' },
} as const;

type CompareSlug = keyof typeof pageMap;

export function getStaticPaths() {
  return [
    'auth0-alternative',
    'cognito-alternative',
    'firebase-alternative',
    'okta-alternative',
  ].map((slug) => ({ params: { slug } }));
}

const { slug } = Astro.params as { slug: CompareSlug };
const entry = pageMap[slug];
if (!entry) {
  return Astro.redirect('/404');
}

const locale = 'en';
const title = t(locale, `${entry.namespace}.metaTitle`);
const description = t(locale, `${entry.namespace}.metaDescription`);
const Component = entry.component;
---

<BaseLayout locale={locale} title={title} description={description}>
  <Component locale={locale} />
</BaseLayout>
```

- [ ] **Step 2: Write the zh-TW route**

Create `/Users/fung/dev/authgear-web/frontend-astro/src/pages/zh-TW/compare/[slug].astro`:

Same content as Task 5 Step 1 EXCEPT:
- `const locale = 'en';` → `const locale = 'zh-TW';`

Everything else (imports, pageMap, getStaticPaths) is identical.

- [ ] **Step 3: Build**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npm run build 2>&1 | tail -15
```

Expected: build succeeds. Output must list prerendered pages for:
- `/compare/auth0-alternative/index.html`
- `/compare/cognito-alternative/index.html`
- `/compare/firebase-alternative/index.html`
- `/compare/okta-alternative/index.html`
- `/zh-TW/compare/auth0-alternative/index.html`
- `/zh-TW/compare/cognito-alternative/index.html`
- `/zh-TW/compare/firebase-alternative/index.html`
- `/zh-TW/compare/okta-alternative/index.html`

- [ ] **Step 4: Verify all 8 files exist**

```bash
for slug in auth0-alternative cognito-alternative firebase-alternative okta-alternative; do
  for path in "compare/$slug" "zh-TW/compare/$slug"; do
    test -f /Users/fung/dev/authgear-web/frontend-astro/dist/client/$path/index.html && echo "OK: $path" || echo "MISSING: $path"
  done
done
```

Expected: 8 `OK:` lines, no `MISSING:`.

- [ ] **Step 5: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/pages/compare/[slug].astro frontend-astro/src/pages/zh-TW/compare/[slug].astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): add dynamic compare/[slug] routes for en and zh-TW"
```

---

## Task 6: Playwright smoke tests

**Files:**
- Create: `/Users/fung/dev/authgear-web/frontend-astro/tests/phase2c1-compare.spec.ts`

- [ ] **Step 1: Write the tests**

Create `/Users/fung/dev/authgear-web/frontend-astro/tests/phase2c1-compare.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

const SLUGS = [
  'auth0-alternative',
  'cognito-alternative',
  'firebase-alternative',
  'okta-alternative',
] as const;

test.describe('Phase 2c-1: compare/[slug] — en', () => {
  for (const slug of SLUGS) {
    test(`/compare/${slug} returns 200 with lang=en`, async ({ page }) => {
      const resp = await page.goto(`/compare/${slug}`);
      expect(resp?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(page.locator('footer').first()).toBeVisible();
    });
  }
});

test.describe('Phase 2c-1: compare/[slug] — zh-TW', () => {
  for (const slug of SLUGS) {
    test(`/zh-TW/compare/${slug} returns 200 with lang=zh-TW`, async ({ page }) => {
      const resp = await page.goto(`/zh-TW/compare/${slug}`);
      expect(resp?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', 'zh-TW');
      await expect(page.locator('footer').first()).toBeVisible();
    });
  }
});
```

- [ ] **Step 2: Run — expect pass**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx playwright test tests/phase2c1-compare.spec.ts --reporter=line 2>&1 | tail -20
```

Expected: 8 passed.

- [ ] **Step 3: Full suite regression check**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx playwright test --reporter=line 2>&1 | tail -10
```

Expected: 45 existing + 8 new = 53 passed.

- [ ] **Step 4: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/tests/phase2c1-compare.spec.ts
git -C /Users/fung/dev/authgear-web commit -m "test(astro): smoke tests for compare/[slug] routes"
```

---

## Task 7: Docs update

**Files:**
- Modify: `frontend-astro/README.md`
- Modify: `docs/ARCHITECTURE-ASTRO.md`

- [ ] **Step 1: Update README phase checklist**

Edit `/Users/fung/dev/authgear-web/frontend-astro/README.md`. Find the Phase status list and change the Phase 2c line. Since we're now splitting 2c into three sub-phases, replace the single `- [ ] Phase 2c …` entry with three finer-grained entries:

```markdown
- [x] Phase 1 — Foundation
- [x] Phase 2a — Core islands + home parity (ContactForm, LogoMarquee, /api/contact)
- [x] Phase 2b — Simple static marketing pages (~13 pages)
- [x] Phase 2c-1 — Compare subtree + dynamic route pattern (4 pages)
- [ ] Phase 2c-2 — Solutions subtree (7 pages)
- [ ] Phase 2c-3 — Features subtree + tab islands (22 pages + 3 islands)
- [ ] Phase 2d — Tools subtree + SMS calculator
- [ ] Phase 2e — Once page + Pricing page
- [ ] Phase 3 — CMS-backed pages (blog, customer stories, etc.)
- [ ] Phase 4 — Fly.io deployment + cutover
```

- [ ] **Step 2: Update ARCHITECTURE status marker**

Edit `/Users/fung/dev/authgear-web/docs/ARCHITECTURE-ASTRO.md`. Find the line starting with `**Migration status` and replace with:

```markdown
**Migration status (2026-04-21):** Phases 1 + 2a + 2b + 2c-1 shipped on branch `migration/nextjs-to-astro`. Home + 13 static pages + 4 compare pages live in both locales (dynamic route pattern validated). Phase 2c-2 (solutions) plan pending. See `docs/superpowers/plans/`.
```

- [ ] **Step 3: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/README.md docs/ARCHITECTURE-ASTRO.md
git -C /Users/fung/dev/authgear-web commit -m "docs(astro): Phase 2c-1 complete — compare subtree shipped"
```

---

## Phase 2c-1 complete

Verification gate before Phase 2c-2:

1. `npm run build` — 8 new prerendered files under `dist/client/compare/` and `dist/client/zh-TW/compare/`
2. `npm test` — 53 passed
3. Manual: `PORT=3000 npm start`, visit `/compare/okta-alternative` and `/zh-TW/compare/okta-alternative`. Page renders with correct locale, nav/footer in place.
4. Confirm no 404s on any of the 4 slugs

---

## Phase 2c-2 / 2c-3 outline (detailed plans to follow)

### Phase 2c-2: Solutions subtree (7 pages)

Same pattern as 2c-1:
- Port 7 solution pages into `src/components/pages/solutions/*.astro`
- Create `src/pages/solutions/[slug].astro` + `zh-TW/solutions/[slug].astro`
- Namespace per slug already exists; metadata comes from the solutions pageMap in the Next source (the Next version inlines title/description per entry — port to a typed TS module `src/lib/solutions-meta.ts`)
- `ReduceSmsOtpCostPage` uses `SmsCostCalculator` — that island ships in Phase 2d, so Phase 2c-2 stubs it as `<div data-placeholder="SmsCostCalculator"></div>` (same pattern as Phase 1's ContactForm stub)
- Smoke tests: 14 new assertions (7 en + 7 zh-TW)

### Phase 2c-3: Features subtree (22 pages + 3 tab islands)

Biggest of the three. Split further if needed:
- Port 3 React islands: `BiometricMethodsTabs.tsx`, `MfaOptionsTabs.tsx`, `SmsPumpingWarningFaqItem.tsx` to `src/components/islands/`
- Port 22 feature pages (4477 LOC total; largest is `SmsPumpingFraudPage` at 352 LOC — chunked strategy)
- Port `lib/features/data.ts` to `src/lib/features-meta.ts` (typed title/description by slug) — this one is used in the route's `generateMetadata`, so port it
- Create `src/pages/features/[slug].astro` + `zh-TW/features/[slug].astro`
- Smoke tests: 44 new assertions (22 en + 22 zh-TW) plus interactive island checks
