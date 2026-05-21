---
title: "什麼是 SSL 憑證？開發者指南"
excerpt: "SSL 憑證做兩件事：加密連線並驗證伺服器身分。了解運作方式、三種憑證類型，以及憑證內含哪些欄位。"
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "什麼是 SSL 憑證？開發者指南"
metaDescription: "SSL 憑證是什麼、HTTPS 如何加密、三種憑證類型（DV、OV、EV），以及如何檢視自己的憑證。"
publishedAt: 2026-03-05T15:09:12.884Z
updatedAt: 2026-03-05T15:37:24.768Z
draft: false
---

## 什麼是 SSL 憑證？

**SSL 憑證**是一種數位憑證，同時完成兩件事：讓使用者的瀏覽器與網站伺服器之間能進行 **加密的 HTTPS 通訊**，並 **驗證伺服器身分**。沒有憑證時，瀏覽器與伺服器之間傳送的任何資料——密碼、付款資訊、工作階段權杖——都是以明文傳送，網路上的任何人都有可能攔截讀取。

當網址列顯示 `https://` 與鎖頭圖示，即表示連線受 SSL 憑證保護。若網站缺少憑證、憑證過期或設定錯誤，所有主流瀏覽器都會顯示警告——「不安全」標籤或整頁阻擋。

> 💡 **命名說明：**「SSL」代表 Secure Sockets Layer，是 1990 年代的原始協定，1999 年起由 **TLS（Transport Layer Security）** 取代。所有 SSL 版本皆有已知安全漏洞，現代伺服器均已停用。但產業仍慣稱「SSL 憑證」——SSL 與 TLS 常混用。完整脈絡見 [SSL 與 TLS 有何不同、為何重要](/zh-hant/post/ssl-vs-tls)。

## SSL／TLS 連線如何建立

瀏覽器以 HTTPS 連上網站時，在請求內容送出前，會在毫秒內完成 **TLS 交握（handshake）**：

1. **瀏覽器打招呼**——告知伺服器支援的 TLS 版本與加密演算法（cipher suites）。  
1. **伺服器送出憑證**——憑證内含伺服器公開金鑰，並由憑證機構（CA）數位簽章。  
1. **瀏覽器驗證憑證**——檢查到期日、網域名稱，以及憑證是否由受信任的 CA 簽發。  
1. **建立共用加密金鑰**——透過非對稱密碼學，瀏覽器與伺服器協商一次性工作階段金鑰，用於後續通訊加密。  
1. **資料安全傳輸**——自此所有內容皆以工作階段金鑰加密，中間人無法讀取。

憑證本身不負責加密資料；它的工作是提供**可信任的密碼學身分**，讓加密通道能安全建立。

## 三種 SSL 憑證類型

依發證 CA 對身分背後實體的查核深度，分為三級：

<div class='ag-table-wrap'><table class='ag-table'><thead><tr><th>類型</th><th>全名</th><th>CA 驗證內容</th><th>最適合</th><th>常見發證單位</th></tr></thead><tbody><tr><td>DV</td><td>網域驗證（Domain Validated）</td><td>你控制該網域（DNS 或檔案驗證）</td><td>個人網站、部落格、Web App、內部工具</td><td>Let's Encrypt、ZeroSSL</td></tr><tr><td>OV</td><td>組織驗證（Organization Validated）</td><td>網域控制權 + 組織法律存在</td><td>企業官網、B2B 入口、電商</td><td>DigiCert、Sectigo、GlobalSign</td></tr><tr><td>EV</td><td>延伸驗證（Extended Validation）</td><td>網域 + 嚴格法律與實體身分查核</td><td>銀行、大型企業、高信任交易</td><td>DigiCert、Entrust</td></tr></tbody></table></div>

**你需要哪一種？** 對多數 Web 應用與開發專案，Let's Encrypt 的 **DV** 憑證已足夠。加密強度與 OV、EV **相同**；差異在**身分查核深度**，而非加密等級。Let's Encrypt（DV、免費、每 90 天自動續約）適用絕大多數情境。

## SSL 憑證裡有什麼？

SSL 憑證採 **X.509** 格式。檢視時會看到多個結構化欄位：

<div class='ag-table-wrap'><table class='ag-table'><thead><tr><th>欄位</th><th>內容</th><th>範例</th></tr></thead><tbody><tr><td>Subject（主旨）</td><td>憑證核發給的網域（或組織）</td><td><code>CN=www.authgear.com</code></td></tr><tr><td>Issuer（發行者）</td><td>簽發此憑證的 CA</td><td><code>Let's Encrypt R11</code></td></tr><tr><td>Valid From／Valid To</td><td>憑證有效日期區間</td><td><code>2025-09-01 — 2025-11-30</code></td></tr><tr><td>Subject Alternative Names（SANs）</td><td>憑證涵蓋的所有網域與子網域</td><td><code>authgear.com, www.authgear.com, *.authgear.com</code></td></tr><tr><td>公開金鑰（Public Key）</td><td>TLS 交握時伺服器使用的公開金鑰</td><td>RSA 2048-bit 或 ECDSA P-256</td></tr><tr><td>簽章演算法（Signature Algorithm）</td><td>CA 簽署憑證時使用的演算法</td><td><code>SHA-256 with RSA</code></td></tr><tr><td>序號（Serial Number）</td><td>CA 指派的唯一 ID，用於撤銷追蹤</td><td>長十六進位字串</td></tr></tbody></table></div>

