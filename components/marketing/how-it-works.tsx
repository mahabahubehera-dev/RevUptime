'use client';

import React, { useState, useEffect, useRef, useCallback, Fragment } from 'react';

interface StepData {
  num: string;
  label: string;
  desc: string;
  centerTitle: string;
  centerPent: string;
  tags?: string[];
  dashedTags?: string[];
  splitTags?: { left: string; right: string };
  isGreenCheck?: boolean;
  node: { cx: number; cy: number };
  radialLabel: { text: string; x: number; y: number; anchor: 'middle' | 'start' | 'end' };
}

const STEPS: StepData[] = [
  {
    num: '01',
    label: 'Sense',
    desc: 'A vibration and temperature sensor captures condition data from the machine while it operates.',
    centerTitle: 'Sensing Machine Condition',
    centerPent: 'Captures condition data while operating',
    tags: ['Vibration', 'Temperature', 'Continuous'],
    node: { cx: 280, cy: 80 },
    radialLabel: { text: 'SENSE', x: 280, y: 30, anchor: 'middle' },
  },
  {
    num: '02',
    label: 'Connect',
    desc: 'An industrial gateway securely sends sensor readings to the RevUptime platform for review.',
    centerTitle: 'Secure Gateway Transfer',
    centerPent: 'Edge readings sent to RevUptime platform',
    tags: ['Industrial Gateway', 'Secure TLS', 'RevUptime Cloud'],
    node: { cx: 436, cy: 155 },
    radialLabel: { text: 'CONNECT', x: 480, y: 135, anchor: 'start' },
  },
  {
    num: '03',
    label: 'Analyze',
    desc: 'RevUptime reviews condition readings and trends to highlight changes in machine behaviour for investigation.',
    centerTitle: 'Platform Review & Analytics',
    centerPent: 'Highlights changes for investigation',
    splitTags: { left: 'Condition Trends', right: 'Behavior Shifts' },
    node: { cx: 475, cy: 325 },
    radialLabel: { text: 'ANALYZE', x: 520, y: 330, anchor: 'start' },
  },
  {
    num: '04',
    label: 'Alert',
    desc: 'When configured alert conditions are met, the relevant team is notified through the agreed channels.',
    centerTitle: 'Team Alert Triggered',
    centerPent: 'Notified through agreed communication channels',
    dashedTags: ['Configured Rules', 'Threshold Met', 'Notification'],
    node: { cx: 367, cy: 460 },
    radialLabel: { text: 'ALERT', x: 395, y: 515, anchor: 'start' },
  },
  {
    num: '05',
    label: 'Machine Operator',
    desc: 'After reviewing the alert and machine-health context, the operator creates a work order.',
    centerTitle: 'Operator Creates Work Order',
    centerPent: 'Triage with real-time operational context',
    dashedTags: ['Machine Context', 'Health Review', 'Work Order'],
    node: { cx: 193, cy: 460 },
    radialLabel: { text: 'OPERATOR', x: 165, y: 515, anchor: 'end' },
  },
  {
    num: '06',
    label: 'Maintenance Manager',
    desc: 'The maintenance manager reviews the details, plans the work and assigns follow-up tasks.',
    centerTitle: 'Manager Orchestrates Work',
    centerPent: 'Assigns tasks & schedules repair window',
    splitTags: { left: 'Plan Work', right: 'Assign Follow-Up' },
    node: { cx: 85, cy: 325 },
    radialLabel: { text: 'MAINTENANCE', x: 45, y: 330, anchor: 'end' },
  },
  {
    num: '07',
    label: 'Close Operations',
    desc: 'The team records completed maintenance, closes the issue and updates the machine history.',
    centerTitle: 'Completed Maintenance Recorded',
    centerPent: 'Issue closed and machine history logged',
    isGreenCheck: true,
    node: { cx: 124, cy: 155 },
    radialLabel: { text: 'CLOSE', x: 75, y: 135, anchor: 'end' },
  },
];

const N = STEPS.length;
const RADIUS = 200;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ~1256.64

