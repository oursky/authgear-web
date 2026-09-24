export const oidc = {
  metaTitle: 'Explorateur d’endpoint de découverte OIDC | Authgear',
  metaDescription:
    'Récupérez et inspectez le .well-known/openid-configuration de n’importe quel fournisseur OIDC. Consultez les endpoints d’autorisation et de token, le JWKS, les scopes et les algorithmes de signature.',
  heroTitle: 'Explorateur OpenID Connect Discovery',
  heroDescription:
    'Saisissez l’URL d’un issuer OIDC pour récupérer son endpoint de découverte. Inspectez instantanément tous les endpoints du .well-known/openid-configuration, les scopes pris en charge, les algorithmes de signature et le JWKS, sans aucune connexion requise.',
  iframeTitle: 'Explorateur d’endpoint de découverte OIDC',
  policyLine1:
    'La sécurité de vos données est notre priorité absolue. Tout s’exécute en local dans votre navigateur.',
  policyLine2:
    'L’outil récupère le document de découverte directement auprès du fournisseur OIDC via votre navigateur. Authgear ne voit ni n’enregistre jamais vos requêtes.',
  card1Title: 'Récupération de la configuration OpenID',
  card1Desc:
    'Récupère automatiquement le document de découverte OpenID Connect depuis /.well-known/openid-configuration à partir de l’URL d’issuer que vous fournissez.',
  card2Title: 'Résumé des endpoints clés',
  card2Desc:
    'Consultez d’un coup d’œil les endpoints et identifiants essentiels, dont l’issuer, l’endpoint d’autorisation, l’endpoint de token, la JWKS URI et d’autres champs de configuration couramment utilisés.',
  card3Title: 'Sortie de découverte en JSON',
  card3Desc:
    'Inspectez le document de découverte complet dans une vue JSON avec coloration syntaxique. Copiez facilement la réponse entière ou des champs individuels pour le débogage ou la documentation.',
  s1Label: 'Étape 1.',
  s1Title:
    'Saisissez l’URL de découverte (par exemple https://accounts.google.com/.well-known/openid-configuration ou https://project.authgear.cloud/.well-known/openid-configuration) et cliquez sur « Récupérer ».',
  s2Label: 'Étape 2.',
  s2Title: 'Examinez les métadonnées analysées, les endpoints principaux et les capacités du fournisseur.',
  s3Label: 'Étape 3.',
  s3Title: 'Copiez des champs individuels en un clic, inspectez le JSON brut ou consultez le JWKS.',
  faq1Title: 'Qu’est-ce que l’endpoint de découverte en OIDC ?',
  faq1Body:
    'L’endpoint de découverte OIDC est une URL standardisée à l’adresse {issuer}/.well-known/openid-configuration qui renvoie un document JSON décrivant la configuration du fournisseur. Il liste l’endpoint d’autorisation, l’endpoint de token, la JWKS URI, les scopes pris en charge, les types de réponse, les algorithmes de signature et d’autres capacités. Les clients peuvent s’en servir pour se configurer automatiquement sans coder en dur les URL des endpoints.',
  faq2Title: 'Tous les fournisseurs OIDC prennent-ils en charge la découverte ?',
  faq2Body:
    'La plupart des fournisseurs OIDC modernes et conformes prennent en charge la découverte. La spécification OpenID Connect l’exige des fournisseurs qui veulent permettre la configuration automatique des clients. Certains systèmes d’identité plus anciens ou propriétaires n’exposent pas d’endpoint /.well-known/openid-configuration ; dans ce cas, vous devrez configurer les endpoints manuellement. Si une récupération échoue dans cet outil, soit le fournisseur ne prend pas en charge la découverte, soit il restreint l’accès à l’endpoint.',
  faq3Title: 'Quelle est l’URL réelle de découverte OpenID ?',
  faq3Body:
    'L’URL de découverte a le format {issuer}/.well-known/openid-configuration, où {issuer} est l’URL de base de votre fournisseur OpenID Connect. Par exemple : Google utilise https://accounts.google.com/.well-known/openid-configuration, Okta https://{yourOktaDomain}/.well-known/openid-configuration et Authgear https://{your-project}.authgear.cloud/.well-known/openid-configuration. Saisissez n’importe quelle URL d’issuer ci-dessus et l’outil la récupère automatiquement.',
  faq4Title: 'Qu’est-ce qu’un endpoint de découverte ?',
  faq4Body:
    'Un endpoint de découverte est une URL bien connue qu’un service expose pour décrire ses capacités et sa configuration. Dans OpenID Connect, l’endpoint de découverte suit le chemin /.well-known/openid-configuration (défini dans la RFC 8414). Il permet aux applications clientes de découvrir dynamiquement les endpoints et les fonctionnalités pris en charge par le fournisseur, sans configuration manuelle.',
  faq5Title:
    'Les fournisseurs OIDC d’un même éditeur (Okta, Azure, Keycloak) ont-ils des URL de découverte différentes ?',
  faq5Body:
    'Oui. Le format de l’URL de découverte est constant (/.well-known/openid-configuration), mais l’URL de base de l’issuer diffère. Pour Azure AD, c’est généralement « https://login.microsoftonline.com/{tenant-id}/v2.0 ». Pour Keycloak, « https://{host}/realms/{realm} ». Pour Okta, « https://{yourOktaDomain} ». Saisissez l’URL d’issuer de votre fournisseur ci-dessus et l’outil résout automatiquement l’URL de découverte complète.',
} as const;
