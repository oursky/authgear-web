---
title: "Demonstrating Proof-of-Possession (DPoP)：現代 OAuth 安全完整指南"
excerpt: "了解 Demonstrating Proof-of-Possession（DPoP）是什麼、為何對安全 API 很重要，以及如何實作。內含開發者實作範例。"
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "Demonstrating Proof-of-Possession (DPoP)：現代 OAuth 安全完整指南"
metaDescription: "了解 Demonstrating Proof-of-Possession（DPoP）是什麼、為何對安全 API 很重要，以及如何實作。內含開發者實作範例。"
publishedAt: 2025-12-10T14:18:13.024Z
updatedAt: 2026-02-12T02:33:54.744Z
draft: false
---

開發者仰賴權杖式驗證來安全管理使用者工作階段、授權 API 存取，並串接現代應用程式。但隨著系統日益分散，且客戶端橫跨瀏覽器、裝置與原生環境，權杖也成為高價值攻擊目標。

傳統 Bearer Token 使用簡單，但也很容易被濫用：任何拿到權杖的人都能呼叫受保護 API。這個弱點在 SPA 與行動 App 等公開客戶端中特別嚴重，因為其儲存環境通常較不安全。

Demonstrating Proof-of-Possession（DPoP）透過確保只有發出請求的合法客戶端能使用權杖，來解決這個問題。DPoP 不再把權杖視為可轉移憑證，而是將權杖綁定到由客戶端控制的加密金鑰。

即使權杖外洩，也無法被重放。在本文中，我會從基礎到實作拆解 DPoP，並說明像 Authgear 這類框架如何透過 DPoP 強化 Refresh Token 安全，避免濫用。

## **什麼是 DPoP？**

DPoP（Demonstrating Proof-of-Possession）是 RFC 9449 定義的 OAuth 2.0 安全增強機制。它要求客戶端產生並使用一組公私鑰，且在每次請求時附上加密簽章證明。

它的目的，是把 OAuth 權杖綁定到提出請求的特定客戶端實例。在傳統 OAuth 流程中，Access Token 與 Refresh Token 都是「Bearer Token」：只要持有就可使用，與請求來源無關。

DPoP 透過建立「客戶端私鑰」與「簽發給該客戶端的權杖」之間的關聯，改變了這個模式。之後只要使用該權杖，就必須附上以同一把私鑰簽署的 DPoP proof。

這個機制讓權杖在密碼學上與客戶端綁定，使權杖竊取或外洩不再直接導致未授權存取。

## **為什麼會有 DPoP？**

DPoP 是為了解決 OAuth 的根本弱點：權杖重放攻擊。當攻擊者偷到權杖後再拿去冒用合法客戶端，就是重放攻擊。由於傳統 Bearer Token 沒有綁定，伺服器無法分辨攻擊者與真實使用者。

隨著行動 App、單頁應用與 IoT 裝置快速普及，這項風險更高。這些平台通常無法安全保存 Client Secret，只能依賴 Bearer Token 進行 API 授權。實務上，權杖可能透過 API 日誌、網路代理、瀏覽器擴充或不安全裝置儲存而外洩。

DPoP 透過「僅持有權杖不足以使用」來降低風險。每一個受權杖保護的請求都必須附上由合法客戶端私鑰簽署的 DPoP proof。沒有私鑰，偷來的權杖就沒有價值，重放攻擊可被有效阻斷。

## **DPoP 如何運作**

DPoP 透過一套結構化加密流程運作，包含金鑰產生、proof 建立、伺服器驗證與權杖綁定。

每一步都對強制 sender-constrained token 使用至關重要。

### 1. 客戶端產生公私鑰

每個啟用 DPoP 的客戶端都必須產生唯一金鑰對。私鑰安全保留在客戶端，用於簽署 DPoP proof。對應的公鑰以 JWK 格式在換取權杖時送給 Authorization Server。

Authorization Server 之後會用此公鑰驗證進來的 DPoP proof 是否由正確客戶端簽署。

### 2. 客戶端為請求建立 DPoP Proof JWT

**DPoP proof** 是一種短效 JWT，由客戶端私鑰簽署。它把關鍵請求資訊（如方法與 URL）綁進 proof，避免攻擊者把 proof 重用到其他端點或 HTTP 方法。

必要 claims 包含：

- `htu` - 請求目標 URI（scheme、host、port、path），不含 query 與 fragment。
- `htm` - HTTP 方法
- `jti` - 防重放的唯一識別碼
- `iat` - 確保新鮮度的時間戳

JWT header 包含：

- `typ: "dpop+jwt"`
- `alg`：非對稱 JWS 演算法
- `jwk`：JWK 形式公鑰，不含私鑰材料

每個請求都會在 DPoP header 傳送此 proof。

### 3. 伺服器驗證 Proof

Authorization Server 會驗證：

- 簽章是否符合註冊公鑰
- `iat` 是否有效
- `jti` 是否未重複使用
- `htu` 與 `htm` 是否與當前請求一致
- 權杖是否綁定正確金鑰

只有全部驗證成功，伺服器才會接受請求。

#### **4. 權杖變成金鑰綁定**

