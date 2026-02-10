'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { getAdminToken } from '@/components/AdminGuard';
import { Breadcrumbs } from '@/components/admin/Breadcrumbs';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { useToast } from '@/components/admin/ToastContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: string;
  isActive: boolean;
  category?: { name: string; slug: string };
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0, limit: 20 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { addToast } = useToast();

  const load = useCallback(() => {
    const token = getAdminToken();
    if (!token) return;
    setLoading(true);
    setError(null);
    fetch(`${API_URL}/admin/products?limit=${meta.limit}&page=${meta.page}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.data ?? []);
        setMeta((m) => ({ ...m, ...data.meta }));
      })
      .catch(() => {
        setProducts([]);
        setError('Failed to load products.');
      })
      .finally(() => setLoading(false));
  }, [meta.limit, meta.page]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading && products.length === 0) {
    return (
      <>
        <Breadcrumbs items={[{ label: 'Admin', href: '/admin' }, { label: 'Products' }]} />
        <div className="admin-page-header">
          <h1 className="admin-page-title">Products</h1>
        </div>
        <div className="admin-loading" role="status" aria-live="polite">
          Loading products…
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Admin', href: '/admin' },
          { label: 'Products', href: '/admin/products' },
        ]}
      />
      <header className="admin-page-header">
        <h1 className="admin-page-title">Products</h1>
        <p style={{ margin: 0, color: 'var(--color-muted)', fontSize: '0.9375rem' }}>
          {meta.total > 0 ? `${meta.total} product${meta.total !== 1 ? 's' : ''}` : 'No products yet'}
        </p>
      </header>

      <div className="admin-sticky-bar">
        <Link href="/admin/products/new" className="btn btn-primary">
          New product
        </Link>
      </div>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      {products.length === 0 && !error ? (
        <div className="admin-empty">
          <p>No products.</p>
          <Link href="/admin/products/new" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Add first product
          </Link>
        </div>
      ) : (
        <>
          <div className="admin-table-wrap">
            <table className="admin-table" role="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Slug</th>
                  <th scope="col">Price</th>
                  <th scope="col">Active</th>
                  <th scope="col">Category</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>
                      <code style={{ fontSize: '0.8125rem' }}>{p.slug}</code>
                    </td>
                    <td>{p.price}</td>
                    <td>{p.isActive ? 'Yes' : 'No'}</td>
                    <td>{p.category?.name ?? '—'}</td>
                    <td>
                      <Link href={`/admin/products/${p.id}/edit`} style={{ marginRight: '0.75rem' }}>
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => setDeleteId(p.id)}
                        className="btn-danger"
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.8125rem' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ConfirmDialog
            open={deleteId !== null}
            title="Delete product"
            message="This will soft-delete the product. It will no longer appear on the store. You can restore it from the database if needed."
            confirmLabel="Delete"
            cancelLabel="Cancel"
            variant="danger"
            onConfirm={async () => {
              if (!deleteId) return;
              const token = getAdminToken();
              if (!token) return;
              const res = await fetch(`${API_URL}/admin/products/${deleteId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
              });
              setDeleteId(null);
              if (res.ok) {
                addToast('Product deleted.', 'success');
                load();
              } else {
                addToast('Failed to delete product.', 'error');
              }
            }}
            onCancel={() => setDeleteId(null)}
          />
          {meta.totalPages > 1 && (
            <nav aria-label="Products pagination" style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <button
                type="button"
                disabled={meta.page <= 1}
                onClick={() => setMeta((m) => ({ ...m, page: m.page - 1 }))}
                style={{
                  padding: '0.5rem 0.75rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: '6px',
                  background: 'var(--color-surface)',
                  cursor: meta.page <= 1 ? 'not-allowed' : 'pointer',
                  opacity: meta.page <= 1 ? 0.6 : 1,
                }}
              >
                Previous
              </button>
              <span style={{ fontSize: '0.875rem', color: 'var(--color-muted)' }}>
                Page {meta.page} of {meta.totalPages}
              </span>
              <button
                type="button"
                disabled={meta.page >= meta.totalPages}
                onClick={() => setMeta((m) => ({ ...m, page: m.page + 1 }))}
                style={{
                  padding: '0.5rem 0.75rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: '6px',
                  background: 'var(--color-surface)',
                  cursor: meta.page >= meta.totalPages ? 'not-allowed' : 'pointer',
                  opacity: meta.page >= meta.totalPages ? 0.6 : 1,
                }}
              >
                Next
              </button>
            </nav>
          )}
        </>
      )}
    </>
  );
}
