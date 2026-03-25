import type { ReactNode } from 'react';

type Props = { title: ReactNode; description: ReactNode };

export default function ToolHero({ title, description }: Props) {
  return (
    <section className="tools-section bg-f9f9fb">
      <div className="w-layout-blockcontainer container-default tools-heading w-container">
        <h1 className="tools-h1">{title}</h1>
        <p className="tools-description">{description}</p>
      </div>
    </section>
  );
}
