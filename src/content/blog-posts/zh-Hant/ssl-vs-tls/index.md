---
title: "SSL 與 TLS 有何不同？為什麼重要？"
excerpt: "SSL 已淘汰，伺服器實際用的是 TLS——但為什麼大家仍說 SSL？了解歷史、擊垮 SSL 的攻擊，以及現在該用什麼。"
coverImage: ./cover.jpg
category: engineering
featured: false
metaTitle: "SSL 與 TLS 有何不同？為什麼重要？"
metaDescription: "SSL 已死，你實際用的是 TLS。技術差異、導致 SSL 下市的漏洞，以及如何檢查伺服器協定的 TLS 版本。"
publishedAt: 2026-03-05T15:10:28.757Z
updatedAt: 2026-03-05T15:37:29.698Z
draft: false
---

## 為什麼 SSL 與 TLS 常被混用？

若你接觸過 Web 安全，會發現「SSL」與「TLS」幾乎被當成同一件事。「SSL 憑證」其實是 **TLS 憑證**。「SSL 檢查工具」檢查的是 TLS。「SSL 交握」是 TLS 交握。混淆無所不在。

簡單說：**SSL 已死，但名字留了下來。**

**SSL（Secure Sockets Layer）** 是 1990 年代中期 Netscape 為 Web 加密的原始協定。**TLS（Transport Layer Security）** 於 1999 年取代 SSL。每個 SSL 版本都因嚴重、可利用的安全漏洞而被廢止，現代伺服器與瀏覽器均已停用。但在 SSL 退役時，它已成為「網頁加密」的通稱——產業詞彙從未完全更新。

今天任何人說「SSL 憑證」或「SSL 連線」，指的幾乎都是 **TLS**。X.509 憑證格式未變；變的是**協定**。憑證內含與連線如何運作，見 [什麼是 SSL 憑證？開發者指南](/zh-hant/post/what-is-ssl-certificate)。

## 歷史：從 SSL 到 TLS

<div class='ag-table-wrap'><table class='ag-table'><thead><tr><th>版本</th><th>年份</th><th>狀態</th><th>說明</th></tr></thead><tbody><tr><td>SSL 1.0</td><td>從未釋出</td><td>放棄</td><td>內部發現嚴重缺陷，從未上市</td></tr><tr><td>SSL 2.0</td><td>1995</td><td>已廢止（RFC 6176，2011）</td><td>首個公開版；加密設計弱、協定缺陷</td></tr><tr><td>SSL 3.0</td><td>1996</td><td>已廢止（RFC 7568，2015）</td><td>易受 POODLE（2014）攻擊；各地已停用</td></tr><tr><td>TLS 1.0</td><td>1999</td><td>已廢止（RFC 8996，2021）</td><td>易受 BEAST、TLS 版 POODLE 影響；PCI-DSS 2018 年起禁用</td></tr><tr><td>TLS 1.1</td><td>2006</td><td>已廢止（RFC 8996，2021）</td><td>相對 1.0 小幅修正；2021 年一併廢止</td></tr><tr><td>TLS 1.2</td><td>2008</td><td>現行——廣泛支援</td><td>SHA-256、現代 cipher suites；多數流量仍以此為基線</td></tr><tr><td>TLS 1.3</td><td>2018</td><td>現行——建議優先</td><td>交握更快、強制前向保密、移除舊式演算法</td></tr></tbody></table></div>

今日你的伺服器幾乎一定協商 **TLS 1.2** 或 **TLS 1.3**。更舊版本預設停用，或被瀏覽器與客戶端主動阻擋。

## 技術差異：SSL 與 TLS

SSL 3.0 與 TLS 1.0 非常接近——TLS 1.0 早期草案內部稱為「SSL 3.1」。隨 TLS 成熟，差異變大：

<div class='ag-table-wrap'><table class='ag-table'><thead><tr><th>特性</th><th>SSL 3.0</th><th>TLS 1.2</th><th>TLS 1.3</th></tr></thead><tbody><tr><td>訊息驗證</td><td>MD5／SHA-1（弱）</td><td>HMAC-SHA-256（強）</td><td>僅 AEAD cipher（更強）</td></tr><tr><td>交握往返次數</td><td>2 次 RTT</td><td>2 次 RTT</td><td>1 次 RTT（可 0-RTT 恢復連線）</td></tr><tr><td>前向保密（Forward secrecy）</td><td>不支援</td><td>可選（ECDHE／DHE cipher suites）</td><td>所有連線強制</td></tr><tr><td>舊式 cipher</td><td>RC4、DES、出口級加密</td><td>若啟用仍可能選到弱 cipher（危險）</td><td>規格中已移除所有舊 cipher</td></tr><tr><td>支援的憑證類型</td><td>僅 RSA</td><td>RSA + ECDSA</td><td>RSA + ECDSA + EdDSA</td></tr></tbody></table></div>

### 什麼是前向保密？

**前向保密**（亦稱 Perfect Forward Secrecy, PFS）表示：即使攻擊者**現在**錄下所有加密流量，**日後**取得你伺服器的私密金鑰，仍**無法**解密過去的流量。每個 TLS 工作階段都會產生新的短效加密金鑰，不儲存、不重複使用。

沒有前向保密：攻擊者現在錄流量、日後偷到私密金鑰，即可解密一切——這是所有 SSL 年代的現實。有前向保密：即使私密金鑰日後外洩，過去工作階段仍安全。**TLS 1.3** 對每條連線**強制**前向保密。

## 擊垮 SSL 的漏洞

SSL 不是因「過時」而廢止，而是被具體、公開展示的攻擊打垮：

### POODLE（2014）

