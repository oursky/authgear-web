import Link from 'next/link';
import { useTranslations } from 'next-intl';
import ContactForm from '@/components/ContactForm';

interface Props {
  locale: string;
}

export default function PasskeysPage(_props: Props) {
  const t = useTranslations('Passkeys');
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
          <a href="https://portal.authgear.com/?utm_source=feature-passkey&amp;utm_medium=link&amp;utm_campaign=start-for-free" target="_blank" className="button-primary feature-hero-btn-v2 w-button">{tFeatures('startForFree')}</a>
          <Link href="/schedule-demo" target="_blank" className="button-secondary feature-hero-btn-v2 noscale w-button">{tFeatures('scheduleDemo')}  <span className="text-span-23">{">"}</span></Link>
        </div>
      </div><img src="/images/passkey-hero-kv.svg" alt="" className="image features-hero-image-v2" />
    </div>
  </div>
  <div className="section features-page video-section-bg">
    <div className="container-default w-container">
      <div className="top-content feature-flex max-width-large">
        <h2 className="title features-page text-align-left video-section-title">{t('whatIsTitle')}<br /><span className="text-highight-lightblue-gradient">{t('whatIsTitleHighlight')}</span></h2>
        <p className="video-description color-white text-normal">{t('whatIsDescription')}</p>
      </div>
      <div className="video-container-full">
        <div style={{paddingTop: "56.17021276595745%"}} className="w-video w-embed"><iframe className="embedly-embed" src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2F6IrX59CwWN4%3Ffeature%3Doembed&display_name=YouTube&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D6IrX59CwWN4&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2F6IrX59CwWN4%2Fhqdefault.jpg&key=96f1f04c5f4143bcb0f2e68c87d65feb&type=text%2Fhtml&schema=youtube" scrolling="no" allowFullScreen title="What is Apple Passkey? - Explained in 100 seconds"></iframe></div>
      </div>
    </div>
  </div>
  <div className="featurespage__section_dark-bg-passkeys">
    <div className="container-default w-container">
      <div className="solution-flex-container gap-40">
        <div className="solution-image-block"><img src="/images/features-passkeys-api.svg" loading="lazy" alt="" /></div>
        <div className="features-text-block line-height-40 p-0">
          <h3 className="features-page-h3 gray-gradient">{t('apiTitle')}</h3>
          <p className="mb-32 color-white text-l">{t('apiDesc')}</p>
          <Link href="/schedule-demo" className="button-primary gradient-rounded w-button">{t('learnMore')}</Link>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">{t('elevateTitle')}<br />‍<span className="text-highlight-gradient">{t('elevateTitleHighlight')}</span></h2>
          <p className="paragraph-large text-center features-page-v2">{t('elevateDescription')}</p>
        </div>
        <div className="_3-card-grid">
          <div id="w-node-bfb14abc-b53a-5c07-576e-745ecb79f0f8-c4f83b00" className="svg-card p-0 pr-24">
            <div className="svg-card-image-container"><img src="/images/features-passkeys-authentication-icon-setup.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">{t('benefit1Title')}</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262">{t('benefit1Desc')}</div>
            </div>
          </div>
          <div id="w-node-bfb14abc-b53a-5c07-576e-745ecb79f100-c4f83b00" className="svg-card p-0 pr-24">
            <div className="svg-card-image-container"><img src="/images/features-passkeys-authentication-icon-secutiry.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">{t('benefit2Title')}</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262">{t('benefit2Desc')}</div>
            </div>
          </div>
          <div id="w-node-bfb14abc-b53a-5c07-576e-745ecb79f108-c4f83b00" className="svg-card p-0 pr-24">
            <div className="svg-card-image-container"><img src="/images/features-passkeys-authentication-icon-ux.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">{t('benefit3Title')}</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262">{t('benefit3Desc')}</div>
            </div>
          </div>
        </div>
        <a id="w-node-_9577349c-1c59-cca6-63b3-89fc36497b5b-c4f83b00" href="/post/passkey-vs-password-why-passkeys-are-the-future-of-security" className="button-secondary insection-cta w-button">{t('readBlog')}</a>
      </div>
    </div>
  </div>
  <div>
    <div className="container-default">
      <div className="container-default-inner">
        <div className="top-content feature-flex">
          <h2 className="title features-page-v2">{t('howToCreateTitle')}<br />‍<span className="text-highlight-gradient">{t('howToCreateTitleHighlight')}</span></h2>
          <p className="paragraph-large text-center features-page-v2">{t('howToCreateDescription')}</p>
        </div>
        <div className="tabs-pretext ibm-plex-sans">{t('tabsPretext')}</div>
        <div data-current="Tab 1" data-duration-in="300" data-duration-out="100" className="_2-block-flex tabs-with-image ibm-plex-sans w-tabs">
          <div className="hover-change tabs upper w-tab-menu">
            <a data-w-tab="Tab 1" className="hover-change-content pt-0 w-inline-block w-tab-link w--current">
              <div className="hover-change-title">{t('tab1Title')}</div>
              <div style={{height: "0px"}} className="hover-change-description">{t('tab1Desc')}</div>
            </a>
            <a data-w-tab="Tab 2" className="hover-change-content pt-0 w-inline-block w-tab-link">
              <div className="hover-change-title">{t('tab2Title')}</div>
              <div style={{height: "0px"}} className="hover-change-description">{t('tab2Desc')}</div>
            </a>
            <a data-w-tab="Tab 3" className="hover-change-content pt-0 w-inline-block w-tab-link">
              <div className="hover-change-title">{t('tab3Title')}</div>
              <div style={{height: "0px"}} className="hover-change-description">{t('tab3Desc')}</div>
            </a>
            <a data-w-tab="Tab 4" className="hover-change-content pt-0 w-inline-block w-tab-link">
              <div className="hover-change-title">{t('tab4Title')}</div>
              <div style={{height: "0px"}} className="hover-change-description">{t('tab4Desc')}</div>
            </a>
          </div>
          <div className="_2-block-flex-image tabs w-tab-content">
            <div data-w-tab="Tab 1" className="w-tab-pane w--tab-active"><img loading="eager" src="/images/features-passkeys-howtocreate-01-01.svg" alt="" /></div>
            <div data-w-tab="Tab 2" className="w-tab-pane"><img width="Auto" loading="eager" alt="" src="/images/features-passkeys-howtocreate-02-01.svg" /></div>
            <div data-w-tab="Tab 3" className="w-tab-pane"><img loading="eager" src="/images/features-passkeys-howtocreate-03-01.svg" alt="" /></div>
            <div data-w-tab="Tab 4" className="w-tab-pane"><img width="Auto" loading="eager" alt="" src="/images/features-passkeys-howtocreate-04-01.svg" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0 pt-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">{t('enterpriseTitle')}<br />‍<span className="text-highlight-gradient">{t('enterpriseTitleHighlight')}</span></h2>
          <p className="paragraph-large text-center features-page-v2">{t('enterpriseDescription')}</p>
        </div>
        <div className="_3-card-grid row-gap-64">
          <div id="w-node-dee47dc3-954f-ced5-581b-53cc7043db5a-c4f83b00" className="svg-card p-0 pr-24">
            <div className="svg-card-image-container"><img src="/images/features-passkeys-security-icon-employee.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">{t('enterprise1Title')}</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px">{t('enterprise1Desc')}</div>
            </div>
          </div>
          <div id="w-node-dee47dc3-954f-ced5-581b-53cc7043db62-c4f83b00" className="svg-card p-0 pr-24">
            <div className="svg-card-image-container"><img src="/images/features-passkeys-security-icon-security.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">{t('enterprise2Title')}</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px">{t('enterprise2Desc')}</div>
            </div>
          </div>
          <div id="w-node-dee47dc3-954f-ced5-581b-53cc7043db6a-c4f83b00" className="svg-card p-0 pr-24">
            <div className="svg-card-image-container"><img src="/images/features-passkeys-security-icon-management.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">{t('enterprise3Title')}</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px">{t('enterprise3Desc')}</div>
            </div>
          </div>
          <div id="w-node-d855d5d2-741f-7b06-2379-baec8f07773a-c4f83b00" className="svg-card p-0 pr-24">
            <div className="svg-card-image-container"><img src="/images/features-passkeys-security-icon-compilance.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">{t('enterprise4Title')}</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px">{t('enterprise4Desc')}</div>
            </div>
          </div>
          <div id="w-node-_519cf47c-4837-56dd-7803-0f7c3fe0bf2d-c4f83b00" className="svg-card p-0 pr-24">
            <div className="svg-card-image-container"><img src="/images/features-passkeys-security-icon-cost.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">{t('enterprise5Title')}</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px">{t('enterprise5Desc')}</div>
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
