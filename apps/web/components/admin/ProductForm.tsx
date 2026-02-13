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

export interface ProductImageInput {
  url: string;
  alt: string;
}

export interface ProductFormValues {
  name: string;
  slug: string;
  description: string;
  price: string;
  pricingUnit: string;
  images: ProductImageInput[];
  isQuoteOnly: boolean;
  isActive: boolean;
}

const defaultValues: ProductFormValues = {
  name: '',
  slug: '',
  description: '',
  price: '',
  pricingUnit: '',
  images: [],
  isQuoteOnly: false,
  isActive: true,
};

export function ProductForm({
  initialValues,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initialValues?: Partial<ProductFormValues>;
  submitLabel: string;
  onSubmit: (values: ProductFormValues) => Promise<void>;
  onCancel: () => void;
}) {
  const [values, setValues] = useState<ProductFormValues>({
    ...defaultValues,
    ...initialValues,
    price: initialValues?.price ?? defaultValues.price,
    images: initialValues?.images ?? defaultValues.images,
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

      <fieldset style={{ border: '1px solid var(--color-border)', borderRadius: '8px', padding: '1rem', margin: 0 }}>
        <legend style={{ fontWeight: 600, padding: '0 0.25rem' }}>Images</legend>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)', margin: '0 0 0.75rem 0' }}>
          Choose images from your device. Add descriptive alt text for each for accessibility and SEO.
        </p>
        {values.images.map((img, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.2fr auto',
              gap: '0.5rem',
              alignItems: 'end',
              marginBottom: '0.75rem',
            }}
          >
            <div>
              <label htmlFor={`img-file-${i}`}>Image from device</label>
              <input
                id={`img-file-${i}`}
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  try {
                    const fd = new FormData();
                    fd.append('file', file);
                    const res = await fetch('/api/upload', { method: 'POST', body: fd });
                    const data = await res.json();
                    if (!res.ok || !data.url) {
                      throw new Error(data.message ?? 'Upload failed');
                    }
                    const next = [...values.images];
                    next[i] = { ...next[i], url: data.url };
                    update({ images: next });
                  } catch (err) {
                    console.error(err);
                  } finally {
                    e.target.value = '';
                  }
                }}
                className="admin-input"
                style={{ padding: '0.375rem' }}
              />
              {img.url ? (
                <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)', display: 'block', marginTop: '0.25rem' }}>
                  Uploaded
                </span>
              ) : null}
            </div>
            <div>
              <label htmlFor={`img-alt-${i}`}>Alt text</label>
              <input
                id={`img-alt-${i}`}
                type="text"
                value={img.alt}
                onChange={(e) => {
                  const next = [...values.images];
                  next[i] = { ...next[i], alt: e.target.value };
                  update({ images: next });
                }}
                placeholder="Describe the image"
                className="admin-input"
              />
            </div>
            <button
              type="button"
              onClick={() => update({ images: values.images.filter((_, j) => j !== i) })}
              style={{ padding: '0.5rem', fontSize: '0.875rem' }}
              aria-label={`Remove image ${i + 1}`}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => update({ images: [...values.images, { url: '', alt: '' }] })}
          className="btn"
          style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
        >
          Add image
        </button>
      </fieldset>

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
