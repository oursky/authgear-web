import type { Metadata } from 'next';
import Script from 'next/script';
import { headers } from 'next/headers';
import { localeToHtmlLang } from '@/lib/i18n';

export const metadata: Metadata = {
  title: { default: 'Authgear', template: '%s - Authgear' },
  description: 'Authgear makes it easier for developers to meet complex authentication requirements.',
  themeColor: '#f5f5f5',
  icons: {
    icon: '/images/favicon.png',
    apple: '/images/webclip.png',
  },
};

const navInnerHtml = `
    <div class="container-header">
      <a href="/" id="w-node-_60c42e91-3cdd-38fc-0e84-178975fa9ba3-75fa9b9e" class="brand w-nav-brand"><img src="/images/authgear-logo.svg" alt="Authgear Logo" class="header-logo"></a>
      <nav role="navigation" id="w-node-_60c42e91-3cdd-38fc-0e84-178975fa9ba5-75fa9b9e" class="nav-menu w-nav-menu">
        <div data-delay="0" data-hover="true" class="nav-menu-dropdown w-dropdown">
          <div class="dropdown-toggle w-dropdown-toggle">
            <div class="nav-menu-dropdown-toggle-title">Products</div>
            <div class="nav-menu-dropdown-icon w-icon-dropdown-toggle"></div>
          </div>
          <nav class="nav-menu-dropdown-list-full-width w-dropdown-list">
            <div class="nav-full-width-wrapper">
              <div class="nav-full-width-inner">
                <div class="nav-menu-dropdown-column">
                  <div class="nav-menu-dropdown-column">
                    <div class="nav-menu-dropdown-subtitle">SECURITY</div>
                    <div class="nav-menu-dropdown-column-links">
                      <a href="/features/attack-protection" class="nav-menu-dropdown-link w-inline-block"><div>Attack Protection</div></a>
                      <a href="/features/multi-factor-authentication" class="nav-menu-dropdown-link w-inline-block"><div>Adaptive MFA</div></a>
                      <a href="/features/sms-pumping-fraud" class="nav-menu-dropdown-link w-inline-block"><div>SMS Pumping Protection</div></a>
                      <a href="/features/authorization" class="nav-menu-dropdown-link w-inline-block"><div>Authorization</div></a>
                    </div>
                  </div>
                </div>
                <div class="nav-menu-dropdown-column">
                  <div class="nav-menu-dropdown-column">
                    <div class="nav-menu-dropdown-subtitle">AUTHENTICATION</div>
                    <div class="nav-menu-dropdown-column-links">
                      <a href="/features/authentication" class="nav-menu-dropdown-link w-inline-block"><div>Authentication</div></a>
                      <a href="/features/social-login" class="nav-menu-dropdown-link w-inline-block"><div>Social Login</div></a>
                      <a href="/features/passwordless-authentication" class="nav-menu-dropdown-link w-inline-block"><div>Passwordless</div></a>
                      <a href="/features/whatsapp-otp" class="nav-menu-dropdown-link w-inline-block"><div>WhatsApp OTP</div></a>
                      <a href="/features/passkeys" class="nav-menu-dropdown-link w-inline-block"><div>Passkeys</div></a>
                      <a href="/features/biometric-authentication" class="nav-menu-dropdown-link w-inline-block"><div>Biometric</div></a>
                      <a href="/features/machine-to-machine-token" class="nav-menu-dropdown-link w-inline-block"><div>Machine-to-Machine Token</div></a>
                    </div>
                  </div>
                </div>
                <div class="nav-menu-dropdown-column">
                  <div class="nav-menu-dropdown-column">
                    <div class="nav-menu-dropdown-subtitle">USER</div>
                    <div class="nav-menu-dropdown-column-links">
                      <a href="/features/user-management" class="nav-menu-dropdown-link w-inline-block"><div>User Management</div></a>
                      <a href="/features/self-serve-settings-page" class="nav-menu-dropdown-link w-inline-block"><div>Self-serve Settings</div></a>
                      <a href="/migrate-to-authgear" class="nav-menu-dropdown-link w-inline-block"><div>SAML</div></a>
                    </div>
                  </div>
                </div>
                <div class="nav-menu-dropdown-column">
                  <div class="nav-full-width-vertical-block">
                    <div class="nav-menu-dropdown-column">
                      <div class="nav-menu-dropdown-subtitle">BRANDING</div>
                      <div class="nav-menu-dropdown-column-links">
                        <a href="/features/customization" class="nav-menu-dropdown-link w-inline-block"><div>Customization</div></a>
                      </div>
                    </div>
                    <div class="nav-menu-dropdown-column">
                      <div class="nav-menu-dropdown-subtitle">INTEGRATION</div>
                      <div class="nav-menu-dropdown-column-links">
                        <a href="/features/extensibility" class="nav-menu-dropdown-link w-inline-block"><div>Extensibility</div></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="nav-menu-dropdown-column">
                  <div class="nav-menu-dropdown-column-links">
                    <div class="nav-menu-dropdown-subtitle product">PRODUCTS</div>
                    <a href="/" class="nav-menu-dropdown-link products w-inline-block">
                      <div>On the Cloud<br>(Start for Free)</div>
                    </a>
                    <a href="/once" class="nav-menu-dropdown-link products w-inline-block"><div>On your Server</div></a>
                    <a href="/migrate-to-authgear" class="nav-menu-dropdown-link products w-inline-block"><div>Migrate to Authgear</div></a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div data-hover="true" data-delay="0" class="nav-menu-dropdown w-dropdown">
          <div class="dropdown-toggle w-dropdown-toggle">
            <div class="nav-menu-dropdown-toggle-title">Solutions</div>
            <div class="nav-menu-dropdown-icon w-icon-dropdown-toggle"></div>
          </div>
          <nav class="nav-menu-dropdown-list w-dropdown-list">
            <div class="nav-menu-dropdown-column">
              <div class="nav-menu-dropdown-column-links">
                <a href="/solutions/frontline-workers-identity" class="nav-menu-dropdown-link w-inline-block"><div>Frontline Worker Identity</div></a>
                <a href="/solutions/ciam-solution" class="nav-menu-dropdown-link w-inline-block"><div>Customer Identity Management</div></a>
                <a href="/solutions/b2b-saas-authentication" class="nav-menu-dropdown-link w-inline-block"><div>B2B SaaS Applications</div></a>
                <a href="/solutions/enterprise-sso" class="nav-menu-dropdown-link w-inline-block"><div>Enterprise SSO</div></a>
                <a href="/solutions/reduce-sms-otp-cost" class="nav-menu-dropdown-link w-inline-block"><div>SMS Cost Saving</div></a>
              </div>
            </div>
            <div class="nav-menu-dropdown-column image">
              <a href="/migrate-to-authgear" class="w-inline-block"><img src="/images/nav_solutions_migrate2x.webp" loading="eager" width="405" alt=""></a>
            </div>
          </nav>
        </div>
        <div data-hover="true" data-delay="0" class="nav-menu-dropdown w-dropdown">
          <div class="dropdown-toggle w-dropdown-toggle">
            <div class="nav-menu-dropdown-toggle-title">Resources</div>
            <div class="nav-menu-dropdown-icon w-icon-dropdown-toggle"></div>
          </div>
          <nav class="nav-menu-dropdown-list w-dropdown-list">
            <div class="nav-menu-dropdown-column no-gap">
              <a href="/blog" class="nav-menu-dropdown-link w-inline-block"><div>Blog</div></a>
              <a href="/customer-stories" class="nav-menu-dropdown-link w-inline-block"><div>Case Studies</div></a>
              <a href="/compare/okta-alternative" class="nav-menu-dropdown-link w-inline-block"><div>Comparison</div></a>
              <a href="/login-gallery" class="nav-menu-dropdown-link w-inline-block"><div>Login Gallery</div></a>
              <a href="/glossary" class="nav-menu-dropdown-link w-inline-block"><div>Glossary</div></a>
            </div>
          </nav>
        </div>
        <div data-hover="true" data-delay="0" class="nav-menu-dropdown w-dropdown">
          <div class="dropdown-toggle w-dropdown-toggle">
            <div class="nav-menu-dropdown-toggle-title">Developers</div>
            <div class="nav-menu-dropdown-icon w-icon-dropdown-toggle"></div>
          </div>
          <nav class="nav-menu-dropdown-list developers w-dropdown-list">
            <div class="nav-menu-dropdown-column">
              <div class="nav-menu-dropdown-column-links">
                <a href="https://docs.authgear.com/" class="nav-menu-dropdown-link w-inline-block"><div>Documentation</div></a>
                <a href="https://github.com/authgear" class="nav-menu-dropdown-link w-inline-block"><div>Github</div></a>
                <a href="/whats-new" class="nav-menu-dropdown-link w-inline-block"><div>What's New</div></a>
              </div>
            </div>
          </nav>
        </div>
        <ul role="list" class="header-navigation">
          <li class="nav-item-wrapper"><a href="/pricing" class="nav-link">Pricing</a></li>
        </ul>
        <div class="mobile-nav-buttons">
          <a href="https://portal.authgear.com/" target="_blank" class="nav-button login plausible-event-name--login mobile w-inline-block">
            <div class="text-block-32">Login</div>
          </a>
          <a href="https://portal.authgear.com/" class="button-primary header-button-mobile signup plausible-event-name--signup w-button">Signup</a>
        </div>
      </nav>
      <div id="w-node-_60c42e91-3cdd-38fc-0e84-178975fa9c90-75fa9b9e" class="split-content header-right">
        <a href="/schedule-demo" class="button-primary header-button w-button">Get a Demo</a>
        <a href="https://portal.authgear.com/" target="_blank" class="nav-button login plausible-event-name--login w-inline-block">
          <div>Signup/Login</div>
        </a>
        <div class="menu-button w-nav-button">
          <div class="menu-button-wrapper">
            <div class="menu-button-icon">
              <div class="menu-line-top"></div>
              <div class="menu-line-middle"></div>
              <div class="menu-line-bottom"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
`;

