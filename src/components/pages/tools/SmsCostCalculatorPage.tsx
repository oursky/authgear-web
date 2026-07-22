import ToolHero from '@/components/tools/ToolHero';
import ToolWidget from '@/components/tools/ToolWidget';
import MoreDevTools from '@/components/tools/MoreDevTools';
import ToolFeatureCards from '@/components/tools/ToolFeatureCards';
import ToolHowItWorks from '@/components/tools/ToolHowItWorks';
import ToolReadyTo from '@/components/tools/ToolReadyTo';
import ToolFaq, { ToolFaqCard } from '@/components/tools/ToolFaq';
import ToolPopup from '@/components/tools/ToolPopup';
import SmsCostWidget from '@/components/widgets/sms-cost';
import { PROVIDERS, RATES_AS_OF, SMS_COST_DATA } from '@/components/widgets/sms-cost/data';
import { t as tFn } from '@/i18n';
import './SmsCostCalculatorPage.css';

interface Props { locale: string }

function fmtRate(n: number): string {
  return `$${n.toFixed(4)}`;
}

export default function SmsCostCalculatorPage({ locale }: Props) {
  const t = (key: string): string => tFn(locale, `Tools.smsCost.${key}`);
  const interpolate = (key: string, vars: Record<string, string | number>): string =>
    t(key).replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));

  return (
    <>
      <ToolHero title={t('heroTitle')} description={t('heroDescription')} />
      <ToolWidget locale={locale} iframeTitle={t('iframeTitle')} policy={t('policy')}>
        <SmsCostWidget locale={locale} />
      </ToolWidget>

      <section className="sms-comp-section">
        <h2>{t('compTitle')}</h2>
        <p className="sms-comp-intro">{t('compIntro')}</p>
        <div className="sms-comp-table-wrap">
          <table className="sms-comp-table">
            <thead>
              <tr>
                <th>{t('compColCountry')}</th>
                {PROVIDERS.map((p) => (
                  <th key={p.id}>{p.label}</th>
                ))}
                <th>{t('compColWhatsapp')}</th>
              </tr>
            </thead>
            <tbody>
              {SMS_COST_DATA.map((row) => (
                <tr key={row.iso}>
                  <td>{row.country}</td>
                  {PROVIDERS.map((p) => (
                    <td key={p.id}>{fmtRate(row.providers[p.id])}</td>
                  ))}
                  <td className="sms-comp-wa">{fmtRate(row.whatsapp_price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="sms-comp-note">{interpolate('compNote', { date: RATES_AS_OF })}</p>
      </section>

      <MoreDevTools locale={locale} currentSlug="sms-cost-calculator" />

      <ToolFeatureCards
        cards={[
          { title: t('card1Title'), description: t('card1Desc') },
          { title: t('card2Title'), description: t('card2Desc') },
          { title: t('card3Title'), description: t('card3Desc') },
        ]}
      />

      <ToolHowItWorks
        steps={[
          { step: t('step1Label'), title: t('step1Title'), items: [t('step1Item1')] },
          { step: t('step2Label'), title: t('step2Title'), items: [t('step2Item1')] },
          { step: t('step3Label'), title: t('step3Title'), items: [t('step3Item1')] },
        ]}
      />

      <ToolReadyTo locale={locale} />

      <ToolFaq>
        <div className="w-layout-vflex tools-faq">
          {[1, 2, 3, 4, 5].map((n) => (
            <ToolFaqCard key={n} icon="/images/tools-qa-what-is.svg" title={t(`faq${n}Title`)}>
              <div className="tools-faq-content" style={{ whiteSpace: 'pre-line' }}>
                {t(`faq${n}Body`)}
              </div>
            </ToolFaqCard>
          ))}
        </div>
      </ToolFaq>

      <ToolPopup locale={locale} />
    </>
  );
}
