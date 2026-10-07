import Link from 'next/link';
import { equipmentLibrary } from '@/data/revuptime-demo';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata({ title: 'Monitored Equipment Library Demo', description: 'Illustrative library of industrial equipment monitored with RevUptime condition intelligence.', path: '/equipment', noindex: true });

export default function EquipmentPage() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="container">
          <Link className="breadcrumb" href="/">RevUptime <span>/</span> Equipment</Link>
          <span className="section-eyebrow">EQUIPMENT AI LIBRARY</span>
          <h1>Industrial equipment monitored by AI-assisted condition intelligence.</h1>
          <p>RevUptime helps monitor the kinds of assets that keep production moving, from rotating equipment to supporting systems and process drives.</p>
        </div>
      </section>

      <section className="section">
        <div className="container three-grid">
          {equipmentLibrary.map((item) => (
            <article key={item.name} className="feature-card">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="tag-list">
                {item.sensors.map((sensor) => <span key={sensor}>{sensor}</span>)}
              </div>
              <ul className="bullet-list">
                {item.insights.map((insight) => <li key={insight}>{insight}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
