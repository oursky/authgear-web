---
title: "Next.js Security Best Practices (2026)"
excerpt: "Next.js has grown from a simple React framework into a full-stack platform — and with that power comes a wider attack surface. The App Router, Server Components, and Server Actions mean your authentication logic, database queries, and business rules all live in the same codebase as your UI."
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "Next.js Security Best Practices: Complete 2026 Guide"
metaDescription: "Secure your Next.js app in 2026: authentication, API route protection, XSS and CSRF prevention, the CVE-2025-29927 middleware bypass, CSP headers, and more."
publishedAt: 2026-03-30T17:47:49.619Z
updatedAt: 2026-03-25T18:45:47.481Z
draft: false
---

## The Security Surface of a Next.js App in 2026

Next.js has grown from a simple React framework into a full-stack platform — and with that power comes a wider attack surface. The App Router, Server Components, and Server Actions mean your authentication logic, database queries, and business rules all live in the same codebase as your UI. That's convenient, but a single misconfiguration can expose server-side code to the outside world.

In 2026, the most impactful security incidents in Next.js apps share three root causes: trusting the wrong layer (e.g., relying on middleware alone for auth), leaking secrets to the client, and failing to validate inputs on the server. This guide addresses each — with concrete code examples, callouts for the most dangerous anti-patterns, and a checklist you can keep open during code review.

For deeper dives into specific topics, see our guides on [Next.js middleware authentication](/post/nextjs-middleware-authentication) and [JWT authentication in Next.js](/post/nextjs-jwt-authentication).

## 1. Authentication Best Practices

### Prefer Passkeys Over Passwords

Passwords are phishable and vulnerable to credential stuffing and brute-force attacks. Passkeys — built on the WebAuthn/FIDO2 standard — are phishing-resistant because each credential is cryptographically bound to your domain. In 2026, all major platforms (iOS, Android, Windows, macOS) support passkeys natively. If you're starting a new app, make passkeys your default sign-in method and treat passwords as a legacy fallback only.

### Require MFA for Sensitive Actions

Even if a user's password is compromised, multi-factor authentication (MFA) blocks attackers from completing a login. Enforce MFA at the application level — not just at the identity provider — for high-risk actions like changing an email address, exporting data, or accessing admin routes. TOTP and WebAuthn security keys are both strong choices.

### Use httpOnly Cookies, Not localStorage

Storing a session token or JWT in `localStorage` is the most common Next.js auth mistake. Any JavaScript on the page — including code injected by an XSS attack — can read `localStorage`. `httpOnly` cookies are inaccessible to JavaScript, so they survive XSS.

```typescript
// ✅ Good — set session token in an httpOnly cookie (Server Action or API Route)
import { cookies } from 'next/headers';

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true,       // not readable by JavaScript
    secure: true,         // only sent over HTTPS
    sameSite: 'lax',      // CSRF protection
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
  });
}

```

```typescript
// ❌ Bad — storing a token in localStorage exposes it to XSS
localStorage.setItem('token', userToken);

```

### Implement Session Timeouts and Rotation

Long-lived sessions are a liability. Set a reasonable `maxAge` (24 hours for a standard app; 15 minutes for admin tools). Rotate the session ID on privilege escalation — for example, after re-authentication. This limits the damage if a session token is stolen: it expires before an attacker can make significant use of it.

## 2. Protecting API Routes and Server Actions

### Always Verify Authentication in the Handler

Every API Route and Server Action must verify the user's identity, even if middleware already checked it. Middleware is for edge-level routing decisions and should not be your only auth check. (More on why in section 4.)

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

  // safe to proceed
  const users = await db.users.findMany();
  return NextResponse.json(users);
}

```

Note the distinction: **401 Unauthorized** means the request has no valid identity (not authenticated). **403 Forbidden** means the user is authenticated but does not have permission. Returning the correct status code matters for client-side error handling.

### Add Rate Limiting

Without rate limiting, your login endpoint, password-reset flow, and OTP verification are all open to brute-force attacks. Use an edge-compatible rate limiter like <a href="https://github.com/upstash/ratelimit-js" target="_blank" rel="noopener">@upstash/ratelimit</a> with Upstash Redis, or a middleware-level solution for self-hosted deployments.

```typescript
// lib/rate-limit.ts — using @upstash/ratelimit + @upstash/redis
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export const loginRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '10 m'), // 5 requests per 10 minutes
  analytics: true,
});

