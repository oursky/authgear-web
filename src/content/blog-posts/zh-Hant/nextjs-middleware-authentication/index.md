---
title: "Next.js Middleware 驗證：在 App Router 保護路由"
excerpt: "了解 Next.js middleware 如何運作、如何設定 matcher、在 Edge 驗證 JWT，以及如何重新導向未驗證使用者——並涵蓋 CVE-2025-29927 繞過問題。"
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "Next.js Middleware 驗證：在 App Router 保護路由"
metaDescription: "學習如何用 middleware 保護 Next.js 路由。涵蓋 matcher 設定、JWT 驗證、重新導向邏輯與常見陷阱，附程式範例。"
publishedAt: 2026-03-25T18:17:54.737Z
updatedAt: 2026-03-25T18:25:47.188Z
draft: false
---

<div style="background:#fff3cd;border-left:4px solid #ffc107;padding:16px 20px;border-radius:4px;margin:0 0 24px;">
  <strong>Next.js 16 說明：</strong>在 Next.js 16 中，<code>middleware.ts</code> 已重新命名為 <code>proxy.ts</code>，匯出的函式也由 <code>middleware</code> 改為 <code>proxy</code>。本文使用 Next.js 12–15 語法。若你使用 Next.js 16+，請將 <code>middleware.ts</code> 改為 <code>proxy.ts</code>，並將 <code>export function middleware</code> 改為 <code>export function proxy</code>——本指南其餘內容皆適用不變。Vercel 提供 codemod：<code>npx @next/codemod@canary middleware-to-proxy .</code>
</div>

## 為何 Middleware 適合用來保護路由

把你的 Next.js 應用想像成一間飯店。每個房間是一條路由。你**可以**在每扇房門各裝一把鎖——但那代表要把相同的鎖邏輯複製到每個頁面元件。更聰明的做法是使用 **Next.js middleware**——在飯店大門派一名警衛，在客人進電梯**之前**就檢查每個人的鑰匙卡。

這正是 Next.js 中 `middleware.ts` 做的事。它在伺服器上、在任何路由渲染**之前**執行，因此你可以檢查使用者是否已驗證並重新導向——全部集中在一處，頁面之間零重複。

本指南將說明 Next.js middleware 如何運作、如何設定 matcher 只鎖定你在意的路由、如何驗證工作階段權杖、如何重新導向未驗證使用者，以及——至關重要地——如何避免無限重新導向迴圈、誤對靜態資源執行 middleware 等常見陷阱。

## Next.js Middleware 如何運作

Next.js middleware 放在專案根目單一檔案 `middleware.ts`（或 `middleware.js`），與 `app/` 或 `pages/` 目錄同層。每個進來的 HTTP 請求在 Next.js 渲染任何頁面或呼叫任何 route handler **之前**，都會先經過此檔案。

執行順序如下：

<ol>
  <li>瀏覽器向你的 Next.js 應用發出請求</li>
  <li><code>middleware.ts</code> 執行——可檢查請求、設定標頭、改寫 URL 或重新導向</li>
  <li>若 middleware 呼叫 <code>NextResponse.next()</code>，請求會繼續到你的頁面元件或 route handler</li>
  <li>若 middleware 呼叫 <code>NextResponse.redirect()</code>，使用者會立刻被送到另一個 URL</li>
</ol>

因為 middleware 在 Edge（靠近使用者、在應用伺服器之前）執行，它使用輕量 runtime。這表示你**不能**直接使用僅限 Node.js 的函式庫如 `jsonwebtoken`——請改用 Edge 相容的 `jose` 函式庫。

```typescript
// middleware.ts — 最小範例
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 檢查請求後決定動作
  return NextResponse.next() // 放行請求
}

```

## Matcher 設定——只鎖定你需要的路由

預設情況下，middleware 會在**每個**請求上執行——包含 CSS、圖片，以及 `_next/static` 等 Next.js 內部路徑。對這些請求跑驗證邏輯既浪費又可能引發細微 bug。`matcher` 設定可告訴 Next.js 哪些路徑要觸發你的 middleware。

### 基本 Matcher 模式

