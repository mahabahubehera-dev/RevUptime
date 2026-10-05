import type { Metadata } from 'next';
import Link from 'next/link';
import { IndustriesSection, FinalCTA } from '@/components/marketing/sections';

export const metadata: Metadata = {
  title: 'Industries',
  description: 'Explore predictive maintenance and asset reliability for steel, mining, manufacturing and process industries.',
};

export default function IndustriesPage() {
  return <main id="main">
    <section className="page-hero"><div className="container">
      <Link className="breadcrumb" href="/">RevUptime <span>/</span> Industries</Link>
      <span className="section-eyebrow">INDUSTRIES</span>
      <h1>Reliability for the way<br/>your industry operates.</h1>
      <p>Connect machine health to production priorities. Explore the assets, operating challenges and maintenance opportunities that matter to your plant.</p>
      <div className="hero-buttons"><Link className="button" href="#industries">Explore industries</Link><Link className="button secondary" href="/contact">Discuss your plant</Link></div>
    </div></section>
    <IndustriesSection/>
    <FinalCTA/>
  </main>;
}
