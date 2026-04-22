# Astro Migration — Phase 2c-2: Solutions Subtree

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the 7 solution pages (`b2b-saas-authentication`, `ciam-solution`, `customer-identity-and-access-management`, `enterprise-sso`, `external-identity-access-management`, `frontline-workers-identity`, `reduce-sms-otp-cost`) using the dynamic `[slug].astro` route pattern validated in Phase 2c-1.

**Architecture:** Same as Phase 2c-1 — single `src/pages/solutions/[slug].astro` per locale with a typed `pageMap`. Metadata comes from `src/lib/solutions-meta.ts` (ported from the inline pageMap in the Next route; solutions don't have per-page translation namespaces for metadata). One Phase 2d dependency: `SmsCostCalculator` appears on `ReduceSmsOtpCostPage` and gets stubbed as a `data-placeholder` div (same pattern as Phase 1's ContactForm/LogoMarquee stubs on HomePage).

**Tech Stack:** Same as Phase 1/2a/2b/2c-1 — Astro 5, React islands (ContactForm from 2a reused by all 7; LogoMarquee from 2a used on ReduceSmsOtpCost), Playwright smoke tests.

**References:**
- `docs/ARCHITECTURE-ASTRO.md`
- `docs/superpowers/plans/2026-04-21-astro-phase2c1-compare.md` — dynamic route pattern (Standard Conversion Rules apply here too)

**What this phase does NOT do:** features subtree (Phase 2c-3), tools (2d), Once/Pricing (2e). Does not port `SmsCostCalculator` (Phase 2d) — stubs it.

**Exit criteria:**

1. `npm run build` — 14 prerendered files (7 slugs × 2 locales) under `dist/client/solutions/` and `dist/client/zh-TW/solutions/`
2. `npm run test:unit` — 5 passed (unchanged)
3. `npm test` — at least 67 passed (53 existing + 14 new solutions smoke)
4. All 7 slugs return 200 at `/solutions/<slug>` and `/zh-TW/solutions/<slug>`
5. `/solutions/reduce-sms-otp-cost` renders `<div data-placeholder="SmsCostCalculator">` — Phase 2d will replace it

---

## File structure (new)

```
frontend-astro/
├── src/
│   ├── lib/
│   │   └── solutions-meta.ts                # { title, description } per slug
│   ├── components/
│   │   └── pages/
│   │       └── solutions/
│   │           ├── B2bSaasAuthenticationPage.astro
│   │           ├── CiamSolutionPage.astro
│   │           ├── CustomerIdentityAndAccessManagementPage.astro
│   │           ├── EnterpriseSsoPage.astro
│   │           ├── ExternalIdentityAccessManagementPage.astro
│   │           ├── FrontlineWorkersIdentityPage.astro
│   │           └── ReduceSmsOtpCostPage.astro
│   └── pages/
│       ├── solutions/
│       │   └── [slug].astro                 # en — covers 7 slugs
│       └── zh-TW/
│           └── solutions/
│               └── [slug].astro             # zh-TW — covers 7 slugs
└── tests/
    └── phase2c2-solutions.spec.ts
```

**LOC per page (source):**

| Page | LOC | Islands used | Translation |
|---|---:|---|---|
| `CustomerIdentityAndAccessManagementPage.tsx` | 98 | ContactForm | none (static EN) |
| `ExternalIdentityAccessManagementPage.tsx` | 137 | ContactForm | none (static EN) |
| `ReduceSmsOtpCostPage.tsx` | 298 | ContactForm + LogoMarquee + **SmsCostCalculator (stub)** | `ReduceSmsOtpCost` |
| `B2bSaasAuthenticationPage.tsx` | 300 | ContactForm | `B2bSaasAuthentication` |
| `CiamSolutionPage.tsx` | 304 | ContactForm | `CiamSolution` |
| `FrontlineWorkersIdentityPage.tsx` | 331 | ContactForm | `FrontlineWorkersIdentity` |
| `EnterpriseSsoPage.tsx` | 406 | ContactForm | `EnterpriseSso` |

All translation namespaces exist in `frontend-astro/src/i18n/{en,zh-TW}.json` — verified pre-plan.

Pages over 300 LOC (ReduceSmsOtpCost, B2bSaasAuthentication, CiamSolution, FrontlineWorkersIdentity, EnterpriseSso) use the chunked-Edit strategy and silent reporting.

---

## Standard Conversion Rules (shared)

Same as Phase 2b / 2c-1. Key points reiterated:

