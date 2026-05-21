---
title: "SMS OTP 是什麼，它如何運作？"
excerpt: "SMS OTP 還安全嗎？了解真實風險（SIM 卡換號、SS7、釣魚簡訊），並比較更安全的替代方案——通行密鑰、WhatsApp OTP、社交登入——以及透過 Authgear 啟用的步驟。"
coverImage: ./cover.webp
category: industry
featured: false
metaTitle: "什麼是 SMS OTP？SMS OTP 的漏洞與替代方案"
metaDescription: "SMS OTP 是透過簡訊發送的臨時安全驗證碼，用於雙重因素驗證。雖然普遍使用，但它容易受到 SIM 卡換號和網路釣魚等攻擊。"
publishedAt: 2022-07-07T15:24:32.915Z
updatedAt: 2026-02-28T13:02:01.685Z
draft: false
---

SMS OTP（一次性密碼）是一種安全的臨時 4-8 位數字驗證碼，透過簡訊發送至用戶的手機，作為雙重因素驗證的第二層時效性安全保障。雖然它是目前最普遍的身份驗證方式，但 SMS OTP 可能透過複雜的手法遭到破解，例如 SIM 卡換號（攻擊者劫持電話號碼）或網路釣魚（即時攔截驗證碼）。

建議放棄 SMS 的原因在於，它依賴不安全的 SS7 行動網路，無法抵禦現代帳戶接管（ATO）攻擊手法。為降低這些風險，企業應實施安全的 SMS OTP 替代方案，例如身份驗證器應用程式（TOTP）、WhatsApp 發送的驗證碼，或能夠抵禦網路釣魚的通行密鑰和生物識別身份驗證。

<nav id="table-of-content">
    <ul>
        <li><a href="#sms-otp-definition">什麼是 OTP 簡訊？</a></li>
        <li><a href="#why">為什麼 OTP 簡訊變得如此普及？</a></li>
        <li><a href="#why-not-sms">您為何應該放棄 SMS OTP？</a>
            <ul>
            <li><a href="#sim-swap">SIM 卡換號安全風險</a></li>
            <li><a href="#ss7-flaw">SS7 技術缺陷</a></li>
            <li><a href="#social-engineering">社交工程風險</a></li>
            <li><a href="#sms-cost">透過 SMS 發送 OTP 的成本相當高昂</a></li>
            <li><a href="#ux">用戶體驗的阻礙</a></li>
            </ul>
        </li>
        <li><a href="#alternatives">OTP 簡訊的更多選項</a>
            <ul>
            <li><a href="#fido">1) 通行密鑰（WebAuthn/FIDO）——最佳整體選擇：最高安全性且阻力最低</a></li>
            <li><a href="#whatsapp">2) WhatsApp OTP——覆蓋範圍最廣且交付成本低於 SMS</a></li>
            <li><a href="#social-login">3) 社交登入——首次注冊速度最快</a></li>
            <li><a href="#compare">快速比較</a></li>
            </ul>
        </li>
        <li><a href="#authgear">透過 Authgear 實現 WhatsApp OTP 及其他安全身份驗證方法</a></li>
    </ul>
</nav>

<h2 id="sms-otp-definition">什麼是 OTP 簡訊？</h2>

<!--FIGURE-->
![](./figure-1.webp)
<!--/FIGURE-->

OTP（一次性密碼）是發送至用戶設備（通常是手機）的安全令牌，用於驗證其身份。這種動態驗證碼取代了靜態密碼，為防止未經授權的存取提供了額外一層保護。當用戶嘗試登入線上帳戶或執行敏感交易時，系統會提示他們輸入發送至其已註冊設備的唯一時效性驗證碼。這種機制透過大幅增加惡意行為者在獲取用戶憑證後取得未授權存取的難度，從而提升帳戶安全性。

<h2 id="why">為什麼 OTP 簡訊變得如此普及？</h2>

