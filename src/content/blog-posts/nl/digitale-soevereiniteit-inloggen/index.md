---
title: "Digitale soevereiniteit en inloggen: wie beheert jouw gebruikersdata?"
excerpt: "Over digitale soevereiniteit gaat het meestal over e-mail, documenten en de cloud. Maar je inlogsysteem bepaalt wie overal bij kan. Wat Den Haag in 2025 en 2026 besloot, wat de CLOUD Act betekent en vijf vragen voor je identity provider."
coverImage: ./cover.webp
category: industry
featured: false
metaTitle: "Digitale soevereiniteit: wie beheert je inlogdata?"
metaDescription: "Digitale soevereiniteit voor je inlogsysteem: het nieuwe Rijkscloudbeleid, de CLOUD Act, soevereine cloud, Europese alternatieven en vijf vragen voor je IdP."
publishedAt: 2026-10-23
draft: false
faq:
  - q: "Wat is digitale soevereiniteit?"
    a: "Het kabinet beschrijft het in zijn visie van december 2025 als grip houden op de digitale infrastructuur die je gebruikt. Daarnaast noemt het digitale autonomie: zelf kunnen kiezen welke technologie je gebruikt en kunnen overstappen als een leverancier uitvalt of niet aan de eisen voldoet. Het gaat dus niet om alles zelf doen, maar om controle en echte keuzes."
  - q: "Wat is een soevereine cloud?"
    a: "Er is geen vaste definitie of keurmerk. Splits de vraag daarom in drie delen: waar staan de gegevens, wie beheert de cloud en onder welk recht valt de beheerder. Veel aanbiedingen met het label 'soeverein' lossen alleen de eerste twee op."
  - q: "Is een datacenter in Nederland genoeg?"
    a: "Nee. De locatie is maar één van de vragen. Valt je aanbieder onder Amerikaans recht, dan kan de CLOUD Act hem verplichten gegevens af te geven, ook als de servers in Amsterdam staan. Kijk ook naar wie het systeem beheert, wie er nog meer meekijkt en of je kunt overstappen."
  - q: "Wat zegt het Rijkscloudbeleid over Amerikaanse clouddiensten?"
    a: "Het herziene rijksbrede cloudbeleid van 3 juli 2026 raadt kritieke Rijksorganisaties af om voor hun kerntaken diensten te gebruiken van aanbieders die onder wetgeving buiten de EU of EER vallen. Voor e-mail en documentbeheer raadt het kabinet publieke clouddiensten helemaal af. Voor belangrijk cloudgebruik is een exitplan verplicht. Het beleid geldt voor de Rijksoverheid, niet voor bedrijven."
  - q: "Is open source automatisch soeverein?"
    a: "Niet vanzelf. Open broncode maakt je onafhankelijk van de leverancier: je kunt de software controleren, aanpassen en zelf draaien. Soeverein wordt het pas als ook de infrastructuur, de beheerder en de partijen die meeverwerken passen bij jouw eisen."
---

> **tl;dr** — Digitale soevereiniteit betekent dat je zelf de regie houdt over je IT en kunt overstappen naar een andere leverancier. Bij je inlogsysteem draait dat om vijf vragen: waar staan de gegevens, wie beheert het systeem, onder welk recht valt de beheerder, kun je weg, en wie verwerkt er nog meer mee? Een datacenter in Nederland beantwoordt alleen de eerste.

