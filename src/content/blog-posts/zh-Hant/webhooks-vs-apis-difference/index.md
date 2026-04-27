---
title: "Webhooks 與 API 有何不同？"
excerpt: "現今多數產品會整合付款、身分、訊息與分析工具。串接主要靠兩種模式：API 與 webhooks。"
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "Webhook vs API：差異與何時使用"
metaDescription: "了解 webhooks 與 API 的差異、何時用哪一種、如何搭配。涵蓋輪詢對 webhooks、安全與實例。"
publishedAt: 2026-03-13T21:30:38.236Z
updatedAt: 2026-03-13T22:01:17.429Z
draft: false
---

現今多數產品會整合付款平台、身分提供者、訊息服務與分析工具。這些串接大多仰賴兩種通訊模式：**API** 與 **webhooks**。

兩者都用 HTTP，但解決的問題不同。**API** 讓一個應用向另一個系統請求資料或觸發動作。**Webhook** 則在特定事件發生時，自動把資料送到你設定的端點。知道何時用哪一種——以及如何搭配——是建置可靠整合的核心能力。

## 理解 API

**API（應用程式介面）** 是讓應用彼此互動的定義介面。API 暴露特定操作，供外部系統呼叫以取得資料或觸發行為。

多數 Web API 走 HTTP，採 **請求—回應** 模式：客戶端發請求，伺服器處理後回傳回應。API 如同受控閘道——不直接暴露內部資料庫或服務，只露出外部呼叫者需要的部分。

典型 SaaS 可能透過 API 提供：

- 取得使用者設定檔  
- 建立或更新資源  
- 取得分析資料  
- 管理帳戶設定  
- 觸發營運流程  

因為**由客戶端主動發起**每次請求，API 是 **pull（拉）**：你的系統在需要時才去取資料。

## API 如何運作

### API 請求—回應流程

1. **客戶端發送請求**——行動 App、前端或後端服務對 API 端點發 HTTP 請求。  
1. **驗證身分**——伺服器以 API 金鑰、OAuth 權杖或工作階段憑證驗證呼叫者。  
1. **伺服器處理**——查資料庫、執行業務邏輯或呼叫其他服務。  
1. **伺服器回應**——回傳狀態碼與所需資料。  
1. **客戶端處理結果**——解讀回應並繼續流程。

儀表板每次載入都呼叫分析 API，是典型例子：客戶端在需要時**拉**最新資料。

## Webhooks 是什麼？

Webhook 方向相反：不等客戶端來問，系統在事件發生時**自動**把資料送到你預先登記的 URL。

Webhook 是**由事件觸發的自動 HTTP POST**。發送方把事件資料打包成 JSON，送到你註冊的端點。

常見事件包括：

- 新使用者註冊  
- 付款成功  
- 部署完成  
- 訂閱取消  
- 使用者登入或驗證事件  

因為**由伺服器主動推送**，webhooks 是 **push（推）**：事件一發生資料就送達，不必由你的系統反覆詢問。

## Webhooks 如何運作

### Webhook 事件流程

1. **註冊 webhook 端點**——你的應用提供要接收通知的 URL。  
1. **來源系統發生事件**——付款成功、使用者註冊、驗證事件觸發。  
1. **來源系統組 payload**——建立描述事件的 JSON。  
1. **發送 HTTP POST**——將 payload 送到你註冊的端點。  
1. **你的伺服器處理**——驗證請求後執行對應動作：更新紀錄、寄信、記錄等。

典型 payload 範例：

```json
{
  "event": "user.login",
  "timestamp": "2026-03-13T17:00:00Z",
  "resource_id": "usr_abc123",
  "metadata": {
    "ip_address": "203.0.113.42",
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)..."
  }
}
```

Webhook 僅在事件發生時觸發，對即時通知遠比輪詢有效率。

## Webhooks 與 API：重點差異

<div class="ag-table-wrap"><table class="ag-table"><thead><tr><th>面向</th><th>API</th><th>Webhook</th></tr></thead><tbody><tr><td>通訊模型</td><td>請求—回應</td><td>事件驅動</td></tr><tr><td>發起方</td><td>客戶端</td><td>伺服器</td></tr><tr><td>資料流</td><td>Pull</td><td>Push</td></tr><tr><td>時機</td><td>依需求</td><td>即時</td></tr><tr><td>主要用途</td><td>存取資料與操作</td><td>事件通知</td></tr><tr><td>HTTP 方法</td><td>GET、POST、PUT、DELETE</td><td>POST</td></tr></tbody></table></div>

