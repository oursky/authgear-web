---
title: "Password Hashing: How to Pick the Right Hashing Function"
excerpt: "Almost all popular online services use some form of hash technique to store passwords securely. In this post we cover the different hashing functions, best practices and how to pick the best one for your application and organisation."
coverImage: ./cover.jpg
category: engineering
featured: false
publishedAt: 2025-10-29T19:12:41.468Z
updatedAt: 2025-10-17T14:55:41.276Z
draft: false
---

When a user creates a password for their online account, the password is hashed before it is stored in any database. As a result, even a person managing the database can't read the user’s actual password. Almost all popular online services use some form of hash technique to store passwords securely.

Want to try them side-by-side? Use our [Password Hash Generator & Verifier (Argon2id, bcrypt, scrypt, PBKDF2)](/tools/password-hash-generator)—runs entirely in your browser.

## What is Hashing?

<!--FIGURE-->![](./figure-1.jpeg)<!--/FIGURE-->

Hashing can be as simple as using a hashing function in your favorite programming language or framework to convert a text (the message) into a fixed-length string (the hash value). For example, the table below shows some text and their hash values after using an MD5 hash function to convert the original text:

<table dir="ltr" style="table-layout: fixed; font-size: 10pt; font-family: Arial; width: 100%; max-width: 720px; border-collapse: collapse; border: medium; margin: 0 auto;" border="1" cellspacing="0" cellpadding="0" data-sheets-root="1" data-sheets-baot="1"><colgroup><col width="100"><col width="100"></colgroup>
<tbody>
<tr style="height: 21px;">
<td style="overflow: hidden; padding: 2px 3px; vertical-align: bottom; font-family: Arial; font-size: 11pt; font-weight: bold; white-space: normal; overflow-wrap: break-word; border: 1px solid #000000; width: 10px;">Original text</td>
<td style="border-top: 1px solid #000000; border-right: 1px solid #000000; border-bottom: 1px solid #000000; overflow: hidden; padding: 2px 3px; vertical-align: bottom; font-family: Arial; font-size: 11pt; font-weight: bold; white-space: normal; overflow-wrap: break-word; width: 580px;">Hash value</td>
</tr>
<tr style="height: 21px;">
<td style="border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; overflow: hidden; padding: 2px 3px; vertical-align: bottom; font-family: Arial; font-size: 11pt; font-weight: normal; white-space: normal; overflow-wrap: break-word; width: 10px;">password1</td>
<td style="border-right: 1px solid #000000; border-bottom: 1px solid #000000; overflow: hidden; padding: 2px 3px; vertical-align: bottom; font-family: Arial; font-size: 11pt; font-weight: normal; white-space: normal; overflow-wrap: break-word; width: 580px;">7c6a180b36896a0a8c02787eeafb0e4c</td>
</tr>
<tr style="height: 21px;">
<td style="border-right: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; overflow: hidden; padding: 2px 3px; vertical-align: bottom; font-family: Arial; font-size: 11pt; font-weight: normal; white-space: normal; overflow-wrap: break-word; width: 10px;">#k-11@b33t0&amp;&amp;S</td>
<td style="border-right: 1px solid #000000; border-bottom: 1px solid #000000; overflow: hidden; padding: 2px 3px; vertical-align: bottom; font-family: Arial; font-size: 11pt; font-weight: normal; white-space: normal; overflow-wrap: break-word; width: 580px;">7a95be43c21160904ae79d4b7f504c37</td>
</tr>
</tbody>
</table>

On the left column of the above table, you can see the original password in plain text, and on the right, you’ll find the hash value for each password.

Unlike encryption, hashing is one-way only. That is, a hashing algorithm does not offer a way to reverse a hash value back to the original input text.

Hashing a password with an old hash algorithm like MD5 as you have seen above is not recommended. This is because it is easy to look up the value of original input from a list of pre-computed values for common passwords (e.g. rainbow table). For instance, a simple Google search for “7c6a180b36896a0a8c02787eeafb0e4c” will return “password1” in the result. That means that depending on a hashing function like MD5 alone will still leave room for an attacker to get the plain text value of a user’s password when they have access to the hash value.

