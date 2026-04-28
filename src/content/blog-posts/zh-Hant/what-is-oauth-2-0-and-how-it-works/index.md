---
title: "OAuth 2.0 如何運作：開發者指南（2026）"
excerpt: "OAuth 2.0 是「使用 Google 登入」與各大 API 背後的標準。本文用圖解與程式碼完整說明其運作方式。"
coverImage: ./cover.webp
category: engineering
featured: false
readTime: 8
metaTitle: "OAuth 2.0 如何運作：開發者指南（2026）"
metaDescription: "一步一步了解 OAuth 2.0——授權碼流程、grant type、token，以及它與 OIDC、JWT 的差異，含程式碼範例。"
publishedAt: 2023-08-30T13:51:45.552Z
updatedAt: 2026-03-30T18:20:17.804Z
draft: false
---

每次你按下「使用 Google 登入」，或把第三方 App 連到你的 GitHub 帳號，背後都在跑 OAuth 2.0。它是一個協定，讓使用者可以授權 App 存取自己的資料，而不需要交出密碼。

這篇指南會帶你完整理解 OAuth 2.0 如何運作：逐步拆解授權流程、說明各種 grant type 的用途、比較它與 OIDC、JWT 的差別，以及各自的使用時機。

## 什麼是 OAuth 2.0？

OAuth 2.0 是一個開放式授權框架，讓使用者可以把自己在某個服務上的帳號，授予第三方應用程式有限存取權限——而不需要分享密碼。

你可以把它想像成飯店房卡系統。你不會把萬能鑰匙（密碼）交給房客；飯店（授權伺服器）會發一張有時效、只能開特定門（scope）的房卡（access token）。

OAuth 2.0 是 *授權（authorization）*，不是驗證（authentication）。它回答的是「這個 App 可以存取什麼？」而不是「這個使用者是誰？」（後者由 [OpenID Connect](/zh-Hant/post/oidc-vs-saml) 在 OAuth 之上補齊。）

## OAuth 2.0 的四個角色

在看流程之前，先認識參與的四方角色：

<div class='ag-table-wrap'>
<table class='ag-table'>
  <thead>
    <tr>
      <th>角色</th>
      <th>說明</th>
      <th>範例</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Resource Owner</strong></td>
      <td>擁有資料的使用者</td>
      <td>你（正在登入的人）</td>
    </tr>
    <tr>
      <td><strong>Client</strong></td>
      <td>發出存取請求的應用程式</td>
      <td>想讀取你 Google Calendar 的待辦 App</td>
    </tr>
    <tr>
      <td><strong>Authorization Server</strong></td>
      <td>在使用者同意後簽發 token</td>
      <td>Google 的 OAuth 伺服器（accounts.google.com）</td>
    </tr>
    <tr>
      <td><strong>Resource Server</strong></td>
      <td>託管受保護資料的伺服器</td>
      <td>Google Calendar API</td>
    </tr>
  </tbody>
</table></div>

## OAuth 2.0 授權碼流程：逐步解析

最常見也最安全的 OAuth 2.0 流程是 **Authorization Code flow**。以下是它一步步發生的事：

<!--FIGURE-->
![](./figure-1.webp)
<!--/FIGURE-->

### Step 1: Client 將使用者導向 Authorization Server

流程從使用者點下「使用 Google 登入」（或類似按鈕）開始。Client 會把使用者導向授權伺服器，URL 類似：

```

https://accounts.google.com/o/oauth2/v2/auth?
  client_id=YOUR_CLIENT_ID
  &redirect_uri=https://yourapp.com/callback
  &response_type=code
  &scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly
  &state=random_csrf_token
  &code_challenge=BASE64URL(SHA256(code_verifier))
  &code_challenge_method=S256

```

關鍵參數：

<ul>
  <li><code>client_id</code> — 向授權伺服器識別你的應用程式</li>
  <li><code>redirect_uri</code> — 使用者同意後要被導回的位置</li>
  <li><code>scope</code> — 你請求的權限範圍（例如 <code>calendar.readonly</code>）。注意：若在 scope 加上 <code>openid</code>，就會在 OAuth 2.0 上啟用 <a href='/zh-Hant/post/oidc-vs-saml'>OpenID Connect</a>，適合你同時需要識別使用者時。</li>
  <li><code>state</code> — 用來防止 CSRF 攻擊的隨機值</li>
  <li><code>code_challenge</code> — <a href='/zh-Hant/post/pkce-in-oauth-2-0-how-to-protect-your-api-from-attacks'>PKCE 擴充</a>的一部分（public client 必備）</li>
</ul>

### Step 2: 使用者登入並同意授權

授權伺服器會顯示登入頁與同意畫面——例如「此 App 想存取你的電子郵件與個人資料，是否允許？」——使用者可選擇允許或拒絕。

### Step 3: Authorization Server 回傳授權碼