```typescript
// middleware.ts
export const config = {
  matcher: [
    // 保護 /dashboard 與 /settings 底下所有路徑
    '/dashboard/:path*',
    '/settings/:path*',
  ],
}

```

`:path*` 語意為「零或多個路徑片段」。因此 `/dashboard/:path*` 會符合 `/dashboard`、`/dashboard/analytics`、`/dashboard/analytics/weekly` 等。

### 以負向先行斷言排除公開路徑

常見模式是符合**除了**靜態資產與公開路徑以外的所有項目——以 regex 負向先行斷言達成：

```typescript
// middleware.ts
export const config = {
  matcher: [
    /*
     * 符合所有請求路徑，但排除：
     * - _next/static（JS、CSS 等靜態檔）
     * - _next/image（Next.js 圖片最佳化）
     * - favicon.ico、sitemap.xml、robots.txt
     * - 副檔名如 .png、.jpg、.svg 的檔案
     */
    '/((?!_next/static|_next/image|favicon\.ico|sitemap\.xml|robots\.txt|.*\.(?:png|jpg|jpeg|gif|svg|ico|webp)$).*)',
  ],
}

```

可把它想成飯店賓客名單——人人都被查核——除了維修人員（靜態檔）從後門進出。

### Matcher 對照表

<div class="ag-table-wrap">
    <table class="ag-table">
      <thead>
        <tr>
          <th>模式</th>
          <th>符合項目</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>/dashboard</code></td>
          <td>僅 <code>/dashboard</code></td>
        </tr>
        <tr>
          <td><code>/dashboard/:path*</code></td>
          <td><code>/dashboard</code> 與所有巢狀路徑</td>
        </tr>
        <tr>
          <td><code>/api/:path+</code></td>
          <td><code>/api/</code> 下所有路徑（至少一個片段）</td>
        </tr>
        <tr>
          <td><code>/((?!login|register).*)</code></td>
          <td>除 <code>/login</code> 與 <code>/register</code> 以外的所有路徑</td>
        </tr>
      </tbody>
    </table></div>

## 在 Middleware 驗證工作階段

最常見作法是在使用者登入後把工作階段權杖存在 `httpOnly` Cookie，之後在每個受保護請求的 middleware 讀取並驗證該 Cookie。

### 在 Middleware 讀取 Cookie

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 從 Cookie 讀取工作階段權杖
  const token = request.cookies.get('session-token')?.value

  if (!token) {
    // 沒有權杖——導向登入
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

```

### 在 Middleware 驗證 JWT

僅檢查 Cookie **存在**不夠——使用者可偽造 Cookie。你必須以密碼學驗證 JWT。請使用在 edge runtime 可用的 `jose` 函式庫。關於 JWT 設定與 httpOnly Cookie 模式的完整說明，請見 [Next.js JWT 驗證指南](/zh-hant/post/nextjs-jwt-authentication)。

```bash
npm install jose

```

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, JWT_SECRET)
    return true
  } catch {
    // 權杖過期、遭竄改或其他無效情況
    return false
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('session-token')?.value

  if (!token || !(await verifyToken(token))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/settings/:path*', '/profile/:path*'],
}

```

## 重新導向未驗證使用者——完整可用範例

以下是完整的 `middleware.ts`，處理三種最常見情境：

<ol>
  <li>未驗證使用者試圖存取受保護路由 → 重新導向 <code>/login</code></li>
  <li>已驗證使用者試圖存取 <code>/login</code> 或 <code>/register</code> → 重新導向 <code>/dashboard</code></li>
  <li>其餘請求 → 原樣放行</li>
</ol>

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

// 需要使用者已登入的路由
const PROTECTED_ROUTES = ['/dashboard', '/settings', '/profile']

// 已登入使用者應被導離的路由（例如導向 /dashboard）
const AUTH_ROUTES = ['/login', '/register']

async function getAuthenticatedUser(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get('session-token')?.value
  if (!token) return false

  try {
    await jwtVerify(token, JWT_SECRET)
    return true
  } catch {
    return false
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAuthenticated = await getAuthenticatedUser(request)

  // 目前路徑是否以任一受保護路由開頭
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  )

  // 是否為驗證路由（登入／註冊）
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route))

  if (isProtectedRoute && !isAuthenticated) {
    // 記住使用者原本要去哪，登入後可導回
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthRoute && isAuthenticated) {
    // 已登入——不必再顯示登入頁
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\.ico|sitemap\.xml|robots\.txt|.*\.(?:png|jpg|jpeg|gif|svg|ico|webp)$).*)',
  ],
}

