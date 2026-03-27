import Link from 'next/link';
import { useTranslations } from 'next-intl';
import ContactForm from '@/components/ContactForm';

interface Props {
  locale: string;
}

export default function PasswordlessAuthenticationPage(_props: Props) {
  const t = useTranslations('Passwordless');
  const tFeatures = useTranslations('Features');
  return (
    <>
<div className="featurespage__hero_v2 featurespage__hero_bg">
    <div className="features-hero-wrapper-new">
      <div className="w-layout-hflex split-content features-hero-left">
        <div className="featurespage__hero-titletag">{t('heroSmallTitle')}</div>
        <h1 className="title features-hero-v2">{t('heroTitle')}</h1>
        <p className="features-hero-description">{t('heroDescription')}</p>
        <div className="features-hero-cta-wrapper">
          <a href="https://portal.authgear.com/?utm_source=feature-passwordless&amp;utm_medium=link&amp;utm_campaign=start-for-free" target="_blank" className="button-primary feature-hero-btn-v2 w-button">{tFeatures('startForFree')}</a>
          <Link href="/schedule-demo" target="_blank" className="button-secondary feature-hero-btn-v2 noscale w-button">{tFeatures('scheduleDemo')}  <span className="text-span-23">{">"}</span></Link>
        </div>
      </div><img src="/images/features-passwordless-hero-kv.svg" alt="" className="image features-hero-image-v2" />
    </div>
  </div>
  <div>
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">{t('ditchTitle')}<br />{t('ditchTitleLine2')}<span className="text-highlight-gradient">{t('ditchTitleHighlight')}</span></h2>
          <p className="paragraph-large text-center features-page-v2">{t('ditchDescription')}</p>
        </div>
        <div className="_3-card-grid">
          <div id="w-node-_74c657f8-1d5c-c4de-f8d4-2c0614c18db6-e43d3961" className="svg-card p-0 pr-24">
            <div className="svg-card-image-container"><img src="/images/features-passwordless-ditch-icon-security.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">{t('card1Title')}</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px">{t('card1Desc')}</div>
            </div>
          </div>
          <div id="w-node-b37ec1cc-d3a6-1ae9-a99a-0953f54852a2-e43d3961" className="svg-card p-0 pr-24">
            <div className="svg-card-image-container"><img src="/images/features-passwordless-ditch-icon-ux.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">{t('card2Title')}</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px">{t('card2Desc')}</div>
            </div>
          </div>
          <div id="w-node-adaca765-6ce8-1ba3-96bb-6b5d5e91799f-e43d3961" className="svg-card p-0 pr-24">
            <div className="svg-card-image-container"><img src="/images/features-passwordless-ditch-icon-convenience.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">{t('card3Title')}</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px">{t('card3Desc')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="featurespage__section_dark-bg">
    <div className="container-default w-container">
      <div className="solution-flex-container gap-40 reverse-order">
        <div className="solution-image-block"><img src="/images/features-passwordless-social-login.svg" loading="lazy" alt="" /></div>
        <div className="features-text-block line-height-40 p-0">
          <h3 className="features-page-h3 white">{t('socialLoginTitle')} <br /><span className="gray-gradient">{t('socialLoginTitleHighlight')}</span></h3>
          <p className="feature-content inverse">{t('socialLoginDesc')}</p>
          <Link href="/features/social-login" className="feature-white-button w-button">{t('exploreSocialLogin')}</Link>
        </div>
      </div>
      <div className="solution-flex-container gap-40">
        <div className="solution-image-block"><img src="/images/features-passwordless-passkey.svg" loading="lazy" alt="" /></div>
        <div className="features-text-block line-height-40 p-0">
          <h3 className="features-page-h3 white">{t('passkeysTitle')}<br /><span className="gray-gradient">{t('passkeysTitleHighlight')}</span></h3>
          <p className="feature-content inverse">{t('passkeysDesc')}</p>
          <Link href="/features/passkeys" className="feature-white-button w-button">{t('discoverPasskeys')}</Link>
        </div>
      </div>
      <div className="solution-flex-container gap-40 reverse-order">
        <div className="solution-image-block"><img src="/images/features-passwordless-biometric.svg" loading="lazy" alt="" /></div>
        <div className="features-text-block line-height-40 p-0">
          <h3 className="features-page-h3 white"><span className="gray-gradient">{t('biometricTitle')}<br />{t('biometricTitleHighlight')}</span></h3>
          <p className="feature-content inverse">{t('biometricDesc')}</p>
          <Link href="/features/biometric-authentication" className="feature-white-button w-button">{t('biometricLogin')}</Link>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="card-full radius-48px p-60 bg-blue bg-radial-gradient-blue">
          <div className="_2-block-flex">
            <div className="_2-block_flex-left basis-60">
              <div className="_2-block-flex-content max-w-none">
                <h2 className="features-h2 gray-gradient mb-0 mobile-26px">{t('magicLinkTitle')}</h2>
                <div className="features_card-full-description color-cee9ff">{t('magicLinkDesc')}</div>
              </div>
            </div>
            <div>
              <div className="_2-block-flex-image"><img src="/images/seamless-logins_login-box.png" loading="lazy" width={684} sizes="(max-width: 767px) 100vw, 684px" alt="" srcSet="/images/seamless-logins_login-box-p-500.png 500w, /images/seamless-logins_login-box-p-800.png 800w, /images/seamless-logins_login-box-p-1080.png 1080w, /images/seamless-logins_login-box.png 1368w" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="otp">
    <div className="container-default otp">
      <div className="container-default-inner px-0 gap-0 otp">
        <div className="top-content feature-flex otp">
          <h2 className="title features-page-v2 left-align">{t('challengesOtpTitle')}<br />{t('challengesOtpSubtitle')}</h2>
          <p className="paragraph-large text-center features-page-v2 left-align">{t('challengesOtpDesc')}</p>
        </div>
      </div><img src="/images/features-passwordless-otp-whatsapp.svg" loading="lazy" alt="" />
    </div>
  </div>
  <div>
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">{t('challengesTitle')}<br />{t('challengesTitleLine2')}<span className="text-highlight-gradient">{t('challengesTitleHighlight')}</span>{t('challengesTitleEnd')}</h2>
          <p className="paragraph-large text-center features-page-v2">{t('challengesDescription')}</p>
        </div>
        <div className="_3-card-grid">
          <div className="flip-card">
            <div id="w-node-_00cfbc02-babb-5e85-058e-e310d1fa3fab-e43d3961" className="svg-card-front px-24 pb-24 relative drop-shadow space-between">
              <div className="flip-card-content-wrap">
                <div className="svg-card-image-container"><img src="/images/features-passwordless-challenges-icon-integrations.svg" loading="lazy" alt="" /></div>
                <div className="svg-card-content-container text-center gap-6">
                  <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">{t('challenge1Front')}</div>
                  <div className="svg-card-content-description inter text-align-left mobile-16px">{t('challenge1FrontDesc')}</div>
                </div>
              </div>
              <div className="flip-card-toggle-wrap"><img src="/images/features-passwordless-challenges-icon-plus.svg" loading="lazy" alt="" /></div>
            </div>
            <div className="svg-card-back px-24 pb-24 relative drop-shadow passkeys-card-back">
              <div className="svg-card-content-container text-center gap-6 mb-50">
                <div className="svg-card-content-description text-align-left mobile-16px passkeys-card-back">{t('challenge1Back')}</div>
              </div>
              <div className="flip-card-toggle-wrap"><img src="/images/features-passwordless-challenges-icon-close.svg" loading="lazy" alt="" /></div>
            </div>
          </div>
          <div className="flip-card">
            <div id="w-node-_00cfbc02-babb-5e85-058e-e310d1fa3fbd-e43d3961" className="svg-card-front px-24 pb-24 relative drop-shadow space-between">
              <div className="flip-card-content-wrap">
                <div className="svg-card-image-container"><img src="/images/features-passwordless-challenges-icon-training.svg" loading="lazy" alt="" /></div>
                <div className="svg-card-content-container text-center gap-6">
                  <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">{t('challenge2Front')}</div>
                  <div className="svg-card-content-description inter text-align-left mobile-16px">{t('challenge2FrontDesc')}</div>
                </div>
              </div>
              <div className="flip-card-toggle-wrap"><img src="/images/features-passwordless-challenges-icon-plus.svg" loading="lazy" alt="" /></div>
            </div>
            <div className="svg-card-back px-24 pb-24 relative drop-shadow passkeys-card-back">
              <div className="svg-card-content-container text-center gap-6 mb-50">
                <div className="svg-card-content-description text-align-left mobile-16px passkeys-card-back">{t('challenge2Back')}</div>
              </div>
              <div className="flip-card-toggle-wrap"><img src="/images/features-passwordless-challenges-icon-close.svg" loading="lazy" alt="" /></div>
            </div>
          </div>
          <div className="flip-card">
            <div id="w-node-_00cfbc02-babb-5e85-058e-e310d1fa3fcf-e43d3961" className="svg-card-front px-24 pb-24 relative drop-shadow space-between">
              <div className="flip-card-content-wrap">
                <div className="svg-card-image-container"><img src="/images/features-passwordless-challenges-icon-balance.svg" loading="lazy" alt="" /></div>
                <div className="svg-card-content-container text-center gap-6">
                  <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">{t('challenge3Front')}</div>
                  <div className="svg-card-content-description inter text-align-left mobile-16px">{t('challenge3FrontDesc')}</div>
                </div>
              </div>
              <div className="flip-card-toggle-wrap"><img src="/images/features-passwordless-challenges-icon-plus.svg" loading="lazy" alt="" /></div>
            </div>
            <div className="svg-card-back px-24 pb-24 relative drop-shadow passkeys-card-back">
              <div className="svg-card-content-container text-center gap-6 mb-50">
                <div className="svg-card-content-description text-align-left mobile-16px passkeys-card-back">{t('challenge3Back')}</div>
              </div>
              <div className="flip-card-toggle-wrap"><img src="/images/features-passwordless-challenges-icon-close.svg" loading="lazy" alt="" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div className="container-default w-container"></div>
  </div>
  <div className="footer-form-section form__bg-dark">
    <div className="container-default">
      <div className="container-default-inner px-0">
        <div className="_2-block-flex footer-form">
          <div className="_2-block-flex-content footer-form">
            <div className="_2-block-flex-content-text-wrap footer-form">
              <h2 className="form-heading color-white footer-form">{t('ctaTitle')}</h2>
              <div className="color-cee9ff">{t('ctaDesc')}</div>
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