- `className`→`class`; `<Link>`→`<a>` (drop next/link); `'use client'`→delete
- `getTranslations({locale, namespace:'X'})` / `useTranslations('X')` + `{t('key')}` → `import { t } from '@/i18n'`, `t(locale, 'X.key')`
- `t.rich(...)` → raw string from JSON + regex-substitute inline tags + `set:html` (see HomePage.astro / AboutPage.astro)
- `<PlausibleLink eventName="x" className="z" href="y">…</PlausibleLink>` → `<a href="y" class="z plausible-event-name--x">…</a>`
- `<ContactForm>` → `<ContactForm client:load />` from `@/components/islands/ContactForm`
- `<LogoMarquee ...>` → `<LogoMarquee client:idle customerStoriesHref={localizedPath(locale, '/customer-stories')} ... />` from `@/components/islands/LogoMarquee`
- `<SmsCostCalculator ...>` → `<div data-placeholder="SmsCostCalculator" aria-label="SMS cost calculator (pending port — Phase 2d)"></div>` (stub)
- `dangerouslySetInnerHTML` → `set:html`
- SVG camelCase attrs → kebab-case (`strokeWidth` → `stroke-width`, `fillRule` → `fill-rule`, `clipRule` → `clip-rule`, `strokeLinecap` → `stroke-linecap`, `strokeLinejoin` → `stroke-linejoin`, `strokeMiterlimit` → `stroke-miterlimit`)
- Preserve ALL Webflow classes, `plausible-event-name--*` classes, ids, data-*, inline SVGs, alt text
- **Do NOT modify `frontend/messages/*.json`** — out-of-scope Next.js files. Add missing keys only to Astro i18n if needed.

**Body frontmatter:**

```astro
---
import { t } from '@/i18n';
import { localizedPath } from '@/lib/i18n';
// include island imports only if used:
// import ContactForm from '@/components/islands/ContactForm';
// import LogoMarquee from '@/components/islands/LogoMarquee';
interface Props { locale: string }
const { locale } = Astro.props;
---
```

**Large-file strategy (files >300 LOC):** Write frontmatter + empty `<div class="page-wrapper"></div>` scaffold; use `Edit` calls to insert sections; do NOT echo file contents in response text.

---

## Task 1: Port `src/lib/solutions-meta.ts` (metadata module)

**Files:**
- Read: `/Users/fung/dev/authgear-web/frontend/app/[locale]/solutions/[slug]/page.tsx`
- Create: `/Users/fung/dev/authgear-web/frontend-astro/src/lib/solutions-meta.ts`

- [ ] **Step 1: Extract the metadata from the Next source**

The Next route inlines `title`/`description` per slug in its `pageMap` constant. Copy those exact strings.

- [ ] **Step 2: Write the module**

Create `/Users/fung/dev/authgear-web/frontend-astro/src/lib/solutions-meta.ts`:

```ts
export type SolutionMeta = {
  title: string;
  description: string;
};

export const solutionsMeta: Record<string, SolutionMeta> = {
  'b2b-saas-authentication': {
    title: 'Secure and Scalable B2B SaaS Authentication with Authgear',
    description: "Strengthen your B2B SaaS with Authgear's robust authentication solutions. Protect sensitive data and streamline access.",
  },
  'ciam-solution': {
    title: "Elevate Your B2C Experience with Authgear's CIAM Solution",
    description: "Enhance user experience and security with Authgear's comprehensive CIAM solution. Simplify authentication, boost conversions, and protect your customers.",
  },
  'customer-identity-and-access-management': {
    title: 'Manage Customer Identity and Access with Authgear',
    description: 'More than just a portal to manage customer identity and access, Authgear helps you acquire and retain more customers with frictionless, secure authentication.',
  },
  'enterprise-sso': {
    title: 'Master Enterprise SSO: Secure and Efficient Access Management',
    description: 'Overcome enterprise SSO challenges with expert guidance. Learn best practices, use cases, and solutions to implement a robust SSO strategy.',
  },
  'external-identity-access-management': {
    title: 'Identity and Access Management Solution for Enterprises',
    description: "Authgear's solution for enterprises centralizes identity and access management for your internal and external workforce.",
  },
  'frontline-workers-identity': {
    title: 'Secure & Cost-Effective Access for Your Frontline Workers | Authgear',
    description: 'Managing access for a growing, diverse workforce can be complex. Authgear for Extended Workforce streamlines frontline identity management.',
  },
  'reduce-sms-otp-cost': {
    title: 'Cut SMS OTP Costs by 50-90% | WhatsApp OTP | Authgear',
    description: 'Calculate your SMS OTP savings. Switch to WhatsApp OTP with automatic SMS fallback. See instant results with our interactive calculator.',
  },
};

export type SolutionSlug = keyof typeof solutionsMeta;
```

