import Link from 'next/link';
import { Activity, ArrowRight, Bot, BrainCircuit, Sparkles } from 'lucide-react';
import { seoMetadata } from '@/lib/seo';
export const metadata = seoMetadata('/ai-copilot', { noindex: true });

const suggestions = [
  'Which machines need attention?',
  'Why is Motor MTR-204 at high risk?',
  'Show abnormal vibration patterns.',
  'What changed in the last 24 hours?',
  'Which assets have increasing risk?',
  'Explain this alert.',
  'Generate today’s maintenance summary.',
];

const answer = {
  machine: 'Motor MTR-204',
  observation: 'Vibration is above its learned baseline and shows an increasing trend.',
  evidence: 'Current vibration 4.2 mm/s vs. 2.8 mm/s baseline; temperature rose 9°C across the last operating window.',
  risk: 'High',
  cause: 'Potential bearing degradation and mounting drift are the leading patterns suggested by the sensor evidence.',
  action: 'Inspect drive-end bearing and lubrication condition and review mounting and alignment before the next load cycle.',
};

export default function AICopilotPage() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="container">
          <Link className="breadcrumb" href="/">RevUptime <span>/</span> AI Copilot</Link>
          <span className="section-eyebrow">AI COPILOT</span>
          <h1>Ask RevUptime about your machines.</h1>
          <p>The Copilot turns machine history, sensor signals and maintenance context into guided explanations, associated risks and recommended next steps.</p>
        </div>
      </section>

      <section className="section">
        <div className="container two-column">
          <div>
            <div className="section-heading">
              <span className="section-eyebrow">SUGGESTED QUESTIONS</span>
              <h2>Maintenance questions your team can ask.</h2>
            </div>
            <div className="tag-list compact">
              {suggestions.map((question) => (
                <span key={question}>{question}</span>
              ))}
            </div>
          </div>

          <div className="feature-card">
            <div className="copilot-head">
              <span className="copilot-logo"><Bot size={18} /></span>
              <div>
                <strong>AI Reliability Copilot</strong>
                <span>Condition intelligence for maintenance teams</span>
              </div>
            </div>
            <div className="phone-ai-question">Which machines need attention?</div>
            <div className="copilot-answer">
              <BrainCircuit size={19} />
              <div>
                <span className="answer-label">AI RESPONSE</span>
                <h3>{answer.machine}</h3>
                <p><strong>Observation:</strong> {answer.observation}</p>
                <p><strong>Evidence:</strong> {answer.evidence}</p>
                <p><strong>Risk:</strong> {answer.risk}</p>
                <p><strong>Potential cause:</strong> {answer.cause}</p>
                <p><strong>Recommended action:</strong> {answer.action}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