使用者同意後，授權伺服器會導回你的 `redirect_uri`，並附上一個短時效 authorization code：

```

https://yourapp.com/callback?code=AUTH_CODE_HERE&state=random_csrf_token

```

這個 code 是暫時性的（通常 60–120 秒過期）且只能使用一次。它不是 access token——你的伺服器仍需將它交換成 token。

### Step 4: Client 以授權碼交換 Access Token

你的伺服器會對 token endpoint 發出後端 POST 請求——這在 server-side 進行，因此 client secret 不會暴露在瀏覽器：

```

const response = await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    code: 'AUTH_CODE_HERE',
    redirect_uri: 'https://yourapp.com/callback',
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code_verifier: codeVerifier, // PKCE
  }),
});

const { access_token, refresh_token, expires_in } = await response.json();
// Note: refresh_token is optional — not all servers issue one.
// For Google, you need to pass access_type=offline to receive a refresh_token.

```

授權伺服器會回傳：

<ul>
  <li><strong>access_token</strong> — 代表使用者呼叫 API 的憑證</li>
  <li><strong>refresh_token</strong> — 當 access token 過期時可換新（不需使用者重新登入）。不一定會回傳，取決於伺服器與請求 scope。</li>
  <li><strong>expires_in</strong> — access token 幾秒後過期</li>
</ul>

### Step 5: 使用 Access Token 呼叫 Resource Server

```

const userInfo = await fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
});

const calendars = await userInfo.json();
// { kind: 'calendar#calendarList', items: [...] }

```

Resource server 會驗證 token 並回傳受保護資料。當 access token 過期時，你可用 refresh token 靜默取得新 token，而不用再次提示使用者登入。

## OAuth 2.0 Grant Types

上面的 Authorization Code flow 只是 OAuth 2.0 多種 grant type 之一。每種都對應特定場景：

<div class='ag-table-wrap'>
<table class='ag-table'>
  <thead>
    <tr>
      <th>Grant Type</th>
      <th>使用情境</th>
      <th>狀態</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Authorization Code + PKCE</strong></td>
      <td>Web、行動 App、SPA——任何面向使用者的應用程式</td>
      <td>✅ 推薦</td>
    </tr>
    <tr>
      <td><strong>Client Credentials</strong></td>
      <td>Machine-to-machine（M2M）——不涉及使用者</td>
      <td>✅ 推薦</td>
    </tr>
    <tr>
      <td><strong>Device Code</strong></td>
      <td>智慧電視、CLI 工具——沒有瀏覽器的裝置</td>
      <td>✅ 推薦</td>
    </tr>
    <tr>
      <td><strong>Implicit</strong></td>
      <td>舊式 SPA——token 直接在 redirect 回傳</td>
      <td>❌ 避免使用——已被 Auth Code + PKCE 取代</td>
    </tr>
    <tr>
      <td><strong>Resource Owner Password</strong></td>
      <td>App 直接收集帳號密碼</td>
      <td>❌ 避免使用——已被 Auth Code + PKCE 取代</td>
    </tr>
  </tbody>
</table></div>

若想更深入了解各 grant type 的差異與使用時機，可參考這篇：[OAuth 2.0 grant types](/zh-Hant/post/common-oauth-2-0-grant-types)。

## OAuth 2.0 vs OpenID Connect (OIDC)

這是最常見的混淆點之一。短版如下：

<ul>
  <li><strong>OAuth 2.0</strong> 處理的是 <em>授權</em>——「這個 App 可以存取什麼？」</li>
  <li><strong>OpenID Connect (OIDC)</strong> 處理的是 <em>驗證</em>——「這個使用者是誰？」</li>
</ul>

OIDC 建立在 OAuth 2.0 之上。它在標準 OAuth 流程中加入 `id_token`（含使用者身分資訊的 JWT）、`/userinfo` endpoint，以及標準化的 `openid` scope。

實務上：當你在 OAuth 2.0 請求加入 `scope=openid`，就是在用 OIDC。若只請求 `scope=read:email`（沒有 `openid`），則是純 OAuth 2.0。

<div class='ag-table-wrap'>
<table class='ag-table'>
  <thead>
    <tr>
      <th></th>
      <th>OAuth 2.0</th>
      <th>OpenID Connect</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>目的</strong></td>
      <td>授權（權限委派）</td>
      <td>驗證（身分確認）</td>
    </tr>
    <tr>
      <td><strong>回傳 token</strong></td>
      <td>Access token</td>
      <td>Access token + ID token</td>
    </tr>
    <tr>
      <td><strong>使用者資訊</strong></td>
      <td>未標準化</td>
      <td>標準化的 <code>/userinfo</code> endpoint</td>
    </tr>
    <tr>
      <td><strong>適用情境</strong></td>
      <td>把 API 存取權授予另一個 App</td>
      <td>讓使用者可以「登入」你的 App</td>
    </tr>
  </tbody>
