# Authgear Website — Next.js + Strapi

This is the **Authgear marketing website**, built with **Next.js** and **Strapi** (headless CMS).

## Tech stack

| Layer | Technology |
|--------|------------|
| **Site** | Next.js 16, React 19, TypeScript |
| **CMS** | Strapi 5 |
| **Local CMS (optional)** | Strapi + SQLite (`npm run develop` in `cms/`) |
| **Assets** | CSS/JS/images in `frontend/public/` |

---

## Strapi setup

1. Run Strapi from `cms/` (locally or via your deployment target).
2. In Strapi Admin → **Settings → API Tokens**, create a **read-only** token for the frontend (optional if Public role is enabled).
3. In **Settings → Users & Permissions → Roles → Public**, enable `find` / `findOne` for collections the website needs.

### Environment variables (frontend)

In `frontend/.env.local`, set:

```env
STRAPI_URL=https://your-strapi-url
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-url
STRAPI_API_TOKEN=your_read_only_token
```

Use the **same base URL** for both unless you intentionally split internal vs public URLs.

### Run the website locally

```bash
cd frontend
npm install
cp .env.local.example .env.local   # then edit with your Strapi URL + token
npm run dev
```

Open **http://localhost:3000**.

## Local Strapi without Docker (SQLite)

For schema work or imports against local Strapi:

```bash
cd cms
npm install
npm run develop
```

Uses **SQLite** by default—no local PostgreSQL required. Point `frontend/.env.local` at `http://localhost:1337` while testing.

SQLite DB path defaults to:

`cms/data/data.db`

This repo intentionally tracks `cms/data/data.db` so local CMS content can be versioned when needed.

**Next.js cannot read Strapi content until one of these is true:**

1. **Public API (typical for local dev):** In Strapi Admin go to **Settings → Users & Permissions → Roles → Public** and enable **find** and **findOne** for every collection the site uses (e.g. Customer Story, Blog Post, Blog Category, Integration, etc.).
2. **Or** set **`STRAPI_API_TOKEN`** in `frontend/.env.local` to a **read-only** API token (Settings → API Tokens).

The frontend expects **Strapi 5** REST responses; `frontend/lib/strapi.ts` normalizes them for the pages.

---

## Project layout

```
authgear-web/
├── frontend/              # Next.js 16 / React 19 / TypeScript site
│   ├── app/               # App Router routes (two trees: [locale]/... and thin wrappers)
│   ├── components/pages/  # Static marketing page components (about, features, compare, etc.)
│   ├── components/        # Shared UI components
│   ├── lib/               # strapi.ts, i18n.ts, site-navigation.ts, navigation-data.ts, pricing/
│   ├── messages/          # next-intl translation files (en.json, zh-TW.json)
│   └── public/            # Static assets (CSS, JS, images, documents)
└── cms/                   # Strapi 5 app (content types and local SQLite data)
```

---

## Importing CMS data from Webflow

To seed Strapi with existing Webflow CMS content (blog posts, customer stories, etc.):

1. **CSV import:** export collection CSVs from Webflow, then run `cms/scripts/import-from-webflow-csv.mjs`.
2. **API import:** pull directly from the Webflow API with `cms/scripts/import-from-webflow-api.mjs`.

Both scripts are documented in `cms/README.md`.

---

## Agent skills

Project-level skills live in `skills/` and are symlinked into each agent's config directory:

```
skills/                        # Source of truth (tracked in git)
└── plausible-event-tracking/  # Plausible analytics event tracking conventions
.claude/
└── skills -> ../skills        # Claude Code
.cursor/
└── skills -> ../skills        # Cursor
```

Skills are version-controlled once in `skills/`; each agent picks them up via its own symlink. To add a new skill, create a directory under `skills/`. To support a new agent, add a symlink from its config directory: `ln -s ../skills ./<agent-dir>/skills`.

---

## Docs

- **[frontend/README.md](./frontend/README.md)** — Frontend routes, env vars, and page/Strapi integration notes
- **[cms/README.md](./cms/README.md)** — Strapi content types, local development, and Webflow import scripts

---

## License

This repository does not currently declare a license.
