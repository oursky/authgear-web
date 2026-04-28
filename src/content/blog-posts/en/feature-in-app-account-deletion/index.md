---
title: "2022 February Update: In-app Account Deletion"
excerpt: "We are helping you to give your users more control over their data. Now you can bring the Delete your account button to your app with a few clicks."
coverImage: ./cover.png
category: features
featured: false
metaTitle: "2022 February Update: In-app Account Deletion"
metaDescription: "We are helping you to give your users more control over their data. Now you can bring the Delete your account button to your app with a few clicks."
canonicalUrl: /post/feature-in-app-account-deletion
publishedAt: 2022-02-28T08:57:38.051Z
updatedAt: 2026-02-12T02:33:17.650Z
draft: true
---

Privacy protection regulations related to <a href="https://en.wikipedia.org/wiki/Right_to_be_forgotten" target="_blank">“Right to be Forgotten”</a>, also known as “Right to Erasure”, have been introduced in several jurisdictions, such as GDPR in the European Union. In addition, Apple also announced that <a href="https://developer.apple.com/news/?id=i71db0mv" target="_blank">every app listed on its App Store must allow users to initiate account deletion in-app</a>, which will be effective on June 30, 2022.

## The Delete Your Account Button

We are helping you to give your users more control over their data. Now you can bring the **Delete your account** button to your app with a few clicks.

<!--FIGURE-->
![](./figure-1.png)
<!--/FIGURE-->

If you use the pre-built frontend provided by Authgear for privacy settings, this button will show inside the “My Account” panel. It is designed to be easy to find in your app.

<!--FIGURE-->
![](./figure-2.png)
<!--/FIGURE-->

You can change the **Grace Period** of how long the account will be deactivated before deletion in the Authgear Portal.

<!--FIGURE-->
![](./figure-3.png)
<!--/FIGURE-->

Alternatively, if you opt to implement your own **Delete Account** button, you can initiate deletion from the <a href="https://docs.authgear.com/integrate/account-deletion#initiate-deletion-from-admin-api" target="_blank">Admin API</a> in your backend server.

## New Webhook Events

Deleting the account is not only removing the data on Authgear, it’s expected all the personal data should be erased along with the account.

<p>This update also introduces useful webhook events like <code>user.disabled</code>, <code>user.deletion_scheduled</code> and <code>user.deleted</code> to help you integrate with other parts of your system.</p>

Learn more about the integration details by reading <a href="https://docs.authgear.com/integrate/account-deletion" target="_blank">the documentation of Account Deletion</a>.
