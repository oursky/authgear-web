import Link from 'next/link';


interface Props {
  locale: string;
}

export default async function OidcDiscoveryPage(_props: Props) {
  return (
    <>
      <section className="tools-section bg-f9f9fb">
        <div className="w-layout-blockcontainer container-default tools-heading w-container">
          <h1 className="tools-h1">OpenID Connect Discovery Explorer</h1>
          <p className="tools-description">Enter any OIDC issuer URL to fetch its discovery endpoint. Instantly inspect the full .well-known/openid-configuration endpoints, supported scopes, signing algorithms, and JWKS, no login required.</p>
        </div>
      </section>
      <section>
        <div className="w-layout-blockcontainer tools-container w-container">
          <div className="w-embed w-iframe">
            <iframe src="https://authgear.github.io/discovery-endpoint-explorer/" title="OIDC Discover Endpoint Explorer" width="100%" height="800px" frameBorder="0" scrolling="yes" style={{border: 'none', width: '100%', height: '800px', minHeight: '600px'}} allow="clipboard-read; clipboard-write" allowFullScreen></iframe>
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
            <p className="paragraph-18">Your data security is our top priority. Everything runs locally in your browser.<br />The tool fetches the discovery document directly from the OIDC provider using your browser. Authgear never sees or logs your requests.</p>
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
                    <path d="M29.5874 31.3508C28.9512 31.9248 28.5872 32.7402 28.5872 33.5964V37.5038C28.5872 38.7414 27.8342 39.8526 26.6842 40.3118L22.9868 41.783C21.002 42.573 18.8458 41.1116 18.8458 38.975V32.6408C18.8458 31.841 18.5286 31.0724 17.9604 30.5042L9.38458 22.8684C7.99518 21.4808 7.21484 19.5972 7.21484 17.6317V13.6036C7.21484 10.6925 9.57528 8.33203 12.4884 8.33203" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M36.4331 8.33203C39.3443 8.33203 41.7047 10.6925 41.7047 13.6036V16.2832C41.7047 18.3809 40.8153 20.3814 39.2585 21.7844L34.4219 26.5676" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M24.4584 17.8489V6M29.0618 13.2308L24.4616 17.8505L19.8633 13.2308" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg></div>
                </div>
                <div className="svg-card-content-container text-center gap-16">
                  <div className="tools-svg-card-content-title left inter color-2e2e2e mobile-20px">OpenID Configuration Fetching</div>
                  <div className="tools-svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Automatically fetch the OpenID Connect discovery document from<br />/.well-known/openid-configuration based on the issuer URL you provide.</div>
                </div>
              </div>
              <div className="tools-svg-card">
                <div className="svg-card-image-container">
                  <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M16.5 23.9883H40.5014" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M28.5006 35.9883H40.5014M16.5 35.9883H22.5004" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M16.5 11.9883H28.5006M34.501 11.9883H40.5014" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M8.52069 11.9628V12.0907M9.03921 11.9903C9.03921 12.2783 8.80553 12.5118 8.51749 12.5118C8.22947 12.5118 7.99609 12.2783 7.99609 11.9903C7.99609 11.7022 8.22947 11.4688 8.51749 11.4688C8.80553 11.4688 9.03921 11.7022 9.03921 11.9903Z" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M8.52069 24.2245V24.3525M9.03921 24.2521C9.03921 24.5401 8.80553 24.7737 8.51749 24.7737C8.22947 24.7737 7.99609 24.5401 7.99609 24.2521C7.99609 23.9641 8.22947 23.7305 8.51749 23.7305C8.80553 23.7305 9.03921 23.9641 9.03921 24.2521Z" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M8.52069 35.9627V36.0908M9.03921 35.9902C9.03921 36.2784 8.80553 36.5117 8.51749 36.5117C8.22947 36.5117 7.99609 36.2784 7.99609 35.9902C7.99609 35.7022 8.22947 35.4688 8.51749 35.4688C8.80553 35.4688 9.03921 35.7022 9.03921 35.9902Z" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg></div>
                </div>
                <div className="svg-card-content-container text-center gap-16">
                  <div className="tools-svg-card-content-title left inter color-2e2e2e mobile-20px">Key Endpoints Summary</div>
                  <div className="tools-svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Quickly view essential endpoints and identifiers, including the issuer, authorization endpoint, token endpoint, JWKS URI, and other commonly used configuration fields.</div>
                </div>
              </div>
              <div className="tools-svg-card">
                <div className="svg-card-image-container">
                  <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M14.2139 17.5703L6.5 23.9978L14.2139 30.4274" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M34.7852 17.5703L42.499 23.9978L34.7852 30.4274" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M24.4986 24L19.3555 38.1434" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M29.6419 9.85938L27.0703 16.9311" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg></div>
                </div>
                <div className="svg-card-content-container text-center gap-16">
                  <div className="tools-svg-card-content-title left inter color-2e2e2e mobile-20px">JSON Discovery Output</div>
                  <div className="tools-svg-card-content-description inter text-align-left mobile-16px color-626262 line-height-26px">Inspect the full discovery document in a syntax-highlighted JSON view.<br />Easily copy the entire response or individual fields for debugging or documentation.</div>
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
                <div className="tools-step-title">Enter the Discovery URL (for example: <strong>https://accounts.google.com/.well-known/openid-configuration</strong> or <strong>https://project.authgear.cloud/.well-known/openid-configuration</strong>) and click Fetch.</div>
              </div>
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-step">Step 2.</div>
                <div className="tools-step-title">Review the parsed metadata, core endpoints, and provider capabilities.</div>
              </div>
              <div className="w-layout-vflex tools-step-card">
                <div className="tools-step-step">Step 3.</div>
                <div className="tools-step-title">Copy individual fields with one click, inspect raw JSON, or see the JWKS.</div>
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
                <h2 className="tools-faq-title">What is the discovery endpoint in OIDC?</h2>
                <div className="tools-faq-content">The OIDC discovery endpoint is a standardized URL at <span className="code-label">{'{issuer}'}/.well-known/openid-configuration</span> that returns a JSON document describing the provider&apos;s configuration. It lists the authorization endpoint, token endpoint, JWKS URI, supported scopes, response types, signing algorithms, and other capabilities. Clients can use it to configure themselves automatically without hardcoding endpoint URLs.</div>
              </div>
              <div className="w-layout-hflex tools-faq-card">
                <img src="/images/tools-qa-encryption.svg" loading="lazy" alt="" className="image-93" />
                <h2 className="tools-faq-title">Do all OIDC providers support discovery?</h2>
                <div className="tools-faq-content">Most modern, compliant OIDC providers support discovery. It is required by the OpenID Connect specification for providers that want to support automatic client configuration. Some older or proprietary identity systems may not expose a <span className="code-label">/.well-known/openid-configuration</span> endpoint — in that case, you&apos;ll need to configure endpoints manually. If a fetch in this tool fails, the provider either doesn&apos;t support discovery or has access restrictions on the endpoint.</div>
              </div>
              <div className="w-layout-hflex tools-faq-card">
                <img src="/images/tools-qa-encryption.svg" loading="lazy" alt="" className="image-93" />
                <h2 className="tools-faq-title">What is the actual OpenID discovery URL?</h2>
                <div className="tools-faq-content">The discovery URL format is <span className="code-label">{'{issuer}'}/.well-known/openid-configuration</span>, where {'{issuer}'} is the base URL of your OpenID Connect provider. <br />For example: Google uses <span className="code-label">https://accounts.google.com/.well-known/openid-configuration</span>, Okta uses <span className="code-label">https://{'{'+'yourOktaDomain}'}/.well-known/openid-configuration</span>, and Authgear uses <span className="code-label">https://{'{'+'your-project}'}.authgear.cloud/.well-known/openid-configuration</span>. Enter any issuer URL above and this tool will fetch it automatically.</div>
              </div>
              <div className="w-layout-hflex tools-faq-card">
                <img src="/images/tools-qa-encryption.svg" loading="lazy" alt="" className="image-93" />
                <h2 className="tools-faq-title">What is a discovery endpoint?</h2>
                <div className="tools-faq-content">A discovery endpoint is a well-known URL that a service exposes to describe its capabilities and configuration. In OpenID Connect, the discovery endpoint follows the path <span className="code-label">/.well-known/openid-configuration</span> (defined in RFC 8414). It allows client applications to dynamically discover the provider&apos;s endpoints and supported features without manual configuration.</div>
              </div>
              <div className="w-layout-hflex tools-faq-card">
                <img src="/images/tools-qa-encryption.svg" loading="lazy" alt="" className="image-93" />
                <h2 className="tools-faq-title">Do OIDC providers from the same vendor (Okta, Azure, Keycloak) have different discovery URLs?</h2>
                <div className="tools-faq-content">Yes. The discovery URL format is consistent (/.well-known/openid-configuration), but the base issuer URL differs. For Azure AD, it&apos;s typically &quot;https://login.microsoftonline.com/{'{tenant-id}'}/v2.0&quot;. For Keycloak, it&apos;s &quot;https://{'{host}'}/realms/{'{realm}'}&quot;. For Okta, it&apos;s &quot;https://{'{yourOktaDomain}'}&quot;. Enter the issuer URL for your provider above and the tool resolves the full discovery URL automatically.</div>
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
