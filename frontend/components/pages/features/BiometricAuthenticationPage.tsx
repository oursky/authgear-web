import Link from 'next/link';

interface Props {
  locale: string;
}

export default function BiometricAuthenticationPage({ locale }: Props) {
  return (
    <>
<div className="featurespage__hero_v2 featurespage__hero_bg">
    <div className="features-hero-wrapper-new">
      <div className="split-content features-hero-left">
        <div className="featurespage__hero-titletag">Biometric Authentication</div>
        <h1 className="title features-hero-v2">Biometric Authentication Made Easy: Boost Security, Enhance User Experience</h1>
        <p className="features-hero-description">Discover how Authgear simplifies biometric authentication. Learn about the benefits, methods, and how it compares to traditional passwords. Implement effortless biometric logins today!</p>
        <div className="features-hero-cta-wrapper">
          <a href="https://portal.authgear.com/?utm_source=feature-biometric&amp;utm_medium=link&amp;utm_campaign=start-for-free" target="_blank" className="button-primary feature-hero-btn-v2 w-button">Start for Free</a>
          <Link href="/schedule-demo" target="_blank" className="button-secondary feature-hero-btn-v2 noscale w-button">Schedule Demo  <span className="text-span-23">&gt;</span></Link>
        </div>
      </div><img src="/images/features-biometric-hero-kv.svg" alt="" className="image features-hero-image-v2" />
    </div>
  </div>
  <div className="bg-gradient">
    <div className="container-default">
      <div className="container-default-inner px-0 row small-col">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2 gradient-silver">What is Biometric Authentication?</h2>
          <p className="paragraph-large text-center features-page-v2 color-white"><span className="text-bold">Biometric authentication</span> is a security process that verifies a user&#x27;s identity based on their unique physical or behavioral characteristics. Instead of relying on traditional methods like passwords or PINs, biometrics leverages distinctive traits such as fingerprints, facial features, or voice patterns to confirm a person&#x27;s identity.</p>
        </div>
        <div className="_2-card-grid gap-32 mobile-1-col">
          <div className="svg-card p-24 gap-6 transparent min-w-296px">
            <div className="svg-card-image-container mb-18"><img src="/images/features-biometric-whatis-enhanced.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-title ibm-plex-sans color-white">Enhanced Security</div>
            <div className="svg-card-content-container">
              <div className="svg-card-content-description size-14 color-c5cae8">Biometric data is highly unique to each individual, making it significantly harder to compromise compared to passwords which can be easily forgotten, stolen, or guessed.</div>
            </div>
          </div>
          <div className="svg-card p-24 gap-6 transparent min-w-296px">
            <div className="svg-card-image-container mb-18"><img src="/images/features-biometric-whatis-experience.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-title ibm-plex-sans color-white">Convenient User Experience</div>
            <div className="svg-card-content-container">
              <div className="svg-card-content-description size-14 color-c5cae8">Biometric authentication offers a seamless and user-friendly experience, eliminating the need for users to remember complex passwords or carry physical tokens.</div>
            </div>
          </div>
          <div className="svg-card p-24 gap-6 transparent min-w-296px">
            <div className="svg-card-image-container mb-18"><img src="/images/features-biometric-whatis-stronger.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-title ibm-plex-sans color-white">Stronger Fraud Prevention</div>
            <div className="svg-card-content-container">
              <div className="svg-card-content-description size-14 color-c5cae8">Biometric authentication adds an extra layer of protection against unauthorized access, reducing the risk of fraudulent activities.</div>
            </div>
          </div>
          <div className="svg-card p-24 gap-6 transparent min-w-296px">
            <div className="svg-card-image-container mb-18"><img src="/images/features-biometric-whatis-access.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-title ibm-plex-sans color-white">Streamlined Access</div>
            <div className="svg-card-content-container">
              <div className="svg-card-content-description size-14 color-c5cae8">Biometric systems can quickly and accurately verify a user&#x27;s identity, providing efficient access to services and applications.</div>
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
          <h2 className="title features-page-v2">Biometric Authentication <span className="text-highlight-gradient">Methods</span></h2>
          <p className="paragraph-large text-center features-page-v2">Biometric authentication leverages various unique physical or behavioral characteristics for user verification. Let&#x27;s focus on two of the most common and convenient methods: fingerprint authentication and facial recognition.</p>
        </div>
        <div data-current="Tab 1" data-duration-in="300" data-duration-out="100" className="tabs-rounded w-tabs">
          <div className="tabs-menu-rounded w-tab-menu">
            <a data-w-tab="Tab 1" className="tabs-menu-rounded_tab-wrap w-inline-block w-tab-link w--current">
              <div>Fingerprint Authentication</div>
            </a>
            <a data-w-tab="Tab 2" className="tabs-menu-rounded_tab-wrap w-inline-block w-tab-link">
              <div>Facial Authentication</div>
            </a>
          </div>
          <div className="w-tab-content">
            <div data-w-tab="Tab 1" className="w-tab-pane w--tab-active">
              <div className="tabs-rounded_top-content">
                <h3 className="tabs-rounded_h3">Fingerprint Authentication</h3>
                <div>Fingerprint authentication identifies individuals based on the unique patterns and minutiae present on their fingertips.</div>
              </div>
              <div className="_3-card-grid">
                <div className="svg-card px-24 gap-6 center">
                  <div className="svg-card-image-container mb-18"><img loading="lazy" src="/images/features-biometric-methods-fingerprint-accuracy.svg" alt="" /></div>
                  <div className="svg-card-content-title ibm-plex-sans small color-2b2b2b">High accuracy</div>
                  <div className="svg-card-content-container">
                    <div className="svg-card-content-description size-14 text-center">Fingerprints offer a high level of precision in identifying individuals.</div>
                  </div>
                </div>
                <div className="svg-card px-24 gap-6 center">
                  <div className="svg-card-image-container mb-18"><img loading="lazy" src="/images/features-biometric-methods-fingerprint-wideavailability.svg" alt="" /></div>
                  <div className="svg-card-content-title ibm-plex-sans small color-2b2b2b">Wide availability</div>
                  <div className="svg-card-content-container">
                    <div className="svg-card-content-description size-14 text-center">Fingerprint sensors are integrated into many modern devices, making them easily accessible.</div>
                  </div>
                </div>
                <div className="svg-card px-24 gap-6 center">
                  <div className="svg-card-image-container mb-18"><img loading="lazy" src="/images/features-biometric-methods-fingerprint-authentication.svg" alt="" /></div>
                  <div className="svg-card-content-title ibm-plex-sans small color-2b2b2b">Quick authentication</div>
                  <div className="svg-card-content-container">
                    <div className="svg-card-content-description size-14 text-center">Fingerprint scans can be processed rapidly, providing seamless user experiences.</div>
                  </div>
                </div>
              </div>
            </div>
            <div data-w-tab="Tab 2" className="w-tab-pane">
              <div className="tabs-rounded_top-content">
                <h3 className="tabs-rounded_h3">Facial Authentication</h3>
                <div>Facial authentication technology analyzes distinctive facial features to verify a person&#x27;s identity.</div>
              </div>
              <div className="_3-card-grid">
                <div className="svg-card px-24 gap-6 center">
                  <div className="svg-card-image-container mb-18"><img loading="lazy" src="/images/facial_authentication-faceid.svg" alt="" /></div>
                  <div className="svg-card-content-title ibm-plex-sans small color-2b2b2b">User-friendly</div>
                  <div className="svg-card-content-container">
                    <div className="svg-card-content-description size-14 text-center">Facial recognition is often perceived as more convenient than other biometric methods.</div>
                  </div>
                </div>
                <div className="svg-card px-24 gap-6 center">
                  <div className="svg-card-image-container mb-18"><img loading="lazy" src="/images/facial-recognition.svg" alt="" /></div>
                  <div className="svg-card-content-title ibm-plex-sans small color-2b2b2b">Passive authentication</div>
                  <div className="svg-card-content-container">
                    <div className="svg-card-content-description size-14 text-center">In some cases, facial recognition can be performed discreetly without requiring user interaction.</div>
                  </div>
                </div>
                <div className="svg-card px-24 gap-6 center">
                  <div className="svg-card-image-container mb-18"><img loading="lazy" src="/images/liveness-recognition.svg" alt="" /></div>
                  <div className="svg-card-content-title ibm-plex-sans small color-2b2b2b">Potential for liveness detection</div>
                  <div className="svg-card-content-container">
                    <div className="svg-card-content-description size-14 text-center">Advanced systems can detect spoofing attempts by ensuring a live person is present.</div>
                  </div>
                </div>
              </div>
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
          <h2 className="title features-page-v2">Biometric <span className="text-highlight-gradient">Authentication Flow</span></h2>
          <p className="paragraph-large text-center features-page-v2">How does biometric authentication work? Below are the key steps in biometric authentication flow:</p>
        </div>
        <div className="features-flex-container gap-40 reverse-order">
          <div className="solution-image-block"><img src="/images/features-biometric-flow-key.svg" loading="lazy" alt="" /></div>
          <div className="features-text-block p-0">
            <h3 className="features-h3-dark">Key Generation</h3>
            <div className="gradient-divider"></div>
            <div className="line-height-24px mb-24">Upon registering biometric login, a pair of cryptographic keys is created by Secure Enclave, so the private key is protected by hardware and never left the device.</div>
            <ul role="list" className="_2-block-flex-content-list">
              <li className="_2-block-flex-content-list-item line-height-24px">The private key is securely stored on the user&#x27;s device (Secure Enclave for iOS, Hardware-backed Keystore for Android).</li>
              <li className="_2-block-flex-content-list-item line-height-24px">The public key is stored on the Authgear server.</li>
            </ul>
          </div>
        </div>
        <div className="features-flex-container gap-40">
          <div className="solution-image-block"><img src="/images/features-biometric-flow-authentication.svg" loading="lazy" alt="" /></div>
          <div className="features-text-block p-0">
            <h3 className="features-h3-dark">Authentication</h3>
            <div className="gradient-divider"></div>
            <ul role="list" className="_2-block-flex-content-list">
              <li className="_2-block-flex-content-list-item line-height-24px">The user presents their biometric (fingerprint or face) to unlock the device&#x27;s private key.</li>
              <li className="_2-block-flex-content-list-item line-height-24px">The server sends a challenge to the devices.</li>
              <li className="_2-block-flex-content-list-item line-height-24px">The device uses the private key to sign the challenge.</li>
              <li className="_2-block-flex-content-list-item line-height-24px">The signed challenge is sent to the Authgear server as a response.</li>
            </ul>
          </div>
        </div>
        <div className="features-flex-container gap-40 reverse-order">
          <div className="solution-image-block"><img src="/images/features-biometric-flow-server.svg" loading="lazy" alt="" /></div>
          <div className="features-text-block p-0">
            <h3 className="features-h3-dark">Server Verification</h3>
            <div className="gradient-divider"></div>
            <ul role="list" className="_2-block-flex-content-list">
              <li className="_2-block-flex-content-list-item line-height-24px">The Authgear server verifies the digital signature using the stored public key.</li>
              <li className="_2-block-flex-content-list-item line-height-24px">If the signature is valid, the user is authenticated.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="bg-f9f9fb">
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">Password vs. Biometric Authentication: <span className="text-highlight-gradient"><br />A Comparison of Advantages and Disadvantages</span></h2>
          <p className="paragraph-large text-center features-page-v2">How does biometric authentication work? Below are the key steps in biometric authentication flow:</p>
        </div>
        <div className="password-vs-biometric-table">
          <div className="password-vs-biometric-table_header first zone-1">
            <div className="password-vs-biometric-table_data_text">Feature</div>
          </div>
          <div className="password-vs-biometric-table_header">
            <div className="password-vs-biometric-table_data_text">Password Authentication</div>
          </div>
          <div className="password-vs-biometric-table_header last">
            <div className="password-vs-biometric-table_data_text">Biometric Authentication</div>
          </div>
          <div className="password-vs-biometric-table_data zone-1">
            <div className="password-vs-biometric-table_data_text">Security</div>
          </div>
          <div className="password-vs-biometric-table_data">
            <div className="password-vs-biometric-table_data_text">Vulnerable to hacking, phishing, and brute-force attacks</div>
          </div>
          <div className="password-vs-biometric-table_data">
            <div className="password-vs-biometric-table_data_text">Highly secure as biometric traits are unique to each individual and difficult to replicate or steal</div>
          </div>
          <div className="password-vs-biometric-table_data zone-1">
            <div className="password-vs-biometric-table_data_text">Convenience</div>
          </div>
          <div className="password-vs-biometric-table_data">
            <div className="password-vs-biometric-table_data_text">Requires users to remember and input complex passwords</div>
          </div>
          <div className="password-vs-biometric-table_data">
            <div className="password-vs-biometric-table_data_text">Offers a seamless and user-friendly experience with no need to remember passwords</div>
          </div>
          <div className="password-vs-biometric-table_data zone-1">
            <div className="password-vs-biometric-table_data_text">User Experience</div>
          </div>
          <div className="password-vs-biometric-table_data">
            <div className="password-vs-biometric-table_data_text">Can be frustrating due to forgotten or incorrect passwords</div>
          </div>
          <div className="password-vs-biometric-table_data">
            <div className="password-vs-biometric-table_data_text">Provides quick and easy access to services</div>
          </div>
          <div className="password-vs-biometric-table_data zone-1">
            <div className="password-vs-biometric-table_data_text">Cost</div>
          </div>
          <div className="password-vs-biometric-table_data">
            <div className="password-vs-biometric-table_data_text">Free with Authgear</div>
          </div>
          <div className="password-vs-biometric-table_data">
            <div className="password-vs-biometric-table_data_text">Free with Authgear</div>
          </div>
          <div className="password-vs-biometric-table_data zone-1">
            <div className="password-vs-biometric-table_data_text">Acceptance</div>
          </div>
          <div className="password-vs-biometric-table_data">
            <div className="password-vs-biometric-table_data_text">Widely adopted but declining in popularity due to security concerns</div>
          </div>
          <div className="password-vs-biometric-table_data">
            <div className="password-vs-biometric-table_data_text">Increasingly accepted and preferred by users</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="bg-f9f9fb passkey-feature">
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">Revolutionize Enterprise Security<br />‍<span className="text-highlight-gradient">with Passkey Authentication</span></h2>
          <p className="paragraph-large text-center features-page-v2">Discover how passkeys can transform your organization&#x27;s security landscape. From enhancing employee productivity to safeguarding sensitive data, explore the compelling use cases of implementing passkey authentication in corporate environments.</p>
        </div>
        <div className="_3-card-grid row-gap-64">
          <div className="svg-card p-0 gap-6 bg-transparent">
            <div className="svg-card-image-container mb-18"><img loading="lazy" src="/images/features-biometric-authentications-financial.svg" alt="" /></div>
            <div className="svg-card-content-title ibm-plex-sans color-2b2b2b size-22">Financial Services</div>
            <div className="svg-card-content-container">
              <div className="svg-card-content-description m-sm">Mobile banking, online payments, and ATM access can be secured with fingerprint or facial recognition for added protection against fraud.</div>
            </div>
          </div>
          <div className="svg-card p-0 gap-6 bg-transparent">
            <div className="svg-card-image-container mb-18"><img loading="lazy" src="/images/features-biometric-authentications-healthcare.svg" alt="" /></div>
            <div className="svg-card-content-title ibm-plex-sans color-2b2b2b size-22">Healthcare</div>
            <div className="svg-card-content-container">
              <div className="svg-card-content-description m-sm">Patient identification, access to electronic health records, and secure medication dispensing can benefit from biometric authentication.</div>
            </div>
          </div>
          <div className="svg-card p-0 gap-6 bg-transparent">
            <div className="svg-card-image-container mb-18"><img loading="lazy" src="/images/features-biometric-authentications-passport.svg" alt="" /></div>
            <div className="svg-card-content-title ibm-plex-sans color-2b2b2b size-22">Government and Public Sector</div>
            <div className="svg-card-content-container">
              <div className="svg-card-content-description m-sm">Passport control, border security, and voter verification can leverage biometric technology for efficient and secure processes</div>
            </div>
          </div>
          <div className="svg-card p-0 gap-6 bg-transparent">
            <div className="svg-card-image-container mb-18"><img loading="lazy" src="/images/features-biometric-authentications-enterprise.svg" alt="" /></div>
            <div className="svg-card-content-title ibm-plex-sans color-2b2b2b size-22">Enterprise and IT</div>
            <div className="svg-card-content-container">
              <div className="svg-card-content-description m-sm">Secure access to corporate networks, applications, and sensitive data can be enhanced through biometric authentication.</div>
            </div>
          </div>
          <div className="svg-card p-0 gap-6 bg-transparent">
            <div className="svg-card-image-container mb-18"><img loading="lazy" src="/images/features-biometric-authentications-mobile.svg" alt="" /></div>
            <div className="svg-card-content-title ibm-plex-sans color-2b2b2b size-22">Mobile and Consumer Electronics</div>
            <div className="svg-card-content-container">
              <div className="svg-card-content-description m-sm">Smartphone unlocking, mobile payments, and app authentication are popular use cases for biometric technology.</div>
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
