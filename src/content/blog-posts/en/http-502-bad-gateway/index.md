---
title: "HTTP 502 Bad Gateway: What It Means and How to Fix It"
excerpt: "A 502 Bad Gateway error means the server acting as a gateway or proxy received an invalid response from an upstream server. Here is what causes it and how to fix it."
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "HTTP 502 Bad Gateway: Causes & Fixes | Authgear"
metaDescription: "A 502 Bad Gateway error means your proxy couldn't reach the upstream server. Learn what causes it, how to diagnose it, and how to fix it fast."
publishedAt: 2026-03-13T22:25:51.671Z
updatedAt: 2026-05-05T00:00:00.000Z
draft: false
faq:
  - q: "What does HTTP 502 Bad Gateway mean?"
    a: "A 502 Bad Gateway error means a server acting as a gateway or proxy (such as Nginx, Apache, Cloudflare, or an AWS load balancer) received an invalid response — or no response at all — from the upstream application server. The proxy is working; the upstream behind it is what failed."
  - q: "How do I fix a 502 Bad Gateway error?"
    a: "Start by checking that your upstream application server is running and listening on the configured port. Then check the proxy's error log for the underlying cause (connection refused, upstream timed out, no live upstreams). The three most common fixes are: restart the crashed app, correct a wrong port or socket path in the proxy config, or raise proxy_read_timeout if the backend is slow."
  - q: "What is the difference between 502 and 504?"
    a: "Both involve a proxy failing to relay a response. A 502 means the upstream returned an invalid response or refused the connection. A 504 means the upstream was reachable but took longer than the proxy's timeout to respond."
  - q: "Can a client cause a 502 error?"
    a: "No. A 502 is always a server-side problem. The client sent a valid request; something between the proxy and the upstream application failed. Client behaviour (like a slow upload) can trigger conditions that cause a 502, but the root cause and the fix are on the server."
  - q: "Why do I see 502 errors only under heavy load?"
    a: "This usually means the upstream is running out of capacity — no available workers, exhausted connection pool, or CPU/memory pressure. The upstream is alive at normal load but overwhelmed at peak. Profile the slow endpoint, scale horizontally, or add request queuing."
  - q: "Does Cloudflare cache 502 errors?"
    a: "By default Cloudflare does not cache 5xx responses, but a custom Page Rule or Cache Rule can override this. If 502s persist after the origin recovers, check your Cloudflare cache configuration."
  - q: "How can I tell if a 502 came from Nginx or my application?"
    a: "Check the Server response header (Nginx returns Server: nginx). Use curl -v and inspect the response headers to identify which layer in your stack returned the error. For multi-layer setups, add a custom X-Proxy-ID header in each proxy config to make the source unambiguous."
  - q: "How do I fix a 502 on Kubernetes?"
    a: "A 502 from a Kubernetes Ingress usually means the Service has no ready Pod endpoints. Check kubectl get pods (CrashLoopBackOff or NotReady), the Service's EndpointSlice (kubectl get endpointslice), and that the Pod's containerPort matches the Service's targetPort. Readiness probe failures will quietly remove a Pod from the load balancer."
---

A **502 Bad Gateway** error means the server acting as a gateway or proxy received an invalid response — or no response at all — from the upstream server it was trying to reach. The proxy is up and running; the problem is what lies behind it.

> **tl;dr** — A 502 means your reverse proxy (Nginx, Apache, Cloudflare, AWS ALB) could not get a valid response from your upstream application server. Nine times out of ten the cause is one of three things: the upstream process has crashed, the proxy is pointing at the wrong port or socket, or `proxy_read_timeout` is shorter than how long the backend takes to respond.

For developers, a 502 is a mid-tier headache: it is not a client mistake (that would be a 4xx), and it is not a catch-all server crash (that would be a 500). It tells you something specific: the gateway could not talk to the backend. That narrows down where to look.

## What Is a 502 Bad Gateway Error?

