import type { ReactNode } from 'react';

interface Props {
  step: number;
  title: string;
  children: ReactNode;
}

export default function Panel({ step, title, children }: Props) {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
      <h3 className="flex items-center gap-3 text-lg font-semibold text-slate-900 mb-4">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white text-sm">
          {step}
        </span>
        {title}
      </h3>
      {children}
    </section>
  );
}
