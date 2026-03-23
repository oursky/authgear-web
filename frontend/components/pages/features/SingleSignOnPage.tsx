import Link from 'next/link';

interface Props {
  locale: string;
}

export default function SingleSignOnPage(_props: Props) {
  return (
    <>
<div className="featurespage__hero_v2 featurespage__hero_bg">
    <div className="features-hero-wrapper-new">
      <div className="split-content features-hero-left">
        <div className="featurespage__hero-titletag">Single Sign On</div>
        <h1 className="title features-hero-v2">Elevate Your App with Effortless SSO Login</h1>
        <p className="features-hero-description">Simplify user experience and boost security with Authgear's OIDC-based SSO solution. Experience the benefits of enhanced user engagement and reduced friction.</p>
        <div className="features-hero-cta-wrapper">
          <a href="https://portal.authgear.com/?utm_source=feature-sso&amp;utm_medium=link&amp;utm_campaign=start-for-free" target="_blank" className="button-primary feature-hero-btn-v2 w-button">Start for Free</a>
          <Link href="/schedule-demo" target="_blank" className="button-secondary feature-hero-btn-v2 noscale w-button">Schedule Demo  <span className="text-span-23">&gt;</span></Link>
        </div>
      </div><img src="/images/features-sso-hero-kv.svg" alt="" className="image features-hero-image-v2" />
    </div>
  </div>
  <div className="bg-f9f9fb">
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">What is <span className="text-highlight-gradient">SSO?</span></h2>
          <p className="paragraph-large text-center features-page-v2">Single Sign-On (SSO) is an authentication method that allows users to access multiple applications and websites with a single set of credentials. This means users only need to log in once to access all their connected accounts.</p>
        </div>
        <div className="_3-card-grid">
          <div id="w-node-b67fc327-8839-9646-504a-e7e2057fe51f-e7a18d43" className="svg-card p-0 pr-24 bg-transparent">
            <div className="svg-card-image-container"><img src="/images/features-sso-whatis-convenience.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Convenience</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262">Users save time and frustration by not having to remember multiple passwords.</div>
            </div>
          </div>
          <div id="w-node-b67fc327-8839-9646-504a-e7e2057fe527-e7a18d43" className="svg-card p-0 pr-24 bg-transparent">
            <div className="svg-card-image-container"><img src="/images/features-sso-whatis-security.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Enhanced Security</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262">By reducing the number of times users enter their credentials, the risk of unauthorized access is minimized.</div>
            </div>
          </div>
          <div id="w-node-b67fc327-8839-9646-504a-e7e2057fe52f-e7a18d43" className="svg-card p-0 pr-24 bg-transparent">
            <div className="svg-card-image-container"><img src="/images/features-passkeys-authentication-icon-ux.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Improved User Experience</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262">A seamless login process increases user satisfaction and engagement.</div>
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
          <h2 className="title features-page-v2">How OIDC-Based <span className="text-highlight-gradient">SSO Works?</span></h2>
          <p className="paragraph-large text-center features-page-v2">OpenID Connect (OIDC) enables Single Sign-On (SSO) by establishing a trust relationship between an Authorization Server (AS) and a Relying Party (RP). This allows users to authenticate once and access multiple applications without re-entering credentials.</p>
        </div>
        <div className="_3-card-grid">
          <div id="w-node-_88d6aedb-51f1-486b-74f7-88af8cb3216f-e7a18d43" className="svg-card bg-eff2fc gap-16 py-24 px-32">
            <div className="svg-card-image-container center">
              <div className="card-number">1</div>
            </div>
            <div className="svg-card-content-container text-center gap-6">
              <div className="svg-card-content-title inter color-2e2e2e size-18">Boost User Satisfaction</div>
              <div className="svg-card-content-description inter size-14 color-626262">Simplify the login process, reduce password-related frustrations, and increase user engagement.</div>
            </div>
          </div>
          <div id="w-node-_66d8a841-5f69-fdff-aea0-9e69be7fe28f-e7a18d43" className="svg-card bg-eff2fc gap-16 py-24 px-32">
            <div className="svg-card-image-container center">
              <div className="card-number">2</div>
            </div>
            <div className="svg-card-content-container text-center gap-6">
              <div className="svg-card-content-title inter color-2e2e2e size-18">Redirection to Authorization Server</div>
              <div className="svg-card-content-description inter size-14 color-626262">The RP redirects the user to the Authorization Server (AS) with an authorization request.</div>
            </div>
          </div>
          <div id="w-node-b30df303-aab0-c5cf-a06d-2ef68ed32051-e7a18d43" className="svg-card bg-eff2fc gap-16 py-24 px-32">
            <div className="svg-card-image-container center">
              <div className="card-number">3</div>
            </div>
            <div className="svg-card-content-container text-center gap-6">
              <div className="svg-card-content-title inter color-2e2e2e size-18">User authentication</div>
              <div className="svg-card-content-description inter size-14 color-626262">The AS prompts the user for credentials and authenticates them.</div>
            </div>
          </div>
          <div id="w-node-_7263040c-de30-810c-5054-720162a31e96-e7a18d43" className="svg-card bg-eff2fc gap-16 py-24 px-32">
            <div className="svg-card-image-container center">
              <div className="card-number">4</div>
            </div>
            <div className="svg-card-content-container text-center gap-6">
              <div className="svg-card-content-title inter color-2e2e2e size-18">Authorization and token issuance</div>
              <div className="svg-card-content-description inter size-14 color-626262">Upon successful authentication, the AS issues an ID token and potentially an access token to the user's browser.</div>
            </div>
          </div>
          <div id="w-node-a6bbb84f-e170-1c84-5bcf-b60ebf45d0b0-e7a18d43" className="svg-card bg-eff2fc gap-16 py-24 px-32">
            <div className="svg-card-image-container center">
              <div className="card-number">5</div>
            </div>
            <div className="svg-card-content-container text-center gap-6">
              <div className="svg-card-content-title inter color-2e2e2e size-18">Redirection with token</div>
              <div className="svg-card-content-description inter size-14 color-626262">The user is redirected back to the RP with the ID token.</div>
            </div>
          </div>
          <div id="w-node-_7c834473-3729-9e3b-d31b-976a84e328f0-e7a18d43" className="svg-card bg-eff2fc gap-16 py-24 px-32">
            <div className="svg-card-image-container center">
              <div className="card-number">6</div>
            </div>
            <div className="svg-card-content-container text-center gap-6">
              <div className="svg-card-content-title inter color-2e2e2e size-18">Token validation and access</div>
              <div className="svg-card-content-description inter size-14 color-626262">The RP validates the ID token to verify the user's identity and grants access to the requested resource.</div>
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
          <h2 className="title features-page-v2">3 Benefits of <span className="text-highlight-gradient">Implementing SSO for Your Business </span></h2>
          <p className="paragraph-large text-center features-page-v2">SSO offers a multitude of advantages for businesses of all sizes. By streamlining access, enhancing security, and improving user satisfaction, SSO can significantly impact your bottom line.</p>
        </div>
        <div className="_3-card-grid">
          <div id="w-node-c5d7a487-ba4d-1906-a5b6-92cdc38cf44f-e7a18d43" className="svg-card p-0 pr-24 bg-transparent">
            <div className="svg-card-image-container"><img src="/images/features-passkeys-security-icon-employee.svg" loading="lazy" width={48} height="auto" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px size-22">User Initiates Login</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262">Simplify the login process, reduce password-related frustrations, and increase user engagement.</div>
            </div>
          </div>
          <div id="w-node-c5d7a487-ba4d-1906-a5b6-92cdc38cf457-e7a18d43" className="svg-card p-0 pr-24 bg-transparent">
            <div className="svg-card-image-container"><img src="/images/features-sso-benefits-security.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px size-22">Strengthen Security</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262">Protect your sensitive data by reducing the risk of unauthorized access and password breaches.</div>
            </div>
          </div>
          <div id="w-node-c5d7a487-ba4d-1906-a5b6-92cdc38cf45f-e7a18d43" className="svg-card p-0 pr-24 bg-transparent">
            <div className="svg-card-image-container"><img src="/images/features-sso-benefits-efficiency.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px size-22">Improve Efficiency</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262">Streamline operations, save time, and enhance productivity through faster and easier access to applications.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="bg-f9f9fb">
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0 pb-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">Simplify SSO Implementation<span className="text-highlight-gradient"> with Authgear</span></h2>
          <p className="paragraph-large text-center features-page-v2">Authgear provides a robust and flexible platform for implementing SSO in your web and mobile applications. Leveraging the power of OpenID Connect (OIDC), Authgear simplifies the SSO process, allowing you to focus on building exceptional user experiences.</p>
        </div>
        <div className="features-flex-container gap-40 reverse-order">
          <div className="solution-image-block"><img src="/images/features-sso-oidc-based.svg" loading="lazy" alt="" /></div>
          <div className="features-text-block p-0">
            <h3 className="features-h3-dark">OIDC-Based SSO</h3>
            <div className="gradient-divider"></div>
            <div className="color-626262 line-height-24px">Authgear's SSO solution is built on the foundation of OpenID Connect (OIDC), an industry-standard protocol for authentication and authorization. By adhering to OIDC standards, Authgear ensures seamless integration with a wide range of applications and services.</div>
          </div>
        </div>
        <div className="features-flex-container gap-40">
          <div className="solution-image-block"><img src="/images/features-sso-why-authgear.svg" loading="lazy" alt="" /></div>
          <div className="features-text-block p-0">
            <h3 className="features-h3-dark">Why Authgear?</h3>
            <div className="gradient-divider"></div>
            <ul role="list" className="_2-block-flex-content-list">
              <li className="_2-block-flex-content-list-item line-height-24px with-subcontent">Rapid Integration<span className="list-subcontent">Authgear offers pre-built SDKs and APIs, accelerating development time and reducing implementation complexity.</span></li>
              <li className="_2-block-flex-content-list-item line-height-24px with-subcontent">Enhanced Security<span className="list-subcontent">Benefit from robust security features, including advanced encryption, protection against common vulnerabilities, and compliance with industry standards.</span></li>
              <li className="_2-block-flex-content-list-item line-height-24px with-subcontent">Scalability<span className="list-subcontent">Handle increasing user loads with ease, as Authgear is designed to scale effortlessly.</span></li>
              <li className="_2-block-flex-content-list-item line-height-24px with-subcontent">Customization<span className="list-subcontent">Tailor the login experience to match your brand identity and user preferences.</span></li>
              <li className="_2-block-flex-content-list-item line-height-24px with-subcontent">Comprehensive Features<span className="list-subcontent">Beyond SSO, Authgear provides additional features like user management, social login, and multi-factor authentication.</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="bg-f3f6ff">
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">Dive Deeper into <span className="text-highlight-gradient">SSO</span></h2>
          <p className="paragraph-large text-center features-page-v2">Expand your SSO knowledge with our informative blog posts:</p>
        </div>
        <div className="secondary-block">
          <div className="_2-card-grid">
            <a href="https://www.authgear.com/post/customer-sso" target="_blank" className="secondary-block-card-link bg-white w-inline-block">
              <div className="secondary-block-card-image-container"><img src="/images/features-mfa-deepdive-article.svg" loading="lazy" alt="" className="secondary-block-card-image" /></div>
              <div className="blog-post-link-with-desc">
                <div className="secondary-block-card-content">What is Customer SSO and Why Should You Implement it?</div>
                <div className="blog-post-link-desc">Learn more about the advantages of Single Sign-On for your customers and how your business can benefit from a unified login experience.</div>
              </div>
            </a>
            <a href="https://www.authgear.com/post/oidc-vs-saml-decoding-the-sso-showdown-and-why-it-matters-for-your-business" target="_blank" className="secondary-block-card-link bg-white w-inline-block">
              <div className="secondary-block-card-image-container"><img src="/images/features-mfa-deepdive-article.svg" loading="lazy" alt="" className="secondary-block-card-image" /></div>
              <div className="blog-post-link-with-desc">
                <div className="secondary-block-card-content">OIDC vs. SAML: Decoding the SSO Showdown (And Why It Matters for Your Business)</div>
                <div className="blog-post-link-desc">Choosing the right Single Sign-On (SSO) solution for your business can feel like traversing a labyrinth of acronyms.</div>
              </div>
            </a>
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
              <h2 className="form-heading color-white footer-form">Ready to Transform Your Login Experience?</h2>
              <div className="color-cee9ff">Experience the Authgear difference. Sign up for a free trial and discover how easy it is to implement SSO for your business.</div>
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
