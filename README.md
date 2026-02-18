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
cp .env.local.example .env.local
# Set NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1, NEXT_PUBLIC_SITE_URL if needed
npm install
npm run dev             # http://localhost:3000
```

### 3. From root (optional)

```bash
npm install
npm run db:generate     # Prisma generate in api
npm run dev             # turbo dev (both apps)
```

## Main URLs

- **Site:** / (landing), /products (all products), /products/{slug} (product page)
- **Admin:** /admin/login, /admin (dashboard, categories, products, orders)
- **API:** http://localhost:3001/api/v1 (products, categories, orders, auth, admin)

admin@cpa.local / ChangeMeInProduction!

## Production (PM2)

1. **API**
   - `UPLOAD_DIR` is **required**. Set it to a path the process can write to (e.g. `uploads` relative to app, or absolute like `/home/sirayen/cpa/apps/api/uploads`).
   - Set `API_PUBLIC_URL` to the public API base URL (e.g. `https://api.comptoirpro.shop`) so uploaded image URLs are correct and use HTTPS.
   - Create the directory and fix permissions: `mkdir -p uploads && chown $USER uploads` (from `apps/api`).
   - Do **not** set `UPLOAD_DIR=/var/app` unless that directory exists and is writable by the app user.
   - Build and run: `cd apps/api && npm run build && node dist/main` (or use the ecosystem file below).

2. **Web**
   - Build from `apps/web`: `cd apps/web && npm run build`. Then run `next start` with **cwd** = `apps/web` so `.next` and `node_modules` are found (avoids MODULE_NOT_FOUND).

3. **PM2 from repo root**
   - `pm2 start ecosystem.config.cjs`
   - The included ecosystem file sets `cpa-api` cwd to `apps/api`, script to `dist/main.js`, and `UPLOAD_DIR=uploads`. It sets `next-frontend` cwd to `apps/web` and runs `next start` from there. Adjust `env.UPLOAD_DIR` in `ecosystem.config.cjs` if you use an absolute path.

## Docs

See [docs/DELIVERABLES.md](docs/DELIVERABLES.md) for schema, API list, SEO and performance notes, and production checklist.
