import Link from 'next/link';
import Image from 'next/image';
import { Activity, AlertTriangle, Clock3, Users, ClipboardCheck, Check, Cpu, Cog, Fan, Waves, Workflow, CircleGauge, Factory, Mountain, Flame, Zap, Anchor, Wrench, Layers3, MapPin, Eye, ListChecks, BookOpen, Smartphone, Bell, History, ShieldCheck, Sparkles, BrainCircuit, TrendingUp, Gauge, Thermometer, Timer, Database, FileText, ArrowDown } from 'lucide-react';
import { assets, industries } from '@/data/content';
import { DashboardMockup } from '@/components/product/dashboard';
import { AIChatDemo } from '@/components/product/copilot';
import { MobileAppMockup } from '@/components/product/mobile-demo';
export { HowItWorks } from '@/components/marketing/how-it-works';

export function SectionHeading({eyebrow,title,description,center=false}:{eyebrow:string;title:string;description?:string;center?:boolean}){return <div className={`section-heading ${center?'center':''}`}><span className="section-eyebrow">{eyebrow}</span><h2>{title}</h2>{description&&<p>{description}</p>}</div>;}
export function ProblemSection(){const problems=[{icon:AlertTriangle,title:'Reactive maintenance',text:'Equipment gets attention after abnormal operation has already affected production.'},{icon:Clock3,title:'Inspection gaps',text:'Periodic manual rounds can miss deterioration developing between inspections.'},{icon:Users,title:'Limited reliability expertise',text:'Not every plant has a dedicated team of vibration and reliability specialists.'}];return <section className="section problem"><div className="container"><div className="split-heading"><SectionHeading eyebrow="THE SIGNS ARE THERE" title="Your machines usually warn you before they fail."/><p>The problem is that many of those warning signs remain invisible between manual inspections.</p></div><div className="three-grid problem-grid">{problems.map((p,i)=><article key={p.title} className="problem-card"><div className="card-top"><p.icon size={24}/><span>0{i+1}</span></div><h3>{p.title}</h3><p>{p.text}</p></article>)}</div><p className="transition-line"><Activity size={18}/> RevUptime keeps watch between inspections.</p></div></section>;}
export function ProductSection(){return <section className="section dark-section product-section" id="dashboard"><div className="container"><div className="split-heading"><SectionHeading eyebrow="YOUR PLANT. IN PERSPECTIVE." title="One view of machine health." description="Give your maintenance team a clear view of which assets need attention—and which do not."/><Link href="/product" className="text-link light-link">Explore the platform</Link></div><DashboardMockup/><div className="product-footnotes"><span><Check size={14}/> Machine-specific baselines</span><span><Check size={14}/> Prioritised alerts</span><span><Check size={14}/> Condition history</span><span><Check size={14}/> All your assets, one view</span></div></div></section>;}
export function CopilotSection(){
  const inputs=['Live vibration and temperature','Machine-specific historical baselines','Condition trends and active alerts','Previous maintenance events','Asset specifications','Equipment manuals','Maintenance SOPs'];
  return <section className="section ai-copilot-section" id="copilot"><div className="container two-column copilot-section">
    <div>
      <SectionHeading eyebrow="YOUR AI RELIABILITY ENGINEER" title="Machine Data Is Useful. Answers Are Better." description="Meet the RevUptime AI Reliability Copilot."/>
      <p className="section-body">RevUptime combines machine signals, operating history and engineering knowledge to help maintenance teams investigate abnormal machine behaviour.</p>
      <div className="ai-input-list">{inputs.map((input)=><span key={input}><Check size={13}/>{input}</span>)}</div>
      <div className="ai-reasoning-flow" aria-label="RevUptime AI reasoning flow">
        <div><Activity size={17}/><span>Machine Data</span></div><b>+</b>
        <div><History size={17}/><span>Maintenance History</span></div><b>+</b>
        <div><BookOpen size={17}/><span>Engineering Knowledge</span></div>
        <ArrowDown className="ai-flow-arrow" size={18}/>
        <strong><Sparkles size={18}/> RevUptime AI</strong>
        <ArrowDown className="ai-flow-arrow" size={18}/>
        <div className="ai-flow-result"><ClipboardCheck size={18}/><span>Condition Explanation + Recommended Inspection</span></div>
      </div>
    </div>
    <AIChatDemo/>
  </div></section>;
}

