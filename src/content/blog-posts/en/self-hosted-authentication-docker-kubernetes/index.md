---
title: "Self-Host Authgear: Try It Locally, Then Go Live in the UK or EU"
excerpt: "Run Authgear on your laptop in about 10 minutes with Docker Compose, then deploy it for real with the official Helm chart on a UK or EU Kubernetes provider."
coverImage: ./cover.webp
publishedAt: 2026-11-12
metaTitle: "Self-Hosted Authentication: Authgear on Docker & Kubernetes"
metaDescription: "Self-hosted authentication with Authgear: try it locally with Docker Compose in 10 minutes, then run the open-source identity provider on UK or EU Kubernetes."
category: engineering
readTime: 12
draft: false
faq:
  - q: "How long does a production deployment take?"
    a: "The local trial takes about 10 minutes. A production deployment with Helm takes a few hours, because you also set up Kubernetes, PostgreSQL, Redis, an ingress controller, TLS certificates and an email provider."
  - q: "Do I need my own email and SMS providers?"
    a: "Yes. When you self-host, you connect your own SMTP server for email and your own SMS and WhatsApp providers for one-time codes. That also means you choose who sees your users' email addresses and phone numbers."
  - q: "Is self-hosted Authgear missing any features?"
    a: "No. Authgear is open source under Apache-2.0, and the self-hosted version has the same features as the hosted version."
  - q: "Can I move my users from Keycloak?"
    a: "Yes. You can import your Keycloak users with their passwords, so they don't have to reset them."
  - q: "Can someone run Authgear for me in the UK or EU?"
    a: "Yes. With private cloud, we run a dedicated Authgear deployment for you, in the region you choose, including the UK and the EU."
---

> **tl;dr** — Try Authgear on your laptop in 10 minutes with Docker Compose. Then go live with Helm on UK or EU Kubernetes, in a few hours.

If your customers or your legal team have asked "where does our login data live, and who can reach it?", self-hosting gives you the simplest answer: on servers we picked, run by us.

