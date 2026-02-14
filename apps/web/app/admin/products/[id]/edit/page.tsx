'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getAdminToken } from '@/components/AdminGuard';
import { Breadcrumbs } from '@/components/admin/Breadcrumbs';
import { ProductForm, type ProductFormValues } from '@/components/admin/ProductForm';
import { useToast } from '@/components/admin/ToastContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

export default function AdminEditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const { addToast } = useToast();
  const [initial, setInitial] = useState<ProductFormValues | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const token = getAdminToken();
    if (!token) return;
    fetch(`${API_URL}/admin/products/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((product) => {
        const specs = product.specs as { unit?: string } | null;
        setInitial({
          name: product.name,
          slug: product.slug,
          description: product.description ?? '',
          price: String(product.price ?? ''),
          pricingUnit: specs?.unit ?? '',
          images: (product.images ?? []).map((img: { url: string; alt: string }) => ({ url: img.url, alt: img.alt ?? '' })),
          stock: typeof product.stock === 'number' ? product.stock : 0,
          isQuoteOnly: product.isQuoteOnly ?? false,
          isActive: product.isActive ?? true,
        });
      })
      .catch(() => setError('Impossible de charger le produit.'))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(values: ProductFormValues) {
    const token = getAdminToken();
    if (!token) throw new Error('Not authenticated');
    const price = parseFloat(values.price);
    if (Number.isNaN(price)) throw new Error('Invalid price');
    const res = await fetch(`${API_URL}/admin/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: values.name.trim(),
        slug: values.slug.trim(),
        description: values.description.trim(),
        price,
        specs: values.pricingUnit.trim() ? { unit: values.pricingUnit.trim() } : undefined,
        images: values.images
          .filter((im) => im.url.trim())
          .map((im, i) => ({ url: im.url.trim(), alt: im.alt.trim() || undefined, sortOrder: i })),
        stock: Math.max(0, Math.floor(Number(values.stock)) || 0),
        isQuoteOnly: values.isQuoteOnly,
        isActive: values.isActive,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(Array.isArray(data.message) ? data.message[0] : data.message ?? 'Échec de la mise à jour');
    addToast('Produit mis à jour.', 'success');
    router.push('/admin/products');
  }

  if (loading && !initial) {
    return (
      <>
        <Breadcrumbs items={[{ label: 'Admin', href: '/admin' }, { label: 'Produits', href: '/admin/products' }, { label: 'Modifier' }]} />
        <div className="admin-loading" role="status">Chargement…</div>
      </>
    );
  }

  if (error || !initial) {
    return (
      <>
        <Breadcrumbs items={[{ label: 'Admin', href: '/admin' }, { label: 'Produits', href: '/admin/products' }]} />
        <p className="form-error" role="alert">{error ?? 'Produit introuvable.'}</p>
        <button type="button" onClick={() => router.push('/admin/products')} className="btn">Retour aux produits</button>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Admin', href: '/admin' },
          { label: 'Produits', href: '/admin/products' },
          { label: 'Modifier' },
        ]}
      />
      <header className="admin-page-header">
        <h1 className="admin-page-title">Modifier le produit</h1>
        <p style={{ margin: 0, color: 'var(--color-muted)', fontSize: '0.9375rem' }}>{initial.name}</p>
      </header>
      <ProductForm
        initialValues={initial}
        submitLabel="Enregistrer les modifications"
        onSubmit={handleSubmit}
        onCancel={() => router.push('/admin/products')}
      />
    </>
  );
}
