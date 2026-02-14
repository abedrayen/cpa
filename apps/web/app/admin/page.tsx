'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAdminToken } from '@/components/AdminGuard';
import { Breadcrumbs } from '@/components/admin/Breadcrumbs';
import { SalesEvolutionChart, TopProductsChart } from './DashboardCharts';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

export interface DashboardData {
  kpis: {
    totalRevenue: number;
    totalOrders: number;
    activeProducts: number;
    newCustomers: number;
    conversionRate: number;
    averageOrderValue: number;
  };
  salesEvolution: { date: string; total: number; count: number }[];
  topProducts: { productId: string; name: string; quantity: number; revenue: number }[];
  lowStockProducts: { id: string; name: string; slug: string; stock: number }[];
  recentOrders: {
    id: string;
    status: string;
    customerName: string;
    customerEmail: string;
    createdAt: string;
    itemCount: number;
    total: number;
  }[];
  alerts: { pendingOrders: number; lowStockCount: number };
}

const STATUS_LABEL: Record<string, string> = {
  PENDING: 'En attente',
  CONFIRMED: 'Confirmée',
  COMPLETED: 'Terminée',
  CANCELED: 'Annulée',
};

function KpiCard({
  label,
  value,
  suffix = '',
}: {
  label: string;
  value: number | string;
  suffix?: string;
}) {
  return (
    <div className="admin-kpi-card">
      <div className="admin-kpi-card__label">
        {label}
      </div>
      <div className="admin-kpi-card__value">
        {typeof value === 'number' && value % 1 !== 0 ? value.toFixed(2) : value}
        {suffix}
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      setLoading(false);
      setError('Non authentifié.');
      return;
    }
    fetch(`${API_URL}/admin/stats/dashboard?days=30`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (r) => {
        const d = await r.json().catch(() => ({}));
        if (!r.ok) {
          if (r.status === 401) setError('Session expirée. Veuillez vous reconnecter.');
          else setError(Array.isArray(d.message) ? d.message[0] : d.message ?? 'Impossible de charger le tableau de bord');
          return;
        }
        setData(d as DashboardData);
        setError(null);
      })
      .catch(() => setError('Impossible de charger le tableau de bord'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <Breadcrumbs items={[{ label: 'Admin', href: '/admin' }, { label: 'Tableau de bord' }]} />
        <div className="admin-dashboard__header">
          <h1 className="admin-dashboard__title">Tableau de bord</h1>
          <p className="admin-dashboard__subtitle">Chargement des indicateurs…</p>
        </div>
        <div className="admin-loading" role="status" aria-live="polite">
          Chargement…
        </div>
      </>
    );
  }

  if (error || !data) {
    return (
      <>
        <Breadcrumbs items={[{ label: 'Admin', href: '/admin' }, { label: 'Tableau de bord' }]} />
        <div className="admin-dashboard__header">
          <h1 className="admin-dashboard__title">Tableau de bord</h1>
        </div>
        <p className="form-error" role="alert">
          {error ?? 'Aucune donnée'}
        </p>
        {error?.includes('Session expirée') && (
          <p style={{ marginTop: '1rem' }}>
            <Link href="/admin/login" className="btn btn-primary">Se reconnecter</Link>
          </p>
        )}
      </>
    );
  }

  const { kpis, salesEvolution, topProducts, lowStockProducts, recentOrders, alerts } = data;

  return (
    <>
      <Breadcrumbs items={[{ label: 'Admin', href: '/admin' }, { label: 'Tableau de bord' }]} />
      <div className="admin-dashboard__header">
        <h1 className="admin-dashboard__title">Tableau de bord</h1>
        <p className="admin-dashboard__subtitle">
          Vue d’ensemble et indicateurs clés
        </p>
      </div>

      <div className="admin-kpi-grid">
        <KpiCard label="Chiffre d'affaires total" value={kpis.totalRevenue} suffix=" TND" />
        <KpiCard label="Commandes totales" value={kpis.totalOrders} />
        <KpiCard label="Produits actifs" value={kpis.activeProducts} />
        <KpiCard label="Nouveaux clients (30j)" value={kpis.newCustomers} />
        <KpiCard label="Taux de conversion" value={kpis.conversionRate} suffix=" %" />
        <KpiCard label="Panier moyen" value={kpis.averageOrderValue} suffix=" TND" />
      </div>

      <div className="admin-dashboard__charts">
        <SalesEvolutionChart data={salesEvolution} />
        <TopProductsChart data={topProducts} />
      </div>

      <div className="admin-dashboard__bottom">
        <div className="admin-card">
          <h3 className="admin-card__title">Alertes</h3>
          <ul className="admin-alert-list">
            {alerts.pendingOrders > 0 && (
              <li>
                <Link href="/admin/orders?status=PENDING">
                  {alerts.pendingOrders} commande{alerts.pendingOrders > 1 ? 's' : ''} en attente
                </Link>
                <span className="admin-badge admin-badge--warning">À traiter</span>
              </li>
            )}
            {alerts.lowStockCount > 0 && (
              <li>
                <Link href="/admin/products">
                  {alerts.lowStockCount} produit{alerts.lowStockCount > 1 ? 's' : ''} en stock faible
                </Link>
                <span className="admin-badge admin-badge--danger">Stock</span>
              </li>
            )}
            {alerts.pendingOrders === 0 && alerts.lowStockCount === 0 && (
              <li style={{ color: 'var(--admin-muted)' }}>Aucune alerte</li>
            )}
          </ul>
        </div>

        <div className="admin-card">
          <h3 className="admin-card__title">Stock faible</h3>
          {lowStockProducts.length > 0 ? (
            <ul className="admin-alert-list">
              {lowStockProducts.slice(0, 5).map((p) => (
                <li key={p.id}>
                  <Link href={`/admin/products/${p.id}/edit`}>{p.name}</Link>
                  <span className="admin-badge admin-badge--danger">{p.stock} en stock</span>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ margin: 0, color: 'var(--admin-muted)', fontSize: '0.9375rem' }}>Aucun produit en stock faible</p>
          )}
        </div>
      </div>

      <div className="admin-card" style={{ marginTop: '1.5rem' }}>
        <h3 className="admin-card__title">Activité récente (commandes)</h3>
        {recentOrders.length > 0 ? (
          <ul className="admin-activity-list">
            {recentOrders.map((o) => (
              <li key={o.id}>
                <div>
                  <Link href={`/admin/orders`}>{o.customerName}</Link>
                  <div className="admin-activity-meta">
                    {new Date(o.createdAt).toLocaleString('fr-FR')} · {o.itemCount} article{o.itemCount > 1 ? 's' : ''} · {o.total.toFixed(2)} TND
                  </div>
                </div>
                <span className="admin-badge admin-badge--warning">{STATUS_LABEL[o.status] ?? o.status}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ margin: 0, color: 'var(--admin-muted)', fontSize: '0.9375rem' }}>Aucune commande récente</p>
        )}
      </div>

      <nav className="admin-quick-actions" aria-label="Actions rapides">
        <Link href="/admin/products/new">Nouveau produit</Link>
        <Link href="/admin/orders">Voir les commandes</Link>
        <Link href="/admin/products">Gérer les produits</Link>
      </nav>
    </>
  );
}
