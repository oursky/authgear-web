---
title: "Password Spraying: What It Is and How to Prevent It?"
excerpt: "Learn more about password spraying and the different methods to protect your users from it with Authgear."
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "Password Spraying: What It Is and How to Prevent It?"
metaDescription: "Learn more about password spraying and the different methods to protect your users from it with Authgear."
publishedAt: 2023-02-02T08:15:27.184Z
updatedAt: 2026-02-12T02:36:01.268Z
draft: false
---

    
    
The meteoric rise of cybercrime has been unprecedented, with the world now expected to lose a staggering <a href="https://www.analyticsinsight.net/online-industries-most-targeted-by-cyber-attacks/" target="_blank">$10.5 trillion</a> to attackers by 2025. Cybercriminals have no shortage of methods to choose from when looking to exploit their victims. But the most successful involves passwords. As much as <a href="https://financesonline.com/password-statistics/" target="_blank">81 percent</a> of all business data breaches are the result of poor passwords.

In particular, attackers love to use a technique called password spraying, whose success rate is surprisingly high. So, what is password spraying, and how can organizations prevent it? This guide provides an overview of this attack and the steps that users and organizations can take to protect their digital assets from a password spray attack.

Let's delve right in!

<nav id="table-of-content">
    <ul> 
        <li><a href="#def">What Is Password Spraying?</a></li>
        <li><a href="#steps">How Does Password Spraying Work?</a></li>
        <li><a href="#diff">Password Spraying Vs. Credential Stuffing</a></li>
        <li><a href="#solution">How to Prevent Password Spraying</a>
            <ul>
                <li><a href="#org">Organizational Strategies to Prevent Password Spraying</a></li>
                <li><a href="#user">From the User’s Side</a></li>
            </ul>
        </li>
    </ul>
 </nav>

<h2 id="def">What Is Password Spraying?</h2>

<!--FIGURE-->
![](./figure-1.webp)
<!--/FIGURE-->

Password spraying is a type of brute force attack where adversaries attempt to gain access to multiple accounts on the same service or platform by repeatedly entering common passwords. It differs from a traditional brute force attack in that only one password is used. This technique has been popularized by attackers because it allows them to remain undetected for extended periods of time.

But what makes password spray attacks so effective? The primary reason is that most internet users prefer to use simple passwords that are easy to remember. As a matter of fact, the password "123456" is used by a shocking <a href="https://www.ncsc.gov.uk/news/most-hacked-passwords-revealed-as-uk-cyber-survey-exposes-gaps-in-online-security" target="_blank">23 million people</a>.

In addition, many people reuse the same password across multiple accounts and services. Unfortunately, attackers are well aware of this fact, and they use it to their advantage by guessing common passwords with a single attack. If a criminal can gain access to even a few of your company accounts, they'll likely be able to view vital information such as financials, customer data, and more. The repercussions can be devastating.

<h2 id="steps">How Does Password Spraying Work?</h2>

A password spraying attack generally goes through three stages. Here's a closer look at each of them.

### Stage 1: Attackers Buy or Create a List of Usernames

Before launching a password spray attack, the attacker must obtain or create a list of usernames that are linked to the target account. Attackers can go about this in many different ways. For example, they may use publicly available information, such as corporate directories, to compile their list.

Alternatively, attackers could purchase lists from underground markets. With more than <a href="https://www.computerweekly.com/news/252485713/Over-15-billion-credentials-for-sale-on-dark-web" target="_blank">15 billion</a> credentials currently listed for sale on the dark web, getting the information they need to launch an attack is a breeze.

### Stage 2: Cybercriminals Get a List of Commonly Used Passwords

Armed with a list of usernames, the attacker will then begin to compile a list of passwords they can use together with those usernames to breach the target accounts. Unfortunately, most of the passwords used in these types of attacks are surprisingly easy to procure. Sources like Wikipedia and other reports publish thousands of common passwords. Hackers may also try to guess passwords using publicly available information about their target, such as birth dates, favorite football teams, and pet names.

### Stage 3: Attackers Try the Username-Password Combinations

Finally, with a list of usernames and passwords in hand, the attacker can begin the attack. The goal is to access as many accounts as possible without raising suspicion or triggering account lockout policies. During this stage, the attacker will try each username-password combination and quickly move on to the next username if it does not work. Most attackers automate this process using custom scripts, making it even more difficult to detect. By the end of the attack, some of the accounts may have been compromised, potentially giving criminals access to sensitive company data.

<h2 id="diff">Password Spraying Vs. Credential Stuffing</h2>