So, how can you use a better hash, what are the different hash algorithms, their drawbacks, and attack vectors? What other actions and techniques can you use to improve your application security?

First, let's take a look at the various hash algorithms and how they work.

## What are the Different Types of Hash Algorithms?

<!--FIGURE-->![](./figure-2.jpeg)<!--/FIGURE-->

The following section lists the different types of hashing algorithms. However, this is not a definitive list of hash algorithms. Instead, it is a list we will be using to explain different hash algorithms and how they improve as you move down the list.

Each hashing algorithm in our list falls into one of the following categories:

1. Hash functions (e.g. MD5)
1. Cryptographic hash functions (e.g. SHA256)
1. Key derivation functions and their application in password (a.k.a password hashing algorithm, e.g. bcrypt and PBKDF2)

### 1. Hash Functions

Hash functions take any text of any length and convert it into a hash value of fixed length. A small alteration to the input text can lead to a completely different output. As a result, hash functions are good for applications like verifying if two inputs are the same.

#### 1.1. MD5 (Message-Digest Algorithm 5)

MD5 (Message Digest) is the oldest hashing algorithm on this list. MD5 is fast and this is part of why it is the most insecure algorithm for hashing passwords. In password hashing, it is actually a good thing for a hashing algorithm to NOT be fast. For example, a slower hashing algorithm will increase the amount of time it will take for hackers to build a large list of common words and their hash values that they can compare stolen hashed passwords against. **It is no longer recommended to use** MD5 for hashing of passwords. However, MD5 is still used for other purposes like verifying the integrity of a file.

