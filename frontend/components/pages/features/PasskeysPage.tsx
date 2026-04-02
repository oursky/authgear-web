import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import ContactForm from '@/components/ContactForm';
import MfaOptionsTabs from './MfaOptionsTabs';

interface Props {
  locale: string;
}

const PASSKEYS_ENTERPRISE_CARDS = [
  {
    img: '/images/features-passkeys-security-icon-employee.svg',
    titleKey: 'enterprise1Title',
    descKey: 'enterprise1Desc',
  },
  {
    img: '/images/features-passkeys-security-icon-security.svg',
    titleKey: 'enterprise2Title',
    descKey: 'enterprise2Desc',
  },
  {
    img: '/images/features-passkeys-security-icon-management.svg',
    titleKey: 'enterprise3Title',
    descKey: 'enterprise3Desc',
  },
  {
    img: '/images/features-passkeys-security-icon-compilance.svg',
    titleKey: 'enterprise4Title',
    descKey: 'enterprise4Desc',
  },
  {
    img: '/images/features-passkeys-security-icon-cost.svg',
    titleKey: 'enterprise5Title',
    descKey: 'enterprise5Desc',
  },
] as const;

const PASSKEYS_HOW_TO_IMAGES = [
  '/images/features-passkeys-howtocreate-01-01.svg',
  '/images/features-passkeys-howtocreate-02-01.svg',
  '/images/features-passkeys-howtocreate-03-01.svg',
  '/images/features-passkeys-howtocreate-04-01.svg',
] as const;

export default function PasskeysPage(_props: Props) {
  const t = useTranslations('Passkeys');
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
                      href="https://portal.authgear.com/?utm_source=feature-passkey&amp;utm_medium=link&amp;utm_campaign=start-for-free"
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
                <img className="ds-hero-banner__media" src="/images/passkey-hero-kv.svg" width={738} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ds-section passkeys-video-section-bg">
        <div className="ds-container">
          <div className="title-content">
            <h2 className="heading-on-dark">
              {t('whatIsTitle')}
              <br />
              {t('whatIsTitleHighlight')}
            </h2>
            <p className="section-lede-on-dark">{t('whatIsDescription')}</p>
          </div>
          <div className="ds-video-embed">
            <iframe
              src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2F6IrX59CwWN4%3Ffeature%3Doembed&display_name=YouTube&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D6IrX59CwWN4&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2F6IrX59CwWN4%2Fhqdefault.jpg&key=96f1f04c5f4143bcb0f2e68c87d65feb&type=text%2Fhtml&schema=youtube"
              title="What is Apple Passkey? - Explained in 100 seconds"
              allowFullScreen
            />
          </div>
        </div>
      </section>
      <section className="ds-section b2c-ciam-solution-section-dark-bg">
        <div className="ds-container ds-container--split-stack">
          <div className="ds-split ds-split-row">
            <div className="ds-split-row__media">
              <img
                src="/images/features-passkeys-api.svg"
                loading="lazy"
                width={624}
                alt=""
                className="ds-split-row__img"
              />
            </div>
            <div className="ds-split-row__body">
              <h2 className="heading-on-dark">{t('apiTitle')}</h2>
              <p className="section-lede-on-dark">{t('apiDesc')}</p>
              <Link href="/schedule-demo" className="ds-btn ds-btn-outline-light">
                {t('learnMore')}
                <ArrowRightIcon className="ds-btn__icon-arrow" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="ds-section ds-bg-white">
        <div className="ds-container">
          <div className="title-content">
            <h2 className="heading-on-light">
              {t('elevateTitle')}
              <br />
              {t('elevateTitleHighlight')}
            </h2>
            <p className="section-lede-on-light">{t('elevateDescription')}</p>
          </div>
          <div className="ds-grid-3">
            <div className="svg-card">
              <img src="/images/features-passkeys-authentication-icon-setup.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('benefit1Title')}</div>
                <div className="ds-svg-card-description">{t('benefit1Desc')}</div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/features-passkeys-authentication-icon-secutiry.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('benefit2Title')}</div>
                <div className="ds-svg-card-description">{t('benefit2Desc')}</div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/features-passkeys-authentication-icon-ux.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('benefit3Title')}</div>
                <div className="ds-svg-card-description">{t('benefit3Desc')}</div>
              </div>
            </div>
          </div>
          <a
            href="/post/passkey-vs-password-why-passkeys-are-the-future-of-security"
            className="ds-btn ds-btn-subtle"
          >
            {t('readBlog')}
            <ArrowRightIcon className="ds-btn__icon-arrow" aria-hidden />
          </a>
        </div>
      </section>
      <section className="ds-section ds-bg-white">
        <div className="ds-container">
          <div className="title-content">
            <h2 className="heading-on-light">
              {t('howToCreateTitle')}
              <br />
              {t('howToCreateTitleHighlight')}
            </h2>
            <p className="section-lede-on-light">{t('howToCreateDescription')}</p>
          </div>
          <MfaOptionsTabs
            tabLabels={[t('tab1Title'), t('tab2Title'), t('tab3Title'), t('tab4Title')] as [string, string, string, string]}
            imageSources={PASSKEYS_HOW_TO_IMAGES}
            ariaLabel={t('passkeysHowToTabsAriaLabel')}
          />
        </div>
      </section>
      <section className="ds-section ds-bg-light-blue">
        <div className="ds-container">
          <div className="title-content">
            <h2 className="heading-on-light">
              {t('enterpriseTitle')}
              <br />
              {t('enterpriseTitleHighlight')}
            </h2>
            <p className="section-lede-on-light">{t('enterpriseDescription')}</p>
          </div>
          <div className="ds-grid-3 passkeys-enterprise-cards">
            {PASSKEYS_ENTERPRISE_CARDS.map((card) => (
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
