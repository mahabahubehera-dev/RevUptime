import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, SITE_URL } from '@/lib/seo';

const articlePath = '/blog/condition-monitoring-system-guide';
const guideDescription = 'Learn what a condition monitoring system is, how it cuts downtime, key sensor techniques, and how to choose the right system for your plant.';
const imageBase = '/images/condition-monitoring';

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Condition Monitoring System: Plant Guide | RevUptime',
    description: guideDescription,
    path: articlePath,
    absoluteTitle: true,
  }),
  openGraph: {
    type: 'article',
    siteName: 'RevUptime',
    title: 'Condition Monitoring System: Plant Guide | RevUptime',
    description: guideDescription,
    url: articlePath,
    images: [{ url: `${imageBase}/cms-guide-cover.png`, width: 1672, height: 941, alt: 'Condition monitoring system: how industrial plants cut downtime and maintenance costs' }],
  },
};

const contents = [
  ['what-is-condition-monitoring', 'What is condition monitoring?'],
  ['what-is-cms', 'What is a condition monitoring system?'],
  ['why-it-matters', 'Why condition monitoring matters in industry'],
  ['key-techniques', 'Key condition monitoring techniques'],
  ['how-it-works', 'How a system works step by step'],
  ['industries', 'Industries that benefit most'],
  ['how-to-choose', 'How to choose the right system'],
  ['future-ai-iot', 'The future: AI and IoT in condition monitoring'],
  ['start-pilot', 'Start with a pilot'],
  ['faqs', 'Frequently asked questions'],
] as const;

const layers = [
  ['1. Sensors', 'Accelerometers for vibration, thermocouples or infrared sensors for temperature, ultrasonic microphones, oil quality sensors, and current transducers capture physical machine signals continuously.'],
  ['2. Data Acquisition', 'Local wireless nodes and industrial gateways collect, digitize, and pre-process high-frequency readings from mounted sensors right on the plant floor.'],
  ['3. Connectivity', 'Secure industrial wireless networks (LoRaWAN, cellular, or Wi-Fi) transmit telemetry to on-premise servers or cloud platforms with end-to-end encryption.'],
  ['4. Software and Analytics', 'Dashboards, trend graphs, baseline modeling, and explainable AI models detect developing faults, track degradation, and estimate remaining useful life.'],
] as const;

const whyItMatters = [
  ['Fewer surprise failures', 'Faults are detected early—often weeks or months in advance—giving teams ample time to plan.'],
  ['Lower maintenance costs', 'You repair what needs repair, when it needs it, rather than replacing healthy parts on an arbitrary schedule.'],
  ['Longer asset life', 'Catching misalignment, imbalance, or poor lubrication early prevents secondary damage to housings, couplings, and shafts.'],
  ['Better plant safety', 'Overheating bearings, failing couplings, and electrical faults are flagged before they turn into hazardous failures.'],
  ['Smarter shutdown planning', 'Maintenance is scheduled during planned shutdowns instead of interrupting an active production run.'],
] as const;

const stepByStep = [
  ['Step 1: Baseline', 'The system records normal operating behavior and dynamic signatures for each machine under typical production loads.'],
  ['Step 2: Continuous Measurement', 'Sensors track vibration, surface temperature, and operating telemetry at regular intervals or continuous real-time streams.'],
  ['Step 3: Analytics & Trend Comparison', 'Software compares live data against historical baselines and dynamic alarm thresholds to identify subtle mechanical drift.'],
  ['Step 4: Actionable Alerts', 'When a parameter crosses warning or critical thresholds, the right personnel receive notifications via dashboard, SMS, or WhatsApp.'],
  ['Step 5: Fault Diagnosis', 'Explainable AI algorithms and vibration specialists identify the likely root cause (bearing defect, unbalance, looseness) and urgency.'],
  ['Step 6: Planned Intervention', 'Maintenance is planned, spare parts are verified, and repairs are scheduled before catastrophic failure occurs.'],
  ['Step 7: Outcome Review', 'Inspection findings and completed repairs are logged into the machine history, refining future baselines and reliability benchmarks.'],
] as const;

