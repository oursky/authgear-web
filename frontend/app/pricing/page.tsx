import type { Metadata } from 'next';
import { getWebflowPageTitle, getWebflowPageDescription } from '@/lib/webflow-page';
import StaticWebflowPage from '@/components/StaticWebflowPage';
import Script from 'next/script';

export function generateMetadata(): Metadata {
  return {
    title: getWebflowPageTitle('pricing.html'),
    description: getWebflowPageDescription('pricing.html'),
  };
}

export default function Page() {
  return (
    <>
      <StaticWebflowPage htmlFile="pricing.html" />
      {/* Pricing tab switcher — re-implements the inline script stripped from pricing.html */}
      <Script id="pricing-tabs" strategy="afterInteractive">{`
        function initPricingTabs() {
          const switcher = document.querySelectorAll("div.tab-switcher");
          if (!switcher.length) return;
          const changeTab = function (e, i, s) {
            if (e) e.preventDefault();
            switcher.forEach((ss) => ss.classList.remove("active-tab"));
            s.classList.add("active-tab");
            document.querySelectorAll("section.pricing-info").forEach((tab) => {
              tab.style.display = "none";
            });
            document.querySelectorAll("section." + (i === 0 ? "cloud" : "once")).forEach((tab) => {
              tab.style.display = "flex";
            });
          };
          const defaultTab = window.location.href.includes("#authgear-once") ? 1 : 0;
          changeTab(undefined, defaultTab, switcher[defaultTab]);
          switcher.forEach((s, i) => {
            s.addEventListener("click", (event) => changeTab(event, i, s));
          });
        }
        if (document.readyState === "complete") {
          initPricingTabs();
        } else {
          window.addEventListener("load", initPricingTabs);
        }
      `}</Script>
    </>
  );
}
