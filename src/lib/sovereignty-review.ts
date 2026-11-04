import { localizedPath } from '@/lib/i18n';

/**
 * The "Book a sovereignty review" offer for the UK/EU campaign: a 30-minute
 * call booked through the regular /schedule-demo form, tagged with `?topic=`
 * so GTM (LinkedIn conversion), Netlify and the inbox can tell these requests
 * apart from other demo requests. ContactForm passes the topic through as is.
 */
export const SOVEREIGNTY_REVIEW_TOPIC = 'sovereignty-review';

/**
 * Review calls are in English and only the English /schedule-demo carries the
 * review copy, so every locale links to the English page.
 */
export const SOVEREIGNTY_REVIEW_URL = localizedPath(
  'en',
  `/schedule-demo?topic=${SOVEREIGNTY_REVIEW_TOPIC}`,
);

/**
 * The campaign markets. es is not one, and zh-Hant targets Taiwan with a
 * different offer, so both keep their generic demo links.
 */
const SOVEREIGNTY_REVIEW_LOCALES = new Set(['en', 'de', 'fr']);

export function offersSovereigntyReview(locale: string): boolean {
  return SOVEREIGNTY_REVIEW_LOCALES.has(locale);
}
