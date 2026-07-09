---
title: "Base64 超好懂：如何編碼與解碼資料"
h1: "Base64 超好懂：如何編碼與解碼資料（附免費線上工具）"
excerpt: "了解 Base64 編碼如何運作、為何會被使用，以及如何安全編碼與解碼資料。含實務範例與免費線上 Base64 工具。"
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "Base64 超好懂：如何編碼與解碼資料（附免費線上工具）"
metaDescription: "了解 Base64 編碼如何運作、為何會被使用，以及如何安全編碼與解碼資料。含實務範例與免費線上 Base64 工具。"
publishedAt: 2025-12-03T19:25:11.735Z
updatedAt: 2026-02-12T02:33:17.659Z
draft: false
---

現代網路中的資料以各種格式流動，但並非所有系統都能安全處理原始二進位資料。

Base64 透過把二進位資料轉成文字安全格式，讓資料能在電子郵件、API、Web 表單與瀏覽器腳本中可靠傳輸。從 JWT、JSON payload 到 QR code 與郵件附件，都看得到它。

若對 Base64 不熟，常會遇到 padding 錯誤、URL-safe 變體不一致或解碼失敗。它的價值在於簡單且一致，是在文字環境中傳遞二進位資料的關鍵工具。

本文會用實務角度說明 Base64：它如何運作、何時該用、要避免哪些常見陷阱，以及如何高效率完成編碼與解碼。

## **什麼是 Base64？**

Base64 是一種 binary-to-text 編碼方法，可把檔案、圖片或任意 raw bytes 轉為 ASCII 友善字元序列。像郵件、日誌、API 這些以文字為核心的系統，往往無法直接安全承載二進位資料；Base64 能避免傳輸毀損。

但 Base64 並不是加密，也不提供真正安全性。任何人都可執行解碼拿回原始資料。

### **為什麼會有 Base64？**

早期網際網路協定多半不是為二進位資料設計。

為了避免資料在限制性系統中傳輸時被破壞，工程師需要把二進位內容表示成「乾淨文字」。Base64 因此成為標準格式，可安全穿越郵件閘道、代理伺服器與文字型 API。

即使到了今天，在 REST API、OAuth 流程與 serverless 日誌等場景，二進位傳輸問題仍存在。Base64 仍是最簡單的封裝方式。

## **Base64 如何運作？**

Base64 會把二進位資料分組並映射到有限字元集。它取 3 bytes（24 bits），切成 4 個 6-bit 區塊，再將每個區塊映射為 64 個允許字元之一。若最後區塊不足，會用 `=` padding 補齊。

這個過程可完全逆轉，任何 Base64 字串都能解碼回原始二進位，因此非常適合序列化、除錯與 API 架構。

<!--FIGURE-->
![](./figure-1.webp)
<!--/FIGURE-->

## **Base64 安全嗎？**

Base64 不是加密，絕對不應被當作加密使用。它不隱藏資料、不保證機密性，也不防止篡改。因為任何人都可用內建工具或線上工具快速解碼，敏感資料仍必須用加密或正確驗證機制保護。

如果你在做身分驗證或身分功能，像 Authgear 這樣的平台會處理 TOTP、通行密鑰、復原碼與 token 簽章等真正的安全層；Base64 只是安全傳輸資料的輔助層。

## **何時該使用 Base64？**

當二進位資料必須經過只接受文字的系統或協定時，Base64 非常實用。它可確保原始位元組保持完整。

### **1. 在 HTML 或 CSS 內嵌圖片**

開發者偶爾會把小圖示直接轉 Base64 內嵌在 HTML/CSS，減少 HTTP 請求。

範例：

`<img src="data:image/png;base64,iVBORw0KGgoAAAANSUh...">`

小資產可加快載入；大圖仍應外部引用。

### **2. 透過 JSON API 傳送二進位資料**

JSON 本質是文字格式，不支援 raw binary。若要經由 JSON 傳檔案、圖片或憑證 blob，需先用 Base64 編碼。

接收端再解碼還原原始檔案。這在行動 App、IoT 與 SaaS 後端很常見。

### **3. 處理 JWT、OAuth Token 與 Web 身分系統**

驗證系統大量使用 Base64URL（Base64 的 URL 安全變體）。JWT 的 header 與 payload 都是 Base64URL，可安全放在 URL、cookie 與 HTTP header 中。

請記得 JWT 通常是「簽章」而非「加密」，內容依然可被解碼。你在 Authgear 除錯身分流程時，會經常檢視這些 token 片段。

### **4. 郵件附件與 MIME 編碼**

電子郵件誕生於二進位檔案普及之前。為了安全傳輸附件，Base64 被納入 MIME 標準。大多數郵件客戶端會自動編解碼。

### **5. 在資料庫存放小型二進位片段**

有些資料庫不易管理 binary 欄位。把縮圖、金鑰或小型設定包轉成 Base64，較容易記錄、查詢與序列化。但大型檔案仍建議用物件儲存。

## **如何編碼與解碼 Base64？**

多數語言都有內建 Base64 支援，以下展示常見語言使用方式。

### **JavaScript**

**Browser APIs:**

`const encoded = btoa("Hello World");`

