# i18n Infrastructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all ad-hoc translation objects with next-intl so every new locale requires only a new `messages/<locale>.json` file, with zero code changes.

**Architecture:** Use next-intl in "core mode" (translations only, no routing takeover). The existing middleware already sets an `x-locale` header; `i18n/request.ts` reads that header to pick the message bundle. Server components call `getTranslations()`, client components call `useTranslations()`. Message files live in `frontend/messages/` as flat JSON namespaced by feature area.

**Tech Stack:** next-intl (latest v3), TypeScript, Next.js 16 App Router, existing custom middleware (unchanged)

---

## File Structure

| Action | Path | Purpose |
|--------|------|---------|
| Create | `frontend/messages/en.json` | English message bundle |
| Create | `frontend/messages/zh-TW.json` | Traditional Chinese bundle |
| Create | `frontend/i18n/request.ts` | next-intl server config — reads `x-locale` header |
| Modify | `frontend/next.config.ts` | Wrap with `withNextIntl` plugin |
| Modify | `frontend/app/layout.tsx` | Add `NextIntlClientProvider` with messages |
| Modify | `frontend/lib/site-navigation.ts` | Use `getTranslations('Navigation')` instead of `navigation.json` |
| Modify | `frontend/lib/pricing/getCopy.ts` | Load from messages instead of locale-specific TS files |
| Modify | `frontend/lib/i18n.ts` | Export `LOCALES` from here; remove per-locale TS copies |
| Delete | `frontend/lib/pricing/copy-en.ts` | Replaced by `messages/en.json` |
| Delete | `frontend/lib/pricing/copy-zh-tw.ts` | Replaced by `messages/zh-TW.json` |
| Delete | `frontend/content/navigation.json` | Replaced by `messages/` namespace |

---

### Task 1: Install next-intl

**Files:**
- Modify: `frontend/package.json`

- [ ] **Step 1: Install next-intl**

```bash
cd frontend && npm install next-intl
```

- [ ] **Step 2: Verify install**

```bash
cd frontend && node -e "require('next-intl'); console.log('ok')"
```
Expected: `ok`

- [ ] **Step 3: Commit**

```bash
cd frontend && git add package.json package-lock.json
git commit -m "chore: install next-intl"
```

---

### Task 2: Create i18n request config

**Files:**
- Create: `frontend/i18n/request.ts`
- Modify: `frontend/next.config.ts`

- [ ] **Step 1: Create `frontend/i18n/request.ts`**

```typescript
import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

export default getRequestConfig(async () => {
  const headersList = await headers();
  const locale = headersList.get('x-locale') ?? 'en';

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 2: Update `frontend/next.config.ts` to use withNextIntl**

Replace the top of `frontend/next.config.ts` (add import and wrap export):

```typescript
import type { NextConfig } from 'next';
import type { RemotePattern } from 'next/dist/shared/lib/image-config';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

// ... (rest of file unchanged) ...

export default withNextIntl(nextConfig);
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd frontend && npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 4: Commit**

```bash
cd frontend && git add i18n/request.ts next.config.ts
git commit -m "feat(i18n): add next-intl request config"
```

---

### Task 3: Create message files — Navigation namespace

Read `frontend/content/navigation.json` fully first, then create the message files with the Navigation namespace extracted from it.

**Files:**
- Create: `frontend/messages/en.json`
- Create: `frontend/messages/zh-TW.json`

- [ ] **Step 1: Create `frontend/messages/en.json` with Navigation namespace**

Extract every en value from `content/navigation.json` into a flat namespace. The full file should start as (add more namespaces in later tasks):

```json
{
  "Navigation": {
    "logoAlt": "Authgear Logo",
    "products": "Products",
    "solutions": "Solutions",
    "resources": "Resources",
    "developers": "Developers",
    "pricing": "Pricing",
    "loginMobile": "Login",
    "signupMobile": "Signup",
    "getDemo": "Get a Demo",
    "signupLogin": "Signup/Login",
    "footerTagline": "Making it easy for developers to build secure, frictionless digital experiences."
  }
}
```

