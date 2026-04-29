---
title: "Supabase Auth 與 Authgear 在 Next.js：該選哪一個？"
excerpt: "Supabase Auth 與 Authgear 都能用於 Next.js App Router 正式環境，但兩者對驗證的設計哲學截然不同。本篇提供務實、平衡的對照、功能表、雙邊設定程式範例，以及何時該選哪一家的決策指引。"
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "Supabase Auth 與 Authgear 在 Next.js（2026 指南）"
metaDescription: "為 Next.js 應用比較 Supabase Auth 與 Authgear：並排功能表、程式範例，以及如何選擇合適驗證方案的實用指南。"
publishedAt: 2026-03-27T15:30:07.472Z
updatedAt: 2026-03-30T16:58:12.782Z
draft: false
faq:
  - q: "可以把 Authgear 和 Supabase 資料庫一起用嗎？"
    a: "可以。Authgear 與 Supabase 並非二選一。你可以用 Authgear 作身分提供者、Supabase 作資料庫。Authgear 簽發標準 JWT，你可在 API route 先驗證再查詢 Supabase。Authgear 也提供<a href=\"/zh-hant/post/supabase-any-auth-provider\" target=\"_blank\" rel=\"noopener\">將 Supabase 與任何驗證提供者串接</a>的指南，包含如何從外部 JWT 產生相容 Supabase 的權杖以搭配 RLS。"
  - q: "Supabase Auth 支援 Next.js App Router 嗎？"
    a: "支援。`@supabase/ssr` 完整支援 Next.js App Router，含 Server Components、Route Handlers 與 middleware。舊套件 `@supabase/auth-helpers-nextjs` 已棄用——新專案請使用 `@supabase/ssr`。"
  - q: "Authgear 的 Next.js SDK 能上正式環境嗎？"
    a: "可以。`@authgear/nextjs` 原生支援 App Router，含伺服器端以 `currentUser()` 取得使用者、用於驗證回呼的 catch-all route handler，以及客戶端 Provider 元件。設定步驟與範例程式見<a href=\"https://docs.authgear.com/get-started/regular-web-app/nextjs\" target=\"_blank\" rel=\"noopener\">官方 Authgear Next.js 快速入門</a>。"
---

## 2026 年 Next.js 驗證的兩個熱門選項

若你正在開發 Next.js 並研究驗證，很可能會遇到兩條截然不同的路：**Supabase Auth** 與 **Authgear**。兩者皆可用於正式環境、皆與 Next.js App Router 相容，也都有免費方案。但它們對「驗證」的取徑根本不同——而這會依你的技術堆疊大幅影響取捨。

本篇是給開發者在 **Next.js** 專案中，於 **Supabase Auth** 與 **Authgear** 之間做選擇的務實、平衡比較。不預設誰贏——正解取決於你在做什麼。若想先看 Next.js 驗證的全景，可讀我們的 [Next.js 驗證指南](/zh-hant/post/nextjs-authentication-guide)，再回來看這篇專題比較。

## 快速概覽

### Supabase Auth 是什麼？

Supabase 是開源的 Firebase 替代方案，將託管 Postgres、即時訂閱、檔案儲存與驗證包在同一平台。**Supabase Auth 就是內建於該平台的驗證層。** 它不是獨立產品——設計上與 Supabase 的 Postgres 透過 Row Level Security（RLS）政策協同運作。

若你本來就用 Supabase 當資料庫，驗證幾乎是「附贈」的。使用者表在你的 Postgres 裡，你可以直接在 SQL 用 `auth.uid()` 撰寫 RLS，逐使用者控管資料存取。

### Authgear 是什麼？

Authgear 是專注的客戶身分與存取管理（CIAM）平台。它只做一件事——驗證與身分管理——但做得很深。可把它想成「專家」而非「通才」：不包含資料庫或檔案儲存，但內建的驗證功能比多數「順便附的」方案更完整。