</table></div>

現代實作通常兩者一起用。若想看與 SAML 的更深入比較，可參考 [OIDC vs SAML](/zh-Hant/post/oidc-vs-saml)。你也可以使用 [OIDC Discovery Endpoint Explorer](/zh-Hant/tools/oidc-discovery-endpoint) 檢查任一 OIDC 供應者設定。

## OAuth 2.0 vs JWT

OAuth 2.0 與 JWT 經常一起出現，但它們是不同層次的概念：

<ul>
  <li><strong>OAuth 2.0</strong> 是一個 <em>協定</em>——定義授權流程如何運作</li>
  <li><strong>JWT (JSON Web Token)</strong> 是一種 <em>token 格式</em>——定義如何把 claim 編碼成精簡、可簽章字串</li>
</ul>

JWT 常常 *被用作* OAuth 2.0 的 access token 或 ID token，但 OAuth 2.0 並不強制 JWT。OAuth 2.0 的 access token 也可以是 opaque random string——resource server 再向 authorization server 驗證即可。

如果你的 OAuth 2.0 access token 是 JWT，你可以本地解碼驗簽，不必額外網路呼叫。若是 opaque token，通常需要呼叫 authorization server 的 introspection endpoint 才能驗證。

## Scopes：控制授予哪些權限

Scope 會精準定義 client 能做什麼。它是授權請求裡的空白分隔字串：

```

scope=openid email profile calendar.readonly

```

使用者會在同意畫面看到這些 scope 並選擇是否同意。簽發出的 access token 也會受這些 scope 限制——即使 resource server 本來可能允許更高權限。

好的 scope 設計符合最小權限原則：只要求真正需要的權限。例如請求 `calendar.readonly` 而不是 `calendar`，可讓使用者清楚知道你不會修改行事曆。

## PKCE：Public Client 必備

若你的 client 是行動 App、單頁應用（SPA），或任何無法安全保存 client secret 的應用，必須使用 **PKCE**（Proof Key for Code Exchange）。Public client 無法安全保存 secret，因為程式碼會下發到使用者裝置——任何人都可能檢視 App bundle 或瀏覽器 JS 抽出硬編碼 secret。

PKCE 透過下列機制防止授權碼攔截攻擊：client 先產生隨機 `code_verifier`，再雜湊成 `code_challenge` 並隨授權請求送出。之後用授權碼換 token 時，client 再送出原始 verifier，證明它就是啟動該流程的同一方。

可參考完整教學：[PKCE 在 OAuth 2.0 中如何運作](/zh-Hant/post/pkce-in-oauth-2-0-how-to-protect-your-api-from-attacks)。

## 常見 OAuth 2.0 錯誤與避免方式

<ul>
  <li><strong>未驗證 <code>state</code> 參數</strong> — 一定要比對是否與你送出的值一致，以防 CSRF 攻擊</li>
  <li><strong>把 access token 存在 localStorage</strong> — 建議用 httpOnly cookie 或 server-side session；localStorage 可被 JavaScript 存取，容易受 XSS 影響</li>
  <li><strong>在 SPA 使用 Implicit grant</strong> — 請改用 Authorization Code + PKCE；Implicit 已被淘汰有其原因</li>
  <li><strong>未做 refresh token rotation</strong> — rotation 代表每次使用 refresh token 都會簽發新 token 並使舊 token 失效。若 token 被竊用，下一次你 App 合法使用時就能偵測異常並撤銷 session。</li>
  <li><strong>請求過度寬泛的 scope</strong> — 只請求必要權限；越精準的權限越容易取得使用者同意</li>
</ul>

## 不必承擔 OAuth 2.0 的實作複雜度

從零實作 OAuth 2.0，代表你要自己處理 token 儲存、refresh 邏輯、PKCE、state 驗證、scope 管理與各種安全邊界情境。對多數團隊來說，使用現成驗證平台通常更實際。

[Authgear](/zh-Hant/) 提供完整符合 OAuth 2.0 與 OIDC 的授權伺服器，包含預建登入 UI、token 管理、refresh rotation，以及開箱即用的社群登入供應者（Google、Apple、Facebook）。你可以不用自建整套基礎設施，就取得可上線的 OAuth 2.0 實作。

## 總結

關於 OAuth 2.0 如何運作，你只要記住以下重點：

<ul>
  <li>OAuth 2.0 是授權委派——使用者可授權 App 代表自己操作，而不需分享密碼</li>
  <li>在 2026 年，幾乎所有面向使用者的 App 都應採用 Authorization Code + PKCE</li>
  <li>Access token 短時效；refresh token 讓你可無感更新</li>
  <li>OAuth 2.0 負責授權；若也需要驗證身分，加入 OIDC（<code>scope=openid</code>）</li>
  <li>JWT 是常與 OAuth 2.0 搭配的 token 格式，不是它的替代品</li>
</ul>
