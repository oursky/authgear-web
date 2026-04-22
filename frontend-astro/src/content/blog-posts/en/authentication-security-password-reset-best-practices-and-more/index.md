---
title: "Password Reset Best Practices: Avoid Common Pitfalls and Secure Your Users"
excerpt: "Discover essential password reset best practices to safeguard your authentication system. Learn how to prevent common security breaches, protect user data, and enhance user experience. Bolster your application's security with expert insights and actionable tips."
coverImage: ./cover.jpg
category: engineering
featured: false
metaTitle: "Password Reset Best Practices: Avoid Common Pitfalls and Secure Your Users"
metaDescription: "Discover essential password reset best practices to safeguard your authentication system. Learn how to prevent common security breaches, protect user data, and enhance user experience. Bolster your application's security with expert insights and actionable tips."
canonicalUrl: /post/authentication-security-password-reset-best-practices-and-more
publishedAt: 2026-02-12T02:41:55.931Z
updatedAt: 2026-02-12T02:36:01.228Z
draft: false
---

## Mastering the Password Reset: Best Practices with Common Pitfalls and Solutions for Enhanced Security

Building a robust authentication system is essential for any digital product. While there are countless tutorials on implementing the basics, the nuances of security often get overlooked. One critical component that's frequently mishandled is the password reset flow.

We've dissected numerous authentication systems and uncovered common pitfalls that can leave your users vulnerable. In this article, we'll delve into these traps, explain the potential security risks, and provide actionable solutions to fortify your password reset process.

By the end, you'll have a clear understanding of how to safeguard your users' accounts and prevent unauthorized access.

<div class="ag-table-wrap">
  <table class="ag-table" role="table" aria-label="Password reset do's and don'ts">
    <caption>Password Reset: Quick Summary of Do’s and Don’ts</caption>
    <colgroup>
      <col style="width:50%;">
      <col style="width:50%;">
    </colgroup>
    <thead>
      <tr>
        <th scope="col">Don’ts</th>
        <th scope="col">Do’s</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <ul>
            <li>Don’t allow login ID guessing.</li>
            <li>Don’t use personally identifiable information (PII) in forgotten password links.</li>
            <li>Don’t use weak password hashing algorithms.</li>
            <li>Don’t enforce periodic password expiration policies.</li>
            <li>Don’t forget to set an expiration on access tokens.</li>
            <li>Don’t hardcode secrets or tokens.</li>
            <li>Don’t log sensitive information.</li>
            <li>Don’t neglect protection against IDN homograph attacks.</li>
          </ul>
        </td>
        <td>
          <ul>
            <li>Ensure a consistent password policy across all password-related actions.</li>
            <li>Invalidate existing sessions upon a successful password reset.</li>
            <li>Implement password rate limiting to deter brute-force attacks.</li>
            <li>Strictly enforce one-time token usage.</li>
          </ul>
        </td>
      </tr>
    </tbody>
  </table></div>

## What is Authentication vs. Authorization: Unveiling the Difference

Before diving into the nitty-gritty of password reset security, let's clarify two fundamental concepts: **authentication** and **authorization**. While often used interchangeably, they serve distinct purposes.

- **Authentication** is the process of verifying a user's identity. It's like showing your ID to a bouncer to gain entry to a club. Common authentication methods include passwords, biometrics, and two-factor authentication.
- **Authorization**, on the other hand, determines what a verified user can access or do. It's like the bouncer checking if you're on the guest list for a specific VIP area. Authorization is based on roles, permissions, or other criteria.

Understanding this distinction is crucial, as a secure password reset flow involves both authenticating the user and authorizing them to reset their password.

Ever had that sinking feeling when realizing your password reset flow might be riddled with security holes? You're not alone. This blog post dives into common pitfalls that can expose your users and offers actionable solutions to fortify your authentication system.

## ✕ Password Reset Common Pitfalls (Don'ts)

- Don't allow login ID guessing.
- Don't use personally identifiable information (PII) in forgotten password links.
- Don't use weak password hashing algorithms.
- Don't enforce periodic password expiration policies.
- Don't forget to set an expiration on access tokens.
- Don't hardcode secrets or tokens.
- Don't log sensitive information.
- Don't neglect protection against IDN homograph attacks.

By addressing these common vulnerabilities and following recommended practices, you can significantly enhance the security of your password reset flow and protect your users' accounts.

### Don't Allow Login ID Guessing

A common oversight in password reset flows is inadvertently revealing whether an account exists – an attack surface known as **account enumeration**. Imagine a scenario where a user enters an email address on the password reset form. If an account is associated with that email, a reset link is sent; otherwise, there's no response. This seemingly innocuous behavior can be exploited by attackers to determine valid email addresses for accounts. By systematically inputting email addresses, they can build a list of active accounts, becoming a valuable asset for future attacks.

