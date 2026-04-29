---
title: "JWE vs JWT：關鍵差異、使用情境與安全建議"
excerpt: "快速理解 JWE 與 JWT 的差異、何時該用哪一種，以及如何安全使用 token。內含免費除錯與金鑰產生工具。"
coverImage: ./cover.jpg
category: engineering
featured: false
readTime: 5
metaTitle: "JWE vs JWT：關鍵差異、使用情境與安全建議"
metaDescription: "快速理解 JWE 與 JWT 的差異、何時該用哪一種，以及如何安全使用 token。內含免費除錯與金鑰產生工具。"
publishedAt: 2025-08-13T15:22:59.516Z
updatedAt: 2026-02-12T02:35:14.231Z
draft: false
---

如果你在做 API、驗證或 OAuth 2.0、OpenID Connect 這類身分協定，很可能遇過 **JWT** 與 **JWE**。

這兩個縮寫常讓初學者混淆，因為它們都跟 token、JSON、安全有關——但它們不是同一件事。

這篇會用白話拆解 **JWE vs JWT**，展示兩者結構，並說明各自適用情境。  
我們也會提供免費工具，幫你更輕鬆地 **除錯**、**產生**、**保護** token。

## 什麼是 JWT？

**JWT** 是 **JSON Web Token**，一種精簡且 URL-safe 的資料格式，用來在雙方之間傳遞 claims。

典型 JWT 由 **三段** 組成，以點（`.`）分隔：

其中：

1. **Header** – 含 token 類型與簽章演算法等中繼資訊（*Base64URL 編碼 JSON*）
1. **Payload** – 含實際 claims 或資料（*Base64URL 編碼 JSON*）
1. **Signature** – 確保 token 未被竄改

### **JWT 範例**（為可讀性已縮短）：

### 解碼後 Header（JSON）

### 解碼後 Payload（JSON）

What is JWE?

**JSON Web Encryption（JWE）** 是以加密方式安全傳遞資料的 token。和 JWT（通常僅做簽章）不同，JWE 可確保只有預期收件者能讀取內容。

### **JWE 加密如何運作**

建立 JWE 時，通常會用到 **兩把金鑰**：

1. **內容加密金鑰（CEK）** — 用來加密實際 payload（claims）。
1. **收件者公鑰**（或共享密鑰）— 用來再加密 CEK 本身。

也就是：

- payload 先用 CEK 搭配對稱加密演算法（如 AES）加密。
- CEK 再用收件者金鑰搭配非對稱演算法（如 RSA 或 ECDH）加密。

結果是：  
即使 JWE 被攔截，沒有用來解開 CEK 的**私鑰**，就無法讀取 payload。

### **JWE Token 結構**

JWE 由 **五段 base64url 編碼內容**組成，以點（`.`）分隔：

其中：

1. **Protected Header**   <ul><li>定義中繼資訊，例如：<ul><li>`"alg"` → 金鑰管理演算法（如 `RSA-OAEP`）
1. `"enc"` → 內容加密演算法（如 `A256GCM`)
1. `"kid"` → 金鑰 ID
1. **Encrypted Key**   <ul><li>以 `"alg"` 指定演算法加密後的 CEK。
1. 僅目標收件者能用私鑰解開。****
1. **Initialization Vector（IV）**   <ul><li>每次加密使用的隨機值，確保同內容多次加密仍安全。****
1. **Ciphertext**   <ul><li>加密後 payload（claims）。敏感資料就在這裡，但沒有金鑰無法讀。****
1. **Authentication Tag**   <ul><li>用於完整性與真實性驗證。若密文被竄改，tag 不匹配，解密會失敗。

### **JWE 範例**（為可讀性已縮短）：

### **解碼後 Protected Header（JSON）**

這裡的 payload 已加密，沒有正確解密金鑰就看不到內容。

當收件者拿到 JWE，會先用私鑰解密 Encrypted Key，再用得到的 CEK 解密 Ciphertext，還原原始 payload。這能同時提供**機密性**（內容隱藏）與**完整性**（可偵測竄改）。

## 為什麼金鑰在 JWT 與 JWE 都重要

不論你在簽 JWT 或加密 JWE，核心都取決於正確的密碼學金鑰。

- JWT 依賴金鑰來**簽章與驗簽**。
- JWE 依賴金鑰來**加密與解密**敏感資料。

這些金鑰必須用正確格式表示，而這正是 **JSON Web Key（JWK）** 標準的作用：以 JSON 表示金鑰，方便應用儲存、分享與使用。

### JWK Generator 的角色

