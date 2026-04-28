---
title: "常見 OAuth 2.0 授權類型與適用時機完整指南"
excerpt: "了解最常見的 OAuth 2.0 授權類型、運作方式與使用時機。這是一份面向開發與資安團隊的實務指南。"
coverImage: ./cover.jpg
category: engineering
featured: false
metaTitle: "常見 OAuth 2.0 授權類型與適用時機完整指南"
metaDescription: "了解最常見的 OAuth 2.0 授權類型、運作方式與使用時機。這是一份面向開發與資安團隊的實務指南。"
publishedAt: 2026-01-05T16:04:14.645Z
updatedAt: 2026-02-12T02:33:54.734Z
draft: false
---

現代應用高度依賴 API、雲端服務、行動客戶端與第三方整合。在這樣的環境中，如何安全控管受保護資源存取是關鍵。OAuth 2.0 已成為處理此問題的標準授權框架。

OAuth 2.0 讓應用程式可以代表使用者或其他系統存取資源，而不必暴露原始憑證。應用不再共享密碼，而是請求代表特定權限的權杖。這些權杖具備範圍限制、有效期限，且可撤銷，因此非常符合現代安全需求。

然而，OAuth 2.0 並非單一流程。它定義了多種授權類型（Grant Type），每一種都對應不同應用模型與安全假設。選對授權類型非常重要：選錯會增加複雜度甚至引入風險；選對則能簡化實作並提升長期可維護性。

本文將說明最常見的 OAuth 2.0 授權類型、運作方式，以及各自適用情境。

## 先用高階角度理解 OAuth 2.0

OAuth 2.0 是授權框架，不是驗證協定。它的主要目標是讓 Client 在不直接處理使用者憑證的情況下存取受保護資源。

至於「使用者是誰」的驗證（Authentication），通常由 OpenID Connect（OIDC）處理。OIDC 建立在 OAuth 2.0 之上。換句話說，OAuth 關注的是「可存取什麼」，而不是「你是誰」。

OAuth 2.0 涉及四個主要角色：

- **Resource Owner**：擁有資料的使用者或系統
- **Client**：請求存取權的應用程式
- **Authorization Server**：在授權成功後簽發 Access Token
- **Resource Server**：承載受保護 API 或資料的服務

Grant Type 用來定義 Client 如何向 Authorization Server 取得 Access Token。

## 為什麼 OAuth 2.0 需要多種 Grant Type

不同應用在運作方式與可安全儲存資料能力上差異很大：

- 有些完全在瀏覽器執行
- 有些擁有安全後端
- 有些不涉及終端使用者
- 有些運行在輸入能力受限的裝置上

OAuth 2.0 的多種 Grant Type 正是為了對應這些差異。每種 Grant Type 都預設了特定信任程度與技術能力。把 Grant Type 用在不適合的情境，容易造成權杖外洩、安全控制薄弱或營運問題。

理解這些差異，有助於團隊設計更符合系統架構的授權流程。

## Authorization Code Grant

Authorization Code Grant 是最常見的 OAuth 2.0 流程，適用於有使用者互動且具後端伺服器的應用。它把面向使用者的驗證步驟與權杖交換步驟分離，確保 Access Token 不會暴露給瀏覽器或終端使用者。

### 流程如何運作

1. 使用者嘗試存取應用
1. Client 將使用者導向 Authorization Server
1. 使用者完成驗證並同意授權
1. Authorization Server 透過 redirect 回傳授權碼
1. Client 在安全後端請求中以授權碼交換 Access Token
1. 使用 Access Token 呼叫受保護 API

### 常見使用情境

- 伺服器端渲染 Web 應用
- 採 Backend-for-Frontend（BFF）架構的應用
- 可安全儲存 Client Secret 的系統

### 優點

- 安全保證強
- 權杖不會出現在瀏覽器 redirect URL
- 可搭配 Refresh Token
- 廣泛支援且文件成熟

### 缺點

- 需要後端基礎設施
- 較簡單流程略複雜

### 什麼時候該用

