import Link from 'next/link';

interface Props {
  locale: string;
}

export default function AttackProtectionPage(_props: Props) {
  return (
    <>
<div className="featurespage__hero_v2 featurespage__hero_bg no-bg">
    <div className="features-hero-wrapper-new inner-bg">
      <div className="split-content features-hero-left">
        <div className="feature-small-title">Attack Protection</div>
        <h1 className="title features-hero-v2 text-white">Fortify Your Business with Unbreakable Identity Security</h1>
        <p className="features-hero-description text-purple">Stop fraud, block bots, and protect every authentication flow automatically.</p>
        <div className="features-hero-cta-wrapper">
          <a href="https://portal.authgear.com/?utm_source=feature-mfa&amp;utm_medium=link&amp;utm_campaign=start-for-free" target="_blank" className="button-primary feature-hero-btn-v2 featue-white-btn w-button">Start for Free</a>
          <Link href="/schedule-demo" target="_blank" className="button-secondary feature-hero-btn-v2 noscale text-white w-button">Get a Demo  -&gt;</Link>
          <div className="w-layout-hflex features-hero-cta-description-weapper"><img src="/images/features-hero-banner-check-purple.svg" loading="lazy" alt="" />
            <p className="features-hero-cta-description text-purple">Free plan includes <span className="features-hero-cta-description-bold text-white">unlimited MAUs</span></p>
          </div>
        </div>
      </div><img src="/images/features-attackprotection-banner-kv2x.webp" sizes="(max-width: 767px) 100vw, 738px" width={738} alt="" srcSet="/images/features-attackprotection-banner-kv2x-p-500.webp 500w, /images/features-attackprotection-banner-kv2x-p-800.webp 800w, /images/features-attackprotection-banner-kv2x-p-1080.webp 1080w, /images/features-attackprotection-banner-kv2x.webp 1244w" className="image features-hero-image-v2" />
    </div>
  </div>
  <section>
    <div className="container-default">
      <div className="container-default-inner">
        <div className="features-flex-container gap-40">
          <div className="solution-image-block"><img src="/images/features-attackprotection-features-01-square.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">Bot Detection &amp; CAPTCHA Protection</h2>
            <div className="color-626262 line-height-24px">Detect and block automated sign-ups and brute-force attempts using CAPTCHAs, JA4 fingerprinting, and proof-of-work challenges</div>
          </div>
        </div>
        <div className="features-flex-container gap-40 reverse-order">
          <div className="solution-image-block"><img src="/images/features-attackprotection-features-02-square.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">Phishing-Resistant Authentication</h2>
            <div className="color-626262 line-height-24px">Passkey and WebAuthn support ensure only legitimate users can log in, protecting against phishing attacks.</div>
          </div>
        </div>
        <div className="features-flex-container gap-40">
          <div className="solution-image-block"><img src="/images/features-attackprotection-features-03-square.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">Multi-Factor Authentication (MFA)</h2>
            <div className="color-626262 line-height-24px">Add another layer of defense with flexible MFA options</div>
          </div>
        </div>
        <div className="features-flex-container gap-40 reverse-order">
          <div className="solution-image-block"><img src="/images/features-attackprotection-features-04-square.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">IP and Country Blocklist</h2>
            <div className="color-626262 line-height-24px">Block or throttle traffic from high-risk geographies and IP ranges to stop abuse before it starts.</div>
          </div>
        </div>
        <div className="features-flex-container gap-40">
          <div className="solution-image-block"><img src="/images/features-attackprotection-features-05-square.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">Account Lockout Policies</h2>
            <div className="color-626262 line-height-24px">Prevent brute-force attacks with configurable lockout thresholds and timed re-enablement.</div>
          </div>
        </div>
        <div className="features-flex-container gap-40 reverse-order">
          <div className="solution-image-block"><img src="/images/features-attackprotection-features-06-square.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">Rate Limits</h2>
            <div className="color-626262 line-height-24px">Protect your APIs and login flows from spamming and enumeration with per-action, per-user, or per-IP rate limits.</div>
          </div>
        </div>
        <div className="features-flex-container gap-40">
          <div className="solution-image-block"><img src="/images/features-attackprotection-features-07-square.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">Breached Password Detection</h2>
            <div className="color-626262 line-height-24px">Stop users from using compromised credentials. Detect and require reset when a password appears in public breach datasets.</div>
          </div>
        </div>
        <div className="features-flex-container gap-40 reverse-order">
          <div className="solution-image-block"><img src="/images/features-attackprotection-features-08-square.svg" loading="lazy" width={624} alt="" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h2 className="title features-page-v2 features-page-v3 in-tab">SMS Pumping Protection</h2>
            <div className="color-626262 line-height-24px">Detect and stop automated SMS fraud in real time. Authgear analyzes OTP traffic for unusual patterns, blocks suspicious activity automatically, and alerts admins instantly.</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div>
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="top-content feature-flex mb-60 top-content-title-only">
          <h2 className="title features-page-v2">Protect your apps and users</h2>
        </div>
        <div className="_2-card-grid gap-32 mb-40 _2-rows">
          <div id="w-node-d5c85166-0bd7-a9e6-ceea-f77a366e551a-5516fc99" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-attackprotection-values-01.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Prevent losses from SMS fraud and automated abuse</div>
            </div>
          </div>
          <div id="w-node-d5c85166-0bd7-a9e6-ceea-f77a366e5522-5516fc99" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/b2b-saas-why-customized.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Protect user trust with phishing-resistant, frictionless authentication</div>
            </div>
          </div>
          <div id="w-node-d5c85166-0bd7-a9e6-ceea-f77a366e552a-5516fc99" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-attackprotection-values-03.svg" loading="lazy" width={48} alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Reduce operational load automated detection and response means fewer manual interventions</div>
            </div>
          </div>
          <div id="w-node-d5c85166-0bd7-a9e6-ceea-f77a366e5532-5516fc99" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-attackprotection-values-04.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Scale securely flexible policies adapt to traffic spikes without blocking real users</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section>
    <div className="container-default wider-container-default">
      <div className="container-default-inner px-0 gap-0 pb-0"></div>
      <div className="w-layout-hflex features-attack-protection">
        <div className="split-content-right-only">
          <p className="features-attack-protection-built-for-title">Built for Developers &amp; Security Teams</p>
          <p className="features-attack-protection-built-for-description">Plug it in once, protect everywhere.Authgear’s SDKs and APIs make it simple to deploy robust protection across your apps.</p>
        </div>
      </div>
    </div>
  </section>
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
