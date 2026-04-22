# Astro Migration — Phase 3-2: Customer Stories

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port `/customer-stories` listing + `/customer-stories/[slug]` detail pages, plus the `CustomerStoryBody` renderer and its shared dependency `StrapiBlocksContent`.

**Architecture:** Same as Phase 3-1: both routes SSR with `Cache-Control: public, s-maxage=60, stale-while-revalidate=300`. `CustomerStoryBody` uses `@strapi/blocks-react-renderer` (installed in Phase 3-1) to render rich-text content, falling back to `set:html` for legacy HTML strings. `StrapiBlocksContent` wraps the renderer with custom image handling — shared with login-gallery so it's ported here (not duplicated in Phase 3-3).

**Tech Stack:** Same.

**References:**
- `docs/superpowers/plans/2026-04-22-astro-phase3-1-blog.md` — SSR + cache-headers pattern

**What this phase does NOT do:** login gallery or what's new (Phase 3-3).

**Exit criteria:**

1. `npm run build` — succeeds
2. `npm test` — at least 143 passed (141 existing + 2 new: listing + detail smoke)
3. Manual: `/customer-stories` lists stories from Strapi; clicking a slug renders detail with metrics + body

---

## File structure (new)

```
frontend-astro/
├── src/
│   ├── pages/
│   │   ├── customer-stories/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   └── zh-TW/customer-stories/
│   │       ├── index.astro
│   │       └── [slug].astro
│   └── components/
│       ├── customer-story/
│       │   └── CustomerStoryBody.tsx
│       └── islands/
│           └── login-gallery/
│               └── StrapiBlocksContent.tsx          # shared — used by both subtypes
└── tests/
    └── phase3-2-customer-stories.spec.ts
```

---

## Task 1: Port `StrapiBlocksContent` as React island

**Files:**
- Create: `frontend-astro/src/components/islands/login-gallery/StrapiBlocksContent.tsx`

Source: `frontend/components/login-gallery/StrapiBlocksContent.tsx` (47 LOC). Client component using `next/image` + `@strapi/blocks-react-renderer`. Shared between customer-stories and login-gallery.

- [ ] **Step 1: Copy + adapt**

```bash
mkdir -p /Users/fung/dev/authgear-web/frontend-astro/src/components/islands/login-gallery
cp /Users/fung/dev/authgear-web/frontend/components/login-gallery/StrapiBlocksContent.tsx \
   /Users/fung/dev/authgear-web/frontend-astro/src/components/islands/login-gallery/StrapiBlocksContent.tsx
```

- [ ] **Step 2: Remove Next imports**

Edit the destination file:
- Delete `'use client';`
- Remove `import Image from 'next/image';`
- Replace every `<Image src={x} width={w} height={h} alt={a} …otherProps />` with `<img src={x} width={w} height={h} alt={a} loading="lazy" …otherProps />`

Keep the `BlocksRenderer` import from `@strapi/blocks-react-renderer`.

- [ ] **Step 3: Typecheck + commit**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/islands/login-gallery/StrapiBlocksContent.tsx
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port StrapiBlocksContent as React island"
```

---

## Task 2: Port `CustomerStoryBody` component

**Files:**
- Create: `frontend-astro/src/components/customer-story/CustomerStoryBody.tsx`

Source: `frontend/components/customer-story/CustomerStoryBody.tsx` (155 LOC). Server component (no `'use client'`), uses `next/image` and imports `StrapiBlocksContent`.

- [ ] **Step 1: Copy**

```bash
mkdir -p /Users/fung/dev/authgear-web/frontend-astro/src/components/customer-story
cp /Users/fung/dev/authgear-web/frontend/components/customer-story/CustomerStoryBody.tsx \
   /Users/fung/dev/authgear-web/frontend-astro/src/components/customer-story/CustomerStoryBody.tsx
```

- [ ] **Step 2: Adapt**

Edit the destination:
- Remove `import Image from 'next/image';` — swap `<Image>` → `<img loading="lazy">`
- Change `import StrapiBlocksContent from '@/components/login-gallery/StrapiBlocksContent';` → `import StrapiBlocksContent from '@/components/islands/login-gallery/StrapiBlocksContent';`

Since `StrapiBlocksContent` has hooks (it's an island), using it inside a server-rendered CustomerStoryBody requires treating its usage as a React island reference. Astro auto-hydrates React components under `client:*` directives only — if CustomerStoryBody is used in an `.astro` file and it itself imports a React component that has `useState`/`useEffect`, Astro will SSR it fine (the hooks just don't run server-side). The usage in the detail route will be `<CustomerStoryBody ... />` without a `client:*` directive — so it's all SSR, `StrapiBlocksContent` renders statically. That's the desired behavior for rich text.

- [ ] **Step 3: Typecheck + commit**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/customer-story/CustomerStoryBody.tsx
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port CustomerStoryBody component"
```

