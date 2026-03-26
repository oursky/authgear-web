# Authgear Website — Next.js + Strapi

This is the **Authgear marketing website**, built with **Next.js** and **Strapi** (headless CMS). **Strapi Cloud** is the default for the CMS and database—you do **not** need local PostgreSQL or a local Strapi Docker service for day-to-day development with Cloud.

## Tech stack

| Layer | Technology |
|--------|------------|
| **Site** | Next.js 16, React 19, TypeScript |
| **CMS** | Strapi 5 ([Strapi Cloud](https://cloud.strapi.io) recommended) |
| **Local CMS (optional)** | Strapi + SQLite (`npm run develop` in `cms/`) |
| **Self-hosted stack (optional)** | Docker: Next.js + Nginx + Strapi + PostgreSQL |
| **Assets** | CSS/JS/images in `frontend/public/` |

---

## Strapi Cloud (recommended)

1. Create a project in [Strapi Cloud](https://cloud.strapi.io) and connect this Git repo. Set the Strapi app **base directory** to **`cms`** (monorepo).
2. Strapi Cloud will build from **`cms/`** (same content types as in `cms/src/api/`).
3. In Strapi Admin → **Settings → API Tokens**, create a **read-only** token for the frontend.
4. In **Settings → Users & Permissions → Roles → Public**, enable `find` / `findOne` for the collections the website needs.

### Environment variables (frontend)

In `frontend/.env.local` (local) or root `.env` (Docker), set:

```env
STRAPI_URL=https://your-project.strapiapp.com
NEXT_PUBLIC_STRAPI_URL=https://your-project.strapiapp.com
STRAPI_API_TOKEN=your_read_only_token
```

Use the **same base URL** for both unless you intentionally split internal vs public URLs.

### Run the website locally (Strapi on Cloud)

```bash
cd frontend
npm install
cp .env.local.example .env.local   # then edit with Cloud URL + token
npm run dev
```

Open **http://localhost:3000**. Admin and API live on Strapi Cloud, not on your machine.

---

## Docker Compose (Strapi Cloud)

Runs **Next.js + Nginx** only. No local SQL, no local Strapi container.

```bash
cp .env.example .env
# Set STRAPI_URL, NEXT_PUBLIC_STRAPI_URL, STRAPI_API_TOKEN (Strapi Cloud)

docker compose up --build -d
```

- Site: **http://localhost** (Nginx) or **http://localhost:3000** (Next directly)
- Strapi Admin: use your **Strapi Cloud** dashboard URL (not localhost)

---

## Self-hosted Strapi + PostgreSQL (optional)

If you want the full stack on your own servers (no Strapi Cloud):

```bash
cp .env.example .env
# Fill POSTGRES_PASSWORD, STRAPI_APP_KEYS, STRAPI_* secrets, STRAPI_ENCRYPTION_KEY, etc.

docker compose -f docker-compose.selfhosted.yml up --build -d
```

- Site: **http://localhost**
- Strapi: **http://localhost:1337/admin**
- Nginx proxies `/api`, `/admin`, `/uploads` to the local Strapi container.

---

## Local Strapi without Docker (SQLite)

For schema work or imports without Cloud:

```bash
cd cms
npm install
npm run develop
```

Uses **SQLite** by default—no local PostgreSQL required. Point `frontend/.env.local` at `http://localhost:1337` while testing.

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
├── cms/                   # Strapi 5 app (content types; use with Cloud, local dev, or self-hosted)
├── nginx/                 # Nginx configs (cloud = frontend-only proxy; self-hosted = + Strapi)
├── docker-compose.yml              # Strapi Cloud: Next.js + Nginx only
└── docker-compose.selfhosted.yml   # Full stack: + PostgreSQL + Strapi container
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

- **[DEPLOY.md](./DEPLOY.md)** — Docker, env vars, SSL
- **[frontend/README.md](./frontend/README.md)** — Frontend routes, env vars, and page/Strapi integration notes
- **[cms/README.md](./cms/README.md)** — Strapi content types, local development, and Webflow import scripts

---

## License

This repository does not currently declare a license.
