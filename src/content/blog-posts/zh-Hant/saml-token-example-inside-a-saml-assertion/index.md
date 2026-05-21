---
title: "SAML Token 範例：SAML Assertion 裡面有什麼？"
excerpt: "透過 SAML token 範例了解 SAML assertion 內容，包括屬性、驗證聲明、簽章與安全要素。"
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "SAML Token 範例：SAML Assertion 裡面有什麼？"
metaDescription: "透過 SAML token 範例了解 SAML assertion 內容，包括屬性、驗證聲明、簽章與安全要素。"
publishedAt: 2026-01-19T17:19:06.179Z
updatedAt: 2026-02-12T02:36:01.277Z
draft: false
---

Security Assertion Markup Language（SAML）是最成熟的身分聯邦與單一登入（SSO）標準之一。它讓組織可讓使用者只驗證一次，就能安全地存取多個應用，而不必重複輸入憑證。

在每個 SAML 驗證流程的核心，就是 SAML assertion（常被稱為 SAML token）。它是由身分提供者（IdP）簽發、由服務提供者（SP）消費的結構化 XML 文件，承載可驗證的使用者身分、驗證狀態與相關屬性聲明。

對任何設計、整合或維運 SAML 系統的人來說，理解 SAML assertion 內容是關鍵。

## What Is a SAML Token?

SAML token 是使用者成功驗證後，由 IdP 產生並數位簽章的 assertion。它是一個可信聲明，用來確認使用者是誰，以及如何完成驗證。

不同於 session cookie 或 OAuth access token，SAML token 並非設計給長期儲存或重複使用。它的唯一目的，是在登入過程中把驗證結果安全地從 IdP 傳遞到 SP。

SP 完成驗證後，會建立自己的 session，而不再依賴該 assertion。

## How SAML Assertions Enable Single Sign-On

SAML 透過把「驗證」與「應用存取」解耦來實現 SSO。與其讓每個應用各自處理憑證，驗證被集中在 IdP。

當使用者嘗試存取應用時，SP 會將使用者導向 IdP 進行驗證。驗證完成後，IdP 會簽發 SAML assertion 並回傳給 SP。

SP 驗證 assertion 後授權存取，不需再次要求使用者輸入憑證。這種方式能提升安全性並大幅降低使用者摩擦。

## High-Level Structure of a SAML Assertion

SAML assertion 是遵循 SAML 規格嚴格 schema 的 XML 文件。雖然 XML 語法看起來複雜，但邏輯結構其實一致且可預測。

從高層次來看，SAML assertion 包含簽發中繼資料、已驗證使用者資訊、描述驗證與屬性的聲明，以及限制有效性的條件。每個元件都在 IdP 與 SP 之間建立信任時扮演特定角色。

## Example of a Simplified SAML Assertion

檢視簡化版 SAML assertion 有助於理解文件結構。實務中的 assertion 通常還會包含數位簽章、加密區塊與 namespace，但基礎布局是一致的。

這個簡化範例凸顯幾乎所有 SAML assertion 都會出現的核心元素，幫助你理解身分資訊如何被傳遞。

### The <Assertion> Element

`<Assertion>` 是整個 SAML token 的根容器。文件中其他元素都位於這個元素內。

此元素包含重要中繼資料，例如唯一識別碼、SAML 版本與簽發時間。這些值可讓 SP 偵測重放攻擊、套用過期規則，並確認 assertion 符合預期協定版本。

### The <Issuer> Element

`<Issuer>` 用來識別產生 assertion 的 IdP，通常是一個可在聯邦中唯一代表 IdP 的 URI。

SP 極度依賴此值判斷信任關係。即使其他驗證皆通過，只要 issuer 不符合預先設定且可信的 IdP，就必須拒絕 assertion。這是 SAML 信任模型的根基。

### The <Subject> Element

`<Subject>` 定義 assertion 套用的身分主體，也就是 IdP 視角中的已驗證使用者。它對外部身分映射到內部帳號至關重要。沒有 subject，assertion 就無法向 SP 傳達有意義的身分資訊。

### NameID

`<NameID>` 內含使用者主要識別值。SP 會以此辨識使用者並關聯本地帳號。

不同 NameID 格式適用於不同目的。以 Email 為識別較直觀，但可能改變；持久化識別則更穩定且不可讀，有利於長期帳號關聯與隱私。

### Subject Confirmation

Subject confirmation 定義 SP 如何驗證 assertion 確實由已驗證使用者提交。最常見方式是 bearer confirmation，假設持有 assertion 即可視為證明。由於這方式對攔截敏感，必須嚴格驗證時效、接收者與簽章，才能維持安全。

## The <Conditions> Element

`<Conditions>` 指定 assertion 何時有效、在何種條件下可被接受。這些規則可防止 assertion 被用在預期範圍外。

每次處理 assertion 時都必須評估 conditions。只要任一條件失敗，就必須立即拒絕 assertion，不應因其他資料有效而放行。

### Time-Based Conditions

時間條件定義 assertion 可使用的時間窗口，降低被竊取或攔截後的利用價值。

assertion 通常僅有效數分鐘，既能有效降低重放攻擊風險，也保留合理處理時間給正常流程。

### Audience Restriction

Audience restriction 限制哪些 SP 可以接受該 assertion，避免被重放到非預期服務。

SP 在接受 assertion 前，必須確認自己的識別值存在於允許的 audience 清單中。

## The <AuthnStatement> Element

驗證聲明描述使用者在 IdP 端何時、如何完成驗證，提供可供 SP 評估驗證強度的脈絡。

對依驗證方式或驗證新鮮度套用安全政策的應用而言，這些資訊尤其重要。

### Authentication Time and Session Information

