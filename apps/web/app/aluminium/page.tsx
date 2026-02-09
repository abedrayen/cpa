import Link from 'next/link';
import { fetcher } from '@/lib/api';
import type { Category } from '@/lib/types';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

async function getCategories() {
  return fetcher<Category[]>('/categories/tree');
}

export const metadata = {
  title: 'Aluminium products catalogue',
  description:
    'Browse our aluminium windows, doors, and profiles. Find the right solution for your project.',
};

export default async function AluminiumIndexPage() {
  const categories = await getCategories();
  const roots = categories.filter((c) => !c.parentId);

  return (
    <>
      <header className="site-header">
        <div className="container">
          <Link href="/" className="logo">CPA Aluminium</Link>
          <nav>
            <Link href="/aluminium">Aluminium</Link>
          </nav>
        </div>
      </header>

      <main className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <h1>Aluminium products</h1>
        <p>Choose a category to browse products.</p>
        <ul className="category-grid" style={{ marginTop: '1.5rem' }}>
          {roots.map((cat) => (
            <li key={cat.id}>
              <Link href={`/aluminium/${cat.slug}`}>{cat.name}</Link>
              {cat.children?.length ? (
                <ul>
                  {cat.children.map((child) => (
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
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} CPA Aluminium.</p>
        </div>
      </footer>
    </>
  );
}
