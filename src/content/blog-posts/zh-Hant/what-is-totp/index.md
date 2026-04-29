---
title: "什麼是 TOTP？給開發者的精簡指南（RFC 6238 解說）"
excerpt: "什麼是 TOTP（Time-based One-Time Password）？本篇以開發者視角精要解說 RFC 6238，附 Node/Python/Go 範例、除錯重點與免費線上 TOTP 工具。"
coverImage: ./cover.jpg
category: engineering
featured: false
metaTitle: "什麼是 TOTP？給開發者的精簡指南（RFC 6238 解說）"
metaDescription: "什麼是 TOTP（Time-based One-Time Password）？本篇以開發者視角精要解說 RFC 6238，附 Node/Python/Go 範例、除錯重點與免費線上 TOTP 工具。"
publishedAt: 2025-08-27T18:26:20.647Z
updatedAt: 2026-02-12T02:36:33.462Z
draft: false
---

TOTP（Time-based One-Time Password）是一種簡單且廣泛使用的方法：用共享密鑰與當前時間產生短時效數字驗證碼（RFC 6238）。典型情境是每 30 秒更新的 6 位數驗證碼。本文會說明其運作原理、常見陷阱，並提供 Node、Python、Go 的快速範例。你也可以直接試用 <a href="/zh-hant/tools/totp-authenticator" target="_blank">線上 TOTP 產生器</a>。

## 什麼是 TOTP

TOTP 是 **Time-based One-Time Password** 的縮寫。它會利用共享密鑰（通常為 Base32 字串）與目前時間產生短時效數字碼——常見為每 30 秒過期。TOTP 由 <a href="https://datatracker.ietf.org/doc/html/rfc6238" target="_blank">**IETF RFC 6238**</a> 標準化，也是多數驗證器 App（<a href="https://en.wikipedia.org/wiki/Google_Authenticator" target="_blank">Google Authenticator</a>、<a href="https://www.authy.com/" target="_blank">Authy</a>、[Authgear TOTP Generator](/zh-hant/tools/totp-authenticator) 等）的核心機制。

## TOTP 如何運作

1. **共享密鑰** — 在設定 2FA 時，伺服器與客戶端（驗證器）先約定共享密鑰，通常以 Base32 編碼。
1. **時間步進** — 將目前 Unix 時間除以步進值（常見 30 秒）產生會移動的計數器。
1. **HMAC** — 伺服器與客戶端使用選定雜湊演算法（SHA-1、SHA-256、SHA-512）對計數器計算 HMAC。
1. **截斷** — 經動態截斷取得固定長度數字碼（常見 6 位數）。
1. **驗證** — 登入時伺服器計算預期 TOTP，檢查是否與使用者輸入一致（通常允許 ±1 步進以容忍時鐘偏差）。

簡化表示：

> `TOTP = Truncate(HMAC(secret, floor(currentTime / timestep))) % 10^digits.`

## 重要參數

- **Secret 格式：** Base32（字母數字，例如 `JBSWY3DPEHPK3PXP`）。
- **Timestep（period）：** 通常 **30 秒**（RFC 6238 建議值）。
- **Digits：** 通常 **6**，有時 **8**。6 在可用性與安全性之間較平衡。
- **Algorithm：** `SHA-1`（相容性最佳）、`SHA-256` 或 `SHA-512`（雙端都支援時可用）。

## 快速程式範例

請將 `SECRET_BASE32` 換成你的 Base32 secret。以下範例使用維護良好的標準函式庫。

### Node（otplib）

### Python（pyotp）

### Go（pquerna/otp）

## 常見陷阱與除錯建議

- **時鐘偏差（clock skew）** — TOTP 依賴正確時間。若碼「對不上」，先同步伺服器與驗證器時鐘（NTP），或允許 ±1 步進驗證 window。
- **Secret 格式錯誤** — 確保 secret 是 Base32 並移除空白。若你有 QR 的 `otpauth://` URL，請從中提取 `secret=`。
- **演算法/位數不一致** — 伺服器與客戶端必須使用相同 `algorithm`（SHA-1/256/512）與 `digits`（6/8）。這是最常見失敗來源之一。
- **在共享工具使用正式環境 secret** — 不要把正式 secret 放到線上工具。請使用本地/離線產生器或內部測試 secret。

## 安全性考量

- TOTP 屬於 **something you have**（你持有共享密鑰）範疇，能抵擋純密碼型遠端攻擊，但若 secret 外洩仍可能被繞過。
- TOTP 應作為 **多因子驗證** 的一環，並搭配伺服器端政策（限速、異常偵測）。
- 若你可掌控雙端且希望更強 HMAC，可考慮 SHA-256/512，但要優先確認相容性。

## 什麼情況適合用 TOTP

- **適合：** 人員登入、管理員存取、開發測試流程、內部工具。
- **較不適合：** 高風險的無人值守 API 存取（建議用 client cert、OAuth token 或硬體保護金鑰）。
- **替代 MFA：** 推播 MFA、FIDO2/WebAuthn（即 [Passkeys](/zh-hant/features/passkeys)，具抗釣魚能力）、硬體 token。

## 如何測試你的整合

1. 從 provisioning 流程取出共享密鑰（Base32）。
1. 用上述任一函式庫範例在本地產生 TOTP。
1. 伺服器端以小 window（±1 step）驗證，以容忍時鐘偏差。
1. 刻意測試 algorithm/digits 不一致情境，確認伺服器日誌能清楚報錯。
1. 使用僅測試用工具預覽驗證碼，避免暴露正式 secret——可試：**Authgear TOTP Authenticator**：<a href="/zh-hant/tools/totp-authenticator" target="_blank">/zh-hant/tools/totp-authenticator</a>

## FAQ

**Q: TOTP 標準步進時間是多少？**  
A: 30 秒（RFC 6238 建議 30s）。

**Q: 我該用幾位數？**  
A: 標準是 6 位；8 位有更高熵，但可用性較差。

**Q: TOTP 安全嗎？**  
A: 若 secret 妥善保護且搭配其他控制（限速、裝置綁定），TOTP 對多數攻擊仍有效。若要更高安全等級，應在適用情境導入 FIDO2/Passkeys。
