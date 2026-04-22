import { t as tFn } from '@/i18n';
import ToolHero from '@/components/tools/ToolHero';
import ToolWidget from '@/components/tools/ToolWidget';
import MoreDevTools from '@/components/tools/MoreDevTools';
import ToolFeatureCards from '@/components/tools/ToolFeatureCards';
import ToolHowItWorks from '@/components/tools/ToolHowItWorks';
import ToolReadyTo from '@/components/tools/ToolReadyTo';
import ToolFaq, { ToolFaqCard, ToolFaqCheckItem, ToolFaqBestPractices } from '@/components/tools/ToolFaq';
import ToolPopup from '@/components/tools/ToolPopup';

function UuidIcon1() {
  return (
    <div className="icon-w48 w-embed">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M19.9727 40.1553H26.3397" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19.9727 7.82812H26.3398" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23.1562 7.82812V40.1694" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.2706 34.7486H13.3323C9.87049 34.7486 7.06641 31.9444 7.06641 28.4826V19.5139C7.06641 16.0541 9.87049 13.25 13.3323 13.25H16.2706" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M29.4648 13.25H36.803C40.2628 13.25 43.0668 16.0541 43.0668 19.5159V22.1816" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M43.0668 28.4688C43.0668 31.9248 40.2394 34.7522 36.7814 34.7522H29.4648" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function UuidIcon2() {
  return (
    <div className="icon-w48 w-embed">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M6.46094 13.4922H12.2505M29.9552 13.4922H42.461" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.46094 34.5078H19.1682M37.2066 34.5078H42.461" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path fillRule="evenodd" clipRule="evenodd" d="M31.2981 28.5977C34.5635 28.5977 37.2067 31.2447 37.2067 34.5081C37.2067 37.7737 34.5635 40.4201 31.2981 40.4201C28.0325 40.4201 25.3867 37.7737 25.3867 34.5081C25.3867 31.2447 28.0325 28.5977 31.2981 28.5977Z" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path fillRule="evenodd" clipRule="evenodd" d="M18.1614 7.57812C21.427 7.57812 24.0736 10.2248 24.0736 13.4903C24.0736 16.7538 21.427 19.4005 18.1614 19.4005C14.8959 19.4005 12.25 16.754 12.25 13.4905C12.25 10.2249 14.8959 7.57812 18.1614 7.57812Z" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function UuidIcon3() {
  return (
    <div className="icon-w48 w-embed">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M34.7227 35.168L41.5705 42" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18.0234 22.8648L21.8278 26.6672L29.4304 19.0625" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M40.098 22.8342C40.098 32.1318 32.5614 39.6702 23.2638 39.6702C13.9662 39.6702 6.42969 32.1318 6.42969 22.8342C6.42969 13.5365 13.9662 6 23.2638 6C29.7896 6 35.4478 9.71278 38.2416 15.1413" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function UuidIcon4() {
  return (
    <div className="icon-w48 w-embed">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M15.818 40.34C9.976 37.23 6 31.08 6 24C6 13.782 14.282 5.5 24.5 5.5C34.718 5.5 43 13.782 43 24C43 34.218 34.718 42.5 24.5 42.5" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" />
        <path d="M31.3642 29.8834L23.8242 25.3854V15.6914" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

interface Props { locale: string }

export default function UuidV7Page({ locale }: Props) {
  const t = (key: string): string => tFn(locale, `Tools.uuidV7.${key}`);
  const policy = (
    <>
      {t('policyLine1')}
      <br />
      {t('policyLine2')}
    </>
  );
  const faq1Body = (
    <>
      {t('faq1BodyBefore')}
      <a href={t('faq1Href')} target="_blank" rel="noreferrer">
        {t('faq1LinkText')}
      </a>
      {t('faq1BodyAfter')}
    </>
  );
  return (
    <>
      <ToolHero title={t('heroTitle')} description={t('heroDescription')} />
      <ToolWidget
        locale={locale}
        src="https://authgear.github.io/authgear-widget-uuid-v7-generator/"
        iframeTitle={t('iframeTitle')}
        height="800px"
        policy={policy}
      />
      <MoreDevTools locale={locale} currentSlug="uuidv7-generator" />
      <ToolFeatureCards
        cards={[
          {
            icon: <UuidIcon1 />,
            title: t('card1Title'),
            description: t('card1Desc'),
          },
          {
            icon: <UuidIcon2 />,
            title: t('card2Title'),
            description: t('card2Desc'),
          },
          {
            icon: <UuidIcon3 />,
            title: t('card3Title'),
            description: t('card3Desc'),
          },
          {
            icon: <UuidIcon4 />,
            title: t('card4Title'),
            description: t('card4Desc'),
          },
        ]}
      />
      <ToolHowItWorks
        steps={[
          { step: t('s1Label'), title: t('s1Title'), items: [] },
          { step: t('s2Label'), title: t('s2Title'), items: [] },
          { step: t('s3Label'), title: t('s3Title'), items: [] },
          { step: t('s4Label'), title: t('s4Title'), items: [] },
          { step: t('s5Label'), title: t('s5Title'), items: [] },
          { step: t('s6Label'), title: t('s6Title'), items: [] },
        ]}
      />
      <ToolReadyTo locale={locale} />
      <ToolFaq>
        <div className="w-layout-vflex tools-faq">
          <ToolFaqCard icon="/images/tools-qa-what-is.svg" title={t('faq1Title')}>
            <div className="tools-faq-content">{faq1Body}</div>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-encryption.svg" title={t('faq2Title')}>
            <ToolFaqCheckItem>{t('faq2b1')}</ToolFaqCheckItem>
            <ToolFaqCheckItem>{t('faq2b2')}</ToolFaqCheckItem>
            <ToolFaqCheckItem>{t('faq2b3')}</ToolFaqCheckItem>
          </ToolFaqCard>
        </div>
        <ToolFaqBestPractices icon="/images/tools-qa-best-practice.svg" title={t('bpTitle')}>
          <div className="tools-faq-content">{t('bpBody')}</div>
        </ToolFaqBestPractices>
        <div className="w-layout-vflex tools-faq-1-grid">
          <div className="w-layout-hflex tools-faq-card">
            <div className="w-layout-hflex flex-block-78">
              <img src="/images/tools-uuid.svg" loading="lazy" alt="" className="image-93" />
              <div className="w-layout-hflex flex-block-79">
                <h2 className="tools-faq-title">{t('gridTitle')}</h2>
                <div className="tools-faq-content">{t('gridBody')}</div>
              </div>
            </div>
          </div>
        </div>
      </ToolFaq>
      <ToolPopup locale={locale} />
    </>
  );
}
