import Link from 'next/link';

interface Props {
  locale: string;
}

export default function UserManagementPage(_props: Props) {
  return (
    <>
<div className="featurespage__hero_v2 featurespage__hero_bg no-bg">
    <div className="features-hero-wrapper-new inner-bg">
      <div className="split-content features-hero-left">
        <div className="feature-small-title">User Management</div>
        <h1 className="title features-hero-v2 text-white">User Management</h1>
        <p className="features-hero-description text-purple">Complete admin portal for managing users, with audit logs and analytics dashboards</p>
        <div className="features-hero-cta-wrapper">
          <a href="https://portal.authgear.com/?utm_source=feature-mfa&amp;utm_medium=link&amp;utm_campaign=start-for-free" target="_blank" className="button-primary feature-hero-btn-v2 featue-white-btn w-button">Start for Free</a>
          <Link href="/schedule-demo" target="_blank" className="button-secondary feature-hero-btn-v2 noscale text-white w-button">Get a Demo  <span className="text-span-23">{">"}</span></Link>
          <div className="w-layout-hflex features-hero-cta-description-weapper"><img src="/images/features-hero-banner-check-purple.svg" loading="lazy" alt="" />
            <p className="features-hero-cta-description text-purple">Free plan includes <span className="features-hero-cta-description-bold text-white">unlimited MAUs</span></p>
          </div>
        </div>
      </div><img src="/images/features-usermanagement-banner-kv2x.webp" srcSet="/images/features-usermanagement-banner-kv2x-p-500.webp 500w, /images/features-usermanagement-banner-kv2x-p-800.webp 800w, /images/features-usermanagement-banner-kv2x-p-1080.webp 1080w, /images/features-usermanagement-banner-kv2x.webp 1244w" width={738} sizes="(max-width: 767px) 100vw, 738px" alt="" className="image features-hero-image-v2" />
    </div>
  </div>
  <div>
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">Save time for IT support</h2>
          <p className="paragraph-large text-center features-page-v2">Empower ops and customer support teams to resolve user issues instantly, without waiting on engineering or backend access.</p>
        </div>
        <div className="_3-card-grid">
          <div id="w-node-_5bc72f82-9108-b0d2-f496-7452d72df879-8a5f0e75" className="svg-card">
            <div className="svg-card-image-container">
              <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48" fill="none">
                  <path d="M36.7293 11.2734L11.2734 36.7292" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M24 42C14.0582 42 6 33.9418 6 24C6 14.0601 14.0582 6 24 6C33.9418 6 42 14.0601 42 24C42 30.7238 38.3142 36.586 32.8526 39.6766" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg></div>
            </div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Take action immediately</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Temporarily block or remove users with one click when handling abuse, fraud, or urgent security cases.</div>
            </div>
          </div>
          <div id="w-node-_5bc72f82-9108-b0d2-f496-7452d72df881-8a5f0e75" className="svg-card">
            <div className="svg-card-image-container">
              <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48" fill="none">
                  <path d="M23.998 39.6656H15.5643C9.6681 39.6656 6 35.5032 6 29.6128V18.3809C6 12.4905 9.68562 8.32812 15.5643 8.32812H32.4338C38.33 8.32812 42 12.4905 42 18.3809V29.6128C42 35.5032 38.33 39.6656 32.4318 39.6656H30.564" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M16.7734 19.7656H23.4481M16.7734 28.2374H31.2319" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg></div>
            </div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Understand what’s going on</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">See recent user activities, login attempts, and active sessions in real-time to quickly troubleshoot issues.</div>
            </div>
          </div>
          <div id="w-node-_5bc72f82-9108-b0d2-f496-7452d72df889-8a5f0e75" className="svg-card">
            <div className="svg-card-image-container">
              <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48" fill="none">
                  <path d="M32.4356 6H15.5663C9.67006 6 6 10.1624 6 16.0528V31.9472C6 37.8376 9.67006 42 15.5682 42H32.4356C38.3318 42 42 37.8376 42 31.9472V16.0528C42 10.1624 38.3144 6 32.4356 6Z" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M14.1172 19.3281L16.0437 23.8856L20.5758 21.9688" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M16.3125 23.7704C16.4293 19.1935 20.183 15.5156 24.7988 15.5156C29.4826 15.5156 33.285 19.318 33.285 24.0018C33.285 28.6956 29.4826 32.4882 24.7988 32.4882C22.3158 32.4882 20.0876 31.4276 18.5328 29.7328" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg></div>
            </div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Resolve access issues confidently</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Help users reset passwords, unlock accounts, or set up 2FA without engineering assistance or touching sensitive systems.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="bg-f3f6ff">
    <div className="container-default wider-container-default">
      <div className="w-layout-vflex container-default-inner px-0 gap60">
        <div className="top-content feature-flex">
          <h2 className="title features-page-v2">Everything You Need to <br />Operate User Accounts</h2>
          <p className="paragraph-large text-center features-page-v2 margin-auto">Search and manage users, handle account recovery, track activity with audit logs, <br />and monitor authentication performance from one place.</p>
        </div>
        <div className="w-layout-hflex sms-left-right"><img src="/images/features-usermanagement-features-userdirectory.svg" loading="lazy" alt="" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">User directory</div>
            <div className="color-626262 line-height-24px">A centralized view of all users across apps and organizations. Search by name, email, or ID, view profiles and sessions, and disable or revoke access in one click.</div>
          </div>
        </div>
        <div className="w-layout-hflex sms-left-right reverse"><img src="/images/features-usermanagement-features-account-recovery.svg" loading="lazy" alt="" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">Account recovery and reset</div>
            <div className="color-626262 line-height-24px">Built-in flows for password resets and account unlocks. Help users regain access safely, with full audit tracking.</div>
          </div>
        </div>
        <div className="w-layout-hflex sms-left-right"><img src="/images/features-usermanagement-features-auditlogs.svg" loading="lazy" alt="" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">Audit logs</div>
            <div className="color-626262 line-height-24px">Track every user and admin action. Filter by actor, org, app, IP, or time to quickly answer “what happened?” and close tickets faster.</div>
          </div>
        </div>
        <div className="w-layout-hflex sms-left-right reverse"><img src="/images/features-usermanagement-features-dashboard.svg" loading="lazy" alt="" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">Analytics dashboards</div>
            <div className="color-626262 line-height-24px">View sign‑up and login conversion rates, and see which login methods work best. Spot friction points early to prevent support tickets.</div>
          </div>
        </div>
        <div className="w-layout-hflex sms-left-right"><img src="/images/features-usermanagement-features-admin-role.svg" loading="lazy" alt="" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">Delegated admin roles <br /><span className="text-span-47">(Coming Soon)</span></div>
            <div className="color-626262 line-height-24px">Assign limited admin permissions so teams can delegate safely while keeping control.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section className="footer-section-none-form">
    <div className="w-layout-blockcontainer container-default w-container">
      <div className="footer-section-none-form-content-wrap">
        <div className="footer-section-none-form-content">
          <h2 className="footer-section-none-form-title">Try out Authgear now</h2>
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
