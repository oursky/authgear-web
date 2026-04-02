import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import MfaOptionsTabs from './MfaOptionsTabs';

interface Props {
  locale: string;
}

export default function MultiFactorAuthenticationPage(_props: Props) {
  const t = useTranslations('MultiFactorAuthentication');
  const tFeatures = useTranslations('Features');
  return (
    <>
  <section className="ds-hero-banner--gradient">
    <div className="ds-container ds-container--gradient-hero-shell">
      <div className="ds-hero-banner--gradient__inner">
        <div className="ds-container ds-container--hero">
          <div className="ds-hero-banner__row">
            <div className="ds-hero-banner__body">
              <p className="ds-section-eyebrow ds-section-eyebrow--on-dark">{t('heroSmallTitle')}</p>
              <h1 className="ds-hero-banner__title">{t('heroTitle')}</h1>
              <p className="ds-hero-banner__description">{t('heroDescription')}</p>
              <div className="ds-hero-banner__ctas">
                <a
                  href="https://portal.authgear.com/?utm_source=feature-mfa&amp;utm_medium=link&amp;utm_campaign=start-for-free"
                  target="_blank"
                  rel="noreferrer"
                  className="ds-btn ds-btn-secondary"
                >
                  {tFeatures('startForFree')}
                  <ArrowRightIcon className="ds-btn__icon-arrow" aria-hidden />
                </a>
                <Link href="/schedule-demo" target="_blank" rel="noreferrer" className="ds-btn ds-btn-tertiary">
                  {tFeatures('getDemo')}
                  <ArrowRightIcon className="ds-btn__icon-arrow" aria-hidden />
                </Link>
              </div>
              <div className="ds-hero-banner__footnote">
                <img src="/images/features-hero-banner-check-purple.svg" loading="lazy" alt="" />
                <p className="ds-hero-banner__footnote-copy">
                  {t('freePlanIncludes')} <strong>{t('unlimitedMAUs')}</strong>
                </p>
              </div>
            </div>
            <img
              className="ds-hero-banner__media"
              src="/images/features-mfa-hero-kv.svg"
              width={624}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="ds-section">
    <div className="ds-container">
      <div className="title-content">
        <h2 className="heading-on-light">
          {t('whatIsTitle')}
          {t('whatIsTitleHighlight')}
        </h2>
        <p className="section-lede-on-light">{t('whatIsDescription')}</p>
      </div>
      <div className="ds-split ds-split-row ds-split-row--reverse">
        <div className="ds-split-row__media">
          <img
            src="/images/features-mfa-whatis-mfa.svg"
            loading="lazy"
            width={624}
            alt=""
            className="ds-split-row__img"
          />
        </div>
        <div className="ds-split-row__body">
          <h3 className="heading-on-light">{t('adaptiveMfaTitle')}</h3>
          <p className="section-lede-on-light">{t('adaptiveMfaDescription')}</p>
        </div>
      </div>
    </div>
  </section>
  <section className="ds-section ds-bg-white">
    <div className="ds-container">
      <div className="title-content">
        <h2 className="heading-on-light">
          {t('mfaOptionsTitle')}
          <br />
          {t('mfaOptionsTitleHighlight')}
        </h2>
      </div>
      <MfaOptionsTabs
        tabLabels={[t('tab1'), t('tab2'), t('tab3'), t('tab4')] as [string, string, string, string]}
      />
    </div>
  </section>
  <section className="ds-section ds-bg-light-blue">
    <div className="ds-container">
      <div className="title-content">
        <h2 className="heading-on-light">
          {t('uxTitle')}
          <br />
          {t('uxTitleHighlight')}
        </h2>
        <p className="section-lede-on-light">{t('uxDescription')}</p>
      </div>
      <div className="ds-grid-2">
        <div className="svg-card">
          <img src="/images/features-mfa-ux-simple-01.svg" loading="lazy" alt="" />
          <div className="ds-svg-card-content">
            <p className="ds-svg-card-description">{t('ux1')}</p>
          </div>
        </div>
        <div className="svg-card">
          <img src="/images/features-mfa-ux-simple-02.svg" loading="lazy" alt="" />
          <div className="ds-svg-card-content">
            <p className="ds-svg-card-description">{t('ux2')}</p>
          </div>
        </div>
      </div>
      <div className="title-content ds-title-content--after-block">
        <h2 className="heading-on-light">{t('devSectionTitle')}</h2>
        <p className="section-lede-on-light">{t('devDescription')}</p>
      </div>
      <div className="ds-grid-2">
        <div className="svg-card">
          <img src="/images/features-mfa-ux-developer-01.svg" loading="lazy" alt="" />
          <div className="ds-svg-card-content">
            <p className="ds-svg-card-description">{t('dev1')}</p>
          </div>
        </div>
        <div className="svg-card">
          <img src="/images/features-mfa-ux-developer-02.svg" loading="lazy" alt="" />
          <div className="ds-svg-card-content">
            <p className="ds-svg-card-description">{t('dev2')}</p>
          </div>
        </div>
      </div>
      <div className="title-content ds-title-content--after-block">
        <h2 className="heading-on-light">{t('deepDiveTitle')}</h2>
        <p className="section-lede-on-light">{t('deepDiveDescription')}</p>
      </div>
      <div className="ds-grid-3">
        <a
          href="/post/what-is-multi-factor-authentication-mfa"
          className="svg-card ds-svg-card--resource-link"
        >
          <img src="/images/features-mfa-deepdive-article.svg" loading="lazy" alt="" />
          <div className="ds-svg-card-content">
            <p className="ds-svg-card-title">{t('article1')}</p>
          </div>
        </a>
        <a href="/post/top-three-types-of-user-authentication" className="svg-card ds-svg-card--resource-link">
          <img src="/images/features-mfa-deepdive-article.svg" loading="lazy" alt="" />
          <div className="ds-svg-card-content">
            <p className="ds-svg-card-title">{t('article2')}</p>
          </div>
        </a>
        <a
          href="/post/frictionless-authentication#:~:text=devices%20and%20services.-,Implement%20Frictionless%20Authentication%20with%20Authgear,%2C%20business%20partners%2C%20and%20customers."
          className="svg-card ds-svg-card--resource-link"
        >
          <img src="/images/features-mfa-deepdive-article.svg" loading="lazy" alt="" />
          <div className="ds-svg-card-content">
            <p className="ds-svg-card-title">{t('article3')}</p>
          </div>
        </a>
      </div>
    </div>
  </section>
  <section className="ds-section ds-footer-cta-section">
    <div className="ds-container">
      <div className="title-content">
        <h2 className="heading-on-dark">{t('ctaTitle')}</h2>
        <p className="section-lede-on-dark">{t('ctaDescription')}</p>
      </div>
      <div className="ds-footer-cta__actions">
        <a
          href="https://portal.authgear.com/?utm_source=feature-mfa&amp;utm_medium=link&amp;utm_campaign=start-for-free"
          target="_blank"
          rel="noreferrer"
          className="ds-btn ds-btn-primary"
        >
          {tFeatures('startForFree')}
        </a>
        <Link href="/schedule-demo" target="_blank" rel="noreferrer" className="ds-btn ds-btn-outline-light">
          {tFeatures('getDemo')}
        </Link>
      </div>
      <div className="ds-footer-cta__footnote">
        <img src="/images/features-hero-banner-check-purple.svg" loading="lazy" alt="" />
        <p className="ds-footer-cta__footnote-copy">
          {t('freePlanIncludes')} <strong>{t('unlimitedMAUs')}</strong>
        </p>
      </div>
    </div>
  </section>
    </>
  );
}
