import Image from 'next/image';
import Link from 'next/link';
import { Maximize2, Radio } from 'lucide-react';

export function HeroVisual() {
  return (
    <figure className="hero-intelligence-visual">
      <div className="hero-visual-meta">
        <span><Radio size={14}/> From plant signals to maintenance action</span>
        <span>Concept preview</span>
      </div>
      <div className="hero-image-frame">
        <Image
          src="/images/revuptime-predictive-intelligence.png"
          alt="Illustrated RevUptime workflow connecting oil analysis, smart sensors and plant systems to AI-assisted maintenance decisions"
          width={1536}
          height={1024}
          priority
          sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1200px) 56vw, 740px"
        />
      </div>
      <figcaption>
        <span>Sense</span><i/><span>Understand</span><i/><span>Prioritise</span><i/><span>Act</span>
        <Link href="/images/revuptime-predictive-intelligence.png" target="_blank" rel="noreferrer"><Maximize2 size={13}/> View full visual</Link>
      </figcaption>
    </figure>
  );
}
