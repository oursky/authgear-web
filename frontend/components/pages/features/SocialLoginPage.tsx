import type { ReactNode } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import ContactForm from '@/components/ContactForm';

interface Props {
  locale: string;
}

export default function SocialLoginPage(_props: Props) {
  const t = useTranslations('SocialLogin');
  const tFeatures = useTranslations('Features');

  const socialLoginProviderTiles: { src: string; label: ReactNode }[] = [
    { src: '/images/features-sociallogin-companylogo-apple.svg', label: 'Apple' },
    { src: '/images/features-sociallogin-companylogo-google.svg', label: 'Google' },
    { src: '/images/features-sociallogin-companylogo-facebook.svg', label: 'Facebook' },
    { src: '/images/features-sociallogin-companylogo-github.svg', label: 'GitHub' },
    { src: '/images/features-sociallogin-companylogo-linkedin.svg', label: 'LinkedIn' },
    {
      src: '/images/features-sociallogin-companylogo-microsoft.svg',
      label: 'Azure Active Directory & Azure AD B2C',
    },
    { src: '/images/features-sociallogin-companylogo-azure.svg', label: 'Microsoft AD FS' },
    { src: '/images/features-sociallogin-companylogo-wechat.svg', label: 'WeChat' },
    {
      src: '/images/features-sociallogin-companylogo-line.svg',
      label: (
        <>
          LINE
          <br />
          {t('lineComingSoon')}
        </>
      ),
    },
    {
      src: '/images/features-sociallogin-companylogo-tiktok.svg',
      label: (
        <>
          TikTok
          <br />
          {t('tiktokComingSoon')}
        </>
      ),
    },
  ];

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
                      href="https://portal.authgear.com/?utm_source=feature-social-login&amp;utm_medium=link&amp;utm_campaign=start-for-free"
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
                  src="/images/features-securitythreat-seamless-sociallogin.svg"
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
            <h2 className="heading-on-light">
              {t('providersTitle')}
              <br />
              {t('providersTitleHighlight')}
            </h2>
            <p className="section-lede-on-light">{t('providersDescription')}</p>
          </div>
          <div className="social-login-providers-row">
            {socialLoginProviderTiles.map((item) => (
              <div key={item.src} className="social-login-provider-tile">
                <div className="social-login-provider-tile__card">
                  <div className="social-login-provider-tile__logo">
                    <img src={item.src} loading="lazy" width={32} height="auto" alt="" />
                  </div>
                </div>
                <p className="social-login-provider-tile__label">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="social-login-providers-cta">
            <Link href="/schedule-demo" className="ds-btn ds-btn-subtle">
              {t('contactForSuggestions')}
              <ArrowRightIcon className="ds-btn__icon-arrow" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
      <section className="ds-section">
        <div className="ds-container ds-container--split-stack ds-container--split-stack--title-gap-m">
          <div className="title-content">
            <h2 className="heading-on-light">
              {t('unlockTitle')}
              <br />
              {t('unlockTitleHighlight')}
            </h2>
            <p className="section-lede-on-light">{t('unlockDescription')}</p>
          </div>
          <div className="ds-split ds-split-row ds-split-row--reverse">
            <div className="ds-split-row__media">
              <img
                src="/images/features-sociallogin-unolck-socialmedia.svg"
                loading="lazy"
                width={624}
                alt=""
                className="ds-split-row__img"
              />
            </div>
            <div className="ds-split-row__body">
              <h3 className="heading-on-light">{t('frictionlessTitle')}</h3>
              <ul role="list" className="ds-body-bullet-list">
                <li>{t('frictionlessItem1')}</li>
                <li>{t('frictionlessItem2')}</li>
                <li>{t('frictionlessItem3')}</li>
              </ul>
            </div>
          </div>
          <div className="ds-split ds-split-row">
            <div className="ds-split-row__media">
              <img
                src="/images/features-sociallogin-unolck-datacollection.svg"
                loading="lazy"
                width={624}
                alt=""
                className="ds-split-row__img"
              />
            </div>
            <div className="ds-split-row__body">
              <h3 className="heading-on-light">{t('dataCollectionTitle')}</h3>
              <ul role="list" className="ds-body-bullet-list">
                <li>{t('dataCollectionItem1')}</li>
                <li>{t('dataCollectionItem2')}</li>
                <li>{t('dataCollectionItem3')}</li>
              </ul>
            </div>
          </div>
          <div className="ds-split ds-split-row ds-split-row--reverse">
            <div className="ds-split-row__media">
              <img
                src="/images/features-sociallogin-unolck-trust.svg"
                loading="lazy"
                width={624}
                alt=""
                className="ds-split-row__img"
              />
            </div>
            <div className="ds-split-row__body">
              <h3 className="heading-on-light">{t('securityTitle')}</h3>
              <ul role="list" className="ds-body-bullet-list">
                <li>{t('securityItem1')}</li>
                <li>{t('securityItem2')}</li>
                <li>{t('securityItem3')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="ds-section ds-bg-light-blue">
        <div className="ds-container">
          <div className="title-content">
            <h2 className="heading-on-light">
              {t('simplifyTitle')}
              <br />
              {t('simplifyTitleHighlight')}
            </h2>
            <p className="section-lede-on-light">{t('simplifyDescription')}</p>
          </div>
          <div className="social-login-simplify-feature-cards grid w-full grid-cols-1 gap-6 self-stretch lg:grid-cols-3 lg:grid-rows-2 lg:gap-6">
            <div className="svg-card lg:col-start-1 lg:row-start-1">
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('card1Title')}</div>
                <div className="ds-svg-card-description">{t('card1Desc')}</div>
              </div>
              <img src="/images/features-sociallogin-withauthgear-singleintegration.svg" loading="lazy" alt="" />
            </div>
            <div className="svg-card lg:col-start-1 lg:row-start-2">
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('card4Title')}</div>
                <div className="ds-svg-card-description">{t('card4Desc')}</div>
              </div>
              <img src="/images/features-sociallogin-withauthgear-easysetup.svg" loading="lazy" alt="" />
            </div>
            <div className="svg-card justify-between lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:h-full lg:min-h-0">
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('card2Title')}</div>
                <div className="ds-svg-card-description">{t('card2Desc')}</div>
              </div>
              <img
                src="/images/features-sociallogin-withauthgear-brandcontrol.svg"
                loading="lazy"
                alt=""
                className="mw-140 mx-auto"
              />
            </div>
            <div className="svg-card lg:col-start-3 lg:row-start-1">
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('card3Title')}</div>
                <div className="ds-svg-card-description">{t('card3Desc')}</div>
              </div>
              <img src="/images/features-sociallogin-withauthgear-topsecurity.svg" loading="lazy" alt="" />
            </div>
            <div className="svg-card lg:col-start-3 lg:row-start-2">
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('card5Title')}</div>
                <div className="ds-svg-card-description">{t('card5Desc')}</div>
              </div>
              <img src="/images/features-sociallogin-withauthgear-seamless.svg" loading="lazy" alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className="ds-section b2c-ciam-solution-section-dark-bg">
        <div className="ds-container">
          <div className="title-content">
            <h2 className="heading-on-dark">{t('growthTitle')}</h2>
            <p className="section-lede-on-dark">{t('growthDescription')}</p>
          </div>
          <div className="ds-grid-2">
            <div className="svg-card svg-card-glass">
              <img src="/images/features-sociallogin-growth-reduced.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('growth1Title')}</div>
                <div className="ds-svg-card-description">{t('growth1Desc')}</div>
              </div>
            </div>
            <div className="svg-card svg-card-glass">
              <img src="/images/features-sociallogin-growth-ux.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('growth2Title')}</div>
                <div className="ds-svg-card-description">{t('growth2Desc')}</div>
              </div>
            </div>
            <div className="svg-card svg-card-glass">
              <img src="/images/features-sociallogin-growth-increased.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('growth3Title')}</div>
                <div className="ds-svg-card-description">{t('growth3Desc')}</div>
              </div>
            </div>
            <div className="svg-card svg-card-glass">
              <img src="/images/features-sociallogin-growth-brand.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('growth4Title')}</div>
                <div className="ds-svg-card-description">{t('growth4Desc')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
  <div className="footer-form-section form__bg-dark">
    <div className="container-default">
      <div className="container-default-inner px-0">
        <div className="_2-block-flex footer-form">
          <div className="_2-block-flex-content footer-form">
            <div className="_2-block-flex-content-text-wrap footer-form">
              <h2 className="form-heading color-white footer-form">{t('ctaTitle')}</h2>
              <div className="color-cee9ff"><span className="text-bold">{t('ctaDescBold')}</span>{t('ctaDescRest')}</div>
              <div className="footerform__divider-sm"></div>
              <div className="color-white footer-get-started-text">{t('ctaGetStarted')}</div>
            </div>
          </div>
          <div className="_2-block-flex-image footer-form">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  </div>
    </>
  );
}
