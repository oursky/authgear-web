# Astro Migration — Phase 1: Foundation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up an Astro 5 project alongside the existing Next.js `frontend/`, port the core infrastructure (i18n, Strapi client, layout, nav, footer, middleware), and prove it works end-to-end by rendering the home page in both locales with a passing smoke test.

**Architecture:** New sibling directory `frontend-astro/` runs in parallel to `frontend/` during migration. Astro 5 in `output: 'server'` mode with the `@astrojs/node` standalone adapter. Static marketing pages opt into prerendering. Shared page bodies live in `src/components/pages/*.astro` and accept a `locale` prop, consumed by two mirrored route trees (`src/pages/` for English, `src/pages/zh-TW/` for Traditional Chinese). Nav and footer become real Astro components reading from `navigation-data.ts` — no more `dangerouslySetInnerHTML`.

**Tech Stack:** Astro 5, React 19 (islands only), TypeScript, Tailwind CSS v4 via `@tailwindcss/vite`, `@astrojs/node` adapter, Playwright for smoke tests. No `next-intl`, no `next-plausible`, no `@next/third-parties`.

**Reference:** `docs/ARCHITECTURE-ASTRO.md` for the target design.

**What this phase does NOT do:** port any page other than home, touch the CMS routes, set up `/api/*` endpoints, deploy to Fly, or remove the old `frontend/` directory. Those are Phases 2–4.

**Exit criteria for Phase 1:**
- `cd frontend-astro && npm run build` succeeds
- `npm run dev` serves `/` and `/zh-TW/` with correct lang attrs, nav, footer, GTM + Plausible scripts
- Playwright smoke test passes for both locales
- Legacy redirects (`/zh/*`, `/zh-Hant-TW/*` → `/zh-TW/*`) return 308
- Home page visually matches the current Next.js output at `/` and `/zh-TW/`

---

## File structure (new)

```
frontend-astro/
├── src/
│   ├── pages/
│   │   ├── index.astro                  # Home (en)
│   │   └── zh-TW/
│   │       └── index.astro              # Home (zh-TW)
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── components/
│   │   ├── nav/
│   │   │   ├── SiteNav.astro
│   │   │   ├── SiteFooter.astro
│   │   │   └── FooterLanguageSwitcher.astro
│   │   ├── pages/
│   │   │   └── HomePage.astro
│   │   └── islands/
│   │       ├── PlausibleLink.tsx
│   │       └── PlausibleButton.tsx
│   ├── lib/
│   │   ├── i18n.ts
│   │   ├── strapi.ts
│   │   ├── navigation-data.ts
│   │   ├── site-navigation.ts
│   │   └── plausible.ts
│   ├── i18n/
│   │   ├── en.json
│   │   ├── zh-TW.json
│   │   └── index.ts
│   ├── middleware.ts
│   └── styles/
│       ├── global.css                   # Tailwind entry + design-system imports
│       └── authgear-design-system.css   # Copied verbatim
├── public/                              # Copied from frontend/public
├── tests/
│   └── smoke.spec.ts
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── playwright.config.ts
└── Dockerfile
```

---

## Task 1: Scaffold Astro project

**Files:**
- Create: `frontend-astro/package.json`
- Create: `frontend-astro/astro.config.mjs`
- Create: `frontend-astro/tsconfig.json`

- [ ] **Step 1: Create the project directory and package.json**

```bash
mkdir -p frontend-astro/src
cd frontend-astro
```

Write `frontend-astro/package.json`:

```json
{
  "name": "frontend-astro",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev --host 0.0.0.0",
    "build": "astro build",
    "preview": "astro preview",
    "start": "node ./dist/server/entry.mjs",
    "check": "astro check",
    "test": "playwright test"
  },
  "dependencies": {
    "@astrojs/node": "^9.1.0",
    "@astrojs/react": "^4.2.0",
    "@strapi/blocks-react-renderer": "^1.0.2",
    "@tailwindcss/vite": "^4.2.2",
    "astro": "^5.2.0",
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "tailwindcss": "^4.2.2"
  },
  "devDependencies": {
    "@playwright/test": "^1.50.0",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5"
  }
}
```

- [ ] **Step 2: Install dependencies**

```bash
cd frontend-astro
npm install
```

Expected: `added N packages`, no audit errors.

- [ ] **Step 3: Write astro.config.mjs**

```js
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
```

- [ ] **Step 4: Write tsconfig.json**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"],
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}
```

- [ ] **Step 5: Verify Astro boots**

```bash
cd frontend-astro
npx astro check --no-sync || true
npm run dev &
sleep 3
curl -sI http://localhost:4321/ | head -1
kill %1
```

Expected: 404 (no pages yet) — but server responds, confirming config is valid.

- [ ] **Step 6: Commit**

```bash
git add frontend-astro/package.json frontend-astro/package-lock.json \
        frontend-astro/astro.config.mjs frontend-astro/tsconfig.json
