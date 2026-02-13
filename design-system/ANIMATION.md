# Animation System

Lightweight, GPU-friendly. Respects `prefers-reduced-motion`.

---

## Durations (tokens)

| Token | Value | Use |
|-------|--------|-----|
| instant | 0ms | No transition (or reduced-motion) |
| fast | 150ms | Hover, focus, small state changes |
| normal | 200ms | Button/control feedback, toggles |
| slow | 300ms | Drawer/modal open, page-level transitions |

---

## Easing

- **Default:** `cubic-bezier(0.4, 0, 0.2, 1)` — general UI.
- **In:** `cubic-bezier(0.4, 0, 1, 1)` — enter.
- **Out:** `cubic-bezier(0, 0, 0.2, 1)` — exit.
- **In-out:** same as default for symmetric motion.

Use CSS: `transition: transform var(--duration-normal) var(--ease-default)`.

---

## Micro-interaction standards

- **Hover/focus:** `transition-colors duration-fast` or `duration-normal`. Prefer color/opacity; avoid layout changes that cause reflow.
- **Buttons:** Color/background only; no scale unless subtle (e.g. `scale-[0.98]` on press). Keep under 200ms.
- **Dropdowns / drawers:** Animate `transform` (translate) or `opacity`; duration `normal` or `slow`. Focus trap and keyboard close.
- **Skeleton:** Pulse or shimmer; disable when `prefers-reduced-motion: reduce` (set `animation: none` and use static fill).
- **No:** Animating width/height of large elements; heavy blur; long autoplay motion.

---

## Tailwind

Use `transition-colors duration-normal` or `transition-all duration-fast`. For transform-based animations, use `transition-[transform,opacity]` so only those properties animate.
