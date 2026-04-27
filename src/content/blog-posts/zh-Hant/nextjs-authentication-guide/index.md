---
title: "Next.js 驗證：App Router 完整指南（2026）"
excerpt: "App Router 預設把驗證搬到伺服器——但「搬到伺服器」不代表「已經解決」。本篇從選型到第一個受保護的 Server Component，涵蓋完整脈絡，並附可運行的 TypeScript 範例。"
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "Next.js 驗證：App Router 完整指南（2026）"
metaDescription: "2026 年為 Next.js App Router 加入驗證：比較自建、NextAuth 與 Authgear——含通行金鑰、SSO、MFA 與 TypeScript 範例。"
publishedAt: 2026-03-27T15:27:15.707Z
updatedAt: 2026-03-27T15:32:43.121Z
draft: false
faq:
  - q: "Authgear 能用於 Next.js Pages Router 嗎？"
    a: "可以。`@authgear/nextjs` SDK 同時支援 App Router 與 Pages Router。在 Pages Router 會改用 `getServerSideProps` 或 API routes，而非 Server Components，但底層驗證函式用法相同。本篇以 App Router 為主，因為它是 2026 年新專案的建議做法。"
  - q: "`currentUser()` 會回傳什麼？"
    a: "`currentUser()` 會從 Authgear userinfo 端點回傳使用者設定檔（姓名、電子郵件、大頭照、使用者 ID）；若沒有有效工作階段則為 `null`。呼叫前也會在背景靜默重新整理過期的 access token，因此你通常不必手動處理權杖過期。在任何 Server Component、Route Handler 或 Server Action 中，只要要知道「是誰在發請求」即可使用。"
  - q: "通行金鑰與密碼如何並存？"
    a: "Authgear 同時支援兩者。你可在入口網站設定讓使用者把通行金鑰註冊為額外或主要登入方式。已有密碼帳戶的使用者可從個人設定新增通行金鑰——無須重新註冊。若要走完全無密碼，也可要求所有新註冊僅能使用通行金鑰。"
  - q: "Authgear 是否符合 GDPR／SOC 2？"
    a: "是。Authgear 通過 SOC 2 Type II，並符合 GDPR。使用者資料可區域設定落地位置。企業部署另提供地端選項。完整合規文件見 <a href=\"https://www.authgear.com/security\">authgear.com/security</a>。"
  - q: "如何在本地測試驗證？"
    a: "將 `AUTHGEAR_REDIRECT_URI` 設為 `http://localhost:3000/api/auth/callback`，並在 Authgear 入口將同一網址加入允許的重新導向 URI。SDK 在本地開發行為與線上相同——你可使用真實的 Authgear 登入頁，含通行金鑰、社交登入、MFA 等功能測試。"
---

## 導言：Next.js 驗證已經不一樣了

若你上次碰 Next.js 驗證還在 Pages Router 時代，接下來會是明顯升級。App Router 自 Next.js 13 穩定，並在 2026 年成為新專案預設——它**預設把驗證放在伺服器**。這代表不再依賴大量 `getServerSideProps` 樣板、不會先閃出未登入內容，也不用在瀏覽器執行敏感的權杖驗證邏輯。

但「搬到伺服器」**不代表**「已經解決」。2026 年的 Next.js 開發者仍要面對真實取捨：該自建嗎？用 NextAuth（Auth.js v5）？還是採用代管平台？通行金鑰呢？企業 SSO？防詐？Middleware 怎麼接？

本篇一次回答。我們會涵蓋**從選型到第一個受保護的 Server Component** 的完整脈絡，並全程附上可運行的 TypeScript。讀完後，你會對 App Router 驗證有清楚心智模型，並知道如何實際上線。

## 挑選 Next.js 驗證方案時該看什麼

在比較工具前，先定義「好」長什麼樣子。選驗證方案很像為建物選安防：每扇門都要能上鎖（路由保護）、櫃台要能管訪客（工作階段）、要有紀錄可查（稽核），最好還能隨威脅演進更新。

2026 年真正重要的檢查清單如下：

