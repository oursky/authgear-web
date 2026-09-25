---
title: "Authentik vs. Keycloak (und Authgear): Self-Hosted SSO im Vergleich"
excerpt: "Authentik oder Keycloak? Ein fairer, aktueller Vergleich der beiden beliebtesten selbst gehosteten Identity Provider, mit Authgear als dritter Option und einem Blick auf Datensouveränität und DSGVO."
coverImage: ./cover.webp
category: industry
featured: false
readTime: 11
metaTitle: "Authentik vs. Keycloak vs. Authgear: Self-Hosted SSO 2026"
metaDescription: "Authentik vs. Keycloak 2026: Lizenzen, Passkeys, MFA, Anpassung, Support und Datensouveränität im Vergleich, dazu Authgear als dritte Self-Hosted-SSO-Option."
publishedAt: 2026-09-25T00:00:00.000Z
draft: false
faq:
  - q: "Ist Authentik besser als Keycloak?"
    a: "Keines der beiden ist in allem besser. Authentik ist meist schneller eingerichtet, lässt sich mit dem visuellen Flow-Editor leicht anpassen und kann für ältere Anwendungen als LDAP-, RADIUS- oder Proxy-Provider dienen. Keycloak ist die ausgereiftere Wahl für große Unternehmen, mit umfassender LDAP- und Active-Directory-Föderation, Identity Brokering und einer von der CNCF getragenen Community."
  - q: "Ist Keycloak kostenlos?"
    a: "Ja. Keycloak ist Open Source unter der Apache-2.0-Lizenz und kostenlos nutzbar. Unterstützte Versionen bietet Red Hat im Rahmen seiner Subscriptions an, gehostetes Keycloak gibt es von verschiedenen Drittanbietern."
  - q: "Ist Authentik kostenlos?"
    a: "Der Kern von Authentik ist Open Source unter der MIT-Lizenz und kostenlos selbst zu hosten. Einige Funktionen, etwa die Provider für Google Workspace und Microsoft Entra ID oder Privileged Access Management, erfordern eine Enterprise-Lizenz, die pro Benutzer abgerechnet wird."
  - q: "Welche schlanke Alternative zu Keycloak gibt es?"
    a: "Am häufigsten wird Authentik genannt. Seit Version 2025.10 braucht es nur noch PostgreSQL und kein Redis mehr. Authgear ist eine weitere Option, wenn Sie Passkeys, Magic Links sowie SMS- und WhatsApp-OTP integriert haben und zwischen Self-Hosting und einem gemanagten Dienst wählen möchten."
  - q: "Unterstützt Keycloak Passkeys?"
    a: "Ja. Keycloak unterstützt Passkeys und WebAuthn. Seit Version 26.3 lassen sich Passkeys direkt in den Standard-Anmeldeformularen aktivieren."
  - q: "Kann ich von Keycloak zu Authgear wechseln, ohne dass Passwörter zurückgesetzt werden müssen?"
    a: "Ja. Sie können Ihre Keycloak-Benutzer mitsamt ihren Passwörtern importieren."
  - q: "Ist selbst gehostetes SSO besser für DSGVO und Datensouveränität?"
    a: "Mit Self-Hosting entscheiden Sie selbst, wo Benutzerdaten gespeichert werden und wer darauf zugreifen kann. Das macht Fragen zu DSGVO und Datenresidenz leichter zu beantworten. DSGVO-konform sind Sie dadurch aber nicht automatisch. Sie brauchen weiterhin passende Vereinbarungen, Sicherheitsmaßnahmen und Prozesse."
---

Authentik und Keycloak sind die beiden Open-Source-Identity-Provider, die Teams am häufigsten in die engere Wahl nehmen, wenn sie Single Sign-on (SSO) auf eigenen Servern betreiben wollen. Beide sind gute Produkte. Sie passen nur zu unterschiedlichen Teams.

In diesem Artikel finden Sie zuerst die kurze Antwort und danach die Details: Lizenzen, Anmeldeverfahren, Anpassung, Support und was die Wahl für Datensouveränität und DSGVO bedeutet. Als dritte Option stellen wir Authgear vor, die Open-Source-Identity-Plattform, die wir entwickeln. Wir versuchen, allen drei gerecht zu werden, und sagen offen, wo jede ihre Stärken hat.

## Authentik vs. Keycloak: die kurze Antwort

