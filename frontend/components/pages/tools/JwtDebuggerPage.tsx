import Link from 'next/link';
import PageScripts from '@/components/PageScripts';

const pageScripts: string[] = [
  // No functional page scripts on this page
];

interface Props {
  locale: string;
}

export default async function JwtDebuggerPage(_props: Props) {
  return (
    <>
      <section className="tools-section bg-f9f9fb">
        <div className="w-layout-blockcontainer container-default tools-heading w-container">
          <h1 className="tools-h1">JWT &amp; JWE Debugger</h1>
          <p className="tools-description">Decode, verify, sign, encrypt, and decrypt JSON Web Tokens. Our JWT debugger helps you inspect JWT headers and claims, verify signatures, and convert tokens to/from encrypted JWE form.</p>
        </div>
      </section>
      <section>
        <div className="w-layout-blockcontainer tools-container w-container">
          <div className="w-embed w-iframe">
            <iframe src="https://authgear.github.io/authgear-widget-jwt-debugger/" title="JWT &amp; JWE Debugger" width="100%" height="800px" frameBorder="0" scrolling="yes" style={{border: 'none', width: '100%', height: '800px', minHeight: '600px'}} allow="clipboard-read; clipboard-write" allowFullScreen></iframe>
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
            <p className="paragraph-18">Your data security is our top priority. All encoding, decoding, encryption and decryption happen in this browser. This tool does not store or send your JWT and JWE outside of the browser. See source code in: <a href="https://github.com/authgear/authgear-widget-jwt-debugger" target="_blank">https://github.com/authgear/authgear-widget-jwt-debugger</a></p>
          </div>
        </div>
      </section>
      <section>
        <div className="container-default more-dev-tool">
          <h2 className="title features-page-v2 more-dev-tool">More Developer Tools</h2>
          <div className="container-default-inner px-0 gap-0">
            <div className="w-layout-hflex _4-card-grid">
              <Link href="/tools/jwt-jwe-debugger" aria-current="page" className="more-tools w-inline-block w--current">
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
          <div className="container-default-inner px-0 gap-0">
            <div className="w-layout-hflex _4-card-grid-tools">
              <div className="tools-svg-card">
                <div className="svg-card-image-container"><img src="/images/tools-encode-jwt.svg" loading="lazy" alt="" /></div>
                <div className="svg-card-content-container text-center gap-16">
                  <div className="tools-svg-card-content-title left inter color-2e2e2e mobile-20px">Encode/Decode JWT</div>
                  <div className="tools-svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Quickly create and inspect JWTs. Paste a JWT to decode the header and payload, or craft your own for testing.</div>
                </div>
              </div>
              <div className="tools-svg-card">
                <div className="svg-card-image-container"><img src="/images/tool-verify-jwt.svg" loading="lazy" alt="" /></div>
                <div className="svg-card-content-container text-center gap-16">
                  <div className="tools-svg-card-content-title left inter color-2e2e2e mobile-20px">Sign &amp; Verify JWT</div>
                  <div className="tools-svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Generate cryptographic signatures when creating JWTs, and verify existing JWT signatures to confirm token authenticity and integrity.</div>
                </div>
              </div>
              <div className="tools-svg-card">
                <div className="svg-card-image-container"><img src="/images/tools-jwt-encryption.svg" loading="lazy" alt="" /></div>
                <div className="svg-card-content-container text-center gap-16">
                  <div className="tools-svg-card-content-title left inter color-2e2e2e mobile-20px">JWE Encryption</div>
                  <div className="tools-svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Encrypt any JWT into a JWE using a public key, ensuring data remains confidential during transmission.</div>
                </div>
              </div>
              <div className="tools-svg-card">
                <div className="svg-card-image-container"><img src="/images/tools-jwt-decryption.svg" loading="lazy" alt="" /></div>
                <div className="svg-card-content-container text-center gap-16">
                  <div className="tools-svg-card-content-title left inter color-2e2e2e mobile-20px">JWE Decryption</div>
                  <div className="tools-svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Decrypt a JWE token to retrieve the original JWT—including the payload—for analysis.</div>
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
              <h2 className="title features-page-v2">How the JWT &amp; JWE Debugger Works</h2>
            </div>
            <div className="tools-step">
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-step">Step 1.</div>
                <div className="tools-step-title">Paste or Generate a JWT:</div>
                <ul role="list" className="tools-step-content">
                  <li>Input your JWT to see its decoded header and payload instantly.</li>
                  <li>The tool can verify the JWT&apos;s signature to confirm authenticity and integrity, highlighting whether the token is valid or has been tampered with.</li>
                </ul>
              </div>
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-step">Step 2.</div>
                <div className="tools-step-title">Verify signature (JWT verification):</div>
                <ul role="list" className="tools-step-content">
                  <li>Supply a JWK or JWKS (jwk format / jwks.json) or paste a PEM public key to verify a token&apos;s signature and confirm integrity. The debugger shows <code>kid</code>, <code>alg</code>, and verification status.</li>
                </ul>
              </div>
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-step">Step 3.</div>
                <div className="tools-step-title">Sign / Create a JWT:</div>
                <ul role="list" className="tools-step-content">
                  <li>Build a signed JWT by choosing algorithm (<code>RS256</code>, <code>ES256</code>, <code>HS256</code>, etc.) and a signing key. This is useful for testing <code>jwt authentication</code> flows and experimenting with jwt best practices.</li>
                </ul>
              </div>
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-step">Step 4.</div>
                <div className="tools-step-title">Encrypt JWT to JWE:</div>
                <ul role="list" className="tools-step-content">
                  <li>Encrypt a signed JWT into a JWE (JSON Web Encryption) using a public key to produce confidential tokens. Use JWE when you need payload confidentiality in addition to signature integrity. (See &quot;<a href="https://www.authgear.com/post/jwe-vs-jwt" target="_blank">JWE vs JWT</a>&quot; in our guide for when to use each.)</li>
                </ul>
              </div>
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-step">Step 5.</div>
                <div className="tools-step-title">Decrypt JWE:</div>
                <ul role="list" className="tools-step-content">
                  <li>Paste a JWE and provide the private key to decrypt and retrieve the original JWT. The tool supports common JWE algorithms and shows header fields and enc parameters.</li>
                </ul>
              </div>
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-step">Step 6.</div>
                <div className="tools-step-title">Inspect claims &amp; debug</div>
                <ul role="list" className="tools-step-content">
                  <li>View claims, check <code>exp</code>/<code>iat</code>/<code>nbf</code> logic, and see human-friendly warnings (expired, not yet valid). Use copy buttons to export tokens or keys for local testing</li>
                </ul>
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
                <h2 className="tools-faq-title"><a href="https://www.authgear.com/post/jwt-authentication-a-secure-scalable-solution-for-modern-applications">What is a JWT</a> (JSON Web Token)?</h2>
                <div className="tools-faq-content">A JWT (JSON Web Token) is an open standard (RFC 7519) for transmitting information securely between parties as a compact, URL-safe JSON object. <a href="https://www.authgear.com/post/web-application-authentication-guide">JWTs are widely used in authentication systems</a>, enabling stateless session management and API security. A standard JWT has three parts:</div>
                <div className="w-layout-hflex tools-faq-check-list"><img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                  <div className="tools-faq-content">Header: Specifies the token type and hashing algorithm.</div>
                </div>
                <div className="w-layout-hflex tools-faq-check-list"><img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                  <div className="tools-faq-content">Payload: Contains claims—statements about the user and additional metadata.</div>
                </div>
                <div className="w-layout-hflex tools-faq-check-list"><img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                  <div className="tools-faq-content">Signature: Verifies that the sender of the JWT is who it says it is and ensures the message wasn&apos;t changed along the way.</div>
                </div>
                <div className="tools-faq-content">Common Use Cases:</div>
                <div className="w-layout-hflex tools-faq-check-list"><img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                  <div className="tools-faq-content">User authentication and single sign-on (SSO)</div>
                </div>
                <div className="w-layout-hflex tools-faq-check-list"><img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                  <div className="tools-faq-content">Secure API authentication and authorization</div>
                </div>
                <div className="w-layout-hflex tools-faq-check-list"><img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                  <div className="tools-faq-content">Information exchange between applications</div>
                </div>
              </div>
              <div className="w-layout-hflex tools-faq-card">
                <img src="/images/tools-qa-encryption.svg" loading="lazy" alt="" className="image-93" />
                <h2 className="tools-faq-title">What is a JWE (JSON Web Encryption)?</h2>
                <div className="tools-faq-content">A JWE (JSON Web Encryption) is another open standard (RFC 7516) for encrypting content, providing confidentiality for transmitted information. JWE wraps content—such as a signed JWT—in an encrypted format that only intended parties can decrypt and read. A standard JWE structure:</div>
                <div className="w-layout-hflex tools-faq-check-list"><img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                  <div className="tools-faq-content">Protected Header</div>
                </div>
                <div className="w-layout-hflex tools-faq-check-list"><img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                  <div className="tools-faq-content">Encrypted Key</div>
                </div>
                <div className="w-layout-hflex tools-faq-check-list"><img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                  <div className="tools-faq-content">Initialization Vector</div>
                </div>
                <div className="w-layout-hflex tools-faq-check-list"><img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                  <div className="tools-faq-content">Ciphertext (the actual encrypted content)</div>
                </div>
                <div className="w-layout-hflex tools-faq-check-list"><img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                  <div className="tools-faq-content">Authentication Tag</div>
                </div>
                <div className="tools-faq-content">Common Use Cases:</div>
                <div className="w-layout-hflex tools-faq-check-list"><img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                  <div className="tools-faq-content">Protect sensitive JWT payloads in transit</div>
                </div>
                <div className="w-layout-hflex tools-faq-check-list"><img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                  <div className="tools-faq-content">Secure confidential data exchange between services</div>
                </div>
                <div className="w-layout-hflex tools-faq-check-list"><img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                  <div className="tools-faq-content">Layer additional security on top of standard JWTs</div>
                </div>
              </div>
            </div>
            <div className="w-layout-vflex tools-faq-1-grid">
              <div className="w-layout-hflex tools-faq-card">
                <div className="w-layout-hflex flex-block-78">
                  <img src="/images/tools-qa-best-practice.svg" loading="lazy" alt="" className="image-93" />
                  <div className="w-layout-hflex flex-block-79">
                    <h2 className="tools-faq-title">JWT &amp; JWE Debugger Best Practices</h2>
                    <div className="w-layout-hflex tools-faq-check-list"><img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                      <div className="tools-faq-content">Signature: Verifies that the sender of the JWT is who it says it is and ensures the message wasn&apos;t changed along the way.</div>
                    </div>
                    <div className="w-layout-hflex tools-faq-check-list"><img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                      <div className="tools-faq-content">Payload: Contains claims—statements about the user and additional metadata.</div>
                    </div>
                    <div className="w-layout-hflex tools-faq-check-list"><img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                      <div className="tools-faq-content">Header: Specifies the token type and hashing algorithm.</div>
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
