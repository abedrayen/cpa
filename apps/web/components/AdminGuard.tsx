'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ToastProvider } from '@/components/admin/ToastContext';

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

const navItems = [
  { href: '/admin', label: 'Dashboard', short: 'D' },
  { href: '/admin/products', label: 'Products', short: 'P' },
  { href: '/admin/orders', label: 'Orders', short: 'O' },
] as const;

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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
      <div className="admin-loading" role="status" aria-live="polite">
        Loading…
      </div>
    );
  }

  if (isLoginPage) {
    return (
      <ToastProvider>
        <div className="admin-layout">
          <main className="admin-main" style={{ marginLeft: 0 }}>{children}</main>
        </div>
      </ToastProvider>
    );
  }

  return (
    <ToastProvider>
      <div className="admin-layout">
        <aside
          className="admin-sidebar"
          aria-expanded={!sidebarCollapsed}
          aria-label="Admin navigation"
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0.5rem 0.5rem' }}>
            <Link href="/admin" className="admin-logo" style={{ padding: 0 }}>
              {sidebarCollapsed ? 'CPA' : 'CPA Admin'}
            </Link>
            <button
              type="button"
              className="admin-sidebar-toggle"
              onClick={() => setSidebarCollapsed((v) => !v)}
              aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-expanded={!sidebarCollapsed}
            >
              {sidebarCollapsed ? '→' : '←'}
            </button>
          </div>
          <nav className="admin-sidebar-nav">
            {navItems.map(({ href, label, short }) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href || (href !== '/admin' && pathname.startsWith(href)) ? 'page' : undefined}
                title={sidebarCollapsed ? label : undefined}
                aria-label={sidebarCollapsed ? label : undefined}
              >
                {sidebarCollapsed ? <span aria-hidden>{short}</span> : label}
              </Link>
            ))}
          </nav>
          <div style={{ marginTop: 'auto', padding: '0.5rem 1rem' }}>
            <button
              type="button"
              onClick={() => {
                clearAdminToken();
                router.push('/admin/login');
              }}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                background: 'var(--color-bg)',
                color: 'var(--color-text)',
                cursor: 'pointer',
                fontSize: '0.875rem',
              }}
            >
              {sidebarCollapsed ? 'Out' : 'Logout'}
            </button>
          </div>
        </aside>
        <main className="admin-main">{children}</main>
      </div>
    </ToastProvider>
  );
}
