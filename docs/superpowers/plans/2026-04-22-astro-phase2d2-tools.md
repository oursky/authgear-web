# Astro Migration — Phase 2d-2: Tools Subtree

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the 9 interactive developer tools (`base64-decode-encode`, `hmac-signature-generator-verifier`, `jwk-generator`, `jwt-jwe-debugger`, `oidc-discovery-endpoint`, `password-hash-generator`, `ssl-checker`, `totp-authenticator`, `uuidv7-generator`) plus 8 shared `Tool*` components, the `TOOL_SLUG_PREFIX` map, and the tool-specific translation modules. Each tool page mounts as a full-page React island via `client:load`.

**Architecture:** Unlike prior subtrees where each page was `.astro` with sparse islands, all 9 tool pages are marked `'use client'` in source because they each contain interactive widgets (encoders, generators, debuggers). The clean Astro fit is: keep each page as a React component, mount the entire tool page as an island via `<Component client:load locale={locale} />` in the dynamic route. Shared `Tool*` components (hero, FAQ, widget, etc.) are imported as regular React children of the page islands — no special directives needed. Tool translations live in `src/lib/tools/messages/{en,zh-TW}/` as TypeScript modules (mirroring the Next structure); `src/i18n/index.ts` is extended to merge them under the `Tools` namespace, so existing `t(locale, 'Tools.uuidV7.heroTitle')`-style lookups work without new helpers.

**Tech Stack:** Same as prior phases. No new runtime dependencies.

**References:**
- `docs/ARCHITECTURE-ASTRO.md`
- `docs/superpowers/plans/2026-04-21-astro-phase2d1-sms-calculator.md` — established the "full-page React island with interpolating `t()` adapter" pattern we reuse here

**What this phase does NOT do:** Once / Pricing (Phase 2e). Does not touch the `frontend/` Next.js app.

**Exit criteria:**

1. `npm run build` — 18 new prerendered files (9 slugs × 2 locales) under `dist/client/tools/` + `dist/client/zh-TW/tools/`
2. `npm run test:unit` — 5 passed (unchanged)
3. `npm test` — at least 127 passed (107 existing + 18 route assertions + 2 interactivity checks)
4. All 9 tool slugs return 200 at both `/tools/<slug>` and `/zh-TW/tools/<slug>`
5. Two tool pages verified interactive:
   - `/tools/uuidv7-generator` — clicking the generate button produces a valid UUID v7 string
   - `/tools/base64-decode-encode` — entering text and clicking encode produces the base64 output

---

## File structure (new / modified)

```
frontend-astro/
├── src/
│   ├── lib/
│   │   └── tools/
│   │       ├── toolSlugPrefix.ts                   # slug → namespace prefix
│   │       └── messages/
│   │           ├── en/
│   │           │   ├── index.ts
│   │           │   ├── common.ts
│   │           │   ├── base64.ts hmac.ts jwk.ts jwtJwe.ts oidc.ts
│   │           │   └── passwordHash.ts ssl.ts totp.ts uuidV7.ts
│   │           └── zh-TW/
│   │               └── (mirror of en/)
│   ├── i18n/
│   │   └── index.ts                                # MODIFY — merge tools messages
│   ├── components/
│   │   ├── tools/                                  # Shared Tool* components (all .tsx)
│   │   │   ├── MoreDevTools.tsx
│   │   │   ├── ToolFaq.tsx
│   │   │   ├── ToolFeatureCards.tsx
│   │   │   ├── ToolHero.tsx
│   │   │   ├── ToolHowItWorks.tsx
│   │   │   ├── ToolPopup.tsx
│   │   │   ├── ToolReadyTo.tsx
│   │   │   └── ToolWidget.tsx
│   │   └── pages/
│   │       └── tools/                              # Full-page React components (all .tsx)
│   │           ├── Base64Page.tsx
│   │           ├── HmacPage.tsx
│   │           ├── JwkGeneratorPage.tsx
│   │           ├── JwtDebuggerPage.tsx
│   │           ├── OidcDiscoveryPage.tsx
│   │           ├── PasswordHashPage.tsx
│   │           ├── SslCheckerPage.tsx
│   │           ├── TotpPage.tsx
│   │           └── UuidV7Page.tsx
│   └── pages/
│       ├── tools/
│       │   └── [slug].astro                        # en route — covers 9 slugs
│       └── zh-TW/
│           └── tools/
│               └── [slug].astro                    # zh-TW mirror
└── tests/
    └── phase2d2-tools.spec.ts
```

