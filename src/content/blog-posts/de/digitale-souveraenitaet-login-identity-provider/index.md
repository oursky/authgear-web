---
title: "Digitale Souveränität beim Login: Leitfaden für Identity Provider"
excerpt: "Digitale Souveränität wird meist an Office-Paketen und Clouds diskutiert. Dabei ist das Login-System das Tor zu allen anderen Diensten. Fünf Fragen, mit denen Sie Ihren Identity Provider prüfen, und was BSI C5, C3A und die neuen EU-Regeln dazu sagen."
coverImage: ./cover.webp
category: industry
featured: false
metaTitle: "Digitale Souveränität für Login und Identity Provider"
metaDescription: "Was digitale Souveränität für Ihr Login-System bedeutet: fünf Prüffragen, BSI C5 und C3A, souveräne Cloud, EU-Regeln und eine Checkliste für die IT-Leitung."
publishedAt: 2026-09-28
draft: false
faq:
  - q: "Was bedeutet digitale Souveränität?"
    a: "Das BSI versteht darunter die Fähigkeit von Menschen und Institutionen, ihre Rolle in der digitalen Welt selbstständig, selbstbestimmt und sicher auszuüben. Die Bundesregierung arbeitet an einer erweiterten Fassung, die unter anderem Steuerungsfähigkeit, Wechselmöglichkeiten und die Resilienz der Infrastruktur umfasst. Es geht also nicht um Autarkie, sondern um Kontrolle und echte Wahlmöglichkeiten."
  - q: "Was ist eine souveräne Cloud?"
    a: "Einen festen Standard gibt es nicht. Die Bundesregierung versteht darunter Clouds, die es dem Bund erlauben, selbstständig, selbstbestimmt und sicher tätig zu sein. In der Praxis sollten Sie drei Ebenen trennen: wo die Daten liegen, wer die Cloud betreibt und welchem Recht der Betreiber unterliegt. Viele Angebote mit dem Etikett „souverän“ lösen nur die ersten beiden."
  - q: "Reicht ein Rechenzentrum in Deutschland für digitale Souveränität?"
    a: "Nein. Der Standort ist nur eine von mehreren Fragen. Unterliegt der Anbieter US-Recht, kann er nach dem CLOUD Act zur Herausgabe verpflichtet sein, auch wenn die Server in Frankfurt stehen. Wichtig sind außerdem Betrieb, Support-Zugriffe, Unterauftragsverarbeiter und die Möglichkeit zu wechseln."
  - q: "Was ist der Unterschied zwischen BSI C5 und C3A?"
    a: "C5 prüft die Informationssicherheit eines Cloud-Dienstes und verlangt Angaben zur Gerichtsbarkeit. Die C3A (Criteria enabling Cloud Computing Autonomy) hat das BSI im April 2026 veröffentlicht. Sie bewerten, ob sich ein Cloud-Dienst im jeweiligen Risikokontext selbstbestimmt nutzen lässt, etwa nach Standort und Herkunft des Betriebspersonals. Die C3A setzen voraus, dass der Anbieter C5 erfüllt."
  - q: "Ist Open-Source-Software automatisch souverän?"
    a: "Nicht automatisch. Offener Code macht Sie unabhängig vom Hersteller, weil Sie die Software prüfen, anpassen und selbst betreiben können. Souverän wird der Betrieb aber erst, wenn auch Infrastruktur, Betreiber und Unterauftragsverarbeiter Ihren Anforderungen entsprechen."
  - q: "Was regelt der EU Data Act beim Wechsel des Anbieters?"
    a: "Seit dem 12. September 2025 müssen Anbieter von Datenverarbeitungsdiensten einen Wechsel ermöglichen: Kündigungsfrist höchstens zwei Monate, Übergangszeit in der Regel höchstens 30 Tage, eine vollständige Liste der exportierbaren Daten. Ab dem 12. Januar 2027 dürfen sie für den Wechsel keine Entgelte mehr verlangen. Wie das für Ihren Login-Dienst gilt, klären Sie am besten mit Ihrem Anbieter."
---

