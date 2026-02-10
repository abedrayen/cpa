import Link from 'next/link';
import { fetcher } from '@/lib/api';
import type { Product, Paginated } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';
import { SiteHeader } from '@/components/SiteHeader';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

export const metadata = {
  title: 'Aluminium Products',
  description:
    'High-quality aluminium windows, doors, and profiles. Request a quote or buy online. Trusted supplier for residential and commercial projects.',
  alternates: { canonical: siteUrl },
  openGraph: {
    url: siteUrl,
    type: 'website',
  },
};

async function getLandingData() {
  return fetcher<Paginated<Product>>('/products?limit=8&sort=createdAt&order=desc');
}

export default async function HomePage() {
  const products = await getLandingData();

  return (
    <>
      <SiteHeader homeCurrent />

      <main id="main-content">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="container">
            <h1 id="hero-heading">Aluminium Windows, Doors &amp; Profiles</h1>
            <p className="hero-lead">
              High-quality aluminium solutions for residential and commercial projects.
              Request a quote or buy online. Trusted supplier with years of experience.
            </p>
            <Link href="/products" className="btn btn-primary">
              View all products
            </Link>
          </div>
        </section>

        <section className="section landing-section" aria-labelledby="products-heading">
          <div className="container">
            <h2 id="products-heading">Featured Products</h2>
            <p className="section-lead">
              Popular products. Request a quote or view the full list.
            </p>
            <ul className="product-grid" role="list">
              {products.data.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} basePath="/products" />
                </li>
              ))}
            </ul>
            <p className="section-cta">
              <Link href="/products">View all products</Link>
            </p>
          </div>
        </section>

        <section className="section trust landing-section" aria-labelledby="trust-heading">
          <div className="container">
            <h2 id="trust-heading">Why Choose Us</h2>
            <p className="section-lead">
              Trust and expertise for your aluminium projects.
            </p>
            <ul className="trust-list" role="list">
              <li>Quality aluminium profiles and certified materials</li>
              <li>Competitive pricing and custom quotes</li>
              <li>Expert support and project guidance</li>
              <li>Years of experience in residential and commercial supply</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="site-footer" role="contentinfo">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} CPA Aluminium. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