- **Keycloak** passt, wenn Sie ein größeres Unternehmen mit bestehendem LDAP oder Active Directory sind, komplexe Föderationsanforderungen haben und ein Team, das mit Java vertraut ist.
- **Authentik** passt, wenn Sie schnell starten möchten, einen visuellen Flow-Editor schätzen und ein Werkzeug suchen, das für ältere interne Anwendungen auch als LDAP-, RADIUS- oder Proxy-Provider dient.
- **Authgear** lohnt einen Blick, wenn Sie kundennahe Anwendungen oder Apps für Mitarbeitende ohne Firmen-E-Mail entwickeln und Passkeys, Magic Links sowie SMS- und WhatsApp-OTP ab Werk wollen, mit der Wahl zwischen Self-Hosting und Betrieb durch uns.

| | Keycloak | Authentik | Authgear |
|---|---|---|---|
| **Lizenz** | Apache-2.0 | MIT-Kern; Enterprise-Funktionen unter separater Lizenz | Apache-2.0 |
| **Aktuelle Version** | 26.x | 2026.8 | Fortlaufende Releases |
| **Programmiersprache** | Java (Quarkus) | Python, Outposts in Go | Go |
| **Protokolle** | OIDC, OAuth 2.0, SAML 2.0 | OIDC, OAuth 2.0, SAML 2.0, dazu LDAP-, RADIUS-, SCIM-, Kerberos- und Proxy-Provider | OIDC, OAuth 2.0, SAML 2.0 |
| **Passkeys** | Ja (seit 26.3 in den Standard-Anmeldeformularen) | Ja (WebAuthn-/FIDO2-Stage) | Ja |
| **SMS-OTP** | Community-Erweiterungen | Integriert (Twilio oder generischer HTTP-Anbieter) | Integriert |
| **WhatsApp-OTP** | Nein | Nein | Integriert |
| **Magic Links** | Community-Erweiterungen | Über einen passwortlosen E-Mail-Link-Flow | Integriert |
| **LDAP / Active Directory** | Integrierte Föderation | Integrierte Quellen, kann selbst als LDAP-Server dienen | Unterstützt |
| **Anpassung der Login-Seiten** | FreeMarker-Themes, als JAR verpackt | Flows, Stages und CSS | Branding-Editor plus volles CSS und HTML |
| **Bezahlter Support** | Red Hat build of Keycloak | Enterprise, ab 5 $ pro internem Benutzer und Monat | Enterprise |
| **Gemanagter Dienst vom Hersteller** | Nein (nur über Dritte) | Nein | Ja, dazu Private Cloud |
| **Unternehmen dahinter** | CNCF-Projekt, federführend Red Hat (USA) | Authentik Security Inc. (USA) | Skymakers Digital Limited (Vereinigtes Königreich) |

Preise und Funktionen im September 2026 anhand der offiziellen Dokumentation der Projekte geprüft.

## Warum Teams ihren Identity Provider selbst hosten

Ihr Identity Provider speichert E-Mail-Adressen, Telefonnummern, Passwort-Hashes und den Anmeldeverlauf Ihrer Benutzer. Wer ihn selbst hostet:

- **bestimmt, wo diese Daten liegen**: im eigenen Rechenzentrum oder im eigenen Cloud-Konto, in dem Land, das Sie wählen.
- **bestimmt, welches Recht gilt**: Wenn kein externer Anbieter die Daten hält, kann auch kein externer Anbieter zur Herausgabe verpflichtet werden.
- **zahlt für Infrastruktur statt pro Benutzer**: Es gibt keine nutzerabhängige Rechnung eines SaaS-Anbieters (manche kostenpflichtigen Editionen rechnen allerdings trotzdem pro Benutzer ab).
- **steuert Upgrades selbst**: Sie entscheiden, wann gepatcht und wann auf eine neue Version gewechselt wird.

Der Preis dafür: Sie betreiben das System. Patches, Backups, Skalierung und Rufbereitschaft liegen bei Ihnen.

## Datensouveränität und DSGVO: die drei im Vergleich

Egal welche der drei Lösungen Sie selbst hosten, die Benutzerdaten liegen dort, wo Sie sie betreiben. Unterschiede zeigen sich, sobald Sie Unterstützung brauchen: eine unterstützte Version, einen gehosteten Dienst oder jemanden, den Sie nachts um drei anrufen können.

