---
title: "驗證器 App 如何運作？"
h1: "驗證器 App 如何運作？（TOTP、密鑰、時鐘漂移與更安全替代方案）"
excerpt: "了解驗證器 App 的運作：TOTP 密鑰、QR 佈建、時鐘漂移、恢復碼，以及為何 Passkey（WebAuthn）可防釣魚。"
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "驗證器 App 如何運作？（TOTP、密鑰、時鐘漂移與更安全替代方案）"
metaDescription: "了解驗證器 App 的運作：TOTP 密鑰、QR 佈建、時鐘漂移、恢復碼，以及為何 Passkey（WebAuthn）可防釣魚。"
publishedAt: 2025-11-07T16:32:34.377Z
updatedAt: 2026-02-12T02:33:54.747Z
draft: false
faq:
  - q: "How do authenticator apps work without the internet?"
    a: "They generate codes locally from a shared secret and the current time (TOTP). Once the seed is on your device, no network access is required."
  - q: "Can I move my authenticator to a new phone?"
    a: "Yes. Either export and import your seeds (if supported) or re-enrol TOTP using each service’s recovery codes or backup methods."
  - q: "Why are my codes incorrect?"
    a: "Common causes are clock drift, wrong digit length, or picking the wrong account. Ensure 6-digit, 30-second TOTP and correct device time."
  - q: "Are authenticator apps safer than SMS?"
    a: "Yes. They avoid SIM-swap and work offline, but they can be phished. WebAuthn/passkeys provide phishing resistance."
  - q: "What’s the difference between TOTP and HOTP?"
    a: "TOTP changes codes based on time windows. HOTP increments a counter per use. Most consumer authenticator apps use TOTP."
---

驗證器 App 透過 **TOTP**（Time-based One-Time Password）產生短效 6–8 位數驗證碼。你的 App 與網站共享一把密鑰（seed），雙方每 30 秒以「密鑰 + 當前時間」算出相同代碼。若手機時鐘漂移，驗證碼就可能失敗。

## What is an authenticator app?

驗證器 App（Google Authenticator、Microsoft Authenticator、Authy 等）是多因素驗證（MFA）的**第二因子**。相較 SMS，這些 App 可在裝置上**離線**產生驗證碼。多數實作 [TOTP 標準（RFC 6238）](/zh-hant/post/what-is-totp)，並基於 **HMAC-SHA1/256/512** 與時間計數器。

想直接體驗 TOTP？可使用我們的 [TOTP Authenticator 工具](/zh-hant/tools/totp-authenticator)。

**為何用 App 而不是 SMS？**

- 設定完成後可離線使用
- 不綁定電話號碼（降低 SIM swap 風險）
- 通常比 SMS 更快且穩定
- 標準化高、支援廣泛

背景理論可參考：[**什麼是 TOTP？**](/zh-hant/post/what-is-totp)

## How TOTP actually works (step-by-step)

1. **佈建 seed（共享密鑰）**：啟用 2FA 時，服務提供 base32 密鑰，可掃 QR 或手動貼上。
1. **雙方計算移動計數器**：時間切成固定窗口（通常 **30 秒**），計數器 = Unix time ÷ step。
1. **用密鑰對計數器做 HMAC**：App 計算 `HMAC(secret, counter)`，演算法為 SHA-1/256/512。
1. **動態截斷成 6–8 位數**：從 HMAC 輸出取片段轉整數，再 mod 10^digits。
1. **伺服器驗證**：伺服器做同樣計算；若在允許窗口（如目前 ±1 step）匹配即通過。

**常見參數：**

- `digits`：通常 6（有時 7 或 8）
- `period`：通常 30s（也可能 60s）
- `algorithm`：SHA1（預設）、SHA256、SHA512

## Seed provisioning: QR codes & otpauth:// URI

在支援系統中點選「啟用驗證器 App」後，會顯示包含 `otpauth://` URI 的 QR code。掃描後即可匯入 seed 與設定。

**Example `otpauth://` URI**

啟用後通常會提供 recovery code，請立即安全保存（如下節）。

## Time drift (clock skew) and why codes sometimes fail

TOTP 高度依賴時間。若手機時間偏差，代碼可能與伺服器不一致：

- **小幅漂移**：伺服器通常容許 ±1 視窗（如 ±30 秒），仍可通過。
- **顯著漂移**：代碼會失敗。好的驗證器 App 會用網路時間自動校正；離線時可手動同步裝置時間。

若你要打造驗證系統，**Authgear** 已內建 TOTP、recovery code 與 passkey，可在不增加複雜度下提供強化 MFA。

## Recovery codes

若手機遺失或重置，TOTP seed 也會消失，因此需要 recovery code：

- 把 recovery code 當作**密碼**保護
- 每個 recovery code 只能用**一次**；使用後或變更驗證因子後應重新生成

## Phishing-resistant alternatives: WebAuthn / Passkeys

TOTP 仍可能被釣魚：攻擊者可代理登入並即時轉送你的一次性代碼。WebAuthn（Passkey）不同在於：

- **防釣魚**：憑證綁定來源網域，假網站無法使用
- **公開金鑰密碼學**：裝置保留私鑰，伺服器僅存公鑰
- **使用者驗證**：以生物辨識或裝置 PIN 解鎖憑證
- **多裝置同步**（依平台）通常比純 TOTP 更易恢復

## How to use an authenticator app

1. 在支援服務中進入 **Security** → **Two-Factor Authentication**。
1. 在裝置上選擇 **Authenticator app**。
1. 用 App 掃描 QR（或貼上 key）。
1. 輸入 App 顯示的 6 位數代碼確認。
1. **下載並安全保存 recovery code**。

Recommended apps:

- [Google Authenticator](https://support.google.com/accounts/answer/1066447)（iOS/Android）— 簡單、支援廣、可選雲端備份。
- [Microsoft Authenticator](https://www.microsoft.com/en-gb/security/mobile-authenticator-app)（iOS/Android）— 整合 Microsoft 生態，提供加密雲端備份，也支援一般 TOTP。
- [1Password](https://1password.com/)（iOS/Android/desktop）— 密碼管理器內建 TOTP；便利但第一因子與第二因子同處一地，需強主密碼與 vault 2FA。
- [Apple Passwords](https://support.apple.com/en-gb/120758) — iOS/iPadOS/macOS 內建 TOTP，跨 Apple 裝置同步。

## FAQ: How do authenticator apps work?

**How do authenticator apps work without the internet?**  
它們在本地用**共享密鑰 + 時間**計算代碼。seed 一旦存入裝置，就不需網路。

**Can I move my authenticator to a new phone?**  
可以，但你必須**轉移 seed**或重新註冊。部分 App 支援加密備份/同步；否則可用各服務的 recovery code 在新機重設。

**Why are my codes “incorrect”?**  
最常見原因是**帳號選錯**、**位數不對**或**時鐘漂移**。確認為 6 位數、30 秒週期與正確時間。

**Are authenticator apps safer than SMS?**  
是。它不綁電話號碼且可降低 SIM swap 風險；但仍非完全防釣魚，**WebAuthn / Passkey** 更強。

**What’s the difference between TOTP and HOTP?**  
**TOTP** 依時間變化；**HOTP** 依計數器遞增。大多數消費型驗證器使用 TOTP。


