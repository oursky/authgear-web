# Frontend

This directory contains the Authgear marketing site built with Next.js 16, React 19, and TypeScript.

The site is a hybrid of:

- Webflow-exported page markup loaded from `../authgear-new.webflow`
- Strapi-backed CMS content fetched through `lib/strapi.ts`
- Localized routes under `app/[locale]` for English and Traditional Chinese

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

- `app/` contains App Router routes.
- `app/[locale]/...` contains localized versions of the marketing pages.
- `lib/webflow-page.ts` loads HTML from the Webflow export, strips shared wrappers, and rewrites asset and internal links.
- `content/navigation.json` holds header navigation copy (`en` / `zh-TW`); `lib/site-navigation.ts` renders it and applies localized paths.
- `lib/strapi.ts` fetches and normalizes Strapi 5 REST responses for the existing site components.
- `public/` stores Webflow assets such as CSS, JS, images, and documents.

## Editing content and pages

Use the right source depending on the page:

- Webflow-exported marketing pages: update the matching HTML file in `../authgear-new.webflow`, then verify the corresponding Next.js route.
- Pricing (`/pricing`, `/zh-TW/pricing`): React page in `app/[locale]/pricing/page.tsx` (English is rewritten from unprefixed URLs); copy in `lib/pricing/copy-*.ts` and `components/pricing/PricingPageClient.tsx`.
- CMS-driven collections such as blog posts, customer stories, integrations, login gallery items, team members, and what's new: update content in Strapi.
- Locale-aware behavior lives in `lib/i18n.ts`. Default English has no URL prefix (`/blog`); Traditional Chinese uses `/zh-TW/...`. Middleware rewrites unprefixed paths to internal `/en/...` (no Accept-Language redirect, so `/` stays English). `/zh-Hant-TW/...` and legacy `/zh/...` redirect to `/zh-TW/...`.

## Available scripts

```bash
npm run dev
npm run build
npm run start
```

## Related docs

- Root setup and deployment: `../README.md`
- Docker and deployment details: `../DEPLOY.md`
