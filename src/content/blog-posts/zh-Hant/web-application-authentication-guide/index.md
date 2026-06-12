---
title: "從登入到鎖定：構建安全的身份驗證應用程式"
excerpt: "掌握構建安全身份驗證應用程式的藝術。了解身份驗證方法、存取權杖，並使用 Authgear 實現強健的安全性。您的用戶數據安全保護全面指南。"
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "從登入到鎖定：構建安全的身份驗證應用程式"
metaDescription: "掌握構建安全身份驗證應用程式的藝術。了解身份驗證方法、存取權杖，並使用 Authgear 實現強健的安全性。您的用戶數據安全保護全面指南。"
publishedAt: 2022-06-24T06:05:49.487Z
updatedAt: 2026-02-12T02:33:54.722Z
draft: false
---

作為網頁開發者，您知道在應用程式中實現身份驗證是多麼普遍的需求。這也無可厚非——它確實很重要：我們必然希望知道是誰在發出請求、管理多重交易，並保護用戶的私人資訊。

在本指南中，您將了解關於網頁應用程式身份驗證的所有知識、它如何在您的網頁應用程式中運作，以及如何整合 Authgear Web SDK 以快速安全地實現身份驗證。

<nav id="table-of-content">
    <ul>
        <li><a href="#definition">什麼是已驗證身份的應用程式？</a></li>
        <li><a href="#methods">網頁應用程式中的身份驗證方法</a>
            <ul style="margin-top:15px; margin-bottom:15px">
                <li><a href="#cookie">基於 Cookie 的身份驗證</a></li>
                <li><a href="#token">基於令牌的身份驗證</a></li>
                <li><a href="#third-party">第三方存取（OAuth、API 令牌）</a></li>
                <li><a href="#openid">OpenID Connect（OIDC）</a></li>
                <li><a href="#saml">安全聲明標記語言（SAML）</a></li>
            </ul>
        </li>
        <li><a href="#access-token">存取權杖如何在網頁應用程式中運作</a></li>
        <li><a href="#authgear">如何使用 Authgear 在您的網頁應用程式中實現身份驗證？</a></li>
    </ul>
 </nav>

在開始討論身份驗證在網頁應用程式中如何運作的所有技術細節之前，讓我們先透過一個範例來了解身份驗證究竟是什麼。

<h2 id="definition">什麼是已驗證身份的應用程式？</h2>

**已驗證身份的應用程式是一種在授予存取其功能和數據之前驗證用戶身份的軟體應用程式。** 這一重要的安全措施確保只有經過授權的個人才能與應用程式互動。

身份驗證涉及確認用戶是否就是其所聲稱的那個人。這通常透過要求用戶提供憑證（如用戶名、密碼或生物識別數據）來實現。一旦驗證通過，應用程式會發出數位令牌或會話 Cookie，允許用戶存取受保護的資源。

從本質上說，已驗證身份的應用程式充當一個守門人，保護敏感資訊並防止未授權存取。

<h2 id="methods">網頁應用程式中的身份驗證方法</h2>

應用程式可以透過多種方式進行身份驗證。讓我們逐一了解：

<h3 id="cookie">基於 Cookie 的身份驗證</h3>

Cookie 通常用於處理網頁應用程式中的用戶身份驗證。以下是一個說明其運作方式的示意圖：

網頁應用程式中基於 Cookie 的身份驗證運作原理：

<!--FIGURE-->
![](./figure-1.webp)
<!--/FIGURE-->

<p>如您所見，客戶端瀏覽器向伺服器發送登入憑證的 <span class="inline-code">POST</span> <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST" target="_blank">請求</a>。伺服器隨後以 <span class="inline-code">HTTP 200 OK</span> 狀態碼驗證發送的憑證。它在伺服器端建立一個會話 ID 並透過 <span class="inline-code">Set-Cookie: session=…</span> 將其返回給客戶端。在後續請求中，伺服器會驗證 Cookie 中的會話 ID，並處理相應的請求。當您登出應用程式時，您的會話 ID 將從客戶端和伺服器端同時清除。</p>

<h3 id="token">基於令牌的身份驗證</h3>

隨著越來越多的單頁應用程式（SPA）的出現，這種方法正在興起。

實現基於令牌的身份驗證最常見的方法之一是使用 <a href="https://jwt.io/" target="_blank">JSON Web Tokens（JWT）</a>。JWT 是一種開放標準，定義了一種以 JSON 物件形式在各方之間安全傳輸資訊的自包含方式。

