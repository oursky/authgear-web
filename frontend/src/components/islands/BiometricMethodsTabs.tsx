import { useState } from 'react';

type Card = {
  img: string;
  title: string;
  description: string;
};

type Tab = {
  label: string;
  panelTitle: string;
  panelDescription: string;
  cards: [Card, Card, Card];
};

type Props = {
  tabs: readonly [Tab, Tab];
  ariaLabel?: string;
};

export default function BiometricMethodsTabs({ tabs, ariaLabel = 'Biometric methods' }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className="ds-pill-tabs">
      <div className="ds-pill-tabs__bar" role="tablist" aria-label={ariaLabel}>
        {tabs.map((tab, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            id={`bio-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`bio-tab-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            className={`ds-pill-tabs__tab${active === i ? ' ds-pill-tabs__tab--active' : ''}`}
            onClick={() => setActive(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="ds-pill-tabs__panels">
        {tabs.map((tab, i) => (
          <div
            key={i}
            id={`bio-tab-panel-${i}`}
            role="tabpanel"
            aria-labelledby={`bio-tab-${i}`}
            aria-hidden={active !== i}
            className={`ds-pill-tabs__panel${active === i ? ' ds-pill-tabs__panel--active' : ''}`}
          >
            <div className="ds-pill-tabs__panel-header">
              <h4 className="heading-on-light">{tab.panelTitle}</h4>
              <p className="section-lede-on-light">{tab.panelDescription}</p>
            </div>
            <div className="ds-grid-3">
              {tab.cards.map((card) => (
                <div key={card.img} className="svg-card">
                  <img loading="lazy" src={card.img} alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{card.title}</div>
                    <div className="ds-svg-card-description">{card.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
