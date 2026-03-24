import Link from 'next/link';

interface Props {
  locale: string;
}

export default function ExtensibilityPage(_props: Props) {
  return (
    <>
<div className="featurespage__hero_v2 featurespage__hero_bg no-bg">
    <div className="features-hero-wrapper-new inner-bg">
      <div className="split-content features-hero-left">
        <div className="feature-small-title">Extensibility</div>
        <h1 className="title features-hero-v2 text-white">Make Auth Yours</h1>
        <p className="features-hero-description text-purple">Tailored your authentication system with our developer-centric solution.</p>
        <div className="features-hero-cta-wrapper">
          <a href="https://portal.authgear.com/?utm_source=feature-mfa&amp;utm_medium=link&amp;utm_campaign=start-for-free" target="_blank" className="button-primary feature-hero-btn-v2 featue-white-btn w-button">Start for Free</a>
          <Link href="/schedule-demo" target="_blank" className="button-secondary feature-hero-btn-v2 noscale text-white w-button">Get a Demo  <span className="text-span-23">{">"}</span></Link>
          <div className="w-layout-hflex features-hero-cta-description-weapper"><img src="/images/features-hero-banner-check-purple.svg" loading="lazy" alt="" />
            <p className="features-hero-cta-description text-purple">Free plan includes <span className="features-hero-cta-description-bold text-white">unlimited MAUs</span></p>
          </div>
        </div>
      </div><img src="/images/features-extensibility-banner-kv2x.webp" srcSet="/images/features-extensibility-banner-kv2x-p-500.webp 500w, /images/features-extensibility-banner-kv2x-p-800.webp 800w, /images/features-extensibility-banner-kv2x-p-1080.webp 1080w, /images/features-extensibility-banner-kv2x.webp 1244w" width={738} sizes="(max-width: 767px) 100vw, 738px" alt="" className="image features-hero-image-v2" />
    </div>
  </div>
  <section>
    <div className="container-default wider-container-default">
      <div className="container-default-inner px-0 gap-0 pb-0"></div>
      <div className="w-layout-hflex features-callout-card">
        <h1 className="title features-hero-v2 inverse nomargin">Why Extensibility Matters</h1>
        <div className="split-content features-hero-left nomargin">
          <p className="features-hero-description inverse">Every product has its unique rules — approvals, allowlists, risk checks. Authgear lgives developers the tools to build them cleanly with Hooks and the Admin API, so your team can focuses on the product.</p>
        </div>
      </div>
    </div>
  </section>
  <div className="bg-f3f6ff">
    <div className="container-default wider-container-default">
      <div className="w-layout-vflex container-default-inner px-0 gap60">
        <div className="top-content feature-flex">
          <h2 className="title features-page-v2">Blocking and Non-Blocking Authentication Hooks</h2>
          <p className="paragraph-large text-center features-page-v2 margin-auto">Control authentication behavior or trigger workflows with Hooks that run before, during, or after key user events.</p>
        </div>
        <div className="w-layout-hflex sms-left-right"><img src="/images/features-extensibility-hooks-12x.webp" loading="lazy" width={280} sizes="(max-width: 479px) 100vw, 280px" alt="" srcSet="/images/features-extensibility-hooks-12x-p-500.webp 500w, /images/features-extensibility-hooks-12x-p-800.webp 800w, /images/features-extensibility-hooks-12x.webp 1120w" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">Non-blocking hooks</div>
            <ul role="list" className="_2-block-flex-content-list">
              <li className="_2-block-flex-content-list-item line-height-24px">Get notified when something happens; run workflows in your systems while users continue.</li>
              <li className="_2-block-flex-content-list-item line-height-24px"><span className="code-label">user.created</span>, <span className="code-label">user.profile.updated</span>, <span className="code-label">user.authenticated</span>, <span className="code-label">user.disabled</span>, <span className="code-label">user.reenabled</span>, etc.</li>
            </ul>
          </div>
        </div>
        <div className="w-layout-hflex sms-left-right reverse"><img src="/images/features-extensibility-hooks-22x.webp" loading="lazy" width={280} sizes="(max-width: 479px) 100vw, 280px" alt="" srcSet="/images/features-extensibility-hooks-22x-p-500.webp 500w, /images/features-extensibility-hooks-22x-p-800.webp 800w, /images/features-extensibility-hooks-22x-p-1080.webp 1080w, /images/features-extensibility-hooks-22x.webp 1120w" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">Blocking hooks</div>
            <ul role="list" className="_2-block-flex-content-list">
              <li className="_2-block-flex-content-list-item line-height-24px">Intercept a flow and decide what happens next</li>
              <li className="_2-block-flex-content-list-item line-height-24px"><span className="code-label">user.pre_created</span>, <span className="code-label">user.profile.pre_updated</span>, <span className="code-label">user.pre_schedule_deletion</span>, <span className="code-label">oidc.jwt.pre_create</span>, etc.</li>
            </ul>
          </div>
        </div>
        <div className="w-layout-hflex sms-left-right"><img src="/images/features-extensibility-hooks-32x.webp" loading="lazy" width={560} sizes="(max-width: 767px) 100vw, 560px" alt="" srcSet="/images/4baaeb37e3dc49d716925e6d451e0434_features-extensibility-hooks-32x-p-500.webp 500w, /images/4baaeb37e3dc49d716925e6d451e0434_features-extensibility-hooks-32x-p-800.webp 800w, /images/features-extensibility-hooks-32x.webp 1120w" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">What you can build</div>
            <ul role="list" className="_2-block-flex-content-list">
              <li className="_2-block-flex-content-list-item line-height-24px"><strong>Allowlist &amp; signup windows </strong><br />Only permit signups from approved IPs/domains or during business hours.</li>
              <li className="_2-block-flex-content-list-item line-height-24px"><strong>Token enrichment </strong><br />Add custom claims to ID/Access tokens at issuance.</li>
              <li className="_2-block-flex-content-list-item line-height-24px"><strong>Get notifieProfile governance </strong><br />Validate or transform attributes before they are saved.d when something happens; run workflows in your systems while users continue.</li>
              <li className="_2-block-flex-content-list-item line-height-24px"><strong>Lifecycle automation</strong><br />Fire webhooks on user signup to open tickets, sync CRM.</li>
            </ul>
          </div>
        </div>
        <div className="features-flex-container gap-40 reverse-order reverse-again">
          <div className="solution-image-block"><img src="/images/features-extensibility-adminapi2x.webp" loading="lazy" width={624} sizes="(max-width: 767px) 100vw, 624px" alt="" srcSet="/images/features-extensibility-adminapi2x-p-500.webp 500w, /images/features-extensibility-adminapi2x-p-800.webp 800w, /images/features-extensibility-adminapi2x-p-1080.webp 1080w, /images/features-extensibility-adminapi2x.webp 1248w" className="image-radius-24" /></div>
          <div className="features-text-block p-0">
            <h3 className="features-h3-dark">Admin API</h3>
            <div className="color-626262 line-height-24px">Everything you can do in the Management Portal is available via Admin API, so ops can scale with code. Provision users, update roles/groups, manage sessions, pull analytics, and export audit logs.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="featurespage__section_dark-bg">
    <div className="container-default">
      <div className="container-default-inner">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2 color-white">Developer Experience</h2>
        </div>
        <div className="_3-card-grid">
          <div id="w-node-_24dbdd33-ea46-35fe-636c-ea85533056e6-14796d40" className="svg-card">
            <div className="svg-card-image-container">
              <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48" fill="none">
                  <path d="M23.7344 32.3334C28.6532 34.2994 34.4812 33.297 38.4638 29.3146C42.4598 25.3184 43.4622 19.4632 41.4574 14.5579L34.658 21.3574C34.0442 21.9692 33.166 22.2374 32.3152 22.0702L29.1058 21.435C28.0744 21.231 27.2662 20.4248 27.0602 19.3933L26.4192 16.1723C26.2482 15.3195 26.5162 14.4394 27.1302 13.8256L33.9276 7.02814C31.1964 5.92248 28.1806 5.73562 25.3544 6.47218" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M19.1716 10.0234C15.1892 14.0059 14.1867 19.834 16.1644 24.7664L8.02844 32.9024C5.88374 35.049 5.9323 38.5768 8.22078 40.6556C10.3713 42.6098 13.7555 42.3146 15.8108 40.2612L19.7729 36.2982" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg></div>
            </div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px size-22">Build fast with SDKs</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262">JavaScript/TypeScript (web &amp; SPA), iOS (Swift), Android (Kotlin), React Native, Flutter,…</div>
            </div>
          </div>
          <div id="w-node-_24dbdd33-ea46-35fe-636c-ea85533056ee-14796d40" className="svg-card">
            <div className="svg-card-image-container">
              <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48" fill="none">
                  <path d="M13.6368 29.1445L9.98688 30.9007C8.13598 31.7631 8.03784 34.3751 9.81878 35.3755L20.3124 41.2711C22.8324 42.6871 25.9012 42.6871 28.4212 41.2711" stroke="#0043E0" strokeWidth="3" strokeLinecap="round"></path>
                  <path d="M35.3473 29.0039L38.9705 30.8463C40.7639 31.7491 40.8215 34.3045 39.0707 35.2883L33.7461 38.2797" stroke="#0043E0" strokeWidth="3" strokeLinecap="round"></path>
                  <path d="M35.2074 20.1788L38.4874 21.9532L39.2884 22.4032C40.9946 23.3618 40.9946 25.8332 39.2884 26.7918L28.4224 32.8966C25.9024 34.3124 22.8336 34.3124 20.3136 32.8966L9.44763 26.7918C7.74141 25.8332 7.74141 23.3618 9.44763 22.4032L10.2485 21.9532L13.4408 20.125" stroke="#31B7FF" strokeWidth="3"></path>
                  <path d="M28.4224 7.39782C25.9024 5.98198 22.8336 5.98198 20.3136 7.3978L9.44763 13.5026C7.74141 14.4612 7.74141 16.9326 9.44763 17.8912L20.3136 23.996C22.8336 25.4118 25.9024 25.4118 28.4224 23.996L39.2884 17.8912C40.9946 16.9326 40.9946 14.4612 39.2884 13.5026L33.8554 10.4502" stroke="#0043E0" strokeWidth="3" strokeLinecap="round"></path>
                </svg></div>
            </div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px size-22">Extend Functions with Hooks</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262">TypeScript or Webhooks</div>
            </div>
          </div>
          <div id="w-node-_24dbdd33-ea46-35fe-636c-ea85533056f6-14796d40" className="svg-card">
            <div className="svg-card-image-container">
              <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48" fill="none">
                  <path d="M12.689 13.1016H12.5781M17.6603 13.1016H17.5494M22.6336 13.1016H22.5226" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M17.6094 23.8125V41.9009" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M17.6758 29.4766H36.7952" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M36.1526 18.9844H6" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M6 31.9472C6 37.8376 9.67006 42 15.5663 42H32.4338C38.3318 42 42 37.8376 42 31.9472V16.0528C42 10.1624 38.3318 6 32.4356 6H15.5663C9.68756 6 6 10.1624 6 16.0528V24" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg></div>
            </div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px size-22">Automate operations with Admin API</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262">Provision users, assign roles, and query logs programmatically</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section className="footer-section-none-form">
    <div className="w-layout-blockcontainer container-default w-container">
      <div className="footer-section-none-form-content-wrap">
        <div className="footer-section-none-form-content">
          <h2 className="footer-section-none-form-title">Start building authentication that fits your logic, your stack, your users</h2>
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
