'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAdminToken } from '@/components/AdminGuard';
import { Breadcrumbs } from '@/components/admin/Breadcrumbs';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

interface OrderItem {
  productId: string;
  product: { name: string; slug: string };
  quantity: number;
  unitPrice: string;
}

interface Order {
  id: string;
  status: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  notes?: string | null;
  createdAt: string;
  items: OrderItem[];
}

const STATUS_CLASS: Record<string, string> = {
  PENDING: 'admin-status--pending',
  CONFIRMED: 'admin-status--confirmed',
  COMPLETED: 'admin-status--completed',
  CANCELED: 'admin-status--canceled',
};

const STATUS_LABEL: Record<string, string> = {
  PENDING: 'En attente',
  CONFIRMED: 'Confirmée',
  COMPLETED: 'Terminée',
  CANCELED: 'Annulée',
};

function StatusBadge({ status }: { status: string }) {
  const className = STATUS_CLASS[status] ?? 'admin-status--pending';
  return (
    <span className={`admin-status ${className}`}>
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}

function exportOrdersToCsv(orders: Order[]) {
  const headers = ['ID', 'Date', 'Client', 'Email', 'Téléphone', 'Statut', 'Articles', 'Total (TND)', 'Remarques'];
  const rows = orders.map((o) => {
    const total = o.items.reduce((s, i) => s + i.quantity * parseFloat(i.unitPrice), 0);
    const articles = o.items.map((i) => `${i.product.name} × ${i.quantity}`).join(' ; ');
    return [
      o.id,
      new Date(o.createdAt).toISOString().slice(0, 10),
      o.customerName,
      o.customerEmail,
      o.customerPhone ?? '',
      STATUS_LABEL[o.status] ?? o.status,
      articles,
      total.toFixed(2),
      (o.notes ?? '').replace(/"/g, '""'),
    ];
  });
  const csv = [headers.join(','), ...rows.map((r) => r.map((c) => `"${String(c)}"`).join(','))].join('\r\n');
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `commandes-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminOrdersPage() {
  const searchParams = useSearchParams();
  const statusFromUrl = searchParams.get('status') ?? '';
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState(statusFromUrl);

  useEffect(() => {
    setStatusFilter(statusFromUrl);
  }, [statusFromUrl]);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;
    setLoading(true);
    setError(null);
    const q = statusFilter ? `?status=${statusFilter}` : '';
    fetch(`${API_URL}/admin/orders${q}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => setOrders(data.data ?? []))
      .catch(() => {
        setOrders([]);
        setError('Impossible de charger les commandes.');
      })
      .finally(() => setLoading(false));
  }, [statusFilter]);

  if (loading && orders.length === 0) {
    return (
      <>
        <Breadcrumbs items={[{ label: 'Admin', href: '/admin' }, { label: 'Commandes' }]} />
        <header className="admin-page-hero">
          <h1 className="admin-page-hero__title">Commandes</h1>
          <p className="admin-page-hero__subtitle">Chargement des commandes…</p>
        </header>
        <div className="admin-loading" role="status" aria-live="polite">
          Chargement…
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Admin', href: '/admin' },
          { label: 'Commandes', href: '/admin/orders' },
        ]}
      />
      <header className="admin-page-hero">
        <div className="admin-page-hero__title-block">
          <h1 className="admin-page-hero__title">Commandes</h1>
          {orders.length > 0 && (
            <span className="admin-page-hero__count" aria-label={`${orders.length} commande${orders.length !== 1 ? 's' : ''}`}>
              {orders.length} commande{orders.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        <p className="admin-page-hero__subtitle">
          {orders.length > 0
            ? 'Consultez et gérez les demandes et commandes clients.'
            : 'Aucune commande pour le moment.'}
        </p>
      </header>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <div className="admin-sticky-bar">
        <label htmlFor="order-status-filter" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          Filtrer par statut :
          <select
            id="order-status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '0.5rem 0.75rem',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              background: 'var(--color-surface)',
              color: 'var(--color-text)',
              fontSize: '0.875rem',
            }}
          >
            <option value="">Toutes</option>
            <option value="PENDING">En attente</option>
            <option value="CONFIRMED">Confirmée</option>
            <option value="COMPLETED">Terminée</option>
            <option value="CANCELED">Annulée</option>
          </select>
        </label>
        <button
          type="button"
          onClick={() => exportOrdersToCsv(orders)}
          disabled={orders.length === 0}
          className="btn btn-outline"
          style={{ fontSize: '0.875rem' }}
        >
          Exporter en CSV
        </button>
      </div>

      {orders.length === 0 && !error ? (
        <div className="admin-empty">
          <p>Aucune commande ne correspond au filtre.</p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table" role="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Client</th>
                <th scope="col">Statut</th>
                <th scope="col">Date</th>
                <th scope="col">Articles</th>
                <th scope="col">Remarques</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>
                    <code style={{ fontSize: '0.8125rem' }}>{o.id.slice(0, 8)}</code>
                  </td>
                  <td>
                    {o.customerName}
                    <br />
                    <span style={{ fontSize: '0.8125rem', color: 'var(--color-muted)' }}>
                      {o.customerEmail}
                    </span>
                    {o.customerPhone ? (
                      <>
                        <br />
                        <span style={{ fontSize: '0.8125rem', color: 'var(--color-muted)' }}>
                          {o.customerPhone}
                        </span>
                      </>
                    ) : null}
                  </td>
                  <td>
                    <StatusBadge status={o.status} />
                  </td>
                  <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: '0.875rem' }}>
                      {o.items.map((i) => (
                        <li key={i.productId}>
                          {i.product.name} × {i.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', maxWidth: '260px' }}>
                    {o.notes ?? '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
