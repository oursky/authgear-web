import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import PlausibleLink from '@/components/PlausibleLink';
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
import { DevelopersNavIcon, ResourcesNavIcon } from '@/components/layout/ResourcesDevelopersNavIcons';
import { SolutionsNavIcon } from '@/components/layout/SolutionsNavIcons';

function label(link: NavLink, locale: string): string {
  return link.label[locale] ?? link.label['en'] ?? '';
}

function HtmlLabel({ html }: { html: string }) {
  const parts = html.split('<br>');
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>{i > 0 && <br />}{part}</span>
      ))}
    </>
  );
}

function href(locale: string, pathOrUrl: string): string {
  if (pathOrUrl.startsWith('http')) return pathOrUrl;
  return localizedPath(locale, pathOrUrl);
}

function ProductColumns({ columns, locale }: { columns: NavColumn[]; locale: string }) {
  return (
    <>
      {columns.map((col, i) => {
        if (col.type === 'stacked') {
          return (
            <div key={i} className="nav-menu-dropdown-column">
              <div className="nav-full-width-vertical-block">
                {col.sections.map((sec, j) => (
                  <div key={j} className="nav-menu-dropdown-column">
                    <div className="nav-menu-dropdown-subtitle">
                      {sec.subtitle[locale] ?? sec.subtitle['en']}
                    </div>
                    <div className="nav-menu-dropdown-column-links">
                      {sec.links.map((item, k) => (
                        <Link key={k} href={href(locale, item.path!)} className="nav-menu-dropdown-link w-inline-block">
                          <div>{label(item, locale)}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        if (col.type === 'productColumn') {
          return (
            <div key={i} className="nav-menu-dropdown-column">
              <div className="nav-menu-dropdown-column-links">
                <div className="nav-menu-dropdown-subtitle product">
                  {col.subtitle[locale] ?? col.subtitle['en']}
                </div>
                {col.links.map((item, k) => {
                  const rawHtml = item.html ? (item.html[locale] ?? item.html['en'] ?? '') : null;
                  return (
                    <Link key={k} href={href(locale, item.path!)} className="nav-menu-dropdown-link products w-inline-block">
                      <div>{rawHtml ? <HtmlLabel html={rawHtml} /> : label(item, locale)}</div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        }

        // Simple column
        const simple = col as { subtitle: Record<string, string>; links: NavLink[] };
        return (
          <div key={i} className="nav-menu-dropdown-column">
            <div className="nav-menu-dropdown-column">
              <div className="nav-menu-dropdown-subtitle">
                {simple.subtitle[locale] ?? simple.subtitle['en']}
              </div>
              <div className="nav-menu-dropdown-column-links">
                {simple.links.map((item, k) => (
                  <Link key={k} href={href(locale, item.path!)} className="nav-menu-dropdown-link w-inline-block">
                    <div>{label(item, locale)}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default async function SiteNav({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'Navigation' });
  const sideHref = href(locale, solutionsSideImage.path);
  const sideAlt = solutionsSideImage.alt[locale] ?? solutionsSideImage.alt['en'] ?? '';

  return (
    <div className="container-header">
      <Link
        href={localizedPath(locale, '/')}
        id="w-node-_60c42e91-3cdd-38fc-0e84-178975fa9ba3-75fa9b9e"
        className="brand w-nav-brand"
      >
        <img src="/images/authgear-logo.svg" alt={t('logoAlt')} className="header-logo" />
      </Link>

      <nav
        role="navigation"
        id="w-node-_60c42e91-3cdd-38fc-0e84-178975fa9ba5-75fa9b9e"
        className="nav-menu w-nav-menu"
      >
        {/* Products */}
        <div data-delay="0" data-hover="true" className="nav-menu-dropdown w-dropdown">
          <div className="dropdown-toggle w-dropdown-toggle">
            <div className="nav-menu-dropdown-toggle-title">{t('products')}</div>
            <div className="nav-menu-dropdown-icon w-icon-dropdown-toggle" />
          </div>
          <nav className="nav-menu-dropdown-list-full-width w-dropdown-list">
            <div className="nav-full-width-wrapper">
              <div className="nav-full-width-inner">
                <ProductColumns columns={productsDropdownColumns} locale={locale} />
              </div>
            </div>
          </nav>
        </div>

        {/* Solutions */}
        <div data-hover="true" data-delay="0" className="nav-menu-dropdown w-dropdown">
          <div className="dropdown-toggle w-dropdown-toggle">
            <div className="nav-menu-dropdown-toggle-title">{t('solutions')}</div>
            <div className="nav-menu-dropdown-icon w-icon-dropdown-toggle" />
          </div>
          <nav className="nav-menu-dropdown-list w-dropdown-list">
            <div className="nav-menu-dropdown-column">
              <div className="nav-menu-dropdown-column-links">
                {solutionsDropdownLinks.map((item, i) => (
                  <Link key={i} href={href(locale, item.path!)} className="nav-menu-dropdown-link w-inline-block">
                    <div className="w-embed nav-dropdown-icon-embed">
                      <SolutionsNavIcon path={item.path!} />
                    </div>
                    <div>{label(item, locale)}</div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="nav-menu-dropdown-column image">
              <Link href={sideHref} className="w-inline-block">
                <img
                  src={solutionsSideImage.src}
                  loading="eager"
                  width={solutionsSideImage.width}
                  alt={sideAlt}
                />
              </Link>
            </div>
          </nav>
        </div>

        {/* Resources */}
        <div data-hover="true" data-delay="0" className="nav-menu-dropdown w-dropdown">
          <div className="dropdown-toggle w-dropdown-toggle">
            <div className="nav-menu-dropdown-toggle-title">{t('resources')}</div>
            <div className="nav-menu-dropdown-icon w-icon-dropdown-toggle" />
          </div>
          <nav className="nav-menu-dropdown-list w-dropdown-list">
            <div className="nav-menu-dropdown-column no-gap">
              {resourcesDropdownLinks.map((item, i) => (
                <Link key={i} href={href(locale, item.path!)} className="nav-menu-dropdown-link w-inline-block">
                  <div className="w-embed nav-dropdown-icon-embed">
                    <ResourcesNavIcon path={item.path!} />
                  </div>
                  <div>{label(item, locale)}</div>
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {/* Developers */}
        <div data-hover="true" data-delay="0" className="nav-menu-dropdown w-dropdown">
          <div className="dropdown-toggle w-dropdown-toggle">
            <div className="nav-menu-dropdown-toggle-title">{t('developers')}</div>
            <div className="nav-menu-dropdown-icon w-icon-dropdown-toggle" />
          </div>
          <nav className="nav-menu-dropdown-list developers w-dropdown-list">
            <div className="nav-menu-dropdown-column">
              <div className="nav-menu-dropdown-column-links">
                {developersDropdownLinks.map((item, i) => (
                  <Link key={i} href={item.href ?? href(locale, item.path!)} className="nav-menu-dropdown-link w-inline-block">
                    <div className="w-embed nav-dropdown-icon-embed">
                      <DevelopersNavIcon path={item.path} href={item.href} />
                    </div>
                    <div>{label(item, locale)}</div>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>

        <ul role="list" className="header-navigation">
          <li className="nav-item-wrapper">
            <Link href={localizedPath(locale, '/pricing')} className="nav-link">
              {t('pricing')}
            </Link>
          </li>
        </ul>

        <div className="mobile-nav-buttons">
          <PlausibleLink
            href="https://portal.authgear.com/"
            target="_blank"
            className="nav-button login mobile w-inline-block"
            eventName="login"
          >
            <div className="text-block-32">{t('loginMobile')}</div>
          </PlausibleLink>
          <PlausibleLink
            href="https://portal.authgear.com/"
            className="button-primary header-button-mobile signup w-button"
            eventName="signup"
          >
            {t('signupMobile')}
          </PlausibleLink>
        </div>
      </nav>

      <div
        id="w-node-_60c42e91-3cdd-38fc-0e84-178975fa9c90-75fa9b9e"
        className="split-content header-right"
      >
        <Link href={localizedPath(locale, '/schedule-demo')} className="button-primary header-button w-button">
          {t('getDemo')}
        </Link>
        <PlausibleLink
          href="https://portal.authgear.com/"
          target="_blank"
          className="nav-button login w-inline-block"
          eventName="login"
        >
          <div>{t('signupLogin')}</div>
        </PlausibleLink>
        <div className="menu-button w-nav-button">
          <div className="menu-button-wrapper">
            <div className="menu-button-icon">
              <div className="menu-line-top" />
              <div className="menu-line-middle" />
              <div className="menu-line-bottom" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
