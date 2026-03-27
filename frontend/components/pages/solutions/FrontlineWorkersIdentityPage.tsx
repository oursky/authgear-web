import { ArrowRightIcon } from '@heroicons/react/24/outline';
import ContactForm from '@/components/ContactForm';

interface Props {
  locale: string;
}

export default function FrontlineWorkersIdentityPage(_props: Props) {
  return (
    <>
      <section className="ds-hero-banner--dark">
        <div className="ds-container ds-container--hero">
          <div className="ds-hero-banner__row">
            <div className="ds-hero-banner__body">
              <h1 className="ds-hero-banner__title">
                Secure & Cost-Effective Access for Your Frontline Workers
              </h1>
              <p className="ds-hero-banner__description">
                Managing access for a growing, diverse workforce can be complex, especially for retailers with hybrid IT environments. Existing WIAM solutions often fall short, leaving you with siloed systems, manual provisioning headaches, and security concerns.
              </p>
              <div className="ds-hero-banner__ctas">
                <a href="/schedule-demo" target="_blank" rel="noreferrer" className="ds-btn ds-btn-primary">
                  Get Started for Free
                  <ArrowRightIcon className="ds-btn__icon-arrow" aria-hidden />
                </a>
                <a
                  href="https://portal.authgear.com/?utm_source=solutions-enterprise-sso&utm_medium=link&utm_campaign=sign-up"
                  target="_blank"
                  rel="noreferrer"
                  className="ds-btn ds-btn-tertiary"
                >
                  Free Sign-Up
                  <ArrowRightIcon className="ds-btn__icon-arrow" aria-hidden />
                </a>
              </div>
            </div>
            <img
              className="ds-hero-banner__media"
              src="/images/solutions-wiam-kv2x.webp"
              width={624}
              alt=""
            />
          </div>
        </div>
      </section>
      <section className="ds-section">
        <div className="ds-container">
          <div className="title-content">
            <h2 className="heading-on-light">Empower Your Frontline with Secure, Streamlined Access: Authgear for Extended Workforce</h2>
            <p className="section-lede-on-light">Authgear for Extended Workforce is the answer.Our solution seamlessly integrates with your existing directory services, allowing you to:</p>
          </div>
          <div className="ds-grid-2">
            <div className="svg-card">
              <img src="/images/solutions-wiam-empower-staff.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">Securely onboard and manage frontline staff and contractors</div>
                <div className="ds-svg-card-description">Easily create groups and roles for provisioning, leveraging batch user creation for fast and efficient setup.</div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/solutions-wiam-empower-management.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">Streamline retail frontline access management</div>
                <div className="ds-svg-card-description">Grant and revoke access to critical systems and resources based on roles and permissions, ensuring only authorized personnel have access.</div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/solutions-wiam-empower-security.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">Maintain high security standards</div>
                <div className="ds-svg-card-description">Enforce multi-factor authentication, passwordless login, and other advanced security features to protect sensitive data.</div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/solutions-wiam-empower-save.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">Save time and money</div>
                <div className="ds-svg-card-description">Eliminate manual provisioning tasks and streamline access management processes, reducing administrative overhead and costs.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ds-section">
        <div className="ds-container">
          <div className="ds-split ds-split-row">
            <div className="ds-split-row__media">
              <img
                src="/images/solutions-wiam-discory-customer-stories.svg"
                loading="lazy"
                alt=""
                className="ds-split-row__img"
              />
            </div>
            <div className="ds-split-row__body">
              <h2 className="heading-on-light">Discover Your Success Story: Explore Success Stories</h2>
              <p className="section-lede-on-light">
                Get inspired by Authgear&apos;s real-world impact! We&apos;ve helped leading companies across diverse industries streamline extended workforce access and elevate security.
              </p>
              <a
                href="https://www.authgear.com/post/passkey-vs-password-why-passkeys-are-the-future-of-security"
                className="button-secondary insection-cta features-text-block-cta-left w-button"
              >
                Unlock the stories -{'>'}
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="ds-section">
        <div className="ds-container">
          <div className="ds-split ds-split-row ds-split-row--reverse">
            <div className="ds-split-row__media">
              <img
                src="/images/solutions-wiam-discory-customer-stories.svg"
                loading="lazy"
                alt=""
                className="ds-split-row__img"
              />
            </div>
            <div className="ds-split-row__body">
              <h2 className="heading-on-light">Discover Your Success Story: Explore Success Stories</h2>
              <p className="section-lede-on-light">
                Get inspired by Authgear&apos;s real-world impact! We&apos;ve helped leading companies across diverse industries streamline extended workforce access and elevate security.
              </p>
              <a
                href="https://www.authgear.com/post/passkey-vs-password-why-passkeys-are-the-future-of-security"
                className="button-secondary insection-cta features-text-block-cta-left w-button"
              >
                Unlock the stories -{'>'}
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="ds-section">
        <div className="ds-container">
          <div className="title-content">
            <h2 className="heading-on-light">Empowering Your Extended Workforce:Tailored Access & Secure Control</h2>
            <p className="section-lede-on-light">Forget one-size-fits-all access solutions. Authgear builds a custom access experience for your frontline staff and contractors. Grant controlled access to authorized apps, integrate seamlessly with internal systems, ditch frustrating passwords with modern MFA like facial recognition, and empower key staff for account recovery.</p>
          </div>
          <div className="ds-grid-2">
            <div className="svg-card">
                <img src="/images/b2c_ciam_usercentric-journeys.svg" loading="lazy" alt="" />
                <div className="ds-svg-card-content">
                  <div className="ds-svg-card-title">Dedicated Access for Your Extended Workforce</div>
                  <div className="ds-svg-card-description">Forget managing duplicate systems. Authgear allows you to create a separate environment for frontline staff and contractors, completely isolated from your internal company network. This means they only access the specific applications you authorize, keeping data secure and streamlining workflows.</div>
                </div>
              </div>
              <div className="svg-card">
                <img src="/images/b2c_ciam_usercentric-increased.svg" loading="lazy" alt="" />
                <div className="ds-svg-card-content">
                  <div className="ds-svg-card-title">Seamless Integrations with Flexibility</div>
                  <div className="ds-svg-card-description">Authgear seamlessly integrates with existing WIAM solutions like ADFS and Google Workspace. Your office staff can continue using their familiar logins (like Microsoft accounts or LDAP) to access applications shared with the frontline, fostering collaboration and eliminating access silos.</div>
                </div>
              </div>
              <div className="svg-card">
                <img src="/images/b2c_ciam_usercentric-boosted.svg" loading="lazy" alt="" />
                <div className="ds-svg-card-content">
                  <div className="ds-svg-card-title">Modern & Convenient MFA</div>
                  <div className="ds-svg-card-description">Authgear offers diverse multi-factor authentication options like facial recognition and device-based biometric logins, perfect for frontline staff. Not only do you enhance security, but you also simplify physical presence verification and clock-in processes.</div>
                </div>
              </div>
              <div className="svg-card">
                <img src="/images/b2c_ciam_usercentric-enhanced.svg" loading="lazy" alt="" />
                <div className="ds-svg-card-content">
                  <div className="ds-svg-card-title">Empowered Account Recovery</div>
                  <div className="ds-svg-card-description">Minimize IT support headaches with designated key staff recovery. Shop managers, team leads, or security personnel can assist with forgotten passwords or lockouts, reducing dependence on your central IT team and keeping operations running smoothly.</div>
                </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ds-section ds-bg-light-blue">
        <div className="ds-container">
          <div className="title-content">
            <h2 className="heading-on-light">
              Navigate the Frontier of Workforce Access: Authgear WIAM for Extended Teams
            </h2>
            <p className="section-lede-on-light">
              We equip you with the tools and expertise to secure your digital domain, empower your workforce, and unlock their full potential.
            </p>
          </div>
          <div className="ds-grid-4">
            <div className="svg-card">
              <img src="/images/solutions-wiam-access-01.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">Secure Sign-up & Approval</div>
                <div className="ds-svg-card-description">
                  Frictionless registration for external users with controlled access for authorized personnel, even with their personal emails and phone numbers.
                </div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/solutions-wiam-access-02.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">Manage Yourself & Get IT Help</div>
                <div className="ds-svg-card-description">
                  Dedicated portal for self-service tasks (password reset, profile updates) and responsive IT support.
                </div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/solutions-wiam-access-03.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">Granular Access for Everyone</div>
                <div className="ds-svg-card-description">
                  Define & enforce access based on roles, restricting features & applications for optimal security.
                </div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/solutions-wiam-access-04.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">Multi-Factor & Passwordless Choices</div>
                <div className="ds-svg-card-description">
                  Choose from a variety of secure authentication options like MFA, passkeys, or even face recognition for frontline staff&apos;s physical presence.
                </div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/solutions-wiam-access-05.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">One System for All Identities</div>
                <div className="ds-svg-card-description">
                  Seamless integration with existing WIAM solutions like ADFS & Google Workspace.
                </div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/solutions-wiam-access-06.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">Bulk Accounts in a Flash</div>
                <div className="ds-svg-card-description">
                  Fast user creation with CSV upload or API and passwordless login/email invitation options.
                </div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/solutions-wiam-access-07.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">Integration with HR System</div>
                <div className="ds-svg-card-description">
                  Connect directly with your existing HR system. Ensure frontline staff have the right access, effortlessly and automatically.
                </div>
              </div>
            </div>
            <div className="svg-card">
              <img src="/images/solutions-wiam-access-08.svg" loading="lazy" alt="" />
              <div className="ds-svg-card-content">
                <div className="ds-svg-card-title">Access Anywhere, Any Device</div>
                <div className="ds-svg-card-description">
                  Whether desktop, mobile, or tablet, Authgear&apos;s responsive platform empowers your team to work where they need to, seamlessly.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ds-section">
        <div className="ds-container">
          <div className="title-content">
            <h2 className="heading-on-light">Trusted by Enterprises for Frontline Workers Identity</h2>
          </div>
          <div className="_2-card-grid">
            <div className="solution-case-study-card">
              <img
                src="/images/solutions-wiam-case-MTR2x.webp"
                loading="lazy"
                width={624}
                sizes="(max-width: 767px) 100vw, 624px"
                alt=""
                srcSet="/images/solutions-wiam-case-MTR2x-p-500.webp 500w, /images/solutions-wiam-case-MTR2x-p-800.webp 800w, /images/solutions-wiam-case-MTR2x-p-1080.webp 1080w, /images/solutions-wiam-case-MTR2x.webp 1248w"
                className="solution-case-study-card-thumb"
              />
              <div className="solution-case-study-card-text">
                <div className="ds-svg-card-content">
                  <h3 className="ds-svg-card-title">MTR Corporation Simplifies Part‑Time Hiring Login</h3>
                  <a href="/customer-stories/hongkong-mtr" className="ds-btn ds-btn-secondary">
                    Unlock the stories
                    <ArrowRightIcon className="ds-btn__icon-arrow" aria-hidden />
                  </a>
                </div>
              </div>
            </div>
            <div className="solution-case-study-card">
              <img
                src="/images/solutions-wiam-case-QSR2x.webp"
                loading="lazy"
                width={624}
                sizes="(max-width: 767px) 100vw, 624px"
                alt=""
                srcSet="/images/solutions-wiam-case-QSR2x-p-500.webp 500w, /images/solutions-wiam-case-QSR2x-p-800.webp 800w, /images/solutions-wiam-case-QSR2x-p-1080.webp 1080w, /images/solutions-wiam-case-QSR2x.webp 1248w"
                className="solution-case-study-card-thumb"
              />
              <div className="solution-case-study-card-text">
                <div className="ds-svg-card-content">
                  <h3 className="ds-svg-card-title">Global QSR Streamlines Frontline Login with Authgear</h3>
                  <a href="/customer-stories/global-qsr" className="ds-btn ds-btn-secondary">
                    Unlock the stories
                    <ArrowRightIcon className="ds-btn__icon-arrow" aria-hidden />
                  </a>
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