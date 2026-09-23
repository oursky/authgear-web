export const jwk = {
  metaTitle: 'JWK-Generator: PEM zu JWK, JWK zu PEM & JWKS-Generator | Authgear',
  metaDescription:
    'PEM → JWK, JWK → PEM oder Schlüssel erzeugen und JWKS herunterladen. kid, alg und use (sig/enc) wählen. Nur im Browser, ohne Registrierung.',
  heroTitle: 'JWK-Generator: PEM in JWK umwandeln & JWKS erzeugen',
  heroDescription:
    'Erzeugen und konvertieren Sie kryptografische Schlüssel in den Formaten PEM und JWK für sicheres Signieren und Verschlüsseln.',
  iframeTitle: 'JWK-Generator-Widget',
  policyLearnMore: 'Was ist JWKS',
  policyGithub: 'https://github.com/authgear/authgear-widget-jwk-generator',
  policyLine1:
    'Unser schlanker JWK-Generator läuft vollständig in Ihrem Browser, kein Schlüssel verlässt Ihren Rechner. Konvertieren Sie PEM zu JWK oder JWK zu PEM, oder erzeugen Sie neue Schlüssel und exportieren Sie ein JWKS für Ihren jwks_uri-Endpunkt. Mehr erfahren:',
  policyLine2: 'Quellcode ansehen:',
  card1Title: 'PEM zu JWK',
  card1Desc:
    'Fügen Sie einen PEM-kodierten Schlüssel oder ein X.509-Zertifikat ein, setzen Sie kid, wählen Sie alg und use (sig / enc) und klicken Sie auf „JWK erzeugen“. Das konvertiert PEM → JWK im Standard-jwk-Format, sodass Sie den JWK in ein JWKS aufnehmen oder direkt in JOSE-Bibliotheken (Node jose, Python jwcrypto usw.) verwenden können.',
  card2Title: 'JWK zu PEM',
  card2Desc:
    'Fügen Sie ein JWK-JSON-Objekt ein und exportieren Sie einen PEM-formatierten Schlüssel für CLIs, Server oder ältere Tools. Nutzen Sie JWK zu PEM, wenn Sie einen öffentlichen PEM-Schlüssel für OpenSSL oder serverseitige Bibliotheken brauchen und dabei die Metadaten kid, alg und use in Ihrem JWK-Set behalten möchten.',
  card3Title: 'JWK erzeugen',
  card3Desc:
    'Erstellen Sie neue Schlüssel im JWK-Generator-Modus. Wählen Sie den Verwendungszweck (Signatur sig oder Verschlüsselung enc), den Schlüsseltyp (RSA, EC, OKP oder oct) und konfigurieren Sie Größe/Kurve/Parameter. Der Generator schlägt alg-Werte vor und erzeugt automatisch eine kid, die Sie bearbeiten können. Als Ausgabe stehen ein einzelner JWK oder ein vollständiges JWKS (jwks.json) zum Hosten bereit.',
  howSectionTitle: 'So funktioniert der JWK-Generator',
  s1Label: 'Schritt 1.',
  s1Title: 'Zwischen PEM und JWK konvertieren:',
  s1i1: 'Fügen Sie Ihren PEM-Schlüssel ein, um ihn ins JSON-Web-Key-Format umzuwandeln, oder umgekehrt.',
  s1i2: 'Kopieren Sie den konvertierten Schlüssel zur Verwendung in Ihren Anwendungen.',
  s1i3:
    'Warum PEM → JWK? Viele Bibliotheken und Identitätsplattformen erwarten JWK/JWKS. Durch die Konvertierung von PEM zu JWK können JWT-Verifizierungs-Flows und jeder Dienst, der eine jwks.json unter einer jwks_uri liest, Ihre Schlüssel verwenden.',
  s2Label: 'Schritt 2.',
  s2Title: 'Neue Schlüssel erzeugen:',
  s2i1: 'Wählen Sie, ob Sie einen Schlüssel zum Signieren oder zum Verschlüsseln benötigen.',
  s2i2:
    'Wählen Sie den zu Ihren Sicherheitsanforderungen passenden Schlüsseltyp, etwa symmetrisch (oct), RSA oder elliptische Kurve (EC oder OKP).',
  s2i3:
    'Wählen Sie den kryptografischen Algorithmus passend zu Ihren Systemanforderungen (z. B. RS256 für RSA-Signaturen).',
  s2i4: 'Erhalten Sie die erzeugten Schlüssel:Symmetrisch:',
  s2i5a: 'a. Secret-Key-String + JWK-JSON.',
  s2i5b:
    'b. Asymmetrisch: PEM-formatierte private und öffentliche Schlüssel + die zugehörigen JWK-Objekte für den privaten und den öffentlichen Teil.',
  s3Label: 'Schritt 3.',
  s3Title: 'Schlüssel sicher verwenden:',
  s3i1: 'Setzen Sie diese Schlüssel ein, um JWTs zu signieren oder zu verschlüsseln.',
  s3i2: 'Hosten Sie JWK-Sets auf Ihren Autorisierungsservern für die Schlüsselermittlung.',
  s3i3: 'Rotieren und verwalten Sie Schlüssel einfach für eine robuste Sicherheitslage.',
  faqJwkLinkText: 'Was ist ein JWK',
  faqJwkTitleSuffix: '(JSON Web Key)?',
  faqJwkBody:
    'Ein JWK ist eine JSON-Datenstruktur, die einen kryptografischen Schlüssel darstellt. Ein JWKS (JSON Web Key Set) ist ein Objekt mit einem keys-Array aus JWKs. JWKS ist das Standardformat, in dem Identity Provider ihre öffentlichen Schlüssel unter einer jwks_uri veröffentlichen, damit Clients JWT-Tokens validieren können (siehe RFC 7517). Wenn Sie nach „was ist jwks“ oder „jwks uri“ gesucht haben: Das ist das Format, das Sie brauchen.',
  faqJwkBullet1: 'Maschinenfreundliches JSON-Format, einfach über Web-APIs hinweg nutzbar',
  faqJwkBullet2: 'Unterstützt alle Schlüsseltypen, symmetrisch und asymmetrisch',
  faqJwkBullet3: 'Erleichtert Schlüsselrotation und -verwaltung in modernen Anwendungen',
  faqPemTitle: 'Was ist PEM',
  faqPemBody:
    'PEM (Privacy Enhanced Mail) ist das Base64-kodierte Format, das häufig zum Speichern und Weitergeben kryptografischer Schlüssel und Zertifikate verwendet wird. Mit der Konvertierung von PEM zu JWK machen Sie PEM-Schlüssel für JWKS-Endpunkte und moderne JOSE-Bibliotheken nutzbar.',
  faqPemBase64Part1: 'Da PEM nur Base64-kodierte DER-Daten sind, können Sie die Rohbytes mit unserem ',
  faqPemBase64LinkLabel: 'kostenlosen Base64-Decoder',
  faqPemBase64Part2: ' untersuchen.',
  bestPracticesTitle: 'Best Practices',
  bp1:
    'Verwenden Sie generierte private Schlüssel nie in der Produktion. Erzeugen und speichern Sie private Schlüssel für die Produktion in einem sicheren HSM oder KMS.',
  bp2: 'Verwenden Sie angemessene Schlüssellängen und moderne Algorithmen (z. B. Ed25519, wo unterstützt).',
  bp3:
    'Hosten Sie JWKS über HTTPS unter einer stabilen jwks_uri und rotieren Sie Schlüssel regelmäßig: Veröffentlichen Sie neue Schlüssel mit neuen kid-Werten und entfernen Sie veraltete Schlüssel sicher.',
  bp4: 'Nehmen Sie kid- und alg-Metadaten in Ihre JWKs auf, damit Clients beim Verifizieren von JWTs den richtigen Schlüssel auswählen können.',
} as const;
