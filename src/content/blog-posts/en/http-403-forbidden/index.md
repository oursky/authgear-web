---
title: "HTTP 403 Forbidden: What It Means and How to Fix It"
excerpt: "A 403 Forbidden error means the server understood your request but refuses to authorise it. Here is what causes it and how to fix it on Nginx, Apache, Cloudflare, and AWS."
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "HTTP 403 Forbidden: Causes & Fixes (Nginx, Apache, Cloudflare) | Authgear"
metaDescription: "A 403 Forbidden error means the server refuses to authorise your request. Learn what causes it, how to diagnose it, and how to fix it on Nginx, Apache, Cloudflare, and AWS."
publishedAt: 2026-05-06T00:00:00.000Z
updatedAt: 2026-05-06T00:00:00.000Z
draft: false
faq:
  - q: "What does 403 Forbidden mean?"
    a: "A 403 Forbidden status code means the server understood your request but refuses to fulfil it. The server knows who you are (or does not care who you are), but the resource is off-limits. This is different from 401, which means the server needs you to authenticate first."
  - q: "What is the difference between 401 and 403?"
    a: "A 401 Unauthorized means the request lacks valid authentication credentials — the server is asking you to log in. A 403 Forbidden means the server recognised you (or the request is already authenticated) but you do not have permission to access the resource. Re-authenticating will not fix a 403 the way it fixes a 401."
  - q: "How do I fix a 403 Forbidden error?"
    a: "The fix depends on the cause. For file permission issues on Linux: chmod 644 for files and chmod 755 for directories. For Nginx with no index file: add index.html or enable autoindex. For Apache: check .htaccess for Deny directives. For Cloudflare: review Firewall Rules and IP Access Rules. For AWS S3: check the bucket policy and ensure s3:GetObject is allowed. For API 403s: check that the OAuth token includes the required scope."
  - q: "Why am I getting a 403 Forbidden on Nginx?"
    a: "The most common causes of a 403 on Nginx are: the web root directory or file has restrictive permissions (not readable by the nginx user), there is no index.html or index.php in the directory and autoindex is off, or a location block has an explicit deny rule. Check /var/log/nginx/error.log for the specific reason."
  - q: "Why am I getting a 403 Forbidden on Cloudflare?"
    a: "Cloudflare returns a 403 when one of its security rules blocks your request. Common causes: your IP is on a block list, a Firewall Rule or WAF managed rule matched your request, Bot Fight Mode flagged your client, or a country-block rule is in effect. Check the Security Events log in the Cloudflare dashboard to see which rule fired."
  - q: "Can a 403 be caused by an OAuth scope error?"
    a: "Yes. In API contexts, a 403 frequently means the access token is valid but lacks a required OAuth scope, or the authenticated user does not have the role needed for that resource. The fix is not to re-authenticate — it is to request the correct scope or to assign the user the right role. Inspect the token's 'scope' claim to diagnose this."
  - q: "Is 403 Forbidden a client or server error?"
    a: "403 is a 4xx client error, meaning the problem originates with the request rather than a server malfunction. However, the root cause is often a server misconfiguration (wrong file permissions, incorrect access rules) rather than anything the end user did wrong. Developers should think of 403 as 'the server is working correctly but has been configured to refuse this request.'"
  - q: "What is the difference between 403 and 404?"
    a: "A 403 means the server knows the resource exists but refuses to serve it to you. A 404 means the server cannot find the resource at all (or is deliberately hiding its existence). From a security standpoint, servers sometimes return 404 instead of 403 to avoid disclosing that a restricted resource exists."
  - q: "How do I bypass 403 Forbidden?"
    a: "You do not bypass a 403 — you fix the underlying authorisation issue. If you own the server, correct the permissions, access rules, or OAuth scope configuration. If you are a user hitting a third-party site, a 403 means you genuinely do not have access to that resource. Attempting to circumvent it without authorisation is a violation of the site's terms and potentially unlawful."
---

A **403 Forbidden** error means the server understood your request but refuses to fulfil it. It is not a network failure, and it is not a missing page — the server is up and running, it found the resource, and it is deliberately turning you away.

