---
title: "What Is SCIM? SCIM Provisioning Explained (2026)"
h1: "What Is SCIM? SCIM Provisioning and How It Works (2026)"
excerpt: "SCIM is the open standard that automates user provisioning between identity providers and SaaS apps. Learn how SCIM 2.0 works — endpoints, schemas, provisioning flows, and how to implement it securely."
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "What Is SCIM? SCIM Provisioning Explained | Authgear"
metaDescription: "SCIM (System for Cross-domain Identity Management) automates user provisioning between IdPs and SaaS apps. Learn how SCIM 2.0 endpoints, schemas, and sync flows work."
publishedAt: 2025-12-01T14:57:25.419Z
updatedAt: 2026-06-03T00:00:00.000Z
draft: false
faq:
  - q: "What does SCIM stand for?"
    a: "SCIM stands for System for Cross-domain Identity Management. It is an open standard (RFC 7643 and RFC 7644) that defines a REST API and JSON schema for exchanging user and group identity data between identity providers and applications."
  - q: "Is SCIM required for SSO?"
    a: "No. SCIM handles user provisioning and management, while SSO (via OIDC or SAML) manages authentication. They complement each other but serve different purposes."
  - q: "What is the difference between SCIM and SSO?"
    a: "SSO answers 'can this person sign in?' — it authenticates users at login via SAML or OIDC. SCIM answers 'does this person's account exist, and is it up to date?' — it creates, updates, and deactivates accounts before and after login. Enterprise deployments typically use both together."
  - q: "Does SCIM manage passwords?"
    a: "No. SCIM is not an authentication protocol and does not transmit passwords."
  - q: "Can SCIM manage roles?"
    a: "Yes. Roles and permissions can be assigned or updated through SCIM attributes or group memberships."
  - q: "What is a SCIM endpoint?"
    a: "A SCIM endpoint is a REST API URL exposed by an application (the service provider) that an identity provider calls to manage accounts — for example /scim/v2/Users for user lifecycle operations and /scim/v2/Groups for group membership."
  - q: "What happens if provisioning fails?"
    a: "Failed provisioning stops further updates until the issue is resolved. Clear error messages and logs help identify and fix the problem quickly."
---

> **tl;dr** — SCIM (System for Cross-domain Identity Management) is the open standard that lets identity providers like Okta or Microsoft Entra automatically create, update, and deactivate user accounts in your SaaS app through a REST API. SSO logs users in; SCIM makes sure their accounts exist, stay accurate, and get shut off the day they leave.

SCIM (System for Cross-domain Identity Management) provisioning is an open standard protocol that automates the exchange of user identity information between identity providers (IdPs) and service providers (SPs). This process works by using a standardized REST API and JSON to synchronize user data in real-time, ensuring that when an identity is created or updated in a central directory, those changes are instantly reflected across all connected SaaS applications.

This guide explores the mechanics of SCIM 2.0, compares the continuous sync of SCIM vs. JIT (Just-in-Time) provisioning, and clarifies the difference between SCIM (provisioning) and SSO (authentication). By implementing automated onboarding and offboarding through SCIM, businesses can eliminate manual IT overhead, improve security compliance, and ensure users have the exact access they need from their first day to their last.

## **What Is SCIM?**

SCIM (System for Cross-Domain Identity Management) is an open standard that automates the exchange of user and group data between identity providers (IdPs) and service providers (SPs). SCIM defines:

- A schema for identity objects
- A REST API for lifecycle operations
- A predictable model for provisioning, updating, and deprovisioning accounts

The goal is to eliminate manual onboarding, reduce errors, and align identity data across systems at scale.

SCIM 2.0 is the current and widely adopted version. Major IdPs, including Azure AD, Okta, Google Workspace, OneLogin, Ping Identity, and others, use SCIM to push identity changes into SaaS applications.

## **Why SCIM Matters for Modern SaaS Platforms**

Enterprise environments rely on centralized directories to control access. Without SCIM, user lifecycle management becomes fragmented:

- Duplicate accounts appear
- Former employees retain access
- Group permissions drift over time
- Onboarding and offboarding require manual intervention

