interface Props {
  /** Object is pretty-printed as JSON; a string renders verbatim (e.g. PEM). */
  value: unknown;
  /** Clamp tall output to a scrollable 20rem box. Default true; set false to
      let the block grow to its full height (e.g. the live options preview). */
  clamp?: boolean;
}

export default function JsonView({ value, clamp = true }: Props) {
  const text = typeof value === 'string' ? value : JSON.stringify(value, null, 2);
  return (
    <pre
      className={`mt-3 overflow-auto rounded-lg bg-slate-900 text-slate-100 text-xs leading-relaxed p-4${
        clamp ? ' max-h-80' : ''
      }`}
    >
      {text}
    </pre>
  );
}
