import type { ReactNode } from 'react';

export type ToolStep = {
  step?: string;
  title: ReactNode;
  items?: ReactNode[];
  body?: ReactNode;
};

type Props = {
  sectionTitle?: ReactNode;
  steps: ToolStep[];
  containerClass?: string;
  afterSteps?: ReactNode;
};

export default function ToolHowItWorks({
  sectionTitle = 'How the Tool Works',
  steps,
  containerClass = 'tools-step',
  afterSteps,
}: Props) {
  return (
    <section>
      <div className="container-default">
        <div className="container-default-inner px-0 gap-0 pb-0">
          <div className="top-content feature-flex">
            <h2 className="title features-page-v2">{sectionTitle}</h2>
          </div>
          <div className={containerClass}>
            {steps.map((s, i) => (
              <div key={i} className="w-layout-vflex tools-step-card">
                {s.step && <div className="tools-step-step">{s.step}</div>}
                <div className="tools-step-title">{s.title}</div>
                {s.body && <div className="text-block-84">{s.body}</div>}
                {s.items && s.items.length > 0 && (
                  <ul role="list" className="tools-step-content">
                    {s.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          {afterSteps}
        </div>
      </div>
    </section>
  );
}