驗證成功後，伺服器會簽發帶有 `cnf`（confirmation）claim 的 sender-constrained refresh 或 access token，例如：

`"cnf": { "jkt": "<thumbprint_of_public_key>" }`

從這一刻起，權杖與客戶端私鑰不可分離。

## **DPoP 在防止重放攻擊中的角色**

重放攻擊是惡意者攔截權杖後，嘗試在未授權下使用。DPoP 透過多種方式化解這類攻擊：

### **必須持有私鑰**

偷到權杖但無法產生有效簽章 proof，就不能使用。

### **權杖綁定到金鑰對**

`cnf` claim 強制金鑰與權杖的一對一連結。

### **新鮮度要求**

proof 必須含近期 `iat`，可防止重用。

### **唯一 JWT 識別碼（jti）**

伺服器會拒絕重複 DPoP proof，即使瞬間被攔截也無法重放。

這讓不受信任裝置與網路上的安全性也能維持穩健。

## **DPoP vs 傳統 Bearer Token**

Bearer Token 方便但天生不安全，無法提供擁有者的加密證明。相對地，DPoP token 每次使用都必須提出 possession proof。

<div class="ag-table-wrap">
  <table class="ag-table">
    <thead>
      <tr>
        <th>特性</th>
        <th>Bearer Token</th>
        <th>DPoP Token</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>被竊取後可重用</td><td>是</td><td>否</td></tr>
      <tr><td>需要私鑰</td><td>否</td><td>是</td></tr>
      <tr><td>容易遭重放攻擊</td><td>是</td><td>否</td></tr>
      <tr><td>權杖綁定客戶端</td><td>否</td><td>是</td></tr>
      <tr><td>對公開客戶端安全性</td><td>弱</td><td>強</td></tr>
    </tbody>
  </table></div>

對處理敏感資料或分散式環境的組織而言，採用 DPoP 的收益通常很高。

## **DPoP vs mTLS**

DPoP 與 mTLS 都能提供 sender-constrained token，但 mTLS 部署較複雜，且在許多客戶端場景不易使用。DPoP 提供更輕量、彈性替代方案，省去憑證管理仍具強加密保證。

<div class="ag-table-wrap">
  <table class="ag-table">
    <thead>
      <tr><th>面向</th><th>DPoP</th><th>mTLS</th></tr>
    </thead>
    <tbody>
      <tr><td>憑證管理</td><td>不需要</td><td>需要</td></tr>
      <tr><td>可用於瀏覽器</td><td>是</td><td>受限</td></tr>
      <tr><td>複雜度</td><td>低</td><td>高</td></tr>
      <tr><td>適合行動 App</td><td>是</td><td>少見</td></tr>
    </tbody>
  </table></div>

對現代 OAuth 部署，特別是公開客戶端情境，DPoP 往往更實際。

## **Authgear 中的 DPoP**

Authgear 目前將 DPoP 用於 Refresh Token，確保即使在不受信任環境中，權杖續期仍然安全。這在保護強度與 API 伺服器效能間取得平衡。

### **Authgear 如何套用 DPoP**

1. 客戶端照常啟動 OAuth 流程。
1. 權杖簽發時，Authgear 會把 Refresh Token 綁定到客戶端公鑰。
1. 請求新 Access Token 時，客戶端必須提供有效 DPoP proof。
1. Authgear 驗證 proof 與 `cnf` claim 後才簽發新 Access Token。
1. 驗證失敗時會拒絕 refresh 請求。

為維持 Resource Server 整合輕量，Authgear 不強制 Access Token 使用 DPoP；而是在 Refresh Token 階段強化防護，避免長期未授權使用。

## **何時應該使用 DPoP？**

當 Access Token 重放是現實威脅，且客戶端環境無法保證權杖機密性時，DPoP 很有價值。透過金鑰綁定，攻擊者無法在其他裝置重用偷來的權杖。

你可優先考慮 DPoP 的情境：

- **行動應用存取受保護 API**：行動裝置與網路不受伺服器控制，若權杖外洩，金鑰綁定可防跨裝置重放。
- **無法採用 mTLS 或安全保存 Client Secret 的裝置**：DPoP 不需雙向 TLS 也能綁定金鑰。
- **權杖可能在傳輸或監控中暴露**：缺少私鑰時依然無法重放。
- **Refresh Token 高價值風險**：綁定金鑰可大幅降低遭竊後濫用成功率。

若客戶端能穩定使用 mTLS，或全部為可安全保管私鑰的機密型伺服器客戶端，DPoP 需求就相對較低。

## **DPoP 的重要限制**

DPoP 無法保護「客戶端本身已遭入侵」的情境，這是機制固有限制。

### **DPoP 無法保護遭入侵的瀏覽器**

瀏覽器雖可透過 WebCrypto 使用不可匯出金鑰，但 Web App 仍缺乏可控、穩定的硬體隔離。若攻擊者取得瀏覽器腳本執行權（例如惡意擴充或 XSS），可同時存取：

- access/refresh token，與
- DPoP 私鑰。

有了私鑰，攻擊者就能產生有效 DPoP proof。

### **一旦私鑰外洩，DPoP 就無法再提供保護**

