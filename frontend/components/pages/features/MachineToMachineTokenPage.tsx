import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import ContactForm from '@/components/ContactForm';

interface Props {
  locale: string;
}

export default function MachineToMachineTokenPage(_props: Props) {
  const t = useTranslations('MachineToMachineToken');
  const tFeatures = useTranslations('Features');
  return (
    <>
      <section className="ds-hero-banner--dark">
        <div className="ds-container ds-container--hero">
          <div className="ds-hero-banner__row">
            <div className="ds-hero-banner__body">
              <p className="ds-section-eyebrow ds-section-eyebrow--on-dark">{t('heroSmallTitle')}</p>
              <h1 className="ds-hero-banner__title">{t('heroTitle')}</h1>
              <p className="ds-hero-banner__description">{t('heroDescription')}</p>
              <div className="ds-hero-banner__ctas">
                <a
                  href="https://portal.authgear.com/?utm_source=feature-m2m&utm_medium=link&utm_campaign=start-for-free"
                  target="_blank"
                  rel="noreferrer"
                  className="ds-btn ds-btn-secondary"
                >
                  {tFeatures('startForFree')}
                  <ArrowRightIcon className="ds-btn__icon-arrow" aria-hidden />
                </a>
                <Link href="/schedule-demo" target="_blank" rel="noreferrer" className="ds-btn ds-btn-tertiary">
                  {tFeatures('scheduleDemo')}
                  <ArrowRightIcon className="ds-btn__icon-arrow" aria-hidden />
                </Link>
              </div>
            </div>
            <div className="ds-hero-banner__media">
              <div
                className="lottie-hero-animation"
                data-animation-type="lottie"
                data-src="/documents/features-M2M-hero-kv.json"
                data-loop="0"
                data-direction="1"
                data-autoplay="1"
                data-is-ix2-target="0"
                data-renderer="svg"
                data-default-duration="0"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="ds-section mm-empower-section-bg">
        <div className="ds-container">
          <div className="title-content">
            <h2 className="heading-on-dark">{t('whatIsTitle')}</h2>
            <p className="section-lede-on-dark">{t('whatIsDesc')}</p>
            <a
              href="https://docs.authgear.com/get-started/m2m-applications"
              target="_blank"
              rel="noreferrer"
              className="ds-btn ds-btn-outline-light"
            >
              {t('whatIsReadDocs')}
            </a>
          </div>
        </div>
      </section>
      <section className="ds-section ds-bg-light-blue">
        <div className="ds-container">
          <div className="title-content">
            <h2 className="heading-on-light">{t('benefitsTitle')}</h2>
          </div>
          <div className="ds-grid-3">
            <div className="svg-card">
              <img src="/images/features-selfserve-cx-security.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('benefit1Title')}</div>
                <div className="ds-svg-card-description">{t('benefit1Desc')}</div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/features-M2M-benefits-automated.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('benefit2Title')}</div>
                <div className="ds-svg-card-description">{t('benefit2Desc')}</div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/features-M2M-benefits-accesscontrol.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('benefit3Title')}</div>
                <div className="ds-svg-card-description">{t('benefit3Desc')}</div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/features-M2M-benefits-scalable.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('benefit4Title')}</div>
                <div className="ds-svg-card-description">{t('benefit4Desc')}</div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/features-M2M-benefits-comliance.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('benefit5Title')}</div>
                <div className="ds-svg-card-description">{t('benefit5Desc')}</div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/features-M2M-benefits-tools.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('benefit6Title')}</div>
                <div className="ds-svg-card-description">{t('benefit6Desc')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ds-section ds-bg-white">
        <div className="ds-container ds-container--split-stack ds-container--split-stack--title-gap-m">
          <div className="title-content">
            <h2 className="heading-on-light">{t('useCasesTitle')}</h2>
          </div>
          <div className="ds-split-stack__rows">
            <div className="ds-split ds-split-row">
              <div className="ds-split-row__media">
                <img src="/images/features-M2M-usercase-backends.svg" loading="lazy" width={624} alt="" className="ds-split-row__img" />
              </div>
              <div className="ds-split-row__body">
                <h3 className="heading-on-light">{t('useCase1Title')}</h3>
                <p className="section-lede-on-light">{t('useCase1Desc')}</p>
              </div>
            </div>
            <div className="ds-split ds-split-row ds-split-row--reverse">
              <div className="ds-split-row__media">
                <img src="/images/features-M2M-usercase-clitools.svg" loading="lazy" width={624} alt="" className="ds-split-row__img" />
              </div>
              <div className="ds-split-row__body">
                <h3 className="heading-on-light">{t('useCase2Title')}</h3>
                <p className="section-lede-on-light">{t('useCase2Desc')}</p>
              </div>
            </div>
            <div className="ds-split ds-split-row">
              <div className="ds-split-row__media">
                <img src="/images/features-M2M-usercase-scheduled.svg" loading="lazy" width={624} alt="" className="ds-split-row__img" />
              </div>
              <div className="ds-split-row__body">
                <h3 className="heading-on-light">{t('useCase3Title')}</h3>
                <p className="section-lede-on-light">{t('useCase3Desc')}</p>
              </div>
            </div>
            <div className="ds-split ds-split-row ds-split-row--reverse">
              <div className="ds-split-row__media">
                <img src="/images/features-M2M-usercase-iot.svg" loading="lazy" width={624} alt="" className="ds-split-row__img" />
              </div>
              <div className="ds-split-row__body">
                <h3 className="heading-on-light">{t('useCase4Title')}</h3>
                <p className="section-lede-on-light">{t('useCase4Desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ds-section ds-bg-light-blue">
        <div className="ds-container ds-container--split-stack ds-container--split-stack--title-gap-m">
          <div className="title-content">
            <h2 className="heading-on-light">{t('howItWorksTitle')}</h2>
          </div>
          <div className="ds-split-stack__rows">
            <div className="ds-split ds-split-row ds-split-row--surface-light">
              <div className="ds-split-row__media">
                <img src="/images/features-M2M-how-register-resources.svg" loading="lazy" width={624} alt="" className="ds-split-row__img" />
              </div>
              <div className="ds-split-row__body">
                <h3 className="heading-on-light">{t('howStep1Title')}</h3>
                <p className="section-lede-on-light">{t('howStep1Desc')}</p>
              </div>
            </div>
            <div className="ds-split ds-split-row ds-split-row--reverse ds-split-row--surface-light">
              <div className="ds-split-row__media">
                <img src="/images/features-M2M-how-register-application.svg" loading="lazy" width={624} alt="" className="ds-split-row__img" />
              </div>
              <div className="ds-split-row__body">
                <h3 className="heading-on-light">{t('howStep2Title')}</h3>
                <p className="section-lede-on-light">{t('howStep2Desc')}</p>
              </div>
            </div>
            <div className="ds-split ds-split-row ds-split-row--surface-light">
              <div className="ds-split-row__media">
                <img src="/images/features-M2M-how-obtain.svg" loading="lazy" width={624} alt="" className="ds-split-row__img" />
              </div>
              <div className="ds-split-row__body">
                <h3 className="heading-on-light">{t('howStep3Title')}</h3>
                <p className="section-lede-on-light">{t('howStep3Desc')}</p>
              </div>
            </div>
            <div className="ds-split ds-split-row ds-split-row--reverse ds-split-row--surface-light">
              <div className="ds-split-row__media">
                <img src="/images/features-M2M-how-token.svg" loading="lazy" width={624} alt="" className="ds-split-row__img" />
              </div>
              <div className="ds-split-row__body">
                <h3 className="heading-on-light">{t('howStep4Title')}</h3>
                <p className="section-lede-on-light">{t('howStep4Desc1')}<code>{t('howStep4Code')}</code>{t('howStep4Desc2')}</p>
              </div>
            </div>
            <div className="ds-split ds-split-row ds-split-row--surface-light">
              <div className="ds-split-row__media">
                <img src="/images/features-M2M-how-access-api.svg" loading="lazy" width={624} alt="" className="ds-split-row__img" />
              </div>
              <div className="ds-split-row__body">
                <h3 className="heading-on-light">{t('howStep5Title')}</h3>
                <p className="section-lede-on-light">{t('howStep5Desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ds-section ds-bg-light-blue">
        <div className="ds-container">
          <div className="title-content">
            <h2 className="heading-on-light">{t('faqTitle')}</h2>
          </div>
          <div className="ds-faq">
            <div className="ds-faq__item">
              <h4 className="ds-faq__question">{t('faq1Question')}</h4>
              <p className="ds-faq__answer">{t('faq1AnswerPre')}<strong>{t('faq1AnswerBold')}</strong>{t('faq1AnswerPost')}</p>
            </div>
            <div className="ds-faq__item">
              <h4 className="ds-faq__question">{t('faq2Question')}</h4>
              <p className="ds-faq__answer">{t('faq2AnswerPre')}<strong>{t('faq2AnswerBold')}</strong>{t('faq2AnswerPost')}</p>
            </div>
            <div className="ds-faq__item">
              <h4 className="ds-faq__question">{t('faq3Question')}</h4>
              <p className="ds-faq__answer">{t('faq3Answer')}</p>
            </div>
            <div className="ds-faq__item">
              <h4 className="ds-faq__question">{t('faq4Question')}</h4>
              <p className="ds-faq__answer">{t('faq4AnswerPre')}<strong>{t('faq4AnswerBold')}</strong>{t('faq4AnswerPost')}</p>
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
              <h2 className="form-heading color-white footer-form">{t('ctaTitle')}</h2>
              <div className="color-cee9ff">{t('ctaDesc')}</div>
              <div className="footerform__divider-sm"></div>
              <a href="https://portal.authgear.com/?utm_source=feature-m2m&amp;utm_medium=link&amp;utm_campaign=start-for-free" target="_blank" className="footer-link w-inline-block">
                <div className="color-white footer-get-started-text">{t('ctaLink')} &gt;</div>
              </a>
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
