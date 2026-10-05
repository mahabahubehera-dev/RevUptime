import Link from 'next/link';
import type { ReactNode } from 'react';

export function PageHero({ eyebrow, title, description, actions }: { eyebrow: string; title: string; description: string; actions?: ReactNode }) {
  return (
    <section className="page-hero">
      <div className="container">
        <Link className="breadcrumb" href="/">RevUptime <span>/</span> {eyebrow}</Link>
        <span className="section-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        {actions ?? (
          <div className="hero-buttons">
            <Link className="button" href="/contact">Book a Pilot</Link>
            <Link className="button secondary" href="/platform">Explore the platform</Link>
          </div>
        )}
      </div>
    </section>
  );
}

export function StatusBadge({ label }: { label: string }) {
  const tone = label.toLowerCase();
  return <span className={`status ${tone === 'healthy' ? 'good' : tone === 'warning' ? 'watch' : 'critical'}`}>{label}</span>;
}

export function MetricCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{hint}</small>
    </div>
  );
}

export function FeatureCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="ai-feature-card">
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}
