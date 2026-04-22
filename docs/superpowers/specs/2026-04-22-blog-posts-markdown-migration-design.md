# Blog Posts — Migrate Strapi → Markdown (Astro Content Collection)

**Date:** 2026-04-22
**Scope:** `frontend-astro/` — move the `/blog` route (151 posts × 2 locales) off Strapi into local markdown backed by Astro Content Collections. Pulls live data from the Webflow CMS (source of truth). Same pattern as the customer-stories / login-gallery / whats-new migrations shipped in PRs #13–#16.

## Goals

1. **Preserve dates** — both `publishedAt` (first publish) and `updatedAt` (last edit). Manual `publishedAtOverride` is preserved as an optional authoring escape hatch.
2. **Preserve SEO** — migration carries over `metaTitle`, `metaDescription`, `canonicalUrl`, and OG/Twitter image. Adds proper **Article JSON-LD** and **FAQPage JSON-LD** emission (neither was present on the Strapi detail page).
3. **Preserve categories** — posts keep their category reference; `/blog/category/{slug}` static filter pages are generated for each non-draft category.
4. **Document a canonical authoring structure** so future blog posts can be written (or generated) consistently without re-reading the code.

## Non-goals

- Not migrating authors into a separate collection (yet). Author fields inline in each post.
- Not migrating drafts or archived posts — skipped by the script, but the authoring template supports a `draft: true` flag for local drafts.
- Not changing the URL shape (`/blog/{slug}`, `/blog/category/{slug}`) — preserved for SEO continuity.

## Source of truth

**Webflow CMS collection** `60658b47b03f0c9653c1487b` (Blog Posts):

| Webflow field            | Type        | Mapped to              |
| ------------------------ | ----------- | ---------------------- |
| `name`                   | PlainText   | `title` (also doc title) |
| `h1`                     | PlainText   | `h1` (displayed in the page heading; often equals `title`) |
| `slug`                   | PlainText   | folder name (slug) |
| `blog-post-excerpt`      | PlainText   | `excerpt` |
| `blog-post-content`      | RichText    | markdown body |
| `blog-post-main-image`   | Image       | `coverImage` (also OG image) |
| `blog-post-featured`     | Switch      | `featured` |
| `blog-post-read-time`    | Number      | `readTime` (minutes) |
| `blog-post-category`     | Reference   | `category` (slug string) |
| `blog-post-author`       | Reference   | `author.{name, role, photo}` (flattened, resolved from Team Members collection) |
| `canonical-tag`          | Link        | `canonicalUrl` |
| `meta-title`             | PlainText   | `metaTitle` |
| `meta-description`       | PlainText   | `metaDescription` |
| *(item metadata)* `lastPublished` | timestamp | `publishedAt` |
| *(item metadata)* `lastUpdated`   | timestamp | `updatedAt` |
| *(item metadata)* `isDraft`       | bool      | `draft` |

Dates: `publishedAt` comes from Webflow's `lastPublished`, `updatedAt` from `lastUpdated`. If a future author needs to override the display-publish date (backdating a post), they set `publishedAtOverride` in frontmatter — the ordering helper prefers `publishedAtOverride ?? publishedAt`.

Category collection (`60658b47b03f0c943dc1487a`): 10 categories total, 5 non-draft (`industry`, `integrations`, `engineering`, `highlight`, `case-studies`). A separate `blog-categories` content collection holds name + slug + optional description.

## Content model

### Collection: `blog-posts`

`src/content/config.ts`:

```ts
const blogPosts = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      h1: z.string().optional(),                     // defaults to title if absent
      excerpt: z.string(),
      coverImage: image(),
      category: z.string().optional(),               // category slug
      author: z.object({
        name: z.string(),
        role: z.string().optional(),
        photo: image().optional(),
      }).optional(),
      featured: z.boolean().default(false),
      readTime: z.number().int().positive().optional(),
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      canonicalUrl: z.string().url().optional(),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),         // falls back to publishedAt
      publishedAtOverride: z.coerce.date().optional(),
      draft: z.boolean().default(false),
      faq: z.array(z.object({
        q: z.string(),
        a: z.string(),                               // plain text or small HTML
      })).optional(),
    }),
});
```

### Collection: `blog-categories`

```ts
const blogCategories = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string().optional(),
  }),
});
```

Stored as `src/content/blog-categories/{slug}.json` — one file per category. Data collection (JSON), not markdown.

### Directory layout

```
src/content/
  blog-categories/
    engineering.json
    highlight.json
    case-studies.json
    industry.json
    integrations.json
  blog-posts/
    en/
      supabase-vs-authgear-nextjs/
        index.md
        cover.webp
        figure-1.png
        figure-2.png
      nextjs-session-management/
        index.md
        cover.webp
        figure-1.webp
      …
    zh-TW/
      … (mirror of en where translated; missing entries fall back to en)
```