核心差在**誰主動**：API 是你的系統去要資料；webhook 是對方系統在有事發生時告訴你。

## API 輪詢 vs Webhooks

**輪詢**指反覆呼叫 API 檢查狀態是否改變——例如每隔幾秒查一次付款是否完成。

### 輪詢流程

1. 客戶端請求目前狀態  
1. 伺服器回傳目前狀態  
1. 客戶端等待數秒  
1. 再次請求  
1. 重複直到狀態改變  

可行但浪費：若成千上萬客戶端每幾秒輪詢同一端點，多半時候資料根本沒變，卻產生大量流量。

### Webhook 流程

1. 來源系統發生事件  
1. 伺服器發送一次 webhook  
1. 你的伺服器處理更新  

Webhook 可完全省掉不必要請求，並降低延遲——事件一發生即反應，不必等下一輪輪詢。

## 實務範例

多數現代平台會**同時**使用 API 與 webhooks。

### 付款平台

- 你的 App 透過 API 建立付款工作階段  
- 使用者在供應商頁面完成付款  
- 供應商以 webhook 通知成功  
- 你的 App 更新訂單並觸發出貨  

Stripe 即為一例：API 建立扣款，webhook 非同步傳送 `payment_intent.succeeded` 或 `charge.failed`。

### CI／CD

- 推送到 main 分支觸發 GitHub webhook  
- CI 系統啟動建置  
- 建置狀態與日誌經 CI 的 API 取得  

### 身分驗證平台

身分平台用 webhook 即時傳送你的 App 可處理的事件：

- 新使用者註冊  
- 登入活動  
- 重設密碼請求  
- 帳戶刪除  

這些事件驅動分析、安全監控、入職自動化與稽核記錄——無須對身分狀態變化做輪詢。

## Webhook 安全

網路上任何人都能對你的 webhook URL 發 POST。未妥善驗證時，攻擊者可偽造事件。建議：

### 簽章驗證

多數 webhook 供應商會在標頭附上密碼學簽章（如 `X-Signature-256`）。以共用密鑰計算預期 HMAC，簽章不符即拒絕。**最重要的一環，不可略過。**

### 僅 HTTPS

Webhook 端點務必使用 HTTPS；否則 payload 明文傳輸，可能被攔截或竄改。

### 時間戳驗證

payload 或標頭常含時間戳。拒絕過舊事件（例如超過數分鐘）可防**重放攻擊**（重送已擷取的合法請求）。

### IP 允許清單

部分供應商公布 webhook 來源 IP 範圍；僅允許這些位址入站可再加一層防護。

### 等冪處理

供應商會重試失敗的傳送——同一事件可能送達多次。處理邏輯應**等冪**：處理兩次與處理一次結果相同。以 **event ID** 去重。

## Webhook 可靠性

若事件發生時你的端點離線，傳送會失敗。多數平台會：

- 指數退避自動重試  
- 提供每筆事件成功／失敗的傳送紀錄  
- 對重試耗盡的事件進入死信佇列  

端點應**快速回應**：立即回 `2xx`，再以背景工作佇列非同步處理。若同步做重運算，容易逾時而觸發重試。

## API 設計模式

### REST API

REST 最常見。資源對應可預測 URL，HTTP 方法表示操作：

```http
GET    /users           # 列出使用者
POST   /orders          # 建立訂單
PUT    /accounts/{id}   # 更新帳戶
DELETE /sessions/{id}   # 刪除工作階段
```

### GraphQL

GraphQL 以單一端點接受結構化查詢，客戶端只取需要的欄位，減少 over-fetching 與往返次數。

### 速率限制

API 通常有 rate limit 以防濫用、保護基礎建設。客戶端應處理 `429 Too Many Requests` 並實作退避重試。

## Webhook 實作模式

### 事件訂閱

不要訂閱平台上所有事件，只訂閱整合所需：

<ul><li><code>user.created</code></li><li><code>login.success</code></li><li><code>payment.completed</code></li><li><code>subscription.cancelled</code></li></ul>

選擇性訂閱可降低雜訊、讓處理器較易維護。

### 結構化 Payload

良好的 webhook 應包含：事件類型、時間戳、資源識別碼、相關 metadata。跨事件一致結構，可寫通用驗證與路由邏輯。

### 傳送紀錄與版本

整合與除錯時善用供應商的傳送紀錄。payload 演進時可用版本標頭（如 `X-Webhook-Version: 2`）讓消費端漸進遷移。

## 結合 API 與 Webhooks

