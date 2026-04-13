'use client';

import { useTranslations } from 'next-intl';
import ToolHero from '@/components/tools/ToolHero';
import ToolWidget from '@/components/tools/ToolWidget';
import MoreDevTools from '@/components/tools/MoreDevTools';
import ToolReadyTo from '@/components/tools/ToolReadyTo';
import ToolFaq, { ToolFaqCard, ToolFaqCheckItem, ToolFaqBestPractices } from '@/components/tools/ToolFaq';
import ToolPopup from '@/components/tools/ToolPopup';

export default function HmacPage(_props: { locale: string }) {
  const t = useTranslations('Tools.hmac');
  const tCommon = useTranslations('Tools.common');
  const policy = (
    <>
      {t('policyPrefix')}
      <a href={t('policyLink')} target="_blank" rel="noreferrer">
        {t('policyLink')}
      </a>
    </>
  );
  const steps = [
    { title: t('step1Title'), body: t('step1Body') },
    { title: t('step2Title'), body: t('step2Body') },
    { title: t('step3Title'), body: t('step3Body') },
    { title: t('step4Title'), body: t('step4Body') },
    { title: t('step5Title'), body: t('step5Body') },
  ];
  return (
    <>
      <ToolHero title={t('heroTitle')} description={t('heroDescription')} />
      <ToolWidget
        src="https://authgear.github.io/authgear-widget-hmac-tool/"
        iframeTitle={t('iframeTitle')}
        height="800px"
        policy={policy}
      />
      <MoreDevTools currentSlug="hmac-signature-generator-verifier" />
      <section>
        <div className="container-default">
          <div className="container-default-inner px-0 gap-0 pb-0">
            <div className="top-content feature-flex">
              <h2 className="title features-page-v2">{t('howSectionTitle')}</h2>
            </div>
            <div className="tools-step horizon-step">
              {steps.map(({ title, body }, i) => (
                <div key={i} className="w-layout-vflex tools-step-card">
                  <div className="tools-step-step">{tCommon('stepLabel', { n: i + 1 })}</div>
                  <div className="tools-step-title">{title}</div>
                  <div className="text-block-84">{body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="container-default">
          <div className="container-default-inner px-0 gap-0 pb-0 horizon-container">
            <div className="top-content feature-flex">
              <h2 className="title features-page-v2 margin-bottom-16 align-left">{t('supportedAlgorithmsTitle')}</h2>
              <p className="tools-description align-left">{t('supportedAlgorithmsIntro')}</p>
            </div>
            <div className="w-layout-hflex flex-block-80">
              {[
                { alg: 'HS256', desc: t('algHs256') },
                { alg: 'HS384', desc: t('algHs384') },
                { alg: 'HS512', desc: t('algHs512') },
              ].map(({ alg, desc }) => (
                <div key={alg} className="w-layout-vflex algorithms-card">
                  <img src="/images/tools-hmac-supported.svg" loading="lazy" alt="" />
                  <div>{alg}</div>
                  <div className="algorithms-description">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <ToolReadyTo />
      <ToolFaq>
        <div className="w-layout-vflex tools-faq">
          <ToolFaqCard icon="/images/tools-qa-what-is.svg" title={t('faqWhatTitle')}>
            <div className="tools-faq-content">{t('faqWhatBody')}</div>
          </ToolFaqCard>
          <ToolFaqCard icon="/images/tools-qa-encryption.svg" title={t('faqWhyTitle')}>
            <ToolFaqCheckItem>{t('faqWhy1')}</ToolFaqCheckItem>
            <ToolFaqCheckItem>{t('faqWhy2')}</ToolFaqCheckItem>
            <ToolFaqCheckItem>{t('faqWhy3')}</ToolFaqCheckItem>
          </ToolFaqCard>
        </div>
        <ToolFaqBestPractices icon="/images/tools-qa-best-practice.svg" title={t('bestPracticesTitle')}>
          <ToolFaqCheckItem>{t('bp1')}</ToolFaqCheckItem>
          <ToolFaqCheckItem>{t('bp2')}</ToolFaqCheckItem>
          <ToolFaqCheckItem>{t('bp3')}</ToolFaqCheckItem>
        </ToolFaqBestPractices>
      </ToolFaq>
      <ToolPopup />
    </>
  );
}
