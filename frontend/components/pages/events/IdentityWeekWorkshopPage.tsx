import Link from 'next/link';

interface Props {
  locale: string;
}

export default async function IdentityWeekWorkshopPage(_props: Props) {
  return (
    <div className="page-wrapper">
      <div className="section home-hero bg-workshop-blue">
        <div className="container-1440">
          <div className="home-hero-wrapper center column gap-60">
            <div className="flex column center gap-32">
              <div className="hero_workshop_content-wrap">
                <img src="/images/workshop_24OCT_SG_logo2x.png" loading="lazy" width="600" height="Auto" alt="" srcSet="/images/workshop_24OCT_SG_logo2x-p-500.png 500w, /images/workshop_24OCT_SG_logo2x-p-800.png 800w, /images/workshop_24OCT_SG_logo2x-p-1080.png 1080w, /images/workshop_24OCT_SG_logo2x-p-1600.png 1600w, /images/workshop_24OCT_SG_logo2x.png 1672w" sizes="(max-width: 479px) 93vw, (max-width: 767px) 90vw, 600px" />
                <h1 className="workshop_hero_h1 mb-0">Master Single Sign-On<br />with OIDC with <span className="text-span-21">Authgear</span></h1>
                <div className="workshop_hero_description">Simplify Authentication, Enhance Security,<br />and Boost User Experience</div>
                <a href="#workshop-form" className="workshop_cta w-button">Get Tickets Now</a>
              </div>
            </div>
            <div className="flex center gap-32 workflow-lower">
              <div className="flex gap-16 color-white grow">
                <div className="hero_workshop_bottom-icon"><img src="/images/24OCTSG_icon_calendar.svg" loading="lazy" alt="" /></div>
                <div>
                  <div className="workshop_hero_date workshop-info">October 24, 2024</div>
                  <div className="workshop_hero_time">1:00 PM - 6:00 PM</div>
                </div>
              </div>
              <div className="flex gap-16 color-white grow mw--422px">
                <div className="hero_workshop_bottom-icon"><img src="/images/24OCTSG_icon_location.svg" loading="lazy" width="Auto" alt="" /></div>
                <div>
                  <div className="workshop_hero_location workshop-info">JustCo UIC Building Coworking Space, SINGAPORE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black relative">
        <div className="container-default content-center py-80 gap-60 z-index-1">
          <div className="_2-block-flex">
            <div className="_2-block_flex-left">
              <div><img src="/images/workshop_24OCT_SG_hero_kv_2x.webp" loading="lazy" width="733" sizes="(max-width: 479px) 92vw, (max-width: 767px) 94vw, (max-width: 991px) 44vw, (max-width: 1279px) 56vw, 713.84375px" alt="" srcSet="/images/workshop_24OCT_SG_hero_kv_2x-p-500.webp 500w, /images/workshop_24OCT_SG_hero_kv_2x-p-800.webp 800w, /images/workshop_24OCT_SG_hero_kv_2x-p-1080.webp 1080w, /images/workshop_24OCT_SG_hero_kv_2x.webp 1466w" className="image-59" /></div>
            </div>
            <div className="_2-block_flex-right flex gap-24 flex-column">
              <div className="flex gap-24 mobile-column">
                <div className="workshop-h2-icon"><img src="/images/Union.svg" loading="lazy" alt="" /></div>
                <h2 className="workshop_h2">ABOUT THE<br /><span className="workshop_h2-main">WORKSHOP</span></h2>
              </div>
              <div className="text-block-34">Join us for a FREE, intensive, hands-on workshop where you'll learn to implement SSO best practices with Authgear. This session is perfect for developers, IT managers, and security professionals looking to streamline their authentication processes.</div>
            </div>
          </div>
          <div className="card-full workshop">
            <div className="_2-block-flex">
              <div className="_2-block_flex-left">
                <h2 className="workshop_h2 card-h2">What You'll <br />Learn</h2>
              </div>
              <div className="_2-block_flex-right">
                <ul role="list" className="color-white flex column gap-24 list-style-none pl-0">
                  <li className="_2-block-flex-content-list-item mb-0 authgear-workshop">Understanding SSO and OIDC fundamentals</li>
                  <li className="_2-block-flex-content-list-item mb-0 authgear-workshop">Implementing SSO with Authgear</li>
                  <li className="_2-block-flex-content-list-item mb-0 authgear-workshop">Best practices for secure authentication</li>
                  <li className="_2-block-flex-content-list-item mb-0 authgear-workshop">Troubleshooting common SSO issues</li>
                  <li className="_2-block-flex-content-list-item mb-0 authgear-workshop">Optimizing user experience with SSO</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="workshop-floating-text">Workshop</div>
      </div>
      <div className="bg-black relative">
        <div className="container-default content-center py-80 gap-60 z-index-1">
          <div className="_2-block-flex left gap-140 m-gap-40 m-left">
            <div className="_2-block_flex-left align-top">
              <div className="flex gap-24 mobile-column">
                <div className="workshop-h2-icon"><img src="/images/Union.svg" loading="lazy" alt="" /></div>
                <h2 className="workshop_h2">Workshop<br /><span className="workshop_h2-main">Agenda</span></h2>
              </div>
            </div>
            <div className="_2-block_flex-right flex gap-24 flex-column">
              <div className="w-layout-grid workshop-agenda">
                <div className="workshop-agenda-time">1:00 PM - 1:30 PM</div>
                <div className="workshop-agenda-event">Introduction to SSO and OIDC</div>
                <div className="workshop-agenda-time">1:30 PM - 2:00 PM</div>
                <div className="workshop-agenda-event">What is Authgear?</div>
                <div className="workshop-agenda-time">2:00 PM - 2:15 PM</div>
                <div className="workshop-agenda-event">Break</div>
                <div className="workshop-agenda-time">2:15 PM - 4:15 PM</div>
                <div className="workshop-agenda-event">Authgear Hands-on Workshop</div>
                <div className="workshop-agenda-time">4:15 PM - 5:00 PM</div>
                <div className="workshop-agenda-event">Authentication Challenge</div>
                <div className="workshop-agenda-time">5:00 PM - 5:30 PM</div>
                <div className="workshop-agenda-event">Q&amp;A and Networking</div>
              </div>
            </div>
          </div>
        </div>
        <div className="workshop-floating-text top-right">Agenda</div>
      </div>
      <div className="bg-black relative">
        <div className="container-default content-center py-80 gap-60 z-index-1">
          <div className="flex gap-24 mobile-column">
            <div className="workshop-h2-icon"><img src="/images/Union.svg" loading="lazy" alt="" /></div>
            <h2 className="workshop_h2">Why<br /><span className="workshop_h2-main">Attend?</span></h2>
          </div>
          <div className="_5-card-grid">
            <div className="workshop_why-attend_card-pink">
              <div className="workshop_why-attend_card-content">
                <div><img src="/images/pencil-1.svg" loading="lazy" alt="" /></div>
                <div>Gain practical, immediately applicable skills</div>
              </div>
            </div>
            <div className="workshop_why-attend_card-blue">
              <div className="workshop_why-attend_card-content">
                <div><img src="/images/time-1.svg" loading="lazy" alt="" /></div>
                <div>Reduce development time and costs</div>
              </div>
            </div>
            <div className="workshop_why-attend_card-pink">
              <div className="workshop_why-attend_card-content">
                <div><img src="/images/network-1.svg" loading="lazy" alt="" /></div>
                <div>Enhance your application's security</div>
              </div>
            </div>
            <div className="workshop_why-attend_card-blue">
              <div className="workshop_why-attend_card-content">
                <div><img src="/images/around-the-world-1.svg" loading="lazy" alt="" /></div>
                <div>Network with industry peers in Singapore</div>
              </div>
            </div>
            <div className="workshop_why-attend_card-pink">
              <div className="workshop_why-attend_card-content">
                <div><img src="/images/ask-the-expert-1.svg" loading="lazy" alt="" /></div>
                <div>Get expert answers to your SSO questions</div>
              </div>
            </div>
          </div>
          <div className="workshop_why-attend_bottom">
            <div className="_2-block-flex space-between gap-24-m">
              <h2 className="weight-600 color-adadad capitalize nowrap align-top">What to bring</h2>
              <div className="flex column gap-24 color-white">
                <div className="weight-600">Personal Laptop with your preferred IDE and Web Browser. <br /><span className="workshop_subtext-note">*We recommend using VSCode and Chrome for this workshop</span></div>
                <div className="text-block-35">That's it! We will be providing meals and refreshments for all participants throughout the workshop.</div>
              </div>
            </div>
          </div>
        </div>
        <div className="workshop-floating-text top-left">Attend</div>
      </div>
      <div className="bg-black relative">
        <div className="container-default content-center py-80 gap-60 z-index-1">
          <div className="_2-block-flex">
            <div className="_2-block_flex-right flex gap-24 flex-column">
              <div className="flex gap-24 mobile-column">
                <div className="workshop-h2-icon"><img src="/images/Union.svg" loading="lazy" alt="" /></div>
                <h2 className="workshop_h2">ABOUT THE<br /><span className="workshop_h2-main">SPEAKER</span></h2>
              </div>
              <div className="text-block-33">Fung spearheads the vision and roadmap for cutting-edge identity solutions at Authgear. Leveraging his expertise in web security and user research, he has successfully led authentication transformations for multinational corporations. <br /><br />Based in London, Fung is passionate about creating seamless and secure digital experiences that put users first.</div>
              <a href="#workshop-form" className="workshop_cta left w-button">Get Tickets Now</a>
            </div>
            <div className="_2-block_flex-left">
              <div className="workshop-speaker-photo">
                <img src="/images/24OCTSG_speaker_hero2x.webp" loading="lazy" sizes="(max-width: 479px) 92vw, (max-width: 767px) 94vw, 100vw" srcSet="/images/24OCTSG_speaker_hero2x-p-500.webp 500w, /images/24OCTSG_speaker_hero2x-p-800.webp 800w, /images/24OCTSG_speaker_hero2x-p-1080.webp 1080w, /images/24OCTSG_speaker_hero2x.webp 1280w" alt="" className="image-58" />
                <div className="div-block-6">
                  <div className="workshop_speaker-text">Fung Cheng<br /><span className="text-span-22">Product Manager</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="workshop-floating-text bottom-left">Speaker</div>
      </div>
      <div className="bg-black">
        <div className="container-default content-center py-80 gap-60">
          <div className="_2-block-flex space-between gap-24-m m-column">
            <div className="_2-block_flex-left align-top">
              <div className="flex gap-24 mobile-column">
                <div className="workshop-h2-icon"><img src="/images/Union.svg" loading="lazy" alt="" /></div>
                <h2 className="workshop_h2">FAQ<br /><span className="workshop_h2-main">Frequently<br />Asked<br />Questions</span></h2>
              </div>
            </div>
            <div className="_2-block_flex-right flex gap-24 flex-column">
              <div className="w-layout-grid workshop-faq">
                <div className="faq2_component-2">
                  <div className="faq2_accordion-2">
                    <div className="faq2_question-2 first">
                      <div className="faq-accordion-question referral-faq-q">How much is the ticket to attend this workshop?</div>
                      <img loading="lazy" src="/images/Workshop_FAQ-Arrow.svg" alt="" className="faq2_icon-2" />
                    </div>
                    <div style={{height: '0px'}} className="faq2_answer">
                      <div className="margin-bottom">
                        <div className="max-width-large">
                          <p className="referral-faq-a-2">This workshop is totally free! We believe in making quality education on SSO and OIDC accessible to all developers and IT professionals. While there's no fee to attend, registration is required as spots are limited. We encourage you to register early to secure your place.<br /><br />Please note that by offering this workshop for free, we aim to showcase the value of our product and foster a community of skilled developers familiar with our SSO solution.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="faq2_accordion-2">
                    <div className="faq2_question-2">
                      <div className="faq-accordion-question referral-faq-q">Who should attend this workshop?</div>
                      <img loading="lazy" src="/images/Workshop_FAQ-Arrow.svg" alt="" className="faq2_icon-2" />
                    </div>
                    <div style={{height: '0px'}} className="faq2_answer">
                      <div className="margin-bottom">
                        <div className="max-width-large">
                          <p className="referral-faq-a-2">This workshop is ideal for developers, IT managers, system administrators, and security professionals who want to implement or improve SSO in their applications.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="faq2_accordion-2">
                    <div className="faq2_question-2">
                      <div className="faq-accordion-question referral-faq-q">What level of technical knowledge is required?</div>
                      <img loading="lazy" src="/images/Workshop_FAQ-Arrow.svg" alt="" className="faq2_icon-2" />
                    </div>
                    <div style={{height: '0px'}} className="faq2_answer">
                      <div className="margin-bottom">
                        <div className="max-width-large">
                          <p className="referral-faq-a-2">Participants should have a basic understanding of authentication concepts and some experience with web development. Familiarity with OAuth 2.0 is helpful but not required.<br /><br />To ensure everyone gets the best experience out of this workshop, we'll be conducting a brief screening process to match attendees with the workshop content.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="faq2_accordion-2">
                    <div className="faq2_question-2">
                      <div className="faq-accordion-question referral-faq-q">Do I need to bring my own laptop?</div>
                      <img loading="lazy" src="/images/Workshop_FAQ-Arrow.svg" alt="" className="faq2_icon-2" />
                    </div>
                    <div style={{height: '0px'}} className="faq2_answer">
                      <div className="margin-bottom">
                        <div className="max-width-large">
                          <p className="referral-faq-a-2">Yes, please bring a laptop with your preferred development environment set up. We'll provide detailed setup instructions before the workshop.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="faq2_accordion-2">
                    <div className="faq2_question-2">
                      <div className="faq-accordion-question referral-faq-q">Will I receive a certificate of completion?</div>
                      <img loading="lazy" src="/images/Workshop_FAQ-Arrow.svg" alt="" className="faq2_icon-2" />
                    </div>
                    <div style={{height: '0px'}} className="faq2_answer">
                      <div className="margin-bottom">
                        <div className="max-width-large">
                          <p className="referral-faq-a-2">Absolutely! A significant portion of the workshop is dedicated to hands-on exercises where you'll implement SSO using our product.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="faq2_accordion-2">
                    <div className="faq2_question-2">
                      <div className="faq-accordion-question referral-faq-q">What if I can't attend in person? Do you offer a virtual option?</div>
                      <img loading="lazy" src="/images/Workshop_FAQ-Arrow.svg" alt="" className="faq2_icon-2" />
                    </div>
                    <div style={{height: '0px'}} className="faq2_answer">
                      <div className="margin-bottom">
                        <div className="max-width-large">
                          <p className="referral-faq-a-2">This workshop is designed to be an in-person, interactive experience. However, we occasionally offer online seminars about authentication.<br /><br />If you're interested, please contact us for information on upcoming online seminars or join our community <a href="https://docs.google.com/document/d/1U4V2p7QQxfuFs4DOR0xpvH4k54X7W9Q81nIRMmgDaSg/edit#" className="link-2"><span>Discord</span></a> for the latest information.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="faq2_accordion-2">
                    <div className="faq2_question-2">
                      <div className="faq-accordion-question referral-faq-q">Is the workshop material available after the session?</div>
                      <img loading="lazy" src="/images/Workshop_FAQ-Arrow.svg" alt="" className="faq2_icon-2" />
                    </div>
                    <div style={{height: '0px'}} className="faq2_answer">
                      <div className="margin-bottom">
                        <div className="max-width-large">
                          <p className="referral-faq-a-2">Yes, all attendees will receive access to the workshop materials, including slides and code samples, after the event.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="faq2_accordion-2">
                    <div className="faq2_question-2">
                      <div className="faq-accordion-question referral-faq-q">Will there be opportunities for networking?</div>
                      <img loading="lazy" src="/images/Workshop_FAQ-Arrow.svg" alt="" className="faq2_icon-2" />
                    </div>
                    <div style={{height: '0px'}} className="faq2_answer">
                      <div className="margin-bottom">
                        <div className="max-width-large">
                          <p className="referral-faq-a-2">Yes, we've built in time for networking during breaks and at the end of the workshop. It's a great opportunity to connect with peers in the industry.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="faq2_accordion-2">
                    <div className="faq2_question-2">
                      <div className="faq-accordion-question referral-faq-q">Is there a hands-on component to this workshop?</div>
                      <img loading="lazy" src="/images/Workshop_FAQ-Arrow.svg" alt="" className="faq2_icon-2" />
                    </div>
                    <div style={{height: '0px'}} className="faq2_answer">
                      <div className="margin-bottom">
                        <div className="max-width-large">
                          <p className="referral-faq-a-2">Absolutely! A significant portion of the workshop is dedicated to hands-on exercises where you'll implement SSO using our product.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="workshop-form" className="bg-black bg-workshop-gradient">
        <div className="container-default content-center py-80 gap-60">
          <div className="_2-block-flex space-between gap-24-m m-column">
            <div className="_2-block_flex-left align-top">
              <div className="flex gap-24 mobile-column">
                <div className="workshop-h2-icon"><img src="/images/Union.svg" loading="lazy" alt="" /></div>
                <h2 className="workshop_h2">Register<br />&#8205;<span className="workshop_h2-main">Reserve <br />Your Spot</span></h2>
              </div>
              <div className="workshop-footer-form_content">Join us on October 24th for a FREE, intensive, hands-on workshop where you'll learn to implement SSO best practices with Authgear.</div>
            </div>
            <div className="_2-block_flex-right flex gap-24 flex-column grow tablet-100">
              <div className="workshop-form w-form">
                <form id="wf-form-Oct24-Workshop" name="wf-form-Oct24-Workshop" data-name="Oct24-Workshop" method="get">
                  <label htmlFor="workshop-name" className="workshop-form-field-label">Name<span className="get-demo-form-label-required">*</span></label>
                  <input className="workshop-form-text-field w-input" maxLength={256} name="name" data-name="Name" placeholder="" type="text" id="workshop-name" required />
                  <label htmlFor="workshop-phone" className="workshop-form-field-label">Phone Number<span className="get-demo-form-label-required">*</span></label>
                  <input className="workshop-form-text-field phone-number w-input" maxLength={256} name="Phone-Number" data-name="Phone Number" placeholder="" type="text" id="workshop-phone" required />
                  <input className="text-field w-input" maxLength={256} name="Country-5" data-name="Country 5" placeholder="" type="text" id="workshop-country" required />
                  <div className="html-embed phone-number w-embed">
                    <span id="valid-msg" className="hide">Valid number</span>
                    <span id="error-msg" className="hide"></span>
                  </div>
                  <label htmlFor="workshop-email" className="workshop-form-field-label">Email Address<span className="get-demo-form-label-required">*</span></label>
                  <input className="workshop-form-text-field w-input" maxLength={256} name="email" data-name="Email" placeholder="" type="email" id="workshop-email" required />
                  <label htmlFor="Company-Name" className="workshop-form-field-label">Company Name</label>
                  <input className="workshop-form-text-field w-input" maxLength={256} name="Company-Name" data-name="Company Name" placeholder="" type="text" id="Company-Name" />
                  <label htmlFor="Github" className="workshop-form-field-label">Github ID</label>
                  <input className="workshop-form-text-field w-input" maxLength={256} name="Github" data-name="Github" placeholder="" type="text" id="Github" />
                  <input type="submit" data-wait="Please wait..." className="workshop-form-submit-button w-button" value="Submit" />
                </form>
                <div className="w-form-done">
                  <div>Thank you! Your submission has been received!</div>
                </div>
                <div className="w-form-fail">
                  <div>Oops! Something went wrong while submitting the form.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="workshop-footer-separator"></div>
      <footer className="footer dark">
        <div className="container-default w-container">
          <div className="footer-wrapper">
            <div className="footer-top-content workshop">
              <div>
                <a href="#" className="footer-image w-inline-block"><img src="/images/Authgear_workshop_logo.svg" loading="lazy" alt="" /></a>
                <div className="w-layout-grid footer-social-media-grid workshop">
                  <a href="https://www.linkedin.com/company/skymakers-digital" target="_blank" rel="noreferrer" className="footer-social-media-link icon-small gray-bg w-inline-block">
                    <div></div>
                  </a>
                  <a href="https://discord.gg/Kdn5vcYwAS" target="_blank" rel="noreferrer" className="footer-social-media-link icon-small gray-bg w-inline-block"><img width="19" loading="lazy" alt="" src="/images/24OCTSG_footer_social-Discord.svg" className="footer-social-media-icon" /></a>
                  <a href="https://github.com/authgear" target="_blank" rel="noreferrer" className="footer-social-media-link icon-small gray-bg w-inline-block"><img loading="lazy" src="/images/24OCTSG_footer_social-Github.svg" alt="" className="footer-social-media-icon" /></a>
                </div>
              </div>
              <div className="footer-menu-navigation-wrapper workshop">
                <div className="footer-menu-links-wrapper workshop">
                  <ul role="list" className="footer-menu-list w-list-unstyled">
                    <li className="footer-menu-list-item">
                      <h6 className="footer-menu-title">Get Started</h6>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/schedule-demo" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Contact Sales</div>
                      </Link>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/pricing" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Pricing</div>
                      </Link>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/migrate-to-authgear" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Migrate to Authgear</div>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="footer-menu-links-wrapper workshop">
                  <ul role="list" className="footer-menu-list w-list-unstyled">
                    <li className="footer-menu-list-item">
                      <h6 className="footer-menu-title">developers</h6>
                    </li>
                    <li className="footer-menu-list-item">
                      <a href="https://docs.authgear.com" target="_blank" rel="noreferrer" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Documentations</div>
                      </a>
                    </li>
                    <li className="footer-menu-list-item">
                      <a href="https://docs.authgear.com/reference/apis/oauth-2.0-and-openid-connect-oidc/userinfo" target="_blank" rel="noreferrer" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>APIs</div>
                      </a>
                    </li>
                    <li className="footer-menu-list-item">
                      <a href="https://github.com/authgear" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Github</div>
                      </a>
                    </li>
                    <li className="footer-menu-list-item">
                      <a href="https://github.com/authgear/authgear-server/discussions" target="_blank" rel="noreferrer" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Community</div>
                      </a>
                    </li>
                    <li className="footer-menu-list-item">
                      <a href="https://discord.gg/Kdn5vcYwAS" target="_blank" rel="noreferrer" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Discord</div>
                      </a>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/integrations" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Integrations</div>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="footer-menu-links-wrapper workshop">
                  <ul role="list" className="footer-menu-list w-list-unstyled">
                    <li className="footer-menu-list-item">
                      <h6 className="footer-menu-title">resources</h6>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/blog" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Blog</div>
                      </Link>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/security" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Security</div>
                      </Link>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/terms" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Terms</div>
                      </Link>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/policy" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Use Policy</div>
                      </Link>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/data-privacy" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Privacy Policy</div>
                      </Link>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/terms-of-enterprise-license" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Enterprise Licenses</div>
                      </Link>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/sla" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>SLA</div>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="footer-menu-links-wrapper workshop">
                  <ul role="list" className="footer-menu-list w-list-unstyled">
                    <li className="footer-menu-list-item">
                      <h6 className="footer-menu-title">company</h6>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/about" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>About</div>
                      </Link>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/promises" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Our Promises</div>
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
