import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import ContactForm from '@/components/ContactForm';
import PlausibleLink from '@/components/PlausibleLink';

interface Props {
  locale: string;
}

export default async function HomePage({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'Home' });

  return (
    <>
      <div className="page-wrapper">
        {/* Hero Section */}
        <div className="section home-hero dark banner-for-slide not-in-slide">
          <div className="container-1440 home-mobile-banner">
            <div className="home-hero-wrapper">
              <div className="container-medium-908px home-hero">
                <div className="w-layout-blockcontainer product-switch-outer w-container">
                  <div className="w-layout-hflex product-switch">
                    <div className="w-layout-hflex flex-block-66 active">
                      <div className="code-embed-4 w-embed"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M5.53093 4.98208C6.93198 3.67788 8.86593 3 11.0358 3H21.632C23.8031 3 25.7368 3.68155 27.1373 4.98691C28.5456 6.29955 29.3337 8.16888 29.3337 10.3761V16.4332C29.3337 16.9855 28.886 17.4332 28.3337 17.4332C27.7815 17.4332 27.3337 16.9855 27.3337 16.4332V10.3761C27.3337 8.66433 26.7345 7.34559 25.7736 6.44992C24.8049 5.54699 23.3877 5 21.632 5H11.0358C9.2787 5 7.86176 5.54481 6.89364 6.44599C5.93362 7.33964 5.33398 8.65784 5.33398 10.3761V21.6211C5.33398 23.3401 5.9337 24.6589 6.89381 25.5531C7.86194 26.4547 9.27885 26.9997 11.0358 26.9997H12.2578C12.8101 26.9997 13.2578 27.4475 13.2578 27.9997C13.2578 28.552 12.8101 28.9997 12.2578 28.9997H11.0358C8.86578 28.9997 6.9318 28.3215 5.53077 27.0167C4.1217 25.7045 3.33398 23.834 3.33398 21.6211V10.3761C3.33398 8.16369 4.12178 6.29381 5.53093 4.98208Z" fill="#fff" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M3.36523 16C3.36523 15.4477 3.81294 15 4.36523 15H16.6272C17.1794 15 17.6272 15.4477 17.6272 16C17.6272 16.5523 17.1794 17 16.6272 17H4.36523C3.81294 17 3.36523 16.5523 3.36523 16Z" fill="#fff" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M9.15039 21.5131C9.15039 20.9608 9.59811 20.5131 10.1504 20.5131H10.847C11.3993 20.5131 11.847 20.9608 11.847 21.5131C11.847 22.0653 11.3993 22.5131 10.847 22.5131H10.1504C9.59811 22.5131 9.15039 22.0653 9.15039 21.5131Z" fill="#fff" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M9.15039 10.487C9.15039 9.93469 9.59811 9.48697 10.1504 9.48697H10.847C11.3993 9.48697 11.847 9.93469 11.847 10.487C11.847 11.0393 11.3993 11.487 10.847 11.487H10.1504C9.59811 11.487 9.15039 11.0393 9.15039 10.487ZM15.4683 10.487C15.4683 9.93469 15.916 9.48697 16.4683 9.48697H22.5136C23.0659 9.48697 23.5136 9.93469 23.5136 10.487C23.5136 11.0393 23.0659 11.487 22.5136 11.487H16.4683C15.916 11.487 15.4683 11.0393 15.4683 10.487Z" fill="#fff" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M18.417 19.7139C19.1082 18.8004 20.2219 18.0703 21.7978 18.0703C23.3736 18.0703 24.4872 18.8004 25.1786 19.7139C25.604 20.276 25.8731 20.9097 26.0107 21.4937C26.6736 21.6397 27.2874 21.9484 27.7838 22.4223C28.5026 23.1085 28.9079 24.0776 28.9079 25.2064C28.9079 26.7509 27.9916 28.0855 26.6684 28.6837C26.6551 28.6897 26.6415 28.6955 26.6279 28.7009C26.0868 28.9173 25.5487 28.9995 25.12 28.9995H18.4702C18.037 28.9995 17.5003 28.9131 16.9662 28.6968C16.9539 28.6917 16.9416 28.6865 16.9296 28.6811C15.6088 28.084 14.6875 26.7536 14.6875 25.2064C14.6875 24.0776 15.0928 23.1085 15.8118 22.4223C16.3082 21.9484 16.9219 21.6397 17.5847 21.4937C17.7223 20.9097 17.9915 20.276 18.417 19.7139Z" fill="#fff" />
                        </svg></div>
                      <div className="text-block-63 active">{t('productSwitchCloud')}</div>
                    </div>
                    <Link href="/once" className="flex-block-66 w-inline-block">
                      <div className="code-embed-4 w-embed"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16 27.8844H24.7477C26.6535 27.8844 28 26.6921 28 24.7904V21.8831C28 19.9748 26.6535 18.7891 24.7477 18.7891H7.25232C5.3466 18.7891 4 19.9748 4 21.8831V24.7904C4 26.6973 5.3466 27.8844 7.25232 27.8844H11.6262" stroke="#AFB7FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M21.7129 27.875V22.1902" stroke="#AFB7FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M8.7832 23.3385H10.0818" stroke="#AFB7FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M16 4.11459H7.25232C5.3466 4.11459 4 5.30681 4 7.20865V10.1159C4 12.0229 5.3466 13.2099 7.25232 13.2099H24.7477C26.6535 13.2099 28 12.0229 28 10.1159V7.20865C28 5.30162 26.6535 4.11459 24.7477 4.11459H20.3739" stroke="#AFB7FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M21.7129 13.2095V8.00259" stroke="#AFB7FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M8.7832 8.66147H10.0818" stroke="#AFB7FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg></div>
                      <div className="text-block-63">{t('productSwitchServer')}</div>
                    </Link>
                  </div>
                </div>
                <div className="w-layout-vflex flex-block-55"><img src="/images/Auhtgear_bannerlogo_CLOUD.svg" loading="lazy" width="361" alt="" className="image-79" />
                  <h1 className="heading herotag text-white ibm-plex-sans cloud-h1">{t('heroHeading')}</h1>
                  <p className="paragraph-large home-hero text-afb7ff ibm-plex-sans new-kv-desc no-margin">{t('heroParagraph')}</p>
                </div>
                <div className="w-layout-hflex home-hero-cta-wrapper">
                  <PlausibleLink href="https://portal.authgear.com/?utm_source=landing-page&utm_medium=link&utm_campaign=login_button" target="_blank" rel="noopener noreferrer" className="button-primary home-hero new-home radius-16 w-button" eventName="signup">{t('heroCtaGetStarted')}</PlausibleLink>
                  <a href="https://docs.authgear.com/" className="developer-docs">{t('heroCtaHowToIntegrate')}</a>
                </div>
              </div>
              <div className="home-hero-img-wrapper"><img src="/images/home_kv_ui2x.webp" loading="lazy" width="683" sizes="(max-width: 767px) 100vw, 683px" alt="" srcSet="/images/home_kv_ui2x-p-500.webp 500w, /images/home_kv_ui2x-p-800.webp 800w, /images/home_kv_ui2x-p-1080.webp 1080w, /images/home_kv_ui2x.webp 1366w" className="image-9" /></div>
            </div>
          </div>
        </div>

        {/* Trusted By Section */}
        <section className="bg-0e0f28">
          <div className="container-default flex-center gap20 padding48 w-container">
            <div className="w-layout-vflex flex-block-56">
              <div className="w-layout-vflex flex-block-57">
                <p className="paragraph-large home-hero text-afb7ff ibm-plex-sans new-kv-desc no-margin text-center trused-by">{t('trustedBy')}</p>
              </div>
            </div>
            <div className="images-wrapper home-hero">
              <div className="image-wrapper home-hero">
                <div className="home-lottie" data-animation-type="lottie" data-src="documents/data.json" data-loop="1" data-direction="1" data-autoplay="1" data-is-ix2-target="0" data-renderer="svg" data-default-duration="7.74107409244067" data-duration="0"></div><img src="/images/hero-mobile.png" alt="" className="image home-hero sm" />
              </div>
            </div>
            <div className="w-layout-hflex flex-block-85">
              <div className="logo-marquee-viewport">
                <div className="logo-marquee-track">
                  <div className="w-layout-hflex logos-container"><img loading="lazy" src="/images/logo-CIMIC2x.png" alt="" className="logo" /><img loading="lazy" src="/images/logo-HKL2x.png" alt="" className="logo" /><img loading="lazy" src="/images/logo-hkpc2x.png" alt="" className="logo" /><img loading="lazy" src="/images/logo-K112x.png" alt="" className="logo" /><img loading="lazy" src="/images/logo-MTR2x.png" alt="" className="logo" /><img loading="lazy" src="/images/logo-outback2x.png" alt="" className="logo" /><img loading="lazy" src="/images/logo-cornerstone2x.png" alt="" className="logo" /><img loading="lazy" src="/images/logo-place2x.png" alt="" className="logo" /></div>
                  <div className="w-layout-hflex logos-container"><img loading="lazy" src="/images/logo-CIMIC2x.png" alt="" className="logo" /><img loading="lazy" src="/images/logo-HKL2x.png" alt="" className="logo" /><img loading="lazy" src="/images/logo-hkpc2x.png" alt="" className="logo" /><img loading="lazy" src="/images/logo-K112x.png" alt="" className="logo" /><img loading="lazy" src="/images/logo-MTR2x.png" alt="" className="logo" /><img loading="lazy" src="/images/logo-outback2x.png" alt="" className="logo" /><img loading="lazy" src="/images/logo-cornerstone2x.png" alt="" className="logo" /><img loading="lazy" src="/images/logo-place2x.png" alt="" className="logo" /></div>
                </div>
                <a href="/customer-stories" target="_blank" rel="noopener noreferrer" className="link-block-7 w-inline-block">
                  <div>{t('readCustomerStory')}</div><img loading="lazy" src="/images/logo-read-story-arrow.svg" alt="" />
                </a>
              </div>
            </div>
            <div className="w-layout-blockcontainer container-1469 w-container"></div>
            <div className="w-layout-blockcontainer container-1469 left w-container"></div>
          </div>
        </section>

        {/* Streamline Security and Growth */}
        <div className="bg-0e0f28">
          <div className="container-default">
            <div className="container-default-inner">
              <div className="top-content flex-column text-center">
                <h2 className="cloud-h2">{t.rich('growthHeading', {
                  gradient: (chunks) => <span className="once-gradient">{chunks}</span>,
                })}</h2>
                <div className="top-content-description color-afb7ff ibm-plex-sans">{t('growthSubheading')}</div>
              </div>
              <div className="home-feature-cards-v2_wrap">
                <div id="w-node-d65fc3a0-b6c2-ca3b-1f39-c1cfdab29c78-19df57f8" className="home-feature-cards-v2_card dark center py-60"><img src="/images/home_growth-with-authgear_empower-users.svg" loading="lazy" width="235" alt="" className="home-feature-cards-v2_image width-auto px-60 height-100" />
                  <div className="home-feature-cards-v2_info-wrap mb-0 pt-0">
                    <h5 className="home-feature-cards-v2_info-heading text-center text-white">{t('growthCard1Title')}</h5>
                    <div className="home-feature-cards-v2_info-description paragraph-small text-center text-afb7ff">{t('growthCard1Desc')}</div>
                  </div>
                </div>
                <div id="w-node-d65fc3a0-b6c2-ca3b-1f39-c1cfdab29c7f-19df57f8" className="home-feature-cards-v2_card dark center py-60"><img src="/images/home_growth-with-authgear_integration.svg" loading="lazy" width="235" alt="" className="home-feature-cards-v2_image width-auto px-60 height-100" />
                  <div>
                    <div className="home-feature-cards-v2_info-wrap mb-0 pt-0">
                      <h5 className="home-feature-cards-v2_info-heading text-center text-white">{t('growthCard2Title')}</h5>
                      <div className="home-feature-cards-v2_info-description paragraph-small text-center text-afb7ff">{t('growthCard2Desc')}</div>
                    </div>
                  </div>
                </div>
                <div id="w-node-d65fc3a0-b6c2-ca3b-1f39-c1cfdab29c87-19df57f8" className="home-feature-cards-v2_card dark center py-60"><img src="/images/home_growth-with-authgear_security.svg" loading="lazy" width="235" alt="" className="home-feature-cards-v2_image width-auto px-60 height-100" />
                  <div>
                    <div className="home-feature-cards-v2_info-wrap mb-0 pt-0">
                      <h5 className="home-feature-cards-v2_info-heading text-center text-white">{t('growthCard3Title')}</h5>
                      <div className="home-feature-cards-v2_info-description paragraph-small text-center text-afb7ff">{t('growthCard3Desc')}</div>
                    </div>
                  </div>
                </div>
                <div id="w-node-d65fc3a0-b6c2-ca3b-1f39-c1cfdab29c8f-19df57f8" className="home-feature-cards-v2_card dark center py-60"><img src="/images/home_growth-with-authgear_built-all-business.svg" loading="lazy" width="235" alt="" className="home-feature-cards-v2_image width-auto px-60 height-100" />
                  <div>
                    <div className="home-feature-cards-v2_info-wrap mb-0 pt-0">
                      <h5 className="home-feature-cards-v2_info-heading text-center text-white">{t('growthCard4Title')}</h5>
                      <div className="home-feature-cards-v2_info-description paragraph-small text-center text-afb7ff">{t('growthCard4Desc')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secure Every User Journey / CIAM Solutions */}
        <div className="bg-0e0f28">
          <div className="container-default">
            <div className="container-default-inner">
              <div className="top-content flex-column text-center">
                <h2 className="cloud-h2">{t.rich('ciamHeading', {
                  gradient: (chunks) => <span className="once-gradient">{chunks}</span>,
                  br: () => <br />,
                })}</h2>
                <div className="top-content-description color-afb7ff ibm-plex-sans">{t('ciamSubheading')}</div>
              </div>
              <div className="w-layout-grid feature-grid-3x1 home-cards-grid-wrap">
                <Link href="/solutions/ciam-solution" className="home-card radius-48 bg-1c1d3c with-button p-0 w-inline-block">
                  <div className="home-card-wrap home-card-content">
                    <div className="home-card-image hover-to-white">
                      <div className="home-card-svg w-embed"><svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="0.5" y="0.5" width="59" height="59" rx="15.5" fill="url(#paint0_h_15118)" stroke="url(#paint1_h_15118)" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M41.5 37.5V44.5C41.5 46.432 39.934 48 38 48H22C20.066 48 18.5 46.432 18.5 44.5V37.5C18.5 34.98 19.5 32.564 21.282 30.782C23.064 29 25.48 28 28 28H32C34.52 28 36.936 29 38.718 30.782C40.5 32.564 41.5 34.98 41.5 37.5Z" fill="url(#paint2_h_15118)" />
                          <path d="M30 27C34.1421 27 37.5 23.6421 37.5 19.5C37.5 15.3579 34.1421 12 30 12C25.8579 12 22.5 15.3579 22.5 19.5C22.5 23.6421 25.8579 27 30 27Z" fill="url(#paint3_h_15118)" />
                          <path d="M45 27C47.7614 27 50 24.7614 50 22C50 19.2386 47.7614 17 45 17C42.2386 17 40 19.2386 40 22C40 24.7614 42.2386 27 45 27Z" fill="url(#paint4_h_15118)" />
                          <path d="M15 27C17.7614 27 20 24.7614 20 22C20 19.2386 17.7614 17 15 17C12.2386 17 10 19.2386 10 22C10 24.7614 12.2386 27 15 27Z" fill="url(#paint5_h_15118)" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M16.522 45H12C11.072 45 10.182 44.632 9.526 43.974C8.868 43.318 8.5 42.428 8.5 41.5V33.5C8.5 32.042 9.08 30.642 10.11 29.61C11.142 28.58 12.542 28 14 28H16C17.396 28 18.738 28.532 19.756 29.482C17.67 31.628 16.5 34.504 16.5 37.5V44.5C16.5 44.668 16.508 44.836 16.522 45Z" fill="url(#paint6_h_15118)" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M40.2439 29.482C41.2619 28.532 42.6039 28 43.9999 28H45.9999C47.4579 28 48.8579 28.58 49.8899 29.61C50.9199 30.642 51.4999 32.042 51.4999 33.5V41.5C51.4999 42.428 51.1319 43.318 50.4739 43.974C49.8179 44.632 48.9279 45 47.9999 45H43.4779C43.4919 44.836 43.4999 44.668 43.4999 44.5V37.5C43.4999 34.504 42.3299 31.628 40.2439 29.482Z" fill="url(#paint7_h_15118)" />
                          <defs>
                            <linearGradient id="paint0_h_15118" x1="4.5" y1="-1.62902e-07" x2="58.8397" y2="64.369" gradientUnits="userSpaceOnUse"><stop stopColor="#9296FF" /><stop offset="1" stopColor="#1E256F" /></linearGradient>
                            <linearGradient id="paint1_h_15118" x1="4.5" y1="-1.62902e-07" x2="58.8397" y2="64.369" gradientUnits="userSpaceOnUse"><stop stopColor="#1E256F" /><stop offset="1" stopColor="#9296FF" /></linearGradient>
                            <linearGradient id="paint2_h_15118" x1="30.0157" y1="28" x2="30.7335" y2="47.9911" gradientUnits="userSpaceOnUse"><stop stopColor="white" /><stop offset="1" stopColor="#C6C9FF" /></linearGradient>
                            <linearGradient id="paint3_h_15118" x1="30.0102" y1="12" x2="30.6291" y2="26.9871" gradientUnits="userSpaceOnUse"><stop stopColor="white" /><stop offset="1" stopColor="#C6C9FF" /></linearGradient>
                            <linearGradient id="paint4_h_15118" x1="45.0068" y1="17" x2="45.4194" y2="26.9914" gradientUnits="userSpaceOnUse"><stop stopColor="white" /><stop offset="1" stopColor="#C6C9FF" /></linearGradient>
                            <linearGradient id="paint5_h_15118" x1="15.0068" y1="17" x2="15.4194" y2="26.9914" gradientUnits="userSpaceOnUse"><stop stopColor="white" /><stop offset="1" stopColor="#C6C9FF" /></linearGradient>
                            <linearGradient id="paint6_h_15118" x1="14.1357" y1="28" x2="15.1927" y2="44.9484" gradientUnits="userSpaceOnUse"><stop stopColor="white" /><stop offset="1" stopColor="#C6C9FF" /></linearGradient>
                            <linearGradient id="paint7_h_15118" x1="45.8796" y1="28" x2="46.9366" y2="44.9484" gradientUnits="userSpaceOnUse"><stop stopColor="white" /><stop offset="1" stopColor="#C6C9FF" /></linearGradient>
                          </defs>
                        </svg></div>
                    </div>
                    <div className="home-card-title hover-to-white">
                      <div className="home-card-title-text dark hover-to-white">{t('ciamCard1Title')}</div>
                    </div>
                    <div className="home-card-description">
                      <div className="home-card-description-text dark hover-to-cee9ff">{t('ciamCard1Desc')}</div>
                    </div>
                  </div>
                  <div className="home-card-arrow hover-to-white w-embed"><svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip_h_a)"><path d="M18 0C8.07497 0 0 8.07497 0 18C0 27.925 8.07497 36 18 36C27.925 36 36 27.925 36 18C36 8.07497 27.925 0 18 0ZM18 33.75C9.31528 33.75 2.25 26.6847 2.25 18C2.25 9.31528 9.31528 2.25 18 2.25C26.6847 2.25 33.75 9.31528 33.75 18C33.75 26.6847 26.6847 33.75 18 33.75ZM25.5454 17.2046C25.985 17.6442 25.985 18.3561 25.5454 18.7954L19.9204 24.4204C19.7007 24.64 19.4127 24.75 19.125 24.75C18.8373 24.75 18.5493 24.64 18.3296 24.4204C17.89 23.9808 17.89 23.2689 18.3296 22.8296L22.0343 19.125H11.25C10.6287 19.125 10.125 18.6218 10.125 18C10.125 17.3782 10.6287 16.875 11.25 16.875H22.0343L18.3296 13.1704C17.89 12.7308 17.89 12.0189 18.3296 11.5796C18.7692 11.1403 19.4811 11.14 19.9204 11.5796L25.5454 17.2046Z" fill="currentColor" /></g><defs><clipPath id="clip_h_a"><rect width="36" height="36" fill="white" /></clipPath></defs></svg></div>
                </Link>
                <Link href="/solutions/frontline-workers-identity" className="home-card radius-48 bg-1c1d3c with-button p-0 w-inline-block">
                  <div className="home-card-wrap home-card-content">
                    <div className="home-card-image hover-to-white">
                      <div className="home-card-svg w-embed"><svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="0.5" y="0.5" width="59" height="59" rx="15.5" fill="url(#paint0_h_15136)" stroke="url(#paint1_h_15136)" />
                          <path d="M52 44C52 44.5304 51.7893 45.0391 51.4142 45.4142C51.0391 45.7893 50.5304 46 50 46H26C25.4696 46 24.9609 45.7893 24.5858 45.4142C24.2107 45.0391 24 44.5304 24 44C24 40.8174 25.2643 37.7652 27.5147 35.5147C29.7652 33.2643 32.8174 32 36 32H40C43.1826 32 46.2348 33.2643 48.4853 35.5147C50.7357 37.7652 52 40.8174 52 44ZM38 14C36.4177 14 34.871 14.4692 33.5554 15.3482C32.2398 16.2273 31.2145 17.4767 30.609 18.9385C30.0035 20.4003 29.845 22.0089 30.1537 23.5607C30.4624 25.1126 31.2243 26.538 32.3431 27.6569C33.462 28.7757 34.8874 29.5376 36.4393 29.8463C37.9911 30.155 39.5997 29.9965 41.0615 29.391C42.5233 28.7855 43.7727 27.7602 44.6518 26.4446C45.5308 25.129 46 23.5823 46 22C46 19.8783 45.1571 17.8434 43.6569 16.3431C42.1566 14.8429 40.1217 14 38 14ZM20 14C18.4177 14 16.871 14.4692 15.5554 15.3482C14.2398 16.2273 13.2145 17.4767 12.609 18.9385C12.0035 20.4003 11.845 22.0089 12.1537 23.5607C12.4624 25.1126 13.2243 26.538 14.3431 27.6569C15.462 28.7757 16.8874 29.5376 18.4393 29.8463C19.9911 30.155 21.5997 29.9965 23.0615 29.391C24.5233 28.7855 25.7727 27.7602 26.6518 26.4446C27.5308 25.129 28 23.5823 28 22C28 19.8783 27.1571 17.8434 25.6569 16.3431C24.1566 14.8429 22.1217 14 20 14ZM20 44C19.997 41.8992 20.4109 39.8187 21.2177 37.879C22.0245 35.9393 23.2081 34.179 24.7 32.7C23.4791 32.239 22.185 32.0019 20.88 32H19.12C16.1724 32.0053 13.3471 33.1786 11.2628 35.2628C9.17855 37.3471 8.00529 40.1724 8 43.12V44C8 44.5304 8.21071 45.0391 8.58579 45.4142C8.96086 45.7893 9.46957 46 10 46H20.36C20.1272 45.3587 20.0054 44.6823 20 44Z" fill="url(#paint2_h_15136)" />
                          <defs>
                            <linearGradient id="paint0_h_15136" x1="0" y1="0" x2="54.8395" y2="64.3586" gradientUnits="userSpaceOnUse"><stop stopColor="#65FF84" /><stop offset="1" stopColor="#05745F" /></linearGradient>
                            <linearGradient id="paint1_h_15136" x1="0" y1="0" x2="54.8395" y2="64.3586" gradientUnits="userSpaceOnUse"><stop stopColor="#05745F" /><stop offset="1" stopColor="#65FF84" /></linearGradient>
                            <linearGradient id="paint2_h_15136" x1="30.03" y1="14" x2="30.991" y2="45.9982" gradientUnits="userSpaceOnUse"><stop stopColor="white" /><stop offset="1" stopColor="#98FFE2" /></linearGradient>
                          </defs>
                        </svg></div>
                    </div>
                    <div className="home-card-title hover-to-white">
                      <div className="home-card-title-text dark hover-to-white">{t('ciamCard2Title')}</div>
                    </div>
                    <div className="home-card-description">
                      <div className="home-card-description-text dark hover-to-cee9ff">{t('ciamCard2Desc')}</div>
                    </div>
                  </div>
                  <div className="home-card-arrow hover-to-white w-embed"><svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip_h_b)"><path d="M18 0C8.07497 0 0 8.07497 0 18C0 27.925 8.07497 36 18 36C27.925 36 36 27.925 36 18C36 8.07497 27.925 0 18 0ZM18 33.75C9.31528 33.75 2.25 26.6847 2.25 18C2.25 9.31528 9.31528 2.25 18 2.25C26.6847 2.25 33.75 9.31528 33.75 18C33.75 26.6847 26.6847 33.75 18 33.75ZM25.5454 17.2046C25.985 17.6442 25.985 18.3561 25.5454 18.7954L19.9204 24.4204C19.7007 24.64 19.4127 24.75 19.125 24.75C18.8373 24.75 18.5493 24.64 18.3296 24.4204C17.89 23.9808 17.89 23.2689 18.3296 22.8296L22.0343 19.125H11.25C10.6287 19.125 10.125 18.6218 10.125 18C10.125 17.3782 10.6287 16.875 11.25 16.875H22.0343L18.3296 13.1704C17.89 12.7308 17.89 12.0189 18.3296 11.5796C18.7692 11.1403 19.4811 11.14 19.9204 11.5796L25.5454 17.2046Z" fill="currentColor" /></g><defs><clipPath id="clip_h_b"><rect width="36" height="36" fill="white" /></clipPath></defs></svg></div>
                </Link>
                <Link href="/solutions/b2b-saas-authentication" className="home-card radius-48 bg-1c1d3c with-button p-0 w-inline-block">
                  <div className="home-card-wrap home-card-content">
                    <div className="home-card-image hover-to-white">
                      <div className="home-card-svg w-embed"><svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="0.5" y="0.5" width="59" height="59" rx="15.5" fill="url(#paint0_h_15148)" stroke="url(#paint1_h_15148)" />
                          <path d="M24 10.5H15C12.5147 10.5 10.5 12.5147 10.5 15V24C10.5 26.4853 12.5147 28.5 15 28.5H24C26.4853 28.5 28.5 26.4853 28.5 24V15C28.5 12.5147 26.4853 10.5 24 10.5Z" fill="url(#paint2_h_15148)" />
                          <path d="M45 10.5H36C33.5147 10.5 31.5 12.5147 31.5 15V24C31.5 26.4853 33.5147 28.5 36 28.5H45C47.4853 28.5 49.5 26.4853 49.5 24V15C49.5 12.5147 47.4853 10.5 45 10.5Z" fill="url(#paint3_h_15148)" />
                          <path d="M24 31.5H15C12.5147 31.5 10.5 33.5147 10.5 36V45C10.5 47.4853 12.5147 49.5 15 49.5H24C26.4853 49.5 28.5 47.4853 28.5 45V36C28.5 33.5147 26.4853 31.5 24 31.5Z" fill="url(#paint4_h_15148)" />
                          <path d="M40.5 49.5C45.4706 49.5 49.5 45.4706 49.5 40.5C49.5 35.5294 45.4706 31.5 40.5 31.5C35.5294 31.5 31.5 35.5294 31.5 40.5C31.5 45.4706 35.5294 49.5 40.5 49.5Z" fill="url(#paint5_h_15148)" />
                          <defs>
                            <linearGradient id="paint0_h_15148" x1="0" y1="0" x2="54.8395" y2="64.3586" gradientUnits="userSpaceOnUse"><stop stopColor="#25A4FF" /><stop offset="1" stopColor="#580093" /></linearGradient>
                            <linearGradient id="paint1_h_15148" x1="0" y1="0" x2="54.8395" y2="64.3586" gradientUnits="userSpaceOnUse"><stop stopColor="#580093" /><stop offset="1" stopColor="#25A4FF" /></linearGradient>
                            <linearGradient id="paint2_h_15148" x1="19.5" y1="10.5" x2="19.5" y2="28.5" gradientUnits="userSpaceOnUse"><stop stopColor="white" /><stop offset="1" stopColor="#7CA6FF" /></linearGradient>
                            <linearGradient id="paint3_h_15148" x1="40.5" y1="10.5" x2="40.5" y2="28.5" gradientUnits="userSpaceOnUse"><stop stopColor="white" /><stop offset="1" stopColor="#7CA6FF" /></linearGradient>
                            <linearGradient id="paint4_h_15148" x1="19.5" y1="31.5" x2="19.5" y2="49.5" gradientUnits="userSpaceOnUse"><stop stopColor="white" /><stop offset="1" stopColor="#7CA6FF" /></linearGradient>
                            <linearGradient id="paint5_h_15148" x1="40.5" y1="31.5" x2="40.5" y2="49.5" gradientUnits="userSpaceOnUse"><stop stopColor="white" /><stop offset="1" stopColor="#7CA6FF" /></linearGradient>
                          </defs>
                        </svg></div>
                    </div>
                    <div className="home-card-title hover-to-white">
                      <div className="home-card-title-text dark hover-to-white">{t('ciamCard3Title')}</div>
                    </div>
                    <div className="home-card-description">
                      <div className="home-card-description-text dark hover-to-cee9ff">{t('ciamCard3Desc')}</div>
                    </div>
                  </div>
                  <div className="home-card-arrow hover-to-white w-embed"><svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip_h_c)"><path d="M18 0C8.07497 0 0 8.07497 0 18C0 27.925 8.07497 36 18 36C27.925 36 36 27.925 36 18C36 8.07497 27.925 0 18 0ZM18 33.75C9.31528 33.75 2.25 26.6847 2.25 18C2.25 9.31528 9.31528 2.25 18 2.25C26.6847 2.25 33.75 9.31528 33.75 18C33.75 26.6847 26.6847 33.75 18 33.75ZM25.5454 17.2046C25.985 17.6442 25.985 18.3561 25.5454 18.7954L19.9204 24.4204C19.7007 24.64 19.4127 24.75 19.125 24.75C18.8373 24.75 18.5493 24.64 18.3296 24.4204C17.89 23.9808 17.89 23.2689 18.3296 22.8296L22.0343 19.125H11.25C10.6287 19.125 10.125 18.6218 10.125 18C10.125 17.3782 10.6287 16.875 11.25 16.875H22.0343L18.3296 13.1704C17.89 12.7308 17.89 12.0189 18.3296 11.5796C18.7692 11.1403 19.4811 11.14 19.9204 11.5796L25.5454 17.2046Z" fill="currentColor" /></g><defs><clipPath id="clip_h_c"><rect width="36" height="36" fill="white" /></clipPath></defs></svg></div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Microservices Architecture */}
        <div>
          <div className="container-default">
            <div className="container-default-inner">
              <div className="top-content flex-column text-center">
                <h2 className="cloud-h2 dark-cloud-h2">{t.rich('microservicesHeading', {
                  gradient: (chunks) => <span className="once-gradient dark-cloud-h2">{chunks}</span>,
                  br: () => <br />,
                })}</h2>
                <div className="top-content-description ibm-plex-sans">{t('microservicesSubheading')}</div>
              </div>
              <div className="home-feature-cards-v2_wrap gap-32">
                <div id="w-node-d65fc3a0-b6c2-ca3b-1f39-c1cfdab29cd1-19df57f8" className="home-card radius-48 bg-diagonal-gradient-dark content-center">
                  <div className="home-card-wrap home-card-content">
                    <div className="home-card-image hover-to-white">
                      <div className="home-card-svg w-embed"><svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="0.5" y="0.5" width="59" height="59" rx="15.5" fill="url(#paint0_h_15168)" stroke="url(#paint1_h_15168)" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M43.778 29.9958C43.7771 27.2709 42.9684 24.6075 41.4539 22.3423C39.9395 20.0771 37.7873 18.3118 35.2697 17.2696C32.752 16.2274 29.9819 15.9552 27.3095 16.4873C24.6371 17.0194 22.1825 18.3319 20.256 20.259C18.3296 22.186 17.0177 24.6411 16.4865 27.3136C15.9552 29.9862 16.2283 32.7562 17.2712 35.2736C18.3142 37.7909 20.0801 39.9425 22.3458 41.4563C24.6115 42.97 27.2752 43.778 30 43.778Z" fill="url(#paint2_h_15168)" />
                          <defs>
                            <linearGradient id="paint0_h_15168" x1="0" y1="0" x2="54.8395" y2="64.3586" gradientUnits="userSpaceOnUse"><stop stopColor="#FF88DB" stopOpacity="0.93" /><stop offset="1" stopColor="#BF0030" /></linearGradient>
                            <linearGradient id="paint1_h_15168" x1="0" y1="0" x2="54.8395" y2="64.3586" gradientUnits="userSpaceOnUse"><stop stopColor="#BF0030" /><stop offset="1" stopColor="#FF88DB" stopOpacity="0.93" /></linearGradient>
                            <linearGradient id="paint2_h_15168" x1="30" y1="7.5" x2="30" y2="52.5" gradientUnits="userSpaceOnUse"><stop stopColor="white" /><stop offset="1" stopColor="#FFAED2" /></linearGradient>
                          </defs>
                        </svg></div>
                    </div>
                    <div className="home-card-title hover-to-white">
                      <div className="home-card-title-text text-white">{t('microCard1Title')}</div>
                    </div>
                    <div className="home-card-description">
                      <div className="home-card-description-text text-cee9ff">{t('microCard1Desc')}</div>
                    </div>
                  </div>
                </div>
                <div id="w-node-d65fc3a0-b6c2-ca3b-1f39-c1cfdab29cdb-19df57f8" className="home-card radius-48 bg-diagonal-gradient-dark content-center">
                  <div className="home-card-wrap home-card-content">
                    <div className="home-card-image hover-to-white">
                      <div className="home-card-svg w-embed"><svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="0.5" y="0.5" width="59" height="59" rx="15.5" fill="url(#paint0_h_15178)" stroke="url(#paint1_h_15178)" />
                          <g clipPath="url(#clip0_h_15178)">
                            <path d="M30 21.6667C25.8666 21.6667 22.5 25.025 22.5 29.1667C22.5 32.2663 24.3932 34.9347 27.0834 36.0756V37.9834L24.6584 40.4167L27.5751 43.3333L26.2499 44.6501V46.6919L29.6166 50.0001L32.9166 46.6919V36.0757C35.6067 34.9348 37.4999 32.2663 37.4999 29.1668C37.4999 25.025 34.1333 21.6667 30 21.6667Z" fill="url(#paint2_h_15178)" />
                            <path d="M44.325 22.8584C44.6834 21.7082 44.8251 20.5166 44.7584 19.2916C44.4583 14.2082 40.15 10.0416 35.15 10H35.075C31.0334 10 27.4334 12.5917 26.0167 16.3583C24.5334 15.125 22.625 14.5333 20.6834 14.7251C17.9083 15 15.5 16.9417 14.5333 19.675C14.1 20.8917 13.9917 22.1417 14.2166 23.4C11.6666 24.6584 10 27.3166 10 30.2333C10 34.4417 13.1583 37.5 17.5 37.5H25.2119L25.4166 37.2947V37.1034C22.6001 35.4774 20.8333 32.4712 20.8333 29.1664C20.8333 24.1119 24.9455 19.9997 30 19.9997C35.0546 19.9997 39.1667 24.1119 39.1667 29.1664C39.1667 32.4713 37.4 35.4775 34.5834 37.1035V37.5001H42.5C46.8417 37.5001 50 34.4418 50 30.2334C50 26.6667 47.625 23.6667 44.325 22.8584Z" fill="url(#paint3_h_15178)" />
                          </g>
                          <defs>
                            <linearGradient id="paint0_h_15178" x1="0" y1="0" x2="54.8395" y2="64.3586" gradientUnits="userSpaceOnUse"><stop stopColor="#65FF84" /><stop offset="1" stopColor="#05745F" /></linearGradient>
                            <linearGradient id="paint1_h_15178" x1="0" y1="0" x2="54.8395" y2="64.3586" gradientUnits="userSpaceOnUse"><stop stopColor="#05745F" /><stop offset="1" stopColor="#65FF84" /></linearGradient>
                            <linearGradient id="paint2_h_15178" x1="30" y1="21.6667" x2="30" y2="50.0001" gradientUnits="userSpaceOnUse"><stop stopColor="white" /><stop offset="1" stopColor="#C9FFD5" /></linearGradient>
                            <linearGradient id="paint3_h_15178" x1="30" y1="10" x2="30" y2="37.5001" gradientUnits="userSpaceOnUse"><stop stopColor="white" /><stop offset="1" stopColor="#C9FFD5" /></linearGradient>
                            <clipPath id="clip0_h_15178"><rect width="40" height="40" fill="white" transform="translate(10 10)" /></clipPath>
                          </defs>
                        </svg></div>
                    </div>
                    <div className="home-card-title hover-to-white">
                      <div className="home-card-title-text text-white">{t('microCard2Title')}</div>
                    </div>
                    <div className="home-card-description">
                      <div className="home-card-description-text text-cee9ff">{t('microCard2Desc')}</div>
                    </div>
                  </div>
                </div>
                <div id="w-node-d65fc3a0-b6c2-ca3b-1f39-c1cfdab29ce5-19df57f8" className="home-card radius-48 bg-diagonal-gradient-dark content-center">
                  <div className="home-card-wrap home-card-content">
                    <div className="home-card-image hover-to-white">
                      <div className="home-card-svg w-embed"><svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="0.5" y="0.5" width="59" height="59" rx="15.5" fill="url(#paint0_h_15194)" stroke="url(#paint1_h_15194)" />
                          <path d="M12.1774 20.4828C9.84976 18.1551 9.84976 14.3835 12.1774 12.0582C14.5026 9.73059 18.2743 9.73059 20.6019 12.0582C22.9296 14.3835 22.9296 18.1551 20.6019 20.4828C18.2743 22.808 14.5026 22.808 12.1774 20.4828Z" fill="url(#paint2_h_15194)" />
                          <defs>
                            <linearGradient id="paint0_h_15194" x1="0" y1="0" x2="54.8395" y2="64.3586" gradientUnits="userSpaceOnUse"><stop stopColor="#96D3FF" /><stop offset="1" stopColor="#001EB7" /></linearGradient>
                            <linearGradient id="paint1_h_15194" x1="0" y1="0" x2="54.8395" y2="64.3586" gradientUnits="userSpaceOnUse"><stop stopColor="#001EB7" /><stop offset="1" stopColor="#96D3FF" /></linearGradient>
                            <linearGradient id="paint2_h_15194" x1="29.9999" y1="10.3125" x2="29.9999" y2="49.6873" gradientUnits="userSpaceOnUse"><stop stopColor="white" /><stop offset="1" stopColor="#AFC9FF" /></linearGradient>
                          </defs>
                        </svg></div>
                    </div>
                    <div className="home-card-title hover-to-white">
                      <div className="home-card-title-text text-white">{t('microCard3Title')}</div>
                    </div>
                    <div className="home-card-description">
                      <div className="home-card-description-text text-cee9ff">{t('microCard3Desc')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Zero Trust Foundation */}
        <div>
          <div className="container-default">
            <div className="container-default-inner">
              <div className="top-content flex-column text-center">
                <h2 className="cloud-h2 dark-cloud-h2">{t.rich('zeroTrustHeading', {
                  gradient: (chunks) => <span className="once-gradient dark-cloud-h2">{chunks}</span>,
                })}</h2>
                <div className="top-content-description">{t('zeroTrustSubheading')}</div>
              </div>
              <div className="w-layout-grid feature-grid-3x1 home-cards-grid-wrap transparent">
                <div className="home-card transparent px-24 py-0">
                  <div className="home-card-wrap home-card-content text-center ibm-plex-sans">
                    <div className="home-card-image hover-to-white">
                      <div className="home-card-svg center w-embed"><svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="0.5" y="0.5" width="59" height="59" rx="15.5" fill="url(#paint0_h_15204)" stroke="url(#paint1_h_15204)" />
                          <path d="M38.6133 27.457H36.1523V26.2266C36.1523 22.8343 33.3922 20.0742 30 20.0742C26.6078 20.0742 23.8477 22.8343 23.8477 26.2266V27.457H21.3867V37.4648H38.6133V27.457Z" fill="url(#paint2_h_15204)" />
                          <defs>
                            <linearGradient id="paint0_h_15204" x1="0" y1="0" x2="54.8395" y2="64.3586" gradientUnits="userSpaceOnUse"><stop stopColor="#37CDC0" /><stop offset="1" stopColor="#114647" /></linearGradient>
                            <linearGradient id="paint1_h_15204" x1="0" y1="0" x2="54.8395" y2="64.3586" gradientUnits="userSpaceOnUse"><stop stopColor="#114647" /><stop offset="1" stopColor="#37CDC0" /></linearGradient>
                            <linearGradient id="paint2_h_15204" x1="30" y1="20.0742" x2="30" y2="37.4648" gradientUnits="userSpaceOnUse"><stop stopColor="white" /><stop offset="1" stopColor="#B1EAE5" /></linearGradient>
                          </defs>
                        </svg></div>
                    </div>
                    <div className="home-card-title hover-to-white">
                      <div className="home-card-title-text color-2e2e2e">{t('zeroTrustCard1Title')}</div>
                    </div>
                    <div className="home-card-description">
                      <div className="home-card-description-text color-626262 line-height-24">{t('zeroTrustCard1Desc')}</div>
                    </div>
                  </div>
                </div>
                <div className="home-card transparent px-24 py-0">
                  <div className="home-card-wrap home-card-content text-center ibm-plex-sans">
                    <div className="home-card-image hover-to-white">
                      <div className="home-card-svg center w-embed"><svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="0.5" y="0.5" width="59" height="59" rx="15.5" fill="url(#paint0_h_15215)" stroke="url(#paint1_h_15215)" />
                          <defs>
                            <linearGradient id="paint0_h_15215" x1="0" y1="0" x2="54.8395" y2="64.3586" gradientUnits="userSpaceOnUse"><stop stopColor="#65FF84" /><stop offset="1" stopColor="#05745F" /></linearGradient>
                            <linearGradient id="paint1_h_15215" x1="0" y1="0" x2="54.8395" y2="64.3586" gradientUnits="userSpaceOnUse"><stop stopColor="#02A789" /><stop offset="1" stopColor="#65FF84" /></linearGradient>
                          </defs>
                        </svg></div>
                    </div>
                    <div className="home-card-title hover-to-white">
                      <div className="home-card-title-text color-2e2e2e">{t('zeroTrustCard2Title')}</div>
                    </div>
                    <div className="home-card-description">
                      <div className="home-card-description-text color-626262 line-height-24">{t('zeroTrustCard2Desc')}</div>
                    </div>
                  </div>
                </div>
                <div className="home-card transparent px-24 py-0">
                  <div className="home-card-wrap home-card-content text-center ibm-plex-sans">
                    <div className="home-card-image hover-to-white">
                      <div className="home-card-svg center w-embed"><svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="0.5" y="0.5" width="59" height="59" rx="15.5" fill="url(#paint0_h_15227)" stroke="url(#paint1_h_15227)" />
                          <defs>
                            <linearGradient id="paint0_h_15227" x1="0" y1="0" x2="54.8395" y2="64.3586" gradientUnits="userSpaceOnUse"><stop stopColor="#FFC4C5" stopOpacity="0.93" /><stop offset="1" stopColor="#B5002D" /></linearGradient>
                            <linearGradient id="paint1_h_15227" x1="0" y1="0" x2="54.8395" y2="64.3586" gradientUnits="userSpaceOnUse"><stop stopColor="#B5002D" /><stop offset="1" stopColor="#FFC4C5" stopOpacity="0.93" /></linearGradient>
                          </defs>
                        </svg></div>
                    </div>
                    <div className="home-card-title hover-to-white">
                      <div className="home-card-title-text color-2e2e2e">{t('zeroTrustCard3Title')}</div>
                    </div>
                    <div className="home-card-description">
                      <div className="home-card-description-text color-626262 line-height-24">{t('zeroTrustCard3Desc')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Should Not Slow You Down */}
        <div className="bg-0e0f28">
          <div className="container-default py-80 flex-column">
            <div className="top-content flex-column text-center center">
              <h2 className="cloud-h2">{t.rich('buildFasterHeading', {
                gradient: (chunks) => <span className="once-gradient">{chunks}</span>,
                br: () => <br />,
              })}</h2>
              <div className="top-content-description color-afb7ff ibm-plex-sans">{t('buildFasterSubheading')}</div>
            </div>
            <div className="home-feature-cards-v2_wrap">
              <div id="w-node-d65fc3a0-b6c2-ca3b-1f39-c1cfdab29d23-19df57f8" className="home-feature-cards-v2_card dark center py-60"><img src="/images/home_built-faster-with-authgear_threats.svg" loading="lazy" width="235" alt="" className="home-feature-cards-v2_image width-auto px-30 height-100" />
                <div className="home-feature-cards-v2_info-wrap mb-0 pt-0">
                  <h5 className="home-feature-cards-v2_info-heading text-center text-white">{t('buildFasterCard1Title')}</h5>
                  <div className="home-feature-cards-v2_info-description paragraph-small text-center text-afb7ff">{t('buildFasterCard1Desc')}</div>
                </div>
              </div>
              <div id="w-node-d65fc3a0-b6c2-ca3b-1f39-c1cfdab29d2a-19df57f8" className="home-feature-cards-v2_card dark center py-60"><img src="/images/home_built-faster-with-authgear_user-trust.svg" loading="lazy" width="235" alt="" className="home-feature-cards-v2_image width-auto px-30 height-100" />
                <div>
                  <div className="home-feature-cards-v2_info-wrap mb-0 pt-0">
                    <h5 className="home-feature-cards-v2_info-heading text-center text-white">{t('buildFasterCard2Title')}</h5>
                    <div className="home-feature-cards-v2_info-description paragraph-small text-center text-afb7ff">{t('buildFasterCard2Desc')}</div>
                  </div>
                </div>
              </div>
              <div id="w-node-d65fc3a0-b6c2-ca3b-1f39-c1cfdab29d32-19df57f8" className="home-feature-cards-v2_card dark center py-60"><img src="/images/home_built-faster-with-authgear_user-management.svg" loading="lazy" width="235" alt="" className="home-feature-cards-v2_image width-auto px-30 height-100" />
                <div>
                  <div className="home-feature-cards-v2_info-wrap mb-0 pt-0">
                    <h5 className="home-feature-cards-v2_info-heading text-center text-white">{t('buildFasterCard3Title')}</h5>
                    <div className="home-feature-cards-v2_info-description paragraph-small text-center text-afb7ff">{t('buildFasterCard3Desc')}</div>
                  </div>
                </div>
              </div>
              <div id="w-node-d65fc3a0-b6c2-ca3b-1f39-c1cfdab29d3a-19df57f8" className="home-feature-cards-v2_card dark center py-60"><img src="/images/home_built-faster-with-authgear_user-experience.svg" loading="lazy" width="235" alt="" className="home-feature-cards-v2_image width-auto px-30 height-100" />
                <div>
                  <div className="home-feature-cards-v2_info-wrap mb-0 pt-0">
                    <h5 className="home-feature-cards-v2_info-heading text-center text-white">{t('buildFasterCard4Title')}</h5>
                    <div className="home-feature-cards-v2_info-description paragraph-small text-center text-afb7ff">{t('buildFasterCard4Desc')}</div>
                  </div>
                </div>
              </div>
              <div id="w-node-d65fc3a0-b6c2-ca3b-1f39-c1cfdab29d42-19df57f8" className="home-feature-cards-v2_card dark center py-60"><img src="/images/home_built-faster-with-authgear_flexibility.svg" loading="lazy" width="235" alt="" className="home-feature-cards-v2_image width-auto px-30 height-100" />
                <div>
                  <div className="home-feature-cards-v2_info-wrap mb-0 pt-0">
                    <h5 className="home-feature-cards-v2_info-heading text-center text-white">{t('buildFasterCard5Title')}</h5>
                    <div className="home-feature-cards-v2_info-description paragraph-small text-center text-afb7ff">{t('buildFasterCard5Desc')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Enterprises Trust / Customer Stories */}
        <div className="bg-image-customer-story">
          <div className="container-default">
            <div className="container-default-inner">
              <div className="top-content flex-column text-center">
                <h2 className="cloud-h2">{t.rich('enterpriseTrustHeading', {
                  gradient: (chunks) => <span className="once-gradient">{chunks}</span>,
                  br: () => <br />,
                })}</h2>
                <div className="top-content-description color-afb7ff ibm-plex-sans">{t('enterpriseTrustSubheading')}</div>
              </div>
              <div className="w-layout-hflex flex-block-86">
                <div className="w-layout-vflex flex-block-87">
                  <div className="w-layout-vflex container-1470"><img src="/images/home_customer-story-logo-place2x.png" loading="lazy" alt="" className="image-95" />
                    <div className="customer-story-description">{t('storyPlaceDesc')}</div>
                    <a href="https://www.authgear.com/customer-stories/palace" className="customer-story-link w-inline-block">
                      <div className="text-block-87">{t('readStory')}</div><img src="/images/home_customer-story-more.svg" loading="lazy" alt="" />
                    </a>
                  </div>
                  <div className="w-layout-vflex container-1470"><img src="/images/home_customer-story-logo-HKL2x.png" loading="lazy" alt="" className="image-95" />
                    <div className="customer-story-description">{t('storyHKLDesc')}</div>
                    <a href="https://www.authgear.com/customer-stories/hongkong-land" className="customer-story-link w-inline-block">
                      <div className="text-block-87">{t('readStory')}</div><img src="/images/home_customer-story-more.svg" loading="lazy" alt="" />
                    </a>
                  </div>
                </div>
                <div className="w-layout-vflex flex-block-87">
                  <div className="w-layout-vflex container-1470 no-logo">
                    <div className="customer-story-title">{t('storyFnBTitle')}</div>
                    <div className="customer-story-description">{t('storyFnBDesc')}</div>
                    <a href="https://www.authgear.com/customer-stories/global-qsr" className="customer-story-link w-inline-block">
                      <div className="text-block-87">{t('readStory')}</div><img src="/images/home_customer-story-more.svg" loading="lazy" alt="" />
                    </a>
                  </div>
                  <div className="w-layout-vflex container-1470"><img src="/images/home_customer-story-logo-MTR2x.png" loading="lazy" alt="" className="image-95" />
                    <div className="customer-story-description">{t('storyMTRDesc')}</div>
                    <a href="https://www.authgear.com/customer-stories/hongkong-mtr" className="customer-story-link w-inline-block">
                      <div className="text-block-87">{t('readStory')}</div><img src="/images/home_customer-story-more.svg" loading="lazy" alt="" />
                    </a>
                  </div>
                </div>
                <div className="w-layout-vflex flex-block-87">
                  <div className="w-layout-vflex container-1470"><img src="/images/home_customer-story-logo-Bupa2x.png" loading="lazy" alt="" className="image-95" />
                    <div className="customer-story-description">{t('storyBupaDesc')}</div>
                    <a href="https://www.authgear.com/customer-stories/bupa" className="customer-story-link w-inline-block">
                      <div className="text-block-87">{t('readStory')}</div><img src="/images/home_customer-story-more.svg" loading="lazy" alt="" />
                    </a>
                  </div>
                  <div className="w-layout-vflex container-1470"><img src="/images/home_customer-story-logo-cornerstone2x.png" loading="lazy" alt="" className="image-95" />
                    <div className="customer-story-description">{t('storyCornerstoneDesc')}</div>
                    <a href="https://www.authgear.com/customer-stories/cornerstone-technologies" className="customer-story-link w-inline-block">
                      <div className="text-block-87">{t('readStory')}</div><img src="/images/home_customer-story-more.svg" loading="lazy" alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="footer-form-section form__bg-dark">
          <div className="container-default">
            <div className="container-default-inner px-0">
              <div className="_2-block-flex footer-form">
                <div className="_2-block-flex-content footer-form">
                  <div className="_2-block-flex-content-text-wrap footer-form">
                    <h2 className="form-heading color-white footer-form">{t('formHeading')}</h2>
                    <div className="footerform__divider-sm"></div>
                    <div className="color-white footer-get-started-text">{t('formSubheading')}</div>
                  </div>
                </div>
                <div className="_2-block-flex-image footer-form">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
