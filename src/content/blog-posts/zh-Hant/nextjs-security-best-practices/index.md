---
title: "Next.js 安全最佳實踐（2026）"
excerpt: "Next.js 已從單純的 React 框架成長為全端平台——能力越強，攻擊面也越大。App Router、Server Components 與 Server Actions 讓驗證邏輯、資料庫查詢與業務規則和 UI 寫在同一套程式碼裡。"
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "Next.js 安全最佳實踐：2026 完整指南"
metaDescription: "2026 年保護 Next.js 應用：驗證、API route 防護、XSS／CSRF 防範、CVE-2025-29927 middleware 繞過、CSP 標頭等。"
publishedAt: 2026-03-25T18:39:52.779Z
updatedAt: 2026-03-25T18:45:47.481Z
draft: false
---

## 2026 年 Next.js 應用的安全攻擊面

Next.js 已從單純的 React 框架成長為全端平台——能力越強，攻擊面也越大。App Router、Server Components 與 Server Actions 讓驗證邏輯、資料庫查詢與業務規則和 UI 寫在同一套程式碼裡。這很方便，但一次設定錯誤就可能把伺服器端程式碼暴露給外界。

2026 年，Next.js 應用中最具影響力的安全事件，常見根因有三：**信錯層級**（例如只靠 middleware 做驗證）、**把機密洩漏到客戶端**，以及**未在伺服器端驗證輸入**。本指南逐一處理——附具體程式範例、標示最危險的反模式，以及可在 code review 時對照的清單。

若要深入特定主題，請參考 [Next.js middleware 驗證](/zh-Hant/post/nextjs-middleware-authentication) 與 [Next.js 中的 JWT 驗證](/zh-Hant/post/nextjs-jwt-authentication)。

## 1. 驗證最佳實踐

### 優先使用 Passkey，而非密碼

密碼易被釣魚、撞庫與暴力破解。Passkey 建構在 WebAuthn／FIDO2 之上，因憑證以密碼學綁定你的網域，故具釣魚抗性。2026 年，主要平台（iOS、Android、Windows、macOS）皆原生支援 passkey。若你正在開發新應用，請把 passkey 當預設登入方式，密碼僅作舊版後援。

### 敏感操作強制 MFA

即使用戶密碼外洩，多因素驗證（MFA）仍可阻擋攻擊者完成登入。請在**應用層**強制 MFA——不只在身分提供者——針對高風險操作，例如變更電子郵件、匯出資料或存取管理後台。TOTP 與 WebAuthn 安全金鑰都是強選項。

### 使用 httpOnly Cookie，不要用 localStorage

把工作階段權杖或 JWT 存在 `localStorage` 是 Next.js 驗證最常見的錯誤。頁面上任何 JavaScript——包含 XSS 注入的程式碼——都能讀取 `localStorage`。`httpOnly` Cookie 無法被 JavaScript 讀取，因此在 XSS 下較能存活。

```typescript
// ✅ 正確——在 httpOnly Cookie 設定工作階段權杖（Server Action 或 API Route）
import { cookies } from 'next/headers';

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true,       // JavaScript 無法讀取
    secure: true,         // 僅透過 HTTPS 傳送
    sameSite: 'lax',      // CSRF 防護
    path: '/',
    maxAge: 60 * 60 * 24, // 24 小時
  });
}

```

```typescript
// ❌ 錯誤——把權杖存在 localStorage 會暴露給 XSS
localStorage.setItem('token', userToken);

```

### 實作工作階段逾時與輪替

長期有效的工作階段是風險。請設定合理的 `maxAge`（一般應用 24 小時；管理工具 15 分鐘）。在權限升級後——例如重新驗證後——輪替工作階段 ID。如此即使權杖被偷，也會在攻擊者大量濫用前過期。

## 2. 保護 API Route 與 Server Actions

### 務必在 Handler 內驗證身分

每個 API Route 與 Server Action 都必須驗證使用者身分，即使 middleware 已檢查過。Middleware 用於邊緣層的路由決策，不應是你**唯一**的驗證檢查。（第 4 節會說明原因。）

```typescript
// app/api/admin/users/route.ts
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (session.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // 可安全繼續
  const users = await db.users.findMany();
  return NextResponse.json(users);
}

```

注意區分：**401 Unauthorized** 表示請求沒有有效身分（未驗證）。**403 Forbidden** 表示使用者已驗證但**沒有權限**。回傳正確狀態碼對客戶端錯誤處理很重要。

### 加上速率限制

沒有速率限制時，登入端點、重設密碼流程與 OTP 驗證都會暴露於暴力攻擊。請使用相容 Edge 的限流器，例如搭配 Upstash Redis 的 <a href="https://github.com/upstash/ratelimit-js" target="_blank" rel="noopener">@upstash/ratelimit</a>，或自架環境的 middleware 層方案。

