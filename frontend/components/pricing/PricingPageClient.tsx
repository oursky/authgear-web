'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { PricingCell, PricingCopy, PricingNodeVariant } from '@/lib/pricing/types';

type Props = {
  copy: PricingCopy;
  locale: string;
  contactPath: string;
  whatsappPath: string;
  month: string;
  onceSuffix: string;
  enterpriseContactLabel: string;
};

function resolveHref(href: string, contactPath: string): string {
  if (href === '__CONTACT__') return contactPath;
  return href;
}

function NodeVariantCell({ variant, whatsappPath }: { variant: PricingNodeVariant; whatsappPath: string }) {
  switch (variant) {
    case 'smsWhatsappBusiness':
      return (
        <>
          <div className="plan-data-sub-row">
            <strong>SMS</strong>
            <br />
            US/Canada: $0.02
            <br />
            Others: $0.1
          </div>
          <div className="plan-data-sub-row">
            <strong>WhatsApp</strong>
            <br />
            <a href={whatsappPath} className="comparison-label">
              See Pricing
            </a>
          </div>
          <div className="plan-data-sub-row">Or Custom Gateway</div>
        </>
      );
    case 'smsWhatsappDevelopers':
      return (
        <>
          <strong>SMS and WhatsApp</strong>
          <br />
          US/Canada: $0.02
          <br />
          Others: $0.1
        </>
      );
    case 'othersBusiness':
      return (
        <>
          All Features Included
          <br />
          <br />
          Bring your own
          <br />
          SMS/WhatsApp / Email Gateway
        </>
      );
    case 'othersEnterprise':
      return (
        <>
          Bring your own
          <br />
          SMS/WhatsApp / Email Gateway
          <br />
          <br />
          Tailored SLA
          <br />
          <br />
          Private Cloud Option
          <br />
          <br />
          Data Residency
        </>
      );
    case 'addonsDevelopers':
      return (
        <>
          $100/Environment
          <br />
          $100/Applications
          <br />
          $50/Project Member
        </>
      );
    case 'addonsBusiness':
      return (
        <>
          $100/Environment
          <br />
          $100/Applications
          <br />
          $50/Project Member
          <br />
          <br />
          $50/5,000 additional MAU
        </>
      );
    default:
      return null;
  }
}

function CellContent({
  cell,
  whatsappPath,
}: {
  cell: PricingCell;
  whatsappPath: string;
}) {
  if (cell.kind === 'check') {
    return <img src="/images/pricing_CLOUD_full_comparison_check.svg" loading="lazy" alt="" width={20} height={20} />;
  }
  if (cell.kind === 'dash') return <>-</>;
  if (cell.kind === 'empty') return null;
  if (cell.kind === 'nodeVariant') {
    return <NodeVariantCell variant={cell.variant} whatsappPath={whatsappPath} />;
  }
  return <>{cell.value}</>;
}

function OnceCoreValue({ value }: { value: PricingCell | string }) {
  if (typeof value === 'string') {
    if (value.includes('\n')) {
      return <span className="whitespace-pre-line">{value}</span>;
    }
    return <>{value}</>;
  }
  if (value.kind === 'check') {
    return (
      <img src="/images/pricing_CLOUD_full_comparison_check.svg" loading="lazy" alt="" width={20} height={20} />
    );
  }
  return null;
}

function PlanCta({
  plan,
  contactPath,
}: {
  plan: PricingCopy['cloud']['plans'][0];
  contactPath: string;
}) {
  const href = resolveHref(plan.cta.href, contactPath);
  const cls = `pricing-buy-now w-button${plan.highlight ? ' developers-bg' : ''}${plan.enterprise ? ' enterprise' : ''}`;
  if (plan.cta.external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {plan.cta.label}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {plan.cta.label}
    </Link>
  );
}

