---
title: "Upgrading Keycloak: What Breaks and How to Plan It"
excerpt: "A practical Keycloak upgrade guide for 26.x: how releases work, the official upgrade procedure, database migration, themes and custom providers, rolling updates, a pre-upgrade checklist and a rollback plan."
coverImage: ./cover.webp
publishedAt: 2026-10-23
metaTitle: "Keycloak Upgrade Guide: What Breaks and How to Plan It"
metaDescription: "A practical Keycloak upgrade and migration guide for 26.x: release cadence, database migration, themes and providers, rolling updates, a checklist and rollback."
category: engineering
readTime: 10
faq:
  - q: "How often does Keycloak release?"
    a: "Keycloak plans four minor releases a year and a major release every two to three years. Patch releases come out every few weeks. In the past year, 26.4 to 26.8 arrived roughly every three months."
  - q: "Can I upgrade Keycloak without downtime?"
    a: "For patch releases within the same minor version, yes. Since 26.6, zero-downtime rolling updates of patch releases are supported and on by default. Minor and major upgrades need a full shutdown of the old nodes before the new version starts."
  - q: "Can I roll back a Keycloak upgrade?"
    a: "Only by restoring. Keycloak doesn't support rolling back database changes, so you restore the old installation and then the database backup you took before upgrading."
  - q: "Does Keycloak migrate the database automatically?"
    a: "Yes, by default the new version migrates the schema on first start-up. You can switch to a manual strategy, which writes the SQL to a file for your DBA to review and run."
  - q: "Can I migrate from Keycloak to another identity provider without resetting passwords?"
    a: "It depends on whether the new provider can read Keycloak's password hashes. Authgear can import Keycloak users with their passwords, so users keep signing in as before."
---

> Upgrading Keycloak means backing up the database, reading the migration notes for every version you cross, letting the new version migrate the schema on start-up, and re-testing your themes and custom providers. Patch upgrades can roll; minor and major upgrades need a full restart.

Keycloak upgrades are rarely hard. They are risky when they're rare. Skip a year and you have four minor releases of notes to read, themes that drifted from the templates they copied, and a database migration nobody has rehearsed.

This guide covers how Keycloak releases work, what the official upgrading guide asks you to do, a checklist you can copy, and how to test and roll back. It's based on the Keycloak 26.8 documentation, current in October 2026.

## How Keycloak releases work