The HTTP 502 status code is defined in [RFC 9110](https://httpwg.org/specs/rfc9110.html#status.502) as:

<blockquote><p>"The server, while acting as a gateway or proxy, received an invalid response from an inbound server it accessed while attempting to fulfill the request."</p></blockquote>

In plain terms: your Nginx, Apache, Cloudflare, or load balancer tried to forward the request to your application server, got back garbage (or nothing), and returned 502 to the client.

The "gateway" in the error is always the middleman — not your backend application. The backend is what actually failed.

## How HTTP Proxies and Gateways Work

To understand 502, you need a clear picture of the request chain:

```
Client (browser)
    → Reverse proxy / CDN / load balancer  ← this is the "gateway"
        → Upstream application server       ← this is what failed
```

The proxy's job is to forward the request and relay the response. If the upstream server:

<ul>
<li>Does not respond within the proxy's timeout window</li>
<li>Closes the connection unexpectedly</li>
<li>Returns a malformed HTTP response</li>
<li>Is not running at all</li>
</ul>

...the proxy has nothing valid to relay. It returns 502.

Common "gateways" in production setups: Nginx, Apache with `mod_proxy`, AWS ALB/NLB, Cloudflare, Fastly, HAProxy, Traefik.

## Common Causes of a 502 Bad Gateway

### 1. Upstream server is down

The application server (Node.js, Django, Rails, PHP-FPM, etc.) has crashed or was never started. The proxy cannot connect to the configured port.

### 2. Upstream server timeout

The backend is running but taking too long to respond — longer than the proxy's `proxy_read_timeout` or equivalent. The proxy gives up and returns 502.

### 3. Misconfigured proxy

The proxy is pointing at the wrong host, port, or socket path. A typo in `proxy_pass` or `ProxyPass` will reliably produce 502s.

### 4. Load balancer: all backends unhealthy

When all nodes behind a load balancer fail their health checks simultaneously, the load balancer has no healthy target to route to. Result: 502.

### 5. DNS resolution failure

If the proxy resolves the upstream hostname at startup (Nginx does this by default) and the hostname changes or becomes unreachable, the proxy may cache the stale address and fail to connect.

### 6. TLS handshake failure between proxy and upstream

When the proxy connects to the upstream over HTTPS (common in microservices), a certificate mismatch or expired cert on the upstream side causes the handshake to fail, which the proxy reports as 502. A particularly sneaky variant: the upstream's [SSL certificate chain](/post/ssl-certificate-chain) is broken (a missing intermediate certificate) — desktop browsers may still work because they cache intermediates from previous sites, but proxies and API clients reject the connection outright. Use the [Authgear SSL Checker](/tools/ssl-checker) to verify your upstream certificates.

### 7. Resource exhaustion on the upstream

The upstream server is alive but has no available workers, threads, or file descriptors left. Connections are accepted but hang, triggering proxy timeouts.

## How to Diagnose a 502 Bad Gateway

Work through these steps in order. Each one narrows the problem.

### Step 1: Check the error in your browser

Open DevTools (F12) → Network tab. Reload the failing request. Look at:

<ul>
<li>The response status (confirm it is actually 502, not something cached)</li>
<li>The <code>Server</code> response header (tells you which proxy returned it)</li>
<li>The <code>X-Cache</code> or <code>CF-Cache-Status</code> header (tells you if a CDN is involved)</li>
</ul>

### Step 2: Reproduce with curl

```
curl -v https://your-domain.com/api/health
```

`-v` shows the full request/response exchange. A 502 here confirms it is not browser-specific. If you get a connection refused instead, the proxy itself may be down — a different problem.

Test the upstream directly (bypassing the proxy):

```
curl -v http://127.0.0.1:3000/api/health
```

If this succeeds but the proxied request fails, the problem is in the proxy layer.

### Step 3: Check upstream process status

```
# Node.js / PM2
pm2 status
pm2 logs --lines 50

# Systemd service
systemctl status myapp.service
journalctl -u myapp.service -n 100 --no-pager

# PHP-FPM
systemctl status php8.2-fpm
```

### Step 4: Check proxy error logs

**Nginx:**

```
tail -n 100 /var/log/nginx/error.log
```

Look for lines like:

```
connect() failed (111: Connection refused) while connecting to upstream
upstream timed out (110: Connection timed out)
no live upstreams while connecting to upstream
```

**Apache:**

```
tail -n 100 /var/log/apache2/error.log
```

### Step 5: Test DNS resolution

```
dig your-upstream-hostname A
nslookup your-upstream-hostname
```

Compare the resolved IP against what you expect. If the proxy caches a stale IP, you need to either restart the proxy or configure it to re-resolve periodically (see fixes below).

### Step 6: Check load balancer health

In AWS Console: EC2 → Load Balancers → your ALB → Target Groups → view target health status. Unhealthy targets with a 502 or "connection error" reason confirm the issue is at the backend.

## How to Fix a 502 Bad Gateway

### Fix: Nginx upstream not running or wrong port

Confirm the upstream is running on the configured port:

```
ss -tlnp | grep 3000
```

If nothing is listening, start your application. If it is on a different port, fix your Nginx config:

```
upstream app {
    server 127.0.0.1:3000;  # must match the port your app actually listens on
}

server {
    location / {
        proxy_pass http://app;
        proxy_read_timeout 60s;
        proxy_connect_timeout 10s;
        proxy_send_timeout 60s;
    }
}
```

Reload after changes:

```
nginx -t && systemctl reload nginx
```

### Fix: Nginx upstream timeout

If your backend is slow (long database queries, heavy computation), increase the timeout:

```
location / {
    proxy_pass http://app;
    proxy_read_timeout 120s;
    proxy_connect_timeout 15s;
}
```

Do not raise this indefinitely — it hides slow backend bugs. The better fix is to profile and optimise the slow endpoint, or move it to an async job.

### Fix: Apache ProxyPass misconfiguration

```
<VirtualHost *:443>
    ProxyPreserveHost On
    ProxyPass        / http://127.0.0.1:3000/
    ProxyPassReverse / http://127.0.0.1:3000/

    # Timeouts
    ProxyTimeout 60
</VirtualHost>
```

Enable the required modules if not already active:

```
a2enmod proxy proxy_http
systemctl reload apache2
```

### Fix: Node.js / Express behind a proxy

If your Express app is behind Nginx, make sure it is binding on the correct interface and port:

```
const express = require('express');
const app = express();

// Tell Express it is behind a trusted proxy
app.set('trust proxy', 1);

app.listen(3000, '127.0.0.1', () => {
  console.log('Server running on 127.0.0.1:3000');
});
```

Binding to `127.0.0.1` (loopback only) is correct for a proxied setup. Binding to `0.0.0.0` exposes the app port publicly, which is a security risk.

A common cause of 502 with PM2 is the app crashing on startup silently. Check:

```
pm2 logs app --lines 200
pm2 restart app && pm2 logs app --lines 50
```

### Fix: Cloudflare 502

Cloudflare returns a 502 when it cannot connect to your origin. Check:

<ol>
<li><strong>Origin server is running</strong> — SSH in and confirm your app is up.</li>
<li><strong>Origin firewall is not blocking Cloudflare IPs</strong> — allow <a href='https://www.cloudflare.com/ips/'>Cloudflare's IP ranges</a> on port 80/443.</li>
<li><strong>SSL mode</strong> — in Cloudflare dashboard, go to SSL/TLS. If your origin does not have a valid SSL cert, use "Flexible" mode, not "Full (strict)". A cert mismatch between Cloudflare and your origin causes 502. Verify your origin cert with the <a href='/tools/ssl-checker'>Authgear SSL Checker</a>.</li>
<li><strong>Origin response time</strong> — Cloudflare times out at 100 seconds. If your origin takes longer, you will see 524 (timeout), not 502. But very slow responses can also cause 502 in some configurations.</li>
</ol>

### Fix: Load balancer health checks (AWS ALB)

If targets are showing as unhealthy in your ALB target groups

1. Check the health check path returns 200. A health endpoint that itself errors causes all targets to be marked unhealthy.

2. Verify the health check port and protocol match what your app actually serves.

3. Check security group rules — the ALB must be allowed to reach the target on the health check port.

Example Terraform snippet to configure correct health check settings:

```
resource "aws_lb_target_group" "app" {
  name     = "app-tg"
  port     = 3000
  protocol = "HTTP"
  vpc_id   = var.vpc_id

  health_check {
    path                = "/health"
    healthy_threshold   = 2
    unhealthy_threshold = 3
    timeout             = 5
    interval            = 30
    matcher             = "200"
  }
}
```

### Fix: Kubernetes Ingress returns 502

A 502 from an Ingress controller (Nginx Ingress, Traefik, ALB Controller) almost always means the Service has no ready Pod endpoints to route to. Work through these:

```
# 1. Are the Pods running and ready?
kubectl get pods -l app=myapp
# Look for Running + READY 1/1, not CrashLoopBackOff or 0/1

# 2. Does the Service have endpoints?
kubectl get endpointslice -l kubernetes.io/service-name=myapp
# Empty addresses[] = no Pod is passing its readiness probe

# 3. Does the Service targetPort match the Pod containerPort?
kubectl describe svc myapp
kubectl describe pod <pod-name> | grep -A 2 Ports

# 4. Are readiness probes passing?
kubectl describe pod <pod-name> | grep -A 5 Readiness
```

Common causes:

- **Readiness probe path 404s.** The probe hits `/health` but the app only serves `/api/health`. Pod stays NotReady, gets pulled from the Service, Ingress has nothing to route to.
- **Wrong `targetPort`.** App listens on 8080, Service forwards to 3000. No connection ever lands on the app.
- **App binds to `127.0.0.1`** instead of `0.0.0.0`. The container port is unreachable from outside the Pod's loopback. Fix by binding to `0.0.0.0` inside the container.
- **Crash loop on startup.** Run `kubectl logs <pod-name> --previous` to see the last crash reason.

### Fix: Heroku H12 / H13 manifesting as 502

Heroku's router returns 503 by default for app-side failures, but reverse proxies in front of Heroku (Cloudflare, custom domains via a CDN) often surface them as 502.

- **H12 (request timeout)** — your dyno did not respond within 30 seconds. Either optimise the slow endpoint, move work to a background worker (`worker` dyno), or stream a partial response sooner.
- **H13 (connection closed without response)** — the dyno crashed mid-request. Check `heroku logs --tail` for the stack trace.
- **R14 (memory quota exceeded)** — dyno is being restarted. Upgrade the dyno tier or fix the leak.

### Fix: Vercel / Netlify Edge function 502

Serverless platforms return 502 (or `FUNCTION_INVOCATION_FAILED` / similar) when:

- The function exceeds the platform's execution timeout (10s default on Vercel Hobby, 60s on Pro for serverless functions).
- The function throws an unhandled exception. Always wrap async handlers in try/catch and return an explicit error response — uncaught rejections terminate the function with no useful response.
- The deployed bundle exceeds the size limit (250MB unzipped on Vercel). Trim dependencies; use `serverComponentsExternalPackages` for heavy native modules.

Check the platform's function logs (Vercel: Deployments → Functions → Logs) to see the actual error before guessing.

### Fix: Nginx DNS caching stale upstream

Nginx resolves upstream hostnames once at startup. If the upstream IP changes (common in container environments), Nginx will keep connecting to the old IP.

Fix: use a resolver and set the upstream as a variable so Nginx re-resolves it dynamically:

```
resolver 8.8.8.8 valid=30s;

server {
    location / {
        set $upstream http://my-service.internal:3000;
        proxy_pass $upstream;
    }
}
```

## 502 vs 503 vs 504: Quick Comparison

<div class='ag-table-wrap'><table>
<thead><tr><th>Status Code</th><th>Meaning</th><th>Who Is at Fault</th><th>Common Cause</th></tr></thead>
<tbody>
<tr><td><strong>502 Bad Gateway</strong></td><td>Proxy received an invalid/no response from upstream</td><td>Upstream server</td><td>App crashed, wrong port, bad response</td></tr>
<tr><td><strong>503 Service Unavailable</strong></td><td>Server is temporarily unable to handle requests</td><td>The server itself</td><td>Overloaded, in maintenance mode, rate limited</td></tr>
<tr><td><strong>504 Gateway Timeout</strong></td><td>Proxy timed out waiting for the upstream</td><td>Upstream server (slow)</td><td>Slow query, deadlock, heavy computation</td></tr>
</tbody>
</table></div>

**The key distinction between 502 and 504:** both involve a proxy and an upstream failure. 502 means the upstream sent back something invalid or refused the connection. 504 means the upstream was reachable but took too long.

## Prevention Best Practices

**1. Implement a health endpoint.** Every service should expose a `GET /health` that returns 200 when the service is ready. Use this for load balancer checks and readiness probes in Kubernetes.

**2. Set explicit proxy timeouts.** The default values in Nginx and Apache can be too long or too short for your use case. Set `proxy_connect_timeout`, `proxy_read_timeout`, and `proxy_send_timeout` explicitly.

**3. Monitor upstream availability.** Do not wait for users to report 502s. Use uptime monitoring (Datadog, Better Uptime, etc.) to alert you when upstream health checks fail.

**4. Configure automatic restarts.** Use systemd's `Restart=always` or PM2's watch mode so your application restarts automatically after a crash.

```
# /etc/systemd/system/myapp.service
[Service]
ExecStart=/usr/bin/node /app/server.js
Restart=always
RestartSec=5
```

**5. Use circuit breakers.** In microservice architectures, a circuit breaker (e.g., via Resilience4j or similar) stops requests from piling up against a failing upstream and returns a controlled fallback rather than cascading 502s.

**6. Keep TLS certificates valid.** Certificate expiry on the upstream side causes TLS handshake failures that manifest as 502s from the proxy. Set calendar reminders or use automated renewal (Let's Encrypt / cert-manager). Check certificate status at any time with the [Authgear SSL Checker](/tools/ssl-checker).

## 502 and Authentication Flows

If your authentication service sits behind a reverse proxy — as is common when using a platform like [Authgear]() — a 502 from the proxy will completely block the login flow. Users will see a generic error page instead of the sign-in screen, and OAuth redirect flows will break silently.

When troubleshooting 502s in a production app:

<ul>
<li>Check whether <code>/oauth/authorize</code>, <code>/oauth/token</code>, or <code>/.well-known/openid-configuration</code> endpoints are affected — these are the first to break when the auth backend is unreachable.</li>
<li>If you use a CDN in front of your auth endpoints, ensure your CDN is not caching 502 responses. Cached error responses will continue to block logins even after the backend recovers.</li>
<li>Authgear is designed to run reliably in proxied environments, but your Nginx or load balancer config still needs to be correct. See the proxy configuration fixes above.</li>
</ul>

## FAQ

**Can a 502 error be caused by the client?**

No. A 502 is a server-side error. The client sent a valid request; the problem is in the server infrastructure. That said, clients can trigger slow backend behaviour (e.g., a large file upload that times out the proxy), so the client's action may be the trigger — but the fix is always on the server side.

**Why do I see 502 errors only under heavy load?**

This usually means the upstream is running out of capacity: no available workers, connection pool exhausted, or CPU/memory bottleneck. The upstream server is alive under normal load but overwhelmed at peak. Profile your application, scale horizontally, or implement request queuing.

**Does Cloudflare cache 502 errors?**

By default, Cloudflare does not cache 5xx responses. But if you have a custom page rule or Cache Rule that overrides this, it is possible. Check your Cloudflare caching configuration. Also note: if your origin returns a 502 briefly, users hitting cached pages (CDN edge cache) may not see it — but uncached endpoints will.

**How do I tell if the 502 is from Nginx or from my application?**

Check the `Server` response header. Nginx returns `Server: nginx`. The format of the HTML error page also differs — Nginx 502 pages have a distinctive plain style. If your app is behind multiple proxies, use `curl -v` and look at all the response headers to identify which layer is returning the error. You can also add a custom `X-Proxy-ID` header in your Nginx config to make this unambiguous.

## Summary

A 502 Bad Gateway almost always means one of three things: the upstream server is not running, the proxy cannot reach it (wrong port, stale DNS, firewall), or the upstream is too slow. Check your upstream process status first, then your proxy error logs, then work outward from there. The `curl` commands and log snippets above will get you to the root cause quickly in most cases.