const selectionFactors = [
  ['1. Asset Criticality', 'Start with machines that cause the biggest production losses when they fail. Secondary equipment can often be covered by periodic routes.'],
  ['2. Coverage of Failure Modes', 'Ensure the system measures the parameters that actually reveal your most common faults—such as triaxial vibration and temperature for rotating machinery.'],
  ['3. Scalability', 'Choose a platform that lets you begin with a focused pilot of critical assets and expand across the plant without re-architecting infrastructure.'],
  ['4. Ease of Installation', 'Industrial wireless sensors install in hours without trenching conduit or pulling cables through hazardous plant environments.'],
  ['5. Analytics Quality', 'Look for clear dashboards, configurable alarms, trend history, and explainable diagnostics that plant engineers can trust and act upon.'],
  ['6. System Integration', 'The platform should connect smoothly with your CMMS, SCADA, or ERP so alerts convert into maintenance work orders without friction.'],
  ['7. Local Support and Training', 'Technology works only when people trust and adopt it. Strong vendor support, sensor mounting guidance, and engineer training ensure lasting adoption.'],
] as const;

const faqs = [
  ['What is a condition monitoring system?', 'A condition monitoring system is a combination of sensors, data acquisition hardware, connectivity, and analytics software that monitors machinery health in real time to detect faults before failures occur.'],
  ['What are the main techniques used in condition monitoring?', 'The primary techniques are vibration analysis, infrared thermography, oil and lubricant analysis, ultrasonic monitoring, and motor current signature analysis (MCSA).'],
  ['How is condition monitoring different from predictive maintenance?', 'Condition monitoring is the data collection and measurement process that tracks equipment health. Predictive maintenance is the broader maintenance strategy that uses condition monitoring data and analytics to decide when maintenance should be performed.'],
  ['Which industrial machines should we monitor first?', 'Start with critical rotating equipment whose unexpected failure halts production or causes expensive repairs—such as induced draft (ID) fans, slurry pumps, rolling mill gearboxes, compressors, and kiln drives.'],
  ['Can wireless sensors replace wired condition monitoring systems?', 'Yes. Modern industrial wireless vibration and temperature sensors provide high-frequency sampling, long battery life, and secure transmission, making them ideal for balance-of-plant and critical rotating machinery without cable installation costs.'],
] as const;

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Condition Monitoring System: How Industrial Plants Cut Downtime and Maintenance Costs',
  description: guideDescription,
  image: `${SITE_URL}${imageBase}/cms-guide-cover.png`,
  mainEntityOfPage: `${SITE_URL}${articlePath}`,
  author: { '@type': 'Organization', name: 'RevUptime', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'RevUptime', url: SITE_URL },
};

function GuideImage({ file, alt, width = 1672, height = 941 }: { file: string; alt: string; width?: number; height?: number }) {
  return <figure className="steel-guide-figure">
    <Image src={`${imageBase}/${file}`} alt={alt} width={width} height={height} sizes="(max-width: 900px) 100vw, 680px" />
  </figure>;
}

