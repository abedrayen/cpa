import Link from 'next/link';

/**
 * Footer moderne : navigation SEO, coordonnées, légal, liens sociaux.
 * Sémantique, aéré, transitions hover, WCAG.
 */

const FOOTER_CONTACT = {
  landline: { value: '+216 31 106 159', href: 'tel:+21631106159' },
  mobile: { value: '+216 98 287 926', href: 'tel:+21698287926' },
  email: { value: 'comptoireproaluminium@gmail.com', href: 'mailto:comptoireproaluminium@gmail.com' },
  address: 'Cité Zarrouk – Route de Ceinture, Sousse, Tunisie',
} as const;

const NAV_LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/produits', label: 'Produits' },
  { href: '/#about', label: 'À propos' },
  { href: '/#why-choose-us', label: 'Pourquoi nous choisir' },
  { href: '/#proof', label: 'Ils nous font confiance' },
  { href: '/#contact', label: 'Contact' },
] as const;

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconSmartphone({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function IconMapPin({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer site-footer--modern" role="contentinfo">
      <div className="container site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <p className="site-footer__name">
              <Link href="/" className="site-footer__name-link">
                CPA Aluminium
              </Link>
            </p>
            <p className="site-footer__tagline">
              Fenêtres, portes et profilés aluminium à Sousse, Tunisie.
            </p>
            <nav className="site-footer__social" aria-label="Réseaux sociaux">
              <ul className="site-footer__social-list">
                <li>
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-footer__social-link"
                    aria-label="Facebook CPA Aluminium"
                  >
                    <IconFacebook />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-footer__social-link"
                    aria-label="LinkedIn CPA Aluminium"
                  >
                    <IconLinkedIn />
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <nav className="site-footer__nav" aria-label="Navigation du site">
            <h3 className="site-footer__heading">Navigation</h3>
            <ul className="site-footer__links">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="site-footer__link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__contact">
            <h3 className="site-footer__heading">Coordonnées</h3>
            <ul className="site-footer__contact-list">
              <li>
                <a href={FOOTER_CONTACT.landline.href} rel="noopener noreferrer" className="site-footer__contact-link">
                  <span className="site-footer__contact-icon" aria-hidden>
                    <IconPhone />
                  </span>
                  {FOOTER_CONTACT.landline.value}
                </a>
              </li>
              <li>
                <a href={FOOTER_CONTACT.mobile.href} rel="noopener noreferrer" className="site-footer__contact-link">
                  <span className="site-footer__contact-icon" aria-hidden>
                    <IconSmartphone />
                  </span>
                  {FOOTER_CONTACT.mobile.value}
                </a>
              </li>
              <li>
                <a href={FOOTER_CONTACT.email.href} rel="noopener noreferrer" className="site-footer__contact-link site-footer__contact-link--wrap">
                  <span className="site-footer__contact-icon" aria-hidden>
                    <IconMail />
                  </span>
                  {FOOTER_CONTACT.email.value}
                </a>
              </li>
              <li className="site-footer__address">
                <span className="site-footer__contact-icon" aria-hidden>
                  <IconMapPin />
                </span>
                {FOOTER_CONTACT.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copy">
            &copy; {year} CPA Aluminium. Tous droits réservés.
          </p>
          <nav className="site-footer__legal" aria-label="Informations légales">
            <Link href="/mentions-legales" className="site-footer__legal-link">
              Mentions légales
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
