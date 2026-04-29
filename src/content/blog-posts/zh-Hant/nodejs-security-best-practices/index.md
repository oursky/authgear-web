---
title: "Node.js 驗證安全最佳實務"
excerpt: "驗證是應用程式的正門——在 Node.js 中，做錯往往比想像中容易。本指南逐步說明建置或稽核驗證系統時，每位開發者都應遵循的 Node.js 安全最佳實務。"
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "Node.js 驗證安全最佳實務（2026）"
metaDescription: "學習 Node.js 驗證安全最佳實務：安全密碼雜湊、JWT 簽章、工作階段管理、速率限制、MFA 等。"
publishedAt: 2026-03-13T22:26:35.278Z
updatedAt: 2026-03-17T15:53:12.503Z
draft: false
---

驗證是應用程式的正門——在 Node.js 中，做錯往往比想像中容易。遵循 Node.js 驗證安全最佳實務並非選項：無論是以明文儲存密碼、以薄弱演算法簽署 JWT，或略過速率限制，單一疏失都可能暴露整個使用者群。

本指南涵蓋 Node.js 開發者在 2026 年建置安全驗證系統所需的具體步驟。每節都含可直接放入 Express.js 應用的程式碼範例。

## 1. 為何 Node.js 驗證安全很重要

Node.js 是大量 Web API 與後端服務的執行環境。其非阻塞 I/O 模型帶來速度，但 npm 生態系——數十萬套件——也構成廣大攻擊面。

針對 Node.js 驗證系統最常見的攻擊向量包括：

<ul>
<li><strong>憑證填充與暴力破解</strong>——使用外洩憑證清單的自動化登入嘗試。</li>
<li><strong>注入攻擊</strong>——登入查詢使用的 MongoDB 查詢遭 NoSQL 注入，或未使用參數化查詢的關聯式資料庫遭 SQL 注入。</li>
<li><strong>不安全的權杖處理</strong>——儲存在 <code>localStorage</code> 的 JWT 可被頁面上任何 JavaScript 讀取，易受 XSS 影響。</li>
<li><strong>時序攻擊</strong>——天真的字串比對會在找到不符時提早結束，透過回應時間差外洩密碼正確性資訊。</li>
<li><strong>相依套件漏洞</strong>——驗證流程中遭入侵或有漏洞的 npm 套件可能帶來災難性後果。</li>
<li><strong>工作階段固定（Session fixation）</strong>——攻擊者在使用者登入前預先植入已知工作階段 ID，登入後劫持已驗證工作階段。</li>
</ul>

這些都不是紙上談兵，在真實外洩事件中屢見不鮮。以下章節直接處理每一項。

## 2. 安全處理密碼

### 絕不以明文儲存密碼

理當如此，但違反情況仍比應有頻率更高。絕不以明文儲存密碼，也勿以可逆加密儲存。密碼必須以專用、刻意的**慢雜湊**演算法處理。

### 使用 bcrypt 或 argon2

**bcrypt** 是 Node.js 生態系最廣泛使用的選項。成本因子使暴力破解昂貴。

```
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 12; // Increase this as hardware gets faster

async function hashPassword(plaintext) {
  return bcrypt.hash(plaintext, SALT_ROUNDS);
}

async function verifyPassword(plaintext, hash) {
  return bcrypt.compare(plaintext, hash);
}

// Example usage in a registration handler
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (password.length < 12) {
    return res.status(400).json({ error: 'Password must be at least 12 characters.' });
  }

  const hash = await hashPassword(password);
  await db.users.create({ email, passwordHash: hash });

  res.status(201).json({ message: 'Account created.' });
});
```

**argon2** 是密碼雜湊競賽的優勝者，被視為新專案的較強選擇。有三種變體；請使用可同時抵抗旁道與 GPU 攻擊的 `argon2id`。

```
const argon2 = require('argon2');

async function hashPassword(plaintext) {
  return argon2.hash(plaintext, { type: argon2.argon2id });
}

async function verifyPassword(plaintext, hash) {
  return argon2.verify(hash, plaintext);
}
```

**該用哪一個？** 兩者都穩健。bcrypt 函式庫支援更廣、部署歷史更久。argon2id 理論性質更佳。任選其一即可——重點是**一致**使用其中一種。

## 3. JWT 最佳實務

JWT（JSON Web Tokens）廣泛用於無狀態驗證，但有多處尖銳邊角。

