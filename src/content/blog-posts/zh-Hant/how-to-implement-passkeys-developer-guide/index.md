---
title: "如何用 WebAuthn 實作通行金鑰：開發者完整指南"
excerpt: "實用的通行金鑰與 WebAuthn 開發指南：原理、註冊與登入流程、JavaScript 範例、最佳實踐與測試建議。"
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "如何用 WebAuthn 實作通行金鑰：開發者指南"
metaDescription: "了解通行金鑰驗證原理與 WebAuthn API 實作。含註冊與登入程式範例、最佳實踐與測試技巧。"
publishedAt: 2026-03-13T17:35:55.681Z
updatedAt: 2026-03-13T17:53:28.938Z
draft: false
---

密碼作為預設驗證方式已數十年，仍帶來安全與可用性問題：使用者忘記、跨服務重用、不安全儲存。對開發者而言，密碼系統意味重設工單、釣魚風險與憑證外洩。

**通行金鑰驗證**是現代替代方案。本指南說明通行金鑰如何運作、WebAuthn API 實務長相，以及從註冊到通行金鑰登入的完整實作要點。

## 理解通行金鑰

**通行金鑰**是無密碼憑證，讓使用者以受信任裝置——智慧型手機、筆電或硬體安全金鑰——取代密碼登入。底層為公開金鑰密碼學：

<ul><li><strong>公開金鑰</strong>存在應用程式伺服器。</li><li><strong>私密金鑰</strong>安全存在使用者裝置，**永不離開**。</li></ul>

驗證時伺服器對裝置發出隨機挑戰；裝置以私密金鑰簽署後回傳；伺服器以公開金鑰驗證簽章。因私密金鑰不離開裝置，攻擊者無法透過釣魚或伺服器外洩竊取。

通行金鑰建構在 **FIDO2** 標準上，包含兩部分：

<ul><li><strong>WebAuthn</strong>（Web Authentication API）——開發者直接使用的瀏覽器端 API</li><li><strong>CTAP</strong>（Client to Authenticator Protocol）——瀏覽器與外接驗證器（如硬體安全金鑰）之間的通訊</li></ul>

## 開發者為何採用通行金鑰

Apple、Google、Microsoft 皆已內建通行金鑰支援，採用加速中，原因很實際：

<ul><li><strong>釣魚抗性。</strong> 通行金鑰與註冊網域綁定。在 <code>yourapp.com</code> 註冊的憑證不會在假網域 <code>yourapp-login.com</code> 生效。</li><li><strong>伺服器無共享密鑰可外洩。</strong> 僅存公開金鑰；資料庫外洩也無法冒充使用者。</li><li><strong>較佳 UX。</strong> 以 Face ID、Touch ID 或裝置 PIN 驗證——無密碼可忘或重設。</li><li><strong>降低支援成本。</strong> 重設密碼是常見工單來源之一；通行金鑰從根本消除。</li></ul>

## 前置需求

### HTTPS 與瀏覽器支援

WebAuthn **僅在 HTTPS 下運作**。請確保 App 以有效 TLS 憑證提供服務——**無例外**，連 staging 亦然（本地開發可用 `localhost`，瀏覽器會豁免）。

