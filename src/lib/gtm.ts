declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/**
 * Push an event to the GTM dataLayer. BaseLayout creates `window.dataLayer`
 * (and the Consent Mode v2 defaults) only when `PUBLIC_GTM_ID` is set, so this
 * is a no-op otherwise. Never pass personal data (name, email, phone) here.
 */
export function pushDataLayer(data: Record<string, string>): void {
  if (typeof window === 'undefined' || !Array.isArray(window.dataLayer)) return;
  window.dataLayer.push(data);
}

export {};
