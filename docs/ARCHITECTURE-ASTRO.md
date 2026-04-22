# Architecture (Astro)

Architecture of the Authgear marketing website after the Next.js → Astro migration and the Strapi → Astro Content Collections migration. Source of truth for how the site is built today.

**Status (2026-04-22):** Live on `frontend/` (Astro). All static marketing pages + every CMS collection (blog posts, customer stories, login gallery, what's new, integrations) render from local content files. Zero runtime Strapi dependency. The previous Next.js + Strapi stack has been fully removed from the repo.

## Stack

**Frontend**
- Astro 5 — primarily prerendered with `@astrojs/node` (standalone) adapter for the rare SSR routes
- React 19 — used only for interactive islands
- TypeScript
- Tailwind CSS v4 via `@tailwindcss/vite`
- Shiki (bundled by Astro) for markdown code-block syntax highlighting (`github-light` theme)

**Content**
- Astro Content Collections under `src/content/` — markdown (`content` type) for long-form, JSON (`data` type) for taxonomies
- zod schemas in `src/content/config.ts` validate every entry at build time
- `astro:assets` optimises images referenced from frontmatter and markdown

**Infrastructure**
- Fly.io — Node machine running the Astro SSR entry for the remaining dynamic routes (`/api/contact`, sitemap)
- Nginx — reverse proxy fronting Fly
- Docker Compose — unchanged; `frontend` service runs `node ./dist/server/entry.mjs`

No external CMS. No rebuild-on-publish webhook. Editing = editing markdown + image files in the repo; changes ship through git.

## Directory layout

```
frontend/
├── src/
│   ├── pages/                                 # File-based routing
│   │   ├── index.astro                        # Home (en)
│   │   ├── pricing.astro, about.astro, …      # Static marketing pages (prerender = true)
│   │   ├── terms.astro, policy.astro, …       # Legal pages (shared LegalPageLayout)
│   │   ├── blog/
│   │   │   ├── [...page].astro                # Paginated index (/blog, /blog/2, …)
│   │   │   └── [slug].astro                   # 301 → /post/{slug}
│   │   ├── post/[slug].astro                  # Blog post detail (canonical URL)
│   │   ├── post-category/[slug]/[...page].astro
│   │   ├── customer-stories/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── login-gallery/[index|slug].astro
│   │   ├── whats-new/[index|slug].astro
│   │   ├── integrations/[index|slug].astro
│   │   ├── sitemap.xml.ts                     # Generated sitemap
│   │   ├── zh-TW/                             # Mirrored tree for Traditional Chinese
│   │   └── api/
│   │       └── contact.ts                     # POST — forwards to CONTACT_WEBHOOK_URL
│   ├── content/                               # Content collections (markdown + JSON)
│   │   ├── config.ts                          # zod schemas
│   │   ├── blog-posts/{en,zh-TW}/{slug}/      # index.md + cover + inline figures
│   │   ├── blog-categories/{slug}.json
│   │   ├── customer-stories/{en,zh-TW}/{slug}/
│   │   ├── login-gallery/{en,zh-TW}/{slug}/   # main + web 1-4 + mobile 1-4 images
│   │   ├── whats-new/{en,zh-TW}/{slug}/
│   │   ├── integrations/{en,zh-TW}/{slug}/    # icon + frontmatter
│   │   └── integration-categories/{slug}.json
│   ├── components/
│   │   ├── nav/                               # SiteNav.astro, SiteFooter.astro
│   │   ├── pages/                             # One .astro per marketing page body
│   │   ├── blog/                              # BlogCard, BlogHero, BlogPostSeo, BlogSidebar, …
│   │   ├── customer-story/                    # CustomerStorySidebar.astro
│   │   ├── login-gallery/                     # LoginGallerySidebar.astro
│   │   ├── legal/                             # LegalPageLayout.astro
│   │   └── islands/                           # React components that need hydration
│   │       ├── ContactForm.tsx
│   │       ├── PricingPageClient.tsx
│   │       ├── sms-calculator/SmsCostCalculator.tsx
│   │       ├── login-gallery/LoginGalleryCarousel.tsx
│   │       └── …
│   ├── layouts/BaseLayout.astro               # <html>, <head>, nav + footer, analytics, `<slot name="head" />`
│   ├── lib/                                   # Shared helpers (no Strapi anymore)
│   │   ├── i18n.ts                            # localizedPath, resolveLocale, localeToHtmlLang
│   │   ├── navigation-data.ts
│   │   ├── pricing/, compare/, features/, tools/
│   │   └── plausible.ts                       # Event tagging helpers
│   ├── i18n/{en,zh-TW}.json                   # Flat message dictionaries, t(locale, key) helper
│   ├── middleware.ts                          # Legacy /zh/*, /zh-Hant-TW/* → /zh-TW/* (308)
│   └── styles/
│       ├── global.css                         # Tailwind entry + imports authgear-design-system.css
│       └── authgear-design-system.css
├── public/                                    # Static assets (images, favicons)
├── scripts/                                   # One-shot migration + repair scripts
│   ├── webflow-to-markdown-blog-posts.mjs
│   ├── webflow-to-markdown-customer-stories.mjs
│   ├── webflow-to-markdown-login-gallery.mjs
│   ├── webflow-to-markdown-whats-new.mjs
│   ├── webflow-to-markdown-integrations.mjs
│   └── fix-blog-*.mjs                         # Historical repair scripts
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

## Rendering model

| Category | Route behaviour |
|---|---|
| Static marketing pages (home, features, solutions, pricing, legal, tools, ONCE) | `export const prerender = true` — fully built at `npm run build` |
| Content-collection routes (blog, customer stories, login gallery, what's new, integrations) | `export const prerender = true` — each detail page built from its markdown entry via `getStaticPaths` |
| `/api/contact`, `/sitemap.xml` | SSR (Astro endpoint) |
| Legacy redirects (`/post/{slug}`, `/blog/{slug}`, `/zh/*`, `/zh-Hant-TW/*`, `/post-category/*`, etc.) | Prerendered `Astro.redirect(..., 301)` stubs |

The default adapter is still `@astrojs/node` in standalone mode so SSR endpoints work. But almost every page is static HTML.

## Content collections

All CMS data lives in the repo as local files. Each collection has a zod schema in `src/content/config.ts`.

### `blog-posts` (content, markdown)

- `src/content/blog-posts/{locale}/{slug}/index.md`
- Fields: `title`, `h1?`, `excerpt`, `coverImage`, `category?`, `featured`, `readTime?`, `metaTitle?`, `metaDescription?`, `canonicalUrl?`, `publishedAt`, `updatedAt?`, `publishedAtOverride?`, `draft`, `faq?: [{q,a}]`
- Author fields intentionally dropped.
- FAQ extracted from body markdown at migration time and emitted as FAQPage JSON-LD via `BlogPostSeo.astro`.
- Legacy `/blog/{slug}` URLs emit a 301 to `/post/{slug}` (canonical URL matches live Webflow).

### `blog-categories` (data, JSON)

- `src/content/blog-categories/{slug}.json`
- Fields: `name`, `slug`, `description?`

### `customer-stories` (content, markdown)

- Fields: `title`, `excerpt`, `companyIndustry?`, `companyLocation?`, `companyLogo?`, `coverImage`, `thumbnail`, `loginMethods[]`, `technicalDetails[]`, `metrics[] (max 3)`, `publishedAt`, `order?`
- Pure Astro detail page, pure Astro sidebar (no React).

### `login-gallery` (content, markdown)

- Fields: `title`, `industry`, `mainImage`, `webSlides (max 4)`, `mobileSlides (max 4)`, `loginMethods[]`, `socialLogins[]`, `technicalDetails[]`, `featured`, `draft`, `order?`, `publishedAt`
- Detail page uses `LoginGalleryCarousel` React island (platform switcher + swipe) — `getImage()` converts optimized images into URL strings for the island.

### `whats-new` (content, markdown)

- Fields: `title`, `excerpt`, `coverImage`, `publishedAt`, `canonicalUrl?`, `draft`
- Detail page renders body markdown with inline figure images.

### `integrations` + `integration-categories` (content + data)

- Integration: `name`, `excerpt`, `icon`, `website (url)`, `category?`, `publishedAt?`
- Category (JSON): `name`, `slug`
- Detail page has an external CTA button + a "More integrations" related grid.

## Migration scripts

`scripts/webflow-to-markdown-*.mjs` — one-shot converters that were used to bootstrap each collection from the live Webflow CMS (pulled via the Webflow MCP tool as JSON bundles under `/tmp/webflow-export-*/`). They are **not run at build time**; they live in the repo as audit trail + to make re-migrations reproducible if the source Webflow CMS is updated.

Each script:
1. Loads the MCP-dumped JSON bundle
2. Walks items, downloads referenced images to disk
3. Converts Webflow RichText HTML to markdown (headings, lists, blockquotes, code fences, inline figures, tables preserved as `<div class="ag-table-wrap">` HTML blocks)
4. Rewrites absolute `https://www.authgear.com/*` links to site-relative paths so internal links don't depend on cross-platform redirects
5. Writes `src/content/{collection}/{locale}/{slug}/index.md` plus images

`scripts/fix-blog-*.mjs` are historical one-shot repair scripts for specific data issues found after the initial blog migration (dangling tables, single-quoted code-block attributes, stale publish dates, absolute self-domain links). They remain for history; the migration script itself has been patched to produce clean output on re-run.

## SEO

- `BaseLayout.astro` exposes `<slot name="head" />` for per-page `<head>` injection.
- `BlogPostSeo.astro` emits per-post:
  - `<title>` (from `metaTitle ?? title`), `<meta name="description">`
  - `<link rel="canonical">` (from `canonicalUrl` or page URL)
  - OG + Twitter card meta
  - Article JSON-LD (`@type: Article`, `headline`, `datePublished`, `dateModified`, author + publisher set to the Authgear organization, `image`, `mainEntityOfPage`)
  - FAQPage JSON-LD when `faq[]` is set
- `sitemap.xml.ts` enumerates every non-draft post, category page, and top-level marketing URL in both locales.
- `astro.config.mjs` sets `site: 'https://www.authgear.com'` so canonical + OG URLs render absolute.

## URL preservation

The site's public URLs are stable across the Webflow → Astro transition:

- `/blog` — paginated index (live Webflow shape preserved)
- `/post/{slug}` — canonical blog post detail (live Webflow shape preserved)
- `/blog/{slug}` → 301 to `/post/{slug}`
- `/post-category/{slug}` — category pages
- `/customer-stories`, `/customer-stories/{slug}`
- `/login-gallery`, `/login-gallery/{slug}`
- `/whats-new`, `/whats-new/{slug}`
- `/integrations`, `/integrations/{slug}`
- `/terms`, `/policy`, `/data-privacy`, `/security`, `/sla`, `/terms-of-enterprise-license`
- `/zh-TW/*` mirrors for zh-TW

Legacy `/zh/*` and `/zh-Hant-TW/*` redirect (308) to `/zh-TW/*` via `src/middleware.ts`.

## i18n

- English: unprefixed URLs (`/blog`, `/pricing`)
- Traditional Chinese: `/zh-TW/*`
- `src/pages/zh-TW/` mirrors the top-level tree. Most route files are thin wrappers that pass `locale="zh-TW"` into a shared `.astro` component body.
- Messages: flat JSON in `src/i18n/{en,zh-TW}.json`, accessed via `t(locale, 'Namespace.key')`.
- Legal pages render English content in both locales by user direction.
- Content-collection routes prefer the `zh-TW/{slug}` entry and fall back to the `en/{slug}` entry when a translation is missing.

## Interactivity (islands)

Only these components hydrate. Everything else is zero-JS.

| Island | Directive | Why |
|---|---|---|
| `ContactForm` | `client:load` | intl-tel-input, form submit handling |
| `PricingPageClient` | `client:load` | Monthly/annual toggle + full comparison modal |
| `SmsCostCalculator` | `client:visible` | Interactive calculator |
| `LoginGalleryCarousel` | `client:load` | Platform switcher + swipe |
| `MfaOptionsTabs` | `client:load` | Tab state |
| `LogoMarquee` | `client:idle` | CSS-driven; JS only for pause-on-hover |
| Tools (JWT debugger, SSL checker, UUIDv7, etc.) | `client:load` | Form-driven utilities |
| Plausible event wrappers | `client:load` | Event tagging on click |

Rule: if a component only reads props and renders, it's `.astro`. If it holds state or binds events, it's a `.tsx` island.

## Navigation & footer

`SiteNav.astro` and `SiteFooter.astro` consume `src/lib/navigation-data.ts` and render real Astro markup (no `dangerouslySetInnerHTML`, no hydration for the primary nav). Link labels support multi-locale via `link.label[locale] ?? link.label.en`. Analytics scripts live in `BaseLayout.astro`'s `<head>` / body slots.

## API routes

| Route | Method | Description |
|---|---|---|
| `/api/contact` | POST | Forwards JSON body to `CONTACT_WEBHOOK_URL` |
| `/sitemap.xml` | GET | Emits sitemap listing all public URLs |

Implemented as Astro endpoints (`export const POST: APIRoute`). Everything else is static.

## Middleware

`src/middleware.ts` — small: `/zh-Hant-TW/*` → `/zh-TW/*` and `/zh/*` → `/zh-TW/*` (308). Pass everything else through.

## Caching & revalidation

- Content is prerendered at build time, so "revalidation" = redeploy (which happens on every merge to main). No rebuild-on-publish webhook because there is no external CMS.
- `/api/*` endpoints: `Cache-Control: no-store`.
- Assets: long-cache via Astro's content-hashed output (`_astro/*.[hash].{js,css,webp}`).
- Fly: `auto_stop_machines = "suspend"` + `min_machines_running = 0`. Static HTML is served by whatever sits in front of Fly (nginx); SSR only wakes the Node machine for `/api/contact` and `/sitemap.xml`.

## Authoring

See `docs/blog-authoring.md` for the full blog-post authoring guide (folder layout, frontmatter fields, body conventions, FAQ, SEO).

Other collections follow the same pattern — create a new folder under `src/content/{collection}/{locale}/{slug}/`, add `index.md` with the zod-validated frontmatter, commit, ship.

## Environment variables

```env
CONTACT_WEBHOOK_URL=
```

That's it — no more `STRAPI_URL`, no more `STRAPI_API_TOKEN`, no more `PUBLIC_STRAPI_URL`.

## Dev commands

```bash
cd frontend
npm install
npm run dev        # http://localhost:4321
npm run build      # → dist/client/ (static) + dist/server/ (SSR entry for API + sitemap)
npm run preview
```

## Deployment

Fly.io. `fly.toml` (simplified):

```toml
app = "authgear-web"
primary_region = "nrt"

[build]
  dockerfile = "frontend/Dockerfile"

[env]
  HOST = "0.0.0.0"
  PORT = "3000"
  NODE_ENV = "production"

[http_service]
  internal_port = 3000
  force_https = true
  auto_stop_machines = "suspend"
  auto_start_machines = true
  min_machines_running = 0

[[vm]]
  size = "shared-cpu-1x"
  memory = "512mb"
```

Secrets via `fly secrets set CONTACT_WEBHOOK_URL=...`.

Dockerfile: standard multi-stage Node image — `npm ci && npm run build`, then `node ./dist/server/entry.mjs`.

## What changed vs. the original Astro proposal

- Strapi was kept as CMS in the original plan. It's now gone entirely. All content lives in the repo as markdown + JSON.
- Rich-text rendering was expected to use `@strapi/blocks-react-renderer`. That package has been removed; body content is rendered via Astro's built-in markdown pipeline with Shiki for code blocks.
- Strapi webhook / SSR freshness model is replaced by redeploys — content edits = git commits.
- `/api/blog-posts` endpoint removed (no longer needed; blog listings are prerendered).
- `BlogPostInfiniteGrid` React island replaced by server-paginated `/blog/[...page]`.

## Decisions

1. **Content in the repo over an external CMS.** All CMS collections migrated to local markdown — smaller surface area, typed schemas, no runtime CMS dependency, no revalidation infrastructure.
2. **Webflow remains the authoring mirror for the historical data** (pulled once via the MCP one-shot scripts). Future edits happen in the repo.
3. **URL parity with the live Webflow site was treated as a hard constraint** — every indexed URL still resolves (via canonical routing or 301 redirects) to preserve SEO.
4. **Author metadata dropped** from blog posts per user direction. The Authgear organization is the author + publisher in Article JSON-LD.
5. **Shiki `github-light`** over the default dark theme — matches the live site's code-block styling.

## Open questions

1. **CDN layer**: Fly doesn't have a built-in global CDN. Existing nginx in front handles most caching. If traffic grows, adding Cloudflare in front of nginx is the natural next step.
2. **Font self-hosting**: currently loading IBM Plex Sans + Inter + PT Sans + Red Hat Display via `<link href="https://fonts.googleapis.com">` in `BaseLayout.astro`. Astro's built-in `@astrojs/font` would self-host for better performance + privacy; deferred.
3. **Re-migration workflow**: if the source Webflow CMS gets edited, re-running the migration script overwrites the whole collection. Incremental sync / diff tooling not built yet — acceptable while authoring primarily happens in the repo.
