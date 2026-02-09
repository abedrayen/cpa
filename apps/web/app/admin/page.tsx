import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        <li><Link href="/admin/categories">Manage categories</Link></li>
        <li><Link href="/admin/products">Manage products</Link></li>
        <li><Link href="/admin/orders">Manage orders</Link></li>
      </ul>
    </div>
  );
}
