# CPA E-commerce

Monorepo: NestJS API + Next.js frontend, SEO and performance oriented.

## Prerequisites

- Node 20+
- PostgreSQL
- npm (or pnpm)

## Setup

### 1. API

```bash
cd apps/api
cp .env.example .env
# Edit .env: DATABASE_URL, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET (min 32 chars)
npm install
npx prisma generate
npm run db:migrate       # use project Prisma 5 (do not use `npx prisma` – it may install Prisma 7 and break)
npx prisma db seed      # admin user + Catalogue category + 6 TND products
npm run dev             # http://localhost:3001
```

### 2. Web

```bash
cd apps/web
cp .env.local.example .env.local   # optional: for overrides
npm install
npm run dev             # http://localhost:3000
```

- **Same-origin (default):** Frontend and API share one domain. Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://comptoirpro.shop` or `https://comptoirpro.tn`) so the app uses `{SITE_URL}/api/v1` as the API. Next rewrites `/api/v1/*` to the backend (use `BACKEND_URL` if the API is not on `http://localhost:3001`).
- **Local dev:** With both apps running, the default is relative `/api/v1`; Next proxies to the API. To point at a separate API URL, set `NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1`.

### 3. From root (optional)

```bash
npm install
npm run db:generate     # Prisma generate in api
npm run dev             # turbo dev (both apps)
```

## Main URLs

- **Site:** / (landing), /products (all products), /products/{slug} (product page)
- **Admin:** /admin/login, /admin (dashboard, categories, products, orders)
- **API (same-origin):** `{site}/api/v1` (e.g. https://comptoirpro.shop/api/v1). Local: http://localhost:3000/api/v1 (proxied to Nest)

admin@cpa.local / ChangeMeInProduction!

## Production (PM2) — same-origin

**Architecture:** Frontend and API on the same domain (e.g. https://comptoirpro.shop and https://comptoirpro.shop/api/v1). Use a reverse proxy (e.g. nginx) to route `/` to Next and `/api/v1` to the Nest app, or run Next with rewrites and set `BACKEND_URL` to the internal API URL.

1. **API**
   - `UPLOAD_DIR` is **required**. Set it to a path the process can write to (e.g. `uploads` relative to app, or absolute).
   - Set `API_PUBLIC_URL` to the **site origin** (e.g. `https://comptoirpro.shop` or `https://comptoirpro.tn`) so uploaded image URLs are same-origin (`{API_PUBLIC_URL}/api/v1/uploads/...`).
   - Create the directory and fix permissions: `mkdir -p uploads && chown $USER uploads` (from `apps/api`).
   - Build and run: `cd apps/api && npm run build && node dist/main` (or use the ecosystem file below).

2. **Web**
   - Set `NEXT_PUBLIC_SITE_URL` to the public site URL (e.g. `https://comptoirpro.shop` or `https://comptoirpro.tn`). The app will use `{SITE_URL}/api/v1` as the API (no CORS).
   - Build: `cd apps/web && npm run build`. Run `next start` with **cwd** = `apps/web`.

3. **PM2 from repo root**
   - `pm2 start ecosystem.config.cjs`
   - Set `API_PUBLIC_URL` and (for Next) `NEXT_PUBLIC_SITE_URL` in env or `env_production` to match the deployed domain.

## Docs

See [docs/DELIVERABLES.md](docs/DELIVERABLES.md) for schema, API list, SEO and performance notes, and production checklist.
