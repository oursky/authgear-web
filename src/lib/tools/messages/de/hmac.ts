export const hmac = {
  metaTitle: 'HMAC-Generator & -Verifier: SHA-256, SHA-384, SHA-512 | Authgear',
  metaDescription:
    'Erzeugen und prüfen Sie HMAC-SHA256-, SHA-384- und SHA-512-Signaturen mit Hex- oder Base64-Ausgabe. Läuft komplett in Ihrem Browser, Ihr geheimer Schlüssel verlässt nie Ihr Gerät.',
  heroTitle: 'HMAC-Signatur-Generator/-Verifier',
  heroDescription:
    'Erzeugen und prüfen Sie HMAC-SHA256-, SHA-384- und SHA-512-Signaturen mit Hex- oder Base64-Ausgabe. Die gesamte Berechnung erfolgt lokal in Ihrem Browser: Ihr geheimer Schlüssel und Ihre Payload verlassen nie Ihr Gerät.',
  iframeTitle: 'HMAC-Signatur-Generator/-Verifier',
  policyPrefix:
    'Die Sicherheit Ihrer Daten hat für uns höchste Priorität. Signaturerzeugung und -prüfung erfolgen vollständig in Ihrem Browser. Dieses Tool speichert oder überträgt Ihre Payloads, Secrets oder Signaturen nicht außerhalb des Browsers. Quellcode: ',
  policyLink: 'https://github.com/authgear/authgear-widget-hmac-tool',
  howSectionTitle: 'So funktioniert der HMAC-Signatur-Generator',
  supportedAlgorithmsTitle: 'Unterstützte Algorithmen',
  supportedAlgorithmsIntro:
    'Berechnen Sie HMAC-Signaturen mit einem dieser Hash-Algorithmen, ausgegeben als Hex oder Base64. Nützlich für die Prüfung von Webhook-Signaturen, das Signieren von API-Anfragen und Integritätsprüfungen.',
  algHs256: 'HMAC + SHA-256',
  algHs384: 'HMAC + SHA-384',
  algHs512: 'HMAC + SHA-512',
  step1Title: 'Payload eingeben:',
  step1Body: 'Geben Sie exakt die Nachricht oder Payload ein, die Sie signieren oder prüfen möchten.',
  step2Title: 'Webhook-Secret angeben:',
  step2Body:
    'Fügen Sie den gemeinsamen geheimen Schlüssel für die HMAC-Erzeugung ein, den in der Regel nur Sie und Ihr Webhook-Anbieter kennen.',
  step3Title: 'HMAC-Algorithmus wählen:',
  step3Body: 'Wählen Sie je nach Konfiguration Ihrer Anwendung HS256, HS384 oder HS512.',
  step4Title: 'Signatur erzeugen:',
  step4Body:
    'Klicken Sie, um die HMAC-Signatur für Ihre Payload und Ihr Secret mit dem gewählten Algorithmus zu berechnen.',
  step5Title: 'Empfangene Signatur zur Prüfung einfügen:',
  step5Body:
    'Fügen Sie die Signatur ein, die Sie von einem externen System/Webhook erhalten haben, um sie mit Ihrer selbst erzeugten Signatur zu vergleichen.',
  faqWhatTitle: 'Was ist HMAC?',
  faqWhatBody:
    'HMAC (Hash-based Message Authentication Code) ist ein Verfahren, das mit einer kryptografischen Hash-Funktion und einem geheimen Schlüssel eine Signatur für eine Nachricht oder Payload erzeugt. Diese Signatur gewährleistet sowohl Datenintegrität als auch Authentizität: Die Nachricht wurde nicht manipuliert und stammt tatsächlich vom angegebenen Absender.',
  faqWhyTitle: 'Warum HMAC?',
  faqWhy1: 'Bestätigt die Echtheit von Nachrichten, besonders bei Webhooks oder API-Callbacks',
  faqWhy2: 'Verhindert Manipulation und Replay-Angriffe durch Sicherung der Nachrichtenintegrität',
  faqWhy3: 'Einfaches, weit verbreitetes kryptografisches Verfahren, das die meisten Plattformen unterstützen',
  bestPracticesTitle: 'Best Practices',
  bp1: 'Halten Sie Ihr Webhook-Secret vertraulich und geben Sie es nie öffentlich weiter.',
  bp2: 'Prüfen Sie eingehende Webhook-Signaturen immer, bevor Sie Payloads verarbeiten.',
  bp3: 'Bevorzugen Sie SHA-256 oder stärker; vermeiden Sie in neuen Systemen HMACs auf Basis von MD5 und SHA-1.',
} as const;
