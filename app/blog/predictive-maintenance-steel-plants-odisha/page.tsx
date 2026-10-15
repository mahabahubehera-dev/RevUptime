import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, SITE_URL } from '@/lib/seo';

const articlePath = '/blog/predictive-maintenance-steel-plants-odisha';
const guideDescription = 'Learn how AI predictive maintenance and vibration monitoring help Odisha steel plants cut unplanned downtime. See what a 90-day, 5-machine pilot covers.';
const imageBase = '/images/field-guide';

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Predictive Maintenance for Odisha Steel Plants | RevUptime',
    description: guideDescription,
    path: articlePath,
    absoluteTitle: true,
  }),
  openGraph: {
    type: 'article',
    siteName: 'RevUptime',
    title: 'Predictive Maintenance for Odisha Steel Plants | RevUptime',
    description: guideDescription,
    url: articlePath,
    images: [{ url: `${imageBase}/steel-maintenance-guide-3.png`, width: 1733, height: 907, alt: 'Predictive maintenance for steel plants in Odisha: how to cut unplanned downtime' }],
  },
};

const contents = [
  ['downtime', 'Why unplanned downtime hurts steel plants'],
  ['predictive-maintenance', 'What is predictive maintenance?'],
  ['vibration-monitoring', 'How vibration monitoring detects failures'],
  ['machines', 'Which machines to monitor first'],
  ['odisha', 'Why Odisha plants benefit from a local approach'],
  ['system', 'What a complete system includes'],
  ['pilot', 'How a 90-day pilot works'],
  ['roi', 'How to measure return on investment'],
  ['mistakes', 'Common mistakes to avoid'],
  ['start-pilot', 'Start with a pilot'],
  ['faqs', 'Frequently asked questions'],
] as const;

const downtimeCosts = [
  ['Lost production', 'Every hour of stoppage is output you cannot recover later.'],
  ['Emergency repair costs', 'Urgent spares, overtime labour and expedited freight cost more than planned work.'],
  ['Secondary damage', 'A bearing that fails completely can damage the shaft, housing or coupling, turning a small repair into a major one.'],
  ['Safety risk', 'Sudden failures of rotating equipment put people at risk, especially during rushed repairs.'],
  ['Missed delivery commitments', 'Customers feel the delay even when the cause is purely internal.'],
] as const;

const faultPatterns = [
  ['Bearing wear', 'Early defects create characteristic high-frequency signals that grow as damage spreads.'],
  ['Imbalance', 'Uneven mass on a fan or rotor increases vibration at the running speed.'],
  ['Misalignment', 'A coupling out of line between motor and gearbox shows up as a distinct vibration signature.'],
  ['Looseness', 'Loose mounting bolts or worn housings create irregular vibration.'],
  ['Gear faults', 'Damaged teeth produce patterns at the gear mesh frequency.'],
] as const;

const machineCandidates = [
  'Induced draft and forced draft fans, which are critical for furnaces and boilers.',
  'Rolling mill drives, gearboxes and motors, where a failure stops the line.',
  'Large pumps, including cooling water and descaling pumps.',
  'Blast furnace and sinter plant fans and blowers.',
  'Conveyor drives and gearboxes, which feed raw material through the plant.',
  'Crane and ladle handling motors, where safety is a major concern.',
] as const;

const systemParts = [
  ['Wireless vibration and temperature sensors', 'Mounted on the machines.'],
  ['A gateway', 'Collects readings from the sensors.'],
  ['Connectivity', 'Moves data from the plant floor to the analytics platform.'],
  ['Predictive maintenance software', 'Analyses the data, raises alerts and shows machine health to the maintenance team.'],
] as const;

const pilotPhases = [
  ['Weeks 1 to 2: Select machines and install.', 'Choose around five critical machines, mount the sensors and connect the gateway.'],
  ['Weeks 3 to 6: Build the baseline.', 'The system learns the normal vibration and temperature pattern of each machine in your operating conditions.'],
  ['Weeks 7 to 12: Monitor and act.', 'The maintenance team reviews alerts, inspects flagged machines and records what they find.'],
  ['End of pilot: Review the evidence.', 'Compare alerts with actual findings, record any failures avoided or shortened, and decide the next step.'],
] as const;

