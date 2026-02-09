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
      if (!res.ok) throw new Error(data.message?.[0] ?? data.message ?? 'Request failed');
      setStatus('success');
      setMessage('Your request has been sent. We will contact you shortly.');
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="order-form">
      <label>
        Name <span aria-hidden>*</span>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
      </label>
      <label>
        Email <span aria-hidden>*</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </label>
      <label>
        Phone
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
        />
      </label>
      <label>
        Quantity
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
        />
      </label>
      <label>
        Notes
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
      </label>
      {message && (
        <p role="status" className={status === 'error' ? 'form-error' : 'form-success'}>
          {message}
        </p>
      )}
      <button type="submit" disabled={status === 'loading'}>
        {product.isQuoteOnly ? 'Request quote' : 'Place order'}
      </button>
    </form>
  );
}
