# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

This is the **Authgear marketing website** — originally a Webflow export, now fully migrated to Next.js + Strapi CMS.

```
authgear-web/
├── frontend/              # Next.js 16 / React 19 / TypeScript site
├── cms/                   # Strapi 5 CMS app
├── nginx/                 # Nginx configs
├── docker-compose.yml              # Strapi Cloud: Next.js + Nginx only
└── docker-compose.selfhosted.yml   # Full stack: + PostgreSQL + Strapi container
```

### Page Model

All pages are native React server components. There are two categories:

1. **Static marketing pages** — React components in `frontend/components/pages/`. These render JSX directly (no Webflow HTML wrappers). To update copy or layout, edit the corresponding component file.

2. **Dynamic CMS pages** — Blog posts, customer stories, integrations, login gallery, team members, and what's new items are stored in Strapi and fetched via `frontend/lib/strapi.ts`. These are React components built from scratch.

### Routing / i18n

- English is the default locale — served at unprefixed URLs (`/blog`, `/pricing`)
- Traditional Chinese uses `/zh-TW/...` prefix
- Middleware (`frontend/middleware.ts`) rewrites unprefixed paths to internal `/en/...` and sets `x-locale` header; no Accept-Language redirect
- The App Router has two parallel route trees: `app/[locale]/...` (canonical) and `app/...` (thin wrappers that redirect or re-export)
- Path locale `zh-TW` maps to Strapi locale `zh-Hant-TW` via `pathLocaleToStrapiLocale()`
- Legacy `/zh/...` and `/zh-Hant-TW/...` permanently redirect (308) to `/zh-TW/...`

### Strapi Integration

`frontend/lib/strapi.ts` wraps Strapi 5 REST API. Key points:
- Strapi 5 returns flat entries; the app expects Strapi 4's `{ id, attributes }` shape — `normalizeStrapiPayload()` adapts them
- Blog posts use `publishedAtOverride` for manual date override; listing order is computed client-side (Strapi can't sort by COALESCE)
- Responses are cached 60s via `next: { revalidate: 60 }`
- During Docker build when Strapi is unavailable, network errors return empty data (build succeeds)

### Navigation & Footer

Nav and footer HTML are generated server-side from typed data in `frontend/lib/navigation-data.ts` by `frontend/lib/site-navigation.ts` and injected in `frontend/app/layout.tsx` via `dangerouslySetInnerHTML`. Link labels support multiple locales via `link.label[locale] ?? link.label['en']`. The root layout also injects Webflow CSS, jQuery, Webflow JS, cookie consent, and analytics scripts.

## Development Commands

### Frontend (Next.js)

```bash
cd frontend
npm install
cp .env.local.example .env.local   # edit with Strapi Cloud URL + token
npm run dev        # http://localhost:3000
npm run build
npm run start
```

### CMS (Strapi — local SQLite, optional)

```bash
cd cms
npm install
cp .env.example .env
npm run develop    # http://localhost:1337/admin
```

### Docker (Strapi Cloud stack — default)

```bash
cp .env.example .env   # set STRAPI_URL, NEXT_PUBLIC_STRAPI_URL, STRAPI_API_TOKEN
docker compose up --build -d
```

## Environment Variables (frontend)

Set in `frontend/.env.local`:

```env
STRAPI_URL=https://your-project.strapiapp.com
NEXT_PUBLIC_STRAPI_URL=https://your-project.strapiapp.com
STRAPI_API_TOKEN=your_read_only_token
CONTACT_WEBHOOK_URL=
```

`STRAPI_API_TOKEN` can be omitted if Strapi Public role has `find`/`findOne` enabled for all collections.

## Important Notes

- **Next.js 16 has breaking changes** — read `node_modules/next/dist/docs/` before writing any Next.js code. Heed deprecation notices. (See `frontend/AGENTS.md`.)
- When editing Strapi-backed content (blog, customer stories, integrations, etc.), the source of truth is Strapi — not local files.
- When editing static marketing pages, the source of truth is the React component in `frontend/components/pages/`.
- Pricing page (`app/[locale]/pricing/`): structured data (plans, comparison table, FAQ) lives in `frontend/lib/pricing/copy-en.ts`; UI strings are in `frontend/messages/en.json` under the `Pricing` namespace.
- `populate: '*'` is valid for Strapi 5 first-level relations; comma-separated field names for populate are **invalid** in Strapi v5 (use nested populate query strings instead).

## Webflow → Strapi Import Scripts

Run from `cms/` directory:

```bash
cd cms

# From Webflow API
node scripts/import-from-webflow-api.mjs --dry-run
node scripts/import-from-webflow-api.mjs --collection blog-posts

# From CSV export
node scripts/import-from-webflow-csv.mjs --collection blog-posts --file ./data/blog-posts.csv
```

Required env: `STRAPI_ADMIN_TOKEN` (full-access), `STRAPI_URL`. API import also needs `WEBFLOW_API_TOKEN` and `WEBFLOW_SITE_ID`.
