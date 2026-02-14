'use client';

import { useRef, useEffect, useState } from 'react';

/**
 * Légère parallaxe sur l’image du hero au scroll. Désactivée si prefers-reduced-motion.
 */
export function HeroBanner({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        const delta = (viewportCenter - center) * 0.08;
        setOffset(Math.max(-40, Math.min(40, delta)));
        raf = 0;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={ref}
      className="site-header-banner"
      style={reduceMotion ? undefined : { transform: `translate3d(0, ${offset}px, 0)` }}
    >
      {children}
    </div>
  );
}
