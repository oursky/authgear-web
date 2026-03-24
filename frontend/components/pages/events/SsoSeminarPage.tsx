import Link from 'next/link';

interface Props {
  locale: string;
}

export default async function SsoSeminarPage(_props: Props) {
  return (
    <div className="page-wrapper">
      <section className="seminar-hero-container">
        <div className="w-layout-blockcontainer container-default w-container">
          <div className="container-default-inner">
            <div className="w-layout-vflex semina-hero-wrapper">
              <h1 className="seminar-hero-h1">掌握身分認證：<br /><span className="text-span-31">IT</span> 和系統架構師的關鍵技能 </h1>
              <p className="semina-hero-sub">揭開 <span className="english">Auth</span> 的複雜性：<br /><span className="english">IT</span> 和 <span className="english">System Architect</span> <span className="text-span-36">不可錯過的研討會</span></p>
              <div className="w-layout-blockcontainer container-1443 w-container">
                <a href="#Seminar-Register" className="button-primary home-hero new-home seminar w-button">立即報名</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="semina-intro">
        <div className="w-layout-hflex flex-block-42">
          <img src="/images/seminar-about-quote.svg" loading="lazy" alt="" />
          <div className="w-layout-vflex flex-block-33">
            <div className="w-layout-blockcontainer container-1444 w-container">
              <img src="/images/seminar-logo-Authgear2x.webp" loading="lazy" alt="" className="seminar-logo" />
              <img src="/images/seminar-logo-crossover.svg" loading="lazy" alt="" />
              <img src="/images/seminar-logo-RobertWalters2x.webp" loading="lazy" alt="" className="seminar-logo" />
              <img src="/images/seminar-logo-crossover.svg" loading="lazy" alt="" />
              <img src="/images/seminar-logo-swittbit2x.webp" loading="lazy" alt="" className="seminar-logo" />
            </div>
            <div className="w-layout-vflex flex-block-34">
              <p className="semina-title">這是一場關於身分認證在現代 IT 和系統架構中關鍵作用的研討會</p>
              <p className="seminar-content">身分認證是驗證使用者或設備身份的過程，是網路安全的基礎。在日益複雜的科技與雲端環境中， 規劃強大的身分認證策略以保護敏感數據和防止未經授權的存取比什麼都來得重要。</p>
            </div>
          </div>
        </div>
      </section>
      <section className="seminar-about">
        <div className="w-layout-blockcontainer container-default w-container">
          <div className="container-default-inner seminar-container">
            <div className="w-layout-hflex flex-block-35">
              <img src="/images/seminar-title-circle.svg" loading="lazy" alt="" />
              <div className="w-layout-vflex">
                <p className="seminar-section-title-upper">SeMiNar AGENDA</p>
                <p className="seminar-section-title">活動大綱</p>
              </div>
            </div>
            <div className="w-layout-vflex seminar-about-wrapper">
              <div className="div-block-9">
                <div className="seminar-highlight">在本研討會中，您將了解</div>
                <div className="div-block-8"></div>
              </div>
              <div className="w-layout-hflex flex-block-37">
                <div className="w-layout-blockcontainer seminar-agenda-card w-container">
                  <div className="seminar-agenda-card-number">01</div>
                  <p className="seminar-aganda-card-text"><span className="strong">為什麼身分認證如此關鍵？</span>發現驗證不足的真實世界後果，包括數據洩露、財務損失和聲譽損害。</p>
                </div>
                <div className="w-layout-blockcontainer seminar-agenda-card w-container">
                  <div className="seminar-agenda-card-number">02</div>
                  <p className="seminar-aganda-card-text"><span className="strong">採用零信任架構的好處：</span>了解零信任原則如何幫助降低風險、提高安全性並增強業務彈性。</p>
                </div>
                <div className="w-layout-blockcontainer seminar-agenda-card w-container">
                  <div className="seminar-agenda-card-number">03</div>
                  <p className="seminar-aganda-card-text"><span className="strong">身分認證的最新趨勢和最佳實踐：</span>了解驗證技術的最新進展並學習如何有效地實施它們。</p>
                </div>
                <div className="w-layout-blockcontainer seminar-agenda-card w-container">
                  <div className="seminar-agenda-card-number">04</div>
                  <p className="seminar-aganda-card-text"><span className="strong">IT 和系統架構師的招募前景：</span>深入了解雇主在當今競爭激烈的市場中尋求的技能和經驗。</p>
                </div>
              </div>
            </div>
            <div className="w-layout-blockcontainer container-1445 w-container">
              <a href="#Seminar-Register" className="button-primary home-hero new-home seminar blue-button w-button">立即報名</a>
            </div>
          </div>
        </div>
        <div className="w-layout-blockcontainer container-default w-container">
          <div className="container-default-inner">
            <div className="w-layout-hflex flex-block-38">
              <div className="w-layout-hflex flex-block-35">
                <img src="/images/seminar-title-circle.svg" loading="lazy" alt="" />
                <div className="w-layout-vflex">
                  <p className="seminar-section-title-upper">About the SeMiNar</p>
                  <p className="seminar-section-title">活動內容</p>
                </div>
              </div>
              <div className="w-layout-vflex flex-block-39">
                <div className="div-block-10">
                  <img src="/images/seminar-agenda-arrow.svg" loading="lazy" alt="" />
                  <div className="seminar-about-text">現代身分驗證 <span className="english">Authentication </span>概念與架構介紹</div>
                </div>
                <div className="div-block-10">
                  <img src="/images/seminar-agenda-arrow.svg" loading="lazy" alt="" />
                  <div className="seminar-about-text">什麼是「零信任架構」？如何規劃與實踐？</div>
                </div>
                <div className="div-block-10">
                  <img src="/images/seminar-agenda-arrow.svg" loading="lazy" alt="" />
                  <div className="seminar-about-text"><span className="english">IT</span> 與 <span className="english">SA</span> 如何幫助企業在「安全性」與「方便性」之間取得平衡？</div>
                </div>
                <div className="div-block-10">
                  <img src="/images/seminar-agenda-arrow.svg" loading="lazy" alt="" />
                  <div className="seminar-about-text">企業所重視的 <span className="english">IT</span> 與 <span className="english">SA</span> 專業技能、職涯規劃與近期招募趨勢分析</div>
                </div>
                <div className="div-block-10">
                  <img src="/images/seminar-agenda-arrow.svg" loading="lazy" alt="" />
                  <div className="seminar-about-text">專業履歷健檢</div>
                </div>
                <a href="#Seminar-Register" className="button-primary home-hero new-home seminar blue-button about w-button">立即報名</a>
              </div>
            </div>
            <div className="w-layout-hflex seminar-map-container">
              <div className="w-layout-vflex flex-block-43">
                <div className="seminar-info"><span className="seminar-date">2024</span> / <span className="seminar-date">10</span> / <span className="seminar-date">31</span> <span className="text-span-33">THU.</span></div>
                <div className="div-block-11">
                  <div className="seminar-info time">18:30</div>
                  <div className="div-block-12"></div>
                  <div className="seminar-info time">20:30</div>
                </div>
                <div className="seminar-info location"><span className="text-span-34">Oursky Limited</span><br />台北市松山區八德路四段277號7樓</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-layout-blockcontainer container-default w-container">
          <div className="container-default-inner seminar-container">
            <div className="w-layout-hflex flex-block-35">
              <img src="/images/seminar-title-circle.svg" loading="lazy" alt="" />
              <div className="w-layout-vflex">
                <p className="seminar-section-title-upper">About the SPEAKER</p>
                <p className="seminar-section-title">講者資訊</p>
              </div>
            </div>
            <div className="w-layout-hflex flex-block-40">
              <img src="/images/seminar-speaker-BenCheng2x.webp" loading="lazy" width="624" alt="" />
              <img src="/images/seminar-speaker-AmyLin2x.webp" loading="lazy" width="624" alt="" className="image-63" />
              <img src="/images/seminar-speaker-AmyLin_m2x.webp" loading="lazy" sizes="100vw" srcSet="/images/seminar-speaker-AmyLin_m2x-p-500.webp 500w, /images/seminar-speaker-AmyLin_m2x.webp 670w" alt="" className="image-63 mobile-amy" />
            </div>
          </div>
        </div>
        <img src="/images/seminar-dec-hero-agenda2x.webp" loading="lazy" width="462" alt="" className="image-66" />
        <img src="/images/seminar-bg-blur.svg" loading="lazy" alt="" className="image-65" />
        <img src="/images/seminar-dec-hero-seminar2x.webp" loading="lazy" width="477" sizes="(max-width: 479px) 100vw, 477px" alt="" srcSet="/images/seminar-dec-hero-seminar2x-p-500.webp 500w, /images/seminar-dec-hero-seminar2x-p-800.webp 800w, /images/seminar-dec-hero-seminar2x-p-1080.webp 1080w, /images/seminar-dec-hero-seminar2x.webp 1826w" className="image-68" />
        <img src="/images/seminar-bg-blur.svg" loading="lazy" alt="" className="image-70" />
        <img src="/images/seminar-dec-hero-speaker2x.webp" loading="lazy" width="656" sizes="(max-width: 767px) 100vw, 656px" alt="" srcSet="/images/seminar-dec-hero-speaker2x-p-500.webp 500w, /images/seminar-dec-hero-speaker2x-p-800.webp 800w, /images/seminar-dec-hero-speaker2x-p-1080.webp 1080w, /images/seminar-dec-hero-speaker2x.webp 1820w" className="image-72" />
        <img src="/images/seminar-bg-blur.svg" loading="lazy" alt="" className="image-73" />
      </section>
      <section id="Seminar-Register" className="seminar-about seminar-form-section">
        <div className="w-layout-blockcontainer container-default w-container">
          <div className="container-default-inner seminar-container form-section">
            <div className="w-layout-hflex flex-block-35">
              <img src="/images/seminar-title-circle.svg" loading="lazy" alt="" />
              <div className="w-layout-vflex">
                <p className="seminar-section-title-upper">Register</p>
                <p className="seminar-section-title">立即報名</p>
              </div>
            </div>
            <div className="div-block-14">
              <div className="seminar_form w-form">
                <form id="wf-form-Oct31-Seminar" name="wf-form-Oct31-Seminar" data-name="Oct31-Seminar" method="get">
                  <label htmlFor="workshop-name" className="workshop-form-field-label-copy">名字<span className="get-demo-form-label-required">*</span></label>
                  <input className="workshop-form-text-field w-input" maxLength={256} name="name" data-name="Name" placeholder="" type="text" id="workshop-name" required />
                  <label htmlFor="workshop-email" className="workshop-form-field-label">Email Address<span className="get-demo-form-label-required">*</span></label>
                  <input className="workshop-form-text-field w-input" maxLength={256} name="email" data-name="Email" placeholder="" type="email" id="workshop-email" required />
                  <label htmlFor="workshop-phone" className="workshop-form-field-label">電話<span className="get-demo-form-label-required">*</span></label>
                  <input className="workshop-form-text-field phone-number w-input" maxLength={256} name="Phone-Number" data-name="Phone Number" placeholder="" type="text" id="workshop-phone" required />
                  <input className="text-field w-input" maxLength={256} name="Country-5" data-name="Country 5" placeholder="" type="text" id="workshop-country" required />
                  <div className="html-embed phone-number w-embed">
                    <span id="valid-msg" className="hide">Valid number</span>
                    <span id="error-msg" className="hide"></span>
                  </div>
                  <label htmlFor="Position" className="workshop-form-field-label">職稱<span className="get-demo-form-label-required">*</span></label>
                  <input className="workshop-form-text-field w-input" maxLength={256} name="Position" data-name="Position" placeholder="" type="text" id="Position" required />
                  <label htmlFor="Company-Name-3" className="workshop-form-field-label">公司名稱<span className="get-demo-form-label-required">*</span></label>
                  <input className="workshop-form-text-field w-input" maxLength={256} name="Company-Name" data-name="Company Name" placeholder="" type="text" id="Company-Name-3" required />
                  <input type="submit" data-wait="Please wait..." className="workshop-form-submit-button w-button" value="Submit" />
                </form>
                <div className="w-form-done">
                  <div>Thank you! Your submission has been received!</div>
                </div>
                <div className="w-form-fail">
                  <div>Oops! Something went wrong while submitting the form.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="workshop-footer-separator"></div>
      <footer className="footer dark">
        <div className="workshop-footer-separator"></div>
        <div className="container-default w-container">
          <div className="footer-wrapper">
            <div className="footer-top-content workshop">
              <div>
                <a href="#" className="footer-image w-inline-block"><img src="/images/authgear-logo-white.svg" loading="lazy" alt="" /></a>
                <div className="footer__dark-authgear-desc">Authgear powered by <a href="https://skymakers.digital/" className="footer__dark-authgear-desc">SkyMakers Digital Group</a></div>
                <div className="w-layout-grid footer-social-media-grid workshop">
                  <a href="https://www.linkedin.com/company/authgear" target="_blank" rel="noreferrer" className="footer-social-media-link icon-small gray-bg w-inline-block">
                    <div></div>
                  </a>
                  <a href="https://discord.gg/Kdn5vcYwAS" target="_blank" rel="noreferrer" className="footer-social-media-link icon-small gray-bg w-inline-block"><img width="19" loading="lazy" alt="" src="/images/authgear_footer_social_discord.svg" className="footer-social-media-icon" /></a>
                  <a href="https://github.com/authgear" target="_blank" rel="noreferrer" className="footer-social-media-link icon-small gray-bg w-inline-block"><img loading="lazy" src="/images/authgear_footer_social_github.svg" alt="" className="footer-social-media-icon" /></a>
                </div>
                <div className="footer-certificate">
                  <img width="144.5" loading="lazy" alt="" src="/images/Authgear_footer_certificated_blue2x.png" className="certificate-img" />
                  <a href="https://fidoalliance.org/passkeypledge/" target="_blank" rel="noreferrer" className="w-inline-block">
                    <img src="/images/PasskeyPledge_color.png" loading="lazy" width="68" height="Auto" alt="" srcSet="/images/PasskeyPledge_color-p-500.png 500w, /images/PasskeyPledge_color-p-800.png 800w, /images/PasskeyPledge_color.png 898w" sizes="(max-width: 1279px) 68px, (max-width: 1439px) 5vw, 68px" />
                  </a>
                  <div className="certificate-text">Authgear is both ISO 27001 and SoC 2 Type II compliant.</div>
                </div>
              </div>
              <div className="footer-menu-navigation-wrapper workshop">
                <div className="footer-menu-links-wrapper workshop">
                  <ul role="list" className="footer-menu-list w-list-unstyled">
                    <li className="footer-menu-list-item">
                      <h6 className="footer-menu-title">Products</h6>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/once" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Authgear ONCE</div>
                      </Link>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Authgear CLOUD</div>
                      </Link>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/pricing" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Pricing</div>
                      </Link>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/migrate-to-authgear" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Migrate to Authgear</div>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="footer-menu-links-wrapper workshop">
                  <ul role="list" className="footer-menu-list w-list-unstyled">
                    <li className="footer-menu-list-item">
                      <h6 className="footer-menu-title">alternative</h6>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/compare/okta-alternative" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Okta Alternative</div>
                      </Link>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/compare/auth0-alternative" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Auth0 Alternative</div>
                      </Link>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/compare/cognito-alternative" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>AWS Cognito Alternative</div>
                      </Link>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/compare/firebase-alternative" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Firebase Alternative</div>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="footer-menu-links-wrapper workshop">
                  <ul role="list" className="footer-menu-list w-list-unstyled">
                    <li className="footer-menu-list-item">
                      <h6 className="footer-menu-title">developers</h6>
                    </li>
                    <li className="footer-menu-list-item">
                      <a href="https://docs.authgear.com" target="_blank" rel="noreferrer" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Documentations</div>
                      </a>
                    </li>
                    <li className="footer-menu-list-item">
                      <a href="https://docs.authgear.com/reference/apis/oauth-2.0-and-openid-connect-oidc/userinfo" target="_blank" rel="noreferrer" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>APIs</div>
                      </a>
                    </li>
                    <li className="footer-menu-list-item">
                      <a href="https://github.com/authgear" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Github</div>
                      </a>
                    </li>
                    <li className="footer-menu-list-item">
                      <a href="https://github.com/authgear/authgear-server/discussions" target="_blank" rel="noreferrer" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Community</div>
                      </a>
                    </li>
                    <li className="footer-menu-list-item">
                      <a href="https://discord.gg/Kdn5vcYwAS" target="_blank" rel="noreferrer" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Discord</div>
                      </a>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/integrations" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Integrations</div>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="footer-menu-links-wrapper workshop">
                  <ul role="list" className="footer-menu-list w-list-unstyled">
                    <li className="footer-menu-list-item">
                      <h6 className="footer-menu-title">resources</h6>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/blog" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Blog</div>
                      </Link>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/login-gallery" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Login Gallery</div>
                      </Link>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/glossary" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Glossary</div>
                      </Link>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/security" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Security &amp; Compliance</div>
                      </Link>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/terms" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Terms</div>
                      </Link>
                    </li>
                    <li className="footer-menu-list-item">
                      <Link href="/policy" className="footer-menu-link workshop-footer-link w-inline-block">
                        <div>Acceptable Use Policy</div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
