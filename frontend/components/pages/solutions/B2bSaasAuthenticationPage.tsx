import { ArrowRightIcon } from '@heroicons/react/24/outline';
import ContactForm from '@/components/ContactForm';

interface Props {
  locale: string;
}

export default function B2bSaasAuthenticationPage(_props: Props) {
  return (
    <>
          <section className="ds-hero-banner--white">
            <div className="ds-container ds-container--hero-white">
              <div className="ds-hero-banner__stack">
                <div className="ds-section-eyebrow">B2B SaaS</div>
                <h1 className="ds-hero-banner__title">
                  Fortress Your B2B SaaS Authentication:
                  <br />
                  Secure Access for You & Every Tenant.
                </h1>
                <p className="ds-hero-banner__description">
                  Authgear empowers your SaaS authentication with robust security and effortless multi-tenancy management.
                  <br />
                  <span className="text-bold">
                    Deliver a seamless user experience for all, while safeguarding sensitive data.
                  </span>
                </p>
                <div className="ds-hero-banner__ctas">
                  <a
                    href="https://portal.authgear.com/?utm_source=solutions-b2b-saas&utm_medium=link&utm_campaign=talk-with-us"
                    target="_blank"
                    rel="noreferrer"
                    className="ds-btn ds-btn-primary"
                  >
                    Talk with Us
                    <ArrowRightIcon className="ds-btn__icon-arrow" aria-hidden />
                  </a>
                </div>
              </div>
              <img
                src="/images/b2c_ciam_kv-hero-login-box1.svg"
                loading="lazy"
                alt=""
                width={1152}
                className="ds-hero-banner__media ds-hero-banner__media--bottom"
              />
            </div>
          </section>
          <section className="ds-section">
            <div className="ds-container">
              <div className="title-content">
                <h2 className="heading-on-light">
                  Empower & Secure:
                  <br />
                  Granular Access Control for Your B2B Clients
                </h2>
                <p className="section-lede-on-light">
                  SaaS identity management for multiple B2B clients with varying needs can be a complex challenge. Authgear solution simplifies SaaS identity and access management with granular Role-Based Access Control.
                </p>
              </div>
            </div>
            <div className="container-full-general">
              <img src="/images/b2b_saas_empower-flow.svg" loading="lazy" alt="" className="_w-full pb-80" />
              <img src="/images/b2b_saas_empower-flow-m.svg" loading="lazy" alt="" className="_w-full pb-80 mobile-100" />
            </div>
          </section>
          <section className="ds-section">
            <div className="ds-container">
              <div className="title-content">
                <h2 className="heading-on-light">
                  Seamless Multi-Tenancy with
                  <br />
                  Authgear SaaS authentication
                </h2>
                <p className="section-lede-on-light">
                  Scale effortlessly and deliver a secure experience for all your enterprise clients
                  <br />
                  with Authgear&apos;s robust multi-tenancy support.
                </p>
              </div>
              <div className="ds-grid-3 b2b-saas-multitenancy-step-cards">
                <div className="svg-card">
                  <div className="b2b-saas-multitenancy-step-cards__step" aria-hidden>
                    1
                  </div>
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Reduced Costs & Streamlined Management</div>
                    <div className="ds-svg-card-description">
                      Manage all your B2B clients from a single platform, eliminating the need for multiple SaaS authentication systems and reducing infrastructure and maintenance overhead.
                    </div>
                  </div>
                </div>
                <div className="svg-card">
                  <div className="b2b-saas-multitenancy-step-cards__step" aria-hidden>
                    2
                  </div>
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Flexibility & Effortless Scalability</div>
                    <div className="ds-svg-card-description">
                      Onboard new B2B clients seamlessly and scale effortlessly as your user base grows. Authgear&apos;s multi-tenancy adapts to your evolving B2B ecosystem.
                    </div>
                  </div>
                </div>
                <div className="svg-card">
                  <div className="b2b-saas-multitenancy-step-cards__step" aria-hidden>
                    3
                  </div>
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Centralized Security & Compliance</div>
                    <div className="ds-svg-card-description">
                      Enforce consistent security policies and access controls across all client accounts. Simplify security management and ensure a robust security posture for your entire platform.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="ds-section ds-bg-light-blue">
            <div className="ds-container">
              <div className="title-content">
                <h2 className="heading-on-light">
                  Why Authgear for B2B SaaS
                </h2>
              </div>
              <div className="ds-grid-3">
                <div className="svg-card">
                  <img src="/images/b2b-saas-why-adminpanel.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Admin Portal</div>
                    <div className="ds-svg-card-description">
                      A powerful management dashboard that lets your team handle users, roles, sessions, audits, and security policies without writing code.
                    </div>
                  </div>
                </div>
                <div className="svg-card">
                  <img src="/images/b2b-saas-why-sso.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">SSO for multi-apps</div>
                    <div className="ds-svg-card-description">
                      Provide a seamless login experience across your entire product suite. So your customers can sign in once and move between apps effortlessly.
                    </div>
                  </div>
                </div>
                <div className="svg-card">
                  <img src="/images/b2b-saas-why-roles.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Roles and Groups</div>
                    <div className="ds-svg-card-description">
                      Define granular permissions and group-based access models that return roles directly in ID and access tokens. Make authorization clean, maintainable, and consistent across all your services.
                    </div>
                  </div>
                </div>
                <div className="svg-card">
                  <img src="/images/b2b-saas-why-customized.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Customized Login</div>
                    <div className="ds-svg-card-description">
                      Deliver a login experience that matches your brand. Fully customizable templates, domains, and localization ensure your authentication feels native to your SaaS.
                    </div>
                  </div>
                </div>
                <div className="svg-card">
                  <img src="/images/b2b-saas-why-integration.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Easy integration</div>
                    <div className="ds-svg-card-description">
                      Integrate quickly with modern SDKs for web and mobile, Admin APIs for automation, and flexible hooks for custom logic. Ship faster without reinventing authentication infrastructure.
                    </div>
                  </div>
                </div>
                <div className="svg-card">
                  <img src="/images/b2b-saas-why-security.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Advanced security features</div>
                    <div className="ds-svg-card-description">
                      Enterprise-grade protection out of the box: Passkeys, MFA, bot protection, rate limits, account lockout, and monitoring tools to safeguard your users and meet compliance requirements with minimal engineering effort.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="ds-section">
            <div className="ds-container">
              <div className="title-content">
                <h2 className="heading-on-light">
                  Granular Control, Unmatched Security:
                  <br />
                  Empower Your B2B Defenses
                </h2>
                <p className="section-lede-on-light">
                  Stop juggling complex logins and security concerns. Authgear CIAM solution empowers you to take control of your online identity with features designed to reduce user friction and drive user growth.
                </p>
              </div>
              <div className="b2b-saas-granular-defense-cards">
                <div className="svg-card">
                  <img src="/images/b2b_saas_granular-control-domain.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Enhanced Protection by Domain</div>
                    <div className="ds-svg-card-description">
                      Utilize registration locking by domain to restrict account creation from specific email domains known for malicious activity.
                    </div>
                  </div>
                </div>
                <div className="svg-card">
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Customizable Security with Captcha</div>
                    <div className="ds-svg-card-description">
                      Implement Captcha challenges to prevent automated bot attacks and safeguard your B2B client&apos;s login processes.
                    </div>
                  </div>
                  <img src="/images/b2b_saas_granular-control-captcha.svg" loading="lazy" alt="" />
                </div>
                <div className="svg-card">
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Prevent Impossible Travel</div>
                    <div className="ds-svg-card-description">
                      Leverage Authgear&apos;s impossible travel calculations to detect and block login attempts originating from geographically improbable locations, thwarting potential account takeover attempts.
                    </div>
                  </div>
                  <img src="/images/b2b_saas_granular-control-travel.svg" loading="lazy" alt="" />
                </div>
                <div className="svg-card">
                  <img src="/images/b2b_saas_granular-control-IPACLs.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Granular Access Control with IP Blocklist</div>
                    <div className="ds-svg-card-description">
                      Define IP Access Control Lists (ACLs) to restrict access to your B2B client&apos;s application based on authorized IP addresses, adding an extra layer of security.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="ds-section">
            <div className="ds-container">
              <div className="title-content">
                <h2 className="heading-on-light">
                  Ready to Secure & Scale Your B2B Ecosystem? Get Your Free Trial Today!
                </h2>
                <p className="section-lede-on-light">
                  Transform your B2B user experience and empower your business with robust security. Secure your special offer and experience the benefits of Authgear SaaS authentication firsthand.
                </p>
              </div>
              <div className="ds-grid-2">
                <div className="svg-card">
                  <img src="/images/b2b_saas_freetrial-support.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Free Trial with Expert Support</div>
                    <div className="ds-svg-card-description">
                      Sign up for a free trial and explore all the features that Authgear has to offer. Our dedicated team will be there to guide you through the entire process, ensuring a smooth onboarding experience.
                    </div>
                  </div>
                </div>
                <div className="svg-card">
                  <img src="/images/b2b_saas_freetrial-reduce.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Reduced Costs</div>
                    <div className="ds-svg-card-description">
                      Streamline operations and potentially reduce infrastructure and development costs associated with managing multiple SaaS authentication systems.
                    </div>
                  </div>
                </div>
                <div className="svg-card">
                  <img src="/images/b2b_saas_freetrial-security.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Enhanced Security</div>
                    <div className="ds-svg-card-description">
                      Benefit from industry-leading security features and ensure robust protection for your B2B ecosystem.
                    </div>
                  </div>
                  <div className="svg-card p-32 row">
                    <div className="svg-card-image-container center _w-full mobile-left"><img src="/images/b2b_saas_freetrial-experience.svg" loading="lazy" alt="" /></div>
                    <div className="svg-card-content-container gap-6 vertical-center">
                      <div className="svg-card-content-title ibm-plex-sans small">Improved User Experience</div>
                      <div className="svg-card-content-description size-14 color-787e81">Deliver a frictionless and secure login experience for both your B2Bclients and their users.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
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
    </>
  );
}