import { t as tFn } from '@/i18n';
import { localizedPath } from '@/lib/i18n';
import ToolHero from '@/components/tools/ToolHero';
import ToolWidget from '@/components/tools/ToolWidget';
import MoreDevTools from '@/components/tools/MoreDevTools';
import ToolHowItWorks from '@/components/tools/ToolHowItWorks';
import ToolReadyTo from '@/components/tools/ToolReadyTo';
import ToolFaq, { ToolFaqCard, ToolFaqCheckItem } from '@/components/tools/ToolFaq';
import ToolPopup from '@/components/tools/ToolPopup';
import PasskeyDemoWidget from '@/components/widgets/passkey-demo';

interface Props {
  locale: string;
}

function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));
}

export default function PasskeyDemoPage({ locale }: Props) {
  const t = (key: string): string => tFn(locale, `Tools.passkeyDemo.${key}`);
  const tCommon = (key: string, vars?: Record<string, string | number>): string => {
    const s = tFn(locale, `Tools.common.${key}`);
    return vars ? interpolate(s, vars) : s;
  };
  const policy = (
    <>
      {t('policyPrefix')}
      <a href={t('policyLink')} target="_blank" rel="noreferrer">
        {t('policyLink')}
      </a>
    </>
  );
  const steps = [1, 2, 3, 4, 5].map((n) => ({
    step: tCommon('stepLabel', { n }),
    title: t(`step${n}Title`),
    body: t(`step${n}Body`),
  }));
  const platforms = [1, 2, 3, 4, 5].map((n) => ({
    name: t(`plat${n}Name`),
    desc: t(`plat${n}Desc`),
  }));
  return (
    <>
      <ToolHero title={t('heroTitle')} description={t('heroDescription')} />
      <ToolWidget locale={locale} iframeTitle={t('iframeTitle')} policy={policy}>
        <PasskeyDemoWidget />
      </ToolWidget>
      <MoreDevTools locale={locale} currentSlug="passkey-demo" />
      <ToolHowItWorks
        sectionTitle={t('howSectionTitle')}
        steps={steps}
        containerClass="tools-step horizon-step"
        afterSteps={
          <p className="tools-description align-left">
            {t('howGuideText')}{' '}
            <a href={localizedPath(locale, t('howGuideHref'))}>{t('howGuideLinkText')}</a>
          </p>
        }
      />
      <section>
        <div className="container-default">
          <div className="container-default-inner px-0 gap-0 pb-0 horizon-container">
            <div className="top-content feature-flex">
              <h2 className="title features-page-v2 margin-bottom-16 align-left">{t('platformsTitle')}</h2>
              <p className="tools-description align-left">{t('platformsIntro')}</p>
            </div>
            <div className="w-layout-hflex flex-block-80">
              {platforms.map(({ name, desc }) => (
                <div key={name} className="w-layout-vflex algorithms-card">
                  <img src="/images/tools-hmac-supported.svg" loading="lazy" alt="" />
                  <div>{name}</div>
                  <div className="algorithms-description">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <ToolReadyTo
        locale={locale}
        title={t('readyTitle')}
        subtitle={t('readySubtitle')}
        href={localizedPath(locale, '/features/passkeys')}
        ctaLabel={t('readyCta')}
      />
      <ToolFaq>
        <div className="w-layout-vflex tools-faq">
          <ToolFaqCard icon="/images/tools-qa-what-is.svg" title={t('faqWebauthnTitle')}>
            <div className="tools-faq-content">
              {t('faqWebauthnBody')}{' '}
              <a href={localizedPath(locale, t('faqWebauthnLinkHref'))}>{t('faqWebauthnLinkText')}</a>
            </div>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-encryption.svg" title={t('faqSafeTitle')}>
            <div className="tools-faq-content">{t('faqSafeBody')}</div>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-best-practice.svg" title={t('faqDeleteTitle')}>
            <div className="tools-faq-content">{t('faqDeleteIntro')}</div>
            <ToolFaqCheckItem>{t('faqDeleteIos')}</ToolFaqCheckItem>
            <ToolFaqCheckItem>{t('faqDeleteAndroid')}</ToolFaqCheckItem>
            <ToolFaqCheckItem>{t('faqDeleteWindows')}</ToolFaqCheckItem>
            <ToolFaqCheckItem>{t('faqDeleteManagers')}</ToolFaqCheckItem>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-what-is.svg" title={t('faqAaguidTitle')}>
            <div className="tools-faq-content">{t('faqAaguidBody')}</div>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-encryption.svg" title={t('faqSignCountTitle')}>
            <div className="tools-faq-content">{t('faqSignCountBody')}</div>
          </ToolFaqCard>
        </div>
      </ToolFaq>
      <ToolPopup locale={locale} />
    </>
  );
}
