---
title: "OIDC 規範解析：開發者需要掌握的關鍵概念"
excerpt: "以實務角度拆解 OIDC 規範，說明流程、權杖、宣告、範圍與端點。了解開發者真正需要的重點，實作更安全的驗證機制。"
coverImage: ./cover.jpg
category: engineering
featured: false
metaTitle: "OIDC 規範解析：開發者需要掌握的關鍵概念"
metaDescription: "以實務角度拆解 OIDC 規範，說明流程、權杖、宣告、範圍與端點。了解開發者真正需要的重點，實作更安全的驗證機制。"
publishedAt: 2026-01-09T15:46:15.698Z
updatedAt: 2026-02-12T02:35:14.214Z
draft: false
---

現代應用程式很少是孤立存在的。它們仰賴身分系統來驗證使用者、管理工作階段，並在多種裝置、平台與環境中保護 API。隨著應用規模成長，從零打造驗證機制會同時帶來高風險與高成本。

OpenID Connect（OIDC）已成為現代驗證的業界標準。OIDC 建立在 OAuth 2.0 之上，提供一種安全且可互通的方式，讓應用程式驗證使用者身分並取得身分相關資訊。不過對許多開發者而言，OIDC 規範往往過於厚重、抽象，難以轉化為實際實作決策。

本文會把 OIDC 規範拆解成開發者真正需要掌握的關鍵概念。我們不會逐字重述整份規範，而是聚焦在 OIDC 的實務運作：參與角色、交換的權杖、使用的流程，以及維持驗證可靠與安全的核心機制。

## 什麼是 OpenID Connect（OIDC）？

OpenID Connect 是建立在 OAuth 2.0 之上的身分層。OAuth 2.0 主要處理授權（讓應用取得資源存取權），OIDC 則補上標準化的使用者驗證與身分資訊傳遞機制。

OIDC 的核心回答一個簡單問題：  
「剛剛登入的這個人是誰？」

OIDC 讓應用程式（Client）可以根據身分提供者（IdP）完成的驗證結果來確認使用者身分，並以可預期且安全的格式取得結構化身分資料，例如使用者 ID、電子郵件或姓名。

這種職責分離非常關鍵。應用程式不再需要自行儲存密碼或直接管理憑證安全，而是把驗證委派給遵循開放標準的可信服務提供者，藉此降低安全風險並提升跨平台互通性。

## 為什麼開發者要重視 OIDC 規範

OIDC 不只是另一個驗證選項，而是現代身分系統的基礎。Google、Microsoft、Apple、Okta、Auth0 與企業 IAM 平台等主要身分服務供應商，都把 OIDC 作為主要驗證協定。

對開發者來說，理解 OIDC 代表你可以：

- 建立可同時支援 Web、行動與 API 架構的驗證流程
- 依賴開放標準以避免供應商綁定
- 設計可抵禦釣魚、權杖外洩與重放攻擊的安全登入流程
- 支援 SSO、社群登入、無密碼驗證等進階能力

若對 OIDC 核心概念理解不足，實作很容易變得脆弱、不安全，或與單一供應商 SDK 高度耦合。規範存在的目的就是避免這些問題，但前提是你真正理解其核心觀念。

## OIDC 的角色與參與者

OIDC 透過明確角色分工來降低複雜度。每次 OIDC 互動都涉及三個主要角色。

### **終端使用者（End User）**

終端使用者是嘗試完成驗證的人。看似理所當然，但 OIDC 的設計重點之一，是讓應用程式不直接碰觸使用者憑證。使用者只會在身分提供者端完成驗證。

這種分離能提升安全與信任。使用者可以用密碼、MFA、Passkey 或生物辨識登入，而應用程式不需知道底層憑證如何管理。

### **Client（Relying Party）**

Client 是希望驗證使用者的應用程式，可能是 Web App、行動 App、單頁應用（SPA）或後端服務。