SCIM provisioning solves these problems by providing:

- **Automated onboarding:** Users are pre-provisioned as soon as they are assigned an application.
- **Attribute synchronization:**Profile changes propagate automatically.
- **Centralized access governance:**Group membership maps to roles inside the SaaS platform.
- **Immediate offboarding**: Deactivated users lose access consistently across systems.

For many enterprise buyers, SCIM support is a contractual requirement. SaaS teams building enterprise features often add SCIM early to reduce operational load and improve compliance alignment.

## **SCIM 2.0: Core Objects**

SCIM operates mainly on structured resources defined by the SCIM schema. The two primary resource types are User and Group, with additional metadata endpoints for configuration and discovery.

### **1. User Resource**

Represents a single identity record. Common SCIM 2.0 attributes include:

- `id`
- `externalId`
- `userName`
- `name.givenName`
- `name.familyName`
- `active`
- `emails[]`
- `phoneNumbers[]`

IdPs push these attributes when a user is created, updated, or deactivated. SaaS platforms typically map userName or externalId to an internal, stable identity key.

### 2. Group Resource

Represents a named collection of users. Key attributes include:

- `id`
- `displayName`
- `members[]`

Groups often drive role assignments, license types, or tenant membership. Many IdPs sync group membership changes in real time to enforce access rules.

### 3. Service Provider Configuration

Describes the SCIM server’s capabilities. IdPs read this endpoint to determine:

