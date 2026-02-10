'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAdminToken } from '@/components/AdminGuard';
import { Breadcrumbs } from '@/components/admin/Breadcrumbs';
import { ProductForm, type CategoryOption, type ProductFormValues } from '@/components/admin/ProductForm';
import { useToast } from '@/components/admin/ToastContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

function flattenCategories(
  cats: { id: string; name: string; slug: string; children?: unknown[] }[],
  out: CategoryOption[] = []
): CategoryOption[] {
  for (const c of cats) {
    out.push({ id: c.id, name: c.name, slug: c.slug });
    if (c.children?.length) flattenCategories(c.children as typeof cats, out);
  }
  return out;
}

export default function AdminNewProductPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;
    fetch(`${API_URL}/admin/categories`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((tree) => setCategories(flattenCategories(tree)))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

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
        categoryId: values.categoryId,
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
    if (!res.ok) throw new Error(Array.isArray(data.message) ? data.message[0] : data.message ?? 'Failed to create');
    addToast('Product created.', 'success');
    router.push('/admin/products');
  }

  if (loading) {
    return (
      <>
        <Breadcrumbs items={[{ label: 'Admin', href: '/admin' }, { label: 'Products', href: '/admin/products' }, { label: 'New' }]} />
        <div className="admin-loading" role="status">Loading…</div>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Admin', href: '/admin' },
          { label: 'Products', href: '/admin/products' },
          { label: 'New product' },
        ]}
      />
      <header className="admin-page-header">
        <h1 className="admin-page-title">New product</h1>
      </header>
      {categories.length === 0 ? (
        <p className="form-error">Create at least one category before adding products.</p>
      ) : (
        <ProductForm
          categories={categories}
          submitLabel="Create product"
          onSubmit={handleSubmit}
          onCancel={() => router.push('/admin/products')}
        />
      )}
    </>
  );
}
