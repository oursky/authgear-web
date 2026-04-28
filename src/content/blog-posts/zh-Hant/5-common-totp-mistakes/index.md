---
title: "開發者最常犯的 5 個 TOTP 錯誤（以及 2026 年的修正方式）"
excerpt: "2026 年 TOTP 驗證碼常失敗？一次看懂 5 個常見錯誤：時鐘漂移、Base32 secret、RFC 6238 參數不一致、驗證邏輯薄弱，以及每項對應修正（含 Python/JavaScript 範例）。"
coverImage: ./cover.jpg
category: engineering
featured: false
metaTitle: "開發者最常犯的 5 個 TOTP 錯誤（2026 指南）"
metaDescription: "TOTP 失敗怎麼辦？修正常見 5 大錯誤：時鐘漂移、Base32 格式、RFC 6238 參數不一致與驗證邏輯問題，含 Python/JS 範例。"
publishedAt: 2025-08-27T19:07:44.104Z
updatedAt: 2026-03-05T12:11:18.399Z
draft: false
---

**TOTP**（*time-based one-time password*）仍是數百萬應用程式雙重驗證的核心；到了 2026 年，它也常是 passkey 登入流程背後的備援 2FA。六位數、30 秒、看似簡單。但只要實作細節出錯，就可能在無聲中讓整批使用者無法登入。

如果你遇到 **「invalid TOTP code」**，幾乎可以確定是下列五個錯誤之一。每節都包含症狀、根因與可直接落地的修補方式，並附上 Python 與 JavaScript 程式碼。你也可以用我們免費的 [**TOTP Authenticator 工具**](/zh-Hant/tools/totp-authenticator) 立即驗證修補結果（支援 SHA-1/256/512、6–8 位數、自訂週期）。

## 5 大 TOTP 錯誤總覽

<div class='ag-table-wrap'><table class='ag-table'><thead><tr><th>#</th><th>錯誤</th><th>症狀</th><th>快速修正</th></tr></thead><tbody><tr><td>1</td><td>時鐘漂移</td><td>驗證碼間歇性失敗</td><td>伺服器使用 NTP 同步，驗證允許 ±1 step</td></tr><tr><td>2</td><td>Base32 格式錯誤</td><td>所有驗證碼穩定失敗</td><td>從 otpauth URI 取出並以 Base32 解碼 secret</td></tr><tr><td>3</td><td>RFC 6238 參數不一致</td><td>客戶端與伺服器永遠對不上</td><td>雙方確認 digits、period、algorithm</td></tr><tr><td>4</td><td>Provisioning URI 錯誤</td><td>新用戶無法掃碼或完成設定</td><td>產生 QR 前先驗證 otpauth:// URI</td></tr><tr><td>5</td><td>驗證邏輯過弱</td><td>步進邊界鎖帳；有暴力破解風險</td><td>加上 ±1 window、重放保護、速率限制</td></tr></tbody></table></div>

## 錯誤 1 — 時鐘漂移（伺服器與驗證器不同步）

**症狀：** 驗證碼偶發失敗。使用者回報「有時可以有時不行」。QA 在本機可重現，但 CI 或容器環境又不穩定。

**原因：** TOTP 會以 Unix 時間除以時間步進（預設 30 秒）得到目前驗證碼。伺服器與客戶端只要相差 30–60 秒，就會讓正確驗證碼失敗。容器與 VM 在休眠或 live migration 後特別容易漂移。

**修正方式：**

- 讓伺服器與 <a href="https://www.ntp.org/" target="_blank">NTP（Network Time Protocol）</a> 同步。Linux 可用：`systemctl enable --now chronyd`
- 驗證端加入 **±1 時間步進 window**。可接受前後最多 30 秒內的碼，兼顧真實世界漂移與攻擊面控制。
- 失敗日誌紀錄伺服器時間戳與 step counter，以便快速定位系統性漂移。

