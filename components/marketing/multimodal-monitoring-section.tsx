import Link from 'next/link';
import { Activity, ArrowRight } from 'lucide-react';
import { AlertsEscalationSection } from '@/components/marketing/alerts-escalation-section';

const signals = [
  { number: '01', label: 'MECHANICAL', score: 74, tone: 'mechanical', title: 'Spot wear before it spreads.', text: 'Vibration and temperature reveal bearing wear, misalignment and looseness early.', tags: ['Vibration', 'Temperature', 'Bearings'] },
  { number: '02', label: 'ELECTRICAL', score: 87, tone: 'electrical', title: 'Catch power problems early.', text: 'Voltage, current, power and frequency show overload, imbalance and motor stress.', tags: ['Voltage', 'Current', 'Power', 'Frequency'] },
  { number: '03', label: 'OPERATIONAL', score: 96, tone: 'operational', title: 'Understand the process.', text: 'Temperature, pressure, flow rate and humidity show how operating conditions affect the machine.', tags: ['Pressure', 'Flow rate', 'Humidity'] },
] as const;

function ScoreRing({ score, category }: { score: number; category: string }) {
  const radius = 31;
  const circumference = 2 * Math.PI * radius;
  return (
    <span className="multimodal-score" role="img" aria-label={`Illustrative ${category.toLowerCase()} score: ${score} percent`}>
      <svg viewBox="0 0 76 76" aria-hidden="true">
        <circle className="multimodal-score-track" cx="38" cy="38" r={radius}/>
        <circle className="multimodal-score-arc" cx="38" cy="38" r={radius} strokeDasharray={circumference} strokeDashoffset={circumference * (1 - score / 100)}/>
      </svg>
      <strong>{score}<span>%</span></strong>
    </span>
  );
}

export function MultimodalMonitoringSection() {
  return (
    <section className="section multimodal-section" aria-labelledby="multimodal-title">
      <div className="container">
        <header className="multimodal-heading">
          <span className="multimodal-eyebrow">MULTIMODAL MONITORING</span>
          <h2 id="multimodal-title">Multimodal Condition Monitoring for Predictive Maintenance</h2>
          <p className="multimodal-subtitle">One machine. Three health signals. One clear answer.</p>
          <p className="multimodal-description">Multimodal monitoring combines <strong>mechanical, electrical and operational</strong> data to give your team the full picture of machine health, not just vibration.</p>
        </header>

        <div className="multimodal-grid">
          {signals.map((signal) => (
            <article className={`multimodal-card multimodal-${signal.tone}`} key={signal.label}>
              <div className="multimodal-card-top">
                <span className="multimodal-category"><span>{signal.number}</span><i aria-hidden="true">·</i>{signal.label}</span>
                <ScoreRing score={signal.score} category={signal.label}/>
              </div>
              <h3>{signal.title}</h3>
              <p>{signal.text}</p>
              <ul className="multimodal-tags" aria-label={`${signal.label.toLowerCase()} signals`}>
                {signal.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            </article>
          ))}
        </div>

        <AlertsEscalationSection />

        <div className="multimodal-cta">
          <div className="multimodal-cta-copy">
            <span className="multimodal-cta-mark" aria-hidden="true"><Activity size={19}/></span>
            <h3>Together, they find the real cause.</h3>
            <p>RevUptime&apos;s AI correlates all three signals, so your team knows what changed, why it changed and what to inspect first.</p>
            <div className="multimodal-actions">
              <Link href="/contact" className="button">Book a Pilot <ArrowRight size={16}/></Link>
              <Link href="/#how-it-works" className="multimodal-secondary-link">See How It Works</Link>
            </div>
          </div>
          <aside className="multimodal-alert" aria-label="Illustrative AI alert example">
            <span className="multimodal-alert-label"><i aria-hidden="true"/>AI ALERT · ID FAN M-104</span>
            <p>Vibration is 2× baseline and motor current is up 8%. Likely cause: bearing wear increasing load.</p>
            <span className="multimodal-alert-footer">Illustrative message · for your maintenance team</span>
          </aside>
        </div>
        <p className="multimodal-footnote">Illustrative health scores. Sensor scope and alert thresholds are agreed with your site team during setup.</p>
      </div>
    </section>
  );
}
