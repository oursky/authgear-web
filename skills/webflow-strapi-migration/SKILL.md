---
name: webflow-strapi-migration
description: >-
  Runs and explains Webflow → Strapi migration scripts in this repo (API import,
  CSV import). Use when importing CMS from Webflow into Strapi, migrating blog
  posts or collections, fixing publish dates, or when the user mentions
  cms/scripts, Webflow API, Webflow MCP, or Strapi import env vars.
---

# Webflow → Strapi migration (authgear-web)

## Webflow MCP (Cursor) vs these scripts

If **Webflow MCP** is connected in Cursor (Designer session), use it for **Webflow-side** work: CMS structure, bulk updates, audits, safe publish, etc. That does **not** write to Strapi by itself.

**Getting content into Strapi** still uses the scripts below (`import-from-webflow-api.mjs` or `import-from-webflow-csv.mjs`) with the documented env vars. Typical combo: prepare or fix content in Webflow (MCP or Designer), then run the API or CSV importer from `cms/`.

---

All commands below assume the shell **working directory is `cms/`** (the Strapi app root). Paths like `scripts/…` and `./data/…` in the script headers are written for that cwd. The HTML importer resolves the Webflow export via `../frontend/webflow` or `../authgear-new.webflow` relative to cwd, so running it from the repo root will break unless paths are adjusted.

**Shared Strapi env (most scripts):**

| Variable | Required | Default |
|----------|----------|---------|
| `STRAPI_URL` | No | `http://localhost:1337` |
| `STRAPI_ADMIN_TOKEN` | Yes (except dry-run where noted) | — |

Strapi Cloud: set `STRAPI_URL` to the Cloud URL and use a full-access API token.

---

## Which script to use

| Goal | Script |
|------|--------|
| Full CMS sync from Webflow (collections, images, relations, pagination) | `import-from-webflow-api.mjs` |
| One-off import from Designer CSV exports (no Webflow API token) | `import-from-webflow-csv.mjs` |

Typical order: run **API** (or **CSV**) for collections. The frontend static pages are currently served from the Webflow export, not Strapi single types.

---

## 1. `scripts/import-from-webflow-api.mjs`

**Webflow API v2 → Strapi** — discovers collections, imports in dependency order, uploads images, maps relation IDs.

**Env (required unless dry-run for Strapi token):**

- `WEBFLOW_API_TOKEN` — Webflow v2 token (Dashboard → Integrations → API Access)
- `WEBFLOW_SITE_ID` — site ID (Project Settings → General)
- `STRAPI_ADMIN_TOKEN` — Strapi full-access API token
- `STRAPI_URL` — optional, default `http://localhost:1337`

**Usage:**

```bash
cd cms
node scripts/import-from-webflow-api.mjs [--dry-run] [--collection <name>] [--inspect] [--fix-dates]
```

**Flags:**

- `--dry-run` — fetch Webflow only; no Strapi writes (`STRAPI_ADMIN_TOKEN` not required)
- `--collection <name>` — import only one Strapi-facing collection key (must match keys below)
- `--inspect` — log `fieldData` keys/sample for the first item per collection (debugging mappings)
- `--fix-dates` — **no full re-import**; patches `publishedAtOverride` on existing Strapi entries from Webflow `lastPublished`. Can combine with `--collection`

**Import order and valid `--collection` values** (Strapi endpoint keys; Webflow slugs may differ via `webflowSlug` in code):

1. `blog-categories` (Webflow: `post-category`)
2. `integration-categories` (Webflow: `integration-category`)
3. `team-members` (Webflow: `team`)
4. `blog-posts` (Webflow: `post`) — depends on blog categories
5. `integrations` — depends on integration categories
6. `customer-stories`
7. `login-gallery-items` (Webflow: `login-gallery`)
8. `whats-new-items` (Webflow: `whats-new`)

Blog posts: categories must exist in Strapi before posts (full import respects order; single `--collection blog-posts` assumes categories already imported).

---

## 2. `scripts/import-from-webflow-csv.mjs`

**Webflow CSV export → Strapi** — Designer → CMS → collection → Export CSV; map columns per collection.

**Env:** `STRAPI_ADMIN_TOKEN` (required); `STRAPI_URL` optional.

**Usage:**

```bash
cd cms
node scripts/import-from-webflow-csv.mjs --collection <name> --file ./data/<file>.csv
```

**Supported `--collection` values:** `blog-posts`, `blog-categories`, `customer-stories`, `integrations`, `integration-categories`, `login-gallery-items`, `whats-new-items`, `team-members`

CSV column headers must match the `FIELD_MAPS` keys in the script (Webflow export labels like `Name`, `Slug`, `Post Body`, etc.). Adjust `FIELD_MAPS` if Webflow renames columns.

**Note:** This path does not upload assets the way the API importer does; it is text/CSV oriented.

---

## Quick reference

```bash
cd cms
export STRAPI_ADMIN_TOKEN=...
export STRAPI_URL=https://your-strapi.example.com   # if not local

# API import (full or one collection)
export WEBFLOW_API_TOKEN=...
export WEBFLOW_SITE_ID=...
node scripts/import-from-webflow-api.mjs --dry-run
node scripts/import-from-webflow-api.mjs
node scripts/import-from-webflow-api.mjs --collection blog-posts
node scripts/import-from-webflow-api.mjs --fix-dates

# CSV per collection
node scripts/import-from-webflow-csv.mjs --collection blog-posts --file ./data/blog-posts.csv
```

For implementation details (field keys, `webflowSlug` overrides, date patching), read the script source under `cms/scripts/`.
