---
title: "What is Salting in Security and How Does it Work?"
excerpt: "Password salting is a security method that strengthens password protection by adding unique, random data (a \"salt\") to a password before it is hashed. This ensures that every password hash stored in a database is unique, effectively defending against attacks that use precomputed tables, such as rainbow table attacks."
coverImage: ./cover.jpg
category: engineering
featured: false
metaTitle: "What is Salting in Security? Password Hashing and Salting Explained"
metaDescription: "Salting is the practice of adding unique, random data (a \"salt\") to a password before it is hashed, ensuring distinct hashes and neutralizing rainbow table attacks."
canonicalUrl: /post/password-hashing-salting-function-and-algorithm-explained
publishedAt: 2022-02-24T02:51:02.195Z
updatedAt: 2026-05-05T00:00:00.000Z
draft: false
faq:
  - q: "What is salting in security?"
    a: "Salting is the practice of mixing a unique, random value (the salt) into each user's password before it is hashed. The salt makes every stored hash distinct — even when two users pick the same password — so attackers cannot pre-compute hashes (a rainbow-table attack) or crack a whole database in bulk."
  - q: "Is salting the same as hashing?"
    a: "No. Hashing is a one-way transformation used to verify passwords without storing them in plain text. Salting adds a unique random value to each password before hashing so identical passwords produce different hashes."
  - q: "Do I still need a salt when using bcrypt?"
    a: "Modern bcrypt implementations generate and store a unique salt automatically with the hash. You don't need to manage salts yourself, but understanding salting helps explain why rainbow-table attacks fail."
  - q: "What is a pepper and where should I store it?"
    a: "A pepper is an application-wide secret used in addition to the per-user salt. Store it separately from the database — such as in a KMS or HSM or an environment secret — never alongside the hash."
  - q: "Which password hashing algorithm should I use in 2026?"
    a: "Prefer Argon2id for general use because it is memory-hard. Use PBKDF2 when FIPS or NIST compliance is required. Keep bcrypt only for legacy systems or where Argon2id is unavailable."
  - q: "What are safe Argon2id parameters?"
    a: "A reasonable starting point is roughly m ≈ 19–64 MiB, t = 1–3, p = 1. Tune to your production hardware so a single verification remains comfortably under about one second, and revisit settings periodically."
  - q: "Is SHA-256 or SHA-3 alone OK for passwords?"
    a: "No. General-purpose hashes are too fast for password storage. Use a dedicated password hashing or key-derivation function such as Argon2id, scrypt, bcrypt, or PBKDF2."
  - q: "How long should a salt be?"
    a: "Use a unique, random salt per password, typically 16–32 bytes (at least 128 bits) generated with a cryptographically secure random number generator."
  - q: "Where do I store the salt?"
    a: "Store the salt with the hash, for example in the same database row or encoded within the hash string. The salt is not secret and must be available during verification."
  - q: "What about the bcrypt 72-byte input limit?"
    a: "bcrypt only considers the first ~72 bytes of input. Enforce a maximum password length and/or migrate to Argon2id. If pre-hashing is unavoidable, use an HMAC with a server-side pepper and store the pepper separately."
  - q: "How do I migrate from bcrypt or PBKDF2 to Argon2id?"
    a: "Use opportunistic rehashing: verify existing users with the old algorithm, then on successful login rehash the password with Argon2id and update the stored record. Keep both verifiers during the transition."
  - q: "When should I rehash existing passwords?"
    a: "Rehash when your chosen algorithm or parameters are no longer sufficient — for example after raising Argon2id memory or time settings, or when migrating from bcrypt to Argon2id. Track a hash version per account."
  - q: "What is the difference between password hashing and encryption?"
    a: "Hashing is one-way and designed for verifying passwords. Encryption is reversible and used for data you need to read back. Passwords should be hashed, not encrypted."
---

