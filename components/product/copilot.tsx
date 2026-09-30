'use client';

import { useState } from 'react';
import { Activity, BookOpen, Check, ClipboardCheck, History, Sparkles } from 'lucide-react';
import { Modal } from '@/components/ui/modal';
import { TrendChart } from './trend-chart';

export function AIChatDemo() {
  const [modal, setModal] = useState<'trend' | 'inspection' | 'history' | null>(null);
  const [created, setCreated] = useState(false);

  return <>
    <div className="copilot-window ai-example-panel">
      <div className="copilot-head">
        <span className="copilot-logo"><Sparkles size={18}/></span>
        <div><strong>AI Reliability Copilot</strong><span>Condition intelligence for maintenance teams</span></div>
        <span className="sample-tag">Illustrative product data</span>
      </div>

      <div className="copilot-asset-bar">
        <div><span>ASSET</span><strong>ID Fan Motor M-104</strong></div>
        <span className="status watch">Watch</span>
      </div>

      <div className="copilot-metrics">
        <div><span>Current vibration</span><strong>4.2 <small>mm/s</small></strong></div>
        <div><span>Normal baseline</span><strong>2.1 <small>mm/s</small></strong></div>
        <div><span>Temperature</span><strong>68<small>°C</small></strong></div>
      </div>

      <div className="conversation">
        <div className="engineer-question">
          <span className="avatar">RK</span>
          <div><span>Maintenance engineer</span><p>Why is ID Fan Motor M-104 in Watch status?</p></div>
        </div>

        <div className="copilot-answer">
          <Sparkles size={19}/>
          <div>
            <span className="answer-label">AI INSIGHT</span>
            <h3>Abnormal machine behaviour detected</h3>
            <p>Z-axis vibration is currently approximately <strong>2×</strong> the established operating baseline. Motor temperature has also increased by <strong>9°C</strong>, and the condition has persisted for more than three hours.</p>
            <h4>Suggested inspection</h4>
            <ol>
              <li>Drive-end bearing condition</li>
              <li>Motor mounting/base looseness</li>
              <li>Coupling alignment</li>
            </ol>
            <div className="context-chips">
              <span><Activity size={11}/> Machine-specific baseline</span>
              <span><BookOpen size={11}/> Explainable AI evidence</span>
            </div>
          </div>
        </div>

        <div className="copilot-actions">
          <button onClick={() => setModal('trend')}><Activity size={13}/> View Trend</button>
          <button onClick={() => setModal('history')}><History size={13}/> Open Maintenance History</button>
          <button onClick={() => setModal('inspection')}><ClipboardCheck size={13}/> Create Inspection</button>
        </div>
      </div>

      <div className="copilot-disclaimer">Illustrative product data. AI assists trained maintenance personnel and does not replace engineering judgment.</div>
    </div>

    {modal && <Modal
      title={modal === 'trend' ? 'ID Fan Motor M-104 · Vibration trend' : modal === 'history' ? 'ID Fan Motor M-104 · Maintenance history' : 'Create a sample inspection'}
      onClose={() => setModal(null)}
    >
      {modal === 'trend' ? <>
        <p>Current: 4.2 mm/s · Machine-specific baseline: 2.1 mm/s</p>
        <TrendChart id="modal-trend"/>
        <p className="fine-print">Illustrative product data.</p>
      </> : modal === 'history' ? <div className="history-list">
        <article><time>143 days ago</time><h4>Drive-end bearing inspection</h4><p>Bearing condition, mounting and alignment reviewed during planned maintenance.</p></article>
        <article><time>Previous service event</time><h4>Scheduled lubrication</h4><p>Completed according to the asset maintenance schedule.</p></article>
      </div> : created ? <div className="success-panel">
        <Check/><h4>Sample inspection created</h4><p>Your checklist is ready in this demo session. No work order was sent to a plant.</p>
      </div> : <div>
        <p className="demo-notice">Demo only · No work order will be sent.</p>
        <h4>ID Fan Motor M-104</h4>
        <ul className="check-list"><li>Drive-end bearing condition</li><li>Motor mounting/base looseness</li><li>Coupling alignment</li></ul>
        <label className="form-field">Inspection notes<textarea rows={3} placeholder="Add context for the maintenance team…"/></label>
        <button className="button" onClick={() => setCreated(true)}>Create sample inspection</button>
      </div>}
    </Modal>}
  </>;
}
