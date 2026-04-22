# Astro Migration — Phase 3-1: Blog

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the blog listing and detail pages from Next.js to Astro. First CMS-backed content type — establishes the SSR + API endpoint + Strapi cache-headers pattern that other CMS subtypes (customer stories, login gallery, what's new) will reuse.

**Architecture:** Blog content is Strapi-backed, so listing + detail pages switch from `prerender = true` (Phase 2 pattern) to `prerender = false` — SSR with `Cache-Control: public, s-maxage=60, stale-while-revalidate=300` response headers (per `ARCHITECTURE-ASTRO.md`). The listing page fetches the first page of posts server-side, then a React island (`BlogPostInfiniteGrid`) loads more via a new `/api/blog-posts` Astro endpoint. The Strapi client (`src/lib/strapi.ts`) was already ported in Phase 1 — this phase just uses it.

**Tech Stack:** Astro 5 SSR (no prerender), React 19 islands for infinite scroll, `@strapi/blocks-react-renderer` for rich-text bodies (already in Phase 1 scope but not imported yet).

**References:**
- `docs/ARCHITECTURE-ASTRO.md` — SSR + cache-headers model
- `docs/superpowers/plans/2026-04-21-astro-migration-foundation.md` — Strapi client already in place
- `docs/superpowers/plans/2026-04-22-astro-phase2d2-tools.md` — full-page React island pattern (for infinite grid)

**What this phase does NOT do:** customer stories (Phase 3-2), login gallery, what's new (Phase 3-3).

**Exit criteria:**

1. `npm run build` — succeeds; `/blog` and `/blog/[slug]` routes do NOT prerender (they're SSR, which is fine)
2. `npm run test:unit` — 5 passed (unchanged)
3. `npm test` — at least 137 passed (134 existing + 3 new: `/blog` returns 200, `/api/blog-posts` returns valid JSON, infinite grid island hydrates)
4. Manual: `/blog` lists posts from Strapi; clicking "Load more" fetches more via `/api/blog-posts`; individual post detail renders markdown + metadata

---

## File structure (new)

```
frontend-astro/
├── src/
│   ├── pages/
│   │   ├── api/
│   │   │   └── blog-posts.ts                        # paginated fetch endpoint
│   │   ├── blog/
│   │   │   ├── index.astro                          # /blog — SSR listing
│   │   │   └── [slug].astro                         # /blog/[slug] — SSR detail
│   │   └── zh-TW/
│   │       └── blog/
│   │           ├── index.astro
│   │           └── [slug].astro
│   ├── components/
│   │   ├── islands/
│   │   │   └── blog/
│   │   │       └── BlogPostInfiniteGrid.tsx         # island for infinite scroll
│   │   └── blog/
│   │       └── BlogPostCard.tsx                     # React card (SSR + used by island)
│   └── lib/
│       └── strapi.ts                                # already ported (Phase 1)
└── tests/
    └── phase3-1-blog.spec.ts
```

---

## Task 1: Port `BlogPostCard` component

**Files:**
- Create: `frontend-astro/src/components/blog/BlogPostCard.tsx`

Source: `frontend/components/blog/BlogPostCard.tsx` (65 LOC). Uses `next/image` and `next/link`.

- [ ] **Step 1: Copy and adapt**

```bash
mkdir -p /Users/fung/dev/authgear-web/frontend-astro/src/components/blog
cp /Users/fung/dev/authgear-web/frontend/components/blog/BlogPostCard.tsx \
   /Users/fung/dev/authgear-web/frontend-astro/src/components/blog/BlogPostCard.tsx
```

- [ ] **Step 2: Adapt**

Edit the destination file:

1. Delete `'use client';` (line 1 if present)
2. Remove `import Image from 'next/image';` — replace `<Image src={x} width={w} height={h} alt={a} />` with plain `<img src={x} width={w} height={h} alt={a} loading="lazy" />`
3. Remove `import Link from 'next/link';` — replace `<Link href={x}>…</Link>` with `<a href={x}>…</a>`

- [ ] **Step 3: Typecheck**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/blog/BlogPostCard.tsx
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port BlogPostCard component"
```

---

## Task 2: Port `BlogPostInfiniteGrid` as React island

**Files:**
- Create: `frontend-astro/src/components/islands/blog/BlogPostInfiniteGrid.tsx`

Source: `frontend/components/blog/BlogPostInfiniteGrid.tsx` (78 LOC). Client component using `useState`/`useEffect`/`useTranslations('Blog')`.

- [ ] **Step 1: Copy**

```bash
mkdir -p /Users/fung/dev/authgear-web/frontend-astro/src/components/islands/blog
cp /Users/fung/dev/authgear-web/frontend/components/blog/BlogPostInfiniteGrid.tsx \
   /Users/fung/dev/authgear-web/frontend-astro/src/components/islands/blog/BlogPostInfiniteGrid.tsx
```

- [ ] **Step 2: Adapt**

Edit the destination file:

1. Delete `'use client';` (line 1)
2. Remove `import { useTranslations } from 'next-intl';`
3. Add `import { t as tFn } from '@/i18n';`
4. Add a `locale: string` field to the existing Props interface (it currently takes the initial posts, hasMore, etc. — add `locale` alongside)
5. Inside the component, find `const t = useTranslations('Blog');` and replace with:
   ```ts
   const t = (key: string): string => tFn(locale, `Blog.${key}`);
   ```
6. Update the imported `BlogPostCard` path if it was `@/components/blog/BlogPostCard` — it remains the same since Task 1 keeps it there.

- [ ] **Step 3: Typecheck**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/components/islands/blog/BlogPostInfiniteGrid.tsx
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port BlogPostInfiniteGrid as React island"
```

Report: commit SHA, new Props shape (list of fields), count of `t('...')` call sites adapted.

---

## Task 3: Port `/api/blog-posts` endpoint

**Files:**
- Create: `frontend-astro/src/pages/api/blog-posts.ts`
- Create: `frontend-astro/tests/blog-api.spec.ts`

Source: `frontend/app/api/blog-posts/route.ts` — Next.js API route for paginated blog fetches.

- [ ] **Step 1: Write failing API tests first (TDD red)**

Create `/Users/fung/dev/authgear-web/frontend-astro/tests/blog-api.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

test.describe('/api/blog-posts', () => {
  test('GET with no params returns first page of en posts', async ({ request }) => {
    const resp = await request.get('/api/blog-posts');
    expect(resp.status()).toBe(200);
    const json = await resp.json();
    expect(Array.isArray(json.posts)).toBe(true);
    expect(typeof json.hasMore).toBe('boolean');
  });

  test('GET with locale=zh-TW returns zh-TW posts', async ({ request }) => {
    const resp = await request.get('/api/blog-posts?locale=zh-TW');
    expect(resp.status()).toBe(200);
    const json = await resp.json();
    expect(Array.isArray(json.posts)).toBe(true);
  });

  test('GET with invalid offset returns 400', async ({ request }) => {
    const resp = await request.get('/api/blog-posts?offset=-1');
    expect(resp.status()).toBe(400);
  });

  test('GET with non-page-aligned offset returns 400', async ({ request }) => {
    // offset must be multiple of BLOG_LIST_PAGE_SIZE (likely 9 or 12 — check strapi.ts)
    const resp = await request.get('/api/blog-posts?offset=3');
    expect(resp.status()).toBe(400);
  });
});
```

- [ ] **Step 2: Run tests — expect failures (no endpoint yet)**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx playwright test tests/blog-api.spec.ts --reporter=line 2>&1 | tail -10
```

Expected: 4 failures (likely all 404).

- [ ] **Step 3: Implement the endpoint**

Create `/Users/fung/dev/authgear-web/frontend-astro/src/pages/api/blog-posts.ts`:

```ts
import type { APIRoute } from 'astro';
import { pathLocaleToStrapiLocale } from '@/lib/i18n';
import { BLOG_LIST_PAGE_SIZE, getBlogPostsSlice } from '@/lib/strapi';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const pathLocale = url.searchParams.get('locale') ?? 'en';
  const offsetRaw = url.searchParams.get('offset');
  const offset = offsetRaw === null ? 0 : parseInt(offsetRaw, 10);

  if (!Number.isFinite(offset) || offset < 0) {
    return new Response(JSON.stringify({ error: 'Invalid offset' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (offset > 0 && offset % BLOG_LIST_PAGE_SIZE !== 0) {
    return new Response(
      JSON.stringify({ error: 'Offset must be a multiple of page size' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const strapiLocale = pathLocaleToStrapiLocale(pathLocale);
  const { data, hasMore } = await getBlogPostsSlice(strapiLocale, offset, BLOG_LIST_PAGE_SIZE);

  return new Response(JSON.stringify({ posts: data, hasMore }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
};
```

- [ ] **Step 4: Run tests — expect pass (TDD green)**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx playwright test tests/blog-api.spec.ts --reporter=line 2>&1 | tail -10
```

Expected: 4 passed.

**If Strapi is unreachable** during test (and posts come back empty instead of erroring), that's fine — the test only checks the response shape, not content. The Phase 1 `strapi.ts` falls back to empty data when Strapi errors.

**If all tests fail with 404**, the endpoint file path is wrong. Verify `src/pages/api/blog-posts.ts` is present.

- [ ] **Step 5: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/pages/api/blog-posts.ts frontend-astro/tests/blog-api.spec.ts
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): implement /api/blog-posts endpoint + tests"
```

Report: commit SHA, test result.

---

## Task 4: Port `/blog` listing page

**Files:**
- Create: `frontend-astro/src/pages/blog/index.astro`
- Create: `frontend-astro/src/pages/zh-TW/blog/index.astro`

Source: `frontend/app/[locale]/blog/page.tsx` (71 LOC).

- [ ] **Step 1: Read the source**

```bash
cat /Users/fung/dev/authgear-web/frontend/app/[locale]/blog/page.tsx
```

- [ ] **Step 2: Write the en listing page**

Create `/Users/fung/dev/authgear-web/frontend-astro/src/pages/blog/index.astro`. This is an SSR page (no prerender). Build structure:

```astro
---
// SSR — content comes from Strapi
export const prerender = false;

import BaseLayout from '@/layouts/BaseLayout.astro';
import { t } from '@/i18n';
import { localizedPath, pathLocaleToStrapiLocale } from '@/lib/i18n';
import { BLOG_LIST_PAGE_SIZE, getBlogCategories, getBlogPostsSlice } from '@/lib/strapi';
import BlogPostInfiniteGrid from '@/components/islands/blog/BlogPostInfiniteGrid';

const locale = 'en';
const strapiLocale = pathLocaleToStrapiLocale(locale);

const [postsSlice, catsRes] = await Promise.all([
  getBlogPostsSlice(strapiLocale, 0, BLOG_LIST_PAGE_SIZE),
  getBlogCategories({ locale: strapiLocale }),
]);
const { data: initialPosts, hasMore } = postsSlice;
const categories = catsRes.data ?? [];

const title = 'Blog - Resource Center';
const description = 'Stay updated with the latest best practices, product updates, and expert tips on building secure, seamless user experiences with Authgear.';

Astro.response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
---

<BaseLayout locale={locale} title={title} description={description}>
  <!-- Port the page body from Next source. Keys pattern: every t('foo') → {t(locale, 'Blog.foo')}. Every <Link href=…>…</Link> → <a href=…>…</a>. The BlogPostInfiniteGrid sits at the bottom, mounted as client:visible -->
  <!-- ... full body port ... -->
  <BlogPostInfiniteGrid
    client:visible
    locale={locale}
    initialPosts={initialPosts}
    initialHasMore={hasMore}
  />
</BaseLayout>
```

Port the full body of `frontend/app/[locale]/blog/page.tsx` — this includes hero section, category pills (rendered server-side from `categories`), and mounting the infinite grid island at the bottom. Preserve Webflow classes.

**Note on props passed to BlogPostInfiniteGrid**: look at the component's actual Props interface after Task 2 to know the exact prop names. If it uses `initialPosts` / `initialHasMore` / `categories` etc., pass those.

- [ ] **Step 3: Write the zh-TW listing page**

Create `/Users/fung/dev/authgear-web/frontend-astro/src/pages/zh-TW/blog/index.astro` — identical to en except `const locale = 'en';` → `const locale = 'zh-TW';`.

- [ ] **Step 4: Build**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npm run build 2>&1 | tail -10
```

Expected: build succeeds. `/blog` is SSR (not prerendered), so it won't appear in the prerendered-pages list — that's correct.

- [ ] **Step 5: Manual smoke**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && PORT=4321 npm run build && PORT=4321 npm start &
sleep 5
curl -sI http://localhost:4321/blog | head -5
pkill -f 'dist/server/entry.mjs' 2>/dev/null || true
```

Expected: HTTP 200, `Content-Type: text/html`, `Cache-Control` header with `s-maxage=60`.

- [ ] **Step 6: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/pages/blog/ frontend-astro/src/pages/zh-TW/blog/
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port /blog listing page (SSR)"
```

Report: commit SHA, LOC of output .astro file. Whether Strapi fetch happened successfully (check server logs if tests complain).

---

## Task 5: Port `/blog/[slug]` detail page

**Files:**
- Create: `frontend-astro/src/pages/blog/[slug].astro`
- Create: `frontend-astro/src/pages/zh-TW/blog/[slug].astro`

Source: `frontend/app/[locale]/blog/[slug]/page.tsx` (189 LOC). Renders Strapi rich-text body via `@strapi/blocks-react-renderer`.

- [ ] **Step 1: Install strapi blocks renderer if missing**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && grep -q '"@strapi/blocks-react-renderer"' package.json || npm install @strapi/blocks-react-renderer
```

(Phase 1 dropped this package to defer. Phase 3 brings it back.)

- [ ] **Step 2: Read the Next source**

```bash
cat /Users/fung/dev/authgear-web/frontend/app/[locale]/blog/[slug]/page.tsx
```

- [ ] **Step 3: Write en detail route**

Create `/Users/fung/dev/authgear-web/frontend-astro/src/pages/blog/[slug].astro`. Structure:

```astro
---
export const prerender = false;

import BaseLayout from '@/layouts/BaseLayout.astro';
import { t } from '@/i18n';
import { localizedPath, pathLocaleToStrapiLocale } from '@/lib/i18n';
import {
  blogPostDisplayPublishedAt,
  getBlogPostBySlug,
  getBlogPosts,
  strapiImageUrl,
} from '@/lib/strapi';

const locale = 'en';
const { slug } = Astro.params as { slug: string };
const strapiLocale = pathLocaleToStrapiLocale(locale);

const post = await getBlogPostBySlug(slug, strapiLocale);
if (!post) {
  return Astro.redirect('/404');
}

const { title, excerpt, body, thumbnail, category, author } = post.attributes;
const imgUrl = strapiImageUrl(thumbnail);
const catName = category?.data?.attributes?.name ?? '';
const catSlug = category?.data?.attributes?.slug ?? '';
const authorName = author?.data?.attributes?.name ?? '';
const authorRole = author?.data?.attributes?.role ?? '';
const authorImg = strapiImageUrl(author?.data?.attributes?.photo ?? null);
const displayDate = blogPostDisplayPublishedAt(post.attributes);
const date = displayDate
  ? new Date(displayDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  : '';

const latestRes = await getBlogPosts({ pagination: { pageSize: 3 }, locale: strapiLocale });
const latestPosts = (latestRes.data ?? []).filter((p) => p.attributes.slug !== slug);

Astro.response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
---

<BaseLayout locale={locale} title={title} description={excerpt ?? ''}>
  <!-- Port the body from the Next source. Rich-text body uses <BlocksRenderer content={body} /> from @strapi/blocks-react-renderer.
       For the renderer, import it at top and use as a React component in the Astro template.
       <Link> → <a>. <Image src width height alt> → <img loading="lazy">.
       Keep Webflow classes exactly. -->
</BaseLayout>
```

Port the full rendering tree — hero with thumbnail, category pill, title, author byline + date, rich-text body, "latest posts" sidebar, and any other sections from the Next source. For rich-text rendering, import `BlocksRenderer`:

```astro
---
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
---
<BlocksRenderer content={body} />
```

This works in Astro — `BlocksRenderer` is a React component, renders server-side during SSR.

- [ ] **Step 4: Write zh-TW detail route**

Same but `const locale = 'zh-TW';`.

- [ ] **Step 5: Build**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npm run build 2>&1 | tail -10
```

Expected: build succeeds. Detail routes are SSR (not prerendered).

- [ ] **Step 6: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/src/pages/blog/\[slug\].astro frontend-astro/src/pages/zh-TW/blog/\[slug\].astro frontend-astro/package.json frontend-astro/package-lock.json
git -C /Users/fung/dev/authgear-web commit -m "feat(astro): port /blog/[slug] detail page (SSR + Strapi blocks)"
```

---

## Task 6: Playwright smoke tests for blog routes

**Files:**
- Create: `frontend-astro/tests/phase3-1-blog.spec.ts`

- [ ] **Step 1: Write the tests**

Create `/Users/fung/dev/authgear-web/frontend-astro/tests/phase3-1-blog.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

test.describe('Phase 3-1: /blog', () => {
  test('/blog listing returns 200 with lang=en', async ({ page }) => {
    const resp = await page.goto('/blog');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('footer').first()).toBeVisible();
  });

  test('/zh-TW/blog listing returns 200 with lang=zh-TW', async ({ page }) => {
    const resp = await page.goto('/zh-TW/blog');
    expect(resp?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-TW');
  });

  test('/blog sets SSR cache headers', async ({ request }) => {
    const resp = await request.get('/blog');
    expect(resp.status()).toBe(200);
    const cc = resp.headers()['cache-control'] ?? '';
    expect(cc).toContain('s-maxage=60');
    expect(cc).toContain('stale-while-revalidate');
  });
});
```

- [ ] **Step 2: Run — expect pass**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx playwright test tests/phase3-1-blog.spec.ts --reporter=line 2>&1 | tail -10
```

Expected: 3 passed.

**If a test fails** — especially the status check: Strapi may be unreachable or returning errors. Check server output: `npm start 2>&1 | tail -20`. If Strapi is not configured in this environment, posts may come back empty but pages should still render with `noPostsYet` message (per the Next source handling).

- [ ] **Step 3: Full suite regression**

```bash
cd /Users/fung/dev/authgear-web/frontend-astro && npx playwright test --reporter=line 2>&1 | tail -10
```

Expected: 134 existing + 4 (new blog + existing api tests) + 3 new = 141 passed. Actual count may differ if api tests were bundled differently; report what you see.

- [ ] **Step 4: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/tests/phase3-1-blog.spec.ts
git -C /Users/fung/dev/authgear-web commit -m "test(astro): smoke tests for /blog routes + cache headers"
```

---

## Task 7: Docs update

**Files:**
- Modify: `frontend-astro/README.md`
- Modify: `docs/ARCHITECTURE-ASTRO.md`

- [ ] **Step 1: Update README**

In `/Users/fung/dev/authgear-web/frontend-astro/README.md`, find `- [ ] Phase 3 — CMS-backed pages (blog, customer stories, etc.)` and replace with:

```markdown
- [x] Phase 3-1 — Blog (listing + detail + /api/blog-posts)
- [ ] Phase 3-2 — Customer stories (listing + detail)
- [ ] Phase 3-3 — Login gallery + What's new
```

- [ ] **Step 2: Update ARCHITECTURE status marker**

In `/Users/fung/dev/authgear-web/docs/ARCHITECTURE-ASTRO.md`, replace the `**Migration status` line with:

```markdown
**Migration status (2026-04-22):** Phase 2 complete + Phase 3-1 shipped on branch `migration/nextjs-to-astro`. All static marketing pages + blog listing + blog detail + `/api/blog-posts` endpoint live in both locales. SSR with `Cache-Control: s-maxage=60, stale-while-revalidate=300` for CMS routes. Phase 3-2 (customer stories) plan pending.
```

- [ ] **Step 3: Commit**

```bash
git -C /Users/fung/dev/authgear-web add frontend-astro/README.md docs/ARCHITECTURE-ASTRO.md
git -C /Users/fung/dev/authgear-web commit -m "docs(astro): Phase 3-1 complete — blog shipped"
```

---

## Phase 3-1 complete

Verification gate before Phase 3-2:

1. `npm run build` — succeeds; SSR routes include `/blog`, `/blog/[slug]`, `/api/blog-posts`
2. `npm test` — full suite passes
3. Manual: `PORT=4321 npm start`, visit `/blog`. List of posts renders from Strapi; "Load more" fetches and appends. Click a post slug → detail page renders with title/body/author.
4. Verify cache header: `curl -sI http://localhost:4321/blog | grep -i cache-control`

---

## Phase 3-2 / 3-3 outline

### Phase 3-2: Customer stories (~260 LOC across route + body component)
- `/customer-stories` + `/customer-stories/[slug]` (SSR)
- `CustomerStoryBody` server component port
- Uses same Strapi client

### Phase 3-3: Login gallery + What's new
- `/login-gallery` + `/login-gallery/[slug]` — has interactive `LoginGalleryCarousel` (island) + `LoginGalleryIndexPage` + `StrapiBlocksContent` (rich text)
- `/whats-new` + `/whats-new/[slug]` — simpler pages
- Bundle both since neither alone is big
