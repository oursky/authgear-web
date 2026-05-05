import { t as tFn } from '@/i18n';
import ToolHero from '@/components/tools/ToolHero';
import ToolWidget from '@/components/tools/ToolWidget';
import MoreDevTools from '@/components/tools/MoreDevTools';
import ToolFeatureCards from '@/components/tools/ToolFeatureCards';
import ToolHowItWorks from '@/components/tools/ToolHowItWorks';
import ToolReadyTo from '@/components/tools/ToolReadyTo';
import ToolFaq, { ToolFaqCard } from '@/components/tools/ToolFaq';
import ToolPopup from '@/components/tools/ToolPopup';
import PasswordHashWidget from '@/components/widgets/password-hash';

interface Props { locale: string }

export default function PasswordHashPage({ locale }: Props) {
  const t = (key: string): string => tFn(locale, `Tools.passwordHash.${key}`);
  const policy = (
    <>
      {t('policyPrefix')}
      <a href={t('policyGithub')} target="_blank" rel="noreferrer">
        {t('policyGithub')}
      </a>
    </>
  );
  const f5desc = (
    <>
      {t('f5DescBeforeLinks')}
      <br />
      {t('f5ReadMore')}
      <br />
      <a href={t('f5Link1Href')} target="_blank">
        {t('f5Link1')}
      </a>
      {'  •  '}
      <a href={t('f5Link2Href')} target="_blank">
        {t('f5Link2')}
      </a>
    </>
  );
  return (
    <>
      <ToolHero
        title={
          <>
            {t('heroLine1')}
            <br />
            {t('heroLine2')}
          </>
        }
        description={t('heroDescription')}
      />
      <ToolWidget locale={locale} iframeTitle={t('iframeTitle')} policy={policy}>
        <PasswordHashWidget />
      </ToolWidget>
      <MoreDevTools locale={locale} currentSlug="password-hash-generator" />
      <ToolFeatureCards
        sectionTitle={t('featureSectionTitle')}
        gridClass="_4-card-grid-tools hashing"
        cards={[
          { title: t('f1Title'), description: t('f1Desc') },
          { title: t('f2Title'), description: t('f2Desc') },
          { title: t('f3Title'), description: t('f3Desc') },
          { title: t('f4Title'), description: t('f4Desc') },
          { title: t('f5Title'), description: f5desc },
        ]}
      />
      <ToolHowItWorks
        sectionTitle={t('howSectionTitle')}
        steps={[
          { step: t('h1Label'), title: t('h1Title'), items: [t('h1i1')] },
          { step: t('h2Label'), title: t('h2Title'), items: [t('h2i1')] },
          {
            step: t('h3Label'),
            title: t('h3Title'),
            items: [t('h3i1'), t('h3i2'), t('h3i3'), t('h3i4')],
          },
          { step: t('h4Label'), title: t('h4Title'), items: [t('h4i1')] },
          { step: t('h5Label'), title: t('h5Title'), items: [t('h5i1')] },
        ]}
      />
      <ToolReadyTo locale={locale} />
      <ToolFaq>
        <div className="w-layout-vflex tools-faq">
          <ToolFaqCard icon="/images/tools-qa-what-is.svg" title={t('faq1Title')}>
            <div className="tools-faq-content">{t('faq1Body')}</div>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-encryption.svg" title={t('faq2Title')}>
            <div className="tools-faq-content">{t('faq2Body')}</div>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-best-practice.svg" title={t('faq3Title')}>
            <div className="tools-faq-content">{t('faq3Body')}</div>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-what-is.svg" title={t('faq4Title')}>
            <div className="tools-faq-content">{t('faq4Body')}</div>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-encryption.svg" title={t('faq5Title')}>
            <div className="tools-faq-content">{t('faq5Body')}</div>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-encryption.svg" title={t('faq6Title')}>
            <div className="tools-faq-content">{t('faq6Body')}</div>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-best-practice.svg" title={t('faq7Title')}>
            <div className="tools-faq-content">{t('faq7Body')}</div>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-what-is.svg" title={t('faq8Title')}>
            <div className="tools-faq-content">{t('faq8Body')}</div>
          </ToolFaqCard>
        </div>
      </ToolFaq>
      <ToolPopup locale={locale} />
    </>
  );
}
