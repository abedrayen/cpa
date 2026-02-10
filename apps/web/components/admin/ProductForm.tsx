'use client';

import { useState, useCallback } from 'react';

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export interface CategoryOption {
  id: string;
  name: string;
  slug: string;
}

export interface ProductFormValues {
  name: string;
  slug: string;
  categoryId: string;
  description: string;
  price: string;
  pricingUnit: string;
  isQuoteOnly: boolean;
  isActive: boolean;
}

const defaultValues: ProductFormValues = {
  name: '',
  slug: '',
  categoryId: '',
  description: '',
  price: '',
  pricingUnit: '',
  isQuoteOnly: false,
  isActive: true,
};

export function ProductForm({
  categories,
  initialValues,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  categories: CategoryOption[];
  initialValues?: Partial<ProductFormValues>;
  submitLabel: string;
  onSubmit: (values: ProductFormValues) => Promise<void>;
  onCancel: () => void;
}) {
  const [values, setValues] = useState<ProductFormValues>({
    ...defaultValues,
    ...initialValues,
    price: initialValues?.price ?? defaultValues.price,
  });
  const [slugLocked, setSlugLocked] = useState(!!initialValues?.slug);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const update = useCallback((updates: Partial<ProductFormValues>) => {
    setValues((v) => {
      const next = { ...v, ...updates };
      if (!slugLocked && updates.name !== undefined) {
        next.slug = slugify(updates.name);
      }
      return next;
    });
  }, [slugLocked]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const price = parseFloat(values.price);
    if (Number.isNaN(price) || price < 0) {
      setError('Price must be a valid number.');
      setSaving(false);
      return;
    }
    if (!values.name.trim()) {
      setError('Name is required.');
      setSaving(false);
      return;
    }
    if (!values.slug.trim()) {
      setError('Slug is required.');
      setSaving(false);
      return;
    }
    if (!values.categoryId) {
      setError('Category is required.');
      setSaving(false);
      return;
    }
    try {
      await onSubmit(values);
      setSaving(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save.');
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form" style={{ maxWidth: '560px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <label htmlFor="product-name">
        Name <span aria-hidden>*</span>
      </label>
      <input
        id="product-name"
        type="text"
        value={values.name}
        onChange={(e) => update({ name: e.target.value })}
        required
        className="admin-input"
        aria-required="true"
      />

      <label htmlFor="product-slug">
        Slug <span aria-hidden>*</span>
      </label>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <input
          id="product-slug"
          type="text"
          value={values.slug}
          onChange={(e) => {
            setSlugLocked(true);
            update({ slug: e.target.value });
          }}
          required
          className="admin-input"
          aria-required="true"
        />
        <button
          type="button"
          onClick={() => {
            setSlugLocked(false);
            update({ slug: slugify(values.name) });
          }}
          style={{ fontSize: '0.875rem', padding: '0.5rem' }}
        >
          Sync from name
        </button>
      </div>

      <label htmlFor="product-category">
        Category <span aria-hidden>*</span>
      </label>
      <select
        id="product-category"
        value={values.categoryId}
        onChange={(e) => update({ categoryId: e.target.value })}
        required
        className="admin-input"
        aria-required="true"
      >
        <option value="">Select category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <label htmlFor="product-description">
        Description <span aria-hidden>*</span>
      </label>
      <textarea
        id="product-description"
        value={values.description}
        onChange={(e) => update({ description: e.target.value })}
        required
        rows={4}
        className="admin-input"
        aria-required="true"
      />

      <label htmlFor="product-price">
        Price (numeric) <span aria-hidden>*</span>
      </label>
      <input
        id="product-price"
        type="number"
        step="any"
        min="0"
        value={values.price}
        onChange={(e) => update({ price: e.target.value })}
        required
        className="admin-input"
        aria-required="true"
      />

      <label htmlFor="product-unit">Pricing unit (e.g. TND/m, TND/m²)</label>
      <input
        id="product-unit"
        type="text"
        value={values.pricingUnit}
        onChange={(e) => update({ pricingUnit: e.target.value })}
        placeholder="TND/unit"
        className="admin-input"
      />

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={values.isQuoteOnly}
            onChange={(e) => update({ isQuoteOnly: e.target.checked })}
          />
          Quote only (hide price, show “Request quote”)
        </label>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={values.isActive}
            onChange={(e) => update({ isActive: e.target.checked })}
          />
          Active (visible on store)
        </label>
      </div>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
        <button type="submit" disabled={saving} className="btn btn-primary">
          {saving ? 'Saving…' : submitLabel}
        </button>
        <button type="button" onClick={onCancel} className="btn" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
          Cancel
        </button>
      </div>
    </form>
  );
}
