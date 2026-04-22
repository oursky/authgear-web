# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

The **Authgear marketing website**, built with **Astro 5**. All content — blog posts, customer stories, login gallery, what's new, integrations — lives in the repo as markdown + JSON under `src/content/`. No external CMS.

```
authgear-web/
├── src/         # Astro 5 / React 19 islands / TypeScript site
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
3. **SSR endpoints** — only `/api/contact` (contact-form forwarder) and `/sitemap.xml` (via `@astrojs/sitemap`) run at request time. Everything else is prerendered.

### Routing / i18n

- English is the default locale — served at unprefixed URLs (`/blog`, `/pricing`).
- Traditional Chinese uses `/zh-TW/...` prefix.
- Locale helpers live in `src/i18n/`; `localizedPath()` builds locale-aware URLs.
- For content collections, the zh-TW entry falls back to the English entry by slug when a translation is missing.

### URL preservation

- Blog posts: `/post/{slug}` is canonical. `/blog/{slug}` 301-redirects to `/post/{slug}`.
- Legacy `/zh/...` and `/zh-Hant-TW/...` paths permanently redirect (301) to `/zh-TW/...`.

## Development Commands

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # → dist/client (static) + dist/server (SSR entry)
npm run preview
```

## Environment Variables

Only one:

```env
CONTACT_WEBHOOK_URL=
```

Set in `.env` (or your deployment secret store). The contact form POSTs to `/api/contact`; if `CONTACT_WEBHOOK_URL` is set, submissions are forwarded there. Without it, submissions are logged to stdout.

## Authoring content

- **Blog posts**: `src/content/blog-posts/{locale}/{slug}/index.md`. See [`docs/blog-authoring.md`](docs/blog-authoring.md) for the full frontmatter reference, body conventions, FAQ handling, and SEO fields.
- **Customer stories**, **login gallery**, **what's new**, **integrations**: same pattern under `src/content/{collection}/`. Schemas in `src/content/config.ts`.
- Initial data for each collection was pulled from the live Webflow CMS via `scripts/webflow-to-markdown-*.mjs` one-shot scripts. Those scripts remain as an audit trail; they are not run on every build.

## Docs

- [`docs/ARCHITECTURE-ASTRO.md`](docs/ARCHITECTURE-ASTRO.md) — full architecture overview (routing, rendering, SEO, i18n, deployment).
- [`docs/blog-authoring.md`](docs/blog-authoring.md) — how to write a new blog post.
- [`docs/superpowers/specs/`](docs/superpowers/specs/) — design specs for each migration slice.

## Deployment

Fly.io (Node machine serving the Astro standalone entry). See the "Deployment" section in `docs/ARCHITECTURE-ASTRO.md`.

## Legacy

The site previously ran on Next.js 16 + Strapi 5, with the Astro app living under `frontend-astro/` during the migration. That stack is fully retired. If you find a reference to Next.js, Strapi, `cms/`, `frontend/`, or `frontend-astro/` in docs or scripts, treat it as stale and update it.
