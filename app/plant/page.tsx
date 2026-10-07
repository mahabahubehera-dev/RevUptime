import Link from 'next/link';
import { Activity, AlertTriangle, Factory, ShieldCheck } from 'lucide-react';
import { plantAssets } from '@/data/revuptime-demo';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata({ title: 'Plant Overview Demo', description: 'Illustrative plant-wide machine health overview in RevUptime.', path: '/plant', noindex: true });

const statusColor = {
  Healthy: 'good',
  Warning: 'watch',
  Critical: 'critical',
};

export default function PlantPage() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="container">
          <Link className="breadcrumb" href="/">RevUptime <span>/</span> Plant View</Link>
          <span className="section-eyebrow">DIGITAL PLANT VIEW</span>
          <h1>Industrial machine visibility at a glance.</h1>
          <p>See the condition of your critical plant assets in a single operational view and click into the details behind the health score.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="plant-map" aria-label="Plant map overview">
            <div className="plant-zone">
              {plantAssets.map((asset) => (
                <div key={asset.name} className={`plant-pin ${statusColor[asset.status as keyof typeof statusColor]}`} style={{ left: `${asset.x}%`, top: `${asset.y}%` }}>
                  <span>{asset.status}</span>
                  <strong>{asset.name}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
