import Link from 'next/link';
import PageScripts from '@/components/PageScripts';

const pageScripts: string[] = [
  // No functional page scripts on this page
];

interface Props {
  locale: string;
}

export default async function HmacPage(_props: Props) {
  return (
    <>
      <section className="tools-section bg-f9f9fb">
        <div className="w-layout-blockcontainer container-default tools-heading w-container">
          <h1 className="tools-h1">HMAC Signature Generator/Verifier</h1>
          <p className="tools-description">Securely generate and verify HMAC signatures for your payloads</p>
        </div>
      </section>
      <section>
        <div className="w-layout-blockcontainer tools-container w-container">
          <div className="w-embed w-iframe">
            <iframe src="https://authgear.github.io/authgear-widget-hmac-tool/" title="HMAC Signature Generator/Verifier" width="100%" height="800px" frameBorder="0" scrolling="yes" style={{border: 'none', width: '100%', height: '800px', minHeight: '600px'}} allow="clipboard-read; clipboard-write" allowFullScreen></iframe>
          </div>
          <div className="tools-banner-wrapper">
            <div className="div-block-33">
              <Link href="/" target="_blank" className="tools-authgear-tag plausible-event-name--tool-tag-click">This tool is crafted by Authgear</Link>
            </div>
            <Link href="/" target="_blank" className="tools-banner plausible-event-name--tool-banner-click w-inline-block">
              <img src="/images/banner2x.png" loading="lazy" width="1280" sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" alt="" srcSet="/images/banner2x-p-500.png 500w, /images/banner2x-p-800.png 800w, /images/banner2x-p-1080.png 1080w, /images/banner2x-p-1600.png 1600w, /images/banner2x-p-2000.png 2000w, /images/banner2x.png 2560w" className="image-100" />
              <img src="/images/banner_m2x.png" loading="lazy" sizes="100vw" srcSet="/images/banner_m2x-p-500.png 500w, /images/banner_m2x.png 670w" alt="" className="image-100 mobile" />
            </Link>
            <a href="https://github.com/authgear/authgear-server" target="_blank" className="tools-github-tag plausible-event-name--tool-github-tag-click w-inline-block">
              <div className="text-block-92">Support and star us on</div>
              <img src="https://img.shields.io/github/stars/authgear/authgear-server" width="110px" alt="" />
            </a>
          </div>
          <div className="tools-policy">
            <p className="paragraph-18">Your data security is our top priority. All signature generation and verification happen entirely in your browser. This tool does not store or transmit your payloads, secrets, or signatures outside of the browser. See source code in: <a href="https://github.com/authgear/authgear-widget-hmac-tool" target="_blank">https://github.com/authgear/authgear-widget-hmac-tool</a></p>
          </div>
        </div>
      </section>
      <section>
        <div className="container-default more-dev-tool">
          <h2 className="title features-page-v2 more-dev-tool">More Developer Tools</h2>
          <div className="container-default-inner px-0 gap-0">
            <div className="w-layout-hflex _4-card-grid">
              <Link href="/tools/jwt-jwe-debugger" className="more-tools w-inline-block">
                <div className="svg-card-image-container"><img loading="lazy" src="/images/minitools-more-jwt.svg" alt="" /></div>
                <div className="svg-card-content-container text-center gap-16">
                  <div className="tools-svg-card-content-title left inter color-2e2e2e mobile-20px">JWT &amp; JWE Debuger</div>
                </div>
                <img loading="lazy" src="/images/arrow-icon.svg" alt="" className="image-99" />
              </Link>
              <Link href="/tools/jwk-generator" className="more-tools w-inline-block">
                <div className="svg-card-image-container"><img loading="lazy" src="/images/minitools-more-jwk.svg" alt="" /></div>
                <div className="svg-card-content-container text-center gap-16">
                  <div className="tools-svg-card-content-title left inter color-2e2e2e mobile-20px">JWK Generator</div>
                </div>
                <img loading="lazy" src="/images/arrow-icon.svg" alt="" className="image-99" />
              </Link>
              <Link href="/tools/hmac-signature-generator-verifier" aria-current="page" className="more-tools w-inline-block w--current">
                <div className="svg-card-image-container"><img loading="lazy" src="/images/minitools-more-hmac.svg" alt="" /></div>
                <div className="svg-card-content-container text-center gap-16">
                  <div className="tools-svg-card-content-title left inter color-2e2e2e mobile-20px">HMAC Tool</div>
                </div>
                <img loading="lazy" src="/images/arrow-icon.svg" alt="" className="image-99" />
              </Link>
              <a href="https://samlsp.com/en/" target="_blank" className="more-tools w-inline-block">
                <div className="svg-card-image-container"><img loading="lazy" src="/images/minitools-more-saml.svg" alt="" /></div>
                <div className="svg-card-content-container text-center gap-16">
                  <div className="tools-svg-card-content-title left inter color-2e2e2e mobile-20px">SAML Testing Tool</div>
                </div>
                <img loading="lazy" src="/images/arrow-icon.svg" alt="" className="image-99" />
              </a>
              <Link href="/tools/totp-authenticator" className="more-tools w-inline-block">
                <div className="svg-card-image-container"><img loading="lazy" src="/images/minitools-more-totp.svg" alt="" /></div>
                <div className="svg-card-content-container text-center gap-16">
                  <div className="tools-svg-card-content-title left inter color-2e2e2e mobile-20px">TOTP Authenticator</div>
                </div>
                <img loading="lazy" src="/images/arrow-icon.svg" alt="" className="image-99" />
              </Link>
              <Link href="/tools/password-hash-generator" className="more-tools w-inline-block">
                <div className="svg-card-image-container"><img loading="lazy" src="/images/minitools-more-passwordhash.svg" alt="" /></div>
                <div className="svg-card-content-container text-center gap-16">
                  <div className="tools-svg-card-content-title left inter color-2e2e2e mobile-20px">Password Hash Generator</div>
                </div>
                <img loading="lazy" src="/images/arrow-icon.svg" alt="" className="image-99" />
              </Link>
              <Link href="/tools/base64-decode-encode" className="more-tools w-inline-block">
                <div className="svg-card-image-container"><img loading="lazy" src="/images/minitools-more-base64.svg" alt="" /></div>
                <div className="svg-card-content-container text-center gap-16">
                  <div className="tools-svg-card-content-title left inter color-2e2e2e mobile-20px">Base64 Decode and Encode</div>
                </div>
                <img loading="lazy" src="/images/arrow-icon.svg" alt="" className="image-99" />
              </Link>
              <Link href="/tools/uuidv7-generator" className="more-tools w-inline-block">
                <div className="svg-card-image-container"><img loading="lazy" src="/images/uuid-v7.svg" alt="" /></div>
                <div className="svg-card-content-container text-center gap-16">
                  <div className="tools-svg-card-content-title left inter color-2e2e2e mobile-20px">UUID v7 Generator &amp; Timestamp Extractor</div>
                </div>
                <img loading="lazy" src="/images/arrow-icon.svg" alt="" className="image-99" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container-default">
          <div className="container-default-inner px-0 gap-0 pb-0">
            <div className="top-content feature-flex">
              <h2 className="title features-page-v2">How the HMAC Signature Generator Works</h2>
            </div>
            <div className="tools-step horizon-step">
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-step">Step 1.</div>
                <div className="tools-step-title">Enter Payload:</div>
                <div className="text-block-84">Input the exact message or payload content you want to sign or verify.</div>
              </div>
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-step">Step 2.</div>
                <div className="tools-step-title">Provide Webhook Secret:</div>
                <div className="text-block-84">Insert the shared secret key used for HMAC generation, typically known only to you and your webhook provider.</div>
              </div>
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-step">Step 3.</div>
                <div className="tools-step-title">Select HMAC Algorithm:</div>
                <div className="text-block-84">Pick from HS256, HS384, or HS512 according to your application&apos;s configuration.</div>
              </div>
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-step">Step 4.</div>
                <div className="tools-step-title">Generate Signature:</div>
                <div className="text-block-84">Click to compute the HMAC signature for your payload and secret using the selected algorithm.</div>
              </div>
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-step">Step 5.</div>
                <div className="tools-step-title">Paste Received Signature to Verify:</div>
                <div className="text-block-84">Paste the signature you received from an external system/webhook to compare against your own generated signature.</div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-default">
          <div className="container-default-inner px-0 gap-0 pb-0 horizon-container">
            <div className="top-content feature-flex">
              <h2 className="title features-page-v2 margin-bottom-16 align-left">Supported Algorithms</h2>
              <p className="tools-description align-left">Generate and convert cryptographic keys in PEM and JWK formats for secure signing and encryption.</p>
            </div>
            <div className="w-layout-hflex flex-block-80">
              <div className="w-layout-vflex algorithms-card">
                <img src="/images/tools-hmac-supported.svg" loading="lazy" alt="" />
                <div>HS256</div>
                <div className="algorithms-description">HMAC + SHA-256</div>
              </div>
              <div className="w-layout-vflex algorithms-card">
                <img src="/images/tools-hmac-supported.svg" loading="lazy" alt="" />
                <div>HS384</div>
                <div className="algorithms-description">HMAC + SHA-384</div>
              </div>
              <div className="w-layout-vflex algorithms-card">
                <img src="/images/tools-hmac-supported.svg" loading="lazy" alt="" />
                <div>HS512</div>
                <div className="algorithms-description">HMAC + SHA-512</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="tools-ready-to">
        <div className="login-default-inner-section gallery-footer">
          <img src="/images/ui_gallery_authgear-circle.svg" loading="lazy" alt="" />
          <p className="paragraph-13">Ready to Supercharge Your Authentication?</p>
          <p className="paragraph-12 speciial-color">Experience seamless, secure, and scalable identity management with Authgear.</p>
          <a href="https://accounts.portal.authgear.com/signup" className="gallery-button gallery-page-button w-button">Get Started for Free</a>
        </div>
      </section>
      <section>
        <div className="container-default">
          <div className="container-default-inner px-0 gap-0">
            <div className="w-layout-vflex tools-faq">
              <div className="w-layout-hflex tools-faq-card">
                <img src="/images/tools-qa-what-is.svg" loading="lazy" alt="" className="image-93" />
                <h2 className="tools-faq-title">What is HMAC?</h2>
                <div className="tools-faq-content">HMAC (Hash-Based Message Authentication Code) is a mechanism that uses a cryptographic hash function and a secret key to produce a signature for a message or payload. This signature provides both data integrity and authentication, ensuring that the message has not been tampered with and is genuinely from the claimed sender.</div>
              </div>
              <div className="w-layout-hflex tools-faq-card">
                <img src="/images/tools-qa-encryption.svg" loading="lazy" alt="" className="image-93" />
                <h2 className="tools-faq-title">Why HMAC?</h2>
                <div className="w-layout-hflex tools-faq-check-list">
                  <img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                  <div className="tools-faq-content">Verifies authenticity of messages, especially in webhook or API callbacks</div>
                </div>
                <div className="w-layout-hflex tools-faq-check-list">
                  <img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                  <div className="tools-faq-content">Prevents tampering or replay attacks by ensuring message integrity</div>
                </div>
                <div className="w-layout-hflex tools-faq-check-list">
                  <img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                  <div className="tools-faq-content">Simple and widely-used cryptographic technique supported by most platforms</div>
                </div>
              </div>
            </div>
            <div className="w-layout-vflex tools-faq-1-grid">
              <div className="w-layout-hflex tools-faq-card">
                <div className="w-layout-hflex flex-block-78">
                  <img src="/images/tools-qa-best-practice.svg" loading="lazy" alt="" className="image-93" />
                  <div className="w-layout-hflex flex-block-79">
                    <h2 className="tools-faq-title">Best Practices</h2>
                    <div className="w-layout-hflex tools-faq-check-list">
                      <img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                      <div className="tools-faq-content">Keep your webhook secret confidential and avoid sharing it publicly.</div>
                    </div>
                    <div className="w-layout-hflex tools-faq-check-list">
                      <img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                      <div className="tools-faq-content">Always verify incoming webhook signatures before processing payloads.</div>
                    </div>
                    <div className="w-layout-hflex tools-faq-check-list">
                      <img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                      <div className="tools-faq-content">Use a secure algorithm compatible with your platform.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="tool-popup">
        <h1 className="dev-tool-popup-heading">This Dev Tool is crafted by Authgear</h1>
        <p className="paragraph-20">Open source Auth0/Clerk/Firebase alternative. Passkeys, SSO, MFA, passwordless, biometric login.</p>
        <div className="tool-popup-wrapper">
          <a href="https://portal.authgear.com/" target="_blank" className="tool-popup-button plausible-event-name--tool-popup-signup-click w-inline-block">
            <div>Start building for Free</div>
          </a>
          <a href="https://github.com/authgear/authgear-server" target="_blank" className="tool-popup-button secondary plausible-event-name--tool-github-click w-inline-block">
            <div>Star us on</div>
            <img src="https://img.shields.io/github/stars/authgear/authgear-server" width="110px" alt="" />
          </a>
        </div>
        <div className="tool-popup-close-button-wrapper">
          <a href="#" className="tool-popup-close-button plausible-event-name--popup-close-click w-button">Close</a>
        </div>
      </div>
      <PageScripts scripts={pageScripts} />
    </>
  );
}
