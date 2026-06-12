---
title: "不安全直接物件參照（IDOR）：範例與 API 防護"
h1: "不安全直接物件參照（IDOR）：範例與防護（含 API 建議）"
excerpt: "說明 IDOR 是什麼、在 Web 與 API 如何發生、真實案例，以及預防物件層級授權漏洞（BOLA）的實用清單。"
coverImage: ./cover.webp
category: industry
featured: false
metaTitle: "不安全直接物件參照（IDOR）：範例與防護（含 API 建議）"
metaDescription: "說明 IDOR 是什麼、在 Web 與 API 如何發生、真實案例，以及預防物件層級授權漏洞（BOLA）的實用清單。"
publishedAt: 2025-09-09T12:14:50.221Z
updatedAt: 2026-02-12T02:35:14.222Z
draft: false
---

當應用程式或 API 從 client 接收識別碼（如 `user_id=123` 或 `/invoices/42`），並在 **未確認呼叫者是否有權限** 的情況下直接讀取／修改資料，就會發生 IDOR（Insecure Direct Object Reference）。這是 [Broken Access Control](/zh-hant/post/what-is-broken-access-control-vulnerability-and-how-to-prevent-it) 在實務系統中最常見的型態之一，尤其在 API 場景。

## 什麼是 IDOR？

**Insecure Direct Object Reference（IDOR）** 是一種存取控制缺陷：應用程式使用 client 提供的識別碼存取內部物件（檔案、紀錄、資源），**卻沒做授權驗證**。攻擊者只要修改識別碼，就可能取得他人資料或執行他人操作。<a href="https://cheatsheetseries.owasp.org/cheatsheets/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet.html?utm_source=chatgpt.com" target="_blank"></a>

在實務上，這些識別碼可能出現在請求的 **任何位置**：URL path（例如 `/users/1234`）、query 參數（`?account=987`）、header，或 JSON body。只要伺服器沒有對被引用的「特定資源」做授權判斷，就很容易出現 IDOR。

## IDOR 與 BOLA（API1:2023）

在 API 系統中，OWASP 將此歸類為 <a href="https://owasp.org/API-Security/editions/2023/en/0x11-t10/" target="_blank">Broken Object Level Authorization（BOLA）</a>，也是 API 風險第 1 名，因為 API 通常有大量接受物件 ID 的端點。修復原則相同：**凡是使用使用者可控制 ID 操作資料來源的函式，都必須做物件層級授權檢查**，不論 ID 是整數、UUID 還是字串。若要看更完整授權失敗議題，可參考我們的 [Broken Access Control 防護指南](/zh-hant/post/what-is-broken-access-control-vulnerability-and-how-to-prevent-it)。

## IDOR 如何發生，以及該如何思考

常見來源：

- **Path 與 query ID：** `/api/v1/invoices/42` 或 `?user_id=123`
- **Body 欄位：** client 傳入 `{ "org_id": "acme" }`
- **你未在伺服器驗證的 header/token：** 錯把未驗證 header 當成存取範圍依據

任何時候只要 **client** 能影響要讀取或修改的資源，伺服器都必須針對該資源 **重新驗證擁有權／權限**，即便呼叫者已登入，也即便 UI 已「隱藏」該連結。

## 真實世界案例

**Peloton（2021）**

****研究人員發現 Peloton 後端 API 即使使用者設定為私人，也會回傳 **私密使用者資料**，原因是部分端點缺少適當 authZ。Peloton 在揭露後修補問題。這是典型 API 的 **IDOR/BOLA** 模式。

來源：<a href="https://techcrunch.com/2021/05/05/peloton-bug-account-data-leak/" target="_blank">Techcrunch</a>、<a href="https://www.bankinfosecurity.com/peloton-api-flaws-exposed-users-data-prior-to-recent-patch-a-16534" target="_blank">bankinsecurity</a>、[salt.security](https://salt.security/blog/the-peloton-api-security-incident-what-happened-and-how-you-can-protect-yourself)

**Facebook 照片刪除漏洞（2013、2017）：**

不同漏洞曾允許攻擊者透過操控參數，執行 **刪除他人照片** 等操作；Facebook 修復後也發放獎金。雖然細節不同，核心問題一致：**伺服器端授權不足**，未確認操作者是否有權影響該物件。

來源：[Techcrunch](https://techcrunch.com/2013/09/02/security-researcher-discovers-bug-that-would-let-hackers-delete-any-photo-off-facebook/)、<a href="https://thehackernews.com/2017/11/facebook-delete-photos.html" target="_blank">The Hacker News</a>

## 開發、QA 與安全團隊如何找出 IDOR

**1) 在不同使用者／租戶間替換物件識別碼。**

以 **使用者 A** 登入，擷取讀取 A 資料的請求（如 `/orders/1001`）。重放同一請求但改成 **使用者 B** 的物件 ID（`/orders/1002`）。若伺服器回傳資料，即有 IDOR。也要對 **寫入**（編輯／刪除）與 **跨租戶** 測試。

**2) 測試 ID 可能藏的所有位置。**

