import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { industryPages } from '@/data/pages';

const lastModified = new Date('2026-10-07');
const core: [string, number][] = [['', 1], ['/product', .9], ['/solutions/predictive-maintenance', .9], ['/pilot', .9], ['/industries', .9], ['/ai-intelligence', .8], ['/platform', .8], ['/solutions', .8], ['/roi-calculator', .8], ['/resources', .7], ['/about', .7], ['/contact', .7], ['/privacy', .3], ['/terms', .3]];

export default function sitemap(): MetadataRoute.Sitemap {
  const industries: [string, number][] = Object.keys(industryPages).map(slug => [`/industries/${slug}`, .8]);
  return [...core, ...industries, ['/resources/revuptime-industrial-reliability-guide.html', .6] as [string, number]].map(([path, priority]) => ({ url: `${SITE_URL}${path}`, lastModified, changeFrequency: 'monthly', priority }));
}
