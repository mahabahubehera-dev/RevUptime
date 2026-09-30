import Link from 'next/link';
import { Activity } from 'lucide-react';
export default function NotFound(){return <main id="main" className="not-found"><div className="container"><Activity size={50}/><span className="section-eyebrow">404 · SIGNAL NOT FOUND</span><h1>This page is off the line.</h1><p>Let’s get you back to the machines that matter.</p><div className="hero-buttons"><Link href="/" className="button">Back to RevUptime</Link><Link href="/contact" className="button secondary">Talk to our team</Link></div></div></main>;}
