---
title: "What Is .well-known/openid-configuration? A Developer's Guide"
excerpt: "Learn what .well-known/openid-configuration is, what every field in the discovery document means, and how to fetch it for Google, Okta, Azure, Keycloak, or your own OIDC provider."
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "What Is .well-known/openid-configuration? A Developer's Guide"
metaDescription: "Understand .well-known/openid-configuration: what it is, what every field means, and how to fetch and inspect any OIDC provider's discovery document."
publishedAt: 2026-03-05T16:09:19.689Z
updatedAt: 2026-03-05T16:19:03.821Z
draft: false
---

## What Is .well-known/openid-configuration?

`/.well-known/openid-configuration` is a standardized URL path that every OpenID Connect provider publishes to describe its configuration. Append it to any OIDC issuer's base URL and you get a JSON document listing all of the provider's endpoints, supported features, and cryptographic capabilities.

For example:

<ul>
  <li>Google: <code>https://accounts.google.com/.well-known/openid-configuration</code></li>
  <li>Microsoft: <code>https://login.microsoftonline.com/{tenant}/v2.0/.well-known/openid-configuration</code></li>
  <li>Authgear: <code>https://your-project.authgear.cloud/.well-known/openid-configuration</code></li>
</ul>

This document is the foundation of OIDC auto-discovery. Instead of hardcoding authorization endpoint URLs, token endpoints, and signing keys into your application, you fetch this document once and read everything you need from it.

<blockquote>
<p>&#x1F4A1; <strong>Try it now:</strong> Use the <a href="/tools/oidc-discovery-endpoint">Authgear OIDC Discovery Endpoint Explorer</a> to fetch and inspect any provider's <code>.well-known/openid-configuration</code> &mdash; no curl, no command line. Enter an issuer URL and see the full document with a structured field summary.</p>
</blockquote>

## Where the "well-known" Convention Comes From

The `/.well-known/` path prefix is defined by RFC 8615 as a reserved URI space for well-known locations. It's a convention that says: "if you want to find something standardized about this host, look here." Other well-known paths include `/.well-known/security.txt` (security contact info) and `/.well-known/acme-challenge/` (used by Let's Encrypt for certificate issuance).

