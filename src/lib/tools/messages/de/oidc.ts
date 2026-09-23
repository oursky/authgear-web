export const oidc = {
  metaTitle: 'OIDC Discovery Endpoint Explorer | Authgear',
  metaDescription:
    'Rufen Sie die .well-known/openid-configuration eines beliebigen OIDC-Providers ab und prüfen Sie sie. Authorization-Endpunkte, Token-Endpunkte, JWKS, Scopes und Signaturalgorithmen auf einen Blick.',
  heroTitle: 'OpenID Connect Discovery Explorer',
  heroDescription:
    'Geben Sie eine beliebige OIDC-Issuer-URL ein, um deren Discovery-Endpunkt abzurufen. Prüfen Sie sofort alle Endpunkte der .well-known/openid-configuration, unterstützte Scopes, Signaturalgorithmen und das JWKS, ganz ohne Login.',
  iframeTitle: 'OIDC Discovery Endpoint Explorer',
  policyLine1:
    'Die Sicherheit Ihrer Daten hat für uns höchste Priorität. Alles läuft lokal in Ihrem Browser.',
  policyLine2:
    'Das Tool ruft das Discovery-Dokument über Ihren Browser direkt beim OIDC-Provider ab. Authgear sieht oder protokolliert Ihre Anfragen nie.',
  card1Title: 'OpenID-Konfiguration abrufen',
  card1Desc:
    'Ruft das OpenID-Connect-Discovery-Dokument anhand der von Ihnen angegebenen Issuer-URL automatisch von /.well-known/openid-configuration ab.',
  card2Title: 'Überblick der wichtigsten Endpunkte',
  card2Desc:
    'Sehen Sie die wesentlichen Endpunkte und Kennungen auf einen Blick, darunter Issuer, Authorization-Endpunkt, Token-Endpunkt, JWKS-URI und weitere häufig genutzte Konfigurationsfelder.',
  card3Title: 'Discovery-Ausgabe als JSON',
  card3Desc:
    'Prüfen Sie das vollständige Discovery-Dokument in einer JSON-Ansicht mit Syntaxhervorhebung. Kopieren Sie die gesamte Antwort oder einzelne Felder bequem für Debugging oder Dokumentation.',
  s1Label: 'Schritt 1.',
  s1Title:
    'Geben Sie die Discovery-URL ein (zum Beispiel https://accounts.google.com/.well-known/openid-configuration oder https://project.authgear.cloud/.well-known/openid-configuration) und klicken Sie auf „Abrufen“.',
  s2Label: 'Schritt 2.',
  s2Title: 'Sehen Sie sich die ausgewerteten Metadaten, die zentralen Endpunkte und die Fähigkeiten des Providers an.',
  s3Label: 'Schritt 3.',
  s3Title: 'Kopieren Sie einzelne Felder mit einem Klick, prüfen Sie das rohe JSON oder sehen Sie sich das JWKS an.',
  faq1Title: 'Was ist der Discovery-Endpunkt bei OIDC?',
  faq1Body:
    'Der OIDC-Discovery-Endpunkt ist eine standardisierte URL unter {issuer}/.well-known/openid-configuration, die ein JSON-Dokument mit der Konfiguration des Providers zurückgibt. Es listet Authorization-Endpunkt, Token-Endpunkt, JWKS-URI, unterstützte Scopes, Response-Typen, Signaturalgorithmen und weitere Fähigkeiten auf. Clients können sich damit automatisch konfigurieren, ohne Endpunkt-URLs fest zu hinterlegen.',
  faq2Title: 'Unterstützen alle OIDC-Provider Discovery?',
  faq2Body:
    'Die meisten modernen, konformen OIDC-Provider unterstützen Discovery. Die OpenID-Connect-Spezifikation verlangt es von Providern, die eine automatische Client-Konfiguration ermöglichen wollen. Manche älteren oder proprietären Identitätssysteme stellen keinen /.well-known/openid-configuration-Endpunkt bereit; in diesem Fall müssen Sie die Endpunkte manuell konfigurieren. Schlägt der Abruf in diesem Tool fehl, unterstützt der Provider entweder kein Discovery oder beschränkt den Zugriff auf den Endpunkt.',
  faq3Title: 'Wie lautet die tatsächliche OpenID-Discovery-URL?',
  faq3Body:
    'Die Discovery-URL hat das Format {issuer}/.well-known/openid-configuration, wobei {issuer} die Basis-URL Ihres OpenID-Connect-Providers ist. Beispiele: Google verwendet https://accounts.google.com/.well-known/openid-configuration, Okta https://{yourOktaDomain}/.well-known/openid-configuration und Authgear https://{your-project}.authgear.cloud/.well-known/openid-configuration. Geben Sie oben eine beliebige Issuer-URL ein, und das Tool ruft sie automatisch ab.',
  faq4Title: 'Was ist ein Discovery-Endpunkt?',
  faq4Body:
    'Ein Discovery-Endpunkt ist eine wohlbekannte URL, über die ein Dienst seine Fähigkeiten und seine Konfiguration beschreibt. Bei OpenID Connect folgt der Discovery-Endpunkt dem Pfad /.well-known/openid-configuration (definiert in RFC 8414). Client-Anwendungen können darüber die Endpunkte und unterstützten Funktionen des Providers dynamisch ermitteln, ohne manuelle Konfiguration.',
  faq5Title:
    'Haben OIDC-Provider desselben Anbieters (Okta, Azure, Keycloak) unterschiedliche Discovery-URLs?',
  faq5Body:
    'Ja. Das Format der Discovery-URL ist einheitlich (/.well-known/openid-configuration), die Basis-Issuer-URL unterscheidet sich jedoch. Bei Azure AD lautet sie in der Regel „https://login.microsoftonline.com/{tenant-id}/v2.0“. Bei Keycloak „https://{host}/realms/{realm}“. Bei Okta „https://{yourOktaDomain}“. Geben Sie oben die Issuer-URL Ihres Providers ein, und das Tool löst die vollständige Discovery-URL automatisch auf.',
} as const;
