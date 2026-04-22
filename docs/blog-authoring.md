# Authoring a Blog Post

Blog posts live in `src/content/blog-posts/{locale}/{slug}/`. Each post is a folder with an `index.md` plus any images it references.

## 1. Create the folder

```
src/content/blog-posts/en/my-post-slug/
├── index.md
├── cover.webp
└── figure-1.webp
```

- `{locale}` is `en` or `zh-TW`.
- `{slug}` is the URL slug — lowercase, hyphen-separated, no spaces or special characters. It determines the URL: `/blog/{slug}` (en) or `/zh-TW/blog/{slug}` (zh-TW).
- Keep images alongside `index.md` so references are relative (`./cover.webp`).

## 2. Write the frontmatter

Every field listed below is validated by zod on build. See `src/content/config.ts` for the authoritative schema.

```yaml
---
# Required
title: "Post Title — keep under 70 characters"
excerpt: "One-paragraph preview shown on /blog listings and in meta description fallbacks."
coverImage: ./cover.webp
publishedAt: 2026-04-22

# Recommended
metaTitle: "SEO title (≤60 chars). Falls back to `title` if omitted."
metaDescription: "SEO description (≤160 chars). Falls back to `excerpt`."
category: engineering           # must match a slug in src/content/blog-categories/
readTime: 8                     # minutes (integer, optional)
updatedAt: 2026-04-22           # last meaningful edit. Defaults to publishedAt.

# Optional
h1: "On-page H1 (if different from `title`)"
canonicalUrl: https://www.authgear.com/blog/my-post-slug
featured: false
publishedAtOverride: 2025-11-01  # for backdated posts; listing order uses this first
draft: false                     # drafts do not build and are not in the sitemap

# Structured FAQ — emitted as FAQPage JSON-LD in addition to being in the body
faq:
  - q: "Is Authgear open source?"
    a: "Yes. The server is Apache 2.0 on GitHub."
  - q: "Can I self-host?"
    a: "Yes — see the deployment docs."
---
```

## 3. Write the body

Body is standard Markdown. A few conventions:

### Headings

- Start at `##`. The page title renders as `<h1>` — using `#` in the body creates a duplicate h1.
- Nest normally: `##` → section, `###` → subsection.

### Images

Use Markdown syntax; Astro's image pipeline optimizes (WebP + responsive srcsets) automatically:

```md
![alt text](./figure-1.webp)
```

### Code blocks

Use fenced code with a language hint. These render with the site's syntax styling:

````md
```typescript
import { createClient } from "@supabase/ssr";
```
````

### Tables

Markdown tables work. For the wider styled table seen in migrated posts, use the raw HTML wrapper — the design system already styles `.ag-table-wrap` / `.ag-table`:

```html
<div class="ag-table-wrap">
  <table class="ag-table">
    <thead>
      <tr><th>Feature</th><th>Option A</th><th>Option B</th></tr>
    </thead>
    <tbody>
      <tr><td>Passkeys</td><td>✓</td><td>—</td></tr>
    </tbody>
  </table>
</div>
```

### Internal links

Link to other posts using `/blog/{slug}` — not `/post/{slug}`. Legacy `/post/*` URLs still work via a 301 redirect, but new authoring should use the canonical path.

Example:

```md
See our [JWT guide](/blog/nextjs-jwt-authentication) for context.
```

### FAQ section

If you want an on-page FAQ:

```md
## Frequently Asked Questions

### Is Authgear open source?

Yes — the server is Apache 2.0 on GitHub.

### Can I self-host?

Yes, see the deployment docs.
```

The corresponding `faq: [{q, a}, …]` frontmatter drives the FAQPage JSON-LD. Keep them in sync (or omit the in-body section and let the JSON-LD alone handle it).

## 4. Translations

zh-TW posts go in `src/content/blog-posts/zh-TW/{slug}/` using the **same slug** as the en post. Copy the frontmatter + body and translate. Missing zh-TW posts fall back to the en version automatically.

## 5. Preview + ship

```bash
npm run dev
```

Open <http://localhost:4321/blog>. The post appears on:

- `/blog` (paginated)
- `/blog/{slug}` (detail page with SEO tags + JSON-LD)
- `/blog/category/{category-slug}` if the category is set
- `/sitemap.xml`

Commit the folder (markdown + images) in one PR. Image optimization happens at build, so raw sources live in the repo.

## 6. Categories

Categories live as JSON in `src/content/blog-categories/{slug}.json`:

```json
{
  "name": "Engineering",
  "slug": "engineering",
  "description": "Deep-dives on auth architecture, SDKs, and protocols."
}
```

To add a new category: create the JSON file first, then reference its `slug` in post frontmatter.

## 7. SEO cheat sheet

The `BlogPostSeo.astro` component on every detail page emits:

- `<title>` and `<meta name="description">`
- `<link rel="canonical">` (uses `canonicalUrl` or falls back to the page URL)
- OpenGraph: `og:type=article`, title, description, image, url, site name, `article:published_time`, `article:modified_time`, `article:section`
- Twitter: `summary_large_image` card
- JSON-LD `Article` schema with `datePublished`, `dateModified`, author + publisher (Authgear)
- JSON-LD `FAQPage` schema when `faq` is set

To verify locally: build, view page source, confirm the `<script type="application/ld+json">` blocks render your expected data.
