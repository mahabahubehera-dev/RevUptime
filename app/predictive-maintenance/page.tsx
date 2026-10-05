import Link from 'next/link';
import { Activity, AlertTriangle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { predictionCards } from '@/data/revuptime-demo';
import { PageHero } from '@/components/marketing/industrial-ai';

export default function PredictiveMaintenancePage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="PREDICTIVE MAINTENANCE"
        title="Detect the signal before the failure."
        description="RevUptime helps maintenance teams understand abnormal machine behaviour, identify likely developing faults and prioritise the right inspection before conditions escalate."
      />

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="section-eyebrow">AI RISK MODELS</span>
            <h2>Potential faults identified through pattern recognition.</h2>
          </div>

          <div className="three-grid">
            {predictionCards.map((card) => (
              <article key={card.title} className="feature-card">
                <div className="anomaly-header">
                  <div>
                    <small>{card.machine}</small>
                    <h3>{card.title}</h3>
                  </div>
                  <span className={`status ${card.risk === 'High' ? 'critical' : card.risk === 'Medium' ? 'watch' : 'good'}`}>{card.risk}</span>
                </div>
                <p>{card.summary}</p>
                <ul className="tag-list">
                  {card.signals.map((signal) => (
                    <li key={signal}>{signal}</li>
                  ))}
                </ul>
                <p className="small-text"><strong>Recommended action:</strong> {card.recommendation}</p>
                <div className="anomaly-actions">
                  <Link href="/platform/anomalies" className="text-link">View evidence</Link>
                  <Link href="/work-orders" className="text-link">Create work order</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
