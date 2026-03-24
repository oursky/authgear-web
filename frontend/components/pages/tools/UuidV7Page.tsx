import Link from 'next/link';
import PageScripts from '@/components/PageScripts';

const pageScripts: string[] = [
  // No functional page scripts on this page
];

interface Props {
  locale: string;
}

export default async function UuidV7Page(_props: Props) {
  return (
    <>
      <section className="tools-section bg-f9f9fb">
        <div className="w-layout-blockcontainer container-default tools-heading w-container">
          <h1 className="tools-h1">UUID v7 Generator &amp; Timestamp Extractor (RFC 9562)</h1>
          <p className="tools-description">Generate and inspect UUID v7 values directly in your browser.</p>
        </div>
      </section>
      <section>
        <div className="w-layout-blockcontainer tools-container w-container">
          <div className="w-embed w-iframe">
            <iframe src="https://authgear.github.io/authgear-widget-uuid-v7-generator/" title="UUIDv7 Generator &amp; Timestamp Extractor (RFC 9562)" width="100%" height="800px" frameBorder="0" scrolling="yes" style={{border: 'none', width: '100%', height: '800px', minHeight: '600px'}} allow="clipboard-read; clipboard-write" allowFullScreen></iframe>
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
            <p className="paragraph-18">Your data security is our top priority. Everything runs locally in your browser.<br />This tool does not store or send any data outside of your device</p>
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
              <Link href="/tools/hmac-signature-generator-verifier" className="more-tools w-inline-block">
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
              <Link href="/tools/uuidv7-generator" aria-current="page" className="more-tools w-inline-block w--current">
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
          <div className="container-default-inner px-0 gap-0">
            <div className="w-layout-hflex _4-card-grid-tools">
              <div className="tools-svg-card">
                <div className="svg-card-image-container">
                  <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M19.9727 40.1553H26.3397" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M19.9727 7.82812H26.3398" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M23.1562 7.82812V40.1694" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M16.2706 34.7486H13.3323C9.87049 34.7486 7.06641 31.9444 7.06641 28.4826V19.5139C7.06641 16.0541 9.87049 13.25 13.3323 13.25H16.2706" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M29.4648 13.25H36.803C40.2628 13.25 43.0668 16.0541 43.0668 19.5159V22.1816" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M43.0668 28.4688C43.0668 31.9248 40.2394 34.7522 36.7814 34.7522H29.4648" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg></div>
                </div>
                <div className="svg-card-content-container text-center gap-16">
                  <div className="tools-svg-card-content-title left inter color-2e2e2e mobile-20px">Multiple UUID v7 Values</div>
                  <div className="tools-svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Generate up to 10 UUID v7 values at a time. This is useful for testing, seeding data, or validating ordering behavior.</div>
                </div>
              </div>
              <div className="tools-svg-card">
                <div className="svg-card-image-container">
                  <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M6.46094 13.4922H12.2505M29.9552 13.4922H42.461" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M6.46094 34.5078H19.1682M37.2066 34.5078H42.461" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path fillRule="evenodd" clipRule="evenodd" d="M31.2981 28.5977C34.5635 28.5977 37.2067 31.2447 37.2067 34.5081C37.2067 37.7737 34.5635 40.4201 31.2981 40.4201C28.0325 40.4201 25.3867 37.7737 25.3867 34.5081C25.3867 31.2447 28.0325 28.5977 31.2981 28.5977Z" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path fillRule="evenodd" clipRule="evenodd" d="M18.1614 7.57812C21.427 7.57812 24.0736 10.2248 24.0736 13.4903C24.0736 16.7538 21.427 19.4005 18.1614 19.4005C14.8959 19.4005 12.25 16.754 12.25 13.4905C12.25 10.2249 14.8959 7.57812 18.1614 7.57812Z" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg></div>
                </div>
                <div className="svg-card-content-container text-center gap-16">
                  <div className="tools-svg-card-content-title left inter color-2e2e2e mobile-20px">Flexible Timestamp Modes</div>
                  <div className="tools-svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Choose how the timestamp is generated. You can use the current time or set a custom timestamp to generate UUIDs for a specific moment.</div>
                </div>
              </div>
              <div className="tools-svg-card">
                <div className="svg-card-image-container">
                  <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M34.7227 35.168L41.5705 42" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M18.0234 22.8648L21.8278 26.6672L29.4304 19.0625" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M40.098 22.8342C40.098 32.1318 32.5614 39.6702 23.2638 39.6702C13.9662 39.6702 6.42969 32.1318 6.42969 22.8342C6.42969 13.5365 13.9662 6 23.2638 6C29.7896 6 35.4478 9.71278 38.2416 15.1413" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg></div>
                </div>
                <div className="svg-card-content-container text-center gap-16">
                  <div className="tools-svg-card-content-title left inter color-2e2e2e mobile-20px">Built-in UUID Inspector</div>
                  <div className="tools-svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Each generated UUID includes an inspector that displays structured details such as the embedded Unix timestamp, UUID version, and variant information.</div>
                </div>
              </div>
              <div className="tools-svg-card">
                <div className="svg-card-image-container">
                  <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M15.818 40.34C9.976 37.23 6 31.08 6 24C6 13.782 14.282 5.5 24.5 5.5C34.718 5.5 43 13.782 43 24C43 34.218 34.718 42.5 24.5 42.5" stroke="#0043E0" strokeWidth="3" strokeLinecap="round"></path>
                    <path d="M31.3642 29.8834L23.8242 25.3854V15.6914" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round"></path>
                  </svg></div>
                </div>
                <div className="svg-card-content-container text-center gap-16">
                  <div className="tools-svg-card-content-title left inter color-2e2e2e mobile-20px">Timestamp Extraction Tool</div>
                  <div className="tools-svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Extract the Unix timestamp from an existing UUID v7 to verify creation time and debug time-based ordering.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container-default">
          <div className="container-default-inner px-0 gap-0 pb-0">
            <div className="top-content feature-flex">
              <h2 className="title features-page-v2">How the Tool Works</h2>
            </div>
            <div className="tools-step">
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-step">Step 1.</div>
                <div className="tools-step-title">Choose how many IDs to generate (1–10).</div>
              </div>
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-step">Step 2.</div>
                <div className="tools-step-title">Select a timestamp mode: Now or Set a time (ISO 8601 UTC, Unix).</div>
              </div>
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-step">Step 3.</div>
                <div className="tools-step-title">Click Generate UUIDs.</div>
              </div>
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-step">Step 4.</div>
                <div className="tools-step-title">Copy any value with one click, or Copy All.</div>
              </div>
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-step">Step 5.</div>
                <div className="tools-step-title">Read the color-coded inspector to understand each field.</div>
              </div>
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-step">Step 6.</div>
                <div className="tools-step-title">Switch to Timestamp extraction tool to decode an existing UUID v7.</div>
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
                <h2 className="tools-faq-title">What is UUID v7?</h2>
                <div className="tools-faq-content">UUID v7 is a 128-bit identifier defined in <a href="https://www.rfc-editor.org/rfc/rfc9562.html#name-uuid-version-7" target="_blank">RFC 9562</a>. It embeds a 48-bit Unix timestamp in milliseconds, followed by a 4-bit version marker (7), a 12-bit random/sequence segment, a 2-bit variant (RFC 4122), and a 62-bit random segment. The time component yields mostly monotonic, time-ordered IDs that sort well while retaining strong randomness.</div>
              </div>
              <div className="w-layout-hflex tools-faq-card">
                <img src="/images/tools-qa-encryption.svg" loading="lazy" alt="" className="image-93" />
                <h2 className="tools-faq-title">Common uses</h2>
                <div className="w-layout-hflex tools-faq-check-list"><img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                  <div className="tools-faq-content"><strong>Database keys:</strong> time-ordered inserts with good index locality.</div>
                </div>
                <div className="w-layout-hflex tools-faq-check-list"><img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                  <div className="tools-faq-content"><strong>Event IDs:</strong> sortable by creation time without extra columns.</div>
                </div>
                <div className="w-layout-hflex tools-faq-check-list"><img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                  <div className="tools-faq-content"><strong>Log correlation:</strong> embedded millisecond timestamp for triage.</div>
                </div>
              </div>
            </div>
            <div className="w-layout-vflex tools-faq-1-grid">
              <div className="w-layout-hflex tools-faq-card">
                <div className="w-layout-hflex flex-block-78">
                  <img src="/images/tools-qa-best-practice.svg" loading="lazy" alt="" className="image-93" />
                  <div className="w-layout-hflex flex-block-79">
                    <h2 className="tools-faq-title">Why Use UUID v7 Instead of UUID v4?</h2>
                    <div className="tools-faq-content">UUID v4 is fully random and does not preserve creation order. UUID v7 improves database write performance and index locality by generating identifiers that are roughly sorted by time.</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-layout-vflex tools-faq-1-grid">
              <div className="w-layout-hflex tools-faq-card">
                <div className="w-layout-hflex flex-block-78">
                  <img src="/images/tools-uuid.svg" loading="lazy" alt="" className="image-93" />
                  <div className="w-layout-hflex flex-block-79">
                    <h2 className="tools-faq-title">Is UUID v7 globally unique?</h2>
                    <div className="tools-faq-content">UUIDs are designed for extremely low collision probability when generated correctly. v7 combines a timestamp with large random sections to maintain that property.</div>
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