DPoP 只在「攻擊者拿到權杖但拿不到私鑰」時可防重放。

### **在瀏覽器中，DPoP 主要緩解客戶端外部洩漏**

DPoP 有效的案例包括：

- 權杖被寫進日誌
- 權杖被伺服器端監控工具暴露
- 權杖被網路元件攔截

這些情況下攻擊者缺乏私鑰，無法產生有效 proof。

## **開發者常見 DPoP 錯誤**

即使機制不複雜，實作時仍常見可避免問題。

### **htu URL 設定錯誤**

`htu` 必須與目標 URI（scheme/host/path）一致，且不含 query 與 fragment。

### **重用同一個 jti**

每個 DPoP proof 都必須唯一，重用會立即被拒絕。

### **時鐘偏差與無效 iat**

客戶端系統時間不準時，proof 可能因過期或過早而被拒。

### **使用不支援演算法**

DPoP 必須使用 ES256、RS256 等非對稱演算法，不允許對稱法。

### **跨工作階段混用金鑰**

若客戶端輪替或遺失私鑰，既有權杖將無法使用。

避免這些錯誤可確保與相容 OAuth 伺服器可靠互通。

## **DPoP 問題排查**

DPoP 錯誤通常集中在少數類型，掌握後除錯更快：

- **Invalid DPoP Proof**：常見原因是 JWT 結構錯誤、簽章演算法不符或 proof header 損壞。
- **cnf.jkt 不匹配**：代表權杖綁定金鑰與目前簽章金鑰不同。
- **iat 無效**：通常是裝置時鐘設定錯誤。
- **Proof replay detected**：每次 proof 都要產生新的隨機 UUID。
- **htm/htu 不匹配**：與目前 token 請求方法或 URL 不一致。

逐項檢查上述屬性，多數 DPoP 問題都能快速定位。

## **效能考量**

DPoP 在 OAuth 流程中加入額外加密步驟，但對大多數實務部署而言，效能影響仍很小。

其設計偏向輕量，能與現代客戶端能力與伺服器架構良好配合。

### **CPU 成本**

建立並簽署小型 JWT DPoP proof，在現代手機與瀏覽器上通常只需毫秒級。主要成本來自私鑰運算。

低功耗 IoT 裝置可能有較高額外負擔；此時可在裝置工作階段內快取並重用同一金鑰對，以兼顧效能與安全。

### **網路負擔**

每個 DPoP 請求都多一個簽署 proof header。雖增加請求大小，但 JWT 負載短小，對頻寬與延遲影響通常可忽略。

### **伺服器狀態需求**

伺服器可暫存近期 `jti` 防重放，通常只需 30 到 60 秒短暫保存，可由記憶體快取或分散式快取層輕鬆處理，因此伺服器端效能影響低。

正確實作下，DPoP 能以很小額外成本提供強 sender-constrained 安全，適合大規模與資源敏感應用。

## **總結**

DPoP 是 OAuth 生態中強而有力的增強，讓開發者能可靠地把權杖綁定到提出請求的客戶端。透過在每次 refresh 週期要求 proof-of-possession，即使權杖外洩，也無法被未授權方濫用或重放。

這讓瀏覽器 App、行動裝置與分散式客戶端等難以安全儲存憑證的環境中，權杖式驗證更安全。

理解 DPoP 的運作方式、適用時機與常見陷阱後，開發者能打造更具韌性、更安全且更符合現代 OAuth 最佳實務的驗證流程。

藉由 Authgear 對 DPoP 綁定 Refresh Token 的支援，團隊可在不增加 Resource Server 複雜度下，強化權杖續期流程並降低權杖被竊風險。

<a href="https://portal.authgear.com/" target="_blank">立即開始 Authgear 免費試用</a>，在你的 OAuth 流程啟用 DPoP 保護，打造更安全、面向未來的驗證體驗。

## **FAQs**

### **1. DPoP 是加密嗎？**

不是。DPoP 不負責資料加密，而是提供 *proof-of-possession*，確保提出權杖的客戶端同時持有綁定私鑰。

### **2. DPoP 會取代 mTLS 嗎？**

DPoP 不會完全取代 mTLS，但可在不管理憑證的前提下提供類似 sender-constrained 安全，且更易部署、可用於瀏覽器，特別適合公開客戶端。

### **3. 客戶端遺失私鑰會怎樣？**

若遺失私鑰，所有 DPoP 綁定的 Refresh Token 都會失效，必須重新啟動授權流程取得新權杖。

### **4. Access Token 與 Refresh Token 都需要 DPoP 嗎？**

不一定。許多平台（包含 Authgear）只綁定 Refresh Token，以簡化 Resource Server 設定，同時仍能防止長期權杖濫用。

### **5. 攻擊者能偽造 DPoP proof 嗎？**

不能。沒有客戶端私鑰就無法在密碼學上產生有效 proof；即使權杖外洩，也無法產生匹配 proof。

### **6. DPoP 能防所有權杖攻擊嗎？**

DPoP 主要防止重放與未授權客戶端濫用，不會取代 HTTPS、授權檢查或存取控制邏輯。
