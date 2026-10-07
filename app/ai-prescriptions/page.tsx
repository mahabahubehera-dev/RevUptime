import Link from 'next/link';
import { Activity, ArrowUpRight, Sparkles } from 'lucide-react';
import { aiPrescriptions } from '@/data/revuptime-demo';
import { PageHero } from '@/components/marketing/industrial-ai';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata({ title: 'AI Maintenance Prescriptions Demo', description: 'Illustrative AI maintenance prescriptions linking machine faults to recommended actions.', path: '/ai-prescriptions', noindex: true });

export default function AIPrescriptionsPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="AI PRESCRIPTIONS"
        title="AI recommendations built around maintenance action."
        description="Turn anomaly evidence into a practical next step for the maintenance team, including the likely fault, evidence and recommended action."
      />

      <section className="section">
        <div className="container">
          <div className="three-grid">
            {aiPrescriptions.map((item) => (
              <article key={item.machine} className="feature-card">
                <div className="anomaly-header">
                  <div>
                    <small>{item.machine}</small>
                    <h3>{item.pattern}</h3>
                  </div>
                  <span className={`status ${item.risk === 'High' ? 'critical' : item.risk === 'Medium' ? 'watch' : 'good'}`}>{item.risk}</span>
                </div>
                <p><strong>Potential fault:</strong> {item.fault}</p>
                <p><strong>Evidence:</strong> {item.evidence}</p>
                <p><strong>Recommended action:</strong> {item.action}</p>
                <div className="anomaly-actions">
                  <Link href="/platform/assets" className="text-link">Create work order</Link>
                  <Link href="/ai-copilot" className="text-link">Assign technician</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