Chrome、Safari、Firefox、Edge 皆支援 WebAuthn。覆蓋率可查 [caniuse.com](https://caniuse.com/webauthn)。

### 後端基礎建設

伺服器需處理三件事：

<ol><li><strong>產生挑戰</strong>——每次註冊或登入使用隨機、單次使用的挑戰</li><li><strong>驗證回應</strong>——驗證驗證器回傳的簽署斷言（assertion）</li><li><strong>憑證儲存</strong>——每使用者儲存公開金鑰、credential ID、簽章計數器等</li></ol>

**不要自行實作密碼學驗證。** 請使用維護中的 WebAuthn 伺服器函式庫，例如 Go 的 [go-webauthn](https://github.com/go-webauthn/webauthn)、Python 的 [py_webauthn](https://github.com/duo-labs/py_webauthn)、Node 的 [@passwordless-id/webauthn](https://github.com/passwordless-id/webauthn)。

### 帳戶復原

上線前就要規劃復原。若使用者僅註冊一臺裝置又遺失，需要回復管道。常見作法：允許多裝置註冊、改以電子郵件驗證、或備援碼。沒有復原路徑會變成支援案件或流失客戶。

## 通行金鑰驗證如何運作

分兩階段：**註冊**（建立憑證）與**通行金鑰登入**（使用憑證）。

### 註冊流程

註冊建立金鑰對，並將公開金鑰連結到使用者帳戶。

<ol><li>使用者在 App 中觸發通行金鑰設定。</li><li>伺服器產生隨機挑戰並送到瀏覽器。</li><li>瀏覽器以挑戰與 relying party 資訊呼叫 <code>navigator.credentials.create()</code>。</li><li>作業系統提示驗證——Touch ID、Face ID、Windows Hello 或 PIN。</li><li>裝置產生金鑰對；私密金鑰存於安全隔離區；公開金鑰與 credential ID 回傳伺服器。</li><li>伺服器儲存公開金鑰與 credential ID，與帳戶關聯。</li></ol>

### 登入流程

<ol><li>使用者選擇「以通行金鑰登入」。</li><li>伺服器產生新的隨機挑戰。</li><li>瀏覽器以挑戰呼叫 <code>navigator.credentials.get()</code>。</li><li>作業系統找出相符憑證並提示生物辨識／PIN。</li><li>裝置以儲存的私密金鑰簽署挑戰。</li><li>伺服器以儲存公開金鑰驗證簽章；成功即登入。</li></ol>

## WebAuthn 範例：註冊與登入

實務上由兩個瀏覽器方法處理。

### navigator.credentials.create() — 通行金鑰註冊

```
// 先向伺服器取得註冊挑戰
const response = await fetch('/auth/passkey/register/begin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userId: currentUser.id }),
});
const options = await response.json();

// 伺服器回傳 PublicKeyCredentialCreationOptions。
// 瀏覽器需要將 challenge 從 base64url 解碼為二進位。
options.challenge = base64urlToBuffer(options.challenge);
options.user.id = base64urlToBuffer(options.user.id);

// 觸發驗證器
const credential = await navigator.credentials.create({ publicKey: options });

// 將新憑證送回伺服器儲存
await fetch('/auth/passkey/register/complete', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: credential.id,
    rawId: bufferToBase64url(credential.rawId),
    response: {
      attestationObject: bufferToBase64url(credential.response.attestationObject),
      clientDataJSON: bufferToBase64url(credential.response.clientDataJSON),
    },
    type: credential.type,
  }),
});
```

### navigator.credentials.get() — 通行金鑰登入

```
// 向伺服器取得驗證挑戰
const response = await fetch('/auth/passkey/login/begin', { method: 'POST' });
const options = await response.json();

options.challenge = base64urlToBuffer(options.challenge);
// 若有 allowCredentials，每個 credential id 也要解碼
if (options.allowCredentials) {
  options.allowCredentials = options.allowCredentials.map(c => ({
    ...c,
    id: base64urlToBuffer(c.id),
  }));
}

// 提示使用者——瀏覽器負責生物辨識／PIN UI
const assertion = await navigator.credentials.get({ publicKey: options });

// 將簽署後的 assertion 送回伺服器驗證
const verifyResponse = await fetch('/auth/passkey/login/complete', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: assertion.id,
    rawId: bufferToBase64url(assertion.rawId),
    response: {
      authenticatorData: bufferToBase64url(assertion.response.authenticatorData),
      clientDataJSON: bufferToBase64url(assertion.response.clientDataJSON),
      signature: bufferToBase64url(assertion.response.signature),
      userHandle: assertion.response.userHandle
        ? bufferToBase64url(assertion.response.userHandle)
        : null,
    },
    type: assertion.type,
  }),
});

if (verifyResponse.ok) {
  // 驗證成功——重新導向或更新 UI
}
```

`base64urlToBuffer` 與 `bufferToBase64url` 在伺服器傳來的 base64url 字串與 WebAuthn 需要的 `ArrayBuffer` 之間轉換。可自行實作或使用處理編碼的函式庫。

<blockquote><p>⚠️ <strong>常見錯誤：</strong> 將挑戰以字串而非 <code>ArrayBuffer</code> 傳入會導致 <code>navigator.credentials.create()</code> 拋錯。務必在交給 WebAuthn API 前將伺服器回傳的 base64url 解碼。</p></blockquote>

## 與驗證平台整合

從零建置 WebAuthn 可行，但涵蓋面大——挑戰管理、認證（attestation）驗證、簽章計數器、多裝置同步等。許多團隊改採驗證平台代管。

Authgear 內建通行金鑰註冊與登入。將 App 接上 Authgear 後，WebAuthn 儀式、憑證儲存與裝置管理由平台處理。若團隊核心產品不是驗證基礎建設，值得評估。[了解 Authgear 的通行金鑰支援](https://www.authgear.com/features/passkeys)。

## 測試通行金鑰實作

上線前請跨環境測試：

<ul><li><strong>註冊</strong>——至少在兩種不同裝置／瀏覽器建立通行金鑰</li><li><strong>登入</strong>——端到端驗證完整流程</li><li><strong>多裝置</strong>——一臺註冊、另一臺登入（經 iCloud 鑰匙圈或 Google 密碼管理員同步的通行金鑰）</li><li><strong>硬體安全金鑰</strong>——若需支援 FIDO2 金鑰請實測</li><li><strong>復原</strong>——模擬遺失裝置並走完整復原流程</li></ul>

Chrome DevTools 有 **WebAuthn 模擬器**（DevTools → More tools → WebAuthn），無實體驗證器亦可測註冊與驗證。

## 最佳實踐

### 註冊多臺裝置

引導使用者在入職／註冊時至少註冊兩臺裝置。僅一臺又遺失會被鎖在門外。多裝置或「同步通行金鑰 + 硬體金鑰」提供自然後援。

### 為不熟悉的使用者設計引導

許多人從未看過通行金鑰提示。在呼叫 `navigator.credentials.create()` 前簡短說明：通行金鑰是什麼、接下來會發生什麼、為何比密碼安全。困惑的使用者會按取消且不再嘗試。

### 每次產生新挑戰

每次註冊與登入都必須使用伺服器產生的唯一隨機挑戰（至少 16 bytes，建議 32）。挑戰須**單次使用**且**短效**（例如 5 分鐘內過期）。重用或接受過期挑戰會開啟重放攻擊大門。

### 驗證簽章計數器

驗證器維護每次使用遞增的簽章計數器。伺服器應儲存並比對；若收到計數器**小於**已儲存值，可能表示憑證被複製——應標記並要求重新驗證。

### 支援跨平台通行金鑰

通行金鑰可為裝置綁定（如硬體金鑰）或**同步型**（經 iCloud 鑰匙圈、Google 密碼管理員、1Password 等備份）。若也要允許硬體金鑰，不要一律設 `authenticatorAttachment: "platform"`。

### 記錄驗證事件

在伺服器端記錄註冊嘗試、成功登入、驗證失敗、憑證刪除等。這些紀錄對偵測異常（如同一憑證反覆驗證失敗）與使用者回報問題時除錯不可或缺。

## 結論

通行金鑰以留在使用者裝置上的密碼學金鑰對取代共享密鑰，因此具釣魚抗性、不受憑證資料庫外洩影響，且對使用者更快。

WebAuthn 在所有現代瀏覽器支援良好；客戶端程式相對直觀；複雜度主要在伺服器——挑戰管理、assertion 驗證與憑證儲存。請用伺服器函式庫處理密碼學重運算，勿自行實作。

若不想自行維運基礎建設，[Authgear](https://portal.authgear.com/) 提供開箱即用的通行金鑰註冊與登入，讓團隊專注在產品本身。

<ul><li><a href="/zh-hant/post/passkey-vs-password-why-passkeys-are-the-future-of-security">通行金鑰 vs 密碼：為何通行金鑰是安全未來</a></li><li><a href="/zh-hant/post/what-is-fido2-complete-guide-fido-authentication">什麼是 FIDO2？FIDO 驗證完整指南</a></li></ul>

## 常見問題

### 什麼是通行金鑰驗證？

以公開金鑰密碼學取代密碼的無密碼登入。裝置持有私密金鑰；伺服器存公開金鑰。登入時伺服器發挑戰，裝置在生物辨識／PIN 後以私密金鑰簽署，伺服器驗證簽章。不建立、不儲存、不傳輸密碼。

### 什麼是通行金鑰？

通行金鑰是通行金鑰驗證所建立的憑證：伺服器上的公開金鑰 + 鎖在使用者裝置的私密金鑰。使用者以生物辨識或裝置 PIN 驗證；私密金鑰不離開裝置。

### 通行金鑰技術上如何運作？

公開金鑰密碼學。裝置持私密金鑰；伺服器存對應公開金鑰。登入時伺服器發挑戰，裝置以私密金鑰簽署，伺服器驗證簽章。無共享密鑰在線上傳輸。

### 什麼是 WebAuthn？

**Web Authentication API**，W3C 標準，讓應用程式建立與使用通行金鑰。所有主流瀏覽器皆支援。

### 通行金鑰比密碼安全嗎？

是。無法釣魚（網域綁定）、伺服器外洩僅公開金鑰、無法跨站重用，也無密碼可暴力猜測。

### 通行金鑰能跨多裝置同步嗎？

可以。Apple（iCloud 鑰匙圈）、Google（密碼管理員）、Microsoft（Windows Hello）可跨使用者裝置同步。1Password、Dashlane 等第三方密碼管理員亦支援。

### 有可在本機跑的 WebAuthn 範例嗎？

有。[webauthn.io](https://webauthn.io/) 為互動示範，無需設定即可在瀏覽器測試。Google 的 [Build your first WebAuthn app](https://developers.google.com/codelabs/webauthn-reauth) codelab 可走完整註冊與驗證流程。本文程式片段即為你自有 App 中會使用的客戶端呼叫方式。

<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"什麼是通行金鑰驗證？","acceptedAnswer":{"@type":"Answer","text":"以公開金鑰密碼學取代密碼的無密碼登入；裝置持私密金鑰，伺服器存公開金鑰。"}},{"@type":"Question","name":"什麼是通行金鑰？","acceptedAnswer":{"@type":"Answer","text":"由公開金鑰（伺服器）與私密金鑰（裝置）組成的憑證。"}},{"@type":"Question","name":"什麼是 WebAuthn？","acceptedAnswer":{"@type":"Answer","text":"瀏覽器 API，W3C 標準，用於建立與使用通行金鑰。"}},{"@type":"Question","name":"通行金鑰比密碼安全嗎？","acceptedAnswer":{"@type":"Answer","text":"是。具釣魚抗性、伺服器僅存公開金鑰、不可跨站重用。"}},{"@type":"Question","name":"通行金鑰能跨裝置同步嗎？","acceptedAnswer":{"@type":"Answer","text":"可以。Apple、Google、Microsoft 等生態可同步；第三方密碼管理員亦支援。"}}]}</script>
