---
title: "How to protect your users from automated attacks"
excerpt: "Let’s explore the best ways to protect your users from the rapidly evolving menace of automated attacks."
coverImage: ./cover.jpg
category: industry
featured: false
metaTitle: "How to protect your users from automated attacks"
metaDescription: "Let's explore the best ways to protect your users from the rapidly evolving menace of automated attacks."
canonicalUrl: https://www.authgear.com/post/how-to-protect-your-users-from-automated-attacks
publishedAt: 2026-02-12T02:41:55.931Z
updatedAt: 2026-02-12T02:35:14.204Z
draft: false
---

<script type="application/ld+json">
    {
        "@context":"http://schema.org",
        "@type":"NewsArticle",
        "mainEntityOfPage":{
                            "@type":"WebPage",
                            "@id":"https://www.authgear.com/post/how-to-protect-your-users-from-automated-attacks/#webpage",
														"url":"https://www.authgear.com/post/how-to-protect-your-users-from-automated-attacks"
                        },
        "headline":"How to protect your users from automated attacks",
        "image":{
            "@type":"ImageObject",
            "url":"https://uploads-ssl.webflow.com/60658b47b03f0c77e8c14884/61b6d451403cc3fa26c67f19_How%20to%20protect%20your%20users%20from%20automated%20attacks.jpg",
            "width":1223,
            "height":689
        },
        "datePublished":"2021-12-13",
        "dateModified":"2022-04-07",
        "description":"Let’s explore the best ways to protect your users from the rapidly evolving menace of automated attacks.",
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

Gartner projects that <a href="https://www.gartner.com/en/newsroom/press-releases/2021-07-21-gartner-predicts-by-2025-cyber-attackers-will-have-we" target="_blank">by 2025</a>, cyber attackers will have fully weaponized operational technology (OT) environments to cause critical harm to human users.  Consequently, enterprises must do more to protect their users from automated attacks to prevent the devastation they can bring. Let’s explore the best ways to protect your users from the rapidly evolving menace of automated attacks.

## What are Automated Attacks?

An automated attack or threat is one that uses sophisticated tools like bots to maliciously perform large amounts of repetitive tasks like password spraying with hardly any cost. For instance, an automated attack can utilize malicious bots to exploit vulnerabilities in your web application. Hackers can use bots like this to carry out DDoS attacks on your application and eventually crash your site.

### Common Types of Automated Attacks

There are numerous ways in which a cyber attacker can apply automation when compromising your user accounts. However, here are the most frequently used automated attack types.

#### Bots

Malicious bots are at the heart of automated attacks. Hackers use them to run automated tasks like data indexing and even attack execution. Automated bot attacks are also increasingly becoming the tool of choice for hackers looking to launch sophisticated attacks. For instance, within the first half of 2020, <a href="https://www.statista.com/statistics/1180124/human-initiated-automated-bot-attacks-volume-worldwide-region/" target="_blank">442 million automated bot attacks</a> were generated in North America alone, making it a significant threat.

#### Brute Force

Traditionally, <a href="https://www.kaspersky.com/resource-center/definitions/brute-force-attack" target="_blank">brute force attacks</a> refer to one that repeatedly tests multiple passwords from sources like a dictionary against a single account. Beyond passwords, hackers have been known to use brute force to guess encryption keys or uncover hidden web pages. While this trial and error may seem slow and ineffective, hackers can speed things up by repeatedly using bots to test the passwords or login info.

#### Credential Stuffing

<a href="/post/credential-stuffing" target="_blank">Credential stuffing</a> relies on the idea that many users typically reuse their passwords. It involves testing already compromised login credentials like username/password pairs obtained from another data breach. Credential stuffing is more potent because attackers can use bots to automate and scale their attacks. <a href="/post/authentication-security-password-reset-best-practices-and-more" target="_blank">Click here to see some password reset best practices</a>.

#### Password Spraying

This is another type of brute force attack. In a Password spraying automated attack, the hacker essentially tests a single (usually weak) password against many accounts on your application. For instance, an attacker could brute force your logins by using a default password (like Password@123) against multiple users on your application. This means they’re more likely to bypass account lockouts since they’re trying the same password on many different user accounts. Read on as we explore best practices for mitigating automated attacks based on the <a href="https://cheatsheetseries.owasp.org/cheatsheets/Credential_Stuffing_Prevention_Cheat_Sheet.html" target="_blank">OWASP cheatsheet</a>.

<div class="cta-v2">
	<h2 class="title cta-split-content-left">Stay Ahead of Cyberattacks with Authgear</h2>
  <p class="cta-v2-paragraph">Add user authentication and other security features to your apps</p>
  <a href="/talk-with-us" target="_blank" class="w-inline-block">
  	<div class="cta-v2-ctabtn button-primary">Get Demo

## Best Practices for Mitigating Automated Attacks

If you’re looking to protect your users from automated attacks, there are effective mechanisms you can implement across your organization. The following best practices can effectively help mitigate automated attacks in your organization.

### Multi-factor Authentication (MFA)

<a href="/post/what-is-multi-factor-authentication-mfa" target="_blank">Multi-factor authentication (MFA)</a> plays an essential role in protecting your users from automated attacks. This authentication best practice effectively adds a layer of protection to access your applications, making it even more difficult for automated attacks to bypass. <a href="https://techcommunity.microsoft.com/t5/Azure-Active-Directory-Identity/Your-Pa-word-doesn-t-matter/ba-p/731984" target="_blank">Analysis by Microsoft</a> suggests that MFA could have stopped 99.99% of user account compromises. The OWASP <a href="https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#protect-against-automated-attacks" target="_blank">cheatsheet for authentication</a> recommends that MFA be implemented wherever possible.

### Account Lockout

To a large extent, this authentication security mechanism is the most common one you can adopt for protecting your users from automated attacks. An account lockout mechanism prevents additional logins after a specific number of failed login attempts. This mechanism is effective as it locks out your user accounts rather than an attacker's source IP address. So, if an automated attack attempts to use a large number of IP addresses, the account will lockout after several failed login attempts. There are three key factors to consider when implementing an account lockout mechanism.

- **Lockout threshold:** This refers to the maximum number of failed login attempts before an account must be locked out.
- **Observation window:** The specific timeframe that the suspicion login attempts must occur within.
- **Lockout duration:** The duration the account will be locked out.

When implementing an account lockout mechanism, you’ll need to ensure that an attacker can’t use it to effect a denial of service attack. One way to prevent this is to allow your users to reset their passwords even when an account is locked out.

### CAPTCHA

Implementing a CAPTCHA can help you prevent automated login attempts on your user accounts. However, some automated attackers can exploit weaknesses in many CAPTCHA implementations. As a result, you cannot entirely rely on a CAPTCHA for preventing automated attacks. At best, they’re great for making automated login attempts on your user accounts more time-consuming rather than preventing them.

### Logging

Since cyber attackers are not in the business of giving notice before an attack, you’ll need to log and monitor all authentication activity across your application or network. Logging and monitoring essentially allow you to ensure that all password failures and account lockouts are logged and reviewed in real-time.

### Passwordless Login

Although authentication via usernames and passwords alongside MFA is secure, there are situations where this conventional protocol just isn’t feasible. For instance, if a third-party app needs to connect to your web application via a mobile device, it would be unsafe to allow it to store a username and password combination. In this case, a passwordless authentication protocol is recommended as it potentially limits access and attack surfaces to your application.

### Design your app to be password manager friendly

With<a href="https://www.infosecurity-magazine.com/news/password-reuse-60-15-billion/" target="_blank"> 60% of passwords being reused</a> across multiple accounts globally, you’re inadvertently at the mercy of credential stuffing and password spraying attacks. However, password managers can help your users create and securely store very complex passwords. By designing your application to be password manager friendly, you’d be protecting them from automated attacks.

## Closing Thoughts

With a wide range of tools and resources at the disposal of hackers, businesses must remain ahead in the quest to prevent attacks. Protecting your users from automated cyberattacks isn’t a one-off process. It requires continuous finetuning and awareness.

Authgear offers a Plug-and-play authentication and user management solution that allows you to seamlessly add user authentication and many other security features to your applications. These features like passwordless authentication, social logins, and 2FA can ultimately help to protect your users from automated attacks. <a href="/talk-with-us" target="_blank">Interested in Authgear? Let’s talk</a>.
