'use client';

import { useId, useState, type ReactNode } from 'react';

type Props = {
  question: string;
  /** Plain string (wrapped in `<p>`) or rich content (e.g. from `t.rich`). */
  answer: string | ReactNode;
};

export function PricingFaqItem({ question, answer }: Props) {
  const [open, setOpen] = useState(false);
  const baseId = useId();
  const triggerId = `${baseId}-trigger`;
  const panelId = `${baseId}-panel`;

  return (
    <div className="ds-pricing-faq__accordion">
      <button
        type="button"
        id={triggerId}
        className="ds-pricing-faq__summary"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="ds-pricing-faq__icon" aria-hidden />
        <span className="ds-pricing-faq__question">{question}</span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!open}
        className="ds-pricing-faq__panel"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="ds-pricing-faq__panel-inner">
          <div className="ds-pricing-faq__answer">
            {typeof answer === 'string' ? <p>{answer}</p> : answer}
          </div>
        </div>
      </div>
    </div>
  );
}
