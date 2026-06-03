---
title: "MCP Authentication: How OAuth 2.1 Works in the Model Context Protocol"
excerpt: "MCP servers expose your data to AI agents — so who checks the agent's ID? A developer's guide to the MCP authorization spec: OAuth 2.1, PKCE, protected resource metadata, and the full flow from 401 to token."
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "MCP Authentication: OAuth 2.1 in MCP Explained | Authgear"
metaDescription: "How MCP authentication works: the OAuth 2.1 authorization spec, PKCE, RFC 9728 protected resource metadata, resource indicators, and the full auth flow with examples."
publishedAt: 2026-06-03T00:00:00.000Z
draft: false
faq:
  - q: "Does MCP require authentication?"
    a: "Not for local servers — an MCP server running on your machine over stdio inherits your local user's access. But remote MCP servers (HTTP transport) expose tools and data over the network, and the MCP specification defines an OAuth 2.1-based authorization flow for them. Any remote server handling non-public data should implement it."
  - q: "What OAuth version does MCP use?"
    a: "OAuth 2.1. The MCP authorization specification mandates PKCE for all clients, uses RFC 9728 (Protected Resource Metadata) for discovery, RFC 8414 for authorization server metadata, and RFC 8707 resource indicators to bind tokens to a specific MCP server."
  - q: "Is an MCP server an OAuth resource server or authorization server?"
    a: "A resource server. The spec separates the roles: your MCP server validates tokens and advertises (via protected resource metadata) which external authorization server issues them. You can delegate the authorization server role to an identity platform."
  - q: "What is token passthrough and why is it banned in MCP?"
    a: "Token passthrough is when an MCP server takes the access token a client gave it and replays it against another API. The spec forbids it because it breaks audience binding: tokens must be issued for (and validated by) a specific resource. Accepting tokens minted for another service makes the confused-deputy problem trivial to exploit."
  - q: "Can I use my existing identity provider for MCP authentication?"
    a: "Yes — that's the design intent of separating the authorization server from the MCP server. Any OAuth 2.1-capable identity platform that supports PKCE, authorization server metadata, and resource indicators can serve as the authorization server for your MCP deployment."
---

> **tl;dr** — Remote MCP servers authenticate clients with **OAuth 2.1**. The server is a **resource server**: it returns `401` with a pointer to its **protected resource metadata** (RFC 9728), which tells the client which **authorization server** to use. The client registers (via Client ID Metadata Document or dynamic registration), runs an authorization-code + **PKCE** flow, and presents a token bound to that specific server via **resource indicators** (RFC 8707). No API keys in config files, no tokens shared across servers.

## Why MCP needs authentication at all

The Model Context Protocol (MCP) is the standard for connecting AI agents to tools and data — file systems, databases, SaaS APIs, internal services. A local MCP server running over stdio is simple: it runs as you, on your machine, with your permissions.

Remote MCP servers change everything. The moment a server is reachable over HTTP, three questions appear:

1. **Who is this client?** Any agent on the internet can send requests.
2. **Which user does it act for?** An agent calling `query_crm` needs to act as *some specific person* with *their* permissions, not as a god-mode service account.
3. **How is access scoped and revoked?** When an employee leaves or a token leaks, access must die with it.

These are exactly the problems OAuth solved for web APIs, which is why the MCP authorization spec didn't invent a new mechanism — it profiles **OAuth 2.1** for the agent era.

## The architecture: three roles, cleanly separated

The spec defines three distinct roles:

- **MCP client** — the agent host (Claude, an IDE, your custom agent). Acts as an OAuth client.
- **MCP server** — the tool/data provider. Acts as an OAuth **resource server** only: it validates tokens, it does not issue them.
- **Authorization server (AS)** — issues tokens after authenticating the user. Can be your existing identity provider.

Earlier spec drafts collapsed the last two — every MCP server had to *be* an authorization server, which meant every weekend-project MCP server implementing login, consent, and token issuance. The separation is what makes the spec practical: your MCP server stays small, and a dedicated identity platform does the hard part.

## The flow, step by step

### 1. The client gets a 401 — with directions

The MCP server rejects the unauthenticated request and points to its metadata:

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer resource_metadata="https://mcp.example.com/.well-known/oauth-protected-resource"
```

(This is the same 401-means-unauthenticated semantics we cover in [HTTP 401 vs 403](/post/http-401-vs-403) — MCP just uses it as a discovery mechanism.)

### 2. The client fetches protected resource metadata (RFC 9728)

```json
{
  "resource": "https://mcp.example.com",
  "authorization_servers": ["https://auth.example.com"],
  "scopes_supported": ["mcp:tools:read", "mcp:tools:execute"],
  "bearer_methods_supported": ["header"]
}
```

This document is the server saying: *"I don't do logins — talk to this authorization server, and these are the scopes I understand."*

### 3. The client discovers the authorization server (RFC 8414)

The client fetches the AS metadata document — trying `/.well-known/oauth-authorization-server` first, then `/.well-known/openid-configuration` for OIDC-based providers — to learn the authorization, token, and registration endpoints. This is the same [discovery pattern](/post/well-known-openid-configuration) OIDC uses.

### 4. Client registration

Agents can't ship with pre-provisioned client IDs for every MCP server they'll ever meet. The spec supports three approaches, in priority order:

1. **Client ID Metadata Documents** — the preferred mechanism. The client uses an HTTPS URL as its `client_id` (e.g., `https://app.example.com/oauth/client-metadata.json`). The authorization server fetches that URL to read the client's redirect URIs and display name. No prior registration needed.
2. **Dynamic Client Registration (RFC 7591)** — supported for backwards compatibility. The client sends a `POST /register` request and receives a `client_id`.
3. **Pre-registration** — static client IDs configured in advance for deployments with a known, fixed client.