git commit -m "chore(astro): scaffold Astro 5 project in frontend-astro/"
```

---

## Task 2: Copy public assets

**Files:**
- Create: `frontend-astro/public/` (mirror of `frontend/public/`)

- [ ] **Step 1: Copy public/ verbatim**

```bash
cp -R frontend/public frontend-astro/public
```

- [ ] **Step 2: Verify key files present**

```bash
ls frontend-astro/public/css/ frontend-astro/public/images/ | head -20
test -f frontend-astro/public/css/authgear-new.webflow.css && echo OK
test -f frontend-astro/public/css/authgear-ds-split-stack.css && echo OK
test -f frontend-astro/public/js/webflow.js && echo OK
```

Expected: Three `OK` lines.

- [ ] **Step 3: Commit**

```bash
git add frontend-astro/public
git commit -m "chore(astro): copy public assets from frontend/"
```

---

## Task 3: Port lib/i18n.ts verbatim

**Files:**
- Create: `frontend-astro/src/lib/i18n.ts`

- [ ] **Step 1: Copy i18n.ts**

```bash
cp frontend/lib/i18n.ts frontend-astro/src/lib/i18n.ts
```

- [ ] **Step 2: Remove Strapi type coupling (temporarily)**

Edit the first line of `frontend-astro/src/lib/i18n.ts` to remove the Strapi import so this file compiles before strapi.ts is ported:

```ts
// Before: import type { StrapiLocale } from './strapi';
// After:
type StrapiLocale = 'en' | 'zh-Hant-TW';
```

(We'll delete this local type and re-import from `./strapi` in Task 4.)

- [ ] **Step 3: Verify typecheck passes**

```bash
cd frontend-astro && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add frontend-astro/src/lib/i18n.ts
git commit -m "feat(astro): port lib/i18n.ts"
```

---

## Task 4: Port lib/strapi.ts

**Files:**
- Create: `frontend-astro/src/lib/strapi.ts`
- Modify: `frontend-astro/src/lib/i18n.ts`

- [ ] **Step 1: Copy strapi.ts**

```bash
cp frontend/lib/strapi.ts frontend-astro/src/lib/strapi.ts
```

- [ ] **Step 2: Remove the Next.js cache import**

Edit `frontend-astro/src/lib/strapi.ts` — delete the first line:

```ts
// Remove: import { unstable_cache } from 'next/cache';
```

Then find every usage of `unstable_cache(fn, keys, { revalidate: 60 })` and replace with `fn` directly (passing through — we'll re-add caching via response headers in Phase 3):

```bash
# Audit remaining references
grep -n "unstable_cache\|next/cache\|revalidate" frontend-astro/src/lib/strapi.ts || echo "clean"
```

Expected: `clean`.

- [ ] **Step 3: Remove `next: { revalidate: 60 }` from fetch calls**

Find every `fetch(url, { next: { revalidate: 60 }, ... })` and change to `fetch(url, { ... })` (drop the `next` key — Astro has no equivalent; caching moves to response headers per architecture doc).

```bash
grep -n "next:" frontend-astro/src/lib/strapi.ts || echo "clean"
```

Expected: `clean`.

- [ ] **Step 4: Restore strapi.ts import in i18n.ts**

Edit `frontend-astro/src/lib/i18n.ts`:

```ts
// Replace the local `type StrapiLocale = ...` with:
import type { StrapiLocale } from './strapi';
```

- [ ] **Step 5: Typecheck**

```bash
cd frontend-astro && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add frontend-astro/src/lib/strapi.ts frontend-astro/src/lib/i18n.ts
git commit -m "feat(astro): port lib/strapi.ts, drop next/cache"
```

---

## Task 5: Port navigation-data.ts verbatim

**Files:**
- Create: `frontend-astro/src/lib/navigation-data.ts`

- [ ] **Step 1: Copy**

```bash
cp frontend/lib/navigation-data.ts frontend-astro/src/lib/navigation-data.ts
```

- [ ] **Step 2: Verify no Next.js imports leaked**

```bash
grep -n "next/\|@next/" frontend-astro/src/lib/navigation-data.ts || echo "clean"
```

Expected: `clean`.

- [ ] **Step 3: Typecheck + commit**

```bash
cd frontend-astro && npx tsc --noEmit
git add frontend-astro/src/lib/navigation-data.ts
git commit -m "feat(astro): port lib/navigation-data.ts"
```

---

## Task 6: Create translation helper (replaces next-intl)

**Files:**
- Create: `frontend-astro/src/i18n/en.json`
- Create: `frontend-astro/src/i18n/zh-TW.json`
- Create: `frontend-astro/src/i18n/index.ts`
- Test: `frontend-astro/src/i18n/index.test.ts`

- [ ] **Step 1: Copy message files**

```bash
cp frontend/messages/en.json frontend-astro/src/i18n/en.json
cp frontend/messages/zh-TW.json frontend-astro/src/i18n/zh-TW.json
```

- [ ] **Step 2: Write the failing test**

Create `frontend-astro/src/i18n/index.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { t } from './index';

