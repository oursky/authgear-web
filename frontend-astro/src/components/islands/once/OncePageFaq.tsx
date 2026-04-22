import { PricingFaqItem } from '@/components/islands/pricing/PricingFaqItem';
import { t as tFn } from '@/i18n';

/** Split a rich-text string like "foo <tag>bar</tag> baz" into parts. */
function splitRich(str: string, tag: string): { before: string; inner: string; after: string } | null {
  const open = `<${tag}>`;
  const close = `</${tag}>`;
  const s = str.indexOf(open);
  if (s === -1) return null;
  const e = str.indexOf(close, s);
  if (e === -1) return null;
  return {
    before: str.slice(0, s),
    inner: str.slice(s + open.length, e),
    after: str.slice(e + close.length),
  };
}

interface Props { locale: string }
export default function OncePageFaq({ locale }: Props) {
  const t = (key: string): string => tFn(locale, `Once.${key}`);

  const faq3AStr = t('faq3A');
  const faq3AParts = splitRich(faq3AStr, 'email');
  const faq3ANode = faq3AParts ? (
    <p>
      {faq3AParts.before}
      <a href="mailto:once@authgear.com" className="link-6">
        {faq3AParts.inner}
      </a>
      {faq3AParts.after}
    </p>
  ) : (
    <p>{faq3AStr}</p>
  );

  const faq4AStr = t('faq4A');
  const faq4AParts = splitRich(faq4AStr, 'docs');
  const faq4ANode = faq4AParts ? (
    <p>
      {faq4AParts.before}
      <a
        href="https://docs.authgear.com/how-to-guide/migration"
        target="_blank"
        rel="noopener noreferrer"
        className="link-7"
      >
        {faq4AParts.inner}
      </a>
      {faq4AParts.after}
    </p>
  ) : (
    <p>{faq4AStr}</p>
  );

  return (
    <section className="ds-pricing-faq-section" aria-labelledby="once-faq-heading">
      <div className="ds-pricing-faq">
        <h2 id="once-faq-heading" className="ds-pricing-faq__heading">
          {t('faqHeading')}
        </h2>
        <div className="ds-pricing-faq__list">
          <PricingFaqItem question={t('faq1Q')} answer={t('faq1A')} />
          <PricingFaqItem question={t('faq2Q')} answer={t('faq2A')} />
          <PricingFaqItem question={t('faq3Q')} answer={faq3ANode} />
          <PricingFaqItem question={t('faq4Q')} answer={faq4ANode} />
          <PricingFaqItem question={t('faq5Q')} answer={t('faq5A')} />
          <PricingFaqItem question={t('faq6Q')} answer={t('faq6A')} />
        </div>
      </div>
    </section>
  );
}
