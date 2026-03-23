import { getTranslations } from 'next-intl/server';
import PageScripts from '@/components/PageScripts';

interface Props {
  locale: string;
}

const pageScripts: string[] = [
  `// disable first option from dropdown
  let selectionDropdown = document.getElementById("how-hear");
  let selectionOptions = selectionDropdown.getElementsByTagName("option");
  selectionOptions[0].disabled = true;`
];

export default async function AuthToolkitPage({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'AuthToolkit' });
  void t;

  return (
    <>
      <div className="page-wrapper">


        <div className="div-block-31">
          <section className="glossary toolkit">
            <div className="login-default-inner-section gallery-banner">
              <div className="w-layout-hflex flex-block-81">
                <div className="w-layout-hflex tookkit-tag free-tag">
                  <div className="tag-text">Free</div>
                </div>
                <div className="w-layout-hflex tookkit-tag">
                  <div className="tag-text">Open-source</div>
                </div>
              </div>
              <h1 className="glossary-h1 toolkit">Auth Developer<br /><span className="text-span-44">Mini-Toolkit</span></h1>
              <p className="glossary-subtitle subtitle-paddings toolkit">In-browser JWT/JWE, JWK/JWKS, HMAC, SAML, and TOTP tools for developers. Perfect for authentication development and testing.</p>
              <div className="w-embed">
                <a href="https://www.producthunt.com/products/developer-auth-mini-toolkit-by-authgear?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-developer&#0045;auth&#0045;mini&#0045;toolkit&#0045;by&#0045;authgear" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1014586&theme=light&t=1757429766572" alt="Developer&#0032;Auth&#0032;Mini&#0045;Toolkit&#0032;by&#0032;Authgear - 5&#0032;minitools&#0032;for&#0032;auth&#0032;builders | Product Hunt" style={{"width": "250px", "height": "54px"}} width="250" height="54" /></a>
              </div>
              <a href="https://github.com/authgear/authgear-server/" target="_blank" className="w-inline-block"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/authgear/authgear-server?style=social&amp;label=GitHub%20Stars" /></a>
            </div>
          </section>
          <section>
            <div className="login-default-inner-section glossary-content-inner-section">
              <div className="w-layout-hflex flex-block-82">
                <div className="w-layout-vflex toolkit-card">
                  <div className="w-layout-hflex flex-block-83">
                    <div className="toolkit-icon"><img src="/images/jwt-jwe-debugger.svg" loading="lazy" alt="" /></div>
                    <div className="color-white">JWT &amp; JWE Debugger</div>
                  </div>
                  <p className="toolkit-description">Decode &amp; verify JWTs; encrypt/decrypt JWEs.</p>
                  <a href="/tools/jwt-jwe-debugger" className="toolkit-button w-inline-block">
                    <div className="toolkit-button-label">Open JWT &amp; JWE Debugger</div><img src="/images/link.svg" loading="lazy" alt="" className="image-94" />
                  </a>
                </div>
                <div className="w-layout-vflex toolkit-card">
                  <div className="w-layout-hflex flex-block-83">
                    <div className="toolkit-icon"><img src="/images/jwk-enerator.svg" loading="lazy" alt="" /></div>
                    <div className="color-white">JWK Generator</div>
                  </div>
                  <p className="toolkit-description">Convert PEM &lt;&gt; JWK, JWK &lt;&gt; PEM, export JWKS for jwks_uri</p>
                  <a href="/tools/jwk-generator" className="toolkit-button w-inline-block">
                    <div className="toolkit-button-label">Open JWK Generator</div><img src="/images/link.svg" loading="lazy" alt="" className="image-94" />
                  </a>
                </div>
                <div className="w-layout-vflex toolkit-card">
                  <div className="w-layout-hflex flex-block-83">
                    <div className="toolkit-icon"><img src="/images/hmac-tool.svg" loading="lazy" width="24" alt="" /></div>
                    <div className="color-white">HMAC Tool</div>
                  </div>
                  <p className="toolkit-description">Generate &amp; verify HMAC SHA-256/384/512 for webhooks.</p>
                  <a href="/tools/hmac-signature-generator-verifier" className="toolkit-button w-inline-block">
                    <div className="toolkit-button-label">Open HMAC Tool</div><img src="/images/link.svg" loading="lazy" alt="" className="image-94" />
                  </a>
                </div>
                <div className="w-layout-vflex toolkit-card">
                  <div className="w-layout-hflex flex-block-83">
                    <div className="toolkit-icon"><img src="/images/saml-testing-tool.svg" loading="lazy" alt="" /></div>
                    <div className="color-white">SAML Testing Tool</div>
                  </div>
                  <p className="toolkit-description">Spin up a mock SAML SP to test SAML assertions.</p>
                  <a href="https://samlsp.com/en/" className="toolkit-button w-inline-block">
                    <div className="toolkit-button-label">Open SAML Testing Tool</div><img src="/images/link.svg" loading="lazy" alt="" className="image-94" />
                  </a>
                </div>
                <div className="w-layout-vflex toolkit-card">
                  <div className="w-layout-hflex flex-block-83">
                    <div className="toolkit-icon"><img src="/images/totp-authenticator.svg" loading="lazy" alt="" /></div>
                    <div className="color-white">TOTP Authenticator</div>
                  </div>
                  <p className="toolkit-description">Quickly test OTP codes (RFC 6238).</p>
                  <a href="/tools/totp-authenticator" className="toolkit-button w-inline-block">
                    <div className="toolkit-button-label">Open TOTP Authenticator</div><img src="/images/link.svg" loading="lazy" alt="" className="image-94" />
                  </a>
                </div>
                <div id="w-node-_8280b323-5bfe-3f28-a75e-858c11c5fecb-f4d663f6" className="w-layout-vflex toolkit-card">
                  <div className="w-layout-hflex flex-block-83">
                    <div className="toolkit-icon"><img src="/images/password-hash-generator.svg" loading="lazy" alt="" /></div>
                    <div className="color-white">Password Hash Generator and Verifier</div>
                  </div>
                  <p className="toolkit-description">Client-side tool to generate/verify password hashes with parameters (Argon2id, bcrypt, scrypt, PBKDF2)</p>
                  <a href="/tools/password-hash-generator" className="toolkit-button w-inline-block">
                    <div className="toolkit-button-label">Open Password Hash Generator and Verifier</div><img src="/images/link.svg" loading="lazy" alt="" className="image-94" />
                  </a>
                </div>
                <div id="w-node-_5b4a96ea-5a0a-c084-40fa-4ec713761073-f4d663f6" className="w-layout-vflex toolkit-card">
                  <div className="w-layout-hflex flex-block-83">
                    <div className="toolkit-icon"><img src="/images/base64.svg" loading="lazy" alt="" /></div>
                    <div className="color-white">Base64 Decode and Encode</div>
                  </div>
                  <p className="toolkit-description">Easily encode or decode Base64 strings directly.</p>
                  <a href="/tools/base64-decode-encode" className="toolkit-button w-inline-block">
                    <div className="toolkit-button-label">Open Base64 Decode/Encode</div><img src="/images/link.svg" loading="lazy" alt="" className="image-94" />
                  </a>
                </div>
                <div id="w-node-_50250a44-e325-0719-f7a0-f1b5e51e2883-f4d663f6" className="w-layout-vflex toolkit-card">
                  <div className="w-layout-hflex flex-block-83">
                    <div className="toolkit-icon"><img src="/images/uuid-icon.svg" loading="lazy" alt="" /></div>
                    <div className="color-white">UUID v7 Generator &amp; Timestamp Extractor</div>
                  </div>
                  <p className="toolkit-description">Generate and inspect UUID v7 values directly in your browser.</p>
                  <a href="/tools/uuidv7-generator" className="toolkit-button w-inline-block">
                    <div className="toolkit-button-label">Open UUID v7 Generator</div><img src="/images/link.svg" loading="lazy" alt="" className="image-94" />
                  </a>
                </div>
                <div id="w-node-a4f140b3-af24-a532-1fd3-24ea7dc18459-f4d663f6" className="w-layout-vflex toolkit-card">
                  <div className="w-layout-hflex flex-block-83">
                    <div className="toolkit-icon"><img src="/images/ssl-checker-icon.svg" loading="lazy" alt="" /></div>
                    <div className="color-white">SSL Checker</div>
                  </div>
                  <p className="toolkit-description">Ceck any domain&#x27;s SSL/TLS certificate. View expiration date, issuer, subject alternative names, and full certificate chain status</p>
                  <a href="/tools/ssl-checker" className="toolkit-button w-inline-block">
                    <div className="toolkit-button-label">Open SSL Checker</div><img src="/images/link.svg" loading="lazy" alt="" className="image-94" />
                  </a>
                </div>
                <div id="w-node-a3541d2b-7eed-3c49-5aaf-47ee0aaa464d-f4d663f6" className="w-layout-vflex toolkit-card">
                  <div className="w-layout-hflex flex-block-83">
                    <div className="toolkit-icon"><img src="/images/oidc-icon.svg" loading="lazy" alt="" /></div>
                    <div className="color-white">OIDC Discovery Endpoint Explorer</div>
                  </div>
                  <p className="toolkit-description">Fetch and inspect any OIDC provider&#x27;s .well-known/openid-configuration. View    <br />  authorization endpoints, token endpoints, JWKS, scopes, and signing algorithms.</p>
                  <a href="/tools/oidc-discovery-endpoint" className="toolkit-button w-inline-block">
                    <div className="toolkit-button-label">Open SSL Checker</div><img src="/images/link.svg" loading="lazy" alt="" className="image-94" />
                  </a>
                </div>
                <div className="w-layout-vflex toolkit-card more-toolkit">
                  <div className="w-layout-hflex flex-block-83">
                    <div className="toolkit-icon more-toolkit"><img src="/images/more.svg" loading="lazy" alt="" /></div>
                    <div className="color-white">More Coming Soon</div>
                  </div>
                  <p className="toolkit-description">We&#x27;re constantly adding new authentication tools. Stay tuned for more developer resources.</p>
                  <div className="w-layout-vflex comming-soon">
                    <div>Comming Soon</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <section className="toolkit-learn-more-section">
          <div className="login-default-inner-section glossary-content-inner-section">
            <div className="login-default-inner-section gallery-banner toolkit">
              <h2 className="toolkit-h2">Learn More</h2>
              <p className="glossary-subtitle subtitle-paddings toolkit">Want the &quot;why&quot; behind the tools? Start here.</p>
            </div>
            <div className="w-layout-vflex toolkit-learn-more-container">
              <a href="https://www.authgear.com/post/jwe-vs-jwt" target="_blank" className="link-block-6 w-inline-block">
                <div className="w-layout-hflex toolkit-learn-more">
                  <div className="w-layout-hflex flex-block-83">
                    <div className="toolkit-icon more-toolkit"><img src="/images/article.svg" loading="lazy" alt="" /></div>
                    <div className="color-white">JWE vs JWT: Key Differences, Use Cases, and Security Tips</div>
                  </div>
                  <div className="w-layout-hflex flex-block-84">
                    <div className="text-block-86">Read Article</div><img src="/images/article-link.svg" loading="lazy" alt="" />
                  </div>
                </div>
              </a>
              <a href="https://www.authgear.com/post/what-is-jwks" target="_blank" className="link-block-6 w-inline-block">
                <div className="w-layout-hflex toolkit-learn-more">
                  <div className="w-layout-hflex flex-block-83">
                    <div className="toolkit-icon more-toolkit"><img src="/images/article.svg" loading="lazy" alt="" /></div>
                    <div className="color-white">What is JWKS?: JSON Web Key Set Explained with Examples</div>
                  </div>
                  <div className="w-layout-hflex flex-block-84">
                    <div className="text-block-86">Read Article</div><img src="/images/article-link.svg" loading="lazy" alt="" />
                  </div>
                </div>
              </a>
              <a href="https://www.authgear.com/post/what-is-totp" target="_blank" className="link-block-6 w-inline-block">
                <div className="w-layout-hflex toolkit-learn-more">
                  <div className="w-layout-hflex flex-block-83">
                    <div className="toolkit-icon more-toolkit"><img src="/images/article.svg" loading="lazy" alt="" /></div>
                    <div className="color-white">What is TOTP (RFC 6238 explained)</div>
                  </div>
                  <div className="w-layout-hflex flex-block-84">
                    <div className="text-block-86">Read Article</div><img src="/images/article-link.svg" loading="lazy" alt="" />
                  </div>
                </div>
              </a>
              <a href="https://www.authgear.com/post/5-common-totp-mistakes" target="_blank" className="link-block-6 w-inline-block">
                <div className="w-layout-hflex toolkit-learn-more">
                  <div className="w-layout-hflex flex-block-83">
                    <div className="toolkit-icon more-toolkit"><img src="/images/article.svg" loading="lazy" alt="" /></div>
                    <div className="color-white">5 Common TOTP Mistakes Developers Make</div>
                  </div>
                  <div className="w-layout-hflex flex-block-84">
                    <div className="text-block-86">Read Article</div><img src="/images/article-link.svg" loading="lazy" alt="" />
                  </div>
                </div>
              </a>
              <a href="https://www.authgear.com/post/password-hashing-salting-function-and-algorithm-explained" target="_blank" className="link-block-6 w-inline-block">
                <div className="w-layout-hflex toolkit-learn-more">
                  <div className="w-layout-hflex flex-block-83">
                    <div className="toolkit-icon more-toolkit"><img src="/images/article.svg" loading="lazy" alt="" /></div>
                    <div className="color-white">Password Hashing &amp; Salting - Function and Algorithm Explained</div>
                  </div>
                  <div className="w-layout-hflex flex-block-84">
                    <div className="text-block-86">Read Article</div><img src="/images/article-link.svg" loading="lazy" alt="" />
                  </div>
                </div>
              </a>
              <a href="https://www.authgear.com/post/password-hashing-how-to-pick-the-right-hashing-function" target="_blank" className="link-block-6 w-inline-block">
                <div className="w-layout-hflex toolkit-learn-more">
                  <div className="w-layout-hflex flex-block-83">
                    <div className="toolkit-icon more-toolkit"><img src="/images/article.svg" loading="lazy" alt="" /></div>
                    <div className="color-white">Password Hashing: How to Pick the Right Hashing Function</div>
                  </div>
                  <div className="w-layout-hflex flex-block-84">
                    <div className="text-block-86">Read Article</div><img src="/images/article-link.svg" loading="lazy" alt="" />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>


        {/* Apollo */}






      </div>

      <PageScripts scripts={pageScripts} />
    </>
  );
}
