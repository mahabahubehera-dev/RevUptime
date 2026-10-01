import Link from 'next/link';
import { Maximize2, Radio } from 'lucide-react';

export function HeroVisual() {
  return (
    <figure className="hero-intelligence-visual">
      <div className="hero-visual-board" aria-label="RevUptime predictive intelligence workflow">
        <div className="hero-signal-column">
          <div className="signal-card signal-card--oil">
            <div className="signal-thumb">
              <img src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=80" alt="Oil analysis sample and lab testing" />
            </div>
            <div className="signal-copy">
              <strong>Oil Analysis</strong>
              <small>Condition data</small>
            </div>
          </div>

          <div className="signal-card signal-card--motor">
            <div className="signal-thumb">
              <img src="https://images.unsplash.com/photo-1581092160607-ee2279d36a2d?auto=format&fit=crop&w=900&q=80" alt="Industrial motor and machine sensor" />
            </div>
            <div className="signal-copy">
              <strong>Smart Sensors</strong>
              <small>Machine health data</small>
            </div>
          </div>

          <div className="signal-card signal-card--plc">
            <div className="signal-thumb">
              <img src="https://images.unsplash.com/photo-1563212038-3f6a2b2a8f3d?auto=format&fit=crop&w=900&q=80" alt="PLC and SCADA control panel in a factory" />
            </div>
            <div className="signal-copy">
              <strong>PLC / SCADA</strong>
              <small>Process and history data</small>
            </div>
          </div>
        </div>

        <div className="hero-core-flow">
          <div className="hex-grid">
            <div className="hex hex--detect">
              <span>Detect</span>
              <small>Find anomalies early</small>
            </div>
            <div className="hex hex--diagnose">
              <span>Diagnose</span>
              <small>Identify root causes</small>
            </div>
            <div className="hex hex--predict">
              <span>Predict</span>
              <small>Forecast future risk</small>
            </div>
            <div className="hex hex--center">
              <div className="center-brand">
                <strong>RevUpTime</strong>
                <em>AI ENGINE</em>
              </div>
            </div>
            <div className="hex hex--recommend">
              <span>Recommend</span>
              <small>Prescribe actions</small>
            </div>
            <div className="hex hex--validate">
              <span>Validate</span>
              <small>Measure impact</small>
            </div>
          </div>
        </div>

        <div className="hero-analytics-column">
          <div className="mini-panel mini-panel--decision">
            <div className="mini-panel__head">
              <span className="mini-icon">▌</span>
              <div>
                <strong>Decision Support</strong>
                <small>Turn insights into action</small>
              </div>
            </div>
          </div>

          <div className="mini-panel mini-panel--risk">
            <div className="mini-panel__head">
              <span className="mini-icon mini-icon--alert">!</span>
              <div>
                <strong>Asset Risk</strong>
              </div>
            </div>
            <div className="risk-ring">
              <span>28%</span>
            </div>
          </div>

          <div className="mini-panel mini-panel--priority">
            <div className="mini-panel__head">
              <span className="mini-icon">=</span>
              <div>
                <strong>Maintenance Priority</strong>
              </div>
            </div>
            <ul className="priority-list">
              <li><span>Compressor 1</span><b>High</b></li>
              <li><span>Pump 3</span><b className="medium">Medium</b></li>
              <li><span>Fan 2</span><b className="low">Low</b></li>
            </ul>
          </div>

          <div className="mini-panel mini-panel--gain">
            <div className="mini-panel__head">
              <span className="mini-icon">↗</span>
              <div>
                <strong>Expected Uptime Gain</strong>
              </div>
            </div>
            <div className="gain-value">+12%</div>
          </div>
        </div>
      </div>

      <div className="hero-visual-below">
        <div className="hero-visual-below__meta">
          <span><Radio size={14}/> Validated Business Outcomes</span>
          <span>Real results from healthier, more reliable operations</span>
        </div>

        <div className="hero-reference-stats">
          <div className="hero-stat-card">
            <div className="hero-stat-label">Uptime</div>
            <div className="hero-stat-value positive">+12%</div>
          </div>
          <div className="hero-stat-card">
            <div className="hero-stat-label">Throughput</div>
            <div className="hero-stat-value positive">+6%</div>
          </div>
          <div className="hero-stat-card">
            <div className="hero-stat-label">Downtime</div>
            <div className="hero-stat-value negative">-18%</div>
          </div>
          <div className="hero-stat-card">
            <div className="hero-stat-label">Cost / ton</div>
            <div className="hero-stat-value positive">-9%</div>
          </div>
        </div>
      </div>

      <figcaption>
        <span>Sense</span><i/><span>Understand</span><i/><span>Prioritise</span><i/><span>Act</span>
        <Link href="/images/industrial-floor.jpg" target="_blank" rel="noreferrer"><Maximize2 size={13}/> View image</Link>
      </figcaption>
    </figure>
  );
}