const roiFactors = [
  ['Downtime avoided', 'Hours of stoppage prevented multiplied by the cost per hour of lost production.'],
  ['Repair savings', 'The difference between an emergency repair and a planned one.'],
  ['Secondary damage avoided', 'Parts and labour you did not have to replace.'],
  ['Spares optimisation', 'Fewer rushed purchases and better planning of stock.'],
] as const;

const commonMistakes = [
  ['Monitoring everything at once.', 'Start with a few critical machines and expand once the process works.'],
  ['Ignoring the alert process.', 'Decide in advance who receives alerts, who inspects and who approves the shutdown.'],
  ['Treating it as an IT project.', 'The maintenance and reliability team should own it from the start.'],
  ['Skipping the baseline period.', 'Alerts are only meaningful once the system knows what normal looks like for each machine.'],
  ['Choosing a tool that only needs a work-order system.', 'A computerised maintenance management system (CMMS) tracks tasks and spares, but it does not detect faults by itself. Predictive monitoring and plant maintenance software work best together.'],
] as const;

const faqs = [
  ['What is predictive maintenance in a steel plant?', 'It is a maintenance approach that uses sensor data, such as vibration and temperature, to detect developing faults in machines so repairs can be planned before a breakdown.'],
  ['How is predictive maintenance different from preventive maintenance?', 'Preventive maintenance follows a fixed schedule. Predictive maintenance acts on the actual condition of each machine, so you service what needs it and avoid unnecessary work.'],
  ['How early can a bearing fault be detected?', 'In many cases, vibration analysis can flag a developing bearing fault weeks before failure, though the exact lead time depends on the machine, the fault and the operating conditions.'],
  ['Do we need to monitor every machine?', 'No. Start with the machines where a failure is most costly and expand later.'],
  ['Can this work in dusty, hot plant conditions?', 'Yes, provided the sensors and gateway are designed for industrial environments and are installed and supported properly.'],
] as const;

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Predictive Maintenance for Steel Plants in Odisha: How to Cut Unplanned Downtime',
  description: guideDescription,
  image: `${SITE_URL}${imageBase}/steel-maintenance-guide-3.png`,
  mainEntityOfPage: `${SITE_URL}${articlePath}`,
  author: { '@type': 'Organization', name: 'RevUptime', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'RevUptime', url: SITE_URL },
};

function GuideImage({ file, alt }: { file: string; alt: string }) {
  return <figure className="steel-guide-figure">
    <Image src={`${imageBase}/${file}`} alt={alt} width={1672} height={940} sizes="(max-width: 900px) 100vw, 680px" />
  </figure>;
}

