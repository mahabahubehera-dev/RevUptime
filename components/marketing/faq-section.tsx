export const faqQuestions = [
  ['What is RevUptime?', 'RevUptime is a prescriptive maintenance platform for industrial teams. It combines condition monitoring signals, operating context and maintenance history to generate prioritised actions, helping maintenance teams improve asset health and reduce unplanned downtime.'],
  ['What is prescriptive maintenance, and how is it different from predictive maintenance?', 'Predictive maintenance forecasts that an asset may fail. Prescriptive maintenance goes further by recommending what to do about it. RevUptime links each asset and likely fault to a recommended action, severity and target deadline, so teams can plan work instead of only reacting to alerts.'],
  ['How does RevUptime turn an alert into a maintenance action?', 'RevUptime converts condition monitoring alerts into a prescription: the affected asset, the likely fault, the recommended action, the severity and the deadline. Maintenance teams review the prescription, plan the work and act before a small issue becomes unplanned downtime.'],
  ['Can operators validate RevUptime’s recommendations?', 'Yes. Operators can confirm a fix or mark an alert as not needed. In live deployments, this feedback keeps the maintenance record grounded in what actually happened, so asset health history stays accurate and future recommendations improve.'],
];

export function FAQSection({ product = false }: { product?: boolean }) {
  return <section className="section light-section" aria-labelledby={product ? 'product-faq-title' : 'home-faq-title'}>
    <div className="container faq-layout">
      <div className="section-heading">
        <span className="section-eyebrow">COMMON QUESTIONS</span>
        <h2 id={product ? 'product-faq-title' : 'home-faq-title'}>{product ? 'Questions about the platform.' : 'A few things teams ask.'}</h2>
      </div>
      <div className="faq-list">{faqQuestions.map(([question, answer]) => <details key={question}>
        <summary>{question}<span aria-hidden="true">+</span></summary>
        <p>{answer}</p>
      </details>)}</div>
    </div>
  </section>;
}