> **Note:** Do not translate navigation dropdown *link labels* — those are already present in `navigation.json`. Copy all `en` values for every key in the JSON file into this namespace. Review `content/navigation.json` carefully — it has `productsDropdown`, `solutionsDropdown`, `resourcesDropdown`, `developersDropdown`, and footer sections. Every localized string in that file must appear in `Navigation` here.

- [ ] **Step 2: Create `frontend/messages/zh-TW.json` with Navigation namespace**

Mirror the structure, using the `zh-TW` values from `content/navigation.json`:

```json
{
  "Navigation": {
    "logoAlt": "Authgear 標誌",
    "products": "產品",
    "solutions": "解決方案",
    "resources": "資源",
    "developers": "開發者",
    "pricing": "定價",
    "loginMobile": "登入",
    "signupMobile": "註冊",
    "getDemo": "預約示範",
    "signupLogin": "註冊／登入",
    "footerTagline": "讓開發者輕鬆打造安全、流暢的數位體驗。"
  }
}
```

> Use the actual zh-TW values from navigation.json — the above are placeholders for non-top-level entries. Fill in ALL navigation entries.

- [ ] **Step 3: Add `NextIntlClientProvider` to root layout**

In `frontend/app/layout.tsx`, import and wrap the body content. The layout is a server component, so use `getMessages()`:

```typescript
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

// Inside RootLayout, before return:
const messages = await getMessages();

// Wrap children area:
<NextIntlClientProvider messages={messages}>
  {/* existing nav, children, footer, cookie, scripts */}
</NextIntlClientProvider>
```

> Wrap only the `<body>` contents, not `<html>` or `<head>`.

- [ ] **Step 4: Verify dev server starts**

```bash
cd frontend && npm run dev
```
Expected: server starts, no import errors in terminal. Open http://localhost:3000. Kill server.

- [ ] **Step 5: Commit**

```bash
cd frontend && git add messages/en.json messages/zh-TW.json app/layout.tsx
git commit -m "feat(i18n): add message files and NextIntlClientProvider"
```

---

### Task 4: Migrate site-navigation.ts to next-intl

**Files:**
- Modify: `frontend/lib/site-navigation.ts`

The current `site-navigation.ts` reads `navigation.json` and renders HTML strings using `pick()`. Replace it with `getTranslations('Navigation')`.

> **Important:** Read `frontend/lib/site-navigation.ts` fully before editing. It renders the nav and footer as HTML strings. Keep the HTML rendering logic identical — only replace string access (`pick(locale, t)` → `t('key')`) and the JSON import.

- [ ] **Step 1: Refactor `getNavInnerHtml` and `getFooterInnerHtml` to accept a `t` function**

The functions are currently sync. Since `getTranslations` is async, the callers in `layout.tsx` need to await. Update the signatures:

```typescript
import { getTranslations } from 'next-intl/server';

// Remove: import navigation from '@/content/navigation.json';
// Remove: the pick() function and Localized type

export async function getNavInnerHtml(locale: string): Promise<string> {
  // Pass locale explicitly — this function is called from layout.tsx which already
  // has the locale from headers(). Do NOT rely on ambient request context here.
  const t = await getTranslations({ locale, namespace: 'Navigation' });
  // Replace all pick(locale, nav.someKey) → t('someKey')
  // The HTML structure stays the same
  ...
}

export async function getFooterInnerHtml(locale: string): Promise<string> {
  const t = await getTranslations({ locale, namespace: 'Navigation' });
  ...
}
```

> **TypeScript note:** After making these functions async, `layout.tsx` will have type errors on the (currently sync) calls at lines 59–60. Fix immediately in Step 2 — do not attempt a build before doing Step 2.

- [ ] **Step 2: Update `frontend/app/layout.tsx` to await nav functions**

```typescript
const navInnerHtml = await getNavInnerHtml(locale);
const footerInnerHtml = await getFooterInnerHtml(locale);
```

- [ ] **Step 3: Handle nav dropdown link arrays**

The `navigation.json` dropdown entries have arrays of links (`columns[].links[]`), each with `{ path, en, 'zh-TW' }`. These are iterated in `site-navigation.ts` — you cannot look them up by individual message key inside a loop.

