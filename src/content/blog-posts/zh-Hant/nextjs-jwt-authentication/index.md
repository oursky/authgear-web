---
title: "如何為 Next.js App Router 加入 JWT 驗證（2026）"
excerpt: "以正確方式在 Next.js App Router 加入 JWT 驗證：httpOnly Cookie、以 jose 在 Edge middleware 驗證，以及在 Server Components 讀取 JWT claims。"
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "如何為 Next.js App Router 加入 JWT 驗證（2026）"
metaDescription: "以 httpOnly Cookie 與 jose 在 Next.js App Router 實作 JWT。涵蓋 middleware、Server Components 與完整 TypeScript 範例。"
publishedAt: 2026-03-20T20:55:19.382Z
updatedAt: 2026-03-20T21:06:16.550Z
draft: false
faq:
  - q: "為什麼用 `jose` 而不是 `jsonwebtoken`？"
    a: "`jsonwebtoken` 依賴 Node.js 內建 `crypto`，在 Next.js 的 Edge Runtime（`middleware.ts` 執行處）不可用。`jose` 建構在 Web Crypto API 上，可在 Edge、Service Worker 與瀏覽器使用。若你只在 Node.js API route 使用 JWT，`jsonwebtoken` 在那裡可用——但跨整個 Next.js 堆疊時，`jose` 是更安全、可攜的選擇。"
  - q: "JWT 一直過期把使用者登出，如何處理 refresh token？"
    a: "短效 JWT（15–60 分鐘）比長效更安全，但需要重新整理機制。標準模式：發放短效 **access token**（JWT）與較長效的 **refresh token**（存在另一個 httpOnly Cookie）。access token 過期時，middleware 呼叫內部 `/api/refresh` 路由驗證 refresh token 並簽發新 access token——對使用者透明、不需重新登入。Authgear 等驗證平台會自動處理這類流程。"
  - q: "我能在 Client Component 讀 JWT 嗎？"
    a: "若 JWT 存在 httpOnly Cookie，**不能**——這正是安全模型的一部分。Client Component 無法讀取 httpOnly Cookie。若客戶端需要使用者資訊（顯示名稱、大頭照），建議提供 `/api/me` Route Handler，在伺服器端讀 Cookie 後只回傳所需欄位的 JSON。**切勿**把原始 JWT 暴露給客戶端 JavaScript。"
  - q: "如何保護 API route，而不只是頁面？"
    a: "兩種做法。其一，把 API 前綴加入 middleware 的 `matcher`（例如 `/api/protected/:path*`），在 Route Handler 執行前於 edge 驗證 JWT。其二，在每個 Route Handler 頂端呼叫 `getCurrentUser()`，若為 `null` 則回 `401`。middleware 較省因在 edge 短路；handler 內驗證則可對每條路由更細緻控制。"
---

## 為何 JWT 與 Next.js 很合拍

Next.js App Router 專案一超過原型階段，每個開發者都會碰到：**「我要如何知道是誰在發這個請求？」** JSON Web Token（JWT）是 Next.js JWT 驗證的標準答案。JWT 是**自包含**、經密碼學簽章的權杖，內含已登入使用者的 **claims**。因權杖**無狀態**，每次請求不必查資料庫——伺服器驗簽後直接讀 claims。對 serverless 或 edge 部署的 Next.js 而言，這是有感的效能優勢。

本指南將以 App Router 建置完整 Next.js JWT 驗證，涵蓋：

<ul>
    <li>JWT 安全存放位置（以及<strong>不要</strong>怎麼做）</li>
    <li>在 <code>middleware.ts</code> 於 edge 驗證 JWT 以保護路由</li>
    <li>在 Server Components 存取 JWT claims</li>
    <li>若你想跳過樣板，Authgear Next.js SDK 如何代劳</li>
  </ul>

## JWT 如何運作（快速複習）

把 JWT 想成演唱會手環：進場（登入）時查證件後發給你印有區域的手環；整晚任何工作人員看到手環就知道你可坐哪——不必每次都打電話回售票處。

技術上，JWT 為以點分隔的三段 Base64URL：**header**（簽章演算法）、**payload**（使用者 ID、電子郵件、過期時間等 claims）、**signature**（無人竄改密碼學證明）。Next.js 伺服器收到帶 JWT 的請求時，以密鑰重算簽章並與權杖內比對；相符即可信任 payload。格式深入說明見 [JWT 驗證指南](/zh-hant/post/jwt-authentication-a-secure-scalable-solution-for-modern-applications)，或即時檢視權杖請用 [Authgear JWT Debugger](/zh-hant/tools/jwt-jwe-debugger)。