- [ ] **Step 3: Typecheck**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/lib/solutions-meta.ts
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): add solutions-meta metadata module"
```

---

## Task 2: Port `CustomerIdentityAndAccessManagementPage` (98 LOC — smallest, static EN)

**Files:**
- Read: `/Users/fung/dev/authgear-web/frontend/components/pages/solutions/CustomerIdentityAndAccessManagementPage.tsx`
- Create: `/Users/fung/dev/authgear-web/frontend-astro/src/components/pages/solutions/CustomerIdentityAndAccessManagementPage.astro`

- [ ] **Step 1: Read the source**

```bash
cat /Users/fung/dev/authgear-web/frontend/components/pages/solutions/CustomerIdentityAndAccessManagementPage.tsx
```

- [ ] **Step 2: Port the body**

`mkdir -p /Users/fung/dev/authgear-web/frontend-astro/src/components/pages/solutions` first.

Write the `.astro` file using Standard Conversion Rules. Static English — no `t()` calls in body. Use `<ContactForm client:load />`.

- [ ] **Step 3: Typecheck**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/solutions/CustomerIdentityAndAccessManagementPage.astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port CustomerIdentityAndAccessManagementPage body"
```

---

## Task 3: Port `ExternalIdentityAccessManagementPage` (137 LOC — static EN)

**Files:**
- Read: `/Users/fung/dev/authgear-web/frontend/components/pages/solutions/ExternalIdentityAccessManagementPage.tsx`
- Create: `/Users/fung/dev/authgear-web/frontend-astro/src/components/pages/solutions/ExternalIdentityAccessManagementPage.astro`

- [ ] **Step 1: Read the source**

```bash
cat /Users/fung/dev/authgear-web/frontend/components/pages/solutions/ExternalIdentityAccessManagementPage.tsx
```

- [ ] **Step 2: Port the body**

Apply Standard Conversion Rules. Static English (no `useTranslations`). Use `<ContactForm client:load />`.

- [ ] **Step 3: Typecheck + commit**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/solutions/ExternalIdentityAccessManagementPage.astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port ExternalIdentityAccessManagementPage body"
```

---

## Task 4: Port `ReduceSmsOtpCostPage` (298 LOC — stubs SmsCostCalculator)

**Files:**
- Read: `/Users/fung/dev/authgear-web/frontend/components/pages/solutions/ReduceSmsOtpCostPage.tsx`
- Create: `/Users/fung/dev/authgear-web/frontend-astro/src/components/pages/solutions/ReduceSmsOtpCostPage.astro`

- [ ] **Step 1: Read the source**

```bash
cat /Users/fung/dev/authgear-web/frontend/components/pages/solutions/ReduceSmsOtpCostPage.tsx
```

- [ ] **Step 2: Port the body using chunked-Edit strategy**

Do NOT echo file contents in your response (the 298 LOC size is near the boundary where quoting risks output token exhaustion).

Namespace: `ReduceSmsOtpCost`. Islands: `ContactForm` (client:load), `LogoMarquee` (client:idle). **Stub** `SmsCostCalculator`:

```astro
<!-- Phase 2d: SmsCostCalculator -->
<div data-placeholder="SmsCostCalculator" aria-label="SMS cost calculator (pending port)"></div>
```

Frontmatter:

```astro
---
import { t } from '@/i18n';
import { localizedPath } from '@/lib/i18n';
import ContactForm from '@/components/islands/ContactForm';
import LogoMarquee from '@/components/islands/LogoMarquee';

interface Props { locale: string }
const { locale } = Astro.props;
---
```

- [ ] **Step 3: Typecheck + commit**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/solutions/ReduceSmsOtpCostPage.astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port ReduceSmsOtpCostPage body (SmsCostCalculator stubbed for Phase 2d)"
```

---

## Task 5: Port `B2bSaasAuthenticationPage` (300 LOC — chunked)

**Files:**
- Read: `/Users/fung/dev/authgear-web/frontend/components/pages/solutions/B2bSaasAuthenticationPage.tsx`
- Create: `/Users/fung/dev/authgear-web/frontend-astro/src/components/pages/solutions/B2bSaasAuthenticationPage.astro`

