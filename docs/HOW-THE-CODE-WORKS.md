# How the code works

This document explains how the CPA e-commerce codebase is structured and how data flows from the database to the user’s screen. It assumes you are new to NestJS and Next.js.

---

## 1. Overview: two apps in one project

The project is a **monorepo** with two applications:

| App | Technology | Role |
|-----|------------|------|
| **API** | NestJS | Backend: database, auth, business logic. Exposes REST endpoints and returns JSON. |
| **Web** | Next.js | Frontend: pages users see. Fetches data from the API and renders HTML. |

They communicate over **HTTP**: the web app calls the API (e.g. `GET /api/v1/products`) and uses the JSON response to render pages or update the UI.

```
┌─────────────────────────────────────────────────────────────────┐
│  USER'S BROWSER                                                  │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  Next.js (apps/web)                                         │ │
│  │  • Renders pages: /, /products, /products/xyz, /admin/…     │ │
│  │  • When it needs data, it calls the API with fetch()         │ │
│  └──────────────────────────┬──────────────────────────────────┘ │
└─────────────────────────────┼────────────────────────────────────┘
                              │ HTTP (GET /products, POST /orders…)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  NestJS API (apps/api)                                           │
│  • Listens on routes like /api/v1/products, /api/v1/orders       │
│  • Uses Prisma to read/write the database                        │
│  • Returns JSON                                                  │
└──────────────────────────┬──────────────────────────────────────┘
                            │
                            ▼
                    ┌───────────────┐
                    │  PostgreSQL   │
                    │  (database)   │
                    └───────────────┘
```

---

## 2. The API (NestJS) – `apps/api/`

NestJS is a **Node.js framework for building APIs**. You define **routes** (URL + HTTP method), **services** (business logic and database access), and **guards** (e.g. “require admin”).

### 2.1 Entry point and config

- **`src/main.ts`**
  - Starts the app.
  - Sets **global prefix** `api/v1` → all routes are under `/api/v1/...`.
  - Enables **CORS** (allowed origins from `CORS_ORIGIN` or localhost).
  - Applies **ValidationPipe** (validates and transforms request bodies).
  - Registers global **exception filter** and **logging interceptor**.

- **`src/app.module.ts`**
  - Root module: imports **ThrottlerModule** (rate limiting) and all feature modules (auth, products, categories, orders, admin, prisma).

### 2.2 Folder structure and roles

| Path | Role |
|------|------|
| **`prisma/`** | Database schema (`schema.prisma`), migrations, seed script. |
| **`src/prisma/`** | PrismaService: injectable client used in services to query the DB. |
| **`src/products/`** | Products: controller (routes), service (DB logic), DTOs (create/update/query). |
| **`src/categories/`** | Categories: controller, service, DTOs. |
| **`src/orders/`** | Orders: create order, list; controller, service, DTOs. |
| **`src/auth/`** | Login, JWT issue/validate, guards (JwtAuthGuard, RolesGuard). |
| **`src/admin/`** | Admin-only controllers: products CRUD, categories CRUD, orders list/detail. |
| **`src/common/`** | Shared decorators (`@Public()`, `@Roles()`, `@CurrentUser()`), filters, interceptors. |

### 2.3 How a request becomes a DB query (example: list products)

1. Request: `GET /api/v1/products?limit=20`
2. **ProductsController** (`src/products/products.controller.ts`) has a method bound to `GET /products` (with prefix: `/api/v1/products`). It receives query params.
3. The method calls **ProductsService** (`src/products/products.service.ts`), e.g. `findAll(query)`.
4. The service uses **Prisma**: `this.prisma.product.findMany({ where, skip, take, orderBy, include: { category, images } })`.
5. The service returns the list (and total count); the controller sends it as JSON.

So the flow is: **HTTP request → Controller → Service → Prisma → Database → JSON response**.

### 2.4 Auth: public vs admin

- **Public routes**  
  Marked with `@Public()`. No token required.  
  Examples: `GET /products`, `GET /products/:slug`, `POST /orders`, `POST /auth/login`.

- **Admin routes**  
  Under `src/admin/`. Protected by:
  - **JwtAuthGuard**: reads `Authorization: Bearer <token>`, validates JWT.
  - **RolesGuard**: checks that the user has role `ADMIN`.

