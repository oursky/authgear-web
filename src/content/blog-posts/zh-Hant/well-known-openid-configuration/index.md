---
title: "什麼是 .well-known/openid-configuration？開發者指南"
excerpt: "說明 .well-known/openid-configuration 是什麼、探索文件每個欄位的意義，以及如何取得 Google、Okta、Azure、Keycloak 或自有 OIDC 提供者的文件。"
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "什麼是 .well-known/openid-configuration？開發者指南"
metaDescription: "理解 .well-known/openid-configuration：用途、各欄位意義，以及如何取得並檢視任何 OIDC 提供者的探索文件。"
publishedAt: 2026-03-05T16:09:19.689Z
updatedAt: 2026-03-05T16:19:03.821Z
draft: false
---

## 什麼是 .well-known/openid-configuration？

`/.well-known/openid-configuration` 是標準化路徑，每個 OpenID Connect 提供者都會在此公布設定。將它接在任一 OIDC issuer 的基底 URL 後面，即可取得一份 JSON，列出該提供者的端點、支援功能與密碼學能力。

例如：

<ul>
  <li>Google：<code>https://accounts.google.com/.well-known/openid-configuration</code></li>
  <li>Microsoft：<code>https://login.microsoftonline.com/{tenant}/v2.0/.well-known/openid-configuration</code></li>
  <li>Authgear：<code>https://your-project.authgear.cloud/.well-known/openid-configuration</code></li>
</ul>

這份文件是 OIDC **自動探索**的基礎。你不必在應用裡硬編碼授權端點、權杖端點與簽章金鑰；取得文件一次，即可從中讀取所需資訊。

<blockquote>
<p>&#x1F4A1; <strong>立即試用：</strong>使用 <a href="/zh-hant/tools/oidc-discovery-endpoint">Authgear OIDC Discovery Endpoint Explorer</a> 取得並檢視任何提供者的 <code>.well-known/openid-configuration</code>——無需 curl 或指令列。輸入 issuer URL 即可看到完整文件與結構化欄位摘要。</p>
</blockquote>

## 「well-known」慣例從何而來

