import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, SITE_URL } from '@/lib/seo';

const articlePath = '/blog/what-is-predictive-maintenance';
const guideDescription = 'Learn what predictive maintenance is, how it compares to reactive and preventive maintenance, and a practical 6-step roadmap to reduce unplanned downtime.';
const imageBase = '/images/predictive-maintenance';

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'What Is Predictive Maintenance? A Guide | RevUptime',
    description: guideDescription,
    path: articlePath,
    absoluteTitle: true,
  }),
  openGraph: {
    type: 'article',
    siteName: 'RevUptime',
    title: 'What Is Predictive Maintenance? A Guide | RevUptime',
    description: guideDescription,
    url: articlePath,
    images: [{ url: `${imageBase}/pdm-guide-cover.png`, width: 1733, height: 907, alt: 'What is predictive maintenance: a guide to reducing downtime' }],
  },
};

const contents = [
  ['what-is-pdm', 'What is predictive maintenance?'],
  ['downtime-costs', 'Why unplanned downtime costs more than you think'],
  ['comparison', 'Reactive, preventive and predictive compared'],
  ['how-it-works', 'How predictive maintenance works'],
  ['benefits', 'Key benefits of predictive maintenance'],
  ['steel-plants', 'Predictive maintenance for steel plants'],
  ['roadmap', 'Practical implementation roadmap'],
  ['challenges', 'Common challenges and how to avoid them'],
  ['ai-role', 'The role of AI in modern predictive maintenance'],
  ['metrics', 'How to measure success'],
  ['start-pilot', 'Start with a pilot'],
  ['faqs', 'Frequently asked questions'],
] as const;

const downtimeCosts = [
  ['Lost production', 'Every idle hour means missed output and, often, missed delivery commitments.'],
  ['Cascading delays', 'One failed machine can starve or block upstream and downstream processes.'],
  ['Emergency premiums', 'Rush orders, overtime labour, and expedited freight cost far more than planned work.'],
  ['Secondary damage', 'A small fault left unchecked often destroys adjacent shafts, bearings, or couplings.'],
  ['Safety and quality risk', 'Failing equipment can produce defective batches or put maintenance personnel at risk.'],
  ['Customer trust', 'Late or missed orders damage long-standing commercial relationships.'],
] as const;

const maintenanceComparison = [
  ['Reactive maintenance', 'Running equipment until it fails. It carries no upfront cost, but guarantees surprise downtime and tends to be the most expensive approach over time.'],
  ['Preventive maintenance', 'Follows a fixed calendar or cycle schedule, such as servicing a motor every six months. It reduces failures but replaces parts that still have useful life, while unexpected failures can still occur between checks.'],
  ['Predictive maintenance', 'Acts on real-time asset condition. You service an asset when its vibration, temperature, or acoustic data indicates developing wear, eliminating both unexpected failures and unnecessary maintenance.'],
] as const;

const pdmLayers = [
  ['1. Data Collection', 'Sensors and existing plant systems capture machine health data. Common signals include vibration for rotating equipment, thermal readings for electrical and mechanical wear, oil condition, ultrasound, and power consumption.'],
  ['2. Data Integration', 'Signals from different machines and controllers are brought together into a unified platform and tied to the right asset. Clean, well-labeled data matters more than overly complex algorithms.'],
  ['3. Analytics and Machine Learning', 'Software establishes a baseline of normal behavior for each asset, then flags anomalies. Advanced models estimate remaining useful life and identify likely failure modes so teams know what needs fixing and when.'],
  ['4. Action and Workflow', 'Predictions connect directly to work orders, spare parts availability, and technician schedules. Closing the loop from insight to execution is where reliability gains are realized.'],
] as const;

const benefits = [
  ['Less unplanned downtime', 'Catching faults early turns emergency shutdowns into scheduled maintenance tasks during planned windows.'],
  ['Lower maintenance costs', 'Stop replacing healthy parts on arbitrary dates and avoid the hefty premiums of emergency repairs.'],
  ['Longer asset life', 'Addressing small issues early prevents the severe secondary damage that drastically shortens equipment lifespan.'],
  ['Better inventory planning', 'Knowing what will fail and when lets your procurement team stock the right spares instead of holding excessive inventory.'],
  ['Improved safety and quality', 'Stable, well-maintained equipment produces consistent output and reduces hazardous failure risks on the plant floor.'],
  ['More effective teams', 'Maintenance technicians spend less time firefighting emergency breakdowns and more time on high-value proactive reliability work.'],
] as const;

