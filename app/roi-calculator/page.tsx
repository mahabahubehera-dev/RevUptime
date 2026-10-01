'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Factory, Info, TrendingUp } from 'lucide-react';

const sectors = [
  { id: 'steel', label: 'Steel & metals', recovery: 0.2 },
  { id: 'mining', label: 'Mining & minerals', recovery: 0.18 },
  { id: 'manufacturing', label: 'Manufacturing', recovery: 0.2 },
  { id: 'cement', label: 'Cement & building materials', recovery: 0.18 },
  { id: 'power', label: 'Power & utilities', recovery: 0.15 },
  { id: 'other', label: 'Other process industries', recovery: 0.15 },
] as const;

const inr = (value: number) => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0,
}).format(value);

export default function ROICalculatorPage() {
  const [industry, setIndustry] = useState<(typeof sectors)[number]['id']>('manufacturing');
  const [machines, setMachines] = useState(35);
  const [hoursLostPerYear, setHoursLostPerYear] = useState(120);
  const [downtimeCost, setDowntimeCost] = useState(1800);

  const result = useMemo(() => {
    const sector = sectors.find((item) => item.id === industry) ?? sectors[2];
    const exposure = machines * hoursLostPerYear * downtimeCost;
    const recoveredHours = machines * hoursLostPerYear * sector.recovery;
    const annualSavings = exposure * sector.recovery;
    return { sector, exposure, recoveredHours, annualSavings };
  }, [industry, machines, hoursLostPerYear, downtimeCost]);

  return (
    <main id="main" className="roi-page">
      <section className="page-hero roi-hero">
        <div className="container">
          <Link className="breadcrumb" href="/">RevUptime <span>/</span> ROI Calculator</Link>
          <span className="section-eyebrow">PLANT DOWNTIME ROI CALCULATOR</span>
          <h1>Estimate the cost of downtime.<br/><em>See the recovery opportunity.</em></h1>
          <p>Adjust the inputs for your plant to estimate annual downtime exposure and the value of recovering operating hours.</p>
        </div>
      </section>

      <section className="section roi-calculator-section">
        <div className="container">
          <div className="roi-calculator-grid">
            <section className="roi-input-panel" aria-labelledby="roi-input-title">
              <div className="roi-panel-heading"><span className="roi-panel-icon"><Factory size={19}/></span><div><span className="section-eyebrow">YOUR PLANT</span><h2 id="roi-input-title">Set your operating inputs</h2></div></div>
              <label className="roi-field">Industry
                <select value={industry} onChange={(event) => setIndustry(event.target.value as typeof industry)}>
                  {sectors.map((sector) => <option value={sector.id} key={sector.id}>{sector.label}</option>)}
                </select>
              </label>
              <label className="roi-field">Number of machines
                <span className="roi-input-wrap"><input min="1" step="1" type="number" value={machines} onChange={(event) => setMachines(Math.max(0, Number(event.target.value) || 0))}/><small>machines</small></span>
                <small className="roi-field-hint">Machines included in this estimate</small>
              </label>
              <label className="roi-field">Downtime hours lost per machine / year
                <span className="roi-input-wrap"><input min="0" step="1" type="number" value={hoursLostPerYear} onChange={(event) => setHoursLostPerYear(Math.max(0, Number(event.target.value) || 0))}/><small>hours / year</small></span>
                <small className="roi-field-hint">Equipment-related unplanned downtime</small>
              </label>
              <label className="roi-field">Cost per hour of downtime
                <span className="roi-input-wrap"><span className="roi-currency">₹</span><input min="0" step="500" type="number" value={downtimeCost} onChange={(event) => setDowntimeCost(Math.max(0, Number(event.target.value) || 0))}/><small>INR / hour</small></span>
                <small className="roi-field-hint">Lost production and recovery cost</small>
              </label>
              <div className="roi-live-status"><span/><span>Estimate updates as you change the inputs</span></div>
            </section>

            <section className="roi-results-panel" aria-labelledby="roi-results-title" aria-live="polite">
              <div className="roi-results-top"><div><span className="roi-results-kicker"><TrendingUp size={14}/> PLANT IMPACT ESTIMATE</span><h2 id="roi-results-title">Your potential recovery</h2><p>{result.sector.label} · {machines.toLocaleString('en-IN')} machines</p></div><span className="roi-estimate-chip">ESTIMATE</span></div>
              <div className="roi-primary-result"><span>Potential annual savings</span><strong>{inr(result.annualSavings)}</strong><small>Estimated value of recoverable downtime per year</small><div className="roi-progress-track"><span style={{ width: `${result.sector.recovery * 100}%` }}/></div><small>{Math.round(result.sector.recovery * 100)}% illustrative recovery scenario</small></div>
              <div className="roi-secondary-results">
                <article><span>Currently at risk / year</span><strong>{inr(result.exposure)}</strong><small>Estimated downtime exposure</small></article>
                <article><span>Operating hours recovered / year</span><strong>{Math.round(result.recoveredHours).toLocaleString('en-IN')}</strong><small>Across the machines entered</small></article>
                <article><span>Potential value over 3 years</span><strong>{inr(result.annualSavings * 3)}</strong><small>Simple estimate; no growth assumed</small></article>
              </div>
              <div className="roi-results-note"><Info size={16}/><p>Planning estimate only. The recovery percentage is an illustrative scenario, not a RevUptime performance guarantee. Actual outcomes depend on assets, operating conditions, and implementation.</p></div>
              <Link href="/contact" className="button roi-contact-button">Get a personalized assessment <ArrowRight size={17}/></Link>
            </section>
          </div>
          <p className="roi-method-note">Model: machines × annual lost hours per machine × downtime cost per hour. Potential recovery uses an adjustable illustrative scenario by selected industry; it is not based on verified RevUptime deployment benchmarks.</p>
        </div>
      </section>
    </main>
  );
}
