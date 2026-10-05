import { hasLocalizedPage, localizedPath, type Locale } from '@/lib/i18n';

/**
 * The news in the top bar, above the nav.
 *
 * Hand-edited: this is the one place to change what the bar says, where it
 * points, and whether it shows at all. Set `enabled: false` to remove the bar
 * and the extra header height it takes with it.
 *
 * List two or more entries and the bar rolls between them; list one and it
 * sits still. Keep each headline about as short as the others — the bar is a
 * fixed height (see `TopBar.astro`), so a much longer line just gets clipped
 * on desktop or eats its second line on mobile.
 *
 * `text` and `cta` fall back to English for any locale they omit, and `href`
 * resolves to the English page for locales that have no translation of it — so
 * a locale with no entry shows an English line pointing at an English page,
 * rather than a translated line that lands somewhere the reader can't read.
 */
export interface Announcement {
  /** Short slug, sent to Plausible so the headlines can be told apart. */
  id: string;
  /** Locale-neutral site path, e.g. '/solutions/data-sovereignty/'. */
  href: string;
  /** Headline, one short line. Long text is truncated rather than wrapped. */
  text: Partial<Record<Locale, string>> & { en: string };
  /** Link label; an arrow is appended by the component. */
  cta: Partial<Record<Locale, string>> & { en: string };
}

export const enabled = true;

export const announcements: Announcement[] = [
  {
    id: 'data-sovereignty',
    href: '/solutions/data-sovereignty/',
    text: {
      en: "Data sovereignty: keep your users' data in the UK or the EU.",
      // The Traditional Chinese page targets Taiwan rather than Europe.
      'zh-Hant': '資料在地化：會員資料放在台灣，最安心。',
      es: 'Soberanía de datos: los datos de tus usuarios, en servidores europeos.',
      de: 'Datensouveränität: Nutzerdaten auf europäischen Servern.',
      // U+202F narrow no-break space before the colon, per French typography.
      fr: 'Souveraineté des données : vos données sur des serveurs européens.',
      // No `ja`: /solutions/data-sovereignty/ has no Japanese translation, so
      // Japanese readers get the English line and the English page together.
    },
    cta: {
      en: 'See how',
      'zh-Hant': '了解更多',
      es: 'Descubre cómo',
      de: 'So funktioniert es',
      fr: 'Découvrir',
    },
  },
  {
    id: 'mcp',
    href: '/features/mcp-authentication/',
    // This page is translated in every locale, so each reader gets their own.
    text: {
      en: 'Auth for MCP: let AI agents sign in to your MCP server.',
      'zh-Hant': 'MCP 身份驗證：讓 AI 代理安全登入您的 MCP 伺服器。',
      ja: 'MCP のための認証：AI エージェントを MCP サーバーに安全にサインインさせる。',
      es: 'Autenticación para MCP: deja que los agentes de IA inicien sesión en tu servidor MCP.',
      de: 'Auth für MCP: KI-Agenten sicher an Ihrem MCP-Server anmelden.',
      fr: 'Authentification pour MCP : laissez les agents IA se connecter à votre serveur MCP.',
    },
    cta: {
      en: 'See how',
      'zh-Hant': '了解更多',
      ja: '詳しく見る',
      es: 'Descubre cómo',
      de: 'So funktioniert es',
      fr: 'Découvrir',
    },
  },
];

export interface ResolvedAnnouncement {
  id: string;
  text: string;
  cta: string;
  href: string;
}

/** Every announcement as it should render for `locale`, or [] when switched off. */
export function announcementsFor(locale: string): ResolvedAnnouncement[] {
  if (!enabled) return [];
  const loc = locale as Locale;
  return announcements.map((item) => ({
    id: item.id,
    text: item.text[loc] ?? item.text.en,
    cta: item.cta[loc] ?? item.cta.en,
    // Point at the reader's own language only where that page exists; otherwise
    // link straight to English instead of relying on a redirect.
    href: localizedPath(hasLocalizedPage(locale, item.href) ? locale : 'en', item.href),
  }));
}
