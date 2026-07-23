# Architecture (Astro)

Source of truth for how the Authgear marketing website is built today.

## Stack

**Frontend**
- Astro 6 — fully prerendered; deployed via `@astrojs/netlify`
- React 19 — used only for interactive islands
- TypeScript
- Tailwind CSS v4 via `@tailwindcss/vite`
- Shiki (bundled by Astro) for markdown code-block syntax highlighting (`github-light` theme)

**Content**
- Astro Content Collections under `src/content/` — markdown (`content` type) for long-form, JSON (`data` type) for taxonomies
- zod schemas in `src/content/config.ts` validate every entry at build time
- `astro:assets` optimises images referenced from frontmatter and markdown

**Infrastructure**
- Netlify — builds from `live`. Every page is prerendered to static HTML; no code runs at request time. Legacy locale paths redirect via forced (`301!`) rules in `public/_redirects`. Contact form submissions go to Netlify Forms.

No external CMS. No rebuild-on-publish webhook. Editing = editing markdown + image files in the repo; changes ship through git.

## Directory layout

```
authgear-web/
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
│   │   └── zh-hant/                           # Mirrored tree for Traditional Chinese (URL prefix; locale id in code is `zh-Hant`)
│   ├── content/                               # Content collections (markdown + JSON)
│   │   ├── config.ts                          # zod schemas
│   │   ├── blog-posts/{en,zh-Hant}/{slug}/    # index.md + cover + inline figures
│   │   ├── blog-categories/{slug}.json
│   │   ├── customer-stories/{en,zh-Hant}/{slug}/
│   │   ├── login-gallery/{en,zh-Hant}/{slug}/ # main + web 1-4 + mobile 1-4 images
│   │   ├── whats-new/{en,zh-Hant}/{slug}/
│   │   ├── integrations/{en,zh-Hant}/{slug}/  # icon + frontmatter
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
│   ├── lib/                                   # Shared helpers
│   │   ├── i18n.ts                            # localizedPath, resolveLocale, localeToHtmlLang
│   │   ├── navigation-data.ts
│   │   ├── pricing/, compare/, features/, tools/
│   │   └── plausible.ts                       # Event tagging helpers
│   ├── i18n/{en,zh-Hant}.json                 # Flat message dictionaries, t(locale, key) helper
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
| Static marketing pages (home, features, solutions, pricing, legal, tools) | `export const prerender = true` — fully built at `npm run build` |
| Content-collection routes (blog, customer stories, login gallery, what's new, integrations) | `export const prerender = true` — each detail page built from its markdown entry via `getStaticPaths` |
| Sitemap (`/sitemap-index.xml`, `/sitemap-0.xml`; `/sitemap.xml` 301-aliased) | Generated at build time by the `@astrojs/sitemap` integration |
| Legacy redirects (`/post/{slug}`, `/blog/{slug}`, `/zh/*`, `/zh-TW/*`, `/zh-Hant/*`, `/zh-Hant-TW/*`, `/post-category/*`, etc.) | A mix of prerendered `Astro.redirect(..., 301)` stubs and rules in `public/_redirects` |

Every page is static. Nothing runs at request time — redirects and cache headers are declarative (`public/_redirects`, `netlify.toml`).

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

`scripts/webflow-to-markdown-*.mjs` — one-shot converters that bootstrapped each collection from the Webflow CMS (pulled via the Webflow MCP tool). They are **not run at build time**; they sit in the repo as audit trail and to make re-migrations reproducible if the source CMS changes. Each script loads an MCP JSON bundle, downloads referenced images, converts Webflow RichText HTML to markdown (preserving tables as `<div class="ag-table-wrap">` blocks), rewrites absolute `https://www.authgear.com/*` links to site-relative paths, and writes `src/content/{collection}/{locale}/{slug}/index.md` plus its images.

`scripts/fix-blog-*.mjs` — historical one-shot repair scripts kept for reproducibility. The main migration script has since been patched to produce clean output on re-run, so these should not be needed again.

## SEO

- `BaseLayout.astro` exposes `<slot name="head" />` for per-page `<head>` injection.
- `BlogPostSeo.astro` emits per-post:
  - `<title>` (from `metaTitle ?? title`), `<meta name="description">`
  - `<link rel="canonical">` (from `canonicalUrl` or page URL)
  - OG + Twitter card meta
  - Article JSON-LD (`@type: Article`, `headline`, `datePublished`, `dateModified`, author + publisher set to the Authgear organization, `image`, `mainEntityOfPage`)
  - FAQPage JSON-LD when `faq[]` is set
- The `@astrojs/sitemap` integration (configured in `astro.config.mjs`) emits `sitemap-index.xml` + `sitemap-0.xml` at build time; `/sitemap.xml` is 301-aliased to `/sitemap-index.xml` via `public/_redirects`. The integration's `filter` drops internal `/en/*` routes so canonical English paths (unprefixed) are the ones indexed.
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
- `/zh-hant/*` mirrors for Traditional Chinese (locale id `zh-Hant` in code)

Legacy `/zh/*`, `/zh-TW/*`, `/zh-Hant/*`, and `/zh-Hant-TW/*` redirect (301) to `/zh-hant/*` via forced (`301!`) rules in `public/_redirects`.

## i18n

- English: unprefixed URLs (`/blog`, `/pricing`)
- Traditional Chinese: `/zh-hant/*` (locale id `zh-Hant` in code)
- `src/pages/zh-hant/` mirrors the top-level tree. Most route files are thin wrappers that pass `locale="zh-Hant"` into a shared `.astro` component body.
- Messages: flat JSON in `src/i18n/{en,zh-Hant}.json`, accessed via `t(locale, 'Namespace.key')`.
- Legal pages render English content in both locales by user direction.
- Content-collection routes prefer the `zh-Hant/{slug}` entry and fall back to the `en/{slug}` entry when a translation is missing.

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

None. The contact form posts directly to Netlify Forms (build-time form detection via the `public/__forms.html` stub). The sitemap is a pair of static XML files generated by `@astrojs/sitemap` at build time.

## Middleware

None. `src/middleware.ts` was removed when the legacy locale redirects (`/zh-Hant-TW/*`, `/zh-Hant/*`, `/zh-TW/*`, `/zh/*` → `/zh-hant/*`) became forced (`301!`) static rules in `public/_redirects` — nothing runs at request time anymore.

## Caching & revalidation

- Content is prerendered at build time, so "revalidation" = redeploy (which happens on every push to `live`). No rebuild-on-publish webhook because there is no external CMS.
- Assets: long-cache via Astro's content-hashed output (`_astro/*.[hash].{js,css,webp}`).
- All HTML and the sitemap are static; Netlify's CDN serves them directly. Legacy `/zh*` prefixes are handled by forced redirect rules at the CDN edge — no function invocations.

## Authoring

See `docs/blog-authoring.md` for the full blog-post authoring guide (folder layout, frontmatter fields, body conventions, FAQ, SEO).

Other collections follow the same pattern — create a new folder under `src/content/{collection}/{locale}/{slug}/`, add `index.md` with the zod-validated frontmatter, commit, ship.

## Environment variables

None. Contact form notifications are configured in the Netlify dashboard (Site settings → Forms). No `STRAPI_URL`, `STRAPI_API_TOKEN`, `PUBLIC_STRAPI_URL`, or `CONTACT_WEBHOOK_URL`.

## Dev commands

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # → dist/ (static HTML, hashed assets, sitemap, _redirects)
npm run preview
```

## Deployment

Netlify. The site is wired up to build from `live`; the `@astrojs/netlify` adapter emits the prerendered HTML and the sitemap XML. Contact form submissions are handled by Netlify Forms (build-time detection via `public/__forms.html`; configure notifications in the Netlify dashboard). Releases happen by fast-forwarding `live` to a tested commit on `main`. Configuration lives in `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
```

No build-time secrets are required today. If any are added later, set them via the Netlify UI (Site settings → Environment variables).

## Decisions

1. **Content in the repo over an external CMS.** All CMS collections migrated to local markdown — smaller surface area, typed schemas, no runtime CMS dependency, no revalidation infrastructure.
2. **Webflow remains the authoring mirror for the historical data** (pulled once via the MCP one-shot scripts). Future edits happen in the repo.
3. **URL parity with the live Webflow site was treated as a hard constraint** — every indexed URL still resolves (via canonical routing or 301 redirects) to preserve SEO.
4. **Author metadata dropped** from blog posts per user direction. The Authgear organization is the author + publisher in Article JSON-LD.
5. **Shiki `github-light`** over the default dark theme — matches the live site's code-block styling.

## Open questions

1. **CDN layer**: Netlify's edge serves static HTML and hashed assets globally. If we ever need finer control (custom WAF rules, more aggressive locale-redirect logic at the edge), Cloudflare in front is the natural next step.
2. **Font self-hosting**: currently loading IBM Plex Sans + Inter + PT Sans + Red Hat Display via `<link href="https://fonts.googleapis.com">` in `BaseLayout.astro`. Astro's built-in `@astrojs/font` would self-host for better performance + privacy; deferred.
3. **Re-migration workflow**: if the source Webflow CMS gets edited, re-running the migration script overwrites the whole collection. Incremental sync / diff tooling not built yet — acceptable while authoring primarily happens in the repo.
