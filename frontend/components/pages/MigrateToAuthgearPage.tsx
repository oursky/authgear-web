import ContactForm from '@/components/ContactForm';

interface Props {
  locale: string;
}

export default async function MigrateToAuthgearPage({ locale: _locale }: Props) {
  return (
    <>
      <div className="page-wrapper">
          <div className="section migrate-hero bg-abstract-blue">
            <div className="container-1440">
              <div className="home-hero-wrapper">
                <div className="container-medium-908px home-hero">
                  <div className="featuretag mb-20">
                    <div className="featuretag-label">Migrate to Authgear</div>
                  </div>
                  <h1 className="heading herotag color-white ibm-plex-sans migrate-to-authgear">Migrate to Authgear:  Get 6 Months Free &amp; Worry-Free Migration</h1>
                  <p className="paragraph-large home-hero color-white ibm-plex-sans">Stop struggling with your current authentication system. Migrate to Authgear for a seamless and secure experience. Get 6 months free to see the difference, with full support from our expert team.</p>
                </div>
                <div className="home-hero-img-wrapper">
                  <a href="https://demo.authgear.com/" target="_blank" className="home-hero-kv-container w-inline-block"><img src="/images/migratetoauthgear_kv2x.webp" loading="lazy" sizes="(max-width: 1300px) 100vw, 1300px" srcSet="/images/migratetoauthgear_kv2x-p-500.webp 500w, /images/migratetoauthgear_kv2x-p-800.webp 800w, /images/migratetoauthgear_kv2x-p-1080.webp 1080w, /images/migratetoauthgear_kv2x.webp 1300w" alt="" className="image-9" /></a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="container-default content-center">
              <div className="container-default-inner">
                <h2 className="text-center mg-bottom-16px top-content-title ibm-plex-sans color-body">Here's what <span className="color-gradient">makes our offer unbeatable</span></h2>
                <div className="_2-card-grid">
                  <div className="svg-card">
                    <div className="svg-card-image-container"><img src="/images/migratetoauthgear_icon-01.svg" loading="lazy" alt="" /></div>
                    <div className="svg-card-content-container">
                      <div className="svg-card-content-title">Free Trial Starts When You Use It</div>
                      <div className="svg-card-content-description">No need to worry about a ticking clock. Your 6-month free trial begins when you actually start using Authgear, not from the day you sign up. Take your time, explore the features, and migrate at your own pace.</div>
                    </div>
                  </div>
                  <div className="svg-card">
                    <div className="svg-card-image-container"><img src="/images/migratetoauthgear_icon-02.svg" loading="lazy" alt="" /></div>
                    <div className="svg-card-content-container">
                      <div className="svg-card-content-title">Dedicated Support Throughout the Migration</div>
                      <div className="svg-card-content-description">Our product manager (PM) and developer team will be by your side throughout the entire migration process. They'll handle the heavy lifting, answer your questions, and ensure a smooth transition.</div>
                    </div>
                  </div>
                  <div className="svg-card">
                    <div className="svg-card-image-container"><img src="/images/migratetoauthgear_icon-03.svg" loading="lazy" alt="" /></div>
                    <div className="svg-card-content-container">
                      <div className="svg-card-content-title">6-Month Extension if We Don't Meet Your Deadline</div>
                      <div className="svg-card-content-description">We're confident in our migration expertise. But if, for any reason, we can't complete your migration within 3 months, we'll extend your free trial by an additional 6 months. That's our commitment to your success.</div>
                    </div>
                  </div>
                  <div className="svg-card">
                    <div className="svg-card-image-container"><img src="/images/migratetoauthgear_icon-04.svg" loading="lazy" alt="" /></div>
                    <div className="svg-card-content-container">
                      <div className="svg-card-content-title">Satisfaction Guaranteed or We'll Help You Move Out</div>
                      <div className="svg-card-content-description">If you're not completely satisfied with Authgear after your trial, don't worry. We'll help you migrate back to your old system at no additional cost. We want you to be happy, and we're confident you'll love the ease and security of Authgear.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-ebf3ff">
            <div className="container-default">
              <div className="container-default-inner">
                <div className="top-content flex-column text-center">
                  <h2 className="text-center mg-bottom-16px top-content-title ibm-plex-sans color-body">Who is this for?</h2>
                  <div className="top-content-description ibm-plex-sans">This program is ideal for organizations looking to upgrade their authentication system, particularly those with:</div>
                </div>
                <div className="_2-card-grid">
                  <div className="svg-card">
                    <div className="svg-card-image-container center"><img src="/images/migratetoauthgear_who-icon-mau.svg" loading="lazy" alt="" /></div>
                    <div className="svg-card-content-container text-center">
                      <div className="svg-card-content-title">10,000 or more monthly active users</div>
                      <div className="svg-card-content-description">If your organization has a large and active user base, Authgear can handle your authentication needs efficiently and securely.</div>
                    </div>
                  </div>
                  <div className="svg-card">
                    <div className="svg-card-image-container center"><img src="/images/migratetoauthgear_who-icon-enterprise.svg" loading="lazy" alt="" /></div>
                    <div className="svg-card-content-container text-center">
                      <div className="svg-card-content-title">Extended enterprise needs with 1,000 or more users</div>
                      <div className="svg-card-content-description">Authgear can scale to support complex enterprise environments with a high volume of users.</div>
                    </div>
                  </div>
                </div>
                <div className="top-content flex-column text-center">
                  <div className="section-bottom-title mb-16">Don't worry if your organization doesn't currently meet these requirements!</div>
                  <div className="top-content-description ibm-plex-sans">We're passionate about supporting startups and early-stage businesses. We encourage you to contact us to discuss your specific needs and explore alternative solutions.</div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-form-section new-bg">
            <div className="container-default">
              <div className="container-default-inner">
                <div className="_2-block-flex footer-form bg-white radius-24px p-60">
                  <div className="_2-block-flex-content footer-form">
                    <div className="_2-block-flex-content-text-wrap footer-form">
                      <h2 className="form-heading footer-form ibm-plex-sans color-000">Ready to Migrate to a <span className="color-gradient">Seamless &amp; Secure Authentication System?</span></h2>
                      <div className="form-description ibm-plex-sans">Tell us a little about yourself and your migration needs. Our team will be in touch to answer your questions and get you started.</div>
                    </div>
                  </div>
                  <div className="_2-block-flex-image footer-form">
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

    </>
  );
}
