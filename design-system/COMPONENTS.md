# Component Design System

Semantic HTML first. Minimal DOM depth. Reusable React + Tailwind patterns.

---

## Core Components

### Buttons

| Variant   | Use case                    | Styles |
|----------|-----------------------------|--------|
| primary  | Main CTA (Add to cart, Checkout) | `bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-2 ring-primary-500 ring-offset-2` |
| secondary| Secondary actions           | `bg-neutral-100 text-neutral-900 hover:bg-neutral-200` (light) / `bg-neutral-800 text-neutral-50` (dark) |
| outline  | Tertiary, low emphasis      | `border border-border bg-transparent hover:bg-neutral-100` |
| ghost    | In-nav, table actions       | `hover:bg-neutral-100` transparent default |
| danger   | Delete, destructive         | `bg-error-600 text-white hover:bg-error-700` |

**Specs:** padding `py-2 px-4` (sm), `py-2.5 px-5` (default), `py-3 px-6` (lg). `rounded-md`, `font-medium`, `text-sm`/`text-base`. Min height 40px (touch). `transition-colors duration-normal`. Disabled: `opacity-50 cursor-not-allowed`. Use `<button type="button|submit">` or `<a role="button">` with proper semantics.

---

### Inputs

**Text input:** `w-full py-2 px-3 border border-border rounded-md bg-surface text-text placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`. Label: `block text-sm font-medium text-text mb-1`. Error: `border-error-500`, error message `text-sm text-error-600 mt-1`. Associate via `htmlFor`/`id`.

**Search input:** Same as text + optional `pl-10` for leading search icon; `rounded-lg` for search bars. `type="search"` and `aria-label="Search"` or visible label.

**Select:** Native `<select>` styled to match: same padding/border/radius; `appearance-none` + custom chevron via background or icon. `aria-describedby` for hint/error.

**Checkbox:** Min 24×24px touch target. `rounded border-border`. Checked: `bg-primary-600 border-primary-600`. Focus: `focus-visible:ring-2 ring-primary-500 ring-offset-2`. Label wraps or is linked via `htmlFor`.

**Radio:** Same touch target and focus as checkbox. Use `name` for group, `aria-describedby` if needed.

**Textarea:** Same border/radius/focus as text input; `min-height` (e.g. 80px); `resize-y` optional.

---

### Cards

Base: `bg-surface rounded-lg border border-border shadow-sm`. Padding: `p-4` (sm), `p-6` (default). Optional `hover:shadow-md transition-shadow duration-normal` for clickable cards. Use `<article>` or `<div>`; avoid nested interactive elements without clear hierarchy.

---

### Product card (e-commerce)

- **Container:** `bg-surface rounded-lg border border-border overflow-hidden shadow-sm hover:border-primary-500 hover:shadow-md transition-all duration-normal`. Use `<article>` with proper heading level.
- **Image:** `aspect-[4/3]` or `aspect-square`, `object-cover`, `bg-neutral-100`. Reserve space (width/height or aspect-ratio) to avoid CLS. `<img loading="lazy" decoding="async" alt="...">`.
- **Content:** Padding `p-4`. Title: `font-semibold text-base text-text` (single line or line-clamp-2), link to PDP. Price: `text-lg font-semibold text-text`. Optional: badge (sale, new), rating, “Add to cart” button.
- **Semantics:** One `<h2>` or `<h3>` per card; link wraps image + title or is separate “View product”. No critical content in `aria-hidden` or visually hidden without a text alternative.

---

### Navbar

- **Structure:** `<header role="banner"><nav aria-label="Main">` with list of links. Sticky: `sticky top-0 z-50 bg-surface border-b border-border`.
- **Layout:** Flex between logo and nav; on mobile, hamburger opening drawer/modal. Logo: link to home. Nav items: `text-sm font-medium`, sufficient contrast, focus-visible ring.
- **Container:** Use layout container (max-width + horizontal padding). No heavy shadows; minimal DOM.

---

### Footer

- **Structure:** `<footer>`. Sections for links, contact, legal. Use `<nav aria-label="Footer">` for link groups. Semantic sections/lists.
- **Style:** `border-t border-border`, `text-text-muted text-sm`, links `hover:text-text`. Grid or flex for columns; stack on mobile.

---

### Dropdown

- **Trigger:** Button with `aria-expanded`, `aria-haspopup="true"`. `aria-controls` pointing to menu id.
- **Menu:** `role="menu"` (or `listbox` for selects), `role="menuitem"`. Position: absolute, `shadow-lg rounded-md border border-border bg-surface py-1`. Keyboard: Arrow keys, Enter, Escape. Focus trap when open. `aria-activedescendant` if needed.

---

### Modal

- **Overlay:** `fixed inset-0 bg-neutral-900/50` (or token), `z-50`. `role="dialog"` `aria-modal="true"` `aria-labelledby` (title id) `aria-describedby` optional.
- **Panel:** Centered, `max-w-lg` (or variant), `bg-surface rounded-xl shadow-xl p-6`. Focus trap; Escape closes; focus return on close.
- **Title:** `text-xl font-semibold`. One primary action (e.g. Confirm); secondary (Cancel) closes.

