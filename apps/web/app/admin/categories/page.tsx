'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAdminToken } from '@/components/AdminGuard';
import { Breadcrumbs } from '@/components/admin/Breadcrumbs';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  children?: Category[];
}

function CategoryTree({
  categories,
  level = 0,
  basePath,
}: {
  categories: Category[];
  level?: number;
  basePath: string;
}) {
  return (
    <ul
      style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        marginLeft: level ? '1.25rem' : 0,
        borderLeft: level ? '1px solid var(--color-border)' : 'none',
        paddingLeft: level ? '0.75rem' : 0,
      }}
    >
      {categories.map((c) => {
        const path = level === 0 ? c.slug : `${basePath}/${c.slug}`;
        return (
          <li key={c.id} style={{ marginBottom: '0.5rem' }}>
            <Link
              href={`/aluminium/${path}`}
              style={{ color: 'var(--color-text)', textDecoration: 'none', fontWeight: level ? 400 : 500 }}
            >
              {c.name}
            </Link>
            <span style={{ marginLeft: '0.5rem', fontSize: '0.8125rem', color: 'var(--color-muted)' }}>
              ({c.slug})
            </span>
            {c.children?.length ? (
              <CategoryTree categories={c.children} level={level + 1} basePath={path} />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;
    setError(null);
    fetch(`${API_URL}/admin/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setCategories)
      .catch(() => {
        setCategories([]);
        setError('Failed to load categories.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading && categories.length === 0) {
    return (
      <>
        <Breadcrumbs items={[{ label: 'Admin', href: '/admin' }, { label: 'Categories' }]} />
        <div className="admin-page-header">
          <h1 className="admin-page-title">Categories</h1>
        </div>
        <div className="admin-loading" role="status" aria-live="polite">
          Loading categories…
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Admin', href: '/admin' },
          { label: 'Categories', href: '/admin/categories' },
        ]}
      />
      <header className="admin-page-header">
        <h1 className="admin-page-title">Categories</h1>
        <p style={{ margin: 0, color: 'var(--color-muted)', fontSize: '0.9375rem' }}>
          Category tree used for the store. Create or edit via API or seed.
        </p>
      </header>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      {categories.length === 0 && !error ? (
        <div className="admin-empty">
          <p>No categories.</p>
          <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
            Create via API or run seed script.
          </p>
        </div>
      ) : (
        <div
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '1.25rem',
          }}
        >
          <CategoryTree categories={categories} basePath="" />
        </div>
      )}
    </>
  );
}