Authgear 建於開放標準（OpenID Connect、OAuth 2.0、SAML），內建可自訂的登入 UI，並內建 SAML SSO、通行金鑰（passkeys）、防詐與多租戶 B2B 等企業功能。`@authgear/nextjs` SDK 是針對 Next.js App Router 打造。

## 功能對照

<div class='ag-table-wrap'>
    <table class='ag-table'>
      <thead>
        <tr>
          <th>功能</th>
          <th>Supabase Auth</th>
          <th>Authgear</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>通行金鑰（WebAuthn）</td>
          <td>不支援（截至 2026 年 3 月）</td>
          <td>支援——專用通行金鑰流程與裝置同步</td>
        </tr>
        <tr>
          <td>社交登入（Google、GitHub 等）</td>
          <td>有——20+ OAuth 提供者</td>
          <td>有——10+ OAuth 提供者</td>
        </tr>
        <tr>
          <td>SSO（SAML 2.0 / OIDC）</td>
          <td>SAML 2.0 需 Pro 以上方案</td>
          <td>SAML 2.0 + OIDC 全方案皆含（含免費）；代管企業 IdP 連線</td>
        </tr>
        <tr>
          <td>MFA / TOTP</td>
          <td>全方案免費含 TOTP；簡訊 OTP MFA 需付費方案</td>
          <td>TOTP、簡訊 OTP、WhatsApp OTP——皆含在內</td>
        </tr>
        <tr>
          <td>防詐／濫用防護</td>
          <td>非內建</td>
          <td>機器人防護、暴力嘗試鎖定、異常偵測</td>
        </tr>
        <tr>
          <td>Webhooks</td>
          <td>資料庫 webhooks（經 pg_net）；驗證事件較有限</td>
          <td>專用驗證事件 webhooks（登入、註冊、變更密碼等）</td>
        </tr>
        <tr>
          <td>自架</td>
          <td>可——開源、Docker</td>
          <td>可——開源、Docker</td>
        </tr>
        <tr>
          <td>多租戶 / B2B</td>
          <td>無內建組織模型</td>
          <td>內建 B2B 多租戶入口與角色模型</td>
        </tr>
        <tr>
          <td>計價模式</td>
          <td>免費：5 萬 MAU。Pro：$25/月起含 10 萬 MAU，超出按量計費</td>
          <td>免費：MAU 無上限。付費方案 $50/月起；純驗證計價</td>
        </tr>
        <tr>
          <td>Next.js App Router 支援</td>
          <td>有——透過 <code>@supabase/ssr</code></td>
          <td>有——原生 <code>@authgear/nextjs</code> SDK</td>
        </tr>
      </tbody>
    </table></div>

## 設定方式比較

### Next.js 中的 Supabase Auth

Supabase 以 `@supabase/ssr` 在 Server Components 與 middleware 處理 cookie 工作階段。你會建立兩種 client——瀏覽器與伺服器各一——並加上 middleware 以重新整理權杖。

**1. 安裝套件**

```
npm install @supabase/supabase-js @supabase/ssr

```

**2. 在 `.env.local` 加入環境變數：**

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key

```

**3. 建立伺服器端 client 工具**（`src/lib/supabase/server.ts`）：

```
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Components 可忽略；由 middleware 負責 refresh
          }
        },
      },
    }
  );
}

```

**4. 在伺服器端保護路由**時請使用 `getClaims()`——不要用 `getSession()`。`getClaims()` 每次呼叫都會依專案公開金鑰驗證 JWT 簽章。`getSession()` 不會重新驗證權杖，**不可**用於伺服器端的存取控管。

```typescript
// src/app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (!data.claims) {
    redirect("/login");
  }

  return <div>Welcome, {data.claims.sub}</div>;
}
```

你也需要 middleware 在每次請求時重新整理過期權杖——完整範例見 <a href="https://supabase.com/docs/guides/auth/server-side/nextjs" target="_blank" rel="noopener">Supabase Next.js 伺服器端驗證文件</a>。

### Next.js 中的 Authgear

Authgear 提供專用的 `@authgear/nextjs` SDK，對 App Router 為一等公民。設定採 catch-all route handler——登入、登出、權杖更新等回呼都走同一個 API route，並以 `currentUser()` 在伺服器端保護頁面。

**1. 安裝套件**

```
npm install @authgear/nextjs

