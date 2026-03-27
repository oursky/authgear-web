import Link from 'next/link';
import { useTranslations } from 'next-intl';
import ContactForm from '@/components/ContactForm';

interface Props {
  locale: string;
}

export default function SmsPumpingFraudPage(_props: Props) {
  const t = useTranslations('SmsPumpingFraud');
  const tFeatures = useTranslations('Features');
  return (
    <>
<div className="featurespage__hero_v2 featurespage__hero_bg inverse">
    <div className="features-hero-wrapper-new">
      <div className="split-content features-hero-left">
        <div className="coming-soon">{t('comingSoon')}</div>
        <div className="featurespage__hero-titletag inverse">{t('heroSmallTitle')}</div>
        <h1 className="title features-hero-v2 inverse">{t('heroTitle')}</h1>
        <p className="features-hero-description inverse">{t('heroDescription')}</p>
        <div className="features-hero-cta-wrapper">
          <a href="https://portal.authgear.com/?utm_source=feature-sms-pumping&amp;utm_medium=link&amp;utm_campaign=start-for-free" target="_blank" className="button-primary feature-hero-btn-v2 w-button">{tFeatures('startForFree')}</a>
          <Link href="/schedule-demo" target="_blank" className="button-secondary feature-hero-btn-v2 noscale inverse w-button">{tFeatures('scheduleDemo')}  <span className="text-span-23">{">"}</span></Link>
        </div>
      </div><img src="/images/features-SMSfraud-hero-kv.svg" alt="" className="image features-hero-image-v2" />
    </div>
  </div>
  <div className="bg-f9f9fb">
    <div className="container-default wider-container-default">
      <div className="container-default-inner px-0 gap-0 pb-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">{t('threatTitle')}</h2>
          <p className="paragraph-large text-center features-page-v2 margin-auto">{t('threatDescription')}</p>
        </div>
        <div className="w-layout-hflex case-study-card">
          <div className="w-layout-vflex flex-block-67">
            <div className="text-block-65">{t('caseStudyTitle')}</div>
            <div className="text-block-66">{t('caseStudyDescription')}</div>
          </div><img src="/images/features-SMSfraud-X2x.jpg" loading="lazy" sizes="(max-width: 1400px) 100vw, 1400px" srcSet="/images/features-SMSfraud-X2x-p-500.jpg 500w, /images/features-SMSfraud-X2x-p-800.jpg 800w, /images/features-SMSfraud-X2x-p-1080.jpg 1080w, /images/features-SMSfraud-X2x.jpg 1400w" alt="" />
        </div>
      </div>
    </div>
  </div>
  <div>
    <div className="container-default wider-container-default">
      <div className="container-default-inner px-0 gap-0 pb-0">
        <div className="top-content feature-flex">
          <h2 className="title features-page-v2">{t('devastateTitle')}<br />{t('devastateTitleLine2')}</h2>
        </div>
        <div className="features-flex-container gap-40 reverse-order reverse-again">
          <div className="solution-image-block"><img src="/images/features-SMSfraud-how-FinancialDrain.svg" loading="lazy" alt="" /></div>
          <div className="features-text-block p-0">
            <h3 className="features-h3-dark">{t('financialDrainTitle')}</h3>
            <div className="gradient-divider"></div>
            <div className="color-626262 line-height-24px">{t('financialDrainDesc')}</div>
          </div>
        </div>
        <div className="features-flex-container gap-40 reverse-again">
          <div className="solution-image-block"><img src="/images/features-SMSfraud-how-OperationalDisruption.svg" loading="lazy" alt="" /></div>
          <div className="features-text-block p-0">
            <h3 className="features-h3-dark">{t('operationalTitle')}</h3>
            <div className="gradient-divider"></div>
            <div className="color-626262 line-height-24px">{t('operationalDesc')}</div>
            <ul role="list" className="_2-block-flex-content-list">
              <li className="_2-block-flex-content-list-item line-height-24px with-subcontent cross-icon">{t('listItem1')}<br /><span className="list-subcontent">{t('listItem1Sub')}</span></li>
              <li className="_2-block-flex-content-list-item line-height-24px with-subcontent cross-icon">{t('listItem2')}<br /><span className="list-subcontent">{t('listItem2Sub')}</span></li>
              <li className="_2-block-flex-content-list-item line-height-24px with-subcontent cross-icon">{t('listItem3')}<br /><span className="list-subcontent">{t('listItem3Sub')}</span></li>
              <li className="_2-block-flex-content-list-item line-height-24px with-subcontent cross-icon">{t('listItem4')}<br /><span className="list-subcontent">{t('listItem4Sub')}</span></li>
            </ul>
          </div>
        </div>
        <div className="features-flex-container gap-40 reverse-order reverse-again">
          <div className="solution-image-block"><img src="/images/features-SMSfraud-how-ReputationDamage.svg" loading="lazy" alt="" /></div>
          <div className="features-text-block p-0">
            <h3 className="features-h3-dark">{t('reputationTitle')}</h3>
            <div className="gradient-divider"></div>
            <div className="color-626262 line-height-24px">{t('reputationDesc')}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div className="container-default wider-container-default">
      <div className="container-default-inner px-0 gap-0 pb-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">{t('warningSectionTitle')}<br />{t('warningSectionTitleLine2')}</h2>
          <p className="paragraph-large text-center features-page-v2">{t('warningSectionDesc')}</p>
        </div>
        <div className="w-layout-hflex flex-block-68"><img src="/images/features-SMSfraud-WaringSigns.svg" loading="lazy" alt="" />
          <div className="faq2_component-2 _1060">
            <div className="faq2_accordion-2">
              <div className="faq2_question-2 first pumping-fraud-faq">
                <div className="div-block-18"><img loading="lazy" src="/images/arrow-icon.svg" alt="" className="faq2_icon-2 nospin" /></div>
                <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">{t('warning1Title')}</div><img src="/images/features-SMSfraud-WaringSigns-icon-geographic.svg" loading="lazy" width={48} height={48} alt="" className="sms-signs-icon" />
              </div>
              <div style={{height: "0px"}} className="faq2_answer">
                <div className="margin-bottom">
                  <div className="max-width-large once-faq">
                    <p className="referral-faq-a-2 pumping-fraud-faq-a">{t('warning1Desc')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="faq2_accordion-2 margin-top-32">
              <div className="faq2_question-2 first pumping-fraud-faq">
                <div className="div-block-18"><img loading="lazy" src="/images/arrow-icon.svg" alt="" className="faq2_icon-2 nospin" /></div>
                <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">{t('warning2Title')}</div><img src="/images/features-SMSfraud-WaringSigns-icon-traffic.svg" loading="lazy" alt="" className="sms-signs-icon" />
              </div>
              <div style={{height: "0px"}} className="faq2_answer">
                <div className="margin-bottom">
                  <div className="max-width-large once-faq">
                    <p className="referral-faq-a-2 pumping-fraud-faq-a">{t('warning2Desc')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="faq2_accordion-2 margin-top-32">
              <div className="faq2_question-2 first pumping-fraud-faq">
                <div className="div-block-18"><img loading="lazy" src="/images/arrow-icon.svg" alt="" className="faq2_icon-2 nospin" /></div>
                <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">{t('warning3Title')}</div><img src="/images/features-SMSfraud-WaringSigns-icon-number.svg" loading="lazy" alt="" className="sms-signs-icon" />
              </div>
              <div style={{height: "0px"}} className="faq2_answer">
                <div className="margin-bottom">
                  <div className="max-width-large once-faq">
                    <p className="referral-faq-a-2 pumping-fraud-faq-a">{t('warning3Desc')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="faq2_accordion-2 margin-top-32">
              <div className="faq2_question-2 first pumping-fraud-faq">
                <div className="div-block-18"><img loading="lazy" src="/images/arrow-icon.svg" alt="" className="faq2_icon-2 nospin" /></div>
                <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">{t('warning4Title')}</div><img src="/images/features-SMSfraud-WaringSigns-icon-conversion.svg" loading="lazy" alt="" className="sms-signs-icon" />
              </div>
              <div style={{height: "0px"}} className="faq2_answer">
                <div className="margin-bottom">
                  <div className="max-width-large once-faq">
                    <p className="referral-faq-a-2 pumping-fraud-faq-a">{t('warning4Desc')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="faq2_accordion-2 margin-top-32">
              <div className="faq2_question-2 first pumping-fraud-faq">
                <div className="div-block-18"><img loading="lazy" src="/images/arrow-icon.svg" alt="" className="faq2_icon-2 nospin" /></div>
                <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">{t('warning5Title')}</div><img src="/images/features-SMSfraud-WaringSigns-icon-budget.svg" loading="lazy" alt="" className="sms-signs-icon" />
              </div>
              <div style={{height: "0px"}} className="faq2_answer">
                <div className="margin-bottom">
                  <div className="max-width-large once-faq">
                    <p className="referral-faq-a-2 pumping-fraud-faq-a">{t('warning5Desc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="bg-f3f6ff">
    <div className="container-default wider-container-default">
      <div className="w-layout-vflex container-default-inner px-0 gap60">
        <div className="top-content feature-flex">
          <h2 className="title features-page-v2">{t('solutionTitle')}<br />{t('solutionTitleLine2')}</h2>
          <p className="paragraph-large text-center features-page-v2 margin-auto">{t('solutionDesc')}</p>
        </div>
        <div className="w-layout-hflex sms-left-right"><img src="/images/features-SMSfraud-features-RealTime.svg" loading="lazy" alt="" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">{t('feature1Title')}</div>
            <div className="color-626262 line-height-24px">{t('feature1Desc')}</div>
          </div>
        </div>
        <div className="w-layout-hflex sms-left-right reverse"><img src="/images/features-SMSfraud-features-IntelligentPatternRecognition.svg" loading="lazy" alt="" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">{t('feature2Title')}</div>
            <div className="color-626262 line-height-24px">{t('feature2Desc')}</div>
          </div>
        </div>
        <div className="w-layout-hflex sms-left-right"><img src="/images/features-SMSfraud-features-AutomatedThreatResponse.svg" loading="lazy" alt="" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">{t('feature3Title')}</div>
            <div className="color-626262 line-height-24px">{t('feature3Desc')}</div>
          </div>
        </div>
        <div className="w-layout-hflex sms-left-right reverse"><img src="/images/features-SMSfraud-features-CustomizableSecurityPolicies.svg" loading="lazy" alt="" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">{t('feature4Title')}</div>
            <div className="color-626262 line-height-24px">{t('feature4Desc')}</div>
          </div>
        </div>
        <div className="w-layout-hflex sms-left-right"><img src="/images/features-SMSfraud-features-DetailedAnalyticsDashboard.svg" loading="lazy" alt="" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">{t('feature5Title')}</div>
            <div className="color-626262 line-height-24px">{t('feature5Desc')}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="bg-f3f6ff">
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">{t('whyTitle')}<br />{t('whyTitleLine2')}</h2>
        </div>
        <div className="_2-card-grid gap-32 mb-40 _2-rows">
          <div id="w-node-ab065274-56a3-587d-2df4-75ff4e52d6d5-3eea4af0" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-SMSfraud-why-security.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">{t('why1Title')}</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">{t('why1Desc')}</div>
            </div>
          </div>
          <div id="w-node-ab065274-56a3-587d-2df4-75ff4e52d6dd-3eea4af0" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/b2b-saas-why-customized.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">{t('why2Title')}</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">{t('why2Desc')}</div>
            </div>
          </div>
          <div id="w-node-f3362fce-81ce-e37b-862e-afd3f1ab873a-3eea4af0" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-SMSfraud-why-ux.svg" loading="lazy" width={48} alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">{t('why3Title')}</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">{t('why3Desc')}</div>
            </div>
          </div>
          <div id="w-node-_7dcc6254-c236-0d2a-6aec-2b64a8f8b29f-3eea4af0" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-SMSfraud-WaringSigns-icon-budget.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">{t('why4Title')}</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">{t('why4Desc')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