const footerInnerHtml = `
    <div class="workshop-footer-separator"></div>
    <div class="container-default w-container">
      <div class="footer-wrapper">
        <div class="footer-top-content workshop">
          <div class="footer-brand-wrapper workshop">
            <a href="/" class="footer-image w-inline-block"><img src="/images/authgear-logo-white.svg" loading="lazy" alt="Authgear"></a>
            <div class="footer__dark-authgear-desc">Authgear powered by <a href="https://skymakers.digital/" class="footer__dark-authgear-desc">SkyMakers Digital Group</a></div>
            <div class="footer-social-media-links-wrapper">
              <a href="https://www.linkedin.com/company/authgear" target="_blank" class="footer-social-media-link icon-small gray-bg w-inline-block"></a>
              <a href="https://discord.gg/Kdn5vcYwAS" target="_blank" class="footer-social-media-link icon-small gray-bg w-inline-block"><img width="19" loading="lazy" alt="Discord" src="/images/authgear_footer_social_discord.svg" class="footer-social-media-icon"></a>
              <a href="https://github.com/authgear" target="_blank" class="footer-social-media-link icon-small gray-bg w-inline-block"><img loading="lazy" src="/images/authgear_footer_social_github.svg" alt="GitHub" class="footer-social-media-icon"></a>
            </div>
            <div class="footer-certificate"><img width="144.5" loading="lazy" alt="ISO 27001 Certified" src="/images/Authgear_footer_certificated_blue2x.png" class="certificate-img"></div>
          </div>
          <div class="footer-menu-navigation-wrapper workshop">
            <div class="footer-menu-links-wrapper workshop">
              <ul role="list" class="footer-menu-list w-list-unstyled">
                <li class="footer-menu-list-item"><h6 class="footer-menu-title">Products</h6></li>
                <li class="footer-menu-list-item"><a href="/once" class="footer-menu-link workshop-footer-link w-inline-block"><div>On your Server (ONCE)</div></a></li>
                <li class="footer-menu-list-item"><a href="/" class="footer-menu-link workshop-footer-link w-inline-block"><div>On the Cloud</div></a></li>
                <li class="footer-menu-list-item"><a href="/pricing" class="footer-menu-link workshop-footer-link w-inline-block"><div>Pricing</div></a></li>
                <li class="footer-menu-list-item"><a href="/migrate-to-authgear" class="footer-menu-link workshop-footer-link w-inline-block"><div>SAML Migration</div></a></li>
              </ul>
              <ul role="list" class="footer-menu-list w-list-unstyled">
                <li class="footer-menu-list-item"><h6 class="footer-menu-title">alternative</h6></li>
                <li class="footer-menu-list-item"><a href="/compare/okta-alternative" class="footer-menu-link workshop-footer-link w-inline-block"><div>Okta Alternative</div></a></li>
                <li class="footer-menu-list-item"><a href="/compare/auth0-alternative" class="footer-menu-link workshop-footer-link w-inline-block"><div>Auth0 Alternative</div></a></li>
                <li class="footer-menu-list-item"><a href="/compare/cognito-alternative" class="footer-menu-link workshop-footer-link w-inline-block"><div>Cognito Alternative</div></a></li>
                <li class="footer-menu-list-item"><a href="/compare/firebase-alternative" class="footer-menu-link workshop-footer-link w-inline-block"><div>Firebase Alternative</div></a></li>
              </ul>
            </div>
            <div class="footer-menu-links-wrapper workshop">
              <ul role="list" class="footer-menu-list w-list-unstyled">
                <li class="footer-menu-list-item"><h6 class="footer-menu-title">developers</h6></li>
                <li class="footer-menu-list-item"><a href="https://docs.authgear.com" target="_blank" class="footer-menu-link workshop-footer-link w-inline-block"><div>Documentation</div></a></li>
                <li class="footer-menu-list-item"><a href="https://docs.authgear.com/reference/apis/oauth-2.0-and-openid-connect-oidc/userinfo" target="_blank" class="footer-menu-link workshop-footer-link w-inline-block"><div>API Reference</div></a></li>
                <li class="footer-menu-list-item"><a href="https://github.com/authgear" class="footer-menu-link workshop-footer-link w-inline-block"><div>GitHub</div></a></li>
                <li class="footer-menu-list-item"><a href="https://github.com/authgear/authgear-server/discussions" target="_blank" class="footer-menu-link workshop-footer-link w-inline-block"><div>Community Forum</div></a></li>
                <li class="footer-menu-list-item"><a href="https://discord.gg/Kdn5vcYwAS" target="_blank" class="footer-menu-link workshop-footer-link w-inline-block"><div>Discord</div></a></li>
                <li class="footer-menu-list-item"><a href="/integrations" class="footer-menu-link workshop-footer-link w-inline-block"><div>Integrations</div></a></li>
              </ul>
            </div>
            <div class="footer-menu-links-wrapper workshop">
              <ul role="list" class="footer-menu-list w-list-unstyled">
                <li class="footer-menu-list-item"><h6 class="footer-menu-title">resources</h6></li>
                <li class="footer-menu-list-item"><a href="/blog" class="footer-menu-link workshop-footer-link w-inline-block"><div>Blog</div></a></li>
                <li class="footer-menu-list-item"><a href="/login-gallery" class="footer-menu-link workshop-footer-link w-inline-block"><div>Login Gallery</div></a></li>
                <li class="footer-menu-list-item"><a href="/glossary" class="footer-menu-link workshop-footer-link w-inline-block"><div>Glossary</div></a></li>
                <li class="footer-menu-list-item"><a href="/security" class="footer-menu-link workshop-footer-link w-inline-block"><div>Security</div></a></li>
                <li class="footer-menu-list-item"><a href="/terms" class="footer-menu-link workshop-footer-link w-inline-block"><div>Terms of Service</div></a></li>
                <li class="footer-menu-list-item"><a href="/policy" class="footer-menu-link workshop-footer-link w-inline-block"><div>Privacy Policy</div></a></li>
                <li class="footer-menu-list-item"><a href="/data-privacy" class="footer-menu-link workshop-footer-link w-inline-block"><div>Data Privacy</div></a></li>
                <li class="footer-menu-list-item"><a href="/terms-of-enterprise-license" class="footer-menu-link workshop-footer-link w-inline-block"><div>Enterprise Licenses</div></a></li>
                <li class="footer-menu-list-item"><a href="/sla" class="footer-menu-link workshop-footer-link w-inline-block"><div>SLA</div></a></li>
              </ul>
              <ul role="list" class="footer-menu-list w-list-unstyled">
                <li class="footer-menu-list-item"><a href="/auth-toolkit" class="footer-menu-title w-inline-block"><h6 class="footer-menu-title">Free Tools</h6></a></li>
                <li class="footer-menu-list-item"><a href="/tools/oidc-discovery-endpoint" class="footer-menu-link workshop-footer-link w-inline-block"><div>OIDC Discovery Explorer</div></a></li>
                <li class="footer-menu-list-item"><a href="/tools/ssl-checker" class="footer-menu-link workshop-footer-link w-inline-block"><div>SSL Checker</div></a></li>
                <li class="footer-menu-list-item"><a href="/tools/uuidv7-generator" class="footer-menu-link workshop-footer-link w-inline-block"><div>UUID v7 Generator</div></a></li>
                <li class="footer-menu-list-item"><a href="/tools/base64-decode-encode" class="footer-menu-link workshop-footer-link w-inline-block"><div>Base64 Decode/Encode</div></a></li>
                <li class="footer-menu-list-item"><a href="/tools/jwt-jwe-debugger" class="footer-menu-link workshop-footer-link w-inline-block"><div>JWT &amp; JWE Debugger</div></a></li>
                <li class="footer-menu-list-item"><a href="/tools/jwk-generator" class="footer-menu-link workshop-footer-link w-inline-block"><div>JWK Generator</div></a></li>
                <li class="footer-menu-list-item"><a href="/tools/password-hash-generator" class="footer-menu-link workshop-footer-link w-inline-block"><div>Password Hash Generator/Verifier</div></a></li>
                <li class="footer-menu-list-item"><a href="/tools/hmac-signature-generator-verifier" class="footer-menu-link workshop-footer-link w-inline-block"><div>HMAC Signature Generator/Verifier</div></a></li>
                <li class="footer-menu-list-item"><a href="https://samlsp.com/" target="_blank" class="footer-menu-link workshop-footer-link w-inline-block"><div>SAML Testing Tool</div></a></li>
                <li class="footer-menu-list-item"><a href="/tools/totp-authenticator" class="footer-menu-link workshop-footer-link w-inline-block"><div>TOTP Authenticator</div></a></li>
              </ul>
            </div>
            <div class="footer-menu-links-wrapper workshop">
              <ul role="list" class="footer-menu-list w-list-unstyled">
                <li class="footer-menu-list-item"><h6 class="footer-menu-title">company</h6></li>
                <li class="footer-menu-list-item"><a href="/about" class="footer-menu-link workshop-footer-link w-inline-block"><div>About Us</div></a></li>
                <li class="footer-menu-list-item"><a href="/schedule-demo" class="footer-menu-link workshop-footer-link w-inline-block"><div>Contact Sales</div></a></li>
                <li class="footer-menu-list-item"><a href="/about" class="footer-menu-link workshop-footer-link w-inline-block"><div>SkyMakers Digital</div></a></li>
                <li class="footer-menu-list-item"><a href="/promises" class="footer-menu-link workshop-footer-link w-inline-block"><div>Our Promises</div></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
`;