隨著網路攻擊和數據洩露事件的增加，維護和提升數據安全已不再是事後之想，而實施雙重因素驗證（2FA）為此增添了額外一層保護。根據 [Market Research Future](https://www.marketresearchfuture.com/reports/two-factor-authentication-market-3772) 的數據，雙重因素驗證市場規模預計將從 2022 年的 146.5 億美元增長至 2030 年的 446.7 億美元，據稱 OTP 佔市場價值的約 56-60%。

OTP 簡訊的簡易性及其對普遍使用的手機的依賴，促成了其迅速普及。直接在設備上接收驗證碼的便利性使 OTP 簡訊成為對用戶友好的選擇。此外，OTP 簡訊作為防止未授權存取的額外保護層這一認知，進一步推動了其採用。然而，必須認識到，儘管 OTP 簡訊提供了有價值的安全增強，但它們並非無懈可擊，應作為全面安全策略的一部分。

<h2 id="why-not-sms">您為何應該放棄 SMS OTP？</h2>

透過 SMS OTP 驗證用戶身份並不像您想象的那樣安全。除了安全問題之外，還有其他原因讓您考慮其他身份驗證方法。以下是 SMS OTP 驗證的常見安全問題，以及您應該放棄它的原因。

<h3 id="sim-swap">SIM 卡換號安全風險</h3>

SIM 卡換號可讓黑客存取您所有的線上帳戶。黑客可以致電您的行動服務提供商，假冒受害者，並以您的號碼啟動一張新的 SIM 卡。

黑客隨後將能夠突破任何以您的電話號碼作為第二驗證因素的 2FA。由於大多數線上帳戶需要 SMS 驗證，如果黑客能夠攔截該簡訊，他們便可更改用戶的帳戶密碼、存取敏感的用戶數據，如果目標帳戶是網路銀行平台，甚至可以竊取您的金錢。

SIM 卡換號詐騙每年都愈來愈猖獗。例如，根據美國聯邦調查局（FBI）的數據，2021 年網路犯罪分子竊取了高達 [6800 萬美元](https://www.newsweek.com/sim-swap-scam-man-losing-life-savings-sparks-fbi-investigation-1706220)。

<h3 id="ss7-flaw">SS7 技術缺陷</h3>

7 號信令系統（Signaling System No.7），通常稱為 SS7，是所有行動通訊的基礎。SS7 是一個簡單的標準，用於處理簡訊、通話、號碼轉換以及來電轉接等其他電話服務。

那麼，它是如何使 SMS 面臨安全風險的？

該協議存在設計缺陷，黑客可以利用此缺陷攔截通話和簡訊，包括一次性密碼。黑客可以利用 SS7 協議中的安全漏洞，在行動網路上攻擊並攔截 OTP。

最可怕的部分是什麼？這樣做並不困難！

黑客攔截您的簡訊所需的只是一台運行 Linux 的電腦和 SS7 SDK——這可以輕鬆地從網路上下載。

<h3 id="social-engineering">社交工程風險</h3>

在 SMS 安全方面，用戶是安全鏈中最薄弱的環節。

黑客已提升其網路釣魚（一種社交工程形式）技術，並可利用其技能從毫無戒心的個人那裡獲取 OTP。研究顯示，基於 SMS 的詐騙（又稱「釣魚簡訊攻擊」）僅在 <a href="https://www.safetydetectives.com/blog/what-is-smishing-sms-phishing-facts/" target="_blank">2020 年就激增了 328%</a>。

黑客越來越多地使用釣魚簡訊來欺騙毫無戒心的用戶洩露 OTP 驗證碼。企業可以透過教育用戶了解保護這些驗證碼的重要性來消除這些攻擊。另一方面，他們也可以採用一種不會留給黑客任何可竊取內容的驗證方法。

<h3 id="sms-cost">透過 SMS 發送 OTP 的成本相當高昂</h3>

SMS 身份驗證對用戶來說可能是一種較為簡便的驗證方法，但對企業而言卻非常昂貴。企業需要為每一條發送給用戶的簡訊付費，這可能導致每月帳單金額相當可觀。

此外，許多 SMS OTP 即使在支付了每條簡訊費用後仍無法送達。各服務供應商的價格差異顯著，且也取決於發送的簡訊數量。最糟糕的是，因 SMS 身份驗證薄弱而引發的攻擊所造成的損失，對一個企業來說可能是災難性的。

<h3 id="ux">用戶體驗的阻礙</h3>

SMS OTP 對用戶友好，使用戶更容易登入線上應用程式和服務。事實上，全球超過 60% 的用戶使用 SMS OTP 登入他們喜愛的服務。

然而，如果 OTP 未能送達，SMS 驗證可能給用戶帶來極差的體驗。假設您想登入網路銀行支付服務費用，但銀行系統未能或需要數分鐘才能發送 OTP。這不僅可能使您顯得不值得信任，在最壞的情況下甚至可能讓您錯失業務機會。

<h2 id="alternatives">SMS OTP 最佳替代方案（排名）</h2>

幸運的是，有一些安全可靠的 SMS OTP 替代方案可供選擇，以避免與 OTP 相關的所有安全及其他問題。

以下是 SMS OTP 的三種實用升級選項。每個選項以不同方式提升安全性和用戶體驗——選擇其中一種或將它們組合使用以獲得最佳效果。

<h3 id="fido">1) 通行密鑰（WebAuthn/FIDO）——最佳整體選擇：最高安全性且阻力最低</h3>

近期，三大科技巨頭蘋果、微軟和谷歌宣布，他們將<a href="https://www.forbes.com/sites/daveywinder/2022/05/07/apples-stunning-2022-security-pact-with-google-microsoft-revealed/?sh=23e4b32969ca" target="_blank">共同承諾採用 FIDO</a>（Fast ID Online）聯盟標準，使用行動設備進行身份驗證以取代密碼，因為密碼本身存在被破解的固有漏洞。這意味著智慧型手機將作為安全的通行密鑰儲存庫。用戶可以透過單一動作輕鬆存取儲存的通行密鑰，提供他們所具備的東西（生物識別）、他們所知道的東西（PIN 碼或圖案）以及他們所擁有的東西（智慧型手機）。這不僅更加安全，對用戶而言也更加便利，因為他們只需在手機上確認提示即可輕鬆登入任何應用程式或網站。

<a href="/features/passkeys" target="_blank">通行密鑰</a>用存儲在用戶設備上的密碼學金鑰取代一次性驗證碼。沒有任何可釣魚、攔截或洩露的內容，登入只需快速的生物識別或設備 PIN 碼確認即可。

**為何它優於 SMS OTP**

- 從設計上就能**抵禦網路釣魚**；沒有可竊取的驗證碼。
- **沒有交付失敗問題，也無需承擔 SMS 費用。**
- 在支援的設備/瀏覽器上實現**一鍵式用戶體驗**。

**最適合的場景**

- 高價值帳戶（金融、SaaS 管理員、B2B 應用程式）、有重複登入需求的消費者應用程式，以及致力於提升轉換率和安全性的團隊。

**Authgear 如何提供幫助**

- 只需幾分鐘即可**啟用通行密鑰**（基於 FIDO2/WebAuthn）。
- 開箱即用的**跨平台支援**（桌面及行動端）。
- **漸進式推出**：在遷移期間保留密碼/OTP 作為備用方案。

<a href="https://portal.authgear.com/" target="_blank">*立即透過 Authgear 啟用通行密鑰，推出能夠抵禦網路釣魚的登入方式。*</a>

<h3 id="whatsapp">2) WhatsApp OTP——覆蓋範圍最廣且交付成本低於 SMS</h3>