> **tl;dr** — Salting is the practice of mixing a unique, random value (the salt) into each user's password before it is hashed. The salt makes every stored hash distinct — even when two users pick the same password — so attackers cannot pre-compute hashes (a rainbow-table attack) or crack a whole database in bulk. Pair salting with a slow, memory-hard algorithm such as **Argon2id** (preferred), scrypt, or bcrypt; never with a fast hash like SHA-256.

## What Is Salting in Security?

<!--FIGURE-->
![Salting in security: how a per-user random salt + the password are combined and hashed to produce a unique stored hash.](./figure-1.png)
<!--/FIGURE-->

Salting in security is the practice of adding unique, random data (a "salt") to each user's password before it is hashed and stored. The technical workflow involves generating a cryptographically secure random salt, combining it with the user's input, and hashing the pair to create a unique digital fingerprint for future verification. This method improves security by neutralizing rainbow table attacks, protecting duplicate passwords from sharing the same hash, and forcing attackers to crack accounts individually. For robust implementation, best practices require using unique per-user salts of at least 16 bytes paired with modern algorithms and defense-in-depth techniques like peppering.

## How Does Salting Work?

Salting is a security technique that adds unique, random data to a password before hashing to ensure every stored credential has a unique digital fingerprint. There are five steps in the technical workflow:

1. **Generate the salt** — use a Cryptographically Secure Random Number Generator (CSPRNG).
2. **Combine the password and salt** — prepend or append the salt to the password.
3. **Hash the combined string** — run the result through Argon2id, bcrypt, or scrypt.
4. **Store the salt and hash** — both go in the user's database record (the salt is not secret).
5. **Verify on login** — re-hash the entered password with the stored salt and compare.

### Step 1: Generating the Salt

Use a Cryptographically Secure Random Number Generator (CSPRNG) to create a unique, random string for each user account. This ensures the salt is unpredictable and statistically unique, preventing attackers from using precomputed data across different users.

### Step 2: Combining the Password and Salt

Combine the random salt with the user's plain-text password by prepending or appending the salt string to the password. This combination creates a unique input for the hashing function, even if the password itself is common.

### Step 3: Hashing the Combined String

Process the combined salt-password string through a one-way, memory-hard hashing function such as Argon2id, bcrypt, or scrypt. This transformation produces a fixed-length salted hash that is computationally expensive to reverse or brute-force. You can see how different algorithms handle this by using our [Password Hash Generator](/tools/password-hash-generator).

### Step 4: Storing the Salt and Hash

Save both the resulting salted hash and the plain-text salt in the user's database record. The salt does not need to be encrypted or hidden. Its primary function is to provide the unique key necessary to re-generate the same hash during future authentication attempts.

### Step 5: User Verification

Retrieve the stored salt from the database, combine it with the password provided during login, and run the combination through the same hashing algorithm. If the newly generated hash matches the salted hash stored in the database, the user is verified.

### A Worked Example (Argon2id, Node.js)

```javascript
import { randomBytes } from 'node:crypto';
import argon2 from 'argon2';

// On registration
const salt = randomBytes(16);                          // 16-byte CSPRNG salt
const hash = await argon2.hash(password, {
  type: argon2.argon2id,
  salt,
  memoryCost: 19456,   // ~19 MiB — OWASP 2026 baseline
  timeCost: 2,
  parallelism: 1,
});
// store `hash` (Argon2 encodes the salt + parameters inside the hash string)

// On login
const ok = await argon2.verify(hash, candidatePassword);
```

Argon2's encoded format (`$argon2id$v=19$m=19456,t=2,p=1$<salt>$<hash>`) embeds the salt and parameters in the hash itself — so you store one column, and you can rehash users transparently when you raise the parameters later.

## How Does Salting Improve Password Security?

Salting improves password security by adding unique, random data to each password before it is hashed, which prevents attackers from using precomputed tables or identifying identical credentials within a leaked database. This technique enhances protection by defeating rainbow table attacks, forcing unique hashes for duplicate passwords, increasing the computational cost for hackers, and mitigating dictionary and brute force attacks.

### Prevents Rainbow Table Attacks

