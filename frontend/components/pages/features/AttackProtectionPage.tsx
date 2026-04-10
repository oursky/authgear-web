import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface Props {
  locale: string;
}

export default function AttackProtectionPage(_props: Props) {
  const t = useTranslations('AttackProtection');
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
                href="https://portal.authgear.com/?utm_source=feature-mfa&amp;utm_medium=link&amp;utm_campaign=start-for-free"
                target="_blank"
                rel="noreferrer"
                className="ds-btn ds-btn-secondary"
              >
                {tFeatures('startForFree')}
                <ArrowRightIcon className="ds-btn__icon-arrow" aria-hidden />
              </a>
              <Link href="/schedule-demo" target="_blank" rel="noreferrer" className="ds-btn ds-btn-tertiary">
                {tFeatures('getDemo')}
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
            src="/images/features-attackprotection-banner-kv2x.webp"
            srcSet="/images/features-attackprotection-banner-kv2x-p-500.webp 500w, /images/features-attackprotection-banner-kv2x-p-800.webp 800w, /images/features-attackprotection-banner-kv2x-p-1080.webp 1080w, /images/features-attackprotection-banner-kv2x.webp 1244w"
            sizes="(max-width: 767px) 100vw, 738px"
            width={738}
            alt=""
          />
        </div>
        </div>
      </div>
    </div>
  </section>
  <section className="ds-section">
    <div className="ds-container ds-container--split-stack">
      <div className="ds-split ds-split-row">
        <div className="ds-split-row__media">
          <img
            src="/images/features-attackprotection-features-01-square.svg"
            loading="lazy"
            width={624}
            alt=""
            className="ds-split-row__img"
          />
        </div>
        <div className="ds-split-row__body">
          <h2 className="heading-on-light">{t('feature1Title')}</h2>
          <p className="section-lede-on-light">{t('feature1Description')}</p>
        </div>
      </div>
      <div className="ds-split ds-split-row ds-split-row--reverse">
        <div className="ds-split-row__media">
          <img
            src="/images/features-attackprotection-features-02-square.svg"
            loading="lazy"
            width={624}
            alt=""
            className="ds-split-row__img"
          />
        </div>
        <div className="ds-split-row__body">
          <h2 className="heading-on-light">{t('feature2Title')}</h2>
          <p className="section-lede-on-light">{t('feature2Description')}</p>
        </div>
      </div>
      <div className="ds-split ds-split-row">
        <div className="ds-split-row__media">
          <img
            src="/images/features-attackprotection-features-03-square.svg"
            loading="lazy"
            width={624}
            alt=""
            className="ds-split-row__img"
          />
        </div>
        <div className="ds-split-row__body">
          <h2 className="heading-on-light">{t('feature3Title')}</h2>
          <p className="section-lede-on-light">{t('feature3Description')}</p>
        </div>
      </div>
      <div className="ds-split ds-split-row ds-split-row--reverse">
        <div className="ds-split-row__media">
          <img
            src="/images/features-attackprotection-features-04-square.svg"
            loading="lazy"
            width={624}
            alt=""
            className="ds-split-row__img"
          />
        </div>
        <div className="ds-split-row__body">
          <h2 className="heading-on-light">{t('feature4Title')}</h2>
          <p className="section-lede-on-light">{t('feature4Description')}</p>
        </div>
      </div>
      <div className="ds-split ds-split-row">
        <div className="ds-split-row__media">
          <img
            src="/images/features-attackprotection-features-05-square.svg"
            loading="lazy"
            width={624}
            alt=""
            className="ds-split-row__img"
          />
        </div>
        <div className="ds-split-row__body">
          <h2 className="heading-on-light">{t('feature5Title')}</h2>
          <p className="section-lede-on-light">{t('feature5Description')}</p>
        </div>
      </div>
      <div className="ds-split ds-split-row ds-split-row--reverse">
        <div className="ds-split-row__media">
          <img
            src="/images/features-attackprotection-features-06-square.svg"
            loading="lazy"
            width={624}
            alt=""
            className="ds-split-row__img"
          />
        </div>
        <div className="ds-split-row__body">
          <h2 className="heading-on-light">{t('feature6Title')}</h2>
          <p className="section-lede-on-light">{t('feature6Description')}</p>
        </div>
      </div>
      <div className="ds-split ds-split-row">
        <div className="ds-split-row__media">
          <img
            src="/images/features-attackprotection-features-07-square.svg"
            loading="lazy"
            width={624}
            alt=""
            className="ds-split-row__img"
          />
        </div>
        <div className="ds-split-row__body">
          <h2 className="heading-on-light">{t('feature7Title')}</h2>
          <p className="section-lede-on-light">{t('feature7Description')}</p>
        </div>
      </div>
      <div className="ds-split ds-split-row ds-split-row--reverse">
        <div className="ds-split-row__media">
          <img
            src="/images/features-attackprotection-features-08-square.svg"
            loading="lazy"
            width={624}
            alt=""
            className="ds-split-row__img"
          />
        </div>
        <div className="ds-split-row__body">
          <h2 className="heading-on-light">{t('feature8Title')}</h2>
          <p className="section-lede-on-light">{t('feature8Description')}</p>
        </div>
      </div>
    </div>
  </section>
  <section className="ds-section ds-bg-light-blue">
    <div className="ds-container">
      <div className="title-content">
        <h2 className="heading-on-light">{t('valuesSectionTitle')}</h2>
      </div>
      <div className="ds-grid-2">
        <div className="svg-card">
          <img src="/images/features-attackprotection-values-01.svg" loading="lazy" alt="" />
          <div className="ds-svg-card-content">
            <div className="ds-svg-card-description">{t('value1')}</div>
          </div>
        </div>
        <div className="svg-card">
          <img src="/images/b2b-saas-why-customized.svg" loading="lazy" alt="" />
          <div className="ds-svg-card-content">
            <div className="ds-svg-card-description">{t('value2')}</div>
          </div>
        </div>
        <div className="svg-card">
          <img src="/images/features-attackprotection-values-03.svg" loading="lazy" alt="" />
          <div className="ds-svg-card-content">
            <div className="ds-svg-card-description">{t('value3')}</div>
          </div>
        </div>
        <div className="svg-card">
          <img src="/images/features-attackprotection-values-04.svg" loading="lazy" alt="" />
          <div className="ds-svg-card-content">
            <div className="ds-svg-card-description">{t('value4')}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="ds-section attack-protection-built-for">
    <div className="ds-container">
      <div className="attack-protection-built-for__surface">
        <div className="attack-protection-built-for__content">
          <h2 className="heading-on-dark">{t('builtForTitle')}</h2>
          <p className="section-lede-on-dark">{t('builtForDescription')}</p>
        </div>
      </div>
    </div>
  </section>
  <section className="ds-section ds-footer-cta-section">
    <div className="ds-container">
      <div className="title-content">
        <h2 className="heading-on-dark">{t('ctaTitle')}</h2>
        <p className="section-lede-on-dark">{t('ctaDescription')}</p>
      </div>
      <div className="ds-footer-cta__actions">
        <a
          href="https://portal.authgear.com/?utm_source=feature-attack-protection&amp;utm_medium=link&amp;utm_campaign=start-for-free"
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
