import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export function Hero() {
  return <>
    <div className="milestone-banner">A Global Milestone <span aria-hidden="true">🌍</span> RevUptime is powering predictive maintenance for industrial teams</div>
    <section className="hero landing-hero">
      <div className="container landing-hero-grid">
        <div className="landing-hero-copy">
          <span className="landing-eyebrow"><i/> PREDICTIVE AI FOR HEAVY MANUFACTURING</span>
          <h1>RevUptime<br/><em>Predictive Intelligence</em></h1>
          <p className="landing-lead">From plant signals to measurable business outcomes.</p>
          <div className="landing-actions">
            <Link className="button landing-gradient" href="#pilot">Book a Discovery Call <ArrowUpRight size={18}/></Link>
            <Link className="button secondary" href="/roi-calculator">Calculate Your ROI <ArrowUpRight size={17}/></Link>
          </div>
        </div>
        <div className="landing-hero-art">
          <Image src="/images/revuptime-predictive-intelligence.png" alt="RevUptime predictive intelligence connecting plant signals to maintenance decisions and measurable business outcomes" width={1536} height={1024} priority sizes="(max-width: 767px) 100vw, 58vw" />
        </div>
      </div>
    </section>
  </>;
}