如果您仍希望使用一次性驗證碼，透過 <a href="https://docs.authgear.com/authentication-and-access/authentication/whatsapp-otp-login" target="_blank">WhatsApp</a> 發送通常比 SMS 更可靠且更具成本效益——此外，訊息採用端對端加密。

**為何它優於 SMS OTP**

- **端對端加密通道**相比 SMS 降低了攔截風險。
- 通常比電信 SMS 路由**成本更低且交付率更高**。
- **熟悉的介面**——用戶本來就經常查看 WhatsApp。

**最適合的場景**

- WhatsApp 普及的市場；OTP 量大且對成本敏感的應用程式；以及能從對話式提醒中受益的入門流程。

**Authgear 如何提供幫助**

- **原生 WhatsApp OTP** 登入方法——無需自行建構機器人或額外基礎設施。
- 在 Portal 中**簡單切換**；可與 SMS/電子郵件/通行密鑰並行使用。
- 內建**分析及防濫用**控制機制。

<a href="https://portal.authgear.com/" target="_blank">*透過 Authgear 將 OTP 切換至 WhatsApp，降低成本並提升交付率。*</a>

<h3 id="social-login">3) 社交登入——首次注冊速度最快</h3>

企業越來越多地使用<a href="/zh-hant/post/social-login-guide" target="_blank">社交登入</a>作為 SMS OTP 的替代方案。

讓用戶透過一個按鈕完成注冊/登入（Apple、Google、Facebook、GitHub、LinkedIn、微信等）。它省去了表單和密碼，並可在後續與通行密鑰結合使用以用於回訪登入。

