# E-commerce Design System

Production-ready, scalable design system for storefront, admin, seller dashboard, marketing, and checkout. Optimized for **SEO**, **Core Web Vitals**, **WCAG 2.2 AA**, and **conversion**.

---

## Contents

| File | Description |
|------|-------------|
| **tokens.css** | Design tokens as CSS variables: color, typography, spacing, radius, shadow, animation |
| **tailwind.config.js** | Tailwind theme extension (colors, fonts, spacing, breakpoints, etc.) |
| **COMPONENTS.md** | Core + e-commerce component specifications |
| **LAYOUT.md** | Breakpoints, containers, grid |
| **ACCESSIBILITY.md** | WCAG 2.2 AA rules and patterns |
| **SEO.md** | SEO best practices supported by the system |
| **PERFORMANCE.md** | Performance and Core Web Vitals practices |
| **ICONS.md** | Icon size scale and usage (Lucide/Heroicons) |
| **ANIMATION.md** | Durations, easing, micro-interaction standards |

---

## Tech stack

- **React** + **Next.js** + **Tailwind CSS**
- Suitable for multi-store / SaaS e-commerce (Shopify-like, Stripe, etc.)

---

## Usage

1. **Tokens:** Import `tokens.css` in your app root (e.g. `app/layout.tsx` or `globals.css`).
2. **Tailwind:** In `apps/web`, install Tailwind and extend the theme from this config, or copy the `theme.extend` into your app’s `tailwind.config.js`. Set `content` to your app’s source paths.
3. **Components:** Implement React components per COMPONENTS.md using the tokens and Tailwind classes defined here.
4. **Layout / A11y / SEO / Performance:** Follow LAYOUT.md, ACCESSIBILITY.md, SEO.md, PERFORMANCE.md when building pages and components.

---

## Principles

- **Minimal:** No heavy shadows or complex effects; clarity and speed first.
- **Conversion-focused:** Clear CTAs, readable typography, sufficient contrast.
- **Scalable:** Tokens and components work across storefront, admin, seller, marketing, checkout.
- **Enterprise-grade:** Accessible, SEO-friendly, performant (LCP &lt; 2.5s, CLS &lt; 0.1, INP &lt; 200ms).
