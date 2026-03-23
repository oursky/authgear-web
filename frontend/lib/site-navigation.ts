import navigation from '@/content/navigation.json';
import { localizedPath } from '@/lib/i18n';

type Localized = { en: string; 'zh-TW': string };

function pick(locale: string, t: Localized): string {
  return locale === 'zh-TW' ? t['zh-TW'] : t.en;
}

function linkHref(locale: string, pathOrUrl: string): string {
  if (pathOrUrl.startsWith('http')) return pathOrUrl;
  return localizedPath(locale, pathOrUrl);
}

type NavLink = {
  path?: string;
  href?: string;
  en: string;
  'zh-TW': string;
  html?: Localized;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Renders header nav inner HTML (inside `.container-header`) from `content/navigation.json`. */
export function getNavInnerHtml(locale: string): string {
  const nav = navigation;
  const L = (o: Localized) => pick(locale, o);

  const logoAlt = escapeHtml(L(nav.logoAlt));

  const productColumnsHtml = nav.productsDropdown.columns
    .map((col) => {
      if ('type' in col && col.type === 'stacked') {
        const stacked = col as typeof col & {
          type: 'stacked';
          sections: { subtitle: Localized; links: NavLink[] }[];
        };
        const inner = stacked.sections
          .map(
            (sec) => `
                    <div class="nav-menu-dropdown-column">
                      <div class="nav-menu-dropdown-subtitle">${escapeHtml(L(sec.subtitle))}</div>
                      <div class="nav-menu-dropdown-column-links">
                        ${sec.links
                          .map((item) => {
                            const h = linkHref(locale, item.path!);
                            const label = escapeHtml(L(item));
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

      if ('type' in col && col.type === 'productColumn') {
        const pc = col as typeof col & {
          type: 'productColumn';
          subtitle: Localized;
          links: ({ path: string; en: string; 'zh-TW': string; html?: Localized } | NavLink)[];
        };
        const linksHtml = pc.links
          .map((item) => {
            const h = linkHref(locale, item.path);
            const divInner =
              'html' in item && item.html
                ? L(item.html)
                : escapeHtml(L(item as NavLink));
            return `<a href="${h}" class="nav-menu-dropdown-link products w-inline-block">
                      <div>${divInner}</div>
                    </a>`;
          })
          .join('');
        return `
                <div class="nav-menu-dropdown-column">
                  <div class="nav-menu-dropdown-column-links">
                    <div class="nav-menu-dropdown-subtitle product">${escapeHtml(L(pc.subtitle))}</div>
                    ${linksHtml}
                  </div>
                </div>`;
      }

      const simple = col as { subtitle: Localized; links: NavLink[] };
      return `
                <div class="nav-menu-dropdown-column">
                  <div class="nav-menu-dropdown-column">
                    <div class="nav-menu-dropdown-subtitle">${escapeHtml(L(simple.subtitle))}</div>
                    <div class="nav-menu-dropdown-column-links">
                      ${simple.links
                        .map((item) => {
                          const h = linkHref(locale, item.path!);
                          const label = escapeHtml(L(item));
                          return `<a href="${h}" class="nav-menu-dropdown-link w-inline-block"><div>${label}</div></a>`;
                        })
                        .join('')}
                    </div>
                  </div>
                </div>`;
    })
    .join('');

  const solutions = nav.solutionsDropdown;
  const solutionsLinks = solutions.links
    .map((item) => {
      const h = linkHref(locale, item.path);
      return `<a href="${h}" class="nav-menu-dropdown-link w-inline-block"><div>${escapeHtml(L(item))}</div></a>`;
    })
    .join('');
  const sideHref = linkHref(locale, solutions.sideImage.path);
  const sideAlt = escapeHtml(L(solutions.sideImage.alt));

  const resourcesLinks = nav.resourcesDropdown.links
    .map((item) => {
      const h = linkHref(locale, item.path);
      return `<a href="${h}" class="nav-menu-dropdown-link w-inline-block"><div>${escapeHtml(L(item))}</div></a>`;
    })
    .join('');

  const devLinks = nav.developersDropdown.links
    .map((item) => {
      const raw = item as NavLink & { path?: string; href?: string };
      const h = raw.href ? raw.href : linkHref(locale, raw.path!);
      return `<a href="${h}" class="nav-menu-dropdown-link w-inline-block"><div>${escapeHtml(L(item))}</div></a>`;
    })
    .join('');

  const c = nav.headerCta;

  return `
    <div class="container-header">
      <a href="${linkHref(locale, '/')}" id="w-node-_60c42e91-3cdd-38fc-0e84-178975fa9ba3-75fa9b9e" class="brand w-nav-brand"><img src="/images/authgear-logo.svg" alt="${logoAlt}" class="header-logo"></a>
      <nav role="navigation" id="w-node-_60c42e91-3cdd-38fc-0e84-178975fa9ba5-75fa9b9e" class="nav-menu w-nav-menu">
        <div data-delay="0" data-hover="true" class="nav-menu-dropdown w-dropdown">
          <div class="dropdown-toggle w-dropdown-toggle">
            <div class="nav-menu-dropdown-toggle-title">${escapeHtml(L(nav.topLevel.products))}</div>
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
            <div class="nav-menu-dropdown-toggle-title">${escapeHtml(L(nav.topLevel.solutions))}</div>
            <div class="nav-menu-dropdown-icon w-icon-dropdown-toggle"></div>
          </div>
          <nav class="nav-menu-dropdown-list w-dropdown-list">
            <div class="nav-menu-dropdown-column">
              <div class="nav-menu-dropdown-column-links">
                ${solutionsLinks}
              </div>
            </div>
            <div class="nav-menu-dropdown-column image">
              <a href="${sideHref}" class="w-inline-block"><img src="${solutions.sideImage.src}" loading="eager" width="${solutions.sideImage.width}" alt="${sideAlt}"></a>
            </div>
          </nav>
        </div>
        <div data-hover="true" data-delay="0" class="nav-menu-dropdown w-dropdown">
          <div class="dropdown-toggle w-dropdown-toggle">
            <div class="nav-menu-dropdown-toggle-title">${escapeHtml(L(nav.topLevel.resources))}</div>
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
            <div class="nav-menu-dropdown-toggle-title">${escapeHtml(L(nav.topLevel.developers))}</div>
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
          <li class="nav-item-wrapper"><a href="${linkHref(locale, '/pricing')}" class="nav-link">${escapeHtml(L(c.pricing))}</a></li>
        </ul>
        <div class="mobile-nav-buttons">
          <a href="https://portal.authgear.com/" target="_blank" class="nav-button login plausible-event-name--login mobile w-inline-block">
            <div class="text-block-32">${escapeHtml(L(c.loginMobile))}</div>
          </a>
          <a href="https://portal.authgear.com/" class="button-primary header-button-mobile signup plausible-event-name--signup w-button">${escapeHtml(L(c.signupMobile))}</a>
        </div>
      </nav>
      <div id="w-node-_60c42e91-3cdd-38fc-0e84-178975fa9c90-75fa9b9e" class="split-content header-right">
        <a href="${linkHref(locale, '/schedule-demo')}" class="button-primary header-button w-button">${escapeHtml(L(c.getDemo))}</a>
        <a href="https://portal.authgear.com/" target="_blank" class="nav-button login plausible-event-name--login w-inline-block">
          <div>${escapeHtml(L(c.signupLogin))}</div>
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

type FooterT = { en: string; 'zh-TW': string };

function F(locale: string, t: FooterT): string {
  return locale === 'zh-TW' ? t['zh-TW'] : t.en;
}

/** Renders footer inner HTML from the same link set as the global footer, with locale-aware paths and zh-TW labels. */
export function getFooterInnerHtml(locale: string): string {
  const h = (path: string) => linkHref(locale, path);
  const L = (t: FooterT) => escapeHtml(F(locale, t));

  const powered = F(locale, {
    en: 'Authgear powered by ',
    'zh-TW': 'Authgear 由 ',
  });
  const poweredSuffix = F(locale, {
    en: '',
    'zh-TW': ' 提供',
  });

  return `
    <div class="workshop-footer-separator"></div>
    <div class="container-default w-container">
      <div class="footer-wrapper">
        <div class="footer-top-content workshop">
          <div class="footer-brand-wrapper workshop">
            <a href="${h('/')}" class="footer-image w-inline-block"><img src="/images/authgear-logo-white.svg" loading="lazy" alt="Authgear"></a>
            <div class="footer__dark-authgear-desc">${escapeHtml(powered)}<a href="https://skymakers.digital/" class="footer__dark-authgear-desc">SkyMakers Digital Group</a>${escapeHtml(poweredSuffix)}</div>
            <div class="footer-social-media-links-wrapper">
              <a href="https://www.linkedin.com/company/authgear" target="_blank" class="footer-social-media-link icon-small gray-bg w-inline-block"></a>
              <a href="https://discord.gg/Kdn5vcYwAS" target="_blank" class="footer-social-media-link icon-small gray-bg w-inline-block"><img width="19" loading="lazy" alt="Discord" src="/images/authgear_footer_social_discord.svg" class="footer-social-media-icon"></a>
              <a href="https://github.com/authgear" target="_blank" class="footer-social-media-link icon-small gray-bg w-inline-block"><img loading="lazy" src="/images/authgear_footer_social_github.svg" alt="GitHub" class="footer-social-media-icon"></a>
            </div>
            <div class="footer-certificate"><img width="144.5" loading="lazy" alt="${L({ en: 'ISO 27001 Certified', 'zh-TW': 'ISO 27001 認證' })}" src="/images/Authgear_footer_certificated_blue2x.png" class="certificate-img"></div>
          </div>
          <div class="footer-menu-navigation-wrapper workshop">
            <div class="footer-menu-links-wrapper workshop">
              <ul role="list" class="footer-menu-list w-list-unstyled">
                <li class="footer-menu-list-item"><h6 class="footer-menu-title">${L({ en: 'Products', 'zh-TW': '產品' })}</h6></li>
                <li class="footer-menu-list-item"><a href="${h('/once')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L({ en: 'On your Server (ONCE)', 'zh-TW': '自建版（ONCE）' })}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L({ en: 'On the Cloud', 'zh-TW': '雲端版' })}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/pricing')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L({ en: 'Pricing', 'zh-TW': '定價' })}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/migrate-to-authgear')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L({ en: 'SAML Migration', 'zh-TW': 'SAML 遷移' })}</div></a></li>
              </ul>
              <ul role="list" class="footer-menu-list w-list-unstyled">
                <li class="footer-menu-list-item"><h6 class="footer-menu-title">${L({ en: 'alternative', 'zh-TW': '產品替代方案' })}</h6></li>
                <li class="footer-menu-list-item"><a href="${h('/compare/okta-alternative')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L({ en: 'Okta Alternative', 'zh-TW': 'Okta 替代方案' })}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/compare/auth0-alternative')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L({ en: 'Auth0 Alternative', 'zh-TW': 'Auth0 替代方案' })}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/compare/cognito-alternative')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L({ en: 'Cognito Alternative', 'zh-TW': 'Cognito 替代方案' })}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/compare/firebase-alternative')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L({ en: 'Firebase Alternative', 'zh-TW': 'Firebase 替代方案' })}</div></a></li>
              </ul>
            </div>
            <div class="footer-menu-links-wrapper workshop">
              <ul role="list" class="footer-menu-list w-list-unstyled">
                <li class="footer-menu-list-item"><h6 class="footer-menu-title">${L({ en: 'developers', 'zh-TW': '開發者' })}</h6></li>
                <li class="footer-menu-list-item"><a href="https://docs.authgear.com" target="_blank" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L({ en: 'Documentation', 'zh-TW': '文件' })}</div></a></li>
                <li class="footer-menu-list-item"><a href="https://docs.authgear.com/reference/apis/oauth-2.0-and-openid-connect-oidc/userinfo" target="_blank" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L({ en: 'API Reference', 'zh-TW': 'API 參考' })}</div></a></li>
                <li class="footer-menu-list-item"><a href="https://github.com/authgear" class="footer-menu-link workshop-footer-link w-inline-block"><div>GitHub</div></a></li>
                <li class="footer-menu-list-item"><a href="https://github.com/authgear/authgear-server/discussions" target="_blank" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L({ en: 'Community Forum', 'zh-TW': '社群論壇' })}</div></a></li>
                <li class="footer-menu-list-item"><a href="https://discord.gg/Kdn5vcYwAS" target="_blank" class="footer-menu-link workshop-footer-link w-inline-block"><div>Discord</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/integrations')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L({ en: 'Integrations', 'zh-TW': '整合' })}</div></a></li>
              </ul>
            </div>
            <div class="footer-menu-links-wrapper workshop">
              <ul role="list" class="footer-menu-list w-list-unstyled">
                <li class="footer-menu-list-item"><h6 class="footer-menu-title">${L({ en: 'resources', 'zh-TW': '資源' })}</h6></li>
                <li class="footer-menu-list-item"><a href="${h('/blog')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L({ en: 'Blog', 'zh-TW': '部落格' })}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/login-gallery')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L({ en: 'Login Gallery', 'zh-TW': '登入畫廊' })}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/glossary')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L({ en: 'Glossary', 'zh-TW': '名詞解釋' })}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/security')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L({ en: 'Security', 'zh-TW': '安全性' })}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/terms')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L({ en: 'Terms of Service', 'zh-TW': '服務條款' })}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/policy')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L({ en: 'Privacy Policy', 'zh-TW': '隱私權政策' })}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/data-privacy')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L({ en: 'Data Privacy', 'zh-TW': '資料隱私' })}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/terms-of-enterprise-license')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L({ en: 'Enterprise Licenses', 'zh-TW': '企業授權' })}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/sla')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>SLA</div></a></li>
              </ul>
              <ul role="list" class="footer-menu-list w-list-unstyled">
                <li class="footer-menu-list-item"><a href="${h('/auth-toolkit')}" class="footer-menu-title w-inline-block"><h6 class="footer-menu-title">${L({ en: 'Free Tools', 'zh-TW': '免費工具' })}</h6></a></li>
                <li class="footer-menu-list-item"><a href="${h('/tools/oidc-discovery-endpoint')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L({ en: 'OIDC Discovery Explorer', 'zh-TW': 'OIDC Discovery 探索器' })}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/tools/ssl-checker')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L({ en: 'SSL Checker', 'zh-TW': 'SSL 檢查工具' })}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/tools/uuidv7-generator')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L({ en: 'UUID v7 Generator', 'zh-TW': 'UUID v7 產生器' })}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/tools/base64-decode-encode')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L({ en: 'Base64 Decode/Encode', 'zh-TW': 'Base64 編解碼' })}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/tools/jwt-jwe-debugger')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L({ en: 'JWT & JWE Debugger', 'zh-TW': 'JWT 與 JWE 除錯器' })}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/tools/jwk-generator')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L({ en: 'JWK Generator', 'zh-TW': 'JWK 產生器' })}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/tools/password-hash-generator')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L({ en: 'Password Hash Generator/Verifier', 'zh-TW': '密碼雜湊產生／驗證' })}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/tools/hmac-signature-generator-verifier')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L({ en: 'HMAC Signature Generator/Verifier', 'zh-TW': 'HMAC 簽章產生／驗證' })}</div></a></li>
                <li class="footer-menu-list-item"><a href="https://samlsp.com/" target="_blank" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L({ en: 'SAML Testing Tool', 'zh-TW': 'SAML 測試工具' })}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/tools/totp-authenticator')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L({ en: 'TOTP Authenticator', 'zh-TW': 'TOTP 驗證器' })}</div></a></li>
              </ul>
            </div>
            <div class="footer-menu-links-wrapper workshop">
              <ul role="list" class="footer-menu-list w-list-unstyled">
                <li class="footer-menu-list-item"><h6 class="footer-menu-title">${L({ en: 'company', 'zh-TW': '公司' })}</h6></li>
                <li class="footer-menu-list-item"><a href="${h('/about')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L({ en: 'About Us', 'zh-TW': '關於我們' })}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/schedule-demo')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L({ en: 'Contact Sales', 'zh-TW': '聯絡業務' })}</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/about')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>SkyMakers Digital</div></a></li>
                <li class="footer-menu-list-item"><a href="${h('/promises')}" class="footer-menu-link workshop-footer-link w-inline-block"><div>${L({ en: 'Our Promises', 'zh-TW': '我們的承諾' })}</div></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}
