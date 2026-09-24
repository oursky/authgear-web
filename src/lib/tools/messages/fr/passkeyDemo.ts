export const passkeyDemo = {
  metaTitle: 'Démo Passkey & testeur WebAuthn : essayez les passkeys dans votre navigateur',
  metaDescription:
    'Créez une vraie passkey, inspectez le credential WebAuthn et vérifiez une connexion, tout cela en local dans votre navigateur. Rien n’est transmis ni stocké sur un serveur.',
  heroTitle: 'Démo Passkey & testeur WebAuthn',
  heroDescription:
    'Créez une vraie passkey (clé d’accès) avec l’API WebAuthn, inspectez le credential décodé et connectez-vous pour observer chaque étape de vérification qu’un serveur exécuterait. Tout se passe en local dans votre navigateur avec WebCrypto. Aucun compte requis, et rien ne quitte votre appareil.',
  iframeTitle: 'Démo Passkey & testeur WebAuthn',
  policyPrefix:
    'La sécurité de vos données est notre priorité absolue. La création de la passkey, l’inspection du credential et la vérification de la signature s’effectuent entièrement dans votre navigateur via les API WebAuthn et WebCrypto. Il n’y a aucun backend, et cet outil ne transmet ni ne stocke rien hors de votre appareil. Code source : ',
  policyLink: 'https://github.com/oursky/authgear-web',
  howSectionTitle: 'Comment fonctionne la démo Passkey',
  step1Title: 'Choisir les options de création :',
  step1Body:
    'Définissez les options authenticator attachment, user verification, resident key et attestation, ainsi que les algorithmes. Le JSON PublicKeyCredentialCreationOptions se met à jour en direct à mesure que vous les modifiez.',
  step2Title: 'Créer une passkey :',
  step2Body:
    'Le navigateur appelle navigator.credentials.create() et votre appareil vous demande Face ID, Touch ID, Windows Hello ou une clé de sécurité.',
  step3Title: 'Inspecter le credential :',
  step3Body:
    'L’outil décode clientDataJSON et décode en CBOR l’objet d’attestation : flags, sign count, AAGUID (le modèle d’authentificateur), l’ID du credential et la clé publique aux formats JWK et PEM.',
  step4Title: 'Se connecter avec :',
  step4Body:
    'navigator.credentials.get() produit une assertion, soit à partir de votre liste de credentials enregistrés, soit via le flux de discoverable credential avec une allow-list vide.',
  step5Title: 'Vérifier comme un serveur :',
  step5Body:
    'Chaque contrôle qu’effectue un vrai serveur reçoit un badge réussite/échec accompagné d’une explication : type de cérémonie, challenge, origin, hash du RP ID, flags et vérification de signature WebCrypto.',
  howGuideText: 'Prêt à ajouter les passkeys à votre propre application ?',
  howGuideLinkText: 'Lisez le guide développeur sur l’implémentation des passkeys',
  howGuideHref: '/post/how-to-implement-passkeys-developer-guide',
  platformsTitle: 'Plateformes prises en charge',
  platformsIntro:
    'Les passkeys fonctionnent sur toutes les grandes plateformes et se synchronisent au sein de chaque écosystème. Cette démo s’exécute dans tout navigateur prenant en charge WebAuthn.',
  plat1Name: 'Apple',
  plat1Desc: 'iOS 16+ et macOS 13+. Face ID ou Touch ID, synchronisé via le trousseau iCloud.',
  plat2Name: 'Android & Chrome',
  plat2Desc: 'Android 9+. Empreinte digitale ou verrouillage d’écran, synchronisé via le Gestionnaire de mots de passe Google.',
  plat3Name: 'Windows',
  plat3Desc: 'Windows 10 et 11. Windows Hello par reconnaissance faciale, empreinte digitale ou code PIN.',
  plat4Name: 'Gestionnaires de mots de passe',
  plat4Desc: '1Password, Bitwarden, Dashlane, Proton Pass et d’autres stockent et synchronisent les passkeys sur toutes les plateformes.',
  plat5Name: 'Clés de sécurité',
  plat5Desc: 'YubiKey et les autres clés matérielles FIDO2 fonctionnent via le transport multiplateforme (USB/NFC).',
  readyTitle: 'Prêt à déployer les passkeys dans votre propre application ?',
  readySubtitle: 'Authgear vous offre la connexion par passkey en natif, sans avoir à câbler WebAuthn vous-même.',
  readyCta: 'Découvrir les passkeys Authgear',
  faqWebauthnTitle: 'Qu’est-ce que WebAuthn ?',
  faqWebauthnBody:
    'WebAuthn (Web Authentication) est l’API de navigateur standardisée par le W3C qui sous-tend les passkeys. Au lieu d’un mot de passe partagé, votre appareil crée une paire de clés publique/privée par site : la clé privée ne quitte jamais votre authentificateur et le site ne stocke que la clé publique. La connexion est une signature de type challenge-réponse. Les passkeys résistent au phishing parce que le navigateur lie chaque credential à l’origin exacte qui l’a créé.',
  faqWebauthnLinkText: 'Consultez notre guide développeur sur l’implémentation des passkeys.',
  faqWebauthnLinkHref: '/post/how-to-implement-passkeys-developer-guide',
  faqSafeTitle: 'Est-il sûr de créer une passkey ici ?',
  faqSafeBody:
    'Oui. La passkey créée par cette page est réelle, mais elle est limitée à ce site et ne sert à rien d’autre que cette démo. La clé privée reste dans l’authentificateur de votre appareil ; la clé publique et les métadonnées du credential ne sont conservées que dans le localStorage de votre navigateur. Il n’y a aucun serveur, donc rien n’est transmis nulle part. Vous pouvez supprimer l’enregistrement de démo en un clic et retirer la passkey elle-même de votre appareil à tout moment.',
  faqDeleteTitle: 'Comment supprimer la passkey de démo de mon appareil ?',
  faqDeleteIntro:
    '« Oublier » dans l’outil ne supprime que l’enregistrement de cette page. Pour retirer la passkey de votre appareil :',
  faqDeleteIos: 'iOS / macOS : Réglages → Mots de passe (ou l’app Mots de passe) → recherchez ce site → supprimez la passkey.',
  faqDeleteAndroid: 'Android / Chrome : Gestionnaire de mots de passe Google → Mots de passe → recherchez ce site → supprimez.',
  faqDeleteWindows: 'Windows : Paramètres → Comptes → Clés d’accès → recherchez ce site → supprimez.',
  faqDeleteManagers: 'Gestionnaires de mots de passe (1Password, Bitwarden, …) : recherchez l’élément correspondant à ce site et supprimez-le là.',
  faqAaguidTitle: 'Qu’est-ce qu’un AAGUID ?',
  faqAaguidBody:
    'L’AAGUID (Authenticator Attestation Globally Unique Identifier) est un identifiant de 16 octets qui identifie le modèle d’authentificateur (par exemple le Gestionnaire de mots de passe Google ou une YubiKey 5), et non votre appareil individuel. Cet outil le résout à partir d’un instantané embarqué de la liste passkey-authenticator-aaguids maintenue par la communauté. Avec l’attestation réglée sur « none » (valeur par défaut), de nombreux authentificateurs le mettent à zéro pour préserver la confidentialité.',
  faqSignCountTitle: 'Pourquoi le sign count affiche-t-il 0 ?',
  faqSignCountBody:
    'Le compteur de signatures a été conçu pour détecter les credentials clonés : chaque utilisation devrait l’incrémenter. Mais une passkey synchronisée existe sur plusieurs appareils à la fois et ne peut pas maintenir un compteur partagé unique ; la plupart des fournisseurs de passkeys (trousseau iCloud, Gestionnaire de mots de passe Google) renvoient donc toujours 0, ce qui signifie « compteur non pris en charge ». Les clés de sécurité matérielles, elles, l’incrémentent généralement.',
} as const;
