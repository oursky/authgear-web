---
title: "Next.js Authentication: Complete Guide for App Router (2026)"
excerpt: "The App Router moves authentication to the server by default — but \"moved to the server\" doesn't mean \"solved.\" This guide covers the full picture, from picking the right approach to writing your first protected Server Component, with working TypeScript code throughout."
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "Next.js Auth: Complete Guide for App Router (2026)"
metaDescription: "Add authentication to your Next.js App Router app in 2026. Compare DIY, NextAuth, and Authgear — with passkeys, SSO, MFA, and working TypeScript code."
publishedAt: 2026-03-30T17:47:49.619Z
updatedAt: 2026-03-27T15:32:43.121Z
draft: false
faq:
  - q: "Can I use Authgear with the Next.js Pages Router?"
    a: "Yes. The `@authgear/nextjs` SDK supports both App Router and Pages Router. For the Pages Router, you'll use `getServerSideProps` or API routes instead of Server Components, but the underlying auth functions work the same way. This guide focuses on the App Router because it's the recommended approach for new projects in 2026."
  - q: "What does `currentUser()` return?"
    a: "`currentUser()` returns the user's profile (name, email, picture, user ID) from the Authgear userinfo endpoint, or `null` if there is no active session. It also silently refreshes an expired access token before making the call, so you don't need to handle token expiry manually. Use it in any Server Component, Route Handler, or Server Action wherever you need to know who is making the request."
  - q: "How do passkeys work alongside passwords?"
    a: "Authgear supports both simultaneously. You can configure your portal to allow users to register a passkey as an additional or primary login method. Users with an existing password account can add a passkey from their profile settings — no re-registration required. You can also require passkeys for all new sign-ups if you want to go fully passwordless."
  - q: "Is Authgear GDPR / SOC 2 compliant?"
    a: "Yes. Authgear is SOC 2 Type II certified and GDPR compliant. User data residency can be configured by region. For enterprise deployments, Authgear also offers an on-premises option. See [authgear.com/security](/security) for the full compliance documentation."
  - q: "How do I test authentication locally?"
    a: "Set `AUTHGEAR_REDIRECT_URI` to `http://localhost:3000/api/auth/callback` and add that same URL as an allowed redirect URI in the Authgear portal. The SDK works identically in local development — you'll get a real Authgear login page with all the same features (passkeys, social login, MFA) available for testing."
---

## Introduction: Authentication in Next.js Has Changed

If you haven't touched Next.js authentication since the Pages Router era, prepare for a significant upgrade. The App Router — stable since Next.js 13 and the default for new projects in 2026 — moves authentication to the server by default. That means no more `getServerSideProps` boilerplate, no flash of unauthenticated content, and no sensitive token-verification logic running in the browser.

But "moved to the server" doesn't mean "solved." In 2026, Next.js developers still face real questions: Should I roll my own auth? Use NextAuth (Auth.js v5)? Reach for a managed platform? What about passkeys? Enterprise SSO? Fraud protection? How does middleware fit in?

This guide answers all of those questions. We'll cover the full picture — from picking the right approach to writing your first protected Server Component — with working TypeScript code throughout. By the end, you'll have a clear mental model of authentication in the Next.js App Router and a practical path to shipping it.

## What to Look for in a Next.js Auth Solution

Before comparing tools, it helps to define what "good" looks like. Think of choosing an auth solution like choosing a security system for a building: you need locks on every door (route protection), a front desk (session management), a visitor log (audit trail), and ideally a system that updates itself when new threats emerge.

Here's the checklist that matters in 2026:

<ul>
  <li><strong>App Router compatibility</strong> — Works natively with Server Components, Route Handlers, and <code>next/headers</code>. No workarounds needed.</li>
  <li><strong>Passkeys support</strong> — Passkeys (WebAuthn) are the phishing-resistant, passwordless future of login. If your auth solution doesn't support them today, you'll be retrofitting later.</li>
  <li><strong>Social login (OAuth)</strong> — Google, GitHub, and Apple sign-in are table stakes. Users expect them.</li>
  <li><strong>SSO / enterprise login</strong> — SAML and OIDC federation for enterprise customers who need to log in with their company identity provider.</li>
  <li><strong>Multi-factor authentication (MFA)</strong> — TOTP apps, SMS OTP, and ideally step-up MFA for sensitive actions.</li>
  <li><strong>Fraud protection</strong> — Bot detection, suspicious login alerts, and rate limiting on auth endpoints. Often overlooked until an attack happens.</li>
  <li><strong>Edge runtime compatibility</strong> — Middleware runs on the Edge. Your auth token verification needs to run there too.</li>
  <li><strong>TypeScript-first SDK</strong> — Type safety catches auth bugs before they reach production.</li>
