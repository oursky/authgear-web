---
title: "Next.js 工作階段管理：Cookie、JWT 與伺服器端 Session（2026）"
excerpt: "Next.js 的工作階段管理比傳統 SSR 應用更細膩。本篇說明具狀態與無狀態工作階段、安全 Cookie 屬性、以 jose 簽署 JWT、權杖輪替與滑動過期，以及如何在 Server Components、Route Handlers 與 Middleware 讀取工作階段資料。"
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "Next.js 工作階段管理：Cookie、JWT 與權杖"
metaDescription: "了解 Next.js App Router 如何以 Cookie 與 JWT 管理工作階段：httpOnly Cookie、jose、權杖輪替、middleware 與登出。"
publishedAt: 2026-03-27T15:28:51.407Z
updatedAt: 2026-03-27T15:32:23.137Z
draft: false
faq:
  - q: "我能在 Client Component 讀取工作階段 Cookie 嗎？"
    a: "不行——`httpOnly` Cookie 刻意對 JavaScript 隱藏。若 Client Component 需要使用者資料（例如顯示名稱），請從 Server Component 或 Route Handler 取得後以 props 下傳，或在伺服器端填入 context provider。"
  - q: "`SameSite: 'lax'` 與 `SameSite: 'strict'` 有什麼差別？"
    a: "`'lax'` 在使用者從外部頁面點連結進入你的網站（例如從郵件點連結）時仍會帶上工作階段 Cookie。`'strict'` 會阻擋所有跨站導覽（含最上層導覽）帶 Cookie，因此從外部連結進站的使用者會看起來像未登入，直到在站內再導覽一次。多數應用用 `'lax'` 在 UX 與防 CSRF 之間較平衡；處理銀行或高權限管理操作時可考慮 `'strict'`。"
  - q: "該在 Middleware 還是 Route Handler 設定 Cookie？"
    a: "你可以在 Middleware 用 `request.cookies` **讀取** Cookie，並在回應上**修改** Cookie（如滑動工作階段範例）。但你**無法**在 Middleware **初次設定**工作階段 Cookie——它執行於 Route Handlers 之前，無法取得已驗證的使用者身分。登入流程應一律經過 Route Handler 或 Server Action。"
  - q: "如何在使用者活躍時維持登入，閒置時讓工作階段過期？"
    a: "採用 Middleware 範例中的滑動視窗：每次請求若帶有有效工作階段權杖，就重設過期時間。將 Cookie 的 `expires` 與 JWT 過期設為同一滑動視窗（例如 7 天）。每天活躍的使用者可一直保持登入；連續 7 天未活動則自動登出。若安全要求更高，可縮短為 15–30 分鐘。"
---

## Next.js 應用裡的「工作階段」是什麼？

HTTP 本身是無狀態的——每次請求都不記得先前發生過什麼。**工作階段**是你加上的那一層，用來辨識再次造訪的已驗證使用者。沒有它，使用者每次載入頁面都得重新登入。

Next.js 的工作階段管理比傳統伺服器渲染應用更細膩。混合式架構——Server Components、Route Handlers、Edge Middleware 各自在不同脈絡執行——代表你必須刻意決定工作階段資料**放在哪裡**、**如何**在請求生命週期中流動。

主要有兩種策略：**具狀態工作階段**（伺服器儲存資料，瀏覽器只拿不透明 ID）與**無狀態 JWT 工作階段**（權杖本身承載資料）。兩者都把識別資訊放在 **Cookie**——而不是 `localStorage`。實作前先比較兩者。

## 兩種做法：具狀態 vs 無狀態工作階段

