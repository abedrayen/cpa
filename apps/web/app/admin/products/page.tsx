'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  images?: { id: string; url: string; alt: string }[];
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0, limit: 20 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const { addToast } = useToast();

  const load = useCallback(() => {
    const token = getAdminToken();
    if (!token) return;
    setLoading(true);
    setError(null);
    const params = new URLSearchParams({
      limit: String(meta.limit),
      page: String(meta.page),
    });
    if (search.trim()) params.set('search', search.trim());
    fetch(`${API_URL}/admin/products?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.data ?? []);
        setMeta((m) => ({ ...m, ...data.meta }));
      })
      .catch(() => {
        setProducts([]);
        setError('Impossible de charger les produits.');
      })
      .finally(() => setLoading(false));
  }, [meta.limit, meta.page, search]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading && products.length === 0) {
    return (
      <>
        <Breadcrumbs items={[{ label: 'Admin', href: '/admin' }, { label: 'Produits' }]} />
        <div className="admin-page-header">
          <h1 className="admin-page-title">Produits</h1>
        </div>
        <div className="admin-loading" role="status" aria-live="polite">
          Chargement des produits…
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Admin', href: '/admin' },
          { label: 'Produits', href: '/admin/products' },
        ]}
      />
      <header className="admin-page-header">
        <h1 className="admin-page-title">Produits</h1>
        <p style={{ margin: 0, color: 'var(--color-muted)', fontSize: '0.9375rem' }}>
          {meta.total > 0 ? `${meta.total} produit${meta.total !== 1 ? 's' : ''}` : 'Aucun produit pour le moment'}
        </p>
      </header>

      <div className="admin-sticky-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <input
            type="search"
            placeholder="Rechercher un produit (nom, description)…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setSearch(searchInput)}
            className="admin-input"
            style={{ width: '280px', margin: 0 }}
            aria-label="Recherche produits"
          />
          <button
            type="button"
            onClick={() => { setMeta((m) => ({ ...m, page: 1 })); setSearch(searchInput); }}
            className="btn"
            style={{ border: '1px solid var(--color-border)' }}
          >
            Rechercher
          </button>
          {search && (
            <button
              type="button"
              onClick={() => { setSearch(''); setSearchInput(''); setMeta((m) => ({ ...m, page: 1 })); }}
              className="btn"
              style={{ fontSize: '0.875rem' }}
            >
              Effacer
            </button>
          )}
        </div>
        <Link href="/admin/products/new" className="btn btn-primary">
          Nouveau produit
        </Link>
      </div>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      {products.length === 0 && !error ? (
        <div className="admin-empty">
          <p>Aucun produit.</p>
          <Link href="/admin/products/new" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Ajouter le premier produit
          </Link>
        </div>
      ) : (
        <>
          <div className="admin-table-wrap">
            <table className="admin-table" role="table">
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Slug</th>
                  <th scope="col">Prix</th>
                  <th scope="col">Actif</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>
                      {p.images?.[0]?.url ? (
                        <span className="admin-product-thumb">
                          <Image
                            src={p.images[0].url}
                            alt={p.images[0].alt || p.name}
                            width={48}
                            height={48}
                            style={{ objectFit: 'cover', borderRadius: '4px' }}
                            unoptimized={p.images[0].url.startsWith('data:')}
                          />
                        </span>
                      ) : (
                        <span className="admin-product-thumb admin-product-thumb--empty" aria-hidden>—</span>
                      )}
                    </td>
                    <td>{p.name}</td>
                    <td>
                      <code style={{ fontSize: '0.8125rem' }}>{p.slug}</code>
                    </td>
                    <td>{p.price}</td>
                    <td>{p.isActive ? 'Oui' : 'Non'}</td>
                    <td>
                      <Link href={`/admin/products/${p.id}/edit`} style={{ marginRight: '0.75rem' }}>
                        Modifier
                      </Link>
                      <button
                        type="button"
                        onClick={() => setDeleteId(p.id)}
                        className="btn-danger"
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.8125rem' }}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ConfirmDialog
            open={deleteId !== null}
            title="Supprimer le produit"
            message="Le produit sera désactivé (suppression douce). Il n’apparaîtra plus en boutique. Vous pourrez le réactiver depuis la base de données si besoin."
            confirmLabel="Supprimer"
            cancelLabel="Annuler"
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
                addToast('Produit supprimé.', 'success');
                load();
              } else {
                addToast('Impossible de supprimer le produit.', 'error');
              }
            }}
            onCancel={() => setDeleteId(null)}
          />
          {meta.totalPages > 1 && (
            <nav aria-label="Pagination des produits" style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
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
                Précédent
              </button>
              <span style={{ fontSize: '0.875rem', color: 'var(--color-muted)' }}>
                Page {meta.page} sur {meta.totalPages}
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
                Suivant
              </button>
            </nav>
          )}
        </>
      )}
    </>
  );
}