<ul>
  <li><strong>App Router 相容</strong>——與 Server Components、Route Handlers、<code>next/headers</code> 原生協作，不需怪招。</li>
  <li><strong>通行金鑰（Passkeys）</strong>——WebAuthn 通行金鑰是抗釣魚、無密碼的登入未來；若方案今天不支援，日後多半要補洞。</li>
  <li><strong>社交登入（OAuth）</strong>——Google、GitHub、Apple 等已是基本期待。</li>
  <li><strong>SSO／企業登入</strong>——SAML 與 OIDC 串接，讓企業客戶用自家 IdP 登入。</li>
  <li><strong>多因素驗證（MFA）</strong>——TOTP、簡訊 OTP，以及敏感操作時的升級 MFA（step-up）。</li>
  <li><strong>防詐</strong>——機器人偵測、可疑登入警示、驗證端點限流——常要到出事才被想起。</li>
  <li><strong>Edge Runtime 相容</strong>——Middleware 跑在 Edge，權杖驗證也要能在該環境執行。</li>
  <li><strong>TypeScript 優先的 SDK</strong>——型別安全能在上線前攔下許多驗證相關錯誤。</li>
</ul>

接下來比較三種主要做法時，請把這份清單放在心裡。

## 驗證做法：自建 vs NextAuth vs Authgear

Next.js 驗證大致有三條路，各自在控制力、複雜度與涵蓋範圍上取捨不同。

<div class="ag-table-wrap">
    <table class="ag-table">
      <thead>
        <tr>
          <th>做法</th>
          <th>上線前設定時間</th>
          <th>通行金鑰</th>
          <th>SSO（SAML/OIDC）</th>
          <th>防詐</th>
          <th>計價</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>自建（DIY）</strong></td>
          <td>數天～數週</td>
          <td>手動（如 SimpleWebAuthn）</td>
          <td>手動</td>
          <td>自建</td>
          <td>免費（但耗工程時間）</td>
        </tr>
        <tr>
          <td><strong>NextAuth／Auth.js v5</strong></td>
          <td>數小時</td>
          <td>實驗性提供者</td>
          <td>有限</td>
          <td>無內建</td>
          <td>免費（開源）</td>
        </tr>
        <tr>
          <td><strong>Authgear</strong></td>
          <td>數分鐘</td>
          <td>內建、可上正式環境</td>
          <td>完整 SAML + OIDC</td>
          <td>內建（機器人防護、可疑登入）</td>
          <td>免費額度，之後按用量</td>
        </tr>
      </tbody>
    </table></div>

### 自建驗證

從零打造驗證可得到最大控制力。你自己寫密碼雜湊（`bcrypt`）、工作階段儲存（Redis 或資料庫）、JWT 簽署，以及每條 OAuth 流程。你會學到很多——也會花數週在**非核心產品**的工作上。

自建的隱藏成本是**維運**：每多一種登入方式（通行金鑰、魔術連結、TOTP）都是新專案；你自實作裡的每個安全漏洞都得自己修。對多數產品團隊，自建往往是錯的取捨。

### NextAuth／Auth.js v5

Auth.js v5（NextAuth 的後繼）是穩健的開源函式庫，處理 OAuth 提供者、電子郵件／密碼與基本工作階段管理。透過單一 `auth()` 函式與 App Router 整合良好，也原生支援 middleware。

需求成長後限制會浮現：通行金鑰仍偏實驗、SAML SSO 需要大量客製、沒有內建防詐。對簡單的消費型應用很合理；對 B2B SaaS 或有企業需求的產品，很快就會撞到天花板。

### Authgear

