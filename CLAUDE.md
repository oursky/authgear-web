# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

The **Authgear marketing website**, built with **Astro 6**. All content — blog posts, customer stories, login gallery, what's new, integrations — lives in the repo as markdown + JSON under `src/content/`. No external CMS.

```
authgear-web/
├── src/         # Astro 6 / React 19 islands / TypeScript site
├── public/      # Static assets served as-is
├── scripts/     # One-shot content-import scripts (audit trail)
├── tests/       # Playwright + Vitest suites
├── docs/        # Architecture and authoring docs
├── design/      # Design assets
└── skills/      # Repo-scoped Claude skills
```

### Page Model

1. **Static marketing pages** — Astro components under `src/pages/` and `src/components/pages/`.
2. **Content-collection pages** — blog posts, customer stories, login gallery, what's new items, and integrations live under `src/content/{collection}/` as markdown + JSON, validated with zod schemas in `src/content/config.ts`.
3. **Runtime code** — every page is prerendered; there is no request-time middleware. Legacy `/zh*` paths redirect via forced (`301!`) rules in `public/_redirects`. The sitemap is generated at build time by `@astrojs/sitemap` (`/sitemap-index.xml` + `/sitemap-0.xml`; `/sitemap.xml` is 301-aliased via `public/_redirects`). Contact form submissions go to Netlify Forms.

### Routing / i18n

- English is the default locale — served at unprefixed URLs (`/blog`, `/pricing`).
- Traditional Chinese uses `/zh-hant/...` prefix (URL is lowercase). Internal locale id is `zh-Hant` (BCP-47 mixed case) — that's what `src/content/{collection}/zh-Hant/`, `src/i18n/zh-Hant.json`, and the `locale` prop all use.
- Locale helpers live in `src/i18n/`; `localizedPath()` builds locale-aware URLs.
- For content collections, the `zh-Hant` entry falls back to the English entry by slug when a translation is missing.

### URL preservation

- Blog posts: `/post/{slug}` is canonical. `/blog/{slug}` 301-redirects to `/post/{slug}`.
- Legacy `/zh/...`, `/zh-TW/...`, `/zh-Hant/...`, and `/zh-Hant-TW/...` paths redirect (301) to `/zh-hant/...` via forced rules in `public/_redirects`.

## Development Commands

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # → dist/ (static HTML, hashed assets, sitemap, _redirects) + the locale-redirect Edge Function
npm run preview
```

## Environment Variables

None required for the contact form — submissions are handled by Netlify Forms (build-time detection via `public/__forms.html` stub; configure notifications in the Netlify dashboard).

## Authoring content

- **Blog posts**: `src/content/blog-posts/{locale}/{slug}/index.md`. See [`docs/blog-authoring.md`](docs/blog-authoring.md) for the full frontmatter reference, body conventions, FAQ handling, and SEO fields.
- **Customer stories**, **login gallery**, **what's new**, **integrations**: same pattern under `src/content/{collection}/`. Schemas in `src/content/config.ts`.
- Initial data for each collection was pulled from the live Webflow CMS via `scripts/webflow-to-markdown-*.mjs` one-shot scripts. Those scripts remain as an audit trail; they are not run on every build.

## Docs

| Doc | Purpose |
|---|---|
| [`docs/ARCHITECTURE-ASTRO.md`](docs/ARCHITECTURE-ASTRO.md) | Full architecture overview — routing, rendering, SEO, i18n, deployment. Start here. |
| [`docs/blog-authoring.md`](docs/blog-authoring.md) | Authoring a new blog post — frontmatter schema, body conventions, FAQ handling, SEO fields. |
| [`docs/tool-pages.md`](docs/tool-pages.md) | Adding or migrating a `/tools/<slug>` page — iframe-embedded vs self-hosted React island, CSS prefix-scoping script, Webflow collision resets, crypto-library guidance. |
| [`docs/plausible-tagging-plan.md`](docs/plausible-tagging-plan.md) | Inventory of custom Plausible events and the naming convention they follow. |
| [`docs/superpowers/specs/`](docs/superpowers/specs/) | Design specs for each Astro-migration slice (historical, useful when revisiting a migrated subsystem). |

## Deployment

Netlify (builds from `live`; every route is static — redirects live in `public/_redirects`). See the "Deployment" section in `docs/ARCHITECTURE-ASTRO.md`.

## Stale references

Treat any reference to Next.js, Strapi, `cms/`, `frontend/`, or `frontend-astro/` in docs or scripts as stale — these belonged to a retired stack. Update or remove them when you encounter them.
