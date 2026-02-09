import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Aluminium Products | Windows, Doors & Profiles',
    template: '%s | CPA Aluminium',
  },
  description:
    'High-quality aluminium windows, doors, and profiles. Request a quote or buy online. Trusted supplier for residential and commercial projects.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'CPA Aluminium',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CPA Aluminium',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