</ul>

Keep this list in mind as we look at the three main approaches.

## Authentication Approaches: DIY vs NextAuth vs Authgear

There are three broad approaches to authentication in Next.js. Each trades off control, complexity, and coverage differently.

<div class="ag-table-wrap">
    <table class="ag-table">
      <thead>
        <tr>
          <th>Approach</th>
          <th>Setup time</th>
          <th>Passkeys</th>
          <th>SSO (SAML/OIDC)</th>
          <th>Fraud protection</th>
          <th>Pricing</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>DIY (custom)</strong></td>
          <td>Days–weeks</td>
          <td>Manual (SimpleWebAuthn)</td>
          <td>Manual</td>
          <td>DIY</td>
          <td>Free (but your engineering time)</td>
        </tr>
        <tr>
          <td><strong>NextAuth / Auth.js v5</strong></td>
          <td>Hours</td>
          <td>Experimental provider</td>
          <td>Limited</td>
          <td>None built-in</td>
          <td>Free (OSS)</td>
        </tr>
        <tr>
          <td><strong>Authgear</strong></td>
          <td>Minutes</td>
          <td>Built-in, production-ready</td>
          <td>Full SAML + OIDC</td>
          <td>Built-in (bot protection, suspicious logins)</td>
          <td>Free tier, then usage-based</td>
        </tr>
      </tbody>
    </table></div>

### DIY Authentication

Building auth from scratch gives you maximum control. You write the password hashing (`bcrypt`), the session store (Redis or a database), the JWT signing, and every OAuth flow yourself. You'll learn a lot — and you'll also spend weeks on work that isn't your core product.

The hidden cost of DIY is maintenance. Every new auth method (passkeys, magic links, TOTP) is a fresh project. Every security vulnerability in your custom implementation is yours to patch. For most product teams, DIY is the wrong tradeoff.

### NextAuth / Auth.js v5

Auth.js v5 (the successor to NextAuth) is a solid open-source library that handles OAuth providers, email/password, and basic session management. It integrates well with the App Router via a single `auth()` function and supports middleware natively.

Its limitations show as your needs grow: passkeys support is still experimental, SAML SSO requires significant custom work, and there's no built-in fraud protection. For a simple consumer app, it's a sensible choice. For a B2B SaaS or any product with enterprise requirements, you'll hit its ceiling quickly.

### Authgear

[Authgear]() is an authentication platform that provides a production-ready identity layer — passkeys, social login, TOTP MFA, SAML SSO, and bot protection — through a single integration. The `@authgear/nextjs` SDK is built specifically for the App Router and works in Server Components, Route Handlers, and middleware without any hacks.

Think of Authgear as the difference between wiring your own electrical system versus calling a licensed electrician who also monitors your circuit breakers 24/7. The rest of this guide uses Authgear for code examples because it covers the full checklist out of the box.

## Setting Up `@authgear/nextjs`: Quick Start

Let's get Authgear running in a Next.js 15 App Router project. This assumes you already have a Next.js app. If not, run `npx create-next-app@latest --typescript`.

### Step 1: Create an Authgear Project

Sign up at [authgear.com]() and create a new project. You'll get a **Client ID**, **Client Secret**, and an **Endpoint** (e.g., `https://your-app.authgear.cloud`). In the Authgear portal, add `http://localhost:3000/api/auth/callback` as an allowed redirect URI.

### Step 2: Install the SDK

```bash
npm install @authgear/nextjs

```

### Step 3: Add Environment Variables

Create a `.env.local` file in your project root:

```bash
AUTHGEAR_CLIENT_ID=your_client_id
AUTHGEAR_CLIENT_SECRET=your_client_secret
AUTHGEAR_ENDPOINT=https://your-app.authgear.cloud
AUTHGEAR_REDIRECT_URI=http://localhost:3000/api/auth/callback
SESSION_SECRET=a-long-random-string-at-least-32-chars

```

### Step 4: Create the Config File

Create `src/lib/authgear.ts`. This file holds your Authgear configuration and is shared by server-side and client-side code:

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

### Step 5: Set Up the Auth Route Handler

Create the catch-all API route that handles the OAuth callback, logout, session refresh, and userinfo:

```typescript
// src/app/api/auth/[...authgear]/route.ts
import { createAuthgearHandlers } from "@authgear/nextjs";
import { authgearConfig } from "@/lib/authgear";

export const { GET, POST } = createAuthgearHandlers(authgearConfig);

```

This registers the following routes automatically:

