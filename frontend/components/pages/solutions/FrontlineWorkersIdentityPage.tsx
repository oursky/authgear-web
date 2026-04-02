import { ArrowRightIcon } from '@heroicons/react/24/outline';
import ContactForm from '@/components/ContactForm';
import { useTranslations } from 'next-intl';

interface Props {
  locale: string;
}

export default function FrontlineWorkersIdentityPage(_props: Props) {
  const t = useTranslations('FrontlineWorkersIdentity');
  return (
    <>
      <section className="ds-hero-banner--dark">
        <div className="ds-container ds-container--hero">
          <div className="ds-hero-banner__row">
            <div className="ds-hero-banner__body">
              <h1 className="ds-hero-banner__title">
                {t('heroTitle')}
              </h1>
              <p className="ds-hero-banner__description">
                {t('heroDescription')}
              </p>
              <div className="ds-hero-banner__ctas">
                <a href="/schedule-demo" target="_blank" rel="noreferrer" className="ds-btn ds-btn-secondary">
                  {t('heroCta1')}
                  <ArrowRightIcon className="ds-btn__icon-arrow" aria-hidden />
                </a>
                <a
                  href="https://portal.authgear.com/?utm_source=solutions-enterprise-sso&utm_medium=link&utm_campaign=sign-up"
                  target="_blank"
                  rel="noreferrer"
                  className="ds-btn ds-btn-tertiary"
                >
                  {t('heroCta2')}
                  <ArrowRightIcon className="ds-btn__icon-arrow" aria-hidden />
                </a>
              </div>
            </div>
            <img
              className="ds-hero-banner__media"
              src="/images/solutions-wiam-kv2x.webp"
              width={624}
              alt=""
            />
          </div>
        </div>
      </section>
      <section className="ds-section">
        <div className="ds-container">
          <div className="title-content">
            <h2 className="heading-on-light">{t('empowerTitle')}</h2>
            <p className="section-lede-on-light">{t('empowerDesc')}</p>
          </div>
          <div className="ds-grid-2">
            <div className="svg-card">
              <img src="/images/solutions-wiam-empower-staff.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('empower1Title')}</div>
                <div className="ds-svg-card-description">{t('empower1Desc')}</div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/solutions-wiam-empower-management.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('empower2Title')}</div>
                <div className="ds-svg-card-description">{t('empower2Desc')}</div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/solutions-wiam-empower-security.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('empower3Title')}</div>
                <div className="ds-svg-card-description">{t('empower3Desc')}</div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/solutions-wiam-empower-save.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('empower4Title')}</div>
                <div className="ds-svg-card-description">{t('empower4Desc')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ds-section">
        <div className="ds-container">
          <div className="ds-split ds-split-row">
            <div className="ds-split-row__media">
              <img
                src="/images/solutions-wiam-discory-customer-stories.svg"
                loading="lazy"
                alt=""
                className="ds-split-row__img"
              />
            </div>
            <div className="ds-split-row__body">
              <h2 className="heading-on-light">{t('discoverTitle')}</h2>
              <p className="section-lede-on-light">
                {t('discoverDesc')}
              </p>
              <a
                href="https://www.authgear.com/post/passkey-vs-password-why-passkeys-are-the-future-of-security"
                className="button-secondary insection-cta features-text-block-cta-left w-button"
              >
                {t('discoverCta')} {'>'}
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="ds-section">
        <div className="ds-container">
          <div className="ds-split ds-split-row ds-split-row--reverse">
            <div className="ds-split-row__media">
              <img
                src="/images/solutions-wiam-discory-customer-stories.svg"
                loading="lazy"
                alt=""
                className="ds-split-row__img"
              />
            </div>
            <div className="ds-split-row__body">
              <h2 className="heading-on-light">{t('discoverTitle')}</h2>
              <p className="section-lede-on-light">
                {t('discoverDesc')}
              </p>
              <a
                href="https://www.authgear.com/post/passkey-vs-password-why-passkeys-are-the-future-of-security"
                className="button-secondary insection-cta features-text-block-cta-left w-button"
              >
                {t('discoverCta')} {'>'}
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="ds-section">
        <div className="ds-container">
          <div className="title-content">
            <h2 className="heading-on-light">{t('tailoredTitle')}</h2>
            <p className="section-lede-on-light">{t('tailoredDesc')}</p>
          </div>
          <div className="ds-grid-2">
            <div className="svg-card">
                <img src="/images/b2c_ciam_usercentric-journeys.svg" loading="lazy" alt="" />
                <div className="ds-svg-card-content">
                  <div className="ds-svg-card-title">{t('tailored1Title')}</div>
                  <div className="ds-svg-card-description">{t('tailored1Desc')}</div>
                </div>
              </div>
              <div className="svg-card">
                <img src="/images/b2c_ciam_usercentric-increased.svg" loading="lazy" alt="" />
                <div className="ds-svg-card-content">
                  <div className="ds-svg-card-title">{t('tailored2Title')}</div>
                  <div className="ds-svg-card-description">{t('tailored2Desc')}</div>
                </div>
              </div>
              <div className="svg-card">
                <img src="/images/b2c_ciam_usercentric-boosted.svg" loading="lazy" alt="" />
                <div className="ds-svg-card-content">
                  <div className="ds-svg-card-title">{t('tailored3Title')}</div>
                  <div className="ds-svg-card-description">{t('tailored3Desc')}</div>
                </div>
              </div>
              <div className="svg-card">
                <img src="/images/b2c_ciam_usercentric-enhanced.svg" loading="lazy" alt="" />
                <div className="ds-svg-card-content">
                  <div className="ds-svg-card-title">{t('tailored4Title')}</div>
                  <div className="ds-svg-card-description">{t('tailored4Desc')}</div>
                </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ds-section ds-bg-light-blue">
        <div className="ds-container">
          <div className="title-content">
            <h2 className="heading-on-light">
              {t('accessTitle')}
            </h2>
            <p className="section-lede-on-light">
              {t('accessDesc')}
            </p>
          </div>
          <div className="ds-grid-4">
            <div className="svg-card">
              <img src="/images/solutions-wiam-access-01.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('access1Title')}</div>
                <div className="ds-svg-card-description">
                  {t('access1Desc')}
                </div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/solutions-wiam-access-02.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('access2Title')}</div>
                <div className="ds-svg-card-description">
                  {t('access2Desc')}
                </div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/solutions-wiam-access-03.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('access3Title')}</div>
                <div className="ds-svg-card-description">
                  {t('access3Desc')}
                </div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/solutions-wiam-access-04.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('access4Title')}</div>
                <div className="ds-svg-card-description">
                  {t('access4Desc')}
                </div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/solutions-wiam-access-05.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('access5Title')}</div>
                <div className="ds-svg-card-description">
                  {t('access5Desc')}
                </div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/solutions-wiam-access-06.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('access6Title')}</div>
                <div className="ds-svg-card-description">
                  {t('access6Desc')}
                </div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/solutions-wiam-access-07.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('access7Title')}</div>
                <div className="ds-svg-card-description">
                  {t('access7Desc')}
                </div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/solutions-wiam-access-08.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('access8Title')}</div>
                <div className="ds-svg-card-description">
                  {t('access8Desc')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ds-section">
        <div className="ds-container">
          <div className="title-content">
            <h2 className="heading-on-light">{t('trustedTitle')}</h2>
          </div>
          <div className="_2-card-grid">
            <div className="solution-case-study-card">
              <img
                src="/images/solutions-wiam-case-MTR2x.webp"
                loading="lazy"
                width={624}
                sizes="(max-width: 767px) 100vw, 624px"
                alt=""
                srcSet="/images/solutions-wiam-case-MTR2x-p-500.webp 500w, /images/solutions-wiam-case-MTR2x-p-800.webp 800w, /images/solutions-wiam-case-MTR2x-p-1080.webp 1080w, /images/solutions-wiam-case-MTR2x.webp 1248w"
                className="solution-case-study-card-thumb"
              />
              <div className="solution-case-study-card-text">
                <div className="ds-svg-card-content">
                  <h3 className="ds-svg-card-title">{t('caseStudy1Title')}</h3>
                  <a href="/customer-stories/hongkong-mtr" className="ds-btn ds-btn-secondary">
                    {t('caseStudy1Cta')}
                    <ArrowRightIcon className="ds-btn__icon-arrow" aria-hidden />
                  </a>
                </div>
              </div>
            </div>
            <div className="solution-case-study-card">
              <img
                src="/images/solutions-wiam-case-QSR2x.webp"
                loading="lazy"
                width={624}
                sizes="(max-width: 767px) 100vw, 624px"
                alt=""
                srcSet="/images/solutions-wiam-case-QSR2x-p-500.webp 500w, /images/solutions-wiam-case-QSR2x-p-800.webp 800w, /images/solutions-wiam-case-QSR2x-p-1080.webp 1080w, /images/solutions-wiam-case-QSR2x.webp 1248w"
                className="solution-case-study-card-thumb"
              />
              <div className="solution-case-study-card-text">
                <div className="ds-svg-card-content">
                  <h3 className="ds-svg-card-title">{t('caseStudy2Title')}</h3>
                  <a href="/customer-stories/global-qsr" className="ds-btn ds-btn-secondary">
                    {t('caseStudy2Cta')}
                    <ArrowRightIcon className="ds-btn__icon-arrow" aria-hidden />
                  </a>
                </div>
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
                  <h2 className="form-heading color-white footer-form">{t('footerTitle')}</h2>
                  <div className="footerform__divider-sm"></div>
                  <div className="color-white footer-get-started-text">{t('footerGetStarted')}</div>
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