- **Keycloak.** Das Open-Source-Projekt selbst bietet keinen gemanagten Dienst an. Unterstützte Versionen liefert Red Hat, ein US-Unternehmen im Besitz von IBM, im Rahmen seiner Subscriptions. Betreiben müssen Sie diese weiterhin selbst. Gehostetes Keycloak gibt es von Drittanbietern, einige davon mit Sitz in Europa.
- **Authentik.** Authentik Security Inc. ist ein US-Unternehmen. Eine gehostete Version gibt es derzeit nicht, Sie betreiben Authentik also immer selbst. Die Enterprise-Lizenz bringt Funktionen und Support, aber kein Hosting.
- **Authgear.** Sie können Authgear selbst hosten, Authgear Cloud nutzen oder uns eine Private Cloud für Sie betreiben lassen, in einer Region Ihrer Wahl. Authgear wird von Skymakers Digital Limited entwickelt, einem im Vereinigten Königreich registrierten Unternehmen. Authgear Cloud läuft derzeit in den USA und in Hongkong, eine EU-Region ist in Vorbereitung.

Mehr dazu, wo Identitätsdaten liegen und welches Recht darauf zugreifen kann, lesen Sie auf unserer Seite zur [Datensouveränität](/de/solutions/data-sovereignty).

## Keycloak

Keycloak ist der etablierteste Open-Source-Server für Identity and Access Management. Seit 2023 ist es ein CNCF-Incubating-Projekt, Red Hat ist weiterhin der wichtigste Beitragende.

### Wo Keycloak stark ist

- **Föderation im Unternehmen.** Integrierte Benutzerföderation mit LDAP, Active Directory und Kerberos sowie Identity Brokering zu anderen SAML- und OIDC-Providern.
- **Reife.** Jahrelanger Produktiveinsatz in großen Organisationen, umfangreiche Dokumentation und eine große Community.
- **Mandantenfähigkeit.** Realms trennen Mandanten voneinander, Organisationen ergänzen B2B-Mandanten innerhalb eines Realms.
- **Moderne Anmeldung, wo es zählt.** Passkeys werden unterstützt und lassen sich seit 26.3 in den Standard-Anmeldeformularen aktivieren, neben TOTP und Wiederherstellungscodes.
- **Herstellerneutrale Governance** unter dem Dach der CNCF, mit Apache-2.0-Lizenz.

### Womit Sie rechnen sollten

- **Login-Seiten sind FreeMarker-Themes.** Themes für den Produktivbetrieb werden als JAR verpackt, und der Upgrade-Leitfaden empfiehlt, eigene Themes nach jedem Upgrade erneut zu testen.
- **Manche Anmeldeverfahren brauchen Erweiterungen.** SMS-OTP, E-Mail-OTP und Magic Links sind nicht integriert. Community-Erweiterungen schließen die Lücke, pflegen müssen Sie diese aber selbst.
- **Eigene Logik heißt Java.** Service Provider Interfaces (SPIs) sind mächtig, aber es ist Java-Code, den Sie bauen, testen und neu ausrollen.
- **Kein offizielles Mobile-SDK.** Keycloak empfiehlt die AppAuth-Bibliotheken für iOS und Android.

### Geeignet für

Große Organisationen mit bestehenden Verzeichnisdiensten, komplexen Föderationsanforderungen und einem Plattform-Team, das einen Java-Dienst verantworten kann.

## Authentik

Authentik ist ein jüngerer Open-Source-Identity-Provider, der auf Flows aufbaut: Sie verketten Stages (Identifikation, Passwort, MFA, Einwilligung usw.) in einem visuellen Editor und gestalten so jeden Anmeldeablauf.

### Wo Authentik stark ist

- **Schneller Einstieg.** Docker Compose oder Helm, und seit 2025.10 ist PostgreSQL der einzige benötigte Datenspeicher (Redis entfällt).
- **Nachvollziehbare Flows.** Das Modell aus Flows und Stages macht es leicht, eigene Anmelde- und Registrierungsabläufe zu bauen und zu verstehen.
- **Ein Werkzeug für viele Protokolle.** Neben OIDC und SAML kann Authentik als LDAP-Server, RADIUS-Server, SCIM-Provider und als Proxy dienen, der Anwendungen ohne eigene SSO-Unterstützung absichert.
- **Integrierte MFA.** Passkeys (WebAuthn), TOTP, statische Codes, Duo, SMS (Twilio oder generischer HTTP-Anbieter) und E-Mail-Codes stehen als Stages bereit.
- **Aktive Entwicklung.** Regelmäßige Releases; 2026.8 brachte Privileged Access Management, Agent-Konten, Kontowechsel und geplantes Offboarding.

