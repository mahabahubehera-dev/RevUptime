export const faqQuestions = [
  ['What does RevUptime do?', 'RevUptime turns condition signals, operating context and maintenance history into prioritised guidance for industrial maintenance teams.'],
  ['How does an alert become a maintenance action?', 'A prescription links the asset and likely fault to a recommended action, severity and target deadline, so the team can review and plan the work.'],
  ['Can operators validate the result?', 'Yes. The product demo lets an operator confirm a fix or mark an alert as not needed. In a live deployment, validation feedback helps keep the maintenance record grounded in what happened.'],
  ['Are the dashboard and ROI figures live?', 'No. The website dashboard uses illustrative sample data. ROI calculator results are estimates based on the inputs and stated assumptions.'],
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
