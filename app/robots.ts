import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

// AI search and answer-engine crawlers are listed explicitly so they stay allowed (GEO).
const aiCrawlers = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot', 'CCBot'];
const disallow = ['/api/', '/sign-in'];

export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: '*', allow: '/', disallow }, { userAgent: aiCrawlers, allow: '/', disallow }], sitemap: `${SITE_URL}/sitemap.xml` };
}