```
import pyotp

def verify_totp_with_window(secret: str, code: str, window: int = 1) -> bool:
    """
    Verify a TOTP code with clock drift tolerance.
    window=1 accepts codes from the previous and next time step (+-30 seconds).
    """
    totp = pyotp.TOTP(secret)
    return totp.verify(code, valid_window=window)

# Usage
secret = "JBSWY3DPEHPK3PXP"  # Base32-encoded secret
user_code = "123456"

if verify_totp_with_window(secret, user_code):
    print("Code accepted")
else:
    print("Code rejected -- check clock sync")

```

```
import { TOTP } from 'otpauth';

function verifyTOTPWithWindow(secret, code, window = 1) {
  // window=1 accepts codes +-1 time step (+-30 seconds)
  const totp = new TOTP({ secret, digits: 6, period: 30 });

  // validate() returns how many steps off the code is, or null if invalid
  const delta = totp.validate({ token: code, window });
  return delta !== null;
}

// Usage
const secret = 'JBSWY3DPEHPK3PXP';
const userCode = '123456';

if (verifyTOTPWithWindow(secret, userCode)) {
  console.log('Code accepted');
} else {
  console.log('Code rejected -- check clock sync');
}

```

⚠️ **window 要小：** ±1 代表約 90 秒寬限。若用 ±2，攻擊面會擴到 5 分鐘。正式環境建議固定 window=1。

## 錯誤 2 — Secret 格式錯誤（Base32 vs Hex、大小寫、Padding）

**症狀：** 所有用戶都穩定失敗。驗證器 App 有產生碼，但永遠對不上；換 App 也無解。

**原因：** TOTP secret 在 provisioning URI 內是 **Base32**。常見誤用是把 Base32 字串當原始 ASCII、做 hex decode，或不正確移除 `=` padding。結果就是完全不同位元序列，所有碼都會錯。

**修正方式：** `otpauth://` URI 裡的 `secret=` 一律視為 Base32。先去空白、轉大寫，再以 Base32 解碼驗證。

```
import base64
import pyotp

def parse_secret(secret_str: str) -> str:
    """
    Normalize and validate a TOTP secret string.
    Base32 only uses A-Z and 2-7, plus optional = padding.
    """
    # Strip spaces and uppercase (Base32 is case-insensitive)
    normalized = secret_str.replace(" ", "").upper()

    # Add padding if missing (Base32 strings must be multiples of 8 chars)
    padding_needed = len(normalized) % 8
    if padding_needed:
        normalized += "=" * (8 - padding_needed)

    # Validate it decodes correctly as Base32
    try:
        base64.b32decode(normalized)
    except Exception as e:
        raise ValueError(f"Secret is not valid Base32: {e}")

    return normalized

# Correct usage
secret = parse_secret("JBSWY3DP EHPK3PXP")  # strips spaces, fixes padding
totp = pyotp.TOTP(secret)
print(totp.now())  # generates the correct code

# Wrong: do NOT decode from hex or cast to raw bytes
# secret_bytes = bytes.fromhex(secret_hex)  # this is wrong!

```

```
function parseSecret(secretStr) {
  // Normalize: strip whitespace and uppercase
  const normalized = secretStr.replace(/\s/g, '').toUpperCase();

  // Validate: Base32 only uses A-Z and 2-7
  if (!/^[A-Z2-7]+=*$/.test(normalized)) {
    throw new Error(`Invalid Base32 secret: "${normalized}"`);
  }

  return normalized;
}

// Correct usage
const secret = parseSecret('JBSWY3DP EHPK3PXP');
console.log(secret); // "JBSWY3DPEHPK3PXP"

// Wrong: do NOT treat the secret as UTF-8 or hex
// const secretBytes = Buffer.from(secret, 'hex');  // wrong!

```

快速檢查：合法 Base32 secret 只會有 `A–Z` 與 `2–7`（外加可選 `=` padding）。若出現小寫、2–7 以外數字或符號，多半是產生或儲存流程出錯。

## 錯誤 3 — RFC 6238 參數不一致（Digits、Period、Algorithm）

**症狀：** 客戶端與伺服器都能產生驗證碼，但永遠不相符。換不同驗證器 App 有時可用、有時無效。

