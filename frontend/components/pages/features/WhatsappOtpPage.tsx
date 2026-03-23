import Link from 'next/link';

interface Props {
  locale: string;
}

export default function WhatsappOtpPage({ locale }: Props) {
  return (
    <>
<div className="featurespage__hero_v2 featurespage__hero_bg no-bg">
    <div className="features-hero-wrapper-new inner-bg">
      <div className="split-content features-hero-left">
        <div className="feature-small-title">WhatsApp OTP</div>
        <h1 className="title features-hero-v2 text-white">Authentication users with WhatsApp OTPs</h1>
        <p className="features-hero-description text-purple">Enable your users to login securely with the chat app they love.</p>
        <div className="features-hero-cta-wrapper">
          <a href="https://portal.authgear.com/?utm_source=feature-mfa&amp;utm_medium=link&amp;utm_campaign=start-for-free" target="_blank" className="button-primary feature-hero-btn-v2 featue-white-btn w-button">Start for Free</a>
          <Link href="/schedule-demo" target="_blank" className="button-secondary feature-hero-btn-v2 noscale text-white w-button">Get a Demo  <span className="text-span-23">&gt;</span></Link>
          <div className="w-layout-hflex features-hero-cta-description-weapper"><img src="/images/features-hero-banner-check-purple.svg" loading="lazy" alt="" />
            <p className="features-hero-cta-description text-purple">Free plan includes <span className="features-hero-cta-description-bold text-white">unlimited MAUs</span></p>
          </div>
        </div>
      </div><img src="/images/features-whatsappotp-hero-banner2x.png" srcSet="/images/features-whatsappotp-hero-banner2x-p-500.png 500w, /images/features-whatsappotp-hero-banner2x-p-800.png 800w, /images/features-whatsappotp-hero-banner2x-p-1080.png 1080w, /images/features-whatsappotp-hero-banner2x.png 1459w" width={738} sizes="(max-width: 479px) 100vw, 738px" alt="" className="image features-hero-image-v2" />
    </div>
  </div>
  <div>
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">Why WhatsApp OTP with Authgear</h2>
          <p className="paragraph-large text-center features-page-v2">Lower-cost, secure OTP delivery on the messaging app users already trust.</p>
        </div>
        <div className="_2-card-grid gap-32 mb-40">
          <div id="w-node-_02ee0661-dcc0-5aa3-5cac-a4ceba03974b-7c0a9291" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-otp-whyotp-01.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Cut OTP costs in many markets</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">WhatsApp’s messaging pricing for authentication can be markedly cheaper than SMS depending on the country. Up to 80% cost saving.</div>
            </div>
          </div>
          <div id="w-node-_02ee0661-dcc0-5aa3-5cac-a4ceba039751-7c0a9291" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-otp-whyotp-02.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">More private by design</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">WhatsApp uses end-to-end encryption so only the intended user can read the OTP, unlike SMS, which isn’t E2E encrypted.</div>
            </div>
          </div>
        </div>
        <div className="_2-card-grid gap-32 mb-40">
          <div id="w-node-_9f32105e-c251-1bd5-9544-315e698d178b-7c0a9291" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-otp-whyotp-03.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Reach users where they already are</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">WhatsApp is the world’s most popular messenger with ~2.9B monthly users, and 100M+ in the U.S. alone. So your OTPs land in a familiar, high-engagement channel.</div>
            </div>
          </div>
          <div id="w-node-_9f32105e-c251-1bd5-9544-315e698d1791-7c0a9291" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-otp-whyotp-04.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Works even without cellular service</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">OTPs deliver over any internet connection, so users can authenticate even when they have no cell signal.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section>
    <div className="container-default">
      <div className="container-default-inner">
        <div className="top-content-title-only feature-flex mb-60">
          <h2 className="title features-page-v2">How It Works</h2>
        </div>
        <div className="_3-card-grid">
          <div id="w-node-af9ca247-9f3d-a9cc-22dd-620968ce3af6-7c0a9291" className="card-image-rounded"><img src="/images/features-otp-howitworks-phonenumber.svg" loading="lazy" alt="" className="image-radius-24" />
            <div className="card-image-rounded-title left inter color-2e2e2e mobile-20px">User enters their phone number</div>
          </div>
          <div id="w-node-_5728eba1-9e26-889b-a99f-2fcd23c1e9a3-7c0a9291" className="card-image-rounded"><img src="/images/features-otp-howitworks-otp.svg" loading="lazy" alt="" className="image-radius-24" />
            <div className="card-image-rounded-title left inter color-2e2e2e mobile-20px">Authgear issues a one-time code to their WhatsApp</div>
          </div>
          <div id="w-node-a40d5e92-6d8a-8379-578c-dd5cc5c2d4ae-7c0a9291" className="card-image-rounded"><img src="/images/features-otp-howitworks-submitcode.svg" loading="lazy" alt="" className="image-radius-24" />
            <div className="card-image-rounded-title left inter color-2e2e2e mobile-20px">User submits the code and is securely signed in</div>
          </div>
        </div>
        <div className="check-points">
          <div className="check-points-content"><img src="/images/features-otp-howitworks-check.svg" loading="lazy" alt="" />
            <p className="check-points-text">Authgear enforces <span className="text-span-46">rate limits, account lockout, and bot protection (CAPTCHA)</span> to keep OTP flows safe and abuse-resistant.</p>
          </div>
          <div className="check-points-content"><img src="/images/features-otp-howitworks-check.svg" loading="lazy" alt="" />
            <p className="check-points-text">Authgear also supports multi-channel fallback, e.g., try WhatsApp first, then SMS. so you never strand a user.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="footer-section-none-form">
    <div className="w-layout-blockcontainer container-default w-container">
      <div className="footer-section-none-form-content-wrap">
        <div className="footer-section-none-form-content">
          <h2 className="footer-section-none-form-title">Ready to reduce costs and boost verification rates?Let’s ship WhatsApp OTP with Authgear</h2>
        </div>
        <div className="footer-section-none-form-cta-wrap">
          <a href="https://portal.authgear.com/?utm_source=feature-mfa&amp;utm_medium=link&amp;utm_campaign=start-for-free" target="_blank" className="footer-section-none-form-button w-button">Start for free</a>
          <Link href="/schedule-demo" className="footer-section-none-form-button inverse w-button">Get a Demo</Link>
        </div>
        <div className="w-layout-hflex footer-section-none-form-description-weapper"><img src="/images/features-hero-banner-check-purple.svg" loading="lazy" alt="" />
          <p className="footer-section-none-form-cta-description">Free plan includes <span className="text-span-45">unlimited MAUs</span></p>
        </div>
      </div>
    </div>
  </section>
    </>
  );
}