POODLE（Padding Oracle On Downgraded Legacy Encryption）利用 SSL 3.0 區段加密填補（padding）。能坐在使用者與伺服器之間並注入 JavaScript 的攻擊者，可強制 TLS 連線**降級**到 SSL 3.0，再以 padding oracle 逐位元組解密工作階段 Cookie。實務上：同網路攻擊者可竊取已驗證工作階段。

修正方式是完全停用 SSL 3.0——無法打補丁。2014–2015 年所有瀏覽器與伺服器營運商皆停用 SSL 3.0。

### BEAST（2011）

BEAST（Browser Exploit Against SSL／TLS）利用 TLS 1.0（承自 SSL）CBC 模式缺陷。能對受害者瀏覽器注入 JavaScript 並觀察加密流量的攻擊者，可逐步還原明文——主要是 HTTP Cookie，導致工作階段劫持。BEAST 推動產業走向 TLS 1.2，並加速 TLS 1.0 廢止。

### DROWN（2016）

DROWN 顯示：若**任何**伺服器——即使是另一台——共用同一組 RSA 私密金鑰且仍支援 SSL 2.0，攻擊者可用該弱點解密**主要**伺服器的 TLS 1.2 工作階段。自認已完全遷移到 TLS 的組織，仍可能因共用金鑰而暴露。

> 🔒 **今日意涵：** 若伺服器正確設定為僅 **TLS 1.2 或 1.3**，即不受上述攻擊影響。請用 [Authgear SSL 檢查工具](/zh-hant/tools/ssl-checker) 確認實際協商的協定版本。

## TLS 1.2 與 TLS 1.3：該升級嗎？

正確設定的 **TLS 1.2** 仍廣用且安全。**TLS 1.3** 在設計上更快、更安全：

- **交握更快**——TLS 1.3 將交握從 2 次 RTT 減為 1 次，在高延遲行動網路尤其有感。  
- **0-RTT 恢復**——回訪連線可在交握完成前送出應用資料，但需權衡重放攻擊風險。  
- **不再協商舊演算法**——TLS 1.3 從規格移除所有弱 cipher；不像 TLS 1.2 若設定不慎仍可能啟用弱套件。

**建議設定：** 同時支援 **TLS 1.2 與 TLS 1.3**，其餘全部停用。現代客戶端皆支援 TLS 1.3，但部分舊企業系統與 IoT 仍僅支援 TLS 1.2。

```
# Nginx：支援 TLS 1.2 與 1.3，停用更舊版本
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
ssl_prefer_server_ciphers off;
```

## 如何檢查伺服器協商的 TLS 版本

### 選項 1：Authgear SSL 檢查工具（無需設定）

[Authgear SSL 檢查工具](/zh-hant/tools/ssl-checker) 會在完整憑證資訊旁顯示伺服器協商的 **TLS 協定版本**。不確定伺服器用哪一版？跑一遍 SSL 檢查——TLS 版本、cipher suite 與憑證細節會一併呈現。

### 選項 2：OpenSSL

```
# 檢視協商的 TLS 版本（在輸出中找 "Protocol"）
openssl s_client -connect yourdomain.com:443

# 強制使用 TLS 1.3
openssl s_client -connect yourdomain.com:443 -tls1_3

# 強制使用 TLS 1.2
openssl s_client -connect yourdomain.com:443 -tls1_2

# 確認舊版已停用（以下應失敗或拒絕連線）
openssl s_client -connect yourdomain.com:443 -tls1    # TLS 1.0 — 應失敗
openssl s_client -connect yourdomain.com:443 -tls1_1  # TLS 1.1 — 應失敗
```

## 驗證與安全中的 TLS

對驗證系統而言，TLS 是所有上層機制依賴的傳輸層安全：

- **權杖安全**——OAuth access token、JWT bearer token、工作階段 Cookie 若以 HTTP 傳送會完全暴露；實務上靠 TLS 才讓權杖式驗證安全可行。  
- **OAuth 2.0 要求 TLS**——OAuth 2.0 規格（RFC 6749）規定授權端點與權杖端點必須使用 TLS。沒有 HTTPS 就沒有 OAuth。  
- **mTLS（雙向 TLS）**——標準 TLS 僅伺服器出示憑證；mTLS 下客戶端亦出示憑證，實現密碼學上的客戶端驗證。用於服務網格、零信任網路與高安全 API。Authgear 企業部署支援 mTLS。  
- **憑證釘選（Certificate pinning）**——行動 App 有時「釘選」特定憑證或公開金鑰，若伺服器出示不同憑證即拒絕連線，可防 MITM 即便 CA 遭入侵；但憑證續約規劃需格外謹慎。

## 摘要：SSL 與 TLS

- **SSL 已廢止**——SSL 2.0 與 3.0 在所有現代軟體中均已停用。  
- **你實際使用的是 TLS**——**TLS 1.2** 與 **TLS 1.3** 為現行標準。  
- **憑證格式相同**——無論稱 SSL 或 TLS 憑證，X.509 格式不變；名稱沿用，協定已演進。  
- **設定為 TLS 1.2 + 1.3，停用更舊版本**——2026 年建議的正式環境設定。  
- **TLS 1.3 更快、更乾淨**——與 TLS 1.2 並行啟用，在安全與相容性間取得最佳平衡。

## 下一步

- 用免費 [Authgear SSL 檢查工具](/zh-hant/tools/ssl-checker) [檢查你的 TLS 版本](/zh-hant/tools/ssl-checker)  
- 在 [什麼是 SSL 憑證？開發者指南](/zh-hant/post/what-is-ssl-certificate) 了解憑證內容  
- 在 [SSL 憑證鏈：是什麼、如何修復中斷的鏈](/zh-hant/post/ssl-certificate-chain) 診斷鏈結問題  
