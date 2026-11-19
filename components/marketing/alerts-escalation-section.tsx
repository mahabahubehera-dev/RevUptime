import { MessageCircle, PhoneCall } from 'lucide-react';

const alertChannels = [
  {
    title: 'WhatsApp Alerts',
    description: 'Get the machine name, fault signal and recommended action on your phone the moment something changes.',
    chips: ['Machine & fault', 'Severity', 'Next action'],
    tone: 'whatsapp',
    Icon: MessageCircle,
  },
  {
    title: 'AI Voice Calling',
    description: "For critical faults, if an alert is not acknowledged, RevUptime's AI calls the right person so nothing gets missed.",
    chips: ['Critical faults', 'Auto-escalation'],
    tone: 'voice',
    Icon: PhoneCall,
  },
];

export function AlertsEscalationSection() {
  return (
    <section className="alerts-escalation-section" aria-labelledby="alerts-escalation-title">
      <span className="alerts-escalation-eyebrow">ALERTS &amp; ESCALATION</span>
      <h3 id="alerts-escalation-title">Instant Alerts That Reach the Right Person</h3>
      <div className="alerts-escalation-grid">
        {alertChannels.map(({ title, description, chips, tone, Icon }) => (
          <article className={`alerts-escalation-card alerts-escalation-${tone}`} key={title}>
            <Icon className="alerts-escalation-icon" size={44} strokeWidth={1.8} aria-hidden="true" />
            <div className="alerts-escalation-content">
              <h4>{title}</h4>
              <p>{description}</p>
              <ul className="alerts-escalation-chips" aria-label={`${title} features`}>
                {chips.map((chip) => <li key={chip}>{chip}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
