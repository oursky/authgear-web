---
title: "CLOUD Act und Login-Anbieter: Wer an Ihre Nutzerdaten kommt"
excerpt: "Der US CLOUD Act betrifft nicht nur Dateiablagen und E-Mail, sondern auch Ihren Identity Provider. Was das Gesetz verlangt, warum ein Rechenzentrum in Frankfurt allein nicht reicht und welche Fragen Sie Ihrem Anbieter stellen sollten."
coverImage: ./cover.webp
category: industry
featured: false
metaTitle: "CLOUD Act: Was er für Ihren Login-Anbieter bedeutet"
metaDescription: "Der CLOUD Act gilt auch für Identity Provider: was § 2713 verlangt, warum ein EU-Rechenzentrum nicht reicht und wie Sie die Datensouveränität sichern."
publishedAt: 2026-09-28
draft: false
faq:
  - q: "Gilt der CLOUD Act auch für Daten in einem deutschen Rechenzentrum?"
    a: "Ja, wenn der Anbieter der US-Gerichtsbarkeit unterliegt. Nach 18 U.S.C. § 2713 kommt es darauf an, ob die Daten im Besitz, Gewahrsam oder unter der Kontrolle des Anbieters sind, nicht darauf, wo der Server steht."
  - q: "Ist der CLOUD Act mit der DSGVO vereinbar?"
    a: "Die beiden Gesetze stehen in einem Spannungsverhältnis. Nach Art. 48 DSGVO wird eine ausländische Herausgabeanordnung nur anerkannt, wenn sie auf einem internationalen Abkommen wie einem Rechtshilfeabkommen beruht. Der CLOUD Act verlangt die Herausgabe trotzdem. Der Anbieter steckt dazwischen, und Sie als Verantwortlicher tragen das Risiko mit."
  - q: "Schützt das EU-US Data Privacy Framework vor dem CLOUD Act?"
    a: "Nein. Das Data Privacy Framework regelt, unter welchen Bedingungen personenbezogene Daten in die USA übermittelt werden dürfen. Es ändert nichts an der Pflicht eines US-Anbieters, Daten auf Anordnung herauszugeben. Das EuG hat das Framework am 3. September 2025 bestätigt, ein Rechtsmittel beim EuGH ist anhängig (C-703/25 P)."
  - q: "Hat der CLOUD Act etwas mit dem EU Data Act zu tun?"
    a: "Nur am Rand. Der EU Data Act gilt seit dem 12. September 2025. Sein Art. 32 verpflichtet Cloud-Anbieter, unrechtmäßige Zugriffe ausländischer Behörden auf nicht personenbezogene Daten in der EU zu verhindern. Login-Daten sind überwiegend personenbezogen, dafür gilt die DSGVO."
  - q: "Reicht ein BSI-C5-Testat als Schutz?"
    a: "Nein. C5 ist ein Prüfkatalog für Transparenz und Sicherheit. Er verlangt unter anderem Angaben zur Gerichtsbarkeit und ein geregeltes Verfahren für Ermittlungsanfragen staatlicher Stellen. Eine Garantie gegen US-Recht ist er nicht."
  - q: "Wie vermeide ich den CLOUD Act bei der Authentifizierung?"
    a: "Wählen Sie einen Login-Anbieter, der keiner US-Gerichtsbarkeit unterliegt, oder betreiben Sie die Software selbst auf Infrastruktur eines europäischen Anbieters. Prüfen Sie auch die Unterauftragsverarbeiter, etwa für den Versand von E-Mails und SMS."
---

> **tl;dr** — Der US CLOUD Act verpflichtet US-Anbieter, Daten herauszugeben, die sie kontrollieren, egal in welchem Land sie liegen. Ihr Login-Anbieter speichert E-Mail-Adressen, Telefonnummern, Passwort-Hashes, MFA-Geheimnisse und Anmeldeverläufe aller Nutzer. Wenn dieser Anbieter der US-Gerichtsbarkeit unterliegt, ändert ein Rechenzentrum in der EU daran wenig.

