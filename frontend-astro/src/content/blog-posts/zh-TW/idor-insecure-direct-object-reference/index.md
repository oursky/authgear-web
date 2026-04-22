---
title: "Insecure Direct Object Reference (IDOR): Examples & API Prevention"
h1: "Insecure Direct Object Reference (IDOR): Examples & Prevention (with API tips)"
excerpt: "What IDOR is, how it happens in web & APIs, real-world examples, and a practical checklist to prevent object-level authZ bugs (BOLA)."
coverImage: ./cover.jpg
category: industry
featured: false
publishedAt: 2025-10-17T14:55:41.237Z
updatedAt: 2025-10-17T14:55:41.237Z
draft: false
---

IDOR (Insecure Direct Object Reference) happens when an app or API takes an identifier from the client (like `user_id=123` or `/invoices/42`) and uses it to fetch/modify data **without confirming the caller is allowed** to access that object. It’s one of the most common ways [Broken Access Control ](/post/what-is-broken-access-control-vulnerability-and-how-to-prevent-it)shows up in real systems, especially APIs.

## What is IDOR?

**Insecure Direct Object Reference (IDOR)** is an access-control flaw: the application uses a client-supplied identifier to access an internal object (file, record, resource) **but fails to verify authorization**. An attacker changes the identifier and gains access to someone else’s data or actions.<a href="https://cheatsheetseries.owasp.org/cheatsheets/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet.html?utm_source=chatgpt.com" target="_blank"></a>

In practice, those identifiers can appear **anywhere** in a request: URL path segments (e.g., `/users/1234`), query parameters (`?account=987`), headers, or JSON body fields. If the server doesn’t perform an authorization decision for the exact resource referenced, IDOR is likely.

## IDOR vs. BOLA (API1:2023)

In API systems, OWASP frames this as <a href="https://owasp.org/API-Security/editions/2023/en/0x11-t10/" target="_blank">Broken Object Level Authorization (BOLA)</a>, the #1 API risk, because APIs tend to expose many endpoints that take object IDs. The fix is the same principle: **perform object-level authorization checks in every function that touches a data store using a user-controlled ID**, regardless of whether IDs are integers, UUIDs, or strings. For a broader view of authZ failures, see our [Broken Access Control prevention guide](/post/what-is-broken-access-control-vulnerability-and-how-to-prevent-it).

## How IDOR happens and how to think about it

Typical sources:

- **Path & query IDs:** `/api/v1/invoices/42` or `?user_id=123`
- **Body claims:** `{ "org_id": "acme" }` provided by the client
- **Headers/tokens you didn’t validate server-side:** trusting an unverified header to scope access

Any time the **client** can influence which resource is fetched or modified, the server must **re-evaluate ownership/permissions** for that exact resource, *even if* the caller is authenticated and *even if* the UI “hides” the link.

## Real-world examples

**Peloton (2021)**

****Researchers showed Peloton’s back-end APIs could return **private user data** even when profiles were set to private—because requests to certain endpoints lacked proper authZ. Peloton subsequently patched the issues after disclosure. This is a classic **IDOR/BOLA** pattern in an API.

Sources: <a href="https://techcrunch.com/2021/05/05/peloton-bug-account-data-leak/" target="_blank">Techcrunch</a>, <a href="https://www.bankinfosecurity.com/peloton-api-flaws-exposed-users-data-prior-to-recent-patch-a-16534" target="_blank">bankinsecurity</a>, [salt.security](https://salt.security/blog/the-peloton-api-security-incident-what-happened-and-how-you-can-protect-yourself)

**Facebook photo deletion bugs (2013, 2017):**

Separate flaws allowed actions like **deleting others’ photos** by manipulating parameters in privileged endpoints before Facebook fixed them and paid bounties. While the exact mechanics varied, the core problem was **insufficient server-side authorization** to confirm the acting principal was allowed to affect that object.

Sources: [Techcrunch](https://techcrunch.com/2013/09/02/security-researcher-discovers-bug-that-would-let-hackers-delete-any-photo-off-facebook/), <a href="https://thehackernews.com/2017/11/facebook-delete-photos.html" target="_blank">The Hacker News</a>

## How to find IDOR for devs, QA, and security

**1) Change the object identifier across users/tenants.**

Log in as **User A**, capture a request that fetches A’s object (e.g., `/orders/1001`). Replay the same request with **User B’s** object ID (`/orders/1002`). If the server returns data, you’ve got IDOR. Repeat for **writes** (edit/delete) and **tenants**.

**2) Test all places IDs can hide.**