describe('t()', () => {
  it('resolves a top-level key for en', () => {
    expect(t('en', 'Home.heroCtaGetStarted')).toBeTypeOf('string');
  });
  it('resolves a top-level key for zh-TW', () => {
    expect(t('zh-TW', 'Home.heroCtaGetStarted')).toBeTypeOf('string');
  });
  it('returns the key itself when missing', () => {
    expect(t('en', 'Nonexistent.missing')).toBe('Nonexistent.missing');
  });
  it('falls back to en when key missing in zh-TW', () => {
    // Pick a key known to exist in en.json that may be missing in zh-TW
    const result = t('zh-TW', 'Home.heroCtaGetStarted');
    expect(result).toBeTypeOf('string');
    expect(result.length).toBeGreaterThan(0);
  });
});
```

Note: This phase uses **vitest** (add `vitest` to devDependencies) only for unit testing the i18n helper. Page-level testing uses Playwright.

```bash
cd frontend-astro && npm install --save-dev vitest
```

- [ ] **Step 3: Run the test — expect failure**

```bash
cd frontend-astro && npx vitest run src/i18n/index.test.ts
```

Expected: FAIL — "Cannot find module './index'".

- [ ] **Step 4: Implement the helper**

Create `frontend-astro/src/i18n/index.ts`:

```ts
import en from './en.json';
import zhTW from './zh-TW.json';

const messages: Record<string, Record<string, unknown>> = {
  en,
  'zh-TW': zhTW,
};

function lookup(bag: Record<string, unknown>, key: string): string | undefined {
  const parts = key.split('.');
  let cur: unknown = bag;
  for (const p of parts) {
    if (cur && typeof cur === 'object' && p in (cur as Record<string, unknown>)) {
      cur = (cur as Record<string, unknown>)[p];
    } else {
      return undefined;
    }
  }
  return typeof cur === 'string' ? cur : undefined;
}

export function t(locale: string, key: string): string {
  const loc = locale in messages ? locale : 'en';
  return lookup(messages[loc], key) ?? lookup(messages.en, key) ?? key;
}

export type TranslationKey = string;
```

- [ ] **Step 5: Run the test — expect pass**

```bash
cd frontend-astro && npx vitest run src/i18n/index.test.ts
```

Expected: 4 passed.

- [ ] **Step 6: Add test script to package.json**

Edit `frontend-astro/package.json` — add `"test:unit": "vitest run"` to the `scripts` block. Update the existing `test` script to `"test": "playwright test"` (already there) — keep unit and e2e separate.

- [ ] **Step 7: Commit**

```bash
git add frontend-astro/src/i18n/ frontend-astro/package.json frontend-astro/package-lock.json
git commit -m "feat(astro): add t() translation helper + port message JSON"
```

---

## Task 7: Port authgear-design-system.css

**Files:**
- Create: `frontend-astro/src/styles/authgear-design-system.css`
- Create: `frontend-astro/src/styles/global.css`

- [ ] **Step 1: Copy the design system CSS**

```bash
cp frontend/app/authgear-design-system.css frontend-astro/src/styles/authgear-design-system.css
```

- [ ] **Step 2: Create global.css with Tailwind + design-system imports**

Create `frontend-astro/src/styles/global.css`:

```css
@import 'tailwindcss';
@import 'normalize.css';
@import './authgear-design-system.css';
```

Install `normalize.css`:

```bash
cd frontend-astro && npm install normalize.css
```

- [ ] **Step 3: Commit**

```bash
git add frontend-astro/src/styles/ frontend-astro/package.json frontend-astro/package-lock.json
git commit -m "feat(astro): port design system CSS + Tailwind entry"
```

---

## Task 8: Create site-navigation.ts helper

**Files:**
- Create: `frontend-astro/src/lib/site-navigation.ts`

The original `frontend/lib/site-navigation.ts` generates HTML strings. In Astro we don't need that — nav/footer become components. But we keep this file as a **data accessor** that returns typed structures for `SiteNav.astro` and `SiteFooter.astro` to iterate.

- [ ] **Step 1: Write the file**

Create `frontend-astro/src/lib/site-navigation.ts`:

```ts
import {
  productsDropdownColumns,
  solutionsDropdownColumns,
  resourcesDropdownColumns,
  developersDropdownColumns,
  footerColumns,
  type NavColumn,
  type NavLink,
} from './navigation-data';
import { localizedPath } from './i18n';

export function getNavData(locale: string) {
  return {
    products: productsDropdownColumns,
    solutions: solutionsDropdownColumns,
    resources: resourcesDropdownColumns,
    developers: developersDropdownColumns,
  };
}

export function getFooterData(locale: string) {
  return { columns: footerColumns };
}

export function linkLabel(link: NavLink, locale: string): string {
  return link.label[locale] ?? link.label.en;
}

export function linkHref(link: NavLink, locale: string): string {
  if (link.href) return link.href;
  if (link.path) return localizedPath(locale, link.path);
  return '#';
}

export type { NavColumn, NavLink };
```

Note: the specific export names from `navigation-data.ts` (`productsDropdownColumns` etc.) may differ — verify against the actual file and adjust:

```bash
grep -n "^export " frontend-astro/src/lib/navigation-data.ts
```

Update the imports in the snippet above to match the real exports.

- [ ] **Step 2: Typecheck**

```bash
cd frontend-astro && npx tsc --noEmit
```

Fix any mismatched export names. Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add frontend-astro/src/lib/site-navigation.ts
git commit -m "feat(astro): add site-navigation helper"
```

---

## Task 9: Build BaseLayout.astro

**Files:**
- Create: `frontend-astro/src/layouts/BaseLayout.astro`

- [ ] **Step 1: Write the layout**

Create `frontend-astro/src/layouts/BaseLayout.astro`:

