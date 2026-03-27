import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface Props {
  locale: string;
}

export default function AuthorizationPage(_props: Props) {
  const t = useTranslations('Authorization');
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
          <Link href="/schedule-demo" target="_blank" className="button-secondary feature-hero-btn-v2 noscale text-white w-button">{tFeatures('getDemo')}  <span className="text-span-23">{">"}</span></Link>
          <div className="w-layout-hflex features-hero-cta-description-weapper"><img src="/images/features-hero-banner-check-purple.svg" loading="lazy" alt="" />
            <p className="features-hero-cta-description text-purple">{t('freePlanIncludes')} <span className="features-hero-cta-description-bold text-white">{t('unlimitedMAUs')}</span></p>
          </div>
        </div>
      </div><img src="/images/features-authorization-hero-banner2x.webp" srcSet="/images/features-authorization-hero-banner2x-p-500.webp 500w, /images/features-authorization-hero-banner2x-p-800.webp 800w, /images/features-authorization-hero-banner2x-p-1080.webp 1080w, /images/features-authorization-hero-banner2x.webp 1244w" width={738} sizes="(max-width: 767px) 100vw, 738px" alt="" className="image features-hero-image-v2" />
    </div>
  </div>
  <section>
    <div className="container-default wider-container-default">
      <div className="container-default-inner px-0 gap-0 pb-0"></div>
      <div className="w-layout-hflex features-callout-card">
        <h1 className="title features-hero-v2 inverse nomargin">{t('whyAuthgearTitleLine1')}<br />{t('whyAuthgearTitleLine2')}</h1>
        <div className="split-content features-hero-left nomargin">
          <p className="features-hero-description inverse">{t('whyAuthgearDescLine1')}<br />{t('whyAuthgearDescLine2')}</p>
          <div className="features-hero-cta-wrapper in-ready-to-switch">
            <Link href="/schedule-demo" target="_blank" className="button-primary feature-hero-btn-v2 nomargin w-button">{t('talkToUs')}</Link>
            <a href="https://accounts.portal.authgear.com/signup" target="_blank" className="button-secondary feature-hero-btn-v2 noscale button-secondary-with-boarder inverse w-button">{tFeatures('startForFree')}</a>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div className="bg-f3f6ff bg-f9f9fb">
    <div className="container-default wider-container-default">
      <div className="w-layout-vflex container-default-inner px-0 gap60">
        <div className="top-content feature-flex">
          <h2 className="title features-page-v2">{t('centralizedTitle')}</h2>
        </div>
        <div className="w-layout-hflex sms-left-right"><img src="/images/features-authorization-content-roles.svg" loading="lazy" alt="" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">{t('rolesTitle')}</div>
            <div className="color-626262 line-height-24px">{t('rolesDesc')}</div>
          </div>
        </div>
        <div className="w-layout-hflex sms-left-right reverse"><img src="/images/features-authorization-content-groups.svg" loading="lazy" alt="" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">{t('groupsTitle')}</div>
            <div className="color-626262 line-height-24px">{t('groupsDesc')}</div>
          </div>
        </div>
        <div className="w-layout-hflex sms-left-right"><img src="/images/features-authorization-content-audit.svg" loading="lazy" alt="" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">{t('auditTitle')}</div>
            <div className="color-626262 line-height-24px">{t('auditDesc')}</div>
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
