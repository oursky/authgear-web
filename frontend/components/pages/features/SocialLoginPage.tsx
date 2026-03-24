import Link from 'next/link';

interface Props {
  locale: string;
}

export default function SocialLoginPage(_props: Props) {
  return (
    <>
<div className="featurespage__hero_v2 featurespage__hero_bg">
    <div className="features-hero-wrapper-new">
      <div className="split-content features-hero-left">
        <div className="featurespage__hero-titletag">Social Login</div>
        <h1 className="title features-hero-v2">Seamless Social Login: Boost User Engagement and Security</h1>
        <p className="features-hero-description">Simplify user access and enhance security with Authgear's powerful social login integration. Connect your users effortlessly while maintaining robust authentication standards.</p>
        <div className="features-hero-cta-wrapper">
          <a href="https://portal.authgear.com/?utm_source=feature-social-login&amp;utm_medium=link&amp;utm_campaign=start-for-free" target="_blank" className="button-primary feature-hero-btn-v2 w-button">Start for Free</a>
          <Link href="/schedule-demo" target="_blank" className="button-secondary feature-hero-btn-v2 noscale w-button">Schedule Demo  <span className="text-span-23">{">"}</span></Link>
        </div>
      </div><img src="/images/features-securitythreat-seamless-sociallogin.svg" alt="" className="image features-hero-image-v2" />
    </div>
  </div>
  <div className="bg-f3f6ff">
    <div className="container-default">
      <div className="container-default-inner px-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">Built-in Support for <span className="text-highlight-gradient">Popular Social Logins</span></h2>
          <p className="paragraph-large text-center features-page-v2">Easily enable social login with widely used providers.</p>
        </div>
        <div className="grid-12 gap-32 tablet-2-col tablet-gap-16">
          <div id="w-node-_9d5e4572-9857-4c2e-ae81-cb4ccf9f155a-44a84e6c" className="features__social-media-wrap">
            <div id="w-node-d83aa250-3531-9f07-914e-94e692d1a48f-44a84e6c" className="features__social-media-card">
              <div className="features___social-media-logo"><img src="/images/features-sociallogin-companylogo-apple.svg" loading="lazy" width={32} alt="" className="features__social-media-image" /></div>
            </div>
            <div className="features-social-login-providers">Apple</div>
          </div>
          <div id="w-node-ddadcadf-c985-b916-4da9-4a5da78d381e-44a84e6c" className="features__social-media-wrap">
            <div id="w-node-_9709545e-ed40-f7b5-5f30-510a90e519cc-44a84e6c" className="features__social-media-card">
              <div className="features___social-media-logo"><img src="/images/features-sociallogin-companylogo-google.svg" loading="lazy" width={32} alt="" className="features__social-media-image" /></div>
            </div>
            <div className="features-social-login-providers">Google</div>
          </div>
          <div id="w-node-c89a385f-4d26-bc55-bec3-2e62d7f4c486-44a84e6c" className="features__social-media-wrap">
            <div className="features__social-media-card">
              <div className="features___social-media-logo"><img src="/images/features-sociallogin-companylogo-facebook.svg" loading="lazy" width={32} height="auto" alt="" className="features__social-media-image" /></div>
            </div>
            <div className="features-social-login-providers">Facebook</div>
          </div>
          <div id="w-node-_2f68271b-dacb-bd2d-2974-572757888469-44a84e6c" className="features__social-media-wrap">
            <div className="features__social-media-card">
              <div className="features___social-media-logo"><img src="/images/features-sociallogin-companylogo-github.svg" loading="lazy" width={32} height="auto" alt="" className="features__social-media-image" /></div>
            </div>
            <div className="features-social-login-providers">GitHub</div>
          </div>
          <div id="w-node-_3f8abfd8-6f6c-3435-3bc7-2a12b32adb77-44a84e6c" className="features__social-media-wrap">
            <div className="features__social-media-card">
              <div className="features___social-media-logo"><img src="/images/features-sociallogin-companylogo-linkedin.svg" loading="lazy" width={32} alt="" className="features__social-media-image" /></div>
            </div>
            <div className="features-social-login-providers">LinkedIn</div>
          </div>
          <div id="w-node-_72cd9e29-5e06-800a-5eac-650c0d6ba75e-44a84e6c" className="features__social-media-wrap">
            <div className="features__social-media-card">
              <div className="features___social-media-logo"><img src="/images/features-sociallogin-companylogo-microsoft.svg" loading="lazy" width={32} height="auto" alt="" className="features__social-media-image" /></div>
            </div>
            <div className="features-social-login-providers">Azure Active Directory &amp; Azure AD B2C</div>
          </div>
          <div id="w-node-_54009ab2-6275-0965-f61e-8d51e45e5bd6-44a84e6c" className="features__social-media-wrap">
            <div className="features__social-media-card">
              <div className="features___social-media-logo"><img src="/images/features-sociallogin-companylogo-azure.svg" loading="lazy" width={32} height="auto" alt="" className="features__social-media-image" /></div>
            </div>
            <div className="features-social-login-providers">Microsoft AD FS</div>
          </div>
          <div id="w-node-f53588eb-52c8-6616-a664-86d1c3654da8-44a84e6c" className="features__social-media-wrap">
            <div className="features__social-media-card">
              <div className="features___social-media-logo"><img src="/images/features-sociallogin-companylogo-wechat.svg" loading="lazy" width={32} height="auto" alt="" className="features__social-media-image" /></div>
            </div>
            <div className="features-social-login-providers">WeChat</div>
          </div>
          <div id="w-node-_245f3883-b570-e282-c6b7-062faf7d75ad-44a84e6c" className="features__social-media-wrap">
            <div className="features__social-media-card">
              <div className="features___social-media-logo"><img src="/images/features-sociallogin-companylogo-line.svg" loading="lazy" width={32} height="auto" alt="" className="features__social-media-image" /></div>
            </div>
            <div className="features-social-login-providers">LINE<br />(Coming soon)</div>
          </div>
          <div id="w-node-_1feb614c-6e26-f008-d8a5-2d6b033135d2-44a84e6c" className="features__social-media-wrap">
            <div className="features__social-media-card">
              <div className="features___social-media-logo"><img src="/images/features-sociallogin-companylogo-tiktok.svg" loading="lazy" alt="" className="features__social-media-image" /></div>
            </div>
            <div className="features-social-login-providers">TikTok<br />(Coming Soon)</div>
          </div>
        </div>
        <Link href="/schedule-demo" className="button-secondary insection-cta w-button">Contact us for suggestions -{">"}</Link>
      </div>
    </div>
  </div>
  <div className="bg-f9f9fb">
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">Unlock the Power of <span className="text-highlight-gradient"><br />Social Media Login</span></h2>
          <p className="paragraph-large text-center features-page-v2">Harness the advantages of social media login to streamline user experience, boost conversions, and gather valuable insights.</p>
        </div>
        <div className="features-flex-container gap-40 reverse-order">
          <div className="solution-image-block"><img src="/images/features-sociallogin-unolck-socialmedia.svg" loading="lazy" alt="" /></div>
          <div className="features-text-block p-0">
            <h3 className="features-h3-dark">Frictionless User Experience</h3>
            <div className="gradient-divider"></div>
            <ul role="list" className="_2-block-flex-content-list">
              <li className="_2-block-flex-content-list-item line-height-24px">Eliminate the need for users to create and remember new credentials</li>
              <li className="_2-block-flex-content-list-item line-height-24px">Enable one-click access using existing social media accounts</li>
              <li className="_2-block-flex-content-list-item line-height-24px">Reduce sign-up abandonment rates and increase user adoption</li>
            </ul>
          </div>
        </div>
        <div className="features-flex-container gap-40">
          <div className="solution-image-block"><img src="/images/features-sociallogin-unolck-datacollection.svg" loading="lazy" alt="" /></div>
          <div className="features-text-block p-0">
            <h3 className="features-h3-dark">Enhanced Data Collection and Personalization</h3>
            <div className="gradient-divider"></div>
            <ul role="list" className="_2-block-flex-content-list">
              <li className="_2-block-flex-content-list-item line-height-24px">Gain access to rich, verified user data from social profiles</li>
              <li className="_2-block-flex-content-list-item line-height-24px">Improve user segmentation and targeted marketing efforts</li>
              <li className="_2-block-flex-content-list-item line-height-24px">Tailor content and services based on user preferences and interests</li>
            </ul>
          </div>
        </div>
        <div className="features-flex-container gap-40 reverse-order">
          <div className="solution-image-block"><img src="/images/features-sociallogin-unolck-trust.svg" loading="lazy" alt="" /></div>
          <div className="features-text-block p-0">
            <h3 className="features-h3-dark">Improved Security and Trust</h3>
            <div className="gradient-divider"></div>
            <ul role="list" className="_2-block-flex-content-list">
              <li className="_2-block-flex-content-list-item line-height-24px">Leverage robust authentication protocols of major social platforms</li>
              <li className="_2-block-flex-content-list-item line-height-24px">Reduce the risk of weak or compromised passwords</li>
              <li className="_2-block-flex-content-list-item line-height-24px">Build user trust by associating with well-known social brands</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="bg-f3f6ff">
    <div className="container-default">
      <div className="container-default-inner px-0 pt-0">
        <div className="top-content feature-flex mb-60 pt-60">
          <h2 className="title features-page-v2">Simplify Social Login with Authgear: <span className="text-highlight-gradient"><br />Your One-Stop Shop</span></h2>
          <p className="paragraph-large text-center features-page-v2">Streamline your user experience and boost signups with secure social login functionalities. Authgear acts as your central hub for integrating all the social login providers you need, eliminating the hassle of managing multiple APIs and codebases.</p>
        </div>
        <div className="grid-12 gap-36">
          <div id="w-node-d78c7a69-3aab-2d61-27d8-83a488e48472-44a84e6c" className="features-card-new px-24 bg-white space-between">
            <div className="features-card-new_content-wrap">
              <div className="features-card-new_content-title">Single Integration</div>
              <div className="features-card-new_content-desc">Forget juggling APIs. Integrate once with Authgear for all major social login providers.</div>
            </div>
            <div className="features-card-new_image"><img src="/images/features-sociallogin-withauthgear-singleintegration.svg" loading="lazy" alt="" /></div>
          </div>
          <div id="w-node-d78c7a69-3aab-2d61-27d8-83a488e4847a-44a84e6c" className="features-card-new px-24 bg-white space-between">
            <div className="features-card-new_image last"><img src="/images/features-sociallogin-withauthgear-brandcontrol.svg" loading="lazy" alt="" className="mw-140" /></div>
            <div className="features-card-new_content-wrap">
              <div className="features-card-new_content-title">Brand Control</div>
              <div className="features-card-new_content-desc">Customize social login buttons to match your app's design.</div>
            </div>
          </div>
          <div id="w-node-d78c7a69-3aab-2d61-27d8-83a488e48482-44a84e6c" className="features-card-new px-24 bg-white space-between">
            <div className="features-card-new_content-wrap">
              <div className="features-card-new_content-title">Top Security</div>
              <div className="features-card-new_content-desc">Rigorous security measures safeguard user data during social login.</div>
            </div>
            <div className="features-card-new_image"><img src="/images/features-sociallogin-withauthgear-topsecurity.svg" loading="lazy" alt="" /></div>
          </div>
          <div id="w-node-d78c7a69-3aab-2d61-27d8-83a488e4848a-44a84e6c" className="features-card-new px-24 bg-white space-between">
            <div className="features-card-new_content-wrap">
              <div className="features-card-new_content-title">Easy Setup</div>
              <div className="features-card-new_content-desc">Effortless implementation withwell-documented API and SDKs.</div>
            </div>
            <div className="features-card-new_image"><img src="/images/features-sociallogin-withauthgear-easysetup.svg" loading="lazy" alt="" /></div>
          </div>
          <div id="w-node-d78c7a69-3aab-2d61-27d8-83a488e48492-44a84e6c" className="features-card-new px-24 bg-white space-between">
            <div className="features-card-new_content-wrap">
              <div className="features-card-new_content-title">Seamless Scaling</div>
              <div className="features-card-new_content-desc">Scales with your business to ensure a smooth social login experience.</div>
            </div>
            <div className="features-card-new_image"><img src="/images/features-sociallogin-withauthgear-seamless.svg" loading="lazy" alt="" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="bg-gradient">
    <div className="container-default">
      <div className="container-default-inner px-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2 gradient-silver">Skyrocket User Growth with Frictionless Social Login</h2>
          <p className="paragraph-large text-center features-page-v2 color-white">Imagine a world where user registration is a breeze. No more lengthy forms, forgotten passwords, or sign-up frustration. Authgear's social login makes this a reality, unlocking a surge in user growth for your business. Here's how:</p>
        </div>
        <div className="_2-card-grid gap-32 mobile-1-col">
          <div className="svg-card p-24 gap-6 transparent min-w-296px">
            <div className="svg-card-image-container mb-18"><img src="/images/features-sociallogin-growth-reduced.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-title ibm-plex-sans color-white">Reduced Friction</div>
            <div className="svg-card-content-container">
              <div className="svg-card-content-description size-18 color-c5cae8">Social login eliminates the need for lengthy registration forms. Users can sign up in seconds using their existing social media credentials, leading to significantly higher signup completion rates.</div>
            </div>
          </div>
          <div className="svg-card p-24 gap-6 transparent min-w-296px">
            <div className="svg-card-image-container mb-18"><img src="/images/features-sociallogin-growth-ux.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-title ibm-plex-sans color-white">Improved User Experience</div>
            <div className="svg-card-content-container">
              <div className="svg-card-content-description size-18 color-c5cae8">A familiar and convenient social login process creates a positive first impression for your users. This fosters trust and encourages them to explore your offerings further.</div>
            </div>
          </div>
          <div className="svg-card p-24 gap-6 transparent min-w-296px">
            <div className="svg-card-image-container mb-18"><img src="/images/features-sociallogin-growth-increased.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-title ibm-plex-sans color-white">Increased Conversions</div>
            <div className="svg-card-content-container">
              <div className="svg-card-content-description size-18 color-c5cae8">By streamlining the registration process, social login removes a significant barrier to conversion. More users will complete signups, translating to a direct boost in your user base.</div>
            </div>
          </div>
          <div className="svg-card p-24 gap-6 transparent min-w-296px">
            <div className="svg-card-image-container mb-18"><img src="/images/features-sociallogin-growth-brand.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-title ibm-plex-sans color-white">Enhanced Brand Loyalty</div>
            <div className="svg-card-content-container">
              <div className="svg-card-content-description size-18 color-c5cae8">A smooth and secure social login experience reflects positively on your brand. Users appreciate the convenience and are more likely to return and engage with your platform.</div>
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
              <h2 className="form-heading color-white footer-form">Unleash the Power of Social Login: Streamline Signups, Boost Growth</h2>
              <div className="color-cee9ff"><span className="text-bold">Ready to ditch the signup struggle and supercharge your user base? Authgear's social login</span> provides a seamless and secure experience that keeps users happy and coming back for more. Integrate all your favorite social login providers in minutes and unlock a new era of growth.</div>
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
