import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface Props {
  locale: string;
}

export default function AttackProtectionPage(_props: Props) {
  const t = useTranslations('AttackProtection');
  const tFeatures = useTranslations('Features');
  return (
    <>
<div className="featurespage__hero_v2 featurespage__hero_bg no-bg">
    <div className="features-hero-wrapper-new inner-bg">
      <div className="split-content features-hero-left">
        <div className="feature-small-title">{t('heroSmallTitle')}</div>
        <h1 className="title features-hero-v2 text-white">{t('heroTitle')}</h1>
        <p className="features-hero-description text-purple">{t('heroDescription')}</p>
        <div className="features-hero-cta-wrapper">
          <a href="https://portal.authgear.com/?utm_source=feature-mfa&amp;utm_medium=link&amp;utm_campaign=start-for-free" target="_blank" className="button-primary feature-hero-btn-v2 featue-white-btn w-button">{tFeatures('startForFree')}</a>
          <Link href="/schedule-demo" target="_blank" className="button-secondary feature-hero-btn-v2 noscale text-white w-button">{tFeatures('getDemo')}  -{`>`}</Link>
          <div className="w-layout-hflex features-hero-cta-description-weapper"><img src="/images/features-hero-banner-check-purple.svg" loading="lazy" alt="" />
            <p className="features-hero-cta-description text-purple">{t('freePlanIncludes')} <span className="features-hero-cta-description-bold text-white">{t('unlimitedMAUs')}</span></p>
          </div>
        </div>
      </div><img src="/images/features-attackprotection-banner-kv2x.webp" sizes="(max-width: 767px) 100vw, 738px" width={738} alt="" srcSet="/images/features-attackprotection-banner-kv2x-p-500.webp 500w, /images/features-attackprotection-banner-kv2x-p-800.webp 800w, /images/features-attackprotection-banner-kv2x-p-1080.webp 1080w, /images/features-attackprotection-banner-kv2x.webp 1244w" className="image features-hero-image-v2" />
    </div>
  </div>
  <section>
    <div className="container-default">
      <div className="container-default-inner">
        <div className="features-flex-container gap-40">
          <div className="solution-image-block"><img src="/images/features-attackprotection-features-01-square.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">{t('feature1Title')}</h2>
            <div className="color-626262 line-height-24px">{t('feature1Description')}</div>
          </div>
        </div>
        <div className="features-flex-container gap-40 reverse-order">
          <div className="solution-image-block"><img src="/images/features-attackprotection-features-02-square.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">{t('feature2Title')}</h2>
            <div className="color-626262 line-height-24px">{t('feature2Description')}</div>
          </div>
        </div>
        <div className="features-flex-container gap-40">
          <div className="solution-image-block"><img src="/images/features-attackprotection-features-03-square.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">{t('feature3Title')}</h2>
            <div className="color-626262 line-height-24px">{t('feature3Description')}</div>
          </div>
        </div>
        <div className="features-flex-container gap-40 reverse-order">
          <div className="solution-image-block"><img src="/images/features-attackprotection-features-04-square.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">{t('feature4Title')}</h2>
            <div className="color-626262 line-height-24px">{t('feature4Description')}</div>
          </div>
        </div>
        <div className="features-flex-container gap-40">
          <div className="solution-image-block"><img src="/images/features-attackprotection-features-05-square.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">{t('feature5Title')}</h2>
            <div className="color-626262 line-height-24px">{t('feature5Description')}</div>
          </div>
        </div>
        <div className="features-flex-container gap-40 reverse-order">
          <div className="solution-image-block"><img src="/images/features-attackprotection-features-06-square.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">{t('feature6Title')}</h2>
            <div className="color-626262 line-height-24px">{t('feature6Description')}</div>
          </div>
        </div>
        <div className="features-flex-container gap-40">
          <div className="solution-image-block"><img src="/images/features-attackprotection-features-07-square.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">{t('feature7Title')}</h2>
            <div className="color-626262 line-height-24px">{t('feature7Description')}</div>
          </div>
        </div>
        <div className="features-flex-container gap-40 reverse-order">
          <div className="solution-image-block"><img src="/images/features-attackprotection-features-08-square.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">{t('feature8Title')}</h2>
            <div className="color-626262 line-height-24px">{t('feature8Description')}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div>
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="top-content feature-flex mb-60 top-content-title-only">
          <h2 className="title features-page-v2">{t('valuesSectionTitle')}</h2>
        </div>
        <div className="_2-card-grid gap-32 mb-40 _2-rows">
          <div id="w-node-d5c85166-0bd7-a9e6-ceea-f77a366e551a-5516fc99" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-attackprotection-values-01.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">{t('value1')}</div>
            </div>
          </div>
          <div id="w-node-d5c85166-0bd7-a9e6-ceea-f77a366e5522-5516fc99" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/b2b-saas-why-customized.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">{t('value2')}</div>
            </div>
          </div>
          <div id="w-node-d5c85166-0bd7-a9e6-ceea-f77a366e552a-5516fc99" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-attackprotection-values-03.svg" loading="lazy" width={48} alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">{t('value3')}</div>
            </div>
          </div>
          <div id="w-node-d5c85166-0bd7-a9e6-ceea-f77a366e5532-5516fc99" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-attackprotection-values-04.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">{t('value4')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section>
    <div className="container-default wider-container-default">
      <div className="container-default-inner px-0 gap-0 pb-0"></div>
      <div className="w-layout-hflex features-attack-protection">
        <div className="split-content-right-only">
          <p className="features-attack-protection-built-for-title">{t('builtForTitle')}</p>
          <p className="features-attack-protection-built-for-description">{t('builtForDescription')}</p>
        </div>
      </div>
    </div>
  </section>
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