---

## Standard conversion rules (tools-specific)

Different from earlier phases because tool pages stay as React (not `.astro`):

### For shared Tool* components (`frontend/components/tools/*.tsx` → `frontend-astro/src/components/tools/*.tsx`)

- Copy verbatim, then:
- Delete `'use client';` if present (unneeded — imported by React islands)
- Replace `import Link from 'next/link'` → use plain `<a>` (swap `<Link>` for `<a>` and drop the import)
- Replace `import PlausibleLink from '@/components/PlausibleLink'` → use plain `<a>` with `plausible-event-name--X` class appended:
  - `<PlausibleLink eventName="x" className="z" href="y">…</PlausibleLink>` → `<a className="z plausible-event-name--x" href="y">…</a>`
- Translation calls (`useTranslations('Tools.common')` etc.) need the `locale` prop pattern — add a `locale: string` prop to every component that uses translations, thread it through, and create a local `t()` adapter (see tool page rules below)

### For tool pages (`frontend/components/pages/tools/*.tsx` → `frontend-astro/src/components/pages/tools/*.tsx`)

Each page is a React component that becomes a `client:load` island.

- Delete `'use client';` (Astro islands don't need it)
- Remove `import { useTranslations } from 'next-intl';`
- Add at top:
  ```ts
  import { t as tFn } from '@/i18n';
  ```
- Change signature from `export default function XPage() {` to:
  ```ts
  interface Props { locale: string }

  function interpolate(template: string, vars: Record<string, string | number>): string {
    return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));
  }

  export default function XPage({ locale }: Props) {
    const t = (key: string, vars?: Record<string, string | number>): string => {
      const s = tFn(locale, `Tools.PREFIX.${key}`);
      return vars ? interpolate(s, vars) : s;
    };
  ```
  where `PREFIX` is from the TOOL_SLUG_PREFIX map (`base64`, `hmac`, `jwk`, `jwtJwe`, `oidc`, `passwordHash`, `ssl`, `totp`, `uuidV7`).
- Delete the existing `const t = useTranslations('Tools.PREFIX');` line (it's replaced by the local adapter)
- If the page uses a second hook like `const tCommon = useTranslations('Tools.common');`, add a second adapter:
  ```ts
  const tCommon = (key: string, vars?: Record<string, string | number>): string => {
    const s = tFn(locale, `Tools.common.${key}`);
    return vars ? interpolate(s, vars) : s;
  };
  ```
- `<Link>` → `<a>`, drop the import
- `<PlausibleLink eventName="x" className="z">` → `<a className="z plausible-event-name--x">`
- Pass `locale` down to any shared Tool* components that take it (e.g. `<ToolHero locale={locale} ... />` if ToolHero uses translations)

### Preserve

- All Webflow / Tailwind classes
- All `plausible-event-name--*` classes
- All inline SVGs, `id` attrs, `data-*` attrs
- All widget logic (encoders, generators, etc.)

---

## Task 1: Infrastructure — toolSlugPrefix + tool messages + i18n merge

**Files:**
- Create: `frontend-astro/src/lib/tools/toolSlugPrefix.ts`
- Create: `frontend-astro/src/lib/tools/messages/en/` (11 files)
- Create: `frontend-astro/src/lib/tools/messages/zh-TW/` (11 files)
- Modify: `frontend-astro/src/i18n/index.ts`

- [ ] **Step 1: Copy `toolSlugPrefix.ts`**

```bash
mkdir -p /Users/fung/dev/authgear-web/frontend-astro/src/lib/tools
cp /Users/fung/dev/authgear-web/frontend/lib/tools/toolSlugPrefix.ts \
   /Users/fung/dev/authgear-web/frontend-astro/src/lib/tools/toolSlugPrefix.ts
```

- [ ] **Step 2: Copy tool message modules (both locales)**

```bash
mkdir -p /Users/fung/dev/authgear-web/frontend-astro/src/lib/tools/messages
cp -R /Users/fung/dev/authgear-web/frontend/lib/tools/messages/en \
      /Users/fung/dev/authgear-web/frontend-astro/src/lib/tools/messages/en
cp -R /Users/fung/dev/authgear-web/frontend/lib/tools/messages/zh-TW \
      /Users/fung/dev/authgear-web/frontend-astro/src/lib/tools/messages/zh-TW
```

Verify:
```bash
ls /Users/fung/dev/authgear-web/frontend-astro/src/lib/tools/messages/en \
   /Users/fung/dev/authgear-web/frontend-astro/src/lib/tools/messages/zh-TW
```

Each directory should have 11 `.ts` files: `index.ts`, `common.ts`, `base64.ts`, `hmac.ts`, `jwk.ts`, `jwtJwe.ts`, `oidc.ts`, `passwordHash.ts`, `ssl.ts`, `totp.ts`, `uuidV7.ts`.

- [ ] **Step 3: Modify `src/i18n/index.ts` to merge tool messages**

Read the current file at `/Users/fung/dev/authgear-web/frontend-astro/src/i18n/index.ts`. It currently looks like:

```ts
import en from './en.json';
import zhTW from './zh-TW.json';

const messages: Record<string, Record<string, unknown>> = {
  en,
  'zh-TW': zhTW,
};
// ...rest of file (lookup, t function, etc.)
```

Edit so the top reads:

```ts
import en from './en.json';
import zhTW from './zh-TW.json';
import { toolsMessagesEn } from '@/lib/tools/messages/en';
import { toolsMessagesZhTW } from '@/lib/tools/messages/zh-TW';

const messages: Record<string, Record<string, unknown>> = {
  en: { ...en, Tools: toolsMessagesEn },
  'zh-TW': { ...zhTW, Tools: toolsMessagesZhTW },
};
// ...rest of file unchanged
```

- [ ] **Step 4: Typecheck + unit test regression**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
cd /Users/fung/dev/authgear-web/frontend-astro && npm run test:unit
```

Expected: typecheck clean; 5 vitest tests pass (i18n helper).

- [ ] **Step 5: Verify a tool translation resolves**

Quick sanity check — run Node to confirm the merge works:

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && node --experimental-strip-types --experimental-transform-types -e "import('./src/i18n/index.ts').then(({ t }) => { console.log(t('en', 'Tools.uuidV7.heroTitle')); console.log(t('zh-TW', 'Tools.uuidV7.heroTitle')); })" 2>&1 | tail -5
```

Expected: two non-empty strings (one EN, one zh-TW). If this fails (e.g. ERR_UNKNOWN_FILE_EXTENSION), skip it — the build and tests below will catch any real issue.

- [ ] **Step 6: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/lib/tools/ frontend-astro/src/i18n/index.ts
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): add tools i18n infrastructure (slug prefix, messages, merge)"
```

---

## Task 2: Port 8 shared Tool* components

**Files:**
- Create: `frontend-astro/src/components/tools/MoreDevTools.tsx`
- Create: `frontend-astro/src/components/tools/ToolFaq.tsx`
- Create: `frontend-astro/src/components/tools/ToolFeatureCards.tsx`
- Create: `frontend-astro/src/components/tools/ToolHero.tsx`
- Create: `frontend-astro/src/components/tools/ToolHowItWorks.tsx`
- Create: `frontend-astro/src/components/tools/ToolPopup.tsx`
- Create: `frontend-astro/src/components/tools/ToolReadyTo.tsx`
- Create: `frontend-astro/src/components/tools/ToolWidget.tsx`

- [ ] **Step 1: Copy all 8 as-is**

```bash
mkdir -p /Users/fung/dev/authgear-web/frontend-astro/src/components/tools
cp /Users/fung/dev/authgear-web/frontend/components/tools/MoreDevTools.tsx \
   /Users/fung/dev/authgear-web/frontend/components/tools/ToolFaq.tsx \
   /Users/fung/dev/authgear-web/frontend/components/tools/ToolFeatureCards.tsx \
   /Users/fung/dev/authgear-web/frontend/components/tools/ToolHero.tsx \
   /Users/fung/dev/authgear-web/frontend/components/tools/ToolHowItWorks.tsx \
   /Users/fung/dev/authgear-web/frontend/components/tools/ToolPopup.tsx \
   /Users/fung/dev/authgear-web/frontend/components/tools/ToolReadyTo.tsx \
   /Users/fung/dev/authgear-web/frontend/components/tools/ToolWidget.tsx \
   /Users/fung/dev/authgear-web/frontend-astro/src/components/tools/
```

- [ ] **Step 2: Adapt each file**

For EACH of the 8 files, apply these transformations:

1. Delete the `'use client';` directive if present (top line).
2. Delete `import Link from 'next/link';` if present; swap `<Link href="x">` for `<a href="x">` everywhere in the file.
3. Delete `import PlausibleLink from '@/components/PlausibleLink';` if present; swap `<PlausibleLink eventName="x" className="z" href="y">…</PlausibleLink>` for `<a className="z plausible-event-name--x" href="y">…</a>`.
4. If the file imports `useTranslations` from `next-intl`:
   - Remove that import
   - Add `import { t as tFn } from '@/i18n';` at top
   - Add a `locale: string` field to the Props interface (or create a Props interface if missing)
   - Add `interpolate` helper (same as tool-page pattern)
   - Build local `t` adapter that prefixes with the correct namespace (likely `Tools.common` for shared components — inspect the source's `useTranslations('Tools.common')` call to confirm)
   - Thread `locale` through to any sub-components or helper functions

- [ ] **Step 3: Typecheck**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
```

Errors here typically mean a Props interface needs `locale: string` added, or a `useTranslations` call was missed. Fix until clean.

- [ ] **Step 4: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/tools/
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port 8 shared Tool* components"
```

---

## Task 3: Port 3 tool pages (batch A: smallest — Base64, HmacPage, JwkGenerator)

**Files:**
- Create: `frontend-astro/src/components/pages/tools/Base64Page.tsx`
- Create: `frontend-astro/src/components/pages/tools/HmacPage.tsx`
- Create: `frontend-astro/src/components/pages/tools/JwkGeneratorPage.tsx`

For each, apply the tool-page rules from the "Standard conversion rules" section above.

- [ ] **Step 1: Port Base64Page (74 LOC)**

```bash
mkdir -p /Users/fung/dev/authgear-web/frontend-astro/src/components/pages/tools
cp /Users/fung/dev/authgear-web/frontend/components/pages/tools/Base64Page.tsx \
   /Users/fung/dev/authgear-web/frontend-astro/src/components/pages/tools/Base64Page.tsx
```

Edit the copy. Prefix for this page: `base64`. The page likely uses `useTranslations('Tools.base64')` and `useTranslations('Tools.common')`. Apply the full rule set: drop `'use client'`, drop Next imports, add `interface Props { locale }`, add `interpolate`, add `t` and `tCommon` adapters (adjust count to match actual hook usage in source), swap `<Link>`/`<PlausibleLink>`, pass `locale` to Tool* children that need it.

- [ ] **Step 2: Port HmacPage (99 LOC)**

Same steps. Prefix: `hmac`.

- [ ] **Step 3: Port JwkGeneratorPage (106 LOC)**

Same steps. Prefix: `jwk`.

- [ ] **Step 4: Typecheck**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
```

Must pass.

- [ ] **Step 5: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/tools/Base64Page.tsx \
                                        frontend-astro/src/components/pages/tools/HmacPage.tsx \
                                        frontend-astro/src/components/pages/tools/JwkGeneratorPage.tsx
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port Base64, Hmac, JwkGenerator tool pages"
```

---

## Task 4: Port 3 tool pages (batch B: medium — Totp, JwtDebugger, PasswordHash)

**Files:**
- Create: `frontend-astro/src/components/pages/tools/TotpPage.tsx`
- Create: `frontend-astro/src/components/pages/tools/JwtDebuggerPage.tsx`
- Create: `frontend-astro/src/components/pages/tools/PasswordHashPage.tsx`

- [ ] **Step 1: Port TotpPage (101 LOC)**

Source: `/Users/fung/dev/authgear-web/frontend/components/pages/tools/TotpPage.tsx`. Prefix: `totp`. Apply the tool-page rules.

- [ ] **Step 2: Port JwtDebuggerPage (132 LOC)**

Source: `/Users/fung/dev/authgear-web/frontend/components/pages/tools/JwtDebuggerPage.tsx`. Prefix: `jwtJwe`. Apply rules.

- [ ] **Step 3: Port PasswordHashPage (121 LOC)**

Source: `/Users/fung/dev/authgear-web/frontend/components/pages/tools/PasswordHashPage.tsx`. Prefix: `passwordHash`. Apply rules.

- [ ] **Step 4: Typecheck**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
```

- [ ] **Step 5: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/tools/TotpPage.tsx \
                                        frontend-astro/src/components/pages/tools/JwtDebuggerPage.tsx \
                                        frontend-astro/src/components/pages/tools/PasswordHashPage.tsx
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port Totp, JwtDebugger, PasswordHash tool pages"
```

---

## Task 5: Port 3 tool pages (batch C: remaining — SslChecker, OidcDiscovery, UuidV7)

**Files:**
- Create: `frontend-astro/src/components/pages/tools/SslCheckerPage.tsx`
- Create: `frontend-astro/src/components/pages/tools/OidcDiscoveryPage.tsx`
- Create: `frontend-astro/src/components/pages/tools/UuidV7Page.tsx`

- [ ] **Step 1: Port SslCheckerPage (122 LOC)**

Source: `/Users/fung/dev/authgear-web/frontend/components/pages/tools/SslCheckerPage.tsx`. Prefix: `ssl`. Apply rules.

- [ ] **Step 2: Port OidcDiscoveryPage (124 LOC)**

Source: `/Users/fung/dev/authgear-web/frontend/components/pages/tools/OidcDiscoveryPage.tsx`. Prefix: `oidc`. Apply rules.

- [ ] **Step 3: Port UuidV7Page (157 LOC — largest)**

Source: `/Users/fung/dev/authgear-web/frontend/components/pages/tools/UuidV7Page.tsx`. Prefix: `uuidV7`. Apply rules.

- [ ] **Step 4: Typecheck**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
```

- [ ] **Step 5: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/pages/tools/SslCheckerPage.tsx \
                                        frontend-astro/src/components/pages/tools/OidcDiscoveryPage.tsx \
                                        frontend-astro/src/components/pages/tools/UuidV7Page.tsx
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port SslChecker, OidcDiscovery, UuidV7 tool pages"
```

---

## Task 6: Create dynamic `tools/[slug]` routes (en + zh-TW)

**Files:**
- Create: `frontend-astro/src/pages/tools/[slug].astro`
- Create: `frontend-astro/src/pages/zh-TW/tools/[slug].astro`

- [ ] **Step 1: Create directories**

```bash
mkdir -p /Users/fung/dev/authgear-web/frontend-astro/src/pages/tools /Users/fung/dev/authgear-web/frontend-astro/src/pages/zh-TW/tools
```

- [ ] **Step 2: Write the en route**

Create `/Users/fung/dev/authgear-web/frontend-astro/src/pages/tools/[slug].astro`:

```astro
---
export const prerender = true;

import BaseLayout from '@/layouts/BaseLayout.astro';
import { t } from '@/i18n';
import { TOOL_SLUG_PREFIX } from '@/lib/tools/toolSlugPrefix';

import Base64Page from '@/components/pages/tools/Base64Page';
import HmacPage from '@/components/pages/tools/HmacPage';
import JwkGeneratorPage from '@/components/pages/tools/JwkGeneratorPage';
import JwtDebuggerPage from '@/components/pages/tools/JwtDebuggerPage';
import OidcDiscoveryPage from '@/components/pages/tools/OidcDiscoveryPage';
import PasswordHashPage from '@/components/pages/tools/PasswordHashPage';
import SslCheckerPage from '@/components/pages/tools/SslCheckerPage';
import TotpPage from '@/components/pages/tools/TotpPage';
import UuidV7Page from '@/components/pages/tools/UuidV7Page';

const pageMap = {
  'base64-decode-encode': Base64Page,
  'hmac-signature-generator-verifier': HmacPage,
  'jwk-generator': JwkGeneratorPage,
  'jwt-jwe-debugger': JwtDebuggerPage,
  'oidc-discovery-endpoint': OidcDiscoveryPage,
  'password-hash-generator': PasswordHashPage,
  'ssl-checker': SslCheckerPage,
  'totp-authenticator': TotpPage,
  'uuidv7-generator': UuidV7Page,
} as const;

type ToolSlug = keyof typeof pageMap;

export function getStaticPaths() {
  return [
    'base64-decode-encode',
    'hmac-signature-generator-verifier',
    'jwk-generator',
    'jwt-jwe-debugger',
    'oidc-discovery-endpoint',
    'password-hash-generator',
    'ssl-checker',
    'totp-authenticator',
    'uuidv7-generator',
  ].map((slug) => ({ params: { slug } }));
}

const { slug } = Astro.params as { slug: ToolSlug };
const Component = pageMap[slug];
const prefix = TOOL_SLUG_PREFIX[slug];
if (!Component || !prefix) {
  return Astro.redirect('/404');
}

const locale = 'en';
const title = t(locale, `Tools.${prefix}.metaTitle`);
const description = t(locale, `Tools.${prefix}.metaDescription`);
---

<BaseLayout locale={locale} title={title} description={description}>
  <Component client:load locale={locale} />
</BaseLayout>
```

- [ ] **Step 3: Write the zh-TW route**

Identical to step 2 except `const locale = 'en';` → `const locale = 'zh-TW';`.

- [ ] **Step 4: Build**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npm run build 2>&1 | tail -30
```

Expected: build succeeds. 18 new prerendered HTML files listed.

- [ ] **Step 5: Verify all 18 files**

```bash
for slug in base64-decode-encode hmac-signature-generator-verifier jwk-generator jwt-jwe-debugger oidc-discovery-endpoint password-hash-generator ssl-checker totp-authenticator uuidv7-generator; do
  for path in "tools/$slug" "zh-TW/tools/$slug"; do
    test -f /Users/fung/dev/authgear-web/frontend-astro/dist/client/$path/index.html && echo "OK: $path" || echo "MISSING: $path"
  done
done | grep -c '^OK:'
```

Expected: `18`.

- [ ] **Step 6: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/pages/tools/\[slug\].astro frontend-astro/src/pages/zh-TW/tools/\[slug\].astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): add dynamic tools/[slug] routes for en and zh-TW"
```

---

## Task 7: Playwright smoke tests

**Files:**
- Create: `frontend-astro/tests/phase2d2-tools.spec.ts`

- [ ] **Step 1: Write the tests**

Create `/Users/fung/dev/authgear-web/frontend-astro/tests/phase2d2-tools.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

