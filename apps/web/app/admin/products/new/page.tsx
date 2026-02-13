'use client';

import { useRouter } from 'next/navigation';
import { getAdminToken } from '@/components/AdminGuard';
import { Breadcrumbs } from '@/components/admin/Breadcrumbs';
import { ProductForm, type ProductFormValues } from '@/components/admin/ProductForm';
import { useToast } from '@/components/admin/ToastContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

export default function AdminNewProductPage() {
  const router = useRouter();
  const { addToast } = useToast();

  async function handleSubmit(values: ProductFormValues) {
    const token = getAdminToken();
    if (!token) throw new Error('Not authenticated');
    const price = parseFloat(values.price);
    if (Number.isNaN(price)) throw new Error('Invalid price');
    const res = await fetch(`${API_URL}/admin/products`, {
      method: 'POST',
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
    if (!res.ok) throw new Error(Array.isArray(data.message) ? data.message[0] : data.message ?? 'Échec de la création');
    addToast('Produit créé.', 'success');
    router.push('/admin/products');
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Admin', href: '/admin' },
          { label: 'Produits', href: '/admin/products' },
          { label: 'Nouveau produit' },
        ]}
      />
      <header className="admin-page-header">
        <h1 className="admin-page-title">Nouveau produit</h1>
      </header>
      <ProductForm
        submitLabel="Créer le produit"
        onSubmit={handleSubmit}
        onCancel={() => router.push('/admin/products')}
      />
    </>
  );
}
