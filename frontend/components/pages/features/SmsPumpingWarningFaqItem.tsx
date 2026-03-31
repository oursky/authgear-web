'use client';

import { useId, useState } from 'react';

export type SmsPumpingWarningFaqItemProps = {
  title: string;
  iconSrc: string;
  description: string;
};

export default function SmsPumpingWarningFaqItem({
  title,
  iconSrc,
  description,
}: SmsPumpingWarningFaqItemProps) {
  const [open, setOpen] = useState(false);
  const baseId = useId();
  const triggerId = `${baseId}-trigger`;
  const panelId = `${baseId}-panel`;

  return (
    <div className="ds-sms-warning-faq__item">
      <button
        type="button"
        id={triggerId}
        aria-expanded={open}
        aria-controls={panelId}
        className="ds-sms-warning-faq__trigger"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="ds-sms-warning-faq__chevron-wrap" aria-hidden>
          <img
            loading="lazy"
            src="/images/arrow-icon.svg"
            alt=""
            className={`ds-sms-warning-faq__chevron${open ? ' ds-sms-warning-faq__chevron--open' : ''}`}
          />
        </span>
        <span className="ds-sms-warning-faq__item-title">{title}</span>
        <img
          src={iconSrc}
          loading="lazy"
          width={48}
          height={48}
          alt=""
          className="ds-sms-warning-faq__topic-icon"
        />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className="ds-sms-warning-faq__panel"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="ds-sms-warning-faq__panel-inner">
          <div className="ds-sms-warning-faq__answer">
            <p className="ds-sms-warning-faq__answer-text">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
