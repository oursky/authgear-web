import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

interface Props {
  locale: string;
}

export default function IdentitySecurityPage(_props: Props) {
  return (
    <>
<div className="featurespage__hero_v2 featurespage__hero_bg">
    <div className="features-hero-wrapper-new">
      <div className="split-content features-hero-left">
        <div className="featurespage__hero-titletag">Security &amp; Threat Prevention</div>
        <h1 className="title features-hero-v2">Fortify Your Business with Unbreakable Identity Security</h1>
        <p className="features-hero-description">Protect your business from the ever-evolving threat landscape with Authgear's robust security features. Our comprehensive approach to identity security safeguards your user data and builds trust.</p>
        <div className="features-hero-cta-wrapper">
          <a href="https://portal.authgear.com/?utm_source=feature-security-threat-prevention&amp;utm_medium=link&amp;utm_campaign=start-for-free" target="_blank" className="button-primary feature-hero-btn-v2 w-button">Start for Free</a>
          <Link href="/schedule-demo" target="_blank" className="button-secondary feature-hero-btn-v2 noscale w-button">Schedule Demo  <span className="text-span-23">{">"}</span></Link>
        </div>
      </div><img src="/images/features-securitythreat-hero-kv.svg" alt="" className="image features-hero-image-v2" />
    </div>
  </div>
  <div className="bg-f9f9fb">
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">Defend Against <span className="text-highlight-gradient">Digital Threats</span></h2>
          <p className="paragraph-large text-center features-page-v2">A strong identity security strategy involves multiple layers of protection. Authgear offers a suite of features designed to safeguard your business from common threats:</p>
        </div>
        <div className="grid-12 gap-36 mobile-bg-white mobile-gap-16">
          <div id="w-node-b232b15c-0c50-a4f5-657a-4dae8f8c3e81-56ac6c01" className="features-card-new px-24 bg-transparent space-between border-0 bg-white stretch">
            <div className="features-card-new_image last"><img src="/images/features-securitythreat-defend-protection.svg" loading="lazy" alt="" /></div>
            <div className="features-card-new_content-wrap">
              <div className="features-card-new_content-title">Brute-Force Protection</div>
              <div className="features-card-new_content-desc">Safeguard your user accounts from brute-force attacks with our intelligent lockout mechanisms. By limiting login attempts, we deter unauthorized access and protect your users' identities.</div>
            </div>
          </div>
          <div id="w-node-_67d41cbe-7c2d-33d4-de63-7da22187dd0d-56ac6c01" className="features-card-new px-24 bg-transparent space-between border-0 bg-white">
            <div className="features-card-new_image last"><img src="/images/features-securitythreat-defend-botdetection.svg" loading="lazy" alt="" /></div>
            <div className="features-card-new_content-wrap">
              <div className="features-card-new_content-title">Bot Detection &amp; Protection with Captcha</div>
              <div className="features-card-new_content-desc">Shield your login pages from automated attacks with our advanced bot detection and CAPTCHA system. By identifying and blocking malicious bots, you prevent account takeover attempts and protect your user data.</div>
            </div>
          </div>
          <div id="w-node-b232b15c-0c50-a4f5-657a-4dae8f8c3e89-56ac6c01" className="features-card-new px-24 bg-transparent space-between border-0 bg-white">
            <div className="features-card-new_image last"><img src="/images/features-securitythreat-defend-breachedpassword.svg" loading="lazy" alt="" /></div>
            <div className="features-card-new_content-wrap">
              <div className="features-card-new_content-title">Breached Password Detection</div>
              <div className="features-card-new_content-desc">Proactively identify compromised passwords by continuously monitoring password databases for leaks. Alert users to potential threats and enforce password resets to minimize risks.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="bg-f9f9fb">
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">Elevate Identity Security with<br />‍<span className="text-highlight-gradient">Strong Passwords and MFA</span></h2>
          <p className="paragraph-large text-center features-page-v2">While our identity security features provide a robust defense, a strong foundation is essential for optimal protection. Implementing strong password policies and multi-factor authentication (MFA) significantly enhances your security posture.</p>
        </div>
        <div data-current="Tab 1" data-duration-in="300" data-duration-out="100" className="_2-block-flex tabs-with-image ibm-plex-sans reverse-order w-tabs">
          <div className="hover-change tabs w-tab-menu">
            <a data-w-tab="Tab 1" className="hover-change-content-v2 with-background w-inline-block w-tab-link w--current">
              <div className="hover-change-title color-2e2e2e">Password Strength: Your First Line of Defense</div>
              <div className="hover-change-description color-cee9ff">Creating complex and unique passwords is the first step in safeguarding your accounts. Authgear helps you enforce strong password requirements, such as character length, complexity, and uniqueness. By promoting password hygiene, you reduce the risk of unauthorized access.</div>
            </a>
            <a data-w-tab="Tab 3" className="hover-change-content-v2 with-background w-inline-block w-tab-link">
              <div className="hover-change-title color-2e2e2e">Beyond Passwords: The Power of MFA</div>
              <div className="hover-change-description color-cee9ff">Multi-factor authentication adds an extra layer of security by requiring multiple forms of verification. Authgear supports various MFA options, including time-based one-time passwords (TOTP), push notifications, and security keys. With MFA enabled, even if your password is compromised, attackers will need additional credentials to gain access, making it significantly harder to breach your accounts.</div>
            </a>
          </div>
          <div className="_2-block-flex-image tabs first w-tab-content">
            <div data-w-tab="Tab 1" className="w-tab-pane w--tab-active"><img loading="eager" src="/images/features-securitythreat-identityMFA-passwordstrength.svg" alt="" /></div>
            <div data-w-tab="Tab 3" className="w-tab-pane"><img loading="eager" src="/images/features-securitythreat-identityMFA-mfa.svg" alt="" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="bg-f9f9fb">
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">Elevate Identity Security with<br />‍<span className="text-highlight-gradient">Strong Passwords and MFA</span></h2>
          <p className="paragraph-large text-center features-page-v2">While our identity security features provide a robust defense, a strong foundation is essential for optimal protection. Implementing strong password policies and multi-factor authentication (MFA) significantly enhances your security posture.</p>
        </div>
        <div data-current="Tab 1" data-duration-in="300" data-duration-out="100" className="_2-block-flex tabs-with-image ibm-plex-sans w-tabs">
          <div className="hover-change tabs w-tab-menu">
            <a data-w-tab="Tab 1" className="hover-change-content-v2 with-background w-inline-block w-tab-link w--current">
              <div className="hover-change-title color-2e2e2e">Biometrics &amp; Passkey Support</div>
              <div className="hover-change-description color-cee9ff">Simplify logins while enhancing security with biometric authentication and passkey support. Allow users to unlock their accounts effortlessly using fingerprint, facial recognition, or passkeys. This frictionless experience improves user satisfaction and strengthens your security posture.</div>
            </a>
            <a data-w-tab="Tab 3" className="hover-change-content-v2 with-background w-inline-block w-tab-link">
              <div className="hover-change-title color-2e2e2e">Password Manager Friendly</div>
              <div className="hover-change-description color-cee9ff">Make life easier for your users by seamlessly integrating with popular password managers. Allow users to securely store and autofill their credentials, reducing the burden of remembering complex passwords.</div>
            </a>
            <a data-w-tab="Tab 4" className="hover-change-content-v2 with-background w-inline-block w-tab-link">
              <div className="hover-change-title color-2e2e2e">More Social Login Options</div>
              <div className="hover-change-description color-cee9ff">Expand your user base by offering a variety of social login options. By integrating with popular platforms, you simplify the registration process and provide a convenient way for users to access your services.</div>
            </a>
          </div>
          <div className="_2-block-flex-image tabs last w-tab-content">
            <div data-w-tab="Tab 1" className="w-tab-pane w--tab-active"><img loading="eager" src="/images/features-securitythreat-seamless-biometric.svg" alt="" /></div>
            <div data-w-tab="Tab 3" className="w-tab-pane"><img loading="eager" src="/images/features-securitythreat-seamless-passwordmanager.svg" alt="" /></div>
            <div data-w-tab="Tab 4" className="w-tab-pane"><img loading="eager" src="/images/features-securitythreat-seamless-sociallogin.svg" alt="" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="bg-f9f9fb">
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">Your Comprehensive<br />‍<span className="text-highlight-gradient">Identity Security Solution</span></h2>
          <p className="paragraph-large text-center features-page-v2">Authgear offers a unified platform that addresses all your authentication and security needs. From robust protection against threats to a seamless user experience, we provide the tools to safeguard your business and delight your customers.</p>
        </div>
        <div className="grid-12 gap-36">
          <div id="w-node-c643bd94-7b56-89e0-c5d3-6cc6a8fb4c90-56ac6c01" className="features-card-new space-between">
            <div className="features-card-new_image center"><img src="/images/b2c_ciam_one-stop-sso.svg" loading="lazy" alt="" /></div>
            <div className="features-card-new_text">Single Sign On</div>
          </div>
          <div id="w-node-c643bd94-7b56-89e0-c5d3-6cc6a8fb4c95-56ac6c01" className="features-card-new space-between">
            <div className="features-card-new_image center"><img src="/images/b2c_ciam_one-stop-passwordless.svg" loading="lazy" alt="" /></div>
            <div className="features-card-new_text">Passwordless Login</div>
          </div>
          <div id="w-node-c643bd94-7b56-89e0-c5d3-6cc6a8fb4c9a-56ac6c01" className="features-card-new space-between">
            <div className="features-card-new_image center"><img src="/images/b2c_ciam_one-stop-mfa.svg" loading="lazy" alt="" /></div>
            <div className="features-card-new_text">Multi-Factor Authentication</div>
          </div>
          <div id="w-node-c643bd94-7b56-89e0-c5d3-6cc6a8fb4c9f-56ac6c01" className="features-card-new space-between">
            <div className="features-card-new_image center"><img src="/images/b2c_ciam_one-stop-biometric.svg" loading="lazy" alt="" /></div>
            <div className="features-card-new_text">Biometric &amp; Passkeys</div>
          </div>
          <div id="w-node-c643bd94-7b56-89e0-c5d3-6cc6a8fb4ca4-56ac6c01" className="features-card-new space-between">
            <div className="features-card-new_image center"><img src="/images/b2c_ciam_one-stop-breachedpassword.svg" loading="lazy" alt="" /></div>
            <div className="features-card-new_text">Breached Password Detection</div>
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
              <h2 className="form-heading color-white footer-form">Ready to Fortify Your Business?</h2>
              <div className="color-cee9ff">Protect your users and your brand with Authgear's ironclad identity security. Get started today with a free trial.</div>
              <div className="footerform__divider-sm"></div>
              <div className="color-white footer-get-started-text">Get started today! Free trials available.</div>
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
