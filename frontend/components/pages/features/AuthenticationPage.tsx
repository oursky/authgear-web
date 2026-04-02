import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface Props {
  locale: string;
}

export default function AuthenticationPage(_props: Props) {
  const t = useTranslations('Authentication');
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
                  <h1 className="ds-hero-banner__title">
                    {t('heroTitleLine1')}
                    <br />
                    {t('heroTitleLine2')}
                  </h1>
                  <p className="ds-hero-banner__description">
                    {t('heroDescLine1')} {t('heroDescLine2')}
                  </p>
                  <div className="ds-hero-banner__ctas">
                    <a
                      href="https://portal.authgear.com/?utm_source=feature-authentication&amp;utm_medium=link&amp;utm_campaign=start-for-free"
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
                  src="/images/features-authentication-hero-banner2x.webp"
                  srcSet="/images/features-authentication-hero-banner2x-p-500.webp 500w, /images/features-authentication-hero-banner2x-p-800.webp 800w, /images/features-authentication-hero-banner2x-p-1080.webp 1080w, /images/features-authentication-hero-banner2x.webp 1476w"
                  sizes="(max-width: 767px) 100vw, 738px"
                  width={738}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ds-section ds-bg-light-blue">
        <div className="ds-container">
          <div className="title-content">
            <h2 className="heading-on-light">{t('implementTitle')}</h2>
          </div>
          <div className="ds-grid-4">
            <div className="svg-card">
              <div className="svg-card-image-container">
                <img src="/images/features-authentication-fast-implement-1.svg" loading="lazy" alt="" />
              </div>
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('card1')}</div>
              </div>
            </div>
            <div className="svg-card">
              <div className="svg-card-image-container">
                <img src="/images/features-authentication-fast-implement-2.svg" loading="lazy" alt="" />
              </div>
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('card2')}</div>
              </div>
            </div>
            <div className="svg-card">
              <div className="svg-card-image-container">
                <img src="/images/features-authentication-fast-implement-3.svg" loading="lazy" alt="" />
              </div>
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('card3')}</div>
              </div>
            </div>
            <div className="svg-card">
              <div className="svg-card-image-container">
                <img src="/images/features-attackprotection-values-04.svg" loading="lazy" alt="" />
              </div>
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('card4')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ds-section">
        <div className="ds-container ds-container--split-stack">
          <div className="ds-split ds-split-row">
            <div className="ds-split-row__media">
              <img
                src="/images/features-authentication-features-01-methods.svg"
                loading="lazy"
                width={624}
                alt=""
                className="ds-split-row__img"
              />
            </div>
            <div className="ds-split-row__body">
              <h2 className="heading-on-light">{t('feature1Title')}</h2>
              <p className="section-lede-on-light">{t('feature1Desc')}</p>
            </div>
          </div>
          <div className="ds-split ds-split-row ds-split-row--reverse">
            <div className="ds-split-row__media">
              <img
                src="/images/features-authentication-features-02-otp.svg"
                loading="lazy"
                width={624}
                alt=""
                className="ds-split-row__img"
              />
            </div>
            <div className="ds-split-row__body">
              <h2 className="heading-on-light">{t('feature2Title')}</h2>
              <p className="section-lede-on-light">{t('feature2Desc')}</p>
            </div>
          </div>
          <div className="ds-split ds-split-row">
            <div className="ds-split-row__media">
              <img
                src="/images/features-authentication-features-03-magiclinks.svg"
                loading="lazy"
                width={624}
                alt=""
                className="ds-split-row__img"
              />
            </div>
            <div className="ds-split-row__body">
              <h2 className="heading-on-light">{t('feature3Title')}</h2>
              <p className="section-lede-on-light">{t('feature3Desc')}</p>
            </div>
          </div>
          <div className="ds-split ds-split-row ds-split-row--reverse">
            <div className="ds-split-row__media">
              <img
                src="/images/features-authentication-features-03-magiclinks.svg"
                loading="lazy"
                width={624}
                alt=""
                className="ds-split-row__img"
              />
            </div>
            <div className="ds-split-row__body">
              <h2 className="heading-on-light">{t('feature4Title')}</h2>
              <p className="section-lede-on-light">{t('feature4Desc')}</p>
            </div>
          </div>
          <div className="ds-split ds-split-row">
            <div className="ds-split-row__media">
              <img
                src="/images/features-authentication-features-04-mfa.svg"
                loading="lazy"
                width={624}
                alt=""
                className="ds-split-row__img"
              />
            </div>
            <div className="ds-split-row__body">
              <h2 className="heading-on-light">{t('feature5Title')}</h2>
              <p className="section-lede-on-light">{t('feature5Desc')}</p>
            </div>
          </div>
          <div className="ds-split ds-split-row ds-split-row--reverse">
            <div className="ds-split-row__media">
              <img
                src="/images/features-authentication-features-06-anonymous.svg"
                loading="lazy"
                width={624}
                alt=""
                className="ds-split-row__img"
              />
            </div>
            <div className="ds-split-row__body">
              <h2 className="heading-on-light">{t('feature6Title')}</h2>
              <p className="section-lede-on-light">{t('feature6Desc')}</p>
            </div>
          </div>
          <div className="ds-split ds-split-row">
            <div className="ds-split-row__media">
              <img
                src="/images/features-authentication-features-07-reauth.svg"
                loading="lazy"
                width={624}
                alt=""
                className="ds-split-row__img"
              />
            </div>
            <div className="ds-split-row__body">
              <h2 className="heading-on-light">{t('feature7Title')}</h2>
              <p className="section-lede-on-light">{t('feature7Desc')}</p>
            </div>
          </div>
          <div className="ds-split ds-split-row ds-split-row--reverse">
            <div className="ds-split-row__media">
              <img
                src="/images/features-authentication-features-08-bot.svg"
                loading="lazy"
                width={624}
                alt=""
                className="ds-split-row__img"
              />
            </div>
            <div className="ds-split-row__body">
              <h2 className="heading-on-light">{t('feature8Title')}</h2>
              <p className="section-lede-on-light">{t('feature8Desc')}</p>
            </div>
          </div>
          <div className="ds-split ds-split-row">
            <div className="ds-split-row__media">
              <img
                src="/images/features-authentication-features-09-sso.svg"
                loading="lazy"
                width={624}
                alt=""
                className="ds-split-row__img"
              />
            </div>
            <div className="ds-split-row__body">
              <h2 className="heading-on-light">{t('feature9Title')}</h2>
              <p className="section-lede-on-light">{t('feature9Desc')}</p>
            </div>
          </div>
          <div className="ds-split ds-split-row ds-split-row--reverse">
            <div className="ds-split-row__media">
              <img
                src="/images/features-authentication-features-10-branding.svg"
                loading="lazy"
                width={624}
                alt=""
                className="ds-split-row__img"
              />
            </div>
            <div className="ds-split-row__body">
              <h2 className="heading-on-light">{t('feature10Title')}</h2>
              <p className="section-lede-on-light">{t('feature10Desc')}</p>
            </div>
          </div>
          <div className="ds-split ds-split-row">
            <div className="ds-split-row__media">
              <img
                src="/images/features-authentication-features-11-m2m.svg"
                loading="lazy"
                width={624}
                alt=""
                className="ds-split-row__img"
              />
            </div>
            <div className="ds-split-row__body">
              <h2 className="heading-on-light">{t('feature11Title')}</h2>
              <p className="section-lede-on-light">{t('feature11Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ds-section authentication-dev-experience-section">
        <div className="ds-container ds-container--max-callout">
          <div className="authentication-dev-experience-section__surface">
            <div className="authentication-dev-experience-section__layout">
              <div className="title-content authentication-dev-experience-section__title-col">
                <h2 className="heading-on-dark">
                  {t('devExpTitleLine1')}
                  <br />
                  {t('devExpTitleLine2')}
                </h2>
              </div>
              <div className="authentication-dev-experience-section__cards-col">
                <div className="ds-grid-2">
                  <div className="svg-card">
                    <div className="ds-svg-card-content">
                      <div className="ds-svg-card-title">{t('sdksLabel')}</div>
                      <div className="ds-svg-card-description">{t('sdksDesc')}</div>
                    </div>
                  </div>
                  <div className="svg-card">
                    <div className="ds-svg-card-content">
                      <div className="ds-svg-card-title">{t('adminApiLabel')}</div>
                      <div className="ds-svg-card-description">{t('adminApiDesc')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ds-section ds-footer-cta-section">
        <div className="ds-container">
          <div className="title-content">
            <h2 className="heading-on-dark">{t('ctaTitle')}</h2>
            <p className="section-lede-on-dark">{t('ctaDesc')}</p>
          </div>
          <div className="ds-footer-cta__actions">
            <a
              href="https://portal.authgear.com/?utm_source=feature-authentication&amp;utm_medium=link&amp;utm_campaign=start-for-free"
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
