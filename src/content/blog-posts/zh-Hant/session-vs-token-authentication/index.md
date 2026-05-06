---
title: "會話與令牌身份驗證"
h1: "會話與令牌身份驗證：您應該選擇哪一個？"
excerpt: "了解基於會話的身份驗證與基於令牌的身份驗證、cookie 與 JWT、優缺點、CSRF/XSS 權衡以及何時使用每個身份驗證以及範例。"
coverImage: ./cover.jpg
category: highlight
featured: false
metaTitle: "會話與基於令牌的身份驗證：Cookie、JWT 和最佳實踐"
metaDescription: "基於會話的身份驗證使用 cookie 管理伺服器上的狀態，而令牌身份驗證使用無狀態 JWT 跨網域授權使用者。"
publishedAt: 2021-11-25T09:10:30.130Z
updatedAt: 2026-02-28T12:45:07.918Z
draft: false
---


<script type="application/ld+json">
    {
"@context":"http://schema.org",
"@type":"新聞文章",
“mainEntityOfPage”：{
"@type":"網頁",
"@id":"/post/session-vs-token-authentication/#webpage",
“url”：“/post/session-vs-token-authentication”
                        },
"headline":"會話與令牌驗證",
“圖像”：{
"@type":"影像物件",
"url":"https://uploads-ssl.webflow.com/60658b47b03f0c77e8c14884/619f5927d201992550bd2454_session%20vs%20token.jpg",
“寬度”：1223，
“身高”：642
        },
"發佈日期":"2021-11-25",
"修改日期":"2025-09-11",
"description":"了解基於會話的身份驗證與基於令牌的身份驗證、cookie 與 JWT、優缺點、CSRF/XSS 權衡以及何時使用每個身份驗證以及示例。"
    }
    </script>
    
基於會話和基於令牌的身份驗證之間的選擇定義了應用程式的可擴展性和安全性。會話身份驗證是有狀態的，依賴伺服器端記憶體和 cookie，這使其成為單域 Web 應用程式的理想選擇。相較之下，基於令牌的身份驗證 (JWT) 是無狀態且適合行動裝置的，透過授權標頭傳遞憑證。本指南在安全性（CSRF 與 XSS）、效能和實現複雜性方面比較了這兩種方法，以幫助您為堆疊選擇正確的架構。

在網路上進行使用者身份驗證有兩種主要方法：會話和令牌。

在確定哪種方法更好之前，了解它們的工作原理至關重要。此外，以下哪種身份驗證方法最適合您的網站或應用程式？讓我們來看看。

## **什麼是身份驗證？ **

從最簡單的層面來說，身份驗證是在您嘗試存取系統時驗證您的身份的過程。請注意，身份驗證與授權不同，授權涉及授予存取權限。更複雜地說，它還涉及設備身份的驗證。例如，當您或您的裝置嘗試連接儲存在伺服器上的資料庫時，可能需要進行身份驗證。

## **什麼是會話身份驗證**

長期以來，基於會話的身份驗證一直是預設方法。使用這種方法，會話是一個小文件，儲存有關使用者的信息，包括唯一的會話 ID、登入時間和過期時間等，由伺服器創建，並在您登入後儲存在資料庫中。傳統上，會話 ID 將儲存在瀏覽器中的 cookie 中。只要您保持登入狀態，cookie 就會根據後續請求傳送到伺服器。

收到 cookie 後，伺服器會將其包含的會話 ID 與儲存在其記憶體中的資訊進行比較。這允許伺服器驗證您的身份並根據相應的狀態提供回應。

### **會話身份驗證的工作原理**

以下是會話身份驗證驗證工作原理的典型流程的摘要。

1. 您嘗試使用您的憑證登入。
1. 您的登入憑證經過驗證，伺服器會為您建立一個帶有會話 ID 的會話。該會話儲存在資料庫中。
1. 您的會話 ID 會作為 cookie 儲存在您的瀏覽器（客戶端）中。
1. 根據後續請求，您的 cookie 將根據伺服器中儲存的會話 ID 進行驗證。如果匹配，則該請求被視為有效並被處理。
1. 如果您登出應用程序，客戶端和伺服器端的會話 ID 都會被銷毀。

以下是基於會話的身份驗證請求的範例：

### **會話驗證的優點**

根據您的使用案例，使用 cookie 進行會話驗證可以提供許多好處。

