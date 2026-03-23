# CMS

This directory contains the Strapi 5 app for Authgear website content.

The CMS is used for collections such as:

- `blog-post`
- `blog-category`
- `customer-story`
- `integration`
- `integration-category`
- `login-gallery-item`
- `team-member`
- `whats-new-item`

For everyday development, Strapi Cloud is the recommended backend. Local Strapi is still useful for schema work, testing imports, and offline development.

## Run locally

```bash
cd cms
npm install
cp .env.example .env
npm run develop
```

By default, local development uses SQLite and serves Strapi at [http://localhost:1337/admin](http://localhost:1337/admin).

## Frontend access

The frontend can read content in either of these ways:

- Enable `find` and `findOne` for the needed collections in Strapi Admin under `Settings -> Users & Permissions -> Roles -> Public`
- Or give the frontend a read-only `STRAPI_API_TOKEN`

## Available scripts

```bash
npm run develop
npm run dev
npm run build
npm run start
npm run console
npm run deploy
npm run upgrade
npm run upgrade:dry
```

## Importing content from Webflow

### Webflow MCP (optional)

If you use **Cursor with Webflow MCP** and a connected Webflow Designer session, you can drive Webflow-side tasks from the IDE (e.g. CMS updates, audits, publishing workflows). That stays in Webflow; it does **not** populate Strapi.

To load Webflow CMS data into this Strapi app, use one of the scripts below (same as a manual Designer + API token or CSV export workflow).

### Scripts

Two migration scripts live in `scripts/`:

### 1. Import from Webflow API

Reads CMS items directly from the Webflow API and writes them into Strapi.

Required environment variables:

```env
WEBFLOW_API_TOKEN=
WEBFLOW_SITE_ID=
STRAPI_ADMIN_TOKEN=
STRAPI_URL=http://localhost:1337
```

Example:

```bash
node scripts/import-from-webflow-api.mjs --dry-run
node scripts/import-from-webflow-api.mjs --collection blog-posts
```

### 2. Import from Webflow CSV export

Imports a single exported collection CSV into Strapi.

Required environment variables:

```env
STRAPI_ADMIN_TOKEN=
STRAPI_URL=http://localhost:1337
```

Example:

```bash
node scripts/import-from-webflow-csv.mjs --collection blog-posts --file ./data/blog-posts.csv
```

Supported collection names:

- `blog-posts`
- `blog-categories`
- `customer-stories`
- `integrations`
- `integration-categories`
- `login-gallery-items`
- `whats-new-items`
- `team-members`

## Strapi Cloud notes

- In Strapi Cloud, set the app base directory to `cms`
- Create API tokens from Strapi Admin under `Settings -> API Tokens`
- Point the frontend's `STRAPI_URL` and `NEXT_PUBLIC_STRAPI_URL` at your cloud project URL

## Related docs

- Root project overview: `../README.md`
- Deployment details: `../DEPLOY.md`
