import type { Metadata } from 'next';
import { seo, type SeoPath, type PageSeo } from '@/data/seo';

export const SITE_URL = 'https://revuptime.com';
export const SITE_NAME = 'RevUptime';
export const OG_IMAGE = { url: '/images/og/revuptime-og.png', width: 1200, height: 630, alt: 'RevUptime — AI predictive maintenance and condition monitoring for industrial plants' };
export const ORG_ID = `${SITE_URL}/#organization`;

type PageMeta = PageSeo & { path: string; noindex?: boolean };

export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 160;

/** Per-page metadata with a self-referencing canonical and complete Open Graph / Twitter tags. */
export function pageMetadata({ title, description, path, noindex = false, absoluteTitle = false }: PageMeta): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  if (fullTitle.length > TITLE_MAX) console.warn(`[seo] ${path}: title is ${fullTitle.length} chars (max ${TITLE_MAX})`);
  if (description.length > DESCRIPTION_MAX) console.warn(`[seo] ${path}: description is ${description.length} chars (max ${DESCRIPTION_MAX})`);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { type: 'website', siteName: SITE_NAME, locale: 'en_IN', title: fullTitle, description, url: path, images: [OG_IMAGE] },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [OG_IMAGE.url] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Metadata for a route whose copy lives in data/seo.ts. */
export function seoMetadata(path: SeoPath, opts: { noindex?: boolean } = {}): Metadata {
  return pageMetadata({ ...seo[path], path, ...opts });
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...items].map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: `${SITE_URL}${item.path === '/' ? '' : item.path}` })),
  };
}

export function faqJsonLd(questions: readonly (readonly string[])[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
}

export function serviceJsonLd({ name, description, path, serviceType }: { name: string; description: string; path: string; serviceType: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType,
    url: `${SITE_URL}${path}`,
    provider: { '@id': ORG_ID },
    areaServed: [{ '@type': 'State', name: 'Odisha' }, { '@type': 'Country', name: 'India' }],
  };
}