[Authgear](https://github.com/authgear/authgear-server) is open-source login and identity software under the Apache-2.0 licence. The self-hosted version has every feature of the hosted one. This guide takes you from a local trial to a production deployment in two parts:

| | Part 1: Try it locally | Part 2: Go live |
|---|---|---|
| Tool | [Official Docker Compose example](https://github.com/authgear/authgear-example-docker-compose) | [Official Helm chart](https://github.com/authgear/helm-charts) |
| Runs on | Your laptop | Kubernetes at a UK or EU provider |
| Time | About 10 minutes | A few hours |
| Production-ready | **No** | Yes, once you've set it up properly |

Every command below matches our [deployment docs](https://docs.authgear.com/deployment/helm) and the official example repository. Where a setting is your choice, we say so.

## Part 1: Try Authgear locally in 10 minutes

The quickest way to see Authgear is the [Docker Compose example](https://docs.authgear.com/deployment/local). It starts Authgear, its admin portal, PostgreSQL, Redis and MinIO (for file storage) on your machine.

> ⚠️ **Not for production.** This example is for local development and trying things out. It ships with default credentials and `DEV_MODE` turned on, so it works out of the box but isn't safe to expose to the internet. Use it to explore, then follow Part 2 for anything real.

### Prerequisites

- Docker with Docker Compose (`docker compose`).
- `git`, to clone the example.
- `python3`, which the setup script uses.
- Free local ports. The example uses 8010 (portal), 3100 (Authgear), 3000–3004, 5432 (PostgreSQL), 6379 (Redis), 9000–9001 (MinIO) and 8090.

### Step 1: Clone the example

```sh
git clone https://github.com/authgear/authgear-example-docker-compose.git
cd authgear-example-docker-compose
```

The repository holds a `docker-compose.yaml`, an `env` file with the settings, an `nginx.conf` and a `setup.sh` script.

### Step 2: Start Authgear

```sh
docker compose up
```

The first run builds a PostgreSQL image with the `pg_partman` extension and pulls the Authgear images, so it takes a few minutes. Database migrations and storage bucket creation run automatically on startup. Leave this terminal running.

### Step 3: Run the first-time setup

In a second terminal, in the same folder:

```sh
./setup.sh
```

This "creates the project config, uploads it, creates an admin user (`user@example.com` / `secretpassword`), and grants portal access."

To choose your own admin login instead:

```sh
ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=yourpassword ./setup.sh
```

### Step 4: Sign in to the portal

Open `http://localhost:8010` and sign in with the admin account. This is the Authgear portal, where you set up login methods, look at users and change the login pages.

Behind it, the Authgear server for the `accounts` project answers at `http://localhost:3100` (that's `AUTHGEAR_ENDPOINT` in the `env` file).

### Stopping and starting again

Stop with `Ctrl+C`. Next time you only need:

```sh
docker compose up
```

You don't need to run `setup.sh` again.

### If something goes wrong

- **`setup.sh` says "accounts/ is not empty".** You've run it before. The script tells you what to do: `rm -rf accounts`, then run it again.
- **A container won't start because a port is in use.** Something else on your machine is using one of the ports listed above. Stop it, or change the port mapping in `docker-compose.yaml`.

### Why this isn't production

A login system in production needs things a laptop setup doesn't have: backups of your user database, monitoring and alerts, TLS on every endpoint, and a way to upgrade without downtime. Part 2 sets these up with the Helm chart.

The example's settings are also only safe on your own machine. Before anything faces the internet, you'd need to:

- Replace every secret in the `env` file, such as database passwords, secret keys and JWT secrets
- Set the allowed origins, redirect URIs and CORS settings to your real domain
- Turn off `DEV_MODE`, which is on by default

## Part 2: Go live on UK or EU infrastructure

The [Authgear Helm chart](https://github.com/authgear/helm-charts) "is the recommended way to deploy Authgear on Kubernetes." Think of Part 1 as a test drive and Part 2 as buying the car: more paperwork, but you own it.

Set aside a few hours. Most of the time goes on things around Authgear: the cluster, the database, DNS and certificates.

### Choosing a UK or EU provider

For data sovereignty, where you run Authgear matters as much as the software. When you shortlist a hosting provider in the UK or EU, check that it offers what Authgear needs, and ask the same questions you'd ask any vendor:

- **Managed Kubernetes**, version 1.23 or later.
- **Managed PostgreSQL 16** (or a server you run yourself) **with the `pg_partman` extension**. Not every managed PostgreSQL offers `pg_partman`, so check this first.
- **Managed Redis** 6.2 or later.
- **Where the provider is incorporated, where its staff work, and where backups go.** A UK or EU data centre run by a company under another country's law gives you residency, not sovereignty. Our [UK data sovereignty guide](/post/uk-data-sovereignty-login-identity) explains the difference.

### What you need

You'll need the following (full list in the [Helm deployment guide](https://docs.authgear.com/deployment/helm)):

- **Kubernetes** 1.23 or later. "2 Cores CPU for the k8s nodes" and "4GB memory".
- **PostgreSQL** 16 "with compatible version of `pg_partman`, at least 5GB storage." Roughly "100MB of storage is required to store 10,000 users."
- **Redis** 6.2 or later, "with 30kB per user. 10000 users require 300MB."
- **A domain name** dedicated to Authgear.
- **An SMTP server** for sending email.
- **The NGINX ingress controller** and, unless you manage certificates yourself, **cert-manager**.
- On your machine: `kubectl` matching your cluster version, Helm v3 or later, and Docker. Docker needs to reach your PostgreSQL databases for Step 5 and Step 6; with a private managed database, run those commands from a host inside the same network.

Elasticsearch is optional. We recommend it for projects expecting more than 10,000 users; otherwise search can use PostgreSQL.

### Step 1: Pick an image tag and plan your domains

Authgear images are tagged by date. Pick a tag in the form `YYYY-MM-dd.digit`, for example `2025-11-26.0`. Below, `TAG` means the tag you picked.

The chart assumes an apex domain just for Authgear. With `myapp.com` as the example:

```text
Authgear App ID  Domain                        Description
accounts         accounts.myapp.com            The default endpoint of the app "accounts"
accounts         accounts.portal.myapp.com     The custom domain endpoint of the app "accounts"
                 portal.myapp.com              The Authgear portal endpoint
```

Point all traffic for the domain at your cluster.

### Step 2: Provision the services

Set these up at your provider, following its own instructions:

1. **A Kubernetes cluster**, sized as above.
2. **A PostgreSQL instance.** Create 2 or 3 PostgreSQL databases in the instance, with one PostgreSQL user for each. Authgear uses separate connection URLs for main data, audit logs and (if you don't use Elasticsearch) search.
3. **A Redis instance.** "You should reserve 1 Redis database for Authgear."
4. **The NGINX ingress controller.** Authgear uses the source IP for rate limiting, so it must be correct. We suggest setting `externalTrafficPolicy` to `Local`, and running the controller as a DaemonSet so every node has one.
5. **cert-manager**, for Let's Encrypt certificates. We recommend installing its CRDs separately from its Helm chart.

Object storage is only needed for profile images (off by default) and for user exports. To keep files with a UK or EU provider, use the `MINIO` store type: it takes any `https` endpoint, so it works with S3-compatible storage such as your provider's object storage or your own MinIO. The other types are AWS S3, Google Cloud Storage, Azure Blob Storage and Alibaba Cloud OSS; settings are under `imagesServer.objectStore` and `userexport.objectStore` in the chart's [values file](https://github.com/authgear/helm-charts/blob/master/authgear/values.yaml).

### Step 3: Create the namespaces

```sh
kubectl create namespace authgear
kubectl create namespace authgear-apps
```

`authgear` holds the Helm release. `authgear-apps` holds resources that Authgear creates.

### Step 4: Create your own Helm chart with Authgear as a dependency

You'll need a few extra Kubernetes resources alongside Authgear, so we recommend wrapping it in a chart of your own:

```sh
helm create authgear-deploy
cd authgear-deploy/templates
rm -rf tests/ NOTES.txt deployment.yaml hpa.yaml httproute.yaml ingress.yaml service.yaml serviceaccount.yaml
cd -
```

Add Authgear as a dependency in `authgear-deploy/Chart.yaml`. Use the latest version from the [chart releases](https://github.com/authgear/helm-charts/releases):

```yaml
dependencies:
- name: authgear
  version: "USE_LATEST_VERSION_HERE"
  repository: "https://authgear.github.io/helm-charts"
```

`helm create` also writes a `values.yaml` full of example settings. You'll replace it with your own in Step 7.

Then download the dependency:

```sh
helm dependency update ./authgear-deploy
```

Finally, create cert-manager issuers: an HTTP01 issuer and a DNS01 issuer in each of the two namespaces, so four in total. The DNS01 issuer covers the wildcard certificate for `*.myapp.com`. See cert-manager's guides for [HTTP01](https://cert-manager.io/docs/configuration/acme/http01/) and [DNS01](https://cert-manager.io/docs/configuration/acme/dns01/).

### Step 5: Run the database migrations

These create Authgear's tables. Replace `DATABASE_URL` and `AUDIT_DATABASE_URL` with your PostgreSQL connection URLs:

```sh
docker run --rm -it quay.io/theauthgear/authgear-server:TAG authgear database migrate up \
  --database-url DATABASE_URL \
  --database-schema public
docker run --rm -it quay.io/theauthgear/authgear-server:TAG authgear images database migrate up \
  --database-url DATABASE_URL \
  --database-schema public
docker run --rm -it quay.io/theauthgear/authgear-server:TAG authgear audit database migrate up \
  --database-url AUDIT_DATABASE_URL \
  --database-schema public
docker run --rm -it quay.io/theauthgear/authgear-portal:TAG authgear-portal database migrate up \
  --database-url DATABASE_URL \
  --database-schema public
```

If you use PostgreSQL for search rather than Elasticsearch, also run:

```sh
docker run --rm -it quay.io/theauthgear/authgear-server:TAG authgear search database migrate up \
  --search-database-url SEARCH_DATABASE_URL \
  --search-database-schema public
```

> ⚠️ **Don't touch the tables.** Don't change the PostgreSQL databases, schemas, tables, columns or rows yourself.

### Step 6: Create the "accounts" app

The portal itself signs people in through an Authgear app called `accounts`. Generate its config:

```sh
mkdir -p resources/authgear
docker run -v "$PWD"/resources:/app/resources --rm -it quay.io/theauthgear/authgear-server:TAG authgear init \
  --output-folder=resources/authgear \
  --for-helm-chart
```

Run it in a real terminal: without one, `authgear init` skips the prompts and quietly writes defaults. Answer the prompts like this, and press Enter to accept the default for the rest:

| Prompt | Answer |
|---|---|
| App ID | `accounts` |
| HTTP origin of authgear | `https://accounts.portal.myapp.com` |
| Phone OTP Mode | Enter (`sms`) |
| Turn off email verification | `false` |
| Turn off public signup | Enter |
| SMTP host, port, username, password and sender | Leave blank: the chart sets email in Step 7 |
| Select a service for searching | `postgresql` if you use PostgreSQL search. **Enter gives `elasticsearch`.** |
| HTTP origin of portal | `https://portal.myapp.com` |
| Client ID of portal, and the siteadmin prompts | Enter |

This writes `authgear.yaml` and `authgear.secrets.yaml` to `resources/authgear`. With `--for-helm-chart`, the secrets file holds only keys; your database, Redis and email settings come from the chart in Step 7. Then load the app into the database and give it its two domains: `accounts.myapp.com`, and `accounts.portal.myapp.com` for the portal's sign-in:

```sh
docker run -v "$PWD"/resources:/app/resources --rm -it quay.io/theauthgear/authgear-portal:TAG \
  authgear-portal internal configsource create resources/authgear \
  --database-url DATABASE_URL --database-schema public
docker run --rm -it quay.io/theauthgear/authgear-portal:TAG \
  authgear-portal internal domain create-default accounts \
  --database-url DATABASE_URL --database-schema public \
  --default-domain-suffix ".myapp.com"
docker run --rm -it quay.io/theauthgear/authgear-portal:TAG \
  authgear-portal internal domain create-custom accounts \
  --database-url DATABASE_URL --database-schema public \
  --apex-domain myapp.com --domain accounts.portal.myapp.com
```

### Step 7: Prepare values.yaml

This is where you tell the chart about your database, Redis, domain, email and SMS providers. The full list of settings is in the [Helm values reference](https://docs.authgear.com/deployment/helm#helm-chart-values-reference). Because Authgear is a dependency of your chart, its settings go under an `authgear:` key, and the chart's own values are also rooted at `authgear`, so you get two levels.

Replace the `values.yaml` that `helm create` made with this starting point, and replace every capitalised placeholder:

```yaml
authgear:
  authgear:
    databaseURL: "DATABASE_URL"
    databaseSchema: "public"
    redisURL: "REDIS_URL"
    defaultDomain: "myapp.com"
    allDefaultDomains:
    - domain: "myapp.com"
      ingress:
        enabled: true
        tls:
          enabled: true
      certManager:
        enabled: true
      secretName: "tls-star-myapp-com"

    certManager:
      issuer:
        http01:
          name: "YOUR_HTTP01_ISSUER"
        dns01:
          name: "YOUR_DNS01_ISSUER"

    smtp:
      host: "SMTP_HOST"
      port: 587
      username: "SMTP_USERNAME"
      password: "SMTP_PASSWORD"

    auditLog:
      databaseURL: "AUDIT_DATABASE_URL"
      databaseSchema: "public"

    postgresqlsearch:
      enabled: true
      databaseURL: "SEARCH_DATABASE_URL"
      databaseSchema: "public"

    mainServer:
      image: "quay.io/theauthgear/authgear-server:TAG"

    deno:
      image: "quay.io/theauthgear/authgear-deno:DENO_TAG"

    portalServer:
      image: "quay.io/theauthgear/authgear-portal:TAG"
      authgear:
        appID: "accounts"
        clientID: "CLIENT_ID_FROM_AUTHGEAR_YAML"
        endpoint: "https://accounts.portal.myapp.com"
      adminAPI:
        endpoint: "http://authgear-deploy-admin.authgear.svc.cluster.local"

    appCustomResources:
      path: "/var/resources/authgear"
      volume:
        secret:
          secretName: authgear-vendor-resources
          items:
          - key: authgear.secrets.yaml
            path: authgear.secrets.yaml
```

A few notes:

- **Client ID.** Copy it from the `authgear.yaml` that Step 6 generated.
- **Deno image.** Deno runs hooks and custom functions, and the chart always deploys it. Its images use their own tags (for example `git-27a7ae9a2b70`, the one the Docker Compose example uses), so pick `DENO_TAG` from [quay.io/theauthgear/authgear-deno](https://quay.io/repository/theauthgear/authgear-deno).
- **Admin API endpoint.** The portal reaches the Admin API through the chart's admin Service, `http://<release>-admin.<namespace>.svc.cluster.local`. The value above assumes the release name `authgear-deploy` and namespace `authgear` used in Step 8.
- **Domains.** `defaultDomain` puts the portal at `portal.myapp.com`. The `allDefaultDomains` entry adds the wildcard `*.myapp.com`, so each app is reachable at `<app-id>.myapp.com`. Without it, those addresses return 404.
- **Search.** `postgresqlsearch` points the chart at the search database you migrated in Step 5. Leave it out if you use Elasticsearch.
- **Secrets.** The `appCustomResources` block reads a Secret that holds an `authgear.secrets.yaml` shared by all apps. Create it as a template in your chart, for example `templates/authgear-vendor-resources.yaml`:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: authgear-vendor-resources
type: Opaque
data:
  authgear.secrets.yaml: |-
    {{ include "authgear.authgearSecretsYAML" .Values.authgear | b64enc }}
```

Keep real passwords and keys out of Git. Use your usual secrets tool.

### Connect your own email, SMS and WhatsApp providers

When you self-host, Authgear sends messages through providers you choose. That's good for sovereignty: these providers see your users' email addresses, phone numbers and one-time codes, so you decide who they are and where they're based.

- **Email:** any SMTP server, set with `authgear.smtp.host`, `port`, `mode`, `username` and `password`. Any provider works, for example SendGrid; pick one that fits your data requirements.
- **SMS:** Twilio (`authgear.twilio.accountSID`, `authgear.twilio.authToken`) or Vonage, formerly Nexmo (`authgear.nexmo.apiKey`, `authgear.nexmo.apiSecret`). "Either one of Twilio or Nexmo is enough."
- **WhatsApp:** the chart's [values file](https://github.com/authgear/helm-charts/blob/master/authgear/values.yaml) has settings for the WhatsApp Cloud API (`whatsappCloudAPI`), WATI (`whatsappWATI`) and on-premises WhatsApp (`whatsappOnPremises`).

### Step 8: Install

```sh
helm install authgear-deploy ./authgear-deploy --namespace authgear --values ./authgear-deploy/values.yaml
```

### Check it works

Watch the pods start:

```sh
kubectl get pods --namespace authgear
```

### Step 9: Create your first portal admin

The portal has no users yet. Create one in the `accounts` app through the Admin API, from inside the admin pod:

```sh
kubectl exec --namespace authgear deploy/authgear-deploy-admin -- \
  authgear internal admin-api invoke \
  --app-id accounts \
  --endpoint http://127.0.0.1:3002 \
  --host accounts.myapp.com \
  --query 'mutation createUser($email: String!, $password: String!) { createUser(input: { definition: { loginID: { key: "email", value: $email } }, password: $password }) { user { id } } }' \
  --variables-json '{"email":"YOUR_EMAIL","password":"A_STRONG_PASSWORD"}'
```

The reply contains the new user's `id`. Turn it into the raw user ID:

```sh
python3 -c 'import base64,sys; s=sys.argv[1]; print(base64.urlsafe_b64decode(s+"="*(-len(s)%4)).decode().split(":",1)[1])' USER_NODE_ID
```

Then make that user an owner of the portal:

```sh
kubectl exec --namespace authgear deploy/authgear-deploy-portal -c authgear-portal-server -- \
  authgear-portal internal collaborator add \
  --app-id accounts --user-id RAW_USER_ID --role owner
```

Now open `https://portal.myapp.com` and sign in with that email and password. The portal signs you in through the `accounts` app at `https://accounts.portal.myapp.com`.

### Troubleshooting

- **Rate limits hit almost at once.** Authgear sees every request as coming from the same IP. Fix the source IP at the ingress (Step 2, item 4).
- **"Duplicate Ingress definition" after a chart upgrade.** When upgrading the chart from v5 to v6, "you have to manually delete the existing Ingress resources first. So the upgrade has downtime."
- **You need different subdomains.** The chart's subdomain layout "CANNOT be customized". Set `authgear.ingress.enabled` to `false` and create your own Ingresses.

### Upgrading later

If a release has no breaking changes, "an upgrade is as simple as setting `authgear.mainServer.image` and `authgear.portalServer.image` to a newer value." New features often add tables or columns, so run the Step 5 migrations with the new tag before `helm upgrade`.

## Don't want to run it yourself?

Self-hosting means your team runs everything: upgrades, backups, monitoring and on-call. If that's more than you want to take on, there are two other routes that keep the same open-source Authgear:

- **Private cloud.** We run it for you, in the region you choose, including the UK and the EU. You get a dedicated deployment and can contract with our UK company.
- **Enterprise support for self-hosting.** Keep running it yourself, with paid support from the team that builds Authgear.

Moving from Keycloak? You can import your Keycloak users with their passwords. See how the two compare on our [Keycloak alternative page](/compare/keycloak-alternative), or compare all the ways to run Authgear on our [data sovereignty page](/solutions/data-sovereignty). If you're still weighing open-source options, our [comparison of Authgear, Keycloak and authentik](/post/best-self-hosted-sso-platforms-compared-authgear-vs-keycloak-vs-authentik) goes deeper.

**Not sure which route fits?** [Book a 30-minute sovereignty review](/schedule-demo?topic=sovereignty-review). We'll look at where your login data sits today and the options for keeping it in the UK or EU. Free, no obligation, not legal advice.

## Frequently Asked Questions

### How long does a production deployment take?

The local trial takes about 10 minutes. A production deployment with Helm takes a few hours, because you also set up Kubernetes, PostgreSQL, Redis, an ingress controller, TLS certificates and an email provider.

### Do I need my own email and SMS providers?

Yes. When you self-host, you connect your own SMTP server for email and your own SMS and WhatsApp providers for one-time codes. That also means you choose who sees your users' email addresses and phone numbers.

### Is self-hosted Authgear missing any features?

No. Authgear is open source under Apache-2.0, and the self-hosted version has the same features as the hosted version.

### Can I move my users from Keycloak?

Yes. You can import your Keycloak users with their passwords, so they don't have to reset them.

### Can someone run Authgear for me in the UK or EU?

Yes. With private cloud, we run a dedicated Authgear deployment for you, in the region you choose, including the UK and the EU.
