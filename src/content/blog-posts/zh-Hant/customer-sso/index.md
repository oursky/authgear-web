---
title: "什麼是 Customer SSO？為什麼你該導入？"
h1: "什麼是 Customer SSO？它如何運作？"
excerpt: "了解 Single Sign-On 對客戶體驗與企業營運的價值，打造一致且低摩擦的登入體驗。"
coverImage: ./cover.png
category: industry
featured: false
metaTitle: "什麼是 Customer SSO？它如何運作？"
metaDescription: "Customer SSO 讓使用者以一組憑證登入多個應用，改善體驗、降低密碼疲勞，並集中安全治理。"
publishedAt: 2023-03-02T05:32:25.324Z
updatedAt: 2026-02-28T12:51:35.509Z
draft: false
---

<script type="application/ld+json">
    {
        "@context":"http://schema.org",
        "@type":"NewsArticle",
        "mainEntityOfPage":{
                            "@type":"WebPage",
                            "@id":"/post/customer-sso#webpage",
                                                        "url":"/post/customer-sso"
                        },
        "headline":"什麼是 Customer SSO？為什麼你該導入？",
        "image":{
            "@type":"ImageObject",
            "url":"https://uploads-ssl.webflow.com/60658b47b03f0c77e8c14884/64003098ce03bfd484c8fdbc_customer-sso.png",
            "width":1223,
            "height":581
        },
        "datePublished":"2023-03-02",
        "dateModified":"2022-03-02",
        "description":"了解 Single Sign-On 對客戶體驗與企業營運的價值，打造一致且低摩擦的登入體驗。",
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
    
Customer Single Sign-On（SSO）是一種驗證方法，讓使用者只需用一組憑證登入一次，即可存取多個彼此獨立的應用程式或服務。這個流程透過中央 Identity Provider（IdP）驗證使用者身分，並向各個已連接的 Service Provider 發出安全且可信的 Token。

對企業而言，導入 Customer SSO 非常重要，因為它能消除登入摩擦與密碼疲勞，進而提升轉換率、降低流失率。統一登入體驗也能帶來集中化資料洞察，並透過把分散的驗證資料庫整併為單一事實來源，大幅降低 IT 管理成本。

<nav id="table-of-content">
    <ul>
        <li><a href="#def">什麼是 Single Sign-On（SSO）？</a></li>
        <li><a href="#customer-sso">Customer SSO 如何運作？</a></li>
        <li><a href="#why">為什麼要為客戶導入 SSO？</a>
            <ul>
                <li><a href="#friction">降低使用者摩擦</a></li>
                <li><a href="#insights">取得更完整洞察</a></li>
                <li><a href="#cost">節省營運成本</a></li>
                <li><a href="#conversion">提升轉換率</a></li>
                <li><a href="#churn">降低流失率</a></li>
            </ul>        
        </li>
        <li><a href="#authgear">用 Authgear 快速導入 Customer SSO</a></li>
    </ul>
</nav>

<h2 id="def">什麼是 Single Sign-On（SSO）？</h2>

Single Sign-On（SSO）是一種驗證方式，讓使用者只需一組憑證就能存取多個應用程式或網站。最常見的 SSO 形式是 <a href="/features/social-login" target="_blank">社群登入</a>，例如 Google 與 Facebook 提供的登入方式。不過，我們這裡討論的類型稍有不同：它不是連到社群平台，而是同一企業底下多個線上平台共用登入。

許多應用程式提供多種服務，但若每項服務都要分別登入，對使用者來說非常惱人。Customer SSO 透過單一登入完成所有服務驗證，打造更無縫的一致體驗。

<h2 id="customer-sso">Customer SSO 如何運作？</h2>

你可能會好奇整體是如何運作的，尤其是安全面向。其實在商業應用中，Customer SSO 有一套簡單且安全的使用流程：

1. 首先，使用者進入想要存取的應用程式或網站，我們稱它為「Service Provider」。
1. 接著，Service Provider 會把包含部分使用者資訊（例如電子郵件）的 Token 送到 SSO 系統，作為驗證請求的一部分。這個 SSO 系統扮演 Identity Provider 的角色，也就是集中維護授權政策的核心節點。

SSO 常見疑慮之一，是如何讓多個可能採用不同系統或語言的平台彼此協作。Identity Provider 負責協定轉換，並避免平台之間切換時出現問題。它就像中介者，確保整體體驗順暢且穩定。

1. Identity Provider 會利用 Service Provider 傳來的 Token，檢查使用者是否已在另一個（已連接）應用完成驗證。若已驗證，系統就會直接授權 Service Provider，流程可跳到第 5 步。
1. 若使用者尚未登入，系統會要求其登入，並由 Identity Provider 驗證憑證。登入方式很多元，可用帳號密碼，也可加入 <a href="/features/whatsapp-otp" target="_blank">One-Time Password</a>（OTP）等方式。Authgear 亦提供多種 <a href="/features/passwordless-authentication" target="_blank">無密碼</a>功能，兼顧易用性與安全性。
1. Identity Provider 驗證完成後，會把 Token 回傳給 Service Provider，確認驗證成功。
1. 此 Token 會經由使用者瀏覽器傳遞給 Service Provider。
1. Service Provider 依據它與 Identity Provider 在初始設定時定義的規則，驗證這個 Token。
1. 最終，使用者取得 Service Provider 的存取權限。

看起來步驟不少，但對使用者而言幾乎只是一瞬間。若你仍在問「SSO 是怎麼運作的？」最重要的理解是：它透過單一 Identity Provider 集中使用者驗證，再讓同一公司底下的多個 Service Provider 連接到這個中心，因此得以實現單一登入。

<h2 id="why">為什麼要為客戶導入 SSO？</h2>

<!--FIGURE-->
![](./figure-1.png)
<!--/FIGURE-->

導入 Customer SSO 不只對使用者有利，對你這個服務提供者也同樣有利。以下是原因：

<h3 id="friction">降低使用者摩擦</h3>

疫情讓使用者對線上客戶體驗的期待明顯提高。人們比以往更難容忍複雜的數位流程。把「每次使用服務都要面對的登入流程」簡化，就是打造無縫體驗的第一步。透過 Customer SSO，驗證被簡化成一組可在中央登入入口使用的憑證，客戶不必再被多組登入搞得一頭霧水。

近期 <a href="https://www.salesforce.com/resources/research-reports/state-of-the-connected-customer/" target="_blank">研究</a>也顯示，當顧客與企業互動時，非常重視一致性。SSO 透過集中化登入流程，並在所有服務間提供一致體驗，直接滿足這項需求。

對使用者而言，更順暢的體驗代表更高滿意度，這也會直接反映在服務提供者品牌形象上。這種易用性的提升，讓使用者更容易存取你的網站與 App，進而提升整體互動程度。進入門檻越低，顧客越可能對品牌產生正向印象、願意持續使用，甚至推薦給朋友。這對生意只有好處。

<h3 id="insights">取得更完整洞察</h3>

統一登入檔案不只帶來更好的使用者體驗，也能協助企業更深入掌握使用者在平台上的行為。Authgear 提供 Customer SSO 的 <a href="/solutions/customer-identity-and-access-management" target="_blank">CIAM 解決方案</a>，可把使用者在不同應用上的資料與活動集中管理。

這讓企業能看見使用者在網站與 App 的完整行為脈絡。這種累積資料能產出更具可執行性的客戶洞察，並最終幫助你提供更個人化的體驗。這種競爭優勢不容忽視。

當你掌握某個人如何使用不同平台的完整資訊時，要做出有力且策略性的決策會容易得多。你可以辨識哪些人只使用你服務的一個區塊、跨平台互動頻率如何、不同客群整體行為有哪些差異。這類資料對行銷而言價值極高，也能持續推動業務優化與成長。

<h3 id="cost">節省營運成本</h3>

對同時營運多平台的企業來說，維護多套驗證流程與資料庫成本很高。把它們簡化為單一登入架構，可大幅降低成本。

單一登入不只讓客戶更輕鬆，對企業也同樣有利。使用者資料不會重複分散，所有內容可在同一處管理。這能砍掉大量不必要支出；從管理角度看，也更容易維護。系統越不割裂，修正錯誤與推動更新就越簡單，進而節省時間與金錢。

此外，導入 Customer SSO 後，受益的不只 IT 團隊，客服團隊也能鬆一口氣。當使用者只需記住一組憑證，就比較不會因忘記密碼或登入問題而產生大量抱怨；即便有問題，也更容易快速處理。

<h3 id="conversion">提升轉換率</h3>

要讓使用者不只註冊一項服務，而是多項服務，從來都不簡單。不過，一個強而有力的誘因就是：讓流程越簡單越好。SSO 帶來的低摩擦登入流程，幾乎是提升客戶轉換率的保證，而且提升的不只是單一服務，而是你所有產品線。

當你讓使用者能以單一登入進入所有平台，就能鼓勵他們從初始興趣延伸到更多服務。Google 就是典型案例：它利用簡單的 Gmail 帳號登入，帶動使用者使用 Google Docs、Drive 等其他應用。把你的平台想像成同一棟建築裡的多個房間：如果進入其中一間就能通行所有房間，人們自然更願意探索。

SSO 的獨特之處在於，它能提升平台間的一致性，不只讓使用體驗更無縫，也讓你更容易把客戶轉化為多項（甚至全部）服務的使用者。

<h3 id="churn">降低流失率</h3>

惱人的登入流程是高流失率的重要成因。若存取網站或 App 太花時間、要求太多，使用者很快就會不耐煩並離開。Customer SSO 直接對準這個問題，透過最小化需要記住的憑證數量來降低摩擦。

使用者不必再煩惱多組密碼，也不必苦想哪個密碼對應哪個服務，一切都簡化為單一登入。這讓流程更容易、壓力更低，也實質移除許多原本會勸退使用者的登入阻力。此外，如果 SSO 再搭配生物辨識、Passkey 等無密碼驗證方式，整體登入體驗會更流暢。

密碼疲勞是真實存在的客戶痛點。很多時候，只要不能輕鬆存取帳號，使用者就會直接離開。把存取簡化為一組憑證，有助於顯著降低這種情況發生頻率。

<h2 id="authgear">用 Authgear 快速導入 Customer SSO</h2>

透過 Authgear 導入 Customer SSO，可建立更無縫、具成本效益的使用體驗，讓使用者保持黏著，同時在過程中自然接觸你更多服務。

我們的 SSO 解決方案不只容易整合至你的系統，也提供多種 <a href="/features/passkeys" target="_blank">驗證方式</a> 來保護登入安全，包括 <a href="/features/passwordless-authentication" target="_blank">無密碼</a> 選項與 <a href="/zh-hant/post/what-is-multi-factor-authentication-mfa" target="_blank">雙因素驗證</a>，讓你和客戶都更安全。

點擊<a href="/schedule-demo/" target="_blank">這裡</a>預約 Demo，或點擊<a href="https://accounts.portal.authgear.com/signup" target="_blank">這裡</a>立即註冊。你的客戶正在等你。
