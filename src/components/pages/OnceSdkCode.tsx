import type { ReactNode } from 'react';

interface Props {
  source: string;
  preClassName?: string;
}

/** Strings, line comments, then keywords (shared across samples). */
const TOKEN_RE =
  /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\/\/[^\n]*$|\b(?:import|export|from|const|let|var|async|await|try|catch|finally|void|return|new|class|extends|implements|interface|package|late|Future|null|final|fun|val|override|switch|case|default|if|else|in|typeof|setState|useCallback)\b)/g;

function highlightLine(line: string): ReactNode {
  if (line.length === 0) {
    return '\u00a0';
  }

  const parts: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  const re = new RegExp(TOKEN_RE.source, 'g');
  while ((m = re.exec(line)) !== null) {
    if (m.index > last) {
      parts.push(
        <span key={`t-${m.index}-p`} className="once-sdk-code-plain">
          {line.slice(last, m.index)}
        </span>,
      );
    }
    const t = m[1];
    if (t.startsWith('//')) {
      parts.push(
        <span key={`t-${m.index}-c`} className="once-sdk-code-comment">
          {t}
        </span>,
      );
    } else if (t.startsWith('"') || t.startsWith("'")) {
      parts.push(
        <span key={`t-${m.index}-s`} className="once-sdk-code-str">
          {t}
        </span>,
      );
    } else {
      parts.push(
        <span key={`t-${m.index}-k`} className="once-sdk-code-kw">
          {t}
        </span>,
      );
    }
    last = m.index + t.length;
  }
  if (last < line.length) {
    parts.push(
      <span key={`t-${last}-end`} className="once-sdk-code-plain">
        {line.slice(last)}
      </span>,
    );
  }
  return parts.length > 0 ? <>{parts}</> : line;
}

/**
 * Multiline SDK snippet with gutter line numbers (replaces Webflow span soup).
 */
export default function OnceSdkCode({ source, preClassName = 'code w-code-block once-sdk-code-pre' }: Props) {
  const lines = source.split('\n');

  return (
    <pre
      contentEditable={false}
      className={preClassName}
      style={{
        display: 'block',
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: '100%',
        overflowX: 'auto',
        background: '#2b2b2b',
        color: '#f8f8f2',
        padding: '0.5em',
        margin: 0,
        fontSize: 14,
      }}
    >
      <code className="once-sdk-code">
        {lines.map((line, i) => (
          <span key={i} className="once-sdk-code-row">
            <span className="once-sdk-code-ln" aria-hidden="true">
              {i + 1}
            </span>
            <span className="once-sdk-code-line-text">{highlightLine(line)}</span>
          </span>
        ))}
      </code>
    </pre>
  );
}
