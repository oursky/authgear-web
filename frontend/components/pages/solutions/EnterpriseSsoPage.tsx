import { ArrowRightIcon } from '@heroicons/react/24/outline';
import ContactForm from '@/components/ContactForm';
import { useTranslations } from 'next-intl';

interface Props {
  locale: string;
}

export default function EnterpriseSsoPage(_props: Props) {
  const t = useTranslations('EnterpriseSso');
  return (
    <>
      <section className="ds-hero-banner--dark">
        <div className="ds-container ds-container--hero">
          <div className="ds-hero-banner__row">
            <div className="ds-hero-banner__body">
              <h1 className="ds-hero-banner__title">{t('heroTitle')}</h1>
              <p className="ds-hero-banner__description">
                {t('heroDescLine1')}
                <br />
                {t('heroDescLine2')}
              </p>
              <div className="ds-hero-banner__ctas">
                <a href="/schedule-demo" target="_blank" rel="noreferrer" className="ds-btn ds-btn-secondary">
                  {t('heroCta1')}
                  <ArrowRightIcon className="ds-btn__icon-arrow" aria-hidden />
                </a>
                <a
                  href="https://portal.authgear.com/?utm_source=solutions-enterprise-sso&utm_medium=link&utm_campaign=sign-up"
                  target="_blank"
                  rel="noreferrer"
                  className="ds-btn ds-btn-tertiary"
                >
                  {t('heroCta2')}
                  <ArrowRightIcon className="ds-btn__icon-arrow" aria-hidden />
                </a>
              </div>
            </div>
            <img className="ds-hero-banner__media" src="/images/solutions_enterprise-sso_kv.svg" width={624} alt="" />
          </div>
        </div>
      </section>
      <section className="ds-section enterprise-pricing-support">
        <div className="ds-container">
          <div className="title-content">
            <h2 className="heading-on-light">{t('withoutComplexityTitle')}</h2>
            <p className="section-lede-on-light">
              {t('withoutComplexityDesc')}
            </p>
          </div>
          <div className="ds-grid-2">
                <div className="svg-card">
                  <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M35.1812 10.9197C35.7194 11.5494 35.6454 12.4962 35.0158 13.0346L29.9592 17.3583C29.3296 17.8967 28.3828 17.8227 27.8444 17.1931C27.306 16.5635 27.38 15.6166 28.0096 15.0782L33.0662 10.7545C33.6958 10.2161 34.6428 10.2901 35.1812 10.9197Z" fill="#31B7FF"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.85068 12.4285C10.4101 11.8175 11.3589 11.7756 11.9699 12.335L17.761 17.6368C18.372 18.1962 18.4138 19.145 17.8544 19.7561C17.295 20.367 16.3462 20.409 15.7352 19.8495L9.94414 14.5478C9.33312 13.9884 9.29126 13.0396 9.85068 12.4285Z" fill="#31B7FF"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M17.943 25.7422C18.5838 26.2674 18.6775 27.2124 18.1524 27.8532L14.0743 32.8292C13.5492 33.47 12.604 33.5638 11.9633 33.0386C11.3226 32.5136 11.2288 31.5684 11.7539 30.9276L15.8321 25.9516C16.3572 25.3108 17.3023 25.2172 17.943 25.7422Z" fill="#31B7FF"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M31.4528 25.0056C32.0042 24.3872 32.9524 24.333 33.5706 24.8844L38.3248 29.124C38.9432 29.6754 38.9974 30.6236 38.446 31.2418C37.8946 31.8602 36.9464 31.9144 36.3282 31.363L31.574 27.1234C30.9556 26.572 30.9014 25.6238 31.4528 25.0056Z" fill="#31B7FF"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M24.064 25.6691C24.881 25.5327 25.654 26.0845 25.7904 26.9017L26.9796 34.0291C27.116 34.8463 26.564 35.6193 25.7468 35.7555C24.9298 35.8919 24.1568 35.3401 24.0204 34.5229L22.8312 27.3955C22.6948 26.5783 23.2468 25.8053 24.064 25.6691Z" fill="#31B7FF"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M18.9858 14.1003C20.0614 12.6791 21.7932 11.543 24.2474 11.543C26.7016 11.543 28.4334 12.6791 29.509 14.1003C30.1832 14.991 30.6054 15.997 30.8164 16.9187C31.8648 17.1413 32.8348 17.6243 33.6166 18.3704C34.7324 19.4351 35.364 20.9406 35.364 22.6994C35.364 25.1018 33.937 27.1736 31.8828 28.1044C31.8622 28.1136 31.8416 28.1224 31.8208 28.1308C30.977 28.4684 30.142 28.5944 29.4764 28.5944H19.0108C18.3361 28.5944 17.5019 28.4594 16.6703 28.1228C16.6519 28.1154 16.6336 28.1076 16.6154 28.0994C14.562 27.1716 13.1309 25.104 13.1309 22.6994C13.1309 20.9406 13.7624 19.4351 14.8781 18.3704C15.66 17.6243 16.6301 17.1413 17.6784 16.9187C17.8894 15.997 18.3116 14.991 18.9858 14.1003ZM21.3778 15.9107C20.757 16.7312 20.5146 17.7191 20.5146 18.2758C20.5146 19.0992 19.8509 19.7686 19.0275 19.7757C18.1466 19.7833 17.4322 20.08 16.9493 20.5408C16.4791 20.9894 16.1309 21.6854 16.1309 22.6994C16.1309 23.8738 16.8214 24.888 17.8239 25.3532C18.275 25.5312 18.7137 25.5944 19.0108 25.5944H29.4764C29.7816 25.5944 30.222 25.5338 30.6748 25.358C31.6746 24.891 32.364 23.8748 32.364 22.6994C32.364 21.6854 32.0156 20.9894 31.5456 20.5408C31.0626 20.08 30.3482 19.7833 29.4674 19.7757C28.644 19.7686 27.9802 19.0992 27.9802 18.2758C27.9802 17.7191 27.738 16.7312 27.117 15.9107C26.5422 15.1514 25.6576 14.543 24.2474 14.543C22.8372 14.543 21.9526 15.1514 21.3778 15.9107Z" fill="#0043E0"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M28.4988 38.1362C28.4988 36.8312 27.441 35.7734 26.1362 35.7734C24.8312 35.7734 23.7734 36.8312 23.7734 38.1362C23.7734 39.441 24.8312 40.499 26.1362 40.499C27.441 40.499 28.4988 39.441 28.4988 38.1362ZM26.1362 32.7734C29.0978 32.7734 31.4988 35.1744 31.4988 38.1362C31.4988 41.098 29.0978 43.499 26.1362 43.499C23.1744 43.499 20.7734 41.098 20.7734 38.1362C20.7734 35.1744 23.1744 32.7734 26.1362 32.7734Z" fill="#0043E0"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M38.7889 9.52144C38.7889 8.40502 37.8839 7.5 36.7675 7.5C35.6511 7.5 34.7461 8.40502 34.7461 9.52144C34.7461 10.6378 35.6511 11.5429 36.7675 11.5429C37.8839 11.5429 38.7889 10.6378 38.7889 9.52144ZM36.7675 4.5C39.5407 4.5 41.7889 6.74818 41.7889 9.52144C41.7889 12.2947 39.5407 14.5429 36.7675 14.5429C33.9943 14.5429 31.7461 12.2947 31.7461 9.52144C31.7461 6.74818 33.9943 4.5 36.7675 4.5Z" fill="#0043E0"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.3457 34.0499C12.3457 33.4357 11.8477 32.9375 11.2334 32.9375C10.6191 32.9375 10.1211 33.4357 10.1211 34.0499C10.1211 34.6643 10.6191 35.1623 11.2334 35.1623C11.8477 35.1623 12.3457 34.6643 12.3457 34.0499ZM11.2334 29.9375C13.5046 29.9375 15.3457 31.7787 15.3457 34.0499C15.3457 36.3211 13.5046 38.1623 11.2334 38.1623C8.96225 38.1623 7.12109 36.3211 7.12109 34.0499C7.12109 31.7787 8.96225 29.9375 11.2334 29.9375Z" fill="#0043E0"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.73245 11.9014C9.73245 11.2871 9.23445 10.7891 8.62013 10.7891C8.00581 10.7891 7.50781 11.2871 7.50781 11.9014C7.50781 12.5157 8.00581 13.0137 8.62013 13.0137C9.23445 13.0137 9.73245 12.5157 9.73245 11.9014ZM8.62013 7.78906C10.8913 7.78906 12.7325 9.63022 12.7325 11.9014C12.7325 14.1726 10.8913 16.0137 8.62013 16.0137C6.34897 16.0137 4.50781 14.1726 4.50781 11.9014C4.50781 9.63022 6.34897 7.78906 8.62013 7.78906Z" fill="#0043E0"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M40.4922 32.003C40.4922 31.3886 39.9942 30.8906 39.3798 30.8906C38.7656 30.8906 38.2676 31.3886 38.2676 32.003C38.2676 32.6172 38.7656 33.1152 39.3798 33.1152C39.9942 33.1152 40.4922 32.6172 40.4922 32.003ZM39.3798 27.8906C41.651 27.8906 43.4922 29.7318 43.4922 32.003C43.4922 34.2742 41.651 36.1152 39.3798 36.1152C37.1086 36.1152 35.2676 34.2742 35.2676 32.003C35.2676 29.7318 37.1086 27.8906 39.3798 27.8906Z" fill="#0043E0"></path>
                      </svg></div>
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('complexity1Title')}</div>
                    <div className="ds-svg-card-description">{t('complexity1Desc')}</div>
                  </div>
                </div>
                <div className="svg-card">
                  <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path d="M15.6529 20.0692H6.32031M15.6529 20.0692L11.8881 16.3203M15.6529 20.0692L11.8881 23.816" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M25.734 39.7536H19.0265C16.2119 39.7536 14.511 37.9272 14.3906 35.3834C14.3906 30.2058 19.9949 28.4196 28.4388 28.3594C36.8978 28.4396 42.5172 30.2258 42.487 35.3834C42.3516 37.9272 40.6608 39.7536 37.8512 39.7536H33.145" stroke="#0043E0" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round"></path>
                        <path d="M21.3535 15.3494C21.3535 19.2703 24.5319 22.4488 28.4529 22.4488C32.3737 22.4488 35.5521 19.2703 35.5521 15.3494C35.5521 11.4285 32.3737 8.25 28.4529 8.25C26.6749 8.25 25.0495 8.90362 23.8039 9.98368" stroke="#0043E0" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round"></path>
                      </svg></div>
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('complexity2Title')}</div>
                    <div className="ds-svg-card-description">{t('complexity2Desc')}</div>
                  </div>
                </div>
                <div className="svg-card">
                  <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path d="M21.1816 18.0332C19.4473 18.0332 18.0391 19.4414 18.0391 21.1782V26.8134C18.0391 28.55 19.4473 29.956 21.1816 29.956H26.817C28.5536 29.956 29.9618 28.55 29.9618 26.8134V21.1782C29.9618 19.4414 28.5536 18.0332 26.817 18.0332" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M42.0003 6.00391L34.1289 13.8752" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M33.8691 6.02191L41.9969 6.00391L41.9789 14.1317" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M42.0003 41.9944L34.1289 34.123" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M33.8691 41.9789L41.9969 41.9969L41.9789 33.8691" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M6 6.00391L13.8713 13.8752" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M14.1278 6.02191L6 6.00391L6.018 14.1317" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M6 41.9944L13.8713 34.123" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M14.1278 41.9789L6 41.9969L6.018 33.8691" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div>
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('complexity3Title')}</div>
                    <div className="ds-svg-card-description">{t('complexity3Desc')}</div>
                  </div>
                </div>
                <div className="svg-card">
                  <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path d="M18.6465 19.1914V30.3836" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M30.9051 23.41L22.4297 17.3516" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M14.6175 11.7576L9.35352 8" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M18.6466 19.1917C15.9915 19.1917 13.8379 17.0381 13.8379 14.383C13.8379 11.7278 15.9915 9.57422 18.6466 9.57422C21.3018 9.57422 23.4554 11.7278 23.4554 14.383C23.4554 17.0381 21.3018 19.1917 18.6466 19.1917Z" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M18.6466 40.0002C21.3018 40.0002 23.4554 37.8468 23.4554 35.1916C23.4554 32.5364 21.3018 30.3828 18.6466 30.3828C15.9915 30.3828 13.8379 32.5364 13.8379 35.1916C13.8379 35.985 14.0302 36.7336 14.3707 37.3934" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M34.8381 30.9887C32.1829 30.9887 30.0293 28.8351 30.0293 26.1799C30.0293 23.5247 32.1829 21.3711 34.8381 21.3711C37.4933 21.3711 39.6469 23.5247 39.6469 26.1799C39.6469 26.6211 39.5873 27.0485 39.4761 27.4545M30.9393 23.4457L30.9061 23.4127" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div>
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('complexity4Title')}</div>
                    <div className="ds-svg-card-description">{t('complexity4Desc')}</div>
                  </div>
                </div>
          </div>
        </div>
      </section>
      <section className="ds-section ds-bg-light-blue">
        <div className="ds-container">
          <div className="title-content">
            <h2 className="heading-on-light">{t('featuresTitle')}</h2>
            <p className="section-lede-on-light">
              {t('featuresDesc')}
            </p>
          </div>
          <div className="ds-grid-4">
                <div className="svg-card">
                  <div className="svg-card-image-container">
                    <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path d="M26.4297 31.0078L27.8697 32.9714C28.2465 33.4852 28.8455 33.7888 29.4825 33.7888H35.3647" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M39.9746 31.6751C40.9202 32.7513 40.8142 34.3905 39.7378 35.3359C38.6616 36.2815 37.0226 36.1755 36.077 35.0993C35.1314 34.0231 35.2374 32.3839 36.3136 31.4383C37.39 30.4927 39.029 30.5987 39.9746 31.6751Z" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M31.2324 25.3866L33.3098 25.2514C34.135 25.1978 34.8422 24.6416 35.0888 23.8522L36.699 18.6992" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M37.0838 13.8191C38.4636 13.4334 39.8948 14.2391 40.2806 15.6189C40.6662 16.9987 39.8604 18.4299 38.4808 18.8157C37.101 19.2014 35.6698 18.3956 35.284 17.0159C34.8982 15.6361 35.704 14.2049 37.0838 13.8191Z" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M27.2621 17.3653L27.9565 15.8122C28.3603 14.9093 28.0433 13.8468 27.2109 13.3126L22.3047 10.1641" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M17.6133 8.58008C17.621 7.14744 18.7887 5.99232 20.2214 6.00004C21.654 6.00776 22.8092 7.17542 22.8014 8.60806C22.7936 10.0407 21.626 11.1958 20.1934 11.1881C18.7607 11.1804 17.6056 10.0127 17.6133 8.58008Z" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M18.6181 18.9498L16.7468 18.2309C15.8402 17.8827 14.8145 18.236 14.3147 19.0687L11.6152 23.5662" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M9.97494 28.3247C8.54226 28.3247 7.38086 27.1633 7.38086 25.7307C7.38086 24.2981 8.54226 23.1367 9.97494 23.1367C11.4076 23.1367 12.569 24.2981 12.569 25.7307C12.569 27.1633 11.4076 28.3247 9.97494 28.3247Z" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M18.4953 28.8516L17.4677 30.6058C17.1244 31.1918 17.1019 31.912 17.4081 32.5184L19.5758 36.8102" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M22.4128 40.7182C21.6888 41.9544 20.0996 42.3694 18.8634 41.6452C17.6272 40.9212 17.2121 39.332 17.9363 38.0958C18.6604 36.8596 20.2496 36.4446 21.4858 37.1686C22.722 37.8928 23.137 39.482 22.4128 40.7182Z" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M23.9927 31.2901C28.0348 31.2901 31.3116 28.0133 31.3116 23.9712C31.3116 19.9291 28.0348 16.6523 23.9927 16.6523C19.9506 16.6523 16.6738 19.9291 16.6738 23.9712C16.6738 28.0133 19.9506 31.2901 23.9927 31.2901Z" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div>
                  </div>
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('feature1Title')}</div>
                    <div className="ds-svg-card-description">{t('feature1Desc')}</div>
                  </div>
                </div>
                <div className="svg-card">
                  <div className="svg-card-image-container">
                    <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path d="M9.43945 18.2864V15.7345C9.43945 12.257 12.2589 9.4375 15.738 9.4375H17.8239" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M38.5621 29.7109V32.2627C38.5621 35.7403 35.7427 38.5597 32.2635 38.5597H30.1777" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M21.2605 12.8764C23.1594 12.8764 24.6987 11.3371 24.6987 9.43822C24.6987 7.53934 23.1594 6 21.2605 6C19.3616 6 17.8223 7.53934 17.8223 9.43822C17.8223 11.3371 19.3616 12.8764 21.2605 12.8764Z" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M26.741 42.0014C28.6398 42.0014 30.1792 40.4621 30.1792 38.5632C30.1792 36.6643 28.6398 35.125 26.741 35.125C24.8421 35.125 23.3027 36.6643 23.3027 38.5632C23.3027 40.4621 24.8421 42.0014 26.741 42.0014Z" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M29.7129 9.4375H32.2649C35.7423 9.4375 38.5619 12.257 38.5619 15.7361V17.822" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M18.2864 38.5643H15.7345C12.257 38.5643 9.4375 35.7447 9.4375 32.2657V30.1797" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M35.1236 21.2585C35.1236 23.1574 36.6629 24.6968 38.5618 24.6968C40.4607 24.6968 42 23.1574 42 21.2585C42 19.3597 40.4607 17.8203 38.5618 17.8203C36.6629 17.8203 35.1236 19.3597 35.1236 21.2585Z" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M6.00051 26.739C6.00051 28.6379 7.53986 30.1772 9.43873 30.1772C11.3376 30.1772 12.877 28.6379 12.877 26.739C12.877 24.8401 11.3376 23.3008 9.43873 23.3008C7.53986 23.3008 6.00051 24.8401 6.00051 26.739Z" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div>
                  </div>
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('feature2Title')}</div>
                    <div className="ds-svg-card-description">{t('feature2Desc')}</div>
                  </div>
                </div>
                <div className="svg-card">
                  <div className="svg-card-image-container">
                    <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M35.1812 10.9197C35.7194 11.5494 35.6454 12.4962 35.0158 13.0346L29.9592 17.3583C29.3296 17.8967 28.3828 17.8227 27.8444 17.1931C27.306 16.5635 27.38 15.6166 28.0096 15.0782L33.0662 10.7545C33.6958 10.2161 34.6428 10.2901 35.1812 10.9197Z" fill="#31B7FF"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.85068 12.4285C10.4101 11.8175 11.3589 11.7756 11.9699 12.335L17.761 17.6368C18.372 18.1962 18.4138 19.145 17.8544 19.7561C17.295 20.367 16.3462 20.409 15.7352 19.8495L9.94414 14.5478C9.33312 13.9884 9.29126 13.0396 9.85068 12.4285Z" fill="#31B7FF"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M17.943 25.7422C18.5838 26.2674 18.6775 27.2124 18.1524 27.8532L14.0743 32.8292C13.5492 33.47 12.604 33.5638 11.9633 33.0386C11.3226 32.5136 11.2288 31.5684 11.7539 30.9276L15.8321 25.9516C16.3572 25.3108 17.3023 25.2172 17.943 25.7422Z" fill="#31B7FF"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M31.4528 25.0056C32.0042 24.3872 32.9524 24.333 33.5706 24.8844L38.3248 29.124C38.9432 29.6754 38.9974 30.6236 38.446 31.2418C37.8946 31.8602 36.9464 31.9144 36.3282 31.363L31.574 27.1234C30.9556 26.572 30.9014 25.6238 31.4528 25.0056Z" fill="#31B7FF"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M24.064 25.6691C24.881 25.5327 25.654 26.0845 25.7904 26.9017L26.9796 34.0291C27.116 34.8463 26.564 35.6193 25.7468 35.7555C24.9298 35.8919 24.1568 35.3401 24.0204 34.5229L22.8312 27.3955C22.6948 26.5783 23.2468 25.8053 24.064 25.6691Z" fill="#31B7FF"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M18.9858 14.1003C20.0614 12.6791 21.7932 11.543 24.2474 11.543C26.7016 11.543 28.4334 12.6791 29.509 14.1003C30.1832 14.991 30.6054 15.997 30.8164 16.9187C31.8648 17.1413 32.8348 17.6243 33.6166 18.3704C34.7324 19.4351 35.364 20.9406 35.364 22.6994C35.364 25.1018 33.937 27.1736 31.8828 28.1044C31.8622 28.1136 31.8416 28.1224 31.8208 28.1308C30.977 28.4684 30.142 28.5944 29.4764 28.5944H19.0108C18.3361 28.5944 17.5019 28.4594 16.6703 28.1228C16.6519 28.1154 16.6336 28.1076 16.6154 28.0994C14.562 27.1716 13.1309 25.104 13.1309 22.6994C13.1309 20.9406 13.7624 19.4351 14.8781 18.3704C15.66 17.6243 16.6301 17.1413 17.6784 16.9187C17.8894 15.997 18.3116 14.991 18.9858 14.1003ZM21.3778 15.9107C20.757 16.7312 20.5146 17.7191 20.5146 18.2758C20.5146 19.0992 19.8509 19.7686 19.0275 19.7757C18.1466 19.7833 17.4322 20.08 16.9493 20.5408C16.4791 20.9894 16.1309 21.6854 16.1309 22.6994C16.1309 23.8738 16.8214 24.888 17.8239 25.3532C18.275 25.5312 18.7137 25.5944 19.0108 25.5944H29.4764C29.7816 25.5944 30.222 25.5338 30.6748 25.358C31.6746 24.891 32.364 23.8748 32.364 22.6994C32.364 21.6854 32.0156 20.9894 31.5456 20.5408C31.0626 20.08 30.3482 19.7833 29.4674 19.7757C28.644 19.7686 27.9802 19.0992 27.9802 18.2758C27.9802 17.7191 27.738 16.7312 27.117 15.9107C26.5422 15.1514 25.6576 14.543 24.2474 14.543C22.8372 14.543 21.9526 15.1514 21.3778 15.9107Z" fill="#0043E0"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M28.4988 38.1362C28.4988 36.8312 27.441 35.7734 26.1362 35.7734C24.8312 35.7734 23.7734 36.8312 23.7734 38.1362C23.7734 39.441 24.8312 40.499 26.1362 40.499C27.441 40.499 28.4988 39.441 28.4988 38.1362ZM26.1362 32.7734C29.0978 32.7734 31.4988 35.1744 31.4988 38.1362C31.4988 41.098 29.0978 43.499 26.1362 43.499C23.1744 43.499 20.7734 41.098 20.7734 38.1362C20.7734 35.1744 23.1744 32.7734 26.1362 32.7734Z" fill="#0043E0"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M38.7889 9.52144C38.7889 8.40502 37.8839 7.5 36.7675 7.5C35.6511 7.5 34.7461 8.40502 34.7461 9.52144C34.7461 10.6378 35.6511 11.5429 36.7675 11.5429C37.8839 11.5429 38.7889 10.6378 38.7889 9.52144ZM36.7675 4.5C39.5407 4.5 41.7889 6.74818 41.7889 9.52144C41.7889 12.2947 39.5407 14.5429 36.7675 14.5429C33.9943 14.5429 31.7461 12.2947 31.7461 9.52144C31.7461 6.74818 33.9943 4.5 36.7675 4.5Z" fill="#0043E0"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.3457 34.0499C12.3457 33.4357 11.8477 32.9375 11.2334 32.9375C10.6191 32.9375 10.1211 33.4357 10.1211 34.0499C10.1211 34.6643 10.6191 35.1623 11.2334 35.1623C11.8477 35.1623 12.3457 34.6643 12.3457 34.0499ZM11.2334 29.9375C13.5046 29.9375 15.3457 31.7787 15.3457 34.0499C15.3457 36.3211 13.5046 38.1623 11.2334 38.1623C8.96225 38.1623 7.12109 36.3211 7.12109 34.0499C7.12109 31.7787 8.96225 29.9375 11.2334 29.9375Z" fill="#0043E0"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.73245 11.9014C9.73245 11.2871 9.23445 10.7891 8.62013 10.7891C8.00581 10.7891 7.50781 11.2871 7.50781 11.9014C7.50781 12.5157 8.00581 13.0137 8.62013 13.0137C9.23445 13.0137 9.73245 12.5157 9.73245 11.9014ZM8.62013 7.78906C10.8913 7.78906 12.7325 9.63022 12.7325 11.9014C12.7325 14.1726 10.8913 16.0137 8.62013 16.0137C6.34897 16.0137 4.50781 14.1726 4.50781 11.9014C4.50781 9.63022 6.34897 7.78906 8.62013 7.78906Z" fill="#0043E0"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M40.4922 32.003C40.4922 31.3886 39.9942 30.8906 39.3798 30.8906C38.7656 30.8906 38.2676 31.3886 38.2676 32.003C38.2676 32.6172 38.7656 33.1152 39.3798 33.1152C39.9942 33.1152 40.4922 32.6172 40.4922 32.003ZM39.3798 27.8906C41.651 27.8906 43.4922 29.7318 43.4922 32.003C43.4922 34.2742 41.651 36.1152 39.3798 36.1152C37.1086 36.1152 35.2676 34.2742 35.2676 32.003C35.2676 29.7318 37.1086 27.8906 39.3798 27.8906Z" fill="#0043E0"></path>
                      </svg></div>
                  </div>
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('feature3Title')}</div>
                    <div className="ds-svg-card-description">{t('feature3Desc')}</div>
                  </div>
                </div>
                <div className="svg-card">
                  <div className="svg-card-image-container">
                    <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path d="M18.1919 20.7578C16.0047 20.7578 14.6328 22.3068 14.6328 24.498V30.4136C14.6328 32.6048 15.9989 34.1538 18.1919 34.1538H30.7296C32.9248 34.1538 34.2888 32.6048 34.2888 30.4136V24.498C34.2888 22.3068 32.9248 20.7578 30.7296 20.7578H24.4608" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M33.2554 13.8477H15.668" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M24.459 42H16.0253C10.129 42 6.46094 37.8376 6.46094 31.9472V16.0528C6.46094 10.1624 10.1466 6 16.0253 6H32.8946C38.7908 6 42.461 10.1624 42.461 16.0528V31.9472C42.461 37.8376 38.7908 42 32.8928 42H32.5336" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div>
                  </div>
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('feature4Title')}</div>
                    <div className="ds-svg-card-description">{t('feature4Desc')}</div>
                  </div>
                </div>
                <div className="svg-card">
                  <div className="svg-card-image-container">
                    <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path d="M15.5644 6.56641H32.4338C38.33 6.56641 42 10.7284 42 16.6204V32.5144C42 38.4044 38.33 42.5664 32.4318 42.5664H15.5644C9.6682 42.5664 6 38.4044 6 32.5144V16.6204C6 10.7284 9.6856 6.56641 15.5644 6.56641Z" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M21.4422 24.561C21.4422 26.553 19.829 28.165 17.8384 28.165C15.8476 28.165 14.2344 26.553 14.2344 24.561C14.2344 22.571 15.8476 20.957 17.8384 20.957H17.8462C19.833 20.961 21.4422 22.575 21.4422 24.561Z" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M21.457 24.5664H33.7514V28.1704" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M28.25 28.1704V24.5664" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div>
                  </div>
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('feature5Title')}</div>
                    <div className="ds-svg-card-description">{t('feature5Desc')}</div>
                  </div>
                </div>
                <div className="svg-card">
                  <div className="svg-card-image-container">
                    <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path d="M33.3358 29.1094V30.9248M33.3358 38.1852V40.0006M28.6152 31.8324L30.1824 32.7402M36.4894 36.3696L38.0564 37.2772M28.6152 37.2772L30.1824 36.3696M36.4894 32.7394L38.0564 31.8316M35.8996 31.9858C37.3176 33.404 37.3176 35.704 35.8996 37.1222C34.4814 38.5384 32.183 38.5384 30.7668 37.1222C29.3486 35.704 29.3486 33.404 30.7668 31.9858C32.183 30.5696 34.4814 30.5696 35.8996 31.9858Z" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M11.5449 38.4237C11.5449 34.4143 14.7082 29.4219 23.8246 29.4219" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M15.9707 15.8438C15.9707 20.175 19.4814 23.6876 23.8126 23.6876C28.1456 23.6876 31.6564 20.175 31.6564 15.8438C31.6564 11.5125 28.1456 8 23.8126 8C21.4454 8 19.3231 9.04934 17.8853 10.7082" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div>
                  </div>
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('feature6Title')}</div>
                    <div className="ds-svg-card-description">{t('feature6Desc')}</div>
                  </div>
                </div>
                <div className="svg-card">
                  <div className="svg-card-image-container">
                    <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path d="M8.14844 12.1875L8.53442 14.4596C8.89042 16.5556 10.3144 18.3096 12.2904 19.0916L16.4364 20.7116" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M14.904 25.3895C12.078 25.1775 9.27 24.9035 6 26.2175" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M8.14844 39.3769L8.54444 37.1069C8.88644 35.0189 10.3144 33.2771 12.2944 32.4851L14.9624 31.4531" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M33.0547 31.4531L35.6949 32.4831C37.6769 33.2771 39.1029 35.0189 39.4729 37.1069L39.8407 39.3769" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M33.0977 25.3895C35.9237 25.1775 38.7317 24.9035 42.0017 26.2175" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M39.8507 12.1875L39.4627 14.4596C39.1067 16.5556 37.6827 18.3096 35.7067 19.0916L31.5625 20.7116" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M24 18.1016V38.6016" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M25.1604 38.5988H22.8384C18.4563 38.5988 14.9023 35.0448 14.9023 30.6608V25.4048C14.9023 21.0228 18.4563 17.4688 22.8384 17.4688H25.1604C29.5444 17.4688 33.0984 21.0228 33.0984 25.4048V30.6608C33.0984 35.0448 29.5444 38.5988 25.1604 38.5988Z" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M18.7188 18.6357V15.0398C18.7188 12.1218 21.0828 9.75781 24.0008 9.75781C26.9188 9.75781 29.2828 12.1218 29.2828 15.0398V18.6357" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div>
                  </div>
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('feature7Title')}</div>
                    <div className="ds-svg-card-description">{t('feature7Desc')}</div>
                  </div>
                </div>
                <div className="svg-card">
                  <div className="svg-card-image-container">
                    <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.82891 29.6994C8.41891 28.6354 8.13291 27.5714 7.97691 26.5354C7.81291 25.4414 6.78091 24.7054 5.70291 24.8534C4.61091 25.0194 3.85691 26.0374 4.02291 27.1294C4.22091 28.4514 4.58091 29.7994 5.09491 31.1334C5.40091 31.9274 6.15891 32.4154 6.96091 32.4154C7.20091 32.4154 7.44291 32.3734 7.67891 32.2834C8.70891 31.8874 9.22491 30.7314 8.82891 29.6994Z" fill="#31B7FF"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.99566 14.457C10.5737 14.457 11.1457 14.209 11.5397 13.729C12.1337 13.005 12.8437 12.305 13.6477 11.645C14.4997 10.941 14.6217 9.68105 13.9197 8.82905C13.2177 7.97505 11.9577 7.85305 11.1037 8.55505C10.1017 9.38105 9.20966 10.265 8.45366 11.185C7.74966 12.039 7.87166 13.299 8.72566 14.001C9.09766 14.309 9.54766 14.457 9.99566 14.457Z" fill="#31B7FF"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.72334 23.0585C5.82734 23.0745 5.93134 23.0825 6.03534 23.0825C7.00334 23.0825 7.85334 22.3765 8.00934 21.3905C8.19534 20.1905 8.51334 19.0445 8.95534 17.9825C9.37934 16.9625 8.89534 15.7905 7.87534 15.3665C6.85734 14.9465 5.68534 15.4285 5.26134 16.4465C4.69734 17.8025 4.29134 19.2605 4.05534 20.7725C3.88534 21.8645 4.63334 22.8885 5.72334 23.0585Z" fill="#31B7FF"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M17.2783 9.2697C17.5263 9.2697 17.7783 9.2237 18.0223 9.1257C18.9943 8.7337 20.0524 8.4517 21.1624 8.2817C22.2544 8.1157 23.0064 7.0957 22.8404 6.0037C22.6724 4.9117 21.6484 4.1617 20.5624 4.3277C19.1463 4.5437 17.7903 4.9077 16.5323 5.4137C15.5063 5.8257 15.0103 6.9897 15.4223 8.0157C15.7363 8.7957 16.4863 9.2697 17.2783 9.2697Z" fill="#31B7FF"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M43.744 9.87674C43.202 8.91074 41.988 8.57074 41.022 9.10874C40.112 9.61874 39.256 10.1647 38.414 10.7207C36.284 8.30874 33.538 6.37874 30.3 5.20874C29.18 4.81474 28.014 4.51874 26.836 4.33474C25.734 4.15674 24.722 4.90674 24.548 5.99674C24.376 7.08674 25.12 8.11074 26.212 8.28274C27.15 8.43074 28.078 8.66874 28.954 8.97674C31.4 9.85874 33.486 11.2947 35.144 13.0807C29.768 17.3847 26.012 22.4048 23.628 26.2748C21.934 23.9588 19.95 21.8368 17.708 19.9447C16.866 19.2307 15.602 19.3387 14.89 20.1808C14.176 21.0248 14.284 22.2888 15.128 23.0008C17.9 25.3408 20.222 28.0668 22.034 31.1028C22.394 31.7108 23.048 32.0808 23.75 32.0808H23.8C24.522 32.0628 25.178 31.6568 25.516 31.0188C27.086 28.0728 30.992 21.6408 37.484 16.3567C39.548 20.1868 40.054 24.8368 38.464 29.2408C37.028 33.2168 34.128 36.3968 30.302 38.1928C26.476 39.9868 22.176 40.1868 18.198 38.7508C16.372 38.0908 14.7 37.1128 13.202 35.8268C12.53 35.2608 11.918 34.6368 11.386 33.9708C10.696 33.1028 9.43602 32.9648 8.57602 33.6528C7.71202 34.3408 7.57 35.5988 8.258 36.4628C8.958 37.3388 9.758 38.1588 10.614 38.8748C12.46 40.4648 14.556 41.6868 16.84 42.5108C19.04 43.3068 21.32 43.7008 23.59 43.7008C26.462 43.7008 29.324 43.0708 32 41.8148C36.794 39.5648 40.426 35.5828 42.226 30.5988C44.286 24.8948 43.55 18.8567 40.738 13.9707C41.462 13.4947 42.202 13.0307 42.976 12.5967C43.94 12.0587 44.284 10.8387 43.744 9.87674Z" fill="#0043E0"></path>
                      </svg></div>
                  </div>
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('feature8Title')}</div>
                    <div className="ds-svg-card-description">{t('feature8Desc')}</div>
                  </div>
                </div>
          </div>
        </div>
      </section>
        <section className="ds-section enterprise-sso-section-dark-bg">
          <div className="ds-container">
            <div className="title-content">
              <h2 className="heading-on-dark">{t('devTitle')}</h2>
            </div>
            <div className="ds-grid-3">
                <div className="svg-card">
                  <div className="svg-card-image-container">
                    <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path d="M23.7344 32.3334C28.6532 34.2994 34.4812 33.297 38.4638 29.3146C42.4598 25.3184 43.4622 19.4632 41.4574 14.5579L34.658 21.3574C34.0442 21.9692 33.166 22.2374 32.3152 22.0702L29.1058 21.435C28.0744 21.231 27.2662 20.4248 27.0602 19.3933L26.4192 16.1723C26.2482 15.3195 26.5162 14.4394 27.1302 13.8256L33.9276 7.02814C31.1964 5.92248 28.1806 5.73562 25.3544 6.47218" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M19.1716 10.0234C15.1892 14.0059 14.1867 19.834 16.1644 24.7664L8.02844 32.9024C5.88374 35.049 5.9323 38.5768 8.22078 40.6556C10.3713 42.6098 13.7555 42.3146 15.8108 40.2612L19.7729 36.2982" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div>
                  </div>
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('dev1Title')}</div>
                    <div className="ds-svg-card-description">{t('dev1Desc')}</div>
                  </div>
                </div>
                <div className="svg-card">
                  <div className="svg-card-image-container">
                    <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path d="M13.6368 29.1445L9.98688 30.9007C8.13598 31.7631 8.03784 34.3751 9.81878 35.3755L20.3124 41.2711C22.8324 42.6871 25.9012 42.6871 28.4212 41.2711" stroke="#0043E0" strokeWidth="3" strokeLinecap="round"></path>
                        <path d="M35.3473 29.0039L38.9705 30.8463C40.7639 31.7491 40.8215 34.3045 39.0707 35.2883L33.7461 38.2797" stroke="#0043E0" strokeWidth="3" strokeLinecap="round"></path>
                        <path d="M35.2074 20.1788L38.4874 21.9532L39.2884 22.4032C40.9946 23.3618 40.9946 25.8332 39.2884 26.7918L28.4224 32.8966C25.9024 34.3124 22.8336 34.3124 20.3136 32.8966L9.44763 26.7918C7.74141 25.8332 7.74141 23.3618 9.44763 22.4032L10.2485 21.9532L13.4408 20.125" stroke="#31B7FF" strokeWidth="3"></path>
                        <path d="M28.4224 7.39782C25.9024 5.98198 22.8336 5.98198 20.3136 7.3978L9.44763 13.5026C7.74141 14.4612 7.74141 16.9326 9.44763 17.8912L20.3136 23.996C22.8336 25.4118 25.9024 25.4118 28.4224 23.996L39.2884 17.8912C40.9946 16.9326 40.9946 14.4612 39.2884 13.5026L33.8554 10.4502" stroke="#0043E0" strokeWidth="3" strokeLinecap="round"></path>
                      </svg></div>
                  </div>
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('dev2Title')}</div>
                    <div className="ds-svg-card-description">{t('dev2Desc')}</div>
                  </div>
                </div>
                <div className="svg-card">
                  <div className="svg-card-image-container">
                    <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path d="M12.689 13.1016H12.5781M17.6603 13.1016H17.5494M22.6336 13.1016H22.5226" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M17.6094 23.8125V41.9009" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M17.6758 29.4766H36.7952" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M36.1526 18.9844H6" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M6 31.9472C6 37.8376 9.67006 42 15.5663 42H32.4338C38.3318 42 42 37.8376 42 31.9472V16.0528C42 10.1624 38.3318 6 32.4356 6H15.5663C9.68756 6 6 10.1624 6 16.0528V24" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div>
                  </div>
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('dev3Title')}</div>
                    <div className="ds-svg-card-description">{t('dev3Desc')}</div>
                  </div>
                </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container-default feature-v3-container-default">
            <div className="w-layout-grid container-default-inner px-0 gap-0"></div>
            <h2 className="title features-page-v2 features-page-v3">{t('workforceTitle')}</h2>
            <div className="collection-list-wrapper-8 w-dyn-list">
              <div role="list" className="collection-list-7 w-dyn-items">
                <div role="listitem" className="collection-item-5 w-dyn-item"><img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt="" className="image-102 w-dyn-bind-empty" />
                  <div className="w-layout-vflex flex-block-95">
                    <div className="text-block-98 w-dyn-bind-empty"></div>
                    <a href="#" className="link-block-10 w-inline-block">
                      <div>{t('workforceCta')}</div><img src="/images/Arrow-RIght-SM---Iconly-Pro.svg" loading="lazy" alt="" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="w-dyn-empty">
                <div>No items found.</div>
              </div>
            </div>
          </div>
        </section>
      <section className="ds-section">
        <div className="ds-container">
          <div className="title-content">
            <h2 className="heading-on-light">{t('pricingTitle')}</h2>
          </div>
          <div className="ds-grid-3">
                <div className="svg-card ds-center">
                  <div className="svg-card-image-container">
                    <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path d="M13.4879 7.23047C10.9289 8.80671 8.70468 10.92 7 13.4031" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M42.9996 13.403C41.2948 10.918 39.0686 8.78718 36.4922 7.21094" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M20.3594 25.402L23.975 29.0234L31.4242 21.5704" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M10.0371 25.7794C10.0371 17.5146 16.7353 10.8164 25 10.8164C33.2648 10.8164 39.965 17.5146 39.965 25.7794C39.965 34.0442 33.2648 40.7424 25 40.7424C19.2464 40.7424 14.252 37.496 11.7482 32.735" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div>
                  </div>
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('pricing1Title')}</div>
                    <div className="ds-svg-card-description">{t('pricing1Desc')}</div>
                  </div>
                </div>
                <div className="svg-card ds-center">
                  <div className="svg-card-image-container">
                    <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path d="M23.0195 41.9472C27.6721 41.9472 30.9685 42.9028 34.3019 36.6718" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M38.7036 24.4084V20.7054C38.7036 12.585 32.1206 6 23.9982 6C15.876 6 9.29297 12.585 9.29297 20.7054V24.4084" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M37.927 23.8874C40.4508 25.3488 41.9628 28.3729 41.126 31.6225C40.4916 34.0919 38.4096 36.0437 35.907 36.5359C35.5354 36.6099 35.1676 36.6527 34.8096 36.6683C32.992 36.7461 31.6222 35.018 32.0464 33.2492L33.862 25.6582C34.292 23.864 36.3312 22.963 37.927 23.8874Z" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M10.0715 23.8874C7.54762 25.3488 6.03564 28.3729 6.8724 31.6225C7.50676 34.0919 9.5889 36.0437 12.0913 36.5359C12.463 36.6099 12.8308 36.6527 13.1888 36.6683C15.0063 36.7461 16.3763 35.018 15.9521 33.2492L14.1365 25.6582C13.7065 23.864 11.6671 22.963 10.0715 23.8874Z" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div>
                  </div>
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('pricing2Title')}</div>
                    <div className="ds-svg-card-description">{t('pricing2Desc')}</div>
                  </div>
                </div>
                <div className="svg-card ds-center">
                  <div className="svg-card-image-container">
                    <div className="icon-w48 w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path d="M21.1522 9.28516H30.9374C34.2476 9.28516 36.3064 11.6203 36.3064 14.9265V27.3826C36.3064 30.6888 34.2476 33.0258 30.9356 33.0258H11.367C8.05882 33.0258 6 30.6888 6 27.3826V14.9265C6 11.6203 8.06856 9.28516 11.367 9.28516H13.8212" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M36.2997 14.9688H36.6403C39.9427 14.9688 41.9995 17.3097 41.9995 20.612V33.0682C41.9995 36.3724 39.9427 38.7114 36.6209 38.7114H34.8457" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M11.6875 33.0664C11.6875 36.3706 13.7463 38.7096 17.0681 38.7096H26.8446" stroke="#0043E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M11.4141 27.1328H13.7765" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M25.0088 21.1558C25.0088 19.0288 23.2846 17.3047 21.1576 17.3047C19.0288 17.3047 17.3047 19.0288 17.3047 21.1558C17.3047 23.2826 19.0288 25.0068 21.1576 25.0068" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M30.8976 15.1797H28.5352" stroke="#31B7FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div>
                  </div>
                  <div className="ds-svg-card-content">
                    <div className="ds-svg-card-title">{t('pricing3Title')}</div>
                    <div className="ds-svg-card-description">{t('pricing3Desc')}</div>
                  </div>
                </div>
          </div>
        </div>
      </section>
        <div className="footer-form-section form__bg-dark">
          <div className="container-default">
            <div className="container-default-inner px-0">
              <div className="_2-block-flex footer-form">
                <div className="_2-block-flex-content footer-form">
                  <div className="_2-block-flex-content-text-wrap footer-form">
                    <h2 className="form-heading color-white footer-form">{t('footerTitle')}</h2>
                    <div className="footerform__divider-sm"></div>
                    <div className="color-white footer-get-started-text">{t('footerGetStarted')}</div>
                  </div>
                </div>
                <div className="_2-block-flex-image footer-form">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
