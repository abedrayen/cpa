/**
 * Contact section: semantic HTML, tel:/mailto: links, inline SVGs (no extra lib).
 * Local SEO–friendly; pair with Schema.org LocalBusiness in layout.
 */

const CONTACT = {
  landline: { label: 'Téléphone fixe', value: '+216 31 106 159', href: 'tel:+21631106159' },
  mobile: { label: 'Mobile', value: '+216 98 287 926', href: 'tel:+21698287926' },
  email: {
    label: 'E-mail',
    value: 'comptoireproaluminium@gmail.com',
    href: 'mailto:comptoireproaluminium@gmail.com',
  },
  address: {
    label: 'Adresse',
    value: 'Cité Zarrouk – Route de Ceinture, route de Tunis – Sousse',
    city: 'Sousse, Tunisie',
  },
} as const;

function IconPhone() {
  return (
    <svg
      className="contact-card__icon"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg
      className="contact-card__icon"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function IconMapPin() {
  return (
    <svg
      className="contact-card__icon"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function ContactSection() {
  return (
    <section
      id="contact"
      className="contact-section"
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <h2 id="contact-heading" className="contact-section__title">
          Nous contacter
        </h2>
        <p className="contact-section__lead">
          Contactez-nous à Sousse, Tunisie. Nous sommes à votre disposition pour vos projets aluminium.
        </p>
        <div className="contact-grid" role="list">
          <article className="contact-card" role="listitem">
            <span className="contact-card__label">{CONTACT.landline.label}</span>
            <a
              href={CONTACT.landline.href}
              className="contact-card__link"
              rel="noopener noreferrer"
            >
              <IconPhone />
              <span>{CONTACT.landline.value}</span>
            </a>
          </article>
          <article className="contact-card" role="listitem">
            <span className="contact-card__label">{CONTACT.mobile.label}</span>
            <a
              href={CONTACT.mobile.href}
              className="contact-card__link"
              rel="noopener noreferrer"
            >
              <IconPhone />
              <span>{CONTACT.mobile.value}</span>
            </a>
          </article>
          <article className="contact-card" role="listitem">
            <span className="contact-card__label">{CONTACT.email.label}</span>
            <a
              href={CONTACT.email.href}
              className="contact-card__link"
              rel="noopener noreferrer"
            >
              <IconMail />
              <span>{CONTACT.email.value}</span>
            </a>
          </article>
          <article className="contact-card contact-card--address" role="listitem">
            <span className="contact-card__label">{CONTACT.address.label}</span>
            <address className="contact-card__address">
              <IconMapPin />
              <span>
                {CONTACT.address.value}
                <br />
                <strong>{CONTACT.address.city}</strong>
              </span>
            </address>
          </article>
        </div>
      </div>
    </section>
  );
}
