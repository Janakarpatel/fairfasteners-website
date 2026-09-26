import type { Metadata } from 'next';
import contact from '@/data/contact.json';

export const siteName = 'Fair Fasteners';

export const defaultTitle = 'Fair Fasteners | Industrial Fasteners & Hardware';

export const defaultDescription =
  'Fair Fasteners supplies industrial fasteners — bolts, screws, nuts, washers, rivets, and made-to-spec hardware — from Ahmedabad for manufacturing, marine, energy, transport, and infrastructure.';

/** Set NEXT_PUBLIC_SITE_URL to the live domain so canonicals and the sitemap use it. */
export function getSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '');
  if (explicit) return new URL(explicit);

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, '').replace(/\/$/, '');
    return new URL(`https://${host}`);
  }

  return new URL('http://localhost:3000');
}

export const rootMetadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: defaultTitle,
    template: '%s | Fair Fasteners',
  },
  description: defaultDescription,
  applicationName: siteName,
  authors: [{ name: siteName }],
  creator: siteName,
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
  keywords: [
    'Fair Fasteners',
    'industrial fasteners',
    'bolts',
    'screws',
    'nuts',
    'washers',
    'rivets',
    'fastener supplier Ahmedabad',
    'made to spec fasteners',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    url: '/',
  },
  twitter: {
    card: 'summary',
    title: defaultTitle,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${input.title} | ${siteName}`;
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: input.path },
    openGraph: {
      title: fullTitle,
      description: input.description,
      url: input.path,
    },
    twitter: {
      title: fullTitle,
      description: input.description,
    },
  };
}

export function organizationJsonLd() {
  const url = getSiteUrl().origin;
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteName,
    description: defaultDescription,
    url,
    email: contact.email.label,
    telephone: contact.phones[0]?.href.replace('tel:', ''),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'L-124, G.I.D.C Industrial Estate, Road No. 25, Odhav',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      postalCode: '382415',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: contact.maps.lat,
      longitude: contact.maps.lng,
    },
    hasMap: contact.maps.placeUrl,
  };
}
