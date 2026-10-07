'use client';

import { useEffect, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { WorkflowDiagram } from './workflow-diagram';

const stages = [
  {
    number: '01',
    name: 'Sense',
    description: 'A vibration and temperature sensor captures condition data from the machine while it operates.',
  },
  {
    number: '02',
    name: 'Connect',
    description: 'An industrial gateway securely sends sensor readings to the RevUptime platform for review.',
  },
  {
    number: '03',
    name: 'Analyze',
    description: 'RevUptime reviews condition readings and trends to highlight changes in machine behaviour for investigation.',
  },
  {
    number: '04',
    name: 'Alert',
    description: 'When configured alert conditions are met, the relevant team is notified through the agreed channels.',
  },
  {
    number: '05',
    name: 'Machine Operator',
    description: 'After reviewing the alert and machine-health context, the operator creates a work order.',
  },
  {
    number: '06',
    name: 'Maintenance Manager',
    description: 'The maintenance manager reviews the details, plans the work and assigns follow-up tasks.',
  },
  {
    number: '07',
    name: 'Close Operations',
    description: 'The team records completed maintenance, closes the issue and updates the machine history.',
  },
] as const;

const WORKFLOW_INTERVAL_MS = 5000;

export function HowItWorks() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const activeStage = stages[activeStageIndex];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = window.setInterval(() => {
      setActiveStageIndex((current) => (current + 1) % stages.length);
    }, WORKFLOW_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [isPlaying]);

  function selectStage(index: number) {
    setActiveStageIndex(index);
    setIsPlaying(false);
  }

  return (
    <section className="section workflow-section workflow-installation" id="how-it-works">
      <div className="container">
        <div className="workflow-intro">
          <span className="section-eyebrow">HOW REVUPTIME WORKS · SEVEN STEPS</span>
          <h2>From machine signals<br className="workflow-title-break"/> to informed maintenance.</h2>
          <p>See how machine readings move through analysis, team response and recorded maintenance.</p>
        </div>

        <div className="workflow-loop-heading">
          <span className="section-eyebrow">YOUR SEVEN-STEP MAINTENANCE WORKFLOW</span>
          <p>Follow each step, from sensing machine condition to completing and recording maintenance.</p>
        </div>

        <div className="workflow-layout">
          <ol className="workflow-stages" aria-label="Seven maintenance workflow steps">
            {stages.map((stage, index) => (
              <li key={stage.number}>
                <button
                  aria-current={index === activeStageIndex ? 'step' : undefined}
                  className={index === activeStageIndex ? 'is-active' : ''}
                  onClick={() => selectStage(index)}
                  type="button"
                >
                  <span className="workflow-stage-number">{stage.number}</span>
                  <span className="workflow-stage-copy">
                    <strong>{stage.name}</strong>
                    <span>{stage.description}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <div className="workflow-panel" aria-live="polite">
            <WorkflowDiagram/>
            <div className="workflow-active-detail">
              <span className="section-eyebrow">STEP {activeStage.number} OF 07</span>
              <h3>{activeStage.name}</h3>
              <p>{activeStage.description}</p>
              <button
                aria-label={isPlaying ? 'Pause automatic workflow steps' : 'Play automatic workflow steps'}
                className="workflow-cycle-toggle"
                onClick={() => setIsPlaying((playing) => !playing)}
                type="button"
              >
                {isPlaying ? <Pause size={13}/> : <Play size={13}/>}
                {isPlaying ? 'Pause automatic cycle' : 'Play automatic cycle'}
              </button>
              <p className="workflow-cycle-hint">
                {isPlaying ? 'Select a step to pause and read. The workflow advances automatically.' : 'Select a step to read, or play to continue the automatic cycle.'}
              </p>
            </div>
          </div>
        </div>

        <p className="workflow-setup-note">Sensor suitability, alert thresholds, recipients and notification channels are agreed with your site team during setup.</p>
      </div>
    </section>
  );
}
