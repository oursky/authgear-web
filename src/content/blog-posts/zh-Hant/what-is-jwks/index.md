---
title: "什麼是 JWKS？JSON Web Key Set 與 JWKS URI 一次搞懂"
excerpt: "了解 JWKS 是什麼、JWKS URI 如何運作、JWK 格式範例，以及在正式環境中建立與管理金鑰的實務建議。"
coverImage: ./cover.jpg
category: engineering
featured: false
readTime: 6
metaTitle: "什麼是 JWKS？JSON Web Key Set 與 JWKS URI 一次搞懂"
metaDescription: "了解 JWKS 是什麼、JWKS URI 如何運作、JWK 格式範例，以及在正式環境中建立與管理金鑰的實務建議。"
publishedAt: 2025-08-14T11:39:55.480Z
updatedAt: 2026-03-05T16:38:41.916Z
draft: false
---

如果你在處理 JWT、OAuth 或任何 token 驗證流程，很可能看過 **JWKS**。那麼，JWKS 到底是什麼、為什麼重要？簡單說：**JWKS（JSON Web Key Set）** 是一份標準化 JSON 文件，用來發布一把或多把公鑰（JWK），讓 client 與 API 能驗證簽章或執行加密。本文會用白話解釋 JWKS、展示 **JWK 格式** 範例、說明 **jwks_uri** 模式，並提供正式環境可落地的建立與管理建議。

## 理解 JSON Web Key（JWK）與 JWKS

**JSON Web Key（JWK）** 是用 JSON 表示密鑰的物件——例如 RSA 公鑰或 EC 金鑰。常見欄位包含 `kty`（金鑰類型）、`kid`（金鑰 ID）、`use`（用途）、`alg`（演算法），以及金鑰材料欄位（RSA 的 `n`/`e`，EC 的 `x`/`y`）。

**JWKS** 則是含有 `keys` 陣列的 JSON 物件，可打包多組 JWK：

```json
{
  "keys": [
    {
      "kty": "RSA",
      "kid": "my-key-1",
      "use": "sig",
      "alg": "RS256",
      "n": "0vx7agoebGcQSuuPiLJXZptN9nndrQmbXEps2aiAFbWhM78LhWx4cbb...",
      "e": "AQAB"
    }
  ]
}
```

為什麼重要：簽發 token 的服務會發布 JWKS，其他服務（API、client）就能自動抓取公鑰來驗 JWT 簽章或進行加密。JWKS 標準讓這件事可以被機器讀取，並在不同函式庫間互通。

## JWKS 在驗證與 API 中如何運作

API 生態系常見流程如下：

<ol>
  <li><strong>簽發方發布 JWKS</strong> 於固定 URL（即 <code>jwks_uri</code>）。</li>
  <li><strong>Client 或 resource server 抓取 JWKS</strong> 並快取。</li>
  <li>當 JWT 抵達時，以 token header 中的 <code>kid</code> 判斷要使用哪把 JWK。</li>
  <li>Client 在 JWKS 找到對應 JWK，並用它驗證簽章或執行加密相關步驟。</li>
</ol>

這個模式把金鑰輪替與部署解耦：你輪替時只需更新 JWKS；消費方無需重部署程式碼即可拿到新公鑰。若是 JWE（加密 token），JWKS 也可提供加密用公鑰。

## JWKS URI：如何找到與使用

許多身分提供者會提供 discovery 文件——通常在 `/.well-known/openid-configuration`——其中含有 `jwks_uri`，指向 JWKS 位置：

```json
{
  "issuer": "https://auth.example.com",
  "authorization_endpoint": "https://auth.example.com/authorize",
  "token_endpoint": "https://auth.example.com/token",
  "jwks_uri": "https://auth.example.com/.well-known/jwks.json"
}
```

`jwks_uri` 的使用方式：

<ul>
  <li>設定你的 OIDC/OAuth client 函式庫讀取 discovery 文件，或直接指定 <code>jwks_uri</code>。</li>
  <li>函式庫會抓取並快取 JWKS，將進來 JWT 的 <code>kid</code> 對映到正確 JWK。</li>
  <li>實作刷新策略（例如定期刷新，或驗證失敗時刷新），讓服務平順處理金鑰輪替。</li>
</ul>