To mitigate this risk, consistently display a generic message regardless of whether an account exists. For example: *"If an account with that email is registered, a password reset link will be sent."* This simple measure prevents attackers from gaining useful information about your user base.

##### **Recommended Approach: Limit Password Reset Link Lifetime**

To enhance security further, consider implementing a strict lifetime for password reset links. Once generated, these links should expire after a short period (typically within a few hours). This prevents attackers from intercepting and later using old reset links.

### Don't Use Personally Identifiable Information (PII) in Forgot Password Links

A common approach to identify a password reset session is to include a token in the URL. However, using personally identifiable information (PII) within that token is a grave security risk. Even if encrypted, there's always a chance of compromise, potentially exposing sensitive user data.

We've encountered instances where encrypted user IDs were used as reset tokens, which is highly insecure. Additionally, improper encryption or hashing techniques — such as using weak algorithms like MD5 — can further exacerbate the issue.

To protect user privacy and security, always generate a random, non-PII token for each password reset session. Implement strict expiration limits for these tokens and employ rate-limiting measures to deter brute-force attacks.

### Don't Use Weak Password Hashing

Proper password hashing is a cornerstone of authentication security. Storing passwords in plain text is a catastrophic security breach, but even using outdated hashing algorithms can leave your system vulnerable.

Algorithms like **MD5**, once considered secure, have been compromised and are no longer suitable for password storage. Modern standards recommend using strong hashing functions like **Argon2** or **bcrypt**. These algorithms are computationally expensive, making it significantly harder for attackers to crack passwords through brute force.

You might wonder why bcrypt is preferred over simpler hashes like SHA-256 or SHA-512. The key lies in *computational resistance*. General-purpose hash functions such as SHA-256 and SHA-512 can be accelerated using specialized hardware like GPUs, reducing their effectiveness against brute-force attacks. Bcrypt, on the other hand, is specifically designed to be resistant to hardware acceleration.

For a deeper understanding of the nuances between different hashing algorithms and hashing best practice, refer to [our blog post on Password Hashing & Salting](/post/password-hashing-salting-function-and-algorithm-explained).

### Don't Enforce Periodic Password Expiration

How often should users be forced to change their passwords? Historically, many organizations mandated password rotation every 60 or 90 days. However, current best practices – including NIST's guidelines in [SP 800-63B](https://pages.nist.gov/800-63-4/sp800-63b.html#AAL_SEC5:~:text=Verifiers%20and%20CSPs%20SHALL%20NOT%20require%20subscribers%20to%20change%20passwords%20periodically.%20However%2C%20verifiers%20SHALL%20force%20a%20change%20if%20there%20is%20evidence%20that%20the%20authenticator%20has%20been%20compromised) – advise against arbitrary periodic password expiration. Forcing frequent password changes when there is no sign of compromise can actually weaken security: users may choose simpler passwords or make predictable alterations (e.g., *Password1* to *Password2*), undermining the intent of the policy.

