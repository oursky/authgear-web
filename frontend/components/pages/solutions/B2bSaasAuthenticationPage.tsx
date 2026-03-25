import ContactForm from '@/components/ContactForm';

interface Props {
  locale: string;
}

export default function B2bSaasAuthenticationPage(_props: Props) {
  return (
    <>
      <div className="announcement-bar">
          <div className="container-default w-container">
            <div className="text-center">
              <div className="announcement-message">📢 <strong className="announcement-message-bold">Skygear Auth</strong> is now <strong className="announcement-message-bold">Authgear</strong></div>
            </div>
          </div>
        </div>
        <div className="page-wrapper">
          <div className="section solutions-hero pb-0">
            <div className="container-full-general">
              <div className="middle-hero-wrapper py-0 mw-1100">
                <div className="middle-hero-inner">
                  <div className="top-label hero-title">B2B SaaS</div>
                  <h1 className="new-heading">Fortress Your B2B SaaS Authentication:<br />Secure Access for You & Every Tenant.</h1>
                  <p className="middle-hero-paragraph text-787e81 size-18">Authgear empowers your SaaS authentication with robust security and effortless multi-tenancy management.<br /><span className="text-bold" >Deliver a seamless user experience for all, while safeguarding sensitive data.</span></p>
                  <a href="https://portal.authgear.com/?utm_source=solutions-b2b-saas&utm_medium=link&utm_campaign=talk-with-us" target="_blank" className="button-primary button-gradient center w-button">Talk with Us</a>
                </div><img src="/images/b2c_ciam_kv-hero-login-box1.svg" loading="lazy" alt="" />
              </div>
            </div>
          </div>
          <div>
            <div className="container-full-general">
              <div className="container-default-inner px-0 pb-40">
                <div className="top-content flex-column text-center mx-20">
                  <div className="top-content-icon"><img src="/images/b2b_saas_empower-icon.svg" loading="lazy" alt="" /></div>
                  <h2 className="text-center mg-bottom-16px top-content-title ibm-plex-sans color-2e2e2e">Empower & Secure:<br />‍<span className="text-highlight-gradient" >Granular Access Control for Your B2B Clients</span></h2>
                  <div className="top-content-description ibm-plex-sans size-18"><span className="text-bold">SaaS identity management for multiple B2B clients with varying needs can be a complex challenge.<br /></span>Authgear solution simplifies SaaS identity and access management with granular Role-Based Access Control.</div>
                </div>
              </div><img src="/images/b2b_saas_empower-flow.svg" loading="lazy" alt="" className="_w-full pb-80" /><img src="/images/b2b_saas_empower-flow-m.svg" loading="lazy" alt="" className="_w-full pb-80 mobile-100" />
            </div>
          </div>
          <div>
            <div className="container-default">
              <div className="container-default-inner px-0">
                <div className="top-content flex-column text-center">
                  <div className="top-content-icon mobile-center"><img src="/images/b2c_ciam_usercentric-icon.svg" loading="lazy" alt="" /></div>
                  <h2 className="top-content-title ibm-plex-sans color-2e2e2e size-40 mobile-center">Seamless Multi-Tenancy with<br />‍<span className="text-highlight-gradient" >Authgear SaaS authentication</span></h2>
                  <div className="top-content-description ibm-plex-sans mobile-center size-18">Scale effortlessly and deliver a secure experience for all your enterprise clients <br />with Authgear's robust multi-tenancy support.</div>
                </div>
                <div className="_3-card-grid gap-0">
                  <div className="svg-card p-0 bg-transparent with-divider first">
                    <div className="svg-card-image-container center">
                      <div className="card-count">1</div>
                    </div>
                    <div className="svg-card-content-container text-center gap-6">
                      <div className="svg-card-content-title ibm-plex-sans color-2b2b2b small">Reduced Costs & Streamlined Management</div>
                      <div className="svg-card-content-description size-14">Manage all your B2B clients from a single platform, eliminating the need for multiple SaaS authentication systems and reducing infrastructure and maintenance overhead.</div>
                    </div>
                  </div>
                  <div className="svg-card p-0 bg-transparent with-divider">
                    <div className="svg-card-image-container center">
                      <div className="card-count">2</div>
                    </div>
                    <div className="svg-card-content-container text-center gap-6">
                      <div className="svg-card-content-title ibm-plex-sans color-2b2b2b small">Flexibility & Effortless Scalability</div>
                      <div className="svg-card-content-description size-14">Onboard new B2B clients seamlessly and scale effortlessly as your user base grows. Authgear's multi-tenancy adapts to your evolving B2B ecosystem.</div>
                    </div>
                  </div>
                  <div className="svg-card p-0 bg-transparent with-divider last">
                    <div className="svg-card-image-container center">
                      <div className="card-count">3</div>
                    </div>
                    <div className="svg-card-content-container text-center gap-6">
                      <div className="svg-card-content-title ibm-plex-sans color-2b2b2b small">Centralized Security & Compliance</div>
                      <div className="svg-card-content-description size-14">Enforce consistent security policies and access controls across all client accounts. Simplify security management and ensure a robust security posture for your entire platform.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-f3f6ff">
            <div className="container-default">
              <div className="container-default-inner px-0">
                <div className="top-content flex-column text-center">
                  <div className="top-content-icon"><img src="/images/b2b-saas-why-title.svg" loading="lazy" alt="" /></div>
                  <h2 className="text-center mg-bottom-16px top-content-title ibm-plex-sans color-2e2e2e">Why Authgear for<span className="text-highlight-gradient"><br />B2B SaaS</span></h2>
                </div>
                <div className="_3-card-grid">
                  <div className="svg-card px-24">
                    <div className="svg-card-image-container center"><img src="/images/b2b-saas-why-adminpanel.svg" loading="lazy" alt="" /></div>
                    <div className="svg-card-content-container text-center gap-6">
                      <div className="svg-card-content-title ibm-plex-sans color-2b2b2b small">Admin Portal</div>
                      <div className="svg-card-content-description size-14 color-787e81">A powerful management dashboard that lets your team handle users, roles, sessions, audits, and security policies without writing code.</div>
                    </div>
                  </div>
                  <div className="svg-card px-24">
                    <div className="svg-card-image-container center"><img src="/images/b2b-saas-why-sso.svg" loading="lazy" alt="" /></div>
                    <div className="svg-card-content-container text-center gap-6">
                      <div className="svg-card-content-title ibm-plex-sans color-2b2b2b small">SSO for multi-apps</div>
                      <div className="svg-card-content-description size-14 color-787e81">Provide a seamless login experience across your entire product suite. So your customers can sign in once and move between apps effortlessly.</div>
                    </div>
                  </div>
                  <div className="svg-card px-24">
                    <div className="svg-card-image-container center"><img src="/images/b2b-saas-why-roles.svg" loading="lazy" alt="" /></div>
                    <div className="svg-card-content-container text-center gap-6">
                      <div className="svg-card-content-title ibm-plex-sans color-2b2b2b small">Roles and Groups</div>
                      <div className="svg-card-content-description size-14 color-787e81">Define granular permissions and group-based access models that return roles directly in ID and access tokens. Make authorization clean, maintainable, and consistent across all your services.</div>
                    </div>
                  </div>
                </div>
                <div className="_3-card-grid">
                  <div className="svg-card px-24">
                    <div className="svg-card-image-container center"><img src="/images/b2b-saas-why-customized.svg" loading="lazy" alt="" /></div>
                    <div className="svg-card-content-container text-center gap-6">
                      <div className="svg-card-content-title ibm-plex-sans color-2b2b2b small">Customized Login</div>
                      <div className="svg-card-content-description size-14 color-787e81">Deliver a login experience that matches your brand. Fully customizable templates, domains, and localization ensure your authentication feels native to your SaaS.</div>
                    </div>
                  </div>
                  <div className="svg-card px-24">
                    <div className="svg-card-image-container center"><img src="/images/b2b-saas-why-integration.svg" loading="lazy" alt="" /></div>
                    <div className="svg-card-content-container text-center gap-6">
                      <div className="svg-card-content-title ibm-plex-sans color-2b2b2b small">Easy integration</div>
                      <div className="svg-card-content-description size-14 color-787e81">Integrate quickly with modern SDKs for web and mobile, Admin APIs for automation, and flexible hooks for custom logic. Ship faster without reinventing authentication infrastructure.</div>
                    </div>
                  </div>
                  <div className="svg-card px-24">
                    <div className="svg-card-image-container center"><img src="/images/b2b-saas-why-security.svg" loading="lazy" alt="" /></div>
                    <div className="svg-card-content-container text-center gap-6">
                      <div className="svg-card-content-title ibm-plex-sans color-2b2b2b small">Advanced security features</div>
                      <div className="svg-card-content-description size-14 color-787e81">Enterprise-grade protection out of the box: Passkeys, MFA, bot protection, rate limits, account lockout, and monitoring tools to safeguard your users and meet compliance requirements with minimal engineering effort.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="container-default">
              <div className="container-default-inner px-0">
                <div className="top-content flex-column align-left mobile-center">
                  <div className="top-content-icon mobile-center"><img src="/images/b2b_saas_granular-control-icon.svg" loading="lazy" alt="" /></div>
                  <h2 className="top-content-title mg-bottom-16px ibm-plex-sans color-2e2e2e size-40">Granular Control, Unmatched Security: <span className="text-highlight-gradient">Empower Your B2B Defenses</span></h2>
                  <div className="top-content-description ibm-plex-sans size-18">Stop juggling complex logins and security concerns. Authgear CIAM solution empowers you to take control of your online identity with features designed to reduce user friction and drive user growth.</div>
                </div>
                <div className="grid-12 gap-36 mobile-bg-white">
                  <div className="features-card-new px-24 bg-transparent border-0 bg-white">
                    <div className="features-card-new_image"><img src="/images/b2b_saas_granular-control-domain.svg" loading="lazy" alt="" /></div>
                    <div className="features-card-new_content-wrap">
                      <div className="features-card-new_content-title">Enhanced Protection by Domain</div>
                      <div className="features-card-new_content-desc">Utilize registration locking by domain to restrict account creation from specific email domains known for malicious activity.</div>
                    </div>
                  </div>
                  <div className="features-card-new px-24 bg-transparent space-between border-0 bg-white">
                    <div className="features-card-new_image last"><img src="/images/b2b_saas_granular-control-captcha.svg" loading="lazy" alt="" className="mw-140 md-120" /></div>
                    <div className="features-card-new_content-wrap">
                      <div className="features-card-new_content-title">Customizable Security with Captcha</div>
                      <div className="features-card-new_content-desc">Implement Captcha challenges to prevent automated bot attacks and safeguard your B2B client's login processes.</div>
                    </div>
                  </div>
                  <div className="features-card-new px-24 bg-transparent space-between border-0 bg-white">
                    <div className="features-card-new_image last"><img src="/images/b2b_saas_granular-control-travel.svg" loading="lazy" alt="" className="mw-140 md-120" /></div>
                    <div className="features-card-new_content-wrap">
                      <div className="features-card-new_content-title">Prevent Impossible Travel</div>
                      <div className="features-card-new_content-desc">Leverage Authgear's impossible travel calculations to detect and block login attempts originating from geographically improbable locations, thwarting potential account takeover attempts.</div>
                    </div>
                  </div>
                  <div className="features-card-new px-24 bg-transparent border-0 bg-white">
                    <div className="features-card-new_image"><img src="/images/b2b_saas_granular-control-IPACLs.svg" loading="lazy" alt="" /></div>
                    <div className="features-card-new_content-wrap">
                      <div className="features-card-new_content-title">Granular Access Control with IP Blocklist</div>
                      <div className="features-card-new_content-desc">Define IP Access Control Lists (ACLs) to restrict access to your B2B client's application based on authorized IP addresses, adding an extra layer of security.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="container-default">
              <div className="container-default-inner px-0">
                <div className="top-content flex-column text-center">
                  <h2 className="text-center mg-bottom-16px top-content-title ibm-plex-sans color-2e2e2e"><span className="text-highlight-gradient">Ready to Secure & Scale Your B2B Ecosystem? Get Your Free Trial Today!</span></h2>
                  <div className="top-content-description ibm-plex-sans size-18">Transform your B2B user experience and empower your business with robust security. Secure your special offer and experience the benefits of Authgear SaaS authentication firsthand.</div>
                </div>
                <div className="_2-card-grid gap-32 mobile-1-col">
                  <div className="svg-card p-32 row">
                    <div className="svg-card-image-container center _w-full mobile-left"><img src="/images/b2b_saas_freetrial-support.svg" loading="lazy" alt="" /></div>
                    <div className="svg-card-content-container gap-6 vertical-center">
                      <div className="svg-card-content-title ibm-plex-sans small">Free Trial with Expert Support</div>
                      <div className="svg-card-content-description size-14 color-787e81">Sign up for a free trial and explore all the features that Authgear has to offer. Our dedicated team will be there to guide you through the entire process, ensuring a smooth onboarding experience.</div>
                    </div>
                  </div>
                  <div className="svg-card p-32 row">
                    <div className="svg-card-image-container center _w-full mobile-left"><img src="/images/b2b_saas_freetrial-reduce.svg" loading="lazy" alt="" /></div>
                    <div className="svg-card-content-container gap-6 vertical-center">
                      <div className="svg-card-content-title ibm-plex-sans small">Reduced Costs</div>
                      <div className="svg-card-content-description size-14 color-787e81">Streamline operations and potentially reduce infrastructure and development costs associated with managing multiple SaaS authentication systems.</div>
                    </div>
                  </div>
                  <div className="svg-card p-32 row">
                    <div className="svg-card-image-container center _w-full mobile-left"><img src="/images/b2b_saas_freetrial-security.svg" loading="lazy" alt="" /></div>
                    <div className="svg-card-content-container gap-6 vertical-center">
                      <div className="svg-card-content-title ibm-plex-sans small">Enhanced Security</div>
                      <div className="svg-card-content-description size-14 color-787e81">Benefit from industry-leading security features and ensure robust protection for your B2B ecosystem.</div>
                    </div>
                  </div>
                  <div className="svg-card p-32 row">
                    <div className="svg-card-image-container center _w-full mobile-left"><img src="/images/b2b_saas_freetrial-experience.svg" loading="lazy" alt="" /></div>
                    <div className="svg-card-content-container gap-6 vertical-center">
                      <div className="svg-card-content-title ibm-plex-sans small">Improved User Experience</div>
                      <div className="svg-card-content-description size-14 color-787e81">Deliver a frictionless and secure login experience for both your B2B clients and their users.</div>
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
                      <h2 className="form-heading color-white footer-form">Secure, Streamline & Empower Your Extended Workforce</h2>
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
        </div>
    </>
  );
}