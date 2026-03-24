import Link from 'next/link';

interface Props {
  locale: string;
}

export default async function OnceCampaignPage(_props: Props) {
  return (
    <div className="page-wrapper">
      <div className="page-wrapper once-banner">
        <div className="section home-hero dark once-banner">
          <div className="container-1457">
            <div className="home-hero-wrapper once">
              <div className="container-medium-908px home-hero">
                <div className="w-layout-blockcontainer once-h1-container w-container">
                  <h1 className="color-white once-h1">Authgear</h1>
                  <img loading="lazy" src="/images/Authgear_once_title.svg" alt="" className="once-img-2" />
                </div>
                <div className="w-layout-blockcontainer once-subititle-2 w-container">
                  <p className="strong color-white _28size once-mobile">Take Back Control of Your IAM</p>
                  <p className="paragraph-large home-hero text-afb7ff ibm-plex-sans new-kv-desc once-mobile">Ditch subscriptions. Own your identity and access management platform with Authgear ONCE—built for developers, designed for freedom.</p>
                </div>
                <div className="w-layout-hflex home-hero-cta-wrapper once-cta-wrapper">
                  <a href="#join-wait-list" className="button-primary-2 home-hero new-home radius-16 once-special-button w-button">Get Early Access — Join the Waitlist.</a>
                </div>
              </div>
              <div className="home-hero-img-wrapper">
                <img loading="lazy" src="/images/kv_ui_code.svg" alt="" className="image-9" />
              </div>
            </div>
          </div>
          <div className="container-default-inner-2">
            <div className="once-flex">
              <h2 className="color-white ibm-plex-sans once-h2 text-center">Why Developers Love<br /><span className="once-gradient"><strong className="bold-text-10">Authgear</strong> once</span></h2>
              <div className="w-layout-blockcontainer once-cards-div w-container">
                <div className="once-why-card">
                  <img loading="lazy" src="/images/why_once-price.svg" alt="" />
                  <h3 className="once-card-heading color-white">One Price, Forever Yours</h3>
                  <p className="once-card-text">A perpetual license that eliminates recurring costs.</p>
                </div>
                <div className="once-why-card">
                  <img loading="lazy" src="/images/why_once-builder.svg" alt="" />
                  <h3 className="once-card-heading color-white">Made for Builders</h3>
                  <p className="once-card-text">Developer-friendly APIs and SDKs for seamless integration.</p>
                </div>
                <div className="once-why-card">
                  <img loading="lazy" src="/images/why_once-yourdata.svg" alt="" />
                  <h3 className="once-card-heading color-white">Your Data, Your Rules</h3>
                  <p className="once-card-text">Self-hosted deployment for ultimate security and control.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="container-default">
            <div className="container-default-inner-2">
              <h2 className="ibm-plex-sans once-h2 gray once-mobile">Everything You Need,  <br />Nothing You Don't<br /></h2>
              <div className="home-feature-cards-v2_wrap">
                <div className="once-card once--1-card">
                  <img width="235" sizes="235px" alt="" src="/images/everything_login2x.png" loading="lazy" srcSet="/images/everything_login2x-p-500.png 500w, /images/everything_login2x-p-800.png 800w, /images/everything_login2x.png 992w" className="once-card-image card-square-img" />
                  <div className="once-card-content"><span className="once-card-title-2">Versatile Login Options.</span> Passwords, passwordless, social login, and 2FA—cover all user preferences.</div>
                </div>
                <div className="once-card once--2-card">
                  <img width="235" loading="lazy" alt="" src="/images/everything_enterprise2x.svg" className="once-card-image" />
                  <div className="once-card-content"><span className="once-card-title-2">Enterprise-Grade SSO.</span> Compatible with OIDC and SAML standards.</div>
                </div>
                <div className="once-card once--3-card">
                  <img width="235" loading="lazy" alt="" src="/images/everything_tools2x.svg" className="once-card-image middle-card" />
                  <div className="once-card-content"><span className="once-card-title-2">Time-Saving Tools.</span> Pre-built user management and account settings out of the box.</div>
                </div>
                <div className="once-card once--4-card">
                  <img width="357" height="323" alt="" src="/images/everything_security2x.png" loading="lazy" srcSet="/images/everything_security2x-p-500.png 500w, /images/everything_security2x.png 714w" sizes="(max-width: 479px) 100vw, 357px" className="once-card-image card-square-img" />
                  <div className="once-card-content"><span className="once-card-title-2">Fortified Security.</span> Includes RBAC and bot protection to keep your app secure.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="once-iam">
          <div id="join-wait-list" className="container-default">
            <div className="container-default-inner-2 once-footer">
              <div className="once-iam-flex">
                <h2 className="color-white ibm-plex-sans once-h2">Be Part of the<br /><span className="once-gradient"><strong className="bold-text-11">IAM Revolution</strong></span></h2>
                <p className="paragraph-large home-hero text-afb7ff ibm-plex-sans new-kv-desc max624">We're changing how developers approach IAM—no subscriptions, no limits, no hassle. Sign up for the waitlist to secure your spot and be among the first to unlock the power of Authgear once.</p>
              </div>
              <div className="w-layout-blockcontainer once-footer-container w-container">
                <div className="form-block-3 w-form">
                  <form id="wf-form-Once-Campaign" name="wf-form-Once-Campaign" data-name="Once Campaign" method="post" className="contact-form">
                    <div className="margin-vertical margin-small">
                      <label htmlFor="Name" className="getdemo-label-2">Full Name<span className="text-span-40">*</span></label>
                      <input className="getdemo-field-2 w-input" maxLength={256} name="Name" data-name="Name" placeholder="" type="text" id="Name" required />
                    </div>
                    <div className="margin-vertical margin-small">
                      <label htmlFor="Email" className="getdemo-label-2">Work Email<span className="text-span-39">*</span></label>
                      <input className="getdemo-field-2 w-input" maxLength={256} name="Email" data-name="Email" placeholder="" type="email" id="Email" required />
                    </div>
                    <div className="margin-vertical margin-small">
                      <label htmlFor="Company" className="getdemo-label-2">Company Name<span className="text-span-41">*</span></label>
                      <input className="getdemo-field-2 w-input" maxLength={256} name="Company" data-name="Company" placeholder="" type="text" id="Company" required />
                    </div>
                    <div className="margin-vertical margin-medium">
                      <input type="submit" data-wait="Please wait..." className="getdemo-submit-2 plausible-event-name--contact-form-submit w-button" value="Submit" />
                    </div>
                  </form>
                  <div className="success-message-2 w-form-done">
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
      <footer className="footer dark">
        <div className="workshop-footer-separator"></div>
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
