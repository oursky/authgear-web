---
title: "HTTP 401 vs 403: What's the Difference and Which to Return"
excerpt: "401 means the server doesn't know who you are; 403 means it knows exactly who you are — and the answer is no. Learn how to fix each error and which one your API should return, with code examples."
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "HTTP 401 vs 403: Difference, Fixes & When to Use | Authgear"
metaDescription: "401 Unauthorized = not authenticated; 403 Forbidden = authenticated but not allowed. Learn how to fix both errors and which status code your API should return."
publishedAt: 2026-06-03T00:00:00.000Z
draft: false
faq:
  - q: "What is the difference between 401 and 403?"
    a: "A 401 Unauthorized response means the request lacks valid authentication — the server doesn't know who you are, or your credentials are invalid or expired. A 403 Forbidden response means the server knows who you are, but you don't have permission for that resource. In short: 401 is an authentication problem, 403 is an authorization problem."
  - q: "Why is 401 called Unauthorized when it means unauthenticated?"
    a: "It's a historical naming mistake in the HTTP specification. The behaviour defined for 401 is about authentication: the response must include a WWW-Authenticate header telling the client how to authenticate. The name stuck, but read 401 as 'unauthenticated' and 403 as 'unauthorized' and the codes make sense."
  - q: "Should my API return 401 or 403 for an expired token?"
    a: "Return 401. An expired token means the server can no longer verify who the caller is, which is an authentication failure. The client should refresh the token or re-authenticate and retry. Reserve 403 for valid, verified credentials that lack permission."
  - q: "When should I return 404 instead of 403?"
    a: "When a 403 would confirm that a hidden resource exists. If an attacker probing /admin or guessing private resource IDs gets a 403, they learn the resource is real. Returning 404 for resources the caller isn't allowed to see avoids leaking that information — GitHub does this for private repositories."
  - q: "Can a 403 error be fixed by logging in again?"
    a: "Usually not. A 403 means you are already authenticated but lack permission, so signing in again with the same account changes nothing. You either need a role/permission change from an administrator, or you're hitting a server-side rule such as an IP allowlist or WAF policy."
---

> **tl;dr** — **401 Unauthorized** means *the server doesn't know who you are*: credentials are missing, invalid, or expired — authenticate (again) and retry. **403 Forbidden** means *the server knows exactly who you are, and the answer is still no*: you lack permission, and re-logging in won't help. 401 is an authentication problem; 403 is an authorization problem.

## 401 vs 403 at a glance

<div class="ag-table-wrap"><table class="ag-table"><thead><tr><th></th><th>401 Unauthorized</th><th>403 Forbidden</th></tr></thead><tbody><tr><td>Real meaning</td><td>Not authenticated</td><td>Not authorized</td></tr><tr><td>Server's view</td><td>"I don't know who you are"</td><td>"I know who you are — no"</td></tr><tr><td>Typical cause</td><td>Missing/expired/invalid credentials</td><td>Insufficient permissions, IP rules, WAF</td></tr><tr><td>Required header</td><td><code>WWW-Authenticate</code> (per RFC 9110)</td><td>None</td></tr><tr><td>Fixed by signing in again?</td><td>Usually yes</td><td>No — needs a permission change</td></tr><tr><td>Retry strategy</td><td>Refresh token / re-authenticate, then retry</td><td>Don't retry with the same credentials</td></tr></tbody></table></div>

The names are the confusing part: **401 "Unauthorized" actually means unauthenticated**, and 403 is the one that means unauthorized. The HTTP spec (RFC 9110) is stuck with the historical names, so the safest mental model is to ignore them and remember: **401 = who are you? · 403 = you can't do that.**

## What a 401 Unauthorized error means

