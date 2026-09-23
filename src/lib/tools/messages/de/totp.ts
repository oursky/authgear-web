export const totp = {
  metaTitle: 'TOTP-Authenticator: Online-TOTP-Generator & -Tester',
  metaDescription:
    'Erzeugen Sie TOTP-Codes (RFC 6238) online mit wählbarem Algorithmus (SHA-1/256/512) und Stellenzahl (6/8) und speichern Sie bis zu 10 Apps.',
  heroTitle: 'TOTP-Authenticator: Online-Generator für Einmalpasswörter (RFC 6238)',
  heroDescriptionBeforeLink: 'Erzeugen und kopieren Sie zeitbasierte Einmalpasswörter (TOTP) sofort für Tests, Debugging und QA. Konfigurieren Sie Algorithmus (SHA-1 / SHA-256 / SHA-512) und Stellenzahl (6 oder 8) und sehen Sie Live-Codes, die sich alle 30 Sekunden erneuern, gemäß ',
  heroRfcLink: 'RFC 6238',
  heroRfcHref: 'https://datatracker.ietf.org/doc/html/rfc6238',
  iframeTitle: 'TOTP-Authenticator - Generator für Einmalpasswörter',
  policyLine1:
    'Die Sicherheit Ihrer Daten hat für uns höchste Priorität. Die Erzeugung der TOTP-Codes und die Verwaltung der Anwendungen erfolgen vollständig in Ihrem Browser.',
  policyLine2:
    'Dieses Tool speichert oder überträgt Ihre geheimen Schlüssel oder Codes nicht außerhalb Ihres Browsers.',
  s1Label: 'Schritt 1.',
  s1Title: 'Geheimen Schlüssel Ihrer Anwendung eingeben',
  s1Body: 'Fügen Sie das gemeinsame TOTP-Secret (Base32) aus dem 2FA-Einrichtungsbildschirm Ihrer App ein.',
  s2Label: 'Schritt 2.',
  s2Title: 'Algorithmus und Stellenzahl anpassen',
  s2BodyBefore:
    'Wählen Sie SHA-1, SHA-256 oder SHA-512 sowie 6 oder 8 Stellen. SHA-1 + 6 Stellen ist der übliche Standard; verwenden Sie stärkere Hashes, wenn Ihre Integration es erfordert.',
  s3Label: 'Schritt 3.',
  s3Title: 'Einmalpasswort erzeugen',
  s3Body:
    'Das aktuelle OTP wird erzeugt und aktualisiert sich automatisch im 30-Sekunden-Zeitschritt (Standard gemäß RFC 6238). Speichern Sie bis zu 10 verschiedene Anwendungs-Secrets für schnelle Tests.',
  s4Label: 'Schritt 4.',
  s4Title: 'Einmalpasswort kopieren und zur Authentifizierung verwenden',
  s4Body: 'Klicken oder tippen Sie auf den Code, um ihn in die Zwischenablage zu kopieren, und fügen Sie ihn im Login-Flow Ihrer App ein.',
  cautionLead: 'Achtung:',
  cautionBody:
    'Die Erzeugung und Speicherung der Codes erfolgt ausschließlich im Speicher Ihres Browsers.\nWenn Sie den Browser-Cache leeren oder Ihren Browser neu installieren, werden daher alle für dieses Tool gespeicherten Daten dauerhaft gelöscht.',
  troubleshootTitle: 'Fehlerbehebung',
  tr1Title: 'Codes stimmen nicht überein?',
  tr1Item:
    'Prüfen Sie die Uhren von Server und Client; TOTP hängt von exakter Zeit ab. Erlauben Sie beim Testen ein Verifizierungsfenster (±1 Zeitschritt).',
  tr2Title: 'Falsches Secret-Format?',
  tr2Item:
    'Stellen Sie sicher, dass das Secret in Base32 vorliegt. Wenn Sie einen QR-Code haben, scannen Sie ihn oder extrahieren Sie den Parameter secret= aus der otpauth-URI.',
  tr3Title: 'Fehler „Algorithm mismatch“',
  tr3Item:
    'Prüfen Sie, ob Server und Authenticator denselben Algorithmus (SHA-1/256/512), dieselbe Stellenzahl und denselben Zeitschritt verwenden.',
  tr4Title: 'Sporadische Fehler in Tests',
  tr4Item:
    'Stellen Sie sicher, dass Sie ein Secret nicht in mehreren Umgebungen wiederverwenden (z. B. dasselbe Secret in Staging & Produktion kann zu Verwirrung führen)',
  readyTitle: 'Sichern Sie Ihre Konten nahtlos mit Authgear',
  readySubtitle:
    'Authgear bietet Ihnen skalierbares Identitätsmanagement, sichere Authentifizierung und einfache Integration.',
  faq1Title: 'Was ist TOTP?',
  faq1Body:
    'TOTP (Time-based One-Time Password) ist ein Industriestandard-Algorithmus zur Erzeugung temporärer Einmalcodes auf Basis der aktuellen Zeit und eines gemeinsamen Secrets. TOTP ist im offiziellen IETF-Standard RFC 6238 definiert, der festlegt, wie diese Codes berechnet werden, um kurzlebige OTP-Werte für sichere Zwei-Faktor-Authentifizierung auf Websites, in Anwendungen und Diensten bereitzustellen.',
  faq2Title: 'Warum TOTP?',
  faq2b1: 'Stärkt die Sicherheit durch Zwei-Faktor-Authentifizierung (2FA)',
  faq2b2: 'Weit verbreitet bei großen Plattformen (Google, Microsoft, GitHub usw.)',
  faq2b3: 'Codes laufen schnell ab, was das Risiko einer Wiederverwendung minimiert',
  faq3Title: 'Wie lange ist ein TOTP gültig?',
  faq3Body:
    'Standardmäßig 30 Sekunden (RFC 6238 empfiehlt 30 s). Die Serverprüfung erlaubt oft eine Kulanz von einem Zeitschritt für Zeitabweichungen.',
  faq4Title: 'Welchen Algorithmus soll ich verwenden: SHA-1, SHA-256 oder SHA-512?',
  faq4Body:
    'SHA-1 wird breit unterstützt und von den meisten Authenticator-Apps verwendet; SHA-256/512 sind robuster, wenn Sie Client und Server kontrollieren und strengeres Hashing wünschen. Stellen Sie sicher, dass alle Seiten denselben Algorithmus verwenden.',
  faq5Title: 'Soll ich 6 oder 8 Stellen verwenden?',
  faq5Body:
    '6 Stellen sind der gängige Standard (Balance aus Bedienbarkeit und Sicherheit). 8 Stellen bieten etwas mehr Entropie, sind bei Consumer-Authenticatoren aber weniger verbreitet.',
  faq6Title: 'Wie extrahiere ich ein Secret aus einer otpauth://-URI?',
  faq6Body: 'Der Parameter secret= in der otpauth://-URL ist das Base32-Secret.',
  faq7Title: 'Wie erzeugen Authenticator-Apps diese Codes?',
  faq7Body:
    'Google Authenticator, Microsoft Authenticator, Authy und 1Password verwenden alle denselben RFC-6238-Algorithmus wie hier: Das gemeinsame Secret und der aktuelle 30-Sekunden-Zeitschritt durchlaufen HMAC, und das Ergebnis wird auf 6 oder 8 Stellen gekürzt. Deshalb stimmt der Code auf dieser Seite für dasselbe Secret mit dem in Ihrer App überein.',
  faq7GuidePart1: 'Die vollständige Erklärung finden Sie in ',
  faq7GuideLinkLabel: 'Wie funktionieren Authenticator-Apps',
  faq7GuidePart2: '. Sie möchten ganz auf Codes verzichten? Probieren Sie die ',
  faq7PasskeyLinkLabel: 'Passkey-Demo',
  faq7GuidePart3: ' aus, um phishing-resistenten, passwortlosen Login in Aktion zu sehen.',
} as const;
