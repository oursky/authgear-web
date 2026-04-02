import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface Props {
  locale: string;
}

export default function CustomizationPage(_props: Props) {
  const t = useTranslations('Customization');
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
                      href="https://portal.authgear.com/?utm_source=feature-customization&utm_medium=link&utm_campaign=start-for-free"
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
                  src="/images/features-customization-banner-kv2x.webp"
                  srcSet="/images/features-customization-banner-kv2x-p-500.webp 500w, /images/features-customization-banner-kv2x-p-800.webp 800w, /images/features-customization-banner-kv2x-p-1080.webp 1080w, /images/features-customization-banner-kv2x.webp 1244w"
                  width={622}
                  sizes="(max-width: 767px) 100vw, 622px"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ds-section mm-empower-section-bg">
        <div className="ds-container ds-container--split-stack">
          <div className="title-content">
            <h2 className="heading-on-dark">{t('darkSectionTitle')}</h2>
          </div>
          <div className="ds-grid-2">
            <div className="svg-card svg-card-deep">
              <div className="icon-w48 w-embed">
                <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48" fill="none">
                  <path d="M42.4598 34.5312H36.6706M21.7294 34.5314H6.46094" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6.46094 13.4649H12.2502M30.0466 13.4648H42.4596" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M23.9662 7.61328C27.1884 7.61328 29.8006 10.2254 29.8006 13.4475C29.8006 16.6697 27.1884 19.2818 23.9662 19.2818H18.2561C15.034 19.2818 12.4219 16.6697 12.4219 13.4475C12.4219 10.2254 15.034 7.61328 18.2561 7.61328" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M30.6652 40.3834C33.8872 40.3834 36.4994 37.7712 36.4994 34.5492C36.4994 31.327 33.8872 28.7148 30.6652 28.7148H27.686C24.4638 28.7148 21.8516 31.327 21.8516 34.5492C21.8516 36.8556 23.1902 38.8496 25.1328 39.7966" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('card1Title')}</div>
                <div className="ds-svg-card-description">{t('card1Desc')}</div>
              </div>
              <a
                href="https://docs.authgear.com/customization/built-in-ui/branding"
                target="_blank"
                rel="noreferrer"
                className="ds-btn ds-btn-tertiary"
              >
                {t('card1Cta')}
              </a>
            </div>
            <div className="svg-card svg-card-deep">
              <div className="icon-w48 w-embed">
                <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48" fill="none">
                  <path d="M23.3092 6C20.6068 6 18.4159 8.19086 18.4159 10.8934L18.8938 14.8365C19.1862 17.2448 17.3083 19.3644 14.8831 19.3644H11.5378C9.6562 19.3644 8.12878 20.8862 8.12502 22.7678V22.781C8.1194 24.6758 9.65244 26.2106 11.5453 26.2106H35.0976C36.9868 26.2106 38.5178 24.6794 38.5178 22.7904C38.5178 20.8994 36.983 19.3663 35.092 19.3701L31.7448 19.3757C29.3252 19.3794 27.4474 17.2673 27.7322 14.8665L28.2046 10.8934C28.2046 8.19086 26.0118 6 23.3092 6Z" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M18.8075 40.6702C14.1484 40.6682 9.33874 40.6646 9.32188 40.659C8.2911 40.4152 7.85256 39.3546 8.40354 38.4512C8.54224 38.2244 10.5288 35.4358 10.3564 31.1496V26.2236" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M23.3203 10.9971V10.9771" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M34.8746 41.5346L35.0692 41.0082C35.8028 39.0228 37.3658 37.4574 39.3484 36.7226L39.8742 36.5278L39.3484 36.333C37.3658 35.5984 35.8028 34.033 35.0692 32.0476L34.8746 31.521L34.6802 32.0476C33.9466 34.033 32.3834 35.5984 30.401 36.333L29.875 36.5278L30.401 36.7226C32.3834 37.4574 33.9466 39.0228 34.6802 41.0082L34.8746 41.5346Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M22.9214 36.5278C23.311 35.246 24.3126 34.2426 25.5926 33.8526C24.3126 33.4624 23.311 32.4592 22.9214 31.1772C22.5318 32.4592 21.53 33.4624 20.25 33.8526C21.53 34.2426 22.5318 35.246 22.9214 36.5278Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M26.0234 42H26.0434" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('card2Title')}</div>
                <div className="ds-svg-card-description">{t('card2Desc')}</div>
              </div>
              <a
                href="https://docs.authgear.com/customization/custom-ui/authentication-flow-api"
                target="_blank"
                rel="noreferrer"
                className="ds-btn ds-btn-tertiary"
              >
                {t('card2Cta')}
              </a>
            </div>
          </div>
          <div className="ds-split ds-split-row">
            <div className="ds-split-row__media">
              <img
                src="/images/features-customization-loginpage-gallery2x.webp"
                loading="lazy"
                width={624}
                sizes="(max-width: 767px) 100vw, 624px"
                alt=""
                srcSet="/images/features-customization-loginpage-gallery2x-p-500.webp 500w, /images/features-customization-loginpage-gallery2x-p-800.webp 800w, /images/features-customization-loginpage-gallery2x-p-1080.webp 1080w, /images/features-customization-loginpage-gallery2x.webp 1248w"
                className="ds-split-row__img"
              />
            </div>
            <div className="ds-split-row__body">
              <h3 className="heading-on-dark">{t('galleryTitle')}</h3>
              <p className="section-lede-on-dark">{t('galleryDesc')}</p>
              <Link href="/login-gallery" className="ds-btn ds-btn-outline-light">{t('galleryBtn')}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="ds-section ds-bg-light-blue">
        <div className="ds-container ds-container--split-stack ds-container--split-stack--title-gap-m">
          <div className="title-content">
            <h2 className="heading-on-light">{t('featuresTitle')}</h2>
            <p className="section-lede-on-light">{t('featuresDesc')}</p>
          </div>
          <div className="ds-split-stack__rows">
            <div className="ds-split ds-split-row ds-split-row--surface-light">
              <div className="ds-split-row__media">
                <img src="/images/features-customization-features-01-selfserve2x.webp" loading="lazy" width={560} sizes="(max-width: 767px) 100vw, 560px" alt="" srcSet="/images/features-customization-features-01-selfserve2x-p-500.webp 500w, /images/features-customization-features-01-selfserve2x-p-800.webp 800w, /images/features-customization-features-01-selfserve2x-p-1080.webp 1080w, /images/features-customization-features-01-selfserve2x.webp 1120w" className="ds-split-row__img" />
              </div>
              <div className="ds-split-row__body">
                <h3 className="heading-on-light">{t('feature1Title')}</h3>
                <p className="section-lede-on-light">{t('feature1Desc')}</p>
                <Link href="/features/self-serve-settings-page" className="ds-btn ds-btn-subtle">{t('feature1Cta')} <ArrowRightIcon className="ds-btn__icon-arrow" aria-hidden /></Link>
              </div>
            </div>
            <div className="ds-split ds-split-row ds-split-row--reverse ds-split-row--surface-light">
              <div className="ds-split-row__media">
                <img src="/images/features-customization-features-03-security2x.webp" loading="lazy" width={560} sizes="(max-width: 767px) 100vw, 560px" alt="" srcSet="/images/features-customization-features-03-security2x-p-500.webp 500w, /images/features-customization-features-03-security2x-p-800.webp 800w, /images/features-customization-features-03-security2x.webp 1120w" className="ds-split-row__img" />
              </div>
              <div className="ds-split-row__body">
                <h3 className="heading-on-light">{t('feature2Title')}</h3>
                <p className="section-lede-on-light">{t('feature2Desc')}</p>
              </div>
            </div>
            <div className="ds-split ds-split-row ds-split-row--surface-light">
              <div className="ds-split-row__media">
                <img src="/images/features-customization-features-04-sso2x.webp" loading="lazy" width={560} sizes="(max-width: 767px) 100vw, 560px" alt="" srcSet="/images/features-customization-features-04-sso2x-p-500.webp 500w, /images/features-customization-features-04-sso2x-p-800.webp 800w, /images/features-customization-features-04-sso2x-p-1080.webp 1080w, /images/features-customization-features-04-sso2x.webp 1120w" className="ds-split-row__img" />
              </div>
              <div className="ds-split-row__body">
                <h3 className="heading-on-light">{t('feature3Title')}</h3>
                <p className="section-lede-on-light">{t('feature3Desc')}</p>
              </div>
            </div>
            <div className="ds-split ds-split-row ds-split-row--reverse ds-split-row--surface-light">
              <div className="ds-split-row__media">
                <img src="/images/features-customization-features-05-sociallogin2x.webp" loading="lazy" width={560} sizes="(max-width: 767px) 100vw, 560px" alt="" srcSet="/images/features-customization-features-05-sociallogin2x-p-500.webp 500w, /images/features-customization-features-05-sociallogin2x-p-800.webp 800w, /images/features-customization-features-05-sociallogin2x-p-1080.webp 1080w, /images/features-customization-features-05-sociallogin2x.webp 1120w" className="ds-split-row__img" />
              </div>
              <div className="ds-split-row__body">
                <h3 className="heading-on-light">{t('feature4Title')}</h3>
                <p className="section-lede-on-light">{t('feature4Desc')}</p>
              </div>
            </div>
            <div className="ds-split ds-split-row ds-split-row--surface-light">
              <div className="ds-split-row__media">
                <img src="/images/features-customization-features-06-sdk2x.webp" loading="lazy" width={560} sizes="(max-width: 767px) 100vw, 560px" alt="" srcSet="/images/features-customization-features-06-sdk2x-p-500.webp 500w, /images/features-customization-features-06-sdk2x-p-800.webp 800w, /images/features-customization-features-06-sdk2x.webp 1120w" className="ds-split-row__img" />
              </div>
              <div className="ds-split-row__body">
                <h3 className="heading-on-light">{t('feature5Title')}</h3>
                <p className="section-lede-on-light">{t('feature5Desc')}</p>
              </div>
            </div>
            <div className="ds-split ds-split-row ds-split-row--reverse ds-split-row--surface-light">
              <div className="ds-split-row__media">
                <img src="/images/features-customization-features-07-hooks2x.webp" loading="lazy" width={560} sizes="(max-width: 767px) 100vw, 560px" alt="" srcSet="/images/features-customization-features-07-hooks2x-p-500.webp 500w, /images/features-customization-features-07-hooks2x-p-800.webp 800w, /images/features-customization-features-07-hooks2x-p-1080.webp 1080w, /images/features-customization-features-07-hooks2x.webp 1120w" className="ds-split-row__img" />
              </div>
              <div className="ds-split-row__body">
                <h3 className="heading-on-light">{t('feature6Title')}</h3>
                <p className="section-lede-on-light">{t('feature6Desc')}</p>
                <Link href="/features/extensibility" className="ds-btn ds-btn-subtle">{t('feature6Cta')} <ArrowRightIcon className="ds-btn__icon-arrow" aria-hidden /></Link>
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
              href="https://portal.authgear.com/?utm_source=feature-customization&utm_medium=link&utm_campaign=start-for-free"
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
