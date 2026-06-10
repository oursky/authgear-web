import { useEffect, useRef, useState } from 'react';

interface Props {
  /** Object is pretty-printed as JSON; a string renders verbatim (e.g. PEM). */
  value: unknown;
  /** Clamp tall output to a scrollable 20rem box. Default true; set false to
      let the block grow to its full height (e.g. the live options preview). */
  clamp?: boolean;
}

export default function JsonView({ value, clamp = true }: Props) {
  const text = typeof value === 'string' ? value : JSON.stringify(value, null, 2);

  // Briefly flash the block when its content changes (skips the first render),
  // so a live-updating preview signals that it just updated. `pulse` keys the
  // <pre> so the one-shot CSS animation restarts on every change.
  const [pulse, setPulse] = useState(0);
  const first = useRef(true);
  const prev = useRef(text);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (text === prev.current) return;
    prev.current = text;
    setPulse((p) => p + 1);
  }, [text]);

  return (
    <pre
      key={pulse}
      className={`mt-3 overflow-auto rounded-lg bg-slate-900 text-slate-100 text-xs leading-relaxed p-4${
        clamp ? ' max-h-80' : ''
      }${pulse > 0 ? ' pd-json-flash' : ''}`}
    >
      {text}
    </pre>
  );
}
