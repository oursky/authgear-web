import Link from 'next/link';

interface Props {
  locale: string;
}

export default function PasswordlessAuthenticationPage({ locale }: Props) {
  return (
    <>
<div className="featurespage__hero_v2 featurespage__hero_bg">
    <div className="features-hero-wrapper-new">
      <div className="w-layout-hflex split-content features-hero-left">
        <div className="featurespage__hero-titletag">Passwordless Login</div>
        <h1 className="title features-hero-v2">Forget the Password, Embrace the Future: Unleash Next-Gen Authentication</h1>
        <p className="features-hero-description">Effortless logins, enhanced security, and a user experience that delights!</p>
        <div className="features-hero-cta-wrapper">
          <a href="https://portal.authgear.com/?utm_source=feature-passwordless&amp;utm_medium=link&amp;utm_campaign=start-for-free" target="_blank" className="button-primary feature-hero-btn-v2 w-button">Start for Free</a>
          <Link href="/schedule-demo" target="_blank" className="button-secondary feature-hero-btn-v2 noscale w-button">Schedule Demo  <span className="text-span-23">&gt;</span></Link>
        </div>
      </div><img src="/images/features-passwordless-hero-kv.svg" alt="" className="image features-hero-image-v2" />
    </div>
  </div>
  <div>
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">Ditch the Password<br />Introducing What is <span className="text-highlight-gradient">Passwordless Authentication</span></h2>
          <p className="paragraph-large text-center features-page-v2">Passwordless authentication is a secure method of verifying your identity without the need for a traditional password. Instead, it relies on factors like your mobile device, biometric data (fingerprint, facial recognition), or one-time codes for login. This innovative approach offers several key benefits:</p>
        </div>
        <div className="_3-card-grid">
          <div id="w-node-_74c657f8-1d5c-c4de-f8d4-2c0614c18db6-e43d3961" className="svg-card p-0 pr-24">
            <div className="svg-card-image-container"><img src="/images/features-passwordless-ditch-icon-security.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Enhanced Security</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px">Passwordless authentication eliminates the risk of stolen or weak passwords, a major cause of data breaches. By removing passwords from the equation, hackers have fewer entry points to exploit</div>
            </div>
          </div>
          <div id="w-node-b37ec1cc-d3a6-1ae9-a99a-0953f54852a2-e43d3961" className="svg-card p-0 pr-24">
            <div className="svg-card-image-container"><img src="/images/features-passwordless-ditch-icon-ux.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Improved User Experience</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px">No more password resets or frustration from forgotten login credentials. Passwordless methods offer a smoother and faster login experience, allowing users to access accounts with a tap, scan, or code confirmation.</div>
            </div>
          </div>
          <div id="w-node-adaca765-6ce8-1ba3-96bb-6b5d5e91799f-e43d3961" className="svg-card p-0 pr-24">
            <div className="svg-card-image-container"><img src="/images/features-passwordless-ditch-icon-convenience.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Increased Convenience</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px">Integrating passwordless authentication with Authgear provides a unified solution. You can manage and leverage various login methods across all your applications with a single platform.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="featurespage__section_dark-bg">
    <div className="container-default w-container">
      <div className="solution-flex-container gap-40 reverse-order">
        <div className="solution-image-block"><img src="/images/features-passwordless-social-login.svg" loading="lazy" alt="" /></div>
        <div className="features-text-block line-height-40 p-0">
          <h3 className="features-page-h3 white">One-Click Convenience: <br /><span className="gray-gradient">Social Login</span></h3>
          <p className="feature-content inverse">Enable your users to sign in with their favorite social accounts—Google, Facebook, Apple, and more. By minimizing steps in the login flow, you’ll reduce abandonment rates and deliver a hassle-free experience that encourages more signups.</p>
          <Link href="/features/social-login" className="feature-white-button w-button">Explore Social Login</Link>
        </div>
      </div>
      <div className="solution-flex-container gap-40">
        <div className="solution-image-block"><img src="/images/features-passwordless-passkey.svg" loading="lazy" alt="" /></div>
        <div className="features-text-block line-height-40 p-0">
          <h3 className="features-page-h3 white">Modern Security:<br /><span className="gray-gradient">Passkey Authentication</span></h3>
          <p className="feature-content inverse">Adopt a true passwordless strategy with cryptographic passkeys. Stored securely on user devices, passkeys thwart phishing and credential stuffing, all while simplifying the login experience. It’s the future of authentication, delivered seamlessly.</p>
          <Link href="/features/passkeys" className="feature-white-button w-button">Discover Passkeys</Link>
        </div>
      </div>
      <div className="solution-flex-container gap-40 reverse-order">
        <div className="solution-image-block"><img src="/images/features-passwordless-biometric.svg" loading="lazy" alt="" /></div>
        <div className="features-text-block line-height-40 p-0">
          <h3 className="features-page-h3 white"><span className="gray-gradient">Seamlessly Secure:<br />Biometric Login</span></h3>
          <p className="feature-content inverse">Give your users a quick, frictionless way to access their accounts using fingerprint or face recognition. Biometric authentication makes signing in effortless—no passwords to remember, no codes to enter—while enhancing security with robust, device-level protection.</p>
          <Link href="/features/biometric-authentication" className="feature-white-button w-button">Biometric Login</Link>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="card-full radius-48px p-60 bg-blue bg-radial-gradient-blue">
          <div className="_2-block-flex">
            <div className="_2-block_flex-left basis-60">
              <div className="_2-block-flex-content max-w-none">
                <h2 className="features-h2 gray-gradient mb-0 mobile-26px">Seamless Logins: Magic Links for Email Authentication</h2>
                <div className="features_card-full-description color-cee9ff">Magic links offer a frictionless login experience, eliminating the need to remember passwords or manage multiple login credentials. They also enhance security by utilizing a short-lived token, minimizing the risk of unauthorized access even if the link is intercepted.</div>
              </div>
            </div>
            <div>
              <div className="_2-block-flex-image"><img src="/images/seamless-logins_login-box.png" loading="lazy" width={684} sizes="(max-width: 767px) 100vw, 684px" alt="" srcSet="/images/seamless-logins_login-box-p-500.png 500w, /images/seamless-logins_login-box-p-800.png 800w, /images/seamless-logins_login-box-p-1080.png 1080w, /images/seamless-logins_login-box.png 1368w" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="otp">
    <div className="container-default otp">
      <div className="container-default-inner px-0 gap-0 otp">
        <div className="top-content feature-flex otp">
          <h2 className="title features-page-v2 left-align">Challenges Overcome:<br />Implementing with Ease</h2>
          <p className="paragraph-large text-center features-page-v2 left-align">While passwordless authentication offers significant advantages, there can be challenges associated with implementation. Here are three common hurdles, and how Authgear helps you overcome them:</p>
        </div>
      </div><img src="/images/features-passwordless-otp-whatsapp.svg" loading="lazy" alt="" />
    </div>
  </div>
  <div>
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">Challenges Overcome:<br />Implementing <span className="text-highlight-gradient">Passwordless Authentication</span> with Ease</h2>
          <p className="paragraph-large text-center features-page-v2">While passwordless authentication offers significant advantages, there can be challenges associated with implementation. Here are three common hurdles, and how Authgear helps you overcome them:</p>
        </div>
        <div className="_3-card-grid">
          <div className="flip-card">
            <div id="w-node-_00cfbc02-babb-5e85-058e-e310d1fa3fab-e43d3961" className="svg-card-front px-24 pb-24 relative drop-shadow space-between">
              <div className="flip-card-content-wrap">
                <div className="svg-card-image-container"><img src="/images/features-passwordless-challenges-icon-integrations.svg" loading="lazy" alt="" /></div>
                <div className="svg-card-content-container text-center gap-6">
                  <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Complexity of Integration</div>
                  <div className="svg-card-content-description inter text-align-left mobile-16px">Adopting a new authentication system can seem daunting. Traditional methods often require complex integration with existing infrastructure.</div>
                </div>
              </div>
              <div className="flip-card-toggle-wrap"><img src="/images/features-passwordless-challenges-icon-plus.svg" loading="lazy" alt="" /></div>
            </div>
            <div className="svg-card-back px-24 pb-24 relative drop-shadow passkeys-card-back">
              <div className="svg-card-content-container text-center gap-6 mb-50">
                <div className="svg-card-content-description text-align-left mobile-16px passkeys-card-back">Authgear simplifies this process by providing a unified platform that seamlessly integrates with various passwordless methods and your existing applications.</div>
              </div>
              <div className="flip-card-toggle-wrap"><img src="/images/features-passwordless-challenges-icon-close.svg" loading="lazy" alt="" /></div>
            </div>
          </div>
          <div className="flip-card">
            <div id="w-node-_00cfbc02-babb-5e85-058e-e310d1fa3fbd-e43d3961" className="svg-card-front px-24 pb-24 relative drop-shadow space-between">
              <div className="flip-card-content-wrap">
                <div className="svg-card-image-container"><img src="/images/features-passwordless-challenges-icon-training.svg" loading="lazy" alt="" /></div>
                <div className="svg-card-content-container text-center gap-6">
                  <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">User Adoption and Training</div>
                  <div className="svg-card-content-description inter text-align-left mobile-16px">Shifting users from familiar password-based logins to new methods might require some adjustment.</div>
                </div>
              </div>
              <div className="flip-card-toggle-wrap"><img src="/images/features-passwordless-challenges-icon-plus.svg" loading="lazy" alt="" /></div>
            </div>
            <div className="svg-card-back px-24 pb-24 relative drop-shadow passkeys-card-back">
              <div className="svg-card-content-container text-center gap-6 mb-50">
                <div className="svg-card-content-description text-align-left mobile-16px passkeys-card-back">Authgear offers user-friendly interfaces and intuitive workflows for both passwordless logins and administrative control panels. This minimizes the need for extensive training and ensures a smooth transition for your users.</div>
              </div>
              <div className="flip-card-toggle-wrap"><img src="/images/features-passwordless-challenges-icon-close.svg" loading="lazy" alt="" /></div>
            </div>
          </div>
          <div className="flip-card">
            <div id="w-node-_00cfbc02-babb-5e85-058e-e310d1fa3fcf-e43d3961" className="svg-card-front px-24 pb-24 relative drop-shadow space-between">
              <div className="flip-card-content-wrap">
                <div className="svg-card-image-container"><img src="/images/features-passwordless-challenges-icon-balance.svg" loading="lazy" alt="" /></div>
                <div className="svg-card-content-container text-center gap-6">
                  <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Maintaining a Balance Between Security and Convenience</div>
                  <div className="svg-card-content-description inter text-align-left mobile-16px">Finding the right balance between robust security and a convenient user experience is crucial.</div>
                </div>
              </div>
              <div className="flip-card-toggle-wrap"><img src="/images/features-passwordless-challenges-icon-plus.svg" loading="lazy" alt="" /></div>
            </div>
            <div className="svg-card-back px-24 pb-24 relative drop-shadow passkeys-card-back">
              <div className="svg-card-content-container text-center gap-6 mb-50">
                <div className="svg-card-content-description text-align-left mobile-16px passkeys-card-back">Authgear empowers you to implement multi-factor authentication (MFA) with passwordless methods. This allows you to combine the ease of passwordless logins with additional security layers like biometrics or one-time codes for high-risk actions.</div>
              </div>
              <div className="flip-card-toggle-wrap"><img src="/images/features-passwordless-challenges-icon-close.svg" loading="lazy" alt="" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div className="container-default w-container"></div>
  </div>
  <div className="footer-form-section form__bg-dark">
    <div className="container-default">
      <div className="container-default-inner px-0">
        <div className="_2-block-flex footer-form">
          <div className="_2-block-flex-content footer-form">
            <div className="_2-block-flex-content-text-wrap footer-form">
              <h2 className="form-heading color-white footer-form">Ready to Ditch the Password Hassle?</h2>
              <div className="color-cee9ff">Experience the future of authentication with Authgear&#x27;s passwordless solutions. Simplify logins, enhance security, and empower your users with effortless access.</div>
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