Authors' photos live alongside the post that references them (e.g. `./author.webp`) to keep posts self-contained. When the team_members collection migration happens later, author data can be normalized into a separate collection without breaking posts.

## Migration script

`scripts/webflow-to-markdown-blog-posts.mjs`.

Inputs: bundled MCP export with five labels (`schema`, `en-items`, `zh-items`, `categories`, `authors`).

Per post:

1. Compute `outDir = src/content/blog-posts/{locale}/{slug}/`.
2. Download `blog-post-main-image` to `./cover.<ext>`.
3. Walk `blog-post-content` HTML:
   - Unpack `<figure>…<img src>…</figure>` blocks → download each image to `./figure-N.<ext>` and replace with `![alt](./figure-N.ext)`.
   - Unpack Webflow-wrapped `<div data-rt-embed-type='true'>…<table>…</table></div>` → keep the raw HTML inline (markdown allows inline HTML, and the `.ag-table-wrap` styles already exist in the design system).
   - Unpack `<div data-rt-embed-type='true'>…<pre><code class="language-X">…</code></pre></div>` → fenced code block with language hint.
   - Convert `<h2>`…`<h6>` / `<p>` / `<ul>` / `<ol>` / `<blockquote>` / inline `<strong>` / `<em>` / `<a>` / `<code>` using the converter already shared with whats-new (extended for code-block extraction and raw-HTML passthrough).
4. Detect the FAQ section: find the last `<h2>` whose text matches `/^Frequently Asked Questions$/i` and collect subsequent `<h3>` + `<p>` pairs into `faq: [{q, a}]` in frontmatter. The FAQ also remains in the markdown body (so on-page readers see it); JSON-LD is emitted from the frontmatter.
5. Resolve `blog-post-category` reference id → category slug via the categories export.
6. Resolve `blog-post-author` reference id → author name/role/photo via the team_members export; download photo to `./author.<ext>`.
7. Write `index.md` with frontmatter + body.