基於令牌的身份驗證運作原理：

<!--FIGURE-->
![](./figure-2.webp)
<!--/FIGURE-->

當從客戶端瀏覽器接收到憑證後，伺服器會驗證這些憑證，並生成一個包含所有用戶資訊的已簽名 JWT。令牌是無狀態的，因此它永遠不會儲存在伺服器上。在後續請求中，令牌被傳遞到伺服器，然後在伺服器端進行解碼以驗證其有效性。

<h3 id="third-party">第三方存取（OAuth、API 令牌）</h3>

第三方存取身份驗證可以透過兩種方式運作：

- **透過 API 令牌**：這通常與我們上面討論的 JWT 相同，令牌被發送到授權標頭，並在某個 API 閘道器進行處理以驗證用戶身份。
- **透過開放式身份驗證（OAuth）**：顧名思義，<a href="https://oauth.net/" target="_blank">OAuth</a> 是一種開放協議，允許來自網頁、行動和桌面應用程式的安全身份驗證方法。此協議以用戶身份對伺服器進行身份驗證。

<h3 id="openid">OpenID Connect（OIDC）</h3>

基於 OAuth 2.0 協議，OpenID Connect（OIDC）透過在其之上提供授權層來簡化用戶身份驗證。此層使應用程式能夠驗證用戶身份，並獲取超越基本身份驗證的重要用戶資訊。OIDC 提供多項優勢，包括：

- **單點登入（SSO）：** 用戶可以使用來自可信身份提供商（IdP）（如 Google 或 Facebook）的現有憑證登入您的應用程式，無需為您的應用程式設置單獨的登入憑證。這簡化了登入流程並改善用戶體驗。
- **降低安全風險：** 透過利用既有的 IdP 進行身份驗證，OIDC 減輕了在您的應用程式伺服器上管理用戶憑證的負擔。這最大程度地降低了數據洩露和未授權存取的風險。****
- **豐富的用戶資訊：** OIDC 允許應用程式從 IdP 請求並接收比用戶名更廣泛的用戶資訊。此資訊可以包括個人資料詳情、電子郵件地址和偏好設定，有潛力豐富您應用程式中的用戶體驗。

<h3 id="saml">安全聲明標記語言（SAML）</h3>

安全聲明標記語言（SAML）是一種基於 XML 的標準，用於在線上系統之間交換身份驗證和授權數據。它是一種單點登入（SSO）和聯合身份管理解決方案，專為企業環境設計。在 SSO 場景中，用戶只需登入一次中央身份提供商（IdP），即可存取多個安全應用程式，而無需為每個應用程式重新輸入憑證。SAML 依靠 XML 聲明在 IdP、請求存取的服務提供商（SP，即您的網頁應用程式）以及其他可信方之間安全地傳達身份驗證和授權數據。這使用戶能夠在企業網路或雲端環境中的不同應用程式之間無縫切換，而不會遇到單獨的登入提示。

了解更多關於 OIDC 和 SAML 的資訊：

[OIDC 與 SAML：解碼 SSO 之爭（以及為何這對您的企業至關重要）](/zh-hant/post/oidc-vs-saml)

<h2 id="access-token">存取權杖如何在網頁應用程式中運作？</h2>

每當我們談論身份驗證時，都會聽到「存取權杖」這個詞。但它們到底是什麼呢？讓我們來弄清楚。

### 什麼是存取權杖？

<blockquote class="def-quote"><span style="font-weight:700">存取權杖</span>是用於驗證網頁應用程式存取特定資源的代碼。</blockquote>

這些存取權杖以 <a href="https://jwt.io/" target="_blank">JSON Web Tokens（JWT）</a> 的形式提供，在傳輸過程中透過安全的 <a href="https://developer.mozilla.org/en-US/docs/Glossary/https" target="_blank">HTTPS 協議</a> 傳遞。

它們用於基於令牌的身份驗證類型。當您成功通過身份驗證後，網頁應用程式會收到一個存取權杖。此後每當在應用程式上調用 API 時，此令牌將作為憑證傳遞。

網頁令牌的基本結構由以下幾個以點（.）分隔的部分組成：

1.**標頭（Header）**：這又由兩部分組成；令牌類型（如 JWT）和所使用的令牌簽名演算法（如 SHA256）。以下是一個範例：

```

{
	<span class="property">"alg"</span>: <span class="string">SHA256"</span>,
	<span class="property">"typ"</span>: <span class="string">"JWT"</span>
}
	
```

