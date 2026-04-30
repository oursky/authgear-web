import { t as tFn } from "@/i18n";
import { localizedPath } from "@/lib/i18n";
import ToolHero from '@/components/tools/ToolHero';
import ToolWidget from '@/components/tools/ToolWidget';
import MoreDevTools from '@/components/tools/MoreDevTools';
import ToolFeatureCards from '@/components/tools/ToolFeatureCards';
import ToolHowItWorks from '@/components/tools/ToolHowItWorks';
import ToolReadyTo from '@/components/tools/ToolReadyTo';
import ToolFaq, { ToolFaqCard, ToolFaqCheckItem, ToolFaqBestPractices } from '@/components/tools/ToolFaq';
import ToolPopup from '@/components/tools/ToolPopup';

interface Props { locale: string }

export default function JwtDebuggerPage({ locale }: Props) {
  const t = (key: string): string => tFn(locale, `Tools.jwtJwe.${key}`);
  const policy = (
    <>
      {t('policyPrefix')}
      <a href={t('policyGithub')} target="_blank" rel="noreferrer">
        {t('policyGithub')}
      </a>
    </>
  );
  return (
    <>
      <ToolHero title={t('heroTitle')} description={t('heroDescription')} />
      <ToolWidget
        locale={locale}
        src="https://authgear.github.io/authgear-widget-jwt-debugger/"
        iframeTitle={t('iframeTitle')}
        height="800px"
        policy={policy}
      />
      <MoreDevTools locale={locale} currentSlug="jwt-jwe-debugger" />
      <ToolFeatureCards
        cards={[
          {
            icon: <img src="/images/tools-encode-jwt.svg" loading="lazy" alt="" />,
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
            icon: <img src="/images/tools-jwt-decryption.svg" loading="lazy" alt="" />,
            title: t('card4Title'),
            description: t('card4Desc'),
          },
        ]}
      />
      <ToolHowItWorks
        sectionTitle={t('howSectionTitle')}
        steps={[
          {
            step: t('s1Label'),
            title: t('s1Title'),
            items: [t('s1i1'), t('s1i2')],
          },
          { step: t('s2Label'), title: t('s2Title'), items: [t('s2i1')] },
          { step: t('s3Label'), title: t('s3Title'), items: [t('s3i1')] },
          {
            step: t('s4Label'),
            title: t('s4Title'),
            items: [
              <>
                {t('s4i1Part1')}
                <a href={t('s4GuideLink')}>{t('s4GuideLinkLabel')}</a>
                {t('s4i1Part2')}
              </>,
            ],
          },
          { step: t('s5Label'), title: t('s5Title'), items: [t('s5i1')] },
          { step: t('s6Label'), title: t('s6Title'), items: [t('s6i1')] },
        ]}
      />
      <ToolReadyTo locale={locale} />
      <ToolFaq>
        <div className="w-layout-vflex tools-faq">
          <ToolFaqCard
            icon="/images/tools-qa-what-is.svg"
            title={
              <>
                <a href={localizedPath(locale, "/post/jwt-authentication-a-secure-scalable-solution-for-modern-applications")}>
                  {t('faqJwtLinkText')}
                </a>{' '}
                {t('faqJwtTitleSuffix')}
              </>
            }
          >
            <div className="tools-faq-content">
              {t('faqJwtBodyP1')}
              <a href={t('faqJwtBodyLinkMidHref')}>{t('faqJwtBodyLinkMid')}</a>
              {t('faqJwtBodyP2')}
            </div>
            <ToolFaqCheckItem>{t('faqJwtBullet1')}</ToolFaqCheckItem>
            <ToolFaqCheckItem>{t('faqJwtBullet2')}</ToolFaqCheckItem>
            <ToolFaqCheckItem>{t('faqJwtBullet3')}</ToolFaqCheckItem>
            <div className="tools-faq-content">{t('faqJwtUseCases')}</div>
            <ToolFaqCheckItem>{t('faqJwtUse1')}</ToolFaqCheckItem>
            <ToolFaqCheckItem>{t('faqJwtUse2')}</ToolFaqCheckItem>
            <ToolFaqCheckItem>{t('faqJwtUse3')}</ToolFaqCheckItem>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-encryption.svg" title={t('faqJweTitle')}>
            <div className="tools-faq-content">{t('faqJweBody')}</div>
            <ToolFaqCheckItem>{t('faqJweB1')}</ToolFaqCheckItem>
            <ToolFaqCheckItem>{t('faqJweB2')}</ToolFaqCheckItem>
            <ToolFaqCheckItem>{t('faqJweB3')}</ToolFaqCheckItem>
            <ToolFaqCheckItem>{t('faqJweB4')}</ToolFaqCheckItem>
            <ToolFaqCheckItem>{t('faqJweB5')}</ToolFaqCheckItem>
            <div className="tools-faq-content">{t('faqJweUseCases')}</div>
            <ToolFaqCheckItem>{t('faqJweUse1')}</ToolFaqCheckItem>
            <ToolFaqCheckItem>{t('faqJweUse2')}</ToolFaqCheckItem>
            <ToolFaqCheckItem>{t('faqJweUse3')}</ToolFaqCheckItem>
          </ToolFaqCard>
        </div>
        <ToolFaqBestPractices icon="/images/tools-qa-best-practice.svg" title={t('dbgBpTitle')}>
          <ToolFaqCheckItem>{t('dbgBp1')}</ToolFaqCheckItem>
          <ToolFaqCheckItem>{t('dbgBp2')}</ToolFaqCheckItem>
          <ToolFaqCheckItem>{t('dbgBp3')}</ToolFaqCheckItem>
        </ToolFaqBestPractices>
      </ToolFaq>
      <ToolPopup locale={locale} />
    </>
  );
}
