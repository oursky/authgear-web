---
title: "Single Sign-On with Custom Login UIs, Faster Login Pages, and Shared Computer Mode"
excerpt: "The 2026-08-12 release of Authgear closes a long-standing gap for teams that build their own login UI: single sign-on now works there too. It also makes login pages meaningfully lighter and adds a one-click way to protect users on shared computers."
coverImage: ./cover.webp
publishedAt: 2026-08-12T00:00:00.000Z
draft: false
---

### Single sign-on with your custom login UI

Authgear lets you replace its built-in login pages with a custom UI, so the whole authentication experience matches your brand. That flexibility used to come with a trade-off. When a user who was already signed in to one of your apps opened another one, Authgear redirected them to your custom UI for a full login, even though a valid session already existed in the browser.

This release removes the trade-off. When a user has an active session, Authgear now shows the "Continue as..." screen instead, and the user gets into the second app with a single click. No password, no OTP, no second login.

To use it, your project needs a custom domain, and your custom UI must be hosted on the same root domain so the session cookie is shared. The [setup guide](https://docs.authgear.com/customization/custom-ui/single-sign-on-continuation-with-custom-ui) walks through the configuration.

### Login pages load faster

The login UI used to preload its icon fonts in every available format — eot, ttf, and woff2 — on every page. Browsers only ever use one of them, so the rest was wasted transfer: up to 24 MB of it.

The login UI now loads only the fonts the browser actually needs. Users on slow or metered connections will feel the difference most, and pages reach first paint sooner across the board.

### Shared computer mode, one click away

Last month's release added a `use_session_cookie` option that ends the Authgear session when the browser closes. This release makes it accessible without touching configuration: the "Cookie Session" page in the Portal is now called "Session," and it has a button to switch on Shared computer mode.

With it enabled, sessions don't persist after the browser closes. That's the behavior you want for kiosks, library terminals, and shared workstations, where the next person at the keyboard shouldn't inherit the previous user's session.

### Also in this release

- Fixed a crash when a request's `X-Forwarded-Host` header contained multiple values
- Fixed a "page not found" error when opening the Identities page
- Fixed several issues in the project onboarding wizard (color picker, option selection, and survey questions)
- Misc bug fixes and improvements

The release is live on Authgear Cloud. If you self-host, grab the `2026-08-12.0` image from the [GitHub releases page](https://github.com/authgear/authgear-server/releases).
