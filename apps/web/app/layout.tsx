import type { Metadata } from 'next';
import './globals.css';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'),
  title: {
    default: 'Comptoir pro aluminium',
    template: '%s | Comptoir pro aluminium',
  },
  description:
    'Matériaux de construction et solutions d’isolation de qualité. Demande de devis ou achat en ligne. Fournisseur de confiance pour projets résidentiels et commerciaux.',
  icons: {
    icon: '/media/logo.png',
    apple: '/media/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Comptoir pro aluminium',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Comptoir pro aluminium',
  url: siteUrl,
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Comptoir pro aluminium',
  description: 'Matériaux de construction et solutions d’isolation de qualité à Sousse, Tunisie. Devis sur demande ou achat en ligne.',
  url: siteUrl,
  telephone: ['+21631106159', '+21698287926'],
  email: 'contact.cpa@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Cité Zarrouk – Route de Ceinture, route de Tunis – Sousse',
    addressLocality: 'Sousse',
    addressCountry: 'TN',
  },
  areaServed: { '@type': 'City', name: 'Sousse', containedInPlace: { '@type': 'Country', name: 'Tunisia' } },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <a
          href="#main-content"
          className="skip-link"
        >
          Aller au contenu principal
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