```

**2. 在 `.env.local` 加入環境變數：**

```
AUTHGEAR_ENDPOINT=https://your-project.authgear.cloud
AUTHGEAR_CLIENT_ID=your-client-id
AUTHGEAR_REDIRECT_URI=http://localhost:3000/api/auth/callback
SESSION_SECRET=a-random-string-of-at-least-32-characters

```

**3. 建立共用設定**（`src/lib/authgear.ts`）：

```
import type { AuthgearConfig } from "@authgear/nextjs";

export const authgearConfig: AuthgearConfig = {
  endpoint: process.env.AUTHGEAR_ENDPOINT!,
  clientID: process.env.AUTHGEAR_CLIENT_ID!,
  redirectURI: process.env.AUTHGEAR_REDIRECT_URI!,
  sessionSecret: process.env.SESSION_SECRET!,
};

```

**4. 註冊 catch-all route handler**（`src/app/api/auth/[...authgear]/route.ts`）：

```
import { createAuthgearHandlers } from "@authgear/nextjs";
import { authgearConfig } from "@/lib/authgear";

export const { GET, POST } = createAuthgearHandlers(authgearConfig);

```

**5. 以 `currentUser()` 保護路由：**

```typescript
// src/app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { currentUser } from "@authgear/nextjs/server";
import { authgearConfig } from "@/lib/authgear";