A 401 tells the client that the request had no valid authentication credentials. The server is not refusing the action — it simply can't establish an identity to evaluate. That's why the spec requires every 401 response to carry a `WWW-Authenticate` header describing how to authenticate:

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer realm="api", error="invalid_token", error_description="The access token expired"
```

Common causes:

- **No credentials at all** — the `Authorization` header or session cookie is missing
- **Expired access token** — the most common cause in OAuth/JWT APIs
- **Malformed credentials** — wrong scheme (`Basic` vs `Bearer`), corrupted or truncated token
- **Invalid signature** — the JWT was signed with a key the server doesn't trust (or the key rotated)
- **Stale session** — the session cookie was revoked server-side (logout elsewhere, password change)

### How to fix a 401

**As a user:** sign out and back in, or hard-refresh; clear cookies for the site if it persists. Your session has simply expired or been invalidated.

**As a developer**, work through the chain:

1. **Confirm the header is actually sent.** Browser dev tools → Network tab → check the request has `Authorization: Bearer <token>` or the expected cookie. Missing cookies on cross-origin requests usually mean a `SameSite` or `credentials: "include"` issue.
2. **Decode the token and check `exp`.** Paste the JWT into our [JWT debugger](/tools/jwt-jwe-debugger) — an expired `exp` claim is the answer more often than anything else.
3. **Verify the signature and key.** If the token is fresh but rejected, the server may be validating against the wrong key — check the `kid` header against the provider's [JWKS](/post/what-is-jwks).
4. **Implement refresh-and-retry.** Production clients should treat 401 as a signal to refresh the access token once, then retry the request:

```typescript
async function fetchWithAuth(url: string, options: RequestInit = {}) {
  let response = await fetch(url, withToken(options, getAccessToken()));

  if (response.status === 401) {
    // Token likely expired — refresh once and retry
    const newToken = await refreshAccessToken();
    response = await fetch(url, withToken(options, newToken));
  }
  return response;
}

function withToken(options: RequestInit, token: string): RequestInit {
  return {
    ...options,
    headers: { ...options.headers, Authorization: `Bearer ${token}` },
  };
}
```

> ⚠️ **Common mistake:** retrying a 401 in an infinite loop. Refresh once; if the retry still returns 401, send the user to login. Otherwise an expired refresh token turns into a request storm.

## What a 403 Forbidden error means

A 403 says authentication succeeded — the server knows the caller's identity — but the identity doesn't have permission for this resource or action. Re-authenticating with the same account cannot fix it.

Common causes:

- **Insufficient role or scope** — the user isn't an admin; the token lacks the `orders:write` scope
- **Resource-level rules** — the document belongs to another tenant or team
- **IP allowlists / geo-blocking** — the request comes from outside the permitted network
- **WAF or security rules** — Cloudflare, AWS WAF, or ModSecurity flagged the request
- **Missing CSRF token** — many frameworks return 403 when CSRF validation fails
- **Filesystem permissions** — on static servers (nginx/Apache), the process can't read the file

### How to fix a 403

**As a user:** you need access granted — contact whoever administers the resource. If it's a public site blocking you, a VPN exit node or corporate network may be tripping a WAF rule.

**As a developer:**

1. **Identify which layer rejected it.** Application 403s come from your authorization code; infrastructure 403s come from WAFs, proxies, or the file server. The response body usually differs — a JSON error is your app, an HTML block page is the WAF.
2. **Check the token's claims, not just its validity.** Decode the token and compare `scope`, `roles`, or `groups` claims against what the endpoint requires.
3. **For CSRF 403s**, confirm the token is in the form/header and that the session cookie reached the server.
4. **For file-server 403s**, check directory permissions and that an index file exists (nginx returns 403 for directory listings it can't serve).

## Which one should your API return?

This is the decision developers actually search for. The rule:

```text
No valid identity?            → 401 (+ WWW-Authenticate header)
Valid identity, no permission? → 403
Permission would reveal a secret resource exists? → 404
```

That last line matters more than it looks. **A 403 confirms the resource exists.** If `GET /api/teams/secret-project` returns 403 to an outsider, you've leaked the project's existence. For resources where existence itself is sensitive, return 404 — this is what GitHub does for private repositories.

Here's the pattern as Express middleware:

```typescript
function requireAuth(req, res, next) {
  const token = extractBearerToken(req);
  if (!token || !verify(token)) {
    // Authentication failed → 401 with WWW-Authenticate
    return res
      .status(401)
      .set("WWW-Authenticate", 'Bearer realm="api", error="invalid_token"')
      .json({ error: "authentication_required" });
  }
  req.user = decode(token);
  next();
}

