'use client';

import { useState } from 'react';
import type { Product } from '@/lib/types';

export function OrderForm({ product }: { product: Product }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? '';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch(`${apiUrl}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerEmail: email,
          customerName: name,
          customerPhone: phone || undefined,
          notes: notes || undefined,
          items: [{ productId: product.id, quantity }],
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message?.[0] ?? data.message ?? 'Échec de la requête');
      setStatus('success');
      setMessage('Votre demande a bien été envoyée. Nous vous recontacterons sous peu.');
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Une erreur est survenue.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="order-form" noValidate>
      <div className="order-form__field">
        <label htmlFor="order-name" className="order-form__label">
          Nom <span aria-hidden>*</span>
        </label>
        <input
          id="order-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          className="order-form__input"
          placeholder="Votre nom"
        />
      </div>
      <div className="order-form__field">
        <label htmlFor="order-email" className="order-form__label">
          E-mail <span aria-hidden>*</span>
        </label>
        <input
          id="order-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="order-form__input"
          placeholder="vous@exemple.com"
        />
      </div>
      <div className="order-form__field">
        <label htmlFor="order-phone" className="order-form__label">
          Téléphone
        </label>
        <input
          id="order-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
          className="order-form__input"
          placeholder="+216 00 000 000"
        />
      </div>
      <div className="order-form__field">
        <label htmlFor="order-quantity" className="order-form__label">
          Quantité
        </label>
        <input
          id="order-quantity"
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
          className="order-form__input order-form__input--number"
        />
      </div>
      <div className="order-form__field">
        <label htmlFor="order-notes" className="order-form__label">
          Remarques
        </label>
        <textarea
          id="order-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="order-form__input order-form__textarea"
          placeholder="Message ou précisions éventuels"
        />
      </div>
      {message && (
        <p
          role="status"
          className={`order-form__message ${status === 'error' ? 'order-form__message--error' : 'order-form__message--success'}`}
        >
          {message}
        </p>
      )}
      <button
        type="submit"
        className="btn btn-primary order-form__submit"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Envoi en cours…' : product.isQuoteOnly ? 'Demander un devis' : 'Passer commande'}
      </button>
    </form>
  );
}
