---
title: "CLOUD Act et fournisseur d'identité : qui accède à vos utilisateurs ?"
excerpt: "Le CLOUD Act ne concerne pas seulement le stockage de fichiers ou la messagerie. Il touche aussi votre fournisseur d'identité, qui détient les données de connexion de tous vos utilisateurs. Ce que dit la loi, ce que change SecNumCloud et les questions à poser à votre prestataire."
coverImage: ./cover.webp
category: industry
featured: false
metaTitle: "CLOUD Act : quel impact sur votre fournisseur d'identité ?"
metaDescription: "Le CLOUD Act vise aussi les fournisseurs d'identité. Ce que dit la loi, pourquoi un datacenter en Europe ne suffit pas et comment garder vos données souveraines."
publishedAt: 2026-09-28
draft: false
faq:
  - q: "Le CLOUD Act est-il applicable en France ?"
    a: "Il ne s'applique pas aux entreprises françaises en tant que telles, mais à tout fournisseur soumis à la juridiction américaine. Si votre prestataire l'est, il peut être contraint de remettre les données qu'il contrôle, même si elles sont hébergées en France."
  - q: "Le CLOUD Act est-il compatible avec le RGPD ?"
    a: "Les deux textes se contredisent en partie. L'article 48 du RGPD prévoit qu'une décision étrangère exigeant la communication de données personnelles n'est reconnue que si elle repose sur un accord international, comme un traité d'entraide judiciaire. Le CLOUD Act impose pourtant la communication. Le prestataire se retrouve pris entre les deux, et le responsable du traitement partage le risque."
  - q: "Le Data Privacy Framework protège-t-il contre le CLOUD Act ?"
    a: "Non. Le Data Privacy Framework encadre les transferts de données personnelles vers des entreprises américaines certifiées. Il n'empêche pas une injonction adressée à un fournisseur américain. Le Tribunal de l'Union l'a validé le 3 septembre 2025 ; un pourvoi est pendant devant la Cour de justice (C-703/25 P)."
  - q: "Quelle différence entre le CLOUD Act et le Data Act ?"
    a: "Le CLOUD Act est une loi américaine. Le Data Act est un règlement européen applicable depuis le 12 septembre 2025. Son article 32 oblige les fournisseurs cloud à empêcher les accès étrangers illicites aux données non personnelles stockées dans l'UE. Les données de connexion étant en grande partie personnelles, c'est surtout le RGPD qui s'applique."
  - q: "Un service qualifié SecNumCloud est-il à l'abri du CLOUD Act ?"
    a: "C'est l'objectif du chapitre 19.6 du référentiel de l'ANSSI : siège dans l'UE, capital extra-européen plafonné, et aucun tiers non européen ne doit pouvoir accéder techniquement aux données, y compris l'annuaire et les journaux. C'est aujourd'hui le critère le plus exigeant en Europe, mais il faut vérifier que le service précis que vous utilisez est qualifié."
  - q: "Comment réduire l'exposition au CLOUD Act pour l'authentification ?"
    a: "Choisissez un fournisseur d'identité qui n'est pas soumis à la juridiction américaine et qui s'appuie sur une infrastructure européenne, ou hébergez vous-même la solution chez un hébergeur européen. Vérifiez aussi les sous-traitants, notamment pour l'envoi des e-mails et des SMS."
---

> **tl;dr** — Le CLOUD Act oblige les fournisseurs soumis au droit américain à remettre les données qu'ils contrôlent, où qu'elles soient stockées. Votre fournisseur d'identité conserve les e-mails, numéros de téléphone, empreintes de mots de passe, secrets MFA et historiques de connexion de tous vos utilisateurs. S'il relève de la juridiction américaine, héberger ces données en Europe ne suffit pas.

La question finit toujours par arriver, souvent de la part du DPO : « Notre fournisseur d'authentification nous expose-t-il au CLOUD Act ? » La plupart des articles sur le sujet parlent de fichiers et de messagerie. Pourtant, peu de systèmes en savent autant sur vos clients que celui par lequel ils se connectent.

## Ce que prévoit le CLOUD Act

