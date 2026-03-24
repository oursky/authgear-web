import Link from 'next/link';

interface Props {
  locale: string;
}

export default function MultiFactorAuthenticationPage(_props: Props) {
  return (
    <>
<div className="featurespage__hero_v2 featurespage__hero_bg">
    <div className="features-hero-wrapper-new">
      <div className="split-content features-hero-left">
        <div className="featurespage__hero-titletag">Multi-Factor Authentication</div>
        <h1 className="title features-hero-v2">Adaptive MFA: Stronger security, less friction</h1>
        <p className="features-hero-description">Authgear adapts MFA challenges to context so you cut account takeovers without bloating every sign-in.</p>
        <div className="features-hero-cta-wrapper">
          <a href="https://portal.authgear.com/?utm_source=feature-mfa&amp;utm_medium=link&amp;utm_campaign=start-for-free" target="_blank" className="button-primary feature-hero-btn-v2 w-button">Start for Free</a>
          <Link href="/schedule-demo" target="_blank" className="button-secondary feature-hero-btn-v2 noscale w-button">Get a Demo  <span className="text-span-23">{">"}</span></Link>
          <div className="w-layout-hflex features-hero-cta-description-weapper"><img src="/images/features-hero-banner-check.svg" loading="lazy" alt="" />
            <p className="features-hero-cta-description">Free plan includes <span className="features-hero-cta-description-bold">unlimited MAUs</span></p>
          </div>
        </div>
      </div><img src="/images/features-mfa-hero-kv.svg" alt="" className="image features-hero-image-v2" />
    </div>
  </div>
  <div className="bg-f9f9fb">
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0 pb-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">What is<span className="text-highlight-gradient"> Multi-Factor Authentication (MFA)?</span></h2>
          <p className="paragraph-large text-center features-page-v2">Multi-factor authentication (MFA) is a security method that requires users to provide two or more forms of identification to gain access to a system or account. It's like adding an extra lock to your digital door for enhanced protection.</p>
        </div>
        <div className="features-flex-container gap-40 reverse-order">
          <div className="solution-image-block"><img src="/images/features-mfa-whatis-mfa.svg" loading="lazy" alt="" /></div>
          <div className="features-text-block p-0">
            <h3 className="features-h3-dark">What is Adaptive MFA?</h3>
            <div className="gradient-divider"></div>
            <div className="color-626262 line-height-24px">Adaptive MFA selectively prompts for stronger factors (passkeys, TOTP, OTP) based on risk rather than always-on MFA for everyone. Pair it with Authgear’s built-in rate limits, CAPTCHA, and account lockout for layered defense.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div className="container-default">
      <div className="container-default-inner">
        <div className="top-content feature-flex">
          <h2 className="title features-page-v2">MFA<br />‍‍<span className="text-highlight-gradient">Option to Suit Your Needs</span></h2>
        </div>
        <div data-current="Tab 1" data-duration-in="300" data-duration-out="100" className="_2-block-flex tabs-with-image ibm-plex-sans w-tabs">
          <div className="hover-change tabs upper w-tab-menu">
            <a data-w-tab="Tab 1" className="hover-change-content pt-0 w-inline-block w-tab-link w--current">
              <div className="hover-change-title">TOTP</div>
            </a>
            <a data-w-tab="Tab 2" className="hover-change-content pt-0 w-inline-block w-tab-link">
              <div className="hover-change-title">Additional Password</div>
            </a>
            <a data-w-tab="Tab 3" className="hover-change-content pt-0 w-inline-block w-tab-link">
              <div className="hover-change-title">Email Magic Link</div>
            </a>
            <a data-w-tab="Tab 4" className="hover-change-content pt-0 w-inline-block w-tab-link">
              <div className="hover-change-title">WhatsApp OTP</div>
            </a>
          </div>
          <div className="_2-block-flex-image tabs w-tab-content">
            <div data-w-tab="Tab 1" className="w-tab-pane w--tab-active"><img loading="eager" src="/images/features-mfa-options-totp.svg" alt="" /></div>
            <div data-w-tab="Tab 2" className="w-tab-pane"><img width="Auto" loading="eager" alt="" src="/images/features-mfa-options-password.svg" /></div>
            <div data-w-tab="Tab 3" className="w-tab-pane"><img loading="eager" src="/images/features-mfa-options-magiclink.svg" alt="" /></div>
            <div data-w-tab="Tab 4" className="w-tab-pane"><img width="Auto" loading="eager" alt="" src="/images/features-mfa-options-smscode.svg" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="bg-f3f6ff">
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">User experience<br />‍‍<span className="text-highlight-gradient">that feels simple</span></h2>
          <p className="paragraph-large text-center features-page-v2">A login experience that stays fast and intuitive, even when extra security steps are needed.</p>
        </div>
        <div className="_2-card-grid gap-32 mb-40">
          <div id="w-node-_8b40603f-a0a3-fba6-2aa5-508f57e22316-c0727b43" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-mfa-ux-simple-01.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Challenge only when needed; keep everyday logins fast</div>
            </div>
          </div>
          <div id="w-node-_1bda52b1-b938-4e5e-3c55-8a3548943584-c0727b43" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-mfa-ux-simple-02.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Pre-built OTP/MFA screens and settings page reduce confusion and support tickets</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">Developer-friendly</h2>
          <p className="paragraph-large text-center features-page-v2">Built to help developers ship quickly and customize authentication as needs grow.</p>
        </div>
        <div className="_2-card-grid gap-32 mb-40">
          <div id="w-node-_01f09dc9-c431-9a20-bbaa-da412ff4193b-c0727b43" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-mfa-ux-developer-01.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Ship fast with Web, iOS, Android, RN, Flutter SDKs and an Admin API</div>
            </div>
          </div>
          <div id="w-node-_01f09dc9-c431-9a20-bbaa-da412ff41941-c0727b43" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-mfa-ux-developer-02.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Tune flows with Custom Auth Flow and extend logic with Hooks</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container-default">
      <div className="container-default-inner">
        <div className="secondary-block">
          <div className="secondary-block-heading-wrap">
            <div className="secondary-block-heading">Deep Dive into Multi-Factor Authentication</div>
            <div className="secondary-block-subheading">Discover the different types of MFA, how they work, and how to implement a frictionless authentication experience for your users.</div>
          </div>
          <div className="_3-card-grid">
            <a href="https://www.authgear.com/post/what-is-multi-factor-authentication-mfa" className="secondary-block-card-link bg-white w-inline-block">
              <div className="secondary-block-card-image-container"><img src="/images/features-mfa-deepdive-article.svg" loading="lazy" alt="" className="secondary-block-card-image" /></div>
              <div className="secondary-block-card-content">What Is Multi-Factor Authentication (MFA) And How Does It Work?</div>
            </a>
            <a href="https://www.authgear.com/post/top-three-types-of-user-authentication" className="secondary-block-card-link bg-white w-inline-block">
              <div className="secondary-block-card-image-container"><img src="/images/features-mfa-deepdive-article.svg" loading="lazy" alt="" className="secondary-block-card-image" /></div>
              <div className="secondary-block-card-content">Top Three Types of User Authentication</div>
            </a>
            <a href="https://www.authgear.com/post/frictionless-authentication#:~:text=devices%20and%20services.-,Implement%20Frictionless%20Authentication%20with%20Authgear,%2C%20business%20partners%2C%20and%20customers." className="secondary-block-card-link bg-white w-inline-block">
              <div className="secondary-block-card-image-container"><img src="/images/features-mfa-deepdive-article.svg" loading="lazy" alt="" className="secondary-block-card-image" /></div>
              <div className="secondary-block-card-content">Frictionless Authentication: What Is It &amp; How To Implement It?</div>
            </a>
          </div>
        </div>
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