export default function SteelPlantGuidePage() {
  return <main id="main" className="steel-guide-page">
    <div className="steel-guide-shell">
      <nav className="steel-guide-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">RevUptime</Link><ChevronRight size={14}/><Link href="/resources">Resources</Link><ChevronRight size={14}/><span>Field guide</span>
      </nav>

      <header className="steel-guide-header">
        <span className="section-eyebrow">STEEL PLANT FIELD GUIDE</span>
        <h1>Predictive Maintenance for Steel Plants in Odisha: How to Cut Unplanned Downtime</h1>
        <p>Choosing critical machines, understanding vibration signals and evaluating a focused 90-day pilot.</p>
        <Image className="steel-guide-cover" src={`${imageBase}/steel-maintenance-guide-3.png`} alt="Predictive maintenance for steel plants in Odisha: how to cut unplanned downtime" width={1733} height={907} priority sizes="(max-width: 1080px) 100vw, 1050px"/>
      </header>

      <div className="steel-guide-layout">
        <article className="steel-guide-content">
          <div className="steel-guide-intro">
            <p>A steel plant does not get many chances to stop. When a main drive motor, a mill gearbox or a blast furnace fan fails without warning, the loss is not just the repair bill. Production halts, downstream units wait, and the maintenance team ends up working through the night to restore the line.</p>
            <p>This is why <Link href="/industries/steel">predictive maintenance for steel plants</Link> has moved from a nice-to-have to a core part of plant reliability strategy across India. In Odisha, home to large integrated steel plants, sponge iron units, ferro alloy plants and a dense industrial belt from Jharsuguda to Kalinga Nagar, the case is especially strong. This guide explains how predictive maintenance works, which machines to monitor first, and how to start without a large upfront commitment.</p>
          </div>

          <section id="downtime">
            <h2>Why unplanned downtime hurts steel plants so much</h2>
            <GuideImage file="steel-maintenance-guide-4.png" alt="Infographic showing lost production, emergency repair costs, secondary damage, safety risk and missed delivery commitments caused by unplanned downtime"/>
            <p>Steel production is a continuous, tightly linked process. A failure in one section rarely stays in that section. A stopped conveyor starves the furnace. A tripped fan forces a controlled slowdown. A seized roll in the mill holds up every billet waiting behind it.</p>
            <p>Unplanned downtime typically costs a plant in several ways at once:</p>
            <div className="steel-guide-cards">{downtimeCosts.map(([title, text])=><div className="steel-guide-card" key={title}><strong>{title}</strong><p>{text}</p></div>)}</div>
            <p>Most of these costs are avoidable if the failure is detected weeks earlier, while the machine is still running.</p>
          </section>

          <section id="predictive-maintenance">
            <h2>What is predictive maintenance?</h2>
            <p>Predictive maintenance is a strategy where you service equipment based on its actual condition rather than on a fixed calendar or after it breaks. Sensors measure signals such as vibration and temperature, software analyses the trends, and the system raises an alert when a machine starts to deviate from its healthy pattern.</p>
            <p>It is closely related to condition monitoring, which is the practice of continuously measuring machine health. Predictive maintenance uses condition monitoring data to forecast when a fault will become serious, so the team can plan the repair for a convenient window.</p>
            <h3>Reactive, preventive and predictive maintenance compared</h3>
            <p>Preventive maintenance is not wrong. Many plants run it well. Its limit is that equipment does not fail according to the calendar. A bearing may be fine at the scheduled change, or it may start failing halfway through the interval. Predictive maintenance fills that gap by showing which machines actually need attention now and which can safely wait.</p>
          </section>

          <section id="vibration-monitoring">
            <h2>How vibration monitoring detects failures early</h2>
            <GuideImage file="steel-maintenance-guide-2.png" alt="Infographic explaining how vibration monitoring detects bearing wear, imbalance, misalignment, looseness and gear faults"/>
            <p>Most faults in rotating equipment change how a machine vibrates long before it fails. That makes vibration monitoring the most widely used technique in machine condition monitoring.</p>
            <p>A modern system tracks patterns such as:</p>
            <ul className="steel-guide-list">{faultPatterns.map(([title, text])=><li key={title}><strong>{title}:</strong> {text}</li>)}</ul>
            <p>Temperature trends add useful context. A bearing that is both vibrating more and running hotter is a stronger warning than either signal alone.</p>
            <p>The key advantage is lead time. A developing bearing fault can often be seen weeks before failure, which is enough time to order the spare, plan the shutdown and replace the part during a scheduled stop.</p>
          </section>

          <section id="machines">
            <h2>Which machines to monitor first in a steel plant</h2>
            <GuideImage file="steel-maintenance-guide-1.png" alt="Infographic listing steel plant equipment to monitor first, including motors, furnace equipment, conveyors, rolling mills and auxiliary systems"/>
            <p>You do not need to instrument the whole plant on day one. Start where a failure is most expensive. Good first candidates include:</p>
            <ul className="steel-guide-list">{machineCandidates.map(item=><li key={item}>{item}</li>)}</ul>
            <p>A simple way to rank them is to ask three questions for each machine: how much production do we lose if it stops, how long does repair take, and how often has it failed before? The machines with the highest answers are your pilot candidates.</p>
          </section>

          <section id="odisha">
            <h2>Why Odisha plants benefit from a local approach</h2>
            <p>Odisha&apos;s steel and mining belt runs through Jharsuguda, Angul, Rourkela, Talcher, Paradeep, Kalinga Nagar and Dhenkanal. Plants here share some practical conditions: high ambient temperatures, heavy dust, humidity during the monsoon, and a strong dependence on continuous operation.</p>
            <p>These conditions are tough on machines and on monitoring hardware. A system for this region should use rugged industrial sensors, work reliably in dusty and hot environments, and be supported by a team that can reach the plant quickly. Local support also matters for training maintenance staff and reviewing alerts together during the early weeks.</p>
            <p>The same logic applies to related industries across the state. Cement plants, mining operations and power plants run similar rotating equipment and face the same cost of unplanned stoppages, so predictive maintenance for cement plants and mining follows the same approach.</p>
          </section>

          <section id="system">
            <h2>What a complete predictive maintenance system includes</h2>
            <p>A common reason projects stall is confusion about what is actually included. A complete system has four parts:</p>
            <ol className="steel-guide-list steel-guide-numbered">{systemParts.map(([title, text])=><li key={title}><strong>{title}</strong> {text}</li>)}</ol>
            <p>Buying these separately from different vendors often creates integration problems and unclear responsibility. A single full-stack offering, covering hardware, connectivity and software, removes that ambiguity.</p>
            <p>It also helps if the AI is explainable. A maintenance engineer will trust an alert more when the system shows what changed, for example which frequency band rose and how fast. An alert that simply says a machine is at risk, with no reason, is hard to act on.</p>
          </section>

          <section id="pilot">
            <h2>How a 90-day pilot works</h2>
            <p>A pilot lets you test predictive maintenance on your own equipment before committing to a plant-wide rollout. A practical structure looks like this:</p>
            <ol className="steel-guide-timeline">{pilotPhases.map(([title, text])=><li key={title}><strong>{title}</strong><p>{text}</p></li>)}</ol>
            <p>The value of a pilot is that the decision is based on your plant&apos;s evidence, not on a vendor presentation.</p>
          </section>

          <section id="roi">
            <h2>How to measure the return on investment</h2>
            <p>Keep the calculation simple and based on your own numbers:</p>
            <ul className="steel-guide-list">{roiFactors.map(([title, text])=><li key={title}><strong>{title}:</strong> {text}</li>)}</ul>
            <p>Even one avoided failure on a critical machine can be significant, which is why pilots usually focus on the equipment with the highest cost of failure.</p>
          </section>

          <section id="mistakes">
            <h2>Common mistakes to avoid</h2>
            <ul className="steel-guide-list">{commonMistakes.map(([title, text])=><li key={title}><strong>{title}</strong> {text}</li>)}</ul>
          </section>

          <section id="start-pilot">
            <h2>Start with a pilot, not a plant-wide project</h2>
            <p>Unplanned downtime is one of the largest controllable costs in a steel plant, and the tools to reduce it are now practical and affordable to test. The simplest way to begin is to pick your five most critical machines and run a 90-day pilot.</p>
            <p>RevUptime provides AI predictive maintenance and condition monitoring for steel, mining, cement and process plants across Odisha, with the full stack of sensors, gateway, connectivity and platform included. Talk to us about a 90-day, 5-machine pilot and see what your own plant data can tell you.</p>
            <Link className="button steel-guide-cta" href="/contact">Discuss a 90-day pilot <ArrowRight size={16}/></Link>
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
      breadcrumbJsonLd([{ name: 'Resources', path: '/resources' }, { name: 'Predictive maintenance for steel plants in Odisha', path: articlePath }]),
      faqJsonLd(faqs),
    ]}/>
  </main>;
}
