'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Restores Webflow-style SDK framework tabs: clicking a `.system` row swaps
 * `inactive-system` on the pill and shows the matching `data-once-panel` code block.
 */
export default function OnceSdkFrameworkHarness({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const rootEl = root;

    function setActive(id: string) {
      rootEl.querySelectorAll<HTMLElement>('[data-once-sdk]').forEach((el) => {
        const sid = el.getAttribute('data-once-sdk');
        const active = sid === id;
        el.querySelector('.system-inner')?.classList.toggle('inactive-system', !active);
        el.querySelector('.system-bg')?.classList.toggle('inactive-system', !active);
      });

      // Panels use `position: absolute` in Webflow CSS; stacking inside `.code-div`.
      // Do not override with `position: relative` — that breaks layout and can hide the block.
      rootEl.querySelectorAll<HTMLElement>('[data-once-panel]').forEach((panel) => {
        const pid = panel.getAttribute('data-once-panel');
        const on = pid === id;
        if (on) {
          panel.style.removeProperty('display');
          panel.style.removeProperty('position');
          panel.style.removeProperty('width');
          panel.style.removeProperty('z-index');
        } else {
          panel.style.display = 'none';
        }
      });
    }

    const cleanups: Array<() => void> = [];

    rootEl.querySelectorAll<HTMLElement>('[data-once-sdk]').forEach((el) => {
      const onClick = () => {
        const id = el.getAttribute('data-once-sdk');
        if (id) setActive(id);
      };
      el.addEventListener('click', onClick);
      cleanups.push(() => el.removeEventListener('click', onClick));
    });

    setActive('react');

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div ref={rootRef} style={{ display: 'contents' }}>
      {children}
    </div>
  );
}
