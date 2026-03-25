import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

interface Props {
  locale: string;
}

export default function MachineToMachineTokenPage(_props: Props) {
  return (
    <>
<div className="featurespage__hero_v2 featurespage__hero_bg inverse">
    <div className="features-hero-wrapper-new">
      <div className="split-content features-hero-left">
        <div className="featurespage__hero-titletag inverse">Machine-to-Machine Token</div>
        <h1 className="title features-hero-v2 inverse">Secure Machine-to-Machine (M2M) Authentication with Authgear</h1>
        <p className="features-hero-description inverse">Enable seamless service-to-service communication with short-lived, scoped access tokens.<strong> </strong>Authgear’s Machine-to-Machine (M2M) tokens let backend services, APIs, and IoT devices authenticate securely without human intervention — all powered by the industry-standard OAuth 2.0 Client Credentials Flow.</p>
        <div className="features-hero-cta-wrapper">
          <a href="https://portal.authgear.com/?utm_source=feature-m2m&amp;utm_medium=link&amp;utm_campaign=start-for-free" target="_blank" className="button-primary feature-hero-btn-v2 w-button">Start for Free</a>
          <Link href="/schedule-demo" target="_blank" className="button-secondary feature-hero-btn-v2 noscale inverse w-button">Schedule Demo  <span className="text-span-23">{">"}</span></Link>
        </div>
      </div>
      <div className="lottie-hero-banner">
        <div className="lottie-hero-animation" data-animation-type="lottie" data-src="../documents/features-M2M-hero-kv.json" data-loop="0" data-direction="1" data-autoplay="1" data-is-ix2-target="0" data-renderer="svg" data-default-duration="0"></div>
      </div>
    </div>
  </div>
  <div className="m2m-empower-dark">
    <div className="container-default wider-container-default">
      <div className="container-default-inner px-0 gap-0 pb-0">
        <div className="top-content feature-flex">
          <h2 className="title-light features-page-v2">What is Machine-to-Machine (M2M) Authentication?</h2>
          <div className="centered-container">
            <p className="color-white text-center">Machine-to-machine (M2M) authentication is the process of allowing two applications or services to communicate securely without a user present. <br />Instead of passwords or API keys, each service uses its own Client ID and Client Secret to request a short-lived access token.This ensures secure, auditable, and revocable service-to-service authentication, widely used in backend integrations, microservices, and IoT systems.</p>
            <a href="https://docs.authgear.com/get-started/m2m-applications" target="_blank" className="gallery-button gallery-page-button w-button">Read our docs</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="bg-f9f9fb">
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0">
        <div className="top-content feature-flex mb-60">
          <h2 className="title features-page-v2">Benefits of using M2M tokens</h2>
        </div>
        <div className="_3-card-grid">
          <div id="w-node-_6b3e18e8-0e3a-dfe6-0b3f-4dd97161ad6d-40064312" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-selfserve-cx-security.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Improved Security</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Uses short-lived, revocable tokens instead of long-term static credentials.</div>
            </div>
          </div>
          <div id="w-node-_51a5bd21-d5d2-7350-de31-ab29eb4abb3a-40064312" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-M2M-benefits-automated.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Fully Automated</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Enables systems to authenticate without human input.</div>
            </div>
          </div>
          <div id="w-node-_931c3212-78e9-ce11-0812-273d9b3cead5-40064312" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-M2M-benefits-accesscontrol.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Fine-Grained Access Control</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Limit machine access to only the necessary resources.</div>
            </div>
          </div>
          <div id="w-node-_6b3e18e8-0e3a-dfe6-0b3f-4dd97161ad75-40064312" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-M2M-benefits-scalable.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Highly Scalable</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Handles a large fleet of devices or services and requests with ease.</div>
            </div>
          </div>
          <div id="w-node-_6b3e18e8-0e3a-dfe6-0b3f-4dd97161ad7d-40064312" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-M2M-benefits-comliance.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Regulatory Compliance and Auditability</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Tracks when and how machines access resources.</div>
            </div>
          </div>
          <div id="w-node-_6b3e18e8-0e3a-dfe6-0b3f-4dd97161ad85-40064312" className="svg-card">
            <div className="svg-card-image-container"><img src="/images/features-M2M-benefits-tools.svg" loading="lazy" alt="" /></div>
            <div className="svg-card-content-container text-center gap-16">
              <div className="svg-card-content-title left inter color-2e2e2e mobile-20px">Industry Standard Protocols</div>
              <div className="svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Compatible with established frameworks like OAuth 2.0 and JWT.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div className="container-default wider-container-default">
      <div className="container-default-inner px-0 gap-0 pb-0">
        <div className="top-content feature-flex">
          <h2 className="title features-page-v2">Common Use Cases</h2>
        </div>
        <div className="features-flex-container gap-40 reverse-order reverse-again">
          <div className="solution-image-block"><img src="/images/features-M2M-usercase-backends.svg" loading="lazy" alt="" /></div>
          <div className="features-text-block p-0">
            <h3 className="features-h3-dark">Application Backends</h3>
            <div className="gradient-divider"></div>
            <div className="color-626262 line-height-24px">Securely transfer data, logs, or files between internal and external services.</div>
          </div>
        </div>
        <div className="features-flex-container gap-40 reverse-again">
          <div className="solution-image-block"><img src="/images/features-M2M-usercase-clitools.svg" loading="lazy" alt="" /></div>
          <div className="features-text-block p-0">
            <h3 className="features-h3-dark">CLI Tools</h3>
            <div className="gradient-divider"></div>
            <div className="color-626262 line-height-24px">Let command-line tools securely access APIs using short-lived, scoped tokens.</div>
          </div>
        </div>
        <div className="features-flex-container gap-40 reverse-order reverse-again">
          <div className="solution-image-block"><img src="/images/features-M2M-usercase-scheduled.svg" loading="lazy" alt="" /></div>
          <div className="features-text-block p-0">
            <h3 className="features-h3-dark">Scheduled Jobs &amp; Daemons</h3>
            <div className="gradient-divider"></div>
            <div className="color-626262 line-height-24px">Authorize cronjobs, job schedulers, and background workers to interact with APIs safely and efficiently.</div>
          </div>
        </div>
        <div className="features-flex-container gap-40 reverse-again">
          <div className="solution-image-block"><img src="/images/features-M2M-usercase-iot.svg" loading="lazy" alt="" /></div>
          <div className="features-text-block p-0">
            <h3 className="features-h3-dark">IoT Devices</h3>
            <div className="gradient-divider"></div>
            <div className="color-626262 line-height-24px">Enable smart devices to send data to your cloud services automatically for telemetry or commands, with each device authenticated and scoped individually.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="bg-f3f6ff bg-f9f9fb">
    <div className="container-default wider-container-default">
      <div className="w-layout-vflex container-default-inner px-0 gap60">
        <div className="top-content feature-flex">
          <h2 className="title features-page-v2">How it Works</h2>
        </div>
        <div className="w-layout-hflex sms-left-right"><img src="/images/features-M2M-how-register-resources.svg" loading="lazy" alt="" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">Register Your Resources</div>
            <div className="color-626262 line-height-24px">Add APIs to Authgear and define the scopes (permissions) for each of them</div>
          </div>
        </div>
        <div className="w-layout-hflex sms-left-right reverse"><img src="/images/features-M2M-how-register-application.svg" loading="lazy" alt="" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">Register Your Application</div>
            <div className="color-626262 line-height-24px">Create a client application for each backend, device, or tool that needs API access. Assign the resources and scopes available to the service</div>
          </div>
        </div>
        <div className="w-layout-hflex sms-left-right"><img src="/images/features-M2M-how-obtain.svg" loading="lazy" alt="" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">Obtain Credentials</div>
            <div className="color-626262 line-height-24px">Each application receives a unique client ID and secret</div>
          </div>
        </div>
        <div className="w-layout-hflex sms-left-right reverse"><img src="/images/features-M2M-how-token.svg" loading="lazy" alt="" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">Request a Token</div>
            <div className="color-626262 line-height-24px">The application authenticates with Authgear using the <code>/oauth/token</code> endpoint, and receives a short-lived access token, containing only the scopes you’ve assigned.</div>
          </div>
        </div>
        <div className="w-layout-hflex sms-left-right"><img src="/images/features-M2M-how-access-api.svg" loading="lazy" alt="" className="features-card-image-radius" />
          <div className="features-text-block p-0 gap16">
            <div className="faq-accordion-question referral-faq-q pumping-fraud-faq">Access Protected APIs</div>
            <div className="color-626262 line-height-24px">The service uses the bearer token in the Authorization header to call your APIs</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section className="bg-f3f6ff">
    <div className="container-default">
      <div className="container-default-inner px-0 gap-0 pb-0">
        <div className="top-content feature-flex">
          <h2 className="title features-page-v2">Frequently Asked Questions (FAQ)</h2>
        </div>
        <div className="tools-step">
          <div className="w-layout-vflex tools-step-card">
            <div className="tools-step-title">What is machine-to-machine (M2M) authentication?</div>
            <p>M2M authentication is a method that allows services or applications to securely communicate without user credentials. Instead, services exchange <strong>M2M tokens</strong> (short-lived access tokens) via the OAuth Client Credentials Flow.</p>
          </div>
          <div className="w-layout-vflex tools-step-card">
            <div className="tools-step-title">How does the OAuth Client Credentials Flow work?</div>
            <p>The Client Credentials Flow issues an access token directly to a machine or service (not a user). A service authenticates using its <strong>Client ID and Secret</strong> and receives a JWT token it can use to access protected APIs.</p>
          </div>
          <div className="w-layout-vflex tools-step-card">
            <div className="tools-step-title">Why use M2M tokens instead of API keys?</div>
            <p>M2M tokens are short-lived, scoped, and revocable. Unlike static API keys, they improve security by limiting exposure and allowing fine-grained access control.</p>
          </div>
          <div className="w-layout-vflex tools-step-card">
            <div className="tools-step-title">Can I use M2M authentication for microservices?</div>
            <p>Yes. M2M authentication is commonly used for <strong>microservice-to-microservice communication</strong>, ensuring secure backend API calls without embedding static secrets.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div className="footer-form-section form__bg-dark">
    <div className="container-default">
      <div className="container-default-inner px-0">
        <div className="_2-block-flex footer-form">
          <div className="_2-block-flex-content footer-form">
            <div className="_2-block-flex-content-text-wrap footer-form">
              <h2 className="form-heading color-white footer-form">Get Started with Machine-to-Machine Tokens</h2>
              <div className="color-cee9ff">Ready to secure your APIs and backend services?<br />Sign up now and try Authgear’s M2M token authentication in minutes.</div>
              <div className="footerform__divider-sm"></div>
              <a href="https://portal.authgear.com/?utm_source=feature-m2m&amp;utm_medium=link&amp;utm_campaign=start-for-free" target="_blank" className="footer-link w-inline-block">
                <div className="color-white footer-get-started-text">Start Free with Authgear {">"}</div>
              </a>
            </div>
          </div>
          <div className="_2-block-flex-image footer-form">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  </div>
    </>
  );
}