`/.well-known/` 前綴由 [RFC 8615](https://www.rfc-editor.org/rfc/rfc8615) 定義為保留 URI 空間，用於標準化位置。意義是：「若要知道此主機上某項標準化資訊，請到這裡找。」其他 well-known 路徑包括 `/.well-known/security.txt`（安全聯絡方式）與 `/.well-known/acme-challenge/`（Let's Encrypt 憑證核發）。

`openid-configuration` 文件本身由 [OpenID Connect Discovery 1.0](https://openid.net/specs/openid-connect-discovery-1_0.html) 定義，並由 RFC 8414（OAuth 2.0 Authorization Server Metadata）延伸。符合規範的 OIDC 提供者**必須**在此**完全相同**的路徑公布文件。

## 文件裡有什麼

探索文件是扁平 JSON 物件。部分欄位為規範必填；其餘為選填但廣泛使用。以下是最常見的欄位：

### 必填欄位

<div class="ag-table-wrap">
  <table class="ag-table">
    <thead>
      <tr>
        <th>欄位</th>
        <th>內容說明</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>issuer</code></td>
        <td>規範化的 issuer URL。必須與此提供者所發權杖中 <code>iss</code> 宣告完全一致。</td>
      </tr>
      <tr>
        <td><code>authorization_endpoint</code></td>
        <td>使用者登入並授權存取的 URL。</td>
      </tr>
      <tr>
        <td><code>token_endpoint</code></td>
        <td>以授權碼交換存取權杖與 ID 權杖的 URL。</td>
      </tr>
      <tr>
        <td><code>jwks_uri</code></td>
        <td>JSON Web Key Set 的 URL——用於驗證權杖簽章的公鑰。</td>
      </tr>
      <tr>
        <td><code>response_types_supported</code></td>
        <td>此提供者接受的 OAuth 回應類型（例如 <code>code</code>、<code>token</code>、<code>id_token</code>）。</td>
      </tr>
      <tr>
        <td><code>subject_types_supported</code></td>
        <td>提供者如何識別使用者。幾乎總是 <code>public</code>（所有客戶端同一 <code>sub</code>）或 <code>pairwise</code>（每客戶端不同 <code>sub</code>）。</td>
      </tr>
      <tr>
        <td><code>id_token_signing_alg_values_supported</code></td>
        <td>ID 權杖支援的簽章演算法。通常包含 <code>RS256</code>。</td>
      </tr>
    </tbody>
  </table></div>

### 常見選填欄位

<div class="ag-table-wrap">
  <table class="ag-table">
    <thead>
      <tr>
        <th>欄位</th>
        <th>內容說明</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>userinfo_endpoint</code></td>
        <td>以有效存取權杖取得已驗證使用者宣告的 URL。</td>
      </tr>
      <tr>
        <td><code>end_session_endpoint</code></td>
        <td>登出使用者並結束 SSO 工作階段的 URL（RP-Initiated Logout）。</td>
      </tr>
      <tr>
        <td><code>scopes_supported</code></td>
        <td>提供者支援的 OAuth scope 清單（例如 <code>openid</code>、<code>profile</code>、<code>email</code>）。</td>
      </tr>
      <tr>
        <td><code>claims_supported</code></td>
        <td>提供者可回傳的使用者宣告（例如 <code>sub</code>、<code>name</code>、<code>email</code>、<code>phone_number</code>）。</td>
      </tr>
      <tr>
        <td><code>grant_types_supported</code></td>
        <td>支援的 OAuth 授權類型（例如 <code>authorization_code</code>、<code>refresh_token</code>、<code>client_credentials</code>）。</td>
      </tr>
      <tr>
        <td><code>token_endpoint_auth_methods_supported</code></td>
        <td>客戶端向權杖端點驗證的方式（例如 <code>client_secret_basic</code>、<code>private_key_jwt</code>）。</td>
      </tr>
      <tr>
        <td><code>code_challenge_methods_supported</code></td>
        <td>支援的 PKCE 方法。應有 <code>S256</code>——公開客戶端所需。</td>
      </tr>
      <tr>
        <td><code>revocation_endpoint</code></td>
        <td>撤銷存取或重新整理權杖的 URL。</td>
      </tr>
      <tr>
        <td><code>introspection_endpoint</code></td>
        <td>檢查權杖目前是否仍有效（權杖內省）的 URL。</td>
      </tr>
    </tbody>
  </table></div>

## 實例：Google 的文件長什麼樣

```json
{
  "issuer": "https://accounts.google.com",
  "authorization_endpoint": "https://accounts.google.com/o/oauth2/v2/auth",
  "token_endpoint": "https://oauth2.googleapis.com/token",
  "userinfo_endpoint": "https://openidconnect.googleapis.com/v1/userinfo",
  "jwks_uri": "https://www.googleapis.com/oauth2/v3/certs",
  "scopes_supported": ["openid", "email", "profile"],
  "response_types_supported": ["code", "token", "id_token"],
  "subject_types_supported": ["public"],
  "id_token_signing_alg_values_supported": ["RS256"],
  "claims_supported": ["sub", "iss", "aud", "iat", "exp", "email", "name"]
}
```

完整文件約有 25 個欄位。使用 [OIDC Discovery Endpoint Explorer](/zh-hant/tools/oidc-discovery-endpoint) 可檢視任何提供者（含 Google、Okta、Azure、Keycloak 或你的 Authgear 專案）的完整 JSON。

## 各提供者的探索 URL 格式

路徑 `/.well-known/openid-configuration` 固定不變，但 **issuer 基底 URL** 因提供者而異。部分提供者（特別是 Azure 與 Keycloak）會在 URL 中包含租戶或 realm 區段：

<div class="ag-table-wrap">
  <table class="ag-table">
    <thead>
      <tr>
        <th>提供者</th>
        <th>探索 URL 格式</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Google</td>
        <td><code>https://accounts.google.com/.well-known/openid-configuration</code></td>
      </tr>
      <tr>
        <td>Microsoft (Azure AD)</td>
        <td><code>https://login.microsoftonline.com/{tenant}/v2.0/.well-known/openid-configuration</code></td>
      </tr>
      <tr>
        <td>Okta</td>
        <td><code>https://{yourOktaDomain}/.well-known/openid-configuration</code></td>
      </tr>
      <tr>
        <td>Auth0</td>
        <td><code>https://{yourDomain}/.well-known/openid-configuration</code></td>
      </tr>
      <tr>
        <td>Keycloak</td>
        <td><code>https://{host}/realms/{realm}/.well-known/openid-configuration</code></td>
      </tr>
      <tr>
        <td>Authgear</td>
        <td><code>https://{your-project}.authgear.cloud/.well-known/openid-configuration</code></td>
      </tr>
    </tbody>
  </table></div>

## 如何取得文件

### 在瀏覽器（無需設定）

使用 [Authgear OIDC Discovery Endpoint Explorer](/zh-hant/tools/oidc-discovery-endpoint)。輸入任一 issuer URL 後按 Fetch，即可取得完整 JSON 與主要端點的結構化摘要。

### 使用 curl

```bash
# 取得探索文件並美化輸出
curl -s https://accounts.google.com/.well-known/openid-configuration | python3 -m json.tool

# 只取出授權端點
curl -s https://accounts.google.com/.well-known/openid-configuration | jq '.authorization_endpoint'

# 只取出 JWKS URI
curl -s https://accounts.google.com/.well-known/openid-configuration | jq '.jwks_uri'
```

### 應用程式內（Node.js）

```javascript
// 取得探索文件並取出端點
async function getOIDCConfig(issuerUrl) {
  const discoveryUrl = `${issuerUrl}/.well-known/openid-configuration`;
  const response = await fetch(discoveryUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch discovery document: ${response.status}`);
  }

  const config = await response.json();

  return {
    authorizationEndpoint: config.authorization_endpoint,
    tokenEndpoint: config.token_endpoint,
    jwksUri: config.jwks_uri,
    userinfoEndpoint: config.userinfo_endpoint,
    endSessionEndpoint: config.end_session_endpoint,
  };
}