const roadmapSteps = [
  ['Step 1: Identify your critical assets', 'List the equipment whose failure causes the greatest production loss, safety risk, or repair cost. Rank them by downtime impact and failure history; your first targets should be at the top of that list.'],
  ['Step 2: Understand your failure modes', 'For each critical asset, document how it typically fails and which signals warn you in advance. A pump may show rising vibration weeks before failure, while an electrical panel shows thermal drift.'],
  ['Step 3: Audit what you already have', 'Check which telemetry is already available from existing PLCs, SCADA systems, and motor controllers. Starting with current data keeps costs low and identifies sensor gaps.'],
  ['Step 4: Run a focused pilot', 'Choose a small group of high-impact assets (e.g. 5 machines) and run the program for a defined 90-day period with clear metrics like avoided downtime and MTBF.'],
  ['Step 5: Connect alerts to action', 'Define who receives each alert, what inspection protocol is expected, and how work orders are generated. Clear ownership ensures alerts are acted upon promptly.'],
  ['Step 6: Review, refine, and scale', 'Use pilot results to calibrate alarm thresholds, quantify downtime savings for management, and systematically expand sensor coverage across the facility.'],
] as const;

const commonChallenges = [
  ['Too much data, too little focus', 'Collecting everything is not a strategy. Start strictly with the signals that matter for your high-risk failure modes.'],
  ['Alert fatigue', 'Poorly tuned systems generate false alarms that teams learn to ignore. Invest time in establishing machine baselines and validating alerts with maintenance personnel.'],
  ['Siloed systems', 'When maintenance, operations, and IT operate in silos, data stays trapped. Cross-functional ownership from the start prevents friction.'],
  ['Skills gaps', 'Interpreting complex condition monitoring data takes domain familiarity. Partner with specialists or use platforms with explainable AI diagnostics.'],
  ['Unclear ROI', 'Tie the program to measurable business metrics from day one so value is readily apparent to executive leadership.'],
] as const;

const successMetrics = [
  'Unplanned downtime hours per month',
  'Mean time between failures (MTBF)',
  'Mean time to repair (MTTR)',
  'Percentage of maintenance that is planned versus reactive',
  'Maintenance cost per asset',
  'Overall equipment effectiveness (OEE)',
] as const;

const faqs = [
  ['What is predictive maintenance in manufacturing?', 'Predictive maintenance is a condition-based maintenance strategy that uses real-time sensor data (such as vibration, temperature, and current) along with AI analytics to detect developing equipment faults before a breakdown occurs.'],
  ['How is predictive maintenance different from preventive maintenance?', 'Preventive maintenance follows a fixed calendar schedule regardless of actual equipment wear, which can replace good parts early or miss unexpected failures. Predictive maintenance acts on real condition data, repairing assets only when required.'],
  ['Which machines should we monitor first?', 'Start with critical rotating assets where an unexpected failure halts production or creates expensive repairs—such as induced draft fans, rolling mill gearboxes, slurry pumps, and main compressors.'],
  ['How does vibration monitoring help predict failure?', 'Vibration analysis detects microscopic mechanical changes—such as bearing defect frequencies, unbalance, misalignment, or looseness—weeks or months before temperature rises or catastrophic failure occurs.'],
  ['How does a 90-day pilot work?', 'A pilot equips around five critical machines with wireless sensors and an industrial gateway. After establishing normal operational baselines over a few weeks, the system monitors live health and flags developing faults with clear actionable insights.'],
] as const;

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'What Is Predictive Maintenance? A Guide to Reducing Downtime',
  description: guideDescription,
  image: `${SITE_URL}${imageBase}/pdm-guide-cover.png`,
  mainEntityOfPage: `${SITE_URL}${articlePath}`,
  author: { '@type': 'Organization', name: 'RevUptime', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'RevUptime', url: SITE_URL },
};

function GuideImage({ file, alt, width = 1672, height = 940 }: { file: string; alt: string; width?: number; height?: number }) {
  return <figure className="steel-guide-figure">
    <Image src={`${imageBase}/${file}`} alt={alt} width={width} height={height} sizes="(max-width: 900px) 100vw, 680px" />
  </figure>;
}

