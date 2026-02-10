'use client';

import { useEffect, useState } from 'react';
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
  createdAt: string;
  items: OrderItem[];
}

const STATUS_CLASS: Record<string, string> = {
  PENDING: 'admin-status--pending',
  CONFIRMED: 'admin-status--confirmed',
  COMPLETED: 'admin-status--completed',
  CANCELED: 'admin-status--canceled',
};

function StatusBadge({ status }: { status: string }) {
  const className = STATUS_CLASS[status] ?? 'admin-status--pending';
  return (
    <span className={`admin-status ${className}`}>
      {status}
    </span>
  );
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('');

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
        setError('Failed to load orders.');
      })
      .finally(() => setLoading(false));
  }, [statusFilter]);

  if (loading && orders.length === 0) {
    return (
      <>
        <Breadcrumbs items={[{ label: 'Admin', href: '/admin' }, { label: 'Orders' }]} />
        <div className="admin-page-header">
          <h1 className="admin-page-title">Orders</h1>
        </div>
        <div className="admin-loading" role="status" aria-live="polite">
          Loading orders…
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Admin', href: '/admin' },
          { label: 'Orders', href: '/admin/orders' },
        ]}
      />
      <header className="admin-page-header">
        <h1 className="admin-page-title">Orders</h1>
        <p style={{ margin: 0, color: 'var(--color-muted)', fontSize: '0.9375rem' }}>
          {orders.length > 0 ? `${orders.length} order${orders.length !== 1 ? 's' : ''}` : 'No orders'}
        </p>
      </header>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <div className="admin-sticky-bar">
        <label htmlFor="order-status-filter" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          Filter by status:
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
            <option value="">All</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELED">Canceled</option>
          </select>
        </label>
      </div>

      {orders.length === 0 && !error ? (
        <div className="admin-empty">
          <p>No orders match the current filter.</p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table" role="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Customer</th>
                <th scope="col">Status</th>
                <th scope="col">Date</th>
                <th scope="col">Items</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