Client ID Metadata Documents are what make MCP auth work at agent scale: a client can connect to any authorization server without a human pre-configuring both ends, and the client's identity is self-described at a URL it controls.

### 5. Authorization code + PKCE — no exceptions

The client runs a standard authorization-code flow, and **PKCE is mandatory for every client**, not just mobile apps. The user authenticates at the AS (password, passkey, SSO — the AS's choice), sees a consent screen for the requested scopes, and the client exchanges the code (plus PKCE verifier) for an access token.

### 6. Tokens are bound to the server (RFC 8707)

The client includes a `resource` parameter naming the MCP server in the authorization and token requests. The AS mints a token whose audience is *that server only*. The MCP server must validate the audience and reject tokens minted for anyone else.

From then on, every MCP request carries `Authorization: Bearer <token>`, and the server enforces scopes per tool.

## The security rules that matter most

The spec is opinionated about the failure modes that hurt agentic systems:

- **No token passthrough.** An MCP server must never take the token it received and replay it against a downstream API. If the server needs to call another service, it must obtain its own token for that service (token exchange or a separate client-credentials grant). Passthrough breaks audience binding and creates a [confused deputy](https://en.wikipedia.org/wiki/Confused_deputy_problem): the downstream API can't tell who's really asking.
- **Audience-validate everything.** A token for `mcp.other-company.com` presented to your server must fail, even if the signature is valid and the issuer is trusted. Check the `aud`/resource binding, not just the signature — the same class of validation mistake we cover in [JWKS validation](/post/what-is-jwks).
- **Scopes are your authorization model.** `mcp:tools:read` vs `mcp:tools:execute` is the difference between an agent that can look and an agent that can act. Define scopes per tool sensitivity, return `403` (not `401`) when a valid token lacks scope.
- **Short-lived tokens, refresh at the AS.** Agents run long sessions; access tokens shouldn't. Keep them short and let refresh tokens (rotated, per OAuth 2.1) carry the session.

## Where this is heading: agents as first-class principals

MCP authentication is one front in a larger shift: AI agents becoming **first-class principals** in identity systems, alongside users and services. The patterns are converging:

- **Human-delegated access** — the MCP flow above: an agent acting *for a user*, with the user's consent and a subset of their permissions
- **Autonomous agents** — service-to-service style: client-credentials grants, workload identity, per-agent credentials
- **On-behalf-of chains** — agent → MCP server → downstream API, each hop with properly-audienced tokens

If you're building MCP servers, the practical takeaway: **don't build the authorization server yourself.** The spec explicitly lets you point `authorization_servers` at an existing identity platform. An OAuth 2.1/OIDC provider like [Authgear](/) gives you the authorization-code + PKCE flow, consent, token issuance, and session management out of the box — your MCP server only needs to serve its metadata document and validate audiences and scopes on incoming tokens.

## Frequently Asked Questions

### Does MCP require authentication?

Not for local servers — an MCP server running on your machine over stdio inherits your local user's access. But remote MCP servers (HTTP transport) expose tools and data over the network, and the MCP specification defines an OAuth 2.1-based authorization flow for them. Any remote server handling non-public data should implement it.

### What OAuth version does MCP use?

OAuth 2.1. The MCP authorization specification mandates PKCE for all clients, uses RFC 9728 (Protected Resource Metadata) for discovery, RFC 8414 for authorization server metadata, and RFC 8707 resource indicators to bind tokens to a specific MCP server.

### Is an MCP server an OAuth resource server or authorization server?

A resource server. The spec separates the roles: your MCP server validates tokens and advertises (via protected resource metadata) which external authorization server issues them. You can delegate the authorization server role to an identity platform.

### What is token passthrough and why is it banned in MCP?

Token passthrough is when an MCP server takes the access token a client gave it and replays it against another API. The spec forbids it because it breaks audience binding: tokens must be issued for (and validated by) a specific resource. Accepting tokens minted for another service makes the confused-deputy problem trivial to exploit.

### Can I use my existing identity provider for MCP authentication?

Yes — that's the design intent of separating the authorization server from the MCP server. Any OAuth 2.1-capable identity platform that supports PKCE, authorization server metadata, and resource indicators can serve as the authorization server for your MCP deployment.

