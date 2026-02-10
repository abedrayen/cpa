import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { OrderForm } from '@/components/OrderForm';
import { ProductCard } from '@/components/ProductCard';
import { SiteHeader } from '@/components/SiteHeader';

function priceCurrency(_specs: Product['specs']): string {
  return 'TND';
}

function ProductSchema({ product, canonical }: { product: Product; canonical: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.metaDescription ?? product.description,
    image: product.images?.map((i) => i.url) ?? [],
    sku: product.id,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: priceCurrency(product.specs),
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: canonical,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductPage({
  product,
  related,
  breadcrumb,
  pathSegments = [],
  productsBasePath = '/products',
}: {
  product: Product;
  related: Product[];
  breadcrumb: { name: string; slug: string }[];
  pathSegments?: string[];
  productsBasePath?: string;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';
  const path = pathSegments.length ? pathSegments.join('/') : product.slug;
  const canonical = `${siteUrl}${productsBasePath}/${path}`.replace(/\/+/g, '/');
  const breadcrumbUrls = [
    { name: 'Home', url: siteUrl || '/' },
    { name: 'Products', url: `${siteUrl}${productsBasePath}` },
    ...breadcrumb.map((b) => ({ name: b.name, url: `${siteUrl}${b.slug}` })),
    { name: product.name, url: canonical },
  ];

  return (
    <>
      <ProductSchema product={product} canonical={canonical} />
      <BreadcrumbSchema items={breadcrumbUrls} />

      <SiteHeader />

      <main className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden>/</span>
          <Link href={productsBasePath}>Products</Link>
          <span aria-hidden>/</span>
          <span>{product.name}</span>
        </nav>

        <article>
          <h1>{product.name}</h1>

          {product.images?.length ? (
            <div className="product-gallery">
              {product.images.map((img) => (
                <Image
                  key={img.id}
                  src={img.url}
                  alt={img.alt || product.name}
                  width={800}
                  height={600}
                  sizes="(max-width: 640px) 100vw, 800px"
                  priority={product.images[0]?.id === img.id}
                />
              ))}
            </div>
          ) : null}

          <div className="product-meta">
            <p className="product-price">
              {product.isQuoteOnly
                ? 'Request quote'
                : `From ${product.price}${(product.specs as { unit?: string } | null)?.unit ? ` ${(product.specs as { unit: string }).unit}` : ''}`.trim()}
            </p>
          </div>

          <section>
            <h2>Description</h2>
            <p className="product-description">{product.description}</p>
          </section>

          {product.specs && Object.keys(product.specs as object).length > 0 ? (
            <section>
              <h2>Technical specifications</h2>
              <table className="specs-table">
                <tbody>
                  {Object.entries(product.specs as Record<string, unknown>).map(([key, value]) => (
                    <tr key={key}>
                      <th>{key}</th>
                      <td>{String(value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          ) : null}

          <section>
            <h2>{product.isQuoteOnly ? 'Request quote' : 'Order'}</h2>
            <OrderForm product={product} />
          </section>
        </article>

        {related.length > 0 ? (
          <section style={{ marginTop: '3rem' }}>
            <h2>Related products</h2>
            <ul className="product-grid">
              {related.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} basePath={productsBasePath} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} CPA Aluminium.</p>
        </div>
      </footer>
    </>
  );
}
