'use client';

import { useState } from 'react';
import { Activity, BatteryFull, Bell, Check, ChevronLeft, ClipboardCheck, History, LayoutDashboard, Sparkles, Wifi } from 'lucide-react';
import { TrendChart } from './trend-chart';

type MobileTab = 'Health' | 'Machine' | 'Alerts' | 'History' | 'Copilot' | 'Inspection';

export function MobileAppMockup(){
  const [tab,setTab]=useState<MobileTab>('Health');

  return <div className="phone-stage"><div className="phone">
    <div className="phone-status"><span>9:41</span><span><Wifi size={12}/><BatteryFull size={17}/></span></div>
    <div className="phone-app-head"><Activity size={22}/><strong>RevUptime</strong><button aria-label="View sample alerts" onClick={()=>setTab('Alerts')}><Bell size={17}/></button></div>
    <div className="phone-body">
      {tab==='Health'?<>
        <div className="phone-eyebrow">DEMO PLANT</div><h3>Good morning, Rakesh.</h3><p>Here’s how your machines are doing.</p>
        <div className="phone-stats"><div><strong>48</strong><span>Assets</span></div><div><strong>39</strong><span>Healthy</span></div><div><strong>9</strong><span>To review</span></div></div>
        <h4>Needs your attention</h4>
        <button className="phone-alert" onClick={()=>setTab('Machine')}><span className="status watch">High vibration</span><strong>ID Fan Motor M-104</strong><p>4.2 mm/s <span>+100% vs baseline</span></p><span className="phone-alert-link">View machine</span></button>
        <div className="phone-machine"><span className="status good">Good</span><strong>Kiln Drive Motor</strong><p>1.8 mm/s · 54°C</p></div>
      </>:tab==='Machine'?<>
        <button className="phone-back" onClick={()=>setTab('Health')}><ChevronLeft size={13}/> Plant dashboard</button><h3>ID Fan Motor M-104</h3><span className="status watch">Watch</span>
        <div className="phone-detail-number">4.2 <small>mm/s</small></div><p>Vibration · 24 hours</p><TrendChart id="phone-chart"/><p>Temperature: 68°C · Baseline: 59°C</p>
        <button className="phone-alert-link" onClick={()=>setTab('Copilot')}>Ask RevUptime AI</button><button className="phone-back" onClick={()=>setTab('History')}>Maintenance history</button>
      </>:tab==='Alerts'?<>
        <h3>Active alerts</h3><p>Example notifications for your team.</p>
        <button className="phone-alert" onClick={()=>setTab('Machine')}><span className="status watch">High vibration</span><strong>ID Fan Motor M-104</strong><p>4.2 mm/s · Review bearing condition.</p><span className="phone-alert-link">View machine</span></button>
        <div className="phone-alert"><span className="status critical">Critical</span><strong>Slurry Pump P-012</strong><p>7.9 mm/s · Engineering review required.</p></div>
      </>:tab==='History'?<>
        <button className="phone-back" onClick={()=>setTab('Copilot')}><ChevronLeft size={13}/> Ask RevUptime AI</button><h3>Maintenance history</h3>
        <div className="phone-machine"><small>143 days ago · M-104</small><strong>Bearing inspection</strong><p>Mounting and bearing condition reviewed.</p></div>
        <div className="phone-machine"><small>Previous service event</small><strong>Scheduled lubrication</strong><p>Completed per the service schedule.</p></div>
      </>:tab==='Inspection'?<>
        <button className="phone-back" onClick={()=>setTab('Copilot')}><ChevronLeft size={13}/> AI assessment</button>
        <div className="phone-inspection-success"><Check size={27}/><h3>Inspection ready</h3><p>Drive-end bearing, mounting and coupling alignment have been added to this illustrative checklist.</p></div>
      </>:<>
        <div className="phone-eyebrow">AI RELIABILITY COPILOT</div><h3>Ask RevUptime AI</h3>
        <div className="phone-ai-question">Why is Motor M-104 getting worse?</div>
        <div className="phone-answer"><Sparkles size={18}/><p>Vibration has increased <strong>42%</strong> over the last seven days while operating temperature has increased by <strong>8°C</strong>. The largest change is occurring on the Z-axis. Inspect the drive-end bearing and mounting condition.</p><small>AI-assisted guidance · Review before acting</small></div>
        <div className="phone-ai-actions"><button onClick={()=>setTab('Machine')}><Activity size={11}/> View Trend</button><button onClick={()=>setTab('History')}><History size={11}/> History</button><button onClick={()=>setTab('Inspection')}><ClipboardCheck size={11}/> Create Inspection</button></div>
      </>}
    </div>
    <nav className="phone-nav" aria-label="Mobile demo navigation">{[[LayoutDashboard,'Health'],[Bell,'Alerts'],[Sparkles,'Copilot']].map(([Icon,label])=>{const I=Icon as typeof Activity;return <button key={label as string} className={tab===label?'active':''} onClick={()=>setTab(label as MobileTab)} aria-pressed={tab===label}><I size={18}/><span>{label as string}</span></button>;})}</nav>
    <div className="phone-homebar"/>
  </div><span className="phone-caption">Interactive app preview · Illustrative product data</span></div>;
}
