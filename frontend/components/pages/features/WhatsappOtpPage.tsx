import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface Props {
  locale: string;
}

const WHY_CARDS = [
  { img: '/images/features-otp-whyotp-01.svg', titleKey: 'why1Title', descKey: 'why1Desc' },
  { img: '/images/features-otp-whyotp-02.svg', titleKey: 'why2Title', descKey: 'why2Desc' },
  { img: '/images/features-otp-whyotp-03.svg', titleKey: 'why3Title', descKey: 'why3Desc' },
  { img: '/images/features-otp-whyotp-04.svg', titleKey: 'why4Title', descKey: 'why4Desc' },
] as const;

const HOW_STEPS = [
  { img: '/images/features-otp-howitworks-phonenumber.svg', stepKey: 'step1' },
  { img: '/images/features-otp-howitworks-otp.svg', stepKey: 'step2' },
  { img: '/images/features-otp-howitworks-submitcode.svg', stepKey: 'step3' },
] as const;

export default function WhatsappOtpPage(_props: Props) {
  const t = useTranslations('WhatsAppOtp');
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
                      href="https://portal.authgear.com/?utm_source=feature-whatsapp-otp&amp;utm_medium=link&amp;utm_campaign=start-for-free"
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
                  src="/images/features-whatsappotp-hero-banner2x.png"
                  srcSet="/images/features-whatsappotp-hero-banner2x-p-500.png 500w, /images/features-whatsappotp-hero-banner2x-p-800.png 800w, /images/features-whatsappotp-hero-banner2x-p-1080.png 1080w, /images/features-whatsappotp-hero-banner2x.png 1459w"
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
            <h2 className="heading-on-light">{t('whyTitle')}</h2>
            <p className="section-lede-on-light">{t('whyDescription')}</p>
          </div>
          <div className="ds-grid-2">
            {WHY_CARDS.map((card) => (
              <div key={card.img} className="svg-card">
                <div className="svg-card-image-container">
                  <img src={card.img} loading="lazy" alt="" />
                </div>
                <div className="ds-svg-card-content">
                  <div className="ds-svg-card-title">{t(card.titleKey)}</div>
                  <div className="ds-svg-card-description">{t(card.descKey)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ds-section ds-bg-white">
        <div className="ds-container">
          <div className="title-content">
            <h2 className="heading-on-light">{t('howItWorksTitle')}</h2>
          </div>
          <div className="ds-grid-3 whatsapp-otp-how-grid">
            {HOW_STEPS.map((step) => (
              <div key={step.img} className="whatsapp-otp-how-step">
                <div className="whatsapp-otp-how-step__figure">
                  <img src={step.img} loading="lazy" alt="" className="whatsapp-otp-how-step__img" />
                </div>
                <div className="ds-svg-card-content">
                  <div className="ds-svg-card-title">{t(step.stepKey)}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="whatsapp-otp-checks">
            <ul role="list" className="whatsapp-otp-checks__list">
              <li>
                {t('checkPoint1Pre')}
                <strong>{t('checkPoint1Bold')}</strong>
                {t('checkPoint1Post')}
              </li>
              <li>{t('checkPoint2')}</li>
            </ul>
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
              href="https://portal.authgear.com/?utm_source=feature-whatsapp-otp&amp;utm_medium=link&amp;utm_campaign=start-for-free"
              target="_blank"
              rel="noreferrer"
              className="ds-btn ds-btn-primary"
            >
              {tFeatures('startForFree')}
            </a>
            <Link href="/schedule-demo" target="_blank" rel="noreferrer" className="ds-btn ds-btn-outline-light">
              {t('getADemo')}
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
