'use client';

import { useState } from 'react';
import { CheckCircle2, CircleX } from 'lucide-react';

export function OperatorValidation() {
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [validation, setValidation] = useState<'confirmed' | 'not-needed' | null>(null);

  function respond(value: 'confirmed' | 'not-needed') {
    if (validation === null) setFeedbackCount((count) => count + 1);
    setValidation(value);
  }

  return <section className="operator-validation" aria-label="Operator validation demo">
    <div className="operator-validation-copy"><strong>Validate maintenance outcome</strong><span>Sample alert · ID Fan M-104</span></div>
    <div className="operator-validation-actions">
      <button type="button" className={validation === 'confirmed' ? 'chosen' : ''} aria-pressed={validation === 'confirmed'} onClick={() => respond('confirmed')}><CheckCircle2 size={14}/> Fix confirmed</button>
      <button type="button" className={validation === 'not-needed' ? 'chosen' : ''} aria-pressed={validation === 'not-needed'} onClick={() => respond('not-needed')}><CircleX size={14}/> Not needed</button>
    </div>
    <small>{feedbackCount} operator {feedbackCount === 1 ? 'response' : 'responses'} recorded in this demo</small>
  </section>;
}