2. **有效載荷（Payload）**：這包含聲明（Claims）。聲明是關於某個實體（如用戶）及一些附加數據的陳述。這些聲明可以是已註冊的、公開的或私有的。以下是一個有效載荷範例：

```

{
	<span class="property">"sub"</span>: <span class="string">"1234567890"</span>,
	<span class="property">"name"</span>: <span class="string">"John Doe"</span>
	<span class="property">"admin"</span>: <span class="property">true</span>
}

```

3. **簽名（Signature）**：在這裡，已編碼的標頭和有效載荷連同一個密鑰、以及標頭的演算法組合在一起並進行簽名以建立簽名。例如，以下是使用 HMAC SHA256 演算法的簽名代碼：

```

<span class="constant">HMACSHA256</span>(
<span class="function">base64UrlEncode</span>(header) <span class="operator">+</span> <span class="string">"."</span> <span class="operator">+</span>
<span class="function">base64UrlEncode</span>(payload),
secret)

```

將它們組合在一起，輸出的網頁令牌是三個以點分隔的 Base64-URL 字串：

```

eyJhbGci0iJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIi0iIxMjMONTY30DkwIiwibmFtZSI6IkpvaG4
gRG91IiwiaXNTb2NpYWwiOnRydWV9.
4pcPyMD0901PSyXnrXCjTwXyr4BsezdI1AVTmud2fU4

```

### **網頁令牌的運作原理**

<p>
    以下是這些令牌在網站和網頁應用程式中的運作方式：
    </p><ol>
        <li>當用戶使用其憑證（如電子郵件/密碼）成功登入時，將返回一個網頁令牌。</li>
        <li>此後，每當用戶想要存取網頁應用程式上受保護的路由或資源時，用戶代理就會在授權標頭中發送此令牌，如：<span class="inline-code">Authorization: Bearer token</span></li>
    </ol>
    <p>如您所見，它使用 Bearer 模式，這是一個通常由伺服器在回應登入請求時生成的加密字串。</p>
    <ol start="3">
        <li>接下來，伺服器的路由將檢查授權標頭中提供的存取權杖是否有效。</li>
        <li>如果有效，則允許用戶存取所請求的受保護路由。</li>
    </ol>
<p></p>

以下是一個示意圖，說明如何從授權伺服器獲取存取權杖以存取受保護路由：

<!--FIGURE-->
![](./figure-3.webp)
<!--/FIGURE-->

1. 客戶端向身份驗證伺服器請求授權。
1. 授權完成後，授權伺服器向應用程式返回一個存取權杖。
1. 應用程式使用該令牌透過某個 API 存取受保護的路由。

現在您已了解存取權杖是什麼、在何處使用以及如何在網頁應用程式中運作，讓我們嘗試了解一下其中一個身份驗證提供商——Authgear。

<h2 id="authgear">如何使用 Authgear 在您的網頁應用程式中實現身份驗證？</h2>

我們了解了使用不同方法驗證用戶身份的多種方式及其運作原理。現在讓我們採取實際的方法來實現身份驗證。我們將在這裡使用 Authgear，因此如果您不熟悉它，我們將告訴您所需了解的一切。對於網頁端，我們將使用 React.js 函式庫。讓我們開始吧！

### 什麼是 Authgear？

<blockquote class="def-quote"><span style="font-weight:700">Authgear</span> 是一個面向網頁和行動應用程式的客戶身份和存取管理（CIAM）解決方案，基於 OpenID Connect（OIDC）標準構建，使其非常容易與您的新舊應用程式整合。</blockquote>

它支援與流行的第三方服務提供商（如 Google、Apple 和 Azure Active Directory（AD））的整合。此外，它還支援透過 WhatsApp、電子郵件地址和電話號碼使用一次性密碼（OTP）方法進行身份驗證。

以下是 Authgear 預設提供的一些功能：

**1. 注冊頁面**：您現在無需建立自定義注冊頁面，因為您可以使用 Authgear 預建的注冊和登入頁面，這些頁面遵循注冊轉換的最佳實踐。您甚至可以自定義外觀以符合您的品牌視覺識別。

<!--FIGURE-->
![](./figure-4.webp)
<!--/FIGURE-->

**2. 多種安全功能**：您可以輕鬆實現社交登入、雙重因素驗證（2FA）、生物識別等功能，以提供流暢且安全的用戶體驗。

**3. 密碼策略**：您可以設置可自定義的密碼策略，以滿足您的企業安全要求。

