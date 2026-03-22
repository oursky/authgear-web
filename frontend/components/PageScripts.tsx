'use client';

import { useEffect } from 'react';

interface Props {
  scripts: string[];
}

/**
 * Executes Webflow page-functional inline scripts (calculators, tab switchers,
 * form helpers, etc.) after the page hydrates. Each script runs in a dynamically
 * created <script> element so it has access to the fully-rendered DOM.
 * Errors are swallowed so a broken script never crashes the page.
 */
export default function PageScripts({ scripts }: Props) {
  useEffect(() => {
    if (!scripts.length) return;
    scripts.forEach((scriptContent) => {
      try {
        const el = document.createElement('script');
        el.text = scriptContent;
        document.body.appendChild(el);
        document.body.removeChild(el);
      } catch {
        // ignore individual script errors
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