```typescript
// lib/rate-limit.ts — 使用 @upstash/ratelimit + @upstash/redis
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export const loginRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '10 m'), // 每 10 分鐘 5 次請求
  analytics: true,
});

// 在登入 Server Action 中：
// const { success } = await loginRatelimit.limit(ip);
// if (!success) throw new Error('Too many login attempts. Try again later.');

```

### 在伺服器端驗證所有輸入

客戶端表單驗證是 UX 便利，**不是**安全控制。攻擊者可自行構造 HTTP 請求，完全繞過前端。請使用 <a href="https://zod.dev" target="_blank" rel="noopener">Zod</a> 等 schema 驗證函式庫，驗證進入 Server Actions 與 API Routes 的每一項輸入。

```typescript
// app/actions/update-profile.ts
'use server';
import { z } from 'zod';
import { getSession } from '@/lib/auth';

const UpdateProfileSchema = z.object({
  displayName: z.string().min(1).max(64),
  email: z.string().email(),
});

export async function updateProfile(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error('Unauthorized');

  const parsed = UpdateProfileSchema.safeParse({
    displayName: formData.get('displayName'),
    email: formData.get('email'),
  });

  if (!parsed.success) {
    return { error: 'Invalid input', issues: parsed.error.issues };
  }

  // 可安全使用 parsed.data
  await db.users.update({ where: { id: session.userId }, data: parsed.data });
}

```

## 3. 避免常見漏洞

### 透過 dangerouslySetInnerHTML 的 XSS

<div style="background:#fff3cd;border-left:4px solid #ffc107;padding:12px 16px;border-radius:4px;margin:16px 0;">
  <strong>警告：</strong> <code>dangerouslySetInnerHTML</code> 會把原始 HTML 注入 DOM，且不做清理。若字串任何部分來自使用者輸入或不可信 API，即構成 XSS。攻擊者可注入 <code>&lt;script&gt;</code> 竊取工作階段 Cookie、重新導向使用者或外洩資料。

若必須渲染來自外部的 HTML，請先用 <a href="https://github.com/cure53/DOMPurify" target="_blank" rel="noopener">DOMPurify</a> 清理。在 Next.js（元件可在伺服器端執行）請使用 `isomorphic-dompurify`——在 Node.js 與瀏覽器皆可用的包裝：

```typescript
import DOMPurify from 'isomorphic-dompurify';

// ✅ 渲染前先清理
const clean = DOMPurify.sanitize(userProvidedHtml);
return <div dangerouslySetInnerHTML={{ __html: clean }} />;

```
</div>

### 開放式重新導向

常見登入流程會把使用者導回先前頁面：`/login?returnTo=/dashboard`。若未驗證 `returnTo`，攻擊者可構造 `/login?returnTo=https://evil.com`，在登入後把使用者導向釣魚站。

```typescript
// ✅ 僅允許相對路徑作為重新導向目標
function getSafeRedirect(returnTo: string | null): string {
  if (!returnTo || !returnTo.startsWith('/') || returnTo.startsWith('//')) {
    return '/dashboard';
  }
  return returnTo;
}

```

### CSRF 與 Server Actions

Next.js Server Actions 使用 `POST` 請求，並自動比對 `Origin` 與 `Host` 標頭，可阻擋多數跨站請求偽造。對會變更狀態的自訂 API Route，仍應驗證 `Origin` 或使用 CSRF token——尤其在使用 Cookie 驗證時。注意：請務必將工作階段 Cookie 設為 `SameSite=Lax` 或 `Strict`，這是 CSRF 防護的重要額外層。

## 4. Middleware 安全與 CVE-2025-29927

<div style="background:#f8d7da;border-left:4px solid #dc3545;padding:12px 16px;border-radius:4px;margin:16px 0;">
  <strong>嚴重：CVE-2025-29927 — Middleware 授權繞過</strong><br>
  2025 年 3 月，Next.js 揭露 CVSS 9.1 漏洞。攻擊者可透過 <code>x-middleware-subrequest</code> 標頭<strong>完全略過</strong>所有 middleware 邏輯——無需任何憑證即可繞過受保護路由的驗證。受影響版本：11.1.4–12.3.4、13.0.0–13.5.8、14.0.0–14.2.24、15.0.0–15.2.2。已於 12.3.5、13.5.9、14.2.25、15.2.3 修復。<strong>若尚未更新，請立即更新。</strong>

CVE-2025-29927 更深層的教訓是架構面：**middleware 不是安全邊界**。它在 Edge 執行，設計用於路由與回應塑形——而非最後一道防線。真正的驗證檢查必須放在 Route Handlers、Server Actions 與資料存取層。

把 middleware 想成大樓大門：可分流並做第一輪查證件，但**每個房間仍應有自己的鎖**。若有人溜過大門，不應有任何房間敞開。