> **tl;dr** — A 403 Forbidden means the server understood who you are but refuses to give you access to the resource. Unlike 401 (which means "log in and try again"), 403 means "even with valid credentials, you cannot access this." Common causes: missing file permissions, IP block, missing OAuth scope, or `.htaccess` deny rules. Authentication will not fix it — you need to fix the authorisation.

For developers, a 403 sits in an awkward middle ground: it is not a "did you type the URL correctly?" problem (that is 404) and it is not "are you logged in?" (that is 401). A 403 means something is specifically blocking access — a rule, a permission, a policy. That specificity is actually useful: it tells you exactly which layer of your stack to inspect.

## What Is HTTP 403 Forbidden?

The HTTP 403 status code is defined in [RFC 9110](https://httpwg.org/specs/rfc9110.html#status.403) as:

<blockquote><p>"The 403 (Forbidden) status code indicates that the server understood the request but refuses to fulfill it. A server that wishes to make public why the request has been forbidden can describe that reason in the response content (if any)."</p></blockquote>

In plain terms: the server received a well-formed request, understood it perfectly, found the resource — and decided not to hand it over. The request is not malformed; the server is not broken. Something in between says no.

The "forbidden" label is deliberate. It signals an authorisation failure, not an authentication failure, and not a missing resource.

## 401 vs 403 vs 404: The Crucial Difference

These three status codes are frequently confused. Getting them wrong leads to debugging the wrong layer.

<div class="ag-table-wrap"><table class="ag-table">
<thead><tr><th>Status</th><th>Meaning</th><th>Who is at fault</th><th>Will logging in help?</th></tr></thead>
<tbody>
<tr><td><strong>401 Unauthorized</strong></td><td>No valid credentials were provided</td><td>Client (unauthenticated)</td><td>Yes — the server wants you to authenticate</td></tr>
<tr><td><strong>403 Forbidden</strong></td><td>Credentials may be valid, but access is denied</td><td>Server policy / misconfiguration</td><td>No — authentication is not the issue</td></tr>
<tr><td><strong>404 Not Found</strong></td><td>The resource does not exist (or the server hides it)</td><td>Client (wrong URL) or server (hidden resource)</td><td>No — the resource is either missing or concealed</td></tr>
</tbody>
</table></div>

The practical takeaway: if you are debugging a 403 on an API, do not reach for the "refresh token" logic. The token may be valid. The problem is what the token says you are allowed to do — or a layer above the token entirely (IP block, WAF, file permissions).

## Common Causes of HTTP 403 Forbidden

### 1. File or directory permission misconfiguration

The most common cause on Linux web servers. Nginx and Apache run as a system user (typically `www-data` or `nginx`). If the files or directories in your web root are not readable by that user, the server returns 403.

The standard convention:
- Files: `644` (owner read/write, group and others read-only)
- Directories: `755` (owner full access, group and others read and execute)

```bash
# Fix file permissions recursively
find /var/www/mysite -type f -exec chmod 644 {} \;
find /var/www/mysite -type d -exec chmod 755 {} \;

# Or: fix ownership so the web server user can read everything
chown -R www-data:www-data /var/www/mysite
```

### 2. Missing index file with directory listing disabled

If a request points to a directory and there is no index file (`index.html`, `index.php`, etc.), and directory autoindex is turned off, the server has nothing to serve — it returns 403 rather than listing the directory contents.

This catches many developers off guard when deploying a new site: Nginx starts returning 403 and the error log shows "directory index of ... is forbidden."

### 3. IP block or WAF rule

A Web Application Firewall (Cloudflare, AWS WAF, Nginx `ngx_http_access_module`) can return 403 before the request ever reaches your application. The request is blocked at the edge, not at the app layer.

Common triggers: blocked IP ranges, suspicious User-Agent headers, request rate patterns, or geographic restrictions.

### 4. Missing OAuth scope or insufficient role

In API contexts, this is one of the most frequent causes developers overlook. The client sends a valid access token — authentication succeeds — but the token was issued without the scope needed for that endpoint, or the user does not hold the required role.

The server returns 403, not 401, because the user *is* authenticated. They just lack permission. Re-authenticating does nothing; requesting the correct scope at authorisation time is the fix.

### 5. Apache `.htaccess` deny directive

An `.htaccess` file anywhere in the directory hierarchy can contain `Require all denied` or `Order deny,allow / Deny from all`, which tells Apache to block all requests to that path. Security-conscious configurations often deny access to directories like `.git`, `vendor`, or `config` — but sometimes these rules are too broad.

### 6. SELinux context mismatch

This one is subtle and specific to RHEL, CentOS, and Fedora-based servers. Even if Linux file permissions are correct (`644`, owned by `nginx`), SELinux's mandatory access control layer may prevent the web server from reading the file if the SELinux file context is wrong.

The symptom: permissions look fine in `ls -la`, but the server still returns 403. Check with:

```bash
# See the SELinux context on the files
ls -Z /var/www/mysite

# Fix the context for a web root directory
restorecon -Rv /var/www/mysite
```

### 7. Hotlink protection or referer block

Some servers and CDNs block requests where the `Referer` header points to an external domain. This is common for media files (images, videos) — the server serves them to its own pages but returns 403 to anyone trying to embed or link them from elsewhere.

### 8. Rate limit threshold reached

Cloudflare, AWS WAF, and some Nginx configurations return 403 (rather than 429) when a rate limit is exceeded. This catches developers who associate 403 exclusively with permissions — in reality it can also mean "too many requests in too short a time."

### 9. Geo-block by CDN

Many CDN configurations block entire countries or regions and return 403 to those requests. If you are debugging a 403 that only affects users in specific locations, check your CDN's geographic access rules.

## How to Diagnose a 403 Forbidden

Work through these steps in order. Each one narrows the layer responsible.

### Step 1: Read the response body

Unlike many 5xx errors, a 403 often comes with a response body that explains why. Cloudflare, AWS WAF, and Nginx all include readable text or an error code in the response. Read it before diving into logs.

```bash
curl -sv https://your-domain.com/protected-path 2>&1 | grep -A 20 "< HTTP"
```

### Step 2: Identify which layer returned the 403

Check the response headers:

```bash
curl -I https://your-domain.com/protected-path
```

Look at:
- `Server` header — `nginx`, `Apache`, `cloudflare`
- `CF-Ray` — present means Cloudflare returned this
- `X-Cache` — indicates a CDN or caching layer
- `x-amzn-RequestId` — indicates AWS API Gateway or CloudFront

Knowing which layer blocked the request tells you where to look next. A `CF-Ray` header means check Cloudflare's Security Events, not your Nginx config.

### Step 3: Reproduce with curl

```bash
# Full verbose output — shows headers in and out
curl -v https://your-domain.com/protected-path

# With auth token
curl -v -H "Authorization: Bearer <your-token>" https://api.example.com/resource

# Check if the block is IP-based by trying from a different IP
curl -v --proxy socks5://127.0.0.1:1080 https://your-domain.com/protected-path
```

### Step 4: Check server logs

**Nginx:**

```bash
tail -n 100 /var/log/nginx/error.log
```

A 403 from Nginx typically appears as:

```
2026/05/06 10:00:00 [error] 1234#0: *1 directory index of "/var/www/html/" is forbidden
2026/05/06 10:00:00 [error] 1234#0: *2 "/var/www/html/index.html" is forbidden (13: Permission denied)
```

**Apache:**

```bash
tail -n 100 /var/log/apache2/error.log
# or on RHEL-based systems:
tail -n 100 /var/log/httpd/error_log
```

**Cloudflare:** Dashboard → Security → Events. Filter by action "Block" to see which rule fired.

## How to Fix HTTP 403 Forbidden

### Fix: Nginx 403 Forbidden

The two most common Nginx 403 causes are wrong file permissions and a missing index file.

**No index file:**

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/mysite;

    # List the index files Nginx should look for, in order
    index index.html index.htm index.php;

    location / {
        # try_files: look for the file, then a directory, then fall back to 404
        try_files $uri $uri/ =404;
    }
}
```

**Wrong file permissions (check and fix):**

```bash
# What user is Nginx running as?
ps aux | grep nginx

