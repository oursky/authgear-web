import Link from 'next/link';

interface Props {
  locale: string;
}

export default async function AuthgearOncePage(_props: Props) {
  return (
    <div className="page-wrapper">
      <div className="once-price-float">
        <div className="w-layout-hflex once-price">
          <img src="/images/Authgear_once_logo.svg" loading="lazy" alt="" className="pricing---once-logo" />
          <div className="w-layout-blockcontainer once-price-text w-container">
            <div className="oce-price-text">$ <span className="price-number">9,999</span> /once</div>
          </div>
        </div>
        <div className="w-layout-hflex whats-included">
          <div>
            <div className="text-block-50">What's included?</div>
            <div className="w-layout-blockcontainer container-1449 w-container">
              <div className="w-layout-blockcontainer included-feature w-container">
                <img src="/images/once_box-checked.svg" loading="lazy" alt="" />
                <div className="included-feature-text">Complete IAM with SDKs and tools.</div>
              </div>
              <div className="w-layout-blockcontainer included-feature w-container">
                <img src="/images/once_box-checked.svg" loading="lazy" alt="" />
                <div className="included-feature-text">Full data control with self-hosting.</div>
              </div>
              <div className="w-layout-blockcontainer included-feature w-container">
                <img src="/images/once_box-checked.svg" loading="lazy" alt="" />
                <div className="included-feature-text">Install in 10 minutes</div>
              </div>
              <div className="w-layout-blockcontainer included-feature w-container">
                <img src="/images/once_box-checked.svg" loading="lazy" alt="" />
                <div className="included-feature-text">2 years of updates included</div>
              </div>
              <div className="w-layout-blockcontainer included-feature w-container">
                <img src="/images/once_box-checked.svg" loading="lazy" alt="" />
                <div className="included-feature-text">Email and Discord support</div>
              </div>
            </div>
          </div>
          <div className="w-layout-hflex container-1450">
            <div className="text-block-51">Get Started Instantly</div>
            <div className="included-feature-text">You'll receive the license key and installation instructions immediately after checkout.</div>
          </div>
          <a href="#" className="once-button w-button">Checkout</a>
        </div>
      </div>
      <div className="page-wrapper once-banner">
        <div className="section home-hero dark once-banner new-kv">
          <div className="container-1440">
            <div className="home-hero-wrapper once">
              <div className="div-block-22">
                <div className="w-layout-blockcontainer once-h1-container w-container">
                  <h1 className="color-white once-h1">Authgear</h1>
                  <img src="/images/Authgear_once_title.svg" loading="lazy" width="338" alt="" className="once-img" />
                </div>
                <div className="w-layout-blockcontainer once-subititle w-container">
                  <p className="strong color-white _28size once-mobile">It's Like Auth0,<br />But Without the <span className="once-gradient">Subscription</span></p>
                  <p className="paragraph-large home-hero text-afb7ff ibm-plex-sans new-kv-desc once-mobile">Take control of your identity and access management with Authgear once—a self-hosted IAM platform you own forever. No subscriptions, no surprises.</p>
                </div>
                <div className="w-layout-hflex home-hero-cta-wrapper once-cta-wrapper">
                  <a href="#" className="button-primary home-hero new-home radius-16 once-special-button w-button">Get in touch</a>
                  <a href="#" className="link-block w-inline-block">
                    <div className="text-block-52">How to Integrate  {">"}  </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="container-default-inner once-container-bottom">
            <div className="w-layout-blockcontainer remember w-container">
              <h2 className="once-h2">Remember When Software Was Yours?</h2>
              <div className="once-subtitle once-purple">There was a time when buying software meant real ownership.<br />You paid once, and it was yours forever—no endless subscriptions, no surprise fees.<br />We created <span className="once-highlight">Authgear once</span> to bring back the freedom and control that software used to offer.</div>
              <div className="text-block-53">Why We're Bringing Ownership Back:</div>
              <div className="w-layout-grid once-grid">
                <div className="remember-card">
                  <img src="/images/once_remember-software-fees.svg" loading="lazy" alt="" />
                  <div className="remember-card-headlines">No Recurring Fees</div>
                  <div className="text-block-54">Pay once and own the software forever</div>
                </div>
                <div className="remember-card">
                  <img src="/images/once_remember-software-vendor.svg" loading="lazy" alt="" />
                  <div className="remember-card-headlines">Freedom from Vendor Lock-In</div>
                  <div className="text-block-54">Self-host and stay in control of your IAM</div>
                </div>
                <div className="remember-card">
                  <img src="/images/once_remember-software-costs.svg" loading="lazy" alt="" />
                  <div className="remember-card-headlines">Predictable Costs</div>
                  <div className="text-block-54">Grow your user base without worrying about rising bills</div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-default-inner once-container-bottom once-container-top">
            <h2 className="once-h2">All-In-One Identity Platform,<br /><span className="once-gradient">One-Time</span> Payment</h2>
            <div className="once-subtitle">With just one installation, you can centralize your user identities, enhance security, and deliver seamless login experiences — all without being tied to a SaaS subscription.</div>
            <div className="w-layout-grid grid-13">
              <div className="w-layout-grid all-in-one">
                <div className="w-layout-blockcontainer all-in-one-tab active w-container">
                  <img src="/images/once_onetimepayment-sso.svg" loading="lazy" alt="" className="tab-activate tab-img-default" />
                  <img src="/images/once_onetimepayment-sso-o.svg" loading="lazy" alt="" className="active-icon active-icon-activate" />
                  <div className="all-in-one-tab-text tab-active-text">Single Sign-On (SSO)</div>
                  <img src="/images/once_onetimepayment-sso2x.webp" loading="lazy" sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" srcSet="/images/once_onetimepayment-sso2x-p-500.webp 500w, /images/once_onetimepayment-sso2x-p-800.webp 800w, /images/once_onetimepayment-sso2x-p-1080.webp 1080w, /images/once_onetimepayment-sso2x.webp 1120w" alt="" className="mobile-tab-image active" />
                </div>
                <div className="w-layout-blockcontainer all-in-one-tab w-container">
                  <img src="/images/once_onetimepayment-passkeys.svg" loading="lazy" alt="" className="tab-img-default" />
                  <img src="/images/once_onetimepayment-passkeys-o.svg" loading="lazy" alt="" className="active-icon" />
                  <div className="all-in-one-tab-text">Passwordless Authentication &amp; Passkeys</div>
                  <img src="/images/once_onetimepayment-2fa2x.webp" loading="lazy" sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" srcSet="/images/once_onetimepayment-2fa2x-p-500.webp 500w, /images/once_onetimepayment-2fa2x-p-800.webp 800w, /images/once_onetimepayment-2fa2x-p-1080.webp 1080w, /images/once_onetimepayment-2fa2x.webp 1120w" alt="" className="mobile-tab-image" />
                </div>
                <div className="w-layout-blockcontainer all-in-one-tab w-container">
                  <img src="/images/once_onetimepayment-2fa.svg" loading="lazy" alt="" className="tab-img-default" />
                  <img src="/images/once_onetimepayment-2fa-o.svg" loading="lazy" alt="" className="active-icon" />
                  <div className="all-in-one-tab-text">Two-Factor Authentication (2FA)</div>
                  <img src="/images/once_onetimepayment-usermanagement2x.webp" loading="lazy" sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" srcSet="/images/once_onetimepayment-usermanagement2x-p-500.webp 500w, /images/once_onetimepayment-usermanagement2x-p-800.webp 800w, /images/once_onetimepayment-usermanagement2x-p-1080.webp 1080w, /images/once_onetimepayment-usermanagement2x.webp 1120w" alt="" className="mobile-tab-image" />
                </div>
                <div className="w-layout-blockcontainer all-in-one-tab w-container">
                  <img src="/images/once_onetimepayment-usermanagement.svg" loading="lazy" alt="" className="tab-img-default" />
                  <img src="/images/once_onetimepayment-usermanagement-o.svg" loading="lazy" alt="" className="active-icon" />
                  <div className="all-in-one-tab-text">Pre-built User Management Portal</div>
                  <img src="/images/once_onetimepayment-security2x.webp" loading="lazy" sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" srcSet="/images/once_onetimepayment-security2x-p-500.webp 500w, /images/once_onetimepayment-security2x-p-800.webp 800w, /images/once_onetimepayment-security2x-p-1080.webp 1080w, /images/once_onetimepayment-security2x.webp 1120w" alt="" className="mobile-tab-image" />
                </div>
                <div className="w-layout-blockcontainer all-in-one-tab w-container">
                  <img src="/images/once_onetimepayment-security.svg" loading="lazy" alt="" className="tab-img-default" />
                  <img src="/images/once_onetimepayment-security-o.svg" loading="lazy" alt="" className="active-icon" />
                  <div className="all-in-one-tab-text">Advanced Security Measures</div>
                  <img src="/images/once_onetimepayment-passkeys2x.webp" loading="lazy" sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" srcSet="/images/once_onetimepayment-passkeys2x-p-500.webp 500w, /images/once_onetimepayment-passkeys2x-p-800.webp 800w, /images/once_onetimepayment-passkeys2x-p-1080.webp 1080w, /images/once_onetimepayment-passkeys2x.webp 1120w" alt="" className="mobile-tab-image" />
                </div>
              </div>
              <div className="w-layout-blockcontainer all-in-one-img-container _1 active-tab-img w-container">
                <img src="/images/once_onetimepayment-sso2x.webp" loading="lazy" sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" srcSet="/images/once_onetimepayment-sso2x-p-500.webp 500w, /images/once_onetimepayment-sso2x-p-800.webp 800w, /images/once_onetimepayment-sso2x-p-1080.webp 1080w, /images/once_onetimepayment-sso2x.webp 1120w" alt="" className="all-in-one-img" />
              </div>
              <div className="w-layout-blockcontainer all-in-one-img-container _2 w-container">
                <img src="/images/once_onetimepayment-passkeys2x.webp" loading="lazy" sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" srcSet="/images/once_onetimepayment-passkeys2x-p-500.webp 500w, /images/once_onetimepayment-passkeys2x-p-800.webp 800w, /images/once_onetimepayment-passkeys2x-p-1080.webp 1080w, /images/once_onetimepayment-passkeys2x.webp 1120w" alt="" className="all-in-one-img" />
              </div>
              <div className="w-layout-blockcontainer all-in-one-img-container _3 w-container">
                <img src="/images/once_onetimepayment-2fa2x.webp" loading="lazy" sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" srcSet="/images/once_onetimepayment-2fa2x-p-500.webp 500w, /images/once_onetimepayment-2fa2x-p-800.webp 800w, /images/once_onetimepayment-2fa2x-p-1080.webp 1080w, /images/once_onetimepayment-2fa2x.webp 1120w" alt="" className="all-in-one-img" />
              </div>
              <div className="w-layout-blockcontainer all-in-one-img-container _4 w-container">
                <img src="/images/once_onetimepayment-usermanagement2x.webp" loading="lazy" sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" srcSet="/images/once_onetimepayment-usermanagement2x-p-500.webp 500w, /images/once_onetimepayment-usermanagement2x-p-800.webp 800w, /images/once_onetimepayment-usermanagement2x-p-1080.webp 1080w, /images/once_onetimepayment-usermanagement2x.webp 1120w" alt="" className="all-in-one-img" />
              </div>
              <div className="w-layout-blockcontainer all-in-one-img-container _5 w-container">
                <img src="/images/once_onetimepayment-security2x.webp" loading="lazy" sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" srcSet="/images/once_onetimepayment-security2x-p-500.webp 500w, /images/once_onetimepayment-security2x-p-800.webp 800w, /images/once_onetimepayment-security2x-p-1080.webp 1080w, /images/once_onetimepayment-security2x.webp 1120w" alt="" className="all-in-one-img" />
              </div>
            </div>
            <a href="#" className="button-primary home-hero new-home radius-16 once-special-button middle w-button">View Pricing</a>
          </div>
          <div className="container-default-inner once-container-bottom once-container-top once-flex-container">
            <div className="w-layout-hflex flex-block-45">
              <img src="/images/once_who-choose-once2x.webp" loading="lazy" sizes="(max-width: 1248px) 100vw, 1248px" srcSet="/images/once_who-choose-once2x-p-500.webp 500w, /images/once_who-choose-once2x-p-800.webp 800w, /images/once_who-choose-once2x-p-1080.webp 1080w, /images/once_who-choose-once2x.webp 1248w" alt="" />
              <div className="w-layout-vflex container-1451">
                <h2 className="once-h2 flex-h2">Who Choose<br /><span className="once-gradient">Authgear One</span></h2>
                <div className="w-layout-vflex container-1452">
                  <div className="w-layout-blockcontainer w-container">
                    <div className="who-choose-title">Freedom from Recurring Costs</div>
                    <div className="who-choose-des">Stop worrying about monthly SaaS fees or surprise bills. Authgear once provides a perpetual license, so you own the software forever.</div>
                  </div>
                  <div className="w-layout-blockcontainer w-container">
                    <div className="who-choose-title">Complete Ownership and Control</div>
                    <div className="who-choose-des">Self-host your IAM platform to ensure full control over your data, security policies, and user experiences.</div>
                  </div>
                  <div className="w-layout-blockcontainer w-container">
                    <div className="who-choose-title">Ready-to-Use, Yet Fully Customizable</div>
                    <div className="who-choose-des">Get started quickly with a pre-built user management portal and robust SDK integrations. Customize it as your project grows—no limits.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-default-inner once-container-bottom once-container-top once-container-60-gap">
            <h2 className="once-h2 left-h2">Built for Developers<br />and Small Teams</h2>
            <div className="w-layout-blockcontainer once-inner-container w-container">
              <div className="w-layout-grid grid-14">
                <div className="w-layout-blockcontainer small-teams-card w-container">
                  <img src="/images/once_build-for-developer-agency.svg" loading="lazy" alt="" className="image-75" />
                  <div className="w-layout-blockcontainer w-container">
                    <div className="who-choose-title small-team">Empowering Development Agencies</div>
                    <div className="who-choose-des">Take on client projects with confidence. Authgear once offers scalable IAM solutions without increasing costs as your user base grows.</div>
                  </div>
                </div>
                <div className="w-layout-blockcontainer small-teams-card w-container">
                  <img src="/images/once_build-for-developer-project.svg" loading="lazy" alt="" className="image-75" />
                  <div className="w-layout-blockcontainer w-container">
                    <div className="who-choose-title small-team">Perfect for Small Projects</div>
                    <div className="who-choose-des">From startups to side projects, streamline your authentication needs with a lightweight, cost-effective platform.</div>
                  </div>
                </div>
              </div>
              <div className="w-layout-hflex home-hero-cta-wrapper once-cta-wrapper in-small-teams">
                <a href="#" className="button-primary home-hero new-home radius-16 once-special-button w-button">Request a call back</a>
                <a href="#" className="link-block _5-min w-inline-block">
                  <img src="/images/Play---Iconly-Pro.svg" loading="lazy" alt="" />
                  <div className="text-block-52 _5-min-text">5-Minute Guide</div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="once-white">
          <div className="container-default once">
            <h2 className="once-h2 flex-h2 black">All the Features You Need,<br /><span className="once-gradien-2">All in One </span>Platform</h2>
            <p className="paragraph-10">Authgear once delivers a complete authentication solution:</p>
            <div className="w-layout-grid once-2-tab">
              <div className="w-layout-vflex flex-block-48">
                <div className="w-layout-hflex flex-block-49 active">
                  <img src="/images/once_all-in-one-passwordless-icon.svg" loading="lazy" alt="" className="inactive default" />
                  <img src="/images/once_all-in-one-passwordless-icon-o.svg" loading="lazy" alt="" className="active-img default" />
                  <div className="w-layout-hflex flex-block-50">
                    <div className="text-block-55 default">Login Your Way</div>
                    <div className="text-block-56 default">Support for passwords, passwordless login (Email/Phone OTP), social login, and 2FA.</div>
                  </div>
                  <img src="/images/once_all-in-one-passwordless2x.webp" loading="lazy" sizes="(max-width: 1248px) 100vw, 1248px" srcSet="/images/once_all-in-one-passwordless2x-p-500.webp 500w, /images/once_all-in-one-passwordless2x-p-800.webp 800w, /images/once_all-in-one-passwordless2x-p-1080.webp 1080w, /images/once_all-in-one-passwordless2x.webp 1248w" alt="" className="image-77 default" />
                </div>
                <div className="w-layout-hflex flex-block-49">
                  <img src="/images/once_all-in-one-integration-icon.svg" loading="lazy" alt="" className="inactive" />
                  <img src="/images/once_all-in-one-integration-icon-o.svg" loading="lazy" alt="" className="active-img" />
                  <div className="w-layout-hflex flex-block-50">
                    <div className="text-block-55">Seamless Integration</div>
                    <div className="text-block-56">SSO with OIDC and SAML, plus cross-platform SDKs for easy implementation.</div>
                  </div>
                  <img src="/images/once_all-in-one-integration2x.webp" loading="lazy" sizes="(max-width: 1248px) 100vw, 1248px" srcSet="/images/once_all-in-one-integration2x-p-500.webp 500w, /images/once_all-in-one-integration2x-p-800.webp 800w, /images/once_all-in-one-integration2x.webp 1248w" alt="" className="image-77" />
                </div>
                <div className="w-layout-hflex flex-block-49">
                  <img src="/images/once_all-in-one-security-icon.svg" loading="lazy" alt="" className="inactive" />
                  <img src="/images/once_all-in-one-security-icon-o.svg" loading="lazy" alt="" className="active-img" />
                  <div className="w-layout-hflex flex-block-50">
                    <div className="text-block-55">Advanced Security</div>
                    <div className="text-block-56">Role-Based Access Control (RBAC) and bot protection keep your platform secure.</div>
                  </div>
                  <img src="/images/once_all-in-one-security2x.webp" loading="lazy" sizes="(max-width: 1248px) 100vw, 1248px" srcSet="/images/once_all-in-one-security2x-p-500.webp 500w, /images/once_all-in-one-security2x-p-800.webp 800w, /images/once_all-in-one-security2x.webp 1248w" alt="" className="image-77" />
                </div>
                <div className="w-layout-hflex flex-block-49">
                  <img src="/images/once_all-in-one-usermanagement-icon.svg" loading="lazy" alt="" className="inactive" />
                  <img src="/images/once_all-in-one-usermanagement-icon-o.svg" loading="lazy" alt="" className="active-img" />
                  <div className="w-layout-hflex flex-block-50">
                    <div className="text-block-55">User Management Made Easy</div>
                    <div className="text-block-56">A pre-built user management portal and account settings page simplify admin and user interactions.</div>
                  </div>
                  <img src="/images/once_all-in-one-usermanagement2x.webp" loading="lazy" sizes="(max-width: 1248px) 100vw, 1248px" srcSet="/images/once_all-in-one-usermanagement2x-p-500.webp 500w, /images/once_all-in-one-usermanagement2x-p-800.webp 800w, /images/once_all-in-one-usermanagement2x-p-1080.webp 1080w, /images/once_all-in-one-usermanagement2x.webp 1248w" alt="" className="image-77" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer dark">
        <div className="container-default w-container">
          <div className="footer-wrapper">
            <div className="footer-top-content workshop">
              <div>
                <a href="#" className="footer-image w-inline-block"><img src="/images/authgear-logo-white.svg" loading="lazy" alt="" /></a>
                <div className="footer__dark-authgear-desc">Authgear powered by <a href="https://skymakers.digital/" className="footer__dark-authgear-desc">SkyMakers Digital Group</a></div>
                <div className="w-layout-grid footer-social-media-grid workshop">
                  <a href="https://www.linkedin.com/company/authgear" target="_blank" rel="noreferrer" className="footer-social-media-link icon-small gray-bg w-inline-block">
                    <div></div>
                  </a>
                  <a href="https://discord.gg/Kdn5vcYwAS" target="_blank" rel="noreferrer" className="footer-social-media-link icon-small gray-bg w-inline-block"><img width="19" loading="lazy" alt="" src="/images/authgear_footer_social_discord.svg" className="footer-social-media-icon" /></a>
                  <a href="https://github.com/authgear" target="_blank" rel="noreferrer" className="footer-social-media-link icon-small gray-bg w-inline-block"><img loading="lazy" src="/images/authgear_footer_social_github.svg" alt="" className="footer-social-media-icon" /></a>
                </div>
                <div className="footer-certificate">
                  <img width="144.5" loading="lazy" alt="" src="/images/Authgear_footer_certificated_blue2x.png" className="certificate-img" />
                </div>
              </div>
              <div className="footer-menu-navigation-wrapper workshop">
                <div className="footer-menu-links-wrapper workshop">
                  <ul role="list" className="footer-menu-list w-list-unstyled">
                    <li className="footer-menu-list-item">
                      <h6 className="footer-menu-title">Products</h6>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/once" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Authgear ONCE</div>
                      </Link>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Authgear CLOUD</div>
                      </Link>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/pricing" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Pricing</div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
