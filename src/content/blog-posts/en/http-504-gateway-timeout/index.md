---
title: "HTTP 504 Gateway Timeout: What It Means and How to Fix It"
excerpt: "A 504 Gateway Timeout means a proxy waited too long for a response from the upstream server. Here is what causes it, how it differs from 502, and how to fix it on Nginx, Cloudflare, and AWS."
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "HTTP 504 Gateway Timeout: Causes & Fixes (Nginx, Cloudflare, AWS) | Authgear"
metaDescription: "504 Gateway Timeout: your proxy waited too long for the upstream. Learn the causes, how it differs from 502, and how to fix it on Nginx, Cloudflare, AWS."
publishedAt: 2026-05-06T00:00:00.000Z
updatedAt: 2026-05-06T00:00:00.000Z
draft: false
faq:
  - q: "What does 504 Gateway Timeout mean?"
    a: "A 504 Gateway Timeout means a server acting as a proxy or gateway (such as Nginx, Cloudflare, or an AWS load balancer) forwarded a request to an upstream server but did not receive a response within its configured timeout window. The proxy gave up waiting and returned 504 to the client. The upstream server is reachable — it just did not respond in time."
  - q: "What is the difference between 502 and 504?"
    a: "Both errors involve a proxy failing to relay a response from an upstream server. The distinction is what went wrong: a 502 Bad Gateway means the upstream responded with something invalid or refused the connection entirely. A 504 Gateway Timeout means the upstream was reachable but took longer than the proxy's timeout to send a response. In both cases the problem is in the upstream, not the client."
  - q: "How do I fix a 504 Gateway Timeout error?"
    a: "Start by checking your upstream application logs for slow queries, hangs, or exceptions. Use 'curl -w \"%{time_starttransfer}\\n\"' to measure how long the server takes to respond. Most 504s are caused by a slow database query, an N+1 query, or a long-running computation that should be moved to a background job. Raising the proxy timeout is a temporary measure — not the real fix."
  - q: "Why does Cloudflare return a 504 or 524?"
    a: "Cloudflare distinguishes between two timeout errors: 524 (A Timeout Occurred) is a Cloudflare-specific status code returned when your origin server accepts the TCP connection but does not send an HTTP response within 120 seconds. A standard 504 from Cloudflare indicates a timeout at an intermediate layer between Cloudflare and your origin. On Free, Pro, and Business plans the 120-second timeout cannot be raised — Enterprise customers can extend it up to 6,000 seconds. The fix is to make your origin respond faster, or return a 202 Accepted immediately and move the slow work to a background queue."
  - q: "Is 504 a client or server error?"
    a: "A 504 is a server-side error. The 5xx range always means the server (or infrastructure between the client and the server) is responsible. The client sent a valid request; the problem is that the upstream application took too long to respond. There is nothing the client can do to fix it."
  - q: "How long is the default Nginx proxy_read_timeout?"
    a: "Nginx's default proxy_read_timeout is 60 seconds. This is the maximum time Nginx will wait between successive read operations from the upstream — not the total time for the entire request. If your upstream does not send any response data within 60 seconds, Nginx returns a 504 to the client."
  - q: "What causes a 504 on Vercel or Netlify?"
    a: "With Fluid Compute enabled (the default), Vercel functions run up to 300 seconds on Hobby and up to 800 seconds on Pro and Enterprise. Netlify synchronous functions have a 10-second limit (26 seconds on paid plans); streaming functions have a 10-second limit on all plans. If a function exceeds its limit — due to a slow database query, an external API call, or a cold start — the platform terminates it and returns a 504. Move slow work to background jobs or use streaming responses rather than raising the limit."
  - q: "Does increasing the timeout actually fix the underlying problem?"
    a: "No. Raising proxy_read_timeout or an equivalent timeout only gives the slow upstream more time to finish. It does not make the upstream any faster. A slow database query will still be slow; an external API will still be unresponsive. The real fix is to find why the upstream is slow — profile the slow endpoint, add indexes, move long-running work to a background queue — and then set timeouts that reflect realistic performance expectations."
  - q: "How do I check if a 504 is coming from the proxy or from my app?"
    a: "Check the proxy error log. For Nginx, look for 'upstream timed out (110: Connection timed out)' in /var/log/nginx/error.log — this confirms the 504 originated at Nginx, not the application. You can also measure TTFB (Time to First Byte) in browser DevTools: if TTFB equals the proxy timeout (e.g., exactly 60 seconds), the proxy fired the timeout. If TTFB is shorter, the application itself may be returning an error that the proxy is surfacing as 504."
  - q: "What is the difference between AWS ALB target response timeout and idle timeout?"
    a: "These are two separate settings. The target response timeout (default 60 seconds on ALB target groups) is how long the ALB waits for the target (your app) to begin sending a response after it receives the request. The connection idle timeout (default 60 seconds on the load balancer level) is how long the ALB keeps an idle connection open with no data flowing. A 504 is usually the target response timeout firing — the ALB never got a response from the target within the window."
