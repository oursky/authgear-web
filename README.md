# Authgear Website

The Authgear marketing website, built with **Astro 5**. All content — blog posts, customer stories, login gallery, what's new, integrations — lives in the repo as markdown + JSON under `frontend/src/content/`. No external CMS.

## Tech stack

| Layer | Technology |
|--------|------------|
| **Site** | Astro 5, React 19 islands, TypeScript |
| **Styling** | Tailwind CSS v4 + a shared design-system stylesheet |
| **Content** | Astro Content Collections (markdown + JSON) validated with zod |
| **Images** | Astro's built-in image pipeline (WebP + responsive srcsets) |
| **Syntax highlighting** | Shiki (`github-light` theme) |
| **Adapter** | `@astrojs/node` in standalone mode (SSR for the few dynamic endpoints) |

Most routes are prerendered; only `/api/contact` and `/sitemap.xml` run at request time.

## Repository layout

```
authgear-web/
├── frontend/              # Astro app — pages, content, components
├── docs/                  # Architecture + authoring docs
├── design/                # Design assets
├── skills/                # Repo-scoped Claude skills
└── README.md
```

## Run locally

```bash
cd frontend
npm install
npm run dev        # http://localhost:4321
```

Build + preview:

```bash
npm run build      # → dist/client (static) + dist/server (SSR entry)
npm run preview
```

## Environment variables

Only one:

```env
CONTACT_WEBHOOK_URL=
```

Set in `frontend/.env` (or your deployment secret store). The contact form POSTs to `/api/contact`; if `CONTACT_WEBHOOK_URL` is set, the endpoint forwards submissions there. Without it, submissions are logged to the server stdout.

## Authoring content

- **Blog posts**: `frontend/src/content/blog-posts/{locale}/{slug}/index.md`. See [`docs/blog-authoring.md`](docs/blog-authoring.md) for the full frontmatter reference, body conventions, FAQ handling, and SEO fields.
- **Customer stories**, **login gallery**, **what's new**, **integrations**: same pattern under `frontend/src/content/{collection}/`. Schemas in `frontend/src/content/config.ts`.
- Each collection's initial data was pulled from the live Webflow CMS via `frontend/scripts/webflow-to-markdown-*.mjs`. Those one-shot scripts remain in the repo as audit trail; they are not run on every build.

## Docs

- [`docs/ARCHITECTURE-ASTRO.md`](docs/ARCHITECTURE-ASTRO.md) — full architecture overview (routing, rendering, SEO, i18n, deployment).
- [`docs/blog-authoring.md`](docs/blog-authoring.md) — how to write a new blog post.
- [`docs/superpowers/specs/`](docs/superpowers/specs/) — design specs for each migration slice.

## Deployment

Fly.io (Node machine serving the Astro standalone entry). See the "Deployment" section in `docs/ARCHITECTURE-ASTRO.md`.
