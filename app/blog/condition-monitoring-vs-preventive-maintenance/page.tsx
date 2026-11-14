import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, SITE_URL } from '@/lib/seo';

const articlePath = '/blog/condition-monitoring-vs-preventive-maintenance';
const articleTitle = 'Condition Monitoring vs Preventive Maintenance: A Practical Guide for Plants';
const guideDescription = 'Compare condition monitoring with preventive maintenance and learn how vibration monitoring helps plants in Jharsuguda, Angul and Rourkela reduce downtime.';
const imageBase = '/images/condition-monitoring-vs-preventive-maintenance';
const coverImage = `${imageBase}/condition-monitoring-vs-preventive-maintenance-cover-branded.jpg`;

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Condition Monitoring vs Preventive Maintenance | RevUptime',
    description: guideDescription,
    path: articlePath,
    absoluteTitle: true,
  }),
  openGraph: {
    type: 'article',
    siteName: 'RevUptime',
    title: 'Condition Monitoring vs Preventive Maintenance | RevUptime',
    description: guideDescription,
    url: articlePath,
    images: [{ url: coverImage, width: 1672, height: 941, alt: 'Condition monitoring compared with preventive maintenance in an industrial plant' }],
  },
};

const contents = [
  ['preventive-maintenance', 'What is preventive maintenance?'],
  ['condition-monitoring', 'What is condition monitoring?'],
  ['key-differences', 'Key differences'],
  ['rethink-maintenance', 'Why plants need to rethink maintenance'],
  ['vibration-monitoring', 'Why start with vibration monitoring?'],
  ['odisha', 'Vibration monitoring in Jharsuguda, Angul and Rourkela'],
  ['roadmap', 'Move from preventive maintenance to condition monitoring'],
  ['mistakes', 'Common mistakes to avoid'],
  ['faqs', 'Frequently asked questions'],
  ['conclusion', 'Conclusion'],
] as const;

const differences = [
  ['Trigger', 'Fixed time or running hours', 'Actual machine condition'],
  ['Approach', 'Calendar-based', 'Data-driven'],
  ['Spare parts use', 'Parts may be replaced before they are worn', 'Replace parts when condition indicates a need'],
  ['Failure detection', 'May miss faults that develop between services', 'Can provide early warning of developing faults'],
  ['Downtime', 'Planned, but maintenance may be more frequent than needed', 'Maintenance can be better targeted to equipment condition'],
  ['Upfront investment', 'Usually lower', 'Moderate investment in sensors and software'],
  ['Best suited to', 'Simple, lower-criticality assets', 'Critical, rotating or high-cost assets'],
] as const;

const techniques = [
  ['Vibration analysis', 'Detects imbalance, misalignment, looseness, bearing faults and gear faults.'],
  ['Thermography', 'Finds hot spots in motors, electrical panels and bearings.'],
  ['Oil analysis', 'Reveals wear particles and lubricant breakdown.'],
  ['Ultrasound', 'Picks up early friction, leaks and other high-frequency signals.'],
  ['Motor current analysis', 'Flags electrical and mechanical issues in motors.'],
] as const;

const faqItems = [
  ['Is condition monitoring the same as predictive maintenance?', 'Not exactly. Condition monitoring collects machine-health data. Predictive maintenance uses that data and its trends to forecast failures and plan repairs.'],
  ['Is vibration monitoring expensive for small plants?', 'Wireless sensors and cloud software have lowered the barrier to entry. Plants can begin with a small number of critical machines and expand as they learn what works.'],
  ['Can I use both preventive maintenance and condition monitoring?', 'Yes. Many plants use preventive maintenance for simple, lower-risk assets and condition monitoring for critical rotating equipment.'],
] as const;

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: articleTitle,
  description: guideDescription,
  image: `${SITE_URL}${coverImage}`,
  mainEntityOfPage: `${SITE_URL}${articlePath}`,
  author: { '@type': 'Organization', name: 'RevUptime', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'RevUptime', url: SITE_URL },
};

function GuideImage({ file, alt, width = 1672, height = 941 }: { file: string; alt: string; width?: number; height?: number }) {
  return <figure className="steel-guide-figure">
    <Image src={`${imageBase}/${file}`} alt={alt} width={width} height={height} sizes="(max-width: 900px) 100vw, 680px" />
  </figure>;
}

