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
          <p className="landing-lead">A practical computerised maintenance system for plants that want earlier warning signs, fewer unplanned shutdowns and a clearer maintenance plan.</p>
          <p className="landing-sublead">We provide the full hardware + software stack—sensors, gateway, connectivity and the RevUptime platform—so there is no procurement ambiguity about what is included. The system pairs explainable AI with a practical 90-day pilot to turn plant evidence into maintenance decisions.</p>
          <div className="hero-whatsapp-example" aria-label="Illustrative WhatsApp-style maintenance alert">
            <span>Example maintenance alert</span>
            <p>“ID Fan M-104 is 100% above its normal vibration baseline. Check bearing alignment before the next shift.”</p>
            <small>Illustrative message · for your maintenance team</small>
          </div>
          <p className="hero-local-seo">Predictive maintenance for steel plants, mining operations, cement plants and process industries across Odisha, including Jharsuguda, Angul, Rourkela, Talcher, Paradeep, Kalinga Nagar and Dhenkanal.</p>
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
