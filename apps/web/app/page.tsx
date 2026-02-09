import Link from 'next/link';
import { fetcher } from '@/lib/api';
import type { Category, Product, Paginated } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

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
      <header className="site-header">
        <div className="container">
          <Link href="/" className="logo">
            CPA Aluminium
          </Link>
          <nav>
            <Link href="/aluminium">Aluminium</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <h1>Aluminium Windows, Doors &amp; Profiles</h1>
            <p className="hero-lead">
              High-quality aluminium solutions for residential and commercial projects.
              Request a quote or buy online. Trusted supplier with years of experience.
            </p>
            <Link href="/aluminium" className="btn btn-primary">
              View catalogue
            </Link>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2>Categories</h2>
            <ul className="category-grid">
              {rootCategories.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/aluminium/${cat.slug}`}>{cat.name}</Link>
                  {cat.children?.length ? (
                    <ul>
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

        <section className="section">
          <div className="container">
            <h2>Featured products</h2>
            <ul className="product-grid">
              {products.data.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} basePath="/aluminium" />
                </li>
              ))}
            </ul>
            <p style={{ marginTop: '1rem' }}>
              <Link href="/aluminium">View all products</Link>
            </p>
          </div>
        </section>

        <section className="section trust">
          <div className="container">
            <h2>Why choose us</h2>
            <ul className="trust-list">
              <li>Quality aluminium profiles</li>
              <li>Competitive pricing &amp; quotes</li>
              <li>Expert support</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} CPA Aluminium. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
