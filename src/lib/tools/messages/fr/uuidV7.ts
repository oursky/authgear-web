export const uuidV7 = {
  metaTitle: 'Générateur UUID v7 / UUIDv7 & extracteur d’horodatage : outil en ligne gratuit (RFC 9562)',
  metaDescription:
    'Générateur UUID v7 (UUIDv7) et extracteur d’horodatage gratuit en ligne. Générez, inspectez et copiez des UUID ordonnés dans le temps dans votre navigateur, décodez l’horodatage Unix intégré et générez jusqu’à 10 identifiants à la fois. Standardisé dans la RFC 9562.',
  heroTitle: 'Générateur UUID v7 (UUIDv7) & extracteur d’horodatage : RFC 9562',
  heroDescription:
    'UUID v7, aussi écrit UUIDv7, est un identifiant de 128 bits standardisé dans la RFC 9562 qui intègre un horodatage Unix en millisecondes, de sorte que les identifiants se trient par date de création tout en restant globalement uniques. Utilisez cet outil gratuit pour générer des valeurs UUIDv7, décoder l’horodatage d’un UUID existant et inspecter chaque champ, tout cela dans votre navigateur, sans rien envoyer à un serveur.',
  iframeTitle: 'Générateur UUIDv7 & extracteur d’horodatage (RFC 9562)',
  policyLine1:
    'La sécurité de vos données est notre priorité absolue. Tout s’exécute en local dans votre navigateur.',
  policyLine2: 'Cet outil ne stocke aucune donnée et n’envoie rien hors de votre appareil',
  card1Title: 'Plusieurs valeurs UUID v7',
  card1Desc:
    'Générez jusqu’à 10 valeurs UUID v7 à la fois. Utile pour les tests, l’initialisation de données ou la validation du comportement de tri.',
  card2Title: 'Modes d’horodatage flexibles',
  card2Desc:
    'Choisissez comment l’horodatage est généré. Utilisez l’heure actuelle ou définissez un horodatage personnalisé pour générer des UUID correspondant à un instant précis.',
  card3Title: 'Inspecteur d’UUID intégré',
  card3Desc:
    'Chaque UUID généré dispose d’un inspecteur qui affiche des détails structurés tels que l’horodatage Unix intégré, la version de l’UUID et les informations de variante.',
  card4Title: 'Extraction d’horodatage',
  card4Desc:
    'Extrayez l’horodatage Unix d’un UUID v7 existant pour vérifier sa date de création et déboguer le tri chronologique.',
  s1Label: 'Étape 1.',
  s1Title: 'Choisissez le nombre d’identifiants à générer (1 à 10).',
  s2Label: 'Étape 2.',
  s2Title: 'Sélectionnez un mode d’horodatage : « Maintenant » ou « Définir une heure » (ISO 8601 UTC, Unix).',
  s3Label: 'Étape 3.',
  s3Title: 'Cliquez sur « Générer les UUID ».',
  s4Label: 'Étape 4.',
  s4Title: 'Copiez une valeur en un clic, ou toutes avec « Tout copier ».',
  s5Label: 'Étape 5.',
  s5Title: 'Lisez l’inspecteur à code couleur pour comprendre chaque champ.',
  s6Label: 'Étape 6.',
  s6Title: 'Passez à l’extraction d’horodatage pour décoder un UUID v7 existant.',
  faq1Title: 'Qu’est-ce que l’UUID v7 ?',
  faq1BodyBefore:
    'UUID v7 est un identifiant de 128 bits défini dans la ',
  faq1LinkText: 'RFC 9562',
  faq1BodyAfter:
    '. Il intègre un horodatage Unix de 48 bits en millisecondes, suivi d’un marqueur de version de 4 bits (7), d’un segment aléatoire/séquentiel de 12 bits, d’une variante de 2 bits (RFC 4122) et d’un segment aléatoire de 62 bits. La composante temporelle produit des identifiants pour l’essentiel monotones et ordonnés dans le temps, qui se trient bien tout en conservant un fort caractère aléatoire.',
  faq1Href: 'https://www.rfc-editor.org/rfc/rfc9562.html#name-uuid-version-7',
  faq2Title: 'Usages courants',
  faq2b1: 'Clés de base de données : insertions ordonnées dans le temps avec une bonne localité d’index.',
  faq2b2: 'Identifiants d’événements : triables par date de création sans colonnes supplémentaires.',
  faq2b3: 'Corrélation de logs : horodatage en millisecondes intégré pour le triage.',
  bpTitle: 'Pourquoi utiliser UUID v7 (UUIDv7) plutôt que UUID v4 ?',
  bpBody:
    'UUID v4 est entièrement aléatoire, ce qui disperse les nouvelles lignes insérées dans tout l’index B-tree et force des divisions de pages coûteuses, un vrai problème de performance à fort volume d’écriture. UUIDv7 place un horodatage Unix de 48 bits en millisecondes avant les bits aléatoires, de sorte que les identifiants nouvellement générés se trient lexicographiquement par date de création, se regroupent dans l’index et se comportent bien lors d’insertions concurrentes. Vous conservez l’unicité globale de v4 et gagnez la localité d’index d’un entier auto-incrémenté, sans le coût en confidentialité ou en coordination de l’un ou de l’autre.',
  gridTitle: 'L’UUID v7 est-il globalement unique ?',
  gridBody:
    'Les UUID sont conçus pour une probabilité de collision extrêmement faible lorsqu’ils sont générés correctement. La v7 combine un horodatage avec de grandes sections aléatoires pour préserver cette propriété.',
} as const;