Login: `POST /auth/login` with `{ email, password }`. The API returns `{ accessToken, ... }`. The frontend stores the token and sends it in the `Authorization` header for every admin request.

### 2.5 Database (Prisma)

- **`prisma/schema.prisma`**  
  Defines **models** (tables): User, Category, Product, ProductImage, Order, OrderItem, RefreshToken. Each has fields, relations, and indexes.

- **Prisma in code**  
  Services inject **PrismaService** and call e.g. `this.prisma.product.findMany()`, `this.prisma.order.create({ data: { ... } })`.

- **Migrations**  
  `prisma migrate` updates the real database to match the schema.

- **Seed**  
  `prisma db seed` runs `prisma/seed.ts` to create an admin user, a default category, and sample products.

---

## 3. The Web app (Next.js) – `apps/web/`

Next.js is a **React framework**. **Routing is file-based**: the folder structure under `app/` defines the URLs.

### 3.1 Routing (App Router)

| URL | File |
|-----|------|
| `/` | `app/page.tsx` |
| `/products` | `app/products/page.tsx` |
| `/products/coffre-xxx` | `app/products/[slug]/page.tsx` (dynamic segment) |
| `/admin` | `app/admin/page.tsx` |
| `/admin/products` | `app/admin/products/page.tsx` |
| `/admin/products/new` | `app/admin/products/new/page.tsx` |
| `/admin/products/:id/edit` | `app/admin/products/[id]/edit/page.tsx` |
| `/aluminium` | `app/aluminium/page.tsx` (redirects to `/products`) |
| `/aluminium/...` | `app/aluminium/[[...slug]]/page.tsx` (redirects to `/products` or `/products/:slug`) |

- **`app/layout.tsx`**  
  Root layout: wraps every page. Sets default metadata (title, description, Open Graph), and the `<html>` / `<body>` structure.

- **`app/not-found.tsx`**  
  Rendered when no route matches (404).

### 3.2 Where the code lives

| Path | Role |
|------|------|
| **`app/page.tsx`** | Home: hero, featured products, trust section. |
| **`app/products/page.tsx`** | Product list: fetches all products from API, renders grid. |
| **`app/products/[slug]/page.tsx`** | Product detail: fetches one product by slug, renders ProductPage + related. |
| **`app/admin/*`** | Admin UI: dashboard, categories, products (list/create/edit), orders, login. Most pages are client components that fetch from the API. |
| **`app/api/upload/route.ts`** | Next.js API route: POST receives a file, saves to `public/media`, returns the public URL. |
| **`app/globals.css`** | Global styles and CSS variables (colors, layout). |
| **`app/sitemap.ts`** | Dynamic sitemap (home, /products, /products/[slug]). |
| **`app/robots.ts`** | Robots.txt. |
| **`components/`** | Reusable React components: SiteHeader, ProductCard, ProductPage, OrderForm, admin (Breadcrumbs, Toast, ConfirmDialog, ProductForm). |
| **`lib/api.ts`** | `fetcher()` and `apiUrl()`: base URL from `NEXT_PUBLIC_API_URL`, used to call the NestJS API. |
| **`lib/types.ts`** | Shared TypeScript types (Category, Product, Order, etc.). |

### 3.3 How the web app gets data

**Server-side (SSR)**  
Pages that are **async** and use `fetch` (or `fetcher`) run that code **on the server** before sending HTML. Example:

```ts
// app/products/page.tsx
export default async function ProductsPage() {
  const { data: products } = await fetcher('/products?limit=100');
  return ( ... list of ProductCards ... );
}
```

So when a user opens `/products`, Next.js calls the API, gets JSON, and renders the page once with data. Good for SEO and first load.

**Client-side**  
Admin pages use `'use client'`, `useState`, and `useEffect`, and call `fetch(NEXT_PUBLIC_API_URL + '/admin/...')` in the browser after the page has loaded. The token is read from `localStorage` and sent in the `Authorization` header.

### 3.4 Calling the API

- **Base URL**  
  Set in env: `NEXT_PUBLIC_API_URL` (e.g. `http://localhost:3001/api/v1`). Used in `lib/api.ts` and in admin/order form fetch calls.

