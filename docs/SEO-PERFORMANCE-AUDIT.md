# SEO & performance audit vs project rules

## ✅ Respected

| Rule | Implementation |
|------|----------------|
| **URLs** | Clean keyword-based: `/`, `/products`, `/products/[slug]`. No categories; no query-based primary pages. |
| **Meta** | Unique title + description per page (Metadata API). Canonical on landing and product pages. |
| **Headings** | Single H1 per page; H2/H3 hierarchy (no skips). |
| **Structured data** | Product + Offer (in Product schema), BreadcrumbList, Organization. |
| **Internal linking** | Product → breadcrumb (Home > Products > name), related products (≥3 via limit=4). Links to /products. |
| **SSR** | SEO-critical pages are Server Components with `dynamic = 'force-dynamic'` or default. |
| **Code splitting** | Next.js automatic. Client components only where needed (OrderForm, admin). |
| **Images** | `next/image` with `sizes`; `loading="lazy"` on ProductCard; `priority` on first product image. Alt from `img.alt \|\| product.name`. |
| **Crawl control** | `robots.txt` allow `/`, disallow `/admin/`. Sitemap with static + product URLs. Admin noindex via layout metadata. |
| **Security headers** | X-Frame-Options, X-Content-Type-Options, Referrer-Policy in next.config. |

## ⚠️ Gaps / recommendations

| Rule | Gap | Action |
|------|-----|--------|
| **Product: 300 words + FAQ** | No minimum word count; no FAQ section or FAQ schema. | Add optional FAQ block (data from API or CMS); encourage 300+ words in admin/editor. |
| **Review schema** | Not implemented (no reviews in product schema). | Add when reviews exist (aggregateRating, Review in Product schema). |
| **Image format** | next/image does not force WebP/AVIF. | Enable in `next.config.js` (see below). |
| **Title/description length** | No enforcement of 50–60 / 140–160 chars. | Validate in admin when editing meta; optionally truncate in `generateMetadata`. |
| **LCP / CLS** | No explicit optimizations beyond SSR + images. | Monitor in production; ensure LCP target (hero/image), avoid layout shifts (skeleton, dimensions). |
| *(N/A)* | Site has no categories; all products are independent. | — |

## Performance checklist

- [x] SSR for index and product pages
- [x] next/image with dimensions and sizes
- [x] Lazy load below-fold images
- [x] No blocking scripts in critical path
- [ ] Optional: image `formats: ['image/avif', 'image/webp']` in next.config
- [ ] Optional: Cache-Control on API/list endpoints for static-ish data
