import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface Props {
  locale: string;
}

export default function WhatsappOtpPage(_props: Props) {
  const t = useTranslations('WhatsAppOtp');
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
      </div><img src="/images/features-whatsappotp-hero-banner2x.png" srcSet="/images/features-whatsappotp-hero-banner2x-p-500.png 500w, /images/features-whatsappotp-hero-banner2x-p-800.png 800w, /images/features-whatsappotp-hero-banner2x-p-1080.png 1080w, /images/features-whatsappotp-hero-banner2x.png 1459w" width={738} sizes="(max-width: 479px) 100vw, 738px" alt="" className="image features-hero-image-v2" />
    </div>
  </div>
  <div>
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">{t('whyTitle')}</h2>
          <p className="paragraph-large text-center features-page-v2">{t('whyDescription')}</p>
        </div>
        <div className="_2-card-grid gap-32 mb-40">
          <div id="w-node-_02ee0661-dcc0-5aa3-5cac-a4ceba03974b-7c0a9291" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-otp-whyotp-01.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">{t('why1Title')}</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">{t('why1Desc')}</div>
            </div>
          </div>
          <div id="w-node-_02ee0661-dcc0-5aa3-5cac-a4ceba039751-7c0a9291" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-otp-whyotp-02.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">{t('why2Title')}</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">{t('why2Desc')}</div>
            </div>
          </div>
        </div>
        <div className="_2-card-grid gap-32 mb-40">
          <div id="w-node-_9f32105e-c251-1bd5-9544-315e698d178b-7c0a9291" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-otp-whyotp-03.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">{t('why3Title')}</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">{t('why3Desc')}</div>
            </div>
          </div>
          <div id="w-node-_9f32105e-c251-1bd5-9544-315e698d1791-7c0a9291" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-otp-whyotp-04.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">{t('why4Title')}</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">{t('why4Desc')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section>
    <div className="container-default">
      <div className="container-default-inner">
        <div className="top-content-title-only feature-flex mb-60">
          <h2 className="title features-page-v2">{t('howItWorksTitle')}</h2>
        </div>
        <div className="_3-card-grid">
          <div id="w-node-af9ca247-9f3d-a9cc-22dd-620968ce3af6-7c0a9291" className="card-image-rounded"><img src="/images/features-otp-howitworks-phonenumber.svg" loading="lazy" alt="" className="image-radius-24" />
            <div className="card-image-rounded-title left inter color-2e2e2e mobile-20px">{t('step1')}</div>
          </div>
          <div id="w-node-_5728eba1-9e26-889b-a99f-2fcd23c1e9a3-7c0a9291" className="card-image-rounded"><img src="/images/features-otp-howitworks-otp.svg" loading="lazy" alt="" className="image-radius-24" />
            <div className="card-image-rounded-title left inter color-2e2e2e mobile-20px">{t('step2')}</div>
          </div>
          <div id="w-node-a40d5e92-6d8a-8379-578c-dd5cc5c2d4ae-7c0a9291" className="card-image-rounded"><img src="/images/features-otp-howitworks-submitcode.svg" loading="lazy" alt="" className="image-radius-24" />
            <div className="card-image-rounded-title left inter color-2e2e2e mobile-20px">{t('step3')}</div>
          </div>
        </div>
        <div className="check-points">
          <div className="check-points-content"><img src="/images/features-otp-howitworks-check.svg" loading="lazy" alt="" />
            <p className="check-points-text">{t('checkPoint1Pre')}<span className="text-span-46">{t('checkPoint1Bold')}</span>{t('checkPoint1Post')}</p>
          </div>
          <div className="check-points-content"><img src="/images/features-otp-howitworks-check.svg" loading="lazy" alt="" />
            <p className="check-points-text">{t('checkPoint2')}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="footer-section-none-form">
    <div className="w-layout-blockcontainer container-default w-container">
      <div className="footer-section-none-form-content-wrap">
        <div className="footer-section-none-form-content">
          <h2 className="footer-section-none-form-title">{t('ctaTitle')}</h2>
        </div>
        <div className="footer-section-none-form-cta-wrap">
          <a href="https://portal.authgear.com/?utm_source=feature-mfa&amp;utm_medium=link&amp;utm_campaign=start-for-free" target="_blank" className="footer-section-none-form-button w-button">{tFeatures('startForFree')}</a>
          <Link href="/schedule-demo" className="footer-section-none-form-button inverse w-button">{t('getADemo')}</Link>
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
