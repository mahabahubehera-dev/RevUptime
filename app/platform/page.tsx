import Link from 'next/link';
import { Activity, AlertTriangle, ArrowUpRight, Gauge, ShieldCheck, Sparkles } from 'lucide-react';
import { machineAssets } from '@/data/revuptime-demo';
import { PageHero, StatusBadge } from '@/components/marketing/industrial-ai';

const metrics = [
  { label: 'Machines Monitored', value: '48', hint: 'Across demo plant' },
  { label: 'Healthy', value: '39', hint: 'Normal operating range' },
  { label: 'Warning', value: '6', hint: 'Review trend changes' },
  { label: 'Critical', value: '3', hint: 'Engineering review needed' },
  { label: 'AI Alerts', value: '12', hint: 'Current notifications' },
  { label: 'Detected Anomalies', value: '07', hint: 'Active signal changes' },
  { label: 'Active Predictions', value: '03', hint: 'AI-assisted risk patterns' },
  { label: 'AI Prescriptions', value: '05', hint: 'Recommended actions' },
];

export default function PlatformPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="PLATFORM"
        title="AI machine health, from signal to action."
        description="Monitor critical assets, interpret abnormal behaviour, and prioritise maintenance activity based on machine health, evidence and risk."
      />

      <section className="section">
        <div className="container">
          <div className="three-grid">
            {metrics.map((metric) => (
              <div key={metric.label} className="metric-card">
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
                <small>{metric.hint}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section light-section">
        <div className="container two-column">
          <div>
            <div className="section-heading">
              <span className="section-eyebrow">MACHINE HEALTH DISTRIBUTION</span>
              <h2>See which assets need attention first.</h2>
            </div>
            <div className="status-stack">
              <div>
                <span className="status good">Healthy</span>
                <strong>39</strong>
                <small>Stable operating range</small>
              </div>
              <div>
                <span className="status watch">Warning</span>
                <strong>6</strong>
                <small>Abnormal behaviour under review</small>
              </div>
              <div>
                <span className="status critical">Critical</span>
                <strong>3</strong>
                <small>Requires engineering attention</small>
              </div>
            </div>
          </div>

          <div>
            <div className="section-heading">
              <span className="section-eyebrow">AI RISK RANKING</span>
              <h2>Machine prioritisation by signal evidence.</h2>
            </div>
            <div className="risk-list">
              {machineAssets.slice(0, 4).map((asset) => (
                <div key={asset.id} className="risk-row">
                  <div>
                    <strong>{asset.name}</strong>
                    <small>{asset.type}</small>
                  </div>
                  <StatusBadge label={asset.status} />
                  <span>{asset.risk} Risk</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split-heading">
            <div className="section-heading">
              <span className="section-eyebrow">ASSET OVERVIEW</span>
              <h2>Monitor live machine health.</h2>
            </div>
            <Link href="/platform/assets" className="text-link">View all assets</Link>
          </div>

          <div className="three-grid">
            {machineAssets.map((asset) => (
              <article key={asset.id} className="asset-card feature-card">
                <div className="asset-card-header">
                  <div>
                    <small>{asset.type}</small>
                    <h3>{asset.name}</h3>
                  </div>
                  <StatusBadge label={asset.status} />
                </div>
                <div className="asset-card-metrics">
                  <div>
                    <span>Health</span>
                    <strong>{asset.health}%</strong>
                  </div>
                  <div>
                    <span>Vibration</span>
                    <strong>{asset.vibration} mm/s</strong>
                  </div>
                </div>
                <p>{asset.description}</p>
                <Link href={`/platform/assets/${asset.id}`} className="text-link">View asset details <ArrowUpRight size={14} /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
