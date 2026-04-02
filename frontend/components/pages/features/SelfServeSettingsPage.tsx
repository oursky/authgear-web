import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface Props {
  locale: string;
}

export default function SelfServeSettingsPage(_props: Props) {
  const t = useTranslations('SelfServeSettings');
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
                      href="https://portal.authgear.com/?utm_source=feature-self-serve&utm_medium=link&utm_campaign=start-for-free"
                      target="_blank"
                      rel="noreferrer"
                      className="ds-btn ds-btn-secondary"
                    >
                      {tFeatures('startForFree')}
                      <ArrowRightIcon className="ds-btn__icon-arrow" aria-hidden />
                    </a>
                    <Link href="/schedule-demo" target="_blank" rel="noreferrer" className="ds-btn ds-btn-tertiary">
                      {tFeatures('scheduleDemo')}
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
                  src="/images/features-selfserve-banner-kv2x.webp"
                  srcSet="/images/features-selfserve-banner-kv2x-p-500.webp 500w, /images/features-selfserve-banner-kv2x-p-800.webp 800w, /images/features-selfserve-banner-kv2x-p-1080.webp 1080w, /images/features-selfserve-banner-kv2x.webp 1244w"
                  width={738}
                  sizes="(max-width: 767px) 100vw, 738px"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ds-section">
        <div className="ds-container">
          <div className="ds-feature-callout">
            <div className="ds-feature-callout__title">
              <h2 className="heading-on-dark">{t('challengeTitle')}</h2>
            </div>
            <div className="ds-feature-callout__body">
              <p className="section-lede-on-dark">{t('challengeDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ds-section ds-bg-light-blue">
        <div className="ds-container ds-container--split-stack ds-container--split-stack--title-gap-m">
          <div className="title-content">
            <h2 className="heading-on-light">{t('securitySettingsTitle')}</h2>
          </div>
          <div className="ds-split-stack__rows">
            <div className="ds-split ds-split-row ds-split-row--surface-light">
              <div className="ds-split-row__media">
                <img src="/images/features-selfserve-setting-profile.svg" loading="lazy" width={624} alt="" className="ds-split-row__img" />
              </div>
              <div className="ds-split-row__body">
                <h3 className="heading-on-light">{t('setting1Title')}</h3>
                <p className="section-lede-on-light">{t('setting1Desc')}</p>
              </div>
            </div>
            <div className="ds-split ds-split-row ds-split-row--reverse ds-split-row--surface-light">
              <div className="ds-split-row__media">
                <img src="/images/features-selfserve-setting-account.svg" loading="lazy" width={624} alt="" className="ds-split-row__img" />
              </div>
              <div className="ds-split-row__body">
                <h3 className="heading-on-light">{t('setting2Title')}</h3>
                <p className="section-lede-on-light">{t('setting2Desc')}</p>
              </div>
            </div>
            <div className="ds-split ds-split-row ds-split-row--surface-light">
              <div className="ds-split-row__media">
                <img src="/images/features-selfserve-setting-sessions.svg" loading="lazy" width={624} alt="" className="ds-split-row__img" />
              </div>
              <div className="ds-split-row__body">
                <h3 className="heading-on-light">{t('setting3Title')}</h3>
                <p className="section-lede-on-light">{t('setting3Desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ds-section">
        <div className="ds-container">
          <div className="title-content">
            <h2 className="heading-on-light">{t('brandableTitle')}</h2>
          </div>
          <div className="ds-grid-2">
            <div className="svg-card">
              <img src="/images/features-selfserve-builtin-ready.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-description">{t('brandable1Desc')}</div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/features-attackprotection-values-04.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-description">{t('brandable2Desc')}</div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/features-selfserve-builtin-language.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-description">{t('brandable3Desc')}</div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/features-selfserve-builtin-device.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-description">{t('brandable4Desc')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ds-section ds-bg-light-blue">
        <div className="ds-container">
          <div className="title-content">
            <h2 className="heading-on-light">{t('experienceTitle')}</h2>
          </div>
          <div className="ds-grid-2">
            <div className="svg-card">
              <img src="/images/features-selfserve-cx-faster.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('experience1Title')}</div>
                <div className="ds-svg-card-description">{t('experience1Desc')}</div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/features-selfserve-cx-apps.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('experience2Title')}</div>
                <div className="ds-svg-card-description">{t('experience2Desc')}</div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/features-selfserve-cx-security.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('experience3Title')}</div>
                <div className="ds-svg-card-description">{t('experience3Desc')}</div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/features-selfserve-cx-ux.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('experience4Title')}</div>
                <div className="ds-svg-card-description">{t('experience4Desc')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ds-section ds-footer-cta-section">
        <div className="ds-container">
          <div className="title-content">
            <h2 className="heading-on-dark">{t('ctaTitle')}</h2>
          </div>
          <div className="ds-footer-cta__actions">
            <a
              href="https://portal.authgear.com/?utm_source=feature-self-serve&utm_medium=link&utm_campaign=start-for-free"
              target="_blank"
              rel="noreferrer"
              className="ds-btn ds-btn-secondary"
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