authentication time 記錄使用者最近一次完成驗證的時間，可能與 assertion 簽發時間不同。

session 識別值可讓多個 SP 協調登出行為，確保跨系統 session 可一致終止。

### Authentication Context

authentication context 指定使用者的驗證方法，例如密碼登入或多因子驗證。

SP 可利用這些資訊執行政策，例如對敏感操作要求更強驗證。

## The <AttributeStatement> Element

attribute statement 包含主要識別值以外的使用者資訊，常用於授權判斷與個人化。

這些屬性由 IdP 提供，會依設定與信任協議而有所不同。

### Common Attributes

常見屬性包含 Email、顯示名稱、部門、角色與群組成員資格。

SP 經常依這些屬性決定存取層級、指派角色或客製使用者體驗。

### Attribute Naming and Mapping

SAML 並未強制統一屬性命名標準。這提供彈性，但也增加設定複雜度。

明確的屬性映射可確保 SP 正確解讀 IdP 提供的身分資料。

## Digital Signatures in SAML Assertions

數位簽章可保護 SAML assertion 的完整性與真實性，確保 assertion 未被竄改，且確實由可信 IdP 簽發。

SP 必須使用 IdP 公開憑證驗證簽章。接受未簽章或簽章錯誤的 assertion，會帶來嚴重安全風險。

## Common Implementation Mistakes

許多 SAML 安全弱點不是來自 SAML 標準本身，而是來自不完整、不一致或錯誤實作。由於 SAML 高度彈性且配置導向，小錯誤就可能明顯削弱 IdP 與 SP 之間的信任模型。

以下是最常導致驗證繞過、token 重放或未授權存取的實作錯誤：

- 跳過簽章驗證   <ul><li>部分實作未正確驗證 SAML assertion 或 response 的數位簽章。若簽章驗證被略過、設定錯誤，或套用到錯誤的 XML 元素，攻擊者可能偽造 assertion 或竄改身分資料而不被察覺。

- 接受未簽章 assertion   <ul><li>即使在測試或內部環境，也不應接受未簽章 assertion。任何非由可信 IdP 進行密碼學簽章的 assertion，都應一律拒絕。

- assertion 有效期設定過長   <ul><li>將 assertion 設為長時效會提高重放攻擊風險。若 assertion 被攔截，攻擊者可在較長時間內重複利用，削弱時間限制的保護效果。

- audience restriction 驗證錯誤   <ul><li>某些 SP 未驗證 assertion 是否真的發給自己。缺乏正確 audience 驗證時，原本有效的 assertion 可能被重放到其他服務。

- subject confirmation 檢查不完整   <ul><li>若未驗證 recipient URL、confirmation method 或過期欄位，assertion 可能被重用或導向未授權端點。

## Encryption of SAML Assertions

加密可保護 assertion 中的敏感資訊在使用者瀏覽器傳遞過程中不被窺探。

雖然加密不一定是強制要求，但若 assertion 包含個資或受監管資料，仍強烈建議啟用。

## Where SAML Assertions Are Commonly Used

SAML assertion 是企業 IAM 的關鍵要素，可在跨系統與跨組織情境下安全分享驗證與授權資料。常見使用場景如下：

- 企業單一登入（SSO）   <ul><li>SSO 讓員工以一組憑證存取多個應用。SAML assertion 將身分、角色與權限由 IdP 傳遞到 SP，減少密碼疲勞、提升安全並簡化存取管理。

- SaaS 整合   <ul><li>許多 SaaS 平台（如 Salesforce、Workday、Microsoft 365）使用 SAML 驗證。組織可設定這些服務信任自家 IdP assertion，以維持一致存取政策、防止未授權登入並簡化 IT 管理。

- 跨組織身分聯邦   <ul><li>SAML 允許組織間安全協作，不需為每個系統建立獨立帳號。常見於供應鏈或聯合專案，可讓外部使用者在集中驗證政策下受控存取。

- 政府與高等教育環境   <ul><li>在受監管環境中，SAML 能在支援 FERPA、HIPAA、GDPR 等標準下，安全存取共享資源。機構可安全且可稽核地驗證員工、學生與外部協作者。

- 傳統企業系統   <ul><li>許多組織仍依賴舊系統，SAML 能維持相容，同時提供安全驗證與聯邦身分管理，支援逐步現代化而不破壞既有流程。

這說明 SAML assertion 在多元組織情境中仍然高度相關，能同時提供安全、聯邦化驗證與可管理性。

## Bottom Line

SAML assertion 是一份結構化且已簽章的身分文件，可支援跨系統安全驗證。理解每個元件及其作用，有助於建立可靠整合、加速除錯並維持強健安全實務。

即使新式驗證標準持續發展，SAML 仍是企業身分系統的重要組成。像 Authgear 這類現代平台，能讓組織更容易把 SAML 與 OAuth、DPoP 等新協定一起落地。

<a href="/zh-hant/" target="_blank">立即開始你的 Authgear 免費試用</a>，以現代安全能力（如 DPoP 與 OAuth）簡化 SAML 整合並強化整體驗證流程。

## FAQs

### SAML assertion 可以重複使用嗎？

不可以。它是短時效且設計為一次性使用。

### SAML assertion 是做驗證還是授權？

它主要支援驗證；其中屬性資訊則可協助授權判斷。

### SAML assertion 一定會加密嗎？

不一定，但若涉及敏感資料，建議啟用加密。

### 為什麼 SAML 使用 XML 而不是 JSON？

SAML 設計於 JSON 標準普及之前，並依賴 XML 的可延展性與簽章機制。

### SAML 現在仍然重要嗎？

是。它仍廣泛部署於企業身分環境。
