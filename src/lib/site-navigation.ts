import type { NavLink } from './navigation-data';
import { localizedPath } from './i18n';

/** Resolve the locale-specific href for a nav link. External hrefs pass through; internal paths get localized. */
export function linkHref(link: NavLink, locale: string): string {
  if (link.href) return link.href;
  if (link.path) return localizedPath(locale, link.path);
  return '#';
}

/** Resolve the locale-specific label for a nav link, with en fallback. */
export function linkLabel(link: NavLink, locale: string): string {
  return link.label[locale] ?? link.label.en;
}

/** Resolve a localized string from a Record<key, Record<locale, string>> table. */
export function localizedString(
  table: Record<string, Record<string, string>>,
  key: string,
  locale: string,
): string {
  const entry = table[key];
  if (!entry) return key;
  return entry[locale] ?? entry.en ?? key;
}