- **`lib/api.ts`**  
  - `fetcher(path)` → `GET` to `NEXT_PUBLIC_API_URL + path`, returns parsed JSON, throws on non-OK.  
  - Used in **server components** (page.tsx) to load products, categories, product by slug, etc.

- **Admin and forms**  
  Use raw `fetch(NEXT_PUBLIC_API_URL + '/admin/products', { ... })` with method, headers (e.g. `Authorization: Bearer ...`), and body.

---

## 4. End-to-end examples

### 4.1 User opens the home page

1. Browser requests `/`.
2. Next.js runs `app/page.tsx` on the server.
3. The page calls `fetcher('/products?limit=8')` → HTTP GET to `NEXT_PUBLIC_API_URL/products?limit=8`.
4. NestJS handles `GET /api/v1/products?limit=8` → ProductsController → ProductsService.findAll() → Prisma → JSON.
5. Next.js receives the JSON and renders the home page with the product list.
6. Browser receives the full HTML and displays it.

### 4.2 User opens a product page

1. Browser requests `/products/coffre-en-tunnel-poly-fini-25cm`.
2. Next.js runs `app/products/[slug]/page.tsx` with `params.slug = 'coffre-en-tunnel-poly-fini-25cm'`.
3. The page calls `fetcher('/products/coffre-en-tunnel-poly-fini-25cm')` and optionally `fetcher('/products/.../related?limit=4')`.
4. NestJS returns one product and related products.
5. Next.js renders the ProductPage component (description, price, images, order form, related products).

### 4.3 User submits an order (quote request)

1. User fills the form on a product page (name, email, phone, quantity, notes).
2. Client-side: OrderForm calls `fetch(NEXT_PUBLIC_API_URL + '/orders', { method: 'POST', body: JSON.stringify({ customerEmail, customerName, customerPhone, notes, items: [{ productId, quantity }] }) })`.
3. NestJS: OrdersController receives POST, OrdersService creates Order + OrderItems in the DB.
4. API returns success; the form shows a success message.

### 4.4 Admin adds a product

1. Admin is on `/admin/products/new`, fills name, slug, category, description, price, images, etc.
2. On submit, client code sends `POST /api/v1/admin/products` with `Authorization: Bearer <token>` and the product payload.
3. NestJS: JwtAuthGuard and RolesGuard validate the token and role; AdminProductsController calls ProductsService.create(); Prisma inserts Product (and ProductImages).
4. API returns the created product; the frontend redirects to the product list or shows a toast.

### 4.5 Image upload (admin)

1. Admin chooses a file in the product form.
2. Client sends the file to **Next.js** (not NestJS): `POST /api/upload` with FormData.
3. `app/api/upload/route.ts` validates extension, saves the file under `public/media/`, returns `{ url: '/media/filename.jpg' }`.
4. The form stores that URL and sends it in the product create/update payload to the NestJS API. The API stores the image URL in the database (ProductImage).

---

## 5. Glossary

| Term | Meaning in this project |
|------|--------------------------|
| **API** | The NestJS app; base path `/api/v1`. Returns JSON. |
| **Route** | A URL path + HTTP method. In NestJS: controller method. In Next.js: file under `app/`. |
| **Controller** | NestJS class that maps HTTP routes to methods. |
| **Service** | NestJS class that contains business logic and uses Prisma. |
| **DTO** | Data Transfer Object: class that describes and validates request body or query. |
| **Guard** | NestJS guard: runs before the controller (e.g. JWT check, role check). |
| **SSR** | Server-Side Rendering: Next.js runs the page on the server and fetches data before sending HTML. |
| **JWT** | JSON Web Token: returned at login; sent in `Authorization` header for admin requests. |
| **Prisma** | ORM: schema in `schema.prisma`, client used in services to query PostgreSQL. |
| **Component** | React component (e.g. ProductCard, SiteHeader) used inside pages. |

---

## 6. Related docs

- **`docs/DELIVERABLES.md`** – Schema summary, API endpoints, folder structure, SEO/performance checklist.
- **`README.md`** – Setup, env vars, main URLs, how to run the API and web app.