<div class="ag-table-wrap">
    <table class="ag-table">
      <thead>
        <tr>
          <th>Method</th>
          <th>Path</th>
          <th>What it does</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>GET</td>
          <td><code>/api/auth/login</code></td>
          <td>Starts the OAuth login flow</td>
        </tr>
        <tr>
          <td>GET</td>
          <td><code>/api/auth/callback</code></td>
          <td>Handles the OAuth callback and sets the session cookie</td>
        </tr>
        <tr>
          <td>GET</td>
          <td><code>/api/auth/logout</code></td>
          <td>Clears the session and revokes tokens</td>
        </tr>
        <tr>
          <td>POST</td>
          <td><code>/api/auth/refresh</code></td>
          <td>Refreshes an expired access token</td>
        </tr>
        <tr>
          <td>GET</td>
          <td><code>/api/auth/userinfo</code></td>
          <td>Returns the current user's info</td>
        </tr>
      </tbody>
    </table></div>

### Step 6: Wrap Your App with AuthgearProvider

Because `AuthgearProvider` uses browser APIs, it must be a Client Component. Create a dedicated providers file first, then import it into your Server Component layout:

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

**Why the separate file?** `layout.tsx` is a Server Component by default. You cannot use `"use client"` directly in it without converting the entire layout to a Client Component — which defeats the purpose of the App Router's server-first model. A thin wrapper component like `providers.tsx` keeps only the browser-dependent code on the client.

### Step 7: Your First Protected Page

Here's a Server Component that redirects unauthenticated users and shows a welcome message to authenticated ones:

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

No client-side token fetching, no loading spinners hiding unauthenticated flashes — the page simply doesn't render until the server has confirmed who the user is.

