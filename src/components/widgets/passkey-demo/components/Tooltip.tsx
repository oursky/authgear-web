import { useId, type ReactNode } from 'react';

interface Props {
  /** Explanatory text shown on hover/focus. */
  text: string;
  /** The trigger content (e.g. a badge). */
  children: ReactNode;
}

/**
 * Lightweight styled tooltip — replaces the browser's native `title` bubble.
 * Opens downward (the triggers sit at the top of the widget, so an upward
 * bubble could be clipped). Shows on hover and on keyboard focus; the trigger
 * is focusable and linked to the bubble via aria-describedby.
 */
export default function Tooltip({ text, children }: Props) {
  const id = useId();
  return (
    <span className="group relative inline-flex">
      <span
        tabIndex={0}
        aria-describedby={id}
        className="inline-flex cursor-help items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        {children}
      </span>
      <span
        id={id}
        role="tooltip"
        className="pointer-events-none absolute left-0 top-full z-20 mt-2 w-64 rounded-lg bg-slate-900 px-3 py-2 text-xs font-normal leading-relaxed text-slate-100 opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {text}
        <span
          aria-hidden="true"
          className="absolute bottom-full left-6 h-2 w-2 translate-y-1/2 rotate-45 bg-slate-900"
        />
      </span>
    </span>
  );
}
