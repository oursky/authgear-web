# Astro Migration — Phase 3-3: Login Gallery + What's New

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the last two CMS subtypes — login gallery (listing + detail with interactive carousel) and what's new (listing + detail, inline). Completes Phase 3.

**Architecture:** Same SSR + cache-headers pattern as Phases 3-1/3-2. Login gallery has a 266 LOC `LoginGalleryCarousel` React island (useState/useEffect). `StrapiBlocksContent` reused from Phase 3-2 for rich-text bodies. What's new is simpler — both routes inline their rendering with no standalone components.

**Tech Stack:** Same.

**References:**
- `docs/superpowers/plans/2026-04-22-astro-phase3-1-blog.md`
- `docs/superpowers/plans/2026-04-22-astro-phase3-2-customer-stories.md`

**Exit criteria:**

1. `npm run build` succeeds
2. `npm test` — at least 149 passed (144 existing + 5 new: 4 routes + 1 cache header)
3. Manual: both subtypes' listings + details render from Strapi

---

## Task 1: Port LoginGalleryCarousel island

**Files:**
- Create: `frontend-astro/src/components/islands/login-gallery/LoginGalleryCarousel.tsx`

Source: `frontend/components/login-gallery/LoginGalleryCarousel.tsx` (266 LOC). Client component with useState/useEffect, next/image.

- [ ] **Step 1**: Copy, then adapt:
```bash
cp /Users/fung/dev/authgear-web/frontend/components/login-gallery/LoginGalleryCarousel.tsx \
   /Users/fung/dev/authgear-web/frontend-astro/src/components/islands/login-gallery/LoginGalleryCarousel.tsx
```
- Delete `'use client';`
- Remove `import Image from 'next/image';`; swap `<Image …>` → `<img loading="lazy" …>`
- If it uses `useTranslations`, adapt with the standard `const t = (key) => tFn(locale, 'Namespace.key')` pattern (add `locale` prop if missing)

- [ ] **Step 2**: Typecheck; commit: `git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/islands/login-gallery/LoginGalleryCarousel.tsx && git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port LoginGalleryCarousel as React island"`

---

## Task 2: Port LoginGalleryIndexPage component

**Files:**
- Create: `frontend-astro/src/components/login-gallery/LoginGalleryIndexPage.tsx`

Source: `frontend/components/login-gallery/LoginGalleryIndexPage.tsx` (101 LOC). Server component using next/image + next/link.

- [ ] **Step 1**: Copy:
```bash
mkdir -p /Users/fung/dev/authgear-web/frontend-astro/src/components/login-gallery
cp /Users/fung/dev/authgear-web/frontend/components/login-gallery/LoginGalleryIndexPage.tsx \
   /Users/fung/dev/authgear-web/frontend-astro/src/components/login-gallery/LoginGalleryIndexPage.tsx
```
- Remove `import Image from 'next/image';` + swap to `<img loading="lazy">`
- Remove `import Link from 'next/link';` + swap `<Link href>` → `<a href>`

- [ ] **Step 2**: Typecheck; commit: `git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/login-gallery/LoginGalleryIndexPage.tsx && git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port LoginGalleryIndexPage component"`

---

## Task 3: Port LoginGalleryDetailLayout component

**Files:**
- Create: `frontend-astro/src/components/login-gallery/LoginGalleryDetailLayout.tsx`

Source: `frontend/components/login-gallery/LoginGalleryDetailLayout.tsx` (225 LOC). Server component using next/link. Exports both `default` AND `buildLoginGalleryDetailLabels` helper.

- [ ] **Step 1**: Copy:
```bash
cp /Users/fung/dev/authgear-web/frontend/components/login-gallery/LoginGalleryDetailLayout.tsx \
   /Users/fung/dev/authgear-web/frontend-astro/src/components/login-gallery/LoginGalleryDetailLayout.tsx
```
- Remove `import Link from 'next/link';` + swap `<Link>` → `<a>`
- Update `StrapiBlocksContent` / `LoginGalleryCarousel` import paths to `@/components/islands/login-gallery/...` (both are now under islands/)
- Verify `buildLoginGalleryDetailLabels` export survives

- [ ] **Step 2**: Typecheck; commit: `git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/login-gallery/LoginGalleryDetailLayout.tsx && git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port LoginGalleryDetailLayout component"`

---

## Task 4: /login-gallery routes (listing + detail)

**Files:**
- Create: `frontend-astro/src/pages/login-gallery/index.astro` + zh-TW
- Create: `frontend-astro/src/pages/login-gallery/[slug].astro` + zh-TW

- [ ] **Step 1**: Read Next sources:
```bash
cat /Users/fung/dev/authgear-web/frontend/app/[locale]/login-gallery/page.tsx
cat /Users/fung/dev/authgear-web/frontend/app/[locale]/login-gallery/[slug]/page.tsx
```

