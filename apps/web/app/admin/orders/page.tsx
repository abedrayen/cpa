'use client';

import { useEffect, useState } from 'react';
import { getAdminToken } from '@/components/AdminGuard';

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

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;
    const q = statusFilter ? `?status=${statusFilter}` : '';
    fetch(`${API_URL}/admin/orders${q}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => setOrders(data.data ?? []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [statusFilter]);

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <h1>Orders</h1>
      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="">All</option>
        <option value="PENDING">Pending</option>
        <option value="CONFIRMED">Confirmed</option>
        <option value="COMPLETED">Completed</option>
        <option value="CANCELED">Canceled</option>
      </select>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Date</th>
            <th>Items</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id.slice(0, 8)}</td>
              <td>{o.customerName} ({o.customerEmail})</td>
              <td>{o.status}</td>
              <td>{new Date(o.createdAt).toLocaleDateString()}</td>
              <td>{o.items.map((i) => `${i.product.name} x${i.quantity}`).join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