---

## Task 3: Port `/customer-stories` listing page

**Files:**
- Create: `frontend-astro/src/pages/customer-stories/index.astro`
- Create: `frontend-astro/src/pages/zh-TW/customer-stories/index.astro`

Source: `frontend/app/[locale]/customer-stories/page.tsx` (83 LOC). SSR fetches stories from Strapi; no infinite scroll; renders grid of cards with Link + Image per story.

- [ ] **Step 1: Read source**

```bash
cat /Users/fung/dev/authgear-web/frontend/app/[locale]/customer-stories/page.tsx
```

- [ ] **Step 2: Write en route**

Create `/Users/fung/dev/authgear-web/frontend-astro/src/pages/customer-stories/index.astro`:

```astro
---
export const prerender = false;

import BaseLayout from '@/layouts/BaseLayout.astro';
import { t } from '@/i18n';
import { localizedPath, pathLocaleToStrapiLocale } from '@/lib/i18n';
import { getCustomerStories, strapiImageUrl } from '@/lib/strapi';

const locale = 'en';
const strapiLocale = pathLocaleToStrapiLocale(locale);
const res = await getCustomerStories({ pagination: { pageSize: 50 }, locale: strapiLocale });
const stories = res.data ?? [];

const title = 'Customer Stories';
const description = "Power ambitious teams to build faster. Authgear's drop-in authentication handles the hard security work while your developers ship what matters.";

Astro.response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
---

<BaseLayout locale={locale} title={title} description={description}>
  {/* Port the page body from the Next source:
       - Hero section with {t(locale, 'CustomerStories.title')} and subtitle
       - Empty state when stories.length === 0 with {t(locale, 'CustomerStories.noStoriesYet')}
       - Grid of story cards, each with <a href={localizedPath(locale, `/customer-stories/${slug}`)}> and <img> for thumbnail
       - "Read story" CTA using {t(locale, 'CustomerStories.readStory')}
       - Drop next/link and next/image per standard rules
       - Preserve all Webflow classes (ds-section, ds-container, case-study-item-wrap, etc.)
  */}
</BaseLayout>
```

Port the full body. Translation namespace: `CustomerStories`.

- [ ] **Step 3: Write zh-TW route**

Same content except `const locale = 'zh-TW';`.

- [ ] **Step 4: Build**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npm run build 2>&1 | tail -10
```

Must succeed.

- [ ] **Step 5: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/pages/customer-stories/index.astro frontend-astro/src/pages/zh-TW/customer-stories/index.astro
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port /customer-stories listing page (SSR)"
```

---

## Task 4: Port `/customer-stories/[slug]` detail page

**Files:**
- Create: `frontend-astro/src/pages/customer-stories/[slug].astro`
- Create: `frontend-astro/src/pages/zh-TW/customer-stories/[slug].astro`

Source: `frontend/app/[locale]/customer-stories/[slug]/page.tsx` (104 LOC). Fetches by slug; renders hero (coverImage + title + companyLogo) + sidebar metrics (3 metric pairs) + `<CustomerStoryBody />` with rich content.

- [ ] **Step 1: Read source**

```bash
cat /Users/fung/dev/authgear-web/frontend/app/[locale]/customer-stories/[slug]/page.tsx
```

- [ ] **Step 2: Write en route**

Create `/Users/fung/dev/authgear-web/frontend-astro/src/pages/customer-stories/[slug].astro`. Template:

