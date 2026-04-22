# Architecture (Astro target)

Proposed architecture for migrating the Authgear marketing website from Next.js 16 to Astro 5. Strapi remains the CMS; editors keep their existing admin UI. This doc describes the target state, not a migration plan.

**Migration status (2026-04-22):** Phase 2 complete. Phases 1 + 2a + 2b + 2c + 2d + 2e shipped on branch `migration/nextjs-to-astro`. All static marketing pages live in both locales: home + 13 static + 4 compare + 7 solutions + 19 features + 9 tools + Once + Pricing. Every interactive island hydrated (ContactForm, LogoMarquee, 3 feature tabs, SmsCostCalculator, 9 tool islands, OnceSdkFrameworkHarness, OncePageFaq, PricingPageClient, PricingFaqItem). Phase 3 (CMS-backed pages) plan pending.

## Stack

**Frontend**
- Astro 5 (hybrid: static marketing pages + SSR for CMS routes and `/api/*`)
- React 19 islands (only for interactive components)
- TypeScript
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- `@astrojs/node` adapter in `standalone` mode — needed for SSR on Fly.io
- `astro-i18next` or Astro's built-in i18n routing
- `@strapi/blocks-react-renderer` — unchanged, rendered inside React island for rich text blocks

**CMS**
- Strapi 5 — unchanged. Same collections, same admin UI, same API contract.

**Infrastructure**
- Fly.io — Node machine running the Astro SSR entry; `auto_stop_machines = "suspend"` for cheap idle
- Nginx — unchanged (reverse proxy in front of the Fly app for static marketing stack; see below)
- Docker Compose (self-hosted stack) — `frontend` service swaps `next start` for `node ./dist/server/entry.mjs`
- No rebuild-on-publish webhook. CMS routes are SSR with response caching; editors see changes within 60s without a deploy.

## Directory layout

