---
title: "HTTP 502 Bad Gateway：意義與排除方式"
excerpt: "502 Bad Gateway 表示閘道或代理伺服器從上游收到無效回應或無回應。說明常見原因、診斷步驟與修正方式。"
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "HTTP 502 Bad Gateway：原因與修正 | Authgear"
metaDescription: "502 代表代理無法正確連上上游。了解成因、如何診斷並快速修復。"
publishedAt: 2026-03-13T22:25:51.671Z
updatedAt: 2026-03-17T15:52:41.327Z
draft: false
---

**502 Bad Gateway** 表示作為閘道或代理的伺服器，在轉送請求到上游時收到**無效回應**或**完全沒有回應**。代理本身仍在運作；問題出在背後的上游。

對開發者而言，502 屬於「中段」困擾：不是客戶端錯誤（那是 4xx），也不是籠統的伺服器當機（那是 500）。它傳達的是：**閘道無法與後端正常通訊**——因此可縮小排查範圍。

## 502 Bad Gateway 是什麼？

HTTP 502 在 [RFC 9110](https://httpwg.org/specs/rfc9110.html#status.502) 定義為：

<blockquote><p>「伺服器在作為閘道或代理時，為完成請求而存取的入站伺服器回傳了無效回應。」</p></blockquote>

白話：你的 Nginx、Apache、Cloudflare 或負載平衡試圖把請求轉給應用伺服器，卻拿到亂碼或空白，因而對客戶端回 502。

錯誤中的「閘道」永遠是中間層——**不是**你的後端應用；失敗的是上游。

## HTTP 代理與閘道如何運作

理解 502 需先掌握請求鏈：

```
Client (browser)
    → Reverse proxy / CDN / load balancer  ← 「閘道」
        → Upstream application server       ← 出問題的一端
```

代理負責轉送請求並回傳回應。若上游：

<ul>
<li>在代理逾時時間內未回應</li>
<li>意外關閉連線</li>
<li>回傳格式錯誤的 HTTP</li>
<li>根本未在執行</li>
</ul>

代理就沒有有效內容可轉送，因而回 502。

正式環境常見的「閘道」：Nginx、Apache `mod_proxy`、AWS ALB／NLB、Cloudflare、Fastly、HAProxy、Traefik。

## 502 常見原因

### 1. 上游未啟動

應用伺服器（Node.js、Django、Rails、PHP-FPM 等）已崩潰或未啟動，代理無法連上設定的埠。

### 2. 上游逾時

後端有在跑但回應過慢——超過代理的 `proxy_read_timeout` 等設定，代理放棄並回 502。

### 3. 代理設定錯誤

指到錯誤主機、埠或 socket 路徑。`proxy_pass` 或 `ProxyPass` 打錯字就會穩定產生 502。

### 4. 負載平衡：所有後端不健康

若負載平衡背後所有節點同時健康檢查失敗，沒有可用目標可路由——結果 502。

### 5. DNS 解析失敗

若代理在啟動時解析上游主機名（Nginx 預設如此）而主機名變更或不可達，可能快取舊位址而連線失敗。

### 6. 代理與上游之間 TLS 交握失敗

代理以 HTTPS 連上游（微服務常見）時，憑證不符或過期會導致交握失敗，代理常報為 502。請用 [Authgear SSL 檢查工具](/zh-Hant/tools/ssl-checker) 驗證上游憑證。

### 7. 上游資源耗盡

上游程序還活著，但 worker／執行緒／檔案描述元用盡。連線被接受卻卡住，觸發代理逾時。

## 如何診斷 502

依序進行，每一步都縮小範圍。

### 步驟 1：瀏覽器看錯誤

開 DevTools（F12）→ Network，重載失敗請求。注意：

<ul>
<li>回應狀態（確認確為 502，非快取舊結果）</li>
<li><code>Server</code> 標頭（哪個代理回傳）</li>
<li><code>X-Cache</code> 或 <code>CF-Cache-Status</code>（是否經 CDN）</li>
</ul>

### 步驟 2：用 curl 重現

```
curl -v https://your-domain.com/api/health
```

`-v` 顯示完整交換。此處若為 502，可排除純瀏覽器問題。若為 connection refused，可能是代理本身掛了——屬不同問題。

繞過代理直接測上游：

```
curl -v http://127.0.0.1:3000/api/health
```

若成功但經代理失敗，問題在代理層。

### 步驟 3：查上游程序

```
# Node.js / PM2
pm2 status
pm2 logs --lines 50

# Systemd
systemctl status myapp.service
journalctl -u myapp.service -n 100 --no-pager

# PHP-FPM
systemctl status php8.2-fpm
```

### 步驟 4：查代理錯誤日誌

**Nginx：**

```
tail -n 100 /var/log/nginx/error.log
```

常見字串：

```
connect() failed (111: Connection refused) while connecting to upstream
upstream timed out (110: Connection timed out)
no live upstreams while connecting to upstream
```

**Apache：**

```
tail -n 100 /var/log/apache2/error.log
```

### 步驟 5：測 DNS

```
dig your-upstream-hostname A
nslookup your-upstream-hostname
```

比對 IP 是否符合預期。若代理快取舊 IP，需重啟代理或改為動態重新解析（見下方修正）。

### 步驟 6：負載平衡健康狀態

AWS：EC2 → Load Balancers → 你的 ALB → Target Groups → 檢視 target health。顯示 unhealthy 且原因為連線錯誤，可確認問題在後端。

## 如何修正 502

### Nginx：上游未跑或埠錯

確認上游在設定埠監聽：

```
ss -tlnp | grep 3000
```

若無程序，啟動應用；若埠不同，修正 Nginx：

```
upstream app {
    server 127.0.0.1:3000;  # 必須與應用實際監聽埠一致
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

套用設定：

```
nginx -t && systemctl reload nginx
```

### Nginx：上游逾時

後端若較慢（長查詢、重計算），可適度調高逾時——但勿無限拉高，應優化慢端點或改非同步工作。

```
location / {
    proxy_pass http://app;
    proxy_read_timeout 120s;
    proxy_connect_timeout 15s;
}
```

### Apache ProxyPass 設定

```
<VirtualHost *:443>
    ProxyPreserveHost On
    ProxyPass        / http://127.0.0.1:3000/
    ProxyPassReverse / http://127.0.0.1:3000/

    ProxyTimeout 60
</VirtualHost>
```

啟用模組：

```
a2enmod proxy proxy_http
systemctl reload apache2
```

### Node.js／Express 在代理後

```
const express = require('express');
const app = express();

app.set('trust proxy', 1);

app.listen(3000, '127.0.0.1', () => {
  console.log('Server running on 127.0.0.1:3000');
});
```

經代理時綁 `127.0.0.1` 通常正確；綁 `0.0.0.0` 會公開埠，有安全風險。

PM2 常見 502 原因為啟動即崩潰：

```
pm2 logs app --lines 200
pm2 restart app && pm2 logs app --lines 50
```

### Cloudflare 502

Cloudflare 無法連上源站時會回 502。檢查：

<ol>
<li><strong>源站是否在跑</strong>——SSH 確認應用。</li>
<li><strong>防火牆未擋 Cloudflare IP</strong>——允許 <a href="https://www.cloudflare.com/ips/">Cloudflare IP 範圍</a> 的 80／443。</li>
<li><strong>SSL 模式</strong>——儀表板 SSL／TLS。若源站無有效憑證，勿用「Full (strict)」。憑證不符亦可能 502。以 <a href="/zh-Hant/tools/ssl-checker">Authgear SSL Checker</a> 檢查源站憑證。</li>
<li><strong>源站回應時間</strong>——Cloudflare 約 100 秒逾時；更慢常見為 524，但部分設定仍可能呈現 502。</li>
</ol>

### AWS ALB 健康檢查

1. 健康檢查路徑必須回 200；健康端點本身錯誤會導致全部 target unhealthy。  
2. 檢查埠與協定與應用一致。  
3. 安全群組須允許 ALB 連到健康檢查埠。

Terraform 範例：

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

### Nginx DNS 快取舊上游

Nginx 預設在啟動時解析上游主機名；容器環境 IP 常變，可能一直連舊 IP。解法：使用 resolver 並以變數動態 `proxy_pass`：

```
resolver 8.8.8.8 valid=30s;

server {
    location / {
        set $upstream http://my-service.internal:3000;
        proxy_pass $upstream;
    }
}
```

## 502 vs 503 vs 504

<div class='ag-table-wrap'><table class='ag-table'>
<thead><tr><th>狀態碼</th><th>意義</th><th>誰的責任</th><th>常見原因</th></tr></thead>
<tbody>
<tr><td><strong>502 Bad Gateway</strong></td><td>代理從上游收到無效／無回應</td><td>上游伺服器</td><td>程式崩潰、埠錯、回應格式錯</td></tr>
<tr><td><strong>503 Service Unavailable</strong></td><td>伺服器暫時無法處理請求</td><td>伺服器本身</td><td>過載、維護模式、被限流</td></tr>
<tr><td><strong>504 Gateway Timeout</strong></td><td>代理等待上游逾時</td><td>上游（過慢）</td><td>慢查詢、死鎖、重計算</td></tr>
</tbody>
</table></div>

**502 與 504 差異：** 兩者都涉及代理與上游失敗。**502** 表示上游回傳無效內容或拒絕連線；**504** 表示連得上但太久沒回完。

## 預防建議

**1. 實作健康檢查端點。** 每個服務應有 `GET /health` 在就緒時回 200，供負載平衡與 Kubernetes readiness 使用。

**2. 明確設定代理逾時。** 依情境調整 `proxy_connect_timeout`、`proxy_read_timeout`、`proxy_send_timeout`。

**3. 監控上游可用性。** 勿等使用者回報；以 Datadog、Better Uptime 等在健康檢查失敗時告警。

**4. 自動重啟。** systemd `Restart=always` 或 PM2 watch，崩潰後自動拉起。

```
# /etc/systemd/system/myapp.service
[Service]
ExecStart=/usr/bin/node /app/server.js
Restart=always
RestartSec=5
```

**5. 斷路器。** 微服務架構下以 Resilience4j 等避免請求堆在已故障的上游，改回可控降級而非連鎖 502。

**6. 維持 TLS 憑證有效。** 上游憑證過期會導致 TLS 失敗而在代理端呈現 502。使用 Let's Encrypt／cert-manager 自動續約，並以 [Authgear SSL Checker](/zh-Hant/tools/ssl-checker) 定期檢查。

## 502 與驗證流程

若驗證服務在反向代理之後——使用 [Authgear](https://www.authgear.com) 等平台時很常見——代理回 502 會**完全擋住**登入流程。使用者只會看到泛用錯誤頁，OAuth 重新導向也可能靜默失敗。

正式環境除錯 502 時：

<ul>
<li>檢查 <code>/oauth/authorize</code>、<code>/oauth/token</code>、<code>/.well-known/openid-configuration</code> 是否受影響——驗證後端不可達時這些常最先掛。</li>
<li>若 CDN 在驗證端點前，確認<strong>未快取 502</strong>；否則後端恢復後使用者仍可能被錯誤頁擋住。</li>
<li>Authgear 設計上適合代理環境，但你的 Nginx／負載平衡設定仍須正確——見上文修正。</li>
</ul>

## FAQ

**502 可能是客戶端造成的嗎？**

否。502 屬伺服器端。客戶端請求有效；問題在基礎建設。不過大檔上傳等行為可能觸發代理逾時——**修正仍在伺服器端**。

**為何高負載時才出現 502？**

通常表示上游容量不足：無可用 worker、連線池耗盡或 CPU／記憶體瓶頸。一般負載下仍活著，尖峰時被壓垮。請分析應用、水平擴展或實作排隊。

**Cloudflare 會快取 502 嗎？**

預設不快取 5xx。若有自訂 Page Rule 或 Cache Rule 覆寫則可能。請檢查 Cloudflare 快取設定。

**如何分辨 502 來自 Nginx 還是應用？**

看 `Server` 標頭（Nginx 常為 `Server: nginx`），或錯誤頁 HTML 樣式。多層代理時用 `curl -v` 看完整標頭鏈；也可在 Nginx 加自訂 `X-Proxy-ID` 標頭以利辨識。

## 摘要

502 Bad Gateway 幾乎總是三者之一：**上游未執行**、**代理連不上上游**（錯埠、DNS 過期、防火牆）、或**上游過慢**。先查上游程序與代理錯誤日誌，再向外擴查。上文 `curl` 與日誌片段在多數情境可快速定位根因。