Since Keycloak 26.0, the project has [planned four minor releases a year and a major release every two to three years](https://www.keycloak.org/2024/10/release-updates). The last year bears that out:

- 26.4.0: 30 September 2025
- 26.5.0: 6 January 2026
- 26.6.0: 8 April 2026
- 26.7.0: 9 July 2026
- 26.8.0: 1 October 2026

Patch releases arrive every few weeks in between. You can see the full list on [GitHub releases](https://github.com/keycloak/keycloak/releases).

Two rules from that announcement are worth knowing:

- **Breaking changes in a minor release are opt-in.**
- **A deprecated feature isn't removed until the next major version.**

That doesn't mean upgrades are free of surprises. Security fixes can change behaviour even in a patch release. The upgrading notes for 26.8.1, for example, list breaking changes such as SMTP StartTLS now being enforced when enabled, and identity provider client secrets having to be re-entered when the provider's destination changes.

The community project doesn't publish a support window for older versions, so the safe assumption is that fixes land on the latest release. If you need a defined lifecycle, the [Red Hat build of Keycloak](https://access.redhat.com/node/7092877) has its own support policy.

## Patch, minor or major: know which upgrade you're doing

The kind of upgrade decides how much downtime you need.

- **Patch (26.8.0 → 26.8.1).** Since 26.6, [zero-downtime rolling updates of patch releases](https://www.keycloak.org/server/update-compatibility) are supported and on by default. You replace nodes one at a time.
- **Minor (26.7 → 26.8) or major.** The database schema changes, so you shut down every old node before the new version starts. Plan a maintenance window.

Keycloak can tell you which one applies. Generate metadata with your current version and configuration, then check it with the new version:

```bash
# With the current version and the exact options you run with
bin/kc.sh update-compatibility metadata --file=/tmp/kc-metadata.json

# With the new version and the same options
bin/kc.sh update-compatibility check --file=/tmp/kc-metadata.json
echo $?
```

Exit code `0` means a rolling update is possible. Exit code `3` means you need a recreate update, with all old nodes stopped first. Pass every option you normally set, through flags or environment variables, or the result can be wrong.

If you run the [Keycloak Operator](https://www.keycloak.org/operator/rolling-updates), the default update strategy, `RecreateOnImageChange`, scales down before applying a new image. The `Auto` strategy runs this compatibility check for you and rolls when it can:

```yaml
apiVersion: k8s.keycloak.org/v2beta1
kind: Keycloak
metadata:
  name: example-kc
spec:
  update:
    strategy: Auto
```

## The official upgrade procedure

The [upgrading guide](https://www.keycloak.org/docs/latest/upgrading/index.html) sets out the order: read the migration changes, upgrade the server, then upgrade adapters and client libraries. For the server itself:

1. **Shut down Keycloak** if a rolling update isn't supported, as with any minor or major upgrade.
2. **Back up the old installation**: configuration, themes, providers.
3. **Back up the database** with your database's own tools. After the upgrade, the schema no longer works with the old version.
4. **Download the new version** and copy `providers/` and `themes/` across. Copy everything in `conf/` except `cache-ispn.xml`. If you changed that file, re-apply your changes to the new version's copy.
5. **Start the new version** against the database. It migrates the schema on first start-up.
6. **Migrate your themes**, comparing your custom templates, messages and styles against the new built-in ones.

If you run containers, steps 4 and 5 mean building a new image on the new tag, with your providers and theme JARs added before `kc.sh build`.

## Database migration

By default, Keycloak migrates the database automatically when the new version first starts. A few details matter on bigger installations:

- **Stop all old nodes first.** The guide says to shut down every node running the old version before the database is migrated.
- **The default timeout is 30 minutes.** Raise it if your data is large:

  ```bash
  bin/kc.sh start --transaction-setup-timeout=60m
  ```

- **Large tables skip index creation.** If a table has more than 300,000 records, Keycloak skips creating new indexes during migration so start-up isn't blocked. On PostgreSQL, Oracle Enterprise Edition, MySQL/MariaDB and some SQL Server editions, it then builds them in the background after start-up. On other databases it logs the SQL for you to run.
- **The H2 dev-file database isn't supported for migration.** Use a real database for anything you plan to upgrade.

If your DBA wants to review every change, use the manual strategy. Keycloak writes the SQL to a file and exits:

```bash
bin/kc.sh start \
  --spi-connections-jpa--quarkus--migration-strategy=manual \
  --spi-connections-jpa--quarkus--migration-export=/tmp/keycloak-database-update.sql
```

Run the script against the database, then start Keycloak normally. The first start-up may still run data migrations on top of the schema changes.

### Sessions during the upgrade

- **In-progress logins are lost.** Authentication flows live in memory, so anyone halfway through logging in or resetting a password starts again.
- **Coming from before 26.0?** Persistent user sessions became the default in 26.0. If they're switched off in your setup, every online session is lost at upgrade and users log in again. Disabling persistent sessions is deprecated since 26.8.

## Themes and custom providers

This is where most upgrades actually break.

**Themes.** The guide asks you to diff any template you overrode against the new base template, check messages for renamed and changed keys, and diff stylesheets if you extend a built-in theme. Recent changes that affected custom login themes:

- **26.5**: login theme messages no longer accept HTML or HTML entities.
- **26.7**: FreeMarker 2.3.32 defaults, and new button layouts on login pages.
- **26.8**: redesigned identity provider buttons, which can upset themes that override `social-providers.ftl`.

Our guide to the [Keycloak custom login page](/post/keycloak-custom-login-page) shows how to build themes that survive these changes: extend `keycloak.v2`, prefer CSS and messages, and override as few templates as possible.

**Custom providers.** Anything you built on Keycloak's Service Provider Interfaces (SPIs) is Java compiled against one version of Keycloak. Rebuild it against the new version and run its tests. The 26.8.0 notes, for example, say to re-test extensions that use Quarkus-internal APIs after the Quarkus upgrade, and 26.7.0 changed the order in which custom token post-processors run. Read the notes for every version you cross, not just the last one.

## Pre-upgrade checklist

Copy this into your ticket:

- [ ] Note the current version and the target version.
- [ ] Read the "Migrating to" section of the upgrading guide for every version in between.
- [ ] List every custom theme, provider JAR and changed config file.
- [ ] Rebuild custom providers against the target version and run their tests.
- [ ] Diff overridden theme templates against the new base templates.
- [ ] Run `update-compatibility check` to confirm rolling or recreate.
- [ ] Take a database backup and test that it restores.
- [ ] Back up `conf/`, `themes/` and `providers/`, or tag the current container image.
- [ ] Check the database user has the permissions the migration needs. On PostgreSQL, the guide asks for `SELECT` on `pg_class` and `pg_namespace`.
- [ ] Book a maintenance window for minor and major upgrades, and tell support.
- [ ] Upgrade staging first with a copy of production data.

## How to test an upgrade

A good test environment is a copy of production, not a fresh install.

1. **Restore a recent production backup into staging.** It's the only way to see real migration times and catch data the migration doesn't like.
2. **Time the start-up.** That's roughly your downtime for a minor upgrade. If it's close to 30 minutes, raise the timeout.
3. **Check health endpoints.** With health enabled, `/health/ready` on management port 9000 tells you when the node can take traffic:

   ```bash
   curl --head -fsS http://localhost:9000/health/ready
   ```

4. **Run your login journeys.** Password login, registration, password reset, MFA, passkeys, social and enterprise identity providers, and logout. Automate them if you can.
5. **Test your apps' tokens.** Sign in from each client, refresh tokens and call your APIs. Check custom claims and mappers still appear.
6. **Compare screenshots** of every themed page with the old version.
7. **Check the logs** for warnings about deprecated options, features and SQL left to run.

## Rollback plan

Keycloak [doesn't support rolling back database changes](https://www.keycloak.org/docs/latest/upgrading/index.html). Your rollback is a restore:

1. Stop the new version on every node.
2. Restore the old installation, or redeploy the old container image.
3. Restore the database from the pre-upgrade backup.
4. Start the old version and check `/health/ready`.

Anything written after the backup is lost, such as new users, password changes and sessions. Decide in advance how long you'll keep trying to fix forward before you restore, and who makes that call.

Realm exports from `kc.sh export` are not a substitute for a database backup. The [import and export guide](https://www.keycloak.org/server/importExport) warns that exports have limits as a backup, and are only consistent when all nodes are stopped.

## Make upgrades boring

The teams that find Keycloak upgrades easy upgrade often:

- **Take patch releases as they come.** They roll without downtime and often carry security fixes.
- **Take every minor release within a month or two.** One set of notes at a time is easier than four.
- **Keep customisation thin.** Fewer overridden templates and SPIs mean less to re-test.
- **Script the upgrade.** Build the image, run the compatibility check, deploy to staging, run the login tests, deploy to production.

If that work is more than you want to own, the options are someone running Keycloak for you, or a different platform. We compare them in [managed Keycloak vs a private cloud](/post/managed-keycloak-vs-private-cloud).

## Or migrate off Keycloak

Sometimes the honest answer to "how do we keep upgrading this?" is to move. If you're weighing that up, Authgear is an open-source identity platform under the same Apache-2.0 licence as Keycloak. You can self-host it with every feature, or have us run a private cloud for you in a region you choose. Login pages are styled in a portal editor with full CSS and HTML, so there are no theme templates to re-test.

The part most teams worry about is passwords. Authgear can import your Keycloak users with their passwords, so nobody has to reset. Both speak OIDC and SAML, so your apps mostly need new client settings. See the [Keycloak alternative page](/compare/keycloak-alternative), or compare the options in [Authentik vs Keycloak vs Authgear](/post/best-self-hosted-sso-platforms-compared-authgear-vs-keycloak-vs-authentik).

## Frequently Asked Questions

### How often does Keycloak release?

Keycloak plans four minor releases a year and a major release every two to three years. Patch releases come out every few weeks. In the past year, 26.4 to 26.8 arrived roughly every three months.

### Can I upgrade Keycloak without downtime?

For patch releases within the same minor version, yes. Since 26.6, zero-downtime rolling updates of patch releases are supported and on by default. Minor and major upgrades need a full shutdown of the old nodes before the new version starts.

### Can I roll back a Keycloak upgrade?

Only by restoring. Keycloak doesn't support rolling back database changes, so you restore the old installation and then the database backup you took before upgrading.

### Does Keycloak migrate the database automatically?

Yes, by default the new version migrates the schema on first start-up. You can switch to a manual strategy, which writes the SQL to a file for your DBA to review and run.

### Can I migrate from Keycloak to another identity provider without resetting passwords?

It depends on whether the new provider can read Keycloak's password hashes. Authgear can import Keycloak users with their passwords, so users keep signing in as before.

## Further reading

- [Keycloak custom login page: themes, limits and alternatives](/post/keycloak-custom-login-page)
- [Best open-source identity providers](/post/best-open-source-identity-providers)
- Keycloak docs: [Upgrading guide](https://www.keycloak.org/docs/latest/upgrading/index.html) and [Checking if rolling updates are possible](https://www.keycloak.org/server/update-compatibility)