---

### Drawer

- **Overlay:** Same as modal. Panel: `fixed top-0 right-0 (or left) h-full w-full max-w-sm bg-surface shadow-xl`. Slide-in transition `transform duration-normal ease-out`. Same focus trap and Escape/button close as modal. `role="dialog"`.

---

### Badge

Small label: `inline-flex items-center px-2 py-0.5 rounded text-xs font-medium`. Variants: default `bg-neutral-100 text-neutral-700`, success `bg-success-100 text-success-700`, warning `bg-warning-100 text-warning-700`, error `bg-error-100 text-error-700`. No icon-only badges; ensure text or `aria-label`.

---

### Alert

- **Container:** `rounded-lg border p-4`. Variants: success `border-success-200 bg-success-50 text-success-800`, error `border-error-200 bg-error-50 text-error-800`, warning/info analogous. `role="alert"` for live announcements. Optional dismiss button with `aria-label="Dismiss"`.

---

### Tabs

- **List:** `role="tablist"` on container. Each tab `role="tab"` `aria-selected` `aria-controls` (panel id) `id` for `aria-labelledby`. Active: border or background change. Arrow keys move focus; Enter/Space activate.
- **Panel:** `role="tabpanel"` `aria-labelledby` (tab id), `hidden` when inactive. Only one visible. Minimal layout shift: reserve min-height or use opacity so CLS is minimal.

---

### Pagination

- **Nav:** `<nav aria-label="Pagination">`. List of links/buttons. Current page: `aria-current="page"`, styled distinctly. Prev/Next: `aria-label="Previous page"` / `Next page`. Disabled state for first/last. Ellipsis for long ranges.

---

### Breadcrumb

- **Nav:** `<nav aria-label="Breadcrumb">` with `<ol>` and `<li>` items. Separator: visually “/” or icon, `aria-hidden="true"`. Current page: not link, `aria-current="page"`. `text-sm text-text-muted`; links `hover:text-primary-600`.

---

### Skeleton loaders

- **Pattern:** `rounded bg-neutral-200 animate-pulse` (or custom skeleton animation). Same dimensions as content (e.g. aspect-ratio for images, fixed height for text lines) to avoid CLS. Respect `prefers-reduced-motion: reduce` (no animation). Use `aria-busy="true"` on container if appropriate.

---

## E-commerce–specific

### Product page layout

- **Sections:** Breadcrumb, gallery (main + thumbnails), title (H1), price, add-to-cart (quantity + button), short description, tabs or sections (description, specs, reviews). Use `<main>`, `<section>`, headings in order (H1 → H2 → H3). Schema.org Product markup in JSON-LD; no duplicate critical content in hidden divs for SEO.

### Category page layout

- **Structure:** H1 (category name), optional description, filters (sidebar or top bar), product grid (product cards), pagination. Filters: use `<fieldset>`/`<legend>` or labelled groups; URL or state driven. Sort: `<select>` or button group with `aria-label`.

### Cart UI

- **List:** Each line: image, title (link), price, quantity (input or stepper), line total, remove. Sticky sidebar or bottom bar: subtotal, CTA to checkout. Empty state: message + link to continue shopping. Update totals without full reload when possible (minimal reflow).

### Checkout UI

- **Steps:** Progress indicator (steps or stepper), one step visible at a time. Sections: shipping, payment, review. Forms: same input/select specs; clear validation and error messages. Primary CTA: “Place order” once. No critical content in collapsed/hidden blocks without semantic alternative.

### Filters UI

- **Facets:** Checkboxes or range inputs; label each filter (e.g. “Price”, “Brand”). Collapsible on mobile. URL or state reflects selections. “Apply” or live update; avoid layout jump when results update (skeleton or stable container height).

### Search UI

- **Input:** Prominent, `type="search"`. Results: list or grid; link per result; keyboard navigable. No content hidden from crawlers for ranking; use same markup for SEO and JS-enhanced UX.

### Rating UI

- **Display:** Stars (filled/empty) or numeric; `aria-label="Rating: 4.2 out of 5"` or visible text “4.2/5”. For input (review form): `role="radiogroup"` with `aria-label`, star buttons as radio options.

### Review UI

- **Block:** Reviewer name, date, rating, text. Use `<article>` per review; heading level consistent with page (e.g. H3 “Reviews”). Pagination or “Load more” for long lists.

### Wishlist UI

- **List:** Same product card pattern; remove-from-wishlist control. Empty state: CTA to browse. No critical product data only in JS; ensure crawlable links to PDPs.

### Order UI (admin/seller)

- **Detail:** Order number, status badge, dates, customer, line items (table or list), totals. Status: use semantic colors (success/warning/error/neutral). Actions: change status, print, etc. Tables: `th`/`td`, responsive (scroll or card layout on small screens).

---

## Implementation notes

- **React:** Compose with small, presentational components; use design tokens (CSS vars or Tailwind theme) only.
- **Next.js:** Use `next/image` for product/category images; set `sizes` and dimensions to avoid CLS.
- **Tailwind:** Prefer utility classes from this theme; avoid arbitrary values for tokens (color, space, radius, shadow) so the system stays consistent.