當應用有後端，且需要安全、可長期維持的工作階段時，建議使用 Authorization Code Grant。對傳統 Web 應用來說，通常是預設選擇。

## Authorization Code Grant + PKCE

PKCE（Proof Key for Code Exchange）是對 Authorization Code Grant 的增強，特別適用無法安全儲存 Secret 的 Client。它已成為多數公開客戶端的最佳實務。PKCE 會把授權請求與權杖交換綁定，以避免授權碼攔截。

### PKCE 如何運作

- Client 先產生隨機 `code_verifier`
- 將其雜湊後的 `code_challenge` 傳入授權請求
- 權杖交換時必須帶回原始 `code_verifier`
- 若比對不符，權杖請求失敗

### 常見使用情境

- 單頁應用（SPA）
- 行動應用
- 桌面應用
- 所有公開客戶端

### 優點

- 不需 Client Secret 也具強安全性
- 符合 OAuth 安全最佳實務建議
- 與 OIDC 搭配良好

### 缺點

- 需要正確實作
- 設定成本略高於舊流程

### 什麼時候該用

所有現代 SPA 與行動 App 都應優先使用 Authorization Code + PKCE。它已取代舊式瀏覽器流程，安全性明顯更高。

## Implicit Grant

Implicit Grant 原本為無法做後端權杖交換的瀏覽器應用設計。在此流程中，Access Token 會直接在 redirect 回應中返回。

### 安全疑慮

- 權杖暴露在 URL 中
- 權杖可能透過瀏覽器歷史或日誌外洩
- 不支援 Refresh Token
- 權杖重放風險較高

### 目前狀態

現代 OAuth 指引已明確不建議使用 Implicit Grant。隨著瀏覽器安全能力提升與 PKCE 普及，它已無必要。

### 什麼時候該用

新系統不應使用 Implicit Grant。建議全面改用 Authorization Code + PKCE。

## Client Credentials Grant

Client Credentials Grant 用於機器對機器（M2M）情境，不涉及終端使用者。流程中 Client 以「自己」的身分完成驗證。

### 流程如何運作

1. Client 使用自己的憑證向 Authorization Server 驗證
1. Authorization Server 簽發 Access Token
1. Client 以該權杖存取受保護 API

### 常見使用情境

- 服務對服務通訊
- 後端微服務
- 排程工作或背景程序
- 內部系統整合

### 優點

- 流程簡單高效
- 不需使用者互動
- 非常適合自動化

### 缺點

- 沒有使用者脈絡
- 權杖代表應用，不代表個人

### 什麼時候該用

當某系統需在不代表使用者的情況下存取另一系統 API，應使用 Client Credentials Grant。

## Resource Owner Password Credentials Grant（ROPC）

ROPC 允許 Client 直接收集使用者帳密，再向授權伺服器交換權杖。

### 安全考量

- Client 會接觸原始帳密
- 不相容 MFA 與 SSO
- 破壞憑證隔離原則
- 一旦 Client 遭入侵風險極高

### 常見使用情境

- 舊系統
- 遷移過渡場景
- 高度信任的一方系統

### 優點

- 流程直觀
- 不需 redirect

### 限制

- 安全風險高
- 使用者體驗不佳
- 不適合現代身分系統

### 什麼時候該用

一般應避免使用。若不得不用，應限定在受控環境，並視為遷移期間的暫時方案。

## Device Authorization Grant（Device Code Flow）

Device Authorization Grant 專為沒有瀏覽器或輸入能力有限的裝置設計。

### 流程如何運作

1. 裝置向 Authorization Server 請求 device code
1. 使用者在另一台裝置開啟驗證網址
1. 使用者完成驗證並同意授權
1. 原裝置持續輪詢 Authorization Server
1. 一旦核准，裝置取得 Access Token

### 常見使用情境

當使用者無法在裝置本身輕鬆輸入憑證時，Device Authorization Grant 很常被採用，例如：

