export type Partner = {
  name: string;
  slug: string | null;
  website: string | null;
  logo_url: string | null;
  description: string | null;
  country: string | null;
  types: string[];
};

const DIRECTORY_URL = 'https://partners.skymakers.digital/api/directory/authgear.json';

let cache: Promise<Partner[]> | null = null;

/**
 * Fetched once per build (every page is prerendered, and the en/zh-Hant
 * pages share this cached promise); the list refreshes on each deploy.
 */
export function getPartners(): Promise<Partner[]> {
  cache ??= (async () => {
    try {
      const res = await fetch(DIRECTORY_URL);
      if (!res.ok) {
        console.warn(`[partners] directory fetch failed: ${res.status} ${res.statusText}`);
        return [];
      }
      const data = await res.json();
      return Array.isArray(data?.partners) ? data.partners : [];
    } catch (err) {
      console.warn('[partners] directory fetch failed:', err);
      return [];
    }
  })();
  return cache;
}