你可對任何網域檢視上述欄位——到期日、發證者、SANs、鏈結狀態等——使用 [Authgear SSL 檢查工具](/zh-hant/tools/ssl-checker)。輸入網域後按檢視即可。

## Subject Alternative Names（SANs）為何重要

**SANs** 定義憑證涵蓋的每個網域與子網域。單一憑證可包含：

- 精確網域：`authgear.com`  
- 萬用字元：`*.authgear.com`（涵蓋 `www`、`api`、`docs` 等任意子網域）  
- 同一憑證上的多個不相關網域  

若你的 App 呼叫的子網域**未**列在憑證的 SANs 中，即使憑證本身有效，仍會出現 SSL 錯誤。除錯子網域 SSL 或新增子網域後，務必檢查 SANs。

## SSL 憑證過期會怎樣？

憑證有效期限一過，瀏覽器會顯示整頁阻擋：「你的連線不是私人連線」。多數使用者不會繼續，對真實流量而言網站等同下線。

**沒有寬限期**——23:59 仍有效的憑證，在午夜即視為過期。

> ⚠️ **常見正式環境事故：** Let's Encrypt 自動續約由 cron 執行。你更新伺服器防火牆時不小心擋住 **80 埠**（HTTP-01 驗證需要），續約靜默失敗。90 天後憑證在凌晨 3 點過期，使用者開始遇到 SSL 錯誤。這是最可預防、卻也最常見的 HTTPS 中斷原因之一。

產業正走向**更短**的憑證效期。Apple 與 Google 正推動 CA／瀏覽器論壇將所有憑證類型上限壓到 90 天。**自動續約**不是選配，而是基本要求。

## 如何檢查 SSL 憑證

### 選項 1：Authgear SSL 檢查工具（無需設定）

開啟 [Authgear SSL 檢查工具](/zh-hant/tools/ssl-checker)，輸入網域，即可一次看到憑證欄位、到期日、SANs、發證者與完整憑證鏈狀態——無需登入。

> 🔒 **建議：** 每次正式部署前跑一次 SSL 檢查，確認憑證有效、鏈結完整，且 SANs 涵蓋所有使用的子網域。鏈結議題見 [SSL 憑證鏈是什麼、如何修復中斷的鏈](/zh-hant/post/ssl-certificate-chain)。

### 選項 2：OpenSSL（命令列）

```
# 連線到伺服器並顯示完整憑證鏈
openssl s_client -connect www.authgear.com:443 -showcerts

# 以人類可讀格式顯示憑證欄位
echo | openssl s_client -connect www.authgear.com:443 2>/dev/null | openssl x509 -noout -text

# 僅檢查到期日
echo | openssl s_client -connect www.authgear.com:443 2>/dev/null | openssl x509 -noout -dates
```

## 驗證系統中的 SSL／TLS

SSL 憑證不只是官網上的鎖頭。在驗證系統中，它們是基礎安全層：

- **登入頁必須 HTTPS**——以明文 HTTP 送出憑證會遭網路攔截。現代瀏覽器會將 HTTP 登入表單標為「不安全」。  
- **OAuth 要求 HTTPS 重新導向 URI**——Google、Apple、GitHub 與多數 OAuth 提供者拒絕非 HTTPS 的 redirect URI；沒有有效憑證驗證流程會失敗。  
- **API 客戶端預設拒絕無效憑證**——各主要語言的現代 HTTP 函式庫會拒絕過期或設定錯誤的伺服器憑證，影響伺服器對伺服器的 API 呼叫，不僅瀏覽器請求。  
- **mTLS（雙向 TLS）**——進階模式，客戶端與伺服器互呈憑證。用於零信任架構、內部服務網格與高安全 API 端點。

Authgear 在所有驗證端點自動強制 HTTPS。若你自建驗證層，正確設定的 SSL 憑證是第一步。接著可讀 [SSL 憑證鏈](/zh-hant/post/ssl-certificate-chain)——許多在本機測試通過、上線後卻故障的靜默 SSL 設定問題，根源常在憑證鏈。

## SSL 憑證檢查清單

- 憑證來自受信任 CA（Let's Encrypt、DigiCert、Sectigo 等）  
- 憑證未過期——[查到期日](/zh-hant/tools/ssl-checker)  
- Subject 中的網域與實際服務的網域一致  
- SANs 涵蓋你使用的所有子網域  
- 憑證鏈完整（有提供中繼 CA 憑證）  
- 簽章演算法為 SHA-256 或更高（非 MD5 或 SHA-1）  
- 已設定並監控自動續約  
