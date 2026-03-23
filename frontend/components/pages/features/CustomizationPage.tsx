import Link from 'next/link';

interface Props {
  locale: string;
}

export default function CustomizationPage(_props: Props) {
  return (
    <>
<div className="featurespage__hero_v2 featurespage__hero_bg no-bg">
    <div className="features-hero-wrapper-new inner-bg">
      <div className="split-content features-hero-left">
        <div className="feature-small-title">Customization</div>
        <h1 className="title features-hero-v2 text-white">Make authentication look and feel like your brand</h1>
        <p className="features-hero-description text-purple">Craft login account experiences that are beautiful, and conversion-focused. With Authgear, you can brand our prebuilt pages in minutes.</p>
        <div className="features-hero-cta-wrapper">
          <a href="https://portal.authgear.com/?utm_source=feature-mfa&amp;utm_medium=link&amp;utm_campaign=start-for-free" target="_blank" className="button-primary feature-hero-btn-v2 featue-white-btn w-button">Start for Free</a>
          <Link href="/schedule-demo" target="_blank" className="button-secondary feature-hero-btn-v2 noscale text-white w-button">Get a Demo  <span className="text-span-23">&gt;</span></Link>
          <div className="w-layout-hflex features-hero-cta-description-weapper"><img src="/images/features-hero-banner-check-purple.svg" loading="lazy" alt="" />
            <p className="features-hero-cta-description text-purple">Free plan includes <span className="features-hero-cta-description-bold text-white">unlimited MAUs</span></p>
          </div>
        </div>
      </div><img src="/images/features-customization-banner-kv2x.webp" srcSet="/images/features-customization-banner-kv2x-p-500.webp 500w, /images/features-customization-banner-kv2x-p-800.webp 800w, /images/features-customization-banner-kv2x-p-1080.webp 1080w, /images/features-customization-banner-kv2x.webp 1244w" width={622} sizes="(max-width: 767px) 100vw, 622px" alt="" className="image features-hero-image-v2" />
    </div>
  </div>
  <div className="dark-section">
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="top-content">
          <h2 className="title features-page-v2 title-light">Login pages that are truly yours</h2>
        </div>
        <div className="_2-card-grid">
          <div id="w-node-_392e5f4d-b7eb-1a85-d216-98c37f39e3a9-d03dbfc4" className="svg-card-dark">
            <div className="svg-card-image-container">
              <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48" fill="none">
                  <path d="M42.4598 34.5312H36.6706M21.7294 34.5314H6.46094" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M6.46094 13.4649H12.2502M30.0466 13.4648H42.4596" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M23.9662 7.61328C27.1884 7.61328 29.8006 10.2254 29.8006 13.4475C29.8006 16.6697 27.1884 19.2818 23.9662 19.2818H18.2561C15.034 19.2818 12.4219 16.6697 12.4219 13.4475C12.4219 10.2254 15.034 7.61328 18.2561 7.61328" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M30.6652 40.3834C33.8872 40.3834 36.4994 37.7712 36.4994 34.5492C36.4994 31.327 33.8872 28.7148 30.6652 28.7148H27.686C24.4638 28.7148 21.8516 31.327 21.8516 34.5492C21.8516 36.8556 23.1902 38.8496 25.1328 39.7966" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg></div>
            </div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title-light left inter color-2e2e2e mobile-20px">Brandable hosted pages</div>
              <div className="svg-card-content-description-light">You can tailor without rebuilding auth from scratch.</div>
              <a href="https://docs.authgear.com/customization/built-in-ui/branding" className="card-cta-light w-button">Read Docs <span className="text-span-48">-&gt;</span></a>
            </div>
          </div>
          <div id="w-node-f12e6127-93a5-021d-1722-e55bcc913eb0-d03dbfc4" className="svg-card-dark">
            <div className="svg-card-image-container">
              <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48" fill="none">
                  <path d="M23.3092 6C20.6068 6 18.4159 8.19086 18.4159 10.8934L18.8938 14.8365C19.1862 17.2448 17.3083 19.3644 14.8831 19.3644H11.5378C9.6562 19.3644 8.12878 20.8862 8.12502 22.7678V22.781C8.1194 24.6758 9.65244 26.2106 11.5453 26.2106H35.0976C36.9868 26.2106 38.5178 24.6794 38.5178 22.7904C38.5178 20.8994 36.983 19.3663 35.092 19.3701L31.7448 19.3757C29.3252 19.3794 27.4474 17.2673 27.7322 14.8665L28.2046 10.8934C28.2046 8.19086 26.0118 6 23.3092 6Z" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M18.8075 40.6702C14.1484 40.6682 9.33874 40.6646 9.32188 40.659C8.2911 40.4152 7.85256 39.3546 8.40354 38.4512C8.54224 38.2244 10.5288 35.4358 10.3564 31.1496V26.2236" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M23.3203 10.9971V10.9771" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M34.8746 41.5346L35.0692 41.0082C35.8028 39.0228 37.3658 37.4574 39.3484 36.7226L39.8742 36.5278L39.3484 36.333C37.3658 35.5984 35.8028 34.033 35.0692 32.0476L34.8746 31.521L34.6802 32.0476C33.9466 34.033 32.3834 35.5984 30.401 36.333L29.875 36.5278L30.401 36.7226C32.3834 37.4574 33.9466 39.0228 34.6802 41.0082L34.8746 41.5346Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M22.9214 36.5278C23.311 35.246 24.3126 34.2426 25.5926 33.8526C24.3126 33.4624 23.311 32.4592 22.9214 31.1772C22.5318 32.4592 21.53 33.4624 20.25 33.8526C21.53 34.2426 22.5318 35.246 22.9214 36.5278Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M26.0234 42H26.0434" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg></div>
            </div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title-light left inter color-2e2e2e mobile-20px">Or bring your own UI</div>
              <div className="svg-card-content-description-light">Build pixel-perfect screens and drive the flow with our Authentication Flow API.</div>
            </div>
            <a href="https://docs.authgear.com/customization/custom-ui/authentication-flow-api" className="card-cta-light w-button">Read Docs <span className="text-span-48">-&gt;</span></a>
          </div>
        </div>
        <div className="solution-flex-container gap-40">
          <div className="solution-image-block"><img src="/images/features-customization-loginpage-gallery2x.webp" loading="lazy" width={624} sizes="(max-width: 767px) 100vw, 624px" alt="" srcSet="/images/features-customization-loginpage-gallery2x-p-500.webp 500w, /images/features-customization-loginpage-gallery2x-p-800.webp 800w, /images/features-customization-loginpage-gallery2x-p-1080.webp 1080w, /images/features-customization-loginpage-gallery2x.webp 1248w" className="image-radius-24" /></div>
          <div className="features-text-block line-height-40 p-0">
            <h3 className="features-page-h3 white">Login Gallery</h3>
            <p className="feature-content inverse">Explore how different login methods, layouts, and branding options can be combined to fit your product experience.</p>
            <Link href="/login-gallery" className="feature-white-button w-button">Explore Gallery</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="bg-f3f6ff">
    <div className="container-default wider-container-default">
      <div className="w-layout-vflex container-default-inner px-0 gap60">
        <div className="top-content feature-flex">
          <h2 className="title features-page-v2">Brand Every Authentication Experience</h2>
          <p className="paragraph-large text-center features-page-v2 margin-auto">Apply your branding consistently across login, security, SSO, and account settings while <br />keeping experiences simple and conversion-focused.</p>
        </div>
        <div className="w-layout-hflex sms-left-right"><img src="/images/features-customization-features-01-selfserve2x.webp" loading="lazy" width={560} sizes="(max-width: 767px) 100vw, 560px" alt="" srcSet="/images/features-customization-features-01-selfserve2x-p-500.webp 500w, /images/features-customization-features-01-selfserve2x-p-800.webp 800w, /images/features-customization-features-01-selfserve2x-p-1080.webp 1080w, /images/features-customization-features-01-selfserve2x.webp 1120w" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">Self-serve settings page</div>
            <div className="color-626262 line-height-24px">Give users control over their profile, security, sessions, and devices in a ready-made page you can brand.</div>
            <Link href="/features/self-serve-settings-page" className="card-cta-primary w-button">Learn More <span className="text-span-48">-&gt;</span></Link>
          </div>
        </div>
        <div className="w-layout-hflex sms-left-right reverse"><img src="/images/features-customization-features-03-security2x.webp" loading="lazy" width={560} sizes="(max-width: 767px) 100vw, 560px" alt="" srcSet="/images/features-customization-features-03-security2x-p-500.webp 500w, /images/features-customization-features-03-security2x-p-800.webp 800w, /images/features-customization-features-03-security2x.webp 1120w" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">Security that feels simple</div>
            <div className="color-626262 line-height-24px">Make safer the default without adding friction by passwordless and passkeys.</div>
          </div>
        </div>
        <div className="w-layout-hflex sms-left-right"><img src="/images/features-customization-features-04-sso2x.webp" loading="lazy" width={560} sizes="(max-width: 767px) 100vw, 560px" alt="" srcSet="/images/features-customization-features-04-sso2x-p-500.webp 500w, /images/features-customization-features-04-sso2x-p-800.webp 800w, /images/features-customization-features-04-sso2x-p-1080.webp 1080w, /images/features-customization-features-04-sso2x.webp 1120w" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">Single sign-on (SSO)</div>
            <div className="color-626262 line-height-24px">Deliver one, seamless identity across multiple web and mobile apps. Ship faster while reducing password fatigue.</div>
          </div>
        </div>
        <div className="w-layout-hflex sms-left-right reverse"><img src="/images/features-customization-features-05-sociallogin2x.webp" loading="lazy" width={560} sizes="(max-width: 767px) 100vw, 560px" alt="" srcSet="/images/features-customization-features-05-sociallogin2x-p-500.webp 500w, /images/features-customization-features-05-sociallogin2x-p-800.webp 800w, /images/features-customization-features-05-sociallogin2x-p-1080.webp 1080w, /images/features-customization-features-05-sociallogin2x.webp 1120w" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">Social login<br /></div>
            <div className="color-626262 line-height-24px">Accelerate sign-up with social accounts your users already have, fully compatible with hosted or custom UIs.</div>
          </div>
        </div>
        <div className="w-layout-hflex sms-left-right"><img src="/images/features-customization-features-06-sdk2x.webp" loading="lazy" width={560} sizes="(max-width: 767px) 100vw, 560px" alt="" srcSet="/images/features-customization-features-06-sdk2x-p-500.webp 500w, /images/features-customization-features-06-sdk2x-p-800.webp 800w, /images/features-customization-features-06-sdk2x.webp 1120w" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">Developer-friendly</div>
            <div className="color-626262 line-height-24px">Integrate in minutes with our SDKs that fit your stacks.</div>
          </div>
        </div>
        <div className="w-layout-hflex sms-left-right reverse"><img src="/images/features-customization-features-07-hooks2x.webp" loading="lazy" width={560} sizes="(max-width: 767px) 100vw, 560px" alt="" srcSet="/images/features-customization-features-07-hooks2x-p-500.webp 500w, /images/features-customization-features-07-hooks2x-p-800.webp 800w, /images/features-customization-features-07-hooks2x-p-1080.webp 1080w, /images/features-customization-features-07-hooks2x.webp 1120w" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">Extensible<br /></div>
            <div className="color-626262 line-height-24px">Go beyond the defaults with Hooks and APIs, validate inputs, enrich tokens, or adapt steps dynamically in your custom UI. </div>
            <Link href="/features/extensibility" className="card-cta-primary w-button">See Extenbility <span className="text-span-48">-&gt;</span></Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section className="footer-section-none-form">
    <div className="w-layout-blockcontainer container-default w-container">
      <div className="footer-section-none-form-content-wrap">
        <div className="footer-section-none-form-content">
          <h2 className="footer-section-none-form-title">Ready to design an auth experience users love?</h2>
        </div>
        <div className="footer-section-none-form-cta-wrap">
          <a href="https://portal.authgear.com/?utm_source=feature-mfa&amp;utm_medium=link&amp;utm_campaign=start-for-free" target="_blank" className="footer-section-none-form-button w-button">Start for free</a>
          <Link href="/schedule-demo" className="footer-section-none-form-button inverse w-button">Get a Demo</Link>
        </div>
        <div className="w-layout-hflex footer-section-none-form-description-weapper"><img src="/images/features-hero-banner-check-purple.svg" loading="lazy" alt="" />
          <p className="footer-section-none-form-cta-description">Free plan includes <span className="text-span-45">unlimited MAUs</span></p>
        </div>
      </div>
    </div>
  </section>
    </>
  );
}
