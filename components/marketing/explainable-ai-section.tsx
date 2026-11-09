'use client';

import React, { useEffect, useRef } from 'react';
import { initPlant3D } from './plant-3d-scene';

export function ExplainableAISection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;
    const cleanup = initPlant3D(containerRef.current, canvasRef.current);
    return () => {
      cleanup();
    };
  }, []);

  return (
    <section
      className="section dark-section srbio-section"
      id="explainable-ai"
      style={{
        padding: '5rem 0 4rem 0',
        backgroundColor: 'var(--navy, #0f1e3a)',
        color: '#ffffff',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ maxWidth: '1380px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="section-heading center" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="section-eyebrow" style={{ color: '#80c2ff' }}>EXPLAINABLE AI</span>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3.4vw, 2.75rem)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              margin: '0.5rem 0',
              whiteSpace: 'nowrap',
            }}
          >
            Know Why the Machine Is at Risk
          </h2>
          <p style={{ maxWidth: '720px', margin: '0 auto', color: '#9eafc5', fontSize: '1.05rem', lineHeight: 1.6 }}>
            See risks before they impact operations. Explore the 3D plant floor with real-time condition intelligence, explainable risk evidence, and automated priority queues.
          </p>
        </div>

        <div className="plant-container relative w-full overflow-hidden" style={{ position: 'relative' }}>
          {/* 3D Controls HUD (Minimal Clean Controls) */}
          <div className="absolute bottom-6 right-6 z-20 flex flex-wrap items-center gap-2">
            <button
              id="btn-focus-revuptime"
              type="button"
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold text-white shadow-md transition-all active:scale-95"
              style={{ backgroundColor: '#0284c7', color: '#ffffff', cursor: 'pointer' }}
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
              </svg>
              RevUpTime Sensors
            </button>
            <button
              id="btn-reset-cam"
              type="button"
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold shadow-sm border border-slate-300 transition-all hover:bg-slate-100 active:scale-95"
              style={{ backgroundColor: '#ffffff', color: '#000000', cursor: 'pointer' }}
            >
              Reset View
            </button>
            <button
              id="btn-toggle-scan"
              type="button"
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold shadow-sm border border-slate-300 transition-all hover:bg-slate-100 active:scale-95"
              style={{ backgroundColor: '#ffffff', color: '#000000', cursor: 'pointer' }}
            >
              Scan: <span id="scan-status" style={{ color: '#000000', fontWeight: 800 }}>ON</span>
            </button>
          </div>

          {/* Mouse Control Hint */}
          <div
            id="mouse-hint-pill"
            className="pointer-events-none absolute bottom-6 left-6 z-20 hidden sm:flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold shadow-md"
            style={{
              backgroundColor: '#ffffff',
              color: '#000000',
              border: '1px solid #cbd5e1',
            }}
          >
            <svg className="h-3.5 w-3.5" style={{ color: '#000000' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            <span style={{ color: '#000000', fontWeight: 700 }}>Click &amp; drag to rotate • Scroll to zoom • Right-click to pan</span>
          </div>

          {/* Interactive 3D Canvas Container */}
          <div
            id="factory-3d-wrapper"
            ref={containerRef}
            className="relative h-[660px] w-full rounded-2xl border border-slate-700/60 bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden cursor-grab active:cursor-grabbing"
          >
            <canvas id="factory-canvas" ref={canvasRef} className="h-full w-full block" />

            {/* Center 3D / 360 Activation Overlay & Static Picture Frame */}
            <div
              id="center-3d-overlay"
              className="absolute inset-0 z-30 flex flex-col items-center justify-center transition-opacity duration-500 overflow-hidden"
              style={{
                cursor: 'pointer',
              }}
            >
              {/* Static Picture Frame */}
              <img
                src="/images/plant-3d-static-frame.jpg"
                alt="RevUptime 3D Plant Model Preview"
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                style={{
                  opacity: 1,
                }}
              />

              {/* Center Activation Button */}
              <button
                id="btn-activate-3d"
                type="button"
                className="group relative z-10 flex items-center gap-3.5 rounded-full px-6 py-3.5 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  border: '2px solid rgba(255, 255, 255, 0.95)',
                  boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.08)',
                }}
              >
                <span
                  className="flex items-center justify-center w-11 h-11 rounded-full text-white shadow-md transition-transform duration-500 group-hover:rotate-180"
                  style={{ backgroundColor: '#0284c7' }}
                >
                  <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </span>
                <div className="flex flex-col text-left pr-2">
                  <span style={{ fontSize: '15.5px', fontWeight: 800, color: '#000000', lineHeight: 1.25, letterSpacing: '-0.01em' }}>
                    View in 360° 3D
                  </span>
                  <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#475569', marginTop: '2px' }}>
                    Click to activate animated digital twin
                  </span>
                </div>
              </button>
            </div>

            {/* Priority Queue Dynamic 3D Connecting Laser Line & Target Pin Overlay */}
            <svg id="priority-queue-svg" className="pointer-events-none absolute inset-0 z-20 h-full w-full" style={{ overflow: 'visible' }}>
              <line id="pq-laser-line" x1="0" y1="0" x2="0" y2="0" stroke="#ef4444" strokeWidth="1.6" strokeDasharray="4 3" opacity="0.9" />
              <circle id="pq-card-anchor" cx="0" cy="0" r="3.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
              <circle id="pq-target-dot" cx="0" cy="0" r="5.5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
              <circle id="pq-target-ripple" cx="0" cy="0" r="14" fill="none" stroke="#ef4444" strokeWidth="1.5" opacity="0.7">
                <animate attributeName="r" values="5;18;5" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.85;0.1;0.85" dur="1.8s" repeatCount="indefinite" />
              </circle>
            </svg>

            {/* Priority Queue & Health Score Dashboard */}
            <div
              id="priority-queue-dashboard"
              className="absolute top-5 right-5 z-30 w-[360px] max-w-[calc(100%-2.5rem)] rounded-2xl bg-white/95 backdrop-blur-md p-4 shadow-[0_16px_40px_rgba(15,23,42,0.12)] border border-slate-200/90 font-sans transition-all duration-300 select-none"
            >
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-[13.5px] font-bold text-slate-800 tracking-tight">Priority queue</span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-600 border border-red-200/60 animate-pulse">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500" /> LIVE
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button id="pq-play-pause-btn" type="button" className="flex items-center justify-center h-5 w-5 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer" title="Pause / Resume cycling">
                    <svg id="pq-pause-icon" className="h-3 w-3 fill-current" viewBox="0 0 20 20">
                      <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
                    </svg>
                    <svg id="pq-play-icon" className="h-3 w-3 fill-current hidden" viewBox="0 0 20 20">
                      <path d="M6 4l10 6-10 6V4z" />
                    </svg>
                  </button>
                  <span className="text-[11px] font-semibold tracking-wider text-slate-400">Health score</span>
                </div>
              </div>

              <div id="pq-items-list" className="mt-2 space-y-1">
                {/* Dynamically populated rows */}
              </div>

              {/* Micro progress bar for auto-cycling */}
              <div className="mt-2.5 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                <div id="pq-cycle-bar" className="h-full bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 rounded-full transition-all duration-100" style={{ width: '0%' }} />
              </div>
            </div>

            {/* Machine Details & Status Card (Hover / Click) */}
            <div id="asset-tooltip" className="asset-details-card hidden">
              <div className="tt-header">
                <div className="tt-title-wrap">
                  <span id="tt-pin-badge" className="tt-pin-indicator hidden">SELECTED</span>
                  <span id="tt-name" className="tt-title">Machine Name</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span id="tt-status" className="tt-status-normal">Status</span>
                  <button id="tt-close-btn" className="tt-close-btn hidden" type="button" title="Close details">✕</button>
                </div>
              </div>
              <div className="tt-body">
                <div className="tt-row">
                  <span className="tt-label">Health Score:</span>
                  <strong id="tt-health" className="tt-val font-bold text-emerald-600">98 / 100</strong>
                </div>
                <div className="tt-row">
                  <span className="tt-label">Vibration:</span>
                  <strong id="tt-vib" className="tt-val">0.0 mm/s</strong>
                </div>
                <div className="tt-row">
                  <span className="tt-label">Temperature:</span>
                  <strong id="tt-temp" className="tt-val">00°C</strong>
                </div>
                <div className="tt-row">
                  <span className="tt-label">AI Prediction:</span>
                  <strong id="tt-pred" className="tt-pred-healthy">Nominal</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

