'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Product } from '@/lib/types';

function formatPrice(product: Product): string {
  if (product.isQuoteOnly) return 'Demander un devis';
  const unit = (product.specs as { unit?: string } | null)?.unit;
  return `À partir de ${product.price}${unit ? ` ${unit}` : ''}`.trim();
}

export function ProductStickyCta({
  product,
  orderBlockId,
}: {
  product: Product;
  orderBlockId: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById(orderBlockId);
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([e]) => setVisible(!e.isIntersecting),
      { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [orderBlockId]);

  return (
    <div
      className={`pdp-sticky-cta ${visible ? 'pdp-sticky-cta--visible' : ''}`}
      role="region"
      aria-label="Action produit"
    >
      <div className="container pdp-sticky-cta__inner">
        <p className="pdp-sticky-cta__price">{formatPrice(product)}</p>
        <a href={`#${orderBlockId}`} className="btn btn-primary pdp-sticky-cta__btn">
          {product.isQuoteOnly ? 'Demander un devis' : 'Commander'}
        </a>
      </div>
    </div>
  );
}
