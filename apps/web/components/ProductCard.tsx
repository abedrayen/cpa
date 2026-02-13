import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';

export function ProductCard({
  product,
  basePath = '/produits',
}: {
  product: Product;
  basePath?: string;
}) {
  const href = `${basePath}/${product.slug}`;
  const img = product.images?.[0];

  return (
    <article className="product-card">
      <Link href={href} className="product-card-link">
        {img ? (
          <div className="product-card-image">
            <Image
              src={img.url}
              alt={img.alt || product.name}
              width={400}
              height={300}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="product-card-image placeholder skeleton" aria-hidden />
        )}
        <h3 className="product-card-title">{product.name}</h3>
        <p className="product-card-price">
          {product.isQuoteOnly
            ? 'Demander un devis'
            : `À partir de ${product.price}${(product.specs as { unit?: string } | null)?.unit ? ` ${(product.specs as { unit: string }).unit}` : ''}`.trim()}
        </p>
      </Link>
    </article>
  );
}