<div class="ag-table-wrap">
    <table class="ag-table">
      <thead>
        <tr>
          <th>面向</th>
          <th>具狀態（伺服器端儲存）</th>
          <th>無狀態（Cookie 內的 JWT）</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>資料存放位置</td>
          <td>資料庫／Redis</td>
          <td>簽署過的權杖內</td>
        </tr>
        <tr>
          <td>需要伺服器儲存</td>
          <td>是</td>
          <td>否</td>
        </tr>
        <tr>
          <td>立即撤銷</td>
          <td>可——刪除資料庫紀錄</td>
          <td>困難——須等權杖過期或維護封鎖名單</td>
        </tr>
        <tr>
          <td>水平擴充</td>
          <td>需要共用工作階段儲存（如 Redis）</td>
          <td>可——每台伺服器獨立驗簽</td>
        </tr>
        <tr>
          <td>權杖大小</td>
          <td>小（僅 ID）</td>
          <td>較大（含 payload）</td>
        </tr>
        <tr>
          <td>最適合</td>
          <td>需要細緻撤銷的應用（管理後台、金融）</td>
          <td>重視簡化與水平擴展的應用</td>
        </tr>
      </tbody>
    </table></div>

## 務必設定的 Cookie 安全屬性

無論採哪種策略，工作階段 Cookie 的安全性取決於屬性。建立 Cookie 時請盡量四項都設：

<ul>
  <li><strong>httpOnly</strong>——瀏覽器內的 JavaScript 無法讀取此 Cookie。這是防 XSS 竊取工作階段權杖的第一道防線。</li>
  <li><strong>Secure</strong>——僅透過 HTTPS 傳送。正式環境絕對不要省略。</li>
  <li><strong>SameSite: 'lax'</strong>——在同站請求與最上層跨站導覽（例如從郵件點連結）會帶 Cookie，但背景跨站請求不會。<code>'lax'</code> 是多數情境的好預設；高安全需求可考慮 <code>'strict'</code>。</li>
  <li><strong>expires / maxAge</strong>——務必設定過期時間。沒有過期的 Cookie 會活到瀏覽器關閉，在共用裝置上是安全風險。</li>
</ul>

## 在 Route Handler 設定工作階段 Cookie

Route Handler 是設定 Cookie 的正確位置——你不能在 Server Component 渲染期間設定 Cookie。以下是一個建立工作階段的登入端點：

```typescript
// app/api/login/route.ts
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { validateCredentials } from '@/lib/auth'
import { createSession } from '@/lib/session'

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  // 1. Verify credentials against your database
  const user = await validateCredentials(email, password)
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  // 2. Create a signed session token and set the cookie
  await createSession(user.id)

  return NextResponse.json({ success: true })
}

```

## 以 `jose` 實作 JWT 工作階段

### 把 JWT 放在 Cookie，不要放 localStorage

<blockquote>
  <p><strong>警告：</strong>絕不要把工作階段權杖或 JWT 放在 <code>localStorage</code> 或 <code>sessionStorage</code>。頁面上任何 JavaScript——含第三方腳本——都能讀取 <code>localStorage</code>，使權杖暴露於 XSS。請一律把工作階段權杖放在 <strong>httpOnly Cookie</strong>。</p>
</blockquote>

JWT 自帶 payload（使用者 ID、角色、過期時間）並經密碼學簽署。伺服器驗簽時不必查資料庫，因此很適合無狀態工作階段。權杖仍透過安全 Cookie 在每次請求送往伺服器。

### 使用 `jose` 的工作階段輔助函式