- Smart TV 與 TV App：TV 顯示短碼，要求使用者在手機或筆電開啟啟用網址完成登入。
- 串流裝置：Roku、Apple TV、Fire TV 等避免使用遙控器輸入帳密。
- IoT 與智慧裝置：透過另一個可信且有完整瀏覽器的裝置完成驗證。
- CLI 工具：開發工具與雲端 CLI 可在終端機環境中安全驗證，而不需內建瀏覽器或處理密碼。

### 優點

- 不需在裝置本地登入也能安全授權
- 適合受限環境

### 限制

- 相比瀏覽器流程較慢
- 需實作輪詢邏輯

### 什麼時候該用

當裝置無法進行標準 redirect 或無法顯示完整登入畫面時，應使用此 Grant。

## Refresh Token 與權杖生命週期

Refresh Token 讓應用在不要求使用者重新登入的情況下取得新 Access Token，對維持安全會話很重要。

最佳實務包含：

- 安全儲存 Refresh Token
- 若支援，啟用 Refresh Token 旋轉
- 登出或疑似入侵時撤銷權杖
- 除非明確支援，避免把 Refresh Token 暴露到瀏覽器

## 如何選擇正確 Grant Type

正確的 OAuth 2.0 Grant Type 取決於：

- 應用架構
- 安全要求
- 是否有後端
- 是否涉及使用者互動
- Client 的信任等級

### 一般建議

- 有後端 Web App：Authorization Code
- SPA 與行動 App：Authorization Code + PKCE
- 服務對服務 API：Client Credentials
- 輸入受限裝置：Device Authorization
- 舊系統：盡可能避免 ROPC
- Implicit Flow：不要使用

## 常見實作錯誤

即使選對 Grant Type，仍可能出問題：

- 在公開客戶端使用 Client Secret
- SPA 未啟用 PKCE
- 權杖儲存不安全
- 請求過寬的 scopes
- 未正確旋轉或撤銷權杖

嚴謹實作與遵循最佳實務缺一不可。

## 結論

OAuth 2.0 為現代應用提供彈性且安全的存取控制框架，但成效取決於是否選對授權類型。每種 Grant 都對應特定應用模型、信任等級與安全需求。選對流程能降低風險、簡化實作，並支持長期擴展。

對大多數面向使用者的系統而言，Authorization Code + PKCE 是建議標準；對服務對服務情境，Client Credentials 最適合。其他 Grant Type 則各自對應特定情境，舊流程在新設計中應避免。

若你希望在遵循安全最佳實務下簡化 OAuth 2.0 落地，**Authgear** 提供集中化身分平台，內建支援現代 OAuth 與 OpenID Connect 流程，可協助團隊在 Web、行動、API 與微服務場景中，以一致安全模型管理授權並降低維運負擔。

<a href="https://portal.authgear.com/" target="_blank">立即開始 Authgear 免費試用</a>，更有效率地打造安全且可擴展的 OAuth 2.0 存取控制。

## FAQs

### 最安全的 OAuth 2.0 Grant Type 是哪一種？

沒有對所有場景都「唯一最安全」的 Grant Type，但對多數現代面向使用者的應用而言，Authorization Code + PKCE 通常是最佳選擇，能有效防止權杖攔截，並適用 Web、行動與 SPA。

### SPA 還應該使用 Implicit Grant 嗎？

不應該。Implicit Grant 已不再被建議使用。現代最佳實務是改用 Authorization Code + PKCE，以獲得更好的安全性與權杖管理能力。

### 什麼時候應該使用 Client Credentials Grant？

當情境是機器對機器通訊（例如微服務、後端排程工作或內部 API），且不需要使用者脈絡時，最適合使用 Client Credentials Grant。

### Resource Owner Password Credentials Grant 仍可接受嗎？

一般不建議。它可能存在於舊系統或受控遷移情境，但會引入顯著安全風險，且不支援 MFA、SSO 等現代能力。

### 一個系統可以同時使用多種 Grant Type 嗎？

可以。許多組織會依應用型態混用不同 Grant Type。例如 SPA 使用 Authorization Code + PKCE，後端服務使用 Client Credentials。重點是每個場景都選對流程，並以一致策略管理。
