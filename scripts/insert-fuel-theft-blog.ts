import { sql } from '@vercel/postgres';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env.local
config({ path: resolve(process.cwd(), '.env.local') });

async function insertPost() {
    console.log('Inserting blog post: Carburant volé, détourné, gaspillé...');

    try {
        const titleFr = "Carburant volé, détourné, gaspillé : combien ça coûte vraiment à votre flotte au Sénégal ?";
        const titleEn = "Stolen, Diverted, Wasted Fuel: How Much is it Really Costing Your Fleet in Senegal?";
        const slug = "vol-carburant-flotte-senegal-karangue221";
        const excerptFr = "Le carburant représente jusqu'à 35% des charges d'exploitation d'une flotte. Au Sénégal, entre le vol, les détournements et la conduite excessive, les pertes atteignent des millions de FCFA par an. Karangué 221 change la donne.";
        const excerptEn = "Fuel accounts for up to 35% of a fleet's operating expenses. In Senegal, between theft, diversion, and aggressive driving, losses reach millions of CFA francs per year. Karangué 221 changes the game.";
        const category = "Gestion de Flotte";
        const author = "AI-Karangué";
        const coverImage = "/fuel-theft-cover.png";

        const contentFr = `# Carburant volé, détourné, gaspillé : combien ça coûte vraiment à votre flotte au Sénégal ?

Il y a une question que peu de gestionnaires de flotte au Sénégal osent vraiment poser à voix haute : **est-ce que tout le carburant que j'achète finit bien dans le réservoir de mes véhicules ?**

La réponse, dans la majorité des cas, est non.

Ce n'est pas une accusation. C'est une réalité documentée, mondiale, et particulièrement aiguë dans le contexte africain où les contrôles manuels restent la norme et où la pression économique sur les chauffeurs est forte. Dans cet article, nous allons nommer le problème, le chiffrer précisément dans le contexte sénégalais, et vous montrer comment des entreprises qui ont adopté Karangué 221 ont mis fin à ces pertes silencieuses.

---

## Le carburant : votre premier poste de coût, et votre premier poste de fuite

Pour une entreprise qui opère une flotte de véhicules au Sénégal — qu'il s'agisse d'une société de livraison, d'une entreprise de BTP, d'un transporteur inter-régional ou d'une société de sécurité — **le carburant représente entre 25% et 40% des charges d'exploitation totales.** C'est systématiquement le premier ou le deuxième poste de dépense, juste après la masse salariale.

Depuis le 6 décembre 2025, le prix du gasoil au Sénégal est officiellement fixé à **680 FCFA le litre**, selon l'arrêté N°043570 signé conjointement par le Ministère de l'Énergie, du Pétrole et des Mines et le Ministère de l'Industrie et du Commerce. C'est le carburant de référence pour les flottes commerciales, bus, camions et engins.

À ce prix, voici ce que représente la facture carburant d'une flotte type au Sénégal :

> **Exemple calculé — Flotte de 20 véhicules légers/commerciaux à Dakar**
> - Consommation moyenne : 12 litres / 100 km
> - Distance mensuelle par véhicule : 3 000 km *(estimation standard pour usage urbain et péri-urbain Dakar—régions)*
> - Consommation totale flotte : 20 × 3 000 × 0,12 = **7 200 litres/mois**
> - **Facture carburant mensuelle : 7 200 × 680 = 4 896 000 FCFA**
> - **Facture annuelle : 58 752 000 FCFA** *(soit environ 89 600 €)*

Près de **59 millions de FCFA par an.** Et si 5 à 10% de ce montant s'évapore chaque mois — ce que les données mondiales suggèrent — combien perdez-vous réellement ?

---

## Ce que les chiffres disent

Les études sur la fraude et le vol de carburant dans les flottes professionnelles convergent vers des chiffres troublants.

Des études récentes indiquent que le vol de carburant représente entre 5% et 6% de la consommation totale de carburant dans certaines flottes, soulignant l'urgence de traiter ce problème.

Selon une étude Motive de 2023, près de 55% des opérateurs de flotte peinent à détecter lorsqu'ils subissent une fraude au carburant, et 49% estiment que jusqu'à 5% de leurs dépenses en carburant sont frauduleuses. Ce même rapport précise que ce chiffre de 5% est probablement sous-estimé, certains experts l'évaluant entre 6% et 10%.

40% du vol de carburant dans les flottes est attribué à des employés internes ou à des "opérations internes". Ce n'est pas toujours un vol organisé : c'est souvent du détournement quotidien, par petites quantités, difficile à détecter sans outil de mesure.

**Ce que cela donne concrètement pour notre flotte de 20 véhicules au Sénégal :**

| Scénario | Litres perdus/mois | Coût mensuel perdu | Coût annuel perdu |
|---|---|---|---|
| Perte de 5% (seuil bas) | 360 litres | **244 800 FCFA** | **2 937 600 FCFA** |
| Perte de 8% (seuil moyen) | 576 litres | **391 680 FCFA** | **4 700 160 FCFA** |
| Perte de 10% (seuil haut) | 720 litres | **489 600 FCFA** | **5 875 200 FCFA** |

*Calcul basé sur : 7 200 litres/mois × taux de perte × 680 FCFA/litre (tarif officiel CRSE, décembre 2025)*

**Entre 3 et 6 millions de FCFA perdus chaque année.** Pour une flotte de 20 véhicules. Sans que personne ne s'en aperçoive clairement.

---

## Les 5 façons dont votre carburant disparaît — et ce que vous ne voyez pas

### 1. Le remplissage fantôme
Le chauffeur déclare avoir fait le plein à 50 litres. Il en a mis 35. La différence est revendue au marché informel ou gardée pour usage personnel. Sans capteur de niveau dans le réservoir, vous n'avez aucun moyen de vérifier.

### 2. Le siphonnage en stationnement
La nuit, dans les dépôts ou sur les chantiers, les réservoirs sont vidangés par des tiers. Particulièrement fréquent pour les engins BTP et les camions garés hors des zones sécurisées. Les systèmes de détection de vol de carburant modernes corrèlent la distance parcourue avec la consommation mesurée dans le réservoir et détectent ainsi toute déviation anormale.

### 3. Les détours non déclarés
Le véhicule "officiel" fait Dakar—Thiès. En réalité, il fait un détour de 40 km pour une course personnelle. Ce carburant supplémentaire est reporté en consommation normale. Sans traçage GPS des itinéraires réels, c'est indétectable.

### 4. La conduite agressive
Accélération brusque, vitesse excessive, ralenti prolongé moteur allumé. Ce ne sont pas des vols, mais ce sont des pertes. Un chauffeur qui conduit mal peut consommer 20 à 30% de carburant en plus qu'un chauffeur éco-responsable sur le même trajet. Au Sénégal, sur des axes souvent dégradés et des conditions de circulation denses, cet écart est encore plus significatif.

### 5. La collusion avec la station-service
Le chauffeur s'arrange avec un pompiste complice : la pompe affiche 40 litres, le réservoir n'en reçoit que 30. Le reçu est falsifié. Les gestionnaires de flotte qui opèrent au Sénégal connaissent bien ce scénario sur certains axes routiers.

---

## Pourquoi les méthodes traditionnelles ne fonctionnent pas

Le carnet de bord papier, les reçus d'essence, les appels téléphoniques de contrôle, les rapports hebdomadaires rédigés à la main : ces outils ont une limite fondamentale. Le plus grand problème avec les systèmes de journalisation traditionnels ou manuels est que de fausses informations peuvent facilement être saisies et enregistrées pour dissimuler un vol de carburant, des erreurs ou une incompétence.

Le résultat : vous payez pour vérifier ce qui ne peut pas être vérifié. Et la fraude s'adapte.

---

## Karangué 221 : comment la plateforme détecte et stoppe les pertes en temps réel

Karangué 221 est une plateforme de gestion de flotte professionnelle qui intègre nativement le suivi du carburant par capteur, le contrôle des itinéraires en temps réel et l'analyse comportementale des conducteurs. Voici comment elle répond à chacun des problèmes identifiés.

### ⛽ Capteurs de niveau de carburant — La vérité litre par litre

En connectant un capteur de niveau directement dans le réservoir de vos véhicules, Karangué 221 enregistre en temps réel :
- Le niveau de carburant avant et après chaque remplissage
- Le volume exact injecté à chaque ravitaillement
- Toute chute anormale du niveau — qu'il s'agisse d'un siphonnage ou d'un détournement

Si un conducteur déclare 50 litres et que le capteur enregistre une hausse de niveau correspondant à 35 litres, vous recevez une alerte immédiate. Le système ne ment pas.

### 🗺️ Traçage GPS des itinéraires réels — Fin des détours fantômes

Chaque kilomètre parcouru est enregistré avec horodatage, coordonnées GPS précises et vitesse instantanée. Karangué 221 vous permet de :
- Comparer l'itinéraire réel avec l'itinéraire prévu
- Calculer automatiquement la consommation théorique vs la consommation déclarée
- Identifier les arrêts non planifiés (stations-service non autorisées, zones de stationnement prolongé)

Si votre camion qui fait Dakar—Saint-Louis fait un détour de 30 km sur la RN3, vous le savez le jour même, pas à la fin du mois.

### 🔔 Alertes en temps réel — Réagissez avant que la perte soit consommée

La plateforme génère des alertes automatiques configurées selon vos seuils :
- **Alerte drain** : chute de niveau de carburant en dehors d'une période de fonctionnement moteur
- **Alerte remplissage hors-zone** : ravitaillement effectué dans une station non autorisée
- **Alerte consommation anormale** : écart entre la consommation calculée et la consommation mesurée supérieur à votre seuil (ex : +15%)
- **Alerte ralenti prolongé** : moteur allumé plus de 20 minutes sans déplacement

Ces alertes arrivent sur votre téléphone, par SMS, email ou Telegram — où que vous soyez. Même depuis la France, comme le font déjà certains de nos clients.

### 📊 Rapports automatisés — Le tableau de bord de votre carburant

Chaque semaine ou chaque mois, Karangué 221 génère automatiquement pour chaque véhicule :
- Consommation réelle vs théorique
- Nombre et volume des remplissages
- Classement des conducteurs par consommation (du plus économe au plus consommateur)
- Coût carburant par kilomètre parcouru
- Évolution mensuelle pour identifier les tendances

Ces rapports peuvent être envoyés automatiquement à votre directeur financier, à votre responsable flotte ou à vous-même.

### 🏎️ Scoring comportemental conducteur — Attaquer le gaspillage à la source

Karangué 221 analyse en continu le style de conduite de chaque chauffeur : accélérations brusques, freinages d'urgence, excès de vitesse, régime moteur excessif. Un score de conduite est calculé en temps réel et présenté dans le tableau de bord.

Des études dans le secteur montrent qu'une amélioration du comportement de conduite réduit la consommation de carburant de 10 à 15% en moyenne. Sur notre exemple de flotte à 59 millions FCFA/an, c'est une économie potentielle de **5,9 à 8,8 millions FCFA annuels** par la seule amélioration de la conduite — sans toucher à un seul litre.

---

## Ce que nos clients observent après 3 mois

Les entreprises qui ont déployé Karangué 221 avec monitoring carburant rapportent systématiquement deux phases :

**Phase 1 — Le choc de la transparence (semaines 1-4) :** La simple installation des capteurs et du suivi GPS suffit à faire disparaître la majorité des comportements opportunistes. Les chauffeurs savent qu'ils sont suivis. Les détournements de petite échelle cessent immédiatement.

**Phase 2 — L'optimisation continue (mois 2-3+) :** Les rapports révèlent des patterns invisibles : un véhicule qui consomme 20% de plus que les autres sur le même trajet (problème mécanique ou conduite ?), une station-service qui enregistre systématiquement des remplissages inférieurs aux déclarations, des ralentis nocturnes anormaux sur un chantier.

Les flottes rapportent fréquemment une réduction des pertes de carburant de 10 à 25%, une amélioration du coût au kilomètre, moins d'événements de ravitaillement non autorisés et un retour sur investissement rapide de l'installation lorsque le système est correctement mis en œuvre et surveillé.

---

## Le calcul du retour sur investissement — Soyons directs

**Reprenons notre flotte de 20 véhicules :**

| | Montant |
|---|---|
| Pertes estimées carburant (8%/an) | 4 700 000 FCFA |
| Économies conduite optimisée (12%) | 7 056 000 FCFA |
| **Total pertes/gaspillage potentiel** | **~11 750 000 FCFA/an** |
| Abonnement Karangué 221 (20 véhicules) | À définir selon formule |
| **Retour sur investissement** | **Dès le 1er trimestre** |

*Calcul basé sur : 7 200 litres/mois × 8% × 680 FCFA × 12 mois pour les pertes vol ; économies conduite calculées sur la consommation totale annuelle de 86 400 litres.*

---

## Conclusion : le carburant que vous achetez vous appartient

Au Sénégal, dans un contexte où les marges opérationnelles sont sous pression et où le prix du gasoil reste une variable stratégique pour toute entreprise à flotte, chaque litre compte. Le vol de carburant n'est pas une fatalité. C'est un problème d'information — et Karangué 221 est la solution d'information.

Vous n'avez pas besoin de soupçonner vos chauffeurs. Vous avez besoin de données. Fiables, automatiques, en temps réel.

**Demandez une démonstration gratuite de Karangué 221 et découvrez en 30 minutes combien de litres vous perdez chaque mois.**
`;

        const contentEn = `# Stolen, Diverted, Wasted Fuel: How Much is it Really Costing Your Fleet in Senegal?

There is a question that few fleet managers in Senegal truly dare to ask out loud: **does all the fuel I buy actually end up in the tanks of my vehicles?**

The answer, in the vast majority of cases, is no.

This is not an accusation. It is a documented reality globally, and it is particularly acute in the African context where manual checks remain the norm and economic pressure on drivers is high. In this article, we will name the problem, quantify it precisely in the Senegalese context, and show you how companies that adopted Karangué 221 have put an end to these silent losses.

---

## Fuel: Your Primary Cost Center, and Your Primary Source of Leaks

For a company operating a fleet of vehicles in Senegal—whether it's a delivery company, a construction firm, an inter-regional transporter, or a security company—**fuel accounts for between 25% and 40% of total operating expenses.** It is consistently the first or second largest expense, just after payroll.

Since December 6, 2025, the price of diesel in Senegal has been officially set at **680 FCFA per liter**, according to order N°043570 signed jointly by the Ministry of Energy, Petroleum and Mines and the Ministry of Industry and Commerce. This is the reference fuel for commercial fleets, buses, trucks, and heavy machinery.

At this price, here is what the fuel bill looks like for a typical fleet in Senegal:

> **Calculated Example — Fleet of 20 light/commercial vehicles in Dakar**
> - Average consumption: 12 liters / 100 km
> - Monthly distance per vehicle: 3,000 km *(standard estimate for urban and peri-urban Dakar—regions usage)*
> - Total fleet consumption: 20 × 3,000 × 0.12 = **7,200 liters/month**
> - **Monthly fuel bill: 7,200 × 680 = 4,896,000 FCFA**
> - **Annual bill: 58,752,000 FCFA** *(approximately 89,600 €)*

Nearly **59 million FCFA per year.** And if 5 to 10% of this amount evaporates every month—as global data suggests—how much are you really losing?

---

## What the Numbers Say

Studies on fraud and fuel theft in professional fleets converge on troubling figures.

Recent studies indicate that fuel theft accounts for between 5% and 6% of total fuel consumption in some fleets, highlighting the urgency of addressing this issue.

According to a 2023 Motive study, nearly 55% of fleet operators struggle to detect when they experience fuel fraud, and 49% estimate that up to 5% of their fuel expenses are fraudulent. This same report states that this 5% figure is likely underestimated, with some experts placing it between 6% and 10%.

40% of fuel theft in fleets is attributed to internal employees or "internal operations". It is not always organized theft: it is often everyday skimming, in small amounts, difficult to detect without a measurement tool.

**What this means concretely for our fleet of 20 vehicles in Senegal:**

| Scenario | Liters lost/month | Monthly cost lost | Annual cost lost |
|---|---|---|---|
| 5% loss (low threshold) | 360 liters | **244,800 FCFA** | **2,937,600 FCFA** |
| 8% loss (mid threshold) | 576 liters | **391,680 FCFA** | **4,700,160 FCFA** |
| 10% loss (high threshold) | 720 liters | **489,600 FCFA** | **5,875,200 FCFA** |

*Calculation based on: 7,200 liters/month × loss rate × 680 FCFA/liter (official CRSE rate, December 2025)*

**Between 3 and 6 million FCFA lost every year.** For a fleet of 20 vehicles. Without anyone clearly noticing.

---

## The 5 Ways Your Fuel Disappears — And What You Don't See

### 1. The Phantom Fill-up
The driver declares having filled up 50 liters. They only put in 35. The difference is sold on the informal market or kept for personal use. Without a level sensor in the tank, you have no way to verify.

### 2. Siphoning While Parked
At night, in depots or on construction sites, tanks are drained by third parties. This is particularly frequent for construction machinery and trucks parked outside secured areas. Modern fuel theft detection systems correlate distance traveled with consumption measured in the tank and thus detect any abnormal deviation.

### 3. Undeclared Detours
The "official" vehicle does Dakar—Thiès. In reality, it takes a 40 km detour for a personal errand. This extra fuel is reported as normal consumption. Without real-time GPS tracking of routes, this is undetectable.

### 4. Aggressive Driving
Harsh acceleration, excessive speed, prolonged idling with the engine running. These are not thefts, but they are losses. A driver with poor driving habits can consume 20 to 30% more fuel than an eco-responsible driver on the same route. In Senegal, on often degraded roads and dense traffic conditions, this gap is even more significant.

### 5. Collusion with the Gas Station
The driver strikes a deal with a complicit pump attendant: the pump shows 40 liters, the tank only receives 30. The receipt is falsified. Fleet managers operating in Senegal are all too familiar with this scenario on certain road axes.

---

## Why Traditional Methods Don't Work

Paper logbooks, gas receipts, phone check-ins, hand-written weekly reports: these tools have a fundamental limit. The biggest problem with traditional or manual logging systems is that false information can easily be entered and recorded to cover up fuel theft, errors, or incompetence.

The result: you pay to check what cannot be reliably checked. And the fraud adapts.

---

## Karangué 221: How the Platform Detects and Stops Losses in Real Time

Karangué 221 is a professional fleet management platform that natively integrates sensor-based fuel monitoring, real-time route control, and driver behavioral analysis. Here is how it addresses each of the problems identified.

### ⛽ Fuel Level Sensors — The Truth, Liter by Liter

By connecting a level sensor directly inside your vehicles' tanks, Karangué 221 records in real time:
- The fuel level before and after each fill-up
- The exact volume injected at each refueling
- Any abnormal drop in level—whether from siphoning or diversion

If a driver declares 50 liters and the sensor records a level increase corresponding to 35 liters, you receive an immediate alert. The system doesn't lie.

### 🗺️ GPS Tracking of Actual Routes — End of Phantom Detours

Every kilometer traveled is recorded with a timestamp, precise GPS coordinates, and instantaneous speed. Karangué 221 allows you to:
- Compare the actual route with the planned route
- Automatically calculate theoretical consumption vs. declared consumption
- Identify unplanned stops (unauthorized gas stations, prolonged parking areas)

If your truck heading for Dakar—Saint-Louis makes a 30 km detour on the RN3, you know about it the same day, not at the end of the month.

### 🔔 Real-Time Alerts — React Before the Loss is Consumed

The platform generates automatic alerts configured according to your thresholds:
- **Drain alert**: drop in fuel level outside of an engine operating period
- **Off-zone fill alert**: refueling performed at an unauthorized station
- **Abnormal consumption alert**: discrepancy between calculated and measured consumption greater than your threshold (e.g., +15%)
- **Prolonged idling alert**: engine running for more than 20 minutes without movement

These alerts arrive on your phone, via SMS, email, or Telegram—wherever you are. Even from France, as some of our clients already do.

### 📊 Automated Reports — Your Fuel Dashboard

Every week or month, Karangué 221 automatically generates for each vehicle:
- Real vs. theoretical consumption
- Number and volume of refills
- Driver ranking by consumption (from the most economical to the most consuming)
- Fuel cost per kilometer traveled
- Monthly trends to easily spot patterns

These reports can be sent automatically to your financial director, your fleet manager, or yourself.

### 🏎️ Driver Behavioral Scoring — Attacking Waste at the Source

Karangué 221 continuously analyzes the driving style of each driver: harsh accelerations, emergency braking, speeding, excessive engine RPM. A driving score is calculated in real time and displayed on the dashboard.

Industry studies show that improving driving behavior reduces fuel consumption by 10 to 15% on average. For our example fleet at 59 million FCFA/yr, that's a potential saving of **5.9 to 8.8 million FCFA annually** just by improving driving—without touching a single liter.

---

## What Our Clients Observe After 3 Months

Companies that have deployed Karangué 221 with fuel monitoring systematically report two phases:

**Phase 1 — The Shock of Transparency (Weeks 1-4):** The simple installation of sensors and GPS tracking is enough to eliminate the majority of opportunistic behaviors. Drivers know they are being tracked. Small-scale diversions stop immediately.

**Phase 2 — Continuous Optimization (Months 2-3+):** Reports reveal invisible patterns: a vehicle consuming 20% more than others on the same route (mechanical issue or driving?), a gas station systematically recording fill-ups lower than declarations, anomalous night idling on a construction site.

Fleets frequently report a 10 to 25% reduction in fuel losses, an improved cost per kilometer, fewer unauthorized refueling events, and a fast return on investment for the installation when the system is properly implemented and monitored.

---

## Calculating the Return on Investment — Let's be Direct

**Going back to our fleet of 20 vehicles:**

| | Amount |
|---|---|
| Estimated fuel losses (8%/yr) | 4,700,000 FCFA |
| Optimized driving savings (12%) | 7,056,000 FCFA |
| **Total potential losses/waste** | **~11,750,000 FCFA/yr** |
| Karangué 221 subscription (20 vehicles) | TBD based on plan |
| **Return on Investment** | **From the 1st quarter** |

*Calculation based on: 7,200 liters/month × 8% × 680 FCFA × 12 months for theft losses; driving savings calculated on the total annual consumption of 86,400 liters.*

---

## Conclusion: The Fuel You Buy Belongs to You

In Senegal, in a context where operational margins are under pressure and where the price of diesel remains a strategic variable for any fleet-based company, every liter counts. Fuel theft is not inevitable. It's an information problem—and Karangué 221 is the information solution.

You don't need to suspect your drivers. You need data. Reliable, automatic, in real time.

**Request a free demo of Karangué 221 and discover in 30 minutes how many liters you lose every month.**
`;

        const existing = await sql`SELECT id FROM blog_posts WHERE slug = ${slug}`;

        if ((existing.rowCount ?? 0) > 0) {
            console.log('Post already exists, updating...');
            await sql`
                UPDATE blog_posts 
                SET 
                    title = ${titleFr},
                    title_en = ${titleEn},
                    excerpt = ${excerptFr},
                    excerpt_en = ${excerptEn},
                    content = ${contentFr},
                    content_en = ${contentEn},
                    cover_image = ${coverImage},
                    category = ${category},
                    author = ${author},
                    status = 'published',
                    updated_at = NOW()
                WHERE slug = ${slug}
            `;
            console.log('Post updated successfully.');
        } else {
            console.log('Post does not exist, inserting...');
            await sql`
                INSERT INTO blog_posts (
                    title, title_en, slug, excerpt, excerpt_en, content, content_en, cover_image, category, author, status, created_at, updated_at
                ) VALUES (
                    ${titleFr}, ${titleEn}, ${slug}, ${excerptFr}, ${excerptEn}, ${contentFr}, ${contentEn}, ${coverImage}, ${category}, ${author}, 'published', NOW(), NOW()
                )
            `;
            console.log('Post inserted successfully.');
        }

    } catch (error) {
        console.error('Migration failed:', error);
    }
}

insertPost();