# Check permissions on the web root
ls -la /var/www/mysite/

# Fix permissions
chmod 755 /var/www/mysite
chmod 644 /var/www/mysite/index.html
chown -R nginx:nginx /var/www/mysite
```

**Explicit deny in a location block:**

```nginx
# Remove or restrict an overly broad deny
location /api/ {
    # Before: deny all;
    # After: allow legitimate clients, deny everything else
    allow 10.0.0.0/8;
    deny all;
}
```

After any config change, validate and reload:

```bash
nginx -t && systemctl reload nginx
```

### Fix: Apache 403 Forbidden

**`.htaccess` deny directive blocking a directory:**

```apache
# .htaccess — replace a blanket deny with a more targeted rule
<Directory "/var/www/html/uploads">
    # Remove this:
    # Require all denied

    # Replace with:
    Require all granted

    # Optionally disable script execution in upload directories
    Options -ExecCGI
    php_flag engine off
</Directory>
```

**Directory listing disabled (`Options -Indexes`) with no index file:**

Either add an `index.html` to the directory, or selectively enable directory listing for that path:

```apache
<Directory "/var/www/html/downloads">
    Options +Indexes
    Require all granted
</Directory>
```

**File ownership issues:**

```bash
chown -R www-data:www-data /var/www/html
find /var/www/html -type f -exec chmod 644 {} \;
find /var/www/html -type d -exec chmod 755 {} \;
```

### Fix: Cloudflare 403 Forbidden

Cloudflare returns 403 when one of its security layers blocks the request. Check these in order:

1. **Security Events log** — Dashboard → Security → Events. Find the blocked request and note the Rule ID that triggered it. This immediately tells you which rule to adjust.

2. **IP Access Rules** — Dashboard → Security → WAF → Tools. Check if your IP or IP range is explicitly blocked.

3. **Firewall Rules / Custom Rules** — Review any custom rules that may match the request path, User-Agent, or country. Common accidental blocks: rules matching `URI contains /admin` that are too broad.

4. **Bot Fight Mode** — If Super Bot Fight Mode is on, it can block legitimate API clients and monitoring tools. You can add exceptions or switch to a more targeted "Bot Management" configuration.

5. **Country blocks** — Dashboard → Security → WAF → Tools → Country. If you have blocked an entire country, requests from that region return 403.

6. **Rate limiting rules** — Dashboard → Security → WAF → Rate Limiting Rules. Check whether the request rate from your IP tripped a rule.

For immediate debugging, you can temporarily enable "I'm Under Attack" mode off and test from a fresh IP, or use Cloudflare's "Skip" action on a specific rule while you diagnose.

### Fix: AWS S3 / CloudFront 403

S3 returns 403 in several distinct scenarios:

**Bucket policy does not allow public reads:**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-bucket/*"
    }
  ]
}
```

