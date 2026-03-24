import Link from 'next/link';


interface Props {
  locale: string;
}

export default async function TotpPage(_props: Props) {
  return (
    <>
      <section className="tools-section bg-f9f9fb">
        <div className="w-layout-blockcontainer container-default tools-heading w-container">
          <h1 className="tools-h1">TOTP Authenticator — Online one-time password generator (RFC 6238)</h1>
          <p className="tools-description">Generate and copy Time-based One-Time Passwords (TOTP) instantly for testing, debugging, and QA. Configure algorithm (SHA-1 / SHA-256 / SHA-512), digit length (6 or 8), and see live codes that refresh every 30 seconds per <a href="https://datatracker.ietf.org/doc/html/rfc6238" target="_blank">RFC 6238</a>.</p>
        </div>
      </section>
      <section>
        <div className="w-layout-blockcontainer tools-container w-container">
          <div className="w-embed w-iframe">
            <iframe src="https://totp-mini-tool-authgear.vercel.app/" title="TOTP Authenticator - One-time Password Generator" width="100%" height="600px" frameBorder="0" scrolling="yes" style={{borderRadius: '16px', border: '1px solid #DBDBDB', width: '100%', height: '600px', minHeight: '600px'}} allow="clipboard-read; clipboard-write" allowFullScreen></iframe>
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
            <p className="paragraph-18">Your data security is our top priority. All TOTP code generation and application management happen entirely in your browser.<br />This tool does not store or transmit your secret keys or codes outside of your browser.</p>
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
              <Link href="/tools/totp-authenticator" aria-current="page" className="more-tools w-inline-block w--current">
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
              <h2 className="title features-page-v2">How the Tool Works</h2>
            </div>
            <div className="tools-step-totp horizon-step">
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-step">Step 1.</div>
                <div className="tools-step-title">Enter Your Application&apos;s Secret Key</div>
                <div className="text-block-84">Paste the shared TOTP secret (base32) from your app&apos;s 2FA setup screen.</div>
              </div>
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-step">Step 2.</div>
                <div className="tools-step-title">Customise Algorithm and Digit Length</div>
                <div className="text-block-84">Choose <code>SHA-1</code>, <code>SHA-256</code>, or <code>SHA-512</code>, and pick <code>6</code> or <code>8</code> digits. SHA-1 + 6 digits is the common default; use stronger hashes if your integration requires it.</div>
              </div>
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-step">Step 3.</div>
                <div className="tools-step-title">Generate One-Time Password</div>
                <div className="text-block-84">The current OTP is generated and updates automatically on a 30-second timestep (default per RFC 6238). Save up to 10 different application secrets for quick testing.</div>
              </div>
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-step">Step 4.</div>
                <div className="tools-step-title">Copy and use the One-Time Password for authentication</div>
                <div className="text-block-84">Click/tap the code to copy it to your clipboard and paste it into your app&apos;s login flow.</div>
              </div>
            </div>
            <div className="tools-policy">
              <p className="paragraph-18"><span className="text-span-43">⚠️ Caution:</span> All code generation and storage happen in your browser memory only.<br />And therefore, when your browser cache is cleared or if you reinstall your browser, all data saved for this tool will be permanently deleted.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="tools-ready-to">
        <div className="login-default-inner-section gallery-footer">
          <img src="/images/ui_gallery_authgear-circle.svg" loading="lazy" alt="" />
          <p className="paragraph-13">Secure Your Accounts Seamlessly with Authgear</p>
          <p className="paragraph-12 speciial-color">Authgear gives you scalable identity management, secure authentication, and easy integration.</p>
          <a href="https://accounts.portal.authgear.com/signup" className="gallery-button gallery-page-button w-button">Get Started for Free</a>
        </div>
      </section>
      <section>
        <div className="container-default">
          <div className="container-default-inner px-0 gap-0 pb-0">
            <div className="top-content feature-flex">
              <h2 className="title features-page-v2">Troubleshooting</h2>
            </div>
            <div className="tools-step">
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-title">Codes don&apos;t match?</div>
                <ul role="list" className="tools-step-content">
                  <li>Check server and client clocks — TOTP depends on accurate time; allow a verification window (±1 timestep) during testing.</li>
                </ul>
              </div>
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-title">Wrong secret format?</div>
                <ul role="list" className="tools-step-content">
                  <li>Ensure the secret is base32. If you have a QR code, scan it or extract the <code>secret=</code> parameter from the otpauth URI.</li>
                </ul>
              </div>
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-title">&quot;Algorithm mismatch&quot; errors</div>
                <ul role="list" className="tools-step-content">
                  <li>Verify that both the server and authenticator are using the <em>same</em> algorithm (SHA-1/256/512), digit length, and timestep.</li>
                </ul>
              </div>
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-title">Intermittent failures in tests</div>
                <ul role="list" className="tools-step-content">
                  <li>Confirm you&apos;re not reusing a secret in multiple environments (e.g., same secret across staging &amp; prod can cause confusion)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container-default">
          <div className="container-default-inner px-0 gap-0">
            <h2 className="title features-page-v2">FAQ</h2>
            <div className="w-layout-vflex tools-faq">
              <div className="w-layout-hflex tools-faq-card">
                <img src="/images/tools-qa-what-is.svg" loading="lazy" alt="" className="image-93" />
                <div className="tools-faq-title">What is TOTP?</div>
                <div className="tools-faq-content">TOTP (Time-Based One-Time Password) is an industry-standard algorithm for generating temporary, single-use codes based on the current time and a shared secret. TOTP is defined by the official IETF standard RFC 6238, which specifies how these codes are calculated to provide short-lived OTP values for secure two-factor authentication across websites, applications, and services.</div>
              </div>
              <div className="w-layout-hflex tools-faq-card">
                <img src="/images/tools-qa-encryption.svg" loading="lazy" alt="" className="image-93" />
                <div className="tools-faq-title">Why TOTP?</div>
                <div className="w-layout-hflex tools-faq-check-list"><img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                  <div className="tools-faq-content">Strengthens security with two-factor authentication (2FA)</div>
                </div>
                <div className="w-layout-hflex tools-faq-check-list"><img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                  <div className="tools-faq-content">Widely adopted by major platforms (Google, Microsoft, GitHub, etc.)</div>
                </div>
                <div className="w-layout-hflex tools-faq-check-list"><img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                  <div className="tools-faq-content">Tokens expire quickly, minimising the risk of code reuse</div>
                </div>
              </div>
              <div className="w-layout-hflex tools-faq-card">
                <div className="tools-faq-title">How long is a TOTP valid?</div>
                <div className="tools-faq-content">By default 30 seconds (RFC 6238 recommends 30s). Server verification often allows a one-step grace window for clock skew.</div>
              </div>
              <div className="w-layout-hflex tools-faq-card">
                <div className="tools-faq-title">Which algorithm should I use — SHA-1, SHA-256 or SHA-512?</div>
                <div className="tools-faq-content">SHA-1 is widely supported and used by most authenticator apps; SHA-256/512 are more robust if you control both the client and server and want stricter hashing. Ensure all sides use the same algorithm.</div>
              </div>
              <div className="w-layout-hflex tools-faq-card">
                <div className="tools-faq-title">Should I use 6 or 8 digits?</div>
                <div className="tools-faq-content">6 digits is the common standard (balances usability and security). 8 digits provide slightly more entropy but are less common for consumer authenticators.</div>
              </div>
              <div className="w-layout-hflex tools-faq-card">
                <div className="tools-faq-title">How do I extract a secret from an otpauth:// URI?</div>
                <div className="tools-faq-content">The <code>secret=</code> parameter in the <code>otpauth://</code> URL is the base32 secret.</div>
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
    </>
  );
}
