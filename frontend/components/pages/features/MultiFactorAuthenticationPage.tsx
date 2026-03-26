import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface Props {
  locale: string;
}

export default function MultiFactorAuthenticationPage(_props: Props) {
  const t = useTranslations('MultiFactorAuthentication');
  const tFeatures = useTranslations('Features');
  return (
    <>
<div className="featurespage__hero_v2 featurespage__hero_bg">
    <div className="features-hero-wrapper-new">
      <div className="split-content features-hero-left">
        <div className="featurespage__hero-titletag">{t('heroSmallTitle')}</div>
        <h1 className="title features-hero-v2">{t('heroTitle')}</h1>
        <p className="features-hero-description">{t('heroDescription')}</p>
        <div className="features-hero-cta-wrapper">
          <a href="https://portal.authgear.com/?utm_source=feature-mfa&amp;utm_medium=link&amp;utm_campaign=start-for-free" target="_blank" className="button-primary feature-hero-btn-v2 w-button">{tFeatures('startForFree')}</a>
          <Link href="/schedule-demo" target="_blank" className="button-secondary feature-hero-btn-v2 noscale w-button">{tFeatures('getDemo')}  <span className="text-span-23">{">"}</span></Link>
          <div className="w-layout-hflex features-hero-cta-description-weapper"><img src="/images/features-hero-banner-check.svg" loading="lazy" alt="" />
            <p className="features-hero-cta-description">{t('freePlanIncludes')} <span className="features-hero-cta-description-bold">{t('unlimitedMAUs')}</span></p>
          </div>
        </div>
      </div><img src="/images/features-mfa-hero-kv.svg" alt="" className="image features-hero-image-v2" />
    </div>
  </div>
  <div className="bg-f9f9fb">
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0 pb-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">{t('whatIsTitle')}<span className="text-highlight-gradient">{t('whatIsTitleHighlight')}</span></h2>
          <p className="paragraph-large text-center features-page-v2">{t('whatIsDescription')}</p>
        </div>
        <div className="features-flex-container gap-40 reverse-order">
          <div className="solution-image-block"><img src="/images/features-mfa-whatis-mfa.svg" loading="lazy" alt="" /></div>
          <div className="features-text-block p-0">
            <h3 className="features-h3-dark">{t('adaptiveMfaTitle')}</h3>
            <div className="gradient-divider"></div>
            <div className="color-626262 line-height-24px">{t('adaptiveMfaDescription')}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div className="container-default">
      <div className="container-default-inner">
        <div className="top-content feature-flex">
          <h2 className="title features-page-v2">{t('mfaOptionsTitle')}<br />‍‍<span className="text-highlight-gradient">{t('mfaOptionsTitleHighlight')}</span></h2>
        </div>
        <div data-current="Tab 1" data-duration-in="300" data-duration-out="100" className="_2-block-flex tabs-with-image ibm-plex-sans w-tabs">
          <div className="hover-change tabs upper w-tab-menu">
            <a data-w-tab="Tab 1" className="hover-change-content pt-0 w-inline-block w-tab-link w--current">
              <div className="hover-change-title">{t('tab1')}</div>
            </a>
            <a data-w-tab="Tab 2" className="hover-change-content pt-0 w-inline-block w-tab-link">
              <div className="hover-change-title">{t('tab2')}</div>
            </a>
            <a data-w-tab="Tab 3" className="hover-change-content pt-0 w-inline-block w-tab-link">
              <div className="hover-change-title">{t('tab3')}</div>
            </a>
            <a data-w-tab="Tab 4" className="hover-change-content pt-0 w-inline-block w-tab-link">
              <div className="hover-change-title">{t('tab4')}</div>
            </a>
          </div>
          <div className="_2-block-flex-image tabs w-tab-content">
            <div data-w-tab="Tab 1" className="w-tab-pane w--tab-active"><img loading="eager" src="/images/features-mfa-options-totp.svg" alt="" /></div>
            <div data-w-tab="Tab 2" className="w-tab-pane"><img width="Auto" loading="eager" alt="" src="/images/features-mfa-options-password.svg" /></div>
            <div data-w-tab="Tab 3" className="w-tab-pane"><img loading="eager" src="/images/features-mfa-options-magiclink.svg" alt="" /></div>
            <div data-w-tab="Tab 4" className="w-tab-pane"><img width="Auto" loading="eager" alt="" src="/images/features-mfa-options-smscode.svg" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="bg-f3f6ff">
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">{t('uxTitle')}<br />‍‍<span className="text-highlight-gradient">{t('uxTitleHighlight')}</span></h2>
          <p className="paragraph-large text-center features-page-v2">{t('uxDescription')}</p>
        </div>
        <div className="_2-card-grid gap-32 mb-40">
          <div id="w-node-_8b40603f-a0a3-fba6-2aa5-508f57e22316-c0727b43" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-mfa-ux-simple-01.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">{t('ux1')}</div>
            </div>
          </div>
          <div id="w-node-_1bda52b1-b938-4e5e-3c55-8a3548943584-c0727b43" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-mfa-ux-simple-02.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">{t('ux2')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">{t('devSectionTitle')}</h2>
          <p className="paragraph-large text-center features-page-v2">{t('devDescription')}</p>
        </div>
        <div className="_2-card-grid gap-32 mb-40">
          <div id="w-node-_01f09dc9-c431-9a20-bbaa-da412ff4193b-c0727b43" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-mfa-ux-developer-01.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">{t('dev1')}</div>
            </div>
          </div>
          <div id="w-node-_01f09dc9-c431-9a20-bbaa-da412ff41941-c0727b43" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-mfa-ux-developer-02.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">{t('dev2')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container-default">
      <div className="container-default-inner">
        <div className="secondary-block">
          <div className="secondary-block-heading-wrap">
            <div className="secondary-block-heading">{t('deepDiveTitle')}</div>
            <div className="secondary-block-subheading">{t('deepDiveDescription')}</div>
          </div>
          <div className="_3-card-grid">
            <a href="/post/what-is-multi-factor-authentication-mfa" className="secondary-block-card-link bg-white w-inline-block">
              <div className="secondary-block-card-image-container"><img src="/images/features-mfa-deepdive-article.svg" loading="lazy" alt="" className="secondary-block-card-image" /></div>
              <div className="secondary-block-card-content">{t('article1')}</div>
            </a>
            <a href="/post/top-three-types-of-user-authentication" className="secondary-block-card-link bg-white w-inline-block">
              <div className="secondary-block-card-image-container"><img src="/images/features-mfa-deepdive-article.svg" loading="lazy" alt="" className="secondary-block-card-image" /></div>
              <div className="secondary-block-card-content">{t('article2')}</div>
            </a>
            <a href="/post/frictionless-authentication#:~:text=devices%20and%20services.-,Implement%20Frictionless%20Authentication%20with%20Authgear,%2C%20business%20partners%2C%20and%20customers." className="secondary-block-card-link bg-white w-inline-block">
              <div className="secondary-block-card-image-container"><img src="/images/features-mfa-deepdive-article.svg" loading="lazy" alt="" className="secondary-block-card-image" /></div>
              <div className="secondary-block-card-content">{t('article3')}</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section className="footer-section-none-form">
    <div className="w-layout-blockcontainer container-default w-container">
      <div className="footer-section-none-form-content-wrap">
        <div className="footer-section-none-form-content">
          <h2 className="footer-section-none-form-title">{t('ctaTitle')}</h2>
          <div className="text-block-46">{t('ctaDescription')}</div>
        </div>
        <div className="footer-section-none-form-cta-wrap">
          <a href="https://portal.authgear.com/?utm_source=feature-mfa&amp;utm_medium=link&amp;utm_campaign=start-for-free" target="_blank" className="footer-section-none-form-button w-button">{tFeatures('startForFree')}</a>
          <Link href="/schedule-demo" className="footer-section-none-form-button inverse w-button">{tFeatures('getDemo')}</Link>
        </div>
        <div className="w-layout-hflex footer-section-none-form-description-weapper"><img src="/images/features-hero-banner-check-purple.svg" loading="lazy" alt="" />
          <p className="footer-section-none-form-cta-description">{t('freePlanIncludes')} <span className="text-span-45">{t('unlimitedMAUs')}</span></p>
        </div>
      </div>
    </div>
  </section>
    </>
  );
}
