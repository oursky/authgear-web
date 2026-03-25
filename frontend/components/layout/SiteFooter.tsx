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
                  className="footer-social-media-link icon-small gray-bg w-inline-block"
                />
                <a
                  href="https://discord.gg/Kdn5vcYwAS"
                  target="_blank"
                  className="footer-social-media-link icon-small gray-bg w-inline-block"
                >
                  <img
                    width={19}
                    loading="lazy"
                    alt="Discord"
                    src="/images/authgear_footer_social_discord.svg"
                    className="footer-social-media-icon"
                  />
                </a>
                <a
                  href="https://github.com/authgear"
                  target="_blank"
                  className="footer-social-media-link icon-small gray-bg w-inline-block"
                >
                  <img
                    loading="lazy"
                    src="/images/authgear_footer_social_github.svg"
                    alt="GitHub"
                    className="footer-social-media-icon"
                  />
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
