'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ToastProvider } from '@/components/admin/ToastContext';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

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
      <div className="admin-loading" role="status" aria-live="polite">
        Chargement…
      </div>
    );
  }

  if (isLoginPage) {
    return (
      <ToastProvider>
        <div className="admin-layout">
          <main id="main-content" className="admin-main" style={{ marginLeft: 0 }}>{children}</main>
        </div>
      </ToastProvider>
    );
  }

  return (
    <ToastProvider>
      <div className="admin-portal admin-layout">
        <AdminSidebar />
        <main id="main-content" className="admin-main-v2 admin-main">{children}</main>
      </div>
    </ToastProvider>
  );
}
