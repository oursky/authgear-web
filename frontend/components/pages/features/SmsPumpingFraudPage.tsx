import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import ContactForm from '@/components/ContactForm';
import SmsPumpingWarningFaqItem from '@/components/pages/features/SmsPumpingWarningFaqItem';

interface Props {
  locale: string;
}

export default function SmsPumpingFraudPage(_props: Props) {
  const t = useTranslations('SmsPumpingFraud');
  const tFeatures = useTranslations('Features');
  return (
    <>
      <section className="ds-hero-banner--dark">
        <div className="ds-container ds-container--hero">
          <div className="ds-hero-banner__row">
            <div className="ds-hero-banner__body">
              <p className="ds-coming-soon-label">{t('comingSoon')}</p>
              <p className="ds-section-eyebrow ds-section-eyebrow--on-dark">{t('heroSmallTitle')}</p>
              <h1 className="ds-hero-banner__title">{t('heroTitle')}</h1>
              <p className="ds-hero-banner__description">{t('heroDescription')}</p>
              <div className="ds-hero-banner__ctas">
                <a
                  href="https://portal.authgear.com/?utm_source=feature-sms-pumping&utm_medium=link&utm_campaign=start-for-free"
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
            <img
              className="ds-hero-banner__media"
              src="/images/features-SMSfraud-hero-kv.svg"
              width={624}
              alt=""
            />
          </div>
        </div>
      </section>
  <section className="ds-section">
    <div className="ds-container ds-container--max-callout">
      <div className="title-content">
        <h2 className="heading-on-light">{t('threatTitle')}</h2>
        <p className="section-lede-on-light">{t('threatDescription')}</p>
      </div>
      <div className="ds-split ds-split-row ds-split-row--flush">
        <div className="ds-split-row__body ds-split-row__body--surface-card">
          <h4 className="heading-on-light">{t('caseStudyTitle')}</h4>
          <p className="section-lede-on-light">{t('caseStudyDescription')}</p>
        </div>
        <div className="ds-split-row__media">
          <img
            src="/images/features-SMSfraud-X2x.jpg"
            loading="lazy"
            sizes="(max-width: 1400px) 100vw, 1400px"
            srcSet="/images/features-SMSfraud-X2x-p-500.jpg 500w, /images/features-SMSfraud-X2x-p-800.jpg 800w, /images/features-SMSfraud-X2x-p-1080.jpg 1080w, /images/features-SMSfraud-X2x.jpg 1400w"
            width={624}
            alt=""
            className="ds-split-row__img"
          />
        </div>
      </div>
    </div>
  </section>
  <section className="ds-section ds-bg-white">
    <div className="ds-container ds-container--split-stack ds-container--split-stack--title-gap-m">
      <div className="title-content">
        <h2 className="heading-on-light">
          {t('devastateTitle')}
          <br />
          {t('devastateTitleLine2')}
        </h2>
      </div>
      <div className="ds-split-stack__rows">
        <div className="ds-split ds-split-row ds-split-row--reverse">
          <div className="ds-split-row__media">
            <img
              src="/images/features-SMSfraud-how-FinancialDrain.svg"
              loading="lazy"
              width={624}
              alt=""
              className="ds-split-row__img"
            />
          </div>
          <div className="ds-split-row__body">
            <h3 className="heading-on-light">{t('financialDrainTitle')}</h3>
            <p className="section-lede-on-light">{t('financialDrainDesc')}</p>
          </div>
        </div>
        <div className="ds-split ds-split-row">
          <div className="ds-split-row__media">
            <img
              src="/images/features-SMSfraud-how-OperationalDisruption.svg"
              loading="lazy"
              width={624}
              alt=""
              className="ds-split-row__img"
            />
          </div>
          <div className="ds-split-row__body">
            <h3 className="heading-on-light">{t('operationalTitle')}</h3>
            <p className="section-lede-on-light">{t('operationalDesc')}</p>
            <ul role="list" className="ds-stacked-list">
              <li className="ds-stacked-list__item">
                <span className="ds-stacked-list__lead">{t('listItem1')}</span>
                <span className="ds-stacked-list__sub">{t('listItem1Sub')}</span>
              </li>
              <li className="ds-stacked-list__item">
                <span className="ds-stacked-list__lead">{t('listItem2')}</span>
                <span className="ds-stacked-list__sub">{t('listItem2Sub')}</span>
              </li>
              <li className="ds-stacked-list__item">
                <span className="ds-stacked-list__lead">{t('listItem3')}</span>
                <span className="ds-stacked-list__sub">{t('listItem3Sub')}</span>
              </li>
              <li className="ds-stacked-list__item">
                <span className="ds-stacked-list__lead">{t('listItem4')}</span>
                <span className="ds-stacked-list__sub">{t('listItem4Sub')}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="ds-split ds-split-row ds-split-row--reverse">
          <div className="ds-split-row__media">
            <img
              src="/images/features-SMSfraud-how-ReputationDamage.svg"
              loading="lazy"
              width={624}
              alt=""
              className="ds-split-row__img"
            />
          </div>
          <div className="ds-split-row__body">
            <h3 className="heading-on-light">{t('reputationTitle')}</h3>
            <p className="section-lede-on-light">{t('reputationDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="ds-section ds-bg-white">
    <div className="ds-container">
      <div className="title-content">
        <h2 className="heading-on-light">
          {t('warningSectionTitle')}
          <br />
          {t('warningSectionTitleLine2')}
        </h2>
        <p className="section-lede-on-light">{t('warningSectionDesc')}</p>
      </div>
      <div className="ds-sms-warning-signs__surface">
        <div className="ds-sms-warning-signs__layout">
          <div className="ds-sms-warning-signs__illustration">
            <img
              src="/images/features-SMSfraud-WaringSigns.svg"
              loading="lazy"
              alt=""
              className="ds-sms-warning-signs__illustration-img"
            />
          </div>
          <div className="ds-sms-warning-signs__faq">
            <SmsPumpingWarningFaqItem
              title={t('warning1Title')}
              iconSrc="/images/features-SMSfraud-WaringSigns-icon-geographic.svg"
              description={t('warning1Desc')}
            />
            <SmsPumpingWarningFaqItem
              title={t('warning2Title')}
              iconSrc="/images/features-SMSfraud-WaringSigns-icon-traffic.svg"
              description={t('warning2Desc')}
            />
            <SmsPumpingWarningFaqItem
              title={t('warning3Title')}
              iconSrc="/images/features-SMSfraud-WaringSigns-icon-number.svg"
              description={t('warning3Desc')}
            />
            <SmsPumpingWarningFaqItem
              title={t('warning4Title')}
              iconSrc="/images/features-SMSfraud-WaringSigns-icon-conversion.svg"
              description={t('warning4Desc')}
            />
            <SmsPumpingWarningFaqItem
              title={t('warning5Title')}
              iconSrc="/images/features-SMSfraud-WaringSigns-icon-budget.svg"
              description={t('warning5Desc')}
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="ds-section ds-bg-light-blue">
    <div className="ds-container ds-container--split-stack ds-container--split-stack--title-gap-m">
      <div className="title-content">
        <h2 className="heading-on-light">
          {t('solutionTitle')}
          <br />
          {t('solutionTitleLine2')}
        </h2>
        <p className="section-lede-on-light">{t('solutionDesc')}</p>
      </div>
      <div className="ds-split-stack__rows">
      <div className="ds-split ds-split-row ds-split-row--surface-light">
        <div className="ds-split-row__media">
          <img
            src="/images/features-SMSfraud-features-RealTime.svg"
            loading="lazy"
            width={624}
            alt=""
            className="ds-split-row__img"
          />
        </div>
        <div className="ds-split-row__body">
          <h3 className="heading-on-light">{t('feature1Title')}</h3>
          <p className="section-lede-on-light">{t('feature1Desc')}</p>
        </div>
      </div>
      <div className="ds-split ds-split-row ds-split-row--reverse ds-split-row--surface-light">
        <div className="ds-split-row__media">
          <img
            src="/images/features-SMSfraud-features-IntelligentPatternRecognition.svg"
            loading="lazy"
            width={624}
            alt=""
            className="ds-split-row__img"
          />
        </div>
        <div className="ds-split-row__body">
          <h3 className="heading-on-light">{t('feature2Title')}</h3>
          <p className="section-lede-on-light">{t('feature2Desc')}</p>
        </div>
      </div>
      <div className="ds-split ds-split-row ds-split-row--surface-light">
        <div className="ds-split-row__media">
          <img
            src="/images/features-SMSfraud-features-AutomatedThreatResponse.svg"
            loading="lazy"
            width={624}
            alt=""
            className="ds-split-row__img"
          />
        </div>
        <div className="ds-split-row__body">
          <h3 className="heading-on-light">{t('feature3Title')}</h3>
          <p className="section-lede-on-light">{t('feature3Desc')}</p>
        </div>
      </div>
      <div className="ds-split ds-split-row ds-split-row--reverse ds-split-row--surface-light">
        <div className="ds-split-row__media">
          <img
            src="/images/features-SMSfraud-features-CustomizableSecurityPolicies.svg"
            loading="lazy"
            width={624}
            alt=""
            className="ds-split-row__img"
          />
        </div>
        <div className="ds-split-row__body">
          <h3 className="heading-on-light">{t('feature4Title')}</h3>
          <p className="section-lede-on-light">{t('feature4Desc')}</p>
        </div>
      </div>
      <div className="ds-split ds-split-row ds-split-row--surface-light">
        <div className="ds-split-row__media">
          <img
            src="/images/features-SMSfraud-features-DetailedAnalyticsDashboard.svg"
            loading="lazy"
            width={624}
            alt=""
            className="ds-split-row__img"
          />
        </div>
        <div className="ds-split-row__body">
          <h3 className="heading-on-light">{t('feature5Title')}</h3>
          <p className="section-lede-on-light">{t('feature5Desc')}</p>
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
          <br />
          {t('whyTitleLine2')}
        </h2>
      </div>
      <div className="ds-grid-2">
        <div className="svg-card">
          <img src="/images/features-SMSfraud-why-security.svg" loading="lazy" alt="" />
          <div className="ds-svg-card-content">
            <div className="ds-svg-card-title">{t('why1Title')}</div>
            <div className="ds-svg-card-description">{t('why1Desc')}</div>
          </div>
        </div>
        <div className="svg-card">
          <img src="/images/b2b-saas-why-customized.svg" loading="lazy" alt="" />
          <div className="ds-svg-card-content">
            <div className="ds-svg-card-title">{t('why2Title')}</div>
            <div className="ds-svg-card-description">{t('why2Desc')}</div>
          </div>
        </div>
        <div className="svg-card">
          <img src="/images/features-SMSfraud-why-ux.svg" loading="lazy" width={48} alt="" />
          <div className="ds-svg-card-content">
            <div className="ds-svg-card-title">{t('why3Title')}</div>
            <div className="ds-svg-card-description">{t('why3Desc')}</div>
          </div>
        </div>
        <div className="svg-card">
          <img src="/images/features-SMSfraud-WaringSigns-icon-budget.svg" loading="lazy" alt="" />
          <div className="ds-svg-card-content">
            <div className="ds-svg-card-title">{t('why4Title')}</div>
            <div className="ds-svg-card-description">{t('why4Desc')}</div>
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
