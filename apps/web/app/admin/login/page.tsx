'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setAdminToken } from '@/components/AdminGuard';
import { useToast } from '@/components/admin/ToastContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

export default function AdminLoginPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message?.[0] ?? 'Échec de la connexion');
      if (data.user?.role !== 'ADMIN') {
        throw new Error('Accès refusé. Droits administrateur requis.');
      }
      setAdminToken(data.accessToken);
      addToast('Connexion réussie.', 'success');
      router.replace('/admin');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Échec de la connexion';
      setError(message);
      addToast(message, 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login">
      <h1 id="admin-login-title" style={{ margin: '0 0 1rem', fontSize: '1.25rem' }}>
        Connexion administration
      </h1>
      <form onSubmit={handleSubmit} aria-labelledby="admin-login-title" noValidate>
        <label htmlFor="admin-email">
          E-mail
          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            aria-required="true"
            aria-invalid={!!error}
          />
        </label>
        <label htmlFor="admin-password">
          Mot de passe
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            aria-required="true"
            aria-invalid={!!error}
          />
        </label>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" disabled={loading}>
          {loading ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}
