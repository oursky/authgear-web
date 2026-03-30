import { ArrowRightIcon } from '@heroicons/react/24/outline';
import ContactForm from '@/components/ContactForm';

interface Props {
  locale: string;
}

export default function CiamSolutionPage(_props: Props) {
  return (
    <>
          <section className="ds-hero-banner--white">
            <div className="ds-container ds-container--hero-white">
              <div className="ds-hero-banner__stack">
                <div className="ds-section-eyebrow">B2C CIAM</div>
                <h1 className="ds-hero-banner__title">
                  Security Shouldn&apos;t Be a Luxury.<br />
                  You Deserve Both Convenience & Protection.
                </h1>
                <p className="ds-hero-banner__description">
                  Don&apos;t settle for just security. Authgear&apos;s B2C CIAM solution empowers you to take control of your online identity with a seamless and secure user experience. Enjoy the convenience of modern login options like biometrics and social logins
                </p>
                <div className="ds-hero-banner__ctas">
                  <a
                    href="https://portal.authgear.com/?utm_source=solutions-b2c-ciam&utm_medium=link&utm_campaign=talk-with-us"
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
                  One-Stop Shop for Security & Auth:
                  <br />
                  Simplify with Authgear CIAM solution
                </h2>
                <p className="section-lede-on-light">
                  Authgear is your all-in-one CIAM solution for managing user authentication and securing your applications. Simplify your security stack and empower your users.
                </p>
              </div>
              <div className="ds-grid-3 ciam-one-stop-feature-cards">
                <div className="svg-card">
                  <img src="/images/b2c_ciam_one-stop-sso.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Single Sign On</div>
                  </div>
                </div>
                <div className="svg-card">
                  <img src="/images/b2c_ciam_one-stop-passwordless.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Passwordless Login</div>
                  </div>
                </div>
                <div className="svg-card">
                  <img src="/images/b2c_ciam_one-stop-mfa.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Multi-Factor Authentication</div>
                  </div>
                </div>
                <div className="svg-card">
                  <img src="/images/b2c_ciam_one-stop-biometric.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Biometric & Passkeys</div>
                  </div>
                </div>
                <div className="svg-card">
                  <img src="/images/b2c_ciam_one-stop-breachedpassword.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Breached Password Detection</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="ds-section ds-bg-light-blue">
            <div className="ds-container">
              <div className="title-content">
                <h2 className="heading-on-light">
                  Frictionless Logins, Exponential Growth: How Authgear Empowers Your Users
                </h2>
                <p className="section-lede-on-light">
                  Stop juggling complex logins and security concerns. Authgear CIAM solution empowers you to take control of your online identity with features designed to reduce user friction and drive user growth.
                </p>
              </div>
              <div className="ciam-frictionless-feature-cards grid w-full grid-cols-1 gap-6 self-stretch lg:grid-cols-3 lg:grid-rows-2 lg:gap-6">
                <div className="svg-card lg:col-start-1 lg:row-start-1">
                  <img src="/images/b2c_ciam_empowers-passwordmanagement.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Self-Service Password Management</div>
                    <div className="ds-svg-card-description">
                      Empower users to reset passwords and manage their accounts independently.
                    </div>
                  </div>
                </div>
                <div className="svg-card lg:col-start-1 lg:row-start-2">
                  <img src="/images/b2c_ciam_empowers-reducelogin.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Reduced Login Fatigue</div>
                    <div className="ds-svg-card-description">
                      Eliminate the need for users to remember multiple passwords with Single Sign-On (SSO) across your applications.
                    </div>
                  </div>
                </div>
                <div className="svg-card justify-between lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:h-full lg:min-h-0">
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Modern Login Options</div>
                    <div className="ds-svg-card-description">
                      Offer users the convenience of logging in with familiar methods like Social Logins, Passwordless authentication, and Biometrics (FaceID, TouchID).
                    </div>
                  </div>
                  <img src="/images/b2c_ciam_empowers-modernlogin.svg" loading="lazy" alt="" className="mw-140 mx-auto" />
                </div>
                <div className="svg-card lg:col-start-3 lg:row-start-1">
                  <img src="/images/b2c_ciam_empowers-registration.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Seamless Registration</div>
                    <div className="ds-svg-card-description">
                      Simplify the sign-up process with intuitive forms and one-click registration options.
                    </div>
                  </div>
                </div>
                <div className="svg-card lg:col-start-3 lg:row-start-2">
                  <img src="/images/b2c_ciam_empowers-mfa.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Enhanced Security</div>
                    <div className="ds-svg-card-description">
                      Advanced security features like Multi-Factor Authentication and breached password detection keep user data safe, fostering trust and loyalty.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="ds-section">
            <div className="ds-container">
              <div className="title-content">
                <h2 className="heading-on-light">Reap the Rewards: User-Centric Security</h2>
                <p className="section-lede-on-light">
                  Prioritizing user experience with Authgear CIAM solution unlocks a multitude of benefits for your business.
                </p>
              </div>
              <div className="ds-grid-2">
                <div className="svg-card">
                  <img src="/images/b2c_ciam_usercentric-journeys.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Effortless User Journeys</div>
                    <div className="ds-svg-card-description">
                      Streamlined login processes and convenient authentication options create a frictionless user experience that keeps users engaged and coming back for more.
                    </div>
                  </div>
                </div>
                <div className="svg-card">
                  <img src="/images/b2c_ciam_usercentric-increased.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Increased Conversions</div>
                    <div className="ds-svg-card-description">
                      Reduced signup barriers and a user-friendly experience translate to more successful signups and completed transactions.
                    </div>
                  </div>
                </div>
                <div className="svg-card">
                  <img src="/images/b2c_ciam_usercentric-boosted.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Boosted User Engagement</div>
                    <div className="ds-svg-card-description">
                      Happy users are loyal users. Authgear helps you foster positive user experiences that drive repeat engagement with your platform.
                    </div>
                  </div>
                </div>
                <div className="svg-card">
                  <img src="/images/b2c_ciam_usercentric-enhanced.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Enhanced Brand Reputation</div>
                    <div className="ds-svg-card-description">
                      A seamless and secure login process builds trust and strengthens your brand image, leading to increased customer loyalty.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="ds-section b2c-ciam-solution-section-dark-bg">
            <div className="ds-container">
              <div className="title-content">
                <h2 className="heading-on-dark">
                  Effortless Integration, Unmatched Security: Why Developers Choose Authgear
                </h2>
                <p className="section-lede-on-dark">
                  Building a secure and user-friendly login experience shouldn&apos;t slow down your development process.{' '}
                  Authgear empowers developers with powerful tools to streamline integration and focus on what matters most: building the core features of your application.
                </p>
              </div>
              <div className="ds-grid-2">
                <div className="svg-card svg-card-glass">
                  <img src="/images/b2c_ciam_integration-nocode.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">No-Code Implementation</div>
                    <div className="ds-svg-card-description">
                      Intuitive interface allows for easy integration with your existing infrastructure, eliminating the need for extensive coding. This frees up valuable development resources for core functionalities.
                    </div>
                  </div>
                </div>
                <div className="svg-card svg-card-glass">
                  <img src="/images/b2c_ciam_integration-prebuilt.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Pre-Built UI & UX</div>
                    <div className="ds-svg-card-description">
                      Skip the design phase and leverage Authgear&apos;s user-friendly interface, optimized for seamless login experiences and efficient user onboarding.
                    </div>
                  </div>
                </div>
                <div className="svg-card svg-card-glass">
                  <img src="/images/b2c_ciam_integration-flexible.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Flexible & Adaptable</div>
                    <div className="ds-svg-card-description">
                      Adapts to your specific needs. Customize authentication flows, ensure compliance with industry standards, and integrate seamlessly with your existing infrastructure through robust APIs and webhooks.
                    </div>
                  </div>
                </div>
                <div className="svg-card svg-card-glass">
                  <img src="/images/b2c_ciam_integration-security.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Security Built-In</div>
                    <div className="ds-svg-card-description">
                      Enjoy peace of mind knowing Authgear CIAM solution enforces industry best practices for secure authentication. Features like multi-factor authentication, breached password detection, and secure session management come built-in, saving development time and ensuring robust security.
                    </div>
                  </div>
                </div>
              </div>
              <div className="title-content ds-title-content--after-block">
                <h2 className="heading-on-dark">
                  Frictionless Logins, Exponential Growth: How Authgear Empowers Your Users
                </h2>
                <p className="section-lede-on-dark">
                  Stop juggling complex logins and security concerns. Authgear CIAM solution empowers you to take control of your online identity with features designed to reduce user friction and drive user growth.
                </p>
              </div>
              <div className="ds-grid-3">
                <div className="svg-card svg-card-glass">
                  <img src="/images/b2c_ciam_development-innovation.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Focus on Innovation</div>
                    <div className="ds-svg-card-description">
                      Spend less time on login functionality and more time building features that drive user engagement.
                    </div>
                  </div>
                </div>
                <div className="svg-card svg-card-glass">
                  <img src="/images/b2c_ciam_development-reduce.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Reduce Development Time</div>
                    <div className="ds-svg-card-description">
                      The no-code approach and pre-built UI significantly accelerate the development process.
                    </div>
                  </div>
                </div>
                <div className="svg-card svg-card-glass">
                  <img src="/images/b2c_ciam_development-experience.svg" loading="lazy" alt="" />
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">Deliver a Secure User Experience</div>
                    <div className="ds-svg-card-description">
                      Benefit from built-in security features and best practices without compromising user experience.
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
                      <h2 className="form-heading color-white footer-form">All-in-one CIAM Solution for User Authentication & App Security</h2>
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