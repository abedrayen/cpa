'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { clearAdminToken } from '@/components/AdminGuard';
import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { href: '/admin', label: 'Tableau de bord' },
  { href: '/admin/products', label: 'Produits' },
  { href: '/admin/orders', label: 'Commandes' },
] as const;

const SIDEBAR_KEY = 'cpa_admin_sidebar_collapsed';

function IconDashboard() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  );
}

function IconProducts() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function IconOrders() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function IconLogout() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function IconChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function IconChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

const ICONS: Record<string, React.ReactNode> = {
  '/admin': <IconDashboard />,
  '/admin/products': <IconProducts />,
  '/admin/orders': <IconOrders />,
};

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cpa_admin_theme');
    }
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-admin-theme', 'light');
    }
  }, []);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(SIDEBAR_KEY) : null;
    setCollapsed(stored === 'true');
  }, []);

  function toggleCollapse() {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem(SIDEBAR_KEY, String(next));
  }

  function handleLogout() {
    clearAdminToken();
    router.push('/admin/login');
  }

  return (
    <aside
      className="admin-sidebar-v2"
      data-collapsed={collapsed}
      aria-label="Navigation administration"
    >
      <div className="admin-sidebar-v2__brand">
        <button
          type="button"
          onClick={toggleCollapse}
          className="admin-sidebar-v2__collapse-btn"
          aria-label={collapsed ? 'Déplier le menu' : 'Replier le menu'}
        >
          {collapsed ? <IconChevronRight /> : <IconChevronLeft />}
        </button>
        <span>CPA Admin</span>
      </div>
      <nav className="admin-sidebar-v2__nav">
        {NAV_ITEMS.map(({ href, label }) => {
          const isCurrent = pathname === href || (href !== '/admin' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className="admin-sidebar-v2__link"
              aria-current={isCurrent ? 'page' : undefined}
              title={collapsed ? label : undefined}
            >
              {ICONS[href]}
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="admin-sidebar-v2__footer">
        <button
          type="button"
          className="admin-sidebar-v2__logout"
          onClick={handleLogout}
        >
          <IconLogout />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </aside>
  );
}
