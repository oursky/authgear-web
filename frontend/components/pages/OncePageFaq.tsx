'use client';

import { useTranslations } from 'next-intl';
import { PricingFaqItem } from '@/components/pricing/PricingFaqAccordion';

export default function OncePageFaq() {
  const t = useTranslations('Once');

  return (
    <section className="ds-pricing-faq-section" aria-labelledby="once-faq-heading">
      <div className="ds-pricing-faq">
        <h2 id="once-faq-heading" className="ds-pricing-faq__heading">
          {t('faqHeading')}
        </h2>
        <div className="ds-pricing-faq__list">
          <PricingFaqItem question={t('faq1Q')} answer={t('faq1A')} />
          <PricingFaqItem question={t('faq2Q')} answer={t('faq2A')} />
          <PricingFaqItem
            question={t('faq3Q')}
            answer={
              <p>
                {t.rich('faq3A', {
                  email: (chunks) => (
                    <a href="mailto:once@authgear.com" className="link-6">
                      {chunks}
                    </a>
                  ),
                })}
              </p>
            }
          />
          <PricingFaqItem
            question={t('faq4Q')}
            answer={
              <p>
                {t.rich('faq4A', {
                  docs: (chunks) => (
                    <a
                      href="https://docs.authgear.com/how-to-guide/migration"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-7"
                    >
                      {chunks}
                    </a>
                  ),
                })}
              </p>
            }
          />
          <PricingFaqItem question={t('faq5Q')} answer={t('faq5A')} />
          <PricingFaqItem question={t('faq6Q')} answer={t('faq6A')} />
        </div>
      </div>
    </section>
  );
}