## JWT 該存在哪裡

寫 middleware 前，先決定 JWT 在客戶端存在哪。**localStorage** 與 **httpOnly Cookie** 並不等價。

<div class="ag-table-wrap">
    <table class="ag-table">
      <thead>
        <tr>
          <th>儲存方式</th>
          <th>JS 可讀？</th>
          <th>XSS 風險</th>
          <th>CSRF 風險</th>
          <th>Server Component 可用？</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>localStorage</td>
          <td>是</td>
          <td>高</td>
          <td>低</td>
          <td>否</td>
        </tr>
        <tr>
          <td>httpOnly cookie</td>
          <td>否</td>
          <td>低</td>
          <td>中（請設 SameSite）</td>
          <td>是</td>
        </tr>
      </tbody>
    </table></div>

建議很明確：請用 **httpOnly Cookie**。

```typescript

// ❌ 不要這樣做——localStorage 可被頁面上任何 JavaScript 讀取，
// 包含 XSS 注入的惡意第三方腳本。
localStorage.setItem('token', jwt);

// ✅ 改在 Route Handler 或 Server Action 由伺服器端設定 Cookie：
// （見下方登入 handler）
  
```

<blockquote>
    <p><strong>警告：</strong> 將 JWT 存在 localStorage 會暴露於跨站腳本（XSS）。頁面上任何 JavaScript——包含遭入侵的 npm 套件——都能讀取 localStorage 並竊取權杖。httpOnly Cookie 對 JavaScript 完全不可見，可消除該攻擊面。</p>
  </blockquote>

### 登入時設定 httpOnly Cookie

以下為精簡 Next.js Route Handler：驗證憑證、簽發 JWT、設為 httpOnly Cookie。使用 **`jose`**，相容 Next.js Edge Runtime——有別於依賴 Edge 不可用 Node API 的熱門套件 **`jsonwebtoken`**。

```typescript

// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // 請替換為實際查使用者 + 驗證密碼
  const user = await verifyCredentials(email, password);
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // 簽發 24 小時有效的 JWT
  const token = await new SignJWT({ sub: user.id, email: user.email, role: user.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);

  const response = NextResponse.json({ success: true });

  // httpOnly 表示 JavaScript 無法讀取此 Cookie
  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 小時（秒）
  });

  return response;
}

// 占位——請替換為實際資料庫查詢與雜湊密碼比對
async function verifyCredentials(email: string, password: string) {
  // 例如查資料庫並比對雜湊密碼
  return null;
}
  
```

## 以 Next.js Auth Middleware 驗證 JWT

Next.js `middleware.ts` 在 **edge** 執行——在任何頁面或 API route 渲染**之前**。這是強制驗證的理想位置：未驗證使用者可立刻重新導向，不必進入應用邏輯。

<blockquote>
    <p><strong>重要：</strong> Next.js middleware 在 Edge Runtime 執行，不支援 Node.js 的 <code>crypto</code> 模組。在 middleware 使用 <code>jsonwebtoken</code> 會在 runtime 拋錯。請改用 <code>jose</code>——純 Web Crypto 實作，可在 Edge、Service Worker 與瀏覽器運作。</p>
  </blockquote>

```typescript

// middleware.ts（放在專案根目錄，與 package.json 同層）
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

// 需要登入的路由
const PROTECTED_PATHS = ['/dashboard', '/settings', '/profile'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_PATHS.some((path) => pathname.startsWith(path));
  if (!isProtected) {
    return NextResponse.next();
  }

  const token = req.cookies.get('token')?.value;

  if (!token) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-user-id', String(payload.sub));
    requestHeaders.set('x-user-email', String(payload.email ?? ''));
    requestHeaders.set('x-user-role', String(payload.role ?? ''));

    return NextResponse.next({ request: { headers: requestHeaders } });
  } catch (err) {
    const response = NextResponse.redirect(new URL('/login', req.url));
    response.cookies.delete('token');
    return response;
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/settings/:path*', '/profile/:path*'],
};
  
```

幾點說明：

<ul>
    <li><code>jose</code> 的 <strong><code>jwtVerify</code></strong> 一次檢查簽章與過期時間（<code>exp</code>）；任一失敗即拋錯。</li>
    <li>將 claims 轉成 <strong>request 標頭</strong>（<code>x-user-id</code> 等）可讓 Server Components 與 Route Handlers 讀取使用者資訊，而不必每次渲染都重驗權杖。</li>
    <li><strong><code>config.matcher</code></strong> 限制 middleware 執行範圍——公開頁與行銷路由無額外開銷。</li>
  </ul>

