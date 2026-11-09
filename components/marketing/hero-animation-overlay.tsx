'use client';

import { useEffect, useRef, useState } from 'react';

/* ═══════════════════════════════════════════════════════════
   RevUpTime Industrial Predictive Maintenance Hero Overlay
   Direct pixel-calibrated 1535x1024 SVG overlay matching the
   exact geometry of the transparent hero image.
   ═══════════════════════════════════════════════════════════ */

export function HeroAnimationOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [rmsText, setRmsText] = useState('1.42');
  const [waveformPath, setWaveformPath] = useState('');
  const [scanX, setScanX] = useState(928);

  // Check reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Intersection observer — pause when off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ── Oscilloscope Live Vibration Simulation ────────────────
  useEffect(() => {
    if (!isVisible || prefersReduced) return;

    let animId: number;
    let lastRmsUpdate = 0;

    const tick = (time: number) => {
      // Calibrated glass screen horizontal bounds on the motor
      const startX = 928;
      const endX = 1092;
      const width = endX - startX;
      const centerY = 619;

      // Laser sweep position (repeats every 2.4s)
      const sweepProgress = (time % 2400) / 2400;
      const currentScan = startX + sweepProgress * width;
      setScanX(currentScan);

      // Jitter readout
      if (time - lastRmsUpdate > 450) {
        lastRmsUpdate = time;
        const jitter = (Math.sin(time * 0.003) * 0.03 + 1.42).toFixed(2);
        setRmsText(jitter);
      }

      // Multi-harmonic vibration waveform
      const t = time * 0.004;
      const points: string[] = [];

      for (let x = startX; x <= endX; x += 3) {
        const relX = x - startX;
        const primary = Math.sin(relX * 0.09 + t * 3) * 9;
        const harmonic = Math.sin(relX * 0.2 - t * 4.5) * 4.5;
        const transientPulse = Math.sin(relX * 0.04 + t) * Math.sin(relX * 0.3) * 5;

        const spikeDist = Math.abs((relX % 45) - 22);
        const spike = spikeDist < 4 ? (4 - spikeDist) * 2.5 * Math.sin(t * 10) : 0;

        const y = centerY + primary + harmonic + transientPulse + spike;
        points.push(`${relX === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
      }

      setWaveformPath(points.join(' '));
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isVisible, prefersReduced]);

  if (prefersReduced) {
    return <div ref={containerRef} className="hero-animation-overlay hero-overlay--reduced" aria-hidden="true" />;
  }

  return (
    <div ref={containerRef} className="hero-animation-overlay" aria-hidden="true">
      <svg
        viewBox="0 0 1535 1024"
        className="hero-overlay-svg"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* ── Glow Filters ──────────────────────────────────── */}
          <filter id="glowCyan" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glowGreen" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* ── Screen Glass Clip Path ───────────────────────── */}
          <clipPath id="scopeClip">
            <rect x="925" y="573" width="170" height="92" rx="7" ry="7" />
          </clipPath>

          {/* ── Sweep Gradient ───────────────────────────────── */}
          <linearGradient id="sweepGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0, 212, 255, 0)" />
            <stop offset="80%" stopColor="rgba(0, 212, 255, 0.08)" />
            <stop offset="100%" stopColor="rgba(0, 255, 255, 0.3)" />
          </linearGradient>
        </defs>

        {/* ══════════════════════════════════════════════════════
            1. MULTI-MODAL SENSOR SIGNAL PATHS (Hexagons → Hub)
            Exact Centers: Oil (540, 420), Vib (515, 575), Data (540, 735)
            ══════════════════════════════════════════════════════ */}
        <g className="hero-telemetry-streams">
          {/* Oil Sensor (540, 420) → Hub (775, 614) */}
          <path
            d="M 540 420 C 620 420, 700 560, 775 614"
            stroke="rgba(0, 212, 255, 0.35)"
            strokeWidth="1.5"
            strokeDasharray="4 8"
          />
          <path
            className="hero-stream-active"
            d="M 540 420 C 620 420, 700 560, 775 614"
            stroke="#00ffff"
            strokeWidth="2.5"
            filter="url(#glowCyan)"
          />

          {/* Vibration Sensor (515, 575) → Hub (775, 614) */}
          <path
            d="M 515 575 C 600 575, 700 600, 775 614"
            stroke="rgba(0, 212, 255, 0.35)"
            strokeWidth="1.5"
            strokeDasharray="4 8"
          />
          <path
            className="hero-stream-active hero-stream-delay-1"
            d="M 515 575 C 600 575, 700 600, 775 614"
            stroke="#00ffff"
            strokeWidth="2.5"
            filter="url(#glowCyan)"
          />

          {/* Data/Server (540, 735) → Hub (775, 614) */}
          <path
            d="M 540 735 C 620 735, 700 670, 775 614"
            stroke="rgba(0, 212, 255, 0.35)"
            strokeWidth="1.5"
            strokeDasharray="4 8"
          />
          <path
            className="hero-stream-active hero-stream-delay-2"
            d="M 540 735 C 620 735, 700 670, 775 614"
            stroke="#00ffff"
            strokeWidth="2.5"
            filter="url(#glowCyan)"
          />

          {/* Hub Junction Node (775, 614) */}
          <circle cx="775" cy="614" r="4.5" fill="#ffffff" filter="url(#glowCyan)" />
          <circle className="hero-hub-pulse" cx="775" cy="614" r="4.5" stroke="#00ffff" strokeWidth="1.5" fill="none" />
          <circle className="hero-hub-pulse hero-hub-pulse--delayed" cx="775" cy="614" r="4.5" stroke="#00d4ff" strokeWidth="1" fill="none" />
        </g>

        {/* ══════════════════════════════════════════════════════
            2. MOTOR VIBRATION OSCILLOSCOPE (Exact 925, 573, 170x92)
            ══════════════════════════════════════════════════════ */}
        <g className="hero-scope-group">
          {/* Glowing bezel frame over motor display */}
          <rect
            x="925"
            y="573"
            width="170"
            height="92"
            rx="7"
            ry="7"
            stroke="#00d4ff"
            strokeWidth="1.8"
            fill="none"
            filter="url(#glowCyan)"
            opacity="0.85"
          />

          {/* Clipped content inside oscilloscope screen */}
          <g clipPath="url(#scopeClip)">
            {/* Dark glass screen enhancement */}
            <rect x="925" y="573" width="170" height="92" fill="rgba(3, 14, 30, 0.55)" />

            {/* Reticle Grid Lines */}
            <line x1="925" y1="596" x2="1095" y2="596" stroke="rgba(0, 212, 255, 0.16)" strokeDasharray="3 4" strokeWidth="1" />
            <line x1="925" y1="619" x2="1095" y2="619" stroke="rgba(0, 212, 255, 0.28)" strokeWidth="1" />
            <line x1="925" y1="642" x2="1095" y2="642" stroke="rgba(0, 212, 255, 0.16)" strokeDasharray="3 4" strokeWidth="1" />

            <line x1="967" y1="573" x2="967" y2="665" stroke="rgba(0, 212, 255, 0.16)" strokeDasharray="3 4" strokeWidth="1" />
            <line x1="1010" y1="573" x2="1010" y2="665" stroke="rgba(0, 212, 255, 0.28)" strokeWidth="1" />
            <line x1="1052" y1="573" x2="1052" y2="665" stroke="rgba(0, 212, 255, 0.16)" strokeDasharray="3 4" strokeWidth="1" />

            {/* Sweep radar trailing gradient */}
            <rect
              x={scanX - 40}
              y="573"
              width="40"
              height="92"
              fill="url(#sweepGrad)"
              opacity="0.85"
            />
            {/* Sweep laser line */}
            <line
              x1={scanX}
              y1="573"
              x2={scanX}
              y2="665"
              stroke="#00ffff"
              strokeWidth="1.5"
              filter="url(#glowCyan)"
              opacity="0.9"
            />

            {/* Primary Dynamic Vibration Waveform */}
            {waveformPath && (
              <>
                <path
                  d={waveformPath}
                  stroke="#00ffff"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#glowCyan)"
                  opacity="0.65"
                />
                <path
                  d={waveformPath}
                  stroke="#ffffff"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            )}

            {/* Live Telemetry Readout */}
            <rect x="929" y="577" width="98" height="13" rx="2.5" fill="rgba(2, 10, 24, 0.8)" />
            <text
              x="933"
              y="586.5"
              fill="#00e5ff"
              fontSize="7.5"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontWeight="650"
              letterSpacing="0.03em"
            >
              RMS: {rmsText} · 24.8 Hz
            </text>

            {/* Live Indicator Pill */}
            <rect x="1056" y="577" width="34" height="13" rx="2.5" fill="rgba(2, 10, 24, 0.8)" />
            <circle cx="1062" cy="583.5" r="2.4" fill="#22c55e" filter="url(#glowGreen)">
              <animate attributeName="opacity" values="1;0.35;1" dur="1s" repeatCount="indefinite" />
            </circle>
            <text
              x="1067"
              y="586.5"
              fill="#4ade80"
              fontSize="6.8"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontWeight="700"
              letterSpacing="0.05em"
            >
              LIVE
            </text>
          </g>
        </g>

        {/* ══════════════════════════════════════════════════════
            3. CONDUIT & IoT SENSOR BOX TELEMETRY
            ══════════════════════════════════════════════════════ */}
        <g className="hero-sensor-telemetry">
          {/* Conduit cable line from motor screen to sensor box */}
          <path
            className="hero-conduit-stream"
            d="M 1095 635 C 1140 645, 1185 635, 1215 580"
            stroke="#00ffff"
            strokeWidth="2"
            filter="url(#glowCyan)"
          />

          {/* IoT Sensor Alive Status Indicator LED (Exact x=1234.5, y=521..549) */}
          <line
            x1="1234.5"
            y1="521"
            x2="1234.5"
            y2="549"
            stroke="#00e5ff"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#glowCyan)"
          >
            <animate attributeName="opacity" values="0.7;1;0.7" dur="1.6s" repeatCount="indefinite" />
          </line>

          {/* Wireless RF Waves (Emitting from Sensor Box, Exact Center 1215, 395) */}
          <g className="hero-wifi-waves">
            <path
              className="hero-wifi-wave hero-wifi-wave--1"
              d="M 1200 405 A 18 18 0 0 1 1230 405"
              stroke="#00e5ff"
              strokeWidth="2"
              strokeLinecap="round"
              filter="url(#glowCyan)"
            />
            <path
              className="hero-wifi-wave hero-wifi-wave--2"
              d="M 1188 397 A 32 32 0 0 1 1242 397"
              stroke="#00e5ff"
              strokeWidth="2"
              strokeLinecap="round"
              filter="url(#glowCyan)"
            />
            <path
              className="hero-wifi-wave hero-wifi-wave--3"
              d="M 1176 389 A 46 46 0 0 1 1254 389"
              stroke="#00e5ff"
              strokeWidth="2"
              strokeLinecap="round"
              filter="url(#glowCyan)"
            />
          </g>
        </g>

        {/* ══════════════════════════════════════════════════════
            4. DECISION SUPPORT CARD GRAPHS
            Asset Risk Exact: Center (1000, 187.5), Radius 49
            Expected Uptime Gain Exact: (1250, 244) → (1317, 220)
            ══════════════════════════════════════════════════════ */}
        <g className="hero-decision-support-graphs">
          {/* Asset Risk 28% Donut Gauge Arc */}
          <circle
            cx="1000"
            cy="187.5"
            r="49"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeDasharray="86.2 221.7"
            transform="rotate(-90 1000 187.5)"
            filter="url(#glowCyan)"
            className="hero-donut-pulse"
          />

          {/* Beacon at exact 28% mark (x=1048, y=197) */}
          <circle cx="1048" cy="197" r="3.5" fill="#ffffff" filter="url(#glowCyan)" />
          <circle className="hero-radar-ripple" cx="1048" cy="197" r="3.5" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
          <circle className="hero-radar-ripple hero-radar-ripple--delayed" cx="1048" cy="197" r="3.5" stroke="#00e5ff" strokeWidth="1" fill="none" />

          {/* Expected Uptime Gain (+12%) Line */}
          <path
            d="M 1250 244 C 1270 242, 1295 235, 1317 220"
            stroke="#22c55e"
            strokeWidth="3.2"
            strokeLinecap="round"
            filter="url(#glowGreen)"
            opacity="0.8"
          />
          <path
            className="hero-chart-stream"
            d="M 1250 244 C 1270 242, 1295 235, 1317 220"
            stroke="#4ade80"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#glowGreen)"
          />

          {/* Apex Beacon at Peak Arrow (1317, 220) */}
          <circle cx="1317" cy="220" r="4" fill="#ffffff" filter="url(#glowGreen)" />
          <circle className="hero-radar-ripple" cx="1317" cy="220" r="4" stroke="#4ade80" strokeWidth="1.6" fill="none" />
          <circle className="hero-radar-ripple hero-radar-ripple--delayed" cx="1317" cy="220" r="4" stroke="#22c55e" strokeWidth="1.2" fill="none" />
        </g>

        {/* ══════════════════════════════════════════════════════
            5. VALIDATED BUSINESS OUTCOMES — 4 EXACT CALIBRATED GRAPHS
            ══════════════════════════════════════════════════════ */}
        <g className="hero-outcomes-graphs">
          {/* Graph 1: Uptime (+12%) [616, 974 → 674, 943] */}
          <path
            d="M 616 974 C 632 970, 650 958, 674 943"
            stroke="#22c55e"
            strokeWidth="2.8"
            strokeLinecap="round"
            filter="url(#glowGreen)"
            opacity="0.85"
          />
          <path
            className="hero-bo-stream"
            d="M 616 974 C 632 970, 650 958, 674 943"
            stroke="#4ade80"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#glowGreen)"
          />
          <circle cx="674" cy="943" r="3.2" fill="#ffffff" filter="url(#glowGreen)" />
          <circle className="hero-radar-ripple" cx="674" cy="943" r="3.2" stroke="#4ade80" strokeWidth="1.4" fill="none" />

          {/* Graph 2: Throughput (+6%) [864, 977 → 934, 943] */}
          <path
            d="M 864 977 C 885 968, 908 958, 934 943"
            stroke="#22c55e"
            strokeWidth="2.8"
            strokeLinecap="round"
            filter="url(#glowGreen)"
            opacity="0.85"
          />
          <path
            className="hero-bo-stream hero-bo-stream--delay-1"
            d="M 864 977 C 885 968, 908 958, 934 943"
            stroke="#4ade80"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#glowGreen)"
          />
          <circle cx="934" cy="943" r="3.2" fill="#ffffff" filter="url(#glowGreen)" />
          <circle className="hero-radar-ripple" cx="934" cy="943" r="3.2" stroke="#4ade80" strokeWidth="1.4" fill="none" />

          {/* Graph 3: Downtime (-18%) [1106, 956 → 1196, 979] */}
          <path
            d="M 1106 956 C 1135 948, 1165 962, 1196 979"
            stroke="#22c55e"
            strokeWidth="2.8"
            strokeLinecap="round"
            filter="url(#glowGreen)"
            opacity="0.85"
          />
          <path
            className="hero-bo-stream hero-bo-stream--delay-2"
            d="M 1106 956 C 1135 948, 1165 962, 1196 979"
            stroke="#4ade80"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#glowGreen)"
          />
          <circle cx="1196" cy="979" r="3.2" fill="#ffffff" filter="url(#glowGreen)" />
          <circle className="hero-radar-ripple" cx="1196" cy="979" r="3.2" stroke="#4ade80" strokeWidth="1.4" fill="none" />

          {/* Graph 4: Cost / ton (-9%) [1336, 955 → 1425, 968] */}
          <path
            d="M 1336 955 C 1365 950, 1395 960, 1425 968"
            stroke="#22c55e"
            strokeWidth="2.8"
            strokeLinecap="round"
            filter="url(#glowGreen)"
            opacity="0.85"
          />
          <path
            className="hero-bo-stream hero-bo-stream--delay-3"
            d="M 1336 955 C 1365 950, 1395 960, 1425 968"
            stroke="#4ade80"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#glowGreen)"
          />
          <circle cx="1425" cy="968" r="3.2" fill="#ffffff" filter="url(#glowGreen)" />
          <circle className="hero-radar-ripple" cx="1425" cy="968" r="3.2" stroke="#4ade80" strokeWidth="1.4" fill="none" />
        </g>
      </svg>
    </div>
  );
}
