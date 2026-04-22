---
title: "OWASP Top 10 2025: A03—Software Supply Chain Failures"
h1: "OWASP Top 10 2025: A03—Software Supply Chain Failures (Beginner’s Guide)"
excerpt: "What 2025:A03 Software Supply Chain Failures means, how attacks happen, and a practical checklist to secure your pipeline"
coverImage: ./cover.jpg
category: industry
featured: false
metaTitle: "OWASP Top 10 2025: A03—Software Supply Chain Failures (Beginner's Guide)"
metaDescription: "What 2025:A03 Software Supply Chain Failures means, how attacks happen, and a practical checklist to secure your pipeline"
publishedAt: 2026-02-12T02:41:55.931Z
updatedAt: 2026-02-12T02:35:14.209Z
draft: false
---

In the [OWASP Top 10 2025 release candidate,](https://owasp.org/Top10/2025/0x00_2025-Introduction/) A03:2025 — Software Supply Chain Failures ranks #3. It expands 2021’s A06 “Vulnerable and Outdated Components” to cover compromises across the entire software ecosystem. In the community survey, this category was overwhelmingly voted a top concern (50% ranked it #1).

Software supply chain failures happen when vulnerabilities or tampering slip into the code, tools, or processes you trust—open-source libraries, build systems, or update channels. Start by knowing what’s in your software (SBOM), harden CI/CD, verify provenance and signatures, scan dependencies continuously, and enforce least-privilege access across the pipeline.

## What is a software supply chain failure?

Your software supply chain spans third-party libraries, package registries, CI/CD systems, artifact repositories, container registries, and update mechanisms. A failure is any breakdown or compromise in those stages—whether a malicious package, a hijacked maintainer account, a tampered build, or an outdated component that’s widely exploitable.

## How these attacks happen

Once you understand what software supply chain failures are, the next question is how attackers actually exploit them.

The following points outline the most common and impactful ways adversaries compromise the software supply chain to gain access or distribute malicious code.

- **Malicious or hijacked packages:** Typosquatting, maintainer account takeovers, or poisoned updates to popular libs.
- **Compromised CI/CD:** Attackers gain access to build systems or secrets, backdooring official releases (SolarWinds).
- **Tampered distribution:** Registry or update-server compromises, or poisoned container images.
- **Dependency confusion/name collisions:** Builds pull a public package instead of the intended internal one.
- **Vulnerable & outdated components:** High-impact CVEs in common libraries (e.g., Log4j) ripple across countless apps.

Each of these attack vectors demonstrates that the weakest link in the chain can often be outside your own codebase—making visibility and control critical.

## Real-world examples

Understanding abstract risks is one thing; seeing how they’ve unfolded in practice brings the issue to life. The following real-world cases show how software supply chain failures have caused widespread impact, often exploiting blind trust and automation at scale.

### 1) SolarWinds Orion: a trusted update became a backdoor (2020)

Attackers penetrated the vendor’s build environment, inserted a backdoor into signed Orion updates, and downstream customers installed it as routine maintenance—an emblematic “trust abuse” of the build and update pipeline at massive scale. [U.S. CISA’s alert documents the campaign](https://www.cisa.gov/news-events/alerts/2021/01/07/supply-chain-compromise) and its supply-chain nature

### 2) Log4j / “Log4Shell”: a pervasive library vulnerability (2021)

CVE-2021-44228 allowed trivial remote code execution in Log4j 2. Because Log4j is embedded in countless Java apps and services, responders worldwide had to quickly inventory where it was used and patch—a stark illustration of how incomplete component visibility magnifies impact. [CISA and major vendors maintain remediation guidance and context](https://www.cisa.gov/news-events/news/apache-log4j-vulnerability-guidance).

### 3) XZ Utils backdoor: maintainer trust, patient infiltration (2024)

[A stealthy backdoor (CVE-2024-3094)](https://nvd.nist.gov/vuln/detail/cve-2024-3094) was inserted upstream into xz/liblzma releases 5.6.0–5.6.1, discovered when anomalous SSH behavior was spotted on Debian systems. NVD records the malicious code in upstream tarballs, and post-mortems detail a multi-year social engineering effort to gain maintainer trust—an unsettling demonstration of open-source maintainer risk and artifact provenance gaps.

### 4) 3CX DesktopApp: trojanized installers at distribution (2023)

A widely used desktop client shipped trojanized installers for Windows and macOS via compromised build/distribution infrastructure, with [U.S. CISA and multiple vendors analyzing the campaign](https://www.cisa.gov/news-events/alerts/2023/03/30/supply-chain-attack-against-3cxdesktopapp). It shows how poisoning a release channel instantly creates enterprise exposure at scale.

### 5) Dependency confusion: pulling the attacker’s package (Since 2021)

[Researcher Alex Birsan demonstrated](https://medium.com/@alex.birsan/dependency-confusion-4a5d60fec610) that publishing packages to public registries with the same names as internal corporate packages can trick build systems into pulling the public, malicious version. The technique continues to resurface, reinforcing the need for namespace hygiene and registry pinning.

## A practical starter checklist

Knowing the problem is only the first step, acting on it is where real security gains happen.

The checklist below provides practical measures that any development or DevSecOps team can begin implementing right away to reduce supply chain risk.

1. SBOM on every build. Attach it to the artifact so you can search instantly when advisories land.
1. Continuous SCA (dependency scanning) and block builds on high-severity issues; auto-PR safe upgrades.[ ](https://owasp.org/Top10/2025/A03_2025-Software_Supply_Chain_Failures/)
1. Pin and verify dependencies (hashes/signatures). Avoid latest; use container digests.
1. Artifact signing & provenance (e.g., Sigstore/cosign; in-toto attestations). Verify at deploy time.
1. Harden CI/CD: MFA for admins, least privilege, protected branches/tags, required code review, tamper-evident logs, ephemeral runners.
1. Secret hygiene: managed vaults, short-lived credentials, no secrets in repos or logs.
1. Curate registries: use vetted internal mirrors; quarantine or block suspicious/newly compromised packages and images.
1. Change control for pipeline/config: alerts on runner, secret, or signing-policy changes; approvals required.
1. Namespace controls to prevent dependency confusion: scope internal packages, lock to approved registries, and enforce resolver rules in CI.
1. Exercise incident response: run drills to locate affected assets via SBOM, roll back/kill-switch compromised versions, and coordinate comms.

## CI/CD hardening essentials

Behind every software supply chain is a build pipeline, your *factory floor* for code. Securing it is non-negotiable. These practices strengthen the integrity of that process and make tampering much harder.

- Identity & access: MFA, role-based least privilege, and separation of duties so no single user can commit and push to production unreviewed.
- Release integrity: Require signed commits/tags for release branches; only CI can produce signed, immutable artifacts.
- Isolated builds: Ephemeral runners, clean workspaces, minimal egress from sensitive steps.
- Policy as code: Security gates (SAST/SCA, secrets, license checks) must block on failure.
- Continuous monitoring: Track unusual maintainer changes, surprise package releases, and registry advisories; subscribe to CVE/NVD feeds.

These controls ensure that even if an attacker breaches one part of the system, the damage is contained and detectable.

## Metrics that prove progress

Finally, security improvements need visibility. Measuring key metrics helps demonstrate progress to leadership and ensures efforts are sustainable over time.

- Coverage: % of services producing SBOMs; % of artifacts signed with verifiable provenance.
- Risk posture: MTTR for critical dependency CVEs; number of high-risk packages blocked at intake.
- Hygiene: % of repos with protected refs; % of pipelines with mandatory SCA/secret-scan gates.
- Response readiness: Time to enumerate exposure during a simulated supply-chain incident.

By tracking these indicators, teams can confidently show that their supply chain security posture is improving—and that they’re ready for whatever the next “Log4j moment” might be.

## Conclusion: securing the links that hold everything together

Software supply chain failures aren’t a theoretical risk, they’re one of the defining security challenges of our time. OWASP’s decision to elevate A03:2025 to the Top 3 spot acknowledges that every line of code, every dependency, and every pipeline stage is part of the security story.

The lesson is simple: you can’t protect what you don’t know, and you can’t trust what you don’t verify. By building visibility through SBOMs, enforcing verification through signing and provenance, and hardening your CI/CD processes, you dramatically reduce the chances of becoming the next cautionary headline.

## Strengthen your identity and access layer with Authgear

Supply chain resilience isn’t just about securing code—it’s about controlling who has access to your systems.

With Authgear, you can strengthen your authentication and authorization foundation using secure login flows, MFA, and modern identity standards like OIDC and WebAuthn.
