import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { SiteHeader } from '@/components/SiteHeader';
import type { Category, Product } from '@/lib/types';

export function CategoryPage({
  category,
  products,
  breadcrumb,
}: {
  category: Category;
  products: Product[];
  breadcrumb: { name: string; slug: string }[];
}) {
  return (
    <>
      <SiteHeader />

      <main className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden>/</span>
          <Link href="/aluminium">Aluminium</Link>
          {breadcrumb.map((b) => (
            <span key={b.slug}>
              <span aria-hidden>/</span>
              <Link href={b.slug}>{b.name}</Link>
            </span>
          ))}
        </nav>

        <h1>{category.name}</h1>
        {category.metaDescription && (
          <p className="muted">{category.metaDescription}</p>
        )}

        {category.children?.length ? (
          <section style={{ marginTop: '2rem' }}>
            <h2>Subcategories</h2>
            <ul className="category-grid">
              {category.children.map((child) => (
                <li key={child.id}>
                  <Link href={`/aluminium/${category.slug}/${child.slug}`}>
                    {child.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section style={{ marginTop: '2rem' }}>
          <h2>Products</h2>
          {products.length === 0 ? (
            <p>No products in this category yet.</p>
          ) : (
            <ul className="product-grid">
              {products.map((p) => (
                <li key={p.id}>
                  <ProductCard
                    product={p}
                    basePath="/aluminium"
                    categoryPath={category.parent ? `${category.parent.slug}/${category.slug}` : category.slug}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} CPA Aluminium.</p>
        </div>
      </footer>
    </>
  );
}