```
frontend/
├── src/
│   ├── pages/                    # File-based routing (replaces app/)
│   │   ├── index.astro           # Home (en)
│   │   ├── [...slug].astro       # Static marketing catch-all (optional)
│   │   ├── blog/
│   │   │   ├── index.astro       # Listing
│   │   │   └── [slug].astro      # Post detail (getStaticPaths)
│   │   ├── customer-stories/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── integrations/[slug].astro
│   │   ├── login-gallery/[slug].astro
│   │   ├── whats-new/[slug].astro
│   │   ├── pricing.astro
│   │   ├── about.astro
│   │   ├── … (one .astro per static marketing page)
│   │   ├── zh-TW/                # Mirrored tree for Traditional Chinese
│   │   │   ├── index.astro
│   │   │   ├── blog/…
│   │   │   └── …
│   │   └── api/
│   │       ├── contact.ts        # POST — forwards to CONTACT_WEBHOOK_URL
│   │       └── blog-posts.ts     # GET — proxy/search endpoint
│   ├── layouts/
│   │   ├── BaseLayout.astro      # <html>, <head>, nav + footer, analytics scripts
│   │   ├── MarketingLayout.astro # Wraps BaseLayout, marketing chrome
│   │   └── BlogPostLayout.astro
│   ├── components/
│   │   ├── nav/
│   │   │   ├── SiteNav.astro     # Server-rendered nav (was dangerouslySetInnerHTML)
│   │   │   └── SiteFooter.astro
│   │   ├── pages/                # One .astro per marketing page body
│   │   │   ├── HomePage.astro
│   │   │   ├── AboutPage.astro
│   │   │   └── …
│   │   ├── islands/              # React components that need hydration
│   │   │   ├── ContactForm.tsx   # client:load
│   │   │   ├── PricingToggle.tsx # client:visible
│   │   │   ├── SmsCalculator.tsx # client:visible
│   │   │   ├── LogoMarquee.tsx   # client:idle
│   │   │   ├── PlausibleButton.tsx
│   │   │   └── OnceSdkCode.tsx   # code sample tabs
│   │   └── blocks/               # Pure .astro presentational components
│   ├── lib/
│   │   ├── strapi.ts             # Port 1:1 from frontend/lib/strapi.ts
│   │   ├── i18n.ts               # pathLocaleToStrapiLocale, LOCALES, DEFAULT_LOCALE
│   │   ├── navigation-data.ts    # Unchanged
│   │   ├── site-navigation.ts    # Returns data; consumed by SiteNav.astro
│   │   ├── pricing/copy-en.ts    # Unchanged
│   │   ├── compare/, features/, tools/  # Unchanged data modules
│   │   └── plausible.ts          # Event tagging helpers
│   ├── i18n/
│   │   ├── en.json               # Ported from frontend/messages/en.json
│   │   ├── zh-TW.json
│   │   └── index.ts              # `t(key, locale)` helper (no next-intl)
│   ├── middleware.ts             # Legacy /zh/* and /zh-Hant-TW/* → /zh-TW/* (308)
│   └── styles/
│       └── global.css            # Tailwind entry + authgear-design-system.css
├── public/                       # Unchanged — static assets, favicons, images
├── astro.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Rendering model

Three categories of page, matching the current site:

| Category | Current (Next.js) | Target (Astro) |
|---|---|---|
| Static marketing | RSC in `components/pages/*.tsx` | `.astro` components, prerendered at build |
| Dynamic CMS (blog, stories, integrations, login gallery, what's new) | RSC with `fetch` + `revalidate: 60` | SSR (`export const prerender = false`) with `Cache-Control: s-maxage=60, stale-while-revalidate=300` |
| API routes | `app/api/*/route.ts` | `src/pages/api/*.ts` Astro endpoints (SSR) |

Default: **`output: 'server'` with `@astrojs/node` (standalone)**. Static marketing pages opt into prerendering via `export const prerender = true`. CMS routes and `/api/*` stay SSR. This mirrors today's behavior on Fly without needing rebuild-on-publish.

## i18n

No `next-intl`. Use file-system locale segmentation + a thin translation helper.

- English: unprefixed — `/blog`, `/pricing`
- Traditional Chinese: `/zh-TW/blog`, `/zh-TW/pricing`
- `src/pages/zh-TW/` mirrors the top-level tree. Shared page bodies live in `src/components/pages/*.astro` and accept a `locale` prop, so each route file is a one-liner:

```astro
---
import HomePage from '@/components/pages/HomePage.astro';
---
<HomePage locale="zh-TW" />
```

- Legacy redirects (`/zh/*`, `/zh-Hant-TW/*` → `/zh-TW/*`, 308) handled in `src/middleware.ts`.
- Strapi locale mapping unchanged: `pathLocaleToStrapiLocale('zh-TW') === 'zh-Hant-TW'`.
- Message JSON ported from `frontend/messages/*.json` unchanged; accessed via `t(key, locale)` — a flat object lookup, no runtime framework.

## Strapi integration

`src/lib/strapi.ts` ports `frontend/lib/strapi.ts` almost verbatim:
- Same `normalizeStrapiPayload()` Strapi-5-to-4 shape adapter
- Same `publishedAtOverride` handling for blog post ordering (sorted in JS, not Strapi)
- Same empty-payload fallback when Strapi is unreachable at build time (Docker build still succeeds; prerendered pages render a skeleton)
- `revalidate: 60` → `Cache-Control: public, s-maxage=60, stale-while-revalidate=300` on SSR responses. First request after 60s re-renders in the background; everyone else gets cached HTML. Functionally equivalent to today's ISR, no webhooks or rebuilds.

## Navigation & footer

Currently: HTML string generated server-side and injected via `dangerouslySetInnerHTML` in `app/layout.tsx`.

Target: `SiteNav.astro` and `SiteFooter.astro` consume the same `navigation-data.ts` structure and render real Astro markup. No HTML-string generation, no hydration. Link labels still support multi-locale via `link.label[locale] ?? link.label.en`. The Webflow CSS, jQuery, Webflow JS, and analytics scripts move into `BaseLayout.astro`'s `<head>` / end-of-body slots.

## Interactivity (islands)

Only these components hydrate. Everything else is zero-JS.

| Island | Directive | Why |
|---|---|---|
| `ContactForm` | `client:load` | Above-the-fold form, needs intl-tel-input |
| `PricingToggle` | `client:visible` | Monthly/annual toggle on pricing page |
| `SmsCalculator` | `client:visible` | Interactive calculator |
| `LogoMarquee` | `client:idle` | CSS-driven; JS only for pause-on-hover |
| `OnceSdkCode` | `client:visible` | Framework/language tab switcher |
| `PlausibleButton` / `PlausibleLink` | `client:load` | Event tagging on click |
| `FooterLanguageSwitcher` | none | Plain `<a>` links — can stay `.astro` |

Rule: if a component only reads props and renders, it's `.astro`. If it holds state or binds events, it's a `.tsx` island.

## API routes

| Route | Method | Description |
|---|---|---|
| `/api/contact` | POST | Forwards JSON body to `CONTACT_WEBHOOK_URL`; same contract as today |
| `/api/blog-posts` | GET | Proxy/search endpoint (if still needed after migration — may be removable) |

Implemented as Astro endpoints (`export const POST: APIRoute = …`). Served by the Node adapter on Fly.

## Middleware

`src/middleware.ts` handles only what Next's `proxy.ts` does today:

1. `/zh-Hant-TW/*` → `/zh-TW/*` (308)
2. `/zh/*` → `/zh-TW/*` (308)
3. Pass everything else through

No Accept-Language sniffing, no locale rewriting (file-system routing handles that directly).

## Caching & revalidation

- **Static marketing pages** (opt-in via `export const prerender = true`): rebuilt on deploy only. Zero latency, zero Strapi calls at runtime.
- **CMS pages** (default SSR): `Cache-Control: public, s-maxage=60, stale-while-revalidate=300`. Fly's edge / nginx caches the response. Editors see changes within 60s. No rebuild hook needed.
- **API routes** (`/api/contact`, `/api/blog-posts`): no cache (`Cache-Control: no-store`).
- **Assets**: long-cache via Astro's content-hashed output (`_astro/*.[hash].js|css`).
- **Machine lifecycle**: Fly `auto_stop_machines = "suspend"` + `min_machines_running = 0`. Cold resume is ~300ms (suspend, not full stop) so cache-miss requests still feel snappy.

## Environment variables

Unchanged from `frontend/.env.local`:

```env
STRAPI_URL=https://your-project.strapiapp.com
PUBLIC_STRAPI_URL=https://your-project.strapiapp.com   # renamed from NEXT_PUBLIC_*
STRAPI_API_TOKEN=your_read_only_token
CONTACT_WEBHOOK_URL=
```

Astro's client-exposed prefix is `PUBLIC_` (replaces `NEXT_PUBLIC_`).

## Dev commands

```bash
cd frontend
npm install
cp .env.local.example .env         # Astro reads .env, not .env.local
npm run dev        # http://localhost:4321
npm run build      # → dist/ (static) + dist/server/ (SSR entry)
npm run preview
```

## Deployment

**Primary target: Fly.io.** `fly.toml` at repo root or `frontend/fly.toml`:

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

Secrets set via `fly secrets set STRAPI_URL=... STRAPI_API_TOKEN=... CONTACT_WEBHOOK_URL=...`.

Dockerfile is a standard multi-stage Node image:
- Stage 1: `npm ci && npm run build`
- Stage 2: copy `dist/`, `node_modules/`, run `node ./dist/server/entry.mjs`

Docker Compose (self-hosted stack) unchanged in shape — same entrypoint swap.

## What's intentionally out of scope

- No switch to MDX-in-repo content. Strapi stays.
- No change to Strapi schema or import scripts (`cms/scripts/import-from-webflow-*.mjs`).
- No change to nginx config.
- No redesign — every page renders the same markup and styles.

## Decisions

1. **Freshness model**: SSR + `Cache-Control: public, s-maxage=60, stale-while-revalidate=300` on Fly. No rebuild-on-publish webhook.
2. **Hosting**: Fly.io, single app, `nrt` region, `auto_stop_machines = "suspend"`.
3. **Plausible**: drop `next-plausible`. Plain `<script defer data-domain="authgear.com" src="https://plausible.io/js/script.js">` in `BaseLayout.astro` + a `trackEvent(name, props)` helper that calls `window.plausible`. `PlausibleButton` / `PlausibleLink` remain React islands. No proxy needed — the current site loads Plausible directly from `plausible.io` (verified: nothing in `nginx/` proxies it, nothing in the app configures `next-plausible`'s `customDomain`).
4. **CSS import order**: `authgear-design-system.css` is imported exactly once at `frontend/app/layout.tsx:3` with no page-scoped overrides (verified by grep). Port as a single `import '../styles/authgear-design-system.css'` in `BaseLayout.astro`. No cascade risk.
5. **Google Tag Manager**: `@next/third-parties` is used only for `<GoogleTagManager gtmId="GTM-KTHFL6S" />` at `app/layout.tsx:65`. Replace with GTM's standard two-snippet install (head `<script>` + body `<noscript>` iframe) directly in `BaseLayout.astro`. Drop `@next/third-parties` from dependencies.

## Open questions

1. **Edge cache layer**: Fly doesn't have a built-in CDN. Options: (a) trust `Cache-Control` + the existing nginx in front, (b) add Cloudflare in front of Fly for global edge caching, (c) accept single-region latency since `nrt` covers the primary audience. Pick one before SWR matters at scale. Default: (a) — existing nginx is already in the topology.
2. **Fonts**: current setup uses `next/font/google` (PT_Sans, Inter, Red Hat Display) for self-hosting with CSS variables. Astro has no equivalent — either (a) add `@astrojs/font` (built-in Astro 5), (b) self-host via `fontsource` packages, or (c) keep the Google Fonts `<link>` already present in `<head>`. Recommend (a) for parity with the current self-hosted setup.
3. **`intl-tel-input`**: used inside `ContactForm`. Currently a runtime-imported package; confirm it still works cleanly as a React island under `client:load` (should, but flag for the migration).
