---
title: "App Store 自 2022 年 6 月 30 日起要求 App 內提供刪除帳號功能"
excerpt: "Apple 將要求 App 必須允許使用者在 App 內發起刪除帳號。了解最新政策內容與你該如何準備。"
coverImage: ./cover.jpg
category: industry
featured: false
metaTitle: "App Store 自 2022 年 6 月 30 日起要求 App 內提供刪除帳號功能"
metaDescription: "Apple 將要求 App 必須允許使用者在 App 內發起刪除帳號。了解最新政策內容與你該如何準備。"
publishedAt: 2022-01-11T10:08:18.211Z
updatedAt: 2026-02-12T02:35:14.207Z
draft: false
---

<script type="application/ld+json">
    {
        "@context":"http://schema.org",
        "@type":"NewsArticle",
        "mainEntityOfPage":{
                            "@type":"WebPage",
                            "@id":"www.authgear.com/post/in-app-account-deletion-required-by-app-store#webpage",
                            "url":"www.authgear.com/post/in-app-account-deletion-required-by-app-store"},
        "headline":"App Store 自 2022 年 6 月 30 日起要求 App 內提供刪除帳號功能",
        "image":{
            "@type":"ImageObject",
            "url":"https://uploads-ssl.webflow.com/60658b47b03f0c77e8c14884/61dd56f4dced153954ddcae9_thom-bradley-A6qNzfJXRGQ-unsplash.jpg",
            "width":1120,
            "height":710
        },
        "datePublished":"2022-01-11",
        "dateModified":"2022-04-07",
        "description":"Apple 將要求 App 必須允許使用者在 App 內發起刪除帳號。了解最新政策內容與你該如何準備。",
        "author":{
            "@id":"https://www.oursky.com/#organization"
        },
        "publisher":{
            "@type":"Organization",
            "name":"Oursky",
            "@id":"https://www.oursky.com/#organization",
            "logo":{
                "@type":"ImageObject",
                "@id":"https://www.oursky.com/#logo",
                "url":"https://oursky.com/assets/img/og-image.png",
                "caption":"Oursky"
              }
        }
    }
    </script>
如果你的 App 上架於 App Store 且允許建立帳號，根據 <a href="https://developer.apple.com/news/?id=i71db0mv" target="_blank">Apple 最新公告</a>，你必須在 2022 年 6 月 30 日前提供使用者在 App 內刪除帳號的完整入口。此要求原先預計 2022 年 1 月 31 日生效，後來延後到 2022 年 6 月 30 日，讓開發者有更多準備時間。最新公告也釐清了先前 <a href="https://developer.apple.com/news/?id=mdkbobfo" target="_blank">公告</a> 引發的幾個疑問。

本文將整理最新刪除帳號要求、2021 與 2022 公告差異，以及可能影響。

<nav id="table-of-content">
<ul>
    <li><a href="#requirement">你需要知道的 App 內刪除帳號要求</a></li>
    <li><a href="#difference">除了延長期限外，最新公告與前次公告有何不同？</a></li>
    <li><a href="#privacy-guidelines">還有哪些隱私相關重點規範要注意？</a></li>
    <li><a href="#privacy-policies">更多資料保護與隱私法規趨勢</a></li>
    <li><a href="#authgear">用 Authgear 簡化刪除帳號流程</a></li> 
</ul>
</nav>

<h2 id="requirement">你需要知道的 App 內刪除帳號要求</h2>

<!--FIGURE-->
![](./figure-1.jpeg)
<!--/FIGURE-->

<strong class="subtitle">我的 App 會受影響嗎？</strong>
    <p>若你的 App 上架於 iOS App Store 且允許使用者建立帳號，就在規範範圍內。</p>
    <strong class="subtitle">截止時間是？</strong>
    <p>App 內刪除帳號原定截止為 2022 年 1 月 31 日，後延至 2022 年 6 月 30 日。</p>
    <strong class="subtitle">規範到底要求什麼？</strong>
    <p>只要 App 允許建立帳號，就應提供使用者可在 App 內完成「刪除帳號與相關資料」的端到端流程。</p><p>
    <strong class="subtitle">如果不遵守會怎樣？</strong>
    雖然 App Store Review Guidelines 並未明確寫出處罰，但不符合要求的 App 可能在 2022 年 6 月 30 日後無法送審更新，甚至有被下架風險。</p>

