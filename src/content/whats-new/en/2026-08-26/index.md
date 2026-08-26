---
title: "Create Applications Starting from Your Framework, Clearer Flow Errors, and Faster Audit Logs"
excerpt: "The 2026-08-26 release of Authgear rebuilds the very first thing every developer touches: creating an application. It also makes misconfigured login flows fail loudly instead of mysteriously, and ships performance work in the Portal and at the token endpoint."
coverImage: ./cover.webp
publishedAt: 2026-08-26T00:00:00.000Z
draft: false
---

### Start with your framework, not an application type

Until now, creating an application in the Portal started with an abstract question: is this a single-page app, a native app, or a traditional web app? You picked one, got a generic config screen, then went off to the docs to figure out what applied to your stack.

The new Create Application wizard flips that around. You start by picking the framework you're actually building with: Next.js, Vue, Angular, iOS, Android, Flutter, Ionic, and more, with server-side options like Express.js and Flask, plus an OIDC/SAML option for everything else, including WordPress. Authgear figures out the right application type and settings from your choice.

Each framework comes with a starter kit and a Quick Start that walks you through the remaining steps, including setting your redirect URI, right inside the Portal. Instead of bouncing between the Portal and the documentation, you follow the steps and get to your first working login in minutes.

The applications list has been redesigned to match, showing each app's framework at a glance.

### Misconfigured login flows now fail loudly, and earlier

If you customize authentication flows and make a configuration mistake, the failure used to be quiet and confusing. End users hit a generic error, and nothing pointed you at the actual problem.

This release fixes that at two levels. At runtime, users now see a specific "flow misconfigured" message instead of a generic error, so support tickets point in the right direction. And when you save your configuration, Authgear now validates flow step references, so a typo in a `target_step` is caught at save time instead of surfacing as a broken login later.

### Faster audit logs and token requests

Two performance improvements land in this release. The audit log page in the Portal now uses a new database index, so it loads much faster on projects with large log volumes. And the token endpoint makes fewer redundant database queries per request, which means snappier logins for your users under load.

### Also in this release

- Misc bug fixes and security improvements

The release is live on Authgear Cloud. If you self-host, grab the `2026-08-26.0` image from the [GitHub releases page](https://github.com/authgear/authgear-server/releases).