### 多服務架構請用 RS256，勿用 HS256

`HS256` 以單一共用密鑰簽署與驗證。若有多個服務，每個需驗證權杖的服務都需要該密鑰——而持有密鑰的每個服務都能**發行**權杖。

`RS256` 使用非對稱金鑰對：以私鑰簽署（僅驗證服務持有），以公鑰驗證（任何服務皆可持有）。在微服務環境中安全得多。

```
const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync('./keys/private.pem');
const publicKey = fs.readFileSync('./keys/public.pem');

// Generate a token (auth service only)
function issueToken(userId) {
  return jwt.sign(
    { sub: userId },
    privateKey,
    {
      algorithm: 'RS256',
      expiresIn: '15m',   // Short-lived access token
      issuer: 'https://auth.example.com',
      audience: 'https://api.example.com',
    }
  );
}

// Verify a token (any service with the public key)
function verifyToken(token) {
  return jwt.verify(token, publicKey, {
    algorithms: ['RS256'],
    issuer: 'https://auth.example.com',
    audience: 'https://api.example.com',
  });
}
```

務必在 `jwt.verify` 中**明確指定** `algorithms`。若未指定，攻擊者可將權杖標頭中的演算法改為 `none` 並完全繞過驗證——這是知名的 JWT 漏洞。

### 權杖過期與重新整理

存取權杖應為短期（15 分鐘是常見選擇）。搭配長效、安全儲存的重新整理權杖，用以交換新的存取權杖。

```
function issueRefreshToken(userId) {
  return jwt.sign(
    { sub: userId, type: 'refresh' },
    privateKey,
    { algorithm: 'RS256', expiresIn: '7d' }
  );
}

app.post('/token/refresh', async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const payload = verifyToken(refreshToken);

    if (payload.type !== 'refresh') {
      return res.status(401).json({ error: 'Invalid token type.' });
    }

    // Check the token has not been revoked (see below)
    const isRevoked = await tokenStore.isRevoked(refreshToken);
    if (isRevoked) {
      return res.status(401).json({ error: 'Token has been revoked.' });
    }

    const newAccessToken = issueToken(payload.sub);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
});
```

### 權杖存哪裡：httpOnly cookie 對上 localStorage

將權杖存在 `httpOnly` cookie，**不要**存在 `localStorage`。

<ul>
<li><code>localStorage</code> 可被頁面上任何 JavaScript 存取。單一 XSS 漏洞即可讓攻擊者竊取儲存中的所有權杖。</li>
<li><code>httpOnly</code> cookie 完全無法被 JavaScript 讀取。會隨請求自動送出，搭配 <code>Secure</code> 與 <code>SameSite=Strict</code> 可同時抵抗基於 XSS 的竊取與 CSRF。</li>
</ul>

```
res.cookie('accessToken', token, {
  httpOnly: true,
  secure: true,           // HTTPS only
  sameSite: 'strict',
  maxAge: 15 * 60 * 1000 // 15 minutes in ms
});
```

### 權杖撤銷模式

JWT 在設計上是無狀態的，內建沒有撤銷機制。當使用者登出或你需要提早作廢權杖（例如密碼重設後），主要有兩種做法：

<ol>
<li><strong>拒絕清單（Denylist／blocklist）</strong>：將已撤銷權杖的 JTI（<code>jti</code> 宣告）存入 Redis，直到其自然過期。每次請求檢查此清單。</li>
<li><strong>短效期＋重新整理輪替</strong>：存取權杖極短效，每次使用重新整理權杖時輪替並立即作廢舊權杖。</li>
</ol>

```
// Add a unique jti to every token
function issueToken(userId) {
  return jwt.sign(
    { sub: userId, jti: crypto.randomUUID() },
    privateKey,
    { algorithm: 'RS256', expiresIn: '15m' }
  );
}

// On logout, blocklist the jti
app.post('/logout', authenticate, async (req, res) => {
  const { jti, exp } = req.user; // from decoded token
  const ttl = exp - Math.floor(Date.now() / 1000);
  await redis.setEx(`blocklist:${jti}`, ttl, '1');
  res.clearCookie('accessToken');
  res.json({ message: 'Logged out.' });
});
```

## 4. 工作階段管理

若使用伺服器端工作階段而非 JWT，`express-session` 是標準選擇——但其預設值並非可直接上線。

### 安全的 express-session 設定