#### **方便使用**

如果您正在開發基於 Web 的應用程序，則用戶端瀏覽器支援 cookie。無需使用任何 JavaScript 來創建互動性。

#### **存儲大小**

會話 cookie 的大小自然較小。這種小尺寸使其能夠有效地在客戶端進行儲存。

### **會話身份驗證的限制**

Many factors make the limitations of session authentication more pronounced. These factors include the need to <a href="https://dzone.com/articles/cookies-vs-tokens-the-definitive-guide" target="_blank">decouple</a> the front end from the backend and the rise of single-page applications in recent times.

#### **可擴展性有限**

由於 Cookie 儲存在伺服器的記憶體中，因此本質上難以擴展，尤其是在系統上同時存在太多使用者的情況下。然而，這與基於令牌的身份驗證完全相反。請繼續閱讀以了解更多資訊。

#### **多域挑戰**

The use of cookies for authentication can be very problematic where APIs requests are sent to services of different domains. This is because cookies typically work on a <a href="https://sherryhsu.medium.com/session-vs-token-based-authentication-11a6c5ac45e4" target="_blank">single domain</a> or subdomains.

#### **安全**

Cookies are relatively more susceptible to Cross-Site Request Forgery (XSRF or CSRF) attacks and <a href="https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html" target="_blank">protective measures</a> should be employed in your servers.

### **會話驗證的最佳實踐**

1. Keep Session IDs long and <a href="https://beaglesecurity.com/blog/article/session-security.html" target="_blank">random</a> to prevent brute force attacks. The recommended length is 128 bits.
1. 記錄會話 ID，無需敏感或使用者特定資料。理想情況下，ID 應該是隨機且無意義的字串。
1. 對所有基於會話的應用程式強制執行強制 HTTPS 通訊。
1. 建立具有安全性和僅限 HTTP 屬性的 Cookie。
1. 安全地管理您的會話。例如，當您關閉瀏覽器、逾時或從不同位置登入或登出時，您可以銷毀所有會話。

### **何時使用會話驗證**

會話驗證通常適用於同一根網域中的網站。

<div class="cta-v2">
	<h2 class="title cta-split-content-left">Provide Secure & Frictionless Authentication with Authgear</h2>
  <p class="cta-v2-paragraph">Build your app, not another login</p>
  <a href="/talk-with-us" target="_blank" class="w-inline-block">
  	<div class="cta-v2-ctabtn button-primary">Get Demo

## **什麼是令牌認證**

Note that talks about Token Authentication typically refer to the JSON Web Token. Nowadays, it’s very common for web applications to use the JSON Web Token (JWT Token) rather than sessions for authentication. This can perhaps be linked to the rise of <a href="https://dzone.com/articles/cookies-vs-tokens-the-definitive-guide" target="_blank">Single Page Applications</a> (SPAs) in recent times. When user attempts to log in, the Server creates a JWT Token with a secret and sends it to the Client for Token-based apps. The JWT is stored by the client and included in the header with every request. When a request is made from a Client, the Server validates the JWT before sending a response, which is what differentiates token authentication from session authentication. When the server receives the token, it does not look up for the user's session ID in the database for authentication. The server simply checks whether the token is valid or not.

### **令牌身份驗證的工作原理**

讓我們探討一下令牌身份驗證通常如何運作。

1. 您嘗試使用您的使用者憑證登入。
1. 伺服器驗證您的憑證，如果有效，則會傳回簽章令牌。
1. 然後簽名的令牌儲存在客戶端。它可以存储在本地存储、会话存储或 cookie 中。
1. 此令牌會作為「授權標頭」放置在標頭中，以便後續向伺服器發出請求。然後，伺服器會對標頭中的令牌進行解碼，如果有效則對其進行處理。
1. 如果您從應用程式登出，令牌將從客戶端刪除，從而阻止進一步的互動。

Web api 驗證請求通常如下所示：

> 取得 /api_path HTTP/1.1

> 主機：yourdomain.com

> Authorization: Bearer <AUTHGEAR_ACCESS_TOKEN>

### **令牌認證的優點**

令牌身份驗證改善了 cookie 身份驗證的限制，並提供了更多功能。

#### **移動就緒**

雖然本機行動平台可能無法與 cookie 無縫結合，但令牌在 iOS 和 Android 上更容易實現。對於不一定有 cookie 儲存的物聯網應用程式或服務實施令牌也更容易。

