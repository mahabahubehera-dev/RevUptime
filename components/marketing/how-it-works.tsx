'use client';

import { useEffect, useRef, useState } from 'react';
import { WorkflowDiagram } from './workflow-diagram';

const stages = [
  {
    number: '01',
    name: 'We assess and install',
    description: 'Our team reviews the target machine, selects a suitable vibration and temperature sensor, installs it and checks that readings reach RevUptime.',
  },
  {
    number: '02',
    name: 'The sensor monitors the machine',
    description: 'As the machine runs, the sensor collects condition readings over time so the team can understand its normal operating pattern.',
  },
  {
    number: '03',
    name: 'RevUptime looks for warning signs',
    description: 'Readings are compared with the machine’s baseline. Unusual changes are highlighted for review; an alert is a prompt to investigate, not a diagnosis.',
  },
  {
    number: '04',
    name: 'The right people are alerted',
    description: 'When agreed alert conditions are met, the configured notification is sent to the responsible machine operator or maintenance manager with the asset and trend details.',
  },
  {
    number: '05',
    name: 'The team inspects and responds',
    description: 'The operator or manager checks the machine, assigns an inspection and coordinates the appropriate maintenance action to address the issue.',
  },
  {
    number: '06',
    name: 'Findings are recorded',
    description: 'The team logs what they found and what was done against the asset, helping maintenance staff review its history and plan follow-up.',
  },
] as const;

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = stages[active];

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const respectPreference = () => { if (preference.matches) setIsPlaying(false); };
    respectPreference();
    preference.addEventListener('change', respectPreference);
    return () => preference.removeEventListener('change', respectPreference);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive((current) => (current + 1) % stages.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  function selectStage(index: number) {
    setActive(index);
    setIsPlaying(false);
  }

  return (
    <section className="section workflow-section workflow-installation" id="how-it-works">
      <div className="container">
        <div className="workflow-intro">
          <span className="section-eyebrow">HOW REVUPTIME WORKS · SIX STEPS</span>
          <h2>From installing a sensor<br className="workflow-title-break"/> to informed maintenance.</h2>
          <p>A clear path from machine readings to the people who inspect, respond and record what happens.</p>
        </div>

        <div className="workflow-loop-heading">
          <span className="section-eyebrow">YOUR SIX-STEP MAINTENANCE WORKFLOW</span>
          <p>Follow each step, from setup on your machine to a recorded maintenance history.</p>
        </div>
        <div className="workflow-layout">
          <div className="workflow-stages" role="tablist" aria-label="RevUptime workflow stages" aria-orientation="vertical">
            {stages.map((item, index) => (
              <button
                ref={node => { buttons.current[index] = node; }}
                type="button"
                role="tab"
                id={`workflow-tab-${item.number}`}
                aria-controls="workflow-stage-panel"
                aria-selected={index === active}
                tabIndex={index === active ? 0 : -1}
                className={index === active ? 'is-active' : ''}
                onClick={() => selectStage(index)}
                onFocus={() => selectStage(index)}
                onKeyDown={event => {
                  const next = event.key === 'ArrowDown' ? (index + 1) % stages.length
                    : event.key === 'ArrowUp' ? (index + stages.length - 1) % stages.length
                    : event.key === 'Home' ? 0 : event.key === 'End' ? stages.length - 1 : null;
                  if (next !== null) {
                    event.preventDefault();
                    selectStage(next);
                    buttons.current[next]?.focus();
                  }
                }}
                key={item.number}
              >
                <span className="workflow-stage-number">{item.number}</span>
                <span className="workflow-stage-copy">
                  <strong>{item.name}</strong>
                  <span>{item.description}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="workflow-cycle-wrap workflow-image-panel" id="workflow-stage-panel" role="tabpanel" aria-labelledby={`workflow-tab-${stage.number}`}>
            <WorkflowDiagram/>
            <div className="workflow-active-detail">
              <span className="section-eyebrow">STEP {stage.number} OF 06</span>
              <h3>{stage.name}</h3>
              <p>{stage.description}</p>
            </div>
            <button type="button" className="workflow-cycle-control" aria-pressed={!isPlaying} onClick={() => setIsPlaying(playing => !playing)}>
              <span aria-hidden="true">{isPlaying ? 'Ⅱ' : '▶'}</span>
              {isPlaying ? 'Pause automatic cycle' : 'Play automatic cycle'}
            </button>
            <p className="workflow-cycle-hint">Select a step to pause and read. Use Play to continue.</p>
          </div>
        </div>
        <p className="workflow-setup-note">Sensor suitability, alert thresholds, recipients and notification channels are agreed with your site team during setup.</p>
      </div>
    </section>
  );
}
