import { t as tFn } from '@/i18n';
import ToolHero from '@/components/tools/ToolHero';
import ToolWidget from '@/components/tools/ToolWidget';
import MoreDevTools from '@/components/tools/MoreDevTools';
import ToolFeatureCards from '@/components/tools/ToolFeatureCards';
import ToolHowItWorks from '@/components/tools/ToolHowItWorks';
import ToolReadyTo from '@/components/tools/ToolReadyTo';
import ToolFaq, { ToolFaqCard } from '@/components/tools/ToolFaq';
import ToolPopup from '@/components/tools/ToolPopup';

function SslIcon1() {
  return (
    <div className="icon-w48">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24.4961 42.6484H32.9301C38.8281 42.6484 42.4961 38.4864 42.4961 32.5964V16.7024C42.4961 10.8124 38.8281 6.64844 32.9321 6.64844H16.062C10.184 6.64844 6.49609 10.8124 6.49609 16.7024V32.5964C6.49609 38.4864 10.166 42.6484 16.062 42.6484H17.2233" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M35.3213 34.2288H31.8555V25.7188" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M25.9877 25.7344H24.5497C23.3777 25.7344 22.4297 26.6822 22.4297 27.8522C22.4297 29.0222 23.3777 29.9704 24.5497 29.9704H24.8477C26.0177 29.9704 26.9657 30.9204 26.9657 32.0884C26.9657 33.2604 26.0177 34.2084 24.8477 34.2084H23.3497" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17.099 25.7344H15.6609C14.4909 25.7344 13.543 26.6822 13.543 27.8522C13.543 29.0222 14.4909 29.9704 15.6609 29.9704H15.959C17.131 29.9704 18.079 30.9204 18.079 32.0884C18.079 33.2604 17.131 34.2084 15.959 34.2084H14.4629" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M35.2367 19.625H6.50391" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.208 13.7422H13.082M18.1801 13.7422H18.0541M23.1522 13.7422H23.026" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function SslIcon2() {
  return (
    <div className="icon-w48">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M42 30.1888C42 35.7192 38.3104 40.2144 32.8366 40.2008H15.1635C9.68952 40.2144 6 35.7192 6 30.1888V17.8263C6 12.3018 9.68952 7.80078 15.1635 7.80078H32.8366C38.3104 7.80078 42 12.3018 42 17.8263V30.1888Z" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.3828 26.0156H18.7828M13.3828 31.765H25.9828" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path fillRule="evenodd" clipRule="evenodd" d="M33.503 21.633H28.533C27.9162 21.633 27.418 21.133 27.418 20.518V16.4529C27.418 15.8361 27.9162 15.3379 28.533 15.3379H33.503C34.1178 15.3379 34.618 15.8361 34.618 16.4529V20.518C34.618 21.133 34.1178 21.633 33.503 21.633Z" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function SslIcon3() {
  return (
    <div className="icon-w48">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M13.6368 29.1445L9.98688 30.9007C8.13598 31.7631 8.03784 34.3751 9.81878 35.3755L20.3124 41.2711C22.8324 42.6871 25.9012 42.6871 28.4212 41.2711" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" />
        <path d="M35.3473 29.0039L38.9705 30.8463C40.7639 31.7491 40.8215 34.3045 39.0707 35.2883L33.7461 38.2797" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" />
        <path d="M35.2074 20.1788L38.4874 21.9532L39.2884 22.4032C40.9946 23.3618 40.9946 25.8332 39.2884 26.7918L28.4224 32.8966C25.9024 34.3124 22.8336 34.3124 20.3136 32.8966L9.44763 26.7918C7.74141 25.8332 7.74141 23.3618 9.44763 22.4032L10.2485 21.9532L13.4408 20.125" stroke="#0043E0" strokeWidth="3" />
        <path d="M28.4224 7.39782C25.9024 5.98198 22.8336 5.98198 20.3136 7.3978L9.44763 13.5026C7.74141 14.4612 7.74141 16.9326 9.44763 17.8912L20.3136 23.996C22.8336 25.4118 25.9024 25.4118 28.4224 23.996L39.2884 17.8912C40.9946 16.9326 40.9946 14.4612 39.2884 13.5026L33.8554 10.4502" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

interface Props { locale: string }

export default function SslCheckerPage({ locale }: Props) {
  const t = (key: string): string => tFn(locale, `Tools.ssl.${key}`);
  return (
    <>
      <ToolHero title={t('heroTitle')} description={t('heroDescription')} />
      <ToolWidget
        locale={locale}
        src="https://authgear-widget-ssl-cert-inspector.vercel.app/"
        iframeTitle={t('iframeTitle')}
        height="800px"
        iframeId="ssl-checker-iframe"
      />
      <MoreDevTools locale={locale} currentSlug="ssl-checker" />
      <ToolFeatureCards
        gridClass="_3-card-grid"
        cards={[
          {
            icon: <SslIcon1 />,
            title: t('card1Title'),
            description: t('card1Desc'),
          },
          {
            icon: <SslIcon2 />,
            title: t('card2Title'),
            description: t('card2Desc'),
          },
          {
            icon: <SslIcon3 />,
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
      <ToolReadyTo locale={locale} title={t('readyTitle')} subtitle={t('readySubtitle')} />
      <ToolFaq>
        <div className="w-layout-vflex tools-faq">
          <ToolFaqCard icon="/images/tools-qa-what-is.svg" title={t('faq1Title')}>
            <div className="tools-faq-content" style={{ whiteSpace: 'pre-line' }}>
              {t('faq1Body')}
            </div>
            <div className="tools-faq-content" style={{ whiteSpace: 'pre-line' }}>
              {t('faq1MetaBody')}
            </div>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-encryption.svg" title={t('faq2Title')}>
            <div className="tools-faq-content" style={{ whiteSpace: 'pre-line' }}>
              {t('faq2Body')}
            </div>
            <div className="tools-faq-content">
              {t('faq2LearnMoreBefore')}
              <a href={t('faq2LearnMoreHref')}>{t('faq2LearnMoreLinkText')}</a>
            </div>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-encryption.svg" title={t('faq3Title')}>
            <div className="tools-faq-content" style={{ whiteSpace: 'pre-line' }}>
              {t('faq3Body')}
            </div>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-encryption.svg" title={t('faq4Title')}>
            <div className="tools-faq-content">{t('faq4Body')}</div>
            <div className="tools-faq-content">{t('faq4Body2')}</div>
          </ToolFaqCard>
        </div>
      </ToolFaq>
      <ToolPopup locale={locale} tool="ssl-checker" />
    </>
  );
}
