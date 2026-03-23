import { getTranslations } from 'next-intl/server';
import { localizedPath } from '@/lib/i18n';
import {
  NavLink,
  NavColumn,
  productsDropdownColumns,
  solutionsDropdownLinks,
  solutionsSideImage,
  resourcesDropdownLinks,
  developersDropdownLinks,
  footerStrings,
} from '@/lib/navigation-data';

function linkHref(locale: string, pathOrUrl: string): string {
  if (pathOrUrl.startsWith('http')) return pathOrUrl;
  return localizedPath(locale, pathOrUrl);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function labelFor(link: NavLink, locale: string): string {
  return link.label[locale] ?? link.label['en'] ?? '';
}

/** Renders header nav inner HTML (inside `.container-header`) using next-intl for atomic strings. */
export async function getNavInnerHtml(locale: string): Promise<string> {
  const t = await getTranslations({ locale, namespace: 'Navigation' });

  const logoAlt = escapeHtml(t('logoAlt'));

  const productColumnsHtml = productsDropdownColumns
    .map((col: NavColumn) => {
      if (col.type === 'stacked') {
        const inner = col.sections
          .map(
            (sec) => `
                    <div class="nav-menu-dropdown-column">
                      <div class="nav-menu-dropdown-subtitle">${escapeHtml(sec.subtitle[locale] ?? sec.subtitle['en'] ?? '')}</div>
                      <div class="nav-menu-dropdown-column-links">
                        ${sec.links
                          .map((item) => {
                            const h = linkHref(locale, item.path!);
                            const label = escapeHtml(labelFor(item, locale));
                            return `<a href="${h}" class="nav-menu-dropdown-link w-inline-block"><div>${label}</div></a>`;
                          })
                          .join('')}
                      </div>
                    </div>`
          )
          .join('');
        return `
                <div class="nav-menu-dropdown-column">
                  <div class="nav-full-width-vertical-block">
                    ${inner}
                  </div>
                </div>`;
      }

      if (col.type === 'productColumn') {
        const linksHtml = col.links
          .map((item) => {
            const h = linkHref(locale, item.path!);
            const divInner = item.html
              ? (item.html[locale] ?? item.html['en'] ?? '')
              : escapeHtml(labelFor(item, locale));
            return `<a href="${h}" class="nav-menu-dropdown-link products w-inline-block">
                      <div>${divInner}</div>
                    </a>`;
          })
          .join('');
        return `
                <div class="nav-menu-dropdown-column">
                  <div class="nav-menu-dropdown-column-links">
                    <div class="nav-menu-dropdown-subtitle product">${escapeHtml(col.subtitle[locale] ?? col.subtitle['en'] ?? '')}</div>
                    ${linksHtml}
                  </div>
                </div>`;
      }

      // Simple column (type === undefined)
      const simple = col as { subtitle: Record<string, string>; links: NavLink[] };
      return `
                <div class="nav-menu-dropdown-column">
                  <div class="nav-menu-dropdown-column">
                    <div class="nav-menu-dropdown-subtitle">${escapeHtml(simple.subtitle[locale] ?? simple.subtitle['en'] ?? '')}</div>
                    <div class="nav-menu-dropdown-column-links">
                      ${simple.links
                        .map((item) => {
                          const h = linkHref(locale, item.path!);
                          const label = escapeHtml(labelFor(item, locale));
                          return `<a href="${h}" class="nav-menu-dropdown-link w-inline-block"><div>${label}</div></a>`;
                        })
                        .join('')}
                    </div>
                  </div>
                </div>`;
    })
    .join('');

  const solutionsLinks = solutionsDropdownLinks
    .map((item) => {
      const h = linkHref(locale, item.path!);
      return `<a href="${h}" class="nav-menu-dropdown-link w-inline-block"><div>${escapeHtml(labelFor(item, locale))}</div></a>`;
    })
    .join('');
  const sideHref = linkHref(locale, solutionsSideImage.path);
  const sideAlt = escapeHtml(solutionsSideImage.alt[locale] ?? solutionsSideImage.alt['en'] ?? '');

  const resourcesLinks = resourcesDropdownLinks
    .map((item) => {
      const h = linkHref(locale, item.path!);
      return `<a href="${h}" class="nav-menu-dropdown-link w-inline-block"><div>${escapeHtml(labelFor(item, locale))}</div></a>`;
    })
    .join('');

  const devLinks = developersDropdownLinks
    .map((item) => {
      const h = item.href ? item.href : linkHref(locale, item.path!);
      return `<a href="${h}" class="nav-menu-dropdown-link w-inline-block"><div>${escapeHtml(labelFor(item, locale))}</div></a>`;
    })
    .join('');

  return `
    <div class="container-header">
      <a href="${linkHref(locale, '/')}" id="w-node-_60c42e91-3cdd-38fc-0e84-178975fa9ba3-75fa9b9e" class="brand w-nav-brand"><img src="/images/authgear-logo.svg" alt="${logoAlt}" class="header-logo"></a>
      <nav role="navigation" id="w-node-_60c42e91-3cdd-38fc-0e84-178975fa9ba5-75fa9b9e" class="nav-menu w-nav-menu">
        <div data-delay="0" data-hover="true" class="nav-menu-dropdown w-dropdown">
          <div class="dropdown-toggle w-dropdown-toggle">
            <div class="nav-menu-dropdown-toggle-title">${escapeHtml(t('products'))}</div>
            <div class="nav-menu-dropdown-icon w-icon-dropdown-toggle"></div>
          </div>
          <nav class="nav-menu-dropdown-list-full-width w-dropdown-list">
            <div class="nav-full-width-wrapper">
              <div class="nav-full-width-inner">
                ${productColumnsHtml}
              </div>
            </div>
          </nav>
        </div>
        <div data-hover="true" data-delay="0" class="nav-menu-dropdown w-dropdown">
          <div class="dropdown-toggle w-dropdown-toggle">
            <div class="nav-menu-dropdown-toggle-title">${escapeHtml(t('solutions'))}</div>
            <div class="nav-menu-dropdown-icon w-icon-dropdown-toggle"></div>
          </div>
          <nav class="nav-menu-dropdown-list w-dropdown-list">
            <div class="nav-menu-dropdown-column">
              <div class="nav-menu-dropdown-column-links">
                ${solutionsLinks}
              </div>
            </div>
            <div class="nav-menu-dropdown-column image">
              <a href="${sideHref}" class="w-inline-block"><img src="${solutionsSideImage.src}" loading="eager" width="${solutionsSideImage.width}" alt="${sideAlt}"></a>
            </div>
          </nav>
        </div>
        <div data-hover="true" data-delay="0" class="nav-menu-dropdown w-dropdown">
          <div class="dropdown-toggle w-dropdown-toggle">
            <div class="nav-menu-dropdown-toggle-title">${escapeHtml(t('resources'))}</div>
            <div class="nav-menu-dropdown-icon w-icon-dropdown-toggle"></div>
          </div>
          <nav class="nav-menu-dropdown-list w-dropdown-list">
            <div class="nav-menu-dropdown-column no-gap">
              ${resourcesLinks}
            </div>
          </nav>
        </div>
        <div data-hover="true" data-delay="0" class="nav-menu-dropdown w-dropdown">
          <div class="dropdown-toggle w-dropdown-toggle">
            <div class="nav-menu-dropdown-toggle-title">${escapeHtml(t('developers'))}</div>
            <div class="nav-menu-dropdown-icon w-icon-dropdown-toggle"></div>
          </div>
          <nav class="nav-menu-dropdown-list developers w-dropdown-list">
            <div class="nav-menu-dropdown-column">
              <div class="nav-menu-dropdown-column-links">
                ${devLinks}
              </div>
            </div>
          </nav>
        </div>
        <ul role="list" class="header-navigation">
          <li class="nav-item-wrapper"><a href="${linkHref(locale, '/pricing')}" class="nav-link">${escapeHtml(t('pricing'))}</a></li>
        </ul>
        <div class="mobile-nav-buttons">
          <a href="https://portal.authgear.com/" target="_blank" class="nav-button login plausible-event-name--login mobile w-inline-block">
            <div class="text-block-32">${escapeHtml(t('loginMobile'))}</div>
          </a>
          <a href="https://portal.authgear.com/" class="button-primary header-button-mobile signup plausible-event-name--signup w-button">${escapeHtml(t('signupMobile'))}</a>
        </div>
      </nav>
      <div id="w-node-_60c42e91-3cdd-38fc-0e84-178975fa9c90-75fa9b9e" class="split-content header-right">
        <a href="${linkHref(locale, '/schedule-demo')}" class="button-primary header-button w-button">${escapeHtml(t('getDemo'))}</a>
        <a href="https://portal.authgear.com/" target="_blank" class="nav-button login plausible-event-name--login w-inline-block">
          <div>${escapeHtml(t('signupLogin'))}</div>
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
    </div>`;
}

function escapeFooter(s: string): string {
  return escapeHtml(s);
}

/** Renders footer inner HTML from the same link set as the global footer, with locale-aware paths and labels. */
export async function getFooterInnerHtml(locale: string): Promise<string> {
  const h = (path: string) => linkHref(locale, path);
  const L = (key: string) => escapeFooter(footerStrings[key][locale] ?? footerStrings[key]['en'] ?? '');

  const powered = footerStrings['poweredBy'][locale] ?? footerStrings['poweredBy']['en'];
  const poweredSuffix = footerStrings['poweredBySuffix'][locale] ?? footerStrings['poweredBySuffix']['en'];

  return `
    <div class="workshop-footer-separator"></div>
    <div class="container-default w-container">
      <div class="footer-wrapper">
        <div class="footer-top-content workshop">
          <div class="footer-brand-wrapper workshop">
            <a href="${h('/')}" class="footer-image w-inline-block"><img src="/images/authgear-logo-white.svg" loading="lazy" alt="Authgear"></a>
            <div class="footer__dark-authgear-desc">${escapeFooter(powered)}<a href="https://skymakers.digital/" class="footer__dark-authgear-desc">SkyMakers Digital Group</a>${escapeFooter(poweredSuffix)}</div>
            <div class="footer-social-media-links-wrapper">
              <a href="https://www.linkedin.com/company/authgear" target="_blank" class="footer-social-media-link icon-small gray-bg w-inline-block"></a>
              <a href="https://discord.gg/Kdn5vcYwAS" target="_blank" class="footer-social-media-link icon-small gray-bg w-inline-block"><img width="19" loading="lazy" alt="Discord" src="/images/authgear_footer_social_discord.svg" class="footer-social-media-icon"></a>
              <a href="https://github.com/authgear" target="_blank" class="footer-social-media-link icon-small gray-bg w-inline-block"><img loading="lazy" src="/images/authgear_footer_social_github.svg" alt="GitHub" class="footer-social-media-icon"></a>
            </div>
            <div class="footer-certificate"><img width="144.5" loading="lazy" alt="${L('isoCertAlt')}" src="/images/Authgear_footer_certificated_blue2x.png" class="certificate-img"></div>
          </div>
          <div class="footer-menu-navigation-wrapper workshop">
            <div class="footer-menu-links-wrapper workshop">
              <ul role="list" class="footer-menu-list w-list-unstyled">
                <li class="footer-menu-list-item"><h6 class="footer-menu-title">${L('productsTitle')}</h6></li>
                <li class="footer-menu-list-item"><a href="${h('/once')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('onYourServer')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('onTheCloud')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/pricing')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('pricing')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/migrate-to-authgear')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('samlMigration')}</div></a></li>
              </ul>
              <ul role="list" class="footer-menu-list w-list-unstyled">
                <li class="footer-menu-list-item"><h6 class="footer-menu-title">${L('alternativeTitle')}</h6></li>
                <li class="footer-menu-list-item"><a href="${h('/compare/okta-alternative')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('oktaAlternative')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/compare/auth0-alternative')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('auth0Alternative')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/compare/cognito-alternative')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('cognitoAlternative')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/compare/firebase-alternative')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('firebaseAlternative')}</div></a></li>
              </ul>
            </div>
            <div class="footer-menu-links-wrapper workshop">
              <ul role="list" class="footer-menu-list w-list-unstyled">
                <li class="footer-menu-list-item"><h6 class="footer-menu-title">${L('developersTitle')}</h6></li>
                <li class="footer-menu-list-item"><a href="https://docs.authgear.com" target="_blank" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('documentation')}</div></a></li>
                <li class="footer-menu-list-item"><a href="https://docs.authgear.com/reference/apis/oauth-2.0-and-openid-connect-oidc/userinfo" target="_blank" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('apiReference')}</div></a></li>
                <li class="footer-menu-list-item"><a href="https://github.com/authgear" class="footer-menu-link workshop-footer-link w-inline-block"><div>GitHub</div></a></li>
                <li class="footer-menu-list-item"><a href="https://github.com/authgear/authgear-server/discussions" target="_blank" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('communityForum')}</div></a></li>
                <li class="footer-menu-list-item"><a href="https://discord.gg/Kdn5vcYwAS" target="_blank" class="footer-menu-link workshop-footer-link w-inline-block"><div>Discord</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/integrations')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('integrations')}</div></a></li>
              </ul>
            </div>
            <div class="footer-menu-links-wrapper workshop">
              <ul role="list" class="footer-menu-list w-list-unstyled">
                <li class="footer-menu-list-item"><h6 class="footer-menu-title">${L('resourcesTitle')}</h6></li>
                <li class="footer-menu-list-item"><a href="${h('/blog')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('blog')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/login-gallery')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('loginGallery')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/glossary')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('glossary')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/security')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('security')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/terms')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('termsOfService')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/policy')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('privacyPolicy')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/data-privacy')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('dataPrivacy')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/terms-of-enterprise-license')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('enterpriseLicenses')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/sla')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>SLA</div></a></li>
              </ul>
              <ul role="list" class="footer-menu-list w-list-unstyled">
                <li class="footer-menu-list-item"><a href="${h('/auth-toolkit')}" class="footer-menu-title w-inline-block"><h6 class="footer-menu-title">${L('freeToolsTitle')}</h6></a></li>
                <li class="footer-menu-list-item"><a href="${h('/tools/oidc-discovery-endpoint')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('oidcDiscovery')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/tools/ssl-checker')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('sslChecker')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/tools/uuidv7-generator')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('uuidv7Generator')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/tools/base64-decode-encode')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('base64')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/tools/jwt-jwe-debugger')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('jwtDebugger')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/tools/jwk-generator')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('jwkGenerator')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/tools/password-hash-generator')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('passwordHash')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/tools/hmac-signature-generator-verifier')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('hmacSignature')}</div></a></li>
                <li class="footer-menu-list-item"><a href="https://samlsp.com/" target="_blank" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('samlTestingTool')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/tools/totp-authenticator')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('totpAuthenticator')}</div></a></li>
              </ul>
            </div>
            <div class="footer-menu-links-wrapper workshop">
              <ul role="list" class="footer-menu-list w-list-unstyled">
                <li class="footer-menu-list-item"><h6 class="footer-menu-title">${L('companyTitle')}</h6></li>
                <li class="footer-menu-list-item"><a href="${h('/about')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('aboutUs')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/schedule-demo')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('contactSales')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/about')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>SkyMakers Digital</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/promises')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('ourPromises')}</div></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}
