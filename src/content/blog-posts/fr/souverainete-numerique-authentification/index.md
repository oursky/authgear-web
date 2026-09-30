---
title: "Souveraineté numérique : n'oubliez pas votre fournisseur d'identité"
excerpt: "La souveraineté numérique ne se joue pas que sur le cloud et la bureautique. Votre système d'authentification détient l'identité de tous vos utilisateurs et ouvre l'accès à tout le reste. Cinq dimensions à examiner, et les questions à poser à votre fournisseur."
coverImage: ./cover.webp
category: industry
featured: false
metaTitle: "Souveraineté numérique et authentification : le guide"
metaDescription: "Souveraineté numérique, cloud souverain, SecNumCloud : ce que ces notions changent pour votre fournisseur d'identité, et les questions à lui poser."
publishedAt: 2026-09-28
draft: false
faq:
  - q: "C'est quoi la souveraineté numérique ?"
    a: "C'est la capacité à décider et à agir de façon autonome dans l'espace numérique, en gardant la maîtrise de ses données, de ses réseaux et de ses outils. Pour une entreprise, cela revient à savoir où sont ses données, qui les exploite, quel droit s'applique à ses prestataires, et si elle peut en changer."
  - q: "Quels sont les 3 piliers de la stratégie nationale pour le cloud ?"
    a: "Présentée le 17 mai 2021, elle repose sur le label « cloud de confiance » (fondé sur la qualification SecNumCloud de l'ANSSI), la doctrine « cloud au centre » pour les administrations, et une politique industrielle de soutien à l'offre française."
  - q: "Quelle est la différence entre SecNumCloud et un cloud souverain ?"
    a: "« Cloud souverain » est une expression commerciale sans définition juridique. SecNumCloud est une qualification délivrée par l'ANSSI à un service précis, après audit, selon un référentiel public qui inclut la protection contre le droit extra-européen. Un cloud qualifié SecNumCloud peut se dire souverain ; l'inverse n'est pas garanti."
  - q: "Une entreprise privée est-elle obligée d'utiliser un cloud qualifié SecNumCloud ?"
    a: "Pas en règle générale. L'obligation issue de la loi SREN et du décret du 14 avril 2026 vise les administrations, opérateurs et certains groupements d'intérêt public de l'État pour leurs données d'une sensibilité particulière. Une entreprise qui fournit un service cloud à ces organismes pour ce type de données est en revanche concernée."
  - q: "Héberger son fournisseur d'identité en France suffit-il ?"
    a: "Non. La localisation n'est qu'une dimension. Il faut aussi savoir qui exploite le service, quel droit s'applique à cet exploitant et à sa maison mère, quels sous-traitants voient les données, et si vous pouvez partir avec vos utilisateurs."
  - q: "Un logiciel open source est-il souverain ?"
    a: "Il vous donne des leviers : lire le code, l'auditer, l'exploiter où vous voulez et ne pas dépendre d'un éditeur pour continuer. Mais la souveraineté dépend aussi de l'endroit où vous l'exploitez, de qui l'exploite et des services tiers branchés dessus."
---

> **tl;dr** — La souveraineté numérique, c'est garder la maîtrise de ses données, de ses outils et de ses prestataires. Pour un système d'authentification, elle se joue sur cinq plans : où sont les données, qui exploite le service, quel droit s'applique à l'exploitant, pouvez-vous partir, et quels sous-traitants voient passer vos utilisateurs. Un datacenter en France n'en couvre qu'un.

Quand une direction générale demande d'« aller vers le souverain », la DSI pense d'abord au stockage, à la messagerie et à la suite bureautique. Le système de connexion passe souvent après. C'est pourtant lui qui détient l'identité de tous vos utilisateurs, et c'est lui qui ouvre, ou ferme, l'accès à toutes vos autres applications.

Ce guide explique ce que recouvre la souveraineté numérique dans la politique française et européenne, ce que cela implique pour un fournisseur d'identité, et quelles questions poser avant de choisir.

