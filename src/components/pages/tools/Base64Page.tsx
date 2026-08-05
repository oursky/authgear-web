import ToolHero from '@/components/tools/ToolHero';
import ToolWidget from '@/components/tools/ToolWidget';
import MoreDevTools from '@/components/tools/MoreDevTools';
import ToolFeatureCards from '@/components/tools/ToolFeatureCards';
import ToolHowItWorks from '@/components/tools/ToolHowItWorks';
import ToolReadyTo from '@/components/tools/ToolReadyTo';
import ToolFaq, { ToolFaqCard } from '@/components/tools/ToolFaq';
import ToolPopup from '@/components/tools/ToolPopup';
import Base64Widget from '@/components/widgets/base64';
import { t as tFn } from '@/i18n';
import { localizedPath } from '@/lib/i18n';

interface Props { locale: string }

export default function Base64Page({ locale }: Props) {
  const t = (key: string): string => tFn(locale, `Tools.base64.${key}`);
  return (
    <>
      <ToolHero title={t('heroTitle')} description={t('heroDescription')} />
      <ToolWidget locale={locale} iframeTitle={t('iframeTitle')} policy={t('policy')}>
        <Base64Widget locale={locale} />
      </ToolWidget>
      <MoreDevTools locale={locale} currentSlug="base64-decode-encode" />
      <ToolFeatureCards
        cards={[
          {
            icon: <img src="/images/tools-base64-simple.svg" loading="lazy" alt="" />,
            title: t('card1Title'),
            description: t('card1Desc'),
          },
          {
            icon: <img src="/images/tool-verify-jwt.svg" loading="lazy" alt="" />,
            title: t('card2Title'),
            description: t('card2Desc'),
          },
          {
            icon: <img src="/images/tools-jwt-encryption.svg" loading="lazy" alt="" />,
            title: t('card3Title'),
            description: t('card3Desc'),
          },
          {
            icon: <img src="/images/tools-hmac-supported.svg" loading="lazy" alt="" />,
            title: t('card4Title'),
            description: t('card4Desc'),
          },
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
          <ToolFaqCard icon="/images/tools-qa-what-is.svg" title={t('faqWhatTitle')}>
            <div className="tools-faq-content" style={{ whiteSpace: 'pre-line' }}>
              {t('faqWhatBody')}
            </div>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-encryption.svg" title={t('faqUrlTitle')}>
            <div className="tools-faq-content" style={{ whiteSpace: 'pre-line' }}>
              {t('faqUrlBody')}
            </div>
            <div className="tools-faq-content">
              {t('faqGuidePart1')}
              <a href={localizedPath(locale, '/post/base64-encode-decode-guide')}>{t('faqGuideLinkLabel')}</a>
              {t('faqGuidePart2')}
            </div>
          </ToolFaqCard>
        </div>
      </ToolFaq>
      <ToolPopup locale={locale} />
    </>
  );
}