Another common form of attack is <a href="/post/credential-stuffing" target="_blank">credential stuffing</a>, which relies on the fact that many individuals use identical login credentials for multiple accounts. Credential stuffing involves placing these completely validated username and password combinations, typically obtained through a data breach, into another system's access portal. This malicious technique increases the probability of bypassing authentication measures due to users reusing passwords across various platforms.

In contrast to credential stuffing, password spray attacks involve testing some common passwords across a large number of accounts.

Thus, credential stuffing involves using a single set of credentials to gain access to other systems or applications, whereas password spraying entails using common passwords for different username.

<h2 id="solution">How to Prevent Password Spraying</h2>

Warding off password spraying attacks is the responsibility of both the individual users and the organization as a whole. Here's a closer look at what each party can do to stay secure.

<h3 id="org">Organizational Strategies to Prevent Password Spraying</h3>

A successful breach can be catastrophic to a company. <a href="https://worldr.com/blog/60-of-small-businesses-fail-after-a-cyberattack.-why" target="_blank">60 percent</a> of small businesses go out of business within six months after a security breach. They simply can't survive the legal, reputational, financial, and operational costs associated with a data breach. As such, businesses must also take proactive steps to protect against automated attacks, especially password spraying. Fortunately, there are many tools that companies can use to mitigate the risk of password spraying, including:

#### Multi-Factor Authentication (MFA)

<a href="/post/what-is-multi-factor-authentication-mfa" target="_blank">Multi-factor authentication</a> (MFA) refers to an authentication technique whereby users are prompted to provide two or more pieces of evidence in order to verify their identity. This means that even if a criminal manages to guess the user’s login credentials, they cannot access the account without the additional security codes.

<!--FIGURE-->
![](./figure-2.webp)
<!--/FIGURE-->

For example, MFA can require a user to first enter their username and then provide an additional layer of authentication like <a href="/post/sms-otp-vulnerabilities-and-alternatives" target="_blank">SMS OTP</a> or a biometric authentication like face or fingerprint recognition.

#### Passkeys

Passkeys are an advanced form of authentication that allows a user to log into a web application without the need for a complex password. With a passkey, the user only needs to provide a username if they want to sign up. After this, they're authenticated through a PIN or biometric information, just like you do when unlocking your phone. This new authentication method <a href="/features/passkeys" target="_blank">removes the need for passwords</a>.

#### Biometric Authentication

<a href="/post/biometric-authentication" target="_blank">Biometric authentication</a> relies on an individual’s physical traits, such as their fingerprints or face, to gain access to the system. It has become one of the most common method of authentication and is more secure than traditional passwords because inherence factors are very difficult to forge, making them one of the most reliable forms of authentication. In addition, biometric authentication is quick and easy to use, adding an extra layer of security without compromising the user experience.

<div class="cta-v2">
	<h2 class="title cta-split-content-left">Go Passwordless with Authgear</h2>
  <p class="cta-v2-paragraph">Let Authgear protect your users from password spraying</p>
  <a href="/schedule-demo/" target="_blank" class="w-inline-block">
  	<div class="cta-v2-ctabtn button-primary">Request Demo

<h3 id="user">From the User’s Side</h3>

#### Use a Password Manager

Unique passwords are difficult to guess or crack. A password manager can help users generate passwords to include upper case and lower case letters, special characters, and numbers. These tools are also perfect for securely storing your passwords, so you don’t have to rely on your memory.

#### Use Different Passwords for Different Accounts

Don’t use the same password across multiple accounts. Doing so puts the security of all your accounts at risk, as criminals can easily gain access to all of them if they manage to crack one.

#### Use Multi-Factor Authentication

Multi-factor authentication (MFA) requires users to provide two or more forms of identification when signing into their accounts. This ensures that even if an attacker manages to guess the user's login credentials, they cannot gain access to their account without the additional security code.

## Build Your Defense Against Password Spraying Today

Password spraying can cause serious damage to companies and individuals. That's why it’s important to implement the necessary security measures to prevent it. Generally, the risks posed by successful password spraying attacks largely depend on what role the individual in your company who has been breached plays in the organization. The more privileged a user is, and the more vital the data that was accessed during the attack, the higher the risk of a successful attack becoming catastrophic to your business.

The good news is that you can protect your organization against password spraying. With <a href="/" target="_blank">Authgear</a>, you have access to an array of highly advanced security features to protect businesses from password spraying and credential stuffing attacks. Biometric Logins, Whatsapp OTPs as MFA, and Passkey-enabled passwordless logins are some of Authgear's remarkable tools that guarantee protection against these attacks.

<a href="/schedule-demo/" target="_blank">Get in touch with us today</a> to find out how we can help you build a robust defense against potential threats.