## Ce que recouvre la souveraineté numérique

L'expression n'a pas de définition légale unique. La plus citée vient du rapport du Sénat [« Le devoir de souveraineté numérique »](https://www.senat.fr/rap/r19-007-1/r19-007-1_mono.html) (2019) : une « capacité autonome d'appréciation, de décision et d'action dans le cyberespace », et la capacité à « maîtriser nos données, nos réseaux et nos communications électroniques ».

Dans les faits, l'État l'a traduite en règles pour ses propres systèmes :

- **2021, stratégie nationale pour le cloud.** [Trois piliers](https://www.transformation.gouv.fr/files/presse/1002-Gouvernement-annonce-strategie-nationale-pour-le-cloud.pdf) : un label « cloud de confiance » fondé sur la qualification SecNumCloud, la doctrine « cloud au centre » pour les administrations, et un soutien industriel à l'offre française.
- **2023, doctrine actualisée.** La [circulaire n° 6404/SG du 31 mai 2023](https://www.legifrance.gouv.fr/circulaire/id/45446) précise quelles données de l'État, les plus sensibles, doivent être hébergées sur une offre qualifiée SecNumCloud ou équivalente, protégée des lois extra-européennes, sauf dérogation.
- **2024–2026, passage dans la loi.** L'article 31 de la loi SREN du 21 mai 2024 a donné une base légale à cette exigence. Son [décret d'application n° 2026-272 du 14 avril 2026](https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000053900789) vise les administrations, les opérateurs et six groupements d'intérêt public de l'État. Il impose notamment des règles sur la localisation des données et leur protection « contre tout accès par des autorités publiques d'un Etat tiers non autorisé ». Un [arrêté du 12 août 2026](https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000054678082) a fait du référentiel SecNumCloud 3.2 la grille de référence.

L'État mesure aussi ses dépendances : l'[Observatoire de la souveraineté numérique](https://www.strategie-plan.gouv.fr/actualites/lancement-de-lobservatoire-de-la-souverainete-numerique-mesurer-les-dependances-pour), lancé en janvier 2026, couvre le cloud, les données, l'IA et la cybersécurité.

Ces textes obligent le secteur public, pas les entreprises en général. Mais ils fixent le vocabulaire des appels d'offres, et beaucoup de clients privés reprennent les mêmes critères.

## Pourquoi l'identité mérite une place à part

Un service de stockage détient les fichiers de certains projets. Un fournisseur d'identité détient des informations sur **tous** vos utilisateurs :

- adresses e-mail, numéros de téléphone, noms ;
- empreintes de mots de passe, clés de passkeys, secrets MFA ;
- historique des connexions, avec adresse IP et appareil ;
- rôles, groupes et journaux d'audit.

Il a aussi un rôle de portier. Si vos applications sont hébergées en France mais que la connexion passe par un service que vous ne maîtrisez pas, c'est ce service qui décide qui entre.

L'État l'a bien compris. En 2024, la DINUM a lancé [ProConnect](https://www.numerique.gouv.fr/sinformer/espace-presse/identit%C3%A9-num%C3%A9rique--apr%C3%A8s-le-succ%C3%A8s-de-franceconnect-l%C3%A9tat-lance-proconnect-un-nouveau-service-dauthentification-unifi%C3%A9-pour-les-agents-publics-et-les-professionnels/), une fédération d'identité pour les agents publics et les professionnels, en complément de La Suite numérique. Remplacer la bureautique ne suffisait pas : il fallait aussi maîtriser la porte d'entrée.

## Les cinq dimensions de la souveraineté pour un système d'identité

### 1. Localisation : où sont les données ?

C'est la question la plus simple, et celle à laquelle tout le monde sait répondre. Précisez-la quand même : production, sauvegardes, journaux et environnements de reprise sont-ils tous dans la même région ? Une base en France avec des sauvegardes aux États-Unis n'est pas une base en France.

### 2. Exploitation : qui fait tourner le service ?

Qui administre les serveurs, applique les mises à jour, a accès à la production ? Et le support : depuis quels pays les équipes peuvent-elles se connecter à votre environnement, pour lire des journaux ou débloquer un compte ? Une région européenne exploitée depuis un autre continent reste accessible depuis cet autre continent.

### 3. Juridiction : quel droit s'applique à l'exploitant ?

C'est là que la localisation montre ses limites. Le CLOUD Act américain oblige les fournisseurs soumis au droit des États-Unis à remettre les données sous leur contrôle, où qu'elles soient stockées. En 2025, devant le Sénat, le directeur des affaires juridiques de Microsoft France a reconnu ne pas pouvoir garantir que des données de citoyens français ne seraient jamais transmises sans l'accord de la France. Nous détaillons le sujet dans notre article sur [le CLOUD Act et les fournisseurs d'identité](/fr/post/cloud-act-fournisseur-identite-donnees-connexion). À retenir : ce qui compte, c'est la société qui contrôle les données et celle qui la contrôle, pas l'adresse du datacenter.

### 4. Réversibilité : pouvez-vous partir ?

La souveraineté, c'est aussi la liberté de changer de prestataire. Le [Data Act européen](https://digital-strategy.ec.europa.eu/en/factpages/data-act-explained) encadre désormais ce départ pour les services cloud, SaaS compris : préavis de deux mois au plus, période de transition de 30 jours, export dans un format couramment utilisé et lisible par machine, et, à partir du 12 janvier 2027, plus de frais de changement ni de sortie.

Pour l'identité, un point est décisif : les empreintes de mots de passe. Si vous ne pouvez pas les exporter, chaque utilisateur devra réinitialiser son mot de passe le jour de la migration. Demandez-le avant de signer, pas au moment de partir. Un logiciel open source ajoute une garantie : même si l'éditeur disparaît ou change de cap, vous pouvez continuer à faire tourner le code.

### 5. Sous-traitants : qui d'autre voit passer vos utilisateurs ?

Un système d'authentification envoie des e-mails de vérification, des liens magiques, des codes par SMS ou WhatsApp. Ces messages passent par des prestataires tiers qui voient adresses, numéros et souvent le code lui-même. Il en va de même pour la protection anti-bot, l'analyse de risque ou la supervision. Un fournisseur d'identité européen qui envoie tous ses SMS via un service américain n'a réglé qu'une partie du problème.

## SecNumCloud : ce qu'il exige

SecNumCloud est la qualification de l'ANSSI pour les services cloud. C'est aujourd'hui le référentiel le plus exigeant en Europe sur la question de la juridiction. Son [chapitre 19.6](https://cyber.gouv.fr/sites/default/files/document/secnumcloud-referentiel-exigences-v3.2.pdf), « Protection vis-à-vis du droit extra-européen », impose entre autres :

- un siège et un établissement principal dans l'Union européenne ;
- un capital détenu au plus à 24 % par une entité non européenne, et à 39 % par l'ensemble des entités non européennes ;
- qu'aucun tiers non européen ne puisse techniquement accéder aux données, y compris les données techniques : identités des administrateurs, journaux, **annuaire**, certificats, configuration des accès.

Ce dernier point parle directement d'identité. L'annuaire et les journaux de connexion sont le cœur d'un fournisseur d'authentification.

Deux précisions utiles au moment de choisir :

- **La qualification porte sur un service précis**, pas sur une entreprise ni sur tout son catalogue. Vérifiez que l'offre que vous achetez figure bien sur la [liste de l'ANSSI](https://cyber.gouv.fr/offre-de-service/solutions-certifiees-et-qualifiees/services-de-securite-evalue/solutions-en-cours-de-qualification/prestataires-secnumcloud/).
- **Un logiciel hébergé sur une infrastructure qualifiée n'est pas qualifié pour autant.** Un SaaS installé sur un IaaS SecNumCloud profite d'une partie des garanties de l'infrastructure, mais pas de sa qualification.

## « Cloud souverain » : de quoi parle-t-on ?

« Cloud souverain » n'a pas de définition juridique. Le terme couvre des offres très différentes :

- **Des fournisseurs européens** qui exploitent leur propre technologie. Certains détiennent la qualification SecNumCloud pour une partie de leur catalogue.
- **Des coentreprises françaises utilisant la technologie d'un hyperscaler américain.** [S3NS](https://www.s3ns.io/actualite/s3ns-annonce-qualification-sec-num-cloud), société contrôlée par Thales et construite avec Google Cloud, a obtenu le 17 décembre 2025 la qualification SecNumCloud 3.2 pour son offre PREMI3NS. Elle est exploitée par les équipes de S3NS dans des datacenters en France. Bleu, détenue par Capgemini et Orange et fondée sur les technologies Microsoft, figure encore parmi les prestataires « en cours de qualification » sur le site de l'ANSSI à la fin septembre 2026.
- **Des régions « souveraines » des hyperscalers eux-mêmes**, comme l'AWS European Sovereign Cloud ouvert en janvier 2026 en Allemagne. L'exploitation y est européenne, mais la maison mère reste américaine.

Aucune de ces approches n'est bonne ou mauvaise en soi. Elles répondent différemment aux cinq dimensions ci-dessus. La bonne question n'est pas « est-ce souverain ? » mais « souverain sur quels points, et est-ce que ce sont ceux qui comptent pour nos données ? ».

## Et au niveau européen ?

- **EUCS**, le schéma européen de certification cloud, est en discussion [depuis 2020](https://www.enisa.europa.eu/publications/eucs-cloud-service-scheme). Il bute toujours sur les critères de souveraineté et n'est pas adopté.
- **Le Cloud and AI Development Act (CADA)**, [proposé par la Commission le 3 juin 2026](https://commission.europa.eu/news-and-media/news/strengthening-europes-tech-sovereignty-2026-06-03_en) dans son paquet sur la souveraineté technologique, prévoit un cadre européen commun pour évaluer la souveraineté des services cloud, avec des exigences graduées selon la sensibilité des usages du secteur public. Le texte est en négociation et peut encore beaucoup changer.
- **Le même paquet contient une stratégie open source**, qui vise à développer les alternatives ouvertes et leur adoption par les administrations.
- **Le Data Act** s'applique déjà, avec les règles de changement de fournisseur décrites plus haut.

## Les questions à poser à votre fournisseur d'identité

**Localisation**
- Dans quels pays sont stockées la production, les sauvegardes et les journaux ?
- Pouvons-nous choisir la région, et est-ce contractuel ?

**Exploitation**
- Qui a un accès administrateur à la production, et depuis où ?
- Le support peut-il accéder à nos données, et avec quelle traçabilité ?

**Juridiction**
- Quelle société signe le contrat, et où est le siège de sa maison mère ?
- Sur quelle infrastructure tourne le service, et à qui appartient-elle ?
- Comment traitez-vous une demande d'une autorité étrangère, et nous prévenez-vous ?

**Réversibilité**
- Pouvons-nous exporter tous les utilisateurs, empreintes de mots de passe et facteurs MFA compris ?
- Le logiciel est-il open source, et pouvons-nous l'exploiter nous-mêmes ?

**Sous-traitants**
- Quels sous-traitants voient des données utilisateurs ? La liste est-elle publique ?
- Pouvons-nous utiliser nos propres prestataires d'e-mail et de SMS ?

## Où se situe Authgear

Autant être clair. Authgear est développé par Skymakers Digital Limited, une société britannique. Le Royaume-Uni n'est pas dans l'Union européenne, même s'il bénéficie d'une décision d'adéquation de la Commission. Authgear n'est pas qualifié SecNumCloud.

Deux modes de déploiement, détaillés sur notre page [souveraineté des données](/fr/solutions/data-sovereignty), répondent aux cinq dimensions ci-dessus :

- **L'auto-hébergement.** Authgear est open source sous licence Apache-2.0, avec toutes ses fonctionnalités. Vous l'installez chez un hébergeur européen (OVHcloud, Scaleway, Hetzner, STACKIT) ou dans votre datacenter, et vous branchez vos propres prestataires d'e-mail, de SMS et de WhatsApp. Aucune entreprise américaine ne détient alors les données de vos utilisateurs. Authgear se déploie avec Helm sur Kubernetes : vous pouvez donc le faire tourner chez l'hébergeur de votre choix, y compris un hébergeur qualifié SecNumCloud. Authgear lui-même n'est pas qualifié ; vérifier que l'ensemble de votre déploiement répond aux exigences applicables reste de votre ressort.
- **Le cloud privé.** Nous exploitons pour vous une instance dédiée dans la région de votre choix, y compris dans l'UE, avec un contrat signé avec notre société britannique. Les données restent dans la région choisie ; l'exploitation, elle, est assurée par nos équipes.

Dans les deux cas, vous pouvez exporter vos utilisateurs à tout moment. Si vous utilisez Keycloak aujourd'hui, notre [comparatif avec Keycloak](/fr/compare/keycloak-alternative) détaille les différences. Notre [accord de traitement des données](/dpa) et la [liste de nos sous-traitants](/sub-processors) sont en ligne (en anglais).

Vous voulez vérifier ce que cela donne pour votre contexte ? Comparez les deux options sur notre page [souveraineté des données](/fr/solutions/data-sovereignty), ou [parlez-nous de votre projet](/fr/schedule-demo).

## Questions fréquentes

### C'est quoi la souveraineté numérique ?

C'est la capacité à décider et à agir de façon autonome dans l'espace numérique, en gardant la maîtrise de ses données, de ses réseaux et de ses outils. Pour une entreprise, cela revient à savoir où sont ses données, qui les exploite, quel droit s'applique à ses prestataires, et si elle peut en changer.

### Quels sont les 3 piliers de la stratégie nationale pour le cloud ?

Présentée le 17 mai 2021, elle repose sur le label « cloud de confiance » (fondé sur la qualification SecNumCloud de l'ANSSI), la doctrine « cloud au centre » pour les administrations, et une politique industrielle de soutien à l'offre française.

### Quelle est la différence entre SecNumCloud et un cloud souverain ?

« Cloud souverain » est une expression commerciale sans définition juridique. SecNumCloud est une qualification délivrée par l'ANSSI à un service précis, après audit, selon un référentiel public qui inclut la protection contre le droit extra-européen. Un cloud qualifié SecNumCloud peut se dire souverain ; l'inverse n'est pas garanti.

### Une entreprise privée est-elle obligée d'utiliser un cloud qualifié SecNumCloud ?

Pas en règle générale. L'obligation issue de la loi SREN et du décret du 14 avril 2026 vise les administrations, opérateurs et certains groupements d'intérêt public de l'État pour leurs données d'une sensibilité particulière. Une entreprise qui fournit un service cloud à ces organismes pour ce type de données est en revanche concernée.

### Héberger son fournisseur d'identité en France suffit-il ?

Non. La localisation n'est qu'une dimension. Il faut aussi savoir qui exploite le service, quel droit s'applique à cet exploitant et à sa maison mère, quels sous-traitants voient les données, et si vous pouvez partir avec vos utilisateurs.

### Un logiciel open source est-il souverain ?

Il vous donne des leviers : lire le code, l'auditer, l'exploiter où vous voulez et ne pas dépendre d'un éditeur pour continuer. Mais la souveraineté dépend aussi de l'endroit où vous l'exploitez, de qui l'exploite et des services tiers branchés dessus.

*Cet article est fourni à titre d'information générale et ne constitue pas un conseil juridique. À jour en septembre 2026.*