// In your login Server Action:
// const { success } = await loginRatelimit.limit(ip);
// if (!success) throw new Error('Too many login attempts. Try again later.');

```

### Validate All Inputs on the Server

Client-side form validation is a UX convenience, not a security control. Any attacker can craft a raw HTTP request and bypass your frontend entirely. Use a schema validation library like <a href="https://zod.dev" target="_blank" rel="noopener">Zod</a> to validate every input that reaches your Server Actions and API Routes.

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

  // safe to use parsed.data
  await db.users.update({ where: { id: session.userId }, data: parsed.data });
}

```

## 3. Avoiding Common Vulnerabilities

### XSS via dangerouslySetInnerHTML

<div style="background:#fff3cd;border-left:4px solid #ffc107;padding:12px 16px;border-radius:4px;margin:16px 0;">
  <strong>Warning:</strong> <code>dangerouslySetInnerHTML</code> injects raw HTML into the DOM with no sanitization. If any part of that string comes from user input or an untrusted API, you have an XSS vulnerability. An attacker can inject <code>&lt;script&gt;</code> tags that steal session cookies, redirect users, or exfiltrate data.

If you must render HTML from an external source, sanitize it first with <a href="https://github.com/cure53/DOMPurify" target="_blank" rel="noopener">DOMPurify</a>. In Next.js (where components can run server-side), use `isomorphic-dompurify` — a wrapper that works in both Node.js and the browser:

```typescript
import DOMPurify from 'isomorphic-dompurify';

// ✅ Sanitize before rendering
const clean = DOMPurify.sanitize(userProvidedHtml);
return <div dangerouslySetInnerHTML={{ __html: clean }} />;

```

### Open Redirects

A common login-flow pattern is redirecting users back to where they were: `/login?returnTo=/dashboard`. If you don't validate `returnTo`, an attacker can craft a link like `/login?returnTo=https://evil.com` and redirect users to a phishing site after login.

```typescript
// ✅ Only allow relative URLs as redirect targets
function getSafeRedirect(returnTo: string | null): string {
  if (!returnTo || !returnTo.startsWith('/') || returnTo.startsWith('//')) {
    return '/dashboard';
  }
  return returnTo;
}

```

### CSRF and Server Actions

Next.js Server Actions use `POST` requests and automatically compare the `Origin` header against the `Host` header, which blocks most cross-site request forgery attempts. For custom API Routes that modify state, you should still verify the `Origin` or use a CSRF token — especially if you rely on cookie-based auth. Note: always ensure `SameSite=Lax` or `Strict` is set on your session cookies, as this is an important additional layer of CSRF defense.

## 4. Middleware Security and CVE-2025-29927

<div style="background:#f8d7da;border-left:4px solid #dc3545;padding:12px 16px;border-radius:4px;margin:16px 0;">
  <strong>Critical: CVE-2025-29927 — Middleware Authorization Bypass</strong><br>
  In March 2025, a CVSS 9.1 vulnerability was disclosed in Next.js. By sending an <code>x-middleware-subrequest</code> header, attackers could skip all middleware logic entirely — bypassing authentication checks on protected routes without any credentials. Affected versions: 11.1.4–12.3.4, 13.0.0–13.5.8, 14.0.0–14.2.24, and 15.0.0–15.2.2. Fixed in 12.3.5, 13.5.9, 14.2.25, and 15.2.3. <strong>Update immediately if you haven't already.</strong>

The deeper lesson from CVE-2025-29927 is architectural: **middleware is not a security boundary**. It runs at the edge and is designed for routing and response shaping — not as a last line of defense. Your actual auth checks must live in your Route Handlers, Server Actions, and Data Access Layer.

Think of middleware like the front door of a building: it can direct traffic and check IDs as a first pass, but every room inside should still have its own lock. If someone slips past the front door, no individual room should be left open.

```typescript
// middleware.ts — use for routing decisions only
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;

  // Redirect unauthenticated users to login
  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// ⚠️ This is a UX redirect, NOT a security check.
// Always re-verify the session inside your actual handlers/actions.

```

