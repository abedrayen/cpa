# Accessibility Rules (WCAG 2.2 AA)

---

## Contrast

- **Text (normal):** Minimum 4.5:1 against background. Use `--color-text` on `--color-bg` / `--color-surface`; muted text `--color-text-muted` only for secondary content.
- **Text (large):** 3:1 minimum for 18px+ or 14px+ bold. Headings and large CTAs must meet this.
- **UI components / graphics:** 3:1 against adjacent colors. Focus ring must meet 3:1 against background.

All design token color pairs in the system are chosen to meet AA. Do not override with lower-contrast combinations.

---

## Focus

- **Visible focus:** Every focusable element has a visible focus indicator. Use `focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2` (or tokens). No `outline: none` without a replacement.
- **Offset:** `--focus-offset` (2px) so the ring is not flush with the element. High contrast mode may override; do not rely on color alone.

---

## Keyboard

- **All interactive elements** reachable and operable via Tab (and Shift+Tab). Logical tab order (DOM order or `tabindex="0"` only when necessary).
- **Custom controls:** Dropdowns, tabs, modals, drawers support Arrow keys, Enter, Space, Escape as appropriate. Trap focus inside modals/drawers; return focus on close.
- **Skip link:** “Skip to main content” as first focusable element on storefront and key templates.

---

## ARIA & semantics

- **Landmarks:** Use `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`. Give multiple navs an `aria-label` (e.g. "Main", "Footer", "Breadcrumb").
- **Buttons vs links:** Use `<a href="...">` for navigation; `<button>` for actions (submit, open modal, toggle). No `<a href="#">` for actions.
- **Forms:** Every input has a visible or `aria-label` label; use `htmlFor`/`id` or `aria-labelledby`. Group related fields with `<fieldset>`/`legend` or `aria-describedby` for hints/errors. Error message linked with `aria-describedby` and optionally `aria-invalid="true"` when invalid.
- **Live regions:** Use `role="alert"` for non-intrusive errors/toasts; `aria-live="polite"` for updates that should be announced. Avoid `aria-live="assertive"` unless critical.
- **Dialogs:** `role="dialog"`, `aria-modal="true"`, `aria-labelledby` (title), optional `aria-describedby`. Do not use `aria-hidden` on the document body without managing focus and scroll.

---

## Motion

- **Respect `prefers-reduced-motion: reduce`:** Disable or shorten non-essential animations (skeleton pulse, transitions). Use `@media (prefers-reduced-motion: reduce)` in tokens and component styles.

---

## Content

- **Images:** Decorative: `alt=""`. Meaningful: concise `alt` describing content/purpose. No critical information only in images without text alternative.
- **Headings:** Single H1 per page; logical order (H1 → H2 → H3). Do not skip levels for visual style; use CSS for size.

---

## Testing

- Manual: Keyboard-only navigation, one screen reader (e.g. NVDA, VoiceOver). Check focus order and announcements.
- Automated: axe-core or Lighthouse accessibility audit in CI or pre-release. Fix all serious issues before ship.
