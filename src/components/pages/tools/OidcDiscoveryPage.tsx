import { t as tFn } from '@/i18n';
import ToolHero from '@/components/tools/ToolHero';
import ToolWidget from '@/components/tools/ToolWidget';
import MoreDevTools from '@/components/tools/MoreDevTools';
import ToolFeatureCards from '@/components/tools/ToolFeatureCards';
import ToolHowItWorks from '@/components/tools/ToolHowItWorks';
import ToolReadyTo from '@/components/tools/ToolReadyTo';
import ToolFaq, { ToolFaqCard } from '@/components/tools/ToolFaq';
import ToolPopup from '@/components/tools/ToolPopup';

function OidcIcon1() {
  return (
    <div className="icon-w48">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M29.5874 31.3508C28.9512 31.9248 28.5872 32.7402 28.5872 33.5964V37.5038C28.5872 38.7414 27.8342 39.8526 26.6842 40.3118L22.9868 41.783C21.002 42.573 18.8458 41.1116 18.8458 38.975V32.6408C18.8458 31.841 18.5286 31.0724 17.9604 30.5042L9.38458 22.8684C7.99518 21.4808 7.21484 19.5972 7.21484 17.6317V13.6036C7.21484 10.6925 9.57528 8.33203 12.4884 8.33203" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M36.4331 8.33203C39.3443 8.33203 41.7047 10.6925 41.7047 13.6036V16.2832C41.7047 18.3809 40.8153 20.3814 39.2585 21.7844L34.4219 26.5676" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24.4584 17.8489V6M29.0618 13.2308L24.4616 17.8505L19.8633 13.2308" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function OidcIcon2() {
  return (
    <div className="icon-w48">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M16.5 23.9883H40.5014" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28.5006 35.9883H40.5014M16.5 35.9883H22.5004" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.5 11.9883H28.5006M34.501 11.9883H40.5014" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.52069 11.9628V12.0907M9.03921 11.9903C9.03921 12.2783 8.80553 12.5118 8.51749 12.5118C8.22947 12.5118 7.99609 12.2783 7.99609 11.9903C7.99609 11.7022 8.22947 11.4688 8.51749 11.4688C8.80553 11.4688 9.03921 11.7022 9.03921 11.9903Z" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.52069 24.2245V24.3525M9.03921 24.2521C9.03921 24.5401 8.80553 24.7737 8.51749 24.7737C8.22947 24.7737 7.99609 24.5401 7.99609 24.2521C7.99609 23.9641 8.22947 23.7305 8.51749 23.7305C8.80553 23.7305 9.03921 23.9641 9.03921 24.2521Z" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.52069 35.9627V36.0908M9.03921 35.9902C9.03921 36.2784 8.80553 36.5117 8.51749 36.5117C8.22947 36.5117 7.99609 36.2784 7.99609 35.9902C7.99609 35.7022 8.22947 35.4688 8.51749 35.4688C8.80553 35.4688 9.03921 35.7022 9.03921 35.9902Z" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function OidcIcon3() {
  return (
    <div className="icon-w48">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M14.2139 17.5703L6.5 23.9978L14.2139 30.4274" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M34.7852 17.5703L42.499 23.9978L34.7852 30.4274" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24.4986 24L19.3555 38.1434" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M29.6419 9.85938L27.0703 16.9311" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

interface Props { locale: string }

export default function OidcDiscoveryPage({ locale }: Props) {
  const t = (key: string): string => tFn(locale, `Tools.oidc.${key}`);
  const policy = (
    <>
      {t('policyLine1')}
      <br />
      {t('policyLine2')}
    </>
  );
  return (
    <>
      <ToolHero title={t('heroTitle')} description={t('heroDescription')} />
      <ToolWidget
        locale={locale}
        src="https://authgear.github.io/discovery-endpoint-explorer/"
        iframeTitle={t('iframeTitle')}
        height="800px"
        policy={policy}
      />
      <MoreDevTools locale={locale} currentSlug="oidc-discovery-endpoint" />
      <ToolFeatureCards
        gridClass="_3-card-grid"
        cards={[
          {
            icon: <OidcIcon1 />,
            title: t('card1Title'),
            description: t('card1Desc'),
          },
          {
            icon: <OidcIcon2 />,
            title: t('card2Title'),
            description: t('card2Desc'),
          },
          {
            icon: <OidcIcon3 />,
            title: t('card3Title'),
            description: t('card3Desc'),
          },
        ]}
      />
      <ToolHowItWorks
        steps={[
          { step: t('s1Label'), title: t('s1Title'), items: [] },
          { step: t('s2Label'), title: t('s2Title'), items: [] },
          { step: t('s3Label'), title: t('s3Title'), items: [] },
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
          <ToolFaqCard icon="/images/tools-qa-encryption.svg" title={t('faq3Title')}>
            <div className="tools-faq-content" style={{ whiteSpace: 'pre-line' }}>
              {t('faq3Body')}
            </div>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-encryption.svg" title={t('faq4Title')}>
            <div className="tools-faq-content">{t('faq4Body')}</div>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-encryption.svg" title={t('faq5Title')}>
            <div className="tools-faq-content">{t('faq5Body')}</div>
          </ToolFaqCard>
        </div>
      </ToolFaq>
      <ToolPopup locale={locale} />
    </>
  );
}