- [ ] **Step 1: Read the source**

```bash
cat /Users/fung/dev/authgear-web/frontend/components/pages/solutions/B2bSaasAuthenticationPage.tsx
```

- [ ] **Step 2: Port using chunked-Edit strategy**

Do NOT echo file contents. Namespace: `B2bSaasAuthentication`. Islands: `ContactForm` (client:load).

Frontmatter:

```astro
---
import { t } from '@/i18n';
import { localizedPath } from '@/lib/i18n';
import ContactForm from '@/components/islands/ContactForm';

interface Props { locale: string }
const { locale } = Astro.props;
---
```

- [ ] **Step 3: Typecheck + commit**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/solutions/B2bSaasAuthenticationPage.astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port B2bSaasAuthenticationPage body"
```

---

## Task 6: Port `CiamSolutionPage` (304 LOC — chunked)

**Files:**
- Read: `/Users/fung/dev/authgear-web/frontend/components/pages/solutions/CiamSolutionPage.tsx`
- Create: `/Users/fung/dev/authgear-web/frontend-astro/src/components/pages/solutions/CiamSolutionPage.astro`

- [ ] **Step 1: Read the source**

```bash
cat /Users/fung/dev/authgear-web/frontend/components/pages/solutions/CiamSolutionPage.tsx
```

- [ ] **Step 2: Port using chunked-Edit strategy**

Do NOT echo file contents. Namespace: **`CiamSolution`** (not `Ciam` — there's a legacy `Ciam` namespace unrelated to this page; the component uses `useTranslations('CiamSolution')`). Islands: `ContactForm` (client:load).

- [ ] **Step 3: Typecheck + commit**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/solutions/CiamSolutionPage.astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port CiamSolutionPage body"
```

---

## Task 7: Port `FrontlineWorkersIdentityPage` (331 LOC — chunked)

**Files:**
- Read: `/Users/fung/dev/authgear-web/frontend/components/pages/solutions/FrontlineWorkersIdentityPage.tsx`
- Create: `/Users/fung/dev/authgear-web/frontend-astro/src/components/pages/solutions/FrontlineWorkersIdentityPage.astro`

- [ ] **Step 1: Read the source**

```bash
cat /Users/fung/dev/authgear-web/frontend/components/pages/solutions/FrontlineWorkersIdentityPage.tsx
```

- [ ] **Step 2: Port using chunked-Edit strategy**

Do NOT echo. Namespace: `FrontlineWorkersIdentity`. Islands: `ContactForm` (client:load).

- [ ] **Step 3: Typecheck + commit**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/solutions/FrontlineWorkersIdentityPage.astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port FrontlineWorkersIdentityPage body"
```

---

## Task 8: Port `EnterpriseSsoPage` (406 LOC — largest; chunked required)

**Files:**
- Read: `/Users/fung/dev/authgear-web/frontend/components/pages/solutions/EnterpriseSsoPage.tsx`
- Create: `/Users/fung/dev/authgear-web/frontend-astro/src/components/pages/solutions/EnterpriseSsoPage.astro`

- [ ] **Step 1: Read the source**

```bash
cat /Users/fung/dev/authgear-web/frontend/components/pages/solutions/EnterpriseSsoPage.tsx
```

- [ ] **Step 2: Port using chunked-Edit strategy (mandatory — largest page)**

Do NOT echo file contents under any circumstances. Work silently. Expect 5-10 top-level sections. Write scaffold first, then one Edit per section.

Namespace: `EnterpriseSso`. Islands: `ContactForm` (client:load).

Scaffold:

```astro
---
import { t } from '@/i18n';
import { localizedPath } from '@/lib/i18n';
import ContactForm from '@/components/islands/ContactForm';

interface Props { locale: string }
const { locale } = Astro.props;
---

<div class="page-wrapper">
</div>
```

- [ ] **Step 3: Typecheck + commit**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/solutions/EnterpriseSsoPage.astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port EnterpriseSsoPage body"
```

---

## Task 9: Create dynamic `solutions/[slug]` routes (en + zh-TW)

**Files:**
- Create: `/Users/fung/dev/authgear-web/frontend-astro/src/pages/solutions/[slug].astro`
- Create: `/Users/fung/dev/authgear-web/frontend-astro/src/pages/zh-TW/solutions/[slug].astro`

- [ ] **Step 1: Create directories**

