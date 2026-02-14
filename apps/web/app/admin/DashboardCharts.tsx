'use client';

import dynamic from 'next/dynamic';
import type { DashboardData } from './page';

const SalesEvolutionChartInner = dynamic(
  () => import('@/app/admin/DashboardChartsInner').then((m) => m.SalesEvolutionChartInner),
  { ssr: false, loading: () => <div className="admin-card" style={{ minHeight: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--admin-muted)' }}>Chargement…</div> }
);

const TopProductsChartInner = dynamic(
  () => import('@/app/admin/DashboardChartsInner').then((m) => m.TopProductsChartInner),
  { ssr: false, loading: () => <div className="admin-card" style={{ minHeight: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--admin-muted)' }}>Chargement…</div> }
);

export function SalesEvolutionChart({ data }: { data: DashboardData['salesEvolution'] }) {
  return <SalesEvolutionChartInner data={data} />;
}

export function TopProductsChart({ data }: { data: DashboardData['topProducts'] }) {
  return <TopProductsChartInner data={data} />;
}