In mei 2026 verbood de staatssecretaris van Economische Zaken de overname van Solvinity door het Amerikaanse Kyndryl. Solvinity levert het [infrastructuurplatform voor een deel van de diensten van Logius](https://www.logius.nl/over-ons/onze-organisatie/informatie-leverancier-solvinity), waaronder DigiD en MijnOverheid. Het platform wordt opnieuw aanbesteed, en wel via de [Aanbestedingswet Defensie en Veiligheid](https://www.rijksoverheid.nl/actueel/nieuws/2026/06/04/nieuwe-aanbesteding-platform-digid-via-aanbestedingswet-defensie), omdat die meer mogelijkheden biedt om risico's voor de nationale veiligheid te beperken.

Dat het debat juist bij DigiD zo scherp werd, is geen toeval. Het inlogsysteem is de voordeur naar al het andere. Dat geldt voor de overheid, maar ook voor jouw SaaS-product, je klantportaal of je interne systemen. Je identity provider (het systeem dat bepaalt wie mag inloggen) bewaart e-mailadressen, wachtwoord-hashes, MFA-gegevens en de inloggeschiedenis van al je gebruikers.

Dit artikel legt uit wat de overheid onder digitale soevereiniteit verstaat, wat er in 2025 en 2026 is besloten, wat een "soevereine cloud" wel en niet oplost en welke vragen je je identity provider moet stellen.

## Wat betekent digitale soevereiniteit?

Het kabinet maakt in de [Visie Digitale Autonomie en Soevereiniteit van de Overheid](https://www.rijksoverheid.nl/actueel/nieuws/2025/12/12/nieuwe-visie-legt-fundament-voor-een-autonome-en-soevereine-digitale-overheid) van 12 december 2025 onderscheid tussen twee begrippen:

- **Digitale autonomie:** de overheid kan zelf kiezen welke technologie ze gebruikt, en kan overstappen als een leverancier uitvalt of niet aan de eisen voldoet.
- **Digitale soevereiniteit:** de overheid heeft grip op de digitale infrastructuur waar ze zelf gebruik van maakt.

Staatssecretaris Van Marum zei erbij: "Het gaat er niet om alles zelf doen, maar dat we zélf kunnen kiezen en controle houden." Volledige onafhankelijkheid bestaat niet. Het doel is slimme keuzes kunnen maken. Open standaarden en open source noemt de visie als middel om lock-in te voorkomen.

Die twee begrippen werken ook goed voor een bedrijf. Soevereiniteit gaat over wie de controle heeft. Autonomie gaat over of je kunt vertrekken.

## Wat Den Haag in 2025 en 2026 besloot

- **Januari 2025: kritiek van de Rekenkamer.** In [Het Rijk in de cloud](https://www.rekenkamer.nl/actueel/nieuws/2025/01/15/rijk-ging-zonder-afwegingen-de-cloud-in) concludeerde de Algemene Rekenkamer dat bij 84 van de 126 belangrijkste publieke clouddiensten van het Rijk geen risicoafweging was gemaakt. Een van de genoemde risico's: buitenlandse regeringen, met name de VS, die informatie van de Rijksoverheid kunnen inzien.
- **Juni 2025: 30% Nederlands-Europees.** De Tweede Kamer nam een [motie](https://zoek.officielebekendmakingen.nl/kst-36574-5.html) aan met als doel dat per 2029 minstens 30% van de cloudopslag en -applicaties van de Rijksoverheid van Nederlands-Europese bodem komt.
- **December 2025: de visie.** Het kabinet stelde de visie op digitale autonomie en soevereiniteit vast, met onder meer strenger cloudbeleid en meer open standaarden en open source.
- **Juli 2026: nieuw Rijkscloudbeleid.** Het [herziene rijksbrede cloudbeleid](https://www.rijksoverheid.nl/actueel/nieuws/2026/07/03/strengere-regels-voor-het-gebruik-van-clouddiensten-door-de-rijksoverheid) vraagt Rijksorganisaties rekening te houden met geopolitieke risico's en afhankelijkheid van één leverancier. Kritieke organisaties wordt afgeraden voor hun kerntaken diensten te gebruiken van aanbieders die onder wetgeving buiten de EU of EER vallen. Voor e-mail en documentbeheer raadt het kabinet publieke clouddiensten helemaal af. Bestaande diensten krijgen vier jaar om zich aan te passen.

Het [beleidsdocument](https://www.tweedekamer.nl/downloads/document?id=2026D35295) bevat ook een eis die voor elk bedrijf nuttig is: bij belangrijk cloudgebruik is een getoetst exitplan verplicht. Dat plan beschrijft twee scenario's. Een geplande overstap naar een andere leverancier of naar eigen beheer. En een plotselinge uitval, waarbij je je dienst toch moet kunnen voortzetten.

Deze regels gelden voor de Rijksoverheid, niet voor bedrijven. Maar ze bepalen wel de woorden en eisen in aanbestedingen. Lever je aan de overheid, dan krijg je dezelfde vragen vroeg of laat ook.

## Waarom inloggen erbij hoort

Een opslagdienst bewaart de bestanden van een paar projecten. Een identity provider bewaart gegevens over **al** je gebruikers:

- namen, e-mailadressen en telefoonnummers;
- wachtwoord-hashes, passkeys en MFA-gegevens;
- inloggeschiedenis, met IP-adres en apparaat;
- rollen, groepen en auditlogs.

Daarnaast is het de portier. Draaien je applicaties in Nederland, maar loopt het inloggen via een dienst die je niet in de hand hebt, dan bepaalt die dienst wie binnenkomt. Valt hij uit of sluit hij je af, dan ligt alles stil.

Overstappen is bij inloggen ook lastiger dan bij andere diensten. Wachtwoord-hashes, MFA-registraties en koppelingen met andere systemen moeten allemaal mee. Daarom loont het om je identity provider net zo kritisch te bekijken als je cloudinfrastructuur.

## Vijf vragen voor je inlogsysteem

### 1. Waar staan de gegevens?

Dit is de bekendste vraag en de makkelijkste. Kijk niet alleen naar de productiedatabase, maar ook naar back-ups, logs, monitoring en analysegegevens. Een EU-regio voor de database helpt weinig als de logs naar een andere regio worden gekopieerd.

### 2. Wie beheert het systeem?

Wie heeft beheerderstoegang tot servers en database? Vanuit welke landen werkt de support, en worden die toegangen gelogd? Host je zelf, dan is dat je eigen team. Bij een beheerde dienst is het de leverancier, en vaak ook diens onderaannemers.

### 3. Onder welk recht valt de beheerder?

Hier zit het verschil tussen dataresidentie (waar de data staat) en soevereiniteit (wie er de baas over is). De Amerikaanse [CLOUD Act](https://www.justice.gov/criminal/cloud-act-resources) verplicht aanbieders die onder Amerikaans recht vallen om gegevens af te geven die zij in hun bezit of onder controle hebben, ongeacht waar de servers staan.

Dat botst met de AVG, de Nederlandse naam voor de GDPR. Volgens [artikel 48 AVG](https://eur-lex.europa.eu/eli/reg/2016/679/oj/nld) mag een buitenlandse rechter of overheid alleen om doorgifte vragen op basis van een internationaal verdrag, zoals een rechtshulpverdrag. Een Amerikaanse aanbieder kan dus tussen twee wetten in komen te zitten. Kijk daarom naar het moederbedrijf, niet alleen naar de Nederlandse of Ierse dochter.

### 4. Kun je overstappen?

Zonder exit geen soevereiniteit. Vraag:

- Kun je alle gebruikers exporteren, inclusief wachtwoord-hashes, zodat niemand zich opnieuw hoeft te registreren?
- Gebruikt het systeem open standaarden zoals OpenID Connect (OIDC), SAML en LDAP? Of hangen je apps vast aan een eigen SDK van de leverancier?
- Is de broncode open, zodat je de software desnoods zelf kunt blijven draaien?

De EU [Data Act](https://eur-lex.europa.eu/eli/reg/2023/2854/oj/nld) helpt hierbij. Sinds 12 september 2025 moeten aanbieders van gegevensverwerkingsdiensten overstappen mogelijk maken, met onder meer een opzegtermijn van hooguit twee maanden. Vanaf 12 januari 2027 mogen ze daar geen kosten meer voor rekenen. Vraag je leverancier hoe dat voor je inlogdienst geldt.

### 5. Wie verwerkt er nog meer mee?

Een inlogsysteem werkt zelden alleen. Eenmalige codes en magic links gaan via e-mail- en sms-diensten die telefoonnummers en adressen zien. Botbescherming, monitoring en back-ups komen vaak van weer andere partijen. Vraag de volledige lijst met subverwerkers op en stel elke partij vraag 1 tot en met 3.

## Soevereine cloud en Europese alternatieven

"Soeverein" is geen beschermd begrip. Het label zegt dus weinig zonder uitleg. Scheid daarom drie dingen: waar de data staat, wie de cloud beheert en welk recht er geldt voor de beheerder.

Grofweg zie je twee soorten aanbod:

- **Europese aanbieders** hebben hun hoofdkantoor in de EU. Locatie, beheer en toepasselijk recht liggen dan in Europa. Blijf wel vragen welke software en welke toeleveranciers zij gebruiken.
- **Soevereine varianten van Amerikaanse clouds** draaien in Europa, met Europese entiteiten en personeel. Die lossen vooral locatie en beheer op. Het moederbedrijf blijft Amerikaans.

Beide hebben hun plek. Wat bij jou past, hangt af van je risicoanalyse. Ook de overheid zelf zoekt nog: volgens het nieuwe Rijkscloudbeleid wordt het beleid weer aangepast zodra er een eigen soevereine overheidscloud is.

Voor inloggen geldt hetzelfde als voor elke andere applicatie. Een Europese identity provider die op een Amerikaanse hyperscaler draait, verschuift de vraag alleen een laag naar beneden.

## Checklist voor je identity provider

**Datalocatie**
- In welke landen staan productiedata, back-ups en logs?
- Kunnen we de regio contractueel vastleggen?

**Beheer**
- Wie heeft beheerderstoegang, en vanwaar werkt de support?
- Worden supporttoegangen gelogd en aan ons gemeld?

**Rechtsgebied**
- Met welk bedrijf sluiten we het contract, en waar zit het moederbedrijf?
- Op wiens infrastructuur draait de dienst?
- Hoe ga je om met verzoeken van overheden, en informeer je ons?

**Overstappen**
- Kunnen we alle gebruikers exporteren, met wachtwoord-hashes en MFA-gegevens?
- Welke open standaarden worden ondersteund (OIDC, SAML, LDAP)?
- Is de software open source, en kunnen we haar zelf draaien?
- Past dit in ons exitplan, voor een geplande overstap én voor plotselinge uitval?

**Subverwerkers**
- Wie verstuurt e-mail en sms?
- Welke andere diensten zien gebruikersgegevens, en waar zitten ze?

## Hoe Authgear je helpt

Authgear wordt gemaakt door een Brits bedrijf. Het Verenigd Koninkrijk hoort niet bij de EU. Dat is goed om te weten voordat je verder leest.

Voor soeverein beheer van je inlogsysteem heb je bij Authgear twee opties.

- **Zelf hosten.** Authgear is open source onder de Apache-2.0-licentie, met alle functies. Je draait het bij een hostingpartij naar keuze of in je eigen datacenter. De database is dan van jou. Kies je een Europese hostingpartij of je eigen datacenter, dan beheert geen Amerikaans bedrijf de gegevens van je gebruikers. Je kiest zelf je e-mail- en sms-dienst.
- **Private cloud.** Een eigen omgeving, alleen voor jou, in de regio die jij kiest, ook in de EU. Wij beheren het voor je. Je kunt auditrechten over je omgeving vastleggen.

Authgear werkt met open standaarden zoals OIDC en SAML, en koppelt met LDAP en Active Directory. Stap je over van een ander systeem? Je kunt gebruikers importeren met hun bestaande bcrypt-wachtwoord-hashes, zodat niemand een nieuw wachtwoord hoeft te kiezen.

Wil je zien hoe dit in een ander land speelt? Lees onze gids over [datasoevereiniteit in het Verenigd Koninkrijk](/post/uk-data-sovereignty-login-identity) (in het Engels). Wil je weten of zelf hosten of een private cloud past bij jouw eisen? Vergelijk de opties op onze pagina over [datasoevereiniteit](/solutions/data-sovereignty).

## Veelgestelde vragen

### Wat is digitale soevereiniteit?

Het kabinet beschrijft het in zijn visie van december 2025 als grip houden op de digitale infrastructuur die je gebruikt. Daarnaast noemt het digitale autonomie: zelf kunnen kiezen welke technologie je gebruikt en kunnen overstappen als een leverancier uitvalt of niet aan de eisen voldoet. Het gaat dus niet om alles zelf doen, maar om controle en echte keuzes.

### Wat is een soevereine cloud?

Er is geen vaste definitie of keurmerk. Splits de vraag daarom in drie delen: waar staan de gegevens, wie beheert de cloud en onder welk recht valt de beheerder. Veel aanbiedingen met het label 'soeverein' lossen alleen de eerste twee op.

### Is een datacenter in Nederland genoeg?

Nee. De locatie is maar één van de vragen. Valt je aanbieder onder Amerikaans recht, dan kan de CLOUD Act hem verplichten gegevens af te geven, ook als de servers in Amsterdam staan. Kijk ook naar wie het systeem beheert, wie er nog meer meekijkt en of je kunt overstappen.

### Wat zegt het Rijkscloudbeleid over Amerikaanse clouddiensten?

Het herziene rijksbrede cloudbeleid van 3 juli 2026 raadt kritieke Rijksorganisaties af om voor hun kerntaken diensten te gebruiken van aanbieders die onder wetgeving buiten de EU of EER vallen. Voor e-mail en documentbeheer raadt het kabinet publieke clouddiensten helemaal af. Voor belangrijk cloudgebruik is een exitplan verplicht. Het beleid geldt voor de Rijksoverheid, niet voor bedrijven.

### Is open source automatisch soeverein?

Niet vanzelf. Open broncode maakt je onafhankelijk van de leverancier: je kunt de software controleren, aanpassen en zelf draaien. Soeverein wordt het pas als ook de infrastructuur, de beheerder en de partijen die meeverwerken passen bij jouw eisen.

*Dit artikel is algemene informatie en geen juridisch advies. Stand van zaken: oktober 2026.*
