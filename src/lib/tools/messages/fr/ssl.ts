export const ssl = {
  metaTitle: 'Vérificateur SSL : vérificateur de certificat SSL gratuit | Authgear',
  metaDescription:
    'Outil de vérification SSL gratuit. Inspectez instantanément les détails d’un certificat SSL/TLS, vérifiez la chaîne de certificats et contrôlez les dates d’expiration pour n’importe quel domaine.',
  heroTitle: 'Vérificateur SSL gratuit',
  heroDescription:
    'Saisissez n’importe quel domaine pour vérifier instantanément son certificat SSL/TLS. Consultez la date d’expiration, l’émetteur, les Subject Alternative Names (SAN) et l’état de la chaîne de certificats complète, sans aucune connexion requise.',
  iframeTitle: 'Inspecteur de certificat SSL',
  card1Title: 'Inspection des détails du certificat',
  card1Desc:
    'Consultez les informations détaillées du certificat SSL de n’importe quel domaine HTTPS, dont le sujet, l’émetteur, la période de validité, les Subject Alternative Names (SAN), les empreintes et d’autres attributs techniques.',
  card2Title: 'État de la chaîne de certificats',
  card2Desc:
    'Vérifiez si la chaîne de certificats est complète et de confiance. Contrôlez rapidement la validité de la chaîne, l’état de la racine de confiance et le nombre total de certificats dans la chaîne.',
  card3Title: 'Visualisation de la chaîne de certificats',
  card3Desc:
    'Inspectez la hiérarchie complète des certificats, du certificat feuille (votre domaine) aux certificats intermédiaires, jusqu’à l’autorité de certification racine.',
  s1Label: 'Étape 1.',
  s1Title: 'Saisissez l’URL d’un site web (par exemple https://www.authgear.com/) et cliquez sur « Inspecter ».',
  s2Label: 'Étape 2.',
  s2Title:
    'Récupération des informations du certificat. L’outil se connecte au serveur et récupère le certificat SSL/TLS présenté par le site web.',
  s3Label: 'Étape 3.',
  s3Title:
    'Examen des détails du certificat et de la chaîne. Les résultats affichent les métadonnées du certificat, l’état de la chaîne et la hiérarchie complète des certificats.',
  readyTitle: 'Prêt à ajouter HTTPS et l’authentification à votre application ?',
  readySubtitle:
    'Authgear est une plateforme d’authentification qui prend en charge la connexion, la MFA, le SSO et la gestion des sessions pour votre application, afin que votre équipe n’ait pas à tout construire de zéro.',
  faq1Title: 'Qu’est-ce qu’un certificat SSL ?',
  faq1Body:
    'Un certificat SSL (plus précisément un certificat TLS ; SSL est l’ancien nom qui est resté) permet une communication HTTPS chiffrée entre le navigateur d’un utilisateur et un serveur web. Il remplit deux fonctions :\n\nChiffrement : il brouille les données en transit afin que personne interceptant la connexion ne puisse les lire.\n\nVérification d’identité : il prouve que le serveur auquel vous vous connectez est bien celui qu’il prétend être, et non un imposteur. Les certificats sont émis par des autorités de certification (CA), des tiers de confiance comme Let’s Encrypt, DigiCert et Sectigo. Lorsque votre navigateur se connecte à un site, il vérifie que le certificat a été émis par une CA à laquelle il fait confiance, que le domaine correspond et que le certificat n’a pas expiré.',
  faq1MetaBody:
    'Types de certificats SSL/TLS :\n\nDV (Domain Validated)\nConfirme uniquement la propriété du domaine. Rapide et peu coûteux (Let’s Encrypt est DV). Convient à la plupart des sites.\n\nOV (Organization Validated)\nVérifie l’organisation derrière le domaine. Courant pour les sites d’entreprise.\n\nEV (Extended Validation)\nLe niveau le plus élevé ; exige des contrôles d’identité rigoureux. Utilisé par les banques et les grandes entreprises.',
  faq2Title: 'Qu’est-ce qu’une chaîne de certificats ?',
  faq2Body:
    'Une chaîne de certificats est une séquence de certificats qui relie le certificat de votre site web à une autorité de certification (CA) racine reconnue par les navigateurs. La chaîne comporte trois niveaux :\n\nCertificat feuille (le certificat de votre site) : émis directement pour votre domaine.\n\nCertificat(s) intermédiaire(s) : émis par la CA racine à une CA intermédiaire, qui émet ensuite les certificats des sites web. Cela permet de garder la CA racine hors ligne et protégée.\n\nCertificat racine : autosigné par une CA de confiance. Préinstallé dans les navigateurs et les systèmes d’exploitation.\n\nPourquoi est-ce important ?\nSi le certificat intermédiaire manque dans la configuration du serveur, les navigateurs ne peuvent pas vérifier la chaîne et affichent une erreur de sécurité, même si votre certificat feuille est parfaitement valide. C’est l’une des erreurs de configuration SSL les plus courantes. Notre vérificateur visualise la chaîne complète pour que vous repériez les lacunes instantanément.',
  faq2LearnMoreBefore: 'Pour en savoir plus, lisez notre article détaillé : ',
  faq2LearnMoreLinkText: 'Chaîne de certificats SSL : ce que c’est et comment la réparer',
  faq2LearnMoreHref: '/post/ssl-certificate-chain',
  faq3Title: 'Quelle est la durée de validité des certificats SSL ?',
  faq3Body:
    'Les certificats Let’s Encrypt expirent tous les 90 jours (renouvellement automatique). Les certificats des CA payantes durent généralement 1 à 2 ans. Depuis septembre 2020, la durée de validité maximale des certificats publiquement reconnus est de 398 jours. Apple et Google poussent l’ensemble du secteur vers un maximum de 90 jours.\n\nQue se passe-t-il lorsqu’un certificat SSL expire ?\n\nLes navigateurs affichent immédiatement une erreur « Votre connexion n’est pas privée » et empêchent les utilisateurs d’accéder au site. C’est pourquoi la surveillance des dates d’expiration est importante.',
  faq4Title: 'SSL vs TLS : quelle est la différence ?',
  faq4Body:
    'SSL (Secure Sockets Layer) est le protocole d’origine, aujourd’hui obsolète. Toutes les versions de SSL présentent des vulnérabilités de sécurité connues. TLS (Transport Layer Security) est son successeur et ce que toutes les connexions HTTPS modernes utilisent réellement : TLS 1.2 et TLS 1.3.',
  faq4Body2:
    'Le terme « certificat SSL » reste très répandu, mais techniquement, chaque certificat utilisé aujourd’hui est un certificat TLS. Quand on parle de « vérificateur SSL », on entend la vérification du certificat TLS d’un serveur. Cet outil vérifie les deux : il indique la version TLS négociée et les détails du certificat.',
} as const;