// 使用方式
const config = await getOIDCConfig('https://your-project.authgear.cloud');
console.log(config.authorizationEndpoint);
```

### 應用程式內（Python）

```python
import requests

def get_oidc_config(issuer_url):
    discovery_url = f"{issuer_url.rstrip('/')}/.well-known/openid-configuration"
    response = requests.get(discovery_url)
    response.raise_for_status()
    return response.json()

config = get_oidc_config('https://your-project.authgear.cloud')
print(config['authorization_endpoint'])
print(config['jwks_uri'])
```

## 為何自動探索很重要

沒有自動探索時，與 OIDC 提供者整合意味著在應用裡**硬編碼**一串端点 URL。這會帶來實際問題：

<ul>
  <li><strong>提供者變更會弄壞你的應用。</strong>若端點 URL 變更，應用可能靜默失敗直到有人發現。</li>
  <li><strong>多租戶應用需每租戶不同設定。</strong>Azure AD 每租戶 URL 不同。沒有探索時只能維護硬編碼對照表；有探索時可依租戶 ID 動態組 URL。</li>
  <li><strong>JWKS 輪替會破壞權杖驗證。</strong>提供者會輪替簽章金鑰。若你硬編碼公鑰，輪替後驗證即失效。從探索文件中的 <code>jwks_uri</code> 取得金鑰可自動處理輪替。</li>
</ul>

探索讓 OIDC 整合具韌性且可自我設定。多數成熟的 OAuth／OIDC 函式庫（Passport.js、python-social-auth、Spring Security 等）接受 issuer URL 後，會自動抓取探索文件並完成設定。

## 探索失敗時常見原因

若對 `/.well-known/openid-configuration` 的請求失敗，常見原因包括：

<ul>
  <li><strong>提供者不支援 OIDC Discovery</strong>——部分較舊或自訂身分系統未公布探索文件，需手動設定端點。</li>
  <li><strong>issuer URL 錯誤</strong>——探索 URL 由 issuer 組出，基底錯誤會得到 404。請查提供者文件確認 issuer 格式（Azure AD 與 Keycloak 尤需注意租戶／realm 區段）。</li>
  <li><strong>CORS 限制</strong>——部分提供者限制跨來源存取探索端點；瀏覽器端 fetch 可能失敗，但 curl 仍成功。</li>
  <li><strong>私有或內部提供者</strong>——無法從公開網際網路連線屬預期情境。</li>
</ul>

## 探索文件與 JWKS URI

探索文件中的 <code>jwks_uri</code> 是最重要的欄位之一。它指向 **JSON Web Key Set**——應用驗證 JWT 簽章所需的公鑰。每次收到 ID 權杖或存取權杖，都應依此 URI 上的金鑰驗證簽章。

若要進一步了解 JWKS URI 的運作與在驗證程式中的用法，請見 [什麼是 JWKS URI？開發者必懂的 JWT 金鑰組](/zh-hant/post/what-is-jwks)。

## 與 Authgear 搭配使用 .well-known/openid-configuration

每個 Authgear 專案會在 `https://your-project.authgear.cloud/.well-known/openid-configuration` 公布探索文件，內含所有必填 OIDC 欄位與 Authgear 專屬延伸。以標準 OIDC 函式庫整合時，只需提供 **issuer URL**——函式庫會自動抓取探索文件並完成設定。

## 下一步

<ul>
  <li>以免費的 <a href="/zh-hant/tools/oidc-discovery-endpoint">OIDC Discovery Endpoint Explorer</a> 檢視任何提供者的探索文件</li>
  <li>閱讀 <a href="/zh-hant/post/what-is-jwks">什麼是 JWKS URI？開發者必懂的 JWT 金鑰組</a> 深入了解 JWKS</li>
</ul>