<div class="cta-v2">
	<h2 class="title cta-split-content-left">還沒準備好 App 內刪除帳號要求？</h2>
  <p class="cta-v2-paragraph">整合 Authgear，幾個步驟即可啟用 App 內刪除帳號</p>
  <a href="/zh-hant/schedule-demo/" target="_blank" class="w-inline-block">
  	<div class="cta-v2-ctabtn button-primary">預約示範

<h2 id="difference">除了延長期限外，最新公告與前次公告有何不同？</h2>

<!--FIGURE-->
![](./figure-2.jpeg)
<!--/FIGURE-->

<a href="https://developer.apple.com/news/?id=mdkbobfo" target="_blank">第一版公告</a>於 2021 年 10 月 6 日發布，內容提到「所有允許建立帳號的 App，都必須讓使用者可在 App 內**發起刪除帳號**」。同時也提醒開發者需檢查地區與在地隱私法規，確保合法合規。

當時「發起（initiate）」一詞較模糊，引發社群爭議。有人認為只提供外部表單連結即可，也有人提出在 App 內放客服電話、嵌入表單、或實作完整刪除流程等方案。此外，大家也關心刪除帳號是否必須同步刪除個資。

在最新公告中，要求已更明確：僅提供「停用／暫停帳號」不足以合規，使用者必須能**刪除帳號及其個人資料**。此外也提醒：

- 刪除帳號選項必須容易在 App 內找到。
- 某些高度監管產業需提供額外支援流程來**確認**並協助刪除。
- App 除了遵守 App Store 規範，也必須遵守所在地法律。

即使期限延後到 2022 年 6 月 30 日，仍有不少 App 尚未完備。

<h2 id="privacy-guidelines">還有哪些隱私相關重點規範要注意？</h2>

除了新刪除帳號要求外，<a href="https://developer.apple.com/app-store/review/guidelines/#5.1.1" target="_blank">App Store Review Guidelines 5.1.1</a> 也包含多項資料蒐集與儲存要求，開發者需特別留意。

### 隱私政策必須易於找到，並清楚說明資料蒐集與儲存方式

隱私政策是讓使用者了解企業如何蒐集、使用、管理，甚至與第三方共享資料的重要聲明。

App Store 不只要求提供隱私政策連結，更要求隱私政策必須：

- 容易被找到
- 明確說明蒐集哪些資料、如何蒐集、如何使用
- 若有第三方使用資料，第三方也必須遵守規範並保護使用者資料
- 說明資料如何保存或刪除，以及使用者如何要求刪除資料

### App 在蒐集資料前必須先取得使用者同意

資料蒐集可幫助企業優化行銷與提供個人化體驗，但部分資料過去可能未經充分同意。現在開發者必須在蒐集資料前取得使用者同意，即使資料可能是匿名的也一樣。此外，App 也應提供易於存取的撤回同意機制，讓使用者真正掌握資料控制權。  
更多內容可參考 <a href="https://developer.apple.com/app-store/review/guidelines/#5.1" target="_blank">Apple App Store Review Guidelines</a>。

<h2 id="privacy-policies">更多資料保護與隱私法規趨勢</h2>

<!--FIGURE-->
![](./figure-3.jpeg)
<!--/FIGURE-->

隨著更多社會與經濟活動轉到線上，使用者向線上服務提供者分享的個資也愈來愈多。同時，使用者更在意企業如何使用資料，並希望有更多控制權。各司法轄區政府因此推出 GDPR、各國資料保護法、加州消費者隱私法（CCPA）等框架，保障基本權利。根據聯合國貿發會（UNCTAD），超過 71% 國家已立法，9% 正在草擬，僅 15% 尚未立法。此外，Google 與 Apple 等大型平台也持續提高隱私要求以建立信任。

因此，開發者必須同時遵守平台規則與在地法規，不只是為了避免罰則，更是為了保護使用者個資並贏得信任。

<h2 id="authgear">用 Authgear 簡化刪除帳號流程</h2>

在 App 內打造完整刪除帳號流程往往耗時，還需要不少驗證與維護成本才能確保運作正確。

<!--FIGURE-->
![](./figure-4.png)
<!--/FIGURE-->

透過 Authgear，你可以幾個步驟就提供使用者主動刪除帳號的能力。同時，App 還能獲得更多驗證與安全功能，讓你不只滿足複雜驗證需求，也能提供更安全的使用者體驗。  
立即<a href="/zh-hant/schedule-demo/" target="_blank">聯絡我們</a>，看看 Authgear 如何幫助你的 App。
