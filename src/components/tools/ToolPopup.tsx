import { useEffect, useState } from 'react';
import { t as tFn } from '@/i18n';
import { trackEvent } from '@/lib/plausible';
import { promoProps } from './campaign/toolCampaign';
import { useToolCampaign } from './campaign/useToolCampaign';

type Props = {
  locale: string;
  /** Tool slug — selects a per-tool pitch (common.popupPitches). */
  tool?: string;
};

const DISMISS_KEY = 'authgearToolPopupDismissed';
/** The campaign popup has its own dismissal, so people who closed today's popup still see it once. */
const CAMPAIGN_DISMISS_KEY = 'authgearToolPopupCampaignDismissed';
const DISMISS_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;
const SHOW_DELAY_MS = 15000;

function isDismissed(key: string): boolean {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return false;
    const ts = Number(raw);
    if (!Number.isFinite(ts)) return false;
    return Date.now() - ts < DISMISS_WINDOW_MS;
  } catch {
    return false;
  }
}

function markDismissed(key: string): void {
  try {
    window.localStorage.setItem(key, String(Date.now()));
  } catch {
    // ignore storage failures (private mode, etc.)
  }
}

export default function ToolPopup({ locale, tool }: Props) {
  const t = (key: string): string => tFn(locale, `Tools.common.${key}`);
  const [visible, setVisible] = useState(false);
  // UK/EU campaign version, or null for today's popup.
  const campaign = useToolCampaign(locale);
  const dismissKey = campaign ? CAMPAIGN_DISMISS_KEY : DISMISS_KEY;

  // Per-tool pitch when one exists; tFn echoes the key back when the
  // lookup misses, which signals the fallback to the generic body.
  const pitchKey = tool ? `Tools.common.popupPitches.${tool}` : null;
  const pitch = pitchKey ? tFn(locale, pitchKey) : null;
  const body = pitch && pitch !== pitchKey ? pitch : t('popupBody');

  useEffect(() => {
    if (isDismissed(dismissKey)) return;
    const timer = window.setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [dismissKey]);

  useEffect(() => {
    if (visible && campaign) trackEvent('tool-promo-view', promoProps(campaign));
  }, [visible, campaign]);

  const handleClose = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    markDismissed(dismissKey);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="tool-popup" role="dialog" aria-label={campaign ? campaign.groupCopy.headline : t('popupHeading')}>
      <h2 className="dev-tool-popup-heading">{campaign ? campaign.groupCopy.headline : t('popupHeading')}</h2>
      <p className="paragraph-20">{campaign ? campaign.groupCopy.text : body}</p>
      <div className="tool-popup-wrapper">
        <a
          href="https://portal.authgear.com/"
          target="_blank"
          rel="noreferrer"
          className="tool-popup-button plausible-event-name--signup plausible-event-location--tool-popup"
        >
          <div>{t('popupStartFree')}</div>
        </a>
        {campaign ? (
          <a
            href={campaign.groupCopy.href}
            className="tool-popup-button secondary tc-popup-secondary"
            onClick={() => trackEvent('tool-promo-click', promoProps(campaign, 'popup'))}
            data-testid="tool-campaign-popup-link"
          >
            <div>{campaign.groupCopy.cta} →</div>
          </a>
        ) : (
          <a
            href="https://github.com/authgear/authgear-server"
            target="_blank"
            rel="noreferrer"
            className="tool-popup-button secondary plausible-event-name--github-star plausible-event-location--tool-popup"
          >
            <div>{t('popupStarUs')}</div>
            <img
              src="https://img.shields.io/github/stars/authgear/authgear-server"
              width="110"
              alt=""
            />
          </a>
        )}
      </div>
      <div className="tool-popup-close-button-wrapper">
        <a
          href="#"
          onClick={handleClose}
          className="tool-popup-close-button plausible-event-name--popup-close-click"
        >
          {t('popupClose')}
        </a>
      </div>
    </div>
  );
}
