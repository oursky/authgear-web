import PageScripts from '@/components/PageScripts';

const pageScripts: string[] = [
  `$(".code-block .code-snippet")
	.each((i,ele)=>{
  	CodeMirror.fromTextArea(ele,{
    	mode: "javascript",
      lineNumbers: true,
      theme: "material-ocean",
      readOnly: true
    })
	})
$(".section-about-app-tab-link").click((evt) => {
    const tab = $(evt.target.closest('.section-about-app-tab-link')).attr("data-w-tab")
    const tabPane = $(\`.section-about-app-tab-pane[data-w-tab='\${tab}']\`)
    tabPane.each((i, pane) => {
      $(pane).find(".CodeMirror")
      	.each((j,cm)=>{
          setTimeout(function(){ cm.CodeMirror.refresh(); }, 400);
      })
    })
})
let showAnnouncement = function(){
	$(".page-wrapper").addClass("announcement")
  $(".announcement-bar").slideDown(100)
}
$(document).ready(()=>{
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString);
  const from = urlParams.get("from")
  if(from == "skygear") showAnnouncement()
})`,
];

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
                  <h1 className="new-heading">Fortress Your B2B SaaS Authentication:<br />Secure Access for You &amp; Every Tenant.</h1>
                  <p className="middle-hero-paragraph text-787e81 size-18">Authgear empowers your SaaS authentication with robust security and effortless multi-tenancy management.<br /><span className="text-bold" >Deliver a seamless user experience for all, while safeguarding sensitive data.</span></p>
                  <a href="https://portal.authgear.com/?utm_source=solutions-b2b-saas&amp;utm_medium=link&amp;utm_campaign=talk-with-us" target="_blank" className="button-primary button-gradient center w-button">Talk with Us</a>
                </div><img src="/images/b2c_ciam_kv-hero-login-box1.svg" loading="lazy" alt="" />
              </div>
            </div>
          </div>
          <div>
            <div className="container-full-general">
              <div className="container-default-inner px-0 pb-40">
                <div className="top-content flex-column text-center mx-20">
                  <div className="top-content-icon"><img src="/images/b2b_saas_empower-icon.svg" loading="lazy" alt="" /></div>
                  <h2 className="text-center mg-bottom-16px top-content-title ibm-plex-sans color-2e2e2e">Empower &amp; Secure:<br />‍<span className="text-highlight-gradient" >Granular Access Control for Your B2B Clients</span></h2>
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
                      <div className="svg-card-content-title ibm-plex-sans color-2b2b2b small">Reduced Costs &amp; Streamlined Management</div>
                      <div className="svg-card-content-description size-14">Manage all your B2B clients from a single platform, eliminating the need for multiple SaaS authentication systems and reducing infrastructure and maintenance overhead.</div>
                    </div>
                  </div>
                  <div className="svg-card p-0 bg-transparent with-divider">
                    <div className="svg-card-image-container center">
                      <div className="card-count">2</div>
                    </div>
                    <div className="svg-card-content-container text-center gap-6">
                      <div className="svg-card-content-title ibm-plex-sans color-2b2b2b small">Flexibility &amp; Effortless Scalability</div>
                      <div className="svg-card-content-description size-14">Onboard new B2B clients seamlessly and scale effortlessly as your user base grows. Authgear's multi-tenancy adapts to your evolving B2B ecosystem.</div>
                    </div>
                  </div>
                  <div className="svg-card p-0 bg-transparent with-divider last">
                    <div className="svg-card-image-container center">
                      <div className="card-count">3</div>
                    </div>
                    <div className="svg-card-content-container text-center gap-6">
                      <div className="svg-card-content-title ibm-plex-sans color-2b2b2b small">Centralized Security &amp; Compliance</div>
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
                  <h2 className="text-center mg-bottom-16px top-content-title ibm-plex-sans color-2e2e2e"><span className="text-highlight-gradient">Ready to Secure &amp; Scale Your B2B Ecosystem? Get Your Free Trial Today!</span></h2>
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
                      <h2 className="form-heading color-white footer-form">Secure, Streamline &amp; Empower Your Extended Workforce</h2>
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
                        <div className="w-form-formrecaptcha g-recaptcha g-recaptcha-error g-recaptcha-disabled"></div>
                        <div className="margin-vertical margin-medium"><input type="submit" className="getdemo-submit plausible-event-name--contact-form-submit w-button" value="Submit" /></div>
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
        </div>
      <PageScripts scripts={pageScripts} />
    </>
  );
}