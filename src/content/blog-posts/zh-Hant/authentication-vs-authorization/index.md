---
title: "身份驗證與授權：一張表中的差異"
excerpt: "透過一張簡單的表格詳細了解身分驗證和授權這兩個重要的安全流程之間的差異。 "
coverImage: ./cover.jpeg
category: industry
featured: false
metaTitle: "身份驗證與授權：一張表中的差異"
metaDescription: "透過一張簡單的表格詳細了解身分驗證和授權這兩個重要的安全流程之間的差異。 "
canonicalUrl: /zh-Hant/post/authentication-vs-authorization
publishedAt: 2023-01-13T05:44:08.288Z
updatedAt: 2026-02-12T02:33:17.656Z
draft: false
---

<script type="application/ld+json">
    {
        "@context":"http://schema.org",
        "@type":"NewsArticle",
        "mainEntityOfPage":{
                            "@type":"WebPage",
                            "@id":"/post/authentication-vs-authorization#webpage",
														"url":"/post/authentication-vs-authorization"
                        },
        "headline":"Authentication vs. Authorization: The Differences in One Table",
        "image":{
            "@type":"ImageObject",
            "url":"https://uploads-ssl.webflow.com/60658b47b03f0c77e8c14884/63c0e95df02e2dc8b17205cc_authn-authz-featured.jpeg",
            "width":1223,
            "height":583
        },
        "datePublished":"2023-01-13",
        "dateModified":"2022-01-13",
        "description":"Learn more about the differences between authentication and authorization, two important security processes, with one simple table.",
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
在確保資料安全時，很容易混淆身份驗證和授權。簡而言之，身份驗證是驗證用戶身份並透過各種方法確認用戶身份的過程。授權是此步驟的後續步驟，但操作方式截然不同，因為它根據使用者的確切授權等級授予對不同資源的存取權限。

身份驗證和授權之間的區別並不復雜，但了解這些過程可以更輕鬆地做出有關資料和網路安全系統的明智決策。在本文中，我們將研究身份驗證和授權的不同之處以及它們如何運作的一些範例。

<nav id="table-of-content">
    <ul>
        <li><a href="#authn">什麼是身份驗證 (AuthN)？</a></li>
        <li><a href="#authz">什麼是授權（AuthZ）？</a></li>
        <li><a href="#differences">認證和授權的區別</a></li>
        <li><a href="#authn-methods">認證方式</a>
            <ul style="margin-top:15px;margin-bottom:0">
                <li><a href="#knowledge">你所知道的（知識認證因素）</a></li>
                <li><a href="#possession">您擁有什麼（擁有驗證因素）</a></li>
                <li><a href="#inherence">你是什​​麼（固有的認證因素）</a></li>
            </ul>
        </li>
    </ul>
</nav>

<h2 id="authn">什麼是身份驗證 (AuthN)？</h2>

身份驗證就是檢查您向安全系統提供的身份的真實性。想像一下，當您在機場通過安檢時，首先檢查的就是您的臉部與身分證上的臉部。身份驗證的工作原理類似，唯一的區別是，您可能會被要求輸入密碼或掃描指紋，而不是提供 ID。然後，身份驗證軟體將使用您提供的憑證，並將其與資料庫中儲存的資訊進行檢查以進行驗證。

<h2 id="authz">什麼是授權（AuthZ）？</h2>

現在您的身分已得到驗證，下一個問題是：您到底有權存取什麼？繼續以旅行為例，這將是機場安檢人員檢查您的國籍和簽證的部分，即您是否有權進入該國。

大多數資料系統的工作原理類似，都存在某些邊界或存取級別，只有特權人員才能進入。這些至少將基本使用者與具有管理員存取權限的使用者分開。一旦您的身分得到確認，授權將用於根據預設規則確認您有權存取哪些資源或應用程式。

<h2 id="differences">認證和授權的區別</h2>

<div id="table-container">
    <table id="auth-table">
        <thead>
            <tr>
                <td></td>
                <td>驗證</td>
                <td>授權</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>目的</td>
                <td>驗證使用者身份</td>
                <td>授予或拒絕對資料或資源的訪問</td>
            </tr>
            <tr>
                <td>是如何完成的</td>
                <td>使用者需要提供不同的身份驗證因素來證明他們的身份。</td>
                <td>檢查是否應根據策略和規則授予權限</td>
            </tr>
            <tr>
                <td>資料如何傳輸？</td>
                <td>透過ID令牌</td>
                <td>透過訪問令牌</td>
            </tr>
            <tr>
                <td>用戶看得到嗎？</td>
                <td>是的</td>
                <td>不</td>
            </tr>
            <tr>
                <td>用戶可以更改嗎？</td>
                <td>在一定程度上</td>
                <td>不</td>
            </tr>
        </tbody>
    </table>

由於身份驗證和授權通常在安全系統中協同工作，因此很容易使它們混亂。需要注意的是，身份驗證通常需要在授權之前進行，因為為了判斷使用者是否有權存取事物，首先必須驗證其身分。例如，如果您登入公司資料庫，系統需要先確認您是誰，然後才能確定您有權開啟哪些文件。

從更技術的角度來看，身份驗證和授權之間的區別在於身份驗證資料通常透過 ID 令牌傳輸，而授權資訊則透過存取令牌完成。

除了執行不同的功能之外，身分驗證與授權的操作方式也存在顯著差異。身份驗證通常對使用者可見，無論是透過輸入密碼還是生物識別資訊的方式，而身份驗證通常不可見。這是因為授權是由所使用的平台的公司或主機建立的。他們的預設設定決定在遠離使用者視線的情況下是否允許他們存取某些方面。

與授權不同，身份驗證也可以由使用者管理。通常會提供一些選項，允許使用者選擇他們喜歡的身份驗證方法，無論是密碼還是 OTP，而授權又超出了使用者的控制範圍。

如果您從所有這一切中了解什麼，那就是身份驗證和授權涵蓋了資料安全的兩個截然不同的方面。驗證身份然後存取這兩個步驟都非常重要，並且不能取代另一個步驟。

<h2 id="authn-methods">認證方式</h2>

<!--FIGURE-->
![](./figure-1.jpeg)
<!--/FIGURE-->

如今大多數企業都選擇使用 <a href="/zh-Hant/post/what-is-multi-factor-authentication-mfa" target="_blank">多重身份驗證</a> （MFA）以更強有力地防禦網路安全威脅。

身份驗證要求使用者提供一定的身份驗證因素來驗證其身份。身份驗證的三種主要形式是繼承、佔有和知識，每種形式都依賴使用者的某些內容來驗證其身分：

<h3 id="knowledge">你所知道的（知識認證因素）</h3>

這種類型的身份驗證依賴使用者所知道的資訊來確認他們的身份。最常見的範例是使用者名稱和密碼。其他常識因素包括安全問題和密碼。知識因素被認為是最不安全的，因為它們很容易被猜測或竊取。

<h3 id="possession">您擁有什麼（擁有驗證因素）</h3>

擁有身份驗證因素的最簡單的例子是您的前門鑰匙 - 您必須隨身攜帶它才能進入您的家。這種身份驗證因素還可以採用多種其他形式，無論是透過金鑰或卡片等實體安全物品，還是您在裝置上收到的物品，例如 <a href="/zh-Hant/features/whatsapp-otp" target="_blank">WhatsApp OTP</a> 和 <a href="/zh-Hant/post/sms-otp-vulnerabilities-and-alternatives" target="_blank">簡訊一次性密碼</a>.

<h3 id="inherence">你是什​​麼（固有的認證因素）</h3>

這聽起來可能有點不祥，但「繼承認證因素」只是一個大標題。 <a href="/zh-Hant/features/biometric-authentication" target="_blank">生物辨識認證</a> 我們中的許多人每天在掃描臉部或指紋來存取手機時都會使用它。無論是掃描您的臉部、視網膜還是指紋，此身份驗證因素都依賴您的身體或生物識別數據來驗證您的身份。

## 從哪裡開始

當涉及身份驗證與授權時，它們都是資料安全系統的關鍵部分。然而，沒有特殊程度的存取權限可以繞過一個簡單的事實，即大多數軟體或應用程式需要先進行身份驗證的某些方面，然後再進行其他操作。這是兩個工具之間的主要區別。
