import Link from 'next/link';
import { AlertTriangle, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { anomalyFeed } from '@/data/revuptime-demo';
import { seoMetadata } from '@/lib/seo';
export const metadata = seoMetadata('/platform/anomalies', { noindex: true });

export default function AnomaliesPage() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="container">
          <Link className="breadcrumb" href="/platform">RevUptime <span>/</span> Platform</Link>
          <span className="section-eyebrow">ANOMALIES</span>
          <h1>AI anomaly detection.</h1>
          <p>Each alert includes the signal, trend information, deviation and the reason RevUptime flagged the asset for investigation.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="anomaly-list">
            {anomalyFeed.map((item) => (
              <article key={`${item.machine}-${item.parameter}`} className="feature-card anomaly-card">
                <div className="anomaly-header">
                  <div>
                    <small>{item.machine}</small>
                    <h3>{item.parameter}</h3>
                  </div>
                  <span className={`status ${item.severity === 'High' ? 'critical' : item.severity === 'Medium' ? 'watch' : 'good'}`}>{item.severity}</span>
                </div>
                <dl>
                  <div><dt>Detected time</dt><dd>{item.time}</dd></div>
                  <div><dt>Observed</dt><dd>{item.observed}</dd></div>
                  <div><dt>Baseline</dt><dd>{item.baseline}</dd></div>
                  <div><dt>Deviation</dt><dd>{item.deviation}</dd></div>
                  <div><dt>Trend</dt><dd>{item.trend}</dd></div>
                </dl>
                <p>{item.explanation}</p>
                <div className="anomaly-actions">
                  <Link href="/platform" className="text-link">View machine</Link>
                  <Link href="/ai-prescriptions" className="text-link">View evidence</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
