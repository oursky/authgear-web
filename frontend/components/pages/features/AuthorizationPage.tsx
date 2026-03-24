import Link from 'next/link';

interface Props {
  locale: string;
}

export default function AuthorizationPage(_props: Props) {
  return (
    <>
<div className="featurespage__hero_v2 featurespage__hero_bg no-bg">
    <div className="features-hero-wrapper-new inner-bg">
      <div className="split-content features-hero-left">
        <div className="feature-small-title">Authorization</div>
        <h1 className="title features-hero-v2 text-white">Authorization and access management</h1>
        <p className="features-hero-description text-purple">Fine-grained access control built for your users, teams and products</p>
        <div className="features-hero-cta-wrapper">
          <a href="https://portal.authgear.com/?utm_source=feature-mfa&amp;utm_medium=link&amp;utm_campaign=start-for-free" target="_blank" className="button-primary feature-hero-btn-v2 featue-white-btn w-button">Start for Free</a>
          <Link href="/schedule-demo" target="_blank" className="button-secondary feature-hero-btn-v2 noscale text-white w-button">Get a Demo  <span className="text-span-23">{">"}</span></Link>
          <div className="w-layout-hflex features-hero-cta-description-weapper"><img src="/images/features-hero-banner-check-purple.svg" loading="lazy" alt="" />
            <p className="features-hero-cta-description text-purple">Free plan includes <span className="features-hero-cta-description-bold text-white">unlimited MAUs</span></p>
          </div>
        </div>
      </div><img src="/images/features-authorization-hero-banner2x.webp" srcSet="/images/features-authorization-hero-banner2x-p-500.webp 500w, /images/features-authorization-hero-banner2x-p-800.webp 800w, /images/features-authorization-hero-banner2x-p-1080.webp 1080w, /images/features-authorization-hero-banner2x.webp 1244w" width={738} sizes="(max-width: 767px) 100vw, 738px" alt="" className="image features-hero-image-v2" />
    </div>
  </div>
  <section>
    <div className="container-default wider-container-default">
      <div className="container-default-inner px-0 gap-0 pb-0"></div>
      <div className="w-layout-hflex features-callout-card">
        <h1 className="title features-hero-v2 inverse nomargin">Why<br />Authgear</h1>
        <div className="split-content features-hero-left nomargin">
          <p className="features-hero-description inverse">With growing user bases and complex apps, managing who can do what is critical.<br />Roles &amp; Groups let you shift from per-user permissions to a scalable model where you manage roles once, then assign at scale.</p>
          <div className="features-hero-cta-wrapper in-ready-to-switch">
            <Link href="/schedule-demo" target="_blank" className="button-primary feature-hero-btn-v2 nomargin w-button">Talk to us</Link>
            <a href="https://accounts.portal.authgear.com/signup" target="_blank" className="button-secondary feature-hero-btn-v2 noscale button-secondary-with-boarder inverse w-button">Start for Free</a>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div className="bg-f3f6ff bg-f9f9fb">
    <div className="container-default wider-container-default">
      <div className="w-layout-vflex container-default-inner px-0 gap60">
        <div className="top-content feature-flex">
          <h2 className="title features-page-v2">Centralized Authorization with Roles and Groups</h2>
        </div>
        <div className="w-layout-hflex sms-left-right"><img src="/images/features-authorization-content-roles.svg" loading="lazy" alt="" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">Roles</div>
            <div className="color-626262 line-height-24px">Define roles and assign roles to users directly. Roles are included in UserInfo / JWT claims so your app has the context to enforce permissions.</div>
          </div>
        </div>
        <div className="w-layout-hflex sms-left-right reverse"><img src="/images/features-authorization-content-groups.svg" loading="lazy" alt="" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">Groups</div>
            <div className="color-626262 line-height-24px">Create groups that bundle one or more roles. Add users to groups; they inherit the roles of that group. Simplifies bulk-permission management.</div>
          </div>
        </div>
        <div className="w-layout-hflex sms-left-right"><img src="/images/features-authorization-content-audit.svg" loading="lazy" alt="" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">Audit-ready</div>
            <div className="color-626262 line-height-24px">Manage roles/groups and see who has what role in a central place. Position for governance, compliance and least-privilege access as you scale.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section className="footer-section-none-form">
    <div className="w-layout-blockcontainer container-default w-container">
      <div className="footer-section-none-form-content-wrap">
        <div className="footer-section-none-form-content">
          <h2 className="footer-section-none-form-title">Ready to simplify access control and scale your authorization model?</h2>
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