const cookieConsentHtml = `
  <div id="consentPopup" fs-cc="banner" class="fs-cookie-popup">
    <div class="cookie-tag">Your privacy is our priority</div>
    <p class="cookie-paragraph">Authgear understands the importance of data privacy. In line with our <a href="/data-privacy">Privacy Policy</a>, we take your privacy seriously and are committed to being transparent about how we collect your information.<br>By clicking "Accept," you consent to the use of all cookies on our site.</p>
    <div class="button-wrapper w-clearfix">
      <a fs-cc="allow" href="#" class="button accept w-button">Accept</a>
      <a fs-cc="deny" href="#" class="button deny w-button">Deny</a>
      <a fs-cc="open-preferences" href="#" class="preferences-link">Manage settings</a>
    </div>
  </div>
  <div fs-cc="preferences" class="fs-preferences-manager-wrapper">
    <div class="preferences-container">
      <div class="privacy-title">Preferences</div>
      <a fs-cc="allow" href="#" class="button w-button">Accept all cookies</a>
      <a fs-cc="close" href="#" class="close-button-2 w-inline-block"><img src="/images/np_close_25798_27313D.svg" loading="lazy" alt=""></a>
      <div class="consents-form w-form">
        <form method="get" class="w-clearfix">
          <div class="grid-3">
            <div class="text-div"><label class="cookie-tag">Essential</label><p class="paragraph-8">These items are required to enable basic website functionality.</p></div>
            <p class="paragraph-8 bold">Always active</p>
          </div>
          <div class="grid-3">
            <div class="text-div"><label class="cookie-tag">Marketing</label><p class="paragraph-8">These items are used to deliver advertising that is more relevant to you and your interests.</p></div>
            <label class="w-checkbox"><div class="w-checkbox-input w-checkbox-input--inputType-custom checkbox"></div><input type="checkbox" fs-cc-checkbox="marketing" style="opacity:0;position:absolute;z-index:-1"></label>
          </div>
          <div class="grid-3">
            <div class="text-div"><label class="cookie-tag">Analytics</label><p class="paragraph-8">These items help the website operator understand how its website performs.</p></div>
            <label class="w-checkbox"><div class="w-checkbox-input w-checkbox-input--inputType-custom checkbox"></div><input type="checkbox" fs-cc-checkbox="analytics" style="opacity:0;position:absolute;z-index:-1"></label>
          </div>
          <input type="submit" fs-cc="deny" class="button deny w-button" value="Reject all cookies">
          <input type="submit" fs-cc="submit" class="button field-wrapper w-button" value="Confirm my choices">
        </form>
      </div>
    </div>
  </div>
  <div fs-cc="manager" class="fs-manager-opener"><img src="/images/np_cookie_80793_FFFFFF.svg" loading="lazy" fs-cc="open-preferences" alt=""></div>
`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const htmlLang = localeToHtmlLang(headersList.get('x-locale') ?? 'en');
  return (
    <html lang={htmlLang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="cwUTy_LBZHQ90P9sQzhKyyV2M024ukPHK2rYpvion6M" />
        <link href="/css/normalize.css" rel="stylesheet" type="text/css" />
        <link href="/css/webflow.css" rel="stylesheet" type="text/css" />
        <link href="/css/authgear-new.webflow.css" rel="stylesheet" type="text/css" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" type="text/javascript" />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `WebFont.load({google:{families:["PT Sans:400,400italic,700,700italic","IBM Plex Sans:300,400,500,600,700","Inter:300,400,500,600,700","Noto Sans TC:300,400,500,600,700","Red Hat Display:300,400,500,600,700"]}});`,
          }}
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);`,
          }}
        />
        <style>{`.w-container{max-width:1271px;}`}</style>
      </head>
      <body className="bg-neutral-200">
        {/* Navigation */}
        <div
          data-collapse="medium"
          data-animation="default"
          data-duration={500}
          data-easing="ease-in-out-expo"
          data-easing2="ease-in-out-expo"
          data-w-id="60c42e91-3cdd-38fc-0e84-178975fa9b9e"
          role="banner"
          className="header event w-nav"
          dangerouslySetInnerHTML={{ __html: navInnerHtml }}
        />

        {/* Page content */}
        {children}

        {/* Footer */}
        <footer
          className="footer dark"
          dangerouslySetInnerHTML={{ __html: footerInnerHtml }}
        />

        {/* Cookie consent */}
        <div
          className="cookies"
          dangerouslySetInnerHTML={{ __html: cookieConsentHtml }}
        />

        {/* Scripts */}
        <Script
          src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=60658b46b03f0cf83ac1485d"
          strategy="beforeInteractive"
          integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
          crossOrigin="anonymous"
        />
        <Script src="/js/webflow.js" strategy="afterInteractive" />
        <Script
          async
          src="https://cdn.jsdelivr.net/npm/@finsweet/cookie-consent@1/fs-cc.js"
          data-fs-cc-mode="opt-in"
          strategy="afterInteractive"
        />
        <Script
          async
          src="https://plausible.io/js/pa-sIydDP09Pb5q-XyCWR6Rj.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GTM-KTHFL6S"
          strategy="afterInteractive"
        />
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KTHFL6S');`}
        </Script>
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/intlTelInput.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