```typescript
// middleware.ts — 僅用於路由決策
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;

  // 未驗證使用者導向登入
  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// ⚠️ 這是 UX 重新導向，不是安全檢查。
// 務必在實際 handler／action 內再次驗證工作階段。

```
</div>

## 5. 環境變數安全

Next.js 有一條簡單但後果重大的規則：任何以 `NEXT_PUBLIC_` 為前綴的環境變數都會被打進客戶端 JavaScript，任何下載你頁面的人都能看到。沒有該前綴的變數則僅留在伺服器端。

```bash
# .env.local

# ✅ 僅伺服器機密（絕不送到瀏覽器）
DATABASE_URL=postgres://user:password@host/db
AUTH_SECRET=your-signing-secret
AUTHGEAR_CLIENT_SECRET=your-authgear-secret

# ✅ 可公開——刻意公開的設定
NEXT_PUBLIC_APP_URL=https://yourapp.com
NEXT_PUBLIC_AUTHGEAR_CLIENT_ID=your-client-id
NEXT_PUBLIC_AUTHGEAR_ENDPOINT=https://your-project.authgear.cloud

```

請勿將 `.env` 或 `.env.local` 提交到版本控制。兩者皆應加入 `.gitignore`，並以部署平台的祕密管理（Vercel Environment Variables、AWS Secrets Manager 等）存放正式環境值。

## 6. Content Security Policy 標頭

內容安全政策（CSP）告訴瀏覽器允許從哪些來源載入指令碼、樣式、圖片與其他資源。設定良好的 CSP 是對抗 XSS 的關鍵最後防線——即使攻擊者注入 `<script>`，若來源不在允許清單，瀏覽器仍會阻擋。

在 `next.config.ts` 加入安全標頭：

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://cdn.authgear.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self' https://your-project.authgear.cloud;
  frame-ancestors 'none';
`;

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ' ').trim(),
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

```

此設定有兩點說明：第一，CSP 中的 `frame-ancestors 'none'` 與 `X-Frame-Options: DENY` 效果相同——此處兩者並列是為相容不支援 CSP 的舊瀏覽器。第二，`'unsafe-inline'` 會弱化 `script-src`。若要更嚴格且不用 `'unsafe-inline'`，請採 nonce 式 CSP——見 <a href="https://nextjs.org/docs/app/guides/content-security-policy" target="_blank" rel="noopener">Next.js 官方 CSP 指南</a>。

## 7. 使用驗證平台

從零安全實作驗證很難。你必須處理工作階段管理、權杖輪替、MFA、passkey、暴力破解防護等——每個細節都必須正確。這正是像 <a href="https://www.authgear.com" target="_blank" rel="noopener">Authgear</a> 這類驗證平台的價值。Authgear 為 Next.js 提供可嵌入的驗證層，內建 passkey、TOTP MFA、社交登入與工作階段管理——讓你專注在應用本身，而非驗證基礎建設。請見 <a href="https://docs.authgear.com/get-started/regular-web-app/nextjs" target="_blank" rel="noopener">Next.js 快速入門</a>，約 15 分鐘內可開始。

## Next.js 安全檢查清單

<div class="ag-table-wrap">
<table class="ag-table">
  <thead>
    <tr>
      <th>檢查項目</th>
      <th>狀態</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Next.js 已更新至 12.3.5、13.5.9、14.2.25+ 或 15.2.3+（已修 CVE-2025-29927）</td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td>工作階段權杖存在 <code>httpOnly</code>、<code>Secure</code>、<code>SameSite=Lax</code> Cookie</td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td>未將驗證權杖存在 <code>localStorage</code> 或 <code>sessionStorage</code></td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td>帳戶強制 passkey 或 MFA</td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td>已設定工作階段過期（一般應用 24 小時或更短）</td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td>每個 API Route 與 Server Action 都再次驗證身分（非僅 middleware）</td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td>Server Actions 與 API Routes 以 Zod 或同等工具驗證輸入</td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td>登入、OTP、重設密碼端點有速率限制</td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td><code>dangerouslySetInnerHTML</code> 已避免或以 DOMPurify 清理</td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td>已防開放式重新導向——<code>returnTo</code> 驗證為相對 URL</td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td><code>NEXT_PUBLIC_</code> 環境變數中無機密</td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td><code>.env</code> 與 <code>.env.local</code> 已列入 <code>.gitignore</code></td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td>已在 <code>next.config.ts</code> 設定 CSP 標頭</td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td>已設定 <code>X-Frame-Options: DENY</code> 及／或 CSP 的 <code>frame-ancestors 'none'</code></td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td>已設定 <code>X-Content-Type-Options: nosniff</code></td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td>已設定 <code>Strict-Transport-Security</code>（強制 HTTPS）</td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td>已用 <code>npm audit</code> 或同等工具稽核依賴</td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td>管理路由在 middleware 與 route handler 皆有保護</td>
      <td>✅ / ❌</td>
    </tr>
  </tbody>
</table></div>