> **tl;dr** — Digitale Souveränität heißt: Sie behalten die Kontrolle über Ihre IT und können den Anbieter wechseln. Beim Login-System entscheidet sich das an fünf Fragen: Wo liegen die Daten, wer betreibt das System, welches Recht gilt für den Betreiber, können Sie wechseln, und wer verarbeitet sonst noch mit? Ein Rechenzentrum in Deutschland beantwortet nur die erste.

Wenn in Deutschland über digitale Souveränität gesprochen wird, geht es meist um Office-Pakete, Cloud-Infrastruktur und die öffentliche Verwaltung. Ein System kommt dabei selten vor, obwohl alles andere davon abhängt: der Login. Ihr Identity Provider entscheidet, wer auf E-Mail, Dateien, Fachanwendungen und Kundenportale zugreift. Er speichert E-Mail-Adressen, Passwort-Hashes, MFA-Geheimnisse und Anmeldeverläufe aller Nutzer. Fällt er aus oder ist er nicht mehr nutzbar, steht der Betrieb.

Dieser Leitfaden ordnet ein, was die Politik unter digitaler Souveränität versteht, was „souveräne Cloud“ tatsächlich bedeutet, welche Prüfkataloge und EU-Regeln es gibt und welche Fragen Sie Ihrem Identity Provider stellen sollten.

## Was „digitale Souveränität“ in Deutschland bedeutet

