import Link from 'next/link';

interface Props {
  locale: string;
}

export default async function PromotionPage(_props: Props) {
  return (
    <div className="page-wrapper">
      <section className="hero money2020">
        <div className="w-layout-hflex flex-block-19">
          <div className="w-layout-vflex flex-block-18">
            <h4 className="heading-18">Thanks for visiting Authgear<span id="event-name-1" className="text-span-15"> at Money 20/20!</span></h4>
            <h1 className="heading-17 color-white event"><strong className="color-white">Stop Security Headaches, Streamline Logins with Authgear!</strong></h1>
            <div className="text-block-22"><strong className="color-white">Tired of wrestling with complex authentication systems?</strong> You're not alone. Developers spend countless hours coding secure logins, leaving less time for features that truly engage users.</div>
          </div>
        </div>
      </section>
      <section className="section-8">
        <div className="w-layout-hflex flex-block-20">
          <img src="/images/generalcampaigns_title-icon.svg" loading="lazy" alt="" className="image-54" />
          <h1 className="heading-19">Authgear is here to <strong>change the game</strong></h1>
        </div>
        <div className="w-layout-hflex _3-card-grid">
          <div className="card-block">
            <div className="w-layout-vflex card-block-inside">
              <img src="/images/generalcampaigns_card-01.svg" loading="lazy" alt="" className="card-block-image" />
              <div className="w-layout-vflex card-block-content">
                <div className="card-block-title"><strong className="bold-text-6">No-Code Approach</strong></div>
                <div className="card-block-desc">A user-friendly interface empowers you to implement secure authentication features without writing a single line of code.</div>
              </div>
            </div>
          </div>
          <div className="card-block">
            <div className="w-layout-vflex card-block-inside">
              <img src="/images/generalcampaigns_card-02.svg" loading="lazy" alt="" className="card-block-image" />
              <div className="w-layout-vflex card-block-content">
                <div className="card-block-title"><strong>Best Practices Enforced</strong></div>
                <div className="card-block-desc">Enjoy peace of mind knowing industry best practices are built-in, safeguarding your users from common security threats.</div>
              </div>
            </div>
          </div>
          <div className="card-block">
            <div className="w-layout-vflex card-block-inside">
              <img src="/images/generalcampaigns_card-03.svg" loading="lazy" alt="" className="card-block-image" />
              <div className="w-layout-vflex card-block-content">
                <div className="card-block-title"><strong>Extensible and Flexible</strong></div>
                <div className="card-block-desc">Customize the solution to fit your specific needs and integrate seamlessly with your existing infrastructure.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-9">
        <div className="w-layout-hflex flex-block-21">
          <img src="/images/generalcampaigns_title-icon.svg" loading="lazy" alt="" className="image-57" />
          <h1 className="heading-20">Ready to experience the <strong>Authgear difference?</strong></h1>
        </div>
        <div className="w-layout-hflex _2-block-flex-2">
          <div className="w-layout-vflex _2-block_flex-left">
            <div className="text-block-26">1-Month FREE Trial</div>
            <div className="text-block-25">Secure your exclusive trial offer with an annual contract.</div>
            <div className="w-layout-vflex flex-block-22 left">
              <div className="text-block-23"><strong>Limited spots available:</strong></div>
              <div className="text-block-24">Don't miss out on this opportunity to <br />experience Authgear.</div>
            </div>
          </div>
          <div className="w-layout-vflex _2-block_flex-right">
            <img src="/images/generalcampaigns_card-free.svg" loading="lazy" width="Auto" alt="" className="free-trial-image" />
          </div>
          <div className="w-layout-vflex flex-block-22 bottom">
            <div className="text-block-23"><strong>Limited spots available:</strong></div>
            <div className="text-block-24">Don't miss out on this opportunity to<br />experience Authgear.</div>
          </div>
        </div>
      </section>
      <section className="section-10 form">
        <div className="w-layout-hflex _2-block-flex-2">
          <div className="w-layout-vflex _2-block_flex-left form">
            <img src="/images/logo_white2x.png" loading="lazy" width="196" height="Auto" alt="" />
            <div className="w-layout-vflex flex-block-23">
              <div className="text-block-27">Special<span id="event-name-3" className="text-span-19"> Money 20/20</span> Offer</div>
              <div className="text-block-28">Claim Your<br />1-month Free Now.</div>
            </div>
          </div>
          <div className="w-layout-vflex _2-block_flex-right form">
            <div id="contact-us-form-container" className="form-block-2 w-form">
              <form id="wf-form-Promotion" name="wf-form-Promotion" data-name="Promotion" method="get" className="contactform">
                <label htmlFor="Name" className="get-demo-form-label">Full Name<span className="get-demo-form-label-required">*</span></label>
                <input className="get-demo-form-field w-input" maxLength={256} name="Name" data-name="Name" placeholder="" type="text" id="Name" required />
                <label htmlFor="Email" className="get-demo-form-label">Work email<span className="get-demo-form-label-required">*</span></label>
                <input className="get-demo-form-field w-input" maxLength={256} name="Email" data-name="Email" placeholder="" type="email" id="Email" required />
                <div className="margin-vertical margin-small">
                  <label htmlFor="Phone" className="get-demo-form-label">Phone Number<span className="text-span-18">*</span></label>
                  <input className="get-demo-form-field w-input" maxLength={256} name="Phone" data-name="Phone" placeholder="" type="tel" id="Phone" required />
                  <input className="text-field w-input" maxLength={256} name="Country" data-name="Country" placeholder="" type="text" id="Country" required />
                  <div className="html-embed w-embed">
                    <span id="valid-msg" className="hide">Valid number</span>
                    <span id="error-msg" className="hide"></span>
                  </div>
                </div>
                <label htmlFor="Company" className="get-demo-form-label">Company name<span className="get-demo-form-label-required">*</span></label>
                <input className="get-demo-form-field w-input" maxLength={256} name="Company" data-name="Company" placeholder="" type="text" id="Company" required />
                <label htmlFor="Note" className="get-demo-form-label">Anything you'd like us to know?<span className="get-demo-form-label-required">*</span></label>
                <input className="get-demo-form-field w-input" maxLength={256} name="Note" data-name="Note" placeholder="Use Case / Document Type / Notes" type="text" id="Note" required />
                <input type="submit" data-wait="Please wait..." className="get-demo-form-submit money2020 w-button" value="Submit" />
              </form>
              <div className="w-form-done">
                <div>Thank you! We will contact you asap!</div>
              </div>
              <div className="w-form-fail">
                <div>Oops! Something went wrong, please contact us at <a href="mailto:hello@formx.ai">hello@formx.ai </a>if the problem persists.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="container-default w-container">
          <div className="footer-wrapper">
            <div className="footer-top-content">
              <div className="footer-menu-navigation-wrapper">
                <div className="footer-menu-links-wrapper">
                  <ul role="list" className="footer-menu-list w-list-unstyled">
                    <li className="footer-menu-list-item">
                      <h6 className="footer-menu-title">Get Started</h6>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/schedule-demo" className="footer-menu-link w-inline-block">
                        <div>Contact Sales</div>
                      </Link>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/pricing" className="footer-menu-link w-inline-block">
                        <div>Pricing</div>
                      </Link>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/migrate-to-authgear" className="footer-menu-link w-inline-block">
                        <div>Migrate to Authgear</div>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="footer-menu-links-wrapper">
                  <ul role="list" className="footer-menu-list w-list-unstyled">
                    <li className="footer-menu-list-item">
                      <h6 className="footer-menu-title">developers</h6>
                    </li>
                    <li className="footer-menu-list-item">
                      <a href="https://docs.authgear.com" target="_blank" rel="noreferrer" className="footer-menu-link w-inline-block">
                        <div>Documentations</div>
                      </a>
                    </li>
                    <li className="footer-menu-list-item">
                      <a href="https://docs.authgear.com/reference/apis/oauth-2.0-and-openid-connect-oidc/userinfo" target="_blank" rel="noreferrer" className="footer-menu-link w-inline-block">
                        <div>APIs</div>
                      </a>
                    </li>
                    <li className="footer-menu-list-item">
                      <a href="https://github.com/authgear" className="footer-menu-link w-inline-block">
                        <div>Github</div>
                      </a>
                    </li>
                    <li className="footer-menu-list-item">
                      <a href="https://github.com/authgear/authgear-server/discussions" target="_blank" rel="noreferrer" className="footer-menu-link w-inline-block">
                        <div>Community</div>
                      </a>
                    </li>
                    <li className="footer-menu-list-item">
                      <a href="https://discord.gg/Kdn5vcYwAS" target="_blank" rel="noreferrer" className="footer-menu-link w-inline-block">
                        <div>Discord</div>
                      </a>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/integrations" className="footer-menu-link w-inline-block">
                        <div>Integrations</div>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="footer-menu-links-wrapper">
                  <ul role="list" className="footer-menu-list w-list-unstyled">
                    <li className="footer-menu-list-item">
                      <h6 className="footer-menu-title">resources</h6>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/blog" className="footer-menu-link w-inline-block">
                        <div>Blog</div>
                      </Link>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/security" className="footer-menu-link w-inline-block">
                        <div>Security</div>
                      </Link>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/terms" className="footer-menu-link w-inline-block">
                        <div>Terms</div>
                      </Link>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/policy" className="footer-menu-link w-inline-block">
                        <div>Acceptable Use Policy</div>
                      </Link>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/data-privacy" className="footer-menu-link w-inline-block">
                        <div>Privacy Policy</div>
                      </Link>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/terms-of-enterprise-license" className="footer-menu-link w-inline-block">
                        <div>Enterprise Licenses</div>
                      </Link>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/sla" className="footer-menu-link w-inline-block">
                        <div>SLA</div>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="footer-menu-links-wrapper">
                  <ul role="list" className="footer-menu-list w-list-unstyled">
                    <li className="footer-menu-list-item">
                      <h6 className="footer-menu-title">company</h6>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/about" className="footer-menu-link w-inline-block">
                        <div>About</div>
                      </Link>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/promises" className="footer-menu-link w-inline-block">
                        <div>Our Promises</div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="footer-main-content">
              <div className="w-layout-grid footer-social-media-grid">
                <a href="https://www.linkedin.com/company/skymakers-digital" target="_blank" rel="noreferrer" className="footer-social-media-link icon-small w-inline-block">
                  <div></div>
                </a>
                <a href="https://discord.gg/Kdn5vcYwAS" target="_blank" rel="noreferrer" className="footer-social-media-link icon-small w-inline-block">
                  <img src="/images/636e0a6cc3c481a15a141738_icon_clyde_white_RGB.png" loading="lazy" width="19" alt="" className="footer-social-media-icon" />
                </a>
                <a href="https://github.com/authgear" target="_blank" rel="noreferrer" className="footer-social-media-link icon-small w-inline-block">
                  <img src="/images/github-mark-12.svg" loading="lazy" alt="" className="footer-social-media-icon" />
                </a>
              </div>
            </div>
            <div className="footer-small-print-wrapper">
              <div className="footer-smallprint text-block">2024 © <a href="https://skymakers.digital/">SkyMakers Digital Limited</a>. All Rights Reserved.</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
