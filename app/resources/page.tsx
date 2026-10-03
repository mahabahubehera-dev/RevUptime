import Link from 'next/link';
import { ArrowRight, BookOpen, Download, FileText } from 'lucide-react';
import { WhitepaperLeadForm } from '@/components/marketing/whitepaper-lead-form';

const reading = [
  { label: 'FIELD GUIDE', title: 'A practical guide to machine condition monitoring', text: 'A concise introduction to choosing assets, establishing baselines and reviewing condition alerts with your maintenance team.', href: '/resources/revuptime-industrial-reliability-guide.html', icon: FileText },
  { label: 'HOW IT WORKS', title: 'From a machine signal to a maintenance decision', text: 'Follow the Sense, Understand, Prescribe, Act, Validate and Outcomes workflow.', href: '/#how-it-works', icon: BookOpen },
  { label: 'INDUSTRY NOTES', title: 'Condition monitoring across industrial operations', text: 'Explore equipment and operating context for steel, mining, cement and other process industries.', href: '/industries', icon: ArrowRight },
];

export default function ResourcesPage() {
  return <main id="main">
    <section className="page-hero resources-hero"><div className="container"><Link className="breadcrumb" href="/">RevUptime <span>/</span> Resources</Link><span className="section-eyebrow">REVUPTIME RESOURCES</span><h1>Practical ideas for machine reliability.</h1><p>Guides and explainers for teams building a clearer picture of equipment health and maintenance priorities.</p></div></section>
    <section className="section"><div className="container"><div className="section-heading"><span className="section-eyebrow">EXPLORE</span><h2>Resources for your plant team.</h2></div><div className="three-grid resource-grid">{reading.map(({label,title,text,href,icon:Icon})=><article className="resource-card" key={title}><Icon size={23}/><span className="micro">{label}</span><h3>{title}</h3><p>{text}</p><Link className="text-link" href={href}>Read more <ArrowRight size={14}/></Link></article>)}</div></div></section>
    <section className="section light-section" id="whitepaper"><div className="container whitepaper-panel"><div className="whitepaper-copy"><span className="whitepaper-icon"><Download size={22}/></span><span className="section-eyebrow">FREE FIELD GUIDE</span><h2>Build a practical machine monitoring plan.</h2><p>Use this guide to frame asset criticality, select a focused pilot group, understand common condition signals, and plan how your team will review alerts and maintenance outcomes.</p><ul><li>Choose assets based on production impact and suitability</li><li>Establish operating context and machine-specific baselines</li><li>Turn alerts into reviewed inspection actions</li><li>Evaluate results before expanding coverage</li></ul></div><div className="whitepaper-gate"><h3>Get the industrial reliability guide</h3><p>Enter your details to receive the download link.</p><WhitepaperLeadForm/></div></div></section>
  </main>;
}