For the full setup reference, see the [Authgear Next.js quickstart documentation](https://docs.authgear.com/get-started/regular-web-app/nextjs).

## Key Capabilities Out of the Box

One of the biggest advantages of a managed auth platform is what you get *without* writing extra code. Here's what Authgear enables as soon as your project is set up.

### Passkeys

Passkeys replace passwords with cryptographic keys stored on the user's device. When a user registers, their device (phone, laptop, security key) creates a key pair. The public key goes to Authgear's servers; the private key never leaves the device. To sign in, the device proves it holds the private key using biometrics (Face ID, fingerprint, Windows Hello) — no password ever travels over the network.

In Authgear, passkeys are enabled in the portal under **Authentication > Passwordless > Passkeys**. No SDK changes required — the Authgear login UI handles the WebAuthn ceremony automatically.

### Social Login

Google, Apple, GitHub, Facebook, and more are available as toggle-on OAuth providers in the Authgear portal. Users see a standard "Continue with Google" button without any extra SDK work on your end.

### SSO for Enterprise

If you're building a B2B product, enterprise customers need to log in with their own identity providers (Okta, Azure AD, Google Workspace). Authgear supports SAML 2.0 and OIDC federation, letting each enterprise tenant connect their own IdP. You configure this in the portal; your Next.js app sees the same `currentUser()` interface regardless of how the user authenticated.

### Multi-Factor Authentication (MFA)

TOTP (Google Authenticator, Authy), SMS OTP, and backup codes are available out of the box. You can require MFA for all users or configure step-up MFA — prompting for a second factor only when a user attempts a sensitive action like changing their payment method.

### Fraud Protection

Authgear includes bot protection (CAPTCHA integration) on login and registration forms, brute-force protection via account lockout, and rate limiting on auth endpoints. These are configured in the portal — no code changes needed in your Next.js app.

## Server-Side Auth: `currentUser()` in Server Components and Route Handlers

The App Router's server-first model means authentication happens at render time, not in a separate client-side effect. The `@authgear/nextjs` SDK's primary server-side function is `currentUser()`.

### `currentUser()` — for Server Components and Route Handlers

`currentUser()` reads the session cookie and returns the authenticated user object, or `null` if no session exists. It works in any Server Component (including nested ones deep in your component tree) and in Route Handlers. Import it from `@authgear/nextjs/server` and pass your config object.

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

### Using `currentUser()` in Route Handlers

The same function works in Route Handlers when you need to protect an API endpoint:

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

### Using Auth in Server Actions

Server Actions (the App Router's mechanism for handling mutations entirely on the server) can also call `currentUser()` to verify identity before any write operation:

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

The `"use server"` directive at the top marks the file as a Server Action module. The auth check happens entirely on the server — no token ever reaches the browser.

## Protecting Routes with Middleware

For blanket route protection — redirecting all unauthenticated users away from a section of your app — middleware is the right tool. It runs on the Edge before the page renders, so unauthenticated users never trigger a Server Component render.

Middleware is covered in depth in our companion article [Next.js Middleware Authentication: Protecting Routes at the Edge](/post/nextjs-middleware-authentication). For setup details and the full middleware API, refer to the [Authgear Next.js documentation](https://docs.authgear.com/get-started/regular-web-app/nextjs).

One important note: middleware is your first line of defence, but you should *also* check authentication inside your Server Components and Route Handlers. Defence in depth means not relying on a single layer.

## JWT Handling

When a user signs in, Authgear issues a short-lived JWT access token. Your Next.js app uses this token to call your backend APIs on the user's behalf. The SDK automatically refreshes the token using a longer-lived refresh token stored in an `httpOnly` cookie — so your users stay logged in without being prompted repeatedly.

Key points:

<ul>
    <li>Never store JWTs in <code>localStorage</code> — use <code>httpOnly</code> cookies (which <code>@authgear/nextjs</code> does by default).</li>
    <li>Verify JWTs on your backend using Authgear's JWKS endpoint. Do not trust tokens that arrive without verification.</li>
    <li>Short-lived access tokens paired with long-lived refresh tokens is the correct pattern — it limits exposure if a token is ever leaked.</li>
  </ul>

For a full walkthrough of JWT verification, rotation, and common pitfalls, see our dedicated article: [Next.js JWT Authentication: Verifying and Using Tokens Securely](/post/nextjs-jwt-authentication).

## Session Management

A session is the server's record that a specific browser is authenticated. Think of it like a hotel key card: the card (session cookie) gets you through the door, but the hotel's system (session store) decides whether the card is still valid.

In `@authgear/nextjs`, sessions are managed automatically:

<ul>
    <li><strong>Creation:</strong> A session is created after a successful login and stored as an encrypted <code>httpOnly</code> cookie.</li>
    <li><strong>Validation:</strong> Every call to <code>currentUser()</code> validates the session. If the access token is expired, the SDK silently refreshes it using the refresh token before fetching user info.</li>
    <li><strong>Logout:</strong> Navigating to <code>/api/auth/logout</code> clears the session cookie and revokes the refresh token at Authgear.</li>
  </ul>

For details on configuring session duration, sliding sessions, and handling concurrent sessions (e.g., a user signed in on both laptop and phone), see [Next.js Session Management: Complete Guide for App Router](/post/nextjs-session-management).

## Frequently Asked Questions

### Can I use Authgear with the Next.js Pages Router?

Yes. The `@authgear/nextjs` SDK supports both App Router and Pages Router. For the Pages Router, you'll use `getServerSideProps` or API routes instead of Server Components, but the underlying auth functions work the same way. This guide focuses on the App Router because it's the recommended approach for new projects in 2026.

### What does `currentUser()` return?

`currentUser()` returns the user's profile (name, email, picture, user ID) from the Authgear userinfo endpoint, or `null` if there is no active session. It also silently refreshes an expired access token before making the call, so you don't need to handle token expiry manually. Use it in any Server Component, Route Handler, or Server Action wherever you need to know who is making the request.

### How do passkeys work alongside passwords?

Authgear supports both simultaneously. You can configure your portal to allow users to register a passkey as an additional or primary login method. Users with an existing password account can add a passkey from their profile settings — no re-registration required. You can also require passkeys for all new sign-ups if you want to go fully passwordless.

### Is Authgear GDPR / SOC 2 compliant?

Yes. Authgear is SOC 2 Type II certified and GDPR compliant. User data residency can be configured by region. For enterprise deployments, Authgear also offers an on-premises option. See [authgear.com/security](/security) for the full compliance documentation.

### How do I test authentication locally?

Set `AUTHGEAR_REDIRECT_URI` to `http://localhost:3000/api/auth/callback` and add that same URL as an allowed redirect URI in the Authgear portal. The SDK works identically in local development — you'll get a real Authgear login page with all the same features (passkeys, social login, MFA) available for testing.

## Conclusion

Authentication in the Next.js App Router is genuinely better architecture than it used to be. Server Components check identity at render time, middleware guards routes at the edge, and Server Actions make authenticated mutations straightforward. The framework handles the heavy lifting — the main question is what auth system sits behind it.

Building auth yourself is a significant ongoing investment. NextAuth/Auth.js gets you to a working login page quickly, but caps out before enterprise features. A managed platform like Authgear covers the full checklist — passkeys, SSO, MFA, fraud protection — from day one, and the `@authgear/nextjs` SDK is built specifically for the App Router.

The best time to get auth right is before you have users. The second best time is now.

**Ready to add authentication to your Next.js app?** [Sign up for Authgear free]() and follow the [Next.js quickstart guide](https://docs.authgear.com/get-started/regular-web-app/nextjs) to go from zero to protected routes in under 10 minutes.
