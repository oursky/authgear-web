export const ssl = {
  metaTitle: 'SSL-Checker: Kostenloser SSL-Zertifikatsprüfer | Authgear',
  metaDescription:
    'Kostenloser SSL-Checker. Prüfen Sie sofort SSL/TLS-Zertifikatsdetails, verifizieren Sie die Zertifikatskette und kontrollieren Sie Ablaufdaten für jede Domain.',
  heroTitle: 'Kostenloser SSL-Checker',
  heroDescription:
    'Geben Sie eine beliebige Domain ein, um ihr SSL/TLS-Zertifikat sofort zu prüfen. Sehen Sie Ablaufdatum, Aussteller, Subject Alternative Names (SANs) und den Status der vollständigen Zertifikatskette, ganz ohne Login.',
  iframeTitle: 'SSL-Zertifikatsinspektor',
  card1Title: 'Zertifikatsdetails prüfen',
  card1Desc:
    'Sehen Sie detaillierte SSL-Zertifikatsinformationen für jede HTTPS-Domain, darunter Subject, Aussteller, Gültigkeitszeitraum, Subject Alternative Names (SANs), Fingerprints und weitere technische Attribute.',
  card2Title: 'Status der Zertifikatskette',
  card2Desc:
    'Prüfen Sie, ob die Zertifikatskette vollständig und vertrauenswürdig ist. Kontrollieren Sie schnell die Gültigkeit der Kette, den Status der vertrauenswürdigen Root und die Gesamtzahl der Zertifikate in der Kette.',
  card3Title: 'Visualisierung der Zertifikatskette',
  card3Desc:
    'Untersuchen Sie die vollständige Zertifikatshierarchie vom Leaf-Zertifikat (Ihre Domain) über die Zwischenzertifikate bis zur Root-Zertifizierungsstelle.',
  s1Label: 'Schritt 1.',
  s1Title: 'Geben Sie eine Website-URL ein (zum Beispiel https://www.authgear.com/) und klicken Sie auf „Prüfen“.',
  s2Label: 'Schritt 2.',
  s2Title:
    'Zertifikatsinformationen abrufen. Das Tool verbindet sich mit dem Server und holt das SSL/TLS-Zertifikat, das die Website präsentiert.',
  s3Label: 'Schritt 3.',
  s3Title:
    'Zertifikatsdetails und Kette prüfen. Die Ergebnisse zeigen Zertifikatsmetadaten, den Kettenstatus und die vollständige Zertifikatshierarchie.',
  readyTitle: 'Bereit, HTTPS und Authentifizierung in Ihre App zu bringen?',
  readySubtitle:
    'Authgear ist eine Authentifizierungsplattform, die Login, MFA, SSO und Sitzungsverwaltung für Ihre App übernimmt, damit Ihr Team das nicht von Grund auf selbst bauen muss.',
  faq1Title: 'Was ist ein SSL-Zertifikat?',
  faq1Body:
    "Ein SSL-Zertifikat (genauer: ein TLS-Zertifikat; SSL ist der ältere Name, der sich gehalten hat) ermöglicht verschlüsselte HTTPS-Kommunikation zwischen dem Browser eines Nutzers und einem Webserver. Es leistet zwei Dinge:\n\nVerschlüsselung: Daten werden bei der Übertragung so verschleiert, dass niemand, der die Verbindung abfängt, sie lesen kann.\n\nIdentitätsnachweis: Es beweist, dass der Server, mit dem Sie sich verbinden, tatsächlich der ist, der er zu sein behauptet, und kein Betrüger. Zertifikate werden von Zertifizierungsstellen (CAs) ausgestellt, vertrauenswürdigen Dritten wie Let's Encrypt, DigiCert und Sectigo. Wenn Ihr Browser eine Verbindung zu einer Website aufbaut, prüft er, ob das Zertifikat von einer CA stammt, der er vertraut, ob die Domain übereinstimmt und ob das Zertifikat noch nicht abgelaufen ist.",
  faq1MetaBody:
    "Arten von SSL/TLS-Zertifikaten:\n\nDV (Domain Validated)\nBestätigt nur den Besitz der Domain. Schnell und günstig (Let's Encrypt ist DV). Für die meisten Websites ausreichend.\n\nOV (Organization Validated)\nVerifiziert die Organisation hinter der Domain. Üblich für Unternehmenswebsites.\n\nEV (Extended Validation)\nDie höchste Stufe; erfordert strenge Identitätsprüfungen. Wird von Banken und Großunternehmen genutzt.",
  faq2Title: 'Was ist eine Zertifikatskette?',
  faq2Body:
    'Eine Zertifikatskette ist eine Folge von Zertifikaten, die das Zertifikat Ihrer Website mit einer Root-Zertifizierungsstelle (CA) verbindet, der Browser vertrauen. Die Kette hat drei Ebenen:\n\nLeaf-Zertifikat (das Zertifikat Ihrer Website): direkt für Ihre Domain ausgestellt.\n\nZwischenzertifikat(e): von der Root-CA für eine Zwischen-CA ausgestellt, die dann Zertifikate für Websites ausstellt. So bleibt die Root-CA offline und geschützt.\n\nRoot-Zertifikat: selbstsigniert von einer vertrauenswürdigen CA. In Browsern und Betriebssystemen vorinstalliert.\n\nWarum ist das wichtig?\nFehlt das Zwischenzertifikat in der Serverkonfiguration, können Browser die Kette nicht verifizieren und zeigen einen Sicherheitsfehler, selbst wenn Ihr Leaf-Zertifikat einwandfrei gültig ist. Das ist einer der häufigsten SSL-Konfigurationsfehler. Unser Checker visualisiert die vollständige Kette, damit Sie Lücken sofort erkennen.',
  faq2LearnMoreBefore: 'Mehr dazu in unserem ausführlichen Artikel: ',
  faq2LearnMoreLinkText: 'SSL-Zertifikatskette: Was sie ist und wie man sie repariert',
  faq2LearnMoreHref: '/post/ssl-certificate-chain',
  faq3Title: 'Wie lange sind SSL-Zertifikate gültig?',
  faq3Body:
    "Let's-Encrypt-Zertifikate laufen alle 90 Tage ab (mit automatischer Erneuerung). Zertifikate kostenpflichtiger CAs gelten in der Regel 1–2 Jahre. Seit September 2020 beträgt die maximale Gültigkeit öffentlich vertrauenswürdiger Zertifikate 398 Tage. Apple und Google drängen branchenweit auf ein Maximum von 90 Tagen.\n\nWas passiert, wenn ein SSL-Zertifikat abläuft?\n\nBrowser zeigen sofort die Fehlermeldung „Dies ist keine sichere Verbindung“ und blockieren den Zugriff auf die Website. Deshalb ist die Überwachung der Ablaufdaten so wichtig.",
  faq4Title: 'SSL vs. TLS: Was ist der Unterschied?',
  faq4Body:
    'SSL (Secure Sockets Layer) ist das ursprüngliche Protokoll und inzwischen veraltet. Alle SSL-Versionen haben bekannte Sicherheitslücken. TLS (Transport Layer Security) ist sein Nachfolger und das, was alle modernen HTTPS-Verbindungen tatsächlich nutzen: TLS 1.2 und TLS 1.3.',
  faq4Body2:
    'Der Begriff „SSL-Zertifikat“ ist immer noch weit verbreitet, technisch gesehen ist aber jedes heute genutzte Zertifikat ein TLS-Zertifikat. Wer „SSL-Checker“ sagt, meint die Prüfung des TLS-Zertifikats auf einem Server. Dieses Tool prüft beides: Es meldet die ausgehandelte TLS-Version und die Zertifikatsdetails.',
} as const;
