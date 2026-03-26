import ContactForm from '@/components/ContactForm';

interface Props {
  locale: string;
}

export default function CustomerIdentityAndAccessManagementPage(_props: Props) {
  return (
    <>
      <div className="featurespage__hero">
          <div className="container-default text-center w-container">
            <h1>Customer Identity and Access Management</h1>
            <p>More than just a portal to manage customer identity and access, Authgear helps you acquire and retain more customers with frictionless, secure customer authentication experience throughout the user journey.</p>
            <div className="features-hero-cta-wrapper">
              <a href="/schedule-demo" target="_blank" className="button-primary feature-hero-btn w-button">Request Demo<span className="muted"></span></a>
              <a href="https://accounts.portal.authgear.com/signup" target="_blank" className="button-secondary feature-hero-btn w-button">Get Started</a>
            </div>
          </div>
        </div>
        <div>
          <div className="container-default w-container">
            <div className="top-text">
              <h2 className="text-center solution-h2">Grow Your Business with Higher Conversion and Retention</h2>
              <p className="text-center paragraph-large solution-subheading">Delivering seamless user experience from the very first click helps you convert customers for life.</p>
            </div>
            <div className="solution-flex-container gap-40">
              <div className="solution-image-block"><img src="/images/signup-page-convert.jpg" loading="lazy" sizes="(max-width: 600px) 100vw, 600px" srcSet="/images/signup-page-convert-p-500.jpg 500w, /images/signup-page-convert.jpg 600w" alt="" /></div>
              <div className="solution-text-block line-height-40">
                <h3>Signup Page That Converts More Users</h3>
                <p>Authgear provides a pre-built signup and login page with customizable branding that follows best sign-up page practices to help you minimize bounce rate and acquire more users. You can add your own logo and change the colors to align it with your brand guidelines.</p>
              </div>
            </div>
            <div className="solution-flex-container gap-40 reverse-order">
              <div className="solution-image-block"><img src="/images/ciam-frictionless-auth.png" loading="lazy" sizes="(max-width: 642px) 100vw, 642px" srcSet="/images/ciam-frictionless-auth-p-500.png 500w, /images/ciam-frictionless-auth.png 642w" alt="" /></div>
              <div className="solution-text-block line-height-40">
                <h3>Frictionless Authentication</h3>
                <p>Equip your apps with a variety of frictionless authentication methods, such as passkeys, biometrics, WhatsApp OTP, social logins, etc., for users to easily sign up for and log into your apps without all the hassles related to passwords.</p>
              </div>
            </div>
            <div className="solution-flex-container gap-40">
              <div className="solution-image-block"><img src="/images/Self-Service-Settings-2.jpg" loading="lazy" sizes="(max-width: 600px) 100vw, 600px" srcSet="/images/Self-Service-Settings-2-p-500.jpg 500w, /images/Self-Service-Settings-2.jpg 600w" alt="" /></div>
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
              <h2 className="text-center solution-h2">Create Loyal Customers with Better Security and Services</h2>
              <p className="text-center paragraph-large solution-subheading">Ensure quality customer service and data security to boost customer loyalty and sales.<br /></p>
            </div>
            <div className="solution-flex-container gap-40">
              <div className="solution-image-block"><img src="/images/ciam-2fa.jpg" loading="lazy" sizes="(max-width: 600px) 100vw, 600px" srcSet="/images/ciam-2fa-p-500.jpg 500w, /images/ciam-2fa.jpg 600w" alt="" /></div>
              <div className="solution-text-block line-height-40">
                <h3>2FA & Biometric Authentication</h3>
                <p>Enable and easily configure two-factor authentication and biometric authentication to protect your users from cyberattacks. Available secondary authentication methods include authenticator app, additional password, and OTPs via different channels.</p>
              </div>
            </div>
            <div className="solution-flex-container gap-40 reverse-order">
              <div className="solution-image-block"><img src="/images/workflow.jpg" loading="lazy" sizes="(max-width: 600px) 100vw, 600px" srcSet="/images/workflow-p-500.jpg 500w, /images/workflow.jpg 600w" alt="" /></div>
              <div className="solution-text-block line-height-40">
                <h3>Streamlined Customer Support</h3>
                <p>Simple interface for your admin or customer support teams to manage your users and provide quality customer services. Easily create, remove, disable, or revoke users’ sessions with just a few clicks.</p>
              </div>
            </div>
            <div className="solution-flex-container gap-40">
              <div className="solution-image-block"><img src="/images/ciam-data-analytics.jpg" loading="lazy" sizes="100vw" srcSet="/images/ciam-data-analytics-p-500.jpg 500w, /images/ciam-data-analytics.jpg 586w" alt="" /></div>
              <div className="solution-text-block line-height-40">
                <h3>User Analytics & Audit Log</h3>
                <p>Collect data that truly matters with user analytics for more personalized marketing campaigns and apply user insights to product development. Audit log also helps you look into different activities to protect your applications from cyberattacks.<br /></p>
              </div>
            </div>
          </div>
        </div>
        <div className="section features-page">
          <div className="solution-flex-container reverse-order container-default w-container">
            <div className="solution-image-block"><img src="/images/workflow.jpg" loading="lazy" sizes="(max-width: 600px) 100vw, 600px" srcSet="/images/workflow-p-500.jpg 500w, /images/workflow.jpg 600w" alt="" /></div>
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
              <ContactForm />
            </div>
          </div>
        </div>
    </>
  );
}