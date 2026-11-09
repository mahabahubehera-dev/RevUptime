import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Globe } from 'lucide-react';

export function Hero() {
  return <>
    <div className="milestone-banner"><span aria-hidden="true">🌍</span> RevUptime is powering predictive maintenance for industrial teams</div>
    <section className="hero landing-hero">
      <div className="container landing-hero-grid">
        <div className="landing-hero-copy">
          <span className="landing-eyebrow"><i/> PREDICTIVE AI FOR HEAVY MANUFACTURING</span>
          <h1>AI Predictive Maintenance<br/><em>That Stops Breakdowns Before They Happen</em></h1>
          <p className="landing-lead">A practical computerised maintenance system for plants that want earlier warning signs, fewer unplanned shutdowns and a clearer maintenance plan.</p>
          <p className="landing-sublead">We provide the full hardware + software stack—sensors, gateway, connectivity and the RevUptime platform—so there is no procurement ambiguity about what is included. The system pairs explainable AI with a practical 90-day pilot to turn plant evidence into maintenance decisions.</p>
          <div className="hero-whatsapp-example" aria-label="Illustrative WhatsApp-style maintenance alert">
            <span>Example maintenance alert</span>
            <p>“ID Fan M-104 is 100% above its normal vibration baseline. Check bearing alignment before the next shift.”</p>
            <small>Illustrative message · for your maintenance team</small>
          </div>
          <Link className="hero-local-seo" href="/blog/predictive-maintenance-steel-plants-odisha">Predictive maintenance for steel plants, mining operations, cement plants and process industries across the Globe.</Link>
          <div className="landing-actions">
            <Link className="button landing-gradient" href="#pilot">Book a Discovery Call <ArrowUpRight size={18}/></Link>
            <Link className="button secondary" href="/roi-calculator">Calculate Your ROI <ArrowUpRight size={17}/></Link>
          </div>
        </div>
        <div className="landing-hero-art" style={{ position: 'relative' }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
            tabIndex={-1}
            aria-hidden="true"
            width={1920}
            height={1080}
            style={{ pointerEvents: 'none', userSelect: 'none' }}
            aria-label="RevUptime multimodal asset health and predictive maintenance visualization"
          >
            <source src="/images/hero-telemetry.mp4" type="video/mp4" />
          </video>
          {/* Transparent click/hover shield so the browser never displays media controls or context menus */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 10,
              pointerEvents: 'auto',
              cursor: 'default',
              background: 'transparent',
            }}
          />
        </div>
      </div>
    </section>
  </>;
}
