# SEO Best Practices (Design System)

The design system must not block or harm SEO. All patterns support crawlability and Core Web Vitals.

---

## Semantic structure

- **Landmarks:** Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` so crawlers and assistive tech understand structure. One `<main>` per page.
- **Headings:** Single H1 per page (e.g. product name on PDP, category name on PLP). H2–H6 in logical order for sections. No critical content only in non-heading text that should be a heading.
- **Content in HTML:** All indexable content must be in the initial HTML (or in content that is in the DOM without heavy JS). Avoid critical product/category text only in images, `aria-hidden` blocks, or content loaded after long delays without server-rendered fallback.

---

## Crawlability

- **Links:** Use real `<a href="...">` for product, category, and important marketing URLs. Crawlable URLs (clean, descriptive). No critical links that are only `onClick` or `button` without href.
- **No SEO-blocking patterns:** Do not hide important content with `display: none` or `visibility: hidden` for the purpose of “SEO content” that users don’t see; use visible sections or proper progressive disclosure. Avoid large blocks of keyword-only text that are hidden from users.
- **Pagination:** Use hrefs for “next/previous” so crawlers can follow. `rel="next"` / `rel="prev"` on link tags where applicable.

---

## Performance (SEO impact)

- **LCP:** Reserve space for above-the-fold images (width/height or aspect-ratio) so layout doesn’t shift. Prioritize LCP image (e.g. `fetchpriority="high"` on hero or first product image). Use Next.js `Image` with proper `sizes`.
- **CLS:** Avoid layout shift: fixed or minimum dimensions for images, ads, embeds; skeleton or min-height for dynamic content. No large content injections above existing content without reserved space.
- **INP/FID:** Keep main thread work light; avoid heavy scripts during interaction. Design system uses light animations and no heavy effects.

---

## Metadata & data

- **Titles and descriptions:** Handled at app/page level; design system does not set content. Ensure title and primary description are in the DOM (e.g. in `<h1>` and a visible intro paragraph or meta description).
- **Structured data:** Product, breadcrumb, organization, etc. are implemented in JSON-LD at page level. Design system components use semantic markup (e.g. `<article>`, proper headings) so they align with structured data.

---

## Summary

- Semantic HTML and one clear H1 per page.
- All important links and text in crawlable HTML.
- No hidden critical content; no SEO-only tricks.
- Fast rendering and minimal CLS via reserved space and light UI.