****Don’t just check path/query. Try body fields, nested JSON, GraphQL arguments, alternate HTTP methods, and secondary endpoints that touch the same resource.

**3) Negative tests belong in CI.**

Add automated tests that prove access is denied when the caller does **not** own the object or lacks the required role. This is the most reliable way to prevent regressions. (Think: unit/contract tests per resource/action, seeded with multiple users/tenants.)

**4) Review patterns, not just endpoints.**

If one endpoint is vulnerable, **search for the pattern** across the codebase (controllers using `id` params, repositories that take arbitrary IDs, etc.).

## How to prevent IDOR (practical checklist)

**1) Deny by default & centralize authorization**

****Implement authorization in **trusted server-side code** (or a serverless function you control). Except for explicitly public resources, **block by default** and grant access via reusable policy checks (not scattered `if` statements).

**2) Enforce object-level checks everywhere**

****For every handler that reads/writes an object using an ID **from the client**, verify:

- Who is the caller (subject)?
- What are they allowed to do (role/attributes/policy)?
- **Does the subject own this object or have explicit permission?**   OWASP API Top 10: do this in **every** function that accesses a data source via a user-supplied ID.

**3) Don’t trust client-supplied claims**

****Never treat `user_id`, `org_id`, or `tenant_id` in the request as authoritative. Derive the subject and scope from the authenticated context and server-side lookups.

**4) Prefer RBAC/ABAC over ad-hoc checks**

****Define roles/attributes and policies centrally (e.g., “record owner OR `billing_admin` can read `invoice`”). This avoids missing checks in edge controllers and makes reviews/audits feasible.

**5) Guard multi-tenant boundaries**

****Confirm **tenant isolation** on every access. Consider **row-level security** in the database (where supported) to enforce ownership constraints close to the data. (RLS is an implementation technique that reinforces policy; you still need app-level checks.)

**6) Be careful with “opaque IDs,” CDNs, and signed URLs**

****Opaque IDs (UUIDs) reduce enumeration, but do **not** fix authorization. For content delivery, use **short-lived, signed URLs** and verify permissions at the time of signing.

**7) Log denials and throttle enumeration**

****Log failed access attempts (including object IDs, caller, and reason) and **rate-limit** endpoints to make brute-force ID guessing noisy and slow.

## API design patterns that help

- **Subject-derived access:** pull `subject_id` (and tenant) from the token/session; never from the request body.
- **Capability/ownership checks:** require the caller to present a verifiable **relationship** to the object (owner, member, admin of tenant).
- **Policy decision point (PDP):** centralize rules (e.g., OPA, Cedar, or custom) and call it consistently from services.
- **Resource-scoped routers:** group endpoints by resource and enforce a guard (middleware) that checks ownership/role **before** entering handlers.
- **“Sensitive action” step-up:** for high-risk actions (PPI export, money movement), require **fresh auth** (MFA or re-auth) and strict server-side checks.

## Common FAQs

### **Is hiding or hashing IDs enough?**

****No. Obscurity helps, but **authorization** is the control. Treat the client as hostile, *always* check ownership/permission server-side.

### **Do UUIDs prevent IDOR?**

No. Attackers can still replay or obtain valid IDs. UUIDs reduce guessability, but you must still make a **policy decision per request**.

**Is GraphQL safer than REST for IDOR?**

Not inherently. GraphQL resolvers must perform the **same object-level checks** you’d do in REST. Test resolvers with cross-user/tenant IDs just like endpoints.

## Wrap-up

IDOR is a simple bug with outsized impact because it strikes at the heart of authorization. If a **single** handler trusts client-supplied object IDs, your whole data model may be exposed. The fix isn’t exotic: **deny by default, centralize policy, and enforce object-level checks in every function**. Add negative tests to CI and keep an eye on logs—your future self will thank you.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Insecure Direct Object Reference (IDOR): Examples & API Prevention",
  "description": "What IDOR is, how it happens in web & APIs, real-world examples, and a practical checklist to prevent object-level authorization bugs (BOLA).",
  "author": { "@type": "Organization", "name": "Authgear" },
  "publisher": {
    "@type": "Organization",
    "name": "Authgear",
    "logo": { "@type": "ImageObject", "url": "https://www.authgear.com/path-to-logo.png" }
  },
  "datePublished": "2025-09-09",
  "dateModified": "2025-09-09",
  "mainEntityOfPage": "https://www.authgear.com/post/idor-insecure-direct-object-reference"
}
</script>
