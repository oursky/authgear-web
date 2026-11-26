import { useEffect, useState } from 'react';
import { resolveCampaign, type Campaign } from './toolCampaign';

/**
 * The campaign for this page view, or null for today's version. Always null
 * on the server and on the first client render, so hydration matches the
 * prerendered HTML; the campaign version swaps in right after.
 */
export function useToolCampaign(locale: string): Campaign | null {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  useEffect(() => {
    let timeZone: string | undefined;
    try {
      timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      timeZone = undefined;
    }
    const flag = new URLSearchParams(window.location.search).get('tool-promo');
    setCampaign(
      resolveCampaign({
        pathname: window.location.pathname,
        locale,
        timeZone,
        now: new Date(),
        force: flag === 'on' || flag === 'off' ? flag : null,
      }),
    );
  }, [locale]);
  return campaign;
}