`const decoded = atob(encoded);`

`btoa` 是 binary-to-ascii，`atob` 是 ascii-to-binary。

**Node.js version:**

const encoded = Buffer.from("Hello World").toString("base64");

const decoded = Buffer.from(encoded, "base64").toString("utf8");

### **Python**

Python 的 Base64 模組可輕鬆完成編碼與解碼。

### **Go**

Go 標準函式庫也提供乾淨實用的 Base64 工具。

### **Java**

Java 內建標準與 URL-safe Base64 工具。

### **Bash**

Shell 是快速試驗 Base64 的簡單環境。

**Encode:**

`echo -n "Hello World" | base64`

**Decode:**

`echo -n "SGVsbG8gV29ybGQ=" | base64 --decode`

## **Base64 vs Base64URL**

Base64URL 是為 URL、cookie 與驗證流程設計的 Base64 變體。它替換 URL 中易被誤解的字元，且常省略 padding，因此更適合 OAuth、OIDC 與 JWT。

若你在 Authgear 或其他身分平台操作 token，會非常常見 Base64URL。

<!--FIGURE-->
![](./figure-2.webp)
<!--/FIGURE-->

## **Base64 編碼流程**

了解 Base64 內部流程有助於除錯：

1. 資料轉為 bytes
1. 每 24-bit 分塊
1. 每塊再切為 4 個 6-bit
1. 映射到 Base64 字元集
1. 若長度非 3 的倍數，補 `=` padding

這個結構化流程可確保跨語言與跨平台一致。

## **開發者常見錯誤**

### **1. 把 Base64 當加密**

Base64 可讀且可逆，不可把憑證、API key 或個資僅以 Base64 儲存。

### **2. 混淆 Base64 與 Base64URL**

兩者相似但不同。Base64URL 字串不一定能直接用 Base64 解碼，需先轉字元與補 padding。

### **3. 重複編碼**

已是 Base64 的資料又被編碼一次，常造成 API 失敗、簽章不符或檔案傳輸損壞。

### **4. 對大型檔案使用 Base64**

Base64 會讓資料變大約 33%。大型物件建議改用 binary 儲存或串流。

## **何時不該使用 Base64？**

避免在下列情境使用 Base64：

- 傳輸大型檔案
- 高效能資料管線
- 長期儲存大型二進位 blob
- 敏感資料需要真正安全保護
- 已可使用二進位友善傳輸格式

## **在 Base64 除錯時使用 Authgear**

開發者常需要快速檢查編碼資料。Authgear 提供免費的 [Base64 Decode & Encode 工具](/zh-hant/tools/base64-decode-encode)，可直接測試 payload、檢視驗證 token，並確認 Base64URL 行為，不必自己寫腳本。

在驗證情境特別有用，因為工程師常需檢查 JWT header/payload 或 API request body。

## **Base64 在驗證與 API 系統中的角色**

Base64 在現代驗證協定中非常常見。雖然它不是安全機制，但可確保位元組在 redirect、cookie、header 這類文字通道中被安全表示。

常見例子：

### **Basic Auth Header**

`Authorization: Basic dXNlcjpwYXNz`

### **JWT 區段**

header 與 payload 為 Base64URL 編碼 JSON。

### **SAML 憑證**

SAML metadata 內的 X.509 憑證通常使用 Base64。

若你在打造 auth 流程，Base64 是輔助編碼層；真正安全、token 簽章與 MFA 管理可交給 Authgear。

## **效能考量**

Base64 對小到中型 payload 很有效率。但它會增加資料大小，對超大型檔案編解碼可能增加記憶體、處理時間與頻寬成本。

對效能敏感場景，建議考慮串流式 Base64 或直接採用二進位格式。

## **排查 Base64 錯誤**

Base64 解碼失敗通常原因不複雜：

- padding 缺失或錯誤
- 編輯器插入換行符
- Base64 與 Base64URL 用錯
- 資料破損或截斷
- 重複編碼

多數情況可透過修正 padding 或確認變體快速解決。

## **總結**

Base64 是把二進位安全表示為文字的基礎工具。無論是內嵌圖片、經 JSON API 傳檔，或檢視驗證 token，它都能讓資料穩定穿越只懂文字的系統。

掌握正確編解碼方法、使用邊界與常見錯誤，可讓整合更穩定、更安全。

<a href="https://portal.authgear.com/" target="_blank">立即開始 Authgear 免費試用</a>，並用<a href="/zh-hant/tools/base64-decode-encode" target="_blank">免費 Decode & Encode 工具</a>快速檢查 Base64 與 token。

## **FAQs**

### **1. Base64 是加密嗎？**

不是。Base64 是編碼方法，任何人都可解碼回原始資料。

### **2. 為什麼 Base64 會讓資料變大？**

因為 3 bytes 二進位資料會轉成 4 個字元，約增加 33%。

### **3. Base64 與 Base64URL 差別是什麼？**

Base64URL 以 `-`、`_` 取代 `+`、`/`，更適合 URL、cookie 與 token 驗證流程。

### **4. 如何快速解碼 Base64？**

多數語言有內建函式；也可用 Authgear 的 Base64 Decode & Encode 工具快速測試與檢視資料。
