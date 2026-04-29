---
title: "在 Python、Node.js、Go 產生與驗證 HMAC 簽章"
h1: "如何在 Python、Node.js 與 Go 產生與驗證 HMAC 簽章"
excerpt: "學習如何在 Python、Node.js 與 Go 產生與驗證 HMAC 簽章。透過實用範例、程式片段與免費線上工具強化 API 安全。"
coverImage: ./cover.jpg
category: engineering
featured: false
metaTitle: "如何在 Python、Node.js 與 Go 產生與驗證 HMAC 簽章"
metaDescription: "學習如何在 Python、Node.js 與 Go 產生與驗證 HMAC 簽章。透過實用範例、程式片段與免費線上工具強化 API 安全。"
publishedAt: 2025-10-06T17:17:15.892Z
updatedAt: 2026-02-12T02:33:54.766Z
draft: false
---

API 與 webhook 高度仰賴 HMAC（Hash-based Message Authentication Code），確保你接收到的每個請求都真實且未被竄改。  
若沒有簽章驗證，應用程式可能遭受偽造、資料篡改或重播攻擊。

在本指南中，你會學到：

- 什麼是 HMAC 簽章，以及它如何運作
- 如何在 Python、Node.js、Go 中產生與驗證 HMAC 簽章
- 開發者常見錯誤與修正方式
- 如何使用免費線上工具測試 HMAC：Authgear 的 HMAC Signature Generator & Verifier

## 什麼是 HMAC 簽章？

HMAC（Hash-based Message Authentication Code）是一種訊息驗證碼，將密碼學雜湊函式（如 SHA256）與密鑰結合而成。  
它能確保兩件關鍵事項：

1. **完整性：** 訊息在傳輸中未被修改。
1. **真實性：** 訊息來自知道密鑰的可信來源。

其概念公式很簡單：

`HMAC = hash(secret_key + message)`

發送端與接收端使用同一把密鑰。若雙方計算結果一致，訊息即為有效。

## 為何 API 要使用 HMAC？

當 API 接收請求（例如 `POST /payment`）時，你必須確認請求來自可信 client。  
透過 HMAC 簽章，只有持有正確密鑰的發送方能產生有效簽章。

**典型流程：**

1. Client 對 request body 計算 HMAC。
1. 在標頭附上 `X-Signature: <hmac_value>` 發送請求。
1. Server 重新計算 HMAC 並比較兩者。
1. 相符則信任並處理請求。

Stripe、Shopify、GitHub、AWS、Slack 等大型平台都用 HMAC 來驗證 webhook 與安全請求簽章。

## HMAC 逐步運作方式

1. 組合密鑰與訊息。
1. 以密碼學演算法（例如 SHA256）做雜湊。
1. 比對雙方簽章以確認真實性。
1. 選擇合適演算法：<ul><li>HMAC-SHA256（多數情境建議）
1. HMAC-SHA1（舊系統相容）
1. HMAC-SHA512（高安全需求）

## 在 Python 中產生與驗證 HMAC

Python 的 `hmac` 與 `hashlib` 函式庫讓 HMAC 生成很直覺。

驗證時務必使用 `compare_digest()`，可避免 timing attack。你可以用 [Authgear 免費 **HMAC Signature Generator & Verifier**](/zh-hant/tools/hmac-signature-generator-verifier) 嘗試自己的訊息與簽章。

## 在 Node.js 中產生與驗證 HMAC

Node 內建 `crypto` 函式庫提供相同能力。

`timingSafeEqual` 可避免時間側信道造成比較洩漏。

## 在 Go 中產生與驗證 HMAC

Go 的 `crypto/hmac` 套件提供簡潔介面，可用於 HMAC 產生與驗證。

### 實務範例：簽章 API 請求

以下示範 HMAC 簽章如何用於 API 請求驗證。

**Client（Sender）：**

**Server（Receiver）：**

這可確保只有授權發送方能提交有效請求。

### 常見錯誤與修正方式

