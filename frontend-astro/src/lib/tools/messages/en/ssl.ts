export const ssl = {
  metaTitle: 'SSL Checker — Free SSL Certificate Checker | Authgear',
  metaDescription:
    'Free SSL checker tool. Instantly inspect SSL/TLS certificate details, verify the certificate chain, and check expiration dates for any domain.',
  heroTitle: 'Free SSL Checker',
  heroDescription:
    'Enter any domain to instantly check its SSL/TLS certificate. View expiration date, issuer, subject alternative names (SANs), and full certificate chain status — no login required.',
  iframeTitle: 'SSL Certificate Inspector',
  card1Title: 'Certificate Details Inspection',
  card1Desc:
    'View detailed SSL certificate information for any HTTPS domain, including subject, issuer, validity period, subject alternative names (SANs), fingerprints, and other technical attributes.',
  card2Title: 'Certificate Chain Status',
  card2Desc:
    'Verify whether the certificate chain is complete and trusted. Quickly check chain validity, trusted root status, and the total number of certificates in the chain.',
  card3Title: 'Certificate Chain Visualization',
  card3Desc:
    'Inspect the full certificate hierarchy from the leaf certificate (your domain) through intermediate certificates to the root certificate authority.',
  s1Label: 'Step 1.',
  s1Title: 'Enter a website URL (for example: https://www.authgear.com/) and click Inspect.',
  s2Label: 'Step 2.',
  s2Title:
    'Retrieve certificate information. The tool connects to the server and fetches the SSL/TLS certificate presented by the website.',
  s3Label: 'Step 3.',
  s3Title:
    'Review certificate details and chain. The results display certificate metadata, chain status, and the full certificate hierarchy.',
  readyTitle: 'Ready to Add HTTPS and Authentication to Your App?',
  readySubtitle:
    "Authgear is an authentication platform that handles login, MFA, SSO, and session management for your app, so your team doesn't have to build it from scratch.",
  faq1Title: 'What Is an SSL Certificate?',
  faq1Body:
    "An SSL certificate (more accurately a TLS certificate — SSL is the older name that stuck) enables encrypted HTTPS communication between a user's browser and a web server. It does two things:\n\nEncryption — scrambles data in transit so it can't be read by anyone intercepting the connection.\n\nIdentity verification — proves that the server you're connecting to is actually who it claims to be, not an impostor. Certificates are issued by Certificate Authorities (CAs) — trusted third parties like Let's Encrypt, DigiCert, and Sectigo. When your browser connects to a site, it checks that the certificate was issued by a CA it trusts, the domain matches, and the certificate hasn't expired.",
  faq1MetaBody:
    "Types of SSL/TLS certificates:\n\nDV (Domain Validated)\nConfirms domain ownership only. Fast and cheap (Let's Encrypt is DV). Suitable for most sites.\n\nOV (Organization Validated)\nVerifies the organization behind the domain. Common for business sites.\n\nEV (Extended Validation)\nThe highest level; requires rigorous identity checks. Used by banks and large enterprises.",
  faq2Title: 'What Is a Certificate Chain?',
  faq2Body:
    "A certificate chain is a sequence of certificates that links your website's certificate back to a root Certificate Authority (CA) that browsers trust. The chain has three levels:\n\nLeaf certificate (your site's certificate) — issued directly to your domain.\n\nIntermediate certificate(s) — issued by the root CA to an intermediate CA, which then issues certificates to websites. This keeps the root CA offline and protected.\n\nRoot certificate — self-signed by a trusted CA. Pre-installed in browsers and operating systems.\n\nWhy does this matter?\nIf the intermediate certificate is missing from the server's configuration, browsers can't verify the chain and will show a security error — even if your leaf certificate is perfectly valid. This is one of the most common SSL configuration mistakes. Our checker visualizes the full chain so you can spot gaps instantly.",
  faq3Title: 'How long do SSL certificates last?',
  faq3Body:
    "Let's Encrypt certificates expire every 90 days (auto-renewing). Paid CA certificates typically last 1–2 years. Since September 2020, the maximum validity period for publicly trusted certificates is 398 days. Apple and Google are pushing toward 90-day maximums industry-wide.\n\nWhat happens when an SSL certificate expires?\n\nBrowsers immediately show a \"Your connection is not private\" error and block users from reaching the site. This is why monitoring expiry dates matters.",
  faq4Title: 'SSL vs TLS — What\'s the Difference?',
  faq4Body:
    'SSL (Secure Sockets Layer) is the original protocol, now deprecated. All versions of SSL have known security vulnerabilities. TLS (Transport Layer Security) is its successor and what all modern HTTPS connections actually use — TLS 1.2 and TLS 1.3.',
  faq4Body2:
    'The term "SSL certificate" is still widely used, but technically every certificate in use today is a TLS certificate. When people say "SSL checker", they mean checking the TLS certificate on a server. This tool checks both — it reports the TLS version negotiated and the certificate details.',
} as const;
