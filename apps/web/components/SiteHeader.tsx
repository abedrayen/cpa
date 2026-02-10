import Link from 'next/link';
import Image from 'next/image';

export function SiteHeader({ homeCurrent }: { homeCurrent?: boolean } = {}) {
  return (
    <header className="site-header" role="banner">
      <div className="container">
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
        <nav aria-label="Main">
          <Link href="/products">Products</Link>
        </nav>
      </div>
    </header>
  );
}
