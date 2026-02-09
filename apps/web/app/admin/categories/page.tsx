'use client';

import { useEffect, useState } from 'react';
import { getAdminToken } from '@/components/AdminGuard';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  children?: Category[];
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;
    fetch(`${API_URL}/admin/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setCategories)
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading…</p>;

  function renderTree(cats: Category[], level = 0) {
    return (
      <ul key={level} style={{ marginLeft: level ? '1rem' : 0 }}>
        {cats.map((c) => (
          <li key={c.id}>
            {c.name} ({c.slug})
            {c.children?.length ? renderTree(c.children, level + 1) : null}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <h1>Categories</h1>
      {categories.length === 0 ? (
        <p>No categories. Create via API or seed.</p>
      ) : (
        renderTree(categories)
      )}
    </div>
  );
}
