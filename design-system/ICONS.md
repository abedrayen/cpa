# Icon System

---

## Library

**Recommended: Lucide React** (or Heroicons). Tree-shakeable; consistent stroke and size; good a11y support. Install: `lucide-react`.

---

## Size scale

Align with spacing/typography. Use consistent sizes so UI doesn’t shift.

| Token   | Size  | Use case              |
|---------|-------|------------------------|
| icon-xs | 12px  | Inline with caption, badges |
| icon-sm | 16px  | Buttons, list items, nav     |
| icon-md | 20px  | Default actions, inputs     |
| icon-lg | 24px  | Empty states, feature icons |
| icon-xl | 32px  | Hero, marketing             |

Tailwind: `w-3 h-3` (xs), `w-4 h-4` (sm), `w-5 h-5` (md), `w-6 h-6` (lg), `w-8 h-8` (xl). Always set both width and height (or use `size` with Lucide) to avoid layout shift.

---

## Usage rules

- **Decorative:** Use `aria-hidden="true"` so screen readers skip. Pair with visible text (e.g. “Search” next to icon) or ensure the control has an `aria-label`.
- **Standalone icon as control:** Button must have `aria-label` (e.g. “Close”, “Remove item”, “Menu”). Do not rely on the icon alone for meaning.
- **Color:** Inherit `currentColor` so icons match text/UI color. No hardcoded fill unless required by brand.
- **Touch:** Icon-only buttons min 44×44px tap target (padding around icon).