The `openid-configuration` document itself is defined by the [OpenID Connect Discovery 1.0 specification](https://openid.net/specs/openid-connect-discovery-1_0.html) and extended by RFC 8414 (OAuth 2.0 Authorization Server Metadata). Every compliant OIDC provider must publish it at exactly this path.

## What's Inside the Document

The discovery document is a flat JSON object. Some fields are required by the spec; others are optional but widely used. Here are the ones you'll encounter most often:

### Required fields

<div class="ag-table-wrap">
  <table class="ag-table">
    <thead>
      <tr>
        <th>Field</th>
        <th>What It Contains</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>issuer</code></td>
        <td>The canonical issuer URL. Must exactly match the <code>iss</code> claim in tokens issued by this provider.</td>
      </tr>
      <tr>
        <td><code>authorization_endpoint</code></td>
        <td>The URL where users are sent to log in and authorize access.</td>
      </tr>
      <tr>
        <td><code>token_endpoint</code></td>
        <td>The URL used to exchange authorization codes for access tokens and ID tokens.</td>
      </tr>
      <tr>
        <td><code>jwks_uri</code></td>
        <td>The URL of the JSON Web Key Set &mdash; the public keys used to verify token signatures.</td>
      </tr>
      <tr>
        <td><code>response_types_supported</code></td>
        <td>The OAuth response types this provider accepts (e.g. <code>code</code>, <code>token</code>, <code>id_token</code>).</td>
      </tr>
      <tr>
        <td><code>subject_types_supported</code></td>
        <td>How the provider identifies users. Almost always <code>public</code> (same <code>sub</code> for all clients) or <code>pairwise</code> (different <code>sub</code> per client).</td>
      </tr>
      <tr>
        <td><code>id_token_signing_alg_values_supported</code></td>
        <td>Signing algorithms supported for ID tokens. Typically includes <code>RS256</code>.</td>
      </tr>
    </tbody>
  </table></div>

### Commonly used optional fields

<div class="ag-table-wrap">
  <table class="ag-table">
    <thead>
      <tr>
        <th>Field</th>
        <th>What It Contains</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>userinfo_endpoint</code></td>
        <td>URL to retrieve claims about the authenticated user. Called with a valid access token.</td>
      </tr>
      <tr>
        <td><code>end_session_endpoint</code></td>
        <td>URL to log the user out and end the SSO session (RP-Initiated Logout).</td>
      </tr>
      <tr>
        <td><code>scopes_supported</code></td>
        <td>List of OAuth scopes the provider supports (e.g. <code>openid</code>, <code>profile</code>, <code>email</code>).</td>
      </tr>
      <tr>
        <td><code>claims_supported</code></td>
        <td>User claims the provider can return (e.g. <code>sub</code>, <code>name</code>, <code>email</code>, <code>phone_number</code>).</td>
      </tr>
      <tr>
        <td><code>grant_types_supported</code></td>
        <td>OAuth grant types supported (e.g. <code>authorization_code</code>, <code>refresh_token</code>, <code>client_credentials</code>).</td>
      </tr>
      <tr>
        <td><code>token_endpoint_auth_methods_supported</code></td>
        <td>How clients authenticate to the token endpoint (e.g. <code>client_secret_basic</code>, <code>private_key_jwt</code>).</td>
      </tr>
      <tr>
        <td><code>code_challenge_methods_supported</code></td>
        <td>PKCE methods supported. Look for <code>S256</code> &mdash; required for public clients.</td>
      </tr>
      <tr>
        <td><code>revocation_endpoint</code></td>
        <td>URL to revoke access or refresh tokens.</td>
      </tr>
      <tr>
        <td><code>introspection_endpoint</code></td>
        <td>URL to check whether a token is currently active (token introspection).</td>
      </tr>
    </tbody>
  </table></div>

## A Real Example: What Google's Document Looks Like

```json
{
  "issuer": "https://accounts.google.com",
  "authorization_endpoint": "https://accounts.google.com/o/oauth2/v2/auth",
  "token_endpoint": "https://oauth2.googleapis.com/token",
  "userinfo_endpoint": "https://openidconnect.googleapis.com/v1/userinfo",
  "jwks_uri": "https://www.googleapis.com/oauth2/v3/certs",
  "scopes_supported": ["openid", "email", "profile"],
  "response_types_supported": ["code", "token", "id_token"],
  "subject_types_supported": ["public"],
  "id_token_signing_alg_values_supported": ["RS256"],
  "claims_supported": ["sub", "iss", "aud", "iat", "exp", "email", "name"]
}
```

The full document has about 25 fields. Use the [OIDC Discovery Endpoint Explorer](/tools/oidc-discovery-endpoint) to see the full JSON for any provider — including Google, Okta, Azure, Keycloak, or your own Authgear project.

## Discovery URL Formats by Provider

The path `/.well-known/openid-configuration` is always the same, but the base issuer URL varies. Some providers (notably Azure and Keycloak) include a tenant or realm segment in the URL:

<div class="ag-table-wrap">
  <table class="ag-table">
    <thead>
      <tr>
        <th>Provider</th>
        <th>Discovery URL Format</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Google</td>
        <td><code>https://accounts.google.com/.well-known/openid-configuration</code></td>
      </tr>
      <tr>
        <td>Microsoft (Azure AD)</td>
        <td><code>https://login.microsoftonline.com/{tenant}/v2.0/.well-known/openid-configuration</code></td>
      </tr>
      <tr>
        <td>Okta</td>
        <td><code>https://{yourOktaDomain}/.well-known/openid-configuration</code></td>
      </tr>
      <tr>
        <td>Auth0</td>
        <td><code>https://{yourDomain}/.well-known/openid-configuration</code></td>
      </tr>
      <tr>
        <td>Keycloak</td>
        <td><code>https://{host}/realms/{realm}/.well-known/openid-configuration</code></td>
      </tr>
      <tr>
        <td>Authgear</td>
        <td><code>https://{your-project}.authgear.cloud/.well-known/openid-configuration</code></td>
      </tr>
    </tbody>
  </table></div>

## How to Fetch the Document

### In the browser (no setup)

Use the [Authgear OIDC Discovery Endpoint Explorer](/tools/oidc-discovery-endpoint). Enter any issuer URL and click Fetch. You'll get the full JSON document with a structured summary of the key endpoints.

### With curl

```bash
# Fetch and pretty-print the discovery document
curl -s https://accounts.google.com/.well-known/openid-configuration | python3 -m json.tool

# Extract just the authorization endpoint
curl -s https://accounts.google.com/.well-known/openid-configuration | jq '.authorization_endpoint'

# Extract the JWKS URI
curl -s https://accounts.google.com/.well-known/openid-configuration | jq '.jwks_uri'
```

### In application code (Node.js)

```javascript
// Fetch the discovery document and extract endpoints
async function getOIDCConfig(issuerUrl) {
  const discoveryUrl = `${issuerUrl}/.well-known/openid-configuration`;
  const response = await fetch(discoveryUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch discovery document: ${response.status}`);
  }

  const config = await response.json();

  return {
    authorizationEndpoint: config.authorization_endpoint,
    tokenEndpoint: config.token_endpoint,
    jwksUri: config.jwks_uri,
    userinfoEndpoint: config.userinfo_endpoint,
    endSessionEndpoint: config.end_session_endpoint,
  };
}

