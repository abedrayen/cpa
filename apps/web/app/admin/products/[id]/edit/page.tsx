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
          isQuoteOnly: product.isQuoteOnly ?? false,
          isActive: product.isActive ?? true,
        });
      })
      .catch(() => setError('Failed to load product.'))
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
        isQuoteOnly: values.isQuoteOnly,
        isActive: values.isActive,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(Array.isArray(data.message) ? data.message[0] : data.message ?? 'Failed to update');
    addToast('Product updated.', 'success');
    router.push('/admin/products');
  }

  if (loading && !initial) {
    return (
      <>
        <Breadcrumbs items={[{ label: 'Admin', href: '/admin' }, { label: 'Products', href: '/admin/products' }, { label: 'Edit' }]} />
        <div className="admin-loading" role="status">Loading…</div>
      </>
    );
  }

  if (error || !initial) {
    return (
      <>
        <Breadcrumbs items={[{ label: 'Admin', href: '/admin' }, { label: 'Products', href: '/admin/products' }]} />
        <p className="form-error" role="alert">{error ?? 'Product not found.'}</p>
        <button type="button" onClick={() => router.push('/admin/products')} className="btn">Back to products</button>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Admin', href: '/admin' },
          { label: 'Products', href: '/admin/products' },
          { label: 'Edit' },
        ]}
      />
      <header className="admin-page-header">
        <h1 className="admin-page-title">Edit product</h1>
        <p style={{ margin: 0, color: 'var(--color-muted)', fontSize: '0.9375rem' }}>{initial.name}</p>
      </header>
      <ProductForm
        initialValues={initial}
        submitLabel="Save changes"
        onSubmit={handleSubmit}
        onCancel={() => router.push('/admin/products')}
      />
    </>
  );
}