- Supported operations (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`)
- Authentication methods
- Support for filtering or bulk operations
- Maximum request sizes

### **4. Resource Types**

Provides metadata describing the available SCIM object types. This improves interoperability and reduces configuration errors between systems.

## **How SCIM Provisioning Works: Key Concepts**

SCIM is built on a REST-style API with standardized endpoints (defined in RFC 7644), designed for predictable CRUD operations on users and groups:

<div class="ag-table-wrap"><table class="ag-table"><thead><tr><th>Endpoint</th><th>Purpose</th></tr></thead><tbody><tr><td><code>/scim/v2/Users</code></td><td>Create, read, update, and deactivate user accounts</td></tr><tr><td><code>/scim/v2/Groups</code></td><td>Manage group memberships and role mappings</td></tr><tr><td><code>/scim/v2/Bulk</code></td><td>Handle multiple operations in a single request</td></tr><tr><td><code>/scim/v2/ServiceProviderConfig</code></td><td>Advertise supported features of the SCIM server</td></tr><tr><td><code>/scim/v2/ResourceTypes</code></td><td>Retrieve available object types</td></tr><tr><td><code>/scim/v2/Schemas</code></td><td>Describe attribute definitions for each resource type</td></tr></tbody></table></div>

Identity providers interact with the SaaS platform using standard HTTP methods:

<div class="ag-table-wrap"><table class="ag-table"><thead><tr><th>Operation</th><th>HTTP request</th></tr></thead><tbody><tr><td>Create user</td><td><code>POST /Users</code></td></tr><tr><td>Update user</td><td><code>PATCH</code> or <code>PUT /Users/{id}</code></td></tr><tr><td>Deactivate user</td><td><code>PATCH /Users/{id}</code> set <code>{ active: false }</code></td></tr><tr><td>Delete user</td><td><code>DELETE /Users/{id}</code></td></tr><tr><td>Manage groups</td><td><code>POST/PUT/PATCH /Groups</code></td></tr></tbody></table></div>

These API requests trigger the SaaS platform’s internal provisioning logic, such as creating local accounts, assigning permissions, or revoking access when a user leaves the organization.

## **SCIM Provisioning Flow (Step-By-Step)**

SCIM provisioning automates the lifecycle of user and group accounts between an identity provider and a SaaS platform. The process ensures users are created, updated, and deactivated consistently, while group memberships and permissions stay in sync.

The following steps outline a typical provisioning sequence, showing how identity changes flow from the IdP to the SaaS system.

### **1. App Assignment**

An administrator assigns a user or group to the application within the identity provider (IdP). This assignment initiates the provisioning process.

### **2. User Creation**

The IdP sends a POST /Users request containing the user’s identity attributes, such as name, email, and department.

### **3. SaaS System Stores the Record**

The SaaS platform creates or updates the corresponding user entity in its database and returns a SCIM ID that uniquely identifies the user.

### **4. Updates Through PATCH**

Any changes to a user’s profile, such as department, name, or phone number, are sent incrementally using PATCH operations. This ensures the SaaS platform maintains up-to-date information without overwriting unrelated data.

### **5. Group Membership Sync**

The IdP pushes group membership changes to /Groups/{id}. This keeps role mappings and permissions aligned with the user’s current assignments.

### **6. Deprovisioning Trigger**

When a user is removed from the application or directory, the IdP sends either a PATCH active:false or a DELETE /Users/{id} request.

### **7. Access Revocation**

The SaaS platform responds by disabling active sessions, revoking tokens, and updating authorization to ensure the user can no longer access the system.

This sequence allows enterprises to maintain a single authoritative identity source while keeping the SaaS platform synchronized with minimal manual intervention.

## **Just-In-Time vs Scheduled Sync**

SCIM provisioning is typically paired with JIT or scheduled synchronization. Each model serves different requirements.

### **1. Just-In-Time (JIT) Provisioning**

SCIM provisioning can be implemented in different synchronization models depending on the organization’s requirements:

**Characteristics:**

- Triggered by login, not pre-provisioning
- Suitable for lightweight identity models
- Does not automatically update attributes
- Deprovisioning depends on app removal or login check

JIT is simple to implement but may not satisfy enterprise governance needs, as it doesn’t support strict offboarding or pre-created accounts

### **2. Scheduled Sync (Push-Based Provisioning)**

In this model, identity providers push updates at regular intervals or on-demand.

**Characteristics:**

- Typically syncs every 20–60 minutes, depending on the IdP.
- Handles bulk updates for large directories
- Corrects attribute drift
- Maintains authoritative identity state

Scheduled SCIM synchronization is the preferred approach for large enterprises or applications that require predictable, pre-provisioned accounts.

### **3. When Each Model Fits**

- **JIT:** Best for small teams or low-complexity identity requirements.
- **Scheduled SCIM Provisioning:** Essential for enterprise-grade needs, strict offboarding, and group-driven authorization.

## **Deprovisioning: Why It Matters**

Deprovisioning is a critical step in identity management. Failing to properly deactivate accounts creates one of the highest-risk security scenarios—former employees retaining access.

SCIM standardizes deactivation using:

- `PATCH /Users/{id} set { active: false }`
- `DELETE /Users/{id}`
- Group membership removal

A compliant SCIM server should:

- Disable user sessions
- Revoke active tokens
- Remove group-based permissions
- Prevent new sessions from being issued

Many SaaS platforms implement a “soft delete” approach to preserve audit logs while ensuring strict access control. Proper deprovisioning ensures that users who leave the organization cannot continue to access enterprise resources.

## **How SCIM Interacts With SSO?**

SCIM is not an authentication protocol. Instead, it complements authentication systems by ensuring that user identities exist and are up-to-date before login. A typical architecture uses:

- <a href="/post/oidc-vs-saml" target="_blank">OIDC or SAML</a> for authentication
- SCIM for provisioning and attribute synchronization
- RBAC/ABAC for authorization based on SCIM data

For a deeper comparison of how the provisioning and authentication layers divide the work, see [SCIM vs SAML: What's the Difference?](/post/scim-vs-saml)

This separation of responsibilities keeps authentication lightweight while centralizing identity lifecycle management.

## **Common SCIM Implementation Challenges and Pitfalls**

While SCIM simplifies identity management in theory, production implementations frequently encounter challenges that can disrupt user lifecycle automation.

Understanding these pitfalls helps SaaS teams design more reliable provisioning systems.

1. **Attribute Mismatches:** Different identity providers may interpret SCIM schemas inconsistently. Typical issues include missing or misformatted `userName`, unstable `externalId` values, or multi-valued attributes such as phone numbers and emails that do not align with the application’s expectations. Without clear mapping rules and validation, these mismatches can cause repeated provisioning failures or data inconsistencies.
1. **Incomplete PATCH Support:** Many IdPs rely on incremental `PATCH` operations to update user attributes. If the SCIM server does not fully support PATCH semantics or handles only full replacements (`PUT`), updates may fail, leading to stale data and synchronization errors.
1. **Duplicate Accounts from JIT and SCIM:** When just-in-time (JIT) provisioning runs alongside SCIM push provisioning without a consistent, stable identifier, it can create parallel user records. This can result in authorization conflicts and auditing complications.
1. **Deprovisioning Gaps:** Failing to fully deactivate users, including revoking API tokens, sessions, and group-based permissions, can leave former employees or contractors with lingering access. Many systems only disable UI login, which is insufficient for enterprise security.
1. **Error Handling and Reporting:** Inconsistent or unclear error messages from the SCIM server can halt provisioning or make troubleshooting difficult. IdPs may pause synchronization after repeated 4xx responses, highlighting the need for precise logging and actionable feedback.
1. **Group Semantics Misalignment:** Groups in the IdP may not map directly to roles or tenants in the SaaS platform. Without established conventions, this can lead to privilege escalation or misassigned access.

Addressing these pitfalls proactively ensures that SCIM provisioning delivers consistent, secure, and predictable identity management at scale.

## **Best Practices for SaaS Teams**

Teams exploring what is SCIM provisioning should follow these best practices:

### **1. API and Schema Consistency**

Support all CRUD operations for Users and Groups. Fully implement PATCH operations for incremental updates. Use stable, immutable SCIM IDs to avoid duplicates. Ensure default fields behave predictably to prevent unexpected data issues.

### **2. Security Hardening**

Require token-based authentication for all provisioning requests. Validate incoming attributes against the SCIM schema to prevent invalid data. Log all provisioning events for auditing and troubleshooting. Apply rate limiting to protect the API from excessive requests or abuse.

### **3. Operational Reliability**

Design APIs to be idempotent, so repeated requests do not cause errors. Provide clear, actionable error messages to make troubleshooting easier. Handle repeated requests safely, and implement reconciliation workflows to correct mismatches between the IdP and the SaaS platform.

### **4. Customer Integration Experience**

Offer detailed SCIM configuration guides and documentation for attribute mappings. Provide debugging tools, logs, and support for test environments. This helps customers verify integration before going live and reduces support overhead.

## **SCIM vs JIT Provisioning: When To Use Each**

SCIM provisioning is ideal for scenarios that require structured, automated identity management, including:

- Enterprise customers with complex user hierarchies
- Large numbers of users and nested groups
- Strict offboarding or deprovisioning policies
- Detailed role and permission models
- Pre-provisioned accounts that must exist before first login

Just-In-Time (JIT) provisioning works best for lighter, on-demand identity needs, such as:

- Smaller or non-enterprise accounts
- Applications that do not require pre-created users
- Cases where users can be created dynamically at first login

Many SaaS teams adopt a hybrid approach: using JIT provisioning for smaller customers or casual users, while relying on SCIM for enterprise tenants that require pre-provisioned accounts and strict lifecycle management. This balance helps optimize both efficiency and security across different customer segments.

## **Bottom Line**

SCIM provisioning helps SaaS platforms manage users and groups efficiently, automating onboarding, updates, and offboarding while keeping data accurate across systems. This reduces errors, improves security, and ensures access stays aligned with current roles.

<a href="/" target="_blank">Explore Authgear today</a> to streamline identity management and ensure consistent, secure access across all your applications.

## **FAQs**

### **1. Is SCIM required for SSO?**

No. SCIM handles user provisioning and management, while SSO (via OIDC or SAML) manages authentication. They complement each other but serve different purposes.

### **2. Does SCIM manage passwords?**

No. SCIM is not an authentication protocol and does not transmit passwords.

### **3. Can SCIM manage roles?**

Yes. Roles and permissions can be assigned or updated through SCIM attributes or group memberships.

### **4. What happens if provisioning fails?**

Failed provisioning stops further updates until the issue is resolved. Clear error messages and logs help identify and fix the problem quickly.