const SLUGS = [
  'base64-decode-encode',
  'hmac-signature-generator-verifier',
  'jwk-generator',
  'jwt-jwe-debugger',
  'oidc-discovery-endpoint',
  'password-hash-generator',
  'ssl-checker',
  'totp-authenticator',
  'uuidv7-generator',
] as const;

test.describe('Phase 2d-2: tools/[slug] — en', () => {
  for (const slug of SLUGS) {
    test(`/tools/${slug} returns 200 with lang=en`, async ({ page }) => {
      const resp = await page.goto(`/tools/${slug}`);
      expect(resp?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(page.locator('footer').first()).toBeVisible();
    });
  }
});

test.describe('Phase 2d-2: tools/[slug] — zh-TW', () => {
  for (const slug of SLUGS) {
    test(`/zh-TW/tools/${slug} returns 200 with lang=zh-TW`, async ({ page }) => {
      const resp = await page.goto(`/zh-TW/tools/${slug}`);
      expect(resp?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', 'zh-TW');
      await expect(page.locator('footer').first()).toBeVisible();
    });
  }
});

test('UUID v7 generator: island hydrates and produces a UUID', async ({ page }) => {
  await page.goto('/tools/uuidv7-generator');
  // Find the generate button (any visible button inside the widget)
  const generateBtn = page.getByRole('button', { name: /generate/i }).first();
  await generateBtn.scrollIntoViewIfNeeded();
  await expect(generateBtn).toBeVisible();
  await generateBtn.click();
  // A UUID v7 has pattern: 8-4-4-4-12 hex digits, version 7
  const uuidPattern = /[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i;
  await expect(page.locator('body')).toContainText(uuidPattern);
});

test('Base64 encoder: input + encode button produces base64', async ({ page }) => {
  await page.goto('/tools/base64-decode-encode');
  // Find the first text input/textarea (the input field)
  const input = page.locator('textarea, input[type="text"]').first();
  await input.scrollIntoViewIfNeeded();
  await input.fill('hello');
  const encodeBtn = page.getByRole('button', { name: /encode/i }).first();
  await encodeBtn.click();
  // base64 of "hello" is aGVsbG8=
  await expect(page.locator('body')).toContainText('aGVsbG8=');
});
```

**If either interactivity test fails,** the tool's button label or input selector doesn't match. Inspect the actual rendered HTML (e.g. `curl http://localhost:3000/tools/uuidv7-generator | grep -oE '<button[^>]*>[^<]*</button>'`) and adjust the selector — don't weaken the assertion to pass.

- [ ] **Step 2: Run tests**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx playwright test tests/phase2d2-tools.spec.ts --reporter=line 2>&1 | tail -30
```

Expected: 20 passed (9 en + 9 zh-TW + 1 UUID + 1 base64).

- [ ] **Step 3: Full suite regression**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx playwright test --reporter=line 2>&1 | tail -10
```

Expected: 107 existing + 20 new = 127 passed.

- [ ] **Step 4: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/tests/phase2d2-tools.spec.ts
git -C /Users/fung/dev/authgear-web commit -m "test(astro): smoke + interactivity tests for tools/[slug] routes"
```

---

## Task 8: Docs update

**Files:**
- Modify: `frontend-astro/README.md`
- Modify: `docs/ARCHITECTURE-ASTRO.md`

- [ ] **Step 1: Update README**

Change `- [ ] Phase 2d-2 — Tools subtree (9 interactive dev-tool pages as React islands)` to `- [x]`.

- [ ] **Step 2: Update ARCHITECTURE status marker**

Replace the `**Migration status` line with:

```markdown
**Migration status (2026-04-22):** Phases 1 + 2a + 2b + 2c + 2d shipped on branch `migration/nextjs-to-astro`. Home + 13 static + 4 compare + 7 solutions + 19 features + 9 tools pages live in both locales. All interactive islands (ContactForm, LogoMarquee, 3 feature tabs, SmsCostCalculator, 9 full-page tool islands) hydrate. Phase 2e (Once + Pricing) plan pending.
```

- [ ] **Step 3: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/README.md docs/ARCHITECTURE-ASTRO.md
git -C /Users/fung/dev/authgear-web commit -m "docs(astro): Phase 2d-2 complete — tools subtree shipped"
```

---

## Phase 2d-2 complete

Verification gate before Phase 2e:

1. `npm run build` — 18 new prerendered files
2. `npm test` — 127 passed
3. Manual spot-check: `PORT=3000 npm start`, visit at minimum:
   - `/tools/base64-decode-encode` — type "hello", encode, expect "aGVsbG8="
   - `/tools/uuidv7-generator` — click generate, see a UUID
   - `/tools/jwt-jwe-debugger` — paste a JWT, see decoded header/payload
   - `/zh-TW/tools/totp-authenticator` — labels in Traditional Chinese
4. Check Plausible tracking still fires for `plausible-event-name--*` classes inside tool pages (inspect network tab on any CTA click)

---

## Phase 2e outline (to follow in separate plan)

- **Once page** (`OncePage.tsx`, 504 LOC): framework tab switcher (`OnceSdkCode` + `OnceSdkFrameworkHarness`) + FAQ accordion (`OncePageFaq`). Three sub-islands plus the page body.
- **Pricing page** (`PricingPageClient.tsx` + `PricingPageView.tsx` + `PricingFaqAccordion.tsx`): data modules in `lib/pricing/copy-en.ts` + `copy-zh-TW.ts` + `cells.ts` + `data/`. Interactive toggle + comparison table + FAQ. Likely 2-3 islands.
- Plus any remaining Once/Pricing translation work.