```
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const { createClient } = require('redis');

const redisClient = createClient();
redisClient.connect();

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET, // Long, random, never hardcoded
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,       // HTTPS only
    sameSite: 'strict',
    maxAge: 30 * 60 * 1000 // 30 minutes
  }
}));
```

重點：

<ul>
<li>絕不硬編碼 <code>secret</code>。從環境變數或密鑰管理服務讀取。</li>
<li>設定 <code>saveUninitialized: false</code>，未驗證的請求不建立工作階段。</li>
<li>使用持久化儲存（Redis、PostgreSQL），勿用預設記憶體儲存——會洩漏記憶體且重啟後遺失工作階段。</li>
</ul>

### 防止工作階段固定

工作階段固定是惡意行為者在登入前植入已知工作階段 ID 的攻擊。使用者驗證後，攻擊者以相同 ID 存取已驗證工作階段。

修正方式很簡單：**登入後立即重新產生工作階段 ID**。

```
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await db.users.findByEmail(email);

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  // Regenerate session ID BEFORE storing user data
  req.session.regenerate((err) => {
    if (err) return next(err);
    req.session.userId = user.id;
    res.json({ message: 'Logged in.' });
  });
});
```

## 5. 常見 Node.js 驗證漏洞與修正

### 密碼比對的時序攻擊

天真的字串比對如 `storedHash === submittedHash` 會在發現不符時提早結束。這表示錯誤值往往比正確值**更快**回應，透過回應時間外洩資訊。

敏感比對一律使用 `crypto.timingSafeEqual`：

```
const crypto = require('crypto');

function safeCompare(a, b) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);

  // Buffers must be the same length for timingSafeEqual
  if (bufA.length !== bufB.length) return false;

  return crypto.timingSafeEqual(bufA, bufB);
}
```

注意：bcrypt 的 `.compare()` 與 argon2 的 `.verify()` 內部已處理時序安全。若自行比對 API 金鑰或 TOTP 等，請使用 `timingSafeEqual`。

### 大量指派與參數污染

大量指派發生在你把 `req.body` 直接傳給資料庫層，讓攻擊者可設定不應控制的欄位（例如 `isAdmin: true`）。

```
// UNSAFE — never do this
await db.users.update(req.user.id, req.body);

// SAFE — allowlist the fields you accept
const { displayName, email } = req.body;
await db.users.update(req.user.id, { displayName, email });
```

請使用 `zod` 或 `joi` 等驗證函式庫，在資料進入資料庫前強制輸入形狀。

### 不安全的直接物件參照（IDOR）

IDOR 讓使用者透過操縱請求中的 ID 存取他人資料。

```
// UNSAFE — user can change the id parameter
app.get('/users/:id/profile', authenticate, async (req, res) => {
  const profile = await db.users.findById(req.params.id);
  res.json(profile);
});

// SAFE — always scope queries to the authenticated user
app.get('/me/profile', authenticate, async (req, res) => {
  const profile = await db.users.findById(req.user.id);
  res.json(profile);
});
```

### 相依套件漏洞

驗證程式碼的安全性僅與其相依套件同等。請定期執行 `npm audit` 並整合進 CI。

```
# Check for known vulnerabilities
npm audit

# Auto-fix where possible
npm audit fix

# For CI: fail the build on high-severity issues
npm audit --audit-level=high
```

請將 `npm audit` 與 Snyk 或 Dependabot 等工具並用，以在新漏洞揭露時自動告警。

## 6. 速率限制與暴力破解防護

沒有速率限制時，登入端點對暴力破解與憑證填充敞開大門。`express-rate-limit` 是標準解法：

```
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15-minute window
  max: 10,                   // Max 10 attempts per IP per window
  message: { error: 'Too many login attempts. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.post('/login', loginLimiter, async (req, res) => {
  // login logic
});
```

正式環境請以 Redis 支援速率限制器，才能在多實例間正確運作：

```
const { RedisStore } = require('rate-limit-redis');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
  }),
});
```

亦可考慮在失敗次數達門檻後實作**帳號層級**鎖定（不僅 IP），並在較低門檻後加入 CAPTCHA。

## 7. 以 TOTP 整合 MFA

多因素驗證（MFA）是對抗帳號接管最有效的控制之一。基於時間的一次性密碼（TOTP）——Google Authenticator、Authy 等 App 產生的代碼——可用 `speakeasy` 套件直接實作。

