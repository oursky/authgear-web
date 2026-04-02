import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import ContactForm from '@/components/ContactForm';
import PasswordlessChallengeFlipCard from '@/components/features/PasswordlessChallengeFlipCard';

interface Props {
  locale: string;
}

export default function PasswordlessAuthenticationPage(_props: Props) {
  const t = useTranslations('Passwordless');
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
                      href="https://portal.authgear.com/?utm_source=feature-passwordless&amp;utm_medium=link&amp;utm_campaign=start-for-free"
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
                  src="/images/features-passwordless-hero-kv.svg"
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
              {t('ditchTitle')}
              <br />
              {t('ditchTitleLine2')}
              {t('ditchTitleHighlight')}
            </h2>
            <p className="section-lede-on-light">{t('ditchDescription')}</p>
          </div>
          <div className="ds-grid-3">
            <div className="svg-card">
              <img src="/images/features-passwordless-ditch-icon-security.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('card1Title')}</div>
                <div className="ds-svg-card-description">{t('card1Desc')}</div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/features-passwordless-ditch-icon-ux.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('card2Title')}</div>
                <div className="ds-svg-card-description">{t('card2Desc')}</div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/features-passwordless-ditch-icon-convenience.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('card3Title')}</div>
                <div className="ds-svg-card-description">{t('card3Desc')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Single section: One-Click Convenience (Social Login) through Seamlessly Secure (Biometric Login) */}
      <section
        className="ds-section passwordless-section-dark-bg"
        aria-label={t('sectionConvenienceToBiometricAriaLabel')}
      >
        <div className="ds-container ds-container--split-stack">
          <div className="ds-split ds-split-row ds-split-row--reverse">
            <div className="ds-split-row__media">
              <img
                src="/images/features-passwordless-social-login.svg"
                loading="lazy"
                width={624}
                alt=""
                className="ds-split-row__img"
              />
            </div>
            <div className="ds-split-row__body">
              <h2 className="heading-on-dark">
                {t('socialLoginTitle')}
                <br />
                {t('socialLoginTitleHighlight')}
              </h2>
              <p className="section-lede-on-dark">{t('socialLoginDesc')}</p>
              <Link href="/features/social-login" className="ds-btn ds-btn-outline-light">
                {t('exploreSocialLogin')}
              </Link>
            </div>
          </div>
          <div className="ds-split ds-split-row">
            <div className="ds-split-row__media">
              <img
                src="/images/features-passwordless-passkey.svg"
                loading="lazy"
                width={624}
                alt=""
                className="ds-split-row__img"
              />
            </div>
            <div className="ds-split-row__body">
              <h2 className="heading-on-dark">
                {t('passkeysTitle')}
                <br />
                {t('passkeysTitleHighlight')}
              </h2>
              <p className="section-lede-on-dark">{t('passkeysDesc')}</p>
              <Link href="/features/passkeys" className="ds-btn ds-btn-outline-light">
                {t('discoverPasskeys')}
              </Link>
            </div>
          </div>
          <div className="ds-split ds-split-row ds-split-row--reverse">
            <div className="ds-split-row__media">
              <img
                src="/images/features-passwordless-biometric.svg"
                loading="lazy"
                width={624}
                alt=""
                className="ds-split-row__img"
              />
            </div>
            <div className="ds-split-row__body">
              <h2 className="heading-on-dark">
                {t('biometricTitle')}
                <br />
                {t('biometricTitleHighlight')}
              </h2>
              <p className="section-lede-on-dark">{t('biometricDesc')}</p>
              <Link href="/features/biometric-authentication" className="ds-btn ds-btn-outline-light">
                {t('biometricLogin')}
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="ds-section">
        <div className="ds-container">
          <div className="ds-feature-callout ds-feature-callout--cta-accent">
            <div className="ds-feature-callout__title">
              <h2 className="heading-on-dark">{t('magicLinkTitle')}</h2>
              <p className="section-lede-on-dark">{t('magicLinkDesc')}</p>
            </div>
            <div className="ds-feature-callout__body">
              <div className="ds-feature-callout__media">
                <img
                  src="/images/seamless-logins_login-box.png"
                  srcSet="/images/seamless-logins_login-box-p-500.png 500w, /images/seamless-logins_login-box-p-800.png 800w, /images/seamless-logins_login-box-p-1080.png 1080w, /images/seamless-logins_login-box.png 1368w"
                  sizes="(max-width: 767px) 100vw, 684px"
                  width={684}
                  loading="lazy"
                  alt=""
                  className="ds-feature-callout__media-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ds-section">
        <div className="ds-container ds-container--split-stack">
          <div className="ds-split ds-split-row ds-split-row--reverse">
            <div className="ds-split-row__media">
              <img
                src="/images/features-passwordless-otp-whatsapp.svg"
                loading="lazy"
                width={624}
                alt=""
                className="ds-split-row__img"
              />
            </div>
            <div className="ds-split-row__body">
              <h2 className="heading-on-light">
                {t('challengesOtpTitle')}
                <br />
                {t('challengesOtpSubtitle')}
              </h2>
              <p className="section-lede-on-light">{t('challengesOtpDesc')}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="ds-section ds-bg-white">
        <div className="ds-container">
          <div className="title-content">
            <h2 className="heading-on-light">
              {t('challengesTitle')}
              <br />
              {t('challengesTitleLine2')}
              {t('challengesTitleHighlight')}
              {t('challengesTitleEnd')}
            </h2>
            <p className="section-lede-on-light">{t('challengesDescription')}</p>
          </div>
          <div className="ds-grid-3">
            <PasswordlessChallengeFlipCard
              webflowNodeId="w-node-_00cfbc02-babb-5e85-058e-e310d1fa3fab-e43d3961"
              frontIconSrc="/images/features-passwordless-challenges-icon-integrations.svg"
              frontTitle={t('challenge1Front')}
              frontDesc={t('challenge1FrontDesc')}
              backText={t('challenge1Back')}
            />
            <PasswordlessChallengeFlipCard
              webflowNodeId="w-node-_00cfbc02-babb-5e85-058e-e310d1fa3fbd-e43d3961"
              frontIconSrc="/images/features-passwordless-challenges-icon-training.svg"
              frontTitle={t('challenge2Front')}
              frontDesc={t('challenge2FrontDesc')}
              backText={t('challenge2Back')}
            />
            <PasswordlessChallengeFlipCard
              webflowNodeId="w-node-_00cfbc02-babb-5e85-058e-e310d1fa3fcf-e43d3961"
              frontIconSrc="/images/features-passwordless-challenges-icon-balance.svg"
              frontTitle={t('challenge3Front')}
              frontDesc={t('challenge3FrontDesc')}
              backText={t('challenge3Back')}
            />
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
