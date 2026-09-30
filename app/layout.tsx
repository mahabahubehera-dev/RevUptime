import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar, Footer } from '@/components/marketing/layout';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
export const metadata: Metadata = {
  metadataBase: new URL('https://revuptime.com'),
  title: { default: 'RevUptime | AI Predictive Maintenance & Industrial Asset Monitoring', template: '%s | RevUptime' },
  description: 'RevUptime provides AI-powered condition monitoring, predictive maintenance and asset-health intelligence for motors, pumps, conveyors and industrial rotating equipment.',
  alternates: { canonical: '/' },
  openGraph: { type: 'website', siteName: 'RevUptime', title: 'RevUptime — Keep Machines Running.', description: 'AI-assisted condition monitoring and predictive maintenance for industrial operations.', locale: 'en_IN' },
  twitter: { card: 'summary', title: 'RevUptime — Keep Machines Running.', description: 'AI-assisted condition monitoring for industrial operations.' },
  icons: { icon: '/icons/favicon.svg' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth" className={inter.variable}><body><a className="skip-link" href="#main">Skip to content</a><Navbar />{children}<Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Organization', name: 'RevUptime', url: 'https://revuptime.com', logo: 'https://revuptime.com/icons/favicon.svg', parentOrganization: { '@type': 'Organization', name: 'Revapex AI Private Limited' }, address: { '@type': 'PostalAddress', addressLocality: 'Bhubaneswar', addressRegion: 'Odisha', addressCountry: 'IN' } }) }} /></body></html>;
}
