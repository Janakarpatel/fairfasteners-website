import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/seo';
import { isSiteLive } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  const live = isSiteLive();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      ...(live ? {} : { disallow: ['/about', '/products', '/news', '/company'] }),
    },
    sitemap: new URL('/sitemap.xml', getSiteUrl()).href,
  };
}