---

A **504 Gateway Timeout** error — sometimes shown simply as a "504 error" — means the server acting as a proxy or gateway forwarded a request upstream but never got a response back in time. The proxy — Nginx, Cloudflare, an AWS load balancer — was perfectly functional. What failed was the application server behind it, which took too long to reply.

> **tl;dr** — A 504 Gateway Timeout means a proxy server (Nginx, Cloudflare, AWS ALB, Vercel) waited too long for the upstream application to respond and gave up. Unlike 502 (which means "the upstream responded with garbage or refused the connection"), 504 means "the upstream did not respond in time." The fix is almost never just raising the timeout — it is finding why the upstream is slow.

For developers, the practical question is always the same: why is the upstream taking so long? Nine times out of ten the answer is a slow database query, an N+1 query pattern, or a long-running computation that should have been a background job.

## What Is HTTP 504 Gateway Timeout?

The HTTP 504 status code is defined in [RFC 9110](https://httpwg.org/specs/rfc9110.html#status.504) as:

<blockquote><p>"The 504 (Gateway Timeout) status code indicates that the server, while acting as a gateway or proxy, did not receive a timely response from an upstream server it needed to access in order to complete the request."</p></blockquote>

Three terms are worth defining clearly:

- **Gateway / Proxy** — the middleman server. In most production setups this is Nginx, Apache with `mod_proxy`, Cloudflare, an AWS Application Load Balancer, Traefik, or a Vercel/Netlify edge node.
- **Upstream** — your actual application server: Node.js, Django, Rails, a Lambda function, a Docker container. The "thing behind the proxy."
- **Timely response** — a response delivered within the proxy's configured timeout window. The upstream does not need to crash or return garbage to trigger a 504; simply taking too long is enough.

The 504 status code is in the 5xx range, which means it is always a server-side problem. There is nothing the client can do to fix it.

## 502 vs 504: The Crucial Difference

Both errors involve a proxy and a failing upstream, so they are easy to confuse. The key distinction is *what went wrong*:

<div class='ag-table-wrap'><table class='ag-table'>
<thead>
<tr><th>Status</th><th>What the proxy saw</th><th>Most common cause</th><th>First thing to check</th></tr>
</thead>
<tbody>
<tr><td><strong>502 Bad Gateway</strong></td><td>Upstream refused the connection, closed it unexpectedly, or returned a malformed response</td><td>App crashed, wrong port, TLS handshake failure</td><td>Is the upstream process running? Check <code>systemctl status</code> or <code>pm2 status</code></td></tr>
<tr><td><strong>504 Gateway Timeout</strong></td><td>Upstream was reachable but did not respond within the timeout window</td><td>Slow database query, heavy computation, external API hang</td><td>Check upstream logs for slow queries or hung requests</td></tr>
</tbody>
</table></div>

The instinct when you see either error is often "raise the timeout." That instinct is almost always wrong. Raising `proxy_read_timeout` gives a slow upstream more time to finish — it does not make the upstream faster. The right move is to find out *why* the upstream is slow and fix that.

## How HTTP Proxies and Timeouts Work

The request chain in a typical production app looks like this:

```
Client → Proxy (Nginx / Cloudflare / AWS ALB) → Upstream (your app)
              ↑
              proxy_read_timeout starts the moment the proxy
              forwards the request and ends when it receives the
              first byte of the response.
```

Each layer in this chain has its own timeout setting. When that window expires before the upstream responds, the proxy terminates the connection and returns 504.

Default timeout values by platform:

| Platform | Setting | Default |
|---|---|---|
| Nginx | `proxy_read_timeout` | 60 seconds |
| Apache | `ProxyTimeout` | 60 seconds |
| Cloudflare | 524 origin timeout | 120 seconds (configurable on Enterprise only) |
| AWS ALB | Target response timeout | 60 seconds |
| Vercel | Function max duration (Hobby) | 300 seconds (Fluid Compute default) |
| Vercel | Function max duration (Pro/Enterprise) | 800 seconds max |
| Netlify | Synchronous function | 10 seconds (26 seconds on paid plans) |

Note that Nginx's `proxy_read_timeout` is not the total request time — it is the maximum gap between successive read operations. A streaming response that sends data every 30 seconds will never trigger a 60-second `proxy_read_timeout`, even if the full response takes 10 minutes.

## Common Causes of HTTP 504 Gateway Timeout

### 1. Slow database query

The single most common cause of 504s in real applications. A query that returns in 20ms at low volume may take 90 seconds under load when indexes are missing or table statistics are stale.

### 2. N+1 query pattern

An endpoint that loops through 500 records and executes one query per record will take 500x longer than it should. At small data sizes it is invisible; at production scale it reliably triggers timeouts.

### 3. Long-running computation that should be a background job

PDF generation, image processing, sending bulk emails, building large reports — these operations do not belong in synchronous HTTP handlers. They should be queued and run in a worker process, with the HTTP response returning a job ID or status URL.

### 4. Upstream service outage or rolling restart

If your upstream is a microservice or external API, a brief outage, deployment, or rolling restart can cause a wave of 504s while in-flight requests hit the restarting instances.

### 5. Cold start of a serverless function

Vercel, AWS Lambda, and similar platforms spin up fresh function instances on demand. The first request after a period of inactivity pays a cold-start penalty that can be several seconds. On tight timeout limits, a cold start alone can trigger a 504.

### 6. DNS resolution issue between proxy and upstream

Nginx resolves upstream hostnames at startup and caches the result. If the upstream's IP changes (common in containerised environments), Nginx will keep attempting to connect to the old IP and time out.

### 7. TLS handshake timeout

When the proxy connects to the upstream over HTTPS, a broken or misconfigured certificate on the upstream causes the TLS handshake to hang. A missing intermediate certificate is a common culprit — see [SSL Certificate Chain: What It Is and How to Fix It](/post/ssl-certificate-chain) for how to diagnose this.

### 8. Upstream connection pool exhausted

The upstream application has a limited pool of database connections or worker threads. Under load, requests queue while waiting for a free slot. If the queue grows faster than it drains, requests time out.

### 9. Microservice cascade

In a microservices architecture, one slow downstream service can block the entire request chain. Service A calls Service B which calls Service C, and a slow C causes A to return 504 to the original client.

## How to Diagnose a 504 Gateway Timeout

Work through these steps in order.

### Step 1: Measure the upstream response time directly

Bypass the proxy and time the upstream directly with `curl`:

```bash
curl -w "\nDNS: %{time_namelookup}s | Connect: %{time_connect}s | TTFB: %{time_starttransfer}s | Total: %{time_total}s\n" \
     -o /dev/null -s http://127.0.0.1:3000/api/your-endpoint
```

If TTFB is close to your proxy timeout (e.g., ~60 seconds), the upstream is genuinely slow. If TTFB is fast, the problem may be intermittent or load-dependent.

### Step 2: Check the proxy error log

**Nginx** (`/var/log/nginx/error.log`):

```
2026/05/06 10:22:14 [error] 12345#12345: *1 upstream timed out (110: Connection timed out)
  while reading response header from upstream, ...
```

The phrase "upstream timed out" confirms Nginx fired the timeout — not your application crashing.

**Apache** (`/var/log/apache2/error.log`):

```
[error] (70007)The timeout specified has expired: proxy: read response body from remote ...
```

### Step 3: Check upstream application logs

Look for slow queries, exceptions, or requests that started but never completed:

```bash
# Node.js / PM2
pm2 logs --lines 100

# Systemd service
journalctl -u myapp.service -n 100 --no-pager
```

### Step 4: Check browser DevTools TTFB

Open DevTools → Network tab → click the failing request → Timing tab. If TTFB (Time to First Byte) equals your proxy timeout to the second (e.g., exactly 60.0s), the proxy fired the timeout. If TTFB is shorter, the app may be returning an error that is being surfaced as 504.

### Step 5: For AWS, check CloudWatch

Look at the **TargetResponseTime** metric on your ALB target group. This shows the latency distribution from the load balancer's perspective. A p99 close to your timeout setting is a strong signal that your application is regularly slow, not occasionally.

## How to Fix HTTP 504 Gateway Timeout

### Fix: Nginx 504 Gateway Timeout

The core timeout settings in Nginx:

```nginx
upstream app {
    server 127.0.0.1:3000;
}

server {
    location / {
        proxy_pass http://app;

        # How long to wait for the upstream to send the first byte
        proxy_read_timeout 60s;

        # How long to wait for the upstream to accept the connection
        proxy_connect_timeout 10s;

        # How long to wait for the upstream to accept data being sent
        proxy_send_timeout 60s;
    }
}
```

If you must raise `proxy_read_timeout` temporarily to stop the bleeding:

```nginx
proxy_read_timeout 120s;
```

Reload after any change:

```bash
nginx -t && systemctl reload nginx
```

**Important**: raising `proxy_read_timeout` is a band-aid. It gives the slow upstream more time to finish — it does not make it faster. Use this only while you investigate the root cause.

### Fix: Apache 504 Gateway Timeout

For Apache with `mod_proxy`, set `ProxyTimeout` (backend wait) inside your `<VirtualHost>`:

```apache
ProxyTimeout 60
```

Reload with `systemctl reload apache2`. As with Nginx, raising this number is a workaround — fix the slow upstream first.

### Fix: Cloudflare 524 / 504 Timeout

When your origin accepts Cloudflare's connection but does not send an HTTP response within 120 seconds, Cloudflare returns a **524 (A Timeout Occurred)** — a Cloudflare-specific status code, not a standard HTTP one. A standard 504 from Cloudflare is rarer and typically indicates a timeout at an intermediate hop between Cloudflare and your origin rather than at the origin itself.

On Free, Pro, and Business plans, the 120-second origin timeout cannot be raised. Enterprise customers can extend it up to 6,000 seconds via Cache Rules or the API.

If your origin takes longer than 120 seconds to respond:

1. **Make the origin faster.** Profile the slow endpoint and fix the root cause (see the slow query section below).
2. **Move the operation to a background job.** Return `202 Accepted` immediately with a `Location` header pointing to a status-polling endpoint. Run the work in a worker process and surface the result when it is ready.
3. **Stream the response.** Start sending response bytes early (e.g., send HTTP headers and a loading indicator immediately) to reset Cloudflare's idle timeout while work continues.

For diagnosing 524s, check your Cloudflare dashboard under Analytics → Traffic → Error analytics to see whether the errors are clustered at a particular time or endpoint.

### Fix: AWS ALB 504

AWS ALB has two separate timeout settings that are often confused:

- **Target response timeout** (target group setting) — how long the ALB waits for the target to begin responding. Default: 60 seconds.
- **Connection idle timeout** (load balancer setting) — how long the ALB keeps an idle connection open. Default: 60 seconds.

A 504 from ALB is almost always the target response timeout. The AWS Console exposes this under EC2 → Target Groups → your target group → Attributes → **Target response timeout** (default 60 seconds, maximum 3600 seconds).

To check your current target response time, look at the **TargetResponseTime** CloudWatch metric on the target group — specifically p95 and p99. If those percentiles are close to 60 seconds, your application is genuinely slow, not occasionally slow.

To update the idle timeout at the load balancer level via the AWS CLI (note: target response timeout is configured per target group in the Console):

```bash
aws elbv2 modify-load-balancer-attributes \
  --load-balancer-arn arn:aws:elasticloadbalancing:us-east-1:123456789:loadbalancer/app/my-alb/abc123 \
  --attributes Key=idle_timeout.timeout_seconds,Value=120
```

As always: raising a timeout is a workaround. Diagnose first, then set the limit to reflect what your application should realistically achieve.

### Fix: Vercel / Netlify Serverless 504

Serverless platforms enforce execution time limits, but the numbers have changed significantly with Vercel's Fluid Compute model (enabled by default):

| Platform | Plan | Limit |
|---|---|---|
| Vercel | Hobby | 300 seconds default and maximum |
| Vercel | Pro | 300 seconds default, 800 seconds maximum |
| Vercel | Enterprise | 300 seconds default, 800 seconds maximum |
| Netlify | Free | 10 seconds |
| Netlify | Paid | 26 seconds (synchronous); 10 seconds for streaming |

If your function is hitting these limits:

1. **Stream the response.** For Next.js API routes: use `Response` streaming or `ReadableStream` to send bytes early and keep the connection alive.
2. **Use `waitUntil()` for background work.** On Vercel, `waitUntil(promise)` lets you continue work after the response is sent. Useful for analytics or logging, not for user-facing results.
3. **Move the slow operation to a proper background queue.** Return a job ID immediately; poll or use a webhook to surface results.

Check the platform's function logs (Vercel: Project → Deployments → Functions tab) to confirm the function is actually timing out rather than throwing an unhandled exception.

### Fix: Slow Database Query (the real fix)

Most 504s trace back here. Finding and fixing slow queries is almost always more valuable than adjusting any timeout.

**Find slow queries in PostgreSQL:**

```sql
-- Enable slow query logging (if not already on)
ALTER SYSTEM SET log_min_duration_statement = '1000'; -- log queries > 1s
SELECT pg_reload_conf();

-- Check the log for slow queries
-- /var/log/postgresql/postgresql-*.log

-- Analyse a specific slow query
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT * FROM orders WHERE user_id = 12345 ORDER BY created_at DESC LIMIT 20;
```

Look for `Seq Scan` on large tables — that is often where the time goes.

**Find slow queries in MySQL:**

```bash
# Show currently running queries
mysqladmin -u root -p processlist

# Find slow queries via mysqldumpslow
mysqldumpslow -s t -t 10 /var/log/mysql/mysql-slow.log
```

**Add an index (PostgreSQL):**

```sql
-- CONCURRENTLY builds the index without locking the table
CREATE INDEX CONCURRENTLY idx_orders_user_created
  ON orders (user_id, created_at DESC);
```

`CONCURRENTLY` is PostgreSQL-only. In MySQL, use `ALTER TABLE ... ADD INDEX` — MySQL 5.6+ builds secondary indexes online by default and does not block reads, but it does not support the `CONCURRENTLY` keyword.

**Move analytic queries to a read replica or a background job:**

If the query is an aggregate or report that cannot be made fast enough for a real-time response, move it to a scheduled background job that stores its result in a fast-read table. The HTTP endpoint reads the cached result instead of running the query.

## When to Raise the Timeout vs Fix the Upstream

There are legitimate cases for raising the timeout — and many illegitimate ones.

**Raise the timeout if:**
- The operation is genuinely long-running and there is no technical way to background it (for example, a one-off database migration triggered from an admin UI).
- The upstream is a third-party API that is known to be slow, and you have no control over it.
- You need a short-term workaround to restore service while you investigate the root cause.

**Fix the upstream instead if:**
- The endpoint is slow due to a database query, a loop, or an external API call that *can* be optimised. This is the case 90% of the time.
- The slowness is intermittent or load-dependent (a sign of resource contention, not inherent complexity).

**Move it to a background queue if:**
- The operation routinely takes more than 10 seconds.
- The user does not need the result immediately.
- Pattern: return `202 Accepted` with a `{"jobId": "..."}` body, run the work in a worker, expose a `GET /jobs/{id}` endpoint for status polling, and optionally push a webhook when done.

```javascript
// Return immediately
app.post('/api/reports/generate', async (req, res) => {
  const jobId = await queue.enqueue('generate-report', req.body);
  res.status(202).json({ jobId, statusUrl: `/api/jobs/${jobId}` });
});

// Client polls
app.get('/api/jobs/:id', async (req, res) => {
  const job = await queue.getStatus(req.params.id);
  res.json({ status: job.status, result: job.result ?? null });
});
```

## Prevention Best Practices

- **Set explicit timeouts everywhere.** Do not rely on proxy defaults. Define `proxy_read_timeout`, `proxy_connect_timeout`, and `proxy_send_timeout` in Nginx; `ProxyTimeout` in Apache; target response timeout in ALB. Explicit values make your system's behaviour predictable.
- **Monitor p95/p99 latency at every hop.** Alert on slow percentiles before they reach the timeout threshold. A p99 of 45 seconds when your timeout is 60 is a warning sign, not a green light.
- **Use circuit breakers in microservices.** A circuit breaker (e.g., via [Resilience4j](https://resilience4j.readme.io/docs/circuitbreaker) or a service mesh like Istio) stops requests from piling up against a failing downstream service and returns a controlled fallback, preventing cascading 504s.
- **Move slow operations to background jobs by design.** Audit endpoints that regularly take more than 2 seconds and ask whether they belong in a synchronous request at all.

## 504 and Authentication Flows

Authentication backends — whether Authgear, Auth0, Okta, or a self-hosted identity server — are often proxied behind Nginx or a load balancer. A brief 504 on the auth backend blocks every single login, even if the rest of your application is healthy.

Endpoints most likely to be affected:

- `/oauth/token` — token exchange during login
- `/oauth/authorize` — the start of the OAuth flow
- `/.well-known/openid-configuration` — the discovery document, fetched by OIDC clients at startup

Mitigations specific to auth flows:

1. **Cache the discovery document client-side.** The `.well-known/openid-configuration` document changes rarely. Caching it for 24 hours means a brief auth-backend 504 does not break OIDC discovery for every new client instance. See [What Is .well-known/openid-configuration?](/post/well-known-openid-configuration) for details.
2. **Set a generous-but-bounded timeout for auth-server requests.** A 2–5 second timeout for `/oauth/token` is reasonable. Tighter than that and transient slowness causes false failures; looser than that and login hangs visibly.
3. **Fail gracefully.** Do not show users a generic "504 Gateway Timeout" page during a login flow. Show a user-friendly message ("Sign-in is temporarily unavailable — please try again in a moment") with a retry button. [Authgear](/)'s hosted login pages handle this gracefully by design, but custom login UIs need to handle timeout errors explicitly.

For developers building authentication with Authgear: the Authgear platform is designed to run reliably in proxied environments, but your Nginx or load balancer configuration must still have correct timeout values pointing to Authgear's endpoints. See [HTTP 401 Unauthorized](/post/http-401-unauthorized) and [HTTP 403 Forbidden](/post/http-403-forbidden) for the auth-specific errors that appear once connectivity is restored.

## Frequently Asked Questions

### What does 504 Gateway Timeout mean?

A 504 Gateway Timeout means a proxy or gateway server forwarded a request to an upstream application but did not receive a response within the configured timeout window. The proxy terminated the connection and returned 504 to the client. The upstream was reachable — it just did not respond in time.

### What is the difference between 502 and 504?

A [502 Bad Gateway](/post/http-502-bad-gateway) means the upstream responded with something invalid, refused the connection, or was not running at all. A 504 Gateway Timeout means the upstream was reachable but took longer than the proxy's timeout to respond. Both are server-side errors; neither is caused by the client.

### How do I fix a 504 Gateway Timeout error?

Check your upstream application logs for slow queries or exceptions. Measure the upstream response time directly with `curl -w "%{time_starttransfer}"`. Most 504s are caused by a slow database query, an N+1 pattern, or a long-running computation. Fix the root cause; only raise the proxy timeout as a temporary workaround.

### Why does Cloudflare return a 524 (or 504)?

When your origin accepts Cloudflare's connection but does not send an HTTP response within 120 seconds, Cloudflare returns **524 (A Timeout Occurred)** — a Cloudflare-specific code. A standard 504 from Cloudflare is less common and indicates a timeout at an intermediate layer between Cloudflare and your origin. On Free, Pro, and Business plans the 120-second limit cannot be raised. The fix is to make your origin respond faster, or return a `202 Accepted` immediately and move the slow work to a background queue.

### Is 504 a client or server error?

It is a server error. All 5xx status codes indicate the server — or the infrastructure between the client and the server — is responsible. The client sent a valid request; the server infrastructure failed to respond in time.

### How long is the default Nginx proxy_read_timeout?

The default is 60 seconds. This is the maximum time Nginx will wait between two successive read operations from the upstream — not the total request time. If your upstream sends at least one byte within 60 seconds, the timeout resets.

### What causes a 504 on Vercel or Netlify?

With Fluid Compute enabled (Vercel's default), Vercel functions can run up to 300 seconds on Hobby and up to 800 seconds on Pro and Enterprise — far higher than the older 10s/60s limits. Netlify synchronous functions have a 10-second limit on free plans and 26 seconds on paid plans. If a function hits its limit due to a slow database query, cold start, or external API call, the platform terminates it and returns a 504. Move slow operations to background jobs rather than relying on the maximum duration.

### Does increasing the timeout fix the underlying problem?

No. Raising the timeout gives the slow upstream more time — it does not make it faster. A slow database query will still be slow. The right fix is to profile the upstream, find what is taking too long, and address that directly. Use timeout changes only as a temporary measure while you investigate.

## Summary

A 504 Gateway Timeout tells you one thing with certainty: the upstream took too long. Everything else — which upstream, why it was slow, and how to fix it — requires investigation. Start with the upstream logs, measure response time directly with `curl`, and check for slow queries before touching any timeout settings. Raising `proxy_read_timeout` or an equivalent is almost never the real fix; it is a pause button. The real fix is making the upstream faster — or moving the slow operation out of the synchronous request path entirely.