**為何它優於 SMS OTP**

- 比請求並輸入驗證碼**步驟更少**。
- 借助具有強化安全性的主要身份提供商（IdP）的**信任背書**。
- 當用戶同意分享屬性時可獲得**更豐富的個人資料**。

**最適合的場景**

- 消費者應用程式、內容/社區平台、開發者工具，以及任何首分鐘激活率至關重要的轉化漏斗。

**Authgear 如何提供幫助**

- **一個平台，多個提供商**（Apple、Google、Facebook、GitHub、LinkedIn、微信以及企業 IdP）。
- **風險控制及 MFA 附加功能**（例如，鏈接到通行密鑰進行升級驗證）。
- **統一用戶資料庫**——無需處理複雜的自定義 OAuth 流程。

<a href="https://portal.authgear.com/" target="_blank">*透過 Authgear 添加一鍵社交登入，消除注冊阻力。*</a>

<h3 id="compare">快速比較</h3>

<table role="table" aria-label="Alternatives to SMS OTP Comparison" style="width:100%; border-collapse:collapse;">
  <caption style="text-align:left; font-weight:600; margin-bottom:8px;">
    快速比較
  </caption>
  <thead>
    <tr>
      <th scope="col" style="text-align:left; padding:12px; border-bottom:1px solid #e5e7eb;">方法</th>
      <th scope="col" style="text-align:left; padding:12px; border-bottom:1px solid #e5e7eb;">安全性（釣魚/攔截）</th>
      <th scope="col" style="text-align:left; padding:12px; border-bottom:1px solid #e5e7eb;">用戶體驗阻力</th>
      <th scope="col" style="text-align:left; padding:12px; border-bottom:1px solid #e5e7eb;">交付成本</th>
      <th scope="col" style="text-align:left; padding:12px; border-bottom:1px solid #e5e7eb;">依賴條件</th>
      <th scope="col" style="text-align:left; padding:12px; border-bottom:1px solid #e5e7eb;">最適合</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:12px; border-bottom:1px solid #f1f5f9;"><strong>通行密鑰</strong></td>
      <td style="padding:12px; border-bottom:1px solid #f1f5f9;"><strong>最高</strong></td>
      <td style="padding:12px; border-bottom:1px solid #f1f5f9;"><strong>最低</strong>（生物識別/PIN）</td>
      <td style="padding:12px; border-bottom:1px solid #f1f5f9;">無</td>
      <td style="padding:12px; border-bottom:1px solid #f1f5f9;">瀏覽器/設備支援</td>
      <td style="padding:12px; border-bottom:1px solid #f1f5f9;">安全、重複登入；高價值帳戶</td>
    </tr>
    <tr>
      <td style="padding:12px; border-bottom:1px solid #f1f5f9;"><strong>WhatsApp OTP</strong></td>
      <td style="padding:12px; border-bottom:1px solid #f1f5f9;">高於 SMS</td>
      <td style="padding:12px; border-bottom:1px solid #f1f5f9;">低（輸入驗證碼）</td>
      <td style="padding:12px; border-bottom:1px solid #f1f5f9;"><strong>低於 SMS</strong>（通常如此）</td>
      <td style="padding:12px; border-bottom:1px solid #f1f5f9;">WhatsApp 可用性</td>
      <td style="padding:12px; border-bottom:1px solid #f1f5f9;">大規模成本敏感的 OTP；WhatsApp 普及的市場</td>
    </tr>
    <tr>
      <td style="padding:12px;"> <strong>社交登入</strong></td>
      <td style="padding:12px;">高（IdP 支援）</td>
      <td style="padding:12px;"><strong>非常低</strong>（一鍵點擊）</td>
      <td style="padding:12px;">無</td>
      <td style="padding:12px;">第三方 IdP 可用性/政策</td>
      <td style="padding:12px;">最快的首次激活；消費者應用程式</td>
    </tr>
  </tbody>
</table>

<h2 id="authgear">透過 Authgear 實現 WhatsApp OTP 及其他安全身份驗證方法</h2>

SMS OTP 是驗證登入和交易最常見的方式之一。

然而，它們存在重大缺點，包括用戶體驗阻礙，以及 SIM 卡換號和社交工程詐騙的風險。

