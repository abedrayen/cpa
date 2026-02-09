'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAdminToken } from '@/components/AdminGuard';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: string;
  isActive: boolean;
  category?: { name: string; slug: string };
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;
    fetch(`${API_URL}/admin/products?limit=20`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.data ?? []);
        setMeta(data.meta ?? { page: 1, totalPages: 1 });
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <h1>Products</h1>
      {products.length === 0 ? (
        <p>No products.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Price</th>
              <th>Active</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td><code>{p.slug}</code></td>
                <td>{p.price}</td>
                <td>{p.isActive ? 'Yes' : 'No'}</td>
                <td>{p.category?.name ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p>Full CRUD via API: PUT /api/v1/admin/products/:id, DELETE /api/v1/admin/products/:id</p>
    </div>
  );
}
