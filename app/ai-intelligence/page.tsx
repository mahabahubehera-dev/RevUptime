import Link from 'next/link';
import Image from 'next/image';
import { Activity, ArrowRight, BrainCircuit, Database, Gauge, Radar, Sparkles, TrendingUp } from 'lucide-react';
import { PageHero } from '@/components/marketing/industrial-ai';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata({ title: 'AI Machine Health Intelligence for Industrial Plants', description: "How RevUptime's AI turns vibration and temperature data into machine-specific baselines, anomaly detection and explainable maintenance guidance for industrial teams.", path: '/ai-intelligence' });

const flow = ['Sensors', 'Data Collection', 'Signal Processing', 'AI Analysis', 'Anomaly Detection', 'Fault Prediction', 'Root Cause', 'Recommendation'];

const features = [
  { icon: Activity, title: 'AI Anomaly Detection', text: 'Detect unusual machine behaviour compared with normal operating patterns across vibration, temperature and current signals.' },
  { icon: TrendingUp, title: 'Fault Prediction', text: 'Identify patterns that may indicate developing equipment issues before they disrupt availability.' },
  { icon: Gauge, title: 'Machine Health Score', text: 'Convert multiple sensor signals into a clear, understandable machine-health indicator for maintenance teams.' },
  { icon: BrainCircuit, title: 'Root Cause Analysis', text: 'Help engineers understand which signals and patterns are associated with abnormal machine behaviour.' },
  { icon: Radar, title: 'Risk Prediction', text: 'Highlight machines showing increasing risk patterns and conditions that merit investigation.' },
  { icon: Sparkles, title: 'AI Prescriptions', text: 'Turn AI insights into recommended maintenance actions while keeping expert review in the loop.' },
];

export default function Page() {
  return (
    <main id="main">
      <PageHero
        eyebrow="AI INTELLIGENCE"
        title="From Vibration Signals to AI Machine Intelligence."
        description="RevUptime continuously processes plant sensor data to understand machine health, detect abnormal behaviour and help maintenance teams act quickly and confidently."
        actions={
          <div className="hero-buttons">
            <Link className="button" href="/contact">Book a Pilot</Link>
            <Link className="button secondary" href="/platform">Explore the platform</Link>
          </div>
        }
      />

      <section className="section">
        <div className="container">
          <div className="split-heading">
            <div className="section-heading">
              <span className="section-eyebrow">AI WORKFLOW</span>
              <h2>Signals become decisions.</h2>
            </div>
            <p>Convert continuing machine data into explainable insights that support maintenance teams instead of leaving them with raw alarms alone.</p>
          </div>

          <div className="signal-flow" aria-label="AI workflow stages">
            {flow.map((step) => (
              <div key={step}><span>{step}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section prediction-section">
        <div className="container">
          <div className="prediction-copy">
            <span className="section-eyebrow">PREDICTIVE INTELLIGENCE</span>
            <h2>See developing equipment risk before it becomes downtime.</h2>
            <p>AI models compare current sensor patterns with historical machine behaviour to surface a forward-looking risk signal, explain the evidence and help teams prioritize the next inspection.</p>
            <div className="prediction-example">
              <div className="prediction-example-head">
                <span>ILLUSTRATIVE FORECAST · PUMP 03</span>
                <span className="status watch">Elevated risk</span>
              </div>
              <div className="prediction-score">
                <strong>72<small>/100</small></strong>
                <span>Condition risk<br />next 14 days</span>
              </div>
              <p>Vibration has risen above its usual range across recent readings. Review the bearing condition during the next planned maintenance window.</p>
            </div>
          </div>
          <figure className="prediction-visual">
            <Image
              className="prediction-technician-photo"
              src="https://images.pexels.com/photos/32845694/pexels-photo-32845694.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Factory engineer using a tablet beside industrial equipment"
              width={1600}
              height={1063}
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 90vw, 58vw"
              unoptimized
            />
            <figcaption>
              A factory engineer reviews equipment on the plant floor. Photo by{' '}
              <a href="https://www.pexels.com/photo/engineer-in-industrial-factory-using-tablet-32845694/" target="_blank" rel="noreferrer">Sergey Sergeev on Pexels</a>.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section light-section">
        <div className="container">
          <div className="section-heading center">
            <span className="section-eyebrow">CORE INTELLIGENCE</span>
            <h2>Built to interpret industrial machine behaviour.</h2>
          </div>
          <div className="ai-capability-grid">
            {features.map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <span className="ai-capability-index">AI</span>
                <Icon size={25} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-column">
          <div>
            <div className="section-heading">
              <span className="section-eyebrow">WHY IT MATTERS</span>
              <h2>Explainability keeps the team in control.</h2>
            </div>
            <p className="section-body">RevUptime does not present a black-box alarm. It shows the sensor evidence, trend changes and operational context behind the machine-health assessment.</p>
            <div className="ai-input-list">
              <span><Database size={13} /> Sensor data</span>
              <span><Activity size={13} /> Trend analysis</span>
              <span><BrainCircuit size={13} /> Context-aware reasoning</span>
              <span><ArrowRight size={13} /> Recommended action</span>
            </div>
          </div>

          <div className="evidence-panel">
            <div className="evidence-head">
              <div>
                <span>AI EVIDENCE</span>
                <strong>Machine Health Narrative</strong>
              </div>
              <span className="status watch">Watch</span>
            </div>
            <div className="assessment-card">
              <span><Sparkles size={15} /> REVUPTIME ASSESSMENT</span>
              <p>Vibration is above the learned operating baseline, temperature is rising and the pattern has persisted. These conditions indicate developing risk rather than a fixed diagnosis.</p>
            </div>
            <div className="evidence-links">
              <Link href="/platform/anomalies">View anomalies</Link>
              <Link href="/platform">View dashboard</Link>
              <Link href="/ai-copilot">Ask the copilot</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