Früher oder später kommt die Frage aus der Datenschutzabteilung: „Ist unser Identity Provider ein CLOUD-Act-Risiko?“ Die meisten Artikel zum CLOUD Act drehen sich um Dateiablagen, E-Mail und Office-Pakete. Dabei gibt es kaum ein System, das so viel über Ihre Kundschaft weiß wie das, über das sich alle anmelden.

Dieser Beitrag erklärt, was das Gesetz tatsächlich regelt, wo es mit der DSGVO kollidiert, was Zertifizierungen wie BSI C5 leisten und was nicht, und wie Sie das Risiko bei der Authentifizierung konkret verringern.

## Was der CLOUD Act regelt

Der Clarifying Lawful Overseas Use of Data Act ist seit dem 23. März 2018 in Kraft. Anlass war ein Rechtsstreit zwischen Microsoft und dem US-Justizministerium um E-Mails, die auf einem Server in Irland lagen. Der Kern steht in [18 U.S.C. § 2713](https://www.law.cornell.edu/uscode/text/18/2713): Anbieter von elektronischen Kommunikations- und Cloud-Diensten müssen Inhalte sowie „Aufzeichnungen oder sonstige Informationen über einen Kunden“ herausgeben, die sich in ihrem „Besitz, Gewahrsam oder unter ihrer Kontrolle“ befinden, und zwar unabhängig davon, ob diese Daten in den USA oder anderswo gespeichert sind.

Drei Punkte werden oft übersehen:

- **Es geht um Strafverfolgung.** Grundlage sind Durchsuchungsbeschlüsse und ähnliche Anordnungen in strafrechtlichen Ermittlungen. Geheimdienstliche Überwachung läuft über andere US-Gesetze.
- **Es trifft nicht nur US-Firmen.** Laut [Whitepaper des US-Justizministeriums](https://www.justice.gov/d9/pages/attachments/2019/04/10/doj_cloud_act_white_paper_2019_04_10.pdf) ist die US-Gerichtsbarkeit nicht auf Unternehmen mit Sitz in den USA beschränkt, aber auch nicht grenzenlos. Ob ein ausländischer Anbieter darunter fällt, hängt vom Einzelfall ab, etwa von seiner Geschäftstätigkeit in den USA.
- **Einspruch ist nur eingeschränkt möglich.** Ein Anbieter kann eine Anordnung binnen 14 Tagen anfechten, wenn der Kunde keine US-Person ist und die Herausgabe gegen das Recht einer „qualifizierten ausländischen Regierung“ verstoßen würde ([§ 2703(h)](https://www.law.cornell.edu/uscode/text/18/2703)). Das sind nur Staaten mit einem eigenen CLOUD-Act-Abkommen mit den USA. Die EU, Deutschland und Frankreich gehören nicht dazu. Über ein EU-US-Abkommen zu elektronischen Beweismitteln wird seit 2019 verhandelt, laut [EU-Kommission](https://commission.europa.eu/law/cross-border-cases/judicial-cooperation/types-judicial-cooperation/e-evidence-cross-border-access-electronic-evidence_en) laufen die Verhandlungen noch.

## Warum ein Rechenzentrum in Frankfurt das nicht löst

Viele US-Anbieter bieten EU-Regionen an. Das ist gut für Latenz und Datenresidenz. Für den CLOUD Act zählt aber nicht der Standort, sondern wer die Daten kontrolliert.

Wie das in der Praxis aussieht, hat eine Anhörung im französischen Senat gezeigt. Am [10. Juni 2025](https://www.senat.fr/compte-rendu-commissions/20250609/ce_commande_publique.html) wurde Anton Carniaux, Direktor für öffentliche und rechtliche Angelegenheiten bei Microsoft France, vom Berichterstatter Dany Wattebled gefragt, ob er unter Eid garantieren könne, dass Daten französischer Bürger nie ohne Zustimmung Frankreichs an US-Behörden gehen. Seine Antwort: „Nein, das kann ich nicht garantieren.“ Er fügte hinzu, dass dies bisher nie vorgekommen sei und laut Microsofts Transparenzberichten kein europäisches Unternehmen betroffen war. Auch das gehört zur Wahrheit. Die Antwort beschreibt schlicht die Rechtslage: Kein Anbieter, der US-Recht unterliegt, kann eine solche Zusage machen.

Die großen US-Anbieter reagieren mit eigenen Angeboten. Die [AWS European Sovereign Cloud](https://press.aboutamazon.com/aws/2026/1/aws-launches-aws-european-sovereign-cloud-and-announces-expansion-across-europe) ist seit dem 15. Januar 2026 verfügbar, mit einer ersten Region in Brandenburg. Betrieben wird sie von einer neuen Muttergesellschaft und drei deutschen GmbHs, geführt von EU-Bürgern und ausschließlich von Personal mit Wohnsitz in der EU. Das verändert einiges: Betrieb, Zugriffe und Support bleiben in der EU, und die Umgebung ist technisch von anderen AWS-Regionen getrennt. Was sich nicht ändert: Die Gesellschaften gehören weiterhin zum Amazon-Konzern mit Sitz in den USA. Ob US-Gerichte Daten dort als unter der „Kontrolle“ der US-Mutter ansehen würden, ist bislang nicht entschieden. Die Ankündigung selbst äußert sich zum CLOUD Act nicht.

## CLOUD Act und DSGVO: zwei Gesetze, ein Anbieter dazwischen

[Art. 48 DSGVO](https://dsgvo-gesetz.de/art-48-dsgvo/) sagt sinngemäß: Urteile und Behördenentscheidungen aus Drittländern, die die Herausgabe personenbezogener Daten verlangen, werden nur anerkannt, wenn sie auf einem internationalen Abkommen wie einem Rechtshilfeabkommen beruhen. Eine CLOUD-Act-Anordnung umgeht genau diesen Weg.

Der Europäische Datenschutzausschuss und der Europäische Datenschutzbeauftragte haben das 2019 in einer [gemeinsamen Stellungnahme](https://www.edpb.europa.eu/our-work-tools/our-documents/letters/edpb-edps-joint-response-libe-committee-impact-us-cloud-act_en) untersucht. Ohne internationales Abkommen, so ihr [Fazit](https://edpb.europa.eu/system/files/documents/files/file2/edpb_edps_joint_response_us_cloudact_annex.pdf), könne die Rechtmäßigkeit einer solchen Herausgabe „nicht festgestellt werden“. Eine Ausnahme sehen sie nur, wenn die Herausgabe lebenswichtige Interessen der betroffenen Person schützt. Sie empfehlen ein EU-US-Abkommen mit starken Schutzmechanismen.

Und das [EU-US Data Privacy Framework](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A62023TJ0553)? Es regelt, wann Sie personenbezogene Daten an zertifizierte US-Unternehmen übermitteln dürfen. Das Gericht der EU hat es am 3. September 2025 in der Rechtssache Latombe bestätigt; das Rechtsmittel beim EuGH (C-703/25 P) ist anhängig. Für den CLOUD Act ist das Framework nicht die Antwort. Es macht die Übermittlung zulässig, verhindert aber keine Herausgabeanordnung.

## Was BSI C5 dazu sagt

Der Kriterienkatalog C5 des BSI ist in Deutschland der Maßstab für Cloud-Sicherheit. Die meisten Testate, die Sie heute sehen, beruhen auf C5:2020; der neue C5:2026 ist laut [BSI](https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/Empfehlungen-nach-Angriffszielen/Cloud-Computing/Kriterienkatalog-C5/C5-FAQ/kriterienkatalog-c5-faq.html) für Testate ab dem 1. Juni 2027 anzuwenden. C5:2020 enthält zwei für diese Frage wichtige Teile:

- **BC-01** verlangt Angaben zur Gerichtsbarkeit des Anbieters und zu den Standorten der Datenverarbeitung.
- **INQ-01 bis INQ-04** regeln den [Umgang mit Ermittlungsanfragen staatlicher Stellen](https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/Publikationen/Broschueren/C5_2020.pdf): juristische Prüfung jeder Anfrage, Information der Kunden, soweit erlaubt, Herausgabe nur bei gültiger Rechtsgrundlage und nur der betroffenen Daten.

Das BSI verlangt außerdem von Cloud-Kunden, das Risiko staatlicher Anfragen im eigenen Risikomanagement zu bewerten. Ein C5-Testat macht also transparent, wie ein Anbieter mit Anfragen umgeht. Vor US-Recht schützt es nicht.

## Was ein Login-Anbieter über Ihre Nutzer weiß

Bei einem Dateispeicher geht es um die Dokumente einzelner Kunden. Beim Identity Provider geht es um alle Nutzer auf einmal:

- E-Mail-Adressen, Telefonnummern, Namen
- Passwort-Hashes und Passkey-Schlüssel
- MFA-Geheimnisse, etwa die Schlüssel hinter TOTP-Codes
- Anmeldeverläufe mit Zeitpunkt, IP-Adresse und Gerät
- Verknüpfungen zu Google-, Apple- oder Microsoft-Konten
- Audit-Logs: wer wann welches Passwort geändert oder welche Rolle bekommen hat

Dazu kommen Datenflüsse, die man leicht übersieht:

- **E-Mail- und SMS-Dienste.** Einmalcodes und Magic Links laufen über Drittanbieter. Die sehen Telefonnummern, Adressen und oft den Code selbst.
- **Backups und Logs.** Liegen Sicherungen oder Monitoring-Daten bei einem anderen Anbieter oder in einer anderen Region?
- **Support-Zugriffe.** Von wo und unter welchem Recht greifen Mitarbeitende des Anbieters auf Ihre Umgebung zu?

Ein vollständiges Nutzerverzeichnis mit Anmeldeverlauf zeigt, wer Ihre Kunden sind und wann sie Ihren Dienst nutzen. Deshalb verdient es mindestens dieselbe Sorgfalt wie Ihre Dokumente.

## So verringern Sie das Risiko

Es gibt im Wesentlichen zwei Wege:

1. **Ein Login-Anbieter ohne US-Kontrolle**, der auf Infrastruktur eines europäischen Unternehmens läuft. Beides muss stimmen: Ein europäischer Anbieter auf einem US-Hyperscaler verlagert das Problem nur eine Ebene tiefer.
2. **Selbst betreiben** auf Servern eines europäischen Anbieters oder im eigenen Rechenzentrum. Dann hält kein US-Unternehmen die Daten Ihrer Nutzer.

Verschlüsselung mit eigenen Schlüsseln hilft bei Dateien. Bei einem Login-System stößt sie an Grenzen, denn der Server muss E-Mail-Adressen lesen, um Codes zu verschicken, und Anmeldungen prüfen, um sie zuzulassen.

Diese Fragen sollten Sie jedem Anbieter stellen:

- Welche Gesellschaft ist unser Vertragspartner, und wo hat die Muttergesellschaft ihren Sitz?
- Auf wessen Infrastruktur laufen Produktion, Backups und Logs?
- Welche Unterauftragsverarbeiter sehen Nutzerdaten, auch für E-Mail und SMS?
- Von welchen Ländern aus greift der Support zu?
- Wie gehen Sie mit behördlichen Anfragen um, und informieren Sie uns?
- Können wir alle Nutzer samt Passwort-Hashes exportieren, falls wir wechseln?

## Wo Authgear steht

Authgear wird von einem britischen Unternehmen entwickelt. Großbritannien ist nicht die USA, aber es gibt ein [UK-US-Abkommen über den Datenzugriff](https://www.gov.uk/government/publications/uk-us-data-access-agreement-factsheet/policy-factsheet-on-the-uk-us-data-access-agreement). Es gilt nur für schwere Straftaten, und Art. 4 verbietet US-Anordnungen, die gezielt Personen im Vereinigten Königreich betreffen. Nutzer in der EU schützt diese Klausel nicht. Ein britischer Sitz allein ist also keine Antwort auf den CLOUD Act.

Die Antwort ist Self-Hosting oder eine Private Cloud:

- **Self-Hosting:** Authgear ist Open Source unter Apache-2.0, mit allen Funktionen. Sie betreiben es zum Beispiel bei Hetzner, OVHcloud, Scaleway oder STACKIT. Den E-Mail- und SMS-Dienst wählen Sie selbst.
- **Private Cloud:** Wir betreiben eine dedizierte Instanz für Sie in der Region Ihrer Wahl, auch in der EU. Den Vertrag schließen Sie mit unserem britischen Unternehmen.

Mehr dazu auf unserer Seite zur [Datensouveränität](/de/solutions/data-sovereignty). Wer von Keycloak kommt, findet einen [Vergleich mit Keycloak](/de/compare/keycloak-alternative). Unseren [Auftragsverarbeitungsvertrag](/dpa) und die [Liste der Unterauftragsverarbeiter](/sub-processors) finden Sie ebenfalls online (auf Englisch).

## Häufige Fragen

### Gilt der CLOUD Act auch für Daten in einem deutschen Rechenzentrum?

Ja, wenn der Anbieter der US-Gerichtsbarkeit unterliegt. Nach 18 U.S.C. § 2713 kommt es darauf an, ob die Daten im Besitz, Gewahrsam oder unter der Kontrolle des Anbieters sind, nicht darauf, wo der Server steht.

### Ist der CLOUD Act mit der DSGVO vereinbar?

Die beiden Gesetze stehen in einem Spannungsverhältnis. Nach Art. 48 DSGVO wird eine ausländische Herausgabeanordnung nur anerkannt, wenn sie auf einem internationalen Abkommen wie einem Rechtshilfeabkommen beruht. Der CLOUD Act verlangt die Herausgabe trotzdem. Der Anbieter steckt dazwischen, und Sie als Verantwortlicher tragen das Risiko mit.

### Schützt das EU-US Data Privacy Framework vor dem CLOUD Act?

Nein. Das Data Privacy Framework regelt, unter welchen Bedingungen personenbezogene Daten in die USA übermittelt werden dürfen. Es ändert nichts an der Pflicht eines US-Anbieters, Daten auf Anordnung herauszugeben. Das EuG hat das Framework am 3. September 2025 bestätigt, ein Rechtsmittel beim EuGH ist anhängig (C-703/25 P).

### Hat der CLOUD Act etwas mit dem EU Data Act zu tun?

Nur am Rand. Der EU Data Act gilt seit dem 12. September 2025. Sein Art. 32 verpflichtet Cloud-Anbieter, unrechtmäßige Zugriffe ausländischer Behörden auf nicht personenbezogene Daten in der EU zu verhindern. Login-Daten sind überwiegend personenbezogen, dafür gilt die DSGVO.

### Reicht ein BSI-C5-Testat als Schutz?

Nein. C5 ist ein Prüfkatalog für Transparenz und Sicherheit. Er verlangt unter anderem Angaben zur Gerichtsbarkeit und ein geregeltes Verfahren für Ermittlungsanfragen staatlicher Stellen. Eine Garantie gegen US-Recht ist er nicht.

### Wie vermeide ich den CLOUD Act bei der Authentifizierung?

Wählen Sie einen Login-Anbieter, der keiner US-Gerichtsbarkeit unterliegt, oder betreiben Sie die Software selbst auf Infrastruktur eines europäischen Anbieters. Prüfen Sie auch die Unterauftragsverarbeiter, etwa für den Versand von E-Mails und SMS.

*Dieser Beitrag dient der allgemeinen Information und ist keine Rechtsberatung. Stand: September 2026.*
