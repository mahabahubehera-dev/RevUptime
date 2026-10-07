import Link from 'next/link';
import { seoMetadata } from '@/lib/seo';
import { IndustriesSection, FinalCTA } from '@/components/marketing/sections';

export const metadata = seoMetadata('/industries');

export default function IndustriesPage() {
  return <main id="main">
    <section className="page-hero"><div className="container">
      <Link className="breadcrumb" href="/">RevUptime <span>/</span> Industries</Link>
      <span className="section-eyebrow">INDUSTRIES</span>
      <h1>Predictive maintenance<br/>for your industry.</h1>
      <p>Connect machine health to production priorities. Explore the assets, operating challenges and maintenance opportunities that matter to your plant.</p>
      <div className="hero-buttons"><Link className="button" href="#industries">Explore industries</Link><Link className="button secondary" href="/contact">Discuss your plant</Link></div>
    </div></section>
    <IndustriesSection/>
    <FinalCTA/>
  </main>;
}