Rainbow tables are massive, precomputed databases of hashes for millions of common passwords used to reverse-engineer stolen data instantly. Salting makes these tables ineffective because an attacker would need to generate a new, unique rainbow table for every specific salt used in the database, which is computationally impossible.

### Mitigates Dictionary and Brute Force Attacks

By appending a random string to the user's input, salting ensures that even common dictionary words do not match their standard hashed equivalents. This protects users with weaker passwords by ensuring their credentials do not appear as "low-hanging fruit" during automated dictionary or brute-force attempts.

### Protects Duplicate Passwords

Identical passwords result in identical hashes, allowing attackers to immediately identify every user who shares a common password like "123456." Salting ensures that if two users share the same password, their stored hashes are completely different, preventing a single cracked password from compromising multiple accounts.

### Increases Computational Cost

Salting removes the ability for hackers to attack an entire database in bulk. Instead of running a single attack against all stored credentials, attackers are forced to brute-force each account individually, exponentially increasing the time, processing power, and financial resources required to crack the data.

## What are the Password Salting Best Practices?

Password salting best practices require generating a unique, cryptographically secure random salt for every user that is at least 16 bytes long and stored alongside the hashed password. Effective implementation includes using unique per-user salts, ensuring sufficient salt length, utilizing modern hashing algorithms, practicing proper storage, avoiding predictable values, and implementing password peppering for defense-in-depth.

### Unique Per-User Salt

Every account must have its own unique salt generated during registration or password changes. Never use a "site-wide" or "static" salt, as this allows attackers to use precomputed tables against your entire database. Unique salts ensure that even if two users choose the same password, their stored hashes will be completely different.

### Sufficient Length

A salt must be long enough to ensure high entropy and prevent brute-force attacks against the salt itself. Industry standards recommend a minimum length of 16 bytes (128 bits), generally matching the output size of the hashing function used.

### Modern Hashing Algorithms

Salting is most effective when paired with modern, slow, and memory-hard hashing algorithms like **Argon2id (recommended)**, bcrypt, or scrypt. These algorithms are designed to resist high-speed cracking attempts from GPUs and ASICs, whereas fast hashes like MD5 or SHA-256 are no longer adequate for password storage.

### Proper Storage

Store the salt in plain text in the same database table and row as the password hash. Salts do not need to be kept secret — their security value comes from being unique and random. Storing them with the hash ensures they are easily retrieved by the application during the login verification process.

### Avoid Predictable Values

Never use usernames, email addresses, or other static user data as salts, as these are easily guessable by attackers. Always use a Cryptographically Secure Pseudo-Random Number Generator (CSPRNG) to create salts, ensuring they are truly random and unpredictable.

### Password Peppering

For an additional layer of security, implement a password pepper — a secret key stored separately from the database (e.g., in a secure vault or environment variable). Unlike a salt, the pepper is not stored with the hash. If the database is compromised, the pepper provides a final line of defense because the attacker lacks the secret value required to verify the hashes.

## Salt vs Pepper: Quick Comparison

<div class='ag-table-wrap'>
<table class='ag-table'>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Password Salt</th>
      <th>Password Pepper</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Storage</td>
      <td>Database (per-user)</td>
      <td>Config / vault (site-wide)</td>
    </tr>
    <tr>
      <td>Uniqueness</td>
      <td>Unique to every account</td>
      <td>One secret key for all accounts</td>
    </tr>
    <tr>
      <td>Visibility</td>
      <td>Stored in plain text alongside the hash</td>
      <td>Kept secret, separate from the hash</td>
    </tr>
    <tr>
      <td>Security goal</td>
      <td>Neutralizes rainbow tables</td>
      <td>Protects if the database is leaked</td>
    </tr>
  </tbody>
</table>
</div>

## Recommended Algorithms in 2026