**Recommended approach:** Keep the link arrays as structured TypeScript data (not message keys). Move the dropdown data from `navigation.json` to a new file `frontend/lib/navigation-data.ts` with typed locale variants:

```typescript
// frontend/lib/navigation-data.ts
export type NavLink = { path?: string; href?: string; label: Record<string, string> };
export type NavColumn = { subtitle: Record<string, string>; links: NavLink[] };

export const productsDropdownColumns: NavColumn[] = [
  {
    subtitle: { en: 'SECURITY', 'zh-TW': '安全性' },
    links: [
      { path: '/features/attack-protection', label: { en: 'Attack Protection', 'zh-TW': '攻擊防護' } },
      // ... all links from navigation.json
    ],
  },
  // ... all columns
];
// Similarly for solutions, resources, developers dropdowns and footer
```

Then in `site-navigation.ts`, import from `navigation-data.ts` and access `link.label[locale] ?? link.label.en` in the loop.

**Only use `t()` for top-level atomic strings** in the nav that are not part of arrays (`logoAlt`, `products`, `solutions`, `resources`, `developers`, `pricing`, `loginMobile`, `signupMobile`, `getDemo`, `signupLogin`). Those belong in `messages/`.

This avoids the problem of needing to look up message keys by index inside a loop, and keeps the link structure typesafe.

After implementing, delete `frontend/content/navigation.json`:

```bash
rm frontend/content/navigation.json
```

Verify no remaining imports:
```bash
grep -r "navigation.json" frontend/ --include="*.ts" --include="*.tsx"
```
Expected: no output.

- [ ] **Step 4: Verify build**

```bash
cd frontend && npm run build
```
Expected: BUILD succeeded, no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
cd frontend && git add lib/site-navigation.ts lib/navigation-data.ts app/layout.tsx messages/en.json messages/zh-TW.json
git rm content/navigation.json
git commit -m "feat(i18n): migrate site-navigation to next-intl, remove navigation.json"
```

---

### Task 5: Add Blog, CustomerStories, Integrations, WhatsNew namespaces

These are the already-native React pages with hardcoded English UI strings. Find every string and add to messages.

**Files:**
- Modify: `frontend/messages/en.json`
- Modify: `frontend/messages/zh-TW.json`
- Modify: `frontend/app/[locale]/blog/page.tsx`
- Modify: `frontend/app/[locale]/blog/[slug]/page.tsx`
- Modify: `frontend/app/[locale]/customer-stories/page.tsx`
- Modify: `frontend/app/[locale]/customer-stories/[slug]/page.tsx`
- Modify: `frontend/app/[locale]/integrations/page.tsx`
- Modify: `frontend/app/[locale]/integrations/[slug]/page.tsx`
- Modify: `frontend/app/[locale]/whats-new/page.tsx`
- Modify: `frontend/app/[locale]/whats-new/[slug]/page.tsx`
- Modify: `frontend/components/blog/BlogPostInfiniteGrid.tsx`
- Modify: `frontend/components/blog/BlogPostCard.tsx`

- [ ] **Step 1: Grep for all hardcoded user-visible strings in these files**

```bash
cd frontend && grep -n '"[A-Z][^"]*"' app/\[locale\]/blog/page.tsx app/\[locale\]/blog/\[slug\]/page.tsx app/\[locale\]/customer-stories/page.tsx app/\[locale\]/whats-new/page.tsx
```

Collect every string that a user sees (headings, labels, CTAs, empty states). Ignore CSS class names, href values, and HTML attributes.

- [ ] **Step 2: Add `Blog` namespace to `messages/en.json`**

```json
"Blog": {
  "title": "Resource Center",
  "subtitle": "Stay updated with the latest best practices...",
  "allPosts": "All posts",
  "all": "All",
  "noPostsYet": "No posts yet. Add content in the Strapi admin panel.",
  "latestArticles": "Latest articles",
  "lastUpdated": "Last updated: ",
  "loadMore": "Load more"
}
```

Add equivalent keys to `zh-TW.json` (translate the values).

- [ ] **Step 3: Add `CustomerStories`, `Integrations`, `WhatsNew` namespaces**

Follow the same pattern. Read each page file, find user-visible strings, add them to both message files.

- [ ] **Step 4: Update blog page server components to use `getTranslations`**

Example for `frontend/app/[locale]/blog/page.tsx`:

```typescript
import { getTranslations } from 'next-intl/server';

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Blog' });
  const strapiLocale = pathLocaleToStrapiLocale(locale);
  // ...
  return (
    <div className="page-wrapper">
      <div className="section blog-gallery">
        <div className="container-default blog-gallery-feature w-container">
          <h1 className="blog-gallery-h1">{t('title')}</h1>
          <div className="text-block-83">{t('subtitle')}</div>
        </div>
      </div>
      {/* ... */}
      <Link href={localizedPath(locale, '/blog')} className="button-blog-category all w-button w--current">
        {t('all')}
      </Link>
      {/* ... */}
    </div>
  );
}
```

- [ ] **Step 5: Update client components to use `useTranslations`**

For `BlogPostInfiniteGrid.tsx` (client component):

```typescript
'use client';
import { useTranslations } from 'next-intl';