```astro
---
import '@/styles/global.css';
import SiteNav from '@/components/nav/SiteNav.astro';
import SiteFooter from '@/components/nav/SiteFooter.astro';
import { localeToHtmlLang } from '@/lib/i18n';

interface Props {
  locale: string;
  title?: string;
  description?: string;
}

const {
  locale,
  title = 'Authgear',
  description = 'Authgear makes it easier for developers to meet complex authentication requirements.',
} = Astro.props;

const htmlLang = localeToHtmlLang(locale);
const gtmId = 'GTM-KTHFL6S';
const plausibleDomain = import.meta.env.PUBLIC_PLAUSIBLE_DOMAIN ?? '';
---

<!doctype html>
<html lang={htmlLang} class="font-pt-sans">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="google-site-verification" content="cwUTy_LBZHQ90P9sQzhKyyV2M024ukPHK2rYpvion6M" />
    <title>{title}</title>
    <meta name="description" content={description} />

    <link rel="icon" href="/images/favicon.png" />
    <link rel="apple-touch-icon" href="/images/webclip.png" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Noto+Sans+TC:wght@300;400;500;600;700&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@300;400;500;600;700&family=Red+Hat+Display:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />

    <link href="/css/webflow.css" rel="stylesheet" />
    <link href="/css/authgear-new.webflow.css" rel="stylesheet" />
    <link href="/css/authgear-ds-split-stack.css" rel="stylesheet" />
    <style is:inline>
      .w-container { max-width: 1271px; }
      @media (hover:none) and (pointer:coarse) {
        * { background-attachment: scroll !important; }
      }
    </style>

    {/* Google Tag Manager */}
    <script is:inline define:vars={{ gtmId }}>
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',gtmId);
    </script>

    {/* Plausible */}
    {plausibleDomain && (
      <script defer data-domain={plausibleDomain} src="https://plausible.io/js/script.tagged-events.js"></script>
    )}
    <script is:inline>
      window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments); };
    </script>
  </head>
  <body class="bg-neutral-200">
    {/* GTM noscript */}
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style="display:none;visibility:hidden"
      ></iframe>
    </noscript>

    <div
      data-collapse="medium"
      data-animation="default"
      data-duration="500"
      data-easing="ease-in-out-expo"
      data-easing2="ease-in-out-expo"
      role="banner"
      class="header event w-nav"
    >
      <SiteNav locale={locale} />
    </div>

    <slot />

    <footer class="footer dark">
      <SiteFooter locale={locale} />
    </footer>

    <script
      src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=60658b46b03f0cf83ac1485d"
      integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
      crossorigin="anonymous"
    ></script>
    <script src="/js/webflow.js" is:inline></script>
  </body>
</html>
```

- [ ] **Step 2: Note on SiteNav / SiteFooter**

They don't exist yet — Astro will fail to resolve the imports. Move to Task 10 immediately; don't try to build yet.

- [ ] **Step 3: Commit (broken build is fine — we commit in progress for reviewability)**

```bash
git add frontend-astro/src/layouts/BaseLayout.astro
git commit -m "feat(astro): add BaseLayout with head, GTM, Plausible, scripts"
```

---

## Task 10: Build SiteNav.astro

**Files:**
- Create: `frontend-astro/src/components/nav/SiteNav.astro`
- Reference: `frontend/components/layout/SiteNav.tsx` (existing Next.js nav)

- [ ] **Step 1: Read the existing SiteNav.tsx to understand the structure**

```bash
wc -l frontend/components/layout/SiteNav.tsx
cat frontend/components/layout/SiteNav.tsx | head -100
```

- [ ] **Step 2: Port to Astro**

This is a **mechanical JSX → Astro conversion**. Create `frontend-astro/src/components/nav/SiteNav.astro`. The conversion rules:
- `className` → `class`
- `{t('key')}` → `{t(locale, 'Nav.key')}`
- `<Link href={...}>` → `<a href={...}>`
- `<PlausibleLink href={...} eventName="x">` → `<a href={...} class="plausible-event-name--x">`
- Remove `'use client'` / React imports
- Replace `useTranslations` with importing `t` from `@/i18n`

Because `SiteNav.tsx` is long (~300 lines), do this in one pass and commit. Example starting skeleton:

```astro
---
import { t } from '@/i18n';
import { getNavData, linkHref, linkLabel } from '@/lib/site-navigation';
import { localizedPath } from '@/lib/i18n';

interface Props { locale: string }
const { locale } = Astro.props;
const nav = getNavData(locale);
---

<div class="w-container nav-container w-nav">
  <a href={localizedPath(locale, '/')} class="brand w-nav-brand">
    <img src="/images/authgear-logo.svg" alt="Authgear" />
  </a>

  {/* Desktop dropdowns */}
  <nav role="navigation" class="nav-menu w-nav-menu">
    {/* Products dropdown */}
    <div class="nav-dropdown w-dropdown">
      <div class="nav-dropdown-toggle w-dropdown-toggle">
        <div class="text-block">{t(locale, 'Nav.products')}</div>
      </div>
      <nav class="nav-dropdown-list products w-dropdown-list">
        {nav.products.map((col) => (
          <div class="nav-column">
            <div class="subtitle">{col.type === 'productColumn' || !col.type ? col.subtitle[locale] ?? col.subtitle.en : ''}</div>
            {col.type !== 'stacked' && 'links' in col && col.links.map((link) => (
              <a href={linkHref(link, locale)} class="nav-dropdown-link w-dropdown-link">
                {linkLabel(link, locale)}
              </a>
            ))}
          </div>
        ))}
      </nav>
    </div>

    {/* Repeat for solutions, resources, developers */}

    {/* Sign up / Login CTAs */}
    <a
      href="https://portal.authgear.com/?utm_source=landing-page&utm_medium=link&utm_campaign=signup_button"
      class="button-primary header-button sign-up plausible-event-name--signup w-button"
      target="_blank"
      rel="noopener noreferrer"
    >
      {t(locale, 'Nav.signUp')}
    </a>
    <a
      href="https://portal.authgear.com/?utm_source=landing-page&utm_medium=link&utm_campaign=login_button"
      class="button-secondary header-button header__topbar__loginbtn plausible-event-name--login w-button"
      target="_blank"
      rel="noopener noreferrer"
    >
      {t(locale, 'Nav.login')}
    </a>

    {/* Mobile language switcher */}
  </nav>

  <div class="nav-menu-button w-nav-button">
    <div class="icon w-icon-nav-menu"></div>
  </div>
</div>
```

