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

/** Renders footer inner HTML from the same link set as the global footer, with locale-aware paths and zh-TW labels. */
export async function getFooterInnerHtml(locale: string): Promise<string> {
  const isZh = locale === 'zh-TW';
  const h = (path: string) => linkHref(locale, path);
  const L = (en: string, zhTW: string) => escapeFooter(isZh ? zhTW : en);

  const powered = isZh ? 'Authgear 由 ' : 'Authgear powered by ';
  const poweredSuffix = isZh ? ' 提供' : '';

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
            <div class="footer-certificate"><img width="144.5" loading="lazy" alt="${L('ISO 27001 Certified', 'ISO 27001 認證')}" src="/images/Authgear_footer_certificated_blue2x.png" class="certificate-img"></div>
          </div>
          <div class="footer-menu-navigation-wrapper workshop">
            <div class="footer-menu-links-wrapper workshop">
              <ul role="list" class="footer-menu-list w-list-unstyled">
                <li class="footer-menu-list-item"><h6 class="footer-menu-title">${L('Products', '產品')}</h6></li>
                <li class="footer-menu-list-item"><a href="${h('/once')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('On your Server (ONCE)', '自建版（ONCE）')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('On the Cloud', '雲端版')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/pricing')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('Pricing', '定價')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/migrate-to-authgear')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('SAML Migration', 'SAML 遷移')}</div></a></li>
              </ul>
              <ul role="list" class="footer-menu-list w-list-unstyled">
                <li class="footer-menu-list-item"><h6 class="footer-menu-title">${L('alternative', '產品替代方案')}</h6></li>
                <li class="footer-menu-list-item"><a href="${h('/compare/okta-alternative')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('Okta Alternative', 'Okta 替代方案')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/compare/auth0-alternative')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('Auth0 Alternative', 'Auth0 替代方案')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/compare/cognito-alternative')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('Cognito Alternative', 'Cognito 替代方案')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/compare/firebase-alternative')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('Firebase Alternative', 'Firebase 替代方案')}</div></a></li>
              </ul>
            </div>
            <div class="footer-menu-links-wrapper workshop">
              <ul role="list" class="footer-menu-list w-list-unstyled">
                <li class="footer-menu-list-item"><h6 class="footer-menu-title">${L('developers', '開發者')}</h6></li>
                <li class="footer-menu-list-item"><a href="https://docs.authgear.com" target="_blank" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('Documentation', '文件')}</div></a></li>
                <li class="footer-menu-list-item"><a href="https://docs.authgear.com/reference/apis/oauth-2.0-and-openid-connect-oidc/userinfo" target="_blank" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('API Reference', 'API 參考')}</div></a></li>
                <li class="footer-menu-list-item"><a href="https://github.com/authgear" class="footer-menu-link workshop-footer-link w-inline-block"><div>GitHub</div></a></li>
                <li class="footer-menu-list-item"><a href="https://github.com/authgear/authgear-server/discussions" target="_blank" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('Community Forum', '社群論壇')}</div></a></li>
                <li class="footer-menu-list-item"><a href="https://discord.gg/Kdn5vcYwAS" target="_blank" class="footer-menu-link workshop-footer-link w-inline-block"><div>Discord</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/integrations')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('Integrations', '整合')}</div></a></li>
              </ul>
            </div>
            <div class="footer-menu-links-wrapper workshop">
              <ul role="list" class="footer-menu-list w-list-unstyled">
                <li class="footer-menu-list-item"><h6 class="footer-menu-title">${L('resources', '資源')}</h6></li>
                <li class="footer-menu-list-item"><a href="${h('/blog')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('Blog', '部落格')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/login-gallery')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('Login Gallery', '登入畫廊')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/glossary')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('Glossary', '名詞解釋')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/security')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('Security', '安全性')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/terms')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('Terms of Service', '服務條款')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/policy')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('Privacy Policy', '隱私權政策')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/data-privacy')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('Data Privacy', '資料隱私')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/terms-of-enterprise-license')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('Enterprise Licenses', '企業授權')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/sla')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>SLA</div></a></li>
              </ul>
              <ul role="list" class="footer-menu-list w-list-unstyled">
                <li class="footer-menu-list-item"><a href="${h('/auth-toolkit')}" class="footer-menu-title w-inline-block"><h6 class="footer-menu-title">${L('Free Tools', '免費工具')}</h6></a></li>
                <li class="footer-menu-list-item"><a href="${h('/tools/oidc-discovery-endpoint')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('OIDC Discovery Explorer', 'OIDC Discovery 探索器')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/tools/ssl-checker')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('SSL Checker', 'SSL 檢查工具')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/tools/uuidv7-generator')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('UUID v7 Generator', 'UUID v7 產生器')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/tools/base64-decode-encode')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('Base64 Decode/Encode', 'Base64 編解碼')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/tools/jwt-jwe-debugger')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('JWT &amp; JWE Debugger', 'JWT 與 JWE 除錯器')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/tools/jwk-generator')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('JWK Generator', 'JWK 產生器')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/tools/password-hash-generator')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('Password Hash Generator/Verifier', '密碼雜湊產生／驗證')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/tools/hmac-signature-generator-verifier')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('HMAC Signature Generator/Verifier', 'HMAC 簽章產生／驗證')}</div></a></li>
                <li class="footer-menu-list-item"><a href="https://samlsp.com/" target="_blank" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('SAML Testing Tool', 'SAML 測試工具')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/tools/totp-authenticator')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('TOTP Authenticator', 'TOTP 驗證器')}</div></a></li>
              </ul>
            </div>
            <div class="footer-menu-links-wrapper workshop">
              <ul role="list" class="footer-menu-list w-list-unstyled">
                <li class="footer-menu-list-item"><h6 class="footer-menu-title">${L('company', '公司')}</h6></li>
                <li class="footer-menu-list-item"><a href="${h('/about')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('About Us', '關於我們')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/schedule-demo')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('Contact Sales', '聯絡業務')}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/about')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>SkyMakers Digital</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/promises')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L('Our Promises', '我們的承諾')}</div></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}
