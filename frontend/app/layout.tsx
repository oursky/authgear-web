import type { Metadata } from 'next';
import Script from 'next/script';
import { headers } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { localeToHtmlLang } from '@/lib/i18n';
import { getFooterInnerHtml, getNavInnerHtml } from '@/lib/site-navigation';

export const metadata: Metadata = {
  title: { default: 'Authgear', template: '%s - Authgear' },
  description: 'Authgear makes it easier for developers to meet complex authentication requirements.',
  themeColor: '#f5f5f5',
  icons: {
    icon: '/images/favicon.png',
    apple: '/images/webclip.png',
  },
};

const cookieConsentHtml = `
  <div id="consentPopup" fs-cc="banner" class="fs-cookie-popup">
    <div class="cookie-tag">Your privacy is our priority</div>
    <p class="cookie-paragraph">Authgear understands the importance of data privacy. In line with our <a href="/data-privacy">Privacy Policy</a>, we take your privacy seriously and are committed to being transparent about how we collect your information.<br>By clicking "Accept," you consent to the use of all cookies on our site.</p>
    <div class="button-wrapper w-clearfix">
      <a fs-cc="allow" href="#" class="button accept w-button">Accept</a>
      <a fs-cc="deny" href="#" class="button deny w-button">Deny</a>
      <a fs-cc="open-preferences" href="#" class="preferences-link">Manage settings</a>
    </div>
  </div>
  <div fs-cc="preferences" class="fs-preferences-manager-wrapper">
    <div class="preferences-container">
      <div class="privacy-title">Preferences</div>
      <a fs-cc="allow" href="#" class="button w-button">Accept all cookies</a>
      <a fs-cc="close" href="#" class="close-button-2 w-inline-block"><img src="/images/np_close_25798_27313D.svg" loading="lazy" alt=""></a>
      <div class="consents-form w-form">
        <form method="get" class="w-clearfix">
          <div class="grid-3">
            <div class="text-div"><label class="cookie-tag">Essential</label><p class="paragraph-8">These items are required to enable basic website functionality.</p></div>
            <p class="paragraph-8 bold">Always active</p>
          </div>
          <div class="grid-3">
            <div class="text-div"><label class="cookie-tag">Marketing</label><p class="paragraph-8">These items are used to deliver advertising that is more relevant to you and your interests.</p></div>
            <label class="w-checkbox"><div class="w-checkbox-input w-checkbox-input--inputType-custom checkbox"></div><input type="checkbox" fs-cc-checkbox="marketing" style="opacity:0;position:absolute;z-index:-1"></label>
          </div>
          <div class="grid-3">
            <div class="text-div"><label class="cookie-tag">Analytics</label><p class="paragraph-8">These items help the website operator understand how its website performs.</p></div>
            <label class="w-checkbox"><div class="w-checkbox-input w-checkbox-input--inputType-custom checkbox"></div><input type="checkbox" fs-cc-checkbox="analytics" style="opacity:0;position:absolute;z-index:-1"></label>
          </div>
          <input type="submit" fs-cc="deny" class="button deny w-button" value="Reject all cookies">
          <input type="submit" fs-cc="submit" class="button field-wrapper w-button" value="Confirm my choices">
        </form>
      </div>
    </div>
  </div>
  <div fs-cc="manager" class="fs-manager-opener"><img src="/images/np_cookie_80793_FFFFFF.svg" loading="lazy" fs-cc="open-preferences" alt=""></div>
`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const locale = headersList.get('x-locale') ?? 'en';
  const htmlLang = localeToHtmlLang(locale);
  const navInnerHtml = getNavInnerHtml(locale);
  const footerInnerHtml = getFooterInnerHtml(locale);
  const messages = await getMessages();
  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="cwUTy_LBZHQ90P9sQzhKyyV2M024ukPHK2rYpvion6M" />
        <link href="/css/normalize.css" rel="stylesheet" type="text/css" />
        <link href="/css/webflow.css" rel="stylesheet" type="text/css" />
        <link href="/css/authgear-new.webflow.css" rel="stylesheet" type="text/css" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" type="text/javascript" />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `WebFont.load({google:{families:["PT Sans:400,400italic,700,700italic","IBM Plex Sans:300,400,500,600,700","Inter:300,400,500,600,700","Noto Sans TC:300,400,500,600,700","Red Hat Display:300,400,500,600,700"]}});`,
          }}
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);`,
          }}
        />
        <style>{`
.w-container{max-width:1271px;}
/* Trusted-by logo marquee: Webflow IX2 animation scripts are stripped from static HTML export */
.flex-block-85:has(.logo-marquee-viewport){width:100%;height:60px;}
.logo-marquee-viewport{flex:1;min-width:0;width:100%;height:60px;overflow:hidden;position:relative;z-index:0;}
.logo-marquee-track{position:relative;z-index:0;display:flex;width:max-content;animation:authgear-logo-marquee 38s linear infinite;}
.logo-marquee-track:hover{animation-play-state:paused;}
.logo-marquee-viewport .logos-container{position:relative!important;left:auto!important;z-index:1;height:60px;flex-shrink:0;display:flex;align-items:center;column-gap:60px;width:auto;}
.logo-marquee-viewport .link-block-7{
  position:absolute!important;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%)!important;
  z-index:2;
  opacity:0;
  flex-shrink:0;
  transition:opacity .25s ease!important;
  pointer-events:none;
}
.logo-marquee-viewport:hover .link-block-7,
.logo-marquee-viewport .link-block-7:hover,
.logo-marquee-viewport .link-block-7:focus-visible{
  opacity:1;
  pointer-events:auto;
}
@keyframes authgear-logo-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@media (prefers-reduced-motion:reduce){
  .logo-marquee-track{animation:none;width:100%;justify-content:center;flex-wrap:wrap;}
  .logo-marquee-viewport .logos-container:last-child{display:none;}
}
`}</style>
      </head>
      <body className="bg-neutral-200">
        <NextIntlClientProvider messages={messages}>
        {/* Navigation */}
        <div
          data-collapse="medium"
          data-animation="default"
          data-duration={500}
          data-easing="ease-in-out-expo"
          data-easing2="ease-in-out-expo"
          data-w-id="60c42e91-3cdd-38fc-0e84-178975fa9b9e"
          role="banner"
          className="header event w-nav"
          dangerouslySetInnerHTML={{ __html: navInnerHtml }}
        />

        {/* Page content */}
        {children}

        {/* Footer */}
        <footer
          className="footer dark"
          dangerouslySetInnerHTML={{ __html: footerInnerHtml }}
        />

        {/* Cookie consent */}
        <div
          className="cookies"
          dangerouslySetInnerHTML={{ __html: cookieConsentHtml }}
        />

        {/* Scripts */}
        <Script
          src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=60658b46b03f0cf83ac1485d"
          strategy="beforeInteractive"
          integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
          crossOrigin="anonymous"
        />
        <Script src="/js/webflow.js" strategy="afterInteractive" />
        <Script
          async
          src="https://cdn.jsdelivr.net/npm/@finsweet/cookie-consent@1/fs-cc.js"
          data-fs-cc-mode="opt-in"
          strategy="afterInteractive"
        />
        <Script
          async
          src="https://plausible.io/js/pa-sIydDP09Pb5q-XyCWR6Rj.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GTM-KTHFL6S"
          strategy="afterInteractive"
        />
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KTHFL6S');`}
        </Script>
        {/* Load before page scripts: Webflow inline scripts use intlTelInput via PageScripts */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/intlTelInput.min.js"
          strategy="beforeInteractive"
        />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