Die meistzitierte Definition stammt vom IT-Planungsrat und wird vom [BSI](https://www.bsi.bund.de/DE/Service-Navi/Presse/Alle-Meldungen-News/Blog/Digitale_Souveraenitaet_250319.html) verwendet: digitale Souveränität sind „die Fähigkeiten und Möglichkeiten von Individuen und Institutionen, ihre Rolle(n) in der digitalen Welt selbstständig, selbstbestimmt und sicher ausüben zu können“. Das BSI betont dabei ausdrücklich, dass es nicht um Autarkie geht, sondern darum, das Steuer in der Hand zu behalten und zwischen echten Optionen wählen zu können.

Die Bundesregierung arbeitet derzeit an einer erweiterten Fassung. In ihrer [Antwort auf eine Kleine Anfrage vom 22. April 2026](https://dserver.bundestag.de/btd/21/055/2105502.pdf) nennt sie fünf Dimensionen, darunter die „Durchsetzungs- und Steuerungsfähigkeit“, die „Substituierbarkeit und Interoperabilität“ durch offene Standards, Portabilität und Wechselmöglichkeiten sowie die „Resilienz der Infrastruktur“ einschließlich der Lieferketten.

In der Praxis zeigt sich das an mehreren Stellen:

- **openDesk und ZenDiS.** Das Zentrum für Digitale Souveränität (ZenDiS) entwickelt openDesk, einen Arbeitsplatz aus Open-Source-Anwendungen. Laut derselben Antwort hatte die Bundesverwaltung Ende 2025 knapp 7.900 openDesk-Lizenzen. Bis zum 31. März 2027 soll eine gehärtete Version für den Betrieb nach IT-Grundschutz bereitstehen.
- **Deutschland-Stack.** Das Bundesministerium für Digitales und Staatsmodernisierung baut mit dem [Deutschland-Stack](https://bmds.bund.de/themen/digitaler-staat/deutschland-stack) eine gemeinsame technische Grundlage für Bund, Länder und Kommunen auf, gestützt auf offene Standards und Open Source. Der IT-Planungsrat hat im März 2026 einen gemeinsamen Plattformkern beschlossen. Der erste Baustein darin: [Identifikation](https://bmds.bund.de/aktuelles/aktuelle-meldungen/detail/gemeinsame-umsetzung-des-deutschland-stacks).
- **Schleswig-Holstein.** Die Landesverwaltung hat im Oktober 2025 ihr gesamtes E-Mail-System von Exchange und Outlook auf Open-Xchange und Thunderbird umgestellt, mit [mehr als 40.000 Postfächern](https://www.schleswig-holstein.de/DE/landesregierung/ministerien-behoerden/I/Presse/PI/2025/cds/251006_cds_ox). LibreOffice war bereits eingeführt, Nextcloud und Linux sollen folgen.

Ein Detail, das selten erwähnt wird: Auch openDesk braucht eine Identitätsschicht. Laut [Architekturdokumentation](https://docs.opendesk.eu/operations/architecture/) melden sich alle Anwendungen per OpenID Connect über eine zentrale IAM-Komponente an. Wer seinen Arbeitsplatz souverän aufstellt, muss also auch den Login souverän aufstellen.

## Warum der Login dazugehört

Bei einem Dateispeicher geht es um die Dokumente, die dort liegen. Beim Identity Provider geht es um den Zugang zu allem anderen. Daraus ergeben sich zwei Risiken, die über den Datenschutz hinausgehen:

- **Abhängigkeit.** Wenn Ihr Login-Anbieter die Preise erhöht, Funktionen abkündigt oder den Dienst einstellt, betrifft das jede angebundene Anwendung. Ein Wechsel ist aufwendig, weil Passwort-Hashes, MFA-Registrierungen und Föderationen mit umziehen müssen.
- **Zugriff.** Das Nutzerverzeichnis mit Anmeldeverlauf zeigt, wer Ihre Mitarbeitenden und Kunden sind und wann sie welche Dienste nutzen. Wer dieses System kontrolliert, kontrolliert den Zugang.

Deshalb lohnt es sich, den Identity Provider mit derselben Sorgfalt zu prüfen wie Ihre Cloud-Infrastruktur.

## Fünf Fragen an Ihr Identitätssystem

### 1. Wo liegen die Daten?

Der Datenstandort ist die bekannteste Frage und die am leichtesten zu beantwortende. Prüfen Sie aber nicht nur die Produktionsdatenbank, sondern auch Backups, Logs, Monitoring und Analysedaten. Eine EU-Region für die Datenbank hilft wenig, wenn Protokolle in eine andere Region gespiegelt werden.

### 2. Wer betreibt das System?

Wer hat administrativen Zugriff auf Server und Datenbank? Von welchen Ländern aus arbeitet der Support, und wie werden Zugriffe protokolliert? Beim Self-Hosting ist das Ihr eigenes Team, bei einem Managed Service der Anbieter und oft dessen Dienstleister.

### 3. Welches Recht gilt für den Betreiber?

Hier liegt der Unterschied zwischen Datenresidenz und Souveränität. Der US CLOUD Act verpflichtet Anbieter, die US-Recht unterliegen, Daten herauszugeben, die sie kontrollieren, unabhängig vom Serverstandort. Was das Gesetz genau verlangt und wie es mit Art. 48 DSGVO kollidiert, haben wir in einem eigenen Beitrag erklärt: [CLOUD Act und Login-Anbieter](/de/post/cloud-act-login-anbieter-nutzerdaten). Entscheidend ist die Muttergesellschaft, nicht nur die deutsche Tochter.

### 4. Können Sie wechseln?

Souveränität ohne Exit-Option gibt es nicht. Fragen Sie:

- Können Sie alle Nutzer exportieren, einschließlich Passwort-Hashes, damit sich niemand neu registrieren muss?
- Nutzt das System offene Standards wie OpenID Connect, SAML und LDAP, oder hängen Ihre Anwendungen an proprietären SDKs?
- Ist der Quellcode offen, sodass Sie die Software notfalls selbst weiter betreiben können?

Open Source ist hier ein starkes Argument, aber kein Selbstläufer. Wer über Open-Source-Alternativen nachdenkt, findet einen Überblick in unserem [Vergleich von Authgear, Keycloak und authentik](/de/post/best-self-hosted-sso-platforms-compared-authgear-vs-keycloak-vs-authentik).

### 5. Wer verarbeitet sonst noch mit?

Ein Login-System arbeitet selten allein. Einmalcodes und Magic Links laufen über E-Mail- und SMS-Dienste, die Telefonnummern und Adressen sehen. Bot-Schutz, Monitoring und Backups kommen oft von weiteren Anbietern. Lassen Sie sich die vollständige Liste der Unterauftragsverarbeiter geben und prüfen Sie jeden einzelnen nach den Fragen 1 bis 3.

## Was „souveräne Cloud“ ändert und was nicht

Das Etikett „souverän“ ist nicht geschützt. Die Bundesregierung versteht unter einer souveränen Cloud [alle Clouds, „die es dem Bund erlauben, selbstständig, selbstbestimmt und sicher tätig zu sein“](https://www.bundestag.de/presse/hib/kurzmeldungen-1059042). Das ist eine Zielbeschreibung, kein Prüfkriterium. Hilfreich ist die Unterscheidung, die auch in der Fachpresse gemacht wird: Datenresidenz, operative Autonomie und rechtliche Souveränität sind drei verschiedene Dinge.

Grob lassen sich die Angebote so einordnen:

- **Europäische Anbieter** wie STACKIT (Schwarz Gruppe), IONOS, Hetzner, OVHcloud oder Scaleway haben ihren Sitz in der EU. Standort, Betrieb und anwendbares Recht liegen damit in Europa. Offen bleibt, welche Software und welche Zulieferer sie einsetzen.
- **US-verbundene Angebote** wie die Delos Cloud (Microsoft-Technologie, betrieben von der [SAP-Tochter Delos Cloud GmbH](https://news.sap.com/germany/2024/09/sap-digitale-souveraenitaet-investitionsprogramm-cloud-angebote/)) oder die AWS European Sovereign Cloud (eigene deutsche Gesellschaften, Personal mit Wohnsitz in der EU) lösen vor allem Standort und Betrieb. Wie US-Gerichte die Kontrolle eines US-Konzerns über solche Konstruktionen bewerten würden, ist bislang nicht entschieden.

Beide Modelle haben ihren Platz. Das BSI arbeitet mit beiden Seiten zusammen, unter anderem mit [IONOS](https://www.bsi.bund.de/DE/Service-Navi/Presse/Pressemitteilungen/Presse2026/260113_Digitale_Souveraenitaet_Cloud_Computing.html) und bei der Ausgestaltung der [AWS European Sovereign Cloud](https://www.bsi.bund.de/DE/Service-Navi/Presse/Pressemitteilungen/Presse2026/260115_BSI_AWS_European_Cloud.html). Welches Modell zu Ihnen passt, hängt von Ihrer Risikoanalyse ab.

Für den Login gilt dasselbe wie für jede andere Anwendung: Ein europäischer Identity Provider auf einem US-Hyperscaler verlagert die Frage nur eine Ebene tiefer.

## Prüfkataloge und EU-Regeln im Überblick

### BSI C5 und C3A

Der [Kriterienkatalog C5](https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/Empfehlungen-nach-Angriffszielen/Cloud-Computing/Kriterienkatalog-C5/C5_2025/C5_2025.html) ist in Deutschland der Maßstab für Cloud-Sicherheit. Die meisten Testate beruhen heute auf C5:2020. Dieser verlangt Angaben zur Gerichtsbarkeit und zu den Standorten der Datenverarbeitung (BC-01) sowie ein geregeltes Verfahren für Ermittlungsanfragen staatlicher Stellen (INQ-01 bis INQ-04). Der neue C5:2026 gilt für Testate ab dem 1. Juni 2027 und befasst sich ausführlicher mit der technischen Umsetzung von Souveränität.

Neu ist die [C3A (Criteria enabling Cloud Computing Autonomy)](https://www.bsi.bund.de/DE/Service-Navi/Presse/Pressemitteilungen/Presse2026/260427_C3A.html), die das BSI im April 2026 veröffentlicht hat. Während C5 die Sicherheit prüft, bewerten die C3A, ob sich ein Cloud-Dienst im jeweiligen Risikokontext selbstbestimmt nutzen lässt. Kunden wählen die passenden Kriterien aus, etwa zum Standort der Rechenzentren oder zur Herkunft des Betriebspersonals. Die C3A setzen voraus, dass der Anbieter C5 erfüllt.

### Der EU-Rahmen

- **Cloud Sovereignty Framework.** Die EU-Kommission bewertet Cloud-Anbieter seit Oktober 2025 nach acht [Souveränitätszielen](https://commission.europa.eu/document/download/09579818-64a6-4dd5-9577-446ab6219113_en), von der rechtlichen über die operative bis zur technologischen Souveränität, und nach fünf Stufen (SEAL-0 bis SEAL-4). Bei einer [Ausschreibung über 180 Millionen Euro](https://commission.europa.eu/news-and-media/news/commission-advances-cloud-sovereignty-through-strategic-procurement-2026-04-17_en) erhielten im April 2026 vier europäische Anbieter den Zuschlag, darunter STACKIT.
- **Cloud and AI Development Act.** Im Juni 2026 hat die Kommission ein [Paket zur technologischen Souveränität](https://commission.europa.eu/news-and-media/news/strengthening-europes-tech-sovereignty-2026-06-03_en) vorgelegt. Kernstück ist der Vorschlag für den Cloud and AI Development Act mit einem EU-weiten Bewertungsrahmen für Cloud-Souveränität. Er sieht [vier Stufen](https://digital-strategy.ec.europa.eu/en/policies/cloud-and-ai-development-act) für öffentliche Auftraggeber vor, von der Datenverarbeitung in der EU bis zu Anbietern, die in der EU kontrolliert werden. Es ist ein Vorschlag, Parlament und Rat verhandeln noch.
- **EUCS.** Das europäische Zertifizierungsschema für Cloud-Dienste ist seit Jahren in Arbeit und noch nicht verabschiedet.
- **EU Data Act.** Seit dem 12. September 2025 gelten Regeln für den Wechsel zwischen Datenverarbeitungsdiensten: unter anderem höchstens zwei Monate Kündigungsfrist, eine Übergangszeit von in der Regel höchstens 30 Tagen und eine vollständige Liste der exportierbaren Daten (Art. 25). Ab dem 12. Januar 2027 dürfen Anbieter für den Wechsel keine Entgelte mehr verlangen (Art. 29, [Verordnung (EU) 2023/2854](https://eur-lex.europa.eu/eli/reg/2023/2854/oj/deu)). Fragen Sie Ihren Anbieter, wie er diese Regeln auf Ihren Login-Dienst anwendet.

Für Unternehmen außerhalb der öffentlichen Verwaltung sind die meisten dieser Rahmenwerke nicht verbindlich. Als Checkliste für die eigene Bewertung taugen sie trotzdem.

## Checkliste für Ihren Identity Provider

**Datenstandort**
- In welchen Ländern liegen Produktionsdaten, Backups und Logs?
- Können wir die Region vertraglich festlegen?

**Betrieb**
- Wer hat administrativen Zugriff, und von wo aus arbeitet der Support?
- Werden Support-Zugriffe protokolliert und uns gemeldet?

**Rechtsraum**
- Welche Gesellschaft ist unser Vertragspartner, und wo sitzt die Muttergesellschaft?
- Auf wessen Infrastruktur läuft der Dienst?
- Wie gehen Sie mit behördlichen Anfragen um, und informieren Sie uns?
- Welche Testate liegen vor (etwa C5, ISO 27001), und für welchen Dienst genau?

**Wechsel**
- Können wir alle Nutzer mit Passwort-Hashes und MFA-Daten exportieren?
- Welche offenen Standards werden unterstützt (OIDC, SAML, LDAP)?
- Ist die Software Open Source, und könnten wir sie selbst betreiben?

**Unterauftragsverarbeiter**
- Wer versendet E-Mails und SMS?
- Welche weiteren Dienste sehen Nutzerdaten, und wo sitzen sie?

## Wo Authgear steht

Authgear wird von einem britischen Unternehmen entwickelt. Großbritannien gehört nicht zur EU, und Authgear hat kein BSI-C5-Testat. Beides sollten Sie wissen, bevor Sie weiterlesen.

Für einen souveränen Betrieb gibt es zwei Wege, die wir auf unserer Seite zur [Datensouveränität](/de/solutions/data-sovereignty) ausführlicher beschreiben:

- **Self-Hosting.** Authgear ist Open Source unter Apache-2.0, mit allen Funktionen. Sie betreiben es auf Infrastruktur eines europäischen Anbieters wie Hetzner, IONOS, STACKIT oder OVHcloud oder im eigenen Rechenzentrum. Dann hält kein US-Unternehmen die Daten Ihrer Nutzer. E-Mail- und SMS-Dienst wählen Sie selbst. Für Testate zählt in diesem Fall Ihr Infrastrukturanbieter.
- **Private Cloud.** Wir betreiben eine dedizierte Instanz für Sie in der Region Ihrer Wahl, auch in der EU. Den Vertrag schließen Sie mit unserem britischen Unternehmen.

In beiden Fällen können Sie alle Nutzer jederzeit exportieren. Authgear spricht OIDC und SAML und bindet LDAP und Active Directory an. Wer von Keycloak kommt, findet einen [Vergleich mit Keycloak](/de/compare/keycloak-alternative). Unseren [Auftragsverarbeitungsvertrag](/dpa) und die [Liste der Unterauftragsverarbeiter](/sub-processors) finden Sie online (auf Englisch).

Wenn Sie prüfen möchten, ob Self-Hosting oder eine Private Cloud zu Ihren Anforderungen passt, vergleichen Sie die Betriebsmodelle auf unserer Seite zur [Datensouveränität](/de/solutions/data-sovereignty) oder [sprechen Sie mit uns](/de/schedule-demo).

## Häufige Fragen

### Was bedeutet digitale Souveränität?

Das BSI versteht darunter die Fähigkeit von Menschen und Institutionen, ihre Rolle in der digitalen Welt selbstständig, selbstbestimmt und sicher auszuüben. Die Bundesregierung arbeitet an einer erweiterten Fassung, die unter anderem Steuerungsfähigkeit, Wechselmöglichkeiten und die Resilienz der Infrastruktur umfasst. Es geht also nicht um Autarkie, sondern um Kontrolle und echte Wahlmöglichkeiten.

### Was ist eine souveräne Cloud?

Einen festen Standard gibt es nicht. Die Bundesregierung versteht darunter Clouds, die es dem Bund erlauben, selbstständig, selbstbestimmt und sicher tätig zu sein. In der Praxis sollten Sie drei Ebenen trennen: wo die Daten liegen, wer die Cloud betreibt und welchem Recht der Betreiber unterliegt. Viele Angebote mit dem Etikett „souverän“ lösen nur die ersten beiden.

### Reicht ein Rechenzentrum in Deutschland für digitale Souveränität?

Nein. Der Standort ist nur eine von mehreren Fragen. Unterliegt der Anbieter US-Recht, kann er nach dem CLOUD Act zur Herausgabe verpflichtet sein, auch wenn die Server in Frankfurt stehen. Wichtig sind außerdem Betrieb, Support-Zugriffe, Unterauftragsverarbeiter und die Möglichkeit zu wechseln.

### Was ist der Unterschied zwischen BSI C5 und C3A?

C5 prüft die Informationssicherheit eines Cloud-Dienstes und verlangt Angaben zur Gerichtsbarkeit. Die C3A (Criteria enabling Cloud Computing Autonomy) hat das BSI im April 2026 veröffentlicht. Sie bewerten, ob sich ein Cloud-Dienst im jeweiligen Risikokontext selbstbestimmt nutzen lässt, etwa nach Standort und Herkunft des Betriebspersonals. Die C3A setzen voraus, dass der Anbieter C5 erfüllt.

### Ist Open-Source-Software automatisch souverän?

Nicht automatisch. Offener Code macht Sie unabhängig vom Hersteller, weil Sie die Software prüfen, anpassen und selbst betreiben können. Souverän wird der Betrieb aber erst, wenn auch Infrastruktur, Betreiber und Unterauftragsverarbeiter Ihren Anforderungen entsprechen.

### Was regelt der EU Data Act beim Wechsel des Anbieters?

Seit dem 12. September 2025 müssen Anbieter von Datenverarbeitungsdiensten einen Wechsel ermöglichen: Kündigungsfrist höchstens zwei Monate, Übergangszeit in der Regel höchstens 30 Tage, eine vollständige Liste der exportierbaren Daten. Ab dem 12. Januar 2027 dürfen sie für den Wechsel keine Entgelte mehr verlangen. Wie das für Ihren Login-Dienst gilt, klären Sie am besten mit Ihrem Anbieter.

*Dieser Beitrag dient der allgemeinen Information und ist keine Rechtsberatung. Stand: September 2026.*
