import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function ResultsPanel({ children, className = '' }: Props) {
  return <div className={`results-section ${className}`}>{children}</div>;
}
