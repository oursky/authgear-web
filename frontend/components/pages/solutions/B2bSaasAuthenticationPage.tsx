import { ArrowRightIcon } from '@heroicons/react/24/outline';
import ContactForm from '@/components/ContactForm';
import { useTranslations } from 'next-intl';

interface Props {
  locale: string;
}

export default function B2bSaasAuthenticationPage(_props: Props) {
  const t = useTranslations('B2bSaasAuthentication');
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
                  {t('heroDescPart1')}
                  <br />
                  <span className="text-bold">
                    {t('heroDescBold')}
                  </span>
                </p>
                <div className="ds-hero-banner__ctas">
                  <a
                    href="https://portal.authgear.com/?utm_source=solutions-b2b-saas&utm_medium=link&utm_campaign=talk-with-us"
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
                  {t('empowerTitleLine1')}<br />
                  {t('empowerTitleLine2')}
                </h2>
                <p className="section-lede-on-light">
                  {t('empowerDesc')}
                </p>
              </div>
            </div>
            <div className="container-full-general">
              <img src="/images/b2b_saas_empower-flow.svg" loading="lazy" alt="" className="_w-full pb-80" />
              <img src="/images/b2b_saas_empower-flow-m.svg" loading="lazy" alt="" className="_w-full pb-80 mobile-100" />
            </div>
          </section>
          <section className="ds-section">
            <div className="ds-container">
              <div className="title-content">
                <h2 className="heading-on-light">
                  {t('multitenancyTitleLine1')}<br />
                  {t('multitenancyTitleLine2')}
                </h2>
                <p className="section-lede-on-light">
                  {t('multitenancyDesc')}
                </p>
              </div>
              <div className="ds-grid-3 b2b-saas-multitenancy-step-cards">
                <div className="svg-card">
                  <div className="b2b-saas-multitenancy-step-cards__step" aria-hidden>
                    1
                  </div>
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('multitenancy1Title')}</div>
                    <div className="ds-svg-card-description">
                      {t('multitenancy1Desc')}
                    </div>
                  </div>
                </div>
                <div className="svg-card">
                  <div className="b2b-saas-multitenancy-step-cards__step" aria-hidden>
                    2
                  </div>
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('multitenancy2Title')}</div>
                    <div className="ds-svg-card-description">
                      {t('multitenancy2Desc')}
                    </div>
                  </div>
                </div>
                <div className="svg-card">
                  <div className="b2b-saas-multitenancy-step-cards__step" aria-hidden>
                    3
                  </div>
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('multitenancy3Title')}</div>
                    <div className="ds-svg-card-description">
                      {t('multitenancy3Desc')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="ds-section ds-bg-light-blue">
            <div className="ds-container">
              <div className="title-content">
                <h2 className="heading-on-light">
                  {t('whyTitle')}
                </h2>
              </div>
              <div className="ds-grid-3">
                <div className="svg-card">
                  <img src="/images/b2b-saas-why-adminpanel.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('why1Title')}</div>
                    <div className="ds-svg-card-description">
                      {t('why1Desc')}
                    </div>
                  </div>
                </div>
                <div className="svg-card">
                  <img src="/images/b2b-saas-why-sso.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('why2Title')}</div>
                    <div className="ds-svg-card-description">
                      {t('why2Desc')}
                    </div>
                  </div>
                </div>
                <div className="svg-card">
                  <img src="/images/b2b-saas-why-roles.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('why3Title')}</div>
                    <div className="ds-svg-card-description">
                      {t('why3Desc')}
                    </div>
                  </div>
                </div>
                <div className="svg-card">
                  <img src="/images/b2b-saas-why-customized.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('why4Title')}</div>
                    <div className="ds-svg-card-description">
                      {t('why4Desc')}
                    </div>
                  </div>
                </div>
                <div className="svg-card">
                  <img src="/images/b2b-saas-why-integration.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('why5Title')}</div>
                    <div className="ds-svg-card-description">
                      {t('why5Desc')}
                    </div>
                  </div>
                </div>
                <div className="svg-card">
                  <img src="/images/b2b-saas-why-security.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('why6Title')}</div>
                    <div className="ds-svg-card-description">
                      {t('why6Desc')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="ds-section">
            <div className="ds-container">
              <div className="title-content">
                <h2 className="heading-on-light">
                  {t('granularTitleLine1')}<br />
                  {t('granularTitleLine2')}
                </h2>
                <p className="section-lede-on-light">
                  {t('granularDesc')}
                </p>
              </div>
              <div className="b2b-saas-granular-defense-cards">
                <div className="svg-card">
                  <img src="/images/b2b_saas_granular-control-domain.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('granular1Title')}</div>
                    <div className="ds-svg-card-description">
                      {t('granular1Desc')}
                    </div>
                  </div>
                </div>
                <div className="svg-card">
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('granular2Title')}</div>
                    <div className="ds-svg-card-description">
                      {t('granular2Desc')}
                    </div>
                  </div>
                  <img src="/images/b2b_saas_granular-control-captcha.svg" loading="lazy" alt="" />
                </div>
                <div className="svg-card">
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('granular3Title')}</div>
                    <div className="ds-svg-card-description">
                      {t('granular3Desc')}
                    </div>
                  </div>
                  <img src="/images/b2b_saas_granular-control-travel.svg" loading="lazy" alt="" />
                </div>
                <div className="svg-card">
                  <img src="/images/b2b_saas_granular-control-IPACLs.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('granular4Title')}</div>
                    <div className="ds-svg-card-description">
                      {t('granular4Desc')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="ds-section">
            <div className="ds-container">
              <div className="title-content">
                <h2 className="heading-on-light">
                  {t('freeTrialTitle')}
                </h2>
                <p className="section-lede-on-light">
                  {t('freeTrialDesc')}
                </p>
              </div>
              <div className="ds-grid-2">
                <div className="svg-card">
                  <img src="/images/b2b_saas_freetrial-support.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('freeTrial1Title')}</div>
                    <div className="ds-svg-card-description">
                      {t('freeTrial1Desc')}
                    </div>
                  </div>
                </div>
                <div className="svg-card">
                  <img src="/images/b2b_saas_freetrial-reduce.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('freeTrial2Title')}</div>
                    <div className="ds-svg-card-description">
                      {t('freeTrial2Desc')}
                    </div>
                  </div>
                </div>
                <div className="svg-card">
                  <img src="/images/b2b_saas_freetrial-security.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('freeTrial3Title')}</div>
                    <div className="ds-svg-card-description">
                      {t('freeTrial3Desc')}
                    </div>
                  </div>
                </div>
                <div className="svg-card">
                  <img src="/images/b2b_saas_freetrial-experience.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('freeTrial4Title')}</div>
                    <div className="ds-svg-card-description">
                      {t('freeTrial4Desc')}
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
