import type { ReactNode } from 'react';

export type FeatureCard = {
  icon?: ReactNode;
  title: ReactNode;
  description: ReactNode;
};

type Props = {
  sectionTitle?: ReactNode;
  cards: FeatureCard[];
  gridClass?: string;
};

export default function ToolFeatureCards({ sectionTitle, cards, gridClass = '_4-card-grid-tools' }: Props) {
  return (
    <section>
      <div className="container-default">
        {sectionTitle && (
          <div className="top-content feature-flex">
            <h2 className="title features-page-v2">{sectionTitle}</h2>
          </div>
        )}
        <div className="container-default-inner px-0 gap-0">
          <div className={`w-layout-hflex ${gridClass}`}>
            {cards.map((card, i) => (
              <div key={i} className="tools-svg-card">
                {card.icon && (
                  <div className="svg-card-image-container">{card.icon}</div>
                )}
                <div className="svg-card-content-container text-center gap-16">
                  <div className="tools-svg-card-content-title left inter color-2e2e2e mobile-20px">{card.title}</div>
                  <div className="tools-svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">{card.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