**原因：** <a href="https://www.rfc-editor.org/rfc/rfc6238" target="_blank">RFC 6238</a> 定義三個可調參數。任一項不一致都會讓碼永遠對不上：

- **digits** — 碼長。預設 6。若伺服器產 8 碼、客戶端預期 6 碼，必然失敗。
- **period** — 秒級步進。預設 30。60 秒步進與 30 秒會產生完全不同碼。
- **algorithm** — HMAC 雜湊。預設 SHA-1。Google Authenticator/Authy 預設 SHA-1；改 SHA-256 會破壞多數 App 相容性。

```
import pyotp

# Correct: use RFC 6238 defaults for maximum compatibility
totp = pyotp.TOTP(
    secret,
    digits=6,     # 6 digits -- universal default
    interval=30,  # 30-second period -- standard
    # SHA-1 is pyotp's default -- don't change unless you control both ends
)

# Mismatch example: server uses 8 digits, client expects 6
totp_server = pyotp.TOTP(secret, digits=8)
totp_client = pyotp.TOTP(secret, digits=6)

server_code = totp_server.now()  # e.g., "12345678"
client_code = totp_client.now()  # e.g., "345678" -- last 6 digits of 8
print(server_code == client_code)  # False -- they will never match

```

```
import { TOTP } from 'otpauth';

// Correct: explicit standard parameters
const totp = new TOTP({
  secret,
  digits: 6,        // 6 digits -- universal default
  period: 30,       // 30-second period
  algorithm: 'SHA1' // SHA-1 -- most compatible
});

// Mismatch example: different algorithm breaks compatibility
const totpServer = new TOTP({ secret, digits: 8, period: 30, algorithm: 'SHA256' });
const totpClient = new TOTP({ secret, digits: 6, period: 30, algorithm: 'SHA1' });

console.log(totpServer.generate()); // e.g., "87654321"
console.log(totpClient.generate()); // e.g., "654321" -- different, will never match

```

💡 **建議：** 除非你完全掌控客戶端與伺服器，否則請使用 RFC 6238 預設：**6 digits、30 秒、SHA-1**。非標準設定會影響 Google Authenticator、Authy、1Password 與多數硬體 token。

## 錯誤 4 — Provisioning 資料錯誤（otpauth URI / QR 問題）

**症狀：** 新用戶掃 QR 成功卻無法登入；舊用戶（改版前註冊）正常。問題只影響新註冊。

**原因：** 設定 TOTP 時，你會產生 `otpauth://totp/...` URI 並顯示為 QR。該 URI 內含 label、issuer、secret 與 TOTP 參數。任何拼字錯誤、secret 截斷或參數錯置，都會讓驗證器儲存錯誤設定；通常要到登入那一刻才會爆雷。

URI 格式如下：

```
otpauth://totp/{LABEL}?secret={BASE32_SECRET}&issuer={ISSUER}&algorithm=SHA1&digits=6&period=30

```

```
import pyotp
import urllib.parse

def generate_and_validate_totp_uri(secret: str, account: str, issuer: str) -> str:
    """
    Generate a TOTP provisioning URI and validate it round-trips correctly.
    Always validate before encoding to a QR code.
    """
    totp = pyotp.TOTP(secret)
    uri = totp.provisioning_uri(name=account, issuer_name=issuer)

    # Parse the URI back and verify the secret is intact
    parsed = urllib.parse.urlparse(uri)
    params = urllib.parse.parse_qs(parsed.query)

    stored_secret = params.get("secret", [None])[0]
    if stored_secret != secret:
        raise ValueError(f"Secret mismatch in URI: expected {secret}, got {stored_secret}")

    return uri

# Usage
uri = generate_and_validate_totp_uri(
    secret="JBSWY3DPEHPK3PXP",
    account="user@example.com",
    issuer="YourApp"
)
print(uri)
# otpauth://totp/YourApp:user%40example.com?secret=JBSWY3DPEHPK3PXP&issuer=YourApp

```

