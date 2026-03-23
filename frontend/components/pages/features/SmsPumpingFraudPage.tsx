import Link from 'next/link';

interface Props {
  locale: string;
}

export default function SmsPumpingFraudPage({ locale }: Props) {
  return (
    <>
<div className="featurespage__hero_v2 featurespage__hero_bg inverse">
    <div className="features-hero-wrapper-new">
      <div className="split-content features-hero-left">
        <div className="coming-soon">Coming Soon</div>
        <div className="featurespage__hero-titletag inverse">SMS Pumping Protection</div>
        <h1 className="title features-hero-v2 inverse">Protect Your Business from SMS Pumping Fraud</h1>
        <p className="features-hero-description inverse">Safeguard your SMS authentication channels from costly fraud with Authgear&#x27;s advanced SMS Pumping Detection. Our intelligent system identifies suspicious patterns and stops attacks before they drain your budget.</p>
        <div className="features-hero-cta-wrapper">
          <a href="https://portal.authgear.com/?utm_source=feature-sms-pumping&amp;utm_medium=link&amp;utm_campaign=start-for-free" target="_blank" className="button-primary feature-hero-btn-v2 w-button">Start for Free</a>
          <Link href="/schedule-demo" target="_blank" className="button-secondary feature-hero-btn-v2 noscale inverse w-button">Schedule Demo  <span className="text-span-23">&gt;</span></Link>
        </div>
      </div><img src="/images/features-SMSfraud-hero-kv.svg" alt="" className="image features-hero-image-v2" />
    </div>
  </div>
  <div className="bg-f9f9fb">
    <div className="container-default wider-container-default">
      <div className="container-default-inner px-0 gap-0 pb-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">The Hidden Threat of SMS Pumping Fraud</h2>
          <p className="paragraph-large text-center features-page-v2 margin-auto">SMS pumping fraud is a sophisticated attack where bad actors exploit SMS-based authentication systems by generating excessive message traffic using fake or automated phone numbers. This artificial traffic inflation can cost businesses millions in fraudulent charges while degrading legitimate user experiences.</p>
        </div>
        <div className="w-layout-hflex case-study-card">
          <div className="w-layout-vflex flex-block-67">
            <div className="text-block-65">The Twitter Case Study: A $60 Million Lesson</div>
            <div className="text-block-66">In late 2022, Elon Musk revealed that Twitter was losing approximately $60 million annually due to SMS pumping fraud. The fraud was traced to 390 telecom operators that allowed bot accounts to exploit Twitter&#x27;s two-factor authentication system, generating fake SMS traffic to inflate their own revenue. This costly revelation highlights how even tech giants can fall victim to this growing threat.</div>
          </div><img src="/images/features-SMSfraud-X2x.jpg" loading="lazy" sizes="(max-width: 1400px) 100vw, 1400px" srcSet="/images/features-SMSfraud-X2x-p-500.jpg 500w, /images/features-SMSfraud-X2x-p-800.jpg 800w, /images/features-SMSfraud-X2x-p-1080.jpg 1080w, /images/features-SMSfraud-X2x.jpg 1400w" alt="" />
        </div>
      </div>
    </div>
  </div>
  <div>
    <div className="container-default wider-container-default">
      <div className="container-default-inner px-0 gap-0 pb-0">
        <div className="top-content feature-flex">
          <h2 className="title features-page-v2">How SMS Pumping Attacks<br />Devastate Businesses</h2>
        </div>
        <div className="features-flex-container gap-40 reverse-order reverse-again">
          <div className="solution-image-block"><img src="/images/features-SMSfraud-how-FinancialDrain.svg" loading="lazy" alt="" /></div>
          <div className="features-text-block p-0">
            <h3 className="features-h3-dark">Financial Drain</h3>
            <div className="gradient-divider"></div>
            <div className="color-626262 line-height-24px">SMS pumping attacks can rapidly deplete your messaging budget with fraudulent traffic. Companies hit by these atacks often pay between tens of thousands to millions of dollars each month in fake charges. When bad actors pump your website forms with fake numbers, your SMS costs increase significantly without any return on investment.</div>
          </div>
        </div>
        <div className="features-flex-container gap-40 reverse-again">
          <div className="solution-image-block"><img src="/images/features-SMSfraud-how-OperationalDisruption.svg" loading="lazy" alt="" /></div>
          <div className="features-text-block p-0">
            <h3 className="features-h3-dark">Operational Disruption</h3>
            <div className="gradient-divider"></div>
            <div className="color-626262 line-height-24px">Beyond direct costs, SMS pumping creates cascading problems throughout your business:</div>
            <ul role="list" className="_2-block-flex-content-list">
              <li className="_2-block-flex-content-list-item line-height-24px with-subcontent cross-icon">System Overload<br /><span className="list-subcontent">Surges in fraudulent traffic can overwhelm your authentication infrastructure</span></li>
              <li className="_2-block-flex-content-list-item line-height-24px with-subcontent cross-icon">Degraded User Experience<br /><span className="list-subcontent">Legitimate users face delays receiving their authentication codes</span></li>
              <li className="_2-block-flex-content-list-item line-height-24px with-subcontent cross-icon">Lowered Conversion Rates<br /><span className="list-subcontent">Your metrics become artificially deflated as fake &quot;users&quot; never convert</span></li>
              <li className="_2-block-flex-content-list-item line-height-24px with-subcontent cross-icon">Wasted Resources<br /><span className="list-subcontent">Your team spends valuable time investigating and addressing the fraud</span></li>
            </ul>
          </div>
        </div>
        <div className="features-flex-container gap-40 reverse-order reverse-again">
          <div className="solution-image-block"><img src="/images/features-SMSfraud-how-ReputationDamage.svg" loading="lazy" alt="" /></div>
          <div className="features-text-block p-0">
            <h3 className="features-h3-dark">Reputation Damage</h3>
            <div className="gradient-divider"></div>
            <div className="color-626262 line-height-24px">When authentication systems fail due to SMS pumping attacks, users lose trust in your platform. This erosion of confidence can have lasting impacts on your brand reputation and customer loyalty.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div className="container-default wider-container-default">
      <div className="container-default-inner px-0 gap-0 pb-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">Detecting SMS Pumping Fraud:<br />The Warning Signs</h2>
          <p className="paragraph-large text-center features-page-v2">Without proper monitoring tools, SMS pumping can be difficult to detect until significant damage is done. Here are key indicators that your business might be under attack:</p>
        </div>
        <div className="w-layout-hflex flex-block-68"><img src="/images/features-SMSfraud-WaringSigns.svg" loading="lazy" alt="" />
          <div className="faq2_component-2 _1060">
            <div className="faq2_accordion-2">
              <div className="faq2_question-2 first pumping-fraud-faq">
                <div className="div-block-18"><img loading="lazy" src="/images/arrow-icon.svg" alt="" className="faq2_icon-2 nospin" /></div>
                <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">Unusual Geographic Patterns</div><img src="/images/features-SMSfraud-WaringSigns-icon-geographic.svg" loading="lazy" width={48} height={48} alt="" className="sms-signs-icon" />
              </div>
              <div style={{height: "0px"}} className="faq2_answer">
                <div className="margin-bottom">
                  <div className="max-width-large once-faq">
                    <p className="referral-faq-a-2 pumping-fraud-faq-a">If you notice OTP requests coming from regions or countries where you don&#x27;t normally operate, this could signal fraudulent activity. Pay attention to successful OTP attempts from locations where you don&#x27;t have a legitimate customer base.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="faq2_accordion-2 margin-top-32">
              <div className="faq2_question-2 first pumping-fraud-faq">
                <div className="div-block-18"><img loading="lazy" src="/images/arrow-icon.svg" alt="" className="faq2_icon-2 nospin" /></div>
                <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">Suspicious Traffic Spikes</div><img src="/images/features-SMSfraud-WaringSigns-icon-traffic.svg" loading="lazy" alt="" className="sms-signs-icon" />
              </div>
              <div style={{height: "0px"}} className="faq2_answer">
                <div className="margin-bottom">
                  <div className="max-width-large once-faq">
                    <p className="referral-faq-a-2 pumping-fraud-faq-a">Sudden, unexplained surges in SMS traffic—especially for OTP requests—often indicate bot activity. Unless you&#x27;re running a promotion or campaign, these spikes warrant immediate investigation.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="faq2_accordion-2 margin-top-32">
              <div className="faq2_question-2 first pumping-fraud-faq">
                <div className="div-block-18"><img loading="lazy" src="/images/arrow-icon.svg" alt="" className="faq2_icon-2 nospin" /></div>
                <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">Sequential Number Patterns</div><img src="/images/features-SMSfraud-WaringSigns-icon-number.svg" loading="lazy" alt="" className="sms-signs-icon" />
              </div>
              <div style={{height: "0px"}} className="faq2_answer">
                <div className="margin-bottom">
                  <div className="max-width-large once-faq">
                    <p className="referral-faq-a-2 pumping-fraud-faq-a">One telltale sign of SMS pumping is receiving OTP requests from phone numbers with sequential patterns (e.g., numbers ending in 1000, 1001, 1002). The chance of multiple people with nearly identical phone numbers requesting OTPs simultaneously is virtually zero.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="faq2_accordion-2 margin-top-32">
              <div className="faq2_question-2 first pumping-fraud-faq">
                <div className="div-block-18"><img loading="lazy" src="/images/arrow-icon.svg" alt="" className="faq2_icon-2 nospin" /></div>
                <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">Declining Conversion Rates</div><img src="/images/features-SMSfraud-WaringSigns-icon-conversion.svg" loading="lazy" alt="" className="sms-signs-icon" />
              </div>
              <div style={{height: "0px"}} className="faq2_answer">
                <div className="margin-bottom">
                  <div className="max-width-large once-faq">
                    <p className="referral-faq-a-2 pumping-fraud-faq-a">A noticeable drop in OTP conversion rates can indicate that fraudsters are sending requests without completing the authentication process. If your typical conversion rate falls by 20% or more, SMS pumping could be the culprit.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="faq2_accordion-2 margin-top-32">
              <div className="faq2_question-2 first pumping-fraud-faq">
                <div className="div-block-18"><img loading="lazy" src="/images/arrow-icon.svg" alt="" className="faq2_icon-2 nospin" /></div>
                <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">Rapidly Depleting SMS Budget</div><img src="/images/features-SMSfraud-WaringSigns-icon-budget.svg" loading="lazy" alt="" className="sms-signs-icon" />
              </div>
              <div style={{height: "0px"}} className="faq2_answer">
                <div className="margin-bottom">
                  <div className="max-width-large once-faq">
                    <p className="referral-faq-a-2 pumping-fraud-faq-a">If you&#x27;re burning through your SMS budget faster than usual, it&#x27;s likely that SMS pumping is affecting your business. This is often the most painful symptom that finally triggers investigation.</p>
                  </div>
                </div>
              </div>
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
          <h2 className="title features-page-v2">Introducing Authgear&#x27;s<br />SMS Pumping Detection</h2>
          <p className="paragraph-large text-center features-page-v2 margin-auto">Our advanced detection system uses machine learning algorithms to identify and block fraudulent SMS traffic before it impacts your business. Unlike basic security measures, our solution provides comprehensive protection against sophisticated SMS pumping attacks.</p>
        </div>
        <div className="w-layout-hflex sms-left-right"><img src="/images/features-SMSfraud-features-RealTime.svg" loading="lazy" alt="" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">Real-Time Monitoring</div>
            <div className="color-626262 line-height-24px">Our system continuously analyzes your SMS traffic patterns to detect anomalies that indicate potential fraud attempts.</div>
          </div>
        </div>
        <div className="w-layout-hflex sms-left-right reverse"><img src="/images/features-SMSfraud-features-IntelligentPatternRecognition.svg" loading="lazy" alt="" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">Intelligent Pattern Recognition</div>
            <div className="color-626262 line-height-24px">Advanced algorithms identify suspicious behaviors such as sequential number requests, geographic anomalies, and unusual traffic spikes.</div>
          </div>
        </div>
        <div className="w-layout-hflex sms-left-right"><img src="/images/features-SMSfraud-features-AutomatedThreatResponse.svg" loading="lazy" alt="" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">Automated Threat Response</div>
            <div className="color-626262 line-height-24px">When potential fraud is detected, our system automatically alerts administrators and takes immediate action to prevent further damage.</div>
          </div>
        </div>
        <div className="w-layout-hflex sms-left-right reverse"><img src="/images/features-SMSfraud-features-CustomizableSecurityPolicies.svg" loading="lazy" alt="" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">Customizable Security Policies</div>
            <div className="color-626262 line-height-24px">Detect bots and abnormal clients with advanced, privacy-respecting techniques such as JA4 fingerprinting and PoW challenges to create a custom blocklist and rate limit policy</div>
          </div>
        </div>
        <div className="w-layout-hflex sms-left-right"><img src="/images/features-SMSfraud-features-DetailedAnalyticsDashboard.svg" loading="lazy" alt="" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">Detailed Analytics Dashboard</div>
            <div className="color-626262 line-height-24px">Gain visibility into your SMS traffic with comprehensive reporting and visualization tools.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="bg-f3f6ff">
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">Why Choose Authgear for<br />SMS Pumping Protection?</h2>
        </div>
        <div className="_2-card-grid gap-32 mb-40 _2-rows">
          <div id="w-node-ab065274-56a3-587d-2df4-75ff4e52d6d5-3eea4af0" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-SMSfraud-why-security.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Comprehensive Security Approach</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Authgear&#x27;s SMS Pumping Detection is part of our holistic security ecosystem that includes multi-factor authentication, breached password detection, and bot protection. This integrated approach provides defense-in-depth against evolving threats.</div>
            </div>
          </div>
          <div id="w-node-ab065274-56a3-587d-2df4-75ff4e52d6dd-3eea4af0" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/b2b-saas-why-customized.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Seamless Integration</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Our solution integrates smoothly with your existing authentication infrastructure, requiring minimal changes to your current setup.</div>
            </div>
          </div>
          <div id="w-node-f3362fce-81ce-e37b-862e-afd3f1ab873a-3eea4af0" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-SMSfraud-why-ux.svg" loading="lazy" width={48} alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">User Experience Focus</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">While enhancing security, we maintain a frictionless authentication experience for legitimate users, ensuring protection doesn&#x27;t come at the cost of usability.</div>
            </div>
          </div>
          <div id="w-node-_7dcc6254-c236-0d2a-6aec-2b64a8f8b29f-3eea4af0" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-SMSfraud-WaringSigns-icon-budget.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Cost Savings</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">By preventing fraudulent SMS traffic, our solution helps you avoid unexpected charges and protect your authentication budget.</div>
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
              <h2 className="form-heading color-white footer-form">Ready to Protect Your Business?</h2>
              <div className="color-cee9ff">Don&#x27;t wait until SMS pumping fraud impacts your bottom line. Request a demo today for Authgear&#x27;s SMS Pumping Detection and implement this powerful protection for your business.</div>
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
                <div data-sitekey="6LdonPYqAAAAAGzNsg7cDyHi5VTueApPzHoOx0Y4" className="w-form-formrecaptcha g-recaptcha g-recaptcha-error g-recaptcha-disabled"></div>
                <div className="margin-vertical margin-medium"><input type="submit" data-wait="Please wait..." className="getdemo-submit plausible-event-name--contact-form-submit w-button" value="Submit" /></div>
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
    </>
  );
}