在 OIDC 術語中，Client 常稱為 Relying Party（RP），因為它信任身分提供者給出的驗證結果。Client 需先向 IdP 註冊，取得識別資訊與憑證，以便安全通訊。

### **OpenID Provider（OP）**

OpenID Provider 是負責驗證使用者並簽發權杖的身分服務。它會驗證憑證、套用安全政策，並產生經過密碼學簽章的身分聲明。

OP 會提供 OIDC 規範定義的標準端點，使任何相容 Client 都可整合，不需要私有協定。

## OAuth 2.0 與 OIDC 的差異

OAuth 2.0 與 OIDC 的關係是常見混淆來源。

OAuth 2.0 是授權框架，回答的是：  
「這個應用是否可存取受保護資源？」

OIDC 建立在 OAuth 2.0 上以補足驗證能力，回答的是：  
「這個使用者是誰？他如何完成驗證？」

OIDC 新增了：

- 新權杖類型（ID Token）
- 標準化身分宣告（Claims）
- 使用者資訊端點（UserInfo）
- 驗證情境專用的範圍與參數

只有 OAuth 無法可靠識別使用者；加入 OIDC 後，身分可被標準化且可驗證。

## OIDC 權杖：核心積木

權杖是 OIDC 的核心。它們在各方之間傳遞驗證結果與授權資料。

### **ID Token**

ID Token 是 OIDC 最關鍵的概念。它是 JSON Web Token（JWT），內含已驗證使用者的身分資訊。

ID Token 通常包含：

- 唯一識別使用者的主體識別碼（sub）
- 簽發者（iss）
- 預期接收方（aud）
- 驗證時間與到期時間
- 可選身分宣告（例如 email、name）

Client 在信任 ID Token 前，必須驗證其簽章與宣告。這個密碼學驗證步驟正是 OIDC 能防篡改且安全的關鍵。

### **Access Token**

Access Token 來自 OAuth 2.0，用於存取受保護 API。在 OIDC 流程中，Access Token 常與 ID Token 一起簽發。

與 ID Token 不同，Access Token 並非給 Client 解讀。它是給資源伺服器驗證後決定是否授權 API 存取。

### **Refresh Token**

Refresh Token 讓 Client 在不要求使用者重新驗證的情況下取得新的 Access Token。它是長效憑證，必須安全儲存。

OIDC 延續 OAuth 最佳實務，特別在瀏覽器與行動環境下，盡量降低 Refresh Token 外洩風險。

## OIDC 中的 Claims 與 Scopes

OIDC 以 Claims 表示身分屬性，以 Scopes 請求可存取的屬性範圍。

### **Claims**

Claims 是出現在權杖中或由 UserInfo 端點回傳的鍵值資料。常見 Claims 包含：

- sub（主體識別碼）
- email
- name
- preferred_username

Claims 讓應用在維持一致身分模型的同時，提供個人化體驗。

### **Scopes**

Scopes 控制 Client 能請求哪些資訊。`openid` 是 OIDC 必填 scope，代表這是驗證請求。

其他如 `profile`、`email` 或自訂 scopes，則決定回傳哪些 Claims。這種範圍化做法有助於最小化資料暴露並支援隱私保護設計。

## 開發者必懂的 OIDC 端點

OIDC 定義一組標準端點供 Client 互動。

### **Authorization Endpoint**

驗證流程從這裡開始。Client 會把使用者導向授權端點，完成登入並同意請求 scopes。

授權請求通常包含：

- `client_id`
- `redirect_uri`
- `scope`
- `response_type`

正確建構這個請求是安全性的關鍵。

### **Token Endpoint**

驗證成功後，Client 會在 Token 端點以授權資料交換權杖。此步驟在伺服器對伺服器通道進行，可保護敏感憑證。

### **UserInfo Endpoint**

Client 可用 Access Token 向 UserInfo 端點取得額外身分宣告。這不是必需，但在身分資料會隨時間變動時很有用。

### **JWKS Endpoint**

JSON Web Key Set（JWKS）端點提供驗證權杖簽章所需的公開金鑰。Client 透過它安全驗證 ID Token。