## 在 Server Components 讀取 JWT Claims

middleware 驗證權杖並轉成標頭後，任何 Server Component 都可用 Next.js 的 `headers()` 讀取——無需客戶端 JavaScript。

```typescript

// app/dashboard/page.tsx
import { headers } from 'next/headers';

export default async function DashboardPage() {
  const headersList = await headers();
  const userId = headersList.get('x-user-id');
  const userEmail = headersList.get('x-user-email');
  const userRole = headersList.get('x-user-role');

  if (!userId) {
    return <p>Not authenticated.</p>;
  }

  return (
    <main>
      <h1>Welcome back!</h1>
      <p>Logged in as {userEmail} (role: {userRole})</p>
    </main>
  );
}
  
```

若需要完整 JWT payload 而非僅轉發的標頭，可在 Server Component 重新讀 Cookie 並直接呼叫 `jwtVerify`。密鑰永不離開伺服器：

```typescript

// lib/auth.ts — 僅伺服器端共用的輔助函式
import { cookies } from 'next/headers';
import { jwtVerify, type JWTPayload } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export interface AuthUser extends JWTPayload {
  sub: string;
  email: string;
  role: string;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as AuthUser;
  } catch {
    return null;
  }
}
  
```

於任意 Server Component 呼叫：

```typescript

// app/profile/page.tsx
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  return <p>Hello, {user.email}!</p>;
}
  
```

## 使用 Authgear 跳過手刻 JWT 管線

自建 JWT 適合學習，但正式環境還需要 refresh 輪替、PKCE、全裝置登出、社交登入、MFA 等——每一塊都是安全關鍵、實作不簡單。

Authgear 的 [`@authgear/nextjs` SDK](https://docs.authgear.com/get-started/regular-web-app/nextjs) 內建上述能力。你仍取得應用 JWKS 簽署的標準 JWT，但權杖生命週期、Cookie 管理與 middleware 整合已預先完成。若團隊想專注產品而非維護驗證函式庫，這是較快路徑。亦可搭配我們的 [WebAuthn 實作通行密鑰指南](/zh-hant/post/how-to-implement-passkeys-developer-guide)，在 JWT 之上加入無密碼登入。

## 常見問題

### 為什麼用 `jose` 而不是 `jsonwebtoken`？

`jsonwebtoken` 依賴 Node.js 內建 `crypto`，在 Next.js Edge Runtime（`middleware.ts`）不可用。`jose` 建構在 Web Crypto API，可在 Edge、Service Worker 與瀏覽器使用。若只在 Node.js API route 使用 JWT，`jsonwebtoken` 可用——但跨整個 Next.js 堆疊時，`jose` 更安全且可攜。

### JWT 一直過期把使用者登出，如何處理 refresh token？

短效 JWT（15–60 分鐘）較安全，但需要重新整理機制。標準模式：短效 **access token**（JWT）與較長效、存在另一 httpOnly Cookie 的 **refresh token**。access token 過期時，middleware 呼叫內部 `/api/refresh` 驗證 refresh token 並簽發新 access token——對使用者透明。Authgear 等會自動處理。

### 我能在 Client Component 讀 JWT 嗎？

若 JWT 在 httpOnly Cookie，**不能**——這是刻意的。Client Component 無法讀 httpOnly Cookie。若客戶端需要顯示名稱或大頭照，建議 `/api/me` Route Handler 在伺服器讀 Cookie 後只回傳必要欄位。**切勿**把原始 JWT 給客戶端 JavaScript。

### 如何保護 API route，而不只是頁面？

其一，將 API 前綴加入 middleware `matcher`（如 `/api/protected/:path*`），在 Route Handler 前於 edge 驗證 JWT。其二，在每個 handler 頂端呼叫 `getCurrentUser()`，`null` 則回 `401`。middleware 在 edge 短路較省；handler 內驗證則可逐路由細調。

## 下一步

你現已具備可用的 Next.js JWT 模式：httpOnly Cookie 安全存權杖、edge middleware 保護路由、可重用的伺服器端 helper 讀取 claims。若要含 refresh、社交登入與 MFA 的正式環境版本，請[開始使用 Authgear Next.js SDK](https://docs.authgear.com/get-started/regular-web-app/nextjs)——約 15 分鐘可整合，讓你專注打造產品。
