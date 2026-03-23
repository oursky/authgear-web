import Link from 'next/link';

interface Props {
  locale: string;
}

export default function AuthenticationPage({ locale }: Props) {
  return (
    <>
<div className="featurespage__hero_v2 featurespage__hero_bg no-bg">
    <div className="features-hero-wrapper-new inner-bg">
      <div className="split-content features-hero-left">
        <div className="feature-small-title">Authentication</div>
        <h1 className="title features-hero-v2 text-white">Authentication <br />for modern apps</h1>
        <p className="features-hero-description text-purple">Identity platform for user authentication &amp; authorization. <br />Everything you need to ship secure, high-conversion login flows without rebuilding your app.</p>
        <div className="features-hero-cta-wrapper">
          <a href="https://portal.authgear.com/?utm_source=feature-mfa&amp;utm_medium=link&amp;utm_campaign=start-for-free" target="_blank" className="button-primary feature-hero-btn-v2 featue-white-btn w-button">Start for Free</a>
          <Link href="/schedule-demo" target="_blank" className="button-secondary feature-hero-btn-v2 noscale text-white w-button">Get a Demo  <span className="text-span-23">&gt;</span></Link>
          <div className="w-layout-hflex features-hero-cta-description-weapper"><img src="/images/features-hero-banner-check-purple.svg" loading="lazy" alt="" />
            <p className="features-hero-cta-description text-purple">Free plan includes <span className="features-hero-cta-description-bold text-white">unlimited MAUs</span></p>
          </div>
        </div>
      </div><img src="/images/features-authentication-hero-banner2x.webp" sizes="(max-width: 767px) 100vw, 738px" width={738} alt="" srcSet="/images/features-authentication-hero-banner2x-p-500.webp 500w, /images/features-authentication-hero-banner2x-p-800.webp 800w, /images/features-authentication-hero-banner2x-p-1080.webp 1080w, /images/features-authentication-hero-banner2x.webp 1476w" className="image features-hero-image-v2" />
    </div>
  </div>
  <div className="container-default feature-v3-container-default">
    <div className="container-default-inner px-0 gap-0">
      <div className="top-content feature-flex mb-60">
        <h2 className="title features-page-v2 features-page-v3">Fast to Implement. Seamless to Use.</h2>
      </div>
      <div className="_4-card-grid gap-32 one-row">
        <div id="w-node-_8224d6a6-7a37-8980-f09f-e4a0095c9659-fbb57f3a" className="svg-card white-svg-card">
          <div className="svg-card-image-container"><img src="/images/features-authentication-fast-implement-1.svg" loading="lazy" alt="" /></div>
          <div className="svg-card-content-container text-center gap-16">
            <div className="svg-card-content-description white-svg-card">Seamless login &amp; onboarding</div>
          </div>
        </div>
        <div id="w-node-_09387d2e-f1df-8c38-1585-b6d8afbfe152-fbb57f3a" className="svg-card white-svg-card">
          <div className="svg-card-image-container"><img src="/images/features-authentication-fast-implement-2.svg" loading="lazy" alt="" /></div>
          <div className="svg-card-content-container text-center gap-16">
            <div className="svg-card-content-description white-svg-card">Add auth in minutes</div>
          </div>
        </div>
        <div id="w-node-_455f6264-ca3b-540c-b788-43af8258a18e-fbb57f3a" className="svg-card white-svg-card">
          <div className="svg-card-image-container"><img src="/images/features-authentication-fast-implement-3.svg" loading="lazy" alt="" /></div>
          <div className="svg-card-content-container text-center gap-16">
            <div className="svg-card-content-description white-svg-card">Secure &amp; flexible RBAC</div>
          </div>
        </div>
        <div id="w-node-d34938ce-6e24-067f-cae7-a06d5afa6cdc-fbb57f3a" className="svg-card white-svg-card">
          <div className="svg-card-image-container"><img src="/images/features-attackprotection-values-04.svg" loading="lazy" alt="" /></div>
          <div className="svg-card-content-container text-center gap-16">
            <div className="svg-card-content-description white-svg-card">Customize to fit your brand</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section>
    <div className="container-default">
      <div className="container-default-inner">
        <div className="features-flex-container gap-40">
          <div className="solution-image-block"><img src="/images/features-authentication-features-01-methods.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">Authentication methods users love</h2>
            <div className="color-626262 line-height-24px">Passkeys, passwordless, biometric login, social providers, and classic passwords—pick what fits your audience</div>
          </div>
        </div>
        <div className="features-flex-container gap-40 reverse-order">
          <div className="solution-image-block"><img src="/images/features-authentication-features-02-otp.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">SMS, WhatsApp &amp;  Email One-Time Password</h2>
            <div className="color-626262 line-height-24px">Six-digit OTP via SMS, WhatsApp or email, with rate limiting, cooldowns, and expiry controls</div>
          </div>
        </div>
        <div className="features-flex-container gap-40">
          <div className="solution-image-block"><img src="/images/features-authentication-features-03-magiclinks.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">Magic Links</h2>
            <div className="color-626262 line-height-24px">One-tap email login for quick re-entry</div>
          </div>
        </div>
        <div className="features-flex-container gap-40 reverse-order">
          <div className="solution-image-block"><img src="/images/features-authentication-features-03-magiclinks.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">Social Login</h2>
            <div className="color-626262 line-height-24px">Apple, Google, Facebook, GitHub, LinkedIn, WeChat and more</div>
          </div>
        </div>
        <div className="features-flex-container gap-40">
          <div className="solution-image-block"><img src="/images/features-authentication-features-04-mfa.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">Adaptive MFA</h2>
            <div className="color-626262 line-height-24px">Step-up the right users at the right time; support TOTP, passkeys, OTP, and additional password</div>
          </div>
        </div>
        <div className="features-flex-container gap-40 reverse-order">
          <div className="solution-image-block"><img src="/images/features-authentication-features-06-anonymous.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">Anonymous Users</h2>
            <div className="color-626262 line-height-24px">Let users try your app instantly, then convert seamlessly when the moment’s right</div>
          </div>
        </div>
        <div className="features-flex-container gap-40">
          <div className="solution-image-block"><img src="/images/features-authentication-features-07-reauth.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">Re-auth</h2>
            <div className="color-626262 line-height-24px">Require an extra check before profile edits, payments, or key approvals</div>
          </div>
        </div>
        <div className="features-flex-container gap-40 reverse-order">
          <div className="solution-image-block"><img src="/images/features-authentication-features-08-bot.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">Bot &amp; Fraud Detection</h2>
            <div className="color-626262 line-height-24px">CAPTCHA and rate limits reduce abuse and SMS pumping risk</div>
          </div>
        </div>
        <div className="features-flex-container gap-40">
          <div className="solution-image-block"><img src="/images/features-authentication-features-09-sso.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">Single Sign-On (SSO) everywhere</h2>
            <div className="color-626262 line-height-24px">SSO across web applications and mobile applications</div>
          </div>
        </div>
        <div className="features-flex-container gap-40 reverse-order">
          <div className="solution-image-block"><img src="/images/features-authentication-features-10-branding.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">Branding &amp; Theming</h2>
            <div className="color-626262 line-height-24px">Apply your logo, colors, and copy to hosted login pages—or build a fully custom UI while Authgear handles the auth logic.</div>
          </div>
        </div>
        <div className="features-flex-container gap-40">
          <div className="solution-image-block"><img src="/images/features-authentication-features-11-m2m.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">M2M Tokens</h2>
            <div className="color-626262 line-height-24px">Require an extra check before profile edits, payments, or key approvals</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div className="container-default feature-v3-container-default">
    <div className="w-layout-grid container-default-inner px-0 gap-0"></div>
    <div className="w-layout-hflex container-1471">
      <div className="text-block-94">Developer<br />Experience</div>
      <div className="w-layout-vflex flex-block-94">
        <div className="text-block-96">SDKs</div>
        <div className="text-block-95">JavaScript/TypeScript (web &amp; SPA), iOS (Swift), Android (Kotlin), React Native, Flutter,…</div>
      </div>
      <div className="w-layout-vflex flex-block-94">
        <div className="text-block-96">Admin API</div>
        <div className="text-block-95">Provision users, assign roles, and query logs programmatically</div>
      </div>
    </div>
  </div>
  <div className="container-default feature-v3-container-default">
    <h2 className="title features-page-v2 features-page-v3">Use Cases</h2>
    <div className="collection-list-wrapper-8 w-dyn-list">
      <div role="list" className="collection-list-7 w-dyn-items">
        <div role="listitem" className="collection-item-5 w-dyn-item"><img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt="" className="image-102 w-dyn-bind-empty" />
          <div className="w-layout-vflex flex-block-95">
            <div className="text-block-98 w-dyn-bind-empty"></div>
            <a href="#" className="link-block-10 w-inline-block">
              <div>See Case Studies</div><img src="/images/Arrow-RIght-SM---Iconly-Pro.svg" loading="lazy" alt="" />
            </a>
          </div>
        </div>
      </div>
      <div className="w-dyn-empty">
        <div>No items found.</div>
      </div>
    </div>
  </div>
  <section className="footer-section-none-form">
    <div className="w-layout-blockcontainer container-default w-container">
      <div className="footer-section-none-form-content-wrap">
        <div className="footer-section-none-form-content">
          <h2 className="footer-section-none-form-title">Ready to transform your authentication experience?</h2>
          <div className="text-block-46">Ready to explore Authgear? Request a demo today!</div>
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
