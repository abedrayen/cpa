# CPA Aluminium E-commerce

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
npx prisma migrate dev   # or db push for dev
npx prisma db seed      # creates admin@cpa.local / ChangeMeInProduction!
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

- **Site:** / (landing), /aluminium (catalogue), /aluminium/{category}/{product}
- **Admin:** /admin/login, /admin (dashboard, categories, products, orders)
- **API:** http://localhost:3001/api/v1 (products, categories, orders, auth, admin)

## Docs

See [docs/DELIVERABLES.md](docs/DELIVERABLES.md) for schema, API list, SEO and performance notes, and production checklist.
