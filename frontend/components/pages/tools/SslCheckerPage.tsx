import Link from 'next/link';
import PageScripts from '@/components/PageScripts';

const pageScripts: string[] = [
  // No functional page scripts on this page
];

interface Props {
  locale: string;
}

export default async function SslCheckerPage(_props: Props) {
  return (
    <>
      <section className="tools-section bg-f9f9fb">
        <div className="w-layout-blockcontainer container-default tools-heading w-container">
          <h1 className="tools-h1">Free SSL Checker</h1>
          <p className="tools-description">Enter any domain to instantly check its SSL/TLS certificate. View expiration date, issuer, subject alternative names (SANs), and full certificate chain status — no login required.</p>
        </div>
      </section>
      <section>
        <div className="w-layout-blockcontainer tools-container w-container">
          <div className="w-embed w-iframe">
            <iframe id="ssl-checker-iframe" loading="lazy" src="https://authgear-widget-ssl-cert-inspector.vercel.app/" title="SSL Certificate Inspector" width="100%" height="800px" frameBorder="0" scrolling="yes" style={{border: 'none', width: '100%', height: '800px', minHeight: '600px'}} allow="clipboard-read; clipboard-write" allowFullScreen></iframe>
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
                <div className="svg-card-image-container">
                  <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M24.4961 42.6484H32.9301C38.8281 42.6484 42.4961 38.4864 42.4961 32.5964V16.7024C42.4961 10.8124 38.8281 6.64844 32.9321 6.64844H16.062C10.184 6.64844 6.49609 10.8124 6.49609 16.7024V32.5964C6.49609 38.4864 10.166 42.6484 16.062 42.6484H17.2233" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M35.3213 34.2288H31.8555V25.7188" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M25.9877 25.7344H24.5497C23.3777 25.7344 22.4297 26.6822 22.4297 27.8522C22.4297 29.0222 23.3777 29.9704 24.5497 29.9704H24.8477C26.0177 29.9704 26.9657 30.9204 26.9657 32.0884C26.9657 33.2604 26.0177 34.2084 24.8477 34.2084H23.3497" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M17.099 25.7344H15.6609C14.4909 25.7344 13.543 26.6822 13.543 27.8522C13.543 29.0222 14.4909 29.9704 15.6609 29.9704H15.959C17.131 29.9704 18.079 30.9204 18.079 32.0884C18.079 33.2604 17.131 34.2084 15.959 34.2084H14.4629" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M35.2367 19.625H6.50391" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M13.208 13.7422H13.082M18.1801 13.7422H18.0541M23.1522 13.7422H23.026" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg></div>
                </div>
                <div className="svg-card-content-container text-center gap-16">
                  <div className="tools-svg-card-content-title left inter color-2e2e2e mobile-20px">Certificate Details Inspection</div>
                  <div className="tools-svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">View detailed SSL certificate information for any HTTPS domain, including subject, issuer, validity period, subject alternative names (SANs), fingerprints, and other technical attributes.</div>
                </div>
              </div>
              <div className="tools-svg-card">
                <div className="svg-card-image-container">
                  <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M42 30.1888C42 35.7192 38.3104 40.2144 32.8366 40.2008H15.1635C9.68952 40.2144 6 35.7192 6 30.1888V17.8263C6 12.3018 9.68952 7.80078 15.1635 7.80078H32.8366C38.3104 7.80078 42 12.3018 42 17.8263V30.1888Z" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M13.3828 26.0156H18.7828M13.3828 31.765H25.9828" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path fillRule="evenodd" clipRule="evenodd" d="M33.503 21.633H28.533C27.9162 21.633 27.418 21.133 27.418 20.518V16.4529C27.418 15.8361 27.9162 15.3379 28.533 15.3379H33.503C34.1178 15.3379 34.618 15.8361 34.618 16.4529V20.518C34.618 21.133 34.1178 21.633 33.503 21.633Z" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg></div>
                </div>
                <div className="svg-card-content-container text-center gap-16">
                  <div className="tools-svg-card-content-title left inter color-2e2e2e mobile-20px">Certificate Chain Status</div>
                  <div className="tools-svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Verify whether the certificate chain is complete and trusted. Quickly check chain validity, trusted root status, and the total number of certificates in the chain.</div>
                </div>
              </div>
              <div className="tools-svg-card">
                <div className="svg-card-image-container">
                  <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M13.6368 29.1445L9.98688 30.9007C8.13598 31.7631 8.03784 34.3751 9.81878 35.3755L20.3124 41.2711C22.8324 42.6871 25.9012 42.6871 28.4212 41.2711" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round"></path>
                    <path d="M35.3473 29.0039L38.9705 30.8463C40.7639 31.7491 40.8215 34.3045 39.0707 35.2883L33.7461 38.2797" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round"></path>
                    <path d="M35.2074 20.1788L38.4874 21.9532L39.2884 22.4032C40.9946 23.3618 40.9946 25.8332 39.2884 26.7918L28.4224 32.8966C25.9024 34.3124 22.8336 34.3124 20.3136 32.8966L9.44763 26.7918C7.74141 25.8332 7.74141 23.3618 9.44763 22.4032L10.2485 21.9532L13.4408 20.125" stroke="#0043E0" strokeWidth="3"></path>
                    <path d="M28.4224 7.39782C25.9024 5.98198 22.8336 5.98198 20.3136 7.3978L9.44763 13.5026C7.74141 14.4612 7.74141 16.9326 9.44763 17.8912L20.3136 23.996C22.8336 25.4118 25.9024 25.4118 28.4224 23.996L39.2884 17.8912C40.9946 16.9326 40.9946 14.4612 39.2884 13.5026L33.8554 10.4502" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round"></path>
                  </svg></div>
                </div>
                <div className="svg-card-content-container text-center gap-16">
                  <div className="tools-svg-card-content-title left inter color-2e2e2e mobile-20px">Certificate Chain Visualization</div>
                  <div className="tools-svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Inspect the full certificate hierarchy from the leaf certificate (your domain) through intermediate certificates to the root certificate authority.</div>
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
                <div className="tools-step-title">Enter a website URL (for example: <span className="text-span-49">https://www.authgear.com/</span>) and click Inspect.</div>
              </div>
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-step">Step 2.</div>
                <div className="tools-step-title">Retrieve certificate information. The tool connects to the server and fetches the SSL/TLS certificate presented by the website.</div>
              </div>
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-step">Step 3.</div>
                <div className="tools-step-title">Review certificate details and chain. The results display certificate metadata, chain status, and the full certificate hierarchy.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="tools-ready-to">
        <div className="login-default-inner-section gallery-footer">
          <img src="/images/ui_gallery_authgear-circle.svg" loading="lazy" alt="" />
          <p className="paragraph-13">Ready to Add HTTPS and Authentication to Your App?</p>
          <p className="paragraph-12 speciial-color">Authgear is an authentication platform that handles login, MFA, SSO, and session management for your app, so your team doesn&apos;t have to build it from scratch.</p>
          <a href="https://accounts.portal.authgear.com/signup" className="gallery-button gallery-page-button w-button">Get Started for Free</a>
        </div>
      </section>
      <section>
        <div className="container-default">
          <div className="container-default-inner px-0 gap-0">
            <div className="w-layout-vflex tools-faq">
              <div className="w-layout-hflex tools-faq-card">
                <img src="/images/tools-qa-what-is.svg" loading="lazy" alt="" className="image-93" />
                <h2 className="tools-faq-title">What Is an SSL Certificate?</h2>
                <div className="tools-faq-content">An SSL certificate (more accurately a TLS certificate — SSL is the older name that stuck) enables encrypted HTTPS communication between a user&apos;s browser and a web server. It does two things:<br /><br /><strong>Encryption</strong> — scrambles data in transit so it can&apos;t be read by anyone intercepting the connection.<br /><br /><strong>Identity verification</strong> — proves that the server you&apos;re connecting to is actually who it claims to be, not an impostor. Certificates are issued by Certificate Authorities (CAs) — trusted third parties like Let&apos;s Encrypt, DigiCert, and Sectigo. When your browser connects to a site, it checks that the certificate was issued by a CA it trusts, the domain matches, and the certificate hasn&apos;t expired.</div>
                <div className="tools-faq-content"><strong>Types of SSL/TLS certificates:<br /><br /></strong><strong>DV (Domain Validated) <br /></strong>Confirms domain ownership only. Fast and cheap (Let&apos;s Encrypt is DV). Suitable for most sites.<br /><br /><strong>OV (Organization Validated)</strong> <br />Verifies the organization behind the domain. Common for business sites.<br /><br /><strong>EV (Extended Validation)</strong> <br />The highest level; requires rigorous identity checks. Used by banks and large enterprises.</div>
              </div>
              <div className="w-layout-hflex tools-faq-card">
                <img src="/images/tools-qa-encryption.svg" loading="lazy" alt="" className="image-93" />
                <h2 className="tools-faq-title">What Is a Certificate Chain?</h2>
                <div className="tools-faq-content">A certificate chain is a sequence of certificates that links your website&apos;s certificate back to a root Certificate Authority (CA) that browsers trust. The chain has three levels:<br /><br /><strong>Leaf certificate</strong> (your site&apos;s certificate) — issued directly to your domain.<br /><br /><strong>Intermediate certificate(s)</strong> — issued by the root CA to an intermediate CA, which then issues certificates to websites. This keeps the root CA offline and protected.<br /><br /><strong>Root certificate</strong> — self-signed by a trusted CA. Pre-installed in browsers and operating systems.<br /><br /><strong>Why does this matter?</strong> <br />If the intermediate certificate is missing from the server&apos;s configuration, browsers can&apos;t verify the chain and will show a security error — even if your leaf certificate is perfectly valid. This is one of the most common SSL configuration mistakes. Our checker visualizes the full chain so you can spot gaps instantly.</div>
              </div>
              <div className="w-layout-hflex tools-faq-card">
                <img src="/images/tools-qa-encryption.svg" loading="lazy" alt="" className="image-93" />
                <h2 className="tools-faq-title">How long do SSL certificates last?</h2>
                <div className="tools-faq-content">Let&apos;s Encrypt certificates expire every 90 days (auto-renewing). Paid CA certificates typically last 1–2 years. Since September 2020, the maximum validity period for publicly trusted certificates is 398 days. Apple and Google are pushing toward 90-day maximums industry-wide.<br /><br /><strong>What happens when an SSL certificate expires?</strong> <br /><br />Browsers immediately show a &quot;Your connection is not private&quot; error and block users from reaching the site. This is why monitoring expiry dates matters.</div>
              </div>
              <div className="w-layout-hflex tools-faq-card">
                <img src="/images/tools-qa-encryption.svg" loading="lazy" alt="" className="image-93" />
                <h2 className="tools-faq-title">SSL vs TLS — What&apos;s the Difference?</h2>
                <div className="tools-faq-content">SSL (Secure Sockets Layer) is the original protocol, now deprecated. All versions of SSL have known security vulnerabilities. TLS (Transport Layer Security) is its successor and what all modern HTTPS connections actually use — TLS 1.2 and TLS 1.3.</div>
                <div className="tools-faq-content">The term &quot;SSL certificate&quot; is still widely used, but technically every certificate in use today is a TLS certificate. When people say &quot;SSL checker&quot;, they mean checking the TLS certificate on a server. This tool checks both — it reports the TLS version negotiated and the certificate details.</div>
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