### Womit Sie rechnen sollten

- **Manche Funktionen erfordern Enterprise.** Provider für Google Workspace und Microsoft Entra ID, mTLS, Device Trust, Privileged Access Management und erweiterte Audit-Logs setzen eine kostenpflichtige Lizenz voraus (5 $ pro internem Benutzer und Monat, 0,02 $ pro externem Benutzer und Monat).
- **Kleineres Ökosystem als Keycloak.** Weniger Referenzen aus Großunternehmen und weniger Anleitungen von Dritten.
- **Kein WhatsApp-OTP.**
- **Keine gehostete Variante vom Hersteller**, Sie betreiben Authentik also immer selbst.

### Geeignet für

Kleine und mittlere Teams, vom internen Tool über das Homelab bis zum unternehmensweiten SSO, besonders wenn ältere Anwendungen eine Anmeldung per LDAP, RADIUS oder Proxy brauchen.

## Authgear

Authgear ist eine Open-Source-Identity-Plattform für kundennahe Anwendungen und für Mitarbeitende im Außen- und Filialdienst. Sie steht unter der Apache-2.0-Lizenz, derselben Lizenz wie Keycloak.

### Wo Authgear stark ist

- **Moderne Anmeldung ab Werk.** Passkeys, biometrische Anmeldung in nativen Apps über die iOS- und Android-SDKs, Magic Links, SMS-OTP und WhatsApp-OTP. Sie aktivieren sie im Portal, statt Erweiterungen nachzurüsten.
- **Login-Seiten ohne Templates.** Ein Branding-Editor für Logo, Farben und Themes, dazu volle CSS- und HTML-Anpassung in jedem Tarif, auch im Self-Hosting.
- **Dasselbe Produkt, egal wo es läuft.** Die selbst gehostete Version bietet alle Funktionen der Authgear Cloud. Betreiben Sie sie selbst mit unserem Helm-Chart, nutzen Sie Authgear Cloud oder lassen Sie uns eine Private Cloud in einer Region Ihrer Wahl betreiben.
- **LDAP und Active Directory** werden für Teams mit bestehenden Verzeichnisdiensten unterstützt.
- **Sicherheit inklusive.** MFA, Kontosperre, Bot-Schutz und Rate Limiting sind Standard.
- **Support, wenn Sie ihn brauchen.** Bezahlter Support für selbst gehostetes Authgear ist Teil von Enterprise.

### Womit Sie rechnen sollten

- **Im Self-Hosting binden Sie eigene Anbieter an.** Magic Links, SMS-OTP und WhatsApp-OTP funktionieren in selbst gehostetem Authgear, sobald Sie Ihren eigenen E-Mail-, SMS- oder WhatsApp-Anbieter anbinden.
- **Jünger als Keycloak**, mit einer kleineren Community als Keycloak oder Authentik.
- **Zuerst für Kunden- und Mitarbeiter-Logins gebaut.** Für eine tiefe Föderation über viele Unternehmensverzeichnisse hinweg hat Keycloak mehr Erfahrung.

### Geeignet für

SaaS- und Consumer-Apps, Mitarbeitende ohne Firmen-E-Mail und Teams, die moderne Anmeldeverfahren wollen, ohne Themes und Erweiterungen pflegen zu müssen.

## Empfehlungen nach Anwendungsfall

- **Unternehmen mit bestehendem AD/LDAP und komplexer Föderation:** Keycloak
- **SSO für ältere Anwendungen per LDAP, RADIUS oder Proxy:** Authentik
- **Visuelle, Flow-basierte Anmeldeabläufe:** Authentik
- **Kundennahe Apps mit Passkeys, Magic Links und WhatsApp-OTP:** Authgear
- **Mitarbeitende ohne Firmen-E-Mail:** Authgear
- **Heute selbst hosten, später gemanagt (oder umgekehrt):** Authgear
- **Herstellerneutrales, von einer Stiftung getragenes Projekt:** Keycloak

## Der Wechsel zwischen den Systemen

