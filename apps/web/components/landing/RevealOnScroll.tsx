'use client';

import { useRef, useEffect, useState, type ElementType } from 'react';

type RevealOnScrollProps = {
  as?: ElementType;
  children: React.ReactNode;
  className?: string;
  /** Root margin for IntersectionObserver (e.g. "0px 0px -80px") */
  rootMargin?: string;
  /** 0–1, fraction of visibility to trigger */
  threshold?: number;
  /** Stagger delay in ms for first child only (optional) */
  delay?: number;
};

/**
 * Reveal content on scroll: fade-in + slide. Respects prefers-reduced-motion.
 * Accessible: content remains in DOM and focusable; animation is cosmetic.
 */
export function RevealOnScroll({
  as: Tag = 'div',
  children,
  className = '',
  rootMargin = '0px 0px -60px 0px',
  threshold = 0.1,
  delay = 0,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            const t = setTimeout(() => setVisible(true), delay);
            return () => clearTimeout(t);
          }
          setVisible(true);
        }
      },
      { rootMargin, threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, delay]);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement>}
      className={className}
      data-visible={visible ? 'true' : 'false'}
      data-reveal
    >
      {children}
    </Tag>
  );
}
