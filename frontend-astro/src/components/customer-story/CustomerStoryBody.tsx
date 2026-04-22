import type { BlocksContent } from '@strapi/blocks-react-renderer';
import StrapiBlocksContent from '@/components/islands/login-gallery/StrapiBlocksContent';
import { strapiLoginMethodsTechFields, strapiMultiSelectToStrings } from '@/lib/strapi';

const META_EMPTY = '—';

export type CustomerStoryBodyLabels = {
  industry: string;
  loginMethods: string;
  technicalDetails: string;
  noContent: string;
  metricsAriaLabel: string;
};

type MetricSlot = { num?: string | null; text?: string | null };

function metricSlotFilled(m: MetricSlot) {
  return Boolean(m.num?.trim() || m.text?.trim());
}

type Props = {
  /** Strapi `content`: Blocks JSON, or legacy HTML string. */
  content?: unknown;
  companyLogoUrl?: string | null;
  companyLogoAlt: string;
  companyIndustry?: string | null;
  loginMethodsTech?: unknown;
  metric1_num?: string | null;
  metric1_Text?: string | null;
  metric2_num?: string | null;
  metric2_Text?: string | null;
  metric3_num?: string | null;
  metric3_Text?: string | null;
  labels: CustomerStoryBodyLabels;
};

export default function CustomerStoryBody({
  content: storyContent,
  companyLogoUrl,
  companyLogoAlt,
  companyIndustry,
  loginMethodsTech,
  metric1_num,
  metric1_Text,
  metric2_num,
  metric2_Text,
  metric3_num,
  metric3_Text,
  labels,
}: Props) {
  const { methodsDetail, technicalDetails } = strapiLoginMethodsTechFields(loginMethodsTech);
  const loginItems = strapiMultiSelectToStrings(methodsDetail);
  const techItems = strapiMultiSelectToStrings(technicalDetails);
  const industryText = companyIndustry?.trim() || '';

  const metricSlots: MetricSlot[] = [
    { num: metric1_num, text: metric1_Text },
    { num: metric2_num, text: metric2_Text },
    { num: metric3_num, text: metric3_Text },
  ];
  const metricsToShow = metricSlots.filter(metricSlotFilled);

  const hasBlocks =
    Array.isArray(storyContent) && storyContent.length > 0;
  const htmlFallback =
    typeof storyContent === 'string' && storyContent.trim().length > 0
      ? storyContent
      : '';

  return (
    <div className="ds-customer-story-body">
      <aside className="ds-customer-story-body__sidebar">
        {companyLogoUrl ? (
          <div className="ds-customer-story-body__logo-wrap">
            <img
              src={companyLogoUrl}
              alt={companyLogoAlt}
              width={180}
              height={60}
              className="ds-customer-story-body__logo"
              loading="lazy"
            />
          </div>
        ) : null}
        <dl className="ds-customer-story-body__meta-list">
          <div className="ds-customer-story-body__meta">
            <dt className="ds-customer-story-body__label">{labels.industry}</dt>
            <dd className="ds-customer-story-body__dd ds-customer-story-body__value">{industryText || META_EMPTY}</dd>
          </div>
          <div className="ds-customer-story-body__meta">
            <dt className="ds-customer-story-body__label">{labels.loginMethods}</dt>
            <dd className="ds-customer-story-body__dd">
              {loginItems.length > 0 ? (
                <ul className="ds-customer-story-body__chip-list">
                  {loginItems.map((item) => (
                    <li key={item} className="ds-customer-story-body__chip">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="ds-customer-story-body__value ds-customer-story-body__value--plain">{META_EMPTY}</span>
              )}
            </dd>
          </div>
          <div className="ds-customer-story-body__meta">
            <dt className="ds-customer-story-body__label">{labels.technicalDetails}</dt>
            <dd className="ds-customer-story-body__dd">
              {techItems.length > 0 ? (
                <ul className="ds-customer-story-body__chip-list">
                  {techItems.map((item) => (
                    <li key={item} className="ds-customer-story-body__chip">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="ds-customer-story-body__value ds-customer-story-body__value--plain">{META_EMPTY}</span>
              )}
            </dd>
          </div>
        </dl>
      </aside>
      <div className="ds-customer-story-body__main">
        {metricsToShow.length > 0 ? (
          <ul className="ds-customer-story-metrics" aria-label={labels.metricsAriaLabel}>
            {metricsToShow.map((m, i) => (
              <li key={i} className="ds-customer-story-metrics__item">
                {m.num?.trim() ? (
                  <span className="ds-customer-story-metrics__num">{m.num.trim()}</span>
                ) : null}
                {m.text?.trim() ? (
                  <p className="ds-customer-story-metrics__text">{m.text.trim()}</p>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}
        {hasBlocks ? (
          <StrapiBlocksContent
            content={storyContent as BlocksContent}
            proseClassName="ds-richtext-prose w-richtext"
          />
        ) : htmlFallback ? (
          <div
            className="ds-richtext-prose w-richtext"
            dangerouslySetInnerHTML={{ __html: htmlFallback }}
          />
        ) : (
          <p className="ds-customer-story-body__value">{labels.noContent}</p>
        )}
      </div>
    </div>
  );
}
