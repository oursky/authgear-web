import { t as tFn } from '@/i18n';
import { TOOLS } from '@/lib/tools/tools-registry';
import { localizedPath } from '@/lib/i18n';
import { trackEvent } from '@/lib/plausible';
import { GroupIcon } from './campaign/ToolCampaignBanner';
import { promoProps } from './campaign/toolCampaign';
import { useToolCampaign } from './campaign/useToolCampaign';

type Props = { locale: string; currentSlug?: string };

export default function MoreDevTools({ locale, currentSlug }: Props) {
  const t = (key: string): string => tFn(locale, `Tools.${key}`);
  // UK/EU campaign: a self-check card first in the grid.
  const campaign = useToolCampaign(locale);
  return (
    <section>
      <div className="container-default more-dev-tool">
        <h2 className="title features-page-v2 more-dev-tool">{t('common.moreDevToolsHeading')}</h2>
        <div className="container-default-inner px-0 gap-0">
          <div className="w-layout-hflex _4-card-grid">
            {campaign && (
              <a
                href={campaign.copy.card.href}
                className="more-tools w-inline-block tc-card-promo"
                onClick={() => trackEvent('tool-promo-click', promoProps(campaign, 'card'))}
                data-testid="tool-campaign-card"
              >
                <div className="svg-card-image-container" style={{ color: '#0043e0' }}>
                  <GroupIcon group="B" size={40} />
                  <span className="tc-card-promo__badge">{campaign.copy.card.badge}</span>
                </div>
                <div className="svg-card-content-container text-center gap-16">
                  <div className="tools-svg-card-content-title left inter color-2e2e2e mobile-20px">
                    {campaign.copy.card.label}
                  </div>
                </div>
                <img loading="lazy" src="/images/arrow-icon.svg" alt="" className="image-99" />
              </a>
            )}
            {TOOLS.map((tool) => {
              const isCurrent = tool.slug === currentSlug;
              const cls = `more-tools w-inline-block${isCurrent ? ' w--current' : ''}`;
              const label = t(`registry.${tool.slug}.label`);
              const inner = (
                <>
                  <div className="svg-card-image-container">
                    <img loading="lazy" src={tool.icon} alt="" />
                  </div>
                  <div className="svg-card-content-container text-center gap-16">
                    <div className="tools-svg-card-content-title left inter color-2e2e2e mobile-20px">{label}</div>
                  </div>
                  <img loading="lazy" src="/images/arrow-icon.svg" alt="" className="image-99" />
                </>
              );
              if (tool.external) {
                return (
                  <a key={tool.slug} href={tool.href} target="_blank" className={cls}>
                    {inner}
                  </a>
                );
              }
              return (
                <a
                  key={tool.slug}
                  href={localizedPath(locale, tool.href)}
                  className={cls}
                  {...(isCurrent ? { 'aria-current': 'page' as const } : {})}
                >
                  {inner}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
