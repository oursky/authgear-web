# Authgear Website

The Authgear marketing website, built with **Astro 5**. All content — blog posts, customer stories, login gallery, what's new, integrations — lives in the repo as markdown + JSON under `src/content/`. No external CMS.

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
├── src/         # Astro app — pages, content, components
├── public/      # Static assets
├── scripts/     # One-shot content-import scripts (audit trail)
├── tests/       # Playwright + Vitest suites
├── docs/        # Architecture + authoring docs
├── design/      # Design assets
├── skills/      # Repo-scoped Claude skills
└── README.md
```

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
```

Build + preview:

```bash
npm run build      # → dist/client (static) + dist/server (SSR entry)
npm run preview
```

## Environment variables

All four are optional — the site runs without any of them. Set them in `.env` locally or in your deployment's secret store. See [`.env.example`](.env.example) for the full template.

```env
CONTACT_WEBHOOK_URL=
PUBLIC_GTM_ID=
PUBLIC_PLAUSIBLE_DOMAIN=
PUBLIC_GOOGLE_SITE_VERIFICATION=
```

| Var | Effect |
|-----|--------|
| `CONTACT_WEBHOOK_URL` | `/api/contact` forwards form submissions here as JSON. If unset, submissions are logged to server stdout. |
| `PUBLIC_GTM_ID` | Google Tag Manager container ID (e.g. `GTM-XXXXXXX`). The GTM `<script>` and `<noscript>` iframe only render when set — leave blank in staging/local to avoid polluting the prod container. |
| `PUBLIC_PLAUSIBLE_DOMAIN` | Plausible Analytics site identifier (conventionally the canonical prod hostname, e.g. `authgear.com`). A label used by Plausible to bucket events — not a runtime hostname check. Script only loads when set. |
| `PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console verification token. The `<meta name="google-site-verification">` tag only renders when set, so staging/local builds don't carry the prod token. |

## Authoring content

- **Blog posts**: `src/content/blog-posts/{locale}/{slug}/index.md`. See [`docs/blog-authoring.md`](docs/blog-authoring.md) for the full frontmatter reference, body conventions, FAQ handling, and SEO fields.
- **Customer stories**, **login gallery**, **what's new**, **integrations**: same pattern under `src/content/{collection}/`. Schemas in `src/content/config.ts`.
- Each collection's initial data was pulled from the live Webflow CMS via `scripts/webflow-to-markdown-*.mjs`. Those one-shot scripts remain in the repo as audit trail; they are not run on every build.

## Docs

- [`docs/ARCHITECTURE-ASTRO.md`](docs/ARCHITECTURE-ASTRO.md) — full architecture overview (routing, rendering, SEO, i18n, deployment).
- [`docs/blog-authoring.md`](docs/blog-authoring.md) — how to write a new blog post.
- [`docs/superpowers/specs/`](docs/superpowers/specs/) — design specs for each migration slice.

## Deployment

Fly.io (Node machine serving the Astro standalone entry). See the "Deployment" section in `docs/ARCHITECTURE-ASTRO.md`.
