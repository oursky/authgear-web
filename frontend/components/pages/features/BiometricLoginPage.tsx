import ContactForm from '@/components/ContactForm';

interface Props {
  locale: string;
}

export default function BiometricLoginPage(_props: Props) {
  return (
    <>
<div className="featurespage__hero">
    <div className="features-hero-wrapper">
      <div className="split-content integrations-hero-left">
        <h1 className="title features-hero">Email Passcode</h1>
        <p className="paragraph-large">Easily enable WhatsApp OTP with a single click to provide a simpler and more secure for users to sign up for and log into your app.</p>
        <div className="features-hero-cta-wrapper">
          <a href="/talk-with-us" target="_blank" className="button-primary feature-hero-btn w-button">Request Demo<span className="muted"></span></a>
          <a href="https://accounts.portal.authgearapps.com/signup" target="_blank" className="button-secondary feature-hero-btn w-button">Get Started</a>
        </div>
      </div><img src="/images/ag-favicon256w.png" alt="" className="image features-hero" />
    </div>
  </div>
  <div className="section features-page">
    <div className="container-default w-container">
      <div className="top-content feature-flex">
        <h2 className="title features-page">Increase App Conversion Rate with Simple 3-step WhatsApp OTP</h2>
        <p className="paragraph-large text-center features-page">Passwordless authentication refers to any authentication method that does not require passwords to verify users’ identities. Common passwordless authentication methods include biometrics, one-time password (OTP), and magic link.</p>
        <div className="features-page-steps">
          <div className="features-page-step">
            <h5>Step 1</h5>
            <p>User enter the phone number they used to register WhatsApp</p>
          </div>
          <div className="features-page-step">
            <h5>Step 2</h5>
            <p>User enter the phone number they used to register WhatsApp</p>
          </div>
          <div className="features-page-step">
            <h5>Step 3</h5>
            <p>User enter the phone number they used to register WhatsApp</p>
          </div>
        </div>
      </div>
      <div className="features-page-card-wrapper">
        <div className="features-page-card">
          <h3 className="h3-title-small">Leverage WhatsApp Drip Campaign to Boost Sales</h3>
          <p>After your users sign up via WhatsApp OTP, you can then perform automated campaigns, or drip campaigns, through WhatsApp, which is proven to be much more effective than SMS or emails.</p>
          <div className="features-page-card-points">
            <div className="features-page-card-point"><img src="/images/biometrics.svg" loading="lazy" alt="" className="features-page-point-img" />
              <p className="paragraph-small"><span>50% higher Response Rates</span></p>
            </div>
            <div className="features-page-card-point"><img src="/images/biometrics.svg" loading="lazy" alt="" className="features-page-point-img" />
              <p className="paragraph-small"><span>70% Click Through Rates (CTR)</span></p>
            </div>
            <div className="features-page-card-point"><img src="/images/biometrics.svg" loading="lazy" alt="" className="features-page-point-img" />
              <p className="paragraph-small"><span>Messages Read within 3 Seconds</span></p>
            </div>
            <div className="features-page-card-point"><img src="/images/biometrics.svg" loading="lazy" alt="" className="features-page-point-img" />
              <p className="paragraph-small"><span>Save Manpower Cost by 25%</span></p>
            </div>
          </div>
        </div>
        <div className="features-page-card image"><img src="/images/features-pwless-1.svg" loading="lazy" alt="" className="features-page-list-image" /></div>
      </div>
      <div className="features-page-card-wrapper alternative-order">
        <div className="features-page-card image"><img src="/images/features-pwless-2.svg" loading="lazy" alt="" className="features-page-list-image" /></div>
        <div className="features-page-card">
          <h3 className="h3-title-small">Spend Less Per Message on WhatsApp</h3>
          <p>Authgear’s user-initiated WhatsApp OTP allows you to</p>
          <ul role="list">
            <li>Authenticate users for free<br /></li>
            <li>Enjoy lower cost per conversation compared to SMS</li>
            <li>Deliver marketing messages with lower costs</li>
          </ul>
        </div>
      </div>
      <div className="features-page-card-wrapper">
        <div className="features-page-card">
          <h3 className="h3-title-small">Enhance Security While Improving User Experience</h3>
          <p>No need to find the balance between security and user experience. OTP sent via WhatsApp provides a simpler login and re-authentication process for users while enhancing security with end-to-end encryption and passwordless authentication.</p>
        </div><img src="/images/features-pwless-3.svg" loading="lazy" alt="" className="features-page-list-image" />
      </div>
    </div>
    <div className="features-page-perks-grid-wrapper">
      <div className="top-content feature-flex">
        <h2 className="title features-page">Leverage The Most Popular Messenger App Across The Globe</h2>
        <p className="paragraph-large text-center features-page">WhatsApp has approximately 2 billion monthly active users, making it the most popular global mobile messenger app. Furthermore, it is free from the international deliverability issues of SMS. Send OTPs with the messenger service your users are familiar with to verify transactions and logins, providing smoother user experience and increasing customer retention.Users can still verify through SMS if they do not use WhatsApp.</p>
      </div>
    </div>
  </div>
  <div className="features-page-contact-us-section">
    <div className="features-page-contact-us-container w-container">
      <div className="top-content feature-flex contact-form-title">
        <h2 className="title features-page">Easily Switch Your OTP and 2FA to WhatsApp Now</h2>
      </div>
      <ContactForm />
    </div>
  </div>
    </>
  );
}
