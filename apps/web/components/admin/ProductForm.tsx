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
  stock: number;
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
  stock: 0,
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
    stock: initialValues?.stock ?? defaultValues.stock,
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
      setError('Le prix doit être un nombre valide.');
      setSaving(false);
      return;
    }
    if (!values.name.trim()) {
      setError('Le nom est obligatoire.');
      setSaving(false);
      return;
    }
    if (!values.slug.trim()) {
      setError('Le slug est obligatoire.');
      setSaving(false);
      return;
    }
    const stock = Math.floor(Number(values.stock));
    if (Number.isNaN(stock) || stock < 0) {
      setError('Le stock doit être un nombre entier positif ou zéro.');
      setSaving(false);
      return;
    }
    try {
      await onSubmit(values);
      setSaving(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Échec de l’enregistrement.');
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form" style={{ maxWidth: '560px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <label htmlFor="product-name">
        Nom <span aria-hidden>*</span>
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
          Générer depuis le nom
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
        Prix (nombre) <span aria-hidden>*</span>
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

      <label htmlFor="product-unit">Unité de prix (ex. TND/m, TND/m²)</label>
      <input
        id="product-unit"
        type="text"
        value={values.pricingUnit}
        onChange={(e) => update({ pricingUnit: e.target.value })}
        placeholder="TND/unité"
        className="admin-input"
      />

      <label htmlFor="product-stock">
        Stock <span aria-hidden>*</span>
      </label>
      <input
        id="product-stock"
        type="number"
        min={0}
        step={1}
        value={values.stock}
        onChange={(e) => update({ stock: Math.max(0, parseInt(e.target.value, 10) || 0) })}
        className="admin-input"
        aria-required="true"
      />
      <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)', margin: '-0.5rem 0 0 0' }}>
        Si 0 : « Rupture de stock » s’affiche en boutique. Sinon : « En stock ».
      </p>

      <fieldset style={{ border: '1px solid var(--color-border)', borderRadius: '8px', padding: '1rem', margin: 0 }}>
        <legend style={{ fontWeight: 600, padding: '0 0.25rem' }}>Images</legend>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)', margin: '0 0 0.75rem 0' }}>
          Choisissez des images depuis votre appareil. Ajoutez un texte alternatif pour l’accessibilité et le référencement.
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
              <label htmlFor={`img-file-${i}`}>Image depuis l’appareil</label>
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
                      throw new Error(data.message ?? 'Échec du téléversement');
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
                  Téléversé
                </span>
              ) : null}
            </div>
            <div>
              <label htmlFor={`img-alt-${i}`}>Texte alternatif</label>
              <input
                id={`img-alt-${i}`}
                type="text"
                value={img.alt}
                onChange={(e) => {
                  const next = [...values.images];
                  next[i] = { ...next[i], alt: e.target.value };
                  update({ images: next });
                }}
                placeholder="Décrire l’image"
                className="admin-input"
              />
            </div>
            <button
              type="button"
              onClick={() => update({ images: values.images.filter((_, j) => j !== i) })}
              style={{ padding: '0.5rem', fontSize: '0.875rem' }}
              aria-label={`Supprimer l’image ${i + 1}`}
            >
              Supprimer
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => update({ images: [...values.images, { url: '', alt: '' }] })}
          className="btn"
          style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
        >
          Ajouter une image
        </button>
      </fieldset>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={values.isQuoteOnly}
            onChange={(e) => update({ isQuoteOnly: e.target.checked })}
          />
          Sur devis uniquement (masquer le prix, afficher « Demander un devis »)
        </label>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={values.isActive}
            onChange={(e) => update({ isActive: e.target.checked })}
          />
          Actif (visible en boutique)
        </label>
      </div>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
        <button type="submit" disabled={saving} className="btn btn-primary">
          {saving ? 'Enregistrement…' : submitLabel}
        </button>
        <button type="button" onClick={onCancel} className="btn" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
          Annuler
        </button>
      </div>
    </form>
  );
}