[`jose`](https://github.com/panva/jose) 是 Next.js 常用的 JWT 函式庫，因為它同時可在 Node.js 與 Middleware 使用的 Edge Runtime 執行。`server-only` 匯入可避免此模組被打進客戶端——若誤在 Client Component 匯入，建置會直接失敗並顯示清楚錯誤。

注意：下列函式依 Next.js 慣例命名為 `encrypt`／`decrypt`，實際做的是 **簽署與驗證**（HMAC-SHA256），並非加密。JWT payload 僅經 base64 編碼，**不是**加密——請勿在 JWT payload 存放密碼、PII 等敏感資料。

```typescript
// lib/session.ts
import 'server-only'
import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'

const secretKey = process.env.SESSION_SECRET!
const encodedKey = new TextEncoder().encode(secretKey)

export type SessionPayload = {
  userId: string
  role: string
  expiresAt: Date
}

// Signs a JWT with the session payload
export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

// Verifies a JWT and returns its payload, or null if invalid/expired
export async function decrypt(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload as unknown as SessionPayload
  } catch {
    return null
  }
}

// Creates a signed session token and sets the cookie
export async function createSession(userId: string, role = 'user') {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const token = await encrypt({ userId, role, expiresAt })

  const cookieStore = await cookies()
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  })
}

```

請產生強隨機密鑰並寫入環境變數：

```bash
openssl rand -base64 32

```

```bash
# .env.local
SESSION_SECRET=your_generated_secret_here

```

## 重新整理權杖輪替與滑動工作階段

### 為什麼重要

短效權杖可限制外洩後的損害——很快失效。但若每 15 分鐘就逼使用者重登，體驗很差。**重新整理權杖輪替**可解決：長效的 **refresh token** 在背景簽發新的短效 **access token**，無須重新驗證。

關鍵安全規則：**每個 refresh token 只能使用一次**。伺服器簽發新 access token 時，應立刻作廢舊的 refresh token。若有人重複使用已用過的 refresh token，伺服器可視為工作階段遭竊並撤銷整串關聯工作階段。

### 在 Middleware 實作滑動視窗

較簡單的輪替形式——在每次活躍造訪時延長過期——很適合放在 Next.js Middleware。有時稱為 **滑動視窗工作階段**：只要使用者持續使用應用就保持登入，閒置一段時間後過期。

```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { decrypt, encrypt } from '@/lib/session'

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session')?.value
  if (!sessionCookie) return NextResponse.next()

  const payload = await decrypt(sessionCookie)
  if (!payload) return NextResponse.next()

  // Re-issue the cookie with a fresh expiry on every request
  const newExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const newToken = await encrypt({ ...payload, expiresAt: newExpiry })

  const response = NextResponse.next()
  response.cookies.set('session', newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: newExpiry,
    path: '/',
  })

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\.png$).*)'],
}

```

每天活躍的使用者可一直保持登入；連續 7 天未活動則自動登出。銀行或管理後台等高安全情境可將視窗縮短為 15–30 分鐘。

## 在 Server Components、Route Handlers 與 Middleware 讀取工作階段

工作階段 Cookie 會隨每次請求送出，但依程式執行位置不同，讀取方式也不同。

### Server Components

使用 `next/headers` 的 `cookies()`。在 Next.js 15 為 async，必須 await：

```typescript
// app/dashboard/page.tsx
import { cookies } from 'next/headers'
import { decrypt } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('session')?.value
  const session = sessionToken ? await decrypt(sessionToken) : null

  if (!session?.userId) {
    redirect('/login')
  }

  return <div>Welcome back, user {session.userId}</div>
}

```

若要避免每頁重複，可抽出 `verifySession()` 並以 React 的 `cache()` 記憶化。這是 Next.js 建議的 **資料存取層（DAL）** 模式——集中驗證邏輯，並確保單次 render 不會重複執行相同檢查：

```typescript
// lib/dal.ts  (Data Access Layer)
import 'server-only'
import { cache } from 'react'
import { cookies } from 'next/headers'
import { decrypt } from '@/lib/session'
import { redirect } from 'next/navigation'

export const verifySession = cache(async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  const session = token ? await decrypt(token) : null

  if (!session?.userId) {
    redirect('/login')
  }

  return session
})

```

### Route Handlers

同樣使用 `cookies()` API，但改回傳 `Response` 而非 redirect：

```typescript
// app/api/me/route.ts
import { cookies } from 'next/headers'
import { decrypt } from '@/lib/session'

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  const session = token ? await decrypt(token) : null

  if (!session?.userId) {
    return new Response(null, { status: 401 })
  }

  return Response.json({ userId: session.userId, role: session.role })
}

```

### Middleware

在 Middleware 請從 `request.cookies` 讀取——不要用 `next/headers` 的 `cookies()`。Middleware 脈絡下無法使用 `next/headers` 的 `cookies()`。滑動工作階段範例已示範 `request.cookies.get('session')`。

Middleware 適合在頁面渲染**之前**把未驗證使用者**導走**。權限檢查或查資料庫請放在 Server Components 或 Route Handlers——Middleware 應保持輕量。更深入說明見我們的 [Next.js Middleware 驗證](/zh-hant/post/nextjs-middleware-authentication)指南。

## 工作階段過期與登出

### 登出時清除工作階段

登出即刪除 Cookie。請在 Server Action 或 Route Handler 執行：

```typescript
// app/actions/auth.ts
'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
  redirect('/login')
}

```

將登出鈕接上：

```typescript
// app/ui/logout-button.tsx
'use client'
import { logout } from '@/app/actions/auth'

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button type="submit">Sign out</button>
    </form>
  )
}

```

### 優雅處理過期權杖

當 `decrypt()` 回傳 `null`（簽章無效或權杖已過期）時，應視為未登入並導向登入頁。不要帶著過期工作階段默默繼續。

JWT 工作階段在登出時刪除 Cookie 即足夠：Cookie 消失後權杖不會再被送出。若是具狀態（資料庫）工作階段，還應刪除資料庫中的工作階段紀錄，以免 session ID 在 Cookie 被復原時仍遭重放。

## 省去樣板程式：使用 Authgear 的 Next.js SDK

上述 Cookie 屬性、JWT 簽署、權杖輪替、跨 Server Components 與 Middleware 讀取工作階段——要全部正確維護是大量樣板。一個 Cookie 旗標或過期時間算錯，就可能造成實際安全漏洞。

[Authgear 的 Next.js SDK](https://docs.authgear.com/get-started/regular-web-app/nextjs) 可代管完整工作階段生命週期：簽發與更新權杖、設定安全 Cookie、在 Server Components 與客戶端 hook 暴露目前使用者，並提供現成登出端點。你可取得符合 OIDC、含 refresh token 輪替的工作階段，而無須自行寫加密或 Cookie 管理。

若還需要社交登入、通行金鑰或多因素驗證，Authgear 的託管驗證 UI 也能涵蓋——讓你專心做產品，而不是維護一整層驗證。

若要搭配工作階段管理補強 JWT 實務，可參考 [Next.js JWT 驗證](/zh-hant/post/nextjs-jwt-authentication)一文。

## 常見問題

### 我能在 Client Component 讀取工作階段 Cookie 嗎？

不行——`httpOnly` Cookie 刻意對 JavaScript 隱藏。若 Client Component 需要使用者資料（例如顯示名稱），請從 Server Component 或 Route Handler 取得後以 props 下傳，或在伺服器端填入 context provider。

### `SameSite: 'lax'` 與 `SameSite: 'strict'` 有什麼差別？

`'lax'` 在使用者從外部頁面點連結進入你的網站（例如從郵件點連結）時仍會帶上工作階段 Cookie。`'strict'` 會阻擋所有跨站導覽（含最上層導覽）帶 Cookie，因此從外部連結進站的使用者會看起來像未登入，直到在站內再導覽一次。多數應用用 `'lax'` 在 UX 與防 CSRF 之間較平衡；處理銀行或高權限管理操作時可考慮 `'strict'`。

### 該在 Middleware 還是 Route Handler 設定 Cookie？

你可以在 Middleware 用 `request.cookies` **讀取** Cookie，並在回應上**修改** Cookie（如滑動工作階段範例）。但你**無法**在 Middleware **初次設定**工作階段 Cookie——它執行於 Route Handlers 之前，無法取得已驗證的使用者身分。登入流程應一律經過 Route Handler 或 Server Action。

### 如何在使用者活躍時維持登入，閒置時讓工作階段過期？

採用 Middleware 範例中的滑動視窗：每次請求若帶有有效工作階段權杖，就重設過期時間。將 Cookie 的 `expires` 與 JWT 過期設為同一滑動視窗（例如 7 天）。每天活躍的使用者可一直保持登入；連續 7 天未活動則自動登出。若安全要求更高，可縮短為 15–30 分鐘。