```
import { TOTP, URI } from 'otpauth';

function generateAndValidateTOTPUri(secret, account, issuer) {
  // Generate the otpauth:// URI
  const totp = new TOTP({ issuer, label: account, secret });
  const uri = totp.toString();

  // Validate: parse back and confirm the secret survived
  const parsed = URI.parse(uri);
  if (parsed.secret.base32 !== secret) {
    throw new Error(`Secret mismatch in URI: expected ${secret}, got ${parsed.secret.base32}`);
  }

  return uri;
}

// Usage
const uri = generateAndValidateTOTPUri(
  'JBSWY3DPEHPK3PXP',
  'user@example.com',
  'YourApp'
);
console.log(uri);
// otpauth://totp/YourApp:user%40example.com?secret=JBSWY3DPEHPK3PXP&issuer=YourApp

```

⚠️ **上線前用真實 App 測：** 同時用 Google Authenticator 與 Authy 掃你的 QR。兩者都能產生伺服器可接受的碼，才能算 provisioning 流程正確。

## 錯誤 5 — 驗證邏輯過於天真（無 Window、重放保護、限速）

**症狀：** 使用者在 30 秒切換邊界輸入時被鎖；或資安團隊指出 6 位數碼在無鎖定下可被暴力嘗試。

**原因：** 只驗當前 step 的 verifier，會拒絕剛好跨 step 的合法碼。沒有重放保護時，攻擊者只要截到有效碼，在 30 秒內可重複使用。沒有限速時，1,000,000 個 6 位數組合可很快被嘗試。

```
import pyotp
import time

# In production, use Redis -- in-memory won't survive restarts
used_codes: set = set()
attempt_counts: dict = {}

def verify_totp_secure(
    secret: str,
    code: str,
    user_id: str,
    window: int = 1,
    max_attempts: int = 5,
    lockout_seconds: int = 300
) -> dict:
    """
    Secure TOTP verification with:
    1. Clock window (+-1 step tolerance)
    2. Replay protection (each code accepted once per step)
    3. Rate limiting (lock after N failed attempts)
    """
    now = int(time.time())

    # 1. Rate limiting check
    record = attempt_counts.get(user_id, {"count": 0, "reset_at": now + lockout_seconds})
    if record["count"] >= max_attempts and now < record["reset_at"]:
        return {"success": False, "error": "Too many attempts. Try again later."}

    # 2. Replay protection
    current_step = now // 30
    code_key = f"{user_id}:{code}:{current_step}"
    if code_key in used_codes:
        return {"success": False, "error": "Code already used."}

    # 3. Verify with clock window
    totp = pyotp.TOTP(secret)
    if totp.verify(code, valid_window=window):
        used_codes.add(code_key)
        attempt_counts.pop(user_id, None)  # Reset on success
        return {"success": True}

    # Increment failure counter
    attempt_counts[user_id] = {
        "count": record["count"] + 1,
        "reset_at": record["reset_at"]
    }
    return {"success": False, "error": "Invalid code."}

```

```
import { TOTP } from 'otpauth';

// In production, use Redis -- in-memory won't survive restarts
const usedCodes = new Set();
const attemptCounts = new Map();

function verifyTOTPSecure(secret, code, userId, {
  window = 1,
  maxAttempts = 5,
  lockoutSeconds = 300
} = {}) {
  const now = Math.floor(Date.now() / 1000);

  // 1. Rate limiting check
  const record = attemptCounts.get(userId) ?? { count: 0, resetAt: now + lockoutSeconds };
  if (record.count >= maxAttempts && now < record.resetAt) {
    return { success: false, error: 'Too many attempts. Try again later.' };
  }

  // 2. Replay protection
  const currentStep = Math.floor(now / 30);
  const codeKey = `${userId}:${code}:${currentStep}`;
  if (usedCodes.has(codeKey)) {
    return { success: false, error: 'Code already used.' };
  }

  // 3. Verify with clock window
  const totp = new TOTP({ secret, digits: 6, period: 30 });
  const delta = totp.validate({ token: code, window });

  if (delta !== null) {
    usedCodes.add(codeKey);
    attemptCounts.delete(userId);
    return { success: true };
  }

  attemptCounts.set(userId, { count: record.count + 1, resetAt: record.resetAt });
  return { success: false, error: 'Invalid code.' };
}

```

