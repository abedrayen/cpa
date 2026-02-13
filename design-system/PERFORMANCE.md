# Performance Best Practices

Targets: **LCP < 2.5s**, **CLS < 0.1**, **INP < 200ms**. Optimized for Next.js, React, Tailwind.

---

## Rendering

- **Minimal DOM depth:** Prefer flat structure; avoid unnecessary wrappers. Each component should add only needed nodes.
- **Reusable components:** Small, presentational components; avoid duplicate layout or style logic. Shared tokens (CSS variables / Tailwind theme) reduce CSS size and reflow scope.
- **No heavy effects:** Avoid large box-shadows, heavy blur, or complex filters on large areas. Use the defined shadow scale (xs–xl) only where needed. Prefer `transform` and `opacity` for animations (GPU-friendly).

---

## Layout & CLS

- **Reserve space:** Images: `width`, `height`, or `aspect-ratio`. Product/category cards: fixed aspect-ratio for image container. Skeletons: same dimensions as final content.
- **Fonts:** System font stack in tokens avoids FOUT and extra network requests. If adding webfonts: `font-display: optional` or `swap`; preload only critical weight; subset when possible. Prefer `<link rel="preload">` in document head.
- **Dynamic content:** Inject lists (e.g. products) into a container with min-height or use skeleton placeholders so the page doesn’t jump when data loads.

---

## Animations

- **GPU-friendly:** Prefer `transform`, `opacity`. Avoid animating `width`, `height`, `top`, `left` (cause reflow). Use `will-change` sparingly and only during animation.
- **Durations:** Use token durations (fast / normal / slow). Short micro-interactions (150–200ms). Respect `prefers-reduced-motion: reduce`.
- **Minimal reflow:** Batch DOM reads/writes; avoid interleaving layout-triggering reads with style writes in React. Let React batch updates.

---

## Assets & CSS

- **Images:** Next.js `Image` with correct `sizes`; lazy load below-the-fold. No oversized source images; use responsive srcset.
- **CSS:** Tailwind purge/content paths include all component files so unused utilities are removed. Design tokens in one file (e.g. `tokens.css`) imported once; avoid duplicate token definitions.
- **Icons:** Use a single icon set (e.g. Lucide or Heroicons); tree-shake; inline critical icons or sprite; avoid many small icon requests.

---

## Core Web Vitals checklist

| Metric | Target | Design system contribution |
|--------|--------|----------------------------|
| LCP    | < 2.5s | Reserved image space; no render-blocking font required; light CSS |
| CLS    | < 0.1  | Aspect-ratio / dimensions on media; skeleton sizing; system fonts |
| INP    | < 200ms| Light interactions; no heavy JS in hot paths; small component tree |

---

## Summary

- Shallow DOM; reusable components; design tokens for consistency and smaller CSS.
- Reserved space and dimensions everywhere to avoid layout shift.
- GPU-friendly animations; short durations; respect reduced motion.
- No heavy shadows or effects; optimized images and fonts at app level.
