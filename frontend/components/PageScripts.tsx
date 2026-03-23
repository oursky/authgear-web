'use client';

import { useEffect } from 'react';

interface Props {
  scripts: string[];
}

function runScriptContent(scriptContent: string) {
  try {
    // Run as a function body so `const`/`let` are not global. Inline <script>
    // execution shares one global scope: multiple Webflow snippets (or React 18
    // Strict Mode double-mount) re-declare the same identifiers and throw.
    const run = new Function(scriptContent);
    run();
  } catch {
    // ignore individual script errors
  }
}

function hasIntlTelInput(): boolean {
  return typeof window !== 'undefined' && typeof window.intlTelInput === 'function';
}

/**
 * Executes Webflow page-functional inline scripts (calculators, tab switchers,
 * form helpers, etc.) after the page hydrates. Each script runs in a dynamically
 * function scope (not classic script tags) so duplicate `const` names across
 * snippets do not collide. Same access to `document` / `window` as inline scripts.
 * Scripts that reference intlTelInput wait until the library is on window.
 */
export default function PageScripts({ scripts }: Props) {
  useEffect(() => {
    if (!scripts.length) return;

    const needsIntl = scripts.some((s) => /\bintlTelInput\b/.test(s));

    const runAll = () => {
      scripts.forEach(runScriptContent);
    };

    if (!needsIntl) {
      runAll();
      return;
    }

    if (hasIntlTelInput()) {
      runAll();
      return;
    }

    let cancelled = false;
    const interval = window.setInterval(() => {
      if (cancelled) return;
      if (hasIntlTelInput()) {
        window.clearInterval(interval);
        window.clearTimeout(timeout);
        runAll();
      }
    }, 50);

    const timeout = window.setTimeout(() => {
      window.clearInterval(interval);
      if (!cancelled) {
        runAll();
      }
    }, 8000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [scripts]);

  return null;
}

declare global {
  interface Window {
    intlTelInput?: (input: Element, options?: Record<string, unknown>) => unknown;
  }
}
