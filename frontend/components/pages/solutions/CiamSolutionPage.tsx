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

export default function CiamSolutionPage(_props: Props) {
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
                  <div className="top-label hero-title">B2C CIAM</div>
                  <h1 className="new-heading">Security Shouldn't Be a Luxury.<br />You Deserve Both Convenience &amp; Protection.</h1>
                  <p className="middle-hero-paragraph text-787e81 size-18">Don't settle for just security. Authgear's B2C CIAM solution empowers you to take control of your online identity with a seamless and secure user experience. Enjoy the convenience of modern login options like biometrics and social logins</p>
                  <a href="https://portal.authgear.com/?utm_source=solutions-b2c-ciam&amp;utm_medium=link&amp;utm_campaign=talk-with-us" target="_blank" className="button-primary button-gradient center w-button">Talk with Us</a>
                </div><img src="/images/b2c_ciam_kv-hero-login-box1.svg" loading="lazy" alt="" />
              </div>
            </div>
          </div>
          <div>
            <div className="container-default">
              <div className="container-default-inner px-0">
                <div className="top-content flex-column text-center">
                  <div className="top-content-icon"><img src="/images/b2c_ciam_one-stop-icon.svg" loading="lazy" alt="" /></div>
                  <h2 className="text-center mg-bottom-16px top-content-title ibm-plex-sans color-2e2e2e">One-Stop Shop for Security &amp; Auth:<br /><span className="text-highlight-gradient" >Simplify with Authgear CIAM solution</span></h2>
                  <div className="top-content-description ibm-plex-sans">Authgear is your all-in-one CIAM solution for managing user authentication and securing your applications. Simplify your security stack and empower your users.</div>
                </div>
                <div className="grid-12 gap-36">
                  <div className="features-card-new space-between">
                    <div className="features-card-new_image center"><img src="/images/b2c_ciam_one-stop-sso.svg" loading="lazy" alt="" /></div>
                    <div className="features-card-new_text">Single Sign On</div>
                  </div>
                  <div className="features-card-new space-between">
                    <div className="features-card-new_image center"><img src="/images/b2c_ciam_one-stop-passwordless.svg" loading="lazy" alt="" /></div>
                    <div className="features-card-new_text">Passwordless Login</div>
                  </div>
                  <div className="features-card-new space-between">
                    <div className="features-card-new_image center"><img src="/images/b2c_ciam_one-stop-mfa.svg" loading="lazy" alt="" /></div>
                    <div className="features-card-new_text">Multi-Factor Authentication</div>
                  </div>
                  <div className="features-card-new space-between">
                    <div className="features-card-new_image center"><img src="/images/b2c_ciam_one-stop-biometric.svg" loading="lazy" alt="" /></div>
                    <div className="features-card-new_text">Biometric &amp; Passkeys</div>
                  </div>
                  <div className="features-card-new space-between">
                    <div className="features-card-new_image center"><img src="/images/b2c_ciam_one-stop-breachedpassword.svg" loading="lazy" alt="" /></div>
                    <div className="features-card-new_text">Breached Password Detection</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-f3f6ff">
            <div className="container-default">
              <div className="container-default-inner px-0">
                <div className="top-content flex-column text-center">
                  <div className="top-content-icon"><img src="/images/b2c_ciam_empowers-icon.svg" loading="lazy" alt="" /></div>
                  <h2 className="text-center mg-bottom-16px top-content-title ibm-plex-sans color-2e2e2e">Frictionless Logins, Exponential Growth:<br />‍<span className="text-highlight-gradient" >How Authgear Empowers Your Users</span></h2>
                  <div className="top-content-description ibm-plex-sans">Stop juggling complex logins and security concerns. Authgear CIAM solution empowers you to take control of your online identity with features designed to reduce user friction and drive user growth.</div>
                </div>
                <div className="grid-12 gap-36">
                  <div className="features-card-new px-24 bg-white">
                    <div className="features-card-new_image"><img src="/images/b2c_ciam_empowers-passwordmanagement.svg" loading="lazy" alt="" /></div>
                    <div className="features-card-new_content-wrap">
                      <div className="features-card-new_content-title">Self-Service Password Management</div>
                      <div className="features-card-new_content-desc">Empower users to reset passwords and manage their accounts independently.</div>
                    </div>
                  </div>
                  <div className="features-card-new px-24 bg-white space-between">
                    <div className="features-card-new_image last"><img src="/images/b2c_ciam_empowers-modernlogin.svg" loading="lazy" alt="" className="mw-140" /></div>
                    <div className="features-card-new_content-wrap">
                      <div className="features-card-new_content-title">Modern Login Options</div>
                      <div className="features-card-new_content-desc">Offer users the convenience of logging in with familiar methods like Social Logins, Passwordless authentication, and Biometrics (FaceID, TouchID).</div>
                    </div>
                  </div>
                  <div className="features-card-new px-24 bg-white">
                    <div className="features-card-new_image"><img src="/images/b2c_ciam_empowers-registration.svg" loading="lazy" alt="" /></div>
                    <div className="features-card-new_content-wrap">
                      <div className="features-card-new_content-title">Seamless Registration</div>
                      <div className="features-card-new_content-desc">Simplify the sign-up process with intuitive forms and one-click registration options.</div>
                    </div>
                  </div>
                  <div className="features-card-new px-24 bg-white">
                    <div className="features-card-new_image"><img src="/images/b2c_ciam_empowers-reducelogin.svg" loading="lazy" alt="" /></div>
                    <div className="features-card-new_content-wrap">
                      <div className="features-card-new_content-title">Reduced Login Fatigue</div>
                      <div className="features-card-new_content-desc">Eliminate the need for users to remember multiple passwords with Single Sign-On (SSO) across your applications.</div>
                    </div>
                  </div>
                  <div className="features-card-new px-24 bg-white">
                    <div className="features-card-new_image"><img src="/images/b2c_ciam_empowers-mfa.svg" loading="lazy" alt="" /></div>
                    <div className="features-card-new_content-wrap">
                      <div className="features-card-new_content-title">Enhanced Security</div>
                      <div className="features-card-new_content-desc">Advanced security features like Multi-Factor Authentication and breached password detection keep user data safe, fostering trust and loyalty.</div>
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
                  <div className="top-content-icon mobile-center"><img src="/images/b2c_ciam_usercentric-icon.svg" loading="lazy" alt="" /></div>
                  <h2 className="top-content-title ibm-plex-sans color-2e2e2e size-40 mobile-center">Reap the Rewards:<br />‍<span className="text-highlight-gradient" >User-Centric Security</span></h2>
                  <div className="top-content-description ibm-plex-sans mobile-center">Prioritizing user experience with Authgear CIAM solution unlocks a multitude of benefits for your business.</div>
                </div>
                <div className="_2-card-grid">
                  <div className="svg-card">
                    <div className="svg-card-image-container"><img src="/images/b2c_ciam_usercentric-journeys.svg" loading="lazy" alt="" /></div>
                    <div className="svg-card-content-container">
                      <div className="svg-card-content-title ibm-plex-sans color-2b2b2b">Effortless User Journeys</div>
                      <div className="svg-card-content-description m-sm">Streamlined login processes and convenient authentication options create a frictionless user experience that keeps users engaged and coming back for more.</div>
                    </div>
                  </div>
                  <div className="svg-card">
                    <div className="svg-card-image-container"><img src="/images/b2c_ciam_usercentric-increased.svg" loading="lazy" alt="" /></div>
                    <div className="svg-card-content-container">
                      <div className="svg-card-content-title ibm-plex-sans color-2b2b2b">Increased Conversions</div>
                      <div className="svg-card-content-description m-sm">Reduced signup barriers and a user-friendly experience translate to more successful signups and completed transactions.</div>
                    </div>
                  </div>
                  <div className="svg-card">
                    <div className="svg-card-image-container"><img src="/images/b2c_ciam_usercentric-boosted.svg" loading="lazy" alt="" /></div>
                    <div className="svg-card-content-container">
                      <div className="svg-card-content-title ibm-plex-sans color-2b2b2b">Boosted User Engagement</div>
                      <div className="svg-card-content-description m-sm">Happy users are loyal users. Authgear helps you foster positive user experiences that drive repeat engagement with your platform.</div>
                    </div>
                  </div>
                  <div className="svg-card">
                    <div className="svg-card-image-container"><img src="/images/b2c_ciam_usercentric-enhanced.svg" loading="lazy" alt="" /></div>
                    <div className="svg-card-content-container">
                      <div className="svg-card-content-title ibm-plex-sans color-2b2b2b">Enhanced Brand Reputation</div>
                      <div className="svg-card-content-description m-sm">A seamless and secure login process builds trust and strengthens your brand image, leading to increased customer loyalty.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient">
            <div className="container-default">
              <div className="container-default-inner px-0 row small-col">
                <div className="top-content flex-column align-left">
                  <div className="top-content-icon"><img src="/images/b2c_ciam_integration-icon.svg" loading="lazy" alt="" /></div>
                  <h2 className="top-content-title ibm-plex-sans color-white size-40 line-height-1-238em">Effortless Integration,Unmatched Security: <span className="text-highlight-gradient secondary">Why Developers Choose Authgear</span></h2>
                  <div className="top-content-description ibm-plex-sans size-18 color-white align-left"><span className="text-bold">Building a secure and user-friendly login experience shouldn't slow down your development process.</span> Authgear empowers developers with powerful tools to streamline integration and focus on what matters most: building the core features of your application.</div>
                </div>
                <div className="_2-card-grid gap-32 mobile-1-col">
                  <div className="svg-card p-24 gap-16 transparent min-w-296px">
                    <div className="svg-card_title-wrap">
                      <div className="svg-card-image-container _w-32px"><img src="/images/b2c_ciam_integration-nocode.svg" loading="lazy" alt="" /></div>
                      <div className="svg-card-content-title ibm-plex-sans small color-44daff">No-Code Implementation</div>
                    </div>
                    <div className="svg-card-content-container">
                      <div className="svg-card-content-description size-14 color-c5cae8">Intuitive interface allows for easy integration with your existing infrastructure, eliminating the need for extensive coding. This frees up valuable development resources for core functionalities.</div>
                    </div>
                  </div>
                  <div className="svg-card p-24 gap-16 transparent">
                    <div className="svg-card_title-wrap">
                      <div className="svg-card-image-container _w-32px"><img src="/images/b2c_ciam_integration-prebuilt.svg" loading="lazy" alt="" /></div>
                      <div className="svg-card-content-title ibm-plex-sans small color-44daff">Pre-Built UI &amp; UX</div>
                    </div>
                    <div className="svg-card-content-container">
                      <div className="svg-card-content-description size-14 color-c5cae8">Skip the design phase and leverage Authgear's user-friendly interface, optimized for seamless login experiences and efficient user onboarding.</div>
                    </div>
                  </div>
                  <div className="svg-card p-24 gap-16 transparent min-w-296px">
                    <div className="svg-card_title-wrap">
                      <div className="svg-card-image-container _w-32px"><img src="/images/b2c_ciam_integration-flexible.svg" loading="lazy" alt="" /></div>
                      <div className="svg-card-content-title ibm-plex-sans small color-44daff">Flexible &amp; Adaptable</div>
                    </div>
                    <div className="svg-card-content-container">
                      <div className="svg-card-content-description size-14 color-c5cae8">Adapts to your specific needs. Customize authentication flows, ensure compliance with industry standards, and integrate seamlessly with your existing infrastructure through robust APIs and webhooks.</div>
                    </div>
                  </div>
                  <div className="svg-card p-24 gap-16 transparent min-w-296px">
                    <div className="svg-card_title-wrap">
                      <div className="svg-card-image-container _w-32px"><img src="/images/b2c_ciam_integration-security.svg" loading="lazy" alt="" /></div>
                      <div className="svg-card-content-title ibm-plex-sans small color-44daff">Security Built-In</div>
                    </div>
                    <div className="svg-card-content-container">
                      <div className="svg-card-content-description size-14 color-c5cae8">Enjoy peace of mind knowing Authgear CIAM solution enforces industry best practices for secure authentication. Features like multi-factor authentication, breached password detection, and secure session management come built-in, saving development time and ensuring robust security.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-default">
              <div className="container-default-inner px-0">
                <div className="top-content flex-column text-center">
                  <div className="top-content-icon"><img src="/images/b2c_ciam_development-icon.svg" loading="lazy" alt="" /></div>
                  <h2 className="text-center mg-bottom-16px top-content-title ibm-plex-sans color-white line-height-1-238em">Frictionless Logins, Exponential Growth:<br />‍<span className="text-highlight-gradient secondary" >How Authgear Empowers Your Users</span></h2>
                  <div className="top-content-description ibm-plex-sans size-18 color-white">Stop juggling complex logins and security concerns. Authgear CIAM solution empowers you to take control of your online identity with features designed to reduce user friction and drive user growth.</div>
                </div>
                <div className="grid-12 gap-36">
                  <div className="features-card-new px-24 bg-transparent-gradient gap-24">
                    <div className="features-card-new_image"><img src="/images/b2c_ciam_development-innovation.svg" loading="lazy" alt="" /></div>
                    <div className="features-card-new_content-wrap">
                      <div className="features-card-new_content-title color-white text-center">Focus on Innovation</div>
                      <div className="features-card-new_content-desc color-bcddff">Spend less time on login functionality and more time building features that drive user engagement.</div>
                    </div>
                  </div>
                  <div className="features-card-new px-24 bg-transparent-gradient gap-24">
                    <div className="features-card-new_image"><img src="/images/b2c_ciam_development-reduce.svg" loading="lazy" alt="" /></div>
                    <div className="features-card-new_content-wrap">
                      <div className="features-card-new_content-title color-white text-center">Reduce Development Time</div>
                      <div className="features-card-new_content-desc color-bcddff">The no-code approach and pre-built UI significantly accelerate the development process.</div>
                    </div>
                  </div>
                  <div className="features-card-new px-24 bg-transparent-gradient gap-24">
                    <div className="features-card-new_image"><img src="/images/b2c_ciam_development-experience.svg" loading="lazy" alt="" /></div>
                    <div className="features-card-new_content-wrap">
                      <div className="features-card-new_content-title color-white text-center">Deliver a Secure User Experience</div>
                      <div className="features-card-new_content-desc color-bcddff">Benefit from built-in security features and best practices without compromising user experience.</div>
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
                      <h2 className="form-heading color-white footer-form">All-in-one CIAM Solution for User Authentication &amp; App Security</h2>
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