提示：JWKS 一律走 HTTPS，並維持穩定的 `kid` 值，有助於輪替流程。

<blockquote>
<p>&#x1F4A1; <strong>快速找出任何提供者的 JWKS URI：</strong>使用 <a href="/zh-hant/tools/oidc-discovery-endpoint">Authgear OIDC Discovery Endpoint Explorer</a>。輸入 issuer URL 後，就能在 Key Endpoints 摘要看到 <code>jwks_uri</code>、authorization endpoint、token endpoint，不需自行 curl。</p>
</blockquote>

## JWK 格式解說（含範例）

JWK 有一組標準欄位。以下是較完整的 RSA 公鑰範例：

```json
{
  "kty": "RSA",
  "kid": "rsa-signing-key-2024",
  "use": "sig",
  "alg": "RS256",
  "n": "0vx7agoebGcQSuuPiLJXZptN9nndrQmbXEps2aiAFbWhM78LhWx4cbbfAAtVT86zwu1RK7aPFFxuhDR1L6tSoc_BJECPebWKRXjBZCiFV4n3oknjhMstn64tZ_2W-5JsGY4Hc5n9yBXArwl93lqt7_RN5w6Cf0h4QyQ5v-65YGjQR0_FDW2QvzqY368QQMicAtaSqzs8KJZgnYb9c7d0zgdAZHzu6qMQvRL5hajrn1n91CbOpbISD08qNLyrdkt-bFTWhAI4vMQFh6WeZu0fM4lFd2NcRwr3XPksINHaQ-G_xBniIqbw0Ls1jF44-csFCur-kEgU8awapJzKnqDKgw",
  "e": "AQAB"
}
```

欄位拆解：

<ul>
  <li><code>kty</code> &mdash; 金鑰類型（如 <code>RSA</code>、<code>EC</code>、<code>oct</code>）</li>
  <li><code>kid</code> &mdash; 金鑰 ID，用於在 JWKS 中選鍵</li>
  <li><code>use</code> &mdash; 用途：<code>sig</code> 為驗簽，<code>enc</code> 為加密</li>
  <li><code>alg</code> &mdash; 演算法（如 <code>RS256</code>、<code>ES256</code>）</li>
  <li><code>n</code>、<code>e</code>（RSA）或 <code>x</code>、<code>y</code>、<code>crv</code>（EC）&mdash; base64url 格式的金鑰材料</li>
</ul>

完整 JWKS 範例（兩把金鑰：RSA + EC）：

```json
{
  "keys": [
    {
      "kty": "RSA",
      "kid": "rsa-key-2024",
      "use": "sig",
      "alg": "RS256",
      "n": "0vx7agoebGcQSuuPiLJXZptN9nndrQmbXEps2aiAFbWhM78LhWx4cbb...",
      "e": "AQAB"
    },
    {
      "kty": "EC",
      "kid": "ec-key-2024",
      "use": "sig",
      "alg": "ES256",
      "crv": "P-256",
      "x": "f83OJ3D2xF1Bg8vub9tLe1gHMzV76e8Tus9uPHvRVEU",
      "y": "x_FEzRu9m36HLN_tue659LNpXW6pCyStikYjKIWI5a0"
    }
  ]
}
```

加入 `use` 與 `alg` 欄位，可幫助 client 快速判斷該金鑰是否適合驗簽或加密。

### PEM 與轉換為 JWK

**PEM（Privacy-Enhanced Mail）** 是常見的金鑰與憑證儲存格式。它是 base64 編碼 DER 資料，外層包著可讀 header/footer（如 `-----BEGIN PUBLIC KEY-----` 與 `-----END PUBLIC KEY-----`）。你常會看到 `.pem`、`.crt`、`.key` 副檔名。

若要把 PEM 金鑰帶進 JWKS 流程，通常做法是先從 PEM 抽出**公鑰**，再轉為 JWK。RSA 可這樣取公鑰：

```bash
# Extract public key from an RSA private key PEM
openssl rsa -in private.pem -pubout -out public.pem

# Extract public key from a certificate
openssl x509 -in cert.pem -pubkey -noout -out public.pem
```

EC 金鑰抽取方式類似：

```bash
# Extract EC public key from an EC private key PEM
openssl ec -in ec-private.pem -pubout -out ec-public.pem
```

