import { ArrowRightIcon } from '@heroicons/react/24/outline';
import ContactForm from '@/components/ContactForm';
import { useTranslations } from 'next-intl';

interface Props {
  locale: string;
}

export default function CiamSolutionPage(_props: Props) {
  const t = useTranslations('CiamSolution');
  return (
    <>
          <section className="ds-hero-banner--white">
            <div className="ds-container ds-container--hero-white">
              <div className="ds-hero-banner__stack">
                <div className="ds-section-eyebrow">{t('eyebrow')}</div>
                <h1 className="ds-hero-banner__title">
                  {t('heroTitleLine1')}<br />
                  {t('heroTitleLine2')}
                </h1>
                <p className="ds-hero-banner__description">
                  {t('heroDescription')}
                </p>
                <div className="ds-hero-banner__ctas">
                  <a
                    href="https://portal.authgear.com/?utm_source=solutions-b2c-ciam&utm_medium=link&utm_campaign=talk-with-us"
                    target="_blank"
                    rel="noreferrer"
                    className="ds-btn ds-btn-primary"
                  >
                    {t('heroCta')}
                    <ArrowRightIcon className="ds-btn__icon-arrow" aria-hidden />
                  </a>
                </div>
              </div>
              <img
                src="/images/b2c_ciam_kv-hero-login-box1.svg"
                loading="lazy"
                alt=""
                width={1152}
                className="ds-hero-banner__media ds-hero-banner__media--bottom"
              />
            </div>
          </section>
          <section className="ds-section">
            <div className="ds-container">
              <div className="title-content">
                <h2 className="heading-on-light">
                  {t('oneStopTitleLine1')}<br />
                  {t('oneStopTitleLine2')}
                </h2>
                <p className="section-lede-on-light">
                  {t('oneStopDesc')}
                </p>
              </div>
              <div className="ds-grid-3 ciam-one-stop-feature-cards">
                <div className="svg-card">
                  <img src="/images/b2c_ciam_one-stop-sso.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('oneStop1')}</div>
                  </div>
                </div>
                <div className="svg-card">
                  <img src="/images/b2c_ciam_one-stop-passwordless.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('oneStop2')}</div>
                  </div>
                </div>
                <div className="svg-card">
                  <img src="/images/b2c_ciam_one-stop-mfa.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('oneStop3')}</div>
                  </div>
                </div>
                <div className="svg-card">
                  <img src="/images/b2c_ciam_one-stop-biometric.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('oneStop4')}</div>
                  </div>
                </div>
                <div className="svg-card">
                  <img src="/images/b2c_ciam_one-stop-breachedpassword.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('oneStop5')}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="ds-section ds-bg-light-blue">
            <div className="ds-container">
              <div className="title-content">
                <h2 className="heading-on-light">
                  {t('frictionlessTitle')}
                </h2>
                <p className="section-lede-on-light">
                  {t('frictionlessDesc')}
                </p>
              </div>
              <div className="ciam-frictionless-feature-cards grid w-full grid-cols-1 gap-6 self-stretch lg:grid-cols-3 lg:grid-rows-2 lg:gap-6">
                <div className="svg-card lg:col-start-1 lg:row-start-1">
                  <img src="/images/b2c_ciam_empowers-passwordmanagement.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('frictionless1Title')}</div>
                    <div className="ds-svg-card-description">
                      {t('frictionless1Desc')}
                    </div>
                  </div>
                </div>
                <div className="svg-card lg:col-start-1 lg:row-start-2">
                  <img src="/images/b2c_ciam_empowers-reducelogin.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('frictionless2Title')}</div>
                    <div className="ds-svg-card-description">
                      {t('frictionless2Desc')}
                    </div>
                  </div>
                </div>
                <div className="svg-card justify-between lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:h-full lg:min-h-0">
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('frictionless3Title')}</div>
                    <div className="ds-svg-card-description">
                      {t('frictionless3Desc')}
                    </div>
                  </div>
                  <img src="/images/b2c_ciam_empowers-modernlogin.svg" loading="lazy" alt="" className="mw-140 mx-auto" />
                </div>
                <div className="svg-card lg:col-start-3 lg:row-start-1">
                  <img src="/images/b2c_ciam_empowers-registration.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('frictionless4Title')}</div>
                    <div className="ds-svg-card-description">
                      {t('frictionless4Desc')}
                    </div>
                  </div>
                </div>
                <div className="svg-card lg:col-start-3 lg:row-start-2">
                  <img src="/images/b2c_ciam_empowers-mfa.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('frictionless5Title')}</div>
                    <div className="ds-svg-card-description">
                      {t('frictionless5Desc')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="ds-section">
            <div className="ds-container">
              <div className="title-content">
                <h2 className="heading-on-light">{t('userCentricTitle')}</h2>
                <p className="section-lede-on-light">
                  {t('userCentricDesc')}
                </p>
              </div>
              <div className="ds-grid-2">
                <div className="svg-card">
                  <img src="/images/b2c_ciam_usercentric-journeys.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('userCentric1Title')}</div>
                    <div className="ds-svg-card-description">
                      {t('userCentric1Desc')}
                    </div>
                  </div>
                </div>
                <div className="svg-card">
                  <img src="/images/b2c_ciam_usercentric-increased.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('userCentric2Title')}</div>
                    <div className="ds-svg-card-description">
                      {t('userCentric2Desc')}
                    </div>
                  </div>
                </div>
                <div className="svg-card">
                  <img src="/images/b2c_ciam_usercentric-boosted.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('userCentric3Title')}</div>
                    <div className="ds-svg-card-description">
                      {t('userCentric3Desc')}
                    </div>
                  </div>
                </div>
                <div className="svg-card">
                  <img src="/images/b2c_ciam_usercentric-enhanced.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('userCentric4Title')}</div>
                    <div className="ds-svg-card-description">
                      {t('userCentric4Desc')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="ds-section b2c-ciam-solution-section-dark-bg">
            <div className="ds-container">
              <div className="title-content">
                <h2 className="heading-on-dark">
                  {t('devTitle')}
                </h2>
                <p className="section-lede-on-dark">
                  {t('devDesc')}
                </p>
              </div>
              <div className="ds-grid-2">
                <div className="svg-card svg-card-glass">
                  <img src="/images/b2c_ciam_integration-nocode.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('dev1Title')}</div>
                    <div className="ds-svg-card-description">
                      {t('dev1Desc')}
                    </div>
                  </div>
                </div>
                <div className="svg-card svg-card-glass">
                  <img src="/images/b2c_ciam_integration-prebuilt.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('dev2Title')}</div>
                    <div className="ds-svg-card-description">
                      {t('dev2Desc')}
                    </div>
                  </div>
                </div>
                <div className="svg-card svg-card-glass">
                  <img src="/images/b2c_ciam_integration-flexible.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('dev3Title')}</div>
                    <div className="ds-svg-card-description">
                      {t('dev3Desc')}
                    </div>
                  </div>
                </div>
                <div className="svg-card svg-card-glass">
                  <img src="/images/b2c_ciam_integration-security.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('dev4Title')}</div>
                    <div className="ds-svg-card-description">
                      {t('dev4Desc')}
                    </div>
                  </div>
                </div>
              </div>
              <div className="title-content ds-title-content--after-block">
                <h2 className="heading-on-dark">
                  {t('frictionlessTitle')}
                </h2>
                <p className="section-lede-on-dark">
                  {t('frictionlessDesc')}
                </p>
              </div>
              <div className="ds-grid-3">
                <div className="svg-card svg-card-glass">
                  <img src="/images/b2c_ciam_development-innovation.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('devBenefit1Title')}</div>
                    <div className="ds-svg-card-description">
                      {t('devBenefit1Desc')}
                    </div>
                  </div>
                </div>
                <div className="svg-card svg-card-glass">
                  <img src="/images/b2c_ciam_development-reduce.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('devBenefit2Title')}</div>
                    <div className="ds-svg-card-description">
                      {t('devBenefit2Desc')}
                    </div>
                  </div>
                </div>
                <div className="svg-card svg-card-glass">
                  <img src="/images/b2c_ciam_development-experience.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('devBenefit3Title')}</div>
                    <div className="ds-svg-card-description">
                      {t('devBenefit3Desc')}
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