Alle drei sprechen OIDC und SAML. Ihre Anwendungen brauchen daher vor allem neue Client-IDs, Redirect-URIs und Issuer-Einstellungen, aber keinen neuen Code.

Schwieriger sind die Benutzerdaten. Sie exportieren die Benutzer, ordnen die Attribute zu und kümmern sich um die Passwort-Hashes. Keycloak nutzt seit Version 25 standardmäßig Argon2. Prüfen Sie also, ob Ihr neuer Provider diese Hashes importieren kann, sonst müssen manche Benutzer ihr Passwort zurücksetzen.

Wenn Sie von Keycloak zu Authgear wechseln, können Sie Ihre Keycloak-Benutzer mitsamt ihren Passwörtern importieren. Einen direkten Vergleich der beiden finden Sie auf unserer Seite [Keycloak-Alternative](/de/compare/keycloak-alternative).

## Fazit

- **Keycloak** ist die sichere, ausgereifte Wahl für große Unternehmen mit Verzeichnisdiensten und einem Team, das den Betrieb übernimmt.
- **Authentik** ist der einfachere Einstieg für kleine und mittlere Teams und ein gutes Allround-Werkzeug für ältere interne Anwendungen.
- **Authgear** passt zu kundennahen Anwendungen und Apps für Mitarbeitende, die moderne Anmeldeverfahren brauchen, mit der Freiheit, selbst zu hosten oder den Betrieb abzugeben.

Möchten Sie sehen, wie Authgear in Ihre Umgebung passt? [Vereinbaren Sie eine Demo](/de/schedule-demo).

## Weiterführende Artikel (auf Englisch)

- [How to implement passkeys: a developer guide](/post/how-to-implement-passkeys-developer-guide)
- [OIDC vs SAML](/post/oidc-vs-saml)
- [UK data sovereignty for login and identity](/post/uk-data-sovereignty-login-identity)

## Häufig gestellte Fragen

### Ist Authentik besser als Keycloak?

Keines der beiden ist in allem besser. Authentik ist meist schneller eingerichtet, lässt sich mit dem visuellen Flow-Editor leicht anpassen und kann für ältere Anwendungen als LDAP-, RADIUS- oder Proxy-Provider dienen. Keycloak ist die ausgereiftere Wahl für große Unternehmen, mit umfassender LDAP- und Active-Directory-Föderation, Identity Brokering und einer von der CNCF getragenen Community.

### Ist Keycloak kostenlos?

Ja. Keycloak ist Open Source unter der Apache-2.0-Lizenz und kostenlos nutzbar. Unterstützte Versionen bietet Red Hat im Rahmen seiner Subscriptions an, gehostetes Keycloak gibt es von verschiedenen Drittanbietern.

### Ist Authentik kostenlos?

Der Kern von Authentik ist Open Source unter der MIT-Lizenz und kostenlos selbst zu hosten. Einige Funktionen, etwa die Provider für Google Workspace und Microsoft Entra ID oder Privileged Access Management, erfordern eine Enterprise-Lizenz, die pro Benutzer abgerechnet wird.

### Welche schlanke Alternative zu Keycloak gibt es?

Am häufigsten wird Authentik genannt. Seit Version 2025.10 braucht es nur noch PostgreSQL und kein Redis mehr. Authgear ist eine weitere Option, wenn Sie Passkeys, Magic Links sowie SMS- und WhatsApp-OTP integriert haben und zwischen Self-Hosting und einem gemanagten Dienst wählen möchten.

### Unterstützt Keycloak Passkeys?

Ja. Keycloak unterstützt Passkeys und WebAuthn. Seit Version 26.3 lassen sich Passkeys direkt in den Standard-Anmeldeformularen aktivieren.

### Kann ich von Keycloak zu Authgear wechseln, ohne dass Passwörter zurückgesetzt werden müssen?

Ja. Sie können Ihre Keycloak-Benutzer mitsamt ihren Passwörtern importieren.

### Ist selbst gehostetes SSO besser für DSGVO und Datensouveränität?

Mit Self-Hosting entscheiden Sie selbst, wo Benutzerdaten gespeichert werden und wer darauf zugreifen kann. Das macht Fragen zu DSGVO und Datenresidenz leichter zu beantworten. DSGVO-konform sind Sie dadurch aber nicht automatisch. Sie brauchen weiterhin passende Vereinbarungen, Sicherheitsmaßnahmen und Prozesse.