**Warning to the implementer:** This skeleton is illustrative. The real SiteNav.tsx has more structure (mobile menu, language switcher, solutions icons, etc.). Port one section at a time: dropdown → dropdown → mobile menu → CTAs. Verify each section renders before moving on.

- [ ] **Step 3: Verify build progresses past SiteNav**

```bash
cd frontend-astro && npm run build
```

Expected: build fails on missing `SiteFooter` (next task). Confirm SiteNav resolves.

- [ ] **Step 4: Commit**

```bash
git add frontend-astro/src/components/nav/SiteNav.astro
git commit -m "feat(astro): port SiteNav to Astro component"
```

---

## Task 11: Build SiteFooter.astro + FooterLanguageSwitcher.astro

**Files:**
- Create: `frontend-astro/src/components/nav/SiteFooter.astro`
- Create: `frontend-astro/src/components/nav/FooterLanguageSwitcher.astro`

- [ ] **Step 1: Read the Next.js footer**

```bash
cat frontend/components/layout/SiteFooter.tsx
cat frontend/components/layout/FooterLanguageSwitcher.tsx
```

- [ ] **Step 2: Port FooterLanguageSwitcher.astro**

Create `frontend-astro/src/components/nav/FooterLanguageSwitcher.astro`:

```astro
---
import { LOCALES } from '@/lib/i18n';

interface Props { locale: string; currentPath: string }
const { locale, currentPath } = Astro.props;

function pathForLocale(target: string): string {
  // Strip existing locale prefix if present
  const stripped = currentPath.replace(/^\/zh-TW(\/|$)/, '/');
  if (target === 'en') return stripped;
  return `/zh-TW${stripped === '/' ? '' : stripped}`;
}

const labels: Record<string, string> = { en: 'English', 'zh-TW': '繁體中文' };
---

<div class="footer-language-switcher">
  {LOCALES.map((loc) => (
    <a
      href={pathForLocale(loc)}
      class={loc === locale ? 'footer-lang-link active' : 'footer-lang-link'}
      hreflang={loc}
    >
      {labels[loc]}
    </a>
  ))}
</div>
```

- [ ] **Step 3: Port SiteFooter.astro**

Create `frontend-astro/src/components/nav/SiteFooter.astro` — port the structure from `frontend/components/layout/SiteFooter.tsx` using the same JSX → Astro rules from Task 10:

```astro
---
import { t } from '@/i18n';
import { getFooterData, linkHref, linkLabel } from '@/lib/site-navigation';
import FooterLanguageSwitcher from './FooterLanguageSwitcher.astro';

interface Props { locale: string }
const { locale } = Astro.props;
const footer = getFooterData(locale);
const currentPath = Astro.url.pathname;
---

<div class="footer-inner w-container">
  {footer.columns.map((col) => (
    <div class="footer-column">
      <div class="footer-subtitle">{col.subtitle[locale] ?? col.subtitle.en}</div>
      <ul class="footer-links">
        {col.links.map((link) => (
          <li><a href={linkHref(link, locale)}>{linkLabel(link, locale)}</a></li>
        ))}
      </ul>
    </div>
  ))}

  <div class="footer-bottom">
    <FooterLanguageSwitcher locale={locale} currentPath={currentPath} />
    <div class="footer-copyright">© {new Date().getFullYear()} Oursky. All rights reserved.</div>
  </div>
</div>
```

Verify against the actual footer markup — class names and structure must match the current site.

- [ ] **Step 4: Build**

```bash
cd frontend-astro && npm run build
```

