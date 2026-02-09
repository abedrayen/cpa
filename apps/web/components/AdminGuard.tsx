'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const ADMIN_TOKEN_KEY = 'cpa_admin_token';

export function getAdminToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminToken(token: string): void {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken(): void {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    const token = getAdminToken();
    if (isLoginPage) {
      if (token) router.replace('/admin');
      else setAllowed(true);
      return;
    }
    if (!token) {
      router.replace('/admin/login');
      return;
    }
    setAllowed(true);
  }, [pathname, isLoginPage, router]);

  if (!allowed) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        Loading…
      </div>
    );
  }

  if (isLoginPage) return <>{children}</>;

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <Link href="/admin" className="admin-logo">CPA Admin</Link>
        <nav>
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/categories">Categories</Link>
          <Link href="/admin/products">Products</Link>
          <Link href="/admin/orders">Orders</Link>
        </nav>
        <button
          type="button"
          onClick={() => {
            clearAdminToken();
            router.push('/admin/login');
          }}
        >
          Logout
        </button>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