```astro
---
export const prerender = false;

import BaseLayout from '@/layouts/BaseLayout.astro';
import { t } from '@/i18n';
import { pathLocaleToStrapiLocale } from '@/lib/i18n';
import { getCustomerStoryBySlug, strapiImageUrl } from '@/lib/strapi';
import CustomerStoryBody from '@/components/customer-story/CustomerStoryBody';

const locale = 'en';
const { slug } = Astro.params as { slug: string };
const strapiLocale = pathLocaleToStrapiLocale(locale);

const story = await getCustomerStoryBySlug(slug, strapiLocale);
if (!story) {
  return Astro.redirect('/404');
}

const {
  title,
  excerpt,
  content,
  companyLogo,
  coverImage,
  companyIndustry,
  loginMethodsTech,
  metric1_num,
  metric1_Text,
  metric2_num,
  metric2_Text,
  metric3_num,
  metric3_Text,
} = story.attributes;

const logoUrl = strapiImageUrl(companyLogo);
const coverUrl = strapiImageUrl(coverImage);

const labels = {
  industry: t(locale, 'CustomerStories.industry'),
  loginMethods: t(locale, 'CustomerStories.loginMethods'),
  technicalDetails: t(locale, 'CustomerStories.technicalDetails'),
  noContent: t(locale, 'CustomerStories.noContentYet'),
  metricsAriaLabel: t(locale, 'CustomerStories.metricsAriaLabel'),
};

Astro.response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
---

<BaseLayout locale={locale} title={title} description={excerpt ?? ''}>
  {/* Port the detail layout from the Next source:
       - Hero section with coverImage, title, companyLogo
       - Sidebar with 3 metrics (only rendered if metricX_num or metricX_Text is non-empty)
       - Main content via <CustomerStoryBody content={content} companyLogoUrl={logoUrl} companyLogoAlt={title} companyIndustry={companyIndustry} loginMethodsTech={loginMethodsTech} metric1_num={metric1_num} metric1_Text={metric1_Text} metric2_num={metric2_num} metric2_Text={metric2_Text} metric3_num={metric3_num} metric3_Text={metric3_Text} labels={labels} />
       - Preserve all Webflow classes; drop next/image, next/link per standard rules
  */}
</BaseLayout>
```

Port the full body from the Next source. Verify the `labels` object field names match `CustomerStoryBody`'s `CustomerStoryBodyLabels` type (check Task 2 output: `industry`, `loginMethods`, `technicalDetails`, `noContent`, `metricsAriaLabel`).

If any `CustomerStories.*` translation key is missing from `src/i18n/en.json` or `zh-TW.json`, add them (do NOT touch `frontend/messages/*.json`).

- [ ] **Step 3: Write zh-TW route**

Same but `const locale = 'zh-TW';`.

- [ ] **Step 4: Build + commit**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npm run build 2>&1 | tail -10
git -C /Users/fung/dev/authgear-web add frontend-astro/src/pages/customer-stories/\[slug\].astro frontend-astro/src/pages/zh-TW/customer-stories/\[slug\].astro frontend-astro/src/i18n/
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port /customer-stories/[slug] detail page (SSR)"
```

---

## Task 5: Playwright smoke tests

**Files:**
- Create: `frontend-astro/tests/phase3-2-customer-stories.spec.ts`

- [ ] **Step 1: Write tests**

Create `/Users/fung/dev/authgear-web/frontend-astro/tests/phase3-2-customer-stories.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

test.describe('Phase 3-2: /customer-stories', () => {
  test('/customer-stories listing returns 200 with lang=en', async ({ page }) => {
    const resp = await page.goto('/customer-stories');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('footer').first()).toBeVisible();
  });

  test('/zh-TW/customer-stories returns 200 with lang=zh-TW', async ({ page }) => {
    const resp = await page.goto('/zh-TW/customer-stories');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-TW');
  });

  test('/customer-stories sets SSR cache headers', async ({ request }) => {
    const resp = await request.get('/customer-stories');
    expect(resp.status()).toBe(200);
    const cc = resp.headers()['cache-control'] ?? '';
    expect(cc).toContain('s-maxage=60');
  });
});
```

- [ ] **Step 2: Run + regression**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx playwright test tests/phase3-2-customer-stories.spec.ts --reporter=line 2>&1 | tail -10
cd /Users/fung/dev/authgear-web/frontend-astro && npx playwright test --reporter=line 2>&1 | tail -5
```

Expected: 3 new pass. Full suite reports total.

- [ ] **Step 3: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/tests/phase3-2-customer-stories.spec.ts
git -C /Users/fung/dev/authgear-web commit -m "test(astro): smoke tests for /customer-stories"
```

---

## Task 6: Docs update

- [ ] **Step 1: README**

In `/Users/fung/dev/authgear-web/frontend-astro/README.md`, change `- [ ] Phase 3-2 — Customer stories (listing + detail)` to `- [x]`.

- [ ] **Step 2: ARCHITECTURE status**

In `/Users/fung/dev/authgear-web/docs/ARCHITECTURE-ASTRO.md`, replace the `**Migration status` line with:

```markdown
**Migration status (2026-04-22):** Phase 2 complete + Phases 3-1 + 3-2 shipped on branch `migration/nextjs-to-astro`. Blog + customer stories CMS-backed routes live in both locales with SSR + cache headers. Phase 3-3 (login gallery + what's new) plan pending.
```

- [ ] **Step 3: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/README.md docs/ARCHITECTURE-ASTRO.md
git -C /Users/fung/dev/authgear-web commit -m "docs(astro): Phase 3-2 complete — customer stories shipped"
```