<div class='ag-table-wrap'>
<table class='ag-table'>
  <thead>
    <tr>
      <th>Algorithm</th>
      <th>When to choose it</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Argon2id</strong></td>
      <td>New systems, no FIPS requirement</td>
      <td>Memory-hard. OWASP-recommended. Tune <code>m</code> and <code>t</code> to ~1s per verify.</td>
    </tr>
    <tr>
      <td>scrypt</td>
      <td>Argon2id unavailable in your runtime</td>
      <td>Memory-hard, well-studied. Slightly less GPU-resistant than Argon2id.</td>
    </tr>
    <tr>
      <td>bcrypt</td>
      <td>Legacy systems; quick wins</td>
      <td>Not memory-hard. 72-byte input limit. Fine for now if cost factor ≥ 12.</td>
    </tr>
    <tr>
      <td>PBKDF2-HMAC-SHA256</td>
      <td>FIPS 140-2 / NIST-compliant systems</td>
      <td>Iteration count must be ≥ 600,000 (NIST SP 800-63B, 2024 update).</td>
    </tr>
    <tr>
      <td><s>MD5, SHA-1, SHA-256, SHA-3 alone</s></td>
      <td>Never for passwords</td>
      <td>Fast hashes. A modern GPU computes billions per second.</td>
    </tr>
  </tbody>
</table>
</div>

## Let Authgear Manage Your User's Passwords

With Authgear, your users' passwords are secured by industry-standard mechanisms. Authgear uses Argon2id to salt and hash users' passwords. Your app will also be equipped with all the security features you need to provide better security and a smoother user experience.

[Contact us](/schedule-demo) now to see how Authgear can help you increase user conversion rate, reduce cost, and provide better user experience.

## Frequently Asked Questions

### Is salting the same as hashing?

No. **Hashing** is a one-way transformation used to verify passwords without storing them in plain text. **Salting** adds a unique random value to each password before hashing so identical passwords produce different hashes.

### Do I still need a salt when using bcrypt?

Modern bcrypt implementations generate and store a unique salt automatically with the hash. You don't need to manage salts yourself, but you should understand why salting prevents rainbow-table attacks.

### What's a "pepper" and where should I store it?

A **pepper** is an application-wide secret added in addition to the per-user salt. Store the pepper separately from the database (e.g., in a KMS/HSM or environment secret), never alongside the hash.

### Which password hashing algorithm should I use in 2026?

Prefer **Argon2id** for general use because it's memory-hard. Use **PBKDF2** when you must meet FIPS/NIST requirements. Keep **bcrypt** only for legacy systems or where Argon2id is unavailable.

### What are safe Argon2id parameters?

A good starting point is roughly **m ≈ 19–64 MiB**, **t = 1–3**, **p = 1**. Tune to your hardware so a single verification stays comfortably under ~1 second on your production boxes, then revisit periodically.

### Is SHA-256 or SHA-3 alone OK for passwords?

No. General-purpose hashes are too fast for password storage. Use a dedicated password hashing/KDF algorithm such as **Argon2id**, **scrypt**, **bcrypt**, or **PBKDF2**.

### How long should a salt be?

Use a unique, random salt per password, typically **16–32 bytes (≥128 bits)** from a CSPRNG.

### Where do I store the salt?

Store the salt with the hash (e.g., in the same database row or encoded in the hash string). It is not secret and must be available during verification.

### What about the bcrypt 72-byte input limit?

bcrypt only considers the first ~72 bytes of input. Enforce a reasonable maximum length and/or migrate to **Argon2id**. If you must pre-hash, use an HMAC with a server-side pepper and store the pepper separately.

### How do I migrate from bcrypt/PBKDF2 to Argon2id?

Use **opportunistic rehashing**: verify existing users with the old algorithm, then on successful login, rehash the password with Argon2id and update the stored record. Keep both verifiers during the transition.

### When should I rehash existing passwords?

Rehash when your algorithm choice or parameters are no longer considered adequate (e.g., after you raise Argon2id memory/time settings or move from bcrypt to Argon2id). Track a "hash version" with each account.

### What's the difference between hashing and encryption for passwords?

**Hashing** is one-way and designed for verification. **Encryption** is reversible and intended for data you must read back. Passwords should be hashed, not encrypted.
