import type { MetadataRoute } from 'next';
import { getNewsItems } from '@/lib/news';
import { getSiteUrl } from '@/lib/seo';
import { isSiteLive } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteUrl();
  const lastModified = new Date();
  const paths = ['/'];

  if (isSiteLive()) {
    paths.push('/about', '/products', '/news');
    for (const item of getNewsItems()) {
      paths.push(`/news/${item.slug}`);
    }
  }

  return paths.map((path) => ({
    url: new URL(path, origin).href,
    lastModified,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path.startsWith('/news/') ? 0.6 : 0.8,
  }));
}