#### **提高速度和性能**

使用 Cookie 驗證，您的後端必須執行 SQL 資料庫或非 SQL 替代資料庫的查找。此查找將花費比解碼令牌更多的時間。同樣，由於您可以在 JWT 中存儲權限級別和角色等附加數據，因此您基本上可以節省進行其他查找調用所需的時間和資源。

#### **可擴展性和無狀態性**

JWT 令牌身份驗證的最大吸引力之一是它是無狀態的且高度可擴展。後端不需要儲存JWT token，每一個都包含了驗證所需的全部資料。使用這種身份驗證方法，伺服器的主要任務是在成功登入請求時對令牌進行簽名，並驗證傳入的令牌是否有效。在某些情況下，您可以使用 Authgear 等第三方服務來頒發令牌，隨後由您的伺服器進行驗證。

#### **支援多個域**

雖然 cookie 綁定到單一網域，但您可以將令牌傳送到您想要的任何網域。想像一個單頁應用程式向多個服務發出多個請求，可以使用相同的令牌在這些伺服器中進行身份驗證。

### **令牌認證的限制**

令牌身份驗證提供了許多好處，但並不完美，因為根據您的用例，您可能會遇到一些缺點。

#### **JWT 代幣的大小**

與 cookie 不同，JWT 令牌的大小要大得多，這是因為它們包含更多資訊。

#### **代幣可能被劫持**

使用 JWT 令牌進行身份驗證很常見。身份驗證狀態在客戶端中處理。令牌可能會被駭客劫持，並且它們在伺服器上更難失效。

### **令牌身份驗證的最佳實踐**

1. 驗證您的 JWT 令牌並拒絕那些不符合您的簽名演算法的令牌。您還應該驗證所有聲明、發行者、到期日和受眾。
1. 確保為令牌設定過期時間。如果您未能明確設定令牌的到期時間，則它可能會被設定為永遠有效。
1. 您應該避免對令牌進行硬編碼，因為它最終可能使駭客輕鬆破壞您的應用程式。
1. 強制執行 HTTPS 通訊並避免透過非安全連線發送令牌，因為令牌可能會被攔截和洩漏。

### **何時使用令牌身份驗證**

這種身份驗證方法最適合行動應用程式或單頁 Web 應用程式。這裡的關鍵傳輸機制是授權標頭中的存取權杖。

## 會話與令牌身份驗證（並排）

下表總結了會話身份驗證和令牌身份驗證之間的差異。

<div class="ag-table-wrap">
  <table class="ag-table">
    <colgroup>
      <col style="width:20%">
      <col style="width:40%">
      <col style="width:40%">
    </colgroup>
    <thead>
      <tr>
        <th>Aspect</th>
        <th>Session-based</th>
        <th>Token-based</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>State</strong></td>
        <td>Server stores a session (ID in cookie).</td>
        <td>Client holds an access token (JWT or opaque).</td>
      </tr>
      <tr>
        <td><strong>Storage</strong></td>
        <td><code>HttpOnly</code>, <code>SameSite</code> cookie.</td>
        <td>Prefer <code>HttpOnly</code> cookie; avoid long-lived tokens in JS storage.</td>
      </tr>
      <tr>
        <td><strong>Scalability</strong></td>
        <td>Needs shared session store/replication.</td>
        <td>Stateless fits APIs; opaque tokens may need introspection.</td>
      </tr>
      <tr>
        <td><strong>Revocation</strong></td>
        <td>Easy (invalidate server session).</td>
        <td>Short TTL + refresh rotation or introspection/deny-list.</td>
      </tr>
      <tr>
        <td><strong>CSRF risk</strong></td>
        <td>Cookies are sent automatically on cross-site requests → <em>CSRF risk</em>.  
            Mitigate with <code>SameSite=Lax/Strict</code> + CSRF tokens (or double-submit) and check Origin/Referer.</td>
        <td>If tokens are sent via <em>Authorization header</em>, they aren’t auto-sent cross-site → <em>low CSRF risk</em>.  
            If tokens are in cookies, treat like sessions: use <code>SameSite</code> + CSRF tokens.</td>
      </tr>
      <tr>
        <td><strong>XSS risk</strong></td>
        <td><code>HttpOnly</code> cookie is not readable by JS (harder to steal), but XSS can still perform actions as the user.  
            Mitigate with CSP, output encoding, input sanitization, and dependency hygiene.</td>
        <td>Tokens in JS-readable storage (e.g., <code>localStorage</code>) can be <em>exfiltrated by XSS</em>.  
            Prefer <code>HttpOnly</code> cookies or very short-lived access tokens + refresh rotation; add CSP and strict sanitization.</td>
      </tr>
      <tr>
        <td><strong>Use when…</strong></td>
        <td>Single-domain web apps, server-rendered flows.</td>
        <td>APIs, SPAs, mobile, multi-domain or microservices.</td>
      </tr>
    </tbody>
  </table></div>