我們的 [**免費 JWK Generator**](/zh-hant/tools/jwk-generator) 可大幅簡化金鑰建立流程。你可以：

- 一鍵產生 RSA 或 EC 金鑰對
- 匯出標準 JWK 格式
- 搭配 [JWT & JWE Debugger](/zh-hant/tools/jwt-jwe-debugger) 測試簽章、驗簽、加密、解密

這在以下情境特別實用：

- 建立新服務
- 測試驗證或加密流程
- 進行安全強化的金鑰輪替

有了正確 JWK，你就能在 JWT 與 JWE 兩種情境都順利運作，並讓 token 端到端更安全。

## JWE vs JWT：並排比較

<table style="width:100%; border-collapse: collapse; margin-top: 1rem;">
  <thead>
    <tr style="background-color: #f5f5f5;">
      <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">特性</th>
      <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">JWT</th>
      <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">JWE</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #ddd; padding: 12px;"><strong>資料保護</strong></td>
      <td style="border: 1px solid #ddd; padding: 12px;">僅簽章，payload 可見</td>
      <td style="border: 1px solid #ddd; padding: 12px;">已加密，payload 隱藏</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 12px;"><strong>主要用途</strong></td>
      <td style="border: 1px solid #ddd; padding: 12px;">驗證與 claims 完整性檢查</td>
      <td style="border: 1px solid #ddd; padding: 12px;">安全資料傳輸</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 12px;"><strong>效能</strong></td>
      <td style="border: 1px solid #ddd; padding: 12px;">較快、體積較小</td>
      <td style="border: 1px solid #ddd; padding: 12px;">較慢、體積較大</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 12px;"><strong>可見性</strong></td>
      <td style="border: 1px solid #ddd; padding: 12px;">任何人都可讀 payload</td>
      <td style="border: 1px solid #ddd; padding: 12px;">僅收件者可解密</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 12px;"><strong>複雜度</strong></td>
      <td style="border: 1px solid #ddd; padding: 12px;">較易實作</td>
      <td style="border: 1px solid #ddd; padding: 12px;">設定較複雜</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 12px;"><strong>安全層級</strong></td>
      <td style="border: 1px solid #ddd; padding: 12px;">保護完整性</td>
      <td style="border: 1px solid #ddd; padding: 12px;">同時保護完整性<strong>與</strong>機密性</td>
    </tr>
  </tbody>
</table>

## 何時該用 JWE 或 JWT

在 **JWE** 與 **JWT** 之間做選擇，通常取決於**你要保護什麼**。

- 使用 **JWT** 的情境：<ul><li>你只需要驗證資料完整性
- 資料不敏感，但必須防竄改
- 例如：API access token，重點是檢查角色權限

- 資料機密性非常重要
- 需要符合合規要求（HIPAA、GDPR）
- 例如：安全傳輸使用者社會安全號碼等敏感資料

用資安語言來說：

- JWT 處理的是 **完整性**
- JWE 處理的是 **完整性 + 機密性**

因此「**jwt encryption**」其實不精確——若你要的是加密，嚴格來說你談的是 **JWE**。

## 常見安全錯誤

即使選對 token 類型，還是常犯錯。以下是常見陷阱：

1. **把 token 存在 localStorage** – 容易受 XSS 影響
1. **未驗證簽章** – 形同沒有安全性
1. **使用弱演算法** – 例如 `none` 或過時密碼
1. **token 塞太多資料** – 應保持精簡
1. **跳過過期檢查** – 過期 token 可能被濫用

若要更完整防護，務必落實 **jwt security** 最佳實務：

- 短生命週期 token
- 強演算法（`RS256` 或 `ES256`）
- 定期輪替金鑰

## 自己試試看：免費工具

你可以很容易實驗 **JWT** 與 **JWE**：

- [**JWT & JWE Debugger**](/zh-hant/tools/jwt-jwe-debugger) – 幾秒內完成 token 解碼、驗證與除錯
- [**JWK Generator**](/zh-hant/tools/jwk-generator) – 產生簽章與加密用 JSON Web Keys

這些工具可節省大量時間，並降低實務開發中的錯誤率。

## 結語

理解 **JWE** 與 **JWT** 差異，是打造安全應用的基本功。  
JWT 適合可讀但有簽章保護的 token；JWE 則適合需要加密保護的情境。

下次要選擇時，先問自己：**你更在意速度，還是機密性？**  
不確定時，直接用免費的 [JWT & JWE Debugger](/zh-hant/tools/jwt-jwe-debugger) 與 [JWK Generator](/zh-hant/tools/jwk-generator) 幫你更快、更安全地完成工作。
