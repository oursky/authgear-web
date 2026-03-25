import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
interface Props {
  locale: string;
}

export default async function AboutPage({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'About' });

  return (
    <>
      <div className="page-wrapper">
        <div className="section about-hero">
          <div className="container-default w-container">
            <div className="about-hero-wrapper">
              <div className="split-content about-hero-left">
                <h1>{t('heroHeading')}</h1>
                <p className="paragraph-large">
                  {t.rich('heroParagraph', {
                    skymakerLink: (chunks) => (
                      <a href="https://www.skymakers.co.uk" target="_blank" rel="noopener noreferrer">{chunks}</a>
                    ),
                    br: () => <br />,
                  })}
                </p>
              </div>
              <img
                src="/images/Lessons-Working-Remotely-in-the-Time-of-Coronavirus-5.png"
                alt={t('heroImageAlt')}
                className="image about-hero"
              />
            </div>
          </div>
        </div>
        <div className="section team-members">
          <div className="container-medium-651px team-members">
            <h2>{t('teamHeading')}</h2>
            <p className="paragraph-large">{t('teamSubheading')}</p>
          </div>
          <div className="container-default w-container">
            <div data-duration-in="300" data-duration-out="100" data-current="Tab 2" data-easing="ease" className="team-members-tabs w-tabs">
              <div className="team-members-tabs-content w-tab-content">
                <div data-w-tab="Tab 2" className="tem-members-tab-pane w-tab-pane w--tab-active">
                  <div className="w-dyn-list">
                    <div role="list" className="team-members-grid w-dyn-items">
                      <div role="listitem" className="w-dyn-item">
                        <div className="card team">
                          <a href="#" className="team-profile-link w-inline-block">
                            <div className="image-wrapper card-team"><img src="" alt="" className="image card-team w-dyn-bind-empty" /></div>
                            <h3 className="h3-title-small card-team-name w-dyn-bind-empty"></h3>
                            <div className="card-team-rol w-dyn-bind-empty"></div>
                          </a>
                          <div className="divider card-team"></div>
                          <p className="paragraph card-team w-dyn-bind-empty"></p>
                          <a href="#" className="link-wrapper w-inline-block">
                            <div>View LinkedIn</div>
                            <div className="underline-wrapper">
                              <div className="underline"></div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="empty-state w-dyn-empty">
                      <div>No items found.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-vc">
              <a href="#" className="button-primary w-button">{t('joinUsButton')}</a>
            </div>
          </div>
        </div>
        <div className="section partners">
          <div className="container-medium-997px partners">
            <h2 className="title partners">{t('partnersHeading')}</h2>
            <div className="w-layout-grid partners-grid">
              <div className="animation-div">
                <a href="https://azure.microsoft.com/" target="_blank" rel="noopener noreferrer" className="image-wrapper partners w-inline-block">
                  <img src="/images/1111.png" alt="Microsoft Azure" className="image partners" />
                </a>
              </div>
              <div className="animation-div">
                <a href="https://cloud.google.com/" target="_blank" rel="noopener noreferrer" className="image-wrapper partners w-inline-block">
                  <img src="/images/gcp.png" alt="Google Cloud" className="image partners" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="section cta">
          <div className="container-default w-container">
            <div className="cta-wrapper">
              <div className="animation-div">
                <Link href="/pricing" className="split-content cta-left w-inline-block">
                  <h2 className="title cta-split-content-left">{t('ctaGetStartedHeading')}</h2>
                  <p className="paragraph cta-split-content-left">{t('ctaGetStartedBody')}</p>
                  <div className="link-wrapper white">
                    <div>{t('ctaGetStartedLink')}</div>
                    <div className="underline-wrapper white">
                      <div className="underline white"></div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="animation-div">
                <Link href="/schedule-demo" className="split-content cta-right w-inline-block">
                  <h2 className="title cta-split-content-right">{t('ctaSalesHeading')}</h2>
                  <p className="paragraph cta-split-content-right">{t('ctaSalesBody')}</p>
                  <div className="link-wrapper cta-right">
                    <div>{t('ctaSalesLink')}</div>
                    <div className="underline-wrapper">
                      <div className="underline"></div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container-default w-container">
          <div className="divider"></div>
        </div>
      </div>
    </>
  );
}
