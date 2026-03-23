import Link from 'next/link';

interface Props {
  locale: string;
}

export default function IdentitySecurityPage({ locale }: Props) {
  return (
    <>
<div className="featurespage__hero_v2 featurespage__hero_bg">
    <div className="features-hero-wrapper-new">
      <div className="split-content features-hero-left">
        <div className="featurespage__hero-titletag">Security &amp; Threat Prevention</div>
        <h1 className="title features-hero-v2">Fortify Your Business with Unbreakable Identity Security</h1>
        <p className="features-hero-description">Protect your business from the ever-evolving threat landscape with Authgear&#x27;s robust security features. Our comprehensive approach to identity security safeguards your user data and builds trust.</p>
        <div className="features-hero-cta-wrapper">
          <a href="https://portal.authgear.com/?utm_source=feature-security-threat-prevention&amp;utm_medium=link&amp;utm_campaign=start-for-free" target="_blank" className="button-primary feature-hero-btn-v2 w-button">Start for Free</a>
          <Link href="/schedule-demo" target="_blank" className="button-secondary feature-hero-btn-v2 noscale w-button">Schedule Demo  <span className="text-span-23">&gt;</span></Link>
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
              <div className="features-card-new_content-desc">Safeguard your user accounts from brute-force attacks with our intelligent lockout mechanisms. By limiting login attempts, we deter unauthorized access and protect your users&#x27; identities.</div>
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
              <div className="color-cee9ff">Protect your users and your brand with Authgear&#x27;s ironclad identity security. Get started today with a free trial.</div>
              <div className="footerform__divider-sm"></div>
              <div className="color-white footer-get-started-text">Get started today! Free trials available.</div>
            </div>
          </div>
          <div className="_2-block-flex-image footer-form">
            <div id="wf-form-Authgear-Talk-with-Us" className="form-block w-form">
              <form id="wf-form-Authgear-Talk-with-Us-2" name="wf-form-Authgear-Talk-with-Us-2" method="post" className="contact-form">
                <div className="margin-vertical margin-small"><label htmlFor="Name-5" className="getdemo-label">Full Name<span className="text-span-7">*</span></label><input className="getdemo-field w-input" maxLength={256} name="Name" placeholder="" type="text" id="Name-5" required /></div>
                <div className="margin-vertical margin-small"><label htmlFor="Email-6" className="getdemo-label">Work Email<span className="text-span-8">*</span></label><input className="getdemo-field w-input" maxLength={256} name="Email" placeholder="" type="email" id="Email-6" required /></div>
                <div className="margin-vertical margin-small"><label htmlFor="Phone-3" className="getdemo-label">Phone Number<span className="text-span-9">*</span></label><input className="getdemo-field w-input" maxLength={256} name="Phone" placeholder="" type="tel" id="Phone-3" required /><input className="text-field w-input" maxLength={256} name="Country" placeholder="" type="text" id="Country-4" required />
                  <div className="html-embed w-embed"><span id="valid-msg" className="hide">Valid number</span>
                    <span id="error-msg" className="hide"></span>
                  </div>
                </div>
                <div className="margin-vertical margin-small"><label htmlFor="Company-5" className="getdemo-label">Company Name<span className="text-span-10">*</span></label><input className="getdemo-field w-input" maxLength={256} name="Company" placeholder="" type="text" id="Company-5" required /></div>
                <div className="margin-vertical margin-small"><label htmlFor="how-hear" className="getdemo-label">How did you hear about us?<span className="text-span-10">*</span></label><select id="how-hear" name="how-hear" required className="getdemo-field w-select">
                    <option value="">Select one</option>
                    <option value="organic-search">Search Engine</option>
                    <option value="llm">AI Tools (e.g. ChatGPT, Gemini, etc)</option>
                    <option value="github">GitHub</option>
                    <option value="others">Others</option>
                  </select></div>
                <div className="margin-vertical margin-small"><label htmlFor="Use-Case" className="getdemo-label">Anything else?<span className="text-span-10">*</span></label><textarea required placeholder="Tell us more about your project, needs, timeline" maxLength={500} id="Use-Case" name="Use-Case" className="get-demo-form-field w-input"></textarea></div>
                <div data-sitekey="6LdonPYqAAAAAGzNsg7cDyHi5VTueApPzHoOx0Y4" className="w-form-formrecaptcha g-recaptcha g-recaptcha-error g-recaptcha-disabled"></div>
                <div className="margin-vertical margin-medium"><input type="submit" data-wait="Please wait..." className="getdemo-submit plausible-event-name--contact-form-submit w-button" value="Submit" /></div>
              </form>
              <div className="success-message w-form-done">
                <div>Thank you! Your submission has been received!</div>
              </div>
              <div className="error-message w-form-fail">
                <div>Oops! Something went wrong while submitting the form.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    </>
  );
}