function PlanCardInner({
  plan,
  month,
  contactPath,
}: {
  plan: PricingCopy['cloud']['plans'][0];
  month: string;
  contactPath: string;
}) {
  return (
    <>
      <div className="plan-div">
        {plan.badge ? (
          <div className="free-div">
            <div className="plan pricing-sepcial">{plan.name}</div>
            <div className="most-popular">
              <img src="/images/pricing_CLOUD_most_popular.svg" loading="lazy" alt="" />
              <div className="most-popular-content">{plan.badge}</div>
            </div>
          </div>
        ) : (
          <div className={`plan${plan.enterprise ? ' enterprise' : ''}`}>{plan.name}</div>
        )}
        {plan.enterprise ? (
          <div className="plan custom">{plan.priceLine}</div>
        ) : (
          <div className={`price-content${plan.highlight ? ' free' : ''}`}>
            $<span className="price">{plan.priceLine.replace(/^\$/, '')}</span>
            {month}
          </div>
        )}
      </div>
      <PlanCta plan={plan} contactPath={contactPath} />
      <div className="divider-pricing" />
      <div className="pricing-features">
        {plan.features.map((f) => (
          <div key={f} className="price-feature">
            <img src="/images/pricing_CLOUD_plans_check.svg" loading="lazy" alt="" />
            <div className={`p-feature${plan.enterprise ? ' enterprise' : ''}`}>{f}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function PricingPageClient({ copy, locale, contactPath, whatsappPath, month, onceSuffix, enterpriseContactLabel }: Props) {
  const [tab, setTab] = useState(0);

  const enterpriseLink = useMemo(() => {
    return (
      <>
        <Link href={contactPath} className="comparison-label">
          {enterpriseContactLabel}
        </Link>
        {copy.once.enterpriseContactSuffix}
      </>
    );
  }, [contactPath, copy.once.enterpriseContactSuffix, enterpriseContactLabel]);

  return (
    <div className="page-wrapper">
      <div className="w-layout-hflex tab-background">
        <button
          type="button"
          className={`tab-switcher cloud-tab${tab === 0 ? ' active-tab' : ''}`}
          onClick={() => setTab(0)}
        >
          <div className="code-embed-4 w-embed">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.53093 4.98208C6.93198 3.67788 8.86593 3 11.0358 3H21.632C23.8031 3 25.7368 3.68155 27.1373 4.98691C28.5456 6.29955 29.3337 8.16888 29.3337 10.3761V16.4332C29.3337 16.9855 28.886 17.4332 28.3337 17.4332C27.7815 17.4332 27.3337 16.9855 27.3337 16.4332V10.3761C27.3337 8.66433 26.7345 7.34559 25.7736 6.44992C24.8049 5.54699 23.3877 5 21.632 5H11.0358C9.2787 5 7.86176 5.54481 6.89364 6.44599C5.93362 7.33964 5.33398 8.65784 5.33398 10.3761V21.6211C5.33398 23.3401 5.9337 24.6589 6.89381 25.5531C7.86194 26.4547 9.27885 26.9997 11.0358 26.9997H12.2578C12.8101 26.9997 13.2578 27.4475 13.2578 27.9997C13.2578 28.552 12.8101 28.9997 12.2578 28.9997H11.0358C8.86578 28.9997 6.9318 28.3215 5.53077 27.0167C4.1217 25.7045 3.33398 23.834 3.33398 21.6211V10.3761C3.33398 8.16369 4.12178 6.29381 5.53093 4.98208Z"
                fill="#2E2E2E"
              />
            </svg>
          </div>
          <div className="text-block-62">{copy.tabs.cloud}</div>
        </button>
        <button
          type="button"
          className={`tab-switcher once-tab${tab === 1 ? ' active-tab' : ''}`}
          onClick={() => setTab(1)}
        >
          <div className="code-embed-4 w-embed">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path
                d="M16 27.8844H24.7477C26.6535 27.8844 28 26.6921 28 24.7904V21.8831C28 19.9748 26.6535 18.7891 24.7477 18.7891H7.25232C5.3466 18.7891 4 19.9748 4 21.8831V24.7904C4 26.6973 5.3466 27.8844 7.25232 27.8844H11.6262"
                stroke="#2E2E2E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="text-block-62">{copy.tabs.once}</div>
        </button>
      </div>

      <section
        id="cards-section"
        className="section pricing-new cloud pricing-info"
        style={{ display: tab === 0 ? 'flex' : 'none' }}
      >
        <div className="new-pricing-h1-container">
          <h1 className="title pricing-h1">
            {copy.cloud.titleLine1}
            <span className="pricing-sepcial">{copy.cloud.titleHighlight}</span>
            <br />
            {copy.cloud.titleLine2}
          </h1>
          <p className="pricing-sub">{copy.cloud.subtitle}</p>
        </div>
        <div className="w-layout-blockcontainer w-container">
          <p className="pricing-content">
            {copy.cloud.intro}
            <span className="blue-strong">{copy.cloud.introStrong}</span>
            {copy.cloud.introRest}
          </p>
        </div>
        <div className="w-layout-blockcontainer pricing w-container">
          <div className="w-layout-hflex pricing-cards">
            {copy.cloud.plans.map((plan) =>
              plan.highlight ? (
                <div key={plan.name} className="pricing-outer">
                  <div className="pricing-card developers-bg">
                    <PlanCardInner plan={plan} month={month} contactPath={contactPath} />
                  </div>
                </div>
              ) : (
                <div key={plan.name} className={`pricing-card${plan.enterprise ? ' enterprise' : ''}`}>
                  <PlanCardInner plan={plan} month={month} contactPath={contactPath} />
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="cloud pricing-info" style={{ display: tab === 0 ? 'flex' : 'none' }}>
        <div className="container-default expand-section">
          <div className="comparison static-table">
            <div className="full-plan">{copy.cloud.fullPlanTitle}</div>
            <div className="comparison-row comprison-header">
              <div className="w-layout-blockcontainer empty w-container" />
              {copy.comparison.planNames.map((name, i) => (
                <div
                  key={name}
                  className={`comparison-column comparison-plan plan-option${i === 0 ? ' default' : ''}`}
                >
                  {name}
                </div>
              ))}
            </div>
            {copy.comparison.rows.map((row) => (
              <div key={row.label} className={`comparison-row${row.odd ? ' odd' : ''}`}>
                <div className="comparison-column first-column">{row.label}</div>
                {row.cells.map((cell, i) => (
                  <div
                    key={i}
                    className={`comparison-column plan-data ${['free-plan', 'developers-plan', 'business-plan', 'enterprise-plan'][i]}`}
                  >
                    <CellContent cell={cell} whatsappPath={whatsappPath} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section pricing-new once pricing-info"
        style={{ display: tab === 1 ? 'flex' : 'none' }}
      >
        <div className="new-pricing-h1-container">
          <h1 className="title pricing-h1">
            {copy.once.titleLine1}
            <span className="pricing-sepcial">{copy.once.titleHighlight}</span>
            {copy.once.titleLine2 ? (
              <>
                <br />
                {copy.once.titleLine2}
              </>
            ) : (
              <br />
            )}
          </h1>
          <p className="pricing-sub">{copy.once.subtitle}</p>
        </div>
        <div className="w-layout-blockcontainer w-container">
          <p className="pricing-content whitespace-pre-line">{copy.once.intro}</p>
        </div>
        <div className="w-layout-blockcontainer pricing w-container">
          <div className="w-layout-hflex pricing-cards once-pricing">
            <div className="pricing-outer once-pricing-width">
              <div className="pricing-card developers-bg">
                <div className="plan-div">
                  <div className="plan">{copy.once.plans[0].name}</div>
                  <div className="price-content free">
                    $<span className="price">{copy.once.plans[0].priceLine.replace(/^\$/, '')}</span>
                    {onceSuffix}
                  </div>
                </div>
                <PlanCta plan={copy.once.plans[0]} contactPath={contactPath} />
                <div className="divider-pricing" />
                <div className="pricing-features">
                  {copy.once.plans[0].features.map((f) => (
                    <div key={f} className="price-feature">
                      <img src="/images/pricing_CLOUD_plans_check.svg" loading="lazy" alt="" />
                      <div className="p-feature">{f}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="pricing-card enterprise once-pricing-width">
              <div className="plan-div">
                <div className="plan enterprise">{copy.once.plans[1].name}</div>
                <div className="plan custom">{copy.once.plans[1].priceLine}</div>
              </div>
              <PlanCta plan={copy.once.plans[1]} contactPath={contactPath} />
              <div className="divider-pricing" />
              <div className="pricing-features">
                {copy.once.plans[1].features.map((f) => (
                  <div key={f} className="price-feature">
                    <img src="/images/pricing_CLOUD_plans_check.svg" loading="lazy" alt="" />
                    <div className="p-feature enterprise">{f}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="once pricing-info" style={{ display: tab === 1 ? 'flex' : 'none' }}>
        <div className="container-default expand-section">
          <div className="comparison static-table">
            <div className="full-plan">{copy.once.coreTitle}</div>
            {copy.once.coreRows.map((row, idx) => (
              <div key={row.label} className={`comparison-row once-row${idx % 2 === 1 ? ' odd' : ''}`}>
                <div className="comparison-column first-column whitespace-pre-line">{row.label}</div>
                <div className="comparison-column plan-data free-plan">
                  {typeof row.value === 'string' && row.value === '__ENTERPRISE_CONTACT__' ? (
                    enterpriseLink
                  ) : (
                    <OnceCoreValue value={row.value} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container-default looking">
          <div className="looking-div">
            <div className="looking-header">{copy.cta.title}</div>
            <div className="looking-sub">{copy.cta.subtitle}</div>
            <Link href={resolveHref(copy.cta.href, contactPath)} className="looking-btn w-button">
              {copy.cta.button}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-black">
        <div className="w-layout-blockcontainer container-default faq w-container">
          <div className="faq-heading">{copy.faq.heading}</div>
          <div className="w-layout-grid workshop-faq">
            <div className="faq2_component-2">
              {copy.faq.items.map((item) => (
                <details key={item.q} className="faq2_accordion-2 margin-top">
                  <summary className="faq2_question-2 first cursor-pointer list-none">
                    <div className="faq-accordion-question referral-faq-q">{item.q}</div>
                  </summary>
                  <div className="faq2_answer">
                    <div className="margin-bottom">
                      <p className="referral-faq-a-2">{item.a}</p>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