## OIDC 驗證流程說明

OIDC 提供多種流程以支援不同應用型態。

### **Authorization Code Flow**

這是最安全、也最被廣泛建議的流程。常用於伺服器端 Web 應用，以及搭配 PKCE 的現代 SPA。

它把使用者驗證與權杖交換分離，降低權杖洩漏風險。

### **Authorization Code Flow with PKCE**

PKCE（Proof Key for Code Exchange）保護無法安全儲存密鑰的公開客戶端。它能防止授權碼攔截攻擊，也是 SPA 與行動應用的必備機制。

### **Implicit Flow（已淘汰）**

Implicit Flow 原本為瀏覽器應用設計，但因安全風險已不建議使用。現代實作應完全避免。

## 權杖驗證與安全最佳實務

正確實作 OIDC 的前提是嚴格驗證權杖。

Client 必須驗證：

- 以可信金鑰驗證權杖簽章
- `iss` 與 `aud` 是否正確
- 到期時間與 `nonce` 是否有效

若略過這些檢查，OIDC 的安全保證就會失效，應用將暴露於重放與冒用攻擊中。

## 常見 OIDC 實作錯誤

許多 OpenID Connect 問題並非規範不足，而是使用方式錯誤。OIDC 本身可提供強健安全保障，但前提是每個元件都正確使用。

以下錯誤在實務中非常常見，且會明顯削弱驗證安全性。

### **把 Access Token 當成使用者身分證明**

Access Token 的目的在於讓應用存取受保護 API，不是用來識別使用者。若把它當作已驗證身分證據，會造成識別不準確與安全缺口。應始終使用專門用於確認身分的 ID Token。

### **未正確驗證 ID Token**

收到 ID Token 不代表可以直接信任。應用必須驗證簽章、issuer、audience、過期時間與 nonce。若省略這些步驟，系統會暴露在重放攻擊與權杖濫用風險中。

### **請求過多 Scopes**

過度請求 scopes 會暴露不必要的使用者資料，並違反隱私最佳實務。落實最小權限原則可降低資料暴露並更容易符合法規要求。

### **在 Client 端不安全儲存權杖**

把權杖放在不安全的瀏覽器儲存位置會提升 XSS 攻擊暴露面。使用安全儲存機制與短效權杖可降低被竊風險，整體安全性更高。

## OIDC 如何支援現代驗證情境

OIDC 是以下能力的核心：

- 單一登入（SSO）
- 社群登入
- 無密碼驗證
- 企業聯邦整合
- 零信任架構

OIDC 的彈性讓組織能在不重寫應用邏輯下持續演進驗證策略。

## 結論

OIDC 規範不只是技術文件，更是現代身分系統的藍圖。雖然完整規範內容龐大，但開發者不必逐條背誦，也能做出安全驗證。

只要掌握角色、權杖、流程、宣告與端點等核心概念，就能更有信心且更正確地實作 OIDC。這可同時降低安全風險、提升互通性，並讓驗證架構更具未來性。

像 Authgear 這類平台可把 OIDC 的協定複雜度、安全最佳實務與合規要求內建處理，讓開發團隊把精力放在產品本身，而不是重造身分基礎設施。

[立即探索 Authgear](/zh-Hant/) ，簡化 OIDC 實作並讓你的驗證架構更具未來彈性。

## **FAQs**

### 開發者什麼時候應該使用 OIDC？

當應用需要安全且可擴展的使用者驗證時就應使用 OIDC，特別是要支援 SSO、社群登入、MFA 或跨平台身分整合時。

### ID Token 與 Access Token 有什麼不同？

ID Token 用來確認使用者身分，對象是 Client。Access Token 用來授權 API 存取，對象是資源伺服器，不應拿來識別使用者。

### OIDC 一定要用 PKCE 嗎？

對 SPA 與行動 App 等公開客戶端而言，PKCE 是必需。對所有客戶端也都強烈建議啟用，以防授權碼攔截攻擊。
