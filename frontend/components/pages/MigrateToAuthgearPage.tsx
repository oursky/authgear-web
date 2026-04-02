import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import ContactForm from '@/components/ContactForm';

interface Props {
  locale: string;
}

export default function MigrateToAuthgearPage(_props: Props) {
  const t = useTranslations('MigrateToAuthgear');
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
                  href="https://portal.authgear.com/?utm_source=migrate-to-authgear&utm_medium=link&utm_campaign=start-for-free"
                  target="_blank"
                  rel="noreferrer"
                  className="ds-btn ds-btn-secondary"
                >
                  {t('ctaGetStarted')}
                  <ArrowRightIcon className="ds-btn__icon-arrow" aria-hidden />
                </a>
                <Link href="/schedule-demo" target="_blank" rel="noreferrer" className="ds-btn ds-btn-tertiary">
                  {t('ctaScheduleDemo')}
                  <ArrowRightIcon className="ds-btn__icon-arrow" aria-hidden />
                </Link>
              </div>
            </div>
            <img
              className="ds-hero-banner__media"
              src="/images/migratetoauthgear_kv2x.webp"
              srcSet="/images/migratetoauthgear_kv2x-p-500.webp 500w, /images/migratetoauthgear_kv2x-p-800.webp 800w, /images/migratetoauthgear_kv2x-p-1080.webp 1080w, /images/migratetoauthgear_kv2x.webp 1300w"
              sizes="(max-width: 1300px) 100vw, 1300px"
              width={738}
              alt=""
            />
          </div>
        </div>
      </section>

      <section className="ds-section">
        <div className="ds-container">
          <div className="title-content">
            <h2 className="heading-on-light">
              {t('whyTitle')} <span className="ds-hero-banner__title-accent">{t('whyTitleAccent')}</span>
            </h2>
          </div>
          <div className="ds-grid-2">
            <div className="svg-card">
              <img src="/images/migratetoauthgear_icon-01.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('card1Title')}</div>
                <div className="ds-svg-card-description">{t('card1Desc')}</div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/migratetoauthgear_icon-02.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('card2Title')}</div>
                <div className="ds-svg-card-description">{t('card2Desc')}</div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/migratetoauthgear_icon-03.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('card3Title')}</div>
                <div className="ds-svg-card-description">{t('card3Desc')}</div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/migratetoauthgear_icon-04.svg" loading="lazy" alt="" />
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
            <h2 className="heading-on-light">{t('whoTitle')}</h2>
            <p className="section-lede-on-light">{t('whoDesc')}</p>
          </div>
          <div className="ds-grid-2">
            <div className="svg-card">
              <img src="/images/migratetoauthgear_who-icon-mau.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('who1Title')}</div>
                <div className="ds-svg-card-description">{t('who1Desc')}</div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/migratetoauthgear_who-icon-enterprise.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('who2Title')}</div>
                <div className="ds-svg-card-description">{t('who2Desc')}</div>
              </div>
            </div>
          </div>
          <div className="title-content">
            <p className="section-lede-on-light"><strong>{t('whoNote')}</strong></p>
            <p className="section-lede-on-light">{t('whoNoteDesc')}</p>
          </div>
        </div>
      </section>

      <div className="footer-form-section new-bg">
        <div className="container-default">
          <div className="container-default-inner">
            <div className="_2-block-flex footer-form bg-white radius-24px p-60">
              <div className="_2-block-flex-content footer-form">
                <div className="_2-block-flex-content-text-wrap footer-form">
                  <h2 className="form-heading footer-form ibm-plex-sans color-000">Ready to Migrate to a <span className="color-gradient">Seamless &amp; Secure Authentication System?</span></h2>
                  <div className="form-description ibm-plex-sans">Tell us a little about yourself and your migration needs.Our team will be in touch to answer your questions and get you started.</div>
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
