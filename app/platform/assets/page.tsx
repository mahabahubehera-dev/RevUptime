import Link from 'next/link';
import { ArrowUpRight, Gauge } from 'lucide-react';
import { machineAssets } from '@/data/revuptime-demo';
import { StatusBadge } from '@/components/marketing/industrial-ai';
import { seoMetadata } from '@/lib/seo';
export const metadata = seoMetadata('/platform/assets', { noindex: true });

export default function MachineListPage() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="container">
          <Link className="breadcrumb" href="/platform">RevUptime <span>/</span> Platform</Link>
          <span className="section-eyebrow">ASSETS</span>
          <h1>Machine health across your plant.</h1>
          <p>See the current health, sensor readings and risk profile for every monitored machine.</p>
        </div>
      </section>

      <section className="section">
        <div className="container two-column">
          {machineAssets.map((asset) => (
            <article key={asset.id} className="feature-card asset-card">
              <div className="asset-card-header">
                <div>
                  <small>{asset.type}</small>
                  <h3>{asset.name}</h3>
                </div>
                <StatusBadge label={asset.status} />
              </div>
              <div className="asset-card-metrics">
                <div><span>Health</span><strong>{asset.health}%</strong></div>
                <div><span>Risk</span><strong>{asset.risk}</strong></div>
                <div><span>Vibration</span><strong>{asset.vibration} mm/s</strong></div>
                <div><span>Temp</span><strong>{asset.temperature}°C</strong></div>
              </div>
              <div className="asset-row-meta">
                <span>RPM {asset.rpm}</span>
                <span>Updated {asset.updated}</span>
              </div>
              <Link href={`/platform/assets/${asset.id}`} className="text-link">Open machine detail <ArrowUpRight size={14} /></Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