export function HowItWorks() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [userSelected, setUserSelected] = useState(false);
  const [isInView, setIsInView] = useState(true);

  const [dasharray, setDasharray] = useState(`0 ${CIRCUMFERENCE}`);
  const [dashTransition, setDashTransition] = useState('stroke-dasharray 0.5s ease, stroke 0.4s ease');
  const [thumbStyle, setThumbStyle] = useState<{ top: number; height: number }>({ top: 0, height: 80 });

  const sectionRef = useRef<HTMLElement | null>(null);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const prevStepRef = useRef(0);

  // Sync circular SVG stroke with step changes
  useEffect(() => {
    const prev = prevStepRef.current;
    prevStepRef.current = currentStep;

    if (prev === N - 1 && currentStep === 0) {
      setDashTransition('stroke-dasharray 0.5s ease, stroke 0.4s ease');
      setDasharray(`${CIRCUMFERENCE * 0.999} ${CIRCUMFERENCE}`);
      const timer = window.setTimeout(() => {
        setDashTransition('none');
        setDasharray(`0 ${CIRCUMFERENCE}`);
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            setDashTransition('stroke-dasharray 0.5s ease, stroke 0.4s ease');
          });
        });
      }, 500);
      return () => window.clearTimeout(timer);
    } else {
      setDashTransition('stroke-dasharray 0.5s ease, stroke 0.4s ease');
      setDasharray(`${(currentStep / N) * CIRCUMFERENCE} ${CIRCUMFERENCE}`);
    }
  }, [currentStep]);

  // Update glowing rail thumb position
  const updateThumb = useCallback(() => {
    const row = rowRefs.current[currentStep];
    if (row) {
      setThumbStyle({
        top: row.offsetTop,
        height: row.offsetHeight,
      });
    }
  }, [currentStep]);

  useEffect(() => {
    updateThumb();
    window.addEventListener('resize', updateThumb, { passive: true });
    return () => window.removeEventListener('resize', updateThumb);
  }, [updateThumb]);

  // Pause automatic cycling when off-screen
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          setIsInView(entries[0].isIntersecting);
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Automatic cycle interval (3.5s)
  useEffect(() => {
    if (isPaused || !isInView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const interval = window.setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % N);
      setUserSelected(false);
    }, 3500);

    return () => window.clearInterval(interval);
  }, [isPaused, isInView]);

  const selectStep = useCallback((index: number) => {
    setCurrentStep(index);
    setUserSelected(true);
    setIsPaused(true);
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  const activeStep = STEPS[currentStep] || STEPS[0];

  return (
    <section
      className="how-plantos-section"
      id="how-it-works"
      ref={sectionRef}
      aria-labelledby="how-heading"
    >
      <div className="how-plantos-container">
        {/* Eyebrow & Title Header */}
        <div>
          <p className="eyebrow-container">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              YOUR SEVEN-STEP MAINTENANCE WORKFLOW
            </span>
          </p>
          <div className="sub-eyebrow">
            Follow each step, from sensing machine condition to completing and recording maintenance.
          </div>
          <h2 className="section-main-title" id="how-heading">
            From machine signals <br className="desktop-br" />to informed maintenance.
          </h2>
          <p className="section-desc">
            See how machine readings move through analysis, team response and recorded maintenance.
          </p>
        </div>

        {/* Breadcrumb Flow Navigation Bar */}
        <div className="flow-nav-bar">
          <div className="flow-nav-title">
            <span>FROM MACHINE SIGNALS TO MAINTENANCE ACTION</span>
          </div>
          <div className="flow-pills-list" id="flow-pills">
            {STEPS.map((step, idx) => (
              <Fragment key={step.num}>
                <button
                  type="button"
                  className={`flow-pill ${currentStep === idx ? 'active' : ''}`}
                  onClick={() => selectStep(idx)}
                  aria-label={`Jump to step ${step.num} ${step.label}`}
                >
                  {step.label}
                </button>
                {idx < STEPS.length - 1 && <span className="flow-arrow">→</span>}
              </Fragment>
            ))}
          </div>
          <a
            href="/images/workflow_7steps_final.png"
            target="_blank"
            rel="noopener noreferrer"
            className="flow-link-btn"
          >
            View full diagram
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>

        {/* Interactive 7-Stage Loop Grid */}
        <div className="how-grid">
          {/* Left: Interactive Vertical Stage Rail (01 to 07) */}
          <div className="railwrap">
            <div className="rail" aria-hidden="true">
              <span
                className="thumb"
                style={{
                  top: `${thumbStyle.top}px`,
                  height: `${thumbStyle.height}px`,
                }}
              />
            </div>
            <ol className="stages" id="stages" aria-label="Seven maintenance workflow steps">
              {STEPS.map((step, idx) => (
                <li
                  key={step.num}
                  ref={(el) => {
                    rowRefs.current[idx] = el;
                  }}
                  className={`srow ${currentStep === idx ? 'on' : ''}`}
                  onClick={() => selectStep(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      selectStep(idx);
                    }
                  }}
                  aria-current={currentStep === idx ? 'step' : undefined}
                >
                  <span className="sn">{step.num}</span>
                  <div>
                    <h3>{step.label}</h3>
                    <p>{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Right: Dynamic SVG 7-Node Loop Visualizer */}
          <div className="loopwrap" data-stage={currentStep} aria-hidden="true">
            <svg className="ring-svg" viewBox="-120 -20 800 600" role="presentation" focusable="false">
              <defs>
                <linearGradient id="fmsim-gr" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#6A3FE0" />
                  <stop offset="100%" stopColor="#2F6BFF" />
                </linearGradient>
              </defs>

              {/* Circular Progress Track */}
              <circle className="track" cx="280" cy="280" r="200" fill="none" stroke="#DCDEEB" strokeWidth="2" />
              <circle
                className="prog"
                cx="280"
                cy="280"
                r="200"
                fill="none"
                stroke="url(#fmsim-gr)"
                strokeWidth="3.5"
                strokeLinecap="round"
                style={{
                  strokeDasharray: dasharray,
                  transition: dashTransition,
                }}
                transform="rotate(-90 280 280)"
              />

              {/* 7 Circular Nodes */}
              <g className="nodes">
                {STEPS.map((step, idx) => {
                  const isDone = idx <= currentStep;
                  const isNow = idx === currentStep;
                  return (
                    <g
                      key={step.num}
                      className={`node ${isDone ? 'done' : ''} ${isNow ? 'now' : ''}`}
                      onClick={() => selectStep(idx)}
                    >
                      <circle
                        cx={step.node.cx}
                        cy={step.node.cy}
                        r="28"
                        fill={isDone ? '#6A3FE0' : '#ffffff'}
                        stroke={isDone ? '#6A3FE0' : '#DCDEEB'}
                        strokeWidth="2"
                      />
                      <text
                        x={step.node.cx}
                        y={step.node.cy + 5}
                        fill={isDone ? '#ffffff' : '#4A4E6E'}
                      >
                        {step.num}
                      </text>
                    </g>
                  );
                })}
              </g>

              {/* Radial Labels for 7 Steps */}
              <g className="rlabels">
                {STEPS.map((step, idx) => (
                  <text
                    key={step.num}
                    x={step.radialLabel.x}
                    y={step.radialLabel.y}
                    textAnchor={step.radialLabel.anchor}
                    className={currentStep === idx ? 'active' : ''}
                  >
                    {step.radialLabel.text}
                  </text>
                ))}
              </g>
            </svg>

            {/* Central Active Stage Display for 7 Steps */}
            <div className="centre">
              {STEPS.map((step, idx) => (
                <div
                  key={step.num}
                  className={`pane ${currentStep === idx ? 'on' : ''}`}
                >
                  {step.tags && (
                    <div className="srcs">
                      {step.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  )}
                  {step.dashedTags && (
                    <div className="rxform">
                      {step.dashedTags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  )}
                  {step.splitTags && (
                    <div className="split">
                      <span className="half">{step.splitTags.left}</span>
                      <span className="vs">&amp;</span>
                      <span className="half">{step.splitTags.right}</span>
                    </div>
                  )}
                  {step.isGreenCheck && <div className="actmark green">✓</div>}
                  <p className="pmain">{step.centerTitle}</p>
                  <p className="pent">{step.centerPent}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Step Status & Cycle Controller Card */}
        <div className="step-controller-card">
          <div>
            <div className="step-badge-indicator" id="step-badge">
              STEP {activeStep.num} OF 07
            </div>
            <h4 className="step-current-title" id="step-title">
              {activeStep.num} · {activeStep.label}
            </h4>
            <p className="step-current-desc" id="step-desc">
              {activeStep.desc}
            </p>
            <div className="status-hint">
              <span className={`status-dot ${isPaused ? 'paused' : ''}`} id="status-dot" />
              <span id="cycle-status-text">
                {isPaused
                  ? userSelected
                    ? `Paused on Step ${activeStep.num} (${activeStep.label}). Click Resume to continue loop.`
                    : 'Automatic cycle paused.'
                  : 'Workflow advances automatically every 3.5 seconds.'}
              </span>
            </div>
          </div>

          <div className="controller-actions">
            <button
              type="button"
              className={`cycle-btn ${isPaused ? 'paused' : ''}`}
              onClick={togglePause}
              title="Pause or Resume the automatic loop"
            >
              <span>{isPaused ? '▶' : '⏸'}</span>
              <span>{isPaused ? 'Resume Automatic Cycle' : 'Pause Automatic Cycle'}</span>
            </button>
            <a
              href="/images/workflow_7steps_final.png"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient"
            >
              View full diagram
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Site Agreement Disclaimer Note */}
        <div className="disclaimer-note">
          <strong>Note:</strong> Sensor suitability, alert thresholds, recipients and notification channels are agreed with your site team during setup.
        </div>
      </div>
    </section>
  );
}