**CloudFront with Origin Access Control (OAC) — bucket not granting access to CloudFront:**

When using CloudFront in front of a private S3 bucket, the bucket policy must explicitly grant the CloudFront distribution access. The AWS Console generates this policy automatically when you configure OAC — use it as a base:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipal",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-bucket/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::123456789012:distribution/EDFDVBD6EXAMPLE"
        }
      }
    }
  ]
}
```

**`s3:ListBucket` needed for "does this key exist?" checks:**

Without `s3:ListBucket`, attempts to access a non-existent key return 403 instead of 404. Grant `ListBucket` if you need to distinguish "missing object" from "access denied":

```json
{
  "Action": ["s3:GetObject", "s3:ListBucket"],
  "Resource": [
    "arn:aws:s3:::my-bucket/*",
    "arn:aws:s3:::my-bucket"
  ]
}
```

### Fix: WordPress 403 Forbidden

WordPress 403 errors are almost always caused by a security plugin, a hosting-level WAF, or a corrupted `.htaccess` file.

**Corrupted `.htaccess`** — rename the existing `.htaccess` to `.htaccess.bak`, then regenerate it from WordPress admin: Settings → Permalinks → Save Changes.

**Security plugin blocking the request** — temporarily deactivate all security plugins (Wordfence, iThemes Security, All-In-One WP Security) and retest. If the 403 disappears, re-enable plugins one by one to find the culprit, then adjust its rules.

**Hosting-level firewall** — contact your host. Many shared hosts run their own WAF. Provide the exact URL and time of the 403 so they can check their firewall logs.

## 403 in API Contexts: OAuth Scopes and Roles

A 403 from an API endpoint has a different character than a 403 from a web server. On an API, the request typically already carries an access token — authentication has succeeded. The 403 means the token does not carry the right to access that resource.

**Two common API 403 scenarios:**

1. **Missing OAuth scope** — the token was issued with `scope: read:profile` but the endpoint requires `scope: admin:reports`. The token is valid; it just was not issued with sufficient permissions.

2. **Insufficient role** — the authenticated user holds the `viewer` role, but the endpoint requires `editor` or `admin`.

**Diagnosing with the JWT debugger:**

If the API uses JWT access tokens, decode the token to inspect its `scope` and role claims. Use the [Authgear JWT Debugger](/tools/jwt-jwe-debugger) to paste the token and read the payload without sending it to a third-party service.

Look for:
- A `scope` claim — does it include the scope required by the failing endpoint?
- A `roles` claim or a custom claim like `https://authgear.com/claims/user/roles`
- Token expiry (`exp`) — an expired token returns 401, not 403, but worth checking

