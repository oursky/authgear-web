# Frontend

This directory contains the Authgear marketing site built with Next.js 16, React 19, and TypeScript.

All pages are native React server components:

- **Static marketing pages** — components in `components/pages/` (about, features, compare, solutions, go, events, campaign, tools, home, and more)
- **Dynamic CMS pages** — blog posts, customer stories, integrations, etc., fetched from Strapi via `lib/strapi.ts`
- **Localized routes** under `app/[locale]/` for English (`en`) and Traditional Chinese (`zh-TW`)

## Run locally

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Set these in `frontend/.env.local`:

```env
STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=
CONTACT_WEBHOOK_URL=
```

Notes:

- For Strapi Cloud, use your cloud base URL for both `STRAPI_URL` and `NEXT_PUBLIC_STRAPI_URL`.
- `STRAPI_API_TOKEN` can be left empty only if the Strapi Public role allows `find` and `findOne` on the collections the site reads.

## How the frontend is organized

- `app/[locale]/...` — canonical localized routes; `app/...` — thin English wrappers (redirect or re-export).
- `components/pages/` — one component per static marketing page (or per slug group for features, compare, etc.).
- `lib/navigation-data.ts` — typed nav/footer link data with per-locale labels; `lib/site-navigation.ts` renders it to HTML injected by the root layout.
- `lib/strapi.ts` — fetches and normalizes Strapi 5 REST responses.
- `lib/i18n.ts` — `LOCALES`, `localizedPath()`, locale mapping helpers.
- `messages/` — next-intl translation files (`en.json`, `zh-TW.json`). See `messages/README.md` for how to add a locale.
- `public/` — static assets: CSS, JS, images, documents.

## Editing content and pages

Use the right source depending on the page:

- **Static marketing pages** (about, features, compare, solutions, home, tools, etc.): edit the React component in `components/pages/`.
- **Translatable strings**: edit `messages/en.json` and `messages/zh-TW.json`. Components use `getTranslations({ locale, namespace })` from next-intl.
- **Pricing page** (`/pricing`, `/zh-TW/pricing`): structured data (plans, comparison table, FAQ) lives in `lib/pricing/copy-en.ts`; UI strings are in `messages/en.json` under the `Pricing` namespace; rendered by `components/pricing/PricingPageView.tsx`.
- **CMS-driven collections** (blog posts, customer stories, integrations, login gallery, team members, what's new): update content in Strapi.
- **Nav / footer**: edit `lib/navigation-data.ts`.
- **Locale routing**: default English has no URL prefix (`/blog`); Traditional Chinese uses `/zh-TW/...`. Middleware rewrites unprefixed paths to `/en/...` internally. `/zh-Hant-TW/...` and legacy `/zh/...` redirect (308) to `/zh-TW/...`.

## Available scripts

```bash
npm run dev
npm run build
npm run start
```

## Related docs

- Root setup and deployment: `../README.md`
- Docker and deployment details: `../DEPLOY.md`