```bash
mkdir -p /Users/fung/dev/authgear-web/frontend-astro/src/pages/solutions \
         /Users/fung/dev/authgear-web/frontend-astro/src/pages/zh-TW/solutions
```

- [ ] **Step 2: Write the en route**

Create `/Users/fung/dev/authgear-web/frontend-astro/src/pages/solutions/[slug].astro`:

```astro
---
export const prerender = true;

import BaseLayout from '@/layouts/BaseLayout.astro';
import { solutionsMeta, type SolutionSlug } from '@/lib/solutions-meta';

import B2bSaasAuthenticationPage from '@/components/pages/solutions/B2bSaasAuthenticationPage.astro';
import CiamSolutionPage from '@/components/pages/solutions/CiamSolutionPage.astro';
import CustomerIdentityAndAccessManagementPage from '@/components/pages/solutions/CustomerIdentityAndAccessManagementPage.astro';
import EnterpriseSsoPage from '@/components/pages/solutions/EnterpriseSsoPage.astro';
import ExternalIdentityAccessManagementPage from '@/components/pages/solutions/ExternalIdentityAccessManagementPage.astro';
import FrontlineWorkersIdentityPage from '@/components/pages/solutions/FrontlineWorkersIdentityPage.astro';
import ReduceSmsOtpCostPage from '@/components/pages/solutions/ReduceSmsOtpCostPage.astro';

const pageMap = {
  'b2b-saas-authentication': B2bSaasAuthenticationPage,
  'ciam-solution': CiamSolutionPage,
  'customer-identity-and-access-management': CustomerIdentityAndAccessManagementPage,
  'enterprise-sso': EnterpriseSsoPage,
  'external-identity-access-management': ExternalIdentityAccessManagementPage,
  'frontline-workers-identity': FrontlineWorkersIdentityPage,
  'reduce-sms-otp-cost': ReduceSmsOtpCostPage,
} as const;

export function getStaticPaths() {
  return [
    'b2b-saas-authentication',
    'ciam-solution',
    'customer-identity-and-access-management',
    'enterprise-sso',
    'external-identity-access-management',
    'frontline-workers-identity',
    'reduce-sms-otp-cost',
  ].map((slug) => ({ params: { slug } }));
}

const { slug } = Astro.params as { slug: SolutionSlug };
const Component = pageMap[slug];
const meta = solutionsMeta[slug];
if (!Component || !meta) {
  return Astro.redirect('/404');
}

const locale = 'en';
---

<BaseLayout locale={locale} title={meta.title} description={meta.description}>
  <Component locale={locale} />
</BaseLayout>
```

- [ ] **Step 3: Write the zh-TW route**

Create `/Users/fung/dev/authgear-web/frontend-astro/src/pages/zh-TW/solutions/[slug].astro` — identical to the en route except `const locale = 'en';` → `const locale = 'zh-TW';`.

Note: the title/description remain in English for zh-TW because `solutionsMeta` has only English strings (matches current Next behavior — the Next route inlines English metadata regardless of locale).

- [ ] **Step 4: Build**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npm run build 2>&1 | tail -20
```

Expected: build succeeds. Output must list 14 prerendered HTML files (7 slugs × 2 locales).

- [ ] **Step 5: Verify all 14 files exist**

```bash
for slug in b2b-saas-authentication ciam-solution customer-identity-and-access-management enterprise-sso external-identity-access-management frontline-workers-identity reduce-sms-otp-cost; do
  for path in "solutions/$slug" "zh-TW/solutions/$slug"; do
    test -f /Users/fung/dev/authgear-web/frontend-astro/dist/client/$path/index.html && echo "OK: $path" || echo "MISSING: $path"
  done
done
```

Expected: 14 `OK:` lines, 0 `MISSING:`.

- [ ] **Step 6: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/pages/solutions/\[slug\].astro frontend-astro/src/pages/zh-TW/solutions/\[slug\].astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): add dynamic solutions/[slug] routes for en and zh-TW"
```

---

## Task 10: Playwright smoke tests

**Files:**
- Create: `/Users/fung/dev/authgear-web/frontend-astro/tests/phase2c2-solutions.spec.ts`

- [ ] **Step 1: Write the tests**

