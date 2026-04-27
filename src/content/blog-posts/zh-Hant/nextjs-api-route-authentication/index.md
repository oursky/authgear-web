---
title: "Next.js API Route 驗證：如何保護你的端點"
excerpt: "Next.js 的 API route 與頁面保護不同——Route Handler 必須回傳 HTTP 狀態碼，而不是重新導向。本篇涵蓋工作階段 Cookie、Bearer 權杖、RBAC 與 Server Actions，並附完整 TypeScript 範例。"
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "Next.js API Routes：驗證指南與範例"
metaDescription: "學習如何以工作階段 Cookie 與 Bearer 權杖驗證 Next.js Route Handler。含 App Router、RBAC、Server Actions 的 TypeScript 範例。"
publishedAt: 2026-03-25T18:41:16.137Z
updatedAt: 2026-03-25T18:46:20.452Z
draft: false
---

## 為什麼 API Route 驗證與頁面保護不同

保護頁面時，你會檢查使用者工作階段，並把未驗證訪客導向登入畫面。API route 的行為不同。

Route Handler 是**端點**，不是頁面。呼叫方可能是行動 App、`fetch()`，或自動化腳本——它們都**無法**跟著 `302 Found` 重新導向走。因此 Route Handler 必須回傳正確的 HTTP 狀態碼：

<ul>
  <li><strong>401 Unauthorized</strong>——請求沒有有效憑證（缺少權杖、工作階段過期）。</li>
  <li><strong>403 Forbidden</strong>——請求有有效憑證，但使用者沒有執行此動作的權限。</li>
</ul>

這對 API 客戶端很重要：瀏覽器可以跟隨重新導向；行動 SDK 需要明確狀態碼，才知道要提示登入或顯示「存取遭拒」。