export function BlogPostInfiniteGrid(...) {
  const t = useTranslations('Blog');
  // Replace "Load more" → t('loadMore')
}
```

- [ ] **Step 6: Verify build**

```bash
cd frontend && npm run build
```
Expected: BUILD succeeded.

- [ ] **Step 7: Commit**

```bash
cd frontend && git add messages/en.json messages/zh-TW.json app/\[locale\]/blog app/\[locale\]/customer-stories app/\[locale\]/whats-new app/\[locale\]/integrations components/blog
git commit -m "feat(i18n): migrate CMS pages to next-intl"
```

---

### Task 6: Migrate pricing copy to messages

The pricing page already has locale-split copy files. Move them into messages.

**Files:**
- Modify: `frontend/messages/en.json`
- Modify: `frontend/messages/zh-TW.json`
- Modify: `frontend/lib/pricing/getCopy.ts`
- Delete: `frontend/lib/pricing/copy-en.ts`
- Delete: `frontend/lib/pricing/copy-zh-tw.ts`

> **Note:** The pricing copy is complex (nested objects with arrays). Read `lib/pricing/types.ts` and both copy files fully before proceeding. The simplest migration: keep the pricing data as TypeScript modules but add only the *translatable UI strings* (button labels, tab names, headings, feature labels) to messages. Leave pricing plan data (prices, feature lists) as typed TS since those differ structurally, not just linguistically.

- [ ] **Step 1: Read `frontend/lib/pricing/types.ts` and both copy files**

Identify which fields are pure text translations vs structured data.

- [ ] **Step 2: Add `Pricing` namespace to messages with UI-only strings**

```json
"Pricing": {
  "tabCloud": "On the Cloud",
  "tabOnce": "On your Server",
  "cloudTitle1": "Authgear ",
  "cloudTitleHighlight": "CLOUD",
  "cloudTitle2": "We manage everything for you",
  "subtitle": "All-Inclusive Pricing: Full Feature Access with all Plans",
  "getStarted": "Get Started",
  "buyNow": "Buy Now",
  "contactUs": "Contact Us",
  "mostPopular": "Most Popular",
  "metaTitle": "Pricing - Authgear",
  "metaDescription": "Authentication and authorization solution..."
}
```

Add zh-TW equivalents from `copy-zh-tw.ts`.

- [ ] **Step 3: Update `getCopy.ts` to use `getTranslations` for UI strings**

Keep plan data (prices, CTAs, feature arrays) in the existing TS files but fetch string labels from next-intl:

```typescript
import { getTranslations } from 'next-intl/server';

