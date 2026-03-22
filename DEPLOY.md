# Deployment Guide

There are **two** Docker paths:

| File | Strapi | Database | Use case |
|------|--------|----------|----------|
| `docker-compose.yml` | **Strapi Cloud** (hosted) | Managed by Strapi | Default; no local SQL |
| `docker-compose.selfhosted.yml` | Container `cms` | PostgreSQL container | Full self-hosting |

---

## A) Strapi Cloud + Docker (default)

Stack: **Next.js** + **Nginx** only. The CMS and DB are on Strapi Cloud.

### 1. Environment

```bash
cp .env.example .env
```

Set at minimum:

| Variable | Required | Description |
|----------|----------|-------------|
| `STRAPI_URL` | yes | Strapi Cloud API base URL |
| `NEXT_PUBLIC_STRAPI_URL` | yes | Same as `STRAPI_URL` in most setups |
| `STRAPI_API_TOKEN` | yes | Read-only API token from Strapi Admin |

You do **not** need `POSTGRES_PASSWORD` or `STRAPI_APP_KEYS` for this compose file.

### 2. Start

```bash
docker compose up --build -d
```

- Website: http://localhost (Nginx) or http://localhost:3000  
- Strapi Admin: your **cloud** project URL (not localhost)

### 3. Nginx note

`nginx/nginx-cloud.conf` only proxies to Next.js. `/api`, `/admin`, and `/uploads` are **not** routed locally; the Next.js server and browser talk to Strapi Cloud using the URLs above.

---

## B) Self-hosted Strapi + PostgreSQL

Stack: **PostgreSQL** + **Strapi** + **Next.js** + **Nginx** (same as the original all-in-one setup).

### 1. Environment

```bash
cp .env.example .env
```

Fill **all** Strapi secrets and PostgreSQL password (see table in `.env.example`).

### 2. Start

```bash
docker compose -f docker-compose.selfhosted.yml up --build -d
```

### 3. First-time Strapi

1. http://localhost:1337/admin — create admin user  
2. Settings → API Tokens — read-only token for the frontend  
3. Put token in `.env` as `STRAPI_API_TOKEN`  
4. Settings → Users & Permissions → Public — enable `find` / `findOne` as needed  
5. `docker compose -f docker-compose.selfhosted.yml restart frontend`

Nginx uses `nginx.conf` + `conf.d/proxy.conf` (proxies `/api`, `/admin`, `/uploads` to Strapi).

---

## Production (SSL)

1. Place certs under `nginx/certs/`.  
2. Uncomment the HTTPS server block in the active nginx config (`nginx-cloud.conf` or `nginx.conf`).  
3. Rebuild/restart the stack you use.

For Strapi Cloud, set `NEXT_PUBLIC_STRAPI_URL` to your **public** Strapi URL (HTTPS).

---

## Useful commands

**Strapi Cloud stack**

```bash
docker compose logs -f frontend
docker compose down
```

**Self-hosted stack**

```bash
docker compose -f docker-compose.selfhosted.yml logs -f
docker compose -f docker-compose.selfhosted.yml down
docker compose -f docker-compose.selfhosted.yml down -v   # destroys DB volume
```

---

## Importing Webflow CSVs

See `cms/scripts/import-from-webflow-csv.mjs`. Point `STRAPI_URL` / token at Cloud or local Strapi.