還有第二個重點：**光靠 middleware 不夠**。我們會在 [常見錯誤](#常見錯誤) 一節說明。

若你對 Next.js 驗證還不熟，建議先讀 [Next.js 驗證指南](/zh-Hant/post/nextjs-authentication-guide)，再回到本篇看 API 專屬模式。

## App Router Route Handlers：快速複習

Next.js 13 推出 App Router，以 **Route Handlers** 取代 `pages/api/` 目錄。你不再建立 `pages/api/users.ts`，而是建立 `app/api/users/route.ts`。

檔案以具名 HTTP 方法（`GET`、`POST`、`PUT`、`DELETE` 等）匯出，使用標準 Web 的 `Request` 與 `Response` API：

```typescript
// app/api/users/route.ts
export async function GET(request: Request) {
  return Response.json({ message: "Hello from Route Handler" });
}

```

與 `pages/api` 的主要差異：

<ul>
  <li>Route Handlers 使用標準的 <strong><code>Request</code>／<code>Response</code></strong>，而非舊式 Node.js <code>req</code>／<code>res</code>。</li>
  <li>Cookie 與標頭透過 <code>next/headers</code> 的輔助函式存取（見下文）。</li>
  <li>Route Handlers 可放在 <code>app/</code> 下任意位置，不限於 <code>app/api/</code>。</li>
  <li>可選擇 Edge Runtime 或 Node.js runtime。</li>
</ul>

若你正在從 `pages/api` 遷移，邏輯相同——只需調整函式簽章與回應寫法。

## 在 Route Handler 讀取工作階段 Cookie 與 Bearer 權杖

Route Handler 必須從進來的請求讀取憑證。常見有兩種模式。

### 讀取工作階段 Cookie

工作階段 Cookie 像演唱會手環：登入時由伺服器發給瀏覽器，之後每次請求自動帶上。在 Route Handler 使用 Next.js 的 `cookies()`（Next.js 15 起為 async）：

```typescript
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    return Response.json({ error: "Unauthenticated" }, { status: 401 });
  }

  // validate sessionToken with your auth provider...
}

```

### 讀取 Bearer 權杖

機器對機器呼叫——行動 App、其他後端——通常會在 `Authorization` 標頭帶 JWT：

```typescript
export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return Response.json({ error: "Missing or malformed token" }, { status: 401 });
  }

  const token = authHeader.slice(7); // strip "Bearer " prefix
  // validate token with your auth provider...
}

```

該用哪一種？**瀏覽器應用**適合用工作階段 Cookie——由瀏覽器自動送出，避免在客戶端存權杖。**非瀏覽器**的 API 消費者較適合 Bearer。Authgear 兩者皆支援，下文會示範。

## 完整範例：受保護的 Route Handler

以下 `GET` 端點在使用者未驗證時回傳 `401`，已驗證則回傳使用者資料：

```typescript
// app/api/profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

async function getSessionUser(sessionToken: string) {
  // Replace with your real session validation logic:
  // verify a JWT, query a session store, or call your auth provider.
  if (sessionToken === "invalid") return null;

  return { id: "user_123", email: "alice@example.com", role: "user" };
}

export async function GET(request: NextRequest) {
  // 1. Read the session cookie
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("authgear-session")?.value;

  // 2. If no token is present, reject immediately
  if (!sessionToken) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  // 3. Validate the token
  const user = await getSessionUser(sessionToken);

  if (!user) {
    return NextResponse.json(
      { error: "Invalid or expired session" },
      { status: 401 }
    );
  }

  // 4. Return the protected resource
  return NextResponse.json({
    id: user.id,
    email: user.email,
    role: user.role,
  });
}

```

注意兩段分開的 `401` 檢查：一段對應缺少權杖，一段對應無效權杖。這讓 API 客戶端有更清楚的錯誤訊息，又不過度暴露是哪個條件觸發拒絕。

## 在 Route Handlers 使用 Authgear Next.js SDK

若你使用 Authgear，`@authgear/nextjs` 的 `currentUser()` 會代你讀取並驗證工作階段 Cookie——建議用法，可保持程式簡潔並確保工作階段驗證一致。

請先依 [Authgear Next.js 設定指南](https://docs.authgear.com/get-started/regular-web-app/nextjs) 安裝 SDK 並設定專案。完成後，保護 Route Handler 可寫成：

```typescript
// app/api/profile/route.ts
import { NextResponse } from "next/server";
import { currentUser } from "@authgear/nextjs/server";
import { authgearConfig } from "@/lib/authgear";

export async function GET() {
  // currentUser() reads the Authgear session cookie and validates it.
  // It returns null if the user is not authenticated.
  // It also refreshes an expired access token automatically before
  // fetching user info from the Authgear userinfo endpoint.
  const user = await currentUser(authgearConfig);

  if (!user) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  // user.sub is the user's unique ID (subject claim)
  // user.email is the user's email address
  return NextResponse.json({
    userId: user.sub,
    email: user.email,
  });
}

```

`currentUser()` 在 React Server Components、Route Handlers 與 Server Actions 行為一致——整個 Next.js 應用可採同一套模式。

## 以使用者 Claims 實作 RBAC（角色型存取控制）

**驗證**回答「這是誰？」**授權**回答「可以做什麼？」。驗證工作階段後，可從 claims 讀取角色以實作 RBAC。

Authgear 透過 `/claims/user/roles` claim 暴露角色——為 userinfo 回應中的字串陣列。以下為僅限管理員的端點：已登入但非 `admin` 角色則回 `403 Forbidden`：

```typescript
// app/api/admin/users/route.ts
import { NextResponse } from "next/server";
import { currentUser } from "@authgear/nextjs/server";
import { authgearConfig } from "@/lib/authgear";

export async function GET() {
  const user = await currentUser(authgearConfig);

  // Step 1: Check authentication
  if (!user) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  // Step 2: Check authorization
  // Authgear returns roles in the /claims/user/roles claim.
  // Assign roles to users in the Authgear portal under Users > Roles & Groups.
  const roles = user["/claims/user/roles"] as string[] | undefined;

  if (!roles?.includes("admin")) {
    return NextResponse.json(
      { error: "Admin access required" },
      { status: 403 }
    );
  }

  // Step 3: Return admin-only data
  const users = await fetchAllUsers(); // your data layer
  return NextResponse.json({ users });
}

```

兩步模式——先驗證身分、再檢查權限——是有意的：匿名請求沒必要評估角色。

## 保護 Server Actions

Server Actions（`"use server"` 函式）讓你從元件直接呼叫伺服器邏輯。它們看起來像一般 async 函式，但底層仍是 **HTTP 端點**——因此需要與 Route Handler **相同等級**的驗證檢查。

```typescript
// app/actions/update-profile.ts
"use server";

import { currentUser } from "@authgear/nextjs/server";
import { authgearConfig } from "@/lib/authgear";
import { redirect } from "next/navigation";

export async function updateProfile(formData: FormData) {
  // ALWAYS check auth inside the action itself.
  // Never assume the caller is authenticated just because
  // the page that rendered the form checked auth before rendering.
  const user = await currentUser(authgearConfig);

  if (!user) {
    // For Server Actions called from forms, redirecting to login is acceptable.
    // For actions called programmatically, consider throwing an error instead.
    redirect("/login");
  }

  const displayName = formData.get("displayName") as string;

  // Proceed with the update...
  await saveDisplayName(user.sub, displayName);
}

```

驗證檢查必須在 **action 內部**——不能只做在渲染表單的頁面上。因為 Server Actions 是獨立的 HTTP 端點，任何人都能直接呼叫，繞過頁面層的驗證。

## 常見錯誤

### 只依賴 middleware

```typescript
// middleware.ts — a first line of defence, but NOT sufficient on its own
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("authgear-session");
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/api/:path*"],
};

```

**問題：** Middleware 在 Edge 於 Route Handler 之前執行。它能快速擋掉明顯無效的請求——但不能當唯一安全層：

<ul>
  <li>Middleware 設定可能被誤設，導致路由未受保護。</li>
  <li>Edge Runtime 的 middleware 無法使用完整驗證邏輯（無資料庫查詢、密碼學能力有限）。</li>
  <li>若有人因 matcher 設定錯誤而繞過 middleware，Route Handler 內沒有備援檢查。</li>
</ul>

**作法：** 永遠在 Route Handler **內部**再做驗證。把 middleware 當快速第一道防線——但把 handler 層檢查當成**真正的**安全保證。這就是**多層防禦（defence in depth）**。

更深入說明見 [Next.js middleware 驗證指南](/zh-Hant/post/nextjs-middleware-authentication)。

### 其他常見錯誤

<div class="ag-table-wrap">
  <table class="ag-table">
    <thead>
      <tr>
        <th>錯誤</th>
        <th>為何有問題</th>
        <th>修正</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>驗證失敗仍回 200，只在 body 寫錯誤</td>
        <td>API 客戶端若不解析 body 就無法可靠偵測驗證錯誤</td>
        <td>一律使用 401 或 403</td>
      </tr>
      <tr>
        <td>在 Server Actions 略過驗證</td>
        <td>Server Actions 是公開端點；任何人都能直接呼叫</td>
        <td>每個非公開 action 頂端都加 <code>currentUser()</code> 檢查</td>
      </tr>
      <tr>
        <td>把權杖存在 <code>localStorage</code></td>
        <td>易受 XSS 攻擊</td>
        <td>工作階段權杖請用 <code>HttpOnly</code> Cookie</td>
      </tr>
      <tr>
        <td>驗證通過後未檢查過期</td>
        <td>過期工作階段仍可能通過基本簽章檢查</td>
        <td>使用會自動驗證過期的函式庫或 SDK</td>
      </tr>
    </tbody>
  </table></div>

## FAQ

### Next.js API route 中 401 與 403 差在哪？

**401 Unauthorized** 表示請求沒有有效身分——Cookie 缺失、權杖沒帶、或權杖無效／過期。客戶端應提示登入。**403 Forbidden** 表示身分有效，但**沒有權限**執行此動作。客戶端應顯示「存取遭拒」，而非登入畫面。正確狀態碼讓 API 客戶端不必解析錯誤 body 也能正確反應。

### `currentUser()` 能同時用在 Route Handler 與 Server Component 嗎？

可以——這正是 Authgear Next.js SDK 的優點之一。`@authgear/nextjs/server` 的 `currentUser()` 在 Route Handlers、Server Components 與 Server Actions 行為一致，以相同邏輯讀取並驗證工作階段 Cookie，不必為不同層寫不同驗證碼。

### 每個 Route Handler 都要驗證，還是只有敏感端點？

最安全的預設是：**每個** Route Handler 都要求驗證，只有刻意公開的端點才標註例外。這種「預設安全、公開才 opt-out」可確保新加的端點不會不小心漏保護。對於本來就該公開的端點——例如健康檢查、webhook——請加註解說明為何不需驗證。

### 如何保護 Route Handler 免受跨來源請求？

Next.js 不會自動為 Route Handlers 加上 CORS 標頭。若端點只應被你自己的前端呼叫，請檢查 `Origin` 標頭並拒絕不符合網域的請求。若需要接受跨來源，請在 `Response` 明確設定 CORS。注意：Server Actions 內建以 Origin／Host 比對防 CSRF——Route Handlers **沒有**這項自動保護。
