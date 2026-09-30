'use client';

import { useEffect, useState } from 'react';

const stages = [
  {
    number: '01',
    name: 'Sense',
    description: 'Continuous data from sensors, PLC and historian, inspections and oil analysis.',
  },
  {
    number: '02',
    name: 'Understand',
    description: 'Root cause identified, and whether production is at risk.',
  },
  {
    number: '03',
    name: 'Prescribe',
    description: 'The corrective action issued as a work order, with severity.',
  },
  {
    number: '04',
    name: 'Act',
    description: 'The operator executes the work order and the fault clears.',
  },
  {
    number: '05',
    name: 'Validate',
    description: 'The operator confirms the outcome, so it is recorded rather than estimated.',
  },
  {
    number: '06',
    name: 'Outcomes',
    description: 'Uptime, throughput and cost per ton move, and the impact rolls up into your enterprise systems.',
  },
] as const;

const circleLength = 879.65;

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const stage = stages[active];
  const progressOffset = circleLength * (1 - (active + 1) / stages.length);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % stages.length);
    }, 3800);

    return () => window.clearInterval(timer);
  }, [isPlaying]);

  return (
    <section className="section workflow-section" id="how-it-works">
      <div className="container">
        <div className="workflow-intro">
          <span className="section-eyebrow">HOW REVUPTIME WORKS</span>
          <h2>From a signal on the floor to an<br className="workflow-title-break"/> outcome the enterprise can see</h2>
          <p>One loop runs continuously across your plant. Each pass sharpens the next prescription.</p>
        </div>

        <div className="workflow-layout">
          <div className="workflow-stages" role="tablist" aria-label="RevUptime workflow stages">
            {stages.map((item, index) => (
              <button
                type="button"
                role="tab"
                id={`workflow-tab-${item.number}`}
                aria-controls="workflow-stage-panel"
                aria-selected={index === active}
                className={index === active ? 'is-active' : ''}
                onClick={() => setActive(index)}
                onFocus={() => setActive(index)}
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

          <div
            className="workflow-cycle-wrap"
            id="workflow-stage-panel"
            role="tabpanel"
            aria-labelledby={`workflow-tab-${stage.number}`}
          >
            <div className="workflow-cycle" aria-hidden="true">
              <svg className="workflow-cycle-line" viewBox="0 0 400 400">
                <circle className="workflow-cycle-track" cx="200" cy="200" r="140"/>
                <circle
                  className="workflow-cycle-progress"
                  cx="200"
                  cy="200"
                  r="140"
                  strokeDasharray={circleLength}
                  strokeDashoffset={progressOffset}
                />
              </svg>

              {stages.map((item, index) => (
                <div className={`workflow-cycle-node ${index === active ? 'is-active' : ''}`} key={item.number}>
                  <span>{item.number}</span>
                  <small>{item.name}</small>
                </div>
              ))}

              <div className="workflow-cycle-center">
                <small>ACTIVE STAGE {stage.number}</small>
                <strong>{stage.name}</strong>
                <span>{stage.description}</span>
              </div>
            </div>

            <button
              type="button"
              className="workflow-cycle-control"
              aria-pressed={!isPlaying}
              onClick={() => setIsPlaying((playing) => !playing)}
            >
              <span aria-hidden="true">{isPlaying ? 'Ⅱ' : '▶'}</span>
              {isPlaying ? 'Pause automatic cycle' : 'Play automatic cycle'}
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}
