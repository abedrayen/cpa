'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  Cell,
} from 'recharts';
import type { DashboardData } from './page';

export function SalesEvolutionChartInner({ data }: { data: DashboardData['salesEvolution'] }) {
  if (!data?.length) {
    return (
      <div className="admin-card" style={{ minHeight: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--admin-muted)' }}>
        Aucune donnée sur la période
      </div>
    );
  }
  return (
    <div className="admin-card">
      <h3 className="admin-card__title">Évolution des ventes (30 jours)</h3>
      <div style={{ width: '100%', height: 280 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(v: string | number) => new Date(String(v)).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
            />
            <YAxis tickFormatter={(v: number | undefined) => `${v ?? 0} TND`} />
            <Tooltip
              formatter={(value: number | undefined) => [`${Number(value ?? 0).toFixed(2)} TND`, 'Chiffre d\'affaires']}
              labelFormatter={(label: React.ReactNode) => new Date(String(label ?? '')).toLocaleDateString('fr-FR')}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="total"
              name="CA (TND)"
              stroke="var(--color-primary-600)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const BAR_COLORS = ['var(--color-primary-500)', 'var(--color-primary-400)', 'var(--color-primary-300)', 'var(--color-secondary-400)', 'var(--color-secondary-500)'];

export function TopProductsChartInner({ data }: { data: DashboardData['topProducts'] }) {
  if (!data?.length) {
    return (
      <div className="admin-card" style={{ minHeight: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--admin-muted)' }}>
        Aucun produit vendu
      </div>
    );
  }
  const chartData = data.slice(0, 8).map((p) => ({
    name: p.name.length > 25 ? p.name.slice(0, 22) + '…' : p.name,
    revenue: p.revenue,
    quantity: p.quantity,
  }));
  return (
    <div className="admin-card">
      <h3 className="admin-card__title">Top produits (CA)</h3>
      <div style={{ width: '100%', height: 280 }}>
        <ResponsiveContainer>
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tickFormatter={(v: number | undefined) => `${v ?? 0} TND`} />
            <YAxis type="category" dataKey="name" width={75} tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(value: number | undefined, _name: string | undefined, props: { payload?: { quantity?: number } }) => [
                `${Number(value ?? 0).toFixed(2)} TND`,
                `Quantité: ${props.payload?.quantity ?? 0}`,
              ]}
            />
            <Bar dataKey="revenue" name="CA (TND)" radius={[0, 4, 4, 0]}>
              {chartData.map((_, i) => (
                <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