## 5. Environment Variable Security

Next.js has a simple but consequential rule: any environment variable prefixed with `NEXT_PUBLIC_` is bundled into the client-side JavaScript and visible to anyone who downloads your page. Variables without that prefix stay server-side only.

```bash
# .env.local

# ✅ Server-only secrets (never sent to the browser)
DATABASE_URL=postgres://user:password@host/db
AUTH_SECRET=your-signing-secret
AUTHGEAR_CLIENT_SECRET=your-authgear-secret

# ✅ Safe to expose — intentionally public config
NEXT_PUBLIC_APP_URL=https://yourapp.com
NEXT_PUBLIC_AUTHGEAR_CLIENT_ID=your-client-id
NEXT_PUBLIC_AUTHGEAR_ENDPOINT=https://your-project.authgear.cloud

```

Never commit `.env` or `.env.local` to version control. Add both to `.gitignore` and use your deployment platform's secret manager (Vercel Environment Variables, AWS Secrets Manager, etc.) for production values.

## 6. Content Security Policy Headers

A Content Security Policy (CSP) tells the browser which sources are allowed to load scripts, styles, images, and other resources. A well-configured CSP is a critical last line of defense against XSS — even if an attacker injects a `<script>` tag, the browser blocks it if the source isn't on your allowlist.

Add security headers in `next.config.ts`:

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

Two notes on this config: First, `frame-ancestors 'none'` in the CSP and `X-Frame-Options: DENY` have the same effect — both are included here for compatibility with older browsers that don't support CSP. Second, `'unsafe-inline'` weakens your script-src policy. For a stricter setup without `'unsafe-inline'`, use nonce-based CSP — see the <a href="https://nextjs.org/docs/app/guides/content-security-policy" target="_blank" rel="noopener">official Next.js CSP guide</a>.

## 7. Using an Auth Platform

Implementing authentication securely from scratch is hard. You need to handle session management, token rotation, MFA, passkeys, brute-force protection, and more — and every detail has to be right. That's where an authentication platform like <a href="" target="_blank" rel="noopener">Authgear</a> helps. Authgear provides a drop-in auth layer for Next.js that handles passkeys, TOTP MFA, social login, and session management out of the box — so you can focus on your app rather than the auth infrastructure. See the <a href="https://docs.authgear.com/get-started/regular-web-app/nextjs" target="_blank" rel="noopener">Next.js quickstart guide</a> to get started in under 15 minutes.

## Next.js Security Checklist

<div class="ag-table-wrap">
<table class="ag-table">
  <thead>
    <tr>
      <th>Check</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Next.js updated to 12.3.5, 13.5.9, 14.2.25+, or 15.2.3+ (CVE-2025-29927 patched)</td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td>Session tokens stored in <code>httpOnly</code>, <code>Secure</code>, <code>SameSite=Lax</code> cookies</td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td>No auth tokens stored in <code>localStorage</code> or <code>sessionStorage</code></td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td>Passkeys or MFA enforced for user accounts</td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td>Session expiry configured (24h or less for standard apps)</td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td>Every API Route and Server Action re-verifies auth (not middleware-only)</td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td>Server Actions and API Routes validate inputs with Zod or equivalent</td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td>Rate limiting on login, OTP, and password-reset endpoints</td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td><code>dangerouslySetInnerHTML</code> is either avoided or sanitized with DOMPurify</td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td>Open redirects prevented — <code>returnTo</code> validated as a relative URL</td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td>No secrets in <code>NEXT_PUBLIC_</code> environment variables</td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td><code>.env</code> and <code>.env.local</code> files are in <code>.gitignore</code></td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td>CSP header configured in <code>next.config.ts</code></td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td><code>X-Frame-Options: DENY</code> and/or <code>frame-ancestors 'none'</code> in CSP set</td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td><code>X-Content-Type-Options: nosniff</code> header set</td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td><code>Strict-Transport-Security</code> header set (HTTPS enforced)</td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td>Dependencies audited with <code>npm audit</code> or equivalent</td>
      <td>✅ / ❌</td>
    </tr>
    <tr>
      <td>Admin routes protected both in middleware AND in route handlers</td>
      <td>✅ / ❌</td>
    </tr>
  </tbody>
</table></div>