*注意：*「CSRF 風險」是指瀏覽器自動傳送憑證； 「XSS 風險」指任意腳本竊取/使用憑證。
使用「HttpOnly」cookie 可以減少令牌盜竊，但不能消除 XSS——與 CSP 和清理相結合。如果必須使用 JS 存儲，請保持令牌短暫並輪換。

## **常見誤解**

雖然傳統上網站使用帶有 cookie 的會話身份驗證，而行動應用程式/SPA 使用帶有授權標頭的令牌身份驗證，但情況並非一定如此。 Authorization Header和Cookies是關於傳輸機制的。令牌和會話本質上是關於處理授權狀態的位置，無論是在伺服器端還是在客戶端。例如，伺服器可以透過 cookie 發出 JWT 令牌，或期望在「Authorization」標頭中提供有狀態會話 ID。

## 常見問題解答

### 基於令牌的身份驗證比基於會話的身份驗證更好嗎？

兩者都不是“總是更好”。對單域 Web 應用程式使用會話；當您需要無狀態擴展時，請對 API/移動/跨域使用令牌。

### 會話令牌與 JWT 相同嗎？

不。會話令牌通常是伺服器端會話資料的 ID。 JWT 是一種獨立的不記名令牌；它可能不需要伺服器狀態。

### 我應該在哪裡儲存令牌？

首選具有短 TTL 和 SameSite 的 httpOnly cookie。避免在“localStorage”中使用長期存在的令牌。

### 如何撤銷令牌？

使用短 TTL + 刷新輪換（或具有內省/拒絕列表的不透明令牌）。

<script type="application/ld+json">
{
"@context":"https://schema.org",
"@type":"常見問題頁面",
「主要實體」：[
{"@type":"Question","name":"基於令牌的身份驗證比基於會話的身份驗證更好嗎？","acceptedAnswer":{"@type":"Answer","text":"兩者都不是更好。對單域 Web 應用程式使用會話；對無狀態擴展有幫助的 API、移動和跨域令牌。"
{"@type":"Question","name":"會話令牌與 JWT 相同嗎？","acceptedAnswer":{"@type":"Answer","text":"不。會話令牌通常標識伺服器端會話資料。JWT 是一種獨立的承載令牌，可能不需要伺服器狀態。"}},,
{"@type":"Question","name":"我應該在哪裡存儲令牌？","acceptedAnswer":{"@type":"Answer","text":"更喜歡壽命較短的 httpOnly cookie 和 SameSite。避免在 localStorage 中使用長期令牌},如果使用，請保持短期令牌並通過安全刷新令牌}},"
{"@type":"Question","name":"如何撤銷令牌？","acceptedAnswer":{"@type":"Answer","text":"對於令牌，使用短 TTL 加上刷新令牌輪換或令牌內省/拒絕列表。對於會話，在伺服器上無效。"}}
 ]
}
</script>

## **結束語：您應該使用哪種身份驗證？ **

確定使用哪種身份驗證方法是開發行動應用程式或單頁 Web 應用程式的關鍵因素。雖然使用行動就緒的身份驗證方法進行擴展的需求將吸引許多開發人員使用令牌，但 cookie 的簡單性可能會吸引其他人。最終，有關 cookie 與令牌身份驗證方法的問題將取決於正在建置的應用程式或 Web 平台的類型。

Authgear 等身份驗證解決方案提供者提供了滿足所有用例的全面解決方案。例如，[Authgear](/) 提供基於 cookie 和基於令牌的身份驗證，以適應各種 Web 和行動應用程式。它提供了開箱即用的身份驗證解決方案，可在不影響安全性的情況下提升流暢的用戶體驗。 [請求演示](https://oursky.typeform.com/to/ybfyNrs​​k) 查看 Authgear 今天的實際應用。