export async function getPricingCopy(locale: string) {
  const t = await getTranslations({ locale, namespace: 'Pricing' });
  const planData = locale === 'zh-TW' ? pricingCopyZhTw : pricingCopyEn;
  return {
    ...planData,
    tabs: { cloud: t('tabCloud'), once: t('tabOnce') },
    meta: { title: t('metaTitle'), description: t('metaDescription') },
  };
}
```

- [ ] **Step 4: Update callers of `getPricingCopy`**

`getPricingCopy` is currently **synchronous**. Making it async means the caller must be updated. In `frontend/app/[locale]/pricing/page.tsx`, change:

```typescript
// Before:
const { meta } = getPricingCopy(locale);
// After:
const { meta } = await getPricingCopy(locale);
```

TypeScript will flag the missing `await` — do not skip this step.

- [ ] **Step 5: Verify build**

```bash
cd frontend && npm run build
```
Expected: BUILD succeeded, pricing page renders correctly.

- [ ] **Step 6: Commit**

```bash
cd frontend && git add messages/en.json messages/zh-TW.json lib/pricing/
git commit -m "feat(i18n): migrate pricing copy to next-intl"
```

---

### Task 7: Migrate `app/[locale]/page.tsx` metadata strings

The home page has two hardcoded `const title` / `const description` objects.

**Files:**
- Modify: `frontend/app/[locale]/page.tsx`
- Modify: `frontend/messages/en.json`
- Modify: `frontend/messages/zh-TW.json`

- [ ] **Step 1: Add `Home` namespace to messages**

```json
"Home": {
  "title": "Authgear CLOUD - Your Managed IAM Solution",
  "description": "Authgear makes it easier for developers to meet complex authentication requirements..."
}
```

zh-TW:
```json
"Home": {
  "title": "Authgear CLOUD — 您的一站式身份管理方案",
  "description": "在享有企業級安全、高可用與專屬支援的 SaaS 平台上..."
}
```

- [ ] **Step 2: Update `app/[locale]/page.tsx`**

```typescript
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home' });
  return { title: t('title'), description: t('description') };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const htmlFile = locale === 'zh-TW' ? 'zh-TW/index.html' : 'index.html';
  return <StaticWebflowPage htmlFile={htmlFile} />;
}
```

- [ ] **Step 3: Verify build**

```bash
cd frontend && npm run build
```
Expected: BUILD succeeded.

- [ ] **Step 4: Commit**

```bash
cd frontend && git add app/\[locale\]/page.tsx messages/en.json messages/zh-TW.json
git commit -m "feat(i18n): migrate home page metadata to next-intl"
```

---

### Task 8: Clean up and document locale addition

**Files:**
- Modify: `frontend/lib/i18n.ts` (verify only — no new constants needed)
- Create: `frontend/messages/README.md`

- [ ] **Step 1: Verify `LOCALES` is the single source of truth**

`LOCALES` is already exported from `frontend/lib/i18n.ts` as `['en', 'zh-TW'] as const`. No additional constant is needed. Confirm it is used in `middleware.ts` and `i18n/request.ts` (or referenced indirectly). Do not create a duplicate constant.

- [ ] **Step 2: Create `frontend/messages/README.md` documenting how to add a locale**

```markdown
# Adding a new locale

1. Copy `en.json` to `<locale>.json` and translate all values.
2. Add the locale string to `LOCALES` in `frontend/lib/i18n.ts`.
3. Update `frontend/middleware.ts` if the locale needs a URL prefix (add handling analogous to the `zh-TW` block).
4. In Strapi Admin → Settings → Internationalization: add the locale.
5. Run `npm run build` to verify.
```

> Note: `messages/*.json` files are standard JSON — comments are not supported and will break the parser.

- [ ] **Step 3: Final build check**

```bash
cd frontend && npm run build 2>&1 | tail -20
```
Expected: `Route (app)` table shows, no errors.

- [ ] **Step 4: Commit**

```bash
cd frontend && git add lib/i18n.ts messages/
git commit -m "feat(i18n): finalize i18n infrastructure, document adding locales"
```

---

## Adding a new locale (post-plan reference)

1. `cp frontend/messages/en.json frontend/messages/<locale>.json` — translate all values
2. Add `'<locale>'` to `LOCALES` in `frontend/lib/i18n.ts`
3. Add middleware handling if the locale needs URL prefix routing
4. In Strapi Admin → Settings → Internationalization → add locale
5. `npm run build` — done
