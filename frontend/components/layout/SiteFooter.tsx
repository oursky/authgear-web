import Link from 'next/link';
import { localizedPath } from '@/lib/i18n';
import { footerStrings } from '@/lib/navigation-data';

function lp(locale: string, path: string) {
  return localizedPath(locale, path);
}

function L(key: string, locale: string): string {
  return footerStrings[key][locale] ?? footerStrings[key]['en'] ?? '';
}

export default function SiteFooter({ locale }: { locale: string }) {
  const powered = L('poweredBy', locale);
  const poweredSuffix = L('poweredBySuffix', locale);

  return (
    <>
      <div className="workshop-footer-separator" />
      <div className="container-default w-container">
        <div className="footer-wrapper">
          <div className="footer-top-content workshop">
            <div className="footer-brand-wrapper workshop">
              <Link href={lp(locale, '/')} className="footer-image w-inline-block">
                <img src="/images/authgear-logo-white.svg" loading="lazy" alt="Authgear" />
              </Link>
              <div className="footer__dark-authgear-desc">
                {powered}
                <a href="https://skymakers.digital/" className="footer__dark-authgear-desc">
                  SkyMakers Digital Group
                </a>
                {poweredSuffix}
              </div>
              <div className="footer-social-media-links-wrapper">
                <a
                  href="https://www.linkedin.com/company/authgear"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-media-link icon-small gray-bg w-inline-block"
                  aria-label="LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={18}
                    height={18}
                    viewBox="0 0 18 18"
                    fill="none"
                    className="footer-social-media-icon"
                    aria-hidden
                  >
                    <path
                      d="M16.7018 0H1.29817C0.581177 0 0 0.581177 0 1.29817V16.7018C0 17.4188 0.581177 18 1.29817 18H16.7018C17.4188 18 18 17.4188 18 16.7018V1.29817C18 0.581177 17.4188 0 16.7018 0ZM6.3847 13.6055H4.19279V7.01106H6.3847V13.6055ZM5.28882 6.1106H5.27454C4.539 6.1106 4.06329 5.60426 4.06329 4.97145C4.06329 4.32436 4.55356 3.83203 5.30338 3.83203C6.05319 3.83203 6.51462 4.32436 6.5289 4.97145C6.5289 5.60426 6.05319 6.1106 5.28882 6.1106ZM14.2883 13.6055H12.0966V10.0776C12.0966 9.19102 11.7793 8.58636 10.9862 8.58636C10.3807 8.58636 10.0201 8.99423 9.8616 9.38795C9.80365 9.52885 9.78951 9.72578 9.78951 9.92285V13.6055H7.59773C7.59773 13.6055 7.62643 7.62973 7.59773 7.01106H9.78951V7.94476C10.0808 7.49542 10.6019 6.85629 11.7648 6.85629C13.2069 6.85629 14.2883 7.79878 14.2883 9.82425V13.6055Z"
                      fill="white"
                    />
                  </svg>
                </a>
                <a
                  href="https://discord.gg/Kdn5vcYwAS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-media-link icon-small gray-bg w-inline-block"
                  aria-label="Discord"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    className="footer-social-media-icon"
                    aria-hidden
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.4921 13.3058C10.4929 13.2871 10.4917 13.2684 10.4891 13.2499C10.4614 13.0547 10.4515 12.8548 10.3952 12.6677C10.1842 11.9617 9.7482 11.4547 9.0062 11.3047C8.2922 11.1617 7.7132 11.4347 7.2852 12.0137C6.7052 12.7957 6.7612 13.9607 7.4022 14.6937C8.0912 15.4807 9.2112 15.5017 9.9242 14.7347C10.2968 14.3336 10.4674 13.8513 10.4921 13.3058ZM17.1384 13.289C17.139 13.2722 17.138 13.2553 17.1358 13.2386C17.1134 13.0695 17.104 12.8956 17.0602 12.7317C16.8722 12.0317 16.4652 11.5167 15.7442 11.3267C15.1072 11.1587 14.5482 11.3417 14.0952 11.8167C13.3502 12.5977 13.3462 13.9327 14.0782 14.7247C14.7982 15.5017 15.9332 15.4867 16.6202 14.6857C16.9637 14.2851 17.1193 13.8139 17.1384 13.289ZM17.0986 17.7858C17.2737 17.7017 17.3407 17.4556 17.1829 17.3424C17.067 17.2593 16.9742 17.2912 16.7572 17.3837C13.5892 18.7317 10.4192 18.7177 7.2492 17.3927C7.02108 17.2973 6.93285 17.2595 6.82141 17.3305C6.65314 17.4378 6.71814 17.6976 6.8976 17.7848C7.23874 17.9507 7.58028 18.1168 7.93844 18.2908C8.0997 18.3691 8.1569 18.5704 8.06095 18.7218C7.77631 19.1711 7.49519 19.6158 7.2052 20.0537C7.1742 20.0997 7.0412 20.1147 6.9722 20.0937C5.2572 19.5527 3.6712 18.7537 2.2202 17.6907C2.1462 17.6367 2.0822 17.5237 2.0742 17.4317C1.7452 13.8007 2.5132 10.4137 4.3552 7.26769C5.0582 6.06669 5.0562 6.04569 6.5542 5.56969C7.3422 5.31969 8.1542 5.14769 8.9532 4.93069C9.1292 4.88369 9.2172 4.93569 9.2872 5.09469C9.3752 5.29169 9.5062 5.47169 9.5742 5.67469C9.6552 5.91669 9.7792 5.97369 10.0302 5.93769C11.4052 5.73969 12.7812 5.76969 14.1552 5.95069C14.2296 5.96132 14.301 5.91651 14.3345 5.84924C14.4634 5.59094 14.5957 5.33387 14.7172 5.07069C14.7802 4.93269 14.8582 4.89469 15.0112 4.92369C16.3002 5.16769 17.5472 5.54269 18.7422 6.08469C18.8642 6.14069 18.9862 6.24169 19.0602 6.35269C20.4732 8.46269 21.4262 10.7567 21.8122 13.2737C22.0242 14.6527 22.0492 16.0387 21.9242 17.4267C21.9152 17.5257 21.8392 17.6477 21.7562 17.7067C20.3162 18.7517 18.7502 19.5517 17.0492 20.0817C16.9662 20.1077 16.8092 20.0927 16.7732 20.0387C16.485 19.6076 16.2097 19.1677 15.9283 18.7194C15.833 18.5676 15.8908 18.3665 16.0523 18.2888C16.4088 18.1173 16.7515 17.9526 17.0986 17.7858Z"
                      fill="white"
                    />
                  </svg>
                </a>
                <a
                  href="https://github.com/authgear"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-media-link icon-small gray-bg w-inline-block"
                  aria-label="GitHub"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={19}
                    height={19}
                    viewBox="0 0 19 19"
                    fill="none"
                    className="footer-social-media-icon"
                    aria-hidden
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.5 0C4.262 0 0 4.262 0 9.50002C0 13.626 2.74 17.354 6.664 18.567C6.824 18.619 6.998 18.583 7.127 18.477C7.257 18.371 7.325 18.207 7.309 18.04C7.169 16.647 7.97 15.171 8.312 14.817C8.444 14.682 8.488 14.483 8.425 14.305C8.362 14.126 8.204 13.997 8.016 13.974C6.225 13.746 4.567 13.138 4.567 10.248C4.563 9.52902 4.837 8.84202 5.336 8.31302C5.468 8.17402 5.509 7.97202 5.441 7.79302C5.25 7.28802 5.229 6.723 5.377 6.201C5.668 6.249 6.231 6.42 7.108 7.00602C7.228 7.08702 7.377 7.10802 7.515 7.07302C8.812 6.725 10.182 6.725 11.479 7.07302C11.616 7.10802 11.766 7.08702 11.886 7.00602C12.77 6.415 13.335 6.246 13.615 6.197C13.764 6.721 13.745 7.28702 13.554 7.79402C13.486 7.97402 13.527 8.17602 13.66 8.31402C14.154 8.83402 14.427 9.51802 14.427 10.239C14.427 13.178 12.773 13.765 10.986 13.962C10.796 13.982 10.635 14.11 10.571 14.289C10.506 14.469 10.549 14.67 10.682 14.807C11.012 15.148 11.821 16.663 11.685 18.051C11.668 18.218 11.736 18.382 11.867 18.487C11.957 18.562 12.069 18.6 12.182 18.6C12.232 18.6 12.283 18.592 12.332 18.576C16.32 17.321 19 13.674 19 9.50002C19 4.262 14.738 0 9.5 0Z"
                      fill="white"
                    />
                  </svg>
                </a>
              </div>
              <div className="footer-certificate">
                <img
                  width={144.5}
                  loading="lazy"
                  alt={L('isoCertAlt', locale)}
                  src="/images/Authgear_footer_certificated_blue2x.png"
                  className="certificate-img"
                />
              </div>
            </div>

            <div className="footer-menu-navigation-wrapper workshop">
              {/* Products + Alternative */}
              <div className="footer-menu-links-wrapper workshop">
                <ul role="list" className="footer-menu-list w-list-unstyled">
                  <li className="footer-menu-list-item">
                    <h6 className="footer-menu-title">{L('productsTitle', locale)}</h6>
                  </li>
                  <li className="footer-menu-list-item">
                    <Link href={lp(locale, '/once')} className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>{L('onYourServer', locale)}</div>
                    </Link>
                  </li>
                  <li className="footer-menu-list-item">
                    <Link href={lp(locale, '/')} className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>{L('onTheCloud', locale)}</div>
                    </Link>
                  </li>
                  <li className="footer-menu-list-item">
                    <Link href={lp(locale, '/pricing')} className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>{L('pricing', locale)}</div>
                    </Link>
                  </li>
                  <li className="footer-menu-list-item">
                    <Link href={lp(locale, '/migrate-to-authgear')} className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>{L('samlMigration', locale)}</div>
                    </Link>
                  </li>
                </ul>
                <ul role="list" className="footer-menu-list w-list-unstyled">
                  <li className="footer-menu-list-item">
                    <h6 className="footer-menu-title">{L('alternativeTitle', locale)}</h6>
                  </li>
                  <li className="footer-menu-list-item">
                    <Link href={lp(locale, '/compare/okta-alternative')} className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>{L('oktaAlternative', locale)}</div>
                    </Link>
                  </li>
                  <li className="footer-menu-list-item">
                    <Link href={lp(locale, '/compare/auth0-alternative')} className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>{L('auth0Alternative', locale)}</div>
                    </Link>
                  </li>
                  <li className="footer-menu-list-item">
                    <Link href={lp(locale, '/compare/cognito-alternative')} className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>{L('cognitoAlternative', locale)}</div>
                    </Link>
                  </li>
                  <li className="footer-menu-list-item">
                    <Link href={lp(locale, '/compare/firebase-alternative')} className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>{L('firebaseAlternative', locale)}</div>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Developers */}
              <div className="footer-menu-links-wrapper workshop">
                <ul role="list" className="footer-menu-list w-list-unstyled">
                  <li className="footer-menu-list-item">
                    <h6 className="footer-menu-title">{L('developersTitle', locale)}</h6>
                  </li>
                  <li className="footer-menu-list-item">
                    <a href="https://docs.authgear.com" target="_blank" className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>{L('documentation', locale)}</div>
                    </a>
                  </li>
                  <li className="footer-menu-list-item">
                    <a
                      href="https://docs.authgear.com/reference/apis/oauth-2.0-and-openid-connect-oidc/userinfo"
                      target="_blank"
                      className="footer-menu-link workshop-footer-link w-inline-block"
                    >
                      <div>{L('apiReference', locale)}</div>
                    </a>
                  </li>
                  <li className="footer-menu-list-item">
                    <a href="https://github.com/authgear" className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>GitHub</div>
                    </a>
                  </li>
                  <li className="footer-menu-list-item">
                    <a
                      href="https://github.com/authgear/authgear-server/discussions"
                      target="_blank"
                      className="footer-menu-link workshop-footer-link w-inline-block"
                    >
                      <div>{L('communityForum', locale)}</div>
                    </a>
                  </li>
                  <li className="footer-menu-list-item">
                    <a href="https://discord.gg/Kdn5vcYwAS" target="_blank" className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>Discord</div>
                    </a>
                  </li>
                  <li className="footer-menu-list-item">
                    <Link href={lp(locale, '/integrations')} className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>{L('integrations', locale)}</div>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources + Free Tools */}
              <div className="footer-menu-links-wrapper workshop">
                <ul role="list" className="footer-menu-list w-list-unstyled">
                  <li className="footer-menu-list-item">
                    <h6 className="footer-menu-title">{L('resourcesTitle', locale)}</h6>
                  </li>
                  <li className="footer-menu-list-item">
                    <Link href={lp(locale, '/blog')} className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>{L('blog', locale)}</div>
                    </Link>
                  </li>
                  <li className="footer-menu-list-item">
                    <Link href={lp(locale, '/login-gallery')} className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>{L('loginGallery', locale)}</div>
                    </Link>
                  </li>
                  <li className="footer-menu-list-item">
                    <Link href={lp(locale, '/glossary')} className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>{L('glossary', locale)}</div>
                    </Link>
                  </li>
                  <li className="footer-menu-list-item">
                    <Link href={lp(locale, '/security')} className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>{L('security', locale)}</div>
                    </Link>
                  </li>
                  <li className="footer-menu-list-item">
                    <Link href={lp(locale, '/terms')} className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>{L('termsOfService', locale)}</div>
                    </Link>
                  </li>
                  <li className="footer-menu-list-item">
                    <Link href={lp(locale, '/policy')} className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>{L('privacyPolicy', locale)}</div>
                    </Link>
                  </li>
                  <li className="footer-menu-list-item">
                    <Link href={lp(locale, '/data-privacy')} className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>{L('dataPrivacy', locale)}</div>
                    </Link>
                  </li>
                  <li className="footer-menu-list-item">
                    <Link href={lp(locale, '/terms-of-enterprise-license')} className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>{L('enterpriseLicenses', locale)}</div>
                    </Link>
                  </li>
                  <li className="footer-menu-list-item">
                    <Link href={lp(locale, '/sla')} className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>SLA</div>
                    </Link>
                  </li>
                </ul>
                <ul role="list" className="footer-menu-list w-list-unstyled">
                  <li className="footer-menu-list-item">
                    <Link href={lp(locale, '/auth-toolkit')} className="footer-menu-title w-inline-block">
                      <h6 className="footer-menu-title">{L('freeToolsTitle', locale)}</h6>
                    </Link>
                  </li>
                  <li className="footer-menu-list-item">
                    <Link href={lp(locale, '/tools/oidc-discovery-endpoint')} className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>{L('oidcDiscovery', locale)}</div>
                    </Link>
                  </li>
                  <li className="footer-menu-list-item">
                    <Link href={lp(locale, '/tools/ssl-checker')} className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>{L('sslChecker', locale)}</div>
                    </Link>
                  </li>
                  <li className="footer-menu-list-item">
                    <Link href={lp(locale, '/tools/uuidv7-generator')} className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>{L('uuidv7Generator', locale)}</div>
                    </Link>
                  </li>
                  <li className="footer-menu-list-item">
                    <Link href={lp(locale, '/tools/base64-decode-encode')} className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>{L('base64', locale)}</div>
                    </Link>
                  </li>
                  <li className="footer-menu-list-item">
                    <Link href={lp(locale, '/tools/jwt-jwe-debugger')} className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>{L('jwtDebugger', locale)}</div>
                    </Link>
                  </li>
                  <li className="footer-menu-list-item">
                    <Link href={lp(locale, '/tools/jwk-generator')} className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>{L('jwkGenerator', locale)}</div>
                    </Link>
                  </li>
                  <li className="footer-menu-list-item">
                    <Link href={lp(locale, '/tools/password-hash-generator')} className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>{L('passwordHash', locale)}</div>
                    </Link>
                  </li>
                  <li className="footer-menu-list-item">
                    <Link href={lp(locale, '/tools/hmac-signature-generator-verifier')} className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>{L('hmacSignature', locale)}</div>
                    </Link>
                  </li>
                  <li className="footer-menu-list-item">
                    <a href="https://samlsp.com/" target="_blank" className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>{L('samlTestingTool', locale)}</div>
                    </a>
                  </li>
                  <li className="footer-menu-list-item">
                    <Link href={lp(locale, '/tools/totp-authenticator')} className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>{L('totpAuthenticator', locale)}</div>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div className="footer-menu-links-wrapper workshop">
                <ul role="list" className="footer-menu-list w-list-unstyled">
                  <li className="footer-menu-list-item">
                    <h6 className="footer-menu-title">{L('companyTitle', locale)}</h6>
                  </li>
                  <li className="footer-menu-list-item">
                    <Link href={lp(locale, '/about')} className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>{L('aboutUs', locale)}</div>
                    </Link>
                  </li>
                  <li className="footer-menu-list-item">
                    <Link href={lp(locale, '/schedule-demo')} className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>{L('contactSales', locale)}</div>
                    </Link>
                  </li>
                  <li className="footer-menu-list-item">
                    <Link href={lp(locale, '/about')} className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>SkyMakers Digital</div>
                    </Link>
                  </li>
                  <li className="footer-menu-list-item">
                    <Link href={lp(locale, '/promises')} className="footer-menu-link workshop-footer-link w-inline-block">
                      <div>{L('ourPromises', locale)}</div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
