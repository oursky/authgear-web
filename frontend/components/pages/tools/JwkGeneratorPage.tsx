import Link from 'next/link';
import PageScripts from '@/components/PageScripts';

const pageScripts: string[] = [
  // No functional page scripts on this page
];

interface Props {
  locale: string;
}

export default async function JwkGeneratorPage(_props: Props) {
  return (
    <>
      <section className="tools-section bg-f9f9fb">
        <div className="w-layout-blockcontainer container-default tools-heading w-container">
          <h1 className="tools-h1">JWK Generator — Convert PEM to JWK &amp; Generate JWKS</h1>
          <p className="tools-description">Generate and convert cryptographic keys in PEM and JWK formats for secure signing and encryption.</p>
        </div>
      </section>
      <section>
        <div className="w-layout-blockcontainer tools-container w-container">
          <div className="w-embed w-iframe">
            <iframe src="https://authgear.github.io/authgear-widget-jwk-generator/" title="JWK Generator Widget" width="100%" height="800px" frameBorder="0" scrolling="yes" style={{border: 'none', width: '100%', height: '800px', minHeight: '600px'}} allow="clipboard-read; clipboard-write" allowFullScreen></iframe>
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
            <p className="paragraph-18">Our lightweight <strong>JWK generator</strong> runs entirely in your browser — no keys leave your machine. Use it to convert <strong>PEM to JWK</strong>, convert <strong>JWK to PEM</strong>, or generate new keys and export a <strong>JWKS</strong> for your <code>jwks_uri</code> endpoint. Learn more: <a href="#">What is JWKS</a> <br />See source code: <a href="https://github.com/authgear/authgear-widget-jwk-generator" target="_blank">https://github.com/authgear/authgear-widget-jwk-generator</a></p>
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
              <Link href="/tools/jwk-generator" aria-current="page" className="more-tools w-inline-block w--current">
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
            <div className="w-layout-hflex _3-card-grid">
              <div className="tools-svg-card">
                <div className="svg-card-image-container"><img src="/images/tools-encode-jwt.svg" loading="lazy" alt="" /></div>
                <div className="svg-card-content-container text-center gap-16">
                  <div className="tools-svg-card-content-title left inter color-2e2e2e mobile-20px">PEM to JWK</div>
                  <div className="tools-svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Paste a PEM-encoded key or X.509 certificate, set <code>kid</code>, choose <code>alg</code> and <code>use</code> (sig / enc), then click <strong>Generate JWK</strong>. This converts PEM → JWK in the standard <strong>jwk format</strong> so you can add the JWK to a <strong>JWKS</strong> or plug it directly into JOSE libraries (Node <code>jose</code>, Python <code>jwcrypto</code>, etc.).</div>
                </div>
              </div>
              <div className="tools-svg-card">
                <div className="svg-card-image-container"><img src="/images/tool-verify-jwt.svg" loading="lazy" alt="" /></div>
                <div className="svg-card-content-container text-center gap-16">
                  <div className="tools-svg-card-content-title left inter color-2e2e2e mobile-20px">JWK to PEM</div>
                  <div className="tools-svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Paste a JWK JSON object and export a PEM formatted key for CLIs, servers, or legacy tooling. Use <strong>JWK to PEM</strong> when you need a PEM public key for OpenSSL or server-side libraries while maintaining <code>kid</code>, <code>alg</code>, and <code>use</code> metadata in your JWK set.</div>
                </div>
              </div>
              <div className="tools-svg-card">
                <div className="svg-card-image-container"><img src="/images/tools-jwt-encryption.svg" loading="lazy" alt="" /></div>
                <div className="svg-card-content-container text-center gap-16">
                  <div className="tools-svg-card-content-title left inter color-2e2e2e mobile-20px">Generate JWK</div>
                  <div className="tools-svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Create new keys with the <strong>JWK generator</strong> mode. Choose key <strong>use</strong> (signature <code>sig</code> or encryption <code>enc</code>), key <strong>type</strong> (RSA, EC, OKP, or <code>oct</code>), and configure size/curve/parameters. The generator suggests <code>alg</code> values and auto-generates a <code>kid</code> you can edit. Output options include a single JWK or a full <strong>JWKS</strong> (<code>jwks.json</code>) ready to host.</div>
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
              <h2 className="title features-page-v2">How the JWK Generator Works</h2>
            </div>
            <div className="tools-step">
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-step">Step 1.</div>
                <div className="tools-step-title">Convert Between PEM and JWK:</div>
                <ul role="list" className="tools-step-content">
                  <li>Paste your PEM key to convert it into a JSON Web Key format or vice versa.</li>
                  <li>Copy the converted key for use in your applications.</li>
                </ul>
                <div className="tools-step-title">Why use PEM → JWK?</div>
                <ul role="list" className="tools-step-content">
                  <li>Many libraries and identity platforms expect JWK/JWKS. Converting PEM to JWK makes your keys consumable by JWT verification flows and by any service that reads a <code>jwks.json</code> at a <code>jwks_uri</code>.</li>
                </ul>
              </div>
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-step">Step 2.</div>
                <div className="tools-step-title">Generate New Keys:</div>
                <ul role="list" className="tools-step-content">
                  <li>Select whether you want a key for signature or encryption tasks.</li>
                  <li>Choose the key type suitable for your security needs, such as symmetric (oct), RSA, or elliptic curve (EC or OKP).</li>
                  <li>Pick the cryptographic algorithm to match your system requirements (e.g., RS256 for RSA signature).</li>
                  <li>Receive the generated keys:Symmetric:</li>
                  <li className="list-sub">a. Secret key string + JWK JSON.</li>
                  <li className="list-sub">b. Asymmetric: PEM-formatted private and public keys + corresponding JWK objects for private and public key parts.</li>
                </ul>
              </div>
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-step">Step 3.</div>
                <div className="tools-step-title">Use Your Keys Securely:</div>
                <ul role="list" className="tools-step-content">
                  <li>Implement these keys to sign or encrypt JWTs.</li>
                  <li>Host JWK sets on your authorization servers for key discovery.</li>
                  <li>Rotate and manage keys easily for robust security posture.</li>
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
                <h2 className="tools-faq-title">
                  <a href="https://www.authgear.com/post/what-is-jwks">What is a JWK</a> (JSON Web Key)?
                </h2>
                <div className="tools-faq-content">A JWK is a JSON data structure that represents a cryptographic key. A JWKS (JSON Web Key Set) is an object with a <code>keys</code> array of JWKs. JWKS is the standard format used by identity providers to publish public keys at a <code>jwks_uri</code> so clients can validate JWT tokens (see RFC 7517). If you searched &quot;what is jwks&quot; or &quot;jwks uri&quot;, this is the format you need.</div>
                <div className="w-layout-hflex tools-faq-check-list">
                  <img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                  <div className="tools-faq-content">Machine-friendly JSON format, easy to use across web APIs</div>
                </div>
                <div className="w-layout-hflex tools-faq-check-list">
                  <img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                  <div className="tools-faq-content">Supports all key types—symmetric and asymmetric</div>
                </div>
                <div className="w-layout-hflex tools-faq-check-list">
                  <img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                  <div className="tools-faq-content">Facilitates key rotation and management for modern applications</div>
                </div>
              </div>
              <div className="w-layout-hflex tools-faq-card">
                <img src="/images/tools-qa-encryption.svg" loading="lazy" alt="" className="image-93" />
                <h2 className="tools-faq-title">What is PEM</h2>
                <div className="tools-faq-content">PEM (Privacy Enhanced Mail) is the base64-encoded format commonly used to store and share cryptographic keys and certificates. Use <strong>PEM to JWK</strong> conversions to make PEM keys consumable by JWKS endpoints and modern JOSE libraries.</div>
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
                      <div className="tools-faq-content"><strong>Never use generated private keys in production.</strong> For production, generate and store private keys in a secure HSM or KMS.</div>
                    </div>
                    <div className="w-layout-hflex tools-faq-check-list">
                      <img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                      <div className="tools-faq-content"><strong>Use appropriate key sizes and modern algorithms</strong> (e.g., Ed25519 when supported).</div>
                    </div>
                    <div className="w-layout-hflex tools-faq-check-list">
                      <img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                      <div className="tools-faq-content"><strong>Host JWKS over HTTPS</strong> at a stable <code>jwks_uri</code> and rotate keys regularly — publish new keys with new <code>kid</code> values and remove deprecated keys safely.</div>
                    </div>
                    <div className="w-layout-hflex tools-faq-check-list">
                      <img src="/images/Checkmark.svg" loading="lazy" width="Auto" height="Auto" alt="" />
                      <div className="tools-faq-content"><strong>Include <code>kid</code> and <code>alg</code> metadata </strong>in your JWKs so clients can select the right key when verifying JWTs.</div>
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
