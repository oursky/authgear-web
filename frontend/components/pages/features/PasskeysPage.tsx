import Link from 'next/link';

interface Props {
  locale: string;
}

export default function PasskeysPage(_props: Props) {
  return (
    <>
<div className="featurespage__hero_v2 featurespage__hero_bg">
    <div className="features-hero-wrapper-new">
      <div className="split-content features-hero-left">
        <div className="featurespage__hero-titletag">Passkey Authentication</div>
        <h1 className="title features-hero-v2">Effortless Passkey Authentication - A future without password</h1>
        <p className="features-hero-description">Secure your website and simplify user logins with Authgear's easy-to-implement passkey authentication. Rely on the strength of passkeys backed by major tech giants while enjoying a streamlined setup process.</p>
        <div className="features-hero-cta-wrapper">
          <a href="https://portal.authgear.com/?utm_source=feature-passkey&amp;utm_medium=link&amp;utm_campaign=start-for-free" target="_blank" className="button-primary feature-hero-btn-v2 w-button">Start for Free</a>
          <Link href="/schedule-demo" target="_blank" className="button-secondary feature-hero-btn-v2 noscale w-button">Schedule Demo  <span className="text-span-23">&gt;</span></Link>
        </div>
      </div><img src="/images/passkey-hero-kv.svg" alt="" className="image features-hero-image-v2" />
    </div>
  </div>
  <div className="section features-page video-section-bg">
    <div className="container-default w-container">
      <div className="top-content feature-flex max-width-large">
        <h2 className="title features-page text-align-left video-section-title">What is a Passkey Authentication?<br /><span className="text-highight-lightblue-gradient">The Future of Secure Logins</span></h2>
        <p className="video-description color-white text-normal">Passkeys are a new type of digital credentials that follow the FIDO and WebAuthn standards. By supporting passkeys on your apps, your users can sign up or log in without having to memorize and enter complex passwords that are vulnerable to different attacks.</p>
      </div>
      <div className="video-container-full">
        <div style={{paddingTop: "56.17021276595745%"}} className="w-video w-embed"><iframe className="embedly-embed" src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2F6IrX59CwWN4%3Ffeature%3Doembed&display_name=YouTube&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D6IrX59CwWN4&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2F6IrX59CwWN4%2Fhqdefault.jpg&key=96f1f04c5f4143bcb0f2e68c87d65feb&type=text%2Fhtml&schema=youtube" scrolling="no" allowFullScreen title="What is Apple Passkey? - Explained in 100 seconds"></iframe></div>
      </div>
    </div>
  </div>
  <div className="featurespage__section_dark-bg-passkeys">
    <div className="container-default w-container">
      <div className="solution-flex-container gap-40">
        <div className="solution-image-block"><img src="/images/features-passkeys-api.svg" loading="lazy" alt="" /></div>
        <div className="features-text-block line-height-40 p-0">
          <h3 className="features-page-h3 gray-gradient">Upgrade to Stronger Security with Passkey API</h3>
          <p className="mb-32 color-white text-l">Simplify logins and bolster security with passkey authentication. Built on the robust foundations of FIDO and WebAuthn, passkeys offer a password-free experience that protects against phishing and hacking attempts.</p>
          <Link href="/schedule-demo" className="button-primary gradient-rounded w-button">Learn More</Link>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">Elevate Security and Convenience<br />‍<span className="text-highlight-gradient">with Passkey Authentication</span></h2>
          <p className="paragraph-large text-center features-page-v2">Discover the transformative benefits of passkey authentication. Beyond enhanced security, passkeys streamline the login process and offer a seamless user experience.</p>
        </div>
        <div className="_3-card-grid">
          <div id="w-node-bfb14abc-b53a-5c07-576e-745ecb79f0f8-c4f83b00" className="svg-card p-0 pr-24">
            <div className="svg-card-image-container"><img src="/images/features-passkeys-authentication-icon-setup.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Effortless Setup</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262">Integrating passkey authentication into your website is a breeze with Authgear. Simply enable the feature in your admin panel with a single click, and you're ready to provide your users with a more secure and convenient login option.</div>
            </div>
          </div>
          <div id="w-node-bfb14abc-b53a-5c07-576e-745ecb79f100-c4f83b00" className="svg-card p-0 pr-24">
            <div className="svg-card-image-container"><img src="/images/features-passkeys-authentication-icon-secutiry.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Unparalleled Security</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262">Passkeys offer robust protection against phishing attacks and credential stuffing. As they are tied to specific devices and biometric factors, the risk of unauthorized access is significantly reduced.</div>
            </div>
          </div>
          <div id="w-node-bfb14abc-b53a-5c07-576e-745ecb79f108-c4f83b00" className="svg-card p-0 pr-24">
            <div className="svg-card-image-container"><img src="/images/features-passkeys-authentication-icon-ux.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Enhanced User Experience</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262">Say goodbye to forgotten passwords and frustrating login attempts. Passkeys provide a smooth and intuitive login experience, allowing users to authenticate quickly and easily using their devices or biometrics.</div>
            </div>
          </div>
        </div>
        <a id="w-node-_9577349c-1c59-cca6-63b3-89fc36497b5b-c4f83b00" href="https://www.authgear.com/post/passkey-vs-password-why-passkeys-are-the-future-of-security" className="button-secondary insection-cta w-button">Read the blog: Passkey vs Password: The Future of Online Security -&gt;</a>
      </div>
    </div>
  </div>
  <div>
    <div className="container-default">
      <div className="container-default-inner">
        <div className="top-content feature-flex">
          <h2 className="title features-page-v2">How to Create a Passkey:<br />‍<span className="text-highlight-gradient">It's Easier Than You Think!</span></h2>
          <p className="paragraph-large text-center features-page-v2">Discover the hassle-free way to boost your online security. Passkeys offer a simple yet highly secure alternative to traditional passwords.</p>
        </div>
        <div className="tabs-pretext ibm-plex-sans">Learn how to create one in just a few steps without compromising your protection:</div>
        <div data-current="Tab 1" data-duration-in="300" data-duration-out="100" className="_2-block-flex tabs-with-image ibm-plex-sans w-tabs">
          <div className="hover-change tabs upper w-tab-menu">
            <a data-w-tab="Tab 1" className="hover-change-content pt-0 w-inline-block w-tab-link w--current">
              <div className="hover-change-title">Click Create Passkey</div>
              <div style={{height: "0px"}} className="hover-change-description">When signing up or after login, look for the “Create passkey” option</div>
            </a>
            <a data-w-tab="Tab 2" className="hover-change-content pt-0 w-inline-block w-tab-link">
              <div className="hover-change-title">Verify identity</div>
              <div style={{height: "0px"}} className="hover-change-description">Confirm your identity using biometrics or a device PIN</div>
            </a>
            <a data-w-tab="Tab 3" className="hover-change-content pt-0 w-inline-block w-tab-link">
              <div className="hover-change-title">Passkey linked</div>
              <div style={{height: "0px"}} className="hover-change-description">Your device will generate a unique passkey linked to your account</div>
            </a>
            <a data-w-tab="Tab 4" className="hover-change-content pt-0 w-inline-block w-tab-link">
              <div className="hover-change-title">Using passkey</div>
              <div style={{height: "0px"}} className="hover-change-description">Next time when you login to your account, your device present the passkey for authentication</div>
            </a>
          </div>
          <div className="_2-block-flex-image tabs w-tab-content">
            <div data-w-tab="Tab 1" className="w-tab-pane w--tab-active"><img loading="eager" src="/images/features-passkeys-howtocreate-01-01.svg" alt="" /></div>
            <div data-w-tab="Tab 2" className="w-tab-pane"><img width="Auto" loading="eager" alt="" src="/images/features-passkeys-howtocreate-02-01.svg" /></div>
            <div data-w-tab="Tab 3" className="w-tab-pane"><img loading="eager" src="/images/features-passkeys-howtocreate-03-01.svg" alt="" /></div>
            <div data-w-tab="Tab 4" className="w-tab-pane"><img width="Auto" loading="eager" alt="" src="/images/features-passkeys-howtocreate-04-01.svg" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0 pt-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">Revolutionize Enterprise Security<br />‍<span className="text-highlight-gradient">with Passkey Authentication</span></h2>
          <p className="paragraph-large text-center features-page-v2">Discover how passkeys can transform your organization's security landscape. From enhancing employee productivity to safeguarding sensitive data, explore the compelling use cases of implementing passkey authentication in corporate environments.</p>
        </div>
        <div className="_3-card-grid row-gap-64">
          <div id="w-node-dee47dc3-954f-ced5-581b-53cc7043db5a-c4f83b00" className="svg-card p-0 pr-24">
            <div className="svg-card-image-container"><img src="/images/features-passkeys-security-icon-employee.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Enhanced Employee Productivity</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px">By eliminating the need for complex passwords, passkeys streamline the login process, reducing IT support requests and increasing employee efficiency.</div>
            </div>
          </div>
          <div id="w-node-dee47dc3-954f-ced5-581b-53cc7043db62-c4f83b00" className="svg-card p-0 pr-24">
            <div className="svg-card-image-container"><img src="/images/features-passkeys-security-icon-security.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Strengthened Security Posture</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px">Passkeys offer superior protection against phishing attacks and credential theft, safeguarding your organization's valuable data and intellectual property.</div>
            </div>
          </div>
          <div id="w-node-dee47dc3-954f-ced5-581b-53cc7043db6a-c4f83b00" className="svg-card p-0 pr-24">
            <div className="svg-card-image-container"><img src="/images/features-passkeys-security-icon-management.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Simplified Access Management</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px">With passkeys, employees can easily access corporate resources across multiple devices without the hassle of managing passwords, improving overall user experience.</div>
            </div>
          </div>
          <div id="w-node-d855d5d2-741f-7b06-2379-baec8f07773a-c4f83b00" className="svg-card p-0 pr-24">
            <div className="svg-card-image-container"><img src="/images/features-passkeys-security-icon-compilance.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Compliance Adherence</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px">Passkeys align with industry regulations and standards, helping organizations meet compliance requirements while bolstering security.</div>
            </div>
          </div>
          <div id="w-node-_519cf47c-4837-56dd-7803-0f7c3fe0bf2d-c4f83b00" className="svg-card p-0 pr-24">
            <div className="svg-card-image-container"><img src="/images/features-passkeys-security-icon-cost.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Cost Reduction</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px">By reducing password-related issues and the associated IT support costs, passkeys can contribute to significant cost savings for your organization.</div>
            </div>
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
              <h2 className="form-heading color-white footer-form">Ready to Elevate Your Authentication Game?</h2>
              <div className="color-cee9ff">Take the first step towards a more secure and convenient future with Authgear.</div>
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
