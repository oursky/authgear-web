---
title: "Tech Giants Take One Step Closer to a Future without Passwords"
excerpt: "Apple, Google, and Microsoft have committed to make passwords a thing of the past, taking another step towards a future without passwords. "
coverImage: ./cover.png
category: industry
featured: false
metaTitle: "Tech Giants Take One Step Closer to a Future without Passwords"
metaDescription: "Apple, Google, and Microsoft have committed to make passwords a thing of the past, taking another step towards a future without passwords. "
canonicalUrl: /post/tech-giants-take-one-step-closer-to-a-future-without-passwords
publishedAt: 2022-08-23T05:34:31.215Z
updatedAt: 2026-02-12T02:36:01.291Z
draft: false
---

<script type="application/ld+json">
    {
        "@context":"http://schema.org",
        "@type":"NewsArticle",
        "mainEntityOfPage":{
                            "@type":"WebPage",
                            "@id":"/post/tech-giants-take-one-step-closer-to-a-future-without-passwords#webpage",
														"url":"/post/tech-giants-take-one-step-closer-to-a-future-without-passwords"
                        },
        "headline":"Tech Giants Take One Step Closer to a Future without Passwords",
        "image":{
            "@type":"ImageObject",
            "url":"https://uploads-ssl.webflow.com/60658b47b03f0c77e8c14884/630451c10ef53f09f03295a7_future-without-passwords.png",
            "width":1173,
            "height":560
        },
        "datePublished":"2022-08-23",
        "dateModified":"2022-08-23",
        "description":"Apple, Google, and Microsoft have committed to make passwords a thing of the past, taking another step towards a future without passwords.",
        "author":{
            "@id":"https://www.oursky.com/#organization"
        },
        "publisher":{
            "@type":"Organization",
            "name":"Oursky",
            "@id":"https://www.oursky.com/#organization",
            "logo":{
                "@type":"ImageObject",
                "@id":"https://www.oursky.com/#logo",
                "url":"https://oursky.com/assets/img/og-image.png",
                "caption":"Oursky"
              }
        }
    }
    </script>

Despite all their cons, passwords remain the most popular mechanism for enforcing security to protect users’ data. Some may think that the idea of “the future without passwords” is not new. There are existing authentication techniques, like biometric sensors and hardware keys, that do not require users to enter complex passwords to sign in. However, the initial account creation still requires the use of passwords due to various reasons that will be explained in the "Existing Passwordless Options" section.

Earlier this year, <a href="https://www.theverge.com/2022/5/5/23057646/apple-google-microsoft-passwordless-sign-in-fido" target="_blank">Apple, Google and Microsoft united to work on implementing passwordless sign-in on all major platforms</a>.  During its World-Wide Developers Conference in May 2022 (WWDC22), Apple announced the use of passkeys for the future without passwords through its <a href="https://thetechtutor.medium.com/a-future-without-passwords-dfc7d755f9f1" target="_blank">2022 rollout of iOS16 and macOS Ventura</a>. The iOS and macOS rollout that took place in the fall of 2022 and <a href="https://android-developers.googleblog.com/2022/10/bringing-passkeys-to-android-and-chrome.html" target="_blank">Google's announcement of bringing passkey support to Android and Chrome in Oct 2022</a> were a huge step towards the actualization of the future without passwords. However, many people have yet to fully understand how we can have a true passwordless digital world, which leads to the idea of passkeys. In this blog post, we’ll discuss what’s wrong with passwords and how passkeys work to get us closer to a future without passwords.

<ul>
    <li><a href="#passwords">What Is Wrong With Passwords?</a></li>
    <li><a href="#passwordless">Existing Passwordless Options</a></li>
    <li><a href="#passkeys">Passkey: A Step Closer to a Future Without Passwords</a></li>
    <li><a href="#authgear">Support Passkeys on Your Apps With Authgear</a></li>        
</ul>

<h2 id="passwords">What Is Wrong With Passwords?</h2>

Passwords have several vulnerabilities. First of all, passwords are shared secrets. When users create new accounts, their passwords are stored in a server. The server verifies a user’s identity by comparing the stored one with what the user enters. Hackers can attack the servers and gain access to users' passwords. Even if developers implement storage of passwords with <a href="/post/password-hashing-salting" target="_blank">hashing and salting</a> correctly, it is still possible that the server software leak passwords in other bugs: such as via <a href="https://www.theregister.com/2022/05/27/github_publishes_a_post_mortem/" target="_blank">leaving passwords in logs.</a> Passwords are also very susceptible to different types of attacks such as phishing, MITM, etc.

In addition, it is said that <a href="https://dataprot.net/statistics/password-statistics/" target="_blank">a single password is used to access five accounts on average</a>, which is a leading factor in why people are hacked. Using different passwords can also be a risk factor since people might have a hard time remembering all of them. As a result, tech giants like Apple, Google and Microsoft are working together to create a future without passwords with passkeys.

<h2 id="passwordless">Existing Passwordless Options</h2>

There are already several passwordless options that exist. Below are some examples.

- One Time Passwords (OTP)
- Hardware Keys
- Biometrics
- Magic Links

In general, going passwordless is more secure than user-generated passwords since the credentials used for passwordless authentication are harder for hackers to replicate or spoof.

Nevertheless, the current state of passwordless authentication isn't enough for everyday use yet. Hardware keys are inconvenient to use and backup limited its popularity. You can't transfer biometric data between iOS and Android devices. Hackers can intercept OTPs sent through SMS or emails before they reach the intended users or they can get the OTPs through phishing.

<h2 id="passkeys">Passkey: A Step Closer to a Future Without Passwords</h2>

<!--FIGURE-->
![](./figure-1.png)
<!--/FIGURE-->

Furthermore, Authgear also comes with a set of authentication and user management features, such as pre-built signup and user profile pages, user analytics, WhatsApp OTP, social logins, etc., to help you provide better user experience, increase app conversion rate, and boost user retention rate.

Learn more about our <a href="/features/passkeys" target="_blank">Passkey API</a> or <a href="/talk-with-us" target="_blank">request a demo</a> to see how you can benefit from Authgear.