export default function WhatIsPredictiveMaintenancePage() {
  return <main id="main" className="steel-guide-page">
    <div className="steel-guide-shell">
      <nav className="steel-guide-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">RevUptime</Link><ChevronRight size={14}/><Link href="/resources">Resources</Link><ChevronRight size={14}/><span>Field guide</span>
      </nav>

      <header className="steel-guide-header">
        <span className="section-eyebrow">PREDICTIVE MAINTENANCE GUIDE</span>
        <h1>What Is Predictive Maintenance? A Guide to Reducing Downtime</h1>
        <p>A practical guide to how predictive maintenance works in manufacturing, how it compares to preventive strategies, and a 6-step roadmap to eliminate unplanned downtime.</p>
        <Image className="steel-guide-cover" src={`${imageBase}/pdm-guide-cover.png`} alt="What is predictive maintenance: smarter insights, fewer breakdowns, and a more reliable tomorrow" width={1733} height={907} priority sizes="(max-width: 1080px) 100vw, 1050px"/>
      </header>

      <div className="steel-guide-layout">
        <article className="steel-guide-content">
          <div className="steel-guide-intro">
            <p>Every operations leader knows the sound of a production line going quiet at the wrong moment. A bearing seizes, a motor overheats, a pump fails, and suddenly the day&apos;s schedule is gone. Unplanned downtime is one of the most expensive problems in industrial operations, and most of it is avoidable.</p>
            <p><Link href="/">Predictive maintenance</Link> (PdM) is the approach that makes it avoidable. Instead of waiting for equipment to break or servicing it on a fixed calendar, you use real-time data to detect early signs of failure and act before it happens. This guide explains what <Link href="/blog/predictive-maintenance-steel-plants-odisha">predictive maintenance in manufacturing</Link> is, how a <Link href="/">predictive maintenance system</Link> works, what it takes to implement, and how to start without overhauling your entire operation.</p>
          </div>

          <section id="what-is-pdm">
            <h2>What Is Predictive Maintenance?</h2>
            <p>Predictive maintenance is a strategy that monitors the actual condition of equipment and uses that data to forecast when a failure is likely. Maintenance is then scheduled based on need, not guesswork.</p>
            <p>Sensors capture signals such as vibration, temperature, pressure, current draw, and acoustic patterns. Software analyzes those signals against normal behavior and known failure signatures. When readings drift in a way that points to a developing fault, the system raises an alert, ideally with enough lead time to plan the repair during a scheduled window.</p>
            <p>The result is a shift from reacting to failures to managing them as planned events. In manufacturing, a predictive maintenance system does this across lines, plants, and shifts, giving teams one unified view of asset health.</p>
          </section>

          <section id="downtime-costs">
            <h2>Why Unplanned Downtime Costs More Than You Think</h2>
            <GuideImage file="pdm-downtime-costs.png" alt="Why unplanned downtime costs more than you think: lost production, higher repair costs, secondary damage, safety risk, and missed delivery commitments"/>
            <p>The visible cost of a breakdown is the repair itself: parts, labor, and sometimes emergency shipping. The hidden costs are usually much larger:</p>
            <div className="steel-guide-cards">{downtimeCosts.map(([title, text])=><div className="steel-guide-card" key={title}><strong>{title}</strong><p>{text}</p></div>)}</div>
            <p>When you add these up, the real price of a single unplanned stoppage is often many times the nominal cost of the repair.</p>
          </section>

          <section id="comparison">
            <h2>Reactive, Preventive, and Predictive: How They Compare</h2>
            <p>Most facilities use a mix of three maintenance strategies:</p>
            <div className="steel-guide-cards">{maintenanceComparison.map(([title, text])=><div className="steel-guide-card" key={title}><strong>{title}</strong><p>{text}</p></div>)}</div>
            <p>Predictive maintenance does not replace the other two entirely. Low-cost, non-critical assets may still be run reactively, and certain statutory safety checks must remain on a calendar. The goal is to apply predictive methods where failure is costly and early condition signals are detectable.</p>
          </section>

          <section id="how-it-works">
            <h2>How Predictive Maintenance Works</h2>
            <GuideImage file="pdm-workflow.png" alt="Predictive maintenance workflow: 1. Collect Data, 2. Analyse, 3. Predict, 4. Act"/>
            <p>A functioning predictive maintenance program operates in four interconnected layers:</p>
            <ol className="steel-guide-list steel-guide-numbered">{pdmLayers.map(([title, text])=><li key={title}><strong>{title}</strong> {text}</li>)}</ol>
            <p>An alert that nobody acts on has no value. Effective programs connect condition monitoring directly into maintenance work orders and scheduled shutdowns.</p>
          </section>

          <section id="benefits">
            <h2>Key Benefits of Predictive Maintenance</h2>
            <GuideImage file="pdm-benefits.png" alt="Key benefits of predictive maintenance: higher uptime, lower maintenance costs, extended equipment life, improved safety, greater efficiency, and sustainable operations"/>
            <div className="steel-guide-cards">{benefits.map(([title, text])=><div className="steel-guide-card" key={title}><strong>{title}</strong><p>{text}</p></div>)}</div>
          </section>

          <section id="steel-plants">
            <h2>Predictive Maintenance for Steel Plants</h2>
            <GuideImage file="pdm-steel-plants.png" alt="Predictive maintenance for steel plants: detect issues early, reduce downtime, extend equipment life, and lower maintenance costs" width={1536} height={1024}/>
            <p>Steel plants are among the strongest candidates for predictive maintenance. Their equipment runs continuously under extreme heat, heavy mechanical load, and constant vibration, and one failure can halt an entire process route. Blast furnace blowers, rolling mill gearboxes, continuous caster rolls, cranes, descaling pumps, and large drive motors all show measurable warning signs before they fail.</p>
            <p>Vibration analysis on mill drives and fans, thermal imaging on electrical systems, and oil condition monitoring on gearboxes are common starting points. Steel production is a tightly linked sequence, so an unplanned stop at one stage quickly ripples to the next, and restarting a furnace or caster is slow and costly. <Link href="/blog/predictive-maintenance-steel-plants-odisha">Predictive maintenance for steel plants</Link> lets teams plan repairs around scheduled shutdowns instead of absorbing an unplanned one.</p>
          </section>

          <section id="roadmap">
            <h2>Where to Start: A Practical Implementation Roadmap</h2>
            <p>You do not need to instrument every machine on day one. A focused, step-by-step rollout minimizes operational disruption and proves value rapidly:</p>
            <ol className="steel-guide-timeline">{roadmapSteps.map(([title, text])=><li key={title}><strong>{title}</strong><p>{text}</p></li>)}</ol>
          </section>

          <section id="challenges">
            <h2>Common Challenges and How to Avoid Them</h2>
            <ul className="steel-guide-list">{commonChallenges.map(([title, text])=><li key={title}><strong>{title}:</strong> {text}</li>)}</ul>
          </section>

          <section id="ai-role">
            <h2>The Role of AI in Modern Predictive Maintenance</h2>
            <p>Traditional PdM relied heavily on fixed thresholds and manual analysis. Today, AI changes what is possible for any modern <Link href="/">predictive maintenance system</Link>. Machine learning models can learn the unique behavior of each asset, detect subtle patterns humans would miss, and improve over time as more data arrives.</p>
            <p>The next step is moving from alerts to action. Agentic AI systems can go beyond flagging a problem: they can assess severity, check parts availability, draft the work order, and propose the best maintenance window based on production schedules. This closes the gap between insight and execution, which is where much of the value is won or lost.</p>
          </section>

          <section id="metrics">
            <h2>How to Measure Success</h2>
            <p>Track a concise set of metrics consistently to establish clear ROI before and after program kickoff:</p>
            <ul className="steel-guide-list">{successMetrics.map(item=><li key={item}>{item}</li>)}</ul>
            <p>Comparing these against your pre-program baseline will quickly demonstrate the quantifiable business case to plant leadership.</p>
          </section>

          <section id="start-pilot">
            <h2>Start with a Focused Pilot, Not a Total Overhaul</h2>
            <p>Unplanned downtime is not an unavoidable cost of doing business. With the right data, the right focus, and a clear path from alert to action, you can turn equipment failures into planned events and protect the output your customers depend on.</p>
            <p>The most successful predictive maintenance programs, whether in a <Link href="/blog/predictive-maintenance-steel-plants-odisha">steel plant</Link> or a wider manufacturing facility, start small, target the assets that matter most, and build from proven results. You do not need a massive transformation to begin, just a clear view of your critical equipment and a commitment to acting on what the data tells you.</p>
            <p>Ready to reduce downtime and keep your operations running with confidence? Talk to the <Link href="/">RevUptime</Link> team to see how predictive maintenance can work for your facility.</p>
            <Link className="button steel-guide-cta" href="/pilot">Explore a 90-day pilot <ArrowRight size={16}/></Link>
          </section>

          <section id="faqs" className="steel-guide-faqs">
            <h2>Frequently asked questions</h2>
            {faqs.map(([question, answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
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
      breadcrumbJsonLd([{ name: 'Resources', path: '/resources' }, { name: 'What is predictive maintenance?', path: articlePath }]),
      faqJsonLd(faqs),
    ]}/>
  </main>;
}
