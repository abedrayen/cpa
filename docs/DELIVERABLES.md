# CPA E-commerce – Deliverables

## 1. Database (Prisma schema)

**Location:** `apps/api/prisma/schema.prisma`

- **User:** id, email, password_hash, role (CUSTOMER | ADMIN), timestamps, soft delete
- **RefreshToken:** token, userId, expiresAt (for JWT refresh)
- **Category:** id, name, slug (unique), parent_id, sort_order, meta_title, meta_description, soft delete. Indexes: slug, parent_id+sort_order
- **Product:** id, category_id, name, slug (unique), description, specs (JSON), price, is_quote_only, stock, is_active, meta_title, meta_description, soft delete. Indexes: category_id, slug, is_active, created_at
- **ProductImage:** product_id, url, alt, sort_order
- **Order:** id, user_id (nullable), status (PENDING→CONFIRMED→COMPLETED→CANCELED), customer_*, notes, soft delete
- **OrderItem:** order_id, product_id, quantity, unit_price, specs snapshot

**Constraints:** Slug uniqueness (category, product). Foreign keys with Restrict/Cascade/SetNull as appropriate. All tables use created_at, updated_at; soft delete via deleted_at.

---

## 2. Backend (NestJS) – Module structure

```
src/
  app.module.ts          # Global prefix api/v1, JWT guard, Throttler
  main.ts                 # ValidationPipe, exception filter, logging
  prisma/                 # Global PrismaModule
  common/                 # decorators (Public, Roles, CurrentUser), filters, interceptors
  auth/                   # JWT strategy, guards, login/register/refresh
  products/               # DTOs, ProductsService, ProductsController (public)
  categories/             # DTOs, CategoriesService, CategoriesController (public)
  orders/                 # DTOs, OrdersService, OrdersController (public POST)
  admin/                  # Admin*Controllers (JWT + Roles(ADMIN)) for CRUD
```

---

## 3. API endpoints

**Base:** `GET/POST .../api/v1/...`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /auth/login | Public | Login, returns accessToken + refreshToken |
| POST | /auth/register | Public | Register (CUSTOMER only) |
| POST | /auth/refresh | Public | Body: refreshToken → new accessToken |
| GET | /categories/tree | Public | Category tree for nav/sitemap |
| GET | /categories/:slug | Public | Single category (with parent/children) |
| GET | /products | Public | Paginated list (query: page, limit, sort, order, search) |
| GET | /products/category/:categorySlug | Public | Products in category |
| GET | /products/:slug/related | Public | Related products by category |
| GET | /products/:slug | Public | Product by slug |
| POST | /orders | Public | Create order/quote (customerEmail, customerName, items[]) |
| GET | /admin/categories | Admin | Tree |
| GET/POST/PUT/DELETE | /admin/categories/:id or :slug | Admin | Category CRUD |
| GET | /admin/products | Admin | All products (incl. inactive) |
| GET | /admin/products/by-slug/:slug | Admin | Product by slug |
| GET/POST/PUT/DELETE | /admin/products/:id | Admin | Product CRUD |
| GET | /admin/orders | Admin | Orders (query: page, limit, status) |
| GET | /admin/orders/:id | Admin | Order detail |
| PATCH | /admin/orders/:id/status | Admin | Body: { status } |

---

## 4. Next.js folder structure

```
app/
  layout.tsx              # Root layout, metadata base
  page.tsx                 # SEO landing (H1, categories, featured products)
  globals.css
  not-found.tsx
  aluminium/
    page.tsx               # Aluminium index (category list)
    [[...slug]]/page.tsx   # Category or product page (resolve by slug)
  admin/
    layout.tsx             # AdminGuard (token check, sidebar)
    login/page.tsx         # Admin login
    page.tsx               # Dashboard
    categories/page.tsx
    products/page.tsx
    orders/page.tsx
  sitemap.ts               # Dynamic sitemap (categories + products)
  robots.ts                 # allow /, disallow /admin, sitemap URL
lib/
  api.ts                    # fetcher(), apiUrl()
  types.ts                  # Category, Product, Paginated
components/
  ProductCard, CategoryPage, ProductPage, OrderForm, AdminGuard
```

---

## 5. SEO strategy

- **URLs:** /aluminium, /aluminium/{category}, /aluminium/{parent}/{child}, /aluminium/{category}/{product-slug}. No query-based primary keys.
- **Metadata (Metadata API):** title (50–60 chars), description (140–160), canonical, OpenGraph, Twitter. Per-page in generateMetadata or static export.
- **Structured data:** Product (name, description, image, offers), BreadcrumbList on category/product pages.
- **Semantic HTML:** Single H1 per page, H2/H3 hierarchy, breadcrumb nav, accessible labels.
- **Images:** next/image, alt from product/category. Prefer WebP/AVIF via loader if configured.
- **Sitemap/robots:** sitemap.xml with home, /aluminium, category paths, product URLs. robots.txt allow /, disallow /admin.
- **Internal linking:** Landing → categories → products; product → category breadcrumb + related products (min 3).

---

## 6. Performance and Core Web Vitals

- **SSR:** SEO-critical pages (home, aluminium, category, product) use `force-dynamic` or default server rendering; data fetched in server components (no N+1: batch category tree + product list/related).
- **TTFB:** Single Prisma round-trips per request where possible; indexes on slug, category_id, deleted_at, is_active.
- **Caching:** API can add Cache-Control headers and Redis for GET /categories/tree, /products (short TTL). Next.js: revalidate or dynamic as chosen.
- **Images:** next/image with sizes; lazy load below fold.
- **JS:** Client components only for OrderForm, AdminGuard, admin pages; rest server components.
- **DB:** Indexes on slug, categoryId, (isActive, deletedAt), createdAt. No N+1 in list/detail (include category, images in one query).

---

## 7. Production readiness checklist

- [ ] Set DATABASE_URL, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET (min 32 chars), NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_API_URL
- [ ] Run Prisma migrations; seed admin user (db:seed), change default password
- [ ] HTTPS only; secure headers (X-Frame-Options, X-Content-Type-Options, etc.) – Next.js headers in next.config.js
- [ ] Rate limiting enabled (ThrottlerModule)
- [ ] Input validation (class-validator) and global ValidationPipe
- [ ] Passwords hashed with bcrypt (12 rounds)
- [ ] Admin routes protected (JWT + RolesGuard); admin UI under /admin (noindex)
- [ ] Error handling: global exception filter; no stack traces in client response
- [ ] Optional: Redis for session/cache; HTTP cache headers on public GET