export default function ConditionMonitoringSystemGuidePage() {
  return <main id="main" className="steel-guide-page">
    <div className="steel-guide-shell">
      <nav className="steel-guide-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">RevUptime</Link><ChevronRight size={14}/><Link href="/resources">Resources</Link><ChevronRight size={14}/><span>Field guide</span>
      </nav>

      <header className="steel-guide-header">
        <span className="section-eyebrow">CONDITION MONITORING GUIDE</span>
        <h1>Condition Monitoring System: How Industrial Plants Cut Downtime and Maintenance Costs</h1>
        <p>A complete guide to condition monitoring systems: how they work, key sensor techniques, four-layer architecture, and how to select the right platform for your plant.</p>
        <Image className="steel-guide-cover" src={`${imageBase}/cms-guide-cover.png`} alt="Condition monitoring system: how industrial plants cut downtime and maintenance costs" width={1672} height={941} priority sizes="(max-width: 1080px) 100vw, 1050px"/>
      </header>

      <div className="steel-guide-layout">
        <article className="steel-guide-content">
          <div className="steel-guide-intro">
            <p>Every industrial plant runs on rotating equipment: motors, pumps, fans, gearboxes, and compressors. When one of them fails without warning, production stops, schedules slip, and repair bills climb. Condition monitoring gives maintenance teams a way to see problems weeks before they become breakdowns.</p>
            <p>Instead of relying on guesswork or calendar-based replacement, a modern condition monitoring system captures early mechanical warning signs and transforms raw telemetry into clear maintenance priorities.</p>
          </div>

          <section id="what-is-condition-monitoring">
            <h2>What Is Condition Monitoring?</h2>
            <p>Condition monitoring is the practice of continuously or periodically measuring the health of machinery while it operates. Instead of repairing equipment after it fails (reactive maintenance) or replacing parts on a fixed calendar (preventive maintenance), teams act only when the data shows a real change in machine behavior.</p>
            <p>The core idea is simple: machines rarely fail suddenly. Bearings wear, shafts misalign, lubricants degrade, and electrical windings overheat over time. Each of these faults changes measurable signals such as vibration, temperature, sound, or current draw. Condition monitoring captures those signals and turns them into early warnings.</p>
            <p>This approach is the foundation of <Link href="/blog/what-is-predictive-maintenance">predictive maintenance</Link>, one of the most effective strategies in modern industrial operations.</p>
          </section>

          <section id="what-is-cms">
            <h2>What Is a Condition Monitoring System?</h2>
            <p>A condition monitoring system is the combination of sensors, data acquisition hardware, software, and analytics that tracks machine health and alerts your team when something changes. It replaces guesswork and manual rounds with objective, real-time information.</p>
            <p>A typical industrial condition monitoring system includes four integrated layers:</p>
            <div className="steel-guide-card-grid">
              {layers.map(([title, text]) => (
                <div key={title} className="steel-guide-card">
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
            <p>Systems range from portable handheld analyzers used on scheduled routes to fully online installations that stream data around the clock from critical assets.</p>
          </section>

          <section id="why-it-matters">
            <h2>Why Condition Monitoring Matters in Industry</h2>
            <p>Unplanned downtime is one of the largest hidden costs in manufacturing, power, mining, oil and gas, cement, and process industries. A single failed pump or fan can halt an entire line. Beyond lost output, there are emergency repair premiums, expedited spare parts, safety risks, and damaged customer relationships.</p>
            <p>Condition monitoring addresses these problems directly:</p>
            <ul className="steel-guide-checklist">
              {whyItMatters.map(([title, text]) => (
                <li key={title}>
                  <strong>{title}:</strong> {text}
                </li>
              ))}
            </ul>
          </section>

          <section id="key-techniques">
            <h2>Key Condition Monitoring Techniques</h2>
            <p>No single method catches every fault, so most comprehensive programs combine several complementary techniques.</p>
            <GuideImage file="cms-techniques.png" alt="Key condition monitoring techniques: vibration analysis, infrared thermography, oil analysis, ultrasonic monitoring, and MCSA" width={1734} height={907} />
            
            <h3>1. Vibration Analysis</h3>
            <p>Vibration analysis is the most widely used condition monitoring technique for rotating machinery. Each fault, whether imbalance, misalignment, looseness, bearing defects, or gear wear, produces a distinct vibration signature. Analyzing frequency spectra reveals exactly what is wrong and how severe it is.</p>

            <h3>2. Infrared Thermography</h3>
            <p>Thermal imaging detects abnormal heat in electrical panels, motors, bearings, and steam systems. Hot spots often point to loose connections, overloaded circuits, friction, or blocked flow.</p>

            <h3>3. Oil and Lubricant Analysis</h3>
            <p>Laboratory or inline oil analysis measures contamination, viscosity, and wear particles. It tells you the internal condition of gearboxes, hydraulic systems, and engines without opening them.</p>

            <h3>4. Ultrasonic Monitoring</h3>
            <p>Ultrasonic sensors pick up high-frequency sound that humans cannot hear. They are excellent for detecting early bearing friction, compressed air leaks, steam trap failures, and electrical discharge.</p>

            <h3>5. Motor Current Signature Analysis (MCSA)</h3>
            <p>By analyzing the electrical current a motor draws, teams can identify broken rotor bars, winding problems, and load issues without placing sensors on the machine itself.</p>
          </section>

          <section id="how-it-works">
            <h2>How a Condition Monitoring System Works Step by Step</h2>
            <p>A reliable condition monitoring setup connects machine sensors directly to maintenance decision-making through a repeatable sequence:</p>
            <div className="steel-guide-card-grid">
              {stepByStep.map(([step, detail]) => (
                <div key={step} className="steel-guide-card">
                  <h3>{step}</h3>
                  <p>{detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="industries">
            <h2>Industries That Benefit Most</h2>
            <p>A condition monitoring system delivers strong returns wherever equipment is critical and downtime is expensive:</p>
            <GuideImage file="cms-industries.png" alt="Industries that benefit most from condition monitoring: manufacturing, power, petrochemical, cement, steel, and mining" width={1672} height={941} />
            <ul className="steel-guide-checklist">
              <li><strong>Manufacturing and automotive:</strong> Protect production lines, CNC machines, stamping presses, and assembly conveyors.</li>
              <li><strong>Power generation:</strong> Monitor boiler feed pumps, steam turbines, generators, and cooling tower fans.</li>
              <li><strong>Oil, gas, and petrochemicals:</strong> Keep critical pumps and compressors safe, efficient, and compliant.</li>
              <li><strong>Cement, steel, and mining:</strong> Protect heavy-duty crushers, mills, and kilns running in harsh conditions—including <Link href="/blog/predictive-maintenance-steel-plants-odisha">steel plants across Odisha</Link>.</li>
              <li><strong>Water and wastewater:</strong> Maintain raw water pumping stations and aeration blowers that must never stop.</li>
              <li><strong>Pharmaceuticals and food processing:</strong> Maintain cleanroom HVAC uptime and mixing lines while meeting strict quality standards.</li>
            </ul>
          </section>

          <section id="how-to-choose">
            <h2>How to Choose the Right Condition Monitoring System</h2>
            <p>When evaluating condition monitoring options for your plant, consider these essential factors:</p>
            <div className="steel-guide-card-grid">
              {selectionFactors.map(([factor, text]) => (
                <div key={factor} className="steel-guide-card">
                  <h3>{factor}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="future-ai-iot">
            <h2>The Future: AI and IoT in Condition Monitoring</h2>
            <p>Industrial IoT and artificial intelligence are changing what a condition monitoring system can do. Low-cost wireless sensors make it practical to monitor far more assets across a facility. Machine learning models learn each machine&apos;s normal behavior and flag subtle anomalies that fixed thresholds would miss.</p>
            <p>Cloud platforms let multi-site operators compare equipment health across plants from a single screen. The result is a shift from simply detecting faults to predicting remaining life and recommending the best time to act.</p>
          </section>

          <section id="start-pilot">
            <span className="section-eyebrow">PILOT PROGRAM</span>
            <h2>Start with a 90-day pilot on five critical machines</h2>
            <p>Condition monitoring turns maintenance from a reactive cost into a strategic advantage. By investing in the right condition monitoring system, industrial teams gain early warning, safer operations, and far greater control over uptime.</p>
            <p>Deploy wireless sensors on 5 critical machines. Establish operating baselines and evaluate condition trends over a 90-day pilot before expanding coverage across your plant.</p>
            <Link className="button steel-guide-cta" href="/contact">Book a 90-Day Pilot <ArrowRight size={16}/></Link>
          </section>

          <section id="faqs" className="steel-guide-faqs">
            <h2>Frequently asked questions</h2>
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </section>

          <Link className="steel-guide-back" href="/resources">Back to all resources</Link>
        </article>

        <aside className="steel-guide-toc">
          <span>IN THIS GUIDE</span>
          <nav aria-label="In this guide">
            {contents.map(([id, title]) => (
              <a href={`#${id}`} key={id}>{title}</a>
            ))}
          </nav>
          <div className="steel-guide-sidebar-cta">
            <span className="section-eyebrow">PILOT PROGRAM</span>
            <h3>Start monitoring your machines.</h3>
            <p>Deploy wireless sensors on 5 critical machines. Establish operating baselines and evaluate condition trends over a 90-day pilot.</p>
            <Link className="button" href="/contact">Book a 90-Day Pilot <ArrowRight size={14}/></Link>
          </div>
        </aside>
      </div>
    </div>

    <JsonLd data={[
      articleJsonLd,
      faqJsonLd(faqs),
      breadcrumbJsonLd([
        { name: 'Resources', path: '/resources' },
        { name: 'Condition Monitoring System Guide', path: articlePath },
      ]),
    ]} />
  </main>;
}
