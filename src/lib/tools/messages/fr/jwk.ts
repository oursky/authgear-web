export const jwk = {
  metaTitle: 'Générateur de JWK : PEM vers JWK, JWK vers PEM & générateur de JWKS | Authgear',
  metaDescription:
    'PEM → JWK, JWK → PEM, ou générez des clés et téléchargez un JWKS. Choisissez kid, alg et use (sig/enc). Uniquement dans le navigateur, sans inscription.',
  heroTitle: 'Générateur de JWK : convertir PEM en JWK & générer un JWKS',
  heroDescription:
    'Générez et convertissez des clés cryptographiques aux formats PEM et JWK pour une signature et un chiffrement sécurisés.',
  iframeTitle: 'Widget générateur de JWK',
  policyLearnMore: 'Qu’est-ce qu’un JWKS',
  policyGithub: 'https://github.com/authgear/authgear-widget-jwk-generator',
  policyLine1:
    'Notre générateur de JWK léger s’exécute entièrement dans votre navigateur, aucune clé ne quitte votre machine. Convertissez PEM en JWK ou JWK en PEM, ou générez de nouvelles clés et exportez un JWKS pour votre endpoint jwks_uri. En savoir plus :',
  policyLine2: 'Voir le code source :',
  card1Title: 'PEM vers JWK',
  card1Desc:
    'Collez une clé encodée en PEM ou un certificat X.509, définissez kid, choisissez alg et use (sig / enc), puis cliquez sur « Générer le JWK ». Cela convertit PEM → JWK au format jwk standard, afin d’ajouter le JWK à un JWKS ou de l’utiliser directement dans des bibliothèques JOSE (Node jose, Python jwcrypto, etc.).',
  card2Title: 'JWK vers PEM',
  card2Desc:
    'Collez un objet JSON JWK et exportez une clé au format PEM pour les CLI, les serveurs ou les outils plus anciens. Utilisez JWK vers PEM lorsque vous avez besoin d’une clé publique PEM pour OpenSSL ou des bibliothèques côté serveur, tout en conservant les métadonnées kid, alg et use dans votre JWK Set.',
  card3Title: 'Générer un JWK',
  card3Desc:
    'Créez de nouvelles clés avec le mode générateur de JWK. Choisissez l’usage de la clé (signature sig ou chiffrement enc), le type de clé (RSA, EC, OKP ou oct) et configurez la taille, la courbe ou les paramètres. Le générateur suggère des valeurs alg et génère automatiquement un kid que vous pouvez modifier. En sortie, obtenez un JWK unique ou un JWKS complet (jwks.json) prêt à être hébergé.',
  howSectionTitle: 'Comment fonctionne le générateur de JWK',
  s1Label: 'Étape 1.',
  s1Title: 'Convertir entre PEM et JWK :',
  s1i1: 'Collez votre clé PEM pour la convertir au format JSON Web Key, ou inversement.',
  s1i2: 'Copiez la clé convertie pour l’utiliser dans vos applications.',
  s1i3:
    'Pourquoi PEM → JWK ? De nombreuses bibliothèques et plateformes d’identité attendent du JWK/JWKS. Convertir PEM en JWK rend vos clés exploitables par les flux de vérification de JWT et par tout service qui lit un jwks.json à une jwks_uri.',
  s2Label: 'Étape 2.',
  s2Title: 'Générer de nouvelles clés :',
  s2i1: 'Indiquez si vous avez besoin d’une clé pour la signature ou pour le chiffrement.',
  s2i2:
    'Choisissez le type de clé adapté à vos besoins de sécurité, par exemple symétrique (oct), RSA ou courbe elliptique (EC ou OKP).',
  s2i3:
    'Sélectionnez l’algorithme cryptographique correspondant aux exigences de votre système (par ex. RS256 pour une signature RSA).',
  s2i4: 'Récupérez les clés générées :Symétrique :',
  s2i5a: 'a. Chaîne de clé secrète + JSON JWK.',
  s2i5b:
    'b. Asymétrique : clés privée et publique au format PEM + objets JWK correspondants pour les parties privée et publique.',
  s3Label: 'Étape 3.',
  s3Title: 'Utiliser vos clés en toute sécurité :',
  s3i1: 'Utilisez ces clés pour signer ou chiffrer des JWT.',
  s3i2: 'Hébergez des JWK Sets sur vos serveurs d’autorisation pour la découverte des clés.',
  s3i3: 'Effectuez facilement la rotation et la gestion des clés pour une posture de sécurité robuste.',
  faqJwkLinkText: 'Qu’est-ce qu’un JWK',
  faqJwkTitleSuffix: '(JSON Web Key) ?',
  faqJwkBody:
    'Un JWK est une structure de données JSON qui représente une clé cryptographique. Un JWKS (JSON Web Key Set) est un objet contenant un tableau keys de JWK. Le JWKS est le format standard utilisé par les fournisseurs d’identité pour publier leurs clés publiques à une jwks_uri afin que les clients puissent valider les tokens JWT (voir RFC 7517). Si vous avez cherché « qu’est-ce que jwks » ou « jwks uri », c’est le format qu’il vous faut.',
  faqJwkBullet1: 'Format JSON lisible par les machines, facile à utiliser dans les API web',
  faqJwkBullet2: 'Prend en charge tous les types de clés, symétriques et asymétriques',
  faqJwkBullet3: 'Facilite la rotation et la gestion des clés dans les applications modernes',
  faqPemTitle: 'Qu’est-ce que PEM',
  faqPemBody:
    'PEM (Privacy Enhanced Mail) est le format encodé en Base64 couramment utilisé pour stocker et partager des clés et des certificats cryptographiques. Convertissez PEM en JWK pour rendre vos clés PEM exploitables par les endpoints JWKS et les bibliothèques JOSE modernes.',
  faqPemBase64Part1: 'Comme PEM n’est que des données DER encodées en Base64, vous pouvez inspecter les octets bruts avec notre ',
  faqPemBase64LinkLabel: 'décodeur Base64 gratuit',
  faqPemBase64Part2: '.',
  bestPracticesTitle: 'Bonnes pratiques',
  bp1:
    'N’utilisez jamais de clés privées générées ici en production. Pour la production, générez et stockez les clés privées dans un HSM ou un KMS sécurisé.',
  bp2: 'Utilisez des tailles de clés appropriées et des algorithmes modernes (par ex. Ed25519 lorsqu’il est pris en charge).',
  bp3:
    'Hébergez le JWKS en HTTPS à une jwks_uri stable et effectuez une rotation régulière des clés : publiez de nouvelles clés avec de nouvelles valeurs kid et retirez les clés obsolètes en toute sécurité.',
  bp4: 'Incluez les métadonnées kid et alg dans vos JWK afin que les clients puissent sélectionner la bonne clé lors de la vérification des JWT.',
} as const;
