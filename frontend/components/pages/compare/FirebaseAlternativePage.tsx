import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface Props {
  locale: string;
}

export default function FirebaseAlternativePage(_props: Props) {
  const t = useTranslations('FirebaseAlternative');
  const tFeatures = useTranslations('Features');
  const tCompare = useTranslations('Compare');
  return (
    <>
      <div className="featurespage__hero_v2 featurespage__hero_bg vs-page">
        <div className="features-hero-wrapper-new gap140">
          <div className="split-content features-hero-left vs-mobile">
            <h1 className="title features-hero-v2 vs-mobile">{t('heroTitle')}</h1>
            <p className="features-hero-description">{t('heroDescription')}</p>
            <div className="features-hero-cta-wrapper vs-mobile">
              <a href="https://accounts.portal.authgear.com/signup" target="_blank" className="button-primary feature-hero-btn-v2 vs-mobile w-button">
                {tFeatures('startForFree')}
              </a>
              <Link href="/schedule-demo" target="_blank" className="button-secondary feature-hero-btn-v2 noscale button-secondary-with-boarder w-button">
                {tFeatures('scheduleDemo')}
              </Link>
            </div>
          </div>
          <img src="/images/compare_kv-firebase2x.webp" srcSet="/images/compare_kv-firebase2x-p-500.webp 500w, /images/compare_kv-firebase2x.webp 600w" sizes="(max-width: 600px) 100vw, 600px" alt="" className="image features-hero-image-v2 _300max" />
        </div>
      </div>
      <div>
        <div className="container-default wider-container-default logo-section">
          <div className="container-default-inner px-0 gap-0 pb-0"></div>
          <img src="/images/compare_logo-Bupa-gray2x.png" loading="lazy" alt="" className="image-86" />
          <img src="/images/compare_logo-CIMIC-gray2x.png" loading="lazy" alt="" className="image-86" />
          <img src="/images/compare_logo-HML-gray2x.png" loading="lazy" alt="" className="image-86" />
          <img src="/images/compare_logo_hkpc_gray2x.png" loading="lazy" alt="" className="image-86" />
          <img src="/images/compare_logo-k11-gray2x.png" loading="lazy" alt="" className="image-86" />
          <img src="/images/compare_logo-MTR-gray2x.png" loading="lazy" alt="" className="image-86" />
        </div>
      </div>
      <div>
        <div className="container-default wider-container-default">
          <div className="container-default-inner px-0 gap-0 pb-0">
            <div className="top-content feature-flex">
              <h2 className="title features-page-v2">{t('whyChooseTitle')}</h2>
            </div>
          </div>
          <div className="w-layout-hflex flex-block-71">
            <div className="svg-card gray-card">
              <div className="svg-card-image-container"><img src="/images/compare_why-enterprise.svg" loading="lazy" alt="" /></div>
              <div className="svg-card-content-container text-center gap-16">
                <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">{t('card1Title')}</div>
                <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">{t('card1Description')}</div>
              </div>
            </div>
            <div className="svg-card gray-card">
              <div className="svg-card-image-container"><img src="/images/compare_why-agnostic.svg" loading="lazy" alt="" /></div>
              <div className="svg-card-content-container text-center gap-16">
                <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">{t('card2Title')}</div>
                <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">{t('card2Description')}</div>
              </div>
            </div>
            <div className="svg-card gray-card">
              <div className="svg-card-image-container"><img src="/images/compare_why-success.svg" loading="lazy" alt="" /></div>
              <div className="svg-card-content-container text-center gap-16">
                <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">{t('card3Title')}</div>
                <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">{t('card3Description')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-f9f9fb">
        <div className="container-default">
          <div className="container-default-inner px-0 gap-0">
            <div className="_2-card-grid gap-32 mb-40 _2-rows">
              <div className="svg-card">
                <div className="svg-card-image-container"><img src="/images/compare_features-authentication.svg" loading="lazy" alt="" /></div>
                <div className="svg-card-content-container text-center gap-16">
                  <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">{t('feature1Title')}</div>
                  <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">{t('feature1Description')}</div>
                </div>
              </div>
              <div className="svg-card">
                <div className="svg-card-image-container"><img src="/images/compare_features-developer.svg" loading="lazy" alt="" /></div>
                <div className="svg-card-content-container text-center gap-16">
                  <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">{t('feature2Title')}</div>
                  <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">{t('feature2Description')}</div>
                </div>
              </div>
              <div className="svg-card">
                <div className="svg-card-image-container"><img src="/images/compare_features-flow.svg" loading="lazy" width={48} alt="" /></div>
                <div className="svg-card-content-container text-center gap-16">
                  <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">{t('feature3Title')}</div>
                  <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">{t('feature3Description')}</div>
                </div>
              </div>
              <div className="svg-card">
                <div className="svg-card-image-container"><img src="/images/compare_features-support.svg" loading="lazy" alt="" /></div>
                <div className="svg-card-content-container text-center gap-16">
                  <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">{t('feature4Title')}</div>
                  <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">{t('feature4Description')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container-default wider-container-default">
          <div className="container-default-inner px-0 gap-0 pb-0">
            <div className="top-content feature-flex">
              <h2 className="title features-page-v2">{t('compareTitle')}</h2>
            </div>
            <div className="div-block-25">
              <div className="w-layout-grid table-header">
                <div className="w-layout-blockcontainer w-container"></div>
                <img src="/images/compare_table-Authgear.svg" loading="lazy" alt="" />
                <div className="okta">{t('competitorName')}</div>
              </div>
              <div className="w-layout-grid table-header table-content">
                <div className="table-text title">{t('tableNoVendorLockInTitle')}</div>
                <div className="compare-table-multi-info">
                  <img src="/images/compare_table-check-blue.svg" loading="lazy" alt="" />
                  <div className="table-text">{t('tableBackendAgnostic')}</div>
                </div>
                <div className="compare-table-multi-info">
                  <img src="/images/compare_table-false.svg" loading="lazy" alt="" />
                  <div className="compare-table-text-light title">{t('tableFirebaseEcosystemNote')}</div>
                </div>
              </div>
              <div className="w-layout-grid table-header table-content">
                <div className="table-text title">{t('tableTotpPasskeyTitle')}</div>
                <img src="/images/compare_table-check-blue.svg" loading="lazy" alt="" />
                <img src="/images/compare_table-false.svg" loading="lazy" alt="" />
              </div>
              <div className="w-layout-grid table-header table-content">
                <div className="table-text title">{t('tableWhatsappTitle')}</div>
                <img src="/images/compare_table-check-blue.svg" loading="lazy" alt="" />
                <img src="/images/compare_table-false.svg" loading="lazy" alt="" />
              </div>
              <div className="w-layout-grid table-header table-content">
                <div className="table-text title">{t('tableAdaptiveMfaTitle')}</div>
                <img src="/images/compare_table-check-blue.svg" loading="lazy" alt="" />
                <img src="/images/compare_table-false.svg" loading="lazy" alt="" />
              </div>
              <div className="w-layout-grid table-header table-content">
                <div className="table-text title">{t('tableSocialEnterpriseTitle')}</div>
                <div className="compare-table-multi-info">
                  <img src="/images/compare_table-check-blue.svg" loading="lazy" alt="" />
                  <div className="table-text">{t('tableSocialAuthgearExtra')}</div>
                </div>
                <div className="compare-table-multi-info">
                  <img src="/images/compare_table-check-gray.svg" loading="lazy" alt="" />
                </div>
              </div>
              <div className="w-layout-grid table-header table-content">
                <div className="table-text title">{t('tableOidcSamlTitle')}</div>
                <div className="compare-table-multi-info"><img src="/images/compare_table-check-blue.svg" loading="lazy" alt="" /></div>
                <div className="compare-table-multi-info">
                  <img src="/images/compare_table-check-gray.svg" loading="lazy" alt="" />
                  <div className="compare-table-text-light title">{t('tableWithIdentityPlatform')}</div>
                </div>
              </div>
              <div className="w-layout-grid table-header table-content">
                <div className="table-text title">{t('tableBrandingTitle')}</div>
                <div className="table-text">{t('tableBrandingAuthgear')}</div>
                <div className="table-text">{t('tableBrandingFirebase')}</div>
              </div>
              <div className="w-layout-grid table-header table-content">
                <div className="table-text title">{t('tableEmailTitle')}</div>
                <img src="/images/compare_table-check-blue.svg" loading="lazy" alt="" />
                <img src="/images/compare_table-false.svg" loading="lazy" alt="" />
              </div>
              <div className="w-layout-grid table-header table-content">
                <div className="table-text title">{t('tableDiscordTitle')}</div>
                <img src="/images/compare_table-check-blue.svg" loading="lazy" alt="" />
                <img src="/images/compare_table-false.svg" loading="lazy" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container-default wider-container-default">
          <div className="container-default-inner px-0 gap-0 pb-0"></div>
          <div className="w-layout-hflex ready-to-switch">
            <h1 className="title features-hero-v2 inverse nomargin">{tCompare('readyToSwitch')}</h1>
            <div className="split-content features-hero-left nomargin">
              <p className="features-hero-description inverse">{t('ctaMigrateDescription')}</p>
              <div className="features-hero-cta-wrapper in-ready-to-switch">
                <Link href="/schedule-demo" target="_blank" className="button-primary feature-hero-btn-v2 nomargin w-button">
                  {tCompare('talkToUs')}
                </Link>
                <a href="https://accounts.portal.authgear.com/signup" target="_blank" className="button-secondary feature-hero-btn-v2 noscale button-secondary-with-boarder inverse w-button">
                  {tFeatures('startForFree')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
