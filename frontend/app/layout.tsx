import 'normalize.css';
import type { Metadata } from 'next';
import './authgear-design-system.css';
import Script from 'next/script';
import { headers } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { GoogleTagManager } from '@next/third-parties/google';
import { localeToHtmlLang } from '@/lib/i18n';
import SiteNav from '@/components/layout/SiteNav';
import SiteFooter from '@/components/layout/SiteFooter';
import PlausibleProvider from 'next-plausible';
import {
  PT_Sans,
  IBM_Plex_Sans,
  Inter,
  Noto_Sans_TC,
  Red_Hat_Display,
} from 'next/font/google';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-pt-sans',
  display: 'swap',
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-noto-sans-tc',
  display: 'swap',
});

const redHatDisplay = Red_Hat_Display({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-red-hat-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'Authgear', template: '%s - Authgear' },
  description: 'Authgear makes it easier for developers to meet complex authentication requirements.',
  themeColor: '#f5f5f5',
  icons: {
    icon: '/images/favicon.png',
    apple: '/images/webclip.png',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const locale = headersList.get('x-locale') ?? 'en';
  const htmlLang = localeToHtmlLang(locale);
  const messages = await getMessages();
  return (
    <html
      lang={htmlLang}
      suppressHydrationWarning
      className={[
        ptSans.variable,
        ibmPlexSans.variable,
        inter.variable,
        notoSansTC.variable,
        redHatDisplay.variable,
      ].join(' ')}
    >
      <GoogleTagManager gtmId="GTM-KTHFL6S" />
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="cwUTy_LBZHQ90P9sQzhKyyV2M024ukPHK2rYpvion6M" />
<link href="/css/webflow.css" rel="stylesheet" type="text/css" />
        <link href="/css/authgear-new.webflow.css" rel="stylesheet" type="text/css" />
        <style>{`
.w-container{max-width:1271px;}
/* Replaces Webflow's w-mod-touch JS snippet — disables fixed backgrounds on touch devices */
@media (hover:none) and (pointer:coarse){*{background-attachment:scroll!important;}}
`}</style>
      </head>
      <body className="bg-neutral-200">
        <PlausibleProvider domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? ''}>
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
        >
          <SiteNav locale={locale} />
        </div>

        {/* Page content */}
        {children}

        {/* Footer */}
        <footer className="footer dark">
          <SiteFooter locale={locale} />
        </footer>

        {/* Scripts */}
        <Script
          src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=60658b46b03f0cf83ac1485d"
          strategy="beforeInteractive"
          integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
          crossOrigin="anonymous"
        />
        <Script src="/js/webflow.js" strategy="afterInteractive" />
          </NextIntlClientProvider>
        </PlausibleProvider>
      </body>
    </html>
  );
}