According to [NIST’s latest password guidelines](https://pages.nist.gov/800-63-4/sp800-63b.html#AAL_SEC5:~:text=Verifiers%20and%20CSPs%20SHALL%20NOT%20require%20subscribers%20to%20change%20passwords%20periodically.%20However%2C%20verifiers%20SHALL%20force%20a%20change%20if%20there%20is%20evidence%20that%20the%20authenticator%20has%20been%20compromised), verifiers **should NOT** require memorized secrets (passwords) to be changed arbitrarily (e.g., periodically). Instead, passwords should be changed only when there is evidence of compromise of the account or other valid reasons. By eliminating unnecessary password rotation policies, you reduce user frustration and encourage the use of stronger, more memorable secrets.

### Don't Forget to Set an Expiration on Access Tokens

A critical oversight in many authentication systems is the lack of expiration for access tokens. Without a defined lifespan, a compromised token can grant an attacker indefinite access to a user's account ([token side hijacking](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html#token-sidejacking)).

Imagine an attacker gaining possession of a valid access token. With no expiration, they have an unlimited window to exploit that token for malicious purposes. This scenario is more common than you might think – your browser likely stores multiple access tokens, presenting potential targets for attackers.

Even with HTTPS encryption, access tokens without expiration dates remain vulnerable. Breaches in user devices or evolving security threats could compromise token security over time.

To mitigate these risks, implement a strict expiration policy for access tokens. A short lifespan (such as an hour) significantly reduces the potential damage from a compromised token. An attacker would need to intercept and use the token within that limited timeframe, making their task exponentially more difficult.

### Don't Hardcode Secrets or Tokens

Under pressure to meet deadlines, developers often resort to shortcuts, and hardcoding secrets directly into code is a common pitfall. This practice is a *catastrophic* security risk.

We've witnessed firsthand the consequences of this mistake. In one case, a JWT token was hardcoded into a function, leaving the entire system vulnerable. If your source code is exposed — whether through a compromised version control server or accidental leaks — any hardcoded secrets are instantly compromised, rendering your security measures useless.

To protect your application, adhere to these essential principles:

- **Avoid hardcoding:** Never embed secrets or tokens directly in your code.
- **Secure communication:** Always use HTTPS to protect data transmission.
- **Prevent accidental exposure:** Exclude sensitive files (like `.git` directories) from deployments to avoid unintentional leaks.
- **Secure secret management:** Consider using encryption tools like [Blackbox](https://github.com/StackExchange/blackbox) to store secrets separately from your source code.****
- **Dynamic generation:**Generate secrets on the fly (during runtime or deployment) and never commit them to version control.

By following these guidelines, you significantly reduce the risk of exposing sensitive information and safeguarding your application.

### Don't Log Sensitive Information

Logging is a valuable tool for debugging and monitoring applications. However, inadvertently logging sensitive data can have catastrophic consequences. A seemingly innocuous `console.log(jwt)` statement can expose critical information about your users and system.

**The dangers of logging sensitive data are clear:**

- **Data breaches:** Exposed logs can become a goldmine for attackers, providing them with credentials, API keys, and other valuable information.****
- **Compliance violations:** Many industries have strict regulations around data privacy. Logging sensitive data can lead to hefty fines and reputational damage.

**To prevent accidental logging of sensitive information:**

- **Implement data masking:** Create a [SensitiveContent interface](https://code.oursky.com/data-masking-and-handling-to-minimize-sensitive-data-exposure/) to encapsulate sensitive data. This forces developers to consider the implications of logging such information.
- **Utilize logging frameworks:** Use logging frameworks that offer built-in mechanisms to filter or redact sensitive data.
- **Regularly review logs:** Conduct audits of your logs to identify and remove sensitive information.
- **Train developers:** Educate your team about the risks of logging sensitive data and best practices for avoiding it.

Examples of sensitive data that should **never** be logged include:

- **Authentication credentials:** Passwords, tokens, API keys, and secret keys.
- **Financial information:** Credit card numbers, bank account details, and transaction data.
- **Personally identifiable information (PII):** Names, addresses, social security numbers, and email addresses.****
- **Health information:** Medical records and patient data.

By following these guidelines and fostering a culture of security, you can significantly reduce the risk of exposing sensitive information through your logs.

### **Don't Neglect Protection Against IDN Homograph Attacks**

DN homograph attacks are a sophisticated threat often overlooked by developers. These attacks exploit the subtle differences between characters in different character sets (like Latin vs. Cyrillic) to mimic legitimate usernames or domains.

For example, the usernames "adminｅ" and "аdmin е" appear identical at first glance. However, the second username uses Cyrillic characters, which can be exploited to bypass authentication controls.

<div class="table_component" role="region" tabindex="0">
<table>
    <thead>
        <tr>
            <th>Username</th>
            <th>Unicode</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>admin e</td>
            <td>\u0061\u0064\u006d\u0069\u006e \u0065</td>
        </tr>
        <tr>
            <td>admin e</td>
            <td>\u0430\u0064\u006d\u0069\u006e \u0435</td>
        </tr>
    </tbody>
</table>

To protect against IDN homograph attacks, implement strict input validation on usernames, emails, and domains. Disallow characters from unsupported or unexpected character sets to prevent malicious actors from exploiting look-alike characters in credentials

## ✓ Password Reset Best Practices (Do's)

<sup></sup>Now that we've explored some common pitfalls, let's delve into best practices to fortify your password reset process:

- Ensure a consistent password policy across all password-related actions.
- Invalidate existing sessions upon a successful password reset.
- Implement password rate limiting to deter brute-force attacks.
- Strictly enforce one-time token usage.

By following these recommended practices, you can significantly enhance the security of your password reset flow and safeguard your users' account

### 1. Enforce a Consistent Password Policy:

Maintain a consistent password policy throughout all password-related actions, including account creation and password resets. Avoid overly complex requirements that frustrate users. Instead, focus on fundamental elements of a strong policy:

- **Minimum length:** Enforce a minimum password length of 8 characters (widely recommended as a baseline).
- **Reasonable maximum length:**Set an upper limit (e.g. 64 characters) to discourage excessively long passwords that are impractical or could strain systems.
- **Password strength meter:** Utilize a strength meter (like [zxcvbn](https://github.com/dropbox/zxcvbn)) to provide real-time feedback on password complexity.****
- **Banned words:** Prevent the use of common or compromised passwords by checking against known breach lists or obvious patterns related to your application.
- **Managers & UX:** allow password managers, paste/autofill, and optional “show password” to reduce entry errors.

These guidelines, as recommended by OWASP and Microsoft, help strike a balance between security and user experience. They encourage users to create strong passwords without imposing unnecessary burdens.

### 2. Invalidate Existing Sessions:

Upon a successful password reset, remind the user to review all active login sessions on their account. Better yet, automatically invalidate all existing sessions after a password reset to boost security. This ensures that even if an attacker had access via a stolen session token, they will be logged out once the password is changed, cutting off their access to the account.

### 3. Implement Password Rate Limiting:

Password rate limiting is a crucial defense against brute-force attacks. Without limitations, attackers can repeatedly attempt password guesses, significantly increasing their chances of success over time. Here's how effective rate limiting can protect your system:

- **Limit by IP address:** Restrict the number of login or reset attempts originating from the same IP address in a short period. This prevents a single source from rapidly trying many password combinations.
- **Monitor account-specific attempts:** Track login attempts targeting a specific account from various IP addresses over a short period. For example, three failed logins for one user from three different countries could indicate a coordinated brute-force attack.
- **Detect cross-account patterns:** Be wary of login attempts across multiple accounts following a clear pattern, such as sequential usernames or variations of a common password. This could signal an attacker systematically trying to compromise accounts.

Refer to [OWASP's guide on Blocking Brute Force Attacks](https://owasp.org/www-community/controls/Blocking_Brute_Force_Attacks) for more detailed information on identifying and mitigating these threats.

### 4. Strictly Enforce One-Time Token Usage:

One-time tokens (often used for passwordless login links or multi-factor authentication resets) can improve user experience, but improper implementation can render them ineffective. Ensure your system properly tracks and invalidates these tokens:

- **Unique identification:** Assign a unique identifier to each one-time token issued.
- **Used-token tracking:** Maintain a list (or database record) of tokens that have already been used.
- **Validate on use:** Before granting access based on a one-time token, verify that the token hasn't already been used and that it has not expired.

By enforcing these measures, you prevent attackers from reusing tokens or exploiting expired tokens to gain access. This creates a more secure and user-friendly password reset (or passwordless login) experience.

## Fortifying Your Password Reset Flow: A Final Word

<!--FIGURE-->![](./figure-1.jpeg)<!--/FIGURE-->

Building a secure password reset flow requires meticulous attention to detail. By avoiding the common pitfalls and implementing the best practices outlined in this article, you can significantly enhance the security of your authentication system. Remember, a robust password reset process is not just about protecting user accounts, but also about safeguarding your overall system from potential breaches. Continuous vigilance and staying updated on emerging threats are essential for maintaining a high level of security.

## FAQs

### Should I enforce password expiration or rotation

No. Per NIST SP 800-63B, do not require routine password expiration. Only force a change if there is evidence of compromise.

### How long should a password reset link last?

Keep reset links short-lived (e.g., 15–60 minutes), single-use, and invalidate them immediately after a successful reset.

### What hashing algorithm should I use for passwords?

Use modern, slow, adaptive hashing (e.g., Argon2id, bcrypt, PBKDF2) with a unique salt per password and appropriate cost parameters.

### Should I log JWTs or other secrets?

No. Never log passwords, tokens, API keys, or other secrets. Redact and mask sensitive fields in logs.

<script type="application/ld+json">
{
  "@context":"https://schema.org",
  "@type":"FAQPage",
  "mainEntity":[
    {
      "@type":"Question",
      "name":"Should I enforce password expiration or rotation?",
      "acceptedAnswer":{
        "@type":"Answer",
        "text":"No. Per NIST SP 800-63B, do not require routine password expiration. Only force a change if there is evidence of compromise."
      }
    },
    {
      "@type":"Question",
      "name":"How long should a password reset link last?",
      "acceptedAnswer":{
        "@type":"Answer",
        "text":"Keep reset links short-lived (e.g., 15–60 minutes), single-use, and invalidate them immediately after a successful reset."
      }
    },
    {
      "@type":"Question",
      "name":"What hashing algorithm should I use for passwords?",
      "acceptedAnswer":{
        "@type":"Answer",
        "text":"Use modern, slow, adaptive hashing (e.g., Argon2id, bcrypt, PBKDF2) with a unique salt per password and appropriate cost parameters."
      }
    },
    {
      "@type":"Question",
      "name":"Should I log JWTs or other secrets?",
      "acceptedAnswer":{
        "@type":"Answer",
        "text":"No. Never log passwords, tokens, API keys, or other secrets. Redact and mask sensitive fields in logs."
      }
    }
  ]
}
</script>

**Need expert guidance on securing your password reset flow?** Our team of security experts can help you identify vulnerabilities and implement robust solutions. [Contact us today](/schedule-demo) for a comprehensive assessment.
