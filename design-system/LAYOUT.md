# Layout System

Mobile-first. 4px base grid. Minimal layout shift.

---

## 2.1 Breakpoints (min-width)

| Name | Value | Usage |
|------|--------|--------|
| xs   | 375px | Large phones |
| sm   | 640px | Landscape phones / small tablets |
| md   | 768px | Tablets |
| lg   | 1024px | Laptops |
| xl   | 1280px | Desktops |
| 2xl  | 1536px | Large desktops |

Tailwind: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`.

---

## 2.2 Container

- **Max widths:** 640px (sm), 768px (md), 1024px (lg), 1280px (xl). Default content container: **1280px**.
- **Padding:** Horizontal padding from spacing scale: `px-4` (mobile), `md:px-6`, `xl:px-8`. Use `mx-auto` to center.
- **Class pattern:** `.container` or `max-w-container mx-auto px-4 md:px-6 xl:px-8`.

---

## 2.3 Grid

- **Columns:** 12-column grid. Use CSS Grid: `grid-cols-12` with `gap` from spacing (e.g. `gap-4` 16px, `gap-6` 24px).
- **Gutters:** Consistent with spacing scale (16px, 24px). Prefer `gap-4` or `gap-6`; avoid mixing arbitrary gutter values.
- **Responsive:** e.g. `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` for product grids; `grid-cols-12` for custom spans (e.g. `col-span-12 lg:col-span-8` main + `lg:col-span-4` sidebar).
- **Margins:** Section vertical spacing: `space-8` (32px) or `space-12` (48px) between major sections to keep rhythm.

---

## Page structure (semantic)

- **Storefront:** `<header>` (navbar) → `<main>` (breadcrumb, H1, content) → `<footer>`.
- **Admin/Dashboard:** Same; main content in a constrained container with optional sidebar. Sidebar width from tokens (e.g. 256px); collapse to icons only on small viewports if needed.
- **Checkout:** Single-column, narrow max-width (e.g. 480px for form, or 640px with order summary beside).

Reserve space for dynamic content (e.g. min-height or aspect-ratio) to avoid CLS when data loads.