💡 **正式環境提醒：** 以 Redis 取代記憶體內 `Set` 與 `Map`，才能跨重啟與多實例持久化。對已使用碼設約 60 秒 TTL（2 個時間步進）可控制記憶體使用。

不想從零做？[Authgear](/zh-Hant) 已內建 TOTP 註冊、驗證、重放保護與限速。可參考 [Authgear 如何實作 TOTP](https://docs.authgear.com/concepts/authenticator-and-identity/totp)。

## 加碼清單：快速排查「Invalid TOTP Code」

- 伺服器時鐘已 NTP 同步
- 驗證使用 ±1 step window
- Secret 以 Base32 儲存與解碼
- TOTP 參數符合 RFC 6238（6 位、30 秒、SHA-1）
- Provisioning URI 與伺服器參數一致
- 重放保護：每個碼在每個 step 只接受一次
- 速率限制：N 次失敗後鎖定帳號

想更快定位？用 [Authgear TOTP Authenticator](/zh-Hant/tools/totp-authenticator) 即時測 secret 與參數——先確認客戶端與伺服器產生同一組碼再上線。

若你想更深入理解 TOTP 原理，可閱讀 [什麼是 TOTP 與其運作方式](/zh-Hant/post/what-is-totp)。若你正在評估 passkeys 作為比 TOTP 更強的替代方案，也可參考 [Passkeys vs Passwords：Passkeys 更安全嗎？](/zh-Hant/post/passkey-vs-password-why-passkeys-are-the-future-of-security)

<script type='application/ld+json'>
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "什麼是 TOTP 驗證碼？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TOTP（time-based one-time password）是一種以共享密鑰與當前時間生成的短數字密碼。通常是 6 位數，每 30 秒更新一次。驗證器 App 與伺服器會各自獨立產生相同驗證碼；兩者相符即完成驗證。"
      }
    },
    {
      "@type": "Question",
      "name": "我剛產生的 TOTP 為什麼仍然無效？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "最常見原因有三個：（1）伺服器與客戶端時鐘漂移——用 NTP 同步並加上 ±1 step 驗證 window；（2）Base32 secret 解析錯誤——確認是以 Base32 解碼，不是 hex 或 raw bytes；（3）RFC 6238 參數不一致——確認雙方 digits、period、algorithm 相同。"
      }
    },
    {
      "@type": "Question",
      "name": "RFC 6238 為 TOTP 定義了哪些參數？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "RFC 6238 定義三個可配置參數：（1）digits：碼長，預設 6；（2）period：秒級步進，預設 30；（3）algorithm：HMAC 雜湊演算法，預設 SHA-1。產生端（驗證器 App）與驗證端（伺服器）三者都必須完全一致。"
      }
    },
    {
      "@type": "Question",
      "name": "TOTP 應該使用 SHA-1 還是 SHA-256？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "除非你完全掌控客戶端與伺服器，否則建議 SHA-1。SHA-1 是 RFC 6238 預設，且被 Google Authenticator、Authy、1Password 與幾乎所有硬體 token 支援。對 TOTP 而言，6 位數空間才是主要限制，不是雜湊演算法。"
      }
    },
    {
      "@type": "Question",
      "name": "如何防止 TOTP 驗證被暴力破解？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "要同時實作三項控制：（1）速率限制——5 到 10 次失敗後鎖定數分鐘；（2）重放保護——已接受的驗證碼在同一 30 秒窗口內不可重複使用；（3）時鐘 window——接受 ±1 step 以容忍小幅漂移，但不大幅擴張暴力破解窗口。"
      }
    },
    {
      "@type": "Question",
      "name": "我要怎麼快速測試與除錯 TOTP 實作？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "可使用 Authgear 的免費 TOTP Authenticator 工具。你可設定 algorithm（SHA-1/256/512）、digits（6 或 8）、period（30 秒），再和伺服器輸出比對。若一致，代表 secret 與參數正確；若不一致，就依本文五大錯誤逐一排查。"
      }
    }
  ]
}
</script>
