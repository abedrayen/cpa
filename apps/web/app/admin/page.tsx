import Link from 'next/link';
import { Breadcrumbs } from '@/components/admin/Breadcrumbs';

export default function AdminDashboardPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Admin', href: '/admin' }, { label: 'Tableau de bord' }]} />
      <header className="admin-page-header">
        <h1 className="admin-page-title">Tableau de bord</h1>
        <p style={{ margin: 0, color: 'var(--color-muted)', fontSize: '0.9375rem' }}>
          Vue d’ensemble et actions rapides
        </p>
      </header>
      <nav aria-label="Raccourcis du tableau de bord">
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <li>
            <Link
              href="/admin/products"
              style={{
                display: 'block',
                padding: '1rem 1.25rem',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                color: 'var(--color-text)',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'border-color var(--transition-duration), box-shadow var(--transition-duration)',
              }}
            >
              Manage products
            </Link>
          </li>
          <li>
            <Link
              href="/admin/orders"
              style={{
                display: 'block',
                padding: '1rem 1.25rem',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                color: 'var(--color-text)',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'border-color var(--transition-duration), box-shadow var(--transition-duration)',
              }}
            >
              Gérer les commandes
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
