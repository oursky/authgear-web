---
title: "One-Step Logout, client_secret_basic Support, and a Redesigned Fraud Protection Page"
excerpt: "The 2026-07-30 release of Authgear removes friction in three places: the logout flow your users see, the way third-party platforms connect to your project, and the visibility you get into fraud protection."
coverImage: ./cover.webp
publishedAt: 2026-07-30T00:00:00.000Z
draft: false
---

### Logout without the confirmation page

Until now, when your app sent a user to Authgear's logout endpoint, they saw a confirmation page asking whether they really wanted to log out. That extra step exists for safety when Authgear can't tell which app the request came from. But if your app can prove the request is legitimate, the step is unnecessary.

That proof is the `id_token_hint`. Authgear now supports it in RP-Initiated Logout, following the OpenID Connect specification. Pass the user's ID token when you call the `end_session` endpoint, and Authgear ends the session and redirects the user straight back to your app via `post_logout_redirect_uri`. From the user's point of view, they click "Log out" once and they're done.

If you don't pass an `id_token_hint`, nothing changes: the confirmation page still appears.

### Connect platforms that use client_secret_basic

OAuth clients can authenticate to the token endpoint in more than one way. Authgear previously expected `client_secret_post`, where credentials travel in the request body. Many platforms and OIDC libraries default to `client_secret_basic` instead, where credentials go in the HTTP Authorization header, and some support only that method.

Authgear's token endpoint now accepts `client_secret_basic`. In practice, this means platforms like Shopify that authenticate this way can connect to Authgear as an identity provider without workarounds.

### A clearer view of fraud protection

The Fraud Protection page in the Portal has been rebuilt around two tabs.

The overview tab shows a chart of requests over time, so you can spot an SMS pumping attempt or unusual traffic at a glance. Below it, top lists surface the source IPs generating the most requests, with location data resolved for each IP.

The logs tab lists individual fraud protection decisions. You can choose which columns to display and filter by a custom date range, down to the time of day.

One behavior change ships alongside the redesign: phone numbers a user has already verified are now always allowed. A legitimate user re-authenticating from a new device won't be blocked from receiving their OTP, even during an active attack.

### Also in this release

- The Advanced settings pages in the Portal (Admin API, Account Deletion, Cookie Lifetime, custom email and SMS providers, SAML Certificate, and more) have a new design
- Login errors from social providers now show a readable message instead of a raw error code
- A new `use_session_cookie` option ends the Authgear session when the user closes the browser
- Fixed: access tokens were not issued when the `offline_access` scope was missing
- Fixed: the "Discard changes" dialog in the Portal sometimes appeared when nothing had changed
- Fixed: the project setup wizard failed to save when the project name contained a quote

The release is live on Authgear Cloud. If you self-host, grab the `2026-07-30.0` image from the [GitHub releases page](https://github.com/authgear/authgear-server/releases).