export function AIIntelligenceSection(){
  const capabilities=[
    {icon:Gauge,title:'Machine-Specific Baselines',text:'Learns the normal vibration and temperature behaviour of each monitored asset.'},
    {icon:TrendingUp,title:'Intelligent Trend Detection',text:'Identifies persistent deviations and deteriorating operating patterns.'},
    {icon:BrainCircuit,title:'Context-Aware AI',text:'Combines sensor data with maintenance history, manuals, SOPs and asset context.'},
    {icon:ListChecks,title:'Actionable Guidance',text:'Helps maintenance teams understand what changed and what should be inspected first.'},
  ];
  return <section className="section light-section ai-capability-section"><div className="container">
    <SectionHeading eyebrow="MACHINE INTELLIGENCE" title="Every Machine Learns Its Own Normal." description="RevUptime builds a machine-specific operating baseline instead of treating every motor, pump or gearbox as identical." center/>
    <div className="ai-capability-grid">{capabilities.map((item,index)=><article key={item.title}><span className="ai-capability-index">0{index+1}</span><item.icon size={25}/><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
    <p className="ai-section-line">Don’t just monitor machines. Understand them.</p>
  </div></section>;
}

export function ExplainableAISection(){
  const evidence=[
    {icon:Activity,label:'Vibration',current:'4.2 mm/s',detail:'Baseline: 2.1 mm/s',change:'+100%'},
    {icon:Thermometer,label:'Temperature',current:'68°C',detail:'Baseline: 59°C',change:'+9°C'},
    {icon:Timer,label:'Condition Duration',current:'3.4 hours',detail:'Sustained deviation',change:'Active'},
    {icon:History,label:'Maintenance History',current:'143 days ago',detail:'Previous bearing inspection',change:'Review'},
  ];
  return <section className="section explainable-section" id="explainable-ai"><div className="container two-column explainable-layout">
    <div>
      <SectionHeading eyebrow="EXPLAINABLE AI" title="Know Why the Machine Is at Risk." description="RevUptime shows the evidence behind each AI-assisted assessment, so maintenance teams can review the condition and decide what to do next."/>
      <p className="ai-section-line left">Know what changed. Understand why. Act earlier.</p>
    </div>
    <div className="evidence-panel">
      <div className="evidence-head"><div><span>CONDITION EVIDENCE</span><strong>ID Fan Motor M-104</strong></div><span className="status watch">Watch</span></div>
      <div className="evidence-grid">{evidence.map((item)=><div key={item.label}><item.icon size={17}/><span>{item.label}</span><strong>{item.current}</strong><small>{item.detail}</small><b>{item.change}</b></div>)}</div>
      <div className="assessment-card"><span><Sparkles size={15}/> REVUPTIME ASSESSMENT</span><p>The combination of increasing vibration and increasing temperature indicates that this machine should be inspected before further deterioration.</p></div>
      <div className="evidence-links"><Link href="#dashboard">View Sensor Data</Link><Link href="#copilot">View Maintenance History</Link><Link href="/product#copilot">View Relevant SOP</Link></div>
      <small className="illustrative-label">Illustrative product data</small>
    </div>
  </div></section>;
}

export function ConditionTimelineSection(){
  const steps=[
    {label:'NORMAL',value:'2.1 mm/s',text:'Machine operating inside its established baseline.'},
    {label:'TREND CHANGE',value:'2.7 mm/s',text:'A developing change appears in the condition trend.'},
    {label:'AI WATCH',value:'3.5 mm/s',text:'RevUptime detects sustained deviation from normal behaviour.'},
    {label:'INSPECTION RECOMMENDED',value:'Maintenance review',text:'The maintenance team investigates the machine.'},
  ];
  return <section className="section light-section condition-timeline-section"><div className="container">
    <div className="split-heading"><SectionHeading eyebrow="EMERGING RISK" title="See Risk Develop Before It Becomes a Breakdown."/><p>Condition intelligence gives teams earlier maintenance visibility as machine behaviour moves away from normal.</p></div>
    <div className="condition-timeline">{steps.map((step,index)=><article key={step.label} className={index===2?'is-watch':''}><span>0{index+1}</span><div className="timeline-dot"/><small>{step.label}</small><strong>{step.value}</strong><p>{step.text}</p></article>)}</div>
    <div className="timeline-note"><Activity size={15}/><span>Illustrative condition progression</span><b>Turn machine signals into maintenance decisions.</b></div>
  </div></section>;
}
export function MobileSection(){return <section className="section light-section" id="mobile"><div className="container mobile-section"><MobileAppMockup/><div><SectionHeading eyebrow="AI-ASSISTED MAINTENANCE, ANYWHERE" title="Ask RevUptime AI from the plant floor." description="Give operators and maintenance engineers access to machine health, explainable AI insights and inspection priorities wherever the next decision happens."/><div className="mobile-feature-grid">{[[Bell,'Push notifications'],[CircleGauge,'Machine health'],[Activity,'Condition trends'],[Sparkles,'Ask RevUptime AI'],[History,'Maintenance history'],[Smartphone,'Mobile access']].map(([Icon,text])=>{const I=Icon as typeof Bell;return <div key={text as string}><I size={19}/><span>{text as string}</span></div>;})}</div><p className="subtle-note">Know what changed, understand why and create an inspection from the same mobile workflow. WhatsApp can be an optional alert channel.</p><Link className="text-link" href="/contact">See it in your pilot</Link></div></div></section>;}
export function AssetSection(){const icons=[Cog,Waves,SettingsIcon,Fan,Workflow,Layers3];return <section className="section" id="assets"><div className="container"><SectionHeading eyebrow="THE MACHINES THAT MATTER" title="Built around the equipment that keeps production moving." center/><div className="asset-grid">{assets.map((a,i)=>{const Icon=icons[i];return <Link href={`/solutions/predictive-maintenance#${a.icon}`} className="asset-card" key={a.name}><div className="asset-illustration"><Icon size={48} strokeWidth={1.15}/><span className="asset-crosshair">+</span><span className="asset-code">ASSET / 0{i+1}</span></div><h3>{a.name}</h3><p>{a.detail}</p><span className="asset-explore">Explore monitoring</span></Link>;})}</div></div></section>;}
const SettingsIcon=Cog;
export function IndustriesSection(){const icons=[Factory,Mountain,Flame,Layers3,Zap,Anchor];return <section className="section light-section" id="industries"><div className="container"><div className="split-heading"><SectionHeading eyebrow="INDUSTRIAL AT OUR CORE" title="Built for industrial operations."/><p>From steel and mining to the machinery moving material across your plant.</p></div><div className="three-grid industry-grid">{industries.map((item,i)=>{const Icon=icons[i%icons.length];return <Link href={item.href} className="industry-card" key={item.name}><Icon size={25}/><span className="micro">{item.tag}</span><h3>{item.name}</h3><p>{item.description}</p><span className="text-link">Explore industry</span></Link>;})}</div></div></section>;}
export function WhySection(){const items=[{icon:Wrench,title:'Retrofit existing machines',text:'Bring continuous monitoring to the equipment you already rely on.'},{icon:Layers3,title:'Start small. Scale with confidence.',text:'Begin with a focused group of critical machines and expand after reviewing the value.'},{icon:Users,title:'Built for industrial teams',text:'Clear alerts and machine history that make sense on a busy plant floor.'},{icon:MapPin,title:'Local implementation',text:'An initial focus on industrial clusters across Odisha and Eastern India.'}];return <section className="section"><div className="container two-column why-section"><SectionHeading eyebrow="PRACTICAL BY DESIGN" title="Predictive maintenance without enterprise complexity." description="Enterprise-grade condition monitoring, made practical for plants ready to take their next step."/><div className="why-grid">{items.map(x=><article key={x.title}><x.icon size={23}/><h3>{x.title}</h3><p>{x.text}</p></article>)}</div></div></section>;}
export function PilotSection(){return <section className="pilot-section dark-section" id="pilot"><div className="container"><div className="pilot-intro"><div><span className="section-eyebrow">THE 90-DAY PILOT PROGRAM</span><h2>Prove it on your machines.</h2><p>Start focused. Build a baseline. See what your plant data tells you.</p></div><Link className="button" href="/contact">Request a Pilot</Link></div><div className="pilot-grid"><article><strong>05<span>Machines</span></strong><p>A focused group of critical motors or rotating assets.</p></article><article><strong>90<span>Days</span></strong><p>Establish baselines and monitor real operating behaviour.</p></article><article><span className="pilot-symbol"><Activity size={34}/></span><h3>Real plant data</h3><p>Evaluate machine conditions from your own operations.</p></article><article><span className="pilot-symbol"><ClipboardCheck size={34}/></span><h3>Review the results</h3><p>Decide whether a wider rollout makes sense for your team.</p></article></div><div className="pilot-roadmap"><div className="pilot-roadmap-heading"><span>90-DAY ROADMAP</span><h3>From first baseline to plant-wide decision.</h3><p>Expand only after reviewing suitability and value at each step.</p></div><div className="pilot-roadmap-steps"><article><span>WEEK 1–2</span><h4>Scope & baseline</h4><p>Confirm five suitable assets, install sensors and learn normal operating patterns.</p></article><article><span>FIRST ALERT</span><h4>Investigate together</h4><p>Review signal evidence and operating context with the plant maintenance team.</p></article><article><span>REVIEW & SCALE</span><h4>Expand by priority</h4><p>Use pilot findings to select the next assets and agree a practical coverage plan.</p></article><article><span>PLANT-WIDE</span><h4>Build the reliability loop</h4><p>Extend monitoring in stages, with local ownership and ongoing outcome review.</p></article></div></div></div></section>;}
export function OutcomesSection(){const items=[{icon:Eye,title:'Earlier visibility',text:'Identify developing machine-condition changes sooner.'},{icon:ListChecks,title:'Better prioritisation',text:'Know which machines deserve attention first.'},{icon:Wrench,title:'Focused inspections',text:'Use condition data to focus valuable engineering time.'},{icon:BookOpen,title:'Maintenance knowledge',text:'Keep machine history, alerts and asset context together.'}];return <section className="section"><div className="container"><SectionHeading eyebrow="BETTER INFORMED. BETTER PREPARED." title="Move maintenance from reaction to decision." center/><div className="four-grid outcomes">{items.map(x=><article key={x.title}><x.icon size={25}/><h3>{x.title}</h3><p>{x.text}</p></article>)}</div><div className="reliability-spectrum"><span>Manual<br/>checks</span><span>Periodic<br/>monitoring</span><strong><Activity size={23}/> RevUptime<br/>Continuous intelligence</strong><span>Enterprise reliability<br/>transformation</span></div><p className="spectrum-note">Move toward continuous, data-driven reliability without a complex enterprise transformation on day one.</p></div></section>;}
export function CompanySection(){return <section className="company-section" id="company"><div className="container company-grid"><div className="company-photo"><Image src="/images/industrial-floor.jpg" alt="Overhead cranes and heavy machinery inside an industrial production plant" fill sizes="(max-width: 767px) 100vw, 50vw"/><div className="photo-label"><MapPin size={17}/><span>Built for life on the plant floor.</span></div></div><div className="company-copy"><SectionHeading eyebrow="ROOTED IN ODISHA. BUILT FOR INDIA." title="Built close to the machines we serve."/><p>RevUptime is being built in Odisha, one of India’s major steel, mining and industrial regions.</p><p>Our first focus is simple: make modern machine-condition monitoring practical for operations beyond India’s largest metropolitan and enterprise centres.</p><div className="region-path"><span>Odisha</span><i/><span>Eastern India</span><i/><span>India</span></div><Link href="/about" className="text-link">Get to know RevUptime</Link></div></div></section>;}
export function FinalCTA(){return <section className="final-cta dark-section"><div className="container"><div><span className="section-eyebrow">YOUR NEXT STEP TO BETTER UPTIME</span><h2>Don’t wait for the next breakdown<br/>to start monitoring.</h2><p>Start with five machines. Evaluate RevUptime with real operating data from your plant.</p></div><div className="cta-buttons"><Link href="/contact" className="button">Book a 90-Day Pilot</Link><Link href="/contact" className="text-link light-link">Talk to RevUptime</Link></div></div></section>;}