export default async function DashboardPage() {
  const user = await currentUser(authgearConfig);

  if (!user) {
    redirect("/api/auth/login");
  }

  return <div>Welcome, {user.sub}</div>;
}
```

逐步說明見 <a href="https://docs.authgear.com/get-started/regular-web-app/nextjs" target="_blank" rel="noopener">Authgear Next.js 快速入門</a>。

### 設定上的主要差異

兩邊在「基本受保護路由」的複雜度相近。實務差異在於：

<ul>
  <li><strong>Supabase 需要兩套 client 工具</strong>（瀏覽器與伺服器）外加 middleware。Authgear 只需一個設定物件與一個 route handler。</li>
  <li><strong>Supabase 工作階段在你的 Postgres 裡。</strong> Authgear 工作階段由 Authgear 雲端服務管理，每次請求在伺服器端驗證。</li>
  <li><strong>Supabase 的安全模型中心是資料庫。</strong> 以 SQL 的 RLS 控制每位使用者能存取什麼。Authgear 的安全模型在資料庫之外——你檢查 <code>currentUser()</code> 並在應用邏輯強制存取規則。</li>
</ul>

## 何時選 Supabase Auth

適合在以下情況選 Supabase Auth：

<ul>
  <li><strong>你已經用 Supabase 當資料庫。</strong> 若驗證已含在現有方案中，不必再掛一套身分服務。與 RLS 的整合非常實在——能在 SQL 寫 <code>WHERE user_id = auth.uid()</code> 既強大又乾淨。</li>
  <li><strong>你做的是中小型專案</strong>，不需要進階企業功能。免費層（5 萬 MAU）多數獨立開發與新創情境已夠用。</li>
  <li><strong>你想要與 Postgres 緊密整合。</strong> Supabase 的驗證與資料庫功能深度綁定。若存取邏輯主要放在資料庫層，Supabase 很自然。</li>
  <li><strong>你重視開源、可自架堆疊。</strong> Supabase 端到端開源；若需要資料主權又不想自建整套驗證，整平台可自架。</li>
  <li><strong>你不需要通行金鑰、進階企業 SSO 或內建防詐</strong>——或願意在需求成長時另外補上。</li>
</ul>

## 何時選 Authgear

以下情況 Authgear 較有優勢：

<ul>
  <li><strong>驗證是你產品最難的一塊。</strong> 若你在做 B2B SaaS、金融科技或任何把身分與存取當核心能力的產品，專用 CIAM 能扛複雜度，讓團隊不必自己造輪子。</li>
  <li><strong>你需要企業 SSO。</strong> Authgear 在全方案（含免費）即支援 SAML 2.0 與 OIDC，並含代管 IdP 連線。Supabase 的 SAML 需 Pro 以上。</li>
  <li><strong>通行金鑰是優先需求。</strong> Authgear 支援專用流程、裝置同步、備援驗證方式與終端使用者帳戶入口。Supabase Auth 目前不支援通行金鑰。</li>
  <li><strong>你要開箱即用的防詐。</strong> Authgear 含機器人防護、暴力嘗試鎖定與異常偵測；用 Supabase 則需自建或另接服務。</li>
  <li><strong>你在做多租戶 B2B。</strong> Authgear 內建組織與角色模型；Supabase 沒有原生「組織」概念——需在資料庫自行建模。</li>
  <li><strong>你沒有用 Supabase 資料庫。</strong> 若你用 PlanetScale、Neon 或其他 Postgres，Supabase Auth 的綑綁效益較低；像 Authgear 這類專用驗證平台彈性較大。</li>
  <li><strong>你需要細緻的驗證事件 webhooks。</strong> Authgear 可對登入、登出、註冊、變更密碼等事件發送 webhook；Supabase 的 webhook 偏資料庫層，而非驗證事件層級。</li>
</ul>

## 結論

沒有放諸四海皆準的贏家——Supabase Auth 與 Authgear 都是紮實方案，能可靠支撐多數 Next.js 應用的驗證。

最簡單的決策句：**你在用 Supabase 嗎？** 若是，請用 Supabase Auth。資料庫整合、RLS 與一站式計價，對已在 Supabase 生態的專案幾乎是不假思索的選擇。

若你不在 Supabase 上，或需要通行金鑰、企業 SSO、防詐或多租戶 B2B，Authgear 的「專注」會帶來回報——整個團隊聚焦在身分，功能廣度往往不需額外堆設定即可取得。

兩者皆可開源自架，若你需要完整掌控基礎設施。<a href="https://portal.authgear.com/" target="_blank" rel="noopener">Authgear 免費方案沒有 MAU 上限</a>——可先註冊試用，再決定是否升級付費。

## 常見問題

### 可以把 Authgear 和 Supabase 資料庫一起用嗎？

可以。Authgear 與 Supabase 並非二選一。你可以用 Authgear 作身分提供者、Supabase 作資料庫。Authgear 簽發標準 JWT，你可在 API route 先驗證再查詢 Supabase。Authgear 也提供<a href="/zh-hant/post/supabase-any-auth-provider" target="_blank" rel="noopener">將 Supabase 與任何驗證提供者串接</a>的指南，包含如何從外部 JWT 產生相容 Supabase 的權杖以搭配 RLS。

### Supabase Auth 支援 Next.js App Router 嗎？

支援。`@supabase/ssr` 完整支援 Next.js App Router，含 Server Components、Route Handlers 與 middleware。舊套件 `@supabase/auth-helpers-nextjs` 已棄用——新專案請使用 `@supabase/ssr`。

### Authgear 的 Next.js SDK 能上正式環境嗎？

可以。`@authgear/nextjs` 原生支援 App Router，含伺服器端以 `currentUser()` 取得使用者、用於驗證回呼的 catch-all route handler，以及客戶端 Provider 元件。設定步驟與範例程式見<a href="https://docs.authgear.com/get-started/regular-web-app/nextjs" target="_blank" rel="noopener">官方 Authgear Next.js 快速入門</a>。
