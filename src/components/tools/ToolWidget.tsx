import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { t as tFn } from '@/i18n';
import { trackEvent } from '@/lib/plausible';
import ToolCampaignBanner, { GroupIcon } from './campaign/ToolCampaignBanner';
import { promoProps } from './campaign/toolCampaign';
import { useToolCampaign } from './campaign/useToolCampaign';

type Props = {
  locale: string;
  src?: string;
  iframeTitle: string;
  height?: string;
  policy?: ReactNode;
  iframeId?: string;
  iframeStyle?: CSSProperties;
  /** Tool slug — selects a per-tool CTA line (common.widgetPitches). */
  tool?: string;
  children?: ReactNode;
};

/** Delay between the first use of the tool and the campaign note appearing. */
const NOTE_DELAY_MS = 600;

export default function ToolWidget({ locale, src, iframeTitle, height, policy, iframeId, iframeStyle, tool, children }: Props) {
  const t = (key: string): string => tFn(locale, `Tools.common.${key}`);
  // Same fallback as ToolPopup: tFn echoes the key back on a miss.
  const pitchKey = tool ? `Tools.common.widgetPitches.${tool}` : null;
  const pitch = pitchKey ? tFn(locale, pitchKey) : null;
  const ctaText = pitch && pitch !== pitchKey ? pitch : t('demoCtaText');
  const defaultStyle: CSSProperties = { border: 'none', width: '100%', height, minHeight: '600px' };

  // UK/EU campaign: null for everyone else, and on the server.
  const campaign = useToolCampaign(locale);
  const toolRef = useRef<HTMLDivElement>(null);
  const [used, setUsed] = useState(false);

  // Show the campaign note once the visitor has used the tool: a button
  // pressed in a native tool, or focus moving into an iframe tool (its
  // content is on another origin, so that is all the page can see).
  useEffect(() => {
    const root = toolRef.current;
    if (!campaign || used || !root) return;
    let timer: number | undefined;
    const mark = () => {
      if (timer === undefined) timer = window.setTimeout(() => setUsed(true), NOTE_DELAY_MS);
    };
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest('button, [role="button"], input[type="submit"]')) mark();
    };
    const onBlur = () => {
      window.setTimeout(() => {
        const active = document.activeElement;
        if (active instanceof HTMLIFrameElement && root.contains(active)) mark();
      }, 0);
    };
    root.addEventListener('click', onClick);
    window.addEventListener('blur', onBlur);
    return () => {
      root.removeEventListener('click', onClick);
      window.removeEventListener('blur', onBlur);
    };
  }, [campaign, used]);

  const promoClick = (slot: 'note' | 'strip') => () => {
    if (campaign) trackEvent('tool-promo-click', promoProps(campaign, slot));
  };

  return (
    <section>
      <div className="w-layout-blockcontainer tools-container w-container">
        {/* During the campaign, wide screens get two columns: the tool and
            everything under it on the left, the campaign banner in a sticky
            column on the right, like a news site's side advert. */}
        <div className={campaign ? 'tc-layout' : undefined}>
          <div className={campaign ? 'tc-layout__main' : undefined}>
            {children ? (
              <div className="tools-widget-native" data-testid="tool-widget-native" aria-label={iframeTitle} ref={toolRef}>
                {children}
              </div>
            ) : (
              <div className="w-iframe" ref={toolRef}>
                <iframe
                  {...(iframeId ? { id: iframeId } : {})}
                  src={src}
                  title={iframeTitle}
                  width="100%"
                  height={height}
                  frameBorder="0"
                  scrolling="yes"
                  style={iframeStyle ?? defaultStyle}
                  allow="clipboard-read; clipboard-write"
                  allowFullScreen
                />
              </div>
            )}
            {campaign && used && (
              <p className="tc-note" data-testid="tool-campaign-note">
                <GroupIcon group={campaign.group} />
                <span>
                  {campaign.groupCopy.note}{' '}
                  <a href={campaign.groupCopy.href} onClick={promoClick('note')}>
                    {campaign.groupCopy.cta} →
                  </a>
                </span>
              </p>
            )}
            <div className="tools-banner-wrapper">
              <div className="tools-demo-cta">
                <p className="tools-demo-cta__text">{ctaText}</p>
                <a
                  href="https://portal.authgear.com/"
                  target="_blank"
                  rel="noopener"
                  className="tools-demo-cta__button plausible-event-name--signup plausible-event-location--tool-widget"
                >
                  {t('demoCtaButton')} →
                </a>
              </div>
              <div className="div-block-33">
                <a href="/" target="_blank" className="tools-authgear-tag plausible-event-name--tool-tag-click">
                  {t('craftedByTag')}
                </a>
              </div>
              {campaign ? (
                <ToolCampaignBanner campaign={campaign} />
              ) : (
                <a href="/" target="_blank" className="tools-banner w-inline-block plausible-event-name--tool-banner-click">
                  <img
                    src="/images/banner2x.png"
                    loading="lazy"
                    width="1280"
                    sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px"
                    alt=""
                    srcSet="/images/banner2x-p-500.png 500w, /images/banner2x-p-800.png 800w, /images/banner2x-p-1080.png 1080w, /images/banner2x-p-1600.png 1600w, /images/banner2x-p-2000.png 2000w, /images/banner2x.png 2560w"
                    className="image-100"
                  />
                  <img
                    src="/images/banner_m2x.png"
                    loading="lazy"
                    sizes="100vw"
                    srcSet="/images/banner_m2x-p-500.png 500w, /images/banner_m2x.png 670w"
                    alt=""
                    className="image-100 mobile"
                  />
                </a>
              )}
              {/* The GitHub tag gives way to the campaign; nothing replaces it. */}
              {!campaign && (
                <a href="https://github.com/authgear/authgear-server" target="_blank" className="tools-github-tag w-inline-block plausible-event-name--github-star plausible-event-location--tool-widget">
                  <div className="text-block-92">{t('supportStarUs')}</div>
                  <img src="https://img.shields.io/github/stars/authgear/authgear-server" width="110px" alt="" />
                </a>
              )}
            </div>
            {policy && (
              <div className="tools-policy">
                <p className="paragraph-18">
                  {policy}
                  {campaign && (
                    <>
                      {' '}
                      {campaign.copy.strip.lead}{' '}
                      <a href={campaign.groupCopy.href} className="tc-strip-link" onClick={promoClick('strip')} data-testid="tool-campaign-strip">
                        {campaign.copy.strip.cta} →
                      </a>
                    </>
                  )}
                </p>
              </div>
            )}
          </div>
          {campaign && (
            <aside className="tc-rail" aria-label={campaign.copy.eyebrow}>
              <ToolCampaignBanner campaign={campaign} layout="rail" />
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