[Authgear](https://www.authgear.com) 是驗證平台，透過單一整合提供可上正式環境的身分层——通行金鑰、社交登入、TOTP MFA、SAML SSO 與機器人防護。`@authgear/nextjs` SDK 專為 App Router 打造，可在 Server Components、Route Handlers 與 middleware 使用，無需變通手法。

可把 Authgear 想成：自己拉電與找合格電工並含 24/7 監控的差別。本篇後續程式範例以 Authgear 為主，因為它**開箱即符合**上述檢查清單。

## 設定 `@authgear/nextjs`：快速入門

以下假設你已有 Next.js 15 App Router 專案。若尚無，可執行 `npx create-next-app@latest --typescript`。

### 步驟 1：建立 Authgear 專案

至 [authgear.com](https://www.authgear.com) 註冊並建立新專案。你會取得 **Client ID**、**Client Secret** 與 **Endpoint**（例如 `https://your-app.authgear.cloud`）。在 Authgear 入口將 `http://localhost:3000/api/auth/callback` 設為允許的重新導向 URI。

### 步驟 2：安裝 SDK

```bash
npm install @authgear/nextjs

```

### 步驟 3：加入環境變數

在專案根目錄建立 `.env.local`：

```bash
AUTHGEAR_CLIENT_ID=your_client_id
AUTHGEAR_CLIENT_SECRET=your_client_secret
AUTHGEAR_ENDPOINT=https://your-app.authgear.cloud
AUTHGEAR_REDIRECT_URI=http://localhost:3000/api/auth/callback
SESSION_SECRET=a-long-random-string-at-least-32-chars

```

### 步驟 4：建立設定檔

建立 `src/lib/authgear.ts`，集中 Authgear 設定，供伺服器與客戶端共用：

```typescript
// src/lib/authgear.ts
import type { AuthgearConfig } from "@authgear/nextjs";

export const authgearConfig: AuthgearConfig = {
  endpoint: process.env.AUTHGEAR_ENDPOINT!,
  clientID: process.env.AUTHGEAR_CLIENT_ID!,
  redirectURI: process.env.AUTHGEAR_REDIRECT_URI!,
  sessionSecret: process.env.SESSION_SECRET!,
};

```

### 步驟 5：設定 Auth Route Handler

建立 catch-all API route，處理 OAuth 回呼、登出、工作階段重新整理與 userinfo：

```typescript
// src/app/api/auth/[...authgear]/route.ts
import { createAuthgearHandlers } from "@authgear/nextjs";
import { authgearConfig } from "@/lib/authgear";

export const { GET, POST } = createAuthgearHandlers(authgearConfig);

```

註冊後會自動提供下列路由：

<div class="ag-table-wrap">
    <table class="ag-table">
      <thead>
        <tr>
          <th>方法</th>
          <th>路徑</th>
          <th>用途</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>GET</td>
          <td><code>/api/auth/login</code></td>
          <td>啟動 OAuth 登入流程</td>
        </tr>
        <tr>
          <td>GET</td>
          <td><code>/api/auth/callback</code></td>
          <td>處理 OAuth 回呼並設定工作階段 Cookie</td>
        </tr>
        <tr>
          <td>GET</td>
          <td><code>/api/auth/logout</code></td>
          <td>清除工作階段並撤銷權杖</td>
        </tr>
        <tr>
          <td>POST</td>
          <td><code>/api/auth/refresh</code></td>
          <td>重新整理過期的 access token</td>
        </tr>
        <tr>
          <td>GET</td>
          <td><code>/api/auth/userinfo</code></td>
          <td>回傳目前使用者資訊</td>
        </tr>
      </tbody>
    </table></div>

### 步驟 6：以 AuthgearProvider 包住應用

`AuthgearProvider` 會用到瀏覽器 API，必須是 Client Component。先建立獨立的 providers 檔，再在 Server Component 的 layout 引入：

```typescript
// src/app/providers.tsx
"use client";

import { AuthgearProvider } from "@authgear/nextjs/client";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <AuthgearProvider>{children}</AuthgearProvider>;
}

```

```typescript
// src/app/layout.tsx
import Providers from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

```

**為何要獨立檔案？** 預設 `layout.tsx` 是 Server Component。若直接在裡面加 `"use client"`，會把整個 layout 變成 Client Component——違背 App Router 伺服器優先的設計。像 `providers.tsx` 這種薄包裝可把依賴瀏覽器的程式隔在客戶端。

### 步驟 7：第一個受保護的頁面

以下 Server Component 會將未驗證使用者導走，並向已登入使用者顯示歡迎訊息：

```typescript
// src/app/dashboard/page.tsx
import { currentUser } from "@authgear/nextjs/server";
import { authgearConfig } from "@/lib/authgear";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await currentUser(authgearConfig);

  if (!user) {
    redirect("/api/auth/login");
  }

  return (
    <main>
      <h1>Welcome back, {user.name ?? user.email}!</h1>
      <p>You are signed in as {user.email}.</p>
      <a href="/api/auth/logout">Sign out</a>
    </main>
  );
}

```

無需在客戶端抓權杖、也不用 loading 遮住未登入閃爍——在伺服器確認使用者身分之前，頁面不會完成渲染。

完整設定請見 [Authgear Next.js 快速入門文件](https://docs.authgear.com/get-started/regular-web-app/nextjs)。

## 開箱即用的重點能力

代管驗證平台的一大優勢，是你**不必多寫程式**就能得到的東西。專案接好 Authgear 後，立刻具備：

### 通行金鑰（Passkeys）

通行金鑰以裝置上的密碼學金鑰取代密碼。註冊時，使用者的裝置（手機、筆電、安全金鑰）建立金鑰對；公鑰送到 Authgear，私鑰不離開裝置。登入時裝置以生物辨識（Face ID、指紋、Windows Hello）證明持有私鑰——密碼不會在網路上傳送。

在 Authgear 入口 **Authentication > Passwordless > Passkeys** 即可啟用。不需改 SDK——登入 UI 會自動處理 WebAuthn 儀式。

### 社交登入

Google、Apple、GitHub、Facebook 等在入口以 OAuth 開關即可。使用者會看到標準的「以 Google 繼續」等按鈕，你端無須額外 SDK 工作。

### 企業 SSO

若你做 B2B，企業客戶常需以自家 IdP（Okta、Azure AD、Google Workspace）登入。Authgear 支援 SAML 2.0 與 OIDC 串接，讓各企業租戶連自己的 IdP。你在入口設定；Next.js 端仍透過同一套 `currentUser()` 取得使用者，無論對方以何種方式登入。

### 多因素驗證（MFA）

TOTP（Google Authenticator、Authy）、簡訊 OTP、備援碼皆可開箱使用。可要求全員 MFA，或設定**升級 MFA**——僅在使用者進行敏感操作（如變更付款方式）時要求第二因子。

### 防詐

Authgear 內建登入／註冊表單的機器人防護（可串 CAPTCHA）、帳戶鎖定防暴力嘗試，以及驗證端點限流。在入口設定即可——Next.js 程式通常不必改。

## 伺服器端驗證：Server Components 與 Route Handlers 中的 `currentUser()`

App Router 的伺服器優先模型代表驗證在**渲染時**發生，而不是另開客戶端 effect。`@authgear/nextjs` 在伺服器端的主要入口是 `currentUser()`。

### `currentUser()`——給 Server Component 與 Route Handler

`currentUser()` 讀取工作階段 Cookie，回傳已驗證使用者物件；無工作階段則為 `null`。可用於任何 Server Component（含深層巢狀）與 Route Handler。從 `@authgear/nextjs/server` 匯入並傳入你的設定物件。

```typescript
// Any Server Component
import { currentUser } from "@authgear/nextjs/server";
import { authgearConfig } from "@/lib/authgear";

export default async function ProfileCard() {
  const user = await currentUser(authgearConfig);

  if (!user) {
    return <p>Please <a href="/api/auth/login">sign in</a> to view your profile.</p>;
  }

  return (
    <div>
      <img src={user.picture ?? "/default-avatar.png"} alt={`${user.name}'s avatar`} />
      <p>{user.name}</p>
      <p>{user.email}</p>
    </div>
  );
}

```

### 在 Route Handler 使用 `currentUser()`

保護 API 端點時用法相同：

```typescript
// src/app/api/user/profile/route.ts
import { currentUser } from "@authgear/nextjs/server";
import { authgearConfig } from "@/lib/authgear";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await currentUser(authgearConfig);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ user });
}