**Handling 401 vs 403 differently in your client code:**

```javascript
async function apiFetch(url, token) {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 401) {
    // Token is missing or expired — refresh and retry
    const newToken = await refreshAccessToken();
    return apiFetch(url, newToken);
  }

  if (response.status === 403) {
    // Token is valid but insufficient — do NOT retry with the same token
    // Show a "you don't have permission" UI instead
    throw new Error('insufficient_permission');
  }

  return response.json();
}
```

```python
import requests

def api_fetch(url: str, token: str) -> dict:
    response = requests.get(url, headers={"Authorization": f"Bearer {token}"})

    if response.status_code == 401:
        # Re-authenticate and retry
        new_token = refresh_access_token()
        return api_fetch(url, new_token)

    if response.status_code == 403:
        # Do not retry — the user lacks the required scope or role
        raise PermissionError(f"Access denied: {response.text}")

    response.raise_for_status()
    return response.json()
```

The key distinction: a 401 tells you to fix the token; a 403 tells you to fix the permissions or show the user a meaningful error.

**Common OAuth scope misconfigurations that cause API 403s:**

- Requesting a minimal scope at login (to reduce the consent screen) and then calling an endpoint that requires a broader scope
- Forgetting to include a scope when registering the OAuth client
- Using a machine-to-machine (client credentials) token that was not granted the required scope in the authorisation server configuration
- Assigning users to the wrong role in the identity provider before they attempt to access a resource

## Prevention Best Practices

**1. Set explicit, least-privilege file permissions from the start.** Do not rely on whatever permissions your deployment script creates. Add a post-deploy step that enforces `644` for files and `755` for directories, owned by the web server user.

**2. Handle 401 and 403 distinctly in your application.** A 401 should trigger a re-authentication flow. A 403 should show the user an "access denied" message and, where helpful, a path to request access. Treating both the same way (auto-retry) causes confusing UX and can lock users out.

**3. Test OAuth scopes at token issuance, not at the first API call.** If a user is going to need `admin:reports`, request that scope during login. Discovering missing scope mid-flow after a 403 forces an unnecessary re-authentication.

**4. Log authorisation failures with context.** A bare "403" in logs is hard to diagnose. Include the user ID, requested resource, required scope or role, and the user's actual roles. This turns a ten-minute debugging session into a thirty-second one.

**5. Review WAF and firewall rules after infrastructure changes.** IP ranges change when you deploy new services. A WAF allowlist that was correct six months ago may now be blocking legitimate internal services.

**6. Use security headers to prevent information leakage.** A server that returns 404 for resources it is concealing (rather than 403) avoids disclosing what protected paths exist — a deliberate security choice worth discussing with your team.

## 403 and Authentication Flows with Authgear

API-level 403 errors caused by missing OAuth scopes or insufficient roles are among the most preventable access control problems — and the most confusing when they happen in production.

Authgear's authorisation policies let you define scope requirements and role-based access controls centrally, so the token issued at login already carries the correct claims for the user's role. When the access token reaches your API, a `403` due to a missing scope means something in the token issuance flow is misconfigured — not that your API code is wrong.