- [ ] **Step 2**: Write listing route (`src/pages/login-gallery/index.astro`):
```astro
---
export const prerender = false;
import BaseLayout from '@/layouts/BaseLayout.astro';
import { t } from '@/i18n';
import { pathLocaleToStrapiLocale } from '@/lib/i18n';
import { getLoginGalleryItems } from '@/lib/strapi';
import LoginGalleryIndexPage from '@/components/login-gallery/LoginGalleryIndexPage';

const locale = 'en';
const strapiLocale = pathLocaleToStrapiLocale(locale);
const res = await getLoginGalleryItems({ pagination: { pageSize: 100 }, locale: strapiLocale });
const items = res.data ?? [];
const title = t(locale, 'LoginGalleryIndex.metaTitle');
const description = t(locale, 'LoginGalleryIndex.metaDescription');
Astro.response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
---
<BaseLayout locale={locale} title={title} description={description}>
  <div class="page-wrapper"><LoginGalleryIndexPage locale={locale} items={items} /></div>
</BaseLayout>
```

zh-TW mirror: same but `const locale = 'zh-TW';`.

- [ ] **Step 3**: Write detail route (`src/pages/login-gallery/[slug].astro`):

Import `LoginGalleryDetailLayout` (default) and `buildLoginGalleryDetailLabels` (named). SSR fetch item by slug; if null, `return Astro.redirect('/404');`. Build labels via `buildLoginGalleryDetailLabels((key) => t(locale, \`LoginGalleryDetail.${key}\`))` or equivalent — look at `buildLoginGalleryDetailLabels` signature to get the pattern right. Render `<LoginGalleryDetailLayout locale={locale} item={item} labels={labels} />`. Set cache header.

zh-TW mirror.

- [ ] **Step 4**: Build: `cd /Users/fung/dev/authgear-web/frontend-astro && npm run build 2>&1 | tail -10`. Must succeed.

- [ ] **Step 5**: Commit:
```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/pages/login-gallery/ frontend-astro/src/pages/zh-TW/login-gallery/
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port /login-gallery listing + detail routes"
```

---

## Task 5: /whats-new routes (listing + detail, inline)

**Files:**
- Create: `frontend-astro/src/pages/whats-new/index.astro` + zh-TW
- Create: `frontend-astro/src/pages/whats-new/[slug].astro` + zh-TW

Unlike login gallery, what's new inlines its rendering directly in the route files.

- [ ] **Step 1**: Read Next sources:
```bash
cat /Users/fung/dev/authgear-web/frontend/app/[locale]/whats-new/page.tsx
cat /Users/fung/dev/authgear-web/frontend/app/[locale]/whats-new/[slug]/page.tsx
```

- [ ] **Step 2**: Write listing route — SSR fetch `getWhatsNewItems({ pagination: { pageSize: 50 }, locale: strapiLocale })`, render grid of cards per Next source. Namespace: `WhatsNew`. Drop next/image/link per standard rules. Title/desc: `t(locale, 'WhatsNew.metaTitle' / 'metaDescription')` if keys exist, otherwise inline EN defaults from source.

zh-TW mirror.

- [ ] **Step 3**: Write detail route — SSR fetch by slug, render hero + body via `set:html` (body is HTML string per Next source's rendering), publish date, title. Namespace: `WhatsNew`.

zh-TW mirror.

- [ ] **Step 4**: Build: must succeed.

- [ ] **Step 5**: Commit:
```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/pages/whats-new/ frontend-astro/src/pages/zh-TW/whats-new/
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port /whats-new listing + detail routes"
```

---

## Task 6: Smoke tests

**Files:**
- Create: `frontend-astro/tests/phase3-3-gallery-whatsnew.spec.ts`

```ts
import { test, expect } from '@playwright/test';

test.describe('Phase 3-3: /login-gallery', () => {
  test('/login-gallery returns 200', async ({ page }) => {
    const resp = await page.goto('/login-gallery');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('/zh-TW/login-gallery returns 200', async ({ page }) => {
    const resp = await page.goto('/zh-TW/login-gallery');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-TW');
  });
});

test.describe('Phase 3-3: /whats-new', () => {
  test('/whats-new returns 200', async ({ page }) => {
    const resp = await page.goto('/whats-new');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('/zh-TW/whats-new returns 200', async ({ page }) => {
    const resp = await page.goto('/zh-TW/whats-new');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-TW');
  });

  test('/whats-new sets SSR cache headers', async ({ request }) => {
    const resp = await request.get('/whats-new');
    const cc = resp.headers()['cache-control'] ?? '';
    expect(cc).toContain('s-maxage=60');
  });
});
```

Run alone + full suite. Commit:
```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/tests/phase3-3-gallery-whatsnew.spec.ts
git -C /Users/fung/dev/authgear-web commit -m "test(astro): smoke tests for /login-gallery + /whats-new"
```

---

## Task 7: Docs — Phase 3 complete

- [ ] **Step 1**: README — check `- [ ] Phase 3-3` → `- [x]`
- [ ] **Step 2**: ARCHITECTURE — replace `**Migration status` with:
```
**Migration status (2026-04-22):** Phase 2 + Phase 3 complete (all CMS-backed subtypes shipped). Branch `migration/nextjs-to-astro` at full feature parity with the Next.js site. All static marketing + 4 CMS subtypes (blog, customer stories, login gallery, what's new) live in both locales. Phase 4 (Fly.io deploy + cutover) pending.
```
- [ ] **Step 3**: Commit: `git -C /Users/fung/dev/authgear-web add frontend-astro/README.md docs/ARCHITECTURE-ASTRO.md && git -C /Users/fung/dev/authgear-web commit -m "docs(astro): Phase 3 complete — all CMS subtypes shipped"`
