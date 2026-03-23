import Link from 'next/link';

interface Props {
  locale: string;
}

export default function SelfServeSettingsPagePage({ locale }: Props) {
  return (
    <>
<div className="featurespage__hero_v2 featurespage__hero_bg no-bg">
    <div className="features-hero-wrapper-new inner-bg">
      <div className="split-content features-hero-left">
        <div className="feature-small-title">Self-serve Settings Page</div>
        <h1 className="title features-hero-v2 text-white">Empower Users to Manage Their Own Accounts</h1>
        <p className="features-hero-description text-purple">A ready-made settings page that gives users full control over their profile, security, and session.</p>
        <div className="features-hero-cta-wrapper">
          <a href="https://portal.authgear.com/?utm_source=feature-mfa&amp;utm_medium=link&amp;utm_campaign=start-for-free" target="_blank" className="button-primary feature-hero-btn-v2 featue-white-btn w-button">Start for Free</a>
          <Link href="/schedule-demo" target="_blank" className="button-secondary feature-hero-btn-v2 noscale text-white w-button">Get a Demo  <span className="text-span-23">&gt;</span></Link>
          <div className="w-layout-hflex features-hero-cta-description-weapper"><img src="/images/features-hero-banner-check-purple.svg" loading="lazy" alt="" />
            <p className="features-hero-cta-description text-purple">Free plan includes <span className="features-hero-cta-description-bold text-white">unlimited MAUs</span></p>
          </div>
        </div>
      </div><img src="/images/features-selfserve-banner-kv2x.webp" srcSet="/images/features-selfserve-banner-kv2x-p-500.webp 500w, /images/features-selfserve-banner-kv2x-p-800.webp 800w, /images/features-selfserve-banner-kv2x-p-1080.webp 1080w, /images/features-selfserve-banner-kv2x.webp 1244w" width={738} sizes="(max-width: 767px) 100vw, 738px" alt="" className="image features-hero-image-v2" />
    </div>
  </div>
  <section>
    <div className="container-default wider-container-default">
      <div className="container-default-inner px-0 gap-0 pb-0"></div>
      <div className="w-layout-hflex features-callout-card">
        <h1 className="title features-hero-v2 inverse nomargin">Challenge</h1>
        <div className="split-content features-hero-left nomargin">
          <p className="features-hero-description inverse">Your team should spend time building the features that make your product great, not rebuilding the same account settings UI again. With Authgear, users can safely manage their own accounts while you maintain full control and visibility.</p>
        </div>
      </div>
    </div>
  </section>
  <div className="bg-f3f6ff bg-f9f9fb">
    <div className="container-default wider-container-default">
      <div className="w-layout-vflex container-default-inner px-0 gap60">
        <div className="top-content feature-flex">
          <h2 className="title features-page-v2">Self-Serve Account and Security Settings</h2>
        </div>
        <div className="w-layout-hflex sms-left-right"><img src="/images/features-selfserve-setting-profile.svg" loading="lazy" alt="" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">Manage Profile</div>
            <div className="color-626262 line-height-24px">Edit personal details such as name, email, phone number, and custom attributes — with built-in email and phone verification flows.</div>
          </div>
        </div>
        <div className="w-layout-hflex sms-left-right reverse"><img src="/images/features-selfserve-setting-account.svg" loading="lazy" alt="" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">Update Security Settings</div>
            <div className="color-626262 line-height-24px">Add or remove passkeys, MFA methods, and connected social accounts. Enable passwordless login or reset existing credentials without contacting support.</div>
          </div>
        </div>
        <div className="w-layout-hflex sms-left-right"><img src="/images/features-selfserve-setting-sessions.svg" loading="lazy" alt="" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">Session Management</div>
            <div className="color-626262 line-height-24px">View active sessions across devices, revoke access instantly, and stay secure everywhere.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="top-content-title-only feature-flex mb-60">
          <h2 className="title features-page-v2">Built-In Experience, Fully Brandable</h2>
        </div>
        <div className="_2-card-grid gap-32 mb-40">
          <div id="w-node-_91bc7d1c-9bed-22d0-72f8-646d51c88078-e65171da" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-selfserve-builtin-ready.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Ready to deploy — works out of the box with any Authgear project</div>
            </div>
          </div>
          <div id="w-node-_91bc7d1c-9bed-22d0-72f8-646d51c88080-e65171da" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-attackprotection-values-04.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Customize colors, typography, and logos to match your product UI</div>
            </div>
          </div>
        </div>
        <div className="_2-card-grid gap-32 mb-40">
          <div id="w-node-_91bc7d1c-9bed-22d0-72f8-646d51c88089-e65171da" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-selfserve-builtin-language.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Localized for multiple languages</div>
            </div>
          </div>
          <div id="w-node-_91bc7d1c-9bed-22d0-72f8-646d51c88091-e65171da" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-selfserve-builtin-device.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Works seamlessly on desktop and mobile</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="bg-f3f6ff">
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="top-content-title-only feature-flex mb-60">
          <h2 className="title features-page-v2">One Settings Experience Across All Your Apps</h2>
        </div>
        <div className="_2-card-grid gap-32 mb-40">
          <div id="w-node-f4e25d52-ee92-ae3d-649d-3907a5632437-e65171da" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-selfserve-cx-faster.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Build faster</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Integrate a complete account management UI in minutes</div>
            </div>
          </div>
          <div id="w-node-f4e25d52-ee92-ae3d-649d-3907a563243f-e65171da" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-selfserve-cx-apps.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Focus on your core app</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Authgear takes care of security, UX, and compliance</div>
            </div>
          </div>
        </div>
        <div className="_2-card-grid gap-32 mb-40">
          <div id="w-node-f4e25d52-ee92-ae3d-649d-3907a5632448-e65171da" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-selfserve-cx-security.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Improve security posture</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Users can update credentials and sessions safely</div>
            </div>
          </div>
          <div id="w-node-f4e25d52-ee92-ae3d-649d-3907a5632450-e65171da" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-selfserve-cx-ux.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Deliver consistent UX</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">One unified settings experience across all your apps</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section className="footer-section-none-form">
    <div className="w-layout-blockcontainer container-default w-container">
      <div className="footer-section-none-form-content-wrap">
        <div className="footer-section-none-form-content">
          <h2 className="footer-section-none-form-title">Start building your product</h2>
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
