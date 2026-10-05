'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { ArrowDownToLine, LoaderCircle, ShieldCheck } from 'lucide-react';

export function WhitepaperLeadForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'error' | 'ready'>('idle');
  const [message, setMessage] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus('sending');
    setMessage('');
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type: 'whitepaper', consent: data.consent === 'on' }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'We could not process your request. Please try again.');
      setStatus('ready');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'We could not process your request. Please try again.');
      setStatus('error');
    }
  }

  if (status === 'ready') return <div className="whitepaper-ready" role="status"><ShieldCheck size={24}/><div><strong>Your guide is ready.</strong><span>Thanks. Your details were sent successfully.</span></div><a className="button" href="/resources/revuptime-industrial-reliability-guide.html" download><ArrowDownToLine size={16}/> Download the whitepaper</a></div>;

  return <form className="whitepaper-form" onSubmit={submit}>
    <label>Full name<input name="fullName" required maxLength={120} autoComplete="name" placeholder="Your name"/></label>
    <label>Company<input name="company" required maxLength={160} autoComplete="organization" placeholder="Company name"/></label>
    <label>Work email<input name="email" type="email" required maxLength={254} autoComplete="email" placeholder="you@company.com"/></label>
    <label className="whitepaper-consent"><input type="checkbox" name="consent" required/><span>Send me this guide and allow RevUptime to follow up about my request. See the <Link href="/privacy">Privacy Policy</Link>.</span></label>
    {status === 'error' && <p className="whitepaper-error" role="alert">{message}</p>}
    <button className="button" type="submit" disabled={status === 'sending'}>{status === 'sending' ? <><LoaderCircle className="spin" size={16}/> Sending…</> : <>Get the whitepaper <ArrowDownToLine size={16}/></>}</button>
    <small><ShieldCheck size={13}/> Your details are used to respond to this request.</small>
  </form>;
}