**4. 會話警報和撤銷**：您可以透過列出用戶的會話並輕鬆終止任何未知會話來確保用戶安全。

**5.** **用戶個人資料和設定**：此功能讓您的用戶對其帳戶資訊和活動擁有更多控制權。他們可以編輯個人資料中的姓名、主要地址、用戶名等資訊，管理其 2FA，並終止可疑會話。

<!--FIGURE-->
![](./figure-5.webp)
<!--/FIGURE-->

**6. 管理員入口網站**：您的管理員入口網站顯示您配置不同身份驗證方法、添加安全措施或只需幾次點擊即可建立/撤銷用戶所需了解的一切。

### **什麼是 React.js？**

為了整合 Authgear 的 Web SDK，我們將使用 JavaScript 的 React.js 函式庫建立我們的網頁應用程式。

<blockquote class="def-quote"><a href="https://reactjs.org/" target="_blank">React.js</a>（或 React）是一個聲明式且基於元件的 JavaScript 函式庫，用於為單頁應用程式（SPA）構建用戶介面。</blockquote>

### **為 React 設置 Authgear**

我們將在 React 應用程式中使用 Authgear 的 Web SDK。為此，首先我們需要進行一些設置。

#### **步驟一：注冊 Authgear Portal 帳戶**

訪問 <a href="https://portal.authgear.com/" target="_blank">https://portal.authgear.com/</a> 並建立一個新帳戶（或登入現有帳戶）。

建立 Authgear 帳戶後，系統會提示您建立一個新專案。

#### **步驟二：建立並配置您的專案**

您現在應該看到以下內容：

建立專案對話框

<!--FIGURE-->
![](./figure-6.webp)
<!--/FIGURE-->

您可以為其取任何名稱，但之後將無法更改。這是您的 Authgear 端點，請謹慎選擇。在這裡，我們將其命名為「reactappdemo」。

現在我們在接下來的三個步驟中配置專案。在這裡，我們選擇以下設定：

- 電子郵件和密碼
- 用戶可選擇啟用 2FA
- TOTP 設備/應用程式

選擇所需設定後，您將看到以下內容：

專案建立完成介面

<!--FIGURE-->
![](./figure-7.webp)
<!--/FIGURE-->

現在，您可以點擊「Continue to Portal for further Customisation」（繼續到入口網站進行進一步自定義）。

#### **步驟三：建立應用程式**

建立專案後，我們將建立一個應用程式。確保您在您的專案中，然後：

1. 在側邊欄中前往「Applications」選項。
1. 點擊「Add Application」並輸入您想要使用的名稱：

在 Portal 中建立應用程式的介面

<!--FIGURE-->
![](./figure-8.webp)
<!--/FIGURE-->

<p>如您所見，我們還為其設置了「Authorized Redirect URI」（授權重定向 URI）。用戶通過身份驗證後將被重定向到此路徑。通常，在開發階段，我們可以將其設置為 <span class="inline-code">http://localhost:4000/auth-redirect</span> 作為本地開發的 URI。</p>
<ol start="3">
<li>點擊頂部工具欄中的「Save」按鈕，系統將彈出一個包含「Client ID」的視窗，請將其複製到剪貼板或儲存在某處。</li>
</ol>

#### **步驟四：配置應用程式**

在您應用程式的「Edit Application」部分，勾選「Token Settings」部分下的「Issue JWT as access token」核取方塊。這使得可以使用 JWT 作為存取權杖，並允許更容易地解碼存取權杖。但如果您要將傳入請求轉發到 Authgear Resolver Endpoint 進行身份驗證，請保持此選項未勾選。

#### **步驟五：將您的網站新增至允許的來源**

我們需要將我們的網站來源設置為可與 Authgear 通訊。為此：

<ol>
<li>前往「Applications」>「Allowed Origins」部分。</li>
<li>在此處新增您的網站來源 URL。如果您的應用程式已部署，則應類似 <span class="inline-code">yourdomain.com</span>；否則，使用 <span class="inline-code">localhost:4000</span> 進行本地開發。</li>
<li>點擊「Save」。</li>
</ol>

您現在應該看到以下內容：

<!--FIGURE-->
![](./figure-9.webp)
<!--/FIGURE-->

完成這些步驟後，我們就可以開始編寫代碼了！

### **搭建 React 應用程式**

打開您的終端機並運行以下命令以建立一個 React 應用程式：

```

npx create-react-app authgear-demo

```