```
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

// 1. Generate a secret during MFA setup
app.post('/mfa/setup', authenticate, async (req, res) => {
  const secret = speakeasy.generateSecret({
    name: `MyApp (${req.user.email})`,
    length: 20,
  });

  // Store the base32 secret (encrypted at rest)
  await db.users.update(req.user.id, {
    totpSecretPending: secret.base32,
  });

  // Return the QR code for the authenticator app
  const qrDataUrl = await QRCode.toDataURL(secret.otpauth_url);
  res.json({ qrCode: qrDataUrl });
});

// 2. Verify the user scanned it correctly
app.post('/mfa/verify-setup', authenticate, async (req, res) => {
  const { code } = req.body;
  const user = await db.users.findById(req.user.id);

  const valid = speakeasy.totp.verify({
    secret: user.totpSecretPending,
    encoding: 'base32',
    token: code,
    window: 1, // Allow 1 step of clock drift
  });

  if (!valid) {
    return res.status(400).json({ error: 'Invalid code. Please try again.' });
  }

  await db.users.update(req.user.id, {
    totpSecret: user.totpSecretPending,
    totpSecretPending: null,
    mfaEnabled: true,
  });

  res.json({ message: 'MFA enabled.' });
});

// 3. Require TOTP code at login
app.post('/login/mfa', async (req, res) => {
  const { userId, code } = req.body;
  const user = await db.users.findById(userId);

  if (!user.mfaEnabled) {
    return res.status(400).json({ error: 'MFA not configured.' });
  }

  const valid = speakeasy.totp.verify({
    secret: user.totpSecret,
    encoding: 'base32',
    token: code,
    window: 1,
  });

  if (!valid) {
    return res.status(401).json({ error: 'Invalid MFA code.' });
  }

  // Issue session or token
});
```

若要更強的 MFA，可考慮通行金鑰（FIDO2／WebAuthn），依設計具抗釣魚性。完整說明見 [什麼是 FIDO2？FIDO 驗證完整指南](/zh-hant/post/what-is-fido2-complete-guide-fido-authentication)。

## 8. 使用驗證平台 vs. 自行打造

上文涵蓋的一切——密碼雜湊、JWT 輪替、工作階段管理、速率限制、MFA——代表可觀的工程面積。每一塊都須正確實作、持續更新並定期稽核。

自行打造驗證可行，但代表你承擔每個決策與每個漏洞。多數產品團隊低估後續維護工作量。

經戰場驗證的驗證平台預設處理這些。**Authgear** 即為此而建：提供幾行程式即可與 Express 整合的 Node.js SDK，並負責：

<ul>
<li>安全的工作階段與權杖管理</li>
<li>密碼雜湊與外洩偵測</li>
<li>MFA（TOTP、簡訊、通行金鑰）</li>
<li>社群登入（Google、Apple、GitHub 等）</li>
<li>暴力破解防護與速率限制</li>
<li>稽核日誌與安全事件</li>
</ul>

```
// Example: protecting a route with the Authgear Node.js SDK
const { authgear } = require('@authgear/node');

app.get('/api/me', authgear.middleware(), (req, res) => {
  res.json({ userId: req.user.sub });
});
```

你可將通行金鑰與傳統密碼登入並用——從零正確實作通常需數週。詳見 [通行金鑰實作指南](/zh-hant/post/how-to-implement-passkeys-developer-guide)。

若驗證並非產品核心差異化，使用 Authgear 這類平台通常是正確選擇。你能更快獲得更好的安全覆蓋，工程師可專注在產品獨特之處。

若仍決定自行打造，請以本指南為檢查清單——並誠實評估持續維護成本。

## 9. 安全檢查清單