function requireRole(role: string) {
  return (req, res, next) => {
    if (!req.user.roles.includes(role)) {
      // Authenticated but not allowed → 403
      return res.status(403).json({ error: "insufficient_permissions" });
    }
    next();
  };
}

app.get("/admin/reports", requireAuth, requireRole("admin"), handler);
```

> ⚠️ **Common mistake:** returning 403 for expired tokens. Clients use the status code to decide whether to refresh-and-retry (401) or give up (403). Mixing them up breaks every well-behaved client's retry logic.

## 401 vs 403 vs related status codes

<div class="ag-table-wrap"><table class="ag-table"><thead><tr><th>Code</th><th>Meaning</th><th>Use when</th></tr></thead><tbody><tr><td>401</td><td>Unauthenticated</td><td>Credentials missing, invalid, or expired</td></tr><tr><td>403</td><td>Unauthorized</td><td>Identity verified, permission denied</td></tr><tr><td>404</td><td>Not found</td><td>Resource doesn't exist — or you're hiding that it does</td></tr><tr><td>407</td><td>Proxy auth required</td><td>A proxy (not the origin) needs credentials</td></tr><tr><td>429</td><td>Too many requests</td><td>Rate limiting — not an auth problem</td></tr></tbody></table></div>

If you're debugging gateway-level errors instead, see our guide to the [HTTP 502 Bad Gateway error](/post/http-502-bad-gateway).

## 401, 403, and your auth architecture

The 401/403 split mirrors the two halves of every identity system: **authentication** (who are you?) and **authorization** (what can you do?). Getting the codes right is easy once those layers are cleanly separated in your stack — and hard when login, sessions, scopes, and roles are tangled together.

An authentication platform like [Authgear](/) keeps the layers separate by design: it handles authentication (login, MFA, token issuance and refresh — your 401s resolve themselves through standard token refresh) and gives you clean role and permission data in the token, so your application code only makes 403 decisions. See [session vs token authentication](/post/session-vs-token-authentication) for how the session layer fits in.

## Frequently Asked Questions

### What is the difference between 401 and 403?

A 401 Unauthorized response means the request lacks valid authentication — the server doesn't know who you are, or your credentials are invalid or expired. A 403 Forbidden response means the server knows who you are, but you don't have permission for that resource. In short: 401 is an authentication problem, 403 is an authorization problem.

### Why is 401 called Unauthorized when it means unauthenticated?

It's a historical naming mistake in the HTTP specification. The behaviour defined for 401 is about authentication: the response must include a WWW-Authenticate header telling the client how to authenticate. The name stuck, but read 401 as "unauthenticated" and 403 as "unauthorized" and the codes make sense.

### Should my API return 401 or 403 for an expired token?

Return 401. An expired token means the server can no longer verify who the caller is, which is an authentication failure. The client should refresh the token or re-authenticate and retry. Reserve 403 for valid, verified credentials that lack permission.

### When should I return 404 instead of 403?

When a 403 would confirm that a hidden resource exists. If an attacker probing /admin or guessing private resource IDs gets a 403, they learn the resource is real. Returning 404 for resources the caller isn't allowed to see avoids leaking that information — GitHub does this for private repositories.

### Can a 403 error be fixed by logging in again?

Usually not. A 403 means you are already authenticated but lack permission, so signing in again with the same account changes nothing. You either need a role/permission change from an administrator, or you're hitting a server-side rule such as an IP allowlist or WAF policy.