Another drawback of the MD5 hash function is that it is vulnerable to collision. Collision exists when two different inputs produce the same hash value. In March 2005, [an article](https://www.mathstat.dal.ca/~selinger/md5collision/) that describes an algorithm that can find two sequences that have the same MD5 hash was published by Xiaoyun Wang and Hongbo Yu of Shandong University in China. Collisions can trick systems that use hash values to verify the integrity of files into executing a malicious file that shares the same hash value as a trusted file.

### 2. Cryptographic Hash Functions

Cryptographic hash functions are hash functions with additional security properties that make them suitable for [cryptographic application](https://www.nist.gov/cryptography). Their security properties include resistance to collision and brute-force attacks.

#### 2.1. SHA-1 (Secure Hash Algorithm 1)

SHA-1 is a hash algorithm developed by the National Institute of Standards and Technology (NIST). It is very similar to the MD5 algorithm while offering more security. SHA-1 also **has known security vulnerabilities** and it is no longer recommended to use it in new applications.

Some drawbacks of  SHA-1 include a [known collision of SHA-1](https://security.googleblog.com/2017/02/announcing-first-sha1-collision.html) found in 2017 and the fact that it is fast and as a result, it is easy for attackers to generate a dictionary of common passwords and their respective hash values.

#### 2.2. SHA-2 (Secure Hash Algorithm 2)

The SHA-2 family of hashing algorithms improves on the older SHA-1. It is still part of the NIST’s [approved hash algorithms](https://csrc.nist.gov/projects/hash-functions). The SHA-2 hashing algorithm family includes: **SHA-224**, **SHA-256**, **SHA-384**, **SHA-512**, **SHA-512/224**, and **SHA-512/256**.

#### 2.3. SHA-3 (Secure Hash Algorithm 3)

SHA-3 is a newer member of the Secure Hash Algorithm family. Internally SHA-3 is different from SHA-1 and SHA-2 as it does not share their resemblance to MD5. The SHA-3 family include: **SHA3-224**, **SHA3-256**, **SHA3-384**, and **SHA3-512**;

### 3. Key Derivation Functions

Key derivation functions (KDF) are ideal for hashing passwords. They’re the most secure of the three categories. While using a KDF, the input can be hashed multiple times based on a number of iterations that you can set. As a result, KDF is slow and very difficult to attack using brute force. The following are some examples of applications of key derivation function for hashing passwords:

#### 3.1. bcrypt

The bcrypt algorithm is based on the [Blowfish cipher](https://www.schneier.com/academic/blowfish/). It incorporates the use of “salt” and it is designed to be slow such that it increases the amount of computation power an attacker needs to break it.

#### 3.2. Argon2id

Argon2 is a [key derivation function](https://en.wikipedia.org/wiki/Key_derivation_function) that won the 2015 Password Hashing Competition. It has 3 versions, Argon2i, Argon2d, and Argon2id. Argon2id is a hybrid of Argon2i and Argon2d and addresses the issues with side-channel and GPU-based attacks.

Argon2 input parameters include the password, salt, memory cost, time cost, parallelism factor, and hash length.

#### 3.3. PBKDF2

Password-Based Key Derivation Function 2 (PBKDF2) is a key derivation function that requires higher computational power when compared to other algorithms. It is recommended by the National Institute of Standards and Technology (NIST).

An implementation of PBKDF2 in .Net is the [Rfc2898DeriveBytes](https://learn.microsoft.com/en-us/dotnet/api/system.security.cryptography.rfc2898derivebytes?view=net-8.0) class. It takes the input (password to be hashed), a salt, and the number of iterations as parameters and then repeatedly hashes the input together with the salt. As a result, the hashing process is slow and reduces the effectiveness of brute-force attacks. The default value for iteration is 1000.

Something worth noting about all the hashing algorithms we’ve covered in this section is that *the slower an algorithm is*, or *the more computational resources* it requires *the harder* it is for attackers to crack it.”

Newer and more sophisticated hashing algorithms are hard to crack for collision. However, they may still be vulnerable to reverse searches for common words and phrases. As a result, it is recommended to add a random salt to your input before hashing it.

Not sure which settings to choose? Start with our presets (Argon2id, bcrypt, scrypt, PBKDF2) in the [Password Hash Generator](/tools/password-hash-generator) and tune to your SLA.

## Attack Vectors

<!--FIGURE-->![](./figure-3.jpeg)<!--/FIGURE-->

Attack vectors are the different ways an attacker can break into a system that depends on hashing for security. The following are examples of attack vectors:

### Brute-force

A typical hashing-related brute-force attack involves an attacker testing different words (inputs) against one or more stolen hash values. Once the hash value for an input matches a value in the stolen hashes, the attacker now knows the actual password.

This type of attack can be time-consuming but it can become easier when users use passwords that are easily predictable or contain common words.

You can reduce the effectiveness of brute force attacks on your system by adding [rate limits](https://docs.authgear.com/reference/rate-limits) and enforcing the use of strong passwords.

### Collision Attack

In a collision attack, the attacker tries to find two different inputs that will produce the same hash value. Two common ways collision attacker is carried out are the [birthday attack](https://en.wikipedia.org/wiki/Birthday_attack) and the second [pre-image attack](https://eprint.iacr.org/2008/089.pdf).

Hash functions with larger output (hash value length) are less vulnerable to collision. MD5 and SHA-1 already have known collisions.

### Insider Threat

A common example of insider threat to hashing is when an employee or someone with access to a database or file containing login details such as users' email addresses (usernames) and hash values of passwords abuse their access. This abuse can range from exporting the hash values so that they can try to reverse them via brute force or other means.

Insider threats can be intentional (e.g. a malicious employee) or as a result of an employee’s account being hacked (e.g. phishing).

Data breaches that leak login details including password hashes aid attackers with brute-force attacks and rainbow table attacks.

You can reduce the chances of insider threats by using more secure authentication processes (e.g. multi-factor authentication) for employees and system administrators. You should also use the principle of least privilege (give staff the minimum access they require to do their work) and review the access rights of staff regularly.

### Rainbow table

A rainbow table consists of different words (or common passwords) mapped to their respective hash value for a specific hash algorithm. To perform a rainbow table attack, the attacker looks up the word value for a hash in an existing table of words and their hashes.

Getting access to an existing rainbow table is as easy as a simple Google search.

## How to Use Better Hash

<!--FIGURE-->![](./figure-4.jpeg)<!--/FIGURE-->

The better way to use hash is by including a “salt” while using a recommended hashing algorithm. To explain the above statement further, let’s take a look at what salt is and how to use it well. We’ll also discuss how which hash algorithm is still safe and recommended.

### 1. Adding Salt to Hash

A salt here is simply a random set of characters that you add to the input of your hash function before the actual hashing. For instance, if a user enters “h0t#c0olR” as their password and you add “17ADT1335tnngz5t” as the salt, the final input can be “17ADT1335tnngz5th0t#c0olR”. You then hash the final input and store it in the password column for the user in a database.

By adding salt to passwords before hashing, you reduce the risk of dictionary and rainbow table attacks even for users that use common passwords. For example, the hash value for password1 and a random salt will be totally different from the hash value without a salt, hence making it impossible for an attacker to use a compromised hash value to get the actual password.

It is NOT recommended to use the same salt value for multiple users as doing some already compromises one of the main points of using salt. Which is, that multiple users with the same password will not have the same hash value. Also, if you use a static salt, once an attacker can get hold of the salt, they can use it to gain access to more passwords. You can use a [cryptographically strong](https://en.wikipedia.org/wiki/Strong_cryptography) pseudorandom number generator to generate secure salts. Because the salt value for each user should be unique, you can store the value of the salt for a user, in plain text on its own column in the user’s row.

When a user is logging in, your application will read the value of the salt for that user from the database, add it to the password they entered, and then hash the final value. The hashed value of the user’s input + salt is then compared to the hashed password in the database.

### 2. Picking the Right Hashing Algorithm

There are many options of hashing algorithms to choose from. However, some key things to consider before picking an algorithm include:

- Collision resistance: As of the time of writing this post, it is known that MD5 and SHA-1 are vulnerable to collision.
- [Preimage resistance](https://csrc.nist.gov/glossary/term/preimage_resistance)
- [Second preimage resistance](https://csrc.nist.gov/glossary/term/second_preimage_resistance)

It is not recommended to use older hashing functions like MD5 and SHA-1.

Out of the three categories of hashing algorithms, it is professionally recommended that you should only use a password hashing application of key derivation functions for hashing passwords. A good example is the PBKDF2.

The Open Web Application Security Project (OWASP) [Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) recommends using PBKDF2, Argon2id, or bcrypt for password hashing as they all require salt and are designed specifically for hashing passwords.

## Additional Forms of Protection to Make Hashing More Secure

<!--FIGURE-->![](./figure-5.jpeg)<!--/FIGURE-->

In addition to storing passwords as hashes, you can do the following to increase the security of your application.

### Adding Rate Limit

Rate limit is an application security measure that limits the number of attempts a user can make to a service at a given time. A common form of rate limit in user authentication is limiting how many attempts a user can make with a wrong password before locking an account.

Rate limit is an effective method for preventing brute-force attacks on user authentication systems. It blocks attackers that try multiple common passwords using automated scripts that can generate and try hundreds or even thousands of passwords in a few seconds.

In addition to saving passwords as salted hash, you should consider implementing rate limiting in your application.

### Using a Third-party Authentication Service

The last but not least recommendation for protecting user authentication on your application is to opt-in for an authentication service that is built by an experienced team or service provider. The advantage of this approach is that it eliminates all the stress and risk of implementing hashing, salting, and saving passwords on your own database.

Authgear offers a tested and trusted Authentication-as-a-Service solution that you can try for free today. They remove the stress of trying to find out what hash algorithm is right and safe for your use case. Authgear uses up-to-date hashing and application security practices.

In addition to username and password-based authentication, a third-party authentication service provider such as Authgear, offers other secure authentication methods like SMS and Email OTP, TOTP, and biometric authentication. [Create a free account](https://accounts.portal.authgear.com/signup) or use the [contact form](/schedule-demo) on Authgear’s site to get started.
