import Link from 'next/link';
import { fetcher } from '@/lib/api';
import type { Product, Paginated } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';
import { SiteHeader } from '@/components/SiteHeader';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

export const metadata = {
  title: 'Products',
  description:
    'Browse our products. Request a quote or buy online. Trusted supplier for residential and commercial projects.',
  alternates: { canonical: `${siteUrl}/products` },
  openGraph: { url: `${siteUrl}/products`, type: 'website' },
};

async function getProducts() {
  return fetcher<Paginated<Product>>('/products?limit=100&sort=name&order=asc');
}

export default async function ProductsPage() {
  const { data: products } = await getProducts();

  return (
    <>
      <SiteHeader />

      <main id="main-content" className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <h1>Products</h1>
        <p className="section-lead">
          Request a quote or view details for any product.
        </p>
        {products.length === 0 ? (
          <p className="admin-empty">No products yet.</p>
        ) : (
          <>
            <ul className="product-grid" role="list">
              {products.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} basePath="/products" />
                </li>
              ))}
            </ul>
          </>
        )}
      </main>

      <footer className="site-footer" role="contentinfo">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} CPA Aluminium.</p>
        </div>
      </footer>
    </>
  );
}
