import Link from 'next/link';
import { fetcher } from '@/lib/api';
import type { Category, Product, Paginated } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';

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
  const [categories, products] = await Promise.all([
    fetcher<Category[]>('/categories/tree'),
    fetcher<Paginated<Product>>('/products?limit=8&sort=createdAt&order=desc'),
  ]);
  return { categories, products };
}

export default async function HomePage() {
  const { categories, products } = await getLandingData();
  const rootCategories = categories.filter((c) => !c.parentId);

  return (
    <>
      <header className="site-header" role="banner">
        <div className="container">
          <Link href="/" className="logo" aria-current="page">
            CPA Aluminium
          </Link>
          <nav aria-label="Main">
            <Link href="/aluminium">Aluminium</Link>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="container">
            <h1 id="hero-heading">Aluminium Windows, Doors &amp; Profiles</h1>
            <p className="hero-lead">
              High-quality aluminium solutions for residential and commercial projects.
              Request a quote or buy online. Trusted supplier with years of experience.
            </p>
            <Link href="/aluminium" className="btn btn-primary">
              View catalogue
            </Link>
          </div>
        </section>

        <section className="section landing-section" aria-labelledby="categories-heading">
          <div className="container">
            <h2 id="categories-heading">Featured Aluminium Categories</h2>
            <p className="section-lead">
              Browse by category to find windows, doors, and profiles for your project.
            </p>
            <ul className="category-grid" role="list">
              {rootCategories.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/aluminium/${cat.slug}`} className="category-card-link">
                    {cat.name}
                  </Link>
                  {cat.children?.length ? (
                    <ul role="list">
                      {cat.children.slice(0, 5).map((child) => (
                        <li key={child.id}>
                          <Link href={`/aluminium/${cat.slug}/${child.slug}`}>
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section landing-section" aria-labelledby="products-heading">
          <div className="container">
            <h2 id="products-heading">Featured Products</h2>
            <p className="section-lead">
              Popular aluminium products. Request a quote or view full catalogue.
            </p>
            <ul className="product-grid" role="list">
              {products.data.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} basePath="/aluminium" />
                </li>
              ))}
            </ul>
            <p className="section-cta">
              <Link href="/aluminium">View all products</Link>
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

        <section className="section landing-internal" aria-labelledby="explore-heading">
          <div className="container">
            <h2 id="explore-heading">Explore by Category</h2>
            <p className="section-lead">
              Quick links to our main aluminium product categories.
            </p>
            <nav aria-label="Category links">
              <ul className="internal-links" role="list">
                {rootCategories.map((cat) => (
                  <li key={cat.id}>
                    <Link href={`/aluminium/${cat.slug}`}>
                      {cat.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/aluminium">Full aluminium catalogue</Link>
                </li>
              </ul>
            </nav>
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