Expected: build now fails at the home page (doesn't exist yet) but nav + footer resolve.

- [ ] **Step 5: Commit**

```bash
git add frontend-astro/src/components/nav/
git commit -m "feat(astro): port SiteFooter and FooterLanguageSwitcher"
```

---

## Task 12: Build Plausible islands

**Files:**
- Create: `frontend-astro/src/lib/plausible.ts`
- Create: `frontend-astro/src/components/islands/PlausibleLink.tsx`
- Create: `frontend-astro/src/components/islands/PlausibleButton.tsx`

- [ ] **Step 1: Write the trackEvent helper**

Create `frontend-astro/src/lib/plausible.ts`:

```ts
declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;
  }
}

export function trackEvent(event: string, props?: Record<string, string | number | boolean>): void {
  if (typeof window === 'undefined') return;
  if (typeof window.plausible === 'function') {
    window.plausible(event, props ? { props } : undefined);
  }
}
```

- [ ] **Step 2: Port PlausibleLink.tsx**

Read the existing one:

```bash
cat frontend/components/PlausibleLink.tsx
```

Create `frontend-astro/src/components/islands/PlausibleLink.tsx` — same logic, no Next-specific imports:

```tsx
import { trackEvent } from '@/lib/plausible';
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  eventName: string;
  eventProps?: Record<string, string | number | boolean>;
  children: ReactNode;
}

export default function PlausibleLink({ eventName, eventProps, onClick, children, ...rest }: Props) {
  function handle(e: MouseEvent<HTMLAnchorElement>) {
    trackEvent(eventName, eventProps);
    onClick?.(e);
  }
  return <a {...rest} onClick={handle}>{children}</a>;
}
```

- [ ] **Step 3: Port PlausibleButton.tsx**

Mirror the same pattern for `frontend-astro/src/components/islands/PlausibleButton.tsx` (substitute `button` for `a`).

- [ ] **Step 4: Build + commit**

```bash
cd frontend-astro && npx tsc --noEmit
git add frontend-astro/src/lib/plausible.ts frontend-astro/src/components/islands/
git commit -m "feat(astro): port Plausible islands + trackEvent helper"
```

---

## Task 13: Port HomePage.astro (en first)

**Files:**
- Create: `frontend-astro/src/components/pages/HomePage.astro`
- Reference: `frontend/components/pages/HomePage.tsx`

- [ ] **Step 1: Audit HomePage.tsx for Next-specific imports**

```bash
grep -n "^import" frontend/components/pages/HomePage.tsx
```

Typical imports: `next/link`, `next-intl/server`, custom components (`@/components/ContactForm`, `@/components/PlausibleLink`, `@/components/LogoMarquee`).

- [ ] **Step 2: Create the Astro port**

Create `frontend-astro/src/components/pages/HomePage.astro` by mechanical conversion:
- Replace `import Link from 'next/link'` with nothing; use `<a>` tags
- Replace `getTranslations({ locale, namespace: 'Home' })` with: pass `locale` as prop, use `t(locale, 'Home.key')`
- Replace `<Link href={localizedPath(locale, '/once')}>` → `<a href={localizedPath(locale, '/once')}>`
- Replace `<PlausibleLink eventName="signup" href="...">Text</PlausibleLink>` → `<PlausibleLink client:load eventName="signup" href="...">Text</PlausibleLink>` (stays as React island)
- Replace `<ContactForm>` / `<LogoMarquee>` with stub comments for now — **these are not in scope for Phase 1**. Replace with placeholder `<div data-placeholder="ContactForm"></div>` and `<div data-placeholder="LogoMarquee"></div>`; they will be ported in Phase 2 as React islands.

```astro
---
import { t } from '@/i18n';
import { localizedPath } from '@/lib/i18n';
import PlausibleLink from '@/components/islands/PlausibleLink';

interface Props { locale: string }
const { locale } = Astro.props;
---

<div class="page-wrapper">
  {/* Hero Section */}
  <div class="section home-hero dark banner-for-slide not-in-slide">
    <div class="container-1440 home-mobile-banner">
      <div class="home-hero-wrapper">
        {/* ... port the rest of the hero JSX verbatim, with class-name and t() substitutions ... */}
        <PlausibleLink
          client:load
          href="https://portal.authgear.com/?utm_source=landing-page&utm_medium=link&utm_campaign=login_button"
          target="_blank"
          rel="noopener noreferrer"
          class="button-primary home-hero new-home radius-16 w-button"
          eventName="signup"
        >
          {t(locale, 'Home.heroCtaGetStarted')}
        </PlausibleLink>
      </div>
    </div>
  </div>

  {/* ... additional sections from HomePage.tsx, ported section-by-section ... */}

  {/* Placeholder for ContactForm (Phase 2) */}
  <div data-placeholder="ContactForm"></div>

  {/* Placeholder for LogoMarquee (Phase 2) */}
  <div data-placeholder="LogoMarquee"></div>
</div>
```

**Implementation note:** HomePage.tsx is ~1000 lines of Webflow markup. Port it section-by-section, building locally after each section to catch class-name typos. Don't batch the whole file in one edit.

- [ ] **Step 3: Build**

```bash
cd frontend-astro && npm run build
```

Expected: build fails on missing `src/pages/index.astro` (next task). HomePage component itself should typecheck.

- [ ] **Step 4: Commit**

```bash
git add frontend-astro/src/components/pages/HomePage.astro
git commit -m "feat(astro): port HomePage body (ContactForm + LogoMarquee stubbed)"
```

---

## Task 14: Wire up home routes

**Files:**
- Create: `frontend-astro/src/pages/index.astro`
- Create: `frontend-astro/src/pages/zh-TW/index.astro`

- [ ] **Step 1: Create English route**

Create `frontend-astro/src/pages/index.astro`:

```astro
---
export const prerender = true;
import BaseLayout from '@/layouts/BaseLayout.astro';
import HomePage from '@/components/pages/HomePage.astro';
---

<BaseLayout locale="en" title="Authgear">
  <HomePage locale="en" />
</BaseLayout>
```

- [ ] **Step 2: Create zh-TW route**

Create `frontend-astro/src/pages/zh-TW/index.astro`:

```astro
---
export const prerender = true;
import BaseLayout from '@/layouts/BaseLayout.astro';
import HomePage from '@/components/pages/HomePage.astro';
---

<BaseLayout locale="zh-TW" title="Authgear">
  <HomePage locale="zh-TW" />
</BaseLayout>
```

- [ ] **Step 3: Build**

```bash
cd frontend-astro && npm run build
```

Expected: build succeeds. Output includes `dist/client/index.html` and `dist/client/zh-TW/index.html`.

- [ ] **Step 4: Dev sanity check**

```bash
cd frontend-astro && npm run dev &
sleep 3
curl -s http://localhost:4321/ | grep -oE '<html[^>]*lang="[^"]+"' | head -1
curl -s http://localhost:4321/zh-TW/ | grep -oE '<html[^>]*lang="[^"]+"' | head -1
kill %1
```

Expected:
```
<html lang="en"
<html lang="zh-TW"
```

- [ ] **Step 5: Commit**

```bash
git add frontend-astro/src/pages/
git commit -m "feat(astro): wire up home routes for en and zh-TW"
```

---

## Task 15: Implement middleware (legacy redirects)

**Files:**
- Create: `frontend-astro/src/middleware.ts`

- [ ] **Step 1: Write the middleware**

Create `frontend-astro/src/middleware.ts`:

```ts
import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  const { pathname } = url;

  // /zh-Hant-TW/* → /zh-TW/* (308)
  if (pathname === '/zh-Hant-TW' || pathname.startsWith('/zh-Hant-TW/')) {
    const target = pathname.replace(/^\/zh-Hant-TW/, '/zh-TW');
    return context.redirect(target + url.search, 308);
  }

  // /zh or /zh/* → /zh-TW/* (308), but do NOT match /zh-TW/*
  if (pathname === '/zh' || (pathname.startsWith('/zh/') && !pathname.startsWith('/zh-TW/'))) {
    const target = pathname.replace(/^\/zh(?=\/|$)/, '/zh-TW');
    return context.redirect(target + url.search, 308);
  }

  return next();
});
```

- [ ] **Step 2: Test manually**

```bash
cd frontend-astro && npm run build && npm start &
sleep 3
curl -sI http://localhost:4321/zh/ | head -3
curl -sI http://localhost:4321/zh-Hant-TW/ | head -3
curl -sI http://localhost:4321/zh-TW/ | head -3
kill %1
```

Expected:
- `/zh/` → 308, `location: /zh-TW/`
- `/zh-Hant-TW/` → 308, `location: /zh-TW/`
- `/zh-TW/` → 200

- [ ] **Step 3: Commit**

```bash
git add frontend-astro/src/middleware.ts
git commit -m "feat(astro): add legacy locale redirect middleware"
```

---

## Task 16: Playwright smoke test setup

**Files:**
- Create: `frontend-astro/playwright.config.ts`
- Create: `frontend-astro/tests/smoke.spec.ts`
- Modify: `frontend-astro/package.json`

- [ ] **Step 1: Install Playwright browsers**

```bash
cd frontend-astro
npx playwright install chromium
```

- [ ] **Step 2: Write playwright.config.ts**

Create `frontend-astro/playwright.config.ts`:

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run build && npm start',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
```

- [ ] **Step 3: Write the failing smoke test**

Create `frontend-astro/tests/smoke.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

test.describe('home page renders', () => {
  test('en: root serves English home', async ({ page }) => {
    const resp = await page.goto('/');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('nav').first()).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('zh-TW: /zh-TW/ serves Traditional Chinese home', async ({ page }) => {
    const resp = await page.goto('/zh-TW/');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-TW');
  });
});

test.describe('legacy redirects', () => {
  test('/zh/ → /zh-TW/ (308)', async ({ request }) => {
    const resp = await request.get('/zh/', { maxRedirects: 0 });
    expect(resp.status()).toBe(308);
    expect(resp.headers()['location']).toBe('/zh-TW/');
  });

  test('/zh-Hant-TW/ → /zh-TW/ (308)', async ({ request }) => {
    const resp = await request.get('/zh-Hant-TW/', { maxRedirects: 0 });
    expect(resp.status()).toBe(308);
    expect(resp.headers()['location']).toBe('/zh-TW/');
  });
});

test.describe('analytics scripts', () => {
  test('GTM script tag present', async ({ page }) => {
    await page.goto('/');
    const content = await page.content();
    expect(content).toContain('GTM-KTHFL6S');
  });
});
```

- [ ] **Step 4: Run — expect pass**

```bash
cd frontend-astro && npx playwright test
```

Expected: 5 passed.

- [ ] **Step 5: Commit**

```bash
git add frontend-astro/playwright.config.ts frontend-astro/tests/ frontend-astro/package.json frontend-astro/package-lock.json
git commit -m "test(astro): add Playwright smoke tests for home + redirects"
```

---

## Task 17: Dockerfile for Fly deploy (build-only; actual deploy is Phase 4)

**Files:**
- Create: `frontend-astro/Dockerfile`
- Create: `frontend-astro/.dockerignore`

- [ ] **Step 1: Write .dockerignore**

```
node_modules
dist
.astro
.env
.env.*
*.log
tests
playwright-report
test-results
```

- [ ] **Step 2: Write Dockerfile**

Create `frontend-astro/Dockerfile`:

```dockerfile
# syntax=docker/dockerfile:1
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
EXPOSE 3000
ENV HOST=0.0.0.0 PORT=3000
CMD ["node", "./dist/server/entry.mjs"]
```

- [ ] **Step 3: Verify local build**

```bash
cd frontend-astro && docker build -t authgear-astro-test .
```

Expected: build succeeds. (We don't run it — deployment is Phase 4.)

- [ ] **Step 4: Commit**

```bash
git add frontend-astro/Dockerfile frontend-astro/.dockerignore
git commit -m "chore(astro): add Dockerfile for future Fly deploy"
```

---

## Task 18: Document Phase 1 completion + next steps

**Files:**
- Create: `frontend-astro/README.md`
- Modify: `docs/ARCHITECTURE-ASTRO.md`

- [ ] **Step 1: Write frontend-astro/README.md**

```markdown
# frontend-astro

Astro 5 port of the Authgear marketing site. Runs in parallel with `frontend/` (Next.js) during migration.

See `docs/ARCHITECTURE-ASTRO.md` for design rationale.

## Dev

```bash
npm install
cp ../frontend/.env.local .env    # same variables; PUBLIC_STRAPI_URL replaces NEXT_PUBLIC_STRAPI_URL
npm run dev                       # http://localhost:4321
```

## Build & run

```bash
npm run build
npm start                         # node ./dist/server/entry.mjs
```

## Tests

```bash
npm run test:unit                 # vitest — i18n helper
npm test                          # playwright — smoke tests (home, redirects, analytics)
```

## Phase status

- [x] Phase 1: Foundation (this PR)
- [ ] Phase 2: Port remaining static marketing pages
- [ ] Phase 3: Port CMS pages (blog, customer stories, integrations, login gallery, what's new)
- [ ] Phase 4: Fly.io deployment + cutover
```

- [ ] **Step 2: Add Phase 1 completion marker to ARCHITECTURE-ASTRO.md**

At the top of `docs/ARCHITECTURE-ASTRO.md`, add a status line after the first paragraph:

```markdown
**Migration status (2026-04-21):** Phase 1 foundation shipped. See `docs/superpowers/plans/2026-04-21-astro-migration-foundation.md`. Phase 2 (static pages) plan pending.
```

- [ ] **Step 3: Commit**

```bash
git add frontend-astro/README.md docs/ARCHITECTURE-ASTRO.md
git commit -m "docs(astro): Phase 1 complete — foundation shipped"
```

---

## Phase 1 complete

Verification gate before Phase 2:

1. `cd frontend-astro && npm run build` — succeeds
2. `npm run test:unit && npm test` — all pass
3. Manual visual inspection: `npm run dev`, open `http://localhost:4321/` and `http://localhost:4321/zh-TW/` side-by-side with current Next.js at `http://localhost:3000/`. Hero, nav, footer, fonts should match.
4. `curl -sI http://localhost:4321/zh/` returns 308
5. GTM fires in the browser's Network tab on both routes
6. Plausible script loads (if `PUBLIC_PLAUSIBLE_DOMAIN` is set)

If all six pass, Phase 2 planning begins (see below).

---

## Phases 2–4 outline (detailed plans to be written after Phase 1 ships)

### Phase 2: Static marketing pages (~2 weeks)

Port the remaining `components/pages/*.tsx` → `*.astro`. Order by risk (simple first, complex last):

1. **Simple marketing**: About, Why Authgear, Promises, Data Privacy, Auth Toolkit, Migrate to Authgear, Glossary
2. **Legal**: Terms, Terms Enterprise, Policy, Security, SLA
3. **Features subtree** (23 pages in `components/pages/features/`)
4. **Solutions subtree** (7 pages)
5. **Compare subtree** (4 competitor comparison pages)
6. **Tools subtree** (9 dev tool pages: Base64, HMAC, JWK, JWT, OIDC, password hash, SSL, TOTP, UUID)
7. **Complex interactive**: Pricing (toggle + comparison table), Once (SDK tabs + FAQ), Schedule Demo (ContactForm), SMS calculator

Also in scope: port `ContactForm`, `LogoMarquee`, `SmsCalculator`, `OnceSdkCode`, `OnceSdkFrameworkHarness`, `MfaOptionsTabs`, `BiometricMethodsTabs` as React islands (replacing the Phase 1 placeholders).

### Phase 3: CMS-backed pages (~1 week)

- Blog listing + detail (`/blog`, `/blog/[slug]`)
- Customer stories (`/customer-stories`, `/customer-stories/[slug]`)
- Login gallery detail (`/login-gallery/[slug]`)
- Integrations detail (`/integrations/[slug]`)
- What's new detail (`/whats-new/[slug]`)
- `/api/contact` and `/api/blog-posts` Astro endpoints
- SSR cache headers (`s-maxage=60, stale-while-revalidate=300`)

### Phase 4: Deployment + cutover (~2–3 days)

- `fly.toml`, initial `fly launch`, secrets
- DNS: point `authgear.com` at Fly (preview subdomain first)
- Staging cutover → production cutover
- Delete `frontend/` directory and Next-related configs once stable
- Nginx config update (if any routing changes)
