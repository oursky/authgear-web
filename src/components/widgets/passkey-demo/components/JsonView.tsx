interface Props {
  /** Object is pretty-printed as JSON; a string renders verbatim (e.g. PEM). */
  value: unknown;
}

export default function JsonView({ value }: Props) {
  const text = typeof value === 'string' ? value : JSON.stringify(value, null, 2);
  return (
    <pre className="mt-2 max-h-80 overflow-auto rounded-lg bg-slate-900 text-slate-100 text-xs leading-relaxed p-4">
      {text}
    </pre>
  );
}