Le Clarifying Lawful Overseas Use of Data Act est entré en vigueur le 23 mars 2018. Il est né d'un litige entre Microsoft et le ministère américain de la Justice au sujet d'e-mails stockés sur un serveur en Irlande. L'essentiel tient en une phrase, à l'article [18 U.S.C. § 2713](https://www.law.cornell.edu/uscode/text/18/2713) : les fournisseurs de services de communication électronique et de cloud doivent communiquer les contenus et les « informations relatives à un client » qui sont en leur « possession, garde ou contrôle », que ces données soient situées aux États-Unis ou ailleurs.

Trois précisions comptent :

- **C'est une loi de procédure pénale.** Elle s'appuie sur des mandats et injonctions délivrés dans le cadre d'enquêtes. Le renseignement relève d'autres textes américains.
- **Elle ne vise pas que les entreprises américaines.** Selon le [livre blanc du ministère américain de la Justice](https://www.justice.gov/d9/pages/attachments/2019/04/10/doj_cloud_act_white_paper_2019_04_10.pdf), la juridiction américaine ne se limite pas aux sociétés ayant leur siège aux États-Unis, sans être illimitée pour autant. Pour un fournisseur étranger, tout dépend des faits, notamment de son activité sur le sol américain.
- **Les recours sont étroits.** Un fournisseur peut contester une injonction dans les 14 jours si le client n'est pas une personne américaine et si la communication risque de violer le droit d'un « gouvernement étranger qualifié » ([§ 2703(h)](https://www.law.cornell.edu/uscode/text/18/2703)). Seuls les pays ayant signé un accord CLOUD Act avec les États-Unis entrent dans cette catégorie. Ni l'UE, ni la France n'en font partie. Un accord UE–États-Unis sur les preuves électroniques est en négociation depuis 2019 ; selon la [Commission européenne](https://commission.europa.eu/law/cross-border-cases/judicial-cooperation/types-judicial-cooperation/e-evidence-cross-border-access-electronic-evidence_en), les discussions sont toujours en cours.

## Un datacenter en France ne règle pas la question

Les fournisseurs américains proposent presque tous des régions européennes. C'est utile pour la latence et la localisation des données. Mais pour le CLOUD Act, ce qui compte n'est pas l'endroit où se trouve le serveur : c'est qui contrôle les données.

Le Sénat l'a rappelé très concrètement. Le [10 juin 2025](https://www.senat.fr/compte-rendu-commissions/20250609/ce_commande_publique.html), devant la commission d'enquête sur la commande publique, le rapporteur Dany Wattebled a demandé à Anton Carniaux, directeur des affaires publiques et juridiques de Microsoft France, s'il pouvait garantir sous serment que les données des citoyens français ne seraient jamais transmises aux autorités américaines sans l'accord de la France. Réponse : « Non, je ne peux pas le garantir, mais, encore une fois, cela ne s'est encore jamais produit. » Selon les rapports de transparence de Microsoft, a-t-il ajouté, aucune entreprise européenne n'a été concernée. Sa réponse ne vise pas Microsoft en particulier : elle décrit la situation de tout fournisseur soumis au droit américain.

Les grands acteurs américains répondent par des offres dédiées. L'[AWS European Sovereign Cloud](https://press.aboutamazon.com/aws/2026/1/aws-launches-aws-european-sovereign-cloud-and-announces-expansion-across-europe), disponible depuis le 15 janvier 2026 dans le Brandebourg, est portée par des filiales de droit allemand dirigées par des citoyens européens et exploitée uniquement par des salariés résidant dans l'UE. Exploitation, accès et support restent donc en Europe. En revanche, ces sociétés appartiennent toujours au groupe Amazon, dont le siège est aux États-Unis, et aucun juge n'a encore dit si ces données seraient sous le « contrôle » de la maison mère. L'annonce ne parle pas du CLOUD Act.

## CLOUD Act et RGPD : deux lois, un prestataire au milieu

L'[article 48 du RGPD](https://www.cnil.fr/fr/reglement-europeen-protection-donnees/chapitre5) est clair : une décision d'une juridiction ou d'une autorité d'un pays tiers exigeant la communication de données personnelles « ne peut être reconnue ou rendue exécutoire de quelque manière que ce soit qu'à la condition qu'elle soit fondée sur un accord international, tel qu'un traité d'entraide judiciaire ». Le CLOUD Act contourne précisément cette voie.

Le Comité européen de la protection des données et le Contrôleur européen l'ont analysé dès 2019 dans une [réponse conjointe au Parlement européen](https://www.edpb.europa.eu/our-work-tools/our-documents/letters/edpb-edps-joint-response-libe-committee-impact-us-cloud-act_en). Leur [conclusion](https://edpb.europa.eu/system/files/documents/files/file2/edpb_edps_joint_response_us_cloudact_annex.pdf) : tant qu'une injonction CLOUD Act n'est pas reconnue sur la base d'un accord international, la licéité de la communication « ne peut être établie », sauf cas exceptionnel où il s'agit de protéger les intérêts vitaux de la personne concernée. Ils recommandent un accord UE–États-Unis assorti de garanties solides.

Quant au [Data Privacy Framework](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A62023TJ0553), il encadre les transferts de données personnelles vers des entreprises américaines certifiées. Le Tribunal de l'Union européenne l'a validé le 3 septembre 2025 en rejetant le recours du député français Philippe Latombe, qui a formé un pourvoi devant la Cour de justice (affaire C-703/25 P, pendante). Pour le CLOUD Act, ce n'est pas la bonne réponse : le cadre rend le transfert licite, il n'empêche pas une injonction.

## Ce que SecNumCloud exige

La qualification SecNumCloud de l'ANSSI est, en Europe, le référentiel qui va le plus loin sur ce point. Le [chapitre 19.6 du référentiel v3.2](https://cyber.gouv.fr/sites/default/files/document/secnumcloud-referentiel-exigences-v3.2.pdf), « Protection vis-à-vis du droit extra-européen », impose notamment :

- un siège statutaire, une administration centrale et un établissement principal dans un État membre de l'UE ;
- un capital et des droits de vote détenus au plus à 24 % individuellement et 39 % collectivement par des entités non européennes, sans droit de veto ni majorité dans les organes de direction ;
- qu'aucun tiers non européen auquel le prestataire recourt n'ait la possibilité technique d'obtenir les données, y compris les données techniques comme les identités des administrateurs, les journaux, l'annuaire, les certificats et la configuration des accès ;
- une information du client sous un mois en cas de changement affectant ces exigences.

Le troisième point est rarement cité, alors qu'il concerne directement l'identité : l'annuaire et les journaux, c'est le cœur d'un fournisseur d'authentification. Une qualification porte sur un service précis ; vérifiez que c'est bien celui que vous utilisez.

## Ce qu'un fournisseur d'identité sait de vos utilisateurs

Un service de stockage détient les documents de certains clients. Un fournisseur d'identité détient des informations sur tous vos utilisateurs à la fois :

- adresses e-mail, numéros de téléphone, noms ;
- empreintes de mots de passe et clés de passkeys ;
- secrets MFA, par exemple les clés qui génèrent les codes TOTP ;
- historique des connexions, avec date, adresse IP et appareil ;
- comptes liés chez Google, Apple ou Microsoft ;
- journaux d'audit : qui a changé son mot de passe, qui a obtenu quel rôle, et quand.

S'y ajoutent des flux qu'on oublie facilement :

- **Envoi d'e-mails et de SMS.** Les codes à usage unique et les liens magiques passent par des prestataires tiers, qui voient numéros, adresses et souvent le code lui-même.
- **Sauvegardes et journaux.** Sont-ils hébergés chez un autre prestataire, ou dans une autre région ?
- **Accès du support.** D'où, et sous quel droit, les équipes du fournisseur accèdent-elles à votre environnement ?

## Comment limiter l'exposition

Deux approches tiennent la route :

1. **Un fournisseur d'identité non soumis au contrôle américain**, et hébergé chez un acteur européen. Les deux conditions comptent : un éditeur européen installé sur un hyperscaler américain ne fait que déplacer le problème d'un étage.
2. **L'auto-hébergement**, chez un hébergeur européen ou dans votre propre datacenter. Aucune entreprise américaine ne détient alors les données de vos utilisateurs.

Le chiffrement avec vos propres clés aide pour les fichiers. Pour un système d'authentification, il a ses limites : le serveur doit lire l'adresse e-mail pour envoyer un code, et vérifier les identifiants pour autoriser une connexion.

Les questions à poser à tout fournisseur :

- Quelle société signe le contrat, et où est le siège de sa maison mère ?
- Sur quelle infrastructure tournent la production, les sauvegardes et les journaux ?
- Quels sous-traitants voient des données utilisateurs, y compris pour les e-mails et SMS ?
- Depuis quels pays le support accède-t-il à notre environnement ?
- Comment traitez-vous les demandes des autorités, et nous en informez-vous ?
- Pouvons-nous exporter tous les utilisateurs, empreintes de mots de passe comprises, si nous partons ?

## Et Authgear dans tout ça ?

Authgear est développé par Skymakers Digital Limited, une société britannique. Le Royaume-Uni n'est pas les États-Unis, mais il existe un [accord Royaume-Uni–États-Unis sur l'accès aux données](https://www.gov.uk/government/publications/uk-us-data-access-agreement-factsheet/policy-factsheet-on-the-uk-us-data-access-agreement). Il ne vise que la criminalité grave, et son article 4 interdit aux injonctions américaines de cibler des personnes situées au Royaume-Uni. Les utilisateurs situés dans l'UE ne bénéficient pas de cette clause. Un siège britannique ne suffit donc pas, à lui seul, à répondre au CLOUD Act.

La réponse, c'est l'auto-hébergement ou le cloud privé :

- **Auto-hébergement :** Authgear est open source sous licence Apache-2.0, avec toutes ses fonctionnalités. Vous pouvez l'installer chez OVHcloud, Scaleway, Hetzner ou STACKIT, et choisir vous-même vos prestataires d'e-mail et de SMS.
- **Cloud privé :** nous exploitons pour vous une instance dédiée dans la région de votre choix, y compris dans l'UE, avec un contrat signé avec notre société britannique.

Pour aller plus loin, consultez notre page sur la [souveraineté des données](/fr/solutions/data-sovereignty). Si vous utilisez Keycloak aujourd'hui, voyez notre [comparatif avec Keycloak](/fr/compare/keycloak-alternative). Notre [accord de traitement des données](/dpa) et la [liste de nos sous-traitants](/sub-processors) sont également en ligne (en anglais).

## Questions fréquentes

### Le CLOUD Act est-il applicable en France ?

Il ne s'applique pas aux entreprises françaises en tant que telles, mais à tout fournisseur soumis à la juridiction américaine. Si votre prestataire l'est, il peut être contraint de remettre les données qu'il contrôle, même si elles sont hébergées en France.

### Le CLOUD Act est-il compatible avec le RGPD ?

Les deux textes se contredisent en partie. L'article 48 du RGPD prévoit qu'une décision étrangère exigeant la communication de données personnelles n'est reconnue que si elle repose sur un accord international, comme un traité d'entraide judiciaire. Le CLOUD Act impose pourtant la communication. Le prestataire se retrouve pris entre les deux, et le responsable du traitement partage le risque.

### Le Data Privacy Framework protège-t-il contre le CLOUD Act ?

Non. Le Data Privacy Framework encadre les transferts de données personnelles vers des entreprises américaines certifiées. Il n'empêche pas une injonction adressée à un fournisseur américain. Le Tribunal de l'Union l'a validé le 3 septembre 2025 ; un pourvoi est pendant devant la Cour de justice (C-703/25 P).

### Quelle différence entre le CLOUD Act et le Data Act ?

Le CLOUD Act est une loi américaine. Le Data Act est un règlement européen applicable depuis le 12 septembre 2025. Son article 32 oblige les fournisseurs cloud à empêcher les accès étrangers illicites aux données non personnelles stockées dans l'UE. Les données de connexion étant en grande partie personnelles, c'est surtout le RGPD qui s'applique.

### Un service qualifié SecNumCloud est-il à l'abri du CLOUD Act ?

C'est l'objectif du chapitre 19.6 du référentiel de l'ANSSI : siège dans l'UE, capital extra-européen plafonné, et aucun tiers non européen ne doit pouvoir accéder techniquement aux données, y compris l'annuaire et les journaux. C'est aujourd'hui le critère le plus exigeant en Europe, mais il faut vérifier que le service précis que vous utilisez est qualifié.

### Comment réduire l'exposition au CLOUD Act pour l'authentification ?

Choisissez un fournisseur d'identité qui n'est pas soumis à la juridiction américaine et qui s'appuie sur une infrastructure européenne, ou hébergez vous-même la solution chez un hébergeur européen. Vérifiez aussi les sous-traitants, notamment pour l'envoi des e-mails et des SMS.

*Cet article est fourni à titre d'information générale et ne constitue pas un conseil juridique. À jour en septembre 2026.*
