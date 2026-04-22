import type { ReactNode } from 'react';

/** Wraps the outer section + container for the FAQ area. */
export default function ToolFaq({ children }: { children: ReactNode }) {
  return (
    <section>
      <div className="container-default">
        <div className="container-default-inner px-0 gap-0">
          {children}
        </div>
      </div>
    </section>
  );
}

/** A standard FAQ card (icon + title + body content). */
export function ToolFaqCard({
  icon,
  title,
  children,
}: {
  icon?: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="w-layout-hflex tools-faq-card">
      {icon && <img src={icon} loading="lazy" alt="" className="image-93" />}
      <h2 className="tools-faq-title">{title}</h2>
      {children}
    </div>
  );
}

/** A single check-list item inside a FAQ card. */
export function ToolFaqCheckItem({ children }: { children: ReactNode }) {
  return (
    <div className="w-layout-hflex tools-faq-check-list">
      <img src="/images/Checkmark.svg" loading="lazy" width="auto" height="auto" alt="" />
      <div className="tools-faq-content">{children}</div>
    </div>
  );
}

/**
 * The "Best Practices" wide card that appears below the main FAQ list.
 * Renders a tools-faq-1-grid > tools-faq-card with flex-block-78 layout.
 */
export function ToolFaqBestPractices({
  icon,
  title,
  children,
}: {
  icon: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="w-layout-vflex tools-faq-1-grid">
      <div className="w-layout-hflex tools-faq-card">
        <div className="w-layout-hflex flex-block-78">
          <img src={icon} loading="lazy" alt="" className="image-93" />
          <div className="w-layout-hflex flex-block-79">
            <h2 className="tools-faq-title">{title}</h2>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