我們使用 Create React App（CRA）工具來快速搭建應用程式。在<a href="https://create-react-app.dev/" target="_blank">這裡</a>了解更多關於此工具的資訊。

### **安裝 Authgear 的 Web SDK**

Authgear 的 Web SDK 以 NPM 套件的形式提供。您可以透過 NPM 或 Yarn 安裝：

```

npm install --save --save-exact @authgear/web
<span class="comment">// 或者</span>
yarn add @authgear/web --exact

```

### **初始化 Authgear SDK**

現在在您喜愛的代碼編輯器中打開新建立的 authgear-demo 應用程式。

### **初始化 Authgear SDK**

前往 *App.js* 根文件。在這裡，我們需要進行一些清理。我們需要在使用前正確添加 SDK 初始化代碼；為此，我們添加以下代碼：

```

authgear
	.<span class="function">configure</span>({
		<span class="property">endpoint</span>: <span class="string">'https://yourapp.authgear-apps.com'</span>,
			<span class="property">clientID</span>: <span class="string">'YOUR_CLIENT_ID'</span>,
			<span class="property">sessionType</span>: <span class="string">'refresh_token'</span>,
	 })
.<span class="function">then</span>(
	() => {
		console.<span class="function">log</span>(<span class="string">'Succesfully configured!'</span>);
	},
	(err) => {
		console.<span class="function">log</span>(<span class="string">'Failed to configure'</span>, err);
	}
);

```

<p>別忘了首先匯入 <span class="inline-code">authgear</span>：</p>
<p><span>import authgear from '@authgear/web';</span></p>
<p>在上面的代碼中，我們每次頁面加載時都調用 <span class="inline-code">configure</span> 方法。configure 方法接收一個 <a class="inline-code" href="https://authgear.github.io/authgear-sdk-js/docs/web/interfaces/ConfigureOptions/#endpoint" target="_blank">endpoint</a>（您可以在 Authgear 管理員入口網站中看到的預設域名，格式如：<span class="inline-code">https://yourapp.authgear-apps.com</span>）。我們還需提供應用程式的 <a class="inline-code" href="https://authgear.github.io/authgear-sdk-js/docs/web/interfaces/ConfigureOptions/#endpoint" target="_blank">clientID</a> 和 <a href="https://authgear.github.io/authgear-sdk-js/docs/web/interfaces/ConfigureOptions/#sessiontype" class="inline-code">sessionType</a>，後者可以是 <span class="inline-code">"refresh_token"</span>，如果您使用基於 Cookie 的身份驗證，則可以是 <span class="inline-code">"cookie"</span>。</p>

接下來，我們使用 .then() 方法進一步處理我們的配置，在其中可以添加成功或失敗配置的代碼。

### **登入您的應用程式**

成功配置 Web SDK 後，我們可以繼續讓用戶登入我們的應用程式。

#### **步驟一**：用以下代碼替換預設的 JSX 代碼：

```

    <span class="keyword">function</span> <span class="function">App</span>() {
        <span class="keyword">return</span> (
            <<span class="tag">div</span> <span class="attribute">className</span>='<span class="value">App</span>'>
                <<span class="tag">button</span> <span class="attribute">style</span>={{ <span class="property">marginTop</span>: '<span class="value">10rem</span>' }} <span class="attribute">onClick</span>={handleOnClick}>
                    Signup / Login
                <<span class="tag">/button</span>>
            <<span class="tag">/div</span>>
            );
    }
    <span class="keyword">export</span> <span class="keyword">default</span> App;
    
```

在這裡，我們進行**開始授權**調用，以便將用戶重定向到登入/注冊頁面。

```

authgear.<span class="function">finishAuthorization</span>().<span class="function">then</span>(
	(userInfo) => {
		<span class="comment">// 授權成功</span>
		console.<span class="function">log</span>(<span class="string">'Authorized successfully'</span>);
	},
	(err) => {
		<span class="comment">// 完成授權失敗</span>
    console.<span class="function">log</span>(<span class="string">'Failed to finish authorization'</span>, err);
  }
);
  
```

<a href="/zh-hant/schedule-demo/" target="_blank">聯絡我們</a>，了解更多關於 Authgear 如何幫助您改善用戶體驗、提升轉換率並確保您的應用程式安全。

您也可以參考我們的 <a href="https://docs.authgear.com/" target="_blank">Authgear 文件</a>獲取更多說明。或加入我們的 [Discord 伺服器](https://discord.gg/Kdn5vcYwAS)，了解更多關於網頁應用程式身份驗證的資訊。
