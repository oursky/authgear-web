---
title: "密碼噴射：它是什麼以及如何預防？"
excerpt: "了解有關密碼噴射的更多資訊以及使用 Authgear 保護使用者免受密碼噴射的不同方法。"
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "密碼噴射：它是什麼以及如何預防？"
metaDescription: "了解有關密碼噴射的更多資訊以及使用 Authgear 保護使用者免受密碼噴射的不同方法。"
publishedAt: 2023-02-02T08:15:27.184Z
updatedAt: 2026-02-12T02:36:01.268Z
draft: false
---

<script type="application/ld+json">
    {
        "@context":"http://schema.org",
        "@type":"NewsArticle",
        "mainEntityOfPage":{
                            "@type":"WebPage",
                            "@id":"/post/password-spraying#webpage",
														"url":"/post/password-spraying"
                        },
        "headline":"Password Spraying: What It Is and How to Prevent It?",
        "image":{
            "@type":"ImageObject",
            "url":"https://uploads-ssl.webflow.com/60658b47b03f0c77e8c14884/63db7073e804179d2a58cdca_spraying.jpg",
            "width":1223,
            "height":583
        },
        "datePublished":"2023-02-02",
        "dateModified":"2022-02-02",
        "description":"Learn more about password spraying and the different methods to protect your users from it with Authgear.",
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
    
    
網路犯罪的急劇增長是前所未有的，預計到 2025 年，世界將因攻擊者而損失驚人的<a href="https://www.analyticsinsight.net/online-industries-most-targeted-by-cyber-attacks/" target="_blank">10.5 兆美元</a>。網路犯罪分子在尋求利用受害者時不乏可供選擇的方法。但最成功的是密碼。多達 <a href="https://financesonline.com/password-statistics/" target="_blank">81%</a> 的業務資料外洩都是由不良密碼造成的。

特別是，攻擊者喜歡使用一種稱為密碼噴射的技術，其成功率高得驚人。那麼，什麼是密碼噴射，組織如何防止它？本指南概述了此攻擊以及使用者和組織可以採取的保護其數位資產免受密碼噴射攻擊的步驟。

讓我們深入研究吧！

<nav id="內容表">
<ul>
<li><a href="#def">什麼是密碼噴射？ </a></li>
<li><a href="#steps">密碼噴射是如何運作的？ </a></li>
<li><a href="#diff">密碼噴射與密碼噴射憑證填入</a></li>
<li><a href="#solution">如何防止密碼噴灑</a>
<ul>
<li><a href="#org">防止密碼噴灑的組織策略</a></li>
<li><a href="#user">來自用戶方</a></li>
</ul>
</li>
</ul>
</導航>

<h2 id="def">什麼是密碼噴射？ </h2>

<!--圖-->
![](./figure-1.webp)
<!--/圖-->

密碼噴射是一種暴力攻擊，攻擊者試圖透過重複輸入通用密碼來存取同一服務或平台上的多個帳戶。它與傳統的暴力攻擊不同，僅使用一個密碼。這種技術已被攻擊者所普及，因為它可以使攻擊者在很長一段時間內不被發現。

但是什麼讓密碼噴射攻擊如此有效呢？主要原因是大多數網路使用者喜歡使用易於記住的簡單密碼。事實上，密碼「123456」的使用人數令人震驚，<a href="https://www.ncsc.gov.uk/news/most-hacked-passwords-revealed-as-uk-cyber-survey-exposes-gaps-in-online-security" target="_blank">2300萬人</a>。

此外，許多人在多個帳戶和服務中重複使用相同的密碼。不幸的是，攻擊者很清楚這一事實，他們透過一次攻擊猜測常見密碼來利用這一點。如果犯罪者能夠存取您公司的幾個帳戶，他們就可能能夠查看財務、客戶資料等重要資訊。其後果可能是毀滅性的。

<h2 id="steps">密碼噴射是如何運作的？ </h2>

密碼噴射攻擊通常會經歷三個階段。以下是它們的詳細介紹。

### 第 1 階段：攻擊者購買或建立使用者名稱列表

在發動密碼噴射攻擊之前，攻擊者必須取得或建立連結到目標帳戶的使用者名稱清單。攻擊者可以透過多種不同的方式來解決這個問題。例如，他們可能會使用公開資訊（例如公司名錄）來編制清單。

或者，攻擊者可以從地下市場購買清單。目前在暗網上出售的憑證數量超過 <a href="https://www.computerweekly.com/news/252485713/Over-15-billion-credentials-for-sale-on-dark-web" target="_blank">150 億</a> 憑證，取得發動攻擊所需的資訊輕而易舉。

### 第 2 階段：網路犯罪者取得常用密碼列表

有了使用者名稱列表，攻擊者就會開始編制密碼列表，他們可以將這些密碼與這些使用者名稱一起使用來破壞目標帳戶。不幸的是，這些類型的攻擊中使用的大多數密碼都非常容易獲得。維基百科和其他報告等來源發布了數千個常見密碼。駭客也可能嘗試使用有關目標的公開資訊（例如出生日期、最喜歡的足球隊和寵物名稱）來猜測密碼。

### 第 3 階段：攻擊者嘗試使用者名稱-密碼組合

最後，有了使用者名稱和密碼列表，攻擊者就可以開始攻擊。目標是在不引起懷疑或觸發帳戶鎖定策略的情況下存取盡可能多的帳戶。在此階段，攻擊者將嘗試每個使用者名稱-密碼組合，如果不起作用，則快速轉向下一個使用者名稱。大多數攻擊者使用自訂腳本自動執行此過程，使其更難檢測。攻擊結束時，某些帳戶可能已洩露，犯罪分子可能會存取敏感的公司資料。

<h2 id="diff">密碼噴塗與密碼噴塗憑證填入</h2>

另一種常見的攻擊形式是<a href="/post/credential-stuffing" target="_blank">憑證填充</a>，它依賴於許多人對多個帳戶使用相同的登入憑證這一事實。憑證填充涉及將這些經過完全驗證的使用者名稱和密碼組合（通常透過資料外洩取得）放入另一個系統的存取入口網站中。由於使用者在不同平台上重複使用密碼，這種惡意技術增加了繞過身份驗證措施的可能性。

與撞庫相比，密碼噴射攻擊涉及測試大量帳戶中的一些常見密碼。

因此，憑證填充涉及使用一組憑證來存取其他系統或應用程序，而密碼噴灑則需要對不同的使用者名稱使用通用密碼。

<h2 id="solution">如何防止密碼噴灑</h2>

防止密碼噴射攻擊是個人使用者和整個組織的責任。以下詳細介紹了各方可以採取哪些措施來確保安全。

<h3 id="org">防止密碼噴灑的組織策略</h3>

成功的違規行為可能會給公司帶來災難性的後果。 <a href="https://worldr.com/blog/60-of-small-businesses-fail-after-a-cyberattack.-why" target="_blank">60%</a> 的小型企業在安全漏洞發生後六個月內倒閉。他們根本無法承受與資料外洩相關的法律、聲譽、財務和營運成本。因此，企業也必須採取主動措施來防範自動攻擊，尤其是密碼噴灑。幸運的是，公司可以使用許多工具來降低密碼噴灑的風險，包括：

#### 多重身份驗證 (MFA)

<a href="/post/what-is-multi-factor-authentication-mfa" target="_blank">多重身分驗證</a> (MFA) 是指一種身分驗證技術，系統會提示使用者提供兩項或多項證據以驗證其身分。這意味著即使犯罪分子設法猜測使用者的登入憑證，如果沒有額外的安全代碼，他們也無法存取該帳戶。

<!--圖-->
![](./figure-2.webp)
<!--/圖-->

例如，MFA 可以要求使用者先輸入使用者名，然後提供額外的身份驗證層，例如 <a href="/zh-hant/post/sms-otp-vulnerabilities-and-alternatives" target="_blank">SMS OTP</a> 或生物辨識驗證（例如人臉或指紋辨識）。

#### 金鑰

金鑰是一種高級身份驗證形式，允許使用者無需複雜的密碼即可登入 Web 應用程式。使用金鑰，用戶只需提供用戶名即可註冊。此後，他們將透過 PIN 或生物識別資訊進行身份驗證，就像解鎖手機時所做的那樣。這種新的身份驗證方法<a href="/features/passkeys" target="_blank">不再需要密碼</a>。

#### 生物辨識認證

<a href="/post/biometric-authentication" target="_blank">生物辨識身分驗證</a>依賴個人的身體特徵（例如指紋或臉部）來存取系統。它已成為最常見的身份驗證方法之一，並且比傳統密碼更安全，因為固有因素很難偽造，這使其成為最可靠的身份驗證形式之一。此外，生物辨識身分驗證快速且易於使用，在不影響使用者體驗的情況下增加了額外的安全層。

<div class="cta-v2">
<h2 class="title cta-split-content-left">使用 Authgear 實作無密碼</h2>
<p class="cta-v2-paragraph">讓 Authgear 保護您的使用者免於密碼噴灑</p>
<a href="/schedule-demo/" target="_blank" class="w-inline-block">
<div class="cta-v2-ctabtn button-primary">請求演示

<h3 id="user">來自用戶方</h3>

#### 使用密碼管理器

獨特的密碼很難猜測或破解。密碼管理器可以幫助使用者產生包含大小寫字母、特殊字元和數字的密碼。這些工具也非常適合安全地儲存您的密碼，因此您不必依賴自己的記憶。

#### 不同帳號使用不同密碼

不要在多個帳戶中使用相同的密碼。這樣做會使您所有帳戶的安全面臨風險，因為犯罪分子如果成功破解一個帳戶，就可以輕鬆存取所有帳戶。

#### 使用多重身份驗證

多重身份驗證 (MFA) 要求使用者在登入帳戶時提供兩種或多種身份驗證形式。這確保即使攻擊者設法猜測用戶的登入憑證，如果沒有額外的安全代碼，他們也無法存取其帳戶。

## 立即建立針對密碼噴射的防禦措施

密碼噴射會對公司和個人造成嚴重損害。這就是為什麼實施必要的安全措施來防止這種情況很重要。一般來說，成功的密碼噴射攻擊所帶來的風險很大程度上取決於公司中被攻擊的個人在組織中扮演的角色。使用者的特權越高，攻擊期間存取的資料越重要，成功的攻擊對您的業務造成災難性影響的風險就越高。

好消息是您可以保護您的組織免受密碼噴灑。透過<a href="/" target="_blank">Authgear</a>，您可以使用一系列高度先進的安全功能來保護企業免受密碼噴射和撞庫攻擊。生物辨識登入、Whatsapp OTP 作為 MFA 以及支援金鑰的無密碼登入是 Authgear 的一些出色工具，可確保防範這些攻擊。

<a href="/schedule-demo/" target="_blank">立即與我們聯繫</a>，了解我們如何幫助您建立針對潛在威脅的強大防禦。