<div class="ag-table-wrap"><table>
<thead><tr><th>領域</th><th>檢查項目</th><th>備註</th></tr></thead>
<tbody>
<tr><td>密碼</td><td>以 bcrypt 或 argon2id 雜湊</td><td>勿用 MD5、SHA-1 或明文</td></tr>
<tr><td>密碼</td><td>強制最小長度（12 字元以上）</td><td>亦可對照已知外洩清單（HaveIBeenPwned API）</td></tr>
<tr><td>JWT</td><td>使用 RS256 演算法</td><td>單一服務可用 HS256；避免 <code>none</code></td></tr>
<tr><td>JWT</td><td>在 <code>verify()</code> 明確設定 <code>algorithms</code></td><td>防止演算法混淆攻擊</td></tr>
<tr><td>JWT</td><td>短效期（15 分）＋重新整理輪替</td><td>重新整理權杖須安全儲存</td></tr>
<tr><td>JWT</td><td>加入 <code>jti</code> 以支援撤銷</td><td>Redis 拒絕清單</td></tr>
<tr><td>權杖</td><td>存在 httpOnly、Secure、SameSite cookie</td><td>勿用 localStorage</td></tr>
<tr><td>工作階段</td><td>登入後重新產生 ID</td><td>防止工作階段固定</td></tr>
<tr><td>工作階段</td><td>持久化儲存（Redis）</td><td>勿用記憶體內</td></tr>
<tr><td>工作階段</td><td><code>saveUninitialized: false</code></td><td>避免幽靈工作階段</td></tr>
<tr><td>比對</td><td>敏感值使用 <code>crypto.timingSafeEqual</code></td><td>bcrypt／argon2 內部已處理</td></tr>
<tr><td>輸入</td><td>使用者更新時欄位白名單</td><td>防止大量指派</td></tr>
<tr><td>IDOR</td><td>查詢限於已驗證使用者</td><td>勿信任使用者提供的 ID</td></tr>
<tr><td>速率限制</td><td>登入端點依 IP 限制</td><td>多實例部署時以 Redis 支援</td></tr>
<tr><td>速率限制</td><td>N 次失敗後帳號鎖定</td><td>僅限 IP 可被繞過</td></tr>
<tr><td>MFA</td><td>TOTP 或通行金鑰</td><td>FIDO2／WebAuthn 具抗釣魚性</td></tr>
<tr><td>相依套件</td><td>CI 管線執行 <code>npm audit</code></td><td>高嚴重度即失敗建置</td></tr>
<tr><td>Cookie</td><td><code>HttpOnly</code>、<code>Secure</code>、<code>SameSite=Strict</code></td><td>三者皆設</td></tr>
<tr><td>HTTPS</td><td>所有驗證流量走 TLS</td><td>無例外</td></tr>
</tbody>
</table></div>

## 10. 常見問題

### Node.js 驗證該用 JWT 還是伺服器端工作階段？

兩者皆可。JWT 無狀態，易於跨多台伺服器擴展而無需共用工作階段儲存。伺服器端工作階段較易**立即**撤銷（刪除工作階段紀錄即可）。多數應用下，短效 JWT 搭配重新整理權杖輪替是不錯平衡。若**立即**撤銷是硬性需求——例如高安全金融應用——以 Redis 支援的伺服器端工作階段可給你更多控制。

### JWT 簽署何時可用 HS256？

可以，在**單一服務**部署且同一服務同時發行與驗證權杖時。若有多個服務需驗證權杖，請用 RS256，就不必共用簽署密鑰。

### 如何防止 Node.js 登入查詢的 NoSQL 注入？

直接使用 `req.body` 的 MongoDB 查詢有風險。例如將 `{ email: { $gt: '' } }` 當作 email 欄位可回傳所有使用者。請在查詢層之前一律驗證與清理輸入。使用結構驗證器（zod、joi），避免將原始 `req.body` 當作查詢篩選物件。

### HttpOnly 與 Secure cookie 旗標差異？

`HttpOnly` 防止 JavaScript 讀取 cookie——阻擋基於 XSS 的權杖竊取。`Secure` 確保 cookie 僅經 HTTPS 傳送——防止在未加密連線上被攔截。兩者請與 `SameSite=Strict` 一併使用以阻擋跨站請求偽造。

## 摘要

Node.js 讓你能隨意建置驗證——這也表示若不刻意為之，很容易做錯。本指南的 Node.js 驗證安全最佳實務可歸結為幾項核心原則：

<ul>
<li>密碼使用刻意的慢雜湊演算法（bcrypt 或 argon2id）。</li>
<li>以 RS256 簽署 JWT，並設定短效期。</li>
<li>將權杖存在 httpOnly cookie，絕不放在 localStorage。</li>
<li>登入後重新產生工作階段 ID，並使用持久化工作階段儲存。</li>
<li>為登入端點加入速率限制，並以 MFA 保護。</li>
<li>在 CI 執行 <code>npm audit</code>，在漏洞進入正式環境前攔截。</li>
</ul>

若你希望開箱即用處理多數項目，[Authgear](https://portal.authgear.com/) 提供具備安全驗證、MFA、通行金鑰與社群登入的 Node.js SDK——讓團隊專注產品，而非維護整套驗證堆疊。