取得 public PEM 後，可用 JOSE 函式庫（node-jose、python-jose 等）或轉換工具轉成 JWK。轉換結果會包含 JWKS 所需欄位，例如 RSA 的 `kty`、`n`/`e`，或 EC 的 `x`/`y`/`crv`。

若想要快速圖形化操作，可使用 Authgear [JWK Generator](/zh-hant/tools/jwk-generator) 把 PEM 公鑰轉成格式正確的 JWK（RSA/EC），可直接放進 JWKS。

**安全提醒：** 私鑰 PEM 絕不能發布在 JWKS。JWKS 只能放公鑰材料，且必須以 HTTPS 提供，並搭配安全的金鑰輪替策略。

## 為你的應用建立與管理 JWKS

**產生金鑰：** 你可透過各種函式庫（OpenSSL 產生後轉 JWK，或直接用 JOSE 函式庫）建立 JWK。若想快速且符合標準地建立 JWK，或把現有 PEM 轉成 JWK，可用 Authgear [JWK Generator](/zh-hant/tools/jwk-generator) ——可輸出 RSA/EC 金鑰對，也能將 PEM 公鑰轉成 JWK，方便開發與測試。

**發布 JWKS：**

<ul>
  <li>在固定 HTTPS 端點託管 JWKS JSON（例如 <code>https://auth.example.com/.well-known/jwks.json</code>）。</li>
  <li>只包含公鑰材料；<strong>絕對不要</strong>發布私鑰。</li>
  <li>妥善指定 <code>kid</code>，並在輪替前先新增新金鑰。</li>
</ul>

**輪替策略：**

<ol>
  <li>產生新金鑰對，將新公鑰 JWK（新 <code>kid</code>）加入 JWKS。</li>
  <li>更新簽發方，改用新私鑰簽 token。</li>
  <li>在寬限期內保留舊公鑰 JWK，讓 client 能驗證既有 token。</li>
  <li>待舊 token 全數過期後，再移除舊 JWK。</li>
</ol>

**安全最佳實務：**

<ul>
  <li>JWKS 全程使用 HTTPS。</li>
  <li>快取 JWKS，但在驗證錯誤時觸發刷新。</li>
  <li>JWKS 僅保留正在使用的金鑰。</li>
  <li>監控驗證失敗，及早發現缺鍵或輪替問題。</li>
</ul>

## 關於 JWKS 的常見問題（FAQ）

### JWKS 的用途是什麼？

JWKS 用來發布公鑰，讓 client 與 API 可抓取後驗證 JWT 簽章，或在加密流程中取得公鑰，達成動態且可互通的金鑰分發。

### JWKS 檔案是公開還是私密？

JWKS 通常是**公開**的——它只含**公鑰**。私鑰必須保留在簽發方安全儲存，且不可納入 JWKS。

### 我該如何產生 JWK？

你可用函式庫（OpenSSL 轉 JWK 或 JOSE 函式庫）產生；也可用像 Authgear [JWK Generator](/zh-hant/tools/jwk-generator) 這類工具，快速產出可用於測試或 staging 的 JWK 格式金鑰。

## 與 JWT / JWE 的關係

<ul>
  <li><strong>JWT（簽章 token）：</strong>JWT header 內的 <code>kid</code> 會指向 JWKS 中某把 JWK，接收方可用對應公鑰驗簽。</li>
  <li><strong>JWE（加密 token）：</strong>JWKS 也可發布用於加密 payload 的公鑰，或用於推導解密所需共享金鑰。</li>
</ul>

你不必先精通 JWT/JWE 才能使用 JWKS——記住一件事：JWKS 是分發公鑰的標準方式，讓 JWT 驗簽與 JWE 加密可互通。

## 結語

**JWKS**（JSON Web Key Set）是現代 token 安全中的小而關鍵一環：它標準化了公鑰（JWK）如何透過 `jwks_uri` 發布與抓取，讓跨服務驗簽與加密更順暢。請確保 JWK 格式正確、安全託管 JWKS、落實輪替策略；也可善用 Authgear [JWK Generator](/zh-hant/tools/jwk-generator) 加速開發、轉換 PEM 公鑰並簡化測試。若要快速找任一 OIDC provider 的 `jwks_uri`，可使用 [OIDC Discovery Endpoint Explorer](/zh-hant/tools/oidc-discovery-endpoint)。