```

### 在 Server Action 使用驗證

Server Action（App Router 在伺服器處理變更的機制）也可先呼叫 `currentUser()` 再進行寫入：

```typescript
// src/app/actions/update-profile.ts
"use server";

import { currentUser } from "@authgear/nextjs/server";
import { authgearConfig } from "@/lib/authgear";
import { revalidatePath } from "next/cache";

export async function updateDisplayName(formData: FormData) {
  const user = await currentUser(authgearConfig);

  if (!user) {
    throw new Error("You must be signed in to update your profile.");
  }

  const newName = formData.get("name") as string;

  await fetch("https://api.yourapp.com/profile", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: newName }),
  });

  revalidatePath("/dashboard/profile");
}

```

檔案頂端的 `"use server"` 將模組標記為 Server Action。驗證檢查完全在伺服器執行——權杖不會因此暴露到瀏覽器。

## 以 Middleware 保護路由

若要**整區**把未登入使用者導走，middleware 是正確工具。它在 Edge 於頁面渲染前執行，未驗證使用者根本不會觸發 Server Component 渲染。

細節見姊妹篇 [Next.js Middleware 驗證：在 Edge 保護路由](/zh-Hant/post/nextjs-middleware-authentication)。Middleware API 與 Authgear 設定請參考 [Authgear Next.js 文件](https://docs.authgear.com/get-started/regular-web-app/nextjs)。

重要提醒：middleware 是第一道防線，但**仍應**在 Server Components 與 Route Handlers 再次檢查驗證——多層防禦代表不依賴單一層。

## JWT 處理

使用者登入後，Authgear 會簽發短效 JWT access token。你的 Next.js 應用以該權杖代表使用者呼叫後端 API。SDK 會以存於 `httpOnly` Cookie 的長效 refresh token 自動更新 access token——使用者不必一直被要求重新登入。

重點：

<ul>
    <li>不要把 JWT 放在 <code>localStorage</code>——請用 <code>httpOnly</code> Cookie（<code>@authgear/nextjs</code> 預設如此）。</li>
    <li>在後端以 Authgear 的 JWKS 端點驗證 JWT。未經驗證的權杖不可信任。</li>
    <li>短效 access token + 長效 refresh token 是正確組合——可限制權杖外洩時的暴露窗口。</li>
  </ul>

JWT 驗證、輪替與常見陷阱的完整說明見：[Next.js JWT 驗證：安全地驗證與使用權杖](/zh-Hant/post/nextjs-jwt-authentication)。

## 工作階段管理

工作階段是伺服器對「某瀏覽器已驗證」的紀錄。可想像飯店房卡：卡片（工作階段 Cookie）讓你過門，但飯店系統（工作階段儲存）決定卡片是否仍有效。

在 `@authgear/nextjs` 中，工作階段由平台自動管理：

<ul>
    <li><strong>建立：</strong>登入成功後建立工作階段，以加密的 <code>httpOnly</code> Cookie 儲存。</li>
    <li><strong>驗證：</strong>每次 <code>currentUser()</code> 都會驗證工作階段。若 access token 過期，SDK 會先用 refresh token 靜默更新，再取得 userinfo。</li>
    <li><strong>登出：</strong>前往 <code>/api/auth/logout</code> 會清除工作階段 Cookie，並在 Authgear 端撤銷 refresh token。</li>
  </ul>

工作階段長度、滑動過期、並行工作階段（例如同一使用者同時在筆電與手機登入）等細節，見 [Next.js 工作階段管理：Cookie、JWT 與伺服器端 Session](/zh-Hant/post/nextjs-session-management)。

## 常見問題

### Authgear 能用於 Next.js Pages Router 嗎？

可以。`@authgear/nextjs` SDK 同時支援 App Router 與 Pages Router。在 Pages Router 會改用 `getServerSideProps` 或 API routes，而非 Server Components，但底層驗證函式用法相同。本篇以 App Router 為主，因為它是 2026 年新專案的建議做法。

### `currentUser()` 會回傳什麼？

`currentUser()` 會從 Authgear userinfo 端點回傳使用者設定檔（姓名、電子郵件、大頭照、使用者 ID）；若沒有有效工作階段則為 `null`。呼叫前也會在背景靜默重新整理過期的 access token，因此你通常不必手動處理權杖過期。在任何 Server Component、Route Handler 或 Server Action 中，只要要知道「是誰在發請求」即可使用。

### 通行金鑰與密碼如何並存？

Authgear 同時支援兩者。你可在入口網站設定讓使用者把通行金鑰註冊為額外或主要登入方式。已有密碼帳戶的使用者可從個人設定新增通行金鑰——無須重新註冊。若要走完全無密碼，也可要求所有新註冊僅能使用通行金鑰。

### Authgear 是否符合 GDPR／SOC 2？

是。Authgear 通過 SOC 2 Type II，並符合 GDPR。使用者資料可區域設定落地位置。企業部署另提供地端選項。完整合規文件見 [authgear.com/security](https://www.authgear.com/security)。

### 如何在本地測試驗證？

將 `AUTHGEAR_REDIRECT_URI` 設為 `http://localhost:3000/api/auth/callback`，並在 Authgear 入口將同一網址加入允許的重新導向 URI。SDK 在本地開發行為與線上相同——你可使用真實的 Authgear 登入頁，含通行金鑰、社交登入、MFA 等功能測試。

## 結論

Next.js App Router 的驗證架構確實優於以往：Server Component 在渲染時檢查身分、middleware 在 Edge 守路由、Server Action 讓「已驗證的變更」變得直接。框架扛了重工——主要問題是背後要接哪一套驗證系統。

自建驗證是長期且沉重的投資。NextAuth／Auth.js 能很快做出登入頁，但在企業功能前會先碰到上限。像 Authgear 這類代管平台從第一天就涵蓋通行金鑰、SSO、MFA、防詐等完整清單，且 `@authgear/nextjs` 專為 App Router 設計。

把驗證做對的最佳時機是還沒有使用者之前；次佳時機就是現在。

**準備好為 Next.js 加上驗證了嗎？** [免費註冊 Authgear](https://portal.authgear.com/)，並依 [Next.js 快速入門](https://docs.authgear.com/get-started/regular-web-app/nextjs) 操作，可在 10 分鐘內從零到有受保護的路由。
