import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Activity, ArrowLeft, Gauge, ShieldCheck, Sparkles, Thermometer, TrendingUp } from 'lucide-react';
import { machineAssets } from '@/data/revuptime-demo';
import { StatusBadge } from '@/components/marketing/industrial-ai';
import { pageMetadata } from '@/lib/seo';
import { assetDemoSeo } from '@/data/seo';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const asset = machineAssets.find((entry) => entry.id === id);
  return pageMetadata({ ...assetDemoSeo(asset?.name ?? 'Machine'), path: `/platform/assets/${id}`, noindex: true });
}

export default async function MachineDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const asset = machineAssets.find((entry) => entry.id === id);

  if (!asset) {
    notFound();
  }

  return (
    <main id="main">
      <section className="page-hero">
        <div className="container">
          <Link className="breadcrumb" href="/platform/assets">RevUptime <span>/</span> Assets</Link>
          <span className="section-eyebrow">MACHINE DETAIL</span>
          <h1>{asset.name}</h1>
          <p>{asset.description}</p>
          <div className="hero-buttons">
            <Link className="button" href="/platform/anomalies">View anomalies</Link>
            <Link className="button secondary" href="/ai-prescriptions">AI prescription</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-column">
          <div className="feature-card">
            <div className="asset-card-header">
              <div>
                <small>{asset.type}</small>
                <h3>Machine Overview</h3>
              </div>
              <StatusBadge label={asset.status} />
            </div>
            <div className="three-grid small-metrics">
              <div className="metric-card">
                <span>Health score</span>
                <strong>{asset.health}%</strong>
                <small>{asset.risk} risk</small>
              </div>
              <div className="metric-card">
                <span>Vibration</span>
                <strong>{asset.vibration} mm/s</strong>
                <small>Above baseline</small>
              </div>
              <div className="metric-card">
                <span>Temperature</span>
                <strong>{asset.temperature}°C</strong>
                <small>Rising trend</small>
              </div>
            </div>
          </div>

          <div className="feature-card">
            <div className="section-heading">
              <span className="section-eyebrow">AI ANALYSIS</span>
              <h2>Why RevUptime raised this alert.</h2>
            </div>
            <div className="stacked-copy">
              <p><strong>Observed signal:</strong> {asset.vibration} mm/s vibration versus the learned baseline.</p>
              <p><strong>Interpretation:</strong> {asset.rootCause}</p>
              <p><strong>Recommended action:</strong> {asset.recommendation}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section light-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-eyebrow">SENSOR SUMMARY</span>
            <h2>Machine signals and trend context.</h2>
          </div>
          <div className="three-grid">
            {asset.sensors.map((sensor) => (
              <div key={sensor.label} className="feature-card sensor-card">
                <span>{sensor.label}</span>
                <strong>{sensor.value} {sensor.unit}</strong>
                <small>{sensor.trend}</small>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