<div class="ag-table-wrap">
  <table class="ag-table">
    <thead>
      <tr>
        <th>問題</th>
        <th>可能原因</th>
        <th>解法</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>HMAC 簽章無效</td>
        <td>編碼不一致（UTF-8 vs ASCII）</td>
        <td>確認 client 與 server 都一致使用 UTF-8 編碼。</td>
      </tr>
      <tr>
        <td>簽章不一致</td>
        <td>雙方使用不同演算法</td>
        <td>確認兩端使用相同演算法，例如 HMAC-SHA256。</td>
      </tr>
      <tr>
        <td>Timing attack 風險</td>
        <td>以 <code>==</code> 比較字串</td>
        <td>務必使用安全比較函式，如 <code>compare_digest()</code> 或 <code>timingSafeEqual()</code>。</td>
      </tr>
      <tr>
        <td>輸出不符合預期</td>
        <td>摘要格式不一致（hex vs base64）</td>
        <td>統一格式並一致使用 <code>.hexdigest()</code> 或 <code>.base64encode()</code>。</td>
      </tr>
    </tbody>
  </table></div>

## 如何選擇合適雜湊演算法

<div class="ag-table-wrap">
  <table class="ag-table">
    <thead>
      <tr>
        <th>演算法</th>
        <th>安全等級</th>
        <th>效能</th>
        <th>建議用途</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>SHA-1</td>
        <td>弱 / 舊版</td>
        <td>非常快</td>
        <td>僅用於舊系統相容性需求。</td>
      </tr>
      <tr>
        <td>SHA-256</td>
        <td>強</td>
        <td>平衡</td>
        <td>API 簽章與 webhook 驗證的預設首選。</td>
      </tr>
      <tr>
        <td>SHA-512</td>
        <td>非常強</td>
        <td>稍慢</td>
        <td>適合高安全或大型 payload 場景。</td>
      </tr>
    </tbody>
  </table></div>

## 線上測試你的 HMAC

你可使用 Authgear 免費線上工具立即產生與驗證 HMAC： [HMAC Signature Generator & Verifier](/zh-hant/tools/hmac-signature-generator-verifier)

工具支援：

- 演算法：SHA-1、SHA-256、SHA-512
- Generate 與 Verify 模式
- 一鍵複製輸出
- 即時 hex 輸出

它很適合快速測試請求簽章，或除錯 API key 導致的簽章不一致問題。

## 常見問題

**HMAC 使用哪種演算法？**

HMAC 可使用 SHA256、SHA1、SHA512。對 API 來說，SHA256 最常用，兼顧安全與廣泛支援。

**HMAC 可以用來做 API 驗證嗎？**

可以。Stripe、AWS、GitHub 等平台都用 HMAC 簽 API 請求與 webhook。

**HMAC 與一般 hashing 差在哪？**

Hashing 只能保證資料完整性；HMAC 因加入共享密鑰，可同時保證完整性與真實性。

**HMAC 和 JWT 一樣嗎？**

不一樣。JWT 可能使用 HMAC 演算法（如 HS256），但 JWT 還包含無狀態驗證所需 payload。

**有哪些工具可線上測試 HMAC？**

Authgear 提供免費 HMAC Signature Generator & Verifier，也有 JWK Generator、JWT Decoder 與完整 Authgear Developer Toolkit。

<script type="application/ld+json"> { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [ { "@type": "Question", "name": "What algorithm does HMAC use?", "acceptedAnswer": { "@type": "Answer", "text": "HMAC supports various hash algorithms such as SHA256, SHA1, and SHA512. SHA256 is the most widely used due to its balance of security and speed." } }, { "@type": "Question", "name": "Can I use HMAC for API authentication?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Many APIs like Stripe, AWS, and GitHub use HMAC to sign requests and verify authenticity." } }, { "@type": "Question", "name": "What’s the difference between HMAC and hashing?", "acceptedAnswer": { "@type": "Answer", "text": "Hashing ensures data integrity, while HMAC adds authentication by combining a secret key and hash function." } }, { "@type": "Question", "name": "Is HMAC the same as JWT?", "acceptedAnswer": { "@type": "Answer", "text": "No. JWTs may use HMAC algorithms internally but serve a broader purpose for stateless authentication." } }, { "@type": "Question", "name": "What are the best tools to test HMAC online?", "acceptedAnswer": { "@type": "Answer", "text": "The Authgear HMAC Signature Generator & Verifier tool allows quick generation and validation of HMAC signatures online." } } ] } </script>
