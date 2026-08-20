import { t as tFn } from '@/i18n';
import ToolHero from '@/components/tools/ToolHero';
import ToolWidget from '@/components/tools/ToolWidget';
import MoreDevTools from '@/components/tools/MoreDevTools';
import ToolHowItWorks from '@/components/tools/ToolHowItWorks';
import ToolReadyTo from '@/components/tools/ToolReadyTo';
import ToolFaq, { ToolFaqCard, ToolFaqCheckItem } from '@/components/tools/ToolFaq';
import ToolPopup from '@/components/tools/ToolPopup';

interface Props { locale: string }

export default function TotpPage({ locale }: Props) {
  const t = (key: string): string => tFn(locale, `Tools.totp.${key}`);
  const tCommon = (key: string): string => tFn(locale, `Tools.common.${key}`);
  const heroDescription = (
    <>
      {t('heroDescriptionBeforeLink')}
      <a href={t('heroRfcHref')} target="_blank" rel="noreferrer">
        {t('heroRfcLink')}
      </a>
      .
    </>
  );
  const policy = (
    <>
      {t('policyLine1')}
      <br />
      {t('policyLine2')}
    </>
  );
  return (
    <>
      <ToolHero title={t('heroTitle')} description={heroDescription} />
      <ToolWidget
        locale={locale}
        src="https://totp-mini-tool-authgear.vercel.app/"
        iframeTitle={t('iframeTitle')}
        height="600px"
        iframeStyle={{ borderRadius: '16px', border: '1px solid #DBDBDB', width: '100%', height: '600px', minHeight: '600px' }}
        policy={policy}
      />
      <MoreDevTools locale={locale} currentSlug="totp-authenticator" />
      <ToolHowItWorks
        containerClass="tools-step-totp horizon-step"
        steps={[
          { step: t('s1Label'), title: t('s1Title'), body: t('s1Body') },
          { step: t('s2Label'), title: t('s2Title'), body: t('s2BodyBefore') },
          { step: t('s3Label'), title: t('s3Title'), body: t('s3Body') },
          { step: t('s4Label'), title: t('s4Title'), body: t('s4Body') },
        ]}
        afterSteps={
          <div className="tools-policy">
            <p className="paragraph-18" style={{ whiteSpace: 'pre-line' }}>
              <span className="text-span-43">{t('cautionLead')}</span> {t('cautionBody')}
            </p>
          </div>
        }
      />
      <ToolReadyTo locale={locale} title={t('readyTitle')} subtitle={t('readySubtitle')} />
      <ToolHowItWorks
        sectionTitle={t('troubleshootTitle')}
        steps={[
          { title: t('tr1Title'), items: [t('tr1Item')] },
          { title: t('tr2Title'), items: [t('tr2Item')] },
          { title: t('tr3Title'), items: [t('tr3Item')] },
          { title: t('tr4Title'), items: [t('tr4Item')] },
        ]}
      />
      <ToolFaq>
        <div className="container-default-inner px-0 gap-0">
          <h2 className="title features-page-v2">{tCommon('faqHeading')}</h2>
        </div>
        <div className="w-layout-vflex tools-faq">
          <ToolFaqCard icon="/images/tools-qa-what-is.svg" title={t('faq1Title')}>
            <div className="tools-faq-content">{t('faq1Body')}</div>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-encryption.svg" title={t('faq2Title')}>
            <ToolFaqCheckItem>{t('faq2b1')}</ToolFaqCheckItem>
            <ToolFaqCheckItem>{t('faq2b2')}</ToolFaqCheckItem>
            <ToolFaqCheckItem>{t('faq2b3')}</ToolFaqCheckItem>
          </ToolFaqCard>
          <ToolFaqCard title={t('faq3Title')}>
            <div className="tools-faq-content">{t('faq3Body')}</div>
          </ToolFaqCard>
          <ToolFaqCard title={t('faq4Title')}>
            <div className="tools-faq-content">{t('faq4Body')}</div>
          </ToolFaqCard>
          <ToolFaqCard title={t('faq5Title')}>
            <div className="tools-faq-content">{t('faq5Body')}</div>
          </ToolFaqCard>
          <ToolFaqCard title={t('faq6Title')}>
            <div className="tools-faq-content">
              {t('faq6Body')}
            </div>
          </ToolFaqCard>
        </div>
      </ToolFaq>
      <ToolPopup locale={locale} tool="totp-authenticator" />
    </>
  );
}
