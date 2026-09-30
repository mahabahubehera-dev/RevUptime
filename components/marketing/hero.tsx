import Link from 'next/link';
import { Play, Check, MapPin, Cpu, ShieldCheck, Factory } from 'lucide-react';
import { HeroVisual } from '@/components/marketing/hero-visual';

export function Hero() {
  return <>
    <section className="hero hero-image-led">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow"><span/> AI-POWERED INDUSTRIAL RELIABILITY</div>
          <h1>Keep Machines<br/><em>Running.</em></h1>
          <p className="hero-description">AI-powered condition monitoring that learns how your machines normally operate, detects emerging abnormalities, and helps maintenance teams act before conditions escalate into downtime.</p>
          <p className="hero-intelligence-line">Monitor. Learn. Detect. Explain. Act.</p>
          <div className="hero-ai-stack" aria-label="RevUptime intelligence inputs">
            <span>Vibration</span><b>+</b><span>Temperature</span><b>+</b><span>Machine History</span><b>+</b><span>AI</span>
          </div>
          <div className="hero-buttons">
            <Link className="button" href="/contact">Book a 90-Day Pilot</Link>
            <Link className="button secondary" href="#how-it-works"><Play size={15}/> See How It Works</Link>
          </div>
          <div className="hero-note"><Check size={16}/> Sensors collect the data. RevUptime understands the machine.</div>
          <div className="hero-assets">
            <span>YOUR AI RELIABILITY ENGINEER</span>
            <p>From sensor readings to maintenance intelligence.</p>
          </div>
        </div>

        <HeroVisual/>
      </div>
    </section>
    <section className="trust-strip" aria-label="Our focus">
      <div className="container">{[[MapPin,'Built in Odisha'],[Cpu,'Industrial IoT'],[ShieldCheck,'AI-Powered Reliability'],[Factory,'Designed for Indian Plants']].map(([Icon,name])=>{const I=Icon as typeof MapPin;return <span key={name as string}><I size={20}/>{name as string}</span>;})}</div>
    </section>
  </>;
}