實務上多數整合兩者並用。典型模式：

1. 你的 App 呼叫 API 建立或更新資源  
1. 平台執行動作  
1. 相關事件發生時平台發 webhook  
1. 你的 App 處理事件並更新自身狀態  

身分平台範例：

- API 建立新帳戶  
- 使用者完成登入  
- 驗證事件觸發 webhook  
- 你的 App 寫入安全監控系統  

## 何時用 API vs Webhooks

### 適合用 API 時

- 需要依需求讀取或修改資料  
- 由客戶端控制請求時機  
- 需要篩選查詢或複雜操作  
- 以程式觸發動作  

### 適合用 Webhooks 時

- 需要對事件**即時**反應  
- 輪詢 API 會造成不必要負載  
- 需依外部狀態變更觸發流程  
- 建置事件驅動自動化  

## 為何 Webhooks 對驗證特別重要

驗證系統本質上**事件密集**：每次登入、註冊、重設密碼、MFA 驗證、刪帳都是你的應用可能需要處理的事件。

沒有 webhooks 就只能**輪詢**身分狀態——對需立即處理的事件不切實際。Webhook 讓你能：

- 即時偵測並告警可疑登入模式  
- 使用者一註冊即觸發入職流程  
- 帳戶變更時撤銷工作階段或通知使用者  
- 將驗證事件送入稽核或 SIEM  

[Authgear 的 webhook／事件系統](https://docs.authgear.com/integrate/events-hooks) 會在註冊、登入、MFA 完成、刪帳等事件**當下**送到你的端點，無需在輪詢間隔後才追上狀態。

## 結論

API 與 webhooks 是**互補**工具，非二選一。API 讓你的系統主控：在需要時取資料、觸發動作。Webhook 讓對方系統有聲音：一有值得處理的事就通知你。

身分整合中 webhook 特別有價值——身分事件具時效，輪詢無法擴展。以驗證活動建置事件驅動流程，系統會更即時、更有效率。

若要了解 Authgear 的 webhook 傳送、事件類型與簽章驗證，見 [Authgear 事件與 Hooks 文件](https://docs.authgear.com/integrate/events-hooks)。或[開始使用 Authgear](https://portal.authgear.com/)，為應用加入驗證事件 webhook。

## 常見問題

### Webhook 與 API 差在哪？

API 需要你的系統**發請求**才能取得資料或觸發動作。Webhook 在事件發生時**自動**把資料送到你的系統。API 是依需求拉資料；webhook 是即時推資料。

### 何時該用 webhook 而非輪詢 API？

當你需要**立即**對事件反應，且不知道事件何時發生。輪詢適合排程取資料，但對事件驅動情境浪費——多數請求沒有新資料。

### API 與 webhook 能一起用嗎？

可以——多數整合兩者並用。API 處理 CRUD；webhook 在操作產生事件時送通知。例如付款 App 以 API 建立扣款，客戶付款後收到 `payment.succeeded` webhook。

### Webhook 比 API 輪詢更有效率嗎？

是。Webhook 在事件發生時**只送一次**。輪詢不論是否有變化都持續請求，浪費頻寬並增加雙方伺服器負載。

### 如何保護 webhook 端點？

驗證每則請求的密碼學簽章（共用密鑰）、強制 HTTPS、拒絕過舊時間戳以防重放，並讓處理器**等冪**，重複送達不產生副作用。

<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Webhook 與 API 差在哪？","acceptedAnswer":{"@type":"Answer","text":"API 需你的系統發請求才能取得資料或觸發動作。Webhook 在事件發生時自動把資料送到你的系統。"}},{"@type":"Question","name":"何時用 webhook 而非輪詢 API？","acceptedAnswer":{"@type":"Answer","text":"需立即對事件反應時。輪詢適合排程取資料，對事件驅動情境多數請求無新資料。"}},{"@type":"Question","name":"API 與 webhook 能一起用嗎？","acceptedAnswer":{"@type":"Answer","text":"可以。API 處理 CRUD；webhook 在操作產生事件時送通知。"}},{"@type":"Question","name":"Webhook 比輪詢更有效率嗎？","acceptedAnswer":{"@type":"Answer","text":"是。Webhook 事件發生時只送一次；輪詢不論是否有變化都持續請求。"}},{"@type":"Question","name":"如何保護 webhook 端點？","acceptedAnswer":{"@type":"Answer","text":"驗證簽章、HTTPS、拒絕過舊時間戳、等冪處理重複送達。"}}]}</script>
