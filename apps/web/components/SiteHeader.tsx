import Link from 'next/link';
import Image from 'next/image';
import { HeroBanner } from '@/components/landing/HeroBanner';

export function SiteHeader({
  homeCurrent,
  children,
}: {
  homeCurrent?: boolean;
  children?: React.ReactNode;
} = {}) {
  return (
    <header className="site-header" role="banner">
      <div className="container site-header-bar">
        <Link href="/" className="logo logo-with-name" aria-current={homeCurrent ? 'page' : undefined}>
          <Image
            src="/media/logo.png"
            alt=""
            width={160}
            height={48}
            priority
            style={{ height: 'auto', maxHeight: '48px', width: 'auto' }}
          />
          <span className="logo-name">Comptoir Pro Aliminium</span>
        </Link>
        <nav aria-label="Navigation principale">
          <Link href="/produits">Produits</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </div>
      {homeCurrent && (
        <div className="site-header-banner-wrap">
          <HeroBanner>
            <Image
              src="/media/header.jpg"
              alt="Entrepôt Comptoir Pro Aluminium, profilés et extrusions aluminium"
              fill
              sizes="100vw"
              className="site-header-banner-img"
              loading="eager"
              fetchPriority="high"
            />
          </HeroBanner>
          <div className="hero-overlay" aria-labelledby="hero-heading">
            {children}
          </div>
        </div>
      )}
    </header>
  );
}
