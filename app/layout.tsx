import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar, Footer } from '@/components/marketing/layout';
import { JsonLd } from '@/components/seo/json-ld';
import { seo } from '@/data/seo';
import { SITE_URL, SITE_NAME, OG_IMAGE, ORG_ID } from '@/lib/seo';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: seo['/'].title, template: '%s | RevUptime' },
  description: seo['/'].description,
  applicationName: SITE_NAME,
  openGraph: { type: 'website', siteName: SITE_NAME, title: seo['/'].title, description: seo['/'].description, locale: 'en_IN', url: '/', images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', title: seo['/'].title, description: seo['/'].description, images: [OG_IMAGE.url] },
  icons: { icon: '/icons/favicon.svg' },
};
const siteJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    alternateName: 'RevUptime Predictive Intelligence',
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/revuptime-logo.png`, width: 600, height: 150 },
    image: `${SITE_URL}${OG_IMAGE.url}`,
    description: 'RevUptime is an AI predictive-maintenance and condition-monitoring platform by Revapex AI Private Limited, Bhubaneswar, Odisha, providing vibration and temperature sensors, a gateway and explainable AI for steel, mining, cement and process plants in India.',
    parentOrganization: { '@type': 'Organization', name: 'Revapex AI Private Limited' },
    address: { '@type': 'PostalAddress', addressLocality: 'Bhubaneswar', addressRegion: 'Odisha', addressCountry: 'IN' },
    areaServed: [{ '@type': 'State', name: 'Odisha' }, { '@type': 'Country', name: 'India' }],
    knowsAbout: ['Predictive maintenance', 'Condition monitoring', 'Vibration monitoring', 'Industrial IoT', 'Reliability engineering', 'Explainable AI'],
    contactPoint: { '@type': 'ContactPoint', contactType: 'sales', url: `${SITE_URL}/contact`, areaServed: 'IN' },
  },
  { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: SITE_NAME, url: SITE_URL, inLanguage: 'en-IN', publisher: { '@id': ORG_ID } },
];
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth" className={inter.variable}><body><a className="skip-link" href="#main">Skip to content</a><Navbar />{children}<Footer /><JsonLd data={siteJsonLd} /></body></html>;
}
