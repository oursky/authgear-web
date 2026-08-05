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

export default function JwkGeneratorPage({ locale }: Props) {
  const t = (key: string): string => tFn(locale, `Tools.jwk.${key}`);
  const policy = (
    <>
      {t('policyLine1')}{' '}
      <a href={localizedPath(locale, "/post/what-is-jwks")}>{t('policyLearnMore')}</a> <br />
      {t('policyLine2')}{' '}
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
        src="https://authgear.github.io/authgear-widget-jwk-generator/"
        iframeTitle={t('iframeTitle')}
        height="800px"
        policy={policy}
      />
      <MoreDevTools locale={locale} currentSlug="jwk-generator" />
      <ToolFeatureCards
        gridClass="_3-card-grid"
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
        ]}
      />
      <ToolHowItWorks
        sectionTitle={t('howSectionTitle')}
        steps={[
          {
            step: t('s1Label'),
            title: t('s1Title'),
            items: [t('s1i1'), t('s1i2'), t('s1i3')],
          },
          {
            step: t('s2Label'),
            title: t('s2Title'),
            items: [t('s2i1'), t('s2i2'), t('s2i3'), t('s2i4'), t('s2i5a'), t('s2i5b')],
          },
          {
            step: t('s3Label'),
            title: t('s3Title'),
            items: [t('s3i1'), t('s3i2'), t('s3i3')],
          },
        ]}
      />
      <ToolReadyTo locale={locale} />
      <ToolFaq>
        <div className="w-layout-vflex tools-faq">
          <ToolFaqCard
            icon="/images/tools-qa-what-is.svg"
            title={
              <>
                <a href={localizedPath(locale, "/post/what-is-jwks")}>{t('faqJwkLinkText')}</a> {t('faqJwkTitleSuffix')}
              </>
            }
          >
            <div className="tools-faq-content">{t('faqJwkBody')}</div>
            <ToolFaqCheckItem>{t('faqJwkBullet1')}</ToolFaqCheckItem>
            <ToolFaqCheckItem>{t('faqJwkBullet2')}</ToolFaqCheckItem>
            <ToolFaqCheckItem>{t('faqJwkBullet3')}</ToolFaqCheckItem>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-encryption.svg" title={t('faqPemTitle')}>
            <div className="tools-faq-content">{t('faqPemBody')}</div>
            <div className="tools-faq-content">
              {t('faqPemBase64Part1')}
              <a href={localizedPath(locale, '/tools/base64-decode-encode')}>{t('faqPemBase64LinkLabel')}</a>
              {t('faqPemBase64Part2')}
            </div>
          </ToolFaqCard>
        </div>
        <ToolFaqBestPractices icon="/images/tools-qa-best-practice.svg" title={t('bestPracticesTitle')}>
          <ToolFaqCheckItem>{t('bp1')}</ToolFaqCheckItem>
          <ToolFaqCheckItem>{t('bp2')}</ToolFaqCheckItem>
          <ToolFaqCheckItem>{t('bp3')}</ToolFaqCheckItem>
          <ToolFaqCheckItem>{t('bp4')}</ToolFaqCheckItem>
        </ToolFaqBestPractices>
      </ToolFaq>
      <ToolPopup locale={locale} />
    </>
  );
}