Create `/Users/fung/dev/authgear-web/frontend-astro/tests/phase2c2-solutions.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

const SLUGS = [
  'b2b-saas-authentication',
  'ciam-solution',
  'customer-identity-and-access-management',
  'enterprise-sso',
  'external-identity-access-management',
  'frontline-workers-identity',
  'reduce-sms-otp-cost',
] as const;

test.describe('Phase 2c-2: solutions/[slug] — en', () => {
  for (const slug of SLUGS) {
    test(`/solutions/${slug} returns 200 with lang=en`, async ({ page }) => {
      const resp = await page.goto(`/solutions/${slug}`);
      expect(resp?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(page.locator('footer').first()).toBeVisible();
    });
  }
});

test.describe('Phase 2c-2: solutions/[slug] — zh-TW', () => {
  for (const slug of SLUGS) {
    test(`/zh-TW/solutions/${slug} returns 200 with lang=zh-TW`, async ({ page }) => {
      const resp = await page.goto(`/zh-TW/solutions/${slug}`);
      expect(resp?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', 'zh-TW');
      await expect(page.locator('footer').first()).toBeVisible();
    });
  }
});

test('reduce-sms-otp-cost has SmsCostCalculator stub (Phase 2d pending)', async ({ page }) => {
  await page.goto('/solutions/reduce-sms-otp-cost');
  const stub = page.locator('[data-placeholder="SmsCostCalculator"]');
  await expect(stub).toHaveCount(1);
});

test('ContactForm hydrates on /solutions/enterprise-sso', async ({ page }) => {
  await page.goto('/solutions/enterprise-sso');
  const nameInput = page.locator('input[name="Name"]').first();
  await expect(nameInput).toBeVisible();
  await nameInput.fill('Enterprise Lead');
  await expect(nameInput).toHaveValue('Enterprise Lead');
});
```

- [ ] **Step 2: Run solutions tests alone**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx playwright test tests/phase2c2-solutions.spec.ts --reporter=line 2>&1 | tail -25
```

Expected: 16 passed (7 en + 7 zh-TW + 1 calc stub + 1 ContactForm hydration).

- [ ] **Step 3: Full suite regression check**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx playwright test --reporter=line 2>&1 | tail -10
```

Expected: 53 existing + 16 new = 69 passed.

- [ ] **Step 4: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/tests/phase2c2-solutions.spec.ts
git -C /Users/fung/dev/authgear-web commit -m "test(astro): smoke tests for solutions/[slug] routes"
```

---

## Task 11: Docs update

**Files:**
- Modify: `frontend-astro/README.md`
- Modify: `docs/ARCHITECTURE-ASTRO.md`

- [ ] **Step 1: Update README Phase status**

Edit `frontend-astro/README.md` — change `- [ ] Phase 2c-2 — Solutions subtree (7 pages)` to `- [x]`.

- [ ] **Step 2: Update ARCHITECTURE status marker**

In `docs/ARCHITECTURE-ASTRO.md`, replace the `**Migration status` line with:

```markdown
**Migration status (2026-04-21):** Phases 1 + 2a + 2b + 2c-1 + 2c-2 shipped on branch `migration/nextjs-to-astro`. Home + 13 static pages + 4 compare + 7 solutions pages live in both locales. `SmsCostCalculator` stubbed on `reduce-sms-otp-cost` pending Phase 2d. Phase 2c-3 (features, 22 pages + 3 islands) plan pending.
```

- [ ] **Step 3: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/README.md docs/ARCHITECTURE-ASTRO.md
git -C /Users/fung/dev/authgear-web commit -m "docs(astro): Phase 2c-2 complete — solutions subtree shipped"
```

---

## Phase 2c-2 complete

Verification gate before Phase 2c-3:

1. `npm run build` — 14 new files under `dist/client/solutions/` + `dist/client/zh-TW/solutions/`
2. `npm test` — 69 passed
3. Manual: `PORT=3000 npm start`, visit `/solutions/enterprise-sso`, `/solutions/reduce-sms-otp-cost`, `/zh-TW/solutions/ciam-solution`. Pages render, ContactForm submits, calculator stub shows as empty div with `data-placeholder="SmsCostCalculator"` attribute.

---

## Phase 2c-3 outline (features subtree — to be planned separately)

- 22 feature pages (4477 LOC total; largest is `SmsPumpingFraudPage` at 352 LOC)
- 3 React islands to port: `BiometricMethodsTabs`, `MfaOptionsTabs`, `SmsPumpingWarningFaqItem` (all tab/accordion components)
- Port `lib/features/data.ts` → `src/lib/features-meta.ts` (used in metadata)
- Dynamic `features/[slug].astro` + zh-TW mirror
- Smoke tests: 44 route assertions + island interactivity checks

Phase 2c-3 may split further if it feels too large during planning.
