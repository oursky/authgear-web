interface Props {
  locale: string;
}

export default async function Auth0AlternativePage(_props: Props) {
  return (
    <div className="page-wrapper">
      <div className="featurespage__hero">
        <div className="container-default text-center w-container">
          <h1 className="heading-5">Spending over $500 per month for 7.5K active users with Auth0?</h1>
          <p>You can use that money more wisely.</p>
          <div className="features-hero-cta-wrapper">
            <a href="https://accounts.portal.authgear.com/signup" target="_blank" className="button-primary feature-hero-btn w-button"><span className="text-span-3">Get Started</span> - it{'\''}s free<span className="muted"></span></a>
          </div>
        </div>
      </div>
      <div>
        <div className="container-default w-container">
          <div className="top-text">
            <h2 className="text-center solution-h2">Increase the Number of Users by 10x</h2>
            <p className="text-center paragraph-large solution-subheading">It&apos;s all about user experience. Authgear provides a seamless experience that makes sign-up a no-brainer.</p>
          </div>
          <div className="solution-flex-container gap-40">
            <div className="solution-image-block"><img src="/images/signup-page-convert.jpg" loading="lazy" alt="" /></div>
            <div className="solution-text-block line-height-40">
              <h3>Signup Page That Converts More Users</h3>
              <p>Authgear provides a pre-built signup and login page with customizable branding that follows best sign-up page practices to help you minimize bounce rate and acquire more users. You can add your own logo and change the colors to align it with your brand guidelines.</p>
            </div>
          </div>
          <div className="solution-flex-container gap-40 reverse-order">
            <div className="solution-image-block"><img src="/images/ciam-frictionless-auth.png" loading="lazy" alt="" /></div>
            <div className="solution-text-block line-height-40">
              <h3>Frictionless Authentication</h3>
              <p>Equip your apps with a variety of frictionless authentication methods, such as passkeys, biometrics, WhatsApp OTP, social logins, etc., for users to easily sign up for and log into your apps without all the hassles related to passwords.</p>
            </div>
          </div>
          <div className="solution-flex-container gap-40">
            <div className="solution-image-block"><img src="/images/Self-Service-Settings-2.jpg" loading="lazy" alt="" /></div>
            <div className="solution-text-block line-height-40">
              <h3>Self-Service Settings</h3>
              <p>Empower your users to have more control over their credentials and activities with the pre-built account setting page. Customers can manage their identities, change their passwords, manage their authentication methods, set up 2FA, revoke signed in sessions, or even edit their profile information without having to contact the support team.<br /></p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container-default w-container">
          <div className="top-text">
            <h2 className="text-center solution-h2">Build Trust with Your Loyal Customers</h2>
            <p className="text-center paragraph-large solution-subheading">Our success is linked to yours. Authgear enables you to ensure both the quality of the customer experience and robust data security.<br /></p>
          </div>
          <div className="solution-flex-container gap-40">
            <div className="solution-image-block"><img src="/images/ciam-2fa.jpg" loading="lazy" alt="" /></div>
            <div className="solution-text-block line-height-40">
              <h3>2FA &amp; Biometric Authentication</h3>
              <p>Enable and easily configure two-factor authentication and biometric authentication to protect your users from cyberattacks. Available secondary authentication methods include authenticator app, additional password, and OTPs via different channels.</p>
            </div>
          </div>
          <div className="solution-flex-container gap-40 reverse-order">
            <div className="solution-image-block"><img src="/images/workflow.jpg" loading="lazy" alt="" /></div>
            <div className="solution-text-block line-height-40">
              <h3>Streamlined Customer Support</h3>
              <p>Simple interface for your admin or customer support teams to manage your users and provide quality customer services. Easily create, remove, disable, or revoke users&apos; sessions with just a few clicks.</p>
            </div>
          </div>
          <div className="solution-flex-container gap-40">
            <div className="solution-image-block"><img src="/images/ciam-data-analytics.jpg" loading="lazy" alt="" /></div>
            <div className="solution-text-block line-height-40">
              <h3>User Analytics &amp; Audit Log</h3>
              <p>Collect data that truly matters with user analytics for more personalized marketing campaigns and apply user insights to product development. Audit log also helps you look into different activities to protect your applications from cyberattacks.<br /></p>
            </div>
          </div>
        </div>
      </div>
      <div className="section features-page">
        <div className="solution-flex-container reverse-order container-default w-container">
          <div className="solution-image-block"><img src="/images/workflow.jpg" loading="lazy" alt="" /></div>
          <div className="solution-text-block line-height-40">
            <h3>Reduce Time to Market and Let Us Do the Heavy Lifting</h3>
            <p>The complexity of customer identity and access management requires a lot of resources to develop, maintain, and improve. However, CIAM is no longer an afterthought as users now value user experience and data security over pricing.Instead of having your in-house developers work on a brand new authentication system, let Authgear take care of all CIAM matters to help you increase developer efficiency and reduce development or compliance costs.</p>
          </div>
        </div>
      </div>
      <div className="features-page-contact-us-section">
        <div className="features-page-contact-us-container w-container">
          <div className="top-content feature-flex contact-form-title">
            <h2 className="title features-page">Tell Us More About Your Customer Identity and Access Management Requirements<br /></h2>
          </div>
          <div>
            <div className="w-form">
              <form id="wf-form-Authgear-Talk-with-Us" name="wf-form-Authgear-Talk-with-Us" data-name="Authgear Talk with Us" method="post" className="contact-form">
                <div className="margin-vertical margin-small"><label htmlFor="Name-3">Name</label>
                  <div className="text-field-wrapper"><input className="getdemo-field w-input" maxLength={256} name="Name" placeholder="" type="text" id="Name-3" required /></div>
                </div>
                <div className="margin-vertical margin-small"><label htmlFor="Email-4">Work Email</label>
                  <div className="text-field-wrapper"><input className="getdemo-field w-input" maxLength={256} name="Email" placeholder="" type="email" id="Email-4" required /></div>
                </div>
                <div className="margin-vertical margin-small"><label htmlFor="Phone-3">Phone Number</label>
                  <div className="text-field-wrapper"><input className="getdemo-field w-input" maxLength={256} name="Phone" placeholder="" type="tel" id="Phone-3" required /></div>
                </div>
                <div className="margin-vertical margin-small"><label htmlFor="Company-3">Company Name</label>
                  <div className="text-field-wrapper"><input className="getdemo-field w-input" maxLength={256} name="Company" placeholder="" type="text" id="Company-3" required /></div>
                </div>
                <div className="margin-vertical margin-small"><label htmlFor="Message-3">Leave us a message</label>
                  <div className="textarea-wrapper"><textarea placeholder="Leave us a message" maxLength={5000} id="Message-3" name="Message" required className="text-area w-input"></textarea></div>
                </div>
                <div className="margin-vertical margin-medium"><input type="submit" data-wait="Please wait..." className="button-primary plausible-event-name--contact-form-submit w-button" value="Submit" /></div>
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
  );
}