透過將您的應用程式與 Authgear 整合，您可以實現多種身份驗證方法，包括 WhatsApp OTP、社交登入、生物識別身份驗證等，從而避免與 SMS OTP 相關的所有問題，享受顯著的成本節省，提升應用程式的轉換率，並提高行銷投資回報率。

## **告別脆弱的 SMS 驗證碼。**

****透過 Authgear，您可以在數天內——而非數月——推出**通行密鑰**、**WhatsApp OTP** 和**社交登入**。從通行密鑰開始，獲得安全性和轉換率的最大提升；在 SMS 成本高或不可靠的地方添加 WhatsApp OTP；並保留社交登入用於即時注冊。

[獲取即時演示](/zh-hant/schedule-demo/)，了解您的團隊能夠以多快的速度推出安全、低阻力的登入方式。

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "/post/sms-otp-vulnerabilities-and-alternatives"
      },
      "headline": "OTP 簡訊：它們還可靠嗎？揭露漏洞並探索更安全的替代方案",
      "description": "SMS OTP 還安全嗎？了解 SIM 卡換號、SS7 和釣魚簡訊等風險，並比較更安全的替代方案——通行密鑰、WhatsApp OTP 和社交登入——以及如何透過 Authgear 啟用它們。",
      "image": [
        "https://cdn.prod.website-files.com/60658b47b03f0c77e8c14884/66bcc0e7f890a38e85014014_OTPmessage_featured.jpg"
      ],
      "author": { "@type": "Organization", "name": "Authgear" },
      "publisher": {
        "@type": "Organization",
        "name": "Authgear",
        "logo": {
          "@type": "ImageObject",
          "url": "https://cdn.prod.website-files.com/60658b46b03f0cf83ac1485d/619e6607eb647619cecee2cf_authgear-logo.svg"
        }
      },
      "datePublished": "2022-07-07",
      "dateModified": "2025-09-04",
      "inLanguage": "en",
      "keywords": [
        "SMS OTP vulnerabilities",
        "SMS OTP alternatives",
        "passkeys",
        "WhatsApp OTP",
        "social login",
        "2FA",
        "MFA",
        "WebAuthn",
        "FIDO2"
      ],
      "isAccessibleForFree": true,
      "url": "/post/sms-otp-vulnerabilities-and-alternatives"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "/blog" },
        { "@type": "ListItem", "position": 3, "name": "SMS OTP 還可靠嗎？其漏洞與替代方案", "item": "/post/sms-otp-vulnerabilities-and-alternatives" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "SMS OTP 對於身份驗證是否足夠安全？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SMS OTP 在純密碼的基礎上提升了安全性，但容易受到 SIM 卡換號、SS7 攔截和社交工程（釣魚簡訊）攻擊。對於高風險或高價值的流程，應使用防網路釣魚方法（如通行密鑰），並將 OTP 作為備用方案。"
          }
        },
        {
          "@type": "Question",
          "name": "SMS OTP 最佳替代方案是什麼？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "通行密鑰（WebAuthn/FIDO2）消除了驗證碼，能夠抵抗網路釣魚。如果仍需要驗證碼，WhatsApp OTP 與 SMS 相比可降低交付成本並提高可靠性。社交登入可加快首次注冊速度，並可與通行密鑰結合用於後續登入。"
          }
        },
        {
          "@type": "Question",
          "name": "通行密鑰比 SMS OTP 更好嗎？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "是的。通行密鑰使用公鑰密碼學配合設備生物識別或 PIN，消除了驗證碼交付失敗的問題，並大幅降低網路釣魚風險，與 SMS OTP 相比通常可提高完成率。"
          }
        },
        {
          "@type": "Question",
          "name": "WhatsApp OTP 比 SMS 更安全或更便宜嗎？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "WhatsApp 訊息採用端對端加密，在許多地區的費用比 SMS 低，且交付更可靠。當您仍需要基於驗證碼的身份驗證時，這是一個務實的升級選擇。"
          }
        },
        {
          "@type": "Question",
          "name": "Authgear 是否支援通行密鑰、WhatsApp OTP 和社交登入？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "是的。Authgear 開箱即用支援通行密鑰（WebAuthn/FIDO2）、WhatsApp OTP 和社交登入，讓您可以混合搭配不同方法、逐步推出通行密鑰，並將 OTP 保留為備用方案。"
          }
        }
      ]
    }
  ]
}
</script>
