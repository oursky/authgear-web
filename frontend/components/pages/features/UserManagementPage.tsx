import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface Props {
  locale: string;
}

export default function UserManagementPage(_props: Props) {
  const t = useTranslations('UserManagement');
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
                      href="https://portal.authgear.com/?utm_source=feature-user-management&utm_medium=link&utm_campaign=start-for-free"
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
                  src="/images/features-usermanagement-banner-kv2x.webp"
                  srcSet="/images/features-usermanagement-banner-kv2x-p-500.webp 500w, /images/features-usermanagement-banner-kv2x-p-800.webp 800w, /images/features-usermanagement-banner-kv2x-p-1080.webp 1080w, /images/features-usermanagement-banner-kv2x.webp 1244w"
                  width={738}
                  sizes="(max-width: 767px) 100vw, 738px"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ds-section ds-bg-white">
        <div className="ds-container">
          <div className="title-content">
            <h2 className="heading-on-light">{t('benefitsTitle')}</h2>
            <p className="section-lede-on-light">{t('benefitsDesc')}</p>
          </div>
          <div className="ds-grid-3">
            <div className="svg-card">
              <div className="icon-w48 w-embed">
                <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48" fill="none">
                  <path d="M36.7293 11.2734L11.2734 36.7292" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M24 42C14.0582 42 6 33.9418 6 24C6 14.0601 14.0582 6 24 6C33.9418 6 42 14.0601 42 24C42 30.7238 38.3142 36.586 32.8526 39.6766" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('benefit1Title')}</div>
                <div className="ds-svg-card-description">{t('benefit1Desc')}</div>
              </div>
            </div>
            <div className="svg-card">
              <div className="icon-w48 w-embed">
                <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48" fill="none">
                  <path d="M23.998 39.6656H15.5643C9.6681 39.6656 6 35.5032 6 29.6128V18.3809C6 12.4905 9.68562 8.32812 15.5643 8.32812H32.4338C38.33 8.32812 42 12.4905 42 18.3809V29.6128C42 35.5032 38.33 39.6656 32.4318 39.6656H30.564" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16.7734 19.7656H23.4481M16.7734 28.2374H31.2319" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('benefit2Title')}</div>
                <div className="ds-svg-card-description">{t('benefit2Desc')}</div>
              </div>
            </div>
            <div className="svg-card">
              <div className="icon-w48 w-embed">
                <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48" fill="none">
                  <path d="M32.4356 6H15.5663C9.67006 6 6 10.1624 6 16.0528V31.9472C6 37.8376 9.67006 42 15.5682 42H32.4356C38.3318 42 42 37.8376 42 31.9472V16.0528C42 10.1624 38.3144 6 32.4356 6Z" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14.1172 19.3281L16.0437 23.8856L20.5758 21.9688" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16.3125 23.7704C16.4293 19.1935 20.183 15.5156 24.7988 15.5156C29.4826 15.5156 33.285 19.318 33.285 24.0018C33.285 28.6956 29.4826 32.4882 24.7988 32.4882C22.3158 32.4882 20.0876 31.4276 18.5328 29.7328" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">{t('benefit3Title')}</div>
                <div className="ds-svg-card-description">{t('benefit3Desc')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ds-section ds-bg-light-blue">
        <div className="ds-container ds-container--split-stack ds-container--split-stack--title-gap-m">
          <div className="title-content">
            <h2 className="heading-on-light">{t('featuresTitle')}</h2>
            <p className="section-lede-on-light">{t('featuresDesc')}</p>
          </div>
          <div className="ds-split-stack__rows">
            <div className="ds-split ds-split-row ds-split-row--surface-light">
              <div className="ds-split-row__media">
                <img src="/images/features-usermanagement-features-userdirectory.svg" loading="lazy" width={624} alt="" className="ds-split-row__img" />
              </div>
              <div className="ds-split-row__body">
                <h3 className="heading-on-light">{t('feature1Title')}</h3>
                <p className="section-lede-on-light">{t('feature1Desc')}</p>
              </div>
            </div>
            <div className="ds-split ds-split-row ds-split-row--reverse ds-split-row--surface-light">
              <div className="ds-split-row__media">
                <img src="/images/features-usermanagement-features-account-recovery.svg" loading="lazy" width={624} alt="" className="ds-split-row__img" />
              </div>
              <div className="ds-split-row__body">
                <h3 className="heading-on-light">{t('feature2Title')}</h3>
                <p className="section-lede-on-light">{t('feature2Desc')}</p>
              </div>
            </div>
            <div className="ds-split ds-split-row ds-split-row--surface-light">
              <div className="ds-split-row__media">
                <img src="/images/features-usermanagement-features-auditlogs.svg" loading="lazy" width={624} alt="" className="ds-split-row__img" />
              </div>
              <div className="ds-split-row__body">
                <h3 className="heading-on-light">{t('feature3Title')}</h3>
                <p className="section-lede-on-light">{t('feature3Desc')}</p>
              </div>
            </div>
            <div className="ds-split ds-split-row ds-split-row--reverse ds-split-row--surface-light">
              <div className="ds-split-row__media">
                <img src="/images/features-usermanagement-features-dashboard.svg" loading="lazy" width={624} alt="" className="ds-split-row__img" />
              </div>
              <div className="ds-split-row__body">
                <h3 className="heading-on-light">{t('feature4Title')}</h3>
                <p className="section-lede-on-light">{t('feature4Desc')}</p>
              </div>
            </div>
            <div className="ds-split ds-split-row ds-split-row--surface-light">
              <div className="ds-split-row__media">
                <img src="/images/features-usermanagement-features-admin-role.svg" loading="lazy" width={624} alt="" className="ds-split-row__img" />
              </div>
              <div className="ds-split-row__body">
                <h3 className="heading-on-light">
                  {t('feature5Title')} <span className="ds-coming-soon-badge">{t('feature5ComingSoon')}</span>
                </h3>
                <p className="section-lede-on-light">{t('feature5Desc')}</p>
              </div>
            </div>
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
              href="https://portal.authgear.com/?utm_source=feature-user-management&utm_medium=link&utm_campaign=start-for-free"
              target="_blank"
              rel="noreferrer"
              className="ds-btn ds-btn-secondary"
            >
              {tFeatures('startForFree')}
            </a>
            <Link href="/schedule-demo" target="_blank" rel="noreferrer" className="ds-btn ds-btn-outline-light">
              {tFeatures('getDemo')}
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