****不要只測 path/query。也要測 body 欄位、巢狀 JSON、GraphQL 參數、不同 HTTP method，以及會觸及同一資源的次要端點。

**3) 將負向測試納入 CI。**

加入自動化測試，證明呼叫者 **不擁有** 物件或缺少角色時會被拒絕。這是避免回歸最可靠的方式。（例如：每個資源／操作做單元或契約測試，並預置多使用者／多租戶資料。）

**4) 檢查模式，不只檢查端點。**

若一個端點有漏洞，**搜尋整個程式碼庫中的同類模式**（使用 `id` 參數的 controller、可接收任意 ID 的 repository 等）。

## 如何預防 IDOR（實用清單）

**1) 預設拒絕，並集中授權邏輯**

****在 **可信伺服器端程式**（或你可控的 serverless function）實作授權。除明確公開資源外，**預設拒絕**，並透過可重用 policy 驗證授權（不要散落成大量 `if` 判斷）。

**2) 每個地方都做物件層級檢查**

****對每個透過 client ID 讀寫物件的 handler，驗證：

- 呼叫者是誰（subject）？
- 允許做什麼（角色／屬性／policy）？
- **subject 是否擁有該物件或有明確授權？**   OWASP API Top 10 建議：凡透過 user-supplied ID 存取資料來源，**每個函式** 都要做。

**3) 不要信任 client 提供的 claim**

****絕不要把請求中的 `user_id`、`org_id`、`tenant_id` 當成權威來源。應從已驗證身分上下文與伺服器端查詢導出 subject 與 scope。

**4) 優先使用 RBAC/ABAC，而非零散判斷**

****集中定義角色／屬性與 policy（如「資料擁有者或 `billing_admin` 可讀 `invoice`」），避免邊緣 controller 漏掉檢查，也更容易審查與稽核。

**5) 保護多租戶邊界**

****每次存取都確認 **租戶隔離**。可考慮在資料庫啟用 **row-level security**（若支援）把擁有權限制貼近資料層。（RLS 是強化手段，仍需應用層檢查。）

**6) 謹慎面對「不透明 ID」、CDN 與簽名 URL**

****不透明 ID（UUID）可降低枚舉風險，但 **不能** 取代授權。對內容傳遞請使用 **短時效簽名 URL**，並在簽發當下驗證權限。

**7) 記錄拒絕事件並限制枚舉速率**

****記錄被拒的存取嘗試（含 object ID、呼叫者、原因），並對端點做 **rate limiting**，讓暴力猜 ID 更顯眼、更緩慢。

## 有助防護的 API 設計模式

- **由 subject 推導存取：** 從 token/session 取 `subject_id`（與 tenant），不要從 request body 取。
- **能力／擁有權檢查：** 要求呼叫者對物件有可驗證關係（擁有者、成員、租戶管理員）。
- **策略決策點（PDP）：** 集中規則（如 OPA、Cedar 或自建），並在服務中一致呼叫。
- **資源作用域路由：** 依資源分組端點，進 handler 前由 middleware 先檢查擁有權／角色。
- **敏感操作升級驗證：** 對高風險操作（匯出 PPI、金流）要求 **新鮮驗證**（MFA 或 re-auth）與嚴格伺服器檢查。

## 常見問題

### **隱藏或雜湊 ID 就夠了嗎？**

****不夠。混淆有幫助，但 **授權** 才是核心控制。請把 client 視為不可信，*永遠* 在伺服器檢查擁有權／權限。

### **UUID 能防止 IDOR 嗎？**

不能。攻擊者仍可能重播或取得有效 ID。UUID 只是降低可猜性，你仍需 **每請求做 policy 判斷**。

**GraphQL 比 REST 更安全，不會有 IDOR 嗎？**

不會自動更安全。GraphQL resolver 一樣要做與 REST 相同的 **物件層級授權檢查**。請像測 REST 端點一樣，以跨使用者／租戶 ID 測試 resolver。

## 總結

IDOR 是一個簡單卻高衝擊的漏洞，因為它直接打在授權核心。只要有 **一個** handler 信任 client 傳入的物件 ID，整個資料模型都可能暴露。修復並不神秘：**預設拒絕、集中策略、在每個函式落實物件層級檢查**。再把負向測試放進 CI，並持續監看日誌——未來的你會感謝現在的你。