```

請注意 `callbackUrl` 查詢參數——讓登入頁在成功登入後可把使用者導回原本想去的頁面，體驗順暢許多。

## 使用 Authgear 做 Next.js 驗證

若你使用 [Authgear 作為驗證提供者](https://docs.authgear.com/get-started/regular-web-app/nextjs)，`@authgear/nextjs` 套件會處理權杖驗證、工作階段重新整理與驗證狀態管理，不必手動接線。

```bash
npm install @authgear/nextjs

```

安裝後，你在 middleware 保護路由的方式與上文相同——使用 Authgear 的工作階段 Cookie 與標準 JWT 驗證模式。套件也提供伺服器端輔助函式如 `currentUser()`，可在 Server Components 與 Route Handlers 取得已驗證使用者，無須自行重複驗證權杖。

自行實作驗證時，最棘手的部分之一是權杖重新整理——當使用者的 access token 即將過期，你需以 refresh token 靜默換發新權杖，讓使用者不中斷地保持登入。Authgear 會透明處理這件事。

完整設定說明（含環境變數與登入頁實作）請見 [Authgear Next.js 快速入門](https://docs.authgear.com/get-started/regular-web-app/nextjs)。

## 常見陷阱

### 陷阱 1：無限重新導向迴圈

<div style="background:#fff3cd;border-left:4px solid #ffc107;padding:16px 20px;border-radius:4px;margin:24px 0;">
  <strong>警告：無限重新導向迴圈</strong>
  <p style="margin:8px 0 0;">若 middleware 把未驗證使用者導向 <code>/login</code>，但 <code>/login</code> 本身也被你的 matcher 命中，重新導向會永遠循環。瀏覽器會顯示 <em>「ERR_TOO_MANY_REDIRECTS」</em> 錯誤。</p>

**修正方式：**確保登入與註冊頁要麼從 matcher 模式排除，要麼在 middleware 邏輯中明確提早 return（如上完整範例：未驗證時 `isAuthRoute` 路徑會放行）。

```typescript
// 不好：/:path* 會連 /login 一起命中，造成迴圈
export const config = {
  matcher: ['/:path*'],
}

// 好：/login 與 /register 從 matcher 排除
export const config = {
  matcher: ['/((?!login|register|_next/static|_next/image|favicon\.ico).*)',],
}

```

</div>

### 陷阱 2：對靜態資源執行 Middleware

若 matcher 太寬（例如 `/:path*`），middleware 會對每個圖片、字型、CSS 請求執行。這會增加每個資產載入延遲；若 middleware 不小心對 CSS 回傳重新導向，還可能造成畫面異常。請務必從 matcher 排除 `_next/static`、`_next/image` 與常見副檔名。

### 陷阱 3：Middleware 並非完整安全邊界

2025 年 3 月揭露重大漏洞（CVE-2025-29927，CVSS 9.1）：透過偽造的 `x-middleware-subrequest` 標頭可**完全繞過** middleware。此問題影響執行 `next start` 的自架 Next.js 部署——Vercel 與 Netlify 部署不受影響。已於 **12.3.5、13.5.9、14.2.25、15.2.3** 修復。請務必使用已修補版本。

更重要的是：把 middleware 當第一道防線——多數未授權存取的 UX 便利——但**務必在 Server Components 與 API route handler 再次驗證身分**，再暴露敏感資料。多層防禦才是正途。若欲了解為何在資料層驗證權杖很重要，請讀 [JWT 如何運作](/zh-hant/post/what-is-jwt)。

### 陷阱 4：使用僅限 Node.js 的函式庫

Middleware 預設在 Edge Runtime 執行，不支援許多 Node.js API。若在 middleware 直接使用 `jsonwebtoken`、Node 的 `crypto` 模組，或 Prisma 等資料庫客戶端，會得到 runtime 錯誤。請改用 Edge 相容替代方案：

<div class="ag-table-wrap">
    <table class="ag-table">
      <thead>
        <tr>
          <th>工作</th>
          <th>僅 Node（middleware 避免）</th>
          <th>Edge 相容（請改用）</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>JWT 驗證</td>
          <td><code>jsonwebtoken</code></td>
          <td><code>jose</code></td>
        </tr>
        <tr>
          <td>雜湊／密碼學</td>
          <td><code>crypto</code>（Node 模組）</td>
          <td>Web Crypto API（<code>crypto.subtle</code>）</td>
        </tr>
        <tr>
          <td>資料庫查詢</td>
          <td>Prisma、Mongoose</td>
          <td>將查詢移到 Server Components 或 Route Handlers</td>
        </tr>
      </tbody>
    </table></div>

自 Next.js 15.2+ 起，可在 `config` 匯出加上 `runtime: 'nodejs'` 讓 middleware 使用 Node.js runtime（自 Next.js 15.5 起穩定）。這會移除 Edge Runtime 限制，但 middleware 不再在 CDN Edge 執行——改在你的應用伺服器上執行。

```typescript
// middleware.ts — 選用 Node.js runtime（Next.js 15.2+，15.5 起穩定）
export const config = {
  runtime: 'nodejs', // 啟用完整 Node.js API，停用 CDN edge 執行
  matcher: ['/dashboard/:path*'],
}

