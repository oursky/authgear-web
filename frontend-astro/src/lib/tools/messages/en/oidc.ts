export const oidc = {
  metaTitle: 'OIDC Discovery Endpoint Explorer | Authgear',
  metaDescription:
    "Fetch and inspect any OIDC provider's .well-known/openid-configuration. View authorization endpoints, token endpoints, JWKS, scopes, and signing algorithms.",
  heroTitle: 'OpenID Connect Discovery Explorer',
  heroDescription:
    'Enter any OIDC issuer URL to fetch its discovery endpoint. Instantly inspect the full .well-known/openid-configuration endpoints, supported scopes, signing algorithms, and JWKS, no login required.',
  iframeTitle: 'OIDC Discover Endpoint Explorer',
  policyLine1:
    'Your data security is our top priority. Everything runs locally in your browser.',
  policyLine2:
    'The tool fetches the discovery document directly from the OIDC provider using your browser. Authgear never sees or logs your requests.',
  card1Title: 'OpenID Configuration Fetching',
  card1Desc:
    'Automatically fetch the OpenID Connect discovery document from /.well-known/openid-configuration based on the issuer URL you provide.',
  card2Title: 'Key Endpoints Summary',
  card2Desc:
    'Quickly view essential endpoints and identifiers, including the issuer, authorization endpoint, token endpoint, JWKS URI, and other commonly used configuration fields.',
  card3Title: 'JSON Discovery Output',
  card3Desc:
    'Inspect the full discovery document in a syntax-highlighted JSON view. Easily copy the entire response or individual fields for debugging or documentation.',
  s1Label: 'Step 1.',
  s1Title:
    'Enter the Discovery URL (for example: https://accounts.google.com/.well-known/openid-configuration or https://project.authgear.cloud/.well-known/openid-configuration) and click Fetch.',
  s2Label: 'Step 2.',
  s2Title: 'Review the parsed metadata, core endpoints, and provider capabilities.',
  s3Label: 'Step 3.',
  s3Title: 'Copy individual fields with one click, inspect raw JSON, or see the JWKS.',
  faq1Title: 'What is the discovery endpoint in OIDC?',
  faq1Body:
    "The OIDC discovery endpoint is a standardized URL at {issuer}/.well-known/openid-configuration that returns a JSON document describing the provider's configuration. It lists the authorization endpoint, token endpoint, JWKS URI, supported scopes, response types, signing algorithms, and other capabilities. Clients can use it to configure themselves automatically without hardcoding endpoint URLs.",
  faq2Title: 'Do all OIDC providers support discovery?',
  faq2Body:
    "Most modern, compliant OIDC providers support discovery. It is required by the OpenID Connect specification for providers that want to support automatic client configuration. Some older or proprietary identity systems may not expose a /.well-known/openid-configuration endpoint — in that case, you'll need to configure endpoints manually. If a fetch in this tool fails, the provider either doesn't support discovery or has access restrictions on the endpoint.",
  faq3Title: 'What is the actual OpenID discovery URL?',
  faq3Body:
    "The discovery URL format is {issuer}/.well-known/openid-configuration, where {issuer} is the base URL of your OpenID Connect provider. For example: Google uses https://accounts.google.com/.well-known/openid-configuration, Okta uses https://{yourOktaDomain}/.well-known/openid-configuration, and Authgear uses https://{your-project}.authgear.cloud/.well-known/openid-configuration. Enter any issuer URL above and this tool will fetch it automatically.",
  faq4Title: 'What is a discovery endpoint?',
  faq4Body:
    "A discovery endpoint is a well-known URL that a service exposes to describe its capabilities and configuration. In OpenID Connect, the discovery endpoint follows the path /.well-known/openid-configuration (defined in RFC 8414). It allows client applications to dynamically discover the provider's endpoints and supported features without manual configuration.",
  faq5Title:
    'Do OIDC providers from the same vendor (Okta, Azure, Keycloak) have different discovery URLs?',
  faq5Body:
    'Yes. The discovery URL format is consistent (/.well-known/openid-configuration), but the base issuer URL differs. For Azure AD, it\'s typically "https://login.microsoftonline.com/{tenant-id}/v2.0". For Keycloak, it\'s "https://{host}/realms/{realm}". For Okta, it\'s "https://{yourOktaDomain}". Enter the issuer URL for your provider above and the tool resolves the full discovery URL automatically.',
} as const;
