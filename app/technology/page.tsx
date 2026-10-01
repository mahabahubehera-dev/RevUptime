import Link from 'next/link';
import { Activity, ArrowRight, BrainCircuit, Database, Gauge, Sparkles } from 'lucide-react';

const steps = [
  'Sensor Data',
  'Time-Series Data',
  'Signal Processing',
  'Feature Extraction',
  'Machine Baseline',
  'AI/ML Analysis',
  'Anomaly Detection',
  'Risk Analysis',
  'AI Recommendation',
];

export default function TechnologyPage() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="container">
          <Link className="breadcrumb" href="/">RevUptime <span>/</span> Technology</Link>
          <span className="section-eyebrow">TECHNOLOGY</span>
          <h1>Explainable machine intelligence without the guesswork.</h1>
          <p>The technology contribution is straightforward: sensor signals become machine-specific baselines, which help AI identify abnormal patterns and suggest suitable maintenance actions.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="signal-flow large-flow">
            {steps.map((step) => (
              <div key={step}><span>{step}</span></div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
