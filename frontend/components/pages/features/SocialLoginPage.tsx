import Link from 'next/link';
import { useTranslations } from 'next-intl';
import ContactForm from '@/components/ContactForm';

interface Props {
  locale: string;
}

export default function SocialLoginPage(_props: Props) {
  const t = useTranslations('SocialLogin');
  const tFeatures = useTranslations('Features');
  return (
    <>
<div className="featurespage__hero_v2 featurespage__hero_bg">
    <div className="features-hero-wrapper-new">
      <div className="split-content features-hero-left">
        <div className="featurespage__hero-titletag">{t('heroSmallTitle')}</div>
        <h1 className="title features-hero-v2">{t('heroTitle')}</h1>
        <p className="features-hero-description">{t('heroDescription')}</p>
        <div className="features-hero-cta-wrapper">
          <a href="https://portal.authgear.com/?utm_source=feature-social-login&amp;utm_medium=link&amp;utm_campaign=start-for-free" target="_blank" className="button-primary feature-hero-btn-v2 w-button">{tFeatures('startForFree')}</a>
          <Link href="/schedule-demo" target="_blank" className="button-secondary feature-hero-btn-v2 noscale w-button">{tFeatures('scheduleDemo')}  <span className="text-span-23">{">"}</span></Link>
        </div>
      </div><img src="/images/features-securitythreat-seamless-sociallogin.svg" alt="" className="image features-hero-image-v2" />
    </div>
  </div>
  <div className="bg-f3f6ff">
    <div className="container-default">
      <div className="container-default-inner px-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">{t('providersTitle')}<span className="text-highlight-gradient">{t('providersTitleHighlight')}</span></h2>
          <p className="paragraph-large text-center features-page-v2">{t('providersDescription')}</p>
        </div>
        <div className="grid-12 gap-32 tablet-2-col tablet-gap-16">
          <div id="w-node-_9d5e4572-9857-4c2e-ae81-cb4ccf9f155a-44a84e6c" className="features__social-media-wrap">
            <div id="w-node-d83aa250-3531-9f07-914e-94e692d1a48f-44a84e6c" className="features__social-media-card">
              <div className="features___social-media-logo"><img src="/images/features-sociallogin-companylogo-apple.svg" loading="lazy" width={32} alt="" className="features__social-media-image" /></div>
            </div>
            <div className="features-social-login-providers">Apple</div>
          </div>
          <div id="w-node-ddadcadf-c985-b916-4da9-4a5da78d381e-44a84e6c" className="features__social-media-wrap">
            <div id="w-node-_9709545e-ed40-f7b5-5f30-510a90e519cc-44a84e6c" className="features__social-media-card">
              <div className="features___social-media-logo"><img src="/images/features-sociallogin-companylogo-google.svg" loading="lazy" width={32} alt="" className="features__social-media-image" /></div>
            </div>
            <div className="features-social-login-providers">Google</div>
          </div>
          <div id="w-node-c89a385f-4d26-bc55-bec3-2e62d7f4c486-44a84e6c" className="features__social-media-wrap">
            <div className="features__social-media-card">
              <div className="features___social-media-logo"><img src="/images/features-sociallogin-companylogo-facebook.svg" loading="lazy" width={32} height="auto" alt="" className="features__social-media-image" /></div>
            </div>
            <div className="features-social-login-providers">Facebook</div>
          </div>
          <div id="w-node-_2f68271b-dacb-bd2d-2974-572757888469-44a84e6c" className="features__social-media-wrap">
            <div className="features__social-media-card">
              <div className="features___social-media-logo"><img src="/images/features-sociallogin-companylogo-github.svg" loading="lazy" width={32} height="auto" alt="" className="features__social-media-image" /></div>
            </div>
            <div className="features-social-login-providers">GitHub</div>
          </div>
          <div id="w-node-_3f8abfd8-6f6c-3435-3bc7-2a12b32adb77-44a84e6c" className="features__social-media-wrap">
            <div className="features__social-media-card">
              <div className="features___social-media-logo"><img src="/images/features-sociallogin-companylogo-linkedin.svg" loading="lazy" width={32} alt="" className="features__social-media-image" /></div>
            </div>
            <div className="features-social-login-providers">LinkedIn</div>
          </div>
          <div id="w-node-_72cd9e29-5e06-800a-5eac-650c0d6ba75e-44a84e6c" className="features__social-media-wrap">
            <div className="features__social-media-card">
              <div className="features___social-media-logo"><img src="/images/features-sociallogin-companylogo-microsoft.svg" loading="lazy" width={32} height="auto" alt="" className="features__social-media-image" /></div>
            </div>
            <div className="features-social-login-providers">Azure Active Directory &amp; Azure AD B2C</div>
          </div>
          <div id="w-node-_54009ab2-6275-0965-f61e-8d51e45e5bd6-44a84e6c" className="features__social-media-wrap">
            <div className="features__social-media-card">
              <div className="features___social-media-logo"><img src="/images/features-sociallogin-companylogo-azure.svg" loading="lazy" width={32} height="auto" alt="" className="features__social-media-image" /></div>
            </div>
            <div className="features-social-login-providers">Microsoft AD FS</div>
          </div>
          <div id="w-node-f53588eb-52c8-6616-a664-86d1c3654da8-44a84e6c" className="features__social-media-wrap">
            <div className="features__social-media-card">
              <div className="features___social-media-logo"><img src="/images/features-sociallogin-companylogo-wechat.svg" loading="lazy" width={32} height="auto" alt="" className="features__social-media-image" /></div>
            </div>
            <div className="features-social-login-providers">WeChat</div>
          </div>
          <div id="w-node-_245f3883-b570-e282-c6b7-062faf7d75ad-44a84e6c" className="features__social-media-wrap">
            <div className="features__social-media-card">
              <div className="features___social-media-logo"><img src="/images/features-sociallogin-companylogo-line.svg" loading="lazy" width={32} height="auto" alt="" className="features__social-media-image" /></div>
            </div>
            <div className="features-social-login-providers">LINE<br />{t('lineComingSoon')}</div>
          </div>
          <div id="w-node-_1feb614c-6e26-f008-d8a5-2d6b033135d2-44a84e6c" className="features__social-media-wrap">
            <div className="features__social-media-card">
              <div className="features___social-media-logo"><img src="/images/features-sociallogin-companylogo-tiktok.svg" loading="lazy" alt="" className="features__social-media-image" /></div>
            </div>
            <div className="features-social-login-providers">TikTok<br />{t('tiktokComingSoon')}</div>
          </div>
        </div>
        <Link href="/schedule-demo" className="button-secondary insection-cta w-button">{t('contactForSuggestions')}</Link>
      </div>
    </div>
  </div>
  <div className="bg-f9f9fb">
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">{t('unlockTitle')}<span className="text-highlight-gradient"><br />{t('unlockTitleHighlight')}</span></h2>
          <p className="paragraph-large text-center features-page-v2">{t('unlockDescription')}</p>
        </div>
        <div className="features-flex-container gap-40 reverse-order">
          <div className="solution-image-block"><img src="/images/features-sociallogin-unolck-socialmedia.svg" loading="lazy" alt="" /></div>
          <div className="features-text-block p-0">
            <h3 className="features-h3-dark">{t('frictionlessTitle')}</h3>
            <div className="gradient-divider"></div>
            <ul role="list" className="_2-block-flex-content-list">
              <li className="_2-block-flex-content-list-item line-height-24px">{t('frictionlessItem1')}</li>
              <li className="_2-block-flex-content-list-item line-height-24px">{t('frictionlessItem2')}</li>
              <li className="_2-block-flex-content-list-item line-height-24px">{t('frictionlessItem3')}</li>
            </ul>
          </div>
        </div>
        <div className="features-flex-container gap-40">
          <div className="solution-image-block"><img src="/images/features-sociallogin-unolck-datacollection.svg" loading="lazy" alt="" /></div>
          <div className="features-text-block p-0">
            <h3 className="features-h3-dark">{t('dataCollectionTitle')}</h3>
            <div className="gradient-divider"></div>
            <ul role="list" className="_2-block-flex-content-list">
              <li className="_2-block-flex-content-list-item line-height-24px">{t('dataCollectionItem1')}</li>
              <li className="_2-block-flex-content-list-item line-height-24px">{t('dataCollectionItem2')}</li>
              <li className="_2-block-flex-content-list-item line-height-24px">{t('dataCollectionItem3')}</li>
            </ul>
          </div>
        </div>
        <div className="features-flex-container gap-40 reverse-order">
          <div className="solution-image-block"><img src="/images/features-sociallogin-unolck-trust.svg" loading="lazy" alt="" /></div>
          <div className="features-text-block p-0">
            <h3 className="features-h3-dark">{t('securityTitle')}</h3>
            <div className="gradient-divider"></div>
            <ul role="list" className="_2-block-flex-content-list">
              <li className="_2-block-flex-content-list-item line-height-24px">{t('securityItem1')}</li>
              <li className="_2-block-flex-content-list-item line-height-24px">{t('securityItem2')}</li>
              <li className="_2-block-flex-content-list-item line-height-24px">{t('securityItem3')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="bg-f3f6ff">
    <div className="container-default">
      <div className="container-default-inner px-0 pt-0">
        <div className="top-content feature-flex mb-60 pt-60">
          <h2 className="title features-page-v2">{t('simplifyTitle')}<span className="text-highlight-gradient"><br />{t('simplifyTitleHighlight')}</span></h2>
          <p className="paragraph-large text-center features-page-v2">{t('simplifyDescription')}</p>
        </div>
        <div className="grid-12 gap-36">
          <div id="w-node-d78c7a69-3aab-2d61-27d8-83a488e48472-44a84e6c" className="features-card-new px-24 bg-white space-between">
            <div className="features-card-new_content-wrap">
              <div className="features-card-new_content-title">{t('card1Title')}</div>
              <div className="features-card-new_content-desc">{t('card1Desc')}</div>
            </div>
            <div className="features-card-new_image"><img src="/images/features-sociallogin-withauthgear-singleintegration.svg" loading="lazy" alt="" /></div>
          </div>
          <div id="w-node-d78c7a69-3aab-2d61-27d8-83a488e4847a-44a84e6c" className="features-card-new px-24 bg-white space-between">
            <div className="features-card-new_image last"><img src="/images/features-sociallogin-withauthgear-brandcontrol.svg" loading="lazy" alt="" className="mw-140" /></div>
            <div className="features-card-new_content-wrap">
              <div className="features-card-new_content-title">{t('card2Title')}</div>
              <div className="features-card-new_content-desc">{t('card2Desc')}</div>
            </div>
          </div>
          <div id="w-node-d78c7a69-3aab-2d61-27d8-83a488e48482-44a84e6c" className="features-card-new px-24 bg-white space-between">
            <div className="features-card-new_content-wrap">
              <div className="features-card-new_content-title">{t('card3Title')}</div>
              <div className="features-card-new_content-desc">{t('card3Desc')}</div>
            </div>
            <div className="features-card-new_image"><img src="/images/features-sociallogin-withauthgear-topsecurity.svg" loading="lazy" alt="" /></div>
          </div>
          <div id="w-node-d78c7a69-3aab-2d61-27d8-83a488e4848a-44a84e6c" className="features-card-new px-24 bg-white space-between">
            <div className="features-card-new_content-wrap">
              <div className="features-card-new_content-title">{t('card4Title')}</div>
              <div className="features-card-new_content-desc">{t('card4Desc')}</div>
            </div>
            <div className="features-card-new_image"><img src="/images/features-sociallogin-withauthgear-easysetup.svg" loading="lazy" alt="" /></div>
          </div>
          <div id="w-node-d78c7a69-3aab-2d61-27d8-83a488e48492-44a84e6c" className="features-card-new px-24 bg-white space-between">
            <div className="features-card-new_content-wrap">
              <div className="features-card-new_content-title">{t('card5Title')}</div>
              <div className="features-card-new_content-desc">{t('card5Desc')}</div>
            </div>
            <div className="features-card-new_image"><img src="/images/features-sociallogin-withauthgear-seamless.svg" loading="lazy" alt="" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="bg-gradient">
    <div className="container-default">
      <div className="container-default-inner px-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2 gradient-silver">{t('growthTitle')}</h2>
          <p className="paragraph-large text-center features-page-v2 color-white">{t('growthDescription')}</p>
        </div>
        <div className="_2-card-grid gap-32 mobile-1-col">
          <div className="svg-card p-24 gap-6 transparent min-w-296px">
            <div className="svg-card-image-container mb-18"><img src="/images/features-sociallogin-growth-reduced.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-title ibm-plex-sans color-white">{t('growth1Title')}</div>
            <div className="svg-card-content-container">
              <div className="svg-card-content-description size-18 color-c5cae8">{t('growth1Desc')}</div>
            </div>
          </div>
          <div className="svg-card p-24 gap-6 transparent min-w-296px">
            <div className="svg-card-image-container mb-18"><img src="/images/features-sociallogin-growth-ux.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-title ibm-plex-sans color-white">{t('growth2Title')}</div>
            <div className="svg-card-content-container">
              <div className="svg-card-content-description size-18 color-c5cae8">{t('growth2Desc')}</div>
            </div>
          </div>
          <div className="svg-card p-24 gap-6 transparent min-w-296px">
            <div className="svg-card-image-container mb-18"><img src="/images/features-sociallogin-growth-increased.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-title ibm-plex-sans color-white">{t('growth3Title')}</div>
            <div className="svg-card-content-container">
              <div className="svg-card-content-description size-18 color-c5cae8">{t('growth3Desc')}</div>
            </div>
          </div>
          <div className="svg-card p-24 gap-6 transparent min-w-296px">
            <div className="svg-card-image-container mb-18"><img src="/images/features-sociallogin-growth-brand.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-title ibm-plex-sans color-white">{t('growth4Title')}</div>
            <div className="svg-card-content-container">
              <div className="svg-card-content-description size-18 color-c5cae8">{t('growth4Desc')}</div>
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
              <div className="color-cee9ff"><span className="text-bold">{t('ctaDescBold')}</span>{t('ctaDescRest')}</div>
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