// Usage
const config = await getOIDCConfig('https://your-project.authgear.cloud');
console.log(config.authorizationEndpoint);
```

### In application code (Python)

```python
import requests

def get_oidc_config(issuer_url):
    discovery_url = f"{issuer_url.rstrip('/')}/.well-known/openid-configuration"
    response = requests.get(discovery_url)
    response.raise_for_status()
    return response.json()

config = get_oidc_config('https://your-project.authgear.cloud')
print(config['authorization_endpoint'])
print(config['jwks_uri'])
```

## Why Auto-Discovery Matters

Without auto-discovery, integrating with an OIDC provider involves hardcoding a list of endpoint URLs into your application. This creates real problems:

<ul>
  <li><strong>Provider changes break your app.</strong> If the provider changes an endpoint URL, your app breaks silently until someone notices.</li>
  <li><strong>Multi-tenant apps need different config per tenant.</strong> Azure AD has a different URL per tenant. Without discovery, managing this is a hardcoded map. With discovery, you construct the URL dynamically from the tenant ID.</li>
  <li><strong>JWKS rotation breaks token verification.</strong> Providers rotate signing keys. If you've hardcoded the public key, your token verification breaks after rotation. Fetching from <code>jwks_uri</code> &mdash; found in the discovery document &mdash; handles this automatically.</li>
</ul>

Discovery makes your OIDC integration resilient and self-configuring. Most mature OAuth/OIDC libraries (Passport.js, python-social-auth, Spring Security, etc.) accept an issuer URL and handle the rest automatically by fetching the discovery document.

**Need an issuer that gets discovery right?** Authgear gives you a fully compliant OIDC provider — discovery document, JWKS, and token endpoints all managed for you. <a href="https://portal.authgear.com/" target="_blank" rel="noreferrer" class="plausible-event-name--signup plausible-event-location--post-inline">Start for free</a> and point your library at your issuer URL.

## What Happens If Discovery Fails

If a fetch to `/.well-known/openid-configuration` fails, common causes are:

<ul>
  <li><strong>The provider doesn't support OIDC Discovery</strong> &mdash; some older or custom identity systems don't publish a discovery document. You'll need to configure endpoints manually.</li>
  <li><strong>Wrong issuer URL</strong> &mdash; the discovery URL is constructed from the issuer, so a wrong base URL means a 404. Check the provider's documentation for the exact issuer format (especially for Azure AD and Keycloak, which include tenant/realm segments).</li>
  <li><strong>CORS restrictions</strong> &mdash; some providers restrict cross-origin access to the discovery endpoint. Browser-based fetches may fail even if curl works.</li>
  <li><strong>Private or internal provider</strong> &mdash; the provider is not reachable from the public internet. This is expected for internal deployments.</li>
</ul>

## The Discovery Document and the JWKS URI

The `jwks_uri` field in the discovery document is one of the most important. It points to the JSON Web Key Set — the public keys your application needs to verify JWT signatures. Every time your app receives an ID token or access token, it should verify the signature against the keys at this URI. The tokens themselves are JWTs — three Base64URL-encoded segments — so you can inspect a token's header or payload by pasting a segment into the [free Base64 decode tool](/tools/base64-decode-encode).

To learn more about how the JWKS URI works and how to use it in token verification code, see [What Is a JWKS URI? JWT Key Sets Explained for Developers](/post/what-is-jwks).

## Using .well-known/openid-configuration with Authgear

Every Authgear project publishes a discovery document at `https://your-project.authgear.cloud/.well-known/openid-configuration`. It includes all required OIDC fields plus Authgear-specific extensions. When you integrate your app with Authgear using any standard OIDC library, you just provide the issuer URL — the library fetches the discovery document and configures itself automatically.

## Next Steps

<ul>
  <li><a href="/tools/oidc-discovery-endpoint">Inspect any provider's discovery document</a> with the free OIDC Discovery Endpoint Explorer</li>
  <li>Learn about JWKS in <a href="/post/what-is-jwks">What Is a JWKS URI? JWT Key Sets Explained for Developers</a></li>
  <li>Compare the two big SSO protocols in <a href="/post/oidc-vs-saml">OIDC vs SAML: When to Use Each for Modern SSO</a></li>
  <li>Understand the tokens themselves in <a href="/post/jwe-vs-jwt">JWE vs JWT: Key Differences, Use Cases, and Security Tips</a></li>
</ul>