Idempotent: re-runs overwrite. Stale slugs on disk flagged to console but not deleted (authors may have local drafts the script can't know about).

## Page wiring

### Routes

| Route | File | Behavior |
| --- | --- | --- |
| `/blog` | `src/pages/blog/index.astro` | Prerendered index, paginated. |
| `/blog/[...page]` | `src/pages/blog/[...page].astro` | Astro `paginate()` — 24 posts per page. |
| `/blog/{slug}` | `src/pages/blog/[slug].astro` | Prerendered post detail. |
| `/blog/category/{slug}` | `src/pages/blog/category/[slug].astro` | Prerendered category filter. |
| `/blog/category/{slug}/[...page]` | `src/pages/blog/category/[slug]/[...page].astro` | Paginated category pages. |
| `/zh-TW/blog*` | mirror in `src/pages/zh-TW/blog/…` | zh-TW entries prefer zh-TW folder, fall back to en per slug. |

Flip SSR → prerender. Drop `BlogPostInfiniteGrid` React island; replace with static grid + prev/next page controls.

### Sorting

Posts sorted by `publishedAtOverride ?? publishedAt`, desc. Helper in `src/lib/blog.ts` mirrors the existing `blogPostDisplayPublishedAt` but reads from `CollectionEntry<'blog-posts'>`.

### SEO emission (per detail page)

New reusable component `src/components/blog/BlogPostSeo.astro` emits, in the layout `<head>` slot:

- `<title>` — `metaTitle ?? title`
- `<meta name="description">` — `metaDescription ?? excerpt`
- `<link rel="canonical">` — `canonicalUrl ?? new URL(path, Astro.site)`
- OG: `og:type=article`, `og:title`, `og:description`, `og:image` (from `coverImage`), `og:url`, `og:site_name`, `article:published_time`, `article:modified_time`, `article:author`, `article:section` (category name), `article:tag` (ditto).
- Twitter: `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`.
- **JSON-LD `Article`**: headline, datePublished (= `publishedAtOverride ?? publishedAt`), dateModified (= `updatedAt ?? publishedAt`), author object (`{@type: 'Person', name, image}`), publisher (`{@type: 'Organization', name: 'Authgear', logo}`), image (array with OG image), mainEntityOfPage.
- **JSON-LD `FAQPage`** (conditional on `faq.length > 0`): `mainEntity` array of `{@type: 'Question', name: q, acceptedAnswer: {@type: 'Answer', text: a}}`.

BaseLayout gains a `<slot name="head">` so per-page JSON-LD + meta can be injected without double-rendering the default tags. Non-blog pages ignore the slot.

### Detail page structure

`src/pages/blog/[slug].astro`:

```astro
<BaseLayout ...>
  <BlogPostSeo entry={entry} slot="head" />
  <article class="blog-post">
    <header>
      <a href="/blog/category/{category.slug}">{category.name}</a>
      <h1>{data.h1 ?? data.title}</h1>
      <p class="blog-post__meta">
        <time>{publishedAt}</time>
        {readTime && <span>{readTime} min read</span>}
      </p>
      {author && <AuthorByline {...author} />}
      <Image src={coverImage} .../>
    </header>
    <div class="blog-post__body ds-richtext-prose">
      <Content />
    </div>
    {faq && <FaqSection items={faq} />}
  </article>
</BaseLayout>
```

Design tokens reuse `ds-richtext-prose` (already styled for long-form content). Add small scoped `.blog-post__*` styles for header spacing, author byline, and FAQ section visuals.

### Index + category pages

- Hero banner (`ds-hero-banner--gradient`) with page title + subtitle.
- Category chip row (links to each category page + an "All" chip that returns to `/blog`).
- Grid of post cards: thumbnail + category eyebrow + title + excerpt + author name + date + read-time.
- Pagination: previous/next links at the bottom (Astro `paginate()` provides `page.url.prev`/`page.url.next`).

## Authoring a new blog post (documentation)

Committed alongside the spec: `frontend-astro/src/content/blog-posts/README.md` documenting the expected structure for humans and agents:

```markdown
# Authoring a Blog Post

1. Create a folder `src/content/blog-posts/en/{slug}/` where `{slug}`
   is the URL slug (lowercase, hyphen-separated).

2. Add the cover image as `./cover.webp` (or `.jpg` / `.png`).

3. Add any inline images as `./figure-1.webp`, `./figure-2.webp`, etc.

4. Create `index.md` with this frontmatter:

   ---
   title: "Post Title (≤70 chars, also used as default meta-title)"
   h1: "On-page H1 (optional; defaults to title)"
   excerpt: "One-paragraph preview (≤200 chars)."
   coverImage: ./cover.webp
   category: engineering      # must match a slug in blog-categories/
   author:
     name: "Louis Chan"
     role: "Developer Advocate"
     photo: ./author.webp     # optional; 96x96 recommended
   featured: false
   readTime: 8
   metaTitle: "SEO title (≤60 chars, optional — falls back to title)"
   metaDescription: "SEO description (≤160 chars, optional)"
   canonicalUrl: "https://www.authgear.com/blog/{slug}"  # optional
   publishedAt: 2026-04-22
   updatedAt: 2026-04-22       # optional; omit if same as publishedAt
   publishedAtOverride:        # optional; use for backdated posts
   draft: false
   faq:                        # optional; emitted as FAQPage JSON-LD
     - q: "Is Authgear open source?"
       a: "Yes — source on GitHub under the Apache 2.0 license."
   ---

   Body markdown starts here. Headings start at ## (h1 is the title).

5. Body conventions:
   - Start headings at `##`. Don't use `#` — that's reserved for the page title.
   - Fenced code with language hints, e.g. ```` ```typescript ````.
   - Inline images: `![alt](./figure-1.webp)`. Use Markdown syntax; Astro optimizes automatically.
   - Tables may be written as Markdown tables or raw HTML inside
     `<div class="ag-table-wrap"><table class="ag-table">…</table></div>`
     (the design system already styles this container).
   - FAQ section (optional): put at the end under `## Frequently Asked Questions`
     with each question as `### Question?` and the answer as paragraphs underneath.
     If `faq:` is set in frontmatter, it drives the FAQPage JSON-LD — otherwise the
     prose remains the source of truth.

6. `npm run dev` to preview. The post will appear on `/blog`, on its
   category's `/blog/category/{slug}`, and at `/blog/{slug}` after
   the next `npm run build` (routes are prerendered).
```

## Testing

- `npm run build` passes; 151 en post pages prerender + category filter pages + paginated listing.
- Spot check a post with FAQ (e.g. `nextjs-session-management`) — verify `<script type="application/ld+json">` blocks for `Article` and `FAQPage`, `og:image` points at the optimized cover, `article:published_time` matches frontmatter `publishedAt`.
- `/blog/category/engineering` shows only engineering posts, paginated.
- `/zh-TW/blog/{slug}` serves zh-TW content when present, falls back to en otherwise.
- Old `/blog?category={slug}` query-param URLs in shared links: emit a tiny redirect in the index page (server-side) or document them as a known minor regression.

## Rollback

Single feature branch. Revert the merge commit; generated markdown folders on disk can remain harmlessly since nothing references them after revert.

## Out of scope (future slices)

- Migrating team-members collection into a separate `authors` content collection (current plan flattens author into each post).
- Integrations, blog-categories content beyond name/slug/description (currently no detail page per category beyond the filter listing).
- Strapi webhook / preview deployment workflow.