If you are hitting 403s caused by OAuth scope or role mismatches in your app, the [Authgear JWT Debugger](/tools/jwt-jwe-debugger) lets you inspect the token payload immediately. For a deeper look at how 401 relates to token validation flows, see the [JWT authentication guide](/post/nextjs-jwt-authentication). For the server-side picture of how proxies and gateways can cause related access errors, see [HTTP 502 Bad Gateway](/post/http-502-bad-gateway).

## Frequently Asked Questions

### What does 403 Forbidden mean?

A 403 Forbidden status code means the server understood your request but refuses to fulfil it. The server knows the resource exists and understood the request, but has decided not to serve it — based on file permissions, an access rule, an IP block, or an OAuth policy.

### What is the difference between 401 and 403?

A 401 Unauthorized means the request lacks valid authentication credentials — the server is asking you to log in. A 403 Forbidden means the server recognised you (or the request is already authenticated) but you do not have permission to access the resource. Re-authenticating will not fix a 403 the way it fixes a 401.

### How do I fix a 403 Forbidden error?

The fix depends on the cause. For file permission issues on Linux: `chmod 644` for files and `chmod 755` for directories. For Nginx with no index file: add `index.html` or configure `try_files` correctly. For Apache: check `.htaccess` for `Deny` directives. For Cloudflare: review Firewall Rules and IP Access Rules in the Security Events log. For AWS S3: check the bucket policy and ensure `s3:GetObject` is allowed. For API 403s: inspect the OAuth token's `scope` claim and ensure the user has the required role.

### Why am I getting a 403 Forbidden on Nginx?

The most common causes are: the web root directory or file has restrictive permissions (not readable by the `nginx` user), there is no `index.html` or `index.php` in the directory and `autoindex` is off, or a `location` block contains an explicit `deny all` rule. Check `/var/log/nginx/error.log` for the specific error message — Nginx always logs the reason.

### Why am I getting a 403 Forbidden on Cloudflare?

Cloudflare returns a 403 when one of its security rules blocks your request. Common causes: your IP is on a block list, a Firewall Rule or WAF managed rule matched your request, Bot Fight Mode flagged your client, or a country-block rule is in effect. Check the Security Events log in your Cloudflare dashboard to see exactly which rule fired.

### Can a 403 be caused by an OAuth scope error?

Yes. In API contexts, a 403 frequently means the access token is valid but lacks a required OAuth scope, or the authenticated user does not have the role needed for that resource. The fix is not to re-authenticate — it is to request the correct scope or to assign the user the right role. Inspect the token's `scope` claim using a tool like the [Authgear JWT Debugger](/tools/jwt-jwe-debugger) to diagnose this.

### Is 403 Forbidden a client or server error?

403 is a 4xx client error, meaning the issue originates with the request rather than a server malfunction. However, the root cause is often a server misconfiguration (wrong file permissions, incorrect access rules) rather than anything the end user did wrong. Think of it as: the server is working correctly and has been configured to refuse this specific request.

### What is the difference between 403 and 404?

A 403 means the server knows the resource exists but refuses to serve it to you. A 404 means the server cannot find the resource (or is deliberately hiding its existence). From a security standpoint, servers sometimes return 404 instead of 403 to avoid disclosing that a restricted resource exists at all.

### How do I bypass 403 Forbidden?

You do not bypass a 403 — you fix the underlying authorisation issue. If you own the server, correct the permissions, access rules, or OAuth scope configuration. If you are a user hitting a third-party site, a 403 means you genuinely do not have access to that resource. Attempting to circumvent it without authorisation is a violation of the site's terms and potentially unlawful.

## Summary

A 403 Forbidden always means an authorisation problem, not a network failure or a missing resource. The layer responsible varies: it could be Linux file permissions, a web server access rule, a Cloudflare firewall rule, an S3 bucket policy, or an OAuth scope misconfiguration. Check the response body and headers first to identify the layer, then go to that layer's logs for the specific reason. The `curl -v` and log snippets above will get you to the root cause quickly in most cases. For API 403s caused by missing OAuth scopes, the approach is different — decode the token, verify the claims, and fix the scope at authorisation time rather than retrying the same request.
