# Authgear Website

The Authgear marketing website, built with **Astro 6**. All content — blog posts, customer stories, login gallery, what's new, integrations — lives in the repo as markdown + JSON under `src/content/`. No external CMS.

## Tech stack

| Layer | Technology |
|--------|------------|
| **Site** | Astro 6, React 19 islands, TypeScript |
| **Styling** | Tailwind CSS v4 + a shared design-system stylesheet |
| **Content** | Astro Content Collections (markdown + JSON) validated with zod |
| **Images** | Astro's built-in image pipeline (WebP + responsive srcsets) |
| **Syntax highlighting** | Shiki (`github-light` theme) |
| **Adapter** | `@astrojs/netlify` (SSR for the few dynamic endpoints) |

Most routes are prerendered; only `/sitemap.xml` runs at request time. Contact-form submissions are handled by Netlify Forms (no SSR endpoint).

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

All three are optional — the site runs without any of them. Set them in `.env` locally or in your deployment's secret store. See [`.env.example`](.env.example) for the full template.

```env
PUBLIC_GTM_ID=
PUBLIC_PLAUSIBLE_DOMAIN=
PUBLIC_GOOGLE_SITE_VERIFICATION=
```

| Var | Effect |
|-----|--------|
| `PUBLIC_GTM_ID` | Google Tag Manager container ID (e.g. `GTM-XXXXXXX`). The GTM `<script>` and `<noscript>` iframe only render when set — leave blank in staging/local to avoid polluting the prod container. |
| `PUBLIC_PLAUSIBLE_DOMAIN` | Plausible Analytics site identifier (conventionally the canonical prod hostname, e.g. `authgear.com`). A label used by Plausible to bucket events — not a runtime hostname check. Script only loads when set. |
| `PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console verification token. The `<meta name="google-site-verification">` tag only renders when set, so staging/local builds don't carry the prod token. |

Contact form submissions are handled by [Netlify Forms](https://docs.netlify.com/manage/forms/setup/); configure recipient emails / webhooks in the Netlify dashboard.

## Authoring content

- **Blog posts**: `src/content/blog-posts/{locale}/{slug}/index.md`. See [`docs/blog-authoring.md`](docs/blog-authoring.md) for the full frontmatter reference, body conventions, FAQ handling, and SEO fields.
- **Customer stories**, **login gallery**, **what's new**, **integrations**: same pattern under `src/content/{collection}/`. Schemas in `src/content/config.ts`.
- Each collection's initial data was pulled from the live Webflow CMS via `scripts/webflow-to-markdown-*.mjs`. Those one-shot scripts remain in the repo as audit trail; they are not run on every build.

## Docs

- [`docs/ARCHITECTURE-ASTRO.md`](docs/ARCHITECTURE-ASTRO.md) — full architecture overview (routing, rendering, SEO, i18n, deployment).
- [`docs/blog-authoring.md`](docs/blog-authoring.md) — how to write a new blog post.
- [`docs/superpowers/specs/`](docs/superpowers/specs/) — design specs for each migration slice.

## Deployment

Netlify (build from `main`, SSR via the Netlify adapter). See the "Deployment" section in `docs/ARCHITECTURE-ASTRO.md`.
