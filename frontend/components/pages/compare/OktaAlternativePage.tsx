import Link from 'next/link';

interface Props {
  locale: string;
}

export default function OktaAlternativePage(_props: Props) {
  return (
    <>
      <div className="featurespage__hero_v2 featurespage__hero_bg vs-page">
        <div className="features-hero-wrapper-new gap140">
          <div className="split-content features-hero-left vs-mobile">
            <h1 className="title features-hero-v2 vs-mobile">Authgear - A powerful Okta alternative</h1>
            <p className="features-hero-description">Transparent pricing, highly customizable features, and an amazing developer experience make Authgear the best alternative to Okta.</p>
            <div className="features-hero-cta-wrapper vs-mobile">
              <a href="https://accounts.portal.authgear.com/signup" target="_blank" className="button-primary feature-hero-btn-v2 vs-mobile w-button">Start for Free</a>
              <Link href="/schedule-demo" target="_blank" className="button-secondary feature-hero-btn-v2 noscale button-secondary-with-boarder w-button">Schedule Demo</Link>
            </div>
          </div>
          <img className="image features-hero-image-v2 _300max" src="/images/compare_kv-Okta2x.webp" alt="" sizes="(max-width: 600px) 100vw, 600px" srcSet="/images/compare_kv-Okta2x-p-500.webp 500w, /images/compare_kv-Okta2x.webp 600w" />
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
              <h2 className="title features-page-v2">Why developers choose Authgear</h2>
            </div>
          </div>
          <div className="w-layout-hflex flex-block-71">
            <div className="svg-card gray-card">
              <div className="svg-card-image-container"><img src="/images/compare_why-pricing.svg" loading="lazy" alt="" /></div>
              <div className="svg-card-content-container text-center gap-16">
                <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Fair and All-Inclusive Pricing</div>
                <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">No surprise bills. Every Authgear plan includes all features—no hidden costs, no feature gates. Enjoy predictable pricing and full access from day one.</div>
              </div>
            </div>
            <div className="svg-card gray-card">
              <div className="svg-card-image-container"><img src="/images/compare_why-custom.svg" loading="lazy" alt="" /></div>
              <div className="svg-card-content-container text-center gap-16">
                <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Highly customizable</div>
                <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Don't settle for less. Authgear lets you tailor authentication to your needs with magic links, passkeys, WhatsApp OTP, advanced password policies, and complete branding control through our powerful Auth Flow API. Create a seamless, secure login flow that matches your brand and user expectations</div>
              </div>
            </div>
            <div className="svg-card gray-card">
              <div className="svg-card-image-container"><img src="/images/compare_why-growth.svg" loading="lazy" alt="" /></div>
              <div className="svg-card-content-container text-center gap-16">
                <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Empowering your growth</div>
                <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Get awesome, direct support from our team. We're here to help you succeed from the very beginning, ensuring a smooth transition and ongoing success.</div>
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
                  <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Modern Authentication Options</div>
                  <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Out-of-the-box support for passkeys, magic links, WhatsApp OTP, and advanced password policies—no extra configuration required.</div>
                </div>
              </div>
              <div className="svg-card">
                <div className="svg-card-image-container"><img src="/images/compare_features-developer.svg" loading="lazy" alt="" /></div>
                <div className="svg-card-content-container text-center gap-16">
                  <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Developer-Centric Experience</div>
                  <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Built for developers, Authgear provides robust APIs, clear documentation, and flexible integration options to streamline your workflow and accelerate your project.</div>
                </div>
              </div>
              <div className="svg-card">
                <div className="svg-card-image-container"><img src="/images/compare_features-flow.svg" loading="lazy" width={48} alt="" /></div>
                <div className="svg-card-content-container text-center gap-16">
                  <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Customizable Auth Flows</div>
                  <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Easily adapt login and registration flows to your business needs, branding, and user experience requirements.</div>
                </div>
              </div>
              <div className="svg-card">
                <div className="svg-card-image-container"><img src="/images/compare_features-support.svg" loading="lazy" alt="" /></div>
                <div className="svg-card-content-container text-center gap-16">
                  <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Direct Support and Expertise</div>
                  <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Our team is ready to assist with migration, integration, and ongoing support, ensuring your authentication is always reliable and secure.</div>
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
              <h2 className="title features-page-v2">Compare Authgear and Okta</h2>
            </div>
            <div className="div-block-25">
              <div className="w-layout-grid table-header">
                <div className="w-layout-blockcontainer w-container"></div>
                <img src="/images/compare_table-Authgear.svg" loading="lazy" alt="" />
                <div className="okta">Okta</div>
              </div>
              <div className="w-layout-grid table-header table-content">
                <div className="table-text title">Scaling price</div>
                <div className="table-text">Unlimited MAU</div>
                <div className="table-text">From $6 per user</div>
              </div>
              <div className="w-layout-grid table-header table-content">
                <div className="table-text title">Login with Phone number</div>
                <img src="/images/compare_table-check-blue.svg" loading="lazy" alt="" />
                <img src="/images/compare_table-false.svg" loading="lazy" alt="" />
              </div>
              <div className="w-layout-grid table-header table-content">
                <div className="table-text title">WhatsApp OTP</div>
                <img src="/images/compare_table-check-blue.svg" loading="lazy" alt="" />
                <img src="/images/compare_table-false.svg" loading="lazy" alt="" />
              </div>
              <div className="w-layout-grid table-header table-content">
                <div className="table-text title">Adaptive MFA</div>
                <img src="/images/compare_table-check-blue.svg" loading="lazy" alt="" />
                <div className="table-text">Essentials plan required</div>
              </div>
              <div className="w-layout-grid table-header table-content">
                <div className="table-text title">Social and Enterprise Connection</div>
                <img src="/images/compare_table-check-blue.svg" loading="lazy" alt="" />
                <img src="/images/compare_table-check-gray.svg" loading="lazy" alt="" />
              </div>
              <div className="w-layout-grid table-header table-content">
                <div className="table-text title">OIDC &amp; SAML SSO</div>
                <img src="/images/compare_table-check-blue.svg" loading="lazy" alt="" />
                <img src="/images/compare_table-check-gray.svg" loading="lazy" alt="" />
              </div>
              <div className="w-layout-grid table-header table-content">
                <div className="table-text title">Branding</div>
                <div className="table-text">Fully customizable with Auth Flow API</div>
                <div className="table-text dash">-</div>
              </div>
              <div className="w-layout-grid table-header table-content">
                <div className="table-text title">Email Support</div>
                <img src="/images/compare_table-check-blue.svg" loading="lazy" alt="" />
                <img src="/images/compare_table-false.svg" loading="lazy" alt="" />
              </div>
              <div className="w-layout-grid table-header table-content last-row">
                <div className="table-text title">Discord Support</div>
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
            <h1 className="title features-hero-v2 inverse nomargin">Ready to switch to Authgear?</h1>
            <div className="split-content features-hero-left nomargin">
              <p className="features-hero-description inverse">We have extensive experience migrating users from Auth0, Firebase, and in-house authentication systems. Migration to Authgear is seamless, with expert guidance every step of the way.</p>
              <div className="features-hero-cta-wrapper in-ready-to-switch">
                <Link href="/schedule-demo" target="_blank" className="button-primary feature-hero-btn-v2 nomargin w-button">Talk to us</Link>
                <a href="https://accounts.portal.authgear.com/signup" target="_blank" className="button-secondary feature-hero-btn-v2 noscale button-secondary-with-boarder inverse w-button">Start for Free</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
