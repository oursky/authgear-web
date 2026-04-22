declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;
  }
}

/**
 * Track a custom Plausible event from client-side code (interactive islands).
 * For static `<a>`/`<button>` tracking, add the `plausible-event-name--<name>` class instead —
 * BaseLayout loads `script.tagged-events.js` which reads those classes natively.
 */
export function trackEvent(
  event: string,
  props?: Record<string, string | number | boolean>,
): void {
  if (typeof window === 'undefined') return;
  if (typeof window.plausible === 'function') {
    window.plausible(event, props ? { props } : undefined);
  }
}

export {};
