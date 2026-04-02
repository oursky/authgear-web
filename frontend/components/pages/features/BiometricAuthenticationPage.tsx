import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import ContactForm from '@/components/ContactForm';
import BiometricMethodsTabs from '@/components/pages/features/BiometricMethodsTabs';

interface Props {
  locale: string;
}

export default function BiometricAuthenticationPage(_props: Props) {
  const t = useTranslations('BiometricAuthentication');
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
                      href="https://portal.authgear.com/?utm_source=feature-biometric&utm_medium=link&utm_campaign=start-for-free"
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
                  <div className="ds-hero-banner__footnote">
                    <img src="/images/features-hero-banner-check-purple.svg" loading="lazy" alt="" />
                    <p className="ds-hero-banner__footnote-copy">
                      {t('freePlanIncludes')} <strong>{t('unlimitedMAUs')}</strong>
                    </p>
                  </div>
                </div>
                <img
                  className="ds-hero-banner__media"
                  src="/images/features-biometric-hero-kv.svg"
                  width={738}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ds-section b2c-ciam-solution-section-dark-bg">
        <div className="ds-container">
          <div className="title-content">
            <h2 className="heading-on-dark">{t('whatIsTitle')}</h2>
            <p className="section-lede-on-dark"><span className="text-bold">{t('whatIsBold')}</span> {t('whatIsDesc')}</p>
          </div>
          <div className="ds-grid-2">
            <div className="svg-card svg-card-glass">
              <img src="/images/features-biometric-whatis-enhanced.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('card1Title')}</div>
                <div className="ds-svg-card-description">{t('card1Desc')}</div>
              </div>
            </div>
            <div className="svg-card svg-card-glass">
              <img src="/images/features-biometric-whatis-experience.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('card2Title')}</div>
                <div className="ds-svg-card-description">{t('card2Desc')}</div>
              </div>
            </div>
            <div className="svg-card svg-card-glass">
              <img src="/images/features-biometric-whatis-stronger.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('card3Title')}</div>
                <div className="ds-svg-card-description">{t('card3Desc')}</div>
              </div>
            </div>
            <div className="svg-card svg-card-glass">
              <img src="/images/features-biometric-whatis-access.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('card4Title')}</div>
                <div className="ds-svg-card-description">{t('card4Desc')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ds-section ds-bg-light-blue">
        <div className="ds-container">
          <div className="title-content">
            <h2 className="heading-on-light">{t('methodsTitle')}</h2>
            <p className="section-lede-on-light">{t('methodsDesc')}</p>
          </div>
          <BiometricMethodsTabs
            ariaLabel={t('methodsTitle')}
            tabs={[
              {
                label: t('tab1'),
                panelTitle: t('fp_title'),
                panelDescription: t('fp_desc'),
                cards: [
                  { img: '/images/features-biometric-methods-fingerprint-accuracy.svg', title: t('fp_card1Title'), description: t('fp_card1Desc') },
                  { img: '/images/features-biometric-methods-fingerprint-wideavailability.svg', title: t('fp_card2Title'), description: t('fp_card2Desc') },
                  { img: '/images/features-biometric-methods-fingerprint-authentication.svg', title: t('fp_card3Title'), description: t('fp_card3Desc') },
                ],
              },
              {
                label: t('tab2'),
                panelTitle: t('fa_title'),
                panelDescription: t('fa_desc'),
                cards: [
                  { img: '/images/facial_authentication-faceid.svg', title: t('fa_card1Title'), description: t('fa_card1Desc') },
                  { img: '/images/facial-recognition.svg', title: t('fa_card2Title'), description: t('fa_card2Desc') },
                  { img: '/images/liveness-recognition.svg', title: t('fa_card3Title'), description: t('fa_card3Desc') },
                ],
              },
            ]}
          />
        </div>
      </section>
      <section className="ds-section ds-bg-white">
        <div className="ds-container ds-container--split-stack ds-container--split-stack--title-gap-m">
          <div className="title-content">
            <h2 className="heading-on-light">{t('flowTitle')}</h2>
            <p className="section-lede-on-light">{t('flowDesc')}</p>
          </div>
          <div className="ds-split-stack__rows">
            <div className="ds-split ds-split-row ds-split-row--reverse">
              <div className="ds-split-row__media">
                <img src="/images/features-biometric-flow-key.svg" loading="lazy" width={624} alt="" className="ds-split-row__img" />
              </div>
              <div className="ds-split-row__body">
                <h3 className="heading-on-light">{t('flow1Title')}</h3>
                <p className="section-lede-on-light">{t('flow1Desc')}</p>
                <ul role="list" className="ds-body-bullet-list">
                  <li>{t('flow1Item1')}</li>
                  <li>{t('flow1Item2')}</li>
                </ul>
              </div>
            </div>
            <div className="ds-split ds-split-row">
              <div className="ds-split-row__media">
                <img src="/images/features-biometric-flow-authentication.svg" loading="lazy" width={624} alt="" className="ds-split-row__img" />
              </div>
              <div className="ds-split-row__body">
                <h3 className="heading-on-light">{t('flow2Title')}</h3>
                <ul role="list" className="ds-body-bullet-list">
                  <li>{t('flow2Item1')}</li>
                  <li>{t('flow2Item2')}</li>
                  <li>{t('flow2Item3')}</li>
                  <li>{t('flow2Item4')}</li>
                </ul>
              </div>
            </div>
            <div className="ds-split ds-split-row ds-split-row--reverse">
              <div className="ds-split-row__media">
                <img src="/images/features-biometric-flow-server.svg" loading="lazy" width={624} alt="" className="ds-split-row__img" />
              </div>
              <div className="ds-split-row__body">
                <h3 className="heading-on-light">{t('flow3Title')}</h3>
                <ul role="list" className="ds-body-bullet-list">
                  <li>{t('flow3Item1')}</li>
                  <li>{t('flow3Item2')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ds-section">
        <div className="ds-container">
          <div className="title-content">
            <h2 className="heading-on-light">{t('compareTitle')}</h2>
            <p className="section-lede-on-light">{t('compareDesc')}</p>
          </div>
          <div className="ds-compare-table-wrapper">
            <table className="ds-compare-table">
              <thead>
                <tr>
                  <th>{t('compareFeature')}</th>
                  <th>{t('comparePassword')}</th>
                  <th>{t('compareBiometric')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{t('compareSecurity')}</td>
                  <td>{t('compareSecurityPassword')}</td>
                  <td>{t('compareSecurityBiometric')}</td>
                </tr>
                <tr>
                  <td>{t('compareConvenience')}</td>
                  <td>{t('compareConveniencePassword')}</td>
                  <td>{t('compareConvenienceBiometric')}</td>
                </tr>
                <tr>
                  <td>{t('compareUX')}</td>
                  <td>{t('compareUXPassword')}</td>
                  <td>{t('compareUXBiometric')}</td>
                </tr>
                <tr>
                  <td>{t('compareCost')}</td>
                  <td>{t('compareCostPassword')}</td>
                  <td>{t('compareCostBiometric')}</td>
                </tr>
                <tr>
                  <td>{t('compareAcceptance')}</td>
                  <td>{t('compareAcceptancePassword')}</td>
                  <td>{t('compareAcceptanceBiometric')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
  <div className="bg-f9f9fb passkey-feature">
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">{t('enterpriseTitle')}</h2>
          <p className="paragraph-large text-center features-page-v2">{t('enterpriseDesc')}</p>
        </div>
        <div className="_3-card-grid row-gap-64">
          <div className="svg-card p-0 gap-6 bg-transparent">
            <div className="svg-card-image-container mb-18"><img loading="lazy" src="/images/features-biometric-authentications-financial.svg" alt="" /></div>
            <div className="svg-card-content-title ibm-plex-sans color-2b2b2b size-22">{t('enterprise1Title')}</div>
            <div className="svg-card-content-container">
              <div className="svg-card-content-description m-sm">{t('enterprise1Desc')}</div>
            </div>
          </div>
          <div className="svg-card p-0 gap-6 bg-transparent">
            <div className="svg-card-image-container mb-18"><img loading="lazy" src="/images/features-biometric-authentications-healthcare.svg" alt="" /></div>
            <div className="svg-card-content-title ibm-plex-sans color-2b2b2b size-22">{t('enterprise2Title')}</div>
            <div className="svg-card-content-container">
              <div className="svg-card-content-description m-sm">{t('enterprise2Desc')}</div>
            </div>
          </div>
          <div className="svg-card p-0 gap-6 bg-transparent">
            <div className="svg-card-image-container mb-18"><img loading="lazy" src="/images/features-biometric-authentications-passport.svg" alt="" /></div>
            <div className="svg-card-content-title ibm-plex-sans color-2b2b2b size-22">{t('enterprise3Title')}</div>
            <div className="svg-card-content-container">
              <div className="svg-card-content-description m-sm">{t('enterprise3Desc')}</div>
            </div>
          </div>
          <div className="svg-card p-0 gap-6 bg-transparent">
            <div className="svg-card-image-container mb-18"><img loading="lazy" src="/images/features-biometric-authentications-enterprise.svg" alt="" /></div>
            <div className="svg-card-content-title ibm-plex-sans color-2b2b2b size-22">{t('enterprise4Title')}</div>
            <div className="svg-card-content-container">
              <div className="svg-card-content-description m-sm">{t('enterprise4Desc')}</div>
            </div>
          </div>
          <div className="svg-card p-0 gap-6 bg-transparent">
            <div className="svg-card-image-container mb-18"><img loading="lazy" src="/images/features-biometric-authentications-mobile.svg" alt="" /></div>
            <div className="svg-card-content-title ibm-plex-sans color-2b2b2b size-22">{t('enterprise5Title')}</div>
            <div className="svg-card-content-container">
              <div className="svg-card-content-description m-sm">{t('enterprise5Desc')}</div>
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
