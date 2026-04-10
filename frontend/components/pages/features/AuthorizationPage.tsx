import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface Props {
  locale: string;
}

export default function AuthorizationPage(_props: Props) {
  const t = useTranslations('Authorization');
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
                href="https://portal.authgear.com/?utm_source=feature-authorization&amp;utm_medium=link&amp;utm_campaign=start-for-free"
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
            src="/images/features-authorization-hero-banner2x.webp"
            srcSet="/images/features-authorization-hero-banner2x-p-500.webp 500w, /images/features-authorization-hero-banner2x-p-800.webp 800w, /images/features-authorization-hero-banner2x-p-1080.webp 1080w, /images/features-authorization-hero-banner2x.webp 1244w"
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
    <div className="ds-container">
      <div className="ds-feature-callout">
        <div className="ds-feature-callout__title">
          <h2 className="heading-on-dark">
            {t('whyAuthgearTitleLine1')}
            <br />
            {t('whyAuthgearTitleLine2')}
          </h2>
        </div>
        <div className="ds-feature-callout__body">
          <p className="section-lede-on-dark">
            {t('whyAuthgearDescLine1')}
            <br />
            {t('whyAuthgearDescLine2')}
          </p>
          <div className="ds-feature-callout__ctas">
            <Link href="/schedule-demo" target="_blank" rel="noreferrer" className="ds-btn ds-btn-primary">
              {t('talkToUs')}
            </Link>
            <a
              href="https://accounts.portal.authgear.com/signup"
              target="_blank"
              rel="noreferrer"
              className="ds-btn ds-btn-outline-light"
            >
              {tFeatures('startForFree')}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="ds-section ds-bg-light-blue">
    <div className="ds-container ds-container--split-stack ds-container--split-stack--title-gap-m">
      <div className="title-content">
        <h2 className="heading-on-light">{t('centralizedTitle')}</h2>
      </div>
      <div className="ds-split-stack__rows">
        <div className="ds-split ds-split-row ds-split-row--surface-light">
          <div className="ds-split-row__media">
            <img
              src="/images/features-authorization-content-roles.svg"
              loading="lazy"
              width={624}
              alt=""
              className="ds-split-row__img"
            />
          </div>
          <div className="ds-split-row__body">
            <h3 className="heading-on-light">{t('rolesTitle')}</h3>
            <p className="section-lede-on-light">{t('rolesDesc')}</p>
          </div>
        </div>
        <div className="ds-split ds-split-row ds-split-row--reverse ds-split-row--surface-light">
          <div className="ds-split-row__media">
            <img
              src="/images/features-authorization-content-groups.svg"
              loading="lazy"
              width={624}
              alt=""
              className="ds-split-row__img"
            />
          </div>
          <div className="ds-split-row__body">
            <h3 className="heading-on-light">{t('groupsTitle')}</h3>
            <p className="section-lede-on-light">{t('groupsDesc')}</p>
          </div>
        </div>
        <div className="ds-split ds-split-row ds-split-row--surface-light">
          <div className="ds-split-row__media">
            <img
              src="/images/features-authorization-content-audit.svg"
              loading="lazy"
              width={624}
              alt=""
              className="ds-split-row__img"
            />
          </div>
          <div className="ds-split-row__body">
            <h3 className="heading-on-light">{t('auditTitle')}</h3>
            <p className="section-lede-on-light">{t('auditDesc')}</p>
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
          href="https://portal.authgear.com/?utm_source=feature-authorization&amp;utm_medium=link&amp;utm_campaign=start-for-free"
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
