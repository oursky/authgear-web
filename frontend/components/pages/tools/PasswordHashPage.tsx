import Link from 'next/link';
import PageScripts from '@/components/PageScripts';

const pageScripts: string[] = [
  // No functional page scripts on this page
];

interface Props {
  locale: string;
}

export default async function PasswordHashPage(_props: Props) {
  return (
    <>
      <section className="tools-section bg-f9f9fb">
        <div className="w-layout-blockcontainer container-default tools-heading w-container">
          <h1 className="tools-h1">Password Hash Generator and Verifier<br />(Argon2id, bcrypt, scrypt, PBKDF2)</h1>
          <p className="tools-description">Client-side tool to generate/verify password hashes with realistic parameters. Helpful for debugging integrations and understanding how salts, memory, and iterations affect cost. Runs locally—no passwords leave your browser.</p>
        </div>
      </section>
      <section>
        <div className="w-layout-blockcontainer tools-container w-container">
          <div className="w-embed w-iframe">
            <iframe src="https://authgear.github.io/authgear-widget-password-hash/" title="JWT &amp; JWE Debugger" width="100%" height="1000px" frameBorder="0" scrolling="yes" style={{border: 'none', width: '100%', height: '1000px', minHeight: '600px'}} allow="clipboard-read; clipboard-write" allowFullScreen></iframe>
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
            <p className="paragraph-18">Your data security is our top priority. All hashing and verification happen in this browser. This tool does not store or send your password nor hashes outside of the browser. See source code in: <a href="#">https://github.com/authgear/authgear-widget-password-hash</a></p>
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
              <Link href="/tools/password-hash-generator" aria-current="page" className="more-tools w-inline-block w--current">
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
          <div className="top-content feature-flex">
            <h2 className="title features-page-v2">Supported Password Hashing Functions</h2>
          </div>
          <div className="container-default-inner px-0 gap-0">
            <div className="w-layout-hflex _4-card-grid-tools hashing">
              <div className="tools-svg-card">
                <div className="svg-card-content-container text-center gap-16">
                  <div className="tools-svg-card-content-title left inter color-2e2e2e mobile-20px">Argon2id Generator &amp; Parameters</div>
                  <div className="tools-svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Argon2id is a modern, memory-hard function that raises the attacker&apos;s cost on GPUs/ASICs. Tune <em>memory</em>, <em>iterations (t)</em>, and <em>parallelism (p)</em> until your authentication path lands around <strong>250–500ms</strong> on production hardware. Use a unique random salt per password (16–32 bytes).</div>
                </div>
              </div>
              <div className="tools-svg-card">
                <div className="svg-card-content-container text-center gap-16">
                  <div className="tools-svg-card-content-title left inter color-2e2e2e mobile-20px">bcrypt Generator (cost/rounds)</div>
                  <div className="tools-svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">bcrypt is battle-tested and widely available. Increase <em>cost</em> to slow brute-force attempts, while keeping login UX responsive. We output the <code>$2b$</code> format for broad compatibility.</div>
                </div>
              </div>
              <div className="tools-svg-card">
                <div className="svg-card-content-container text-center gap-16">
                  <div className="tools-svg-card-content-title left inter color-2e2e2e mobile-20px">scrypt Generator (N, r, p)</div>
                  <div className="tools-svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">scrypt adds memory-hardness. Increase <em>N</em> (e.g., 2<sup>15</sup>–2<sup>19</sup>) to raise attacker cost; adjust <em>r</em> and <em>p</em> to balance memory and parallelism.</div>
                </div>
              </div>
              <div className="tools-svg-card">
                <div className="svg-card-content-container text-center gap-16">
                  <div className="tools-svg-card-content-title left inter color-2e2e2e mobile-20px">PBKDF2 Generator (SHA-256 / SHA-512)</div>
                  <div className="tools-svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">PBKDF2 remains a compatibility workhorse. Use high iteration counts (hundreds of thousands or more) and revisit yearly as hardware improves.</div>
                </div>
              </div>
              <div className="tools-svg-card">
                <div className="svg-card-content-container text-center gap-16">
                  <div className="tools-svg-card-content-title left inter color-2e2e2e mobile-20px">Salts (and Optional Pepper)</div>
                  <div className="tools-svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">The tool generates cryptographically secure salts and lets you set length and encoding (Hex/Base64). Some deployments also add a <em>pepper</em> (site-wide server secret) that&apos;s not stored in the hash. Use peppers carefully and manage them like other secrets.</div>
                  <div className="tools-svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Read more:<br />
                    <a href="https://www.authgear.com/post/password-hashing-salting-function-and-algorithm-explained" target="_blank">Password hashing &amp; salting explained</a>  •  <a href="https://www.authgear.com/post/password-hashing-how-to-pick-the-right-hashing-function" target="_blank">How to pick the right hashing function</a><br />
                  </div>
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
              <h2 className="title features-page-v2">How to use the Password Hash Generator</h2>
            </div>
            <div className="tools-step">
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-step">Step 1.</div>
                <div className="tools-step-title">Enter a password</div>
                <ul role="list" className="tools-step-content">
                  <li>Open the <strong>Generate</strong> tab and type a demo password (avoid real credentials).</li>
                </ul>
              </div>
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-step">Step 2.</div>
                <div className="tools-step-title">Select an algorithm</div>
                <ul role="list" className="tools-step-content">
                  <li>For new systems, <strong>Argon2id</strong> is generally recommended.</li>
                </ul>
              </div>
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-step">Step 3.</div>
                <div className="tools-step-title">Set parameters:</div>
                <ul role="list" className="tools-step-content">
                  <li><strong>Argon2id</strong>: Memory (MiB), Iterations (t), Parallelism (p).</li>
                  <li><strong>bcrypt</strong>: Cost (2<sup>cost</sup> rounds).</li>
                  <li><strong>scrypt</strong>: N (power of two), r, p.</li>
                  <li><strong>PBKDF2</strong>: Iterations and digest (SHA-256/512).</li>
                </ul>
              </div>
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-step">Step 4.</div>
                <div className="tools-step-title">Generate Password Hash</div>
                <ul role="list" className="tools-step-content">
                  <li>Click <strong>Generate Password Hash</strong>. Copy the encoded string.</li>
                </ul>
              </div>
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-step">Step 5.</div>
                <div className="tools-step-title">Verify Password Hash</div>
                <ul role="list" className="tools-step-content">
                  <li>Switch to <strong>Verify Password Hash</strong> to test a password + encoded hash pair.</li>
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
                <h2 className="tools-faq-title">Is it safe to use this with real passwords?</h2>
                <div className="tools-faq-content">All hashing happens locally in your browser. For your own safety, avoid using production secrets in any online tool.</div>
              </div>
              <div className="w-layout-hflex tools-faq-card">
                <img src="/images/tools-qa-encryption.svg" loading="lazy" alt="" className="image-93" />
                <h2 className="tools-faq-title">Which hashing function should I use?</h2>
                <div className="tools-faq-content">For new systems, Argon2id is generally recommended. bcrypt and scrypt are widely deployed; PBKDF2 is a compatibility fallback. Always benchmark and choose parameters that meet your latency targets.</div>
              </div>
              <div className="w-layout-hflex tools-faq-card">
                <img src="/images/tools-qa-best-practice.svg" loading="lazy" alt="" className="image-93" />
                <h2 className="tools-faq-title">How long should hashing take?</h2>
                <div className="tools-faq-content">Many teams target ~250–500ms in the authentication path. Pick the slowest settings that still keep UX smooth on your production hardware.</div>
              </div>
              <div className="w-layout-hflex tools-faq-card">
                <img src="/images/tools-qa-what-is.svg" loading="lazy" alt="" className="image-93" />
                <h2 className="tools-faq-title">Why won&apos;t my framework verify the hash?</h2>
                <div className="tools-faq-content">Common issues: whitespace/line endings, encoding mismatch (hex vs Base64), bcrypt prefix differences (<code>$2a$</code> vs <code>$2b$</code>), or forgetting a pepper.</div>
              </div>
              <div className="w-layout-hflex tools-faq-card">
                <img src="/images/tools-qa-encryption.svg" loading="lazy" alt="" className="image-93" />
                <h2 className="tools-faq-title">What salt length should I use?</h2>
                <div className="tools-faq-content">16–32 bytes of random data is standard. The tool defaults to secure randomness and shows length and encoding.</div>
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