export default function ConditionMonitoringVsPreventiveMaintenancePage() {
  return <main id="main" className="steel-guide-page">
    <div className="steel-guide-shell">
      <nav className="steel-guide-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">RevUptime</Link><ChevronRight size={14}/><Link href="/resources">Resources</Link><ChevronRight size={14}/><span>Field guide</span>
      </nav>

      <header className="steel-guide-header">
        <span className="section-eyebrow">CONDITION MONITORING GUIDE</span>
        <h1>{articleTitle}</h1>
        <p>A practical comparison of fixed-schedule maintenance and condition-based monitoring, with steps for making the transition at your plant.</p>
        <Image className="steel-guide-cover" src={coverImage} alt="Condition monitoring compared with preventive maintenance in an industrial plant" width={1672} height={941} priority sizes="(max-width: 1080px) 100vw, 1050px"/>
      </header>

      <div className="steel-guide-layout">
        <article className="steel-guide-content">
          <div className="steel-guide-intro">
            <p>Every plant manager knows the 2 a.m. call: a critical fan, pump or gearbox has tripped, production is down, and the replacement part may be weeks away. In heavy industry, one unplanned stoppage can consume the savings from careful maintenance planning.</p>
            <p>Scheduled maintenance helps, but it cannot tell you what a machine actually needs today. <Link href="/blog/condition-monitoring-system-guide">Condition monitoring</Link> tracks equipment health so teams can investigate changes before they become failures. This guide explains how it differs from preventive maintenance, where each approach fits, and how <Link href="/">vibration monitoring</Link> can be a practical place to start.</p>
          </div>

          <section id="preventive-maintenance">
            <h2>What Is Preventive Maintenance?</h2>
            <p>Preventive maintenance (PM) is performed on a fixed schedule, whether or not a machine shows a problem. Common examples include:</p>
            <ul className="steel-guide-list">
              <li>Greasing bearings every 500 operating hours</li>
              <li>Replacing belts every six months</li>
              <li>Changing gearbox oil every quarter</li>
              <li>Shutting down a mill for an annual overhaul</li>
            </ul>
            <p>PM is straightforward to plan and audit, and is far better than running equipment until it breaks. Its limitation is that it is based on averages rather than the machine&apos;s actual condition. Healthy parts may be replaced too early, while a bearing can fail before its scheduled replacement because of misalignment, contamination or overload.</p>
          </section>

          <section id="condition-monitoring">
            <h2>What Is Condition Monitoring?</h2>
            <p>Condition monitoring (CM) measures a machine&apos;s health while it runs, then prompts investigation when data shows a developing fault. Instead of asking, “Is it due?”, teams can ask, “What is the machine telling us?”</p>
            <p>Common condition-monitoring techniques include:</p>
            <div className="steel-guide-cards">{techniques.map(([title, text])=><div className="steel-guide-card" key={title}><strong>{title}</strong><p>{text}</p></div>)}</div>
            <GuideImage file="technician-condition-monitoring-motor-clean.jpg" alt="Technician checks an industrial motor using a vibration-monitoring dashboard"/>
            <p>Condition monitoring is a foundation for predictive maintenance. By tracking trends, teams can plan repairs for a suitable shutdown instead of waiting for a breakdown.</p>
          </section>

          <section id="key-differences">
            <h2>Condition Monitoring vs Preventive Maintenance: Key Differences</h2>
            <p>The main difference is the trigger: preventive maintenance follows a schedule, while condition monitoring responds to measured equipment health.</p>
            <div className="steel-guide-cards">{differences.map(([factor, preventive, condition])=><div className="steel-guide-card" key={factor}><strong>{factor}</strong><p><strong>Preventive:</strong> {preventive}</p><p><strong>Condition-based:</strong> {condition}</p></div>)}</div>
            <p>The two approaches are complementary. Use PM for simple, low-risk assets and condition monitoring for equipment whose failure could stop production or lead to costly repairs.</p>
          </section>

          <section id="rethink-maintenance">
            <h2>Why Industrial Plants Need to Rethink Maintenance</h2>
            <p><Link href="https://en.wikipedia.org/wiki/Operant_conditioning" target="_blank" rel="noopener noreferrer">Operating conditions</Link> can make fixed schedules less reliable. Heat and dust accelerate bearing and lubricant wear; variable loads mean machines rarely run under identical conditions; and power fluctuations can stress motors and drives. Long spare-part lead times and limited access to vibration-analysis expertise add further pressure.</p>
            <p>Knowing the condition of critical assets helps maintenance teams decide what to inspect and when to plan work.</p>
          </section>

          <section id="vibration-monitoring">
            <h2>Why Vibration Monitoring Is a Practical Place to Start</h2>
            <p>For rotating equipment, vibration monitoring can reveal mechanical changes such as imbalance, shaft misalignment, bearing defects, gear wear, looseness, resonance, and belt or coupling problems.</p>
            <GuideImage file="vibration-monitoring-trend-dashboard.jpg" alt="Vibration trend dashboard with warning and critical thresholds" width={1536} height={1024}/>
            <p>Typical first assets include ID and FD fans, boiler-feed pumps, crushers, conveyors, gearboxes, compressors, rolling-mill drives, and large motors. Wireless sensors and cloud dashboards can make condition data available for remote review and help teams investigate alerts before a fault becomes a failure.</p>
          </section>

          <section id="odisha">
            <h2><Link className="steel-guide-heading-link" href="/">Vibration Monitoring in Jharsuguda, Angul and Rourkela</Link></h2>
            <p>Odisha&apos;s industrial belt relies on rotating equipment operating in demanding conditions. This makes monitoring relevant across the aluminium, captive-power and sponge-iron operations of Jharsuguda; the power and metal-processing operations around Angul; and steel plants and allied industries in Rourkela.</p>
            <p>Fans, pumps, conveyors, mills, blowers, gearboxes and large motors often run under heavy or variable loads. Tracking their vibration between inspections can help teams plan work during scheduled outages rather than respond only after a breakdown.</p>
            <p>Across all three locations, the principle is the same: where downtime is costly and spares take time, an early indication of changing machine condition gives the team more time to plan.</p>
          </section>

          <section id="roadmap">
            <h2>How to Move from Preventive Maintenance to Condition Monitoring</h2>
            <p>You do not need to replace your maintenance system overnight. A phased approach can help your team learn and expand based on results:</p>
            <ol className="steel-guide-timeline">
              <li><strong>Rank assets by criticality</strong><p>List equipment by its impact on production, safety and repair cost, then start with the assets that matter most.</p></li>
              <li><strong>Review failure history</strong><p>Look for repeat breakdowns and machines whose failures have caused the greatest disruption.</p></li>
              <li><strong>Choose suitable sensors and methods</strong><p>For rotating machines, vibration monitoring is a common starting point. Add temperature or oil analysis where it provides useful information.</p></li>
              <li><strong>Set baselines and alert limits</strong><p>Record healthy operating behavior for each machine and set review limits using site experience and applicable standards.</p></li>
              <li><strong>Connect alerts to action</strong><p>Decide who reviews alerts, how they investigate them, and how findings become maintenance work.</p></li>
              <li><strong>Review and expand</strong><p>Track failures, spare-parts use and downtime, then use those findings to decide whether to cover more assets.</p></li>
            </ol>
          </section>

          <section id="mistakes">
            <h2>Common Mistakes to Avoid</h2>
            <ul className="steel-guide-list">
              <li><strong>Monitoring everything at once:</strong> Start with critical assets and expand in a measured way.</li>
              <li><strong>Collecting data without acting on it:</strong> Give every alert a clear owner and follow-up process.</li>
              <li><strong>Ignoring trends:</strong> A single reading tells little; review changes over time and in operating context.</li>
              <li><strong>Dropping preventive maintenance completely:</strong> Lubrication, cleaning and inspections still matter.</li>
              <li><strong>Skipping training:</strong> Help operators and technicians understand what readings mean and how to respond.</li>
            </ul>
          </section>

          <section id="faqs" className="steel-guide-faqs">
            <h2>Frequently asked questions</h2>
            {faqItems.map(([question, answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
          </section>

          <section id="conclusion">
            <h2>Conclusion</h2>
            <p>Preventive maintenance was a major step forward from run-to-failure, but fixed schedules cannot reflect the changing condition of every machine. Condition monitoring—especially vibration monitoring—shows teams what is happening in their equipment and gives them more time to plan.</p>
            <p>For plants in Jharsuguda, Angul, Rourkela and across India, a practical path is to begin with the most critical assets, build baselines, and let machine data inform maintenance decisions. <Link href="/contact">Talk to the RevUptime team</Link> about condition monitoring and vibration monitoring for your plant.</p>
            <Link className="button steel-guide-cta" href="/contact">Discuss a monitoring plan <ArrowRight size={16}/></Link>
          </section>

          <Link className="steel-guide-back" href="/resources">Back to all resources</Link>
        </article>

        <aside className="steel-guide-toc">
          <span>IN THIS GUIDE</span>
          <nav aria-label="In this guide">{contents.map(([id, title])=><a href={`#${id}`} key={id}>{title}</a>)}</nav>
        </aside>
      </div>
    </div>
    <JsonLd data={[
      articleJsonLd,
      breadcrumbJsonLd([{ name: 'Resources', path: '/resources' }, { name: 'Condition monitoring vs preventive maintenance', path: articlePath }]),
      faqJsonLd(faqItems),
    ]}/>
  </main>;
}