```

## FAQ

### 我能用 middleware 同時保護 API route 與頁面嗎？

可以。matcher 可一併包含 `/api/:path*` 與頁面路由。此時回傳 `NextResponse.json({ error: 'Unauthorized' }, { status: 401 })` 比重新導向更合適，因為 API 客戶端通常預期 JSON 錯誤，而非 HTML 重新導向頁。

### Middleware 與在每個頁面元件內檢查驗證有何不同？

Middleware 在頁面渲染**之前**執行，可在不渲染任何 React 的情況下重新導向，較快且較省。在每個頁面元件內檢查較慢（頁面開始渲染後才能重新導向），且需在每個受保護頁面複製相同邏輯。請把 middleware 當第一道守衛，但對敏感資料抓取仍應在 Server Components 再檢查驗證——**切勿**只靠 middleware 當唯一安全層。

### 在 Next.js 中，middleware 會在客戶端導覽時執行嗎？

在 App Router 中，客戶端導覽會向伺服器取得 React Server Component（RSC）payload。Middleware **會**對這些 RSC 請求執行，因此你的驗證檢查同時適用於初次載入與後續導覽。須知：Next.js 會從 middleware 內的 `request` 物件剝除內部 RSC 標頭（如 `next-router-prefetch`），避免你意外以不同方式處理 RSC 與 HTML 請求——通常你也不需要。驗證邏輯應以相同方式處理兩者。

### 如何把已驗證使用者資料從 middleware 傳到頁面元件？

Middleware 無法直接把資料傳給 React 元件。正確模式是透過 *request* 標頭轉送，使用 `NextResponse.next({ request: { headers: ... } })`，再由 Server Components 以 `next/headers` 的 `headers()` 讀取：

```typescript
// middleware.ts — 透過 request 標頭轉送使用者 ID
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('session-token')?.value
  if (!token) return NextResponse.redirect(new URL('/login', request.url))

  const { payload } = await jwtVerify(token, JWT_SECRET)

  // 複製並變更 request 標頭後轉送
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-user-id', payload.sub as string)

  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

```

```typescript
// Server Component — 讀取轉送的標頭
import { headers } from 'next/headers'

export default async function DashboardPage() {
  const headersList = await headers()
  const userId = headersList.get('x-user-id')
  // 以 userId 抓取使用者專屬資料
}

```

若要更完整了解工作階段管理與權杖處理，請見 [驗證方案指南](/zh-hant/post/authentication-solutions-guide)，或進一步閱讀 [JWT 如何承載使用者身分](/zh-hant/post/what-is-jwt)。

若要完全跳過樣板程式，在幾分鐘內為 Next.js 加入可上線的驗證，請[免費試用 Authgear](https://portal.authgear.com/)——內建權杖發放、重新整理、工作階段管理與 MFA。
