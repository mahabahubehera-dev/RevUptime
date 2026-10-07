import Link from 'next/link';
import { seoMetadata } from '@/lib/seo';
export const metadata = seoMetadata('/work-orders', { noindex: true });

const workflow = [
  'AI Alert',
  'AI Analysis',
  'Recommendation',
  'Work Order',
  'Technician',
  'Maintenance',
  'Validation',
];

export default function WorkOrdersPage() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="container">
          <Link className="breadcrumb" href="/">RevUptime <span>/</span> Work Orders</Link>
          <span className="section-eyebrow">WORKFLOW</span>
          <h1>From alert to validated maintenance action.</h1>
          <p>AI-informed maintenance follows a simple operational path: detect, understand, recommend, schedule, action and validate.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="signal-flow large-flow">
            {workflow.map((step) => (
              <div key={step}><span>{step}</span></div>
            ))}
          </div>
          <div className="prescription-example">
            <div className="section-heading">
              <span className="section-eyebrow">PRESCRIPTIVE UPGRADE</span>
              <h2>Every alert carries a clear next step.</h2>
              <p>A reviewed prescription can be turned into a work order with the details an operator needs to plan and complete the work.</p>
            </div>
            <div className="prescription-fields">
              <article><span>ASSET</span><strong>ID Fan · M-104</strong></article>
              <article><span>FAULT</span><strong>Rising vibration; bearing wear suspected</strong></article>
              <article><span>ACTION</span><strong>Inspect bearing and verify lubrication</strong></article>
              <article><span>SEVERITY</span><strong className="prescription-severity">High · review promptly</strong></article>
              <article><span>TARGET DEADLINE</span><strong>Within 24 hours</strong></article>
            </div>
            <p className="small-text">Illustrative example. A qualified maintenance professional should review recommendations and follow site safety procedures before work begins.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
