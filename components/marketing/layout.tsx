'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, MapPin } from 'lucide-react';

export function Logo() { return <span className="brand-image"><Image src="/images/revuptime-brand.png" alt="RevUpTime" width={1448} height={1086} priority sizes="220px" /></span>; }
const links = [['AI Intelligence', '/ai-intelligence'], ['Platform', '/platform'], ['Product', '/product'], ['Solutions', '/solutions'], ['Industries', '/#industries'], ['ROI Calculator', '/roi-calculator'], ['Resources', '/resources'], ['Pilot Program', '/pilot'], ['Company', '/about']];
export function Navbar() {
 const [open, setOpen] = useState(false); const path = usePathname();
 return <header className="site-header"><div className="nav-wrap"><Link href="/" aria-label="RevUptime home" className="brand" onClick={()=>setOpen(false)}><Logo /></Link><nav aria-label="Main navigation" className={open?'navigation open':'navigation'}>{links.map(([name,href])=><Link key={name} href={href} className={path===href?'active':''} onClick={()=>setOpen(false)}>{name}</Link>)}<div className="mobile-actions"><Link href="/sign-in" onClick={()=>setOpen(false)}>Sign In</Link><Link className="button" href="/contact" onClick={()=>setOpen(false)}>Book a Pilot</Link></div></nav><div className="nav-actions"><Link href="/sign-in">Sign In</Link><Link href="/contact" className="button small">Book a Pilot</Link></div><button className="menu-toggle" onClick={()=>setOpen(!open)} aria-label={open?'Close menu':'Open menu'} aria-expanded={open}>{open?<X/>:<Menu/>}</button></div></header>;
}
export function Footer() {
 const cols = [{title:'Product',items:[['Condition Monitoring','/product'],['Asset Health','/product#dashboard'],['AI Reliability Copilot','/product#copilot'],['Mobile App','/product#mobile'],['ROI Calculator','/roi-calculator']]},{title:'Solutions',items:[['Solution Tiers','/solutions'],['Predictive Maintenance','/solutions/predictive-maintenance'],['Motors & Pumps','/#assets'],['Conveyors & Gearboxes','/#assets']]},{title:'Industries',items:[['Steel & Metals','/industries/steel'],['Mining & Minerals','/industries/mining'],['Cement','/industries/cement'],['Chemicals & Fertilizer','/industries/chemicals-fertilizer'],['Pulp & Paper','/industries/pulp-paper'],['Tire Manufacturing','/industries/tires'],['Food & Beverage','/industries/food-beverage'],['Pharmaceuticals','/industries/pharma']]},{title:'Company',items:[['Resources','/resources'],['About RevUptime','/about'],['Pilot Program','/pilot'],['Contact','/contact']]}];
 return <footer className="footer"><div className="container footer-grid"><div className="footer-brand"><Link href="/" aria-label="RevUptime home"><Logo/></Link><p>AI-powered asset reliability<br/>for industrial operations.</p><span className="location"><MapPin size={15}/> Bhubaneswar, Odisha, India</span></div>{cols.map(c=><div key={c.title}><h3>{c.title}</h3>{c.items.map(([name,href])=><Link key={name} href={href}>{name}</Link>)}</div>)}</div><div className="container footer-bottom"><p>© {new Date().getFullYear()} RevUptime. A product of Revapex AI Private Limited.</p><div><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms</Link></div></div></footer>;
}
