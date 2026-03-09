import fs from 'fs';
import path from 'path';

const basePath = path.resolve(__dirname, '../src');

// New Sectors Data in French
const sectorsFr = [
    {
        "id": "logistics",
        "categoryId": "Productivité",
        "title": "Logistique & Livraison",
        "highlight": "Last-Mile",
        "hook": "Vos livreurs sont sur la route. Mais sont-ils sur votre route ?",
        "problem": "Détours non déclarés sur Dakar-Pikine-Guédiawaye, livraisons non effectuées facturées, vol de colis, consommation carburant incontrôlée.",
        "benefits": [
            { "label": "Trajets", "value": "-20%", "description": "de kilométrage à vide grâce à l'optimisation des tournées" },
            { "label": "Litiges", "value": "0", "description": "litige client non résolu avec preuve de livraison horodatée" },
            { "label": "Reporting", "value": "0h", "description": "réduction du temps de reporting par chauffeur de 3h à quasi néant" }
        ],
        "features": ["Optimisation de tournées", "Suivi des points de livraison", "Alertes arrêts non planifiés", "Rapport chauffeur automatique", "Application mobile dispatcher"],
        "ctaText": "Voir la solution",
        "imagePath": "/industry_logistics_1773026523020.png",
        "type": "detailed",
        "description": ""
    },
    {
        "id": "public_transport",
        "categoryId": "Sécurité",
        "title": "Transport Public &",
        "highlight": "Minibus",
        "hook": "Vos passagers font confiance à votre chauffeur. Et vous ?",
        "problem": "Excès de vitesse sur la VDN, chauffeurs qui dévient des lignes pour courses personnelles, accidents, pas de visibilité sur les horaires réels.",
        "benefits": [
            { "label": "Sécurité", "value": "100%", "description": "suivi temps réel de chaque car rapide/bus sur sa ligne officielle" },
            { "label": "Accidents", "value": "Baisse", "description": "alerte excès de vitesse configurée à 60 km/h (limite urbaine Dakar)" },
            { "label": "Ponctualité", "value": "Fiable", "description": "rapports de ponctualité automatiques pour restaurer la confiance" }
        ],
        "features": ["Suivi de lignes et arrêts", "Alertes vitesse", "Géofences de dépôt", "Historique des trajets", "Scoring conducteur", "Panneau passagers (option)"],
        "ctaText": "Protéger ma flotte",
        "imagePath": "/industry_public_transport_1773026537684.png",
        "type": "detailed",
        "description": ""
    },
    {
        "id": "btp",
        "categoryId": "Productivité",
        "title": "BTP, Mines &",
        "highlight": "Carrières",
        "hook": "Sur un chantier, une heure d'engin immobilisé coûte plus qu'une journée de bureau.",
        "problem": "Heures moteur non facturées, engins qui quittent le chantier la nuit, vol de carburant sur groupes électrogènes et engins, maintenance imprévisible.",
        "benefits": [
            { "label": "Temps Machine", "value": "Précis", "description": "suivi des heures moteur à la minute pour une facturation chantier exacte" },
            { "label": "Sécurité", "value": "24h/24", "description": "alerte immédiate si engin sort du périmètre de chantier après 18h" },
            { "label": "Pannes", "value": "-30%", "description": "de pannes imprévues grâce à la maintenance préventive planifiée" }
        ],
        "features": ["Heures moteur", "Géofence périmétrique", "Suivi carburant groupes électrogènes", "Alertes chocs/basculement", "Maintenance planifiée", "Suivi multi-sites"],
        "ctaText": "Calculer mes pertes",
        "imagePath": "/industry_btp_1773026553395.png",
        "type": "detailed",
        "description": ""
    },
    {
        "id": "hydrocarbons",
        "categoryId": "Carburant",
        "title": "Hydrocarbures &",
        "highlight": "Distribution",
        "hook": "Le carburant que vous distribuez arrive-t-il vraiment à destination ?",
        "problem": "Détournement de carburant sur les camions-citernes, livraisons partielles non déclarées, routes non respectées entre dépôts et stations.",
        "benefits": [
            { "label": "Précision", "value": "99,5%", "description": "Sonde carburant sur citerne : volume livré vs volume facturé" },
            { "label": "Traçabilité", "value": "Totale", "description": "de chaque livraison (heure, lieu, volume, temps d'arrêt)" },
            { "label": "Sécurité", "value": "Alerte", "description": "Alerte immédiate en cas de drainage anormal en route" }
        ],
        "features": ["Capteurs précision sur citernes", "Traçage de tournées de livraison", "Rapports de distribution", "Alertes déchargement non autorisé", "Géofences stations"],
        "ctaText": "Sécuriser ma distribution",
        "imagePath": "/industry_hydrocarbons_1773026568854.png",
        "type": "detailed",
        "description": ""
    },
    {
        "id": "security",
        "categoryId": "Sécurité",
        "title": "Sécurité &",
        "highlight": "Gardiennage",
        "hook": "Vos agents protègent vos clients. Qui protège vos agents — et votre réputation ?",
        "problem": "Agents qui ne font pas leurs rondes, véhicules d'intervention qui n'arrivent pas à temps, aucune preuve de passage terrain, faux rapports.",
        "benefits": [
            { "label": "Contrats", "value": "Prouvés", "description": "Preuve horodatée de chaque point de ronde pour un contrat inattaquable" },
            { "label": "Réactivité", "value": "Mesurée", "description": "Temps d'intervention moyen mesurable et optimisable" },
            { "label": "Contrôle", "value": "100%", "description": "Traçabilité complète des véhicules d'intervention 24h/24" }
        ],
        "features": ["Suivi rondes et checkpoints", "Alertes intervention", "Historique trajets agents", "Rapport d'activité client", "Bouton panique agent"],
        "ctaText": "Voir la solution",
        "imagePath": "/industry_security_1773026607971.png",
        "type": "detailed",
        "description": ""
    },
    {
        "id": "rental",
        "categoryId": "Sécurité",
        "title": "Location de Véhicules &",
        "highlight": "Leasing",
        "hook": "Votre véhicule est parti. Mais votre argent, lui, revient-il ?",
        "problem": "Impayés, véhicules introuvables, utilisation en dehors des conditions du contrat (kilométrage dépassé, zones interdites), dommages non déclarés.",
        "benefits": [
            { "label": "Risque", "value": "Neutralisé", "description": "Immobilisation à distance en 1 clic pour recouvrement sans intervention physique" },
            { "label": "Contrôle", "value": "Régional", "description": "Alerte de sortie de zone si le véhicule quitte la région non autorisée" },
            { "label": "Facturation", "value": "Juste", "description": "Rapport kilométrique automatique pour une facturation exacte" }
        ],
        "features": ["Coupure moteur à distance", "Géofence forfaitaire", "Rapport KM journalier", "Historique trajets 90 jours", "Alerte vitesse", "Identifiant conducteur (iButton)"],
        "ctaText": "Protéger mes actifs",
        "imagePath": "/sector_car_rental_1767971102612.png", // Reusing old image due to quota
        "type": "detailed",
        "description": ""
    },
    {
        "id": "agriculture",
        "categoryId": "Sécurité",
        "title": "Agriculture, Élevage &",
        "highlight": "Asset Management",
        "hook": "Votre bétail, vos machines, vos récoltes — tout ce qui a de la valeur mérite d'être protégé.",
        "problem": "Vol de bétail fréquent (contexte Sénégal rural), engins agricoles qui quittent l'exploitation, impossibilité de gérer à distance un domaine agricole.",
        "benefits": [
            { "label": "Localisation", "value": "Temps réel", "description": "Tracker discret intégré dans un collier pour suivre le bétail même depuis Dakar" },
            { "label": "Limites", "value": "Sécurisées", "description": "Alerte immédiate si un animal sort de la géofence du domaine" },
            { "label": "Machines", "value": "Suivies", "description": "Suivi des tracteurs pour décompte exact des heures par champ" }
        ],
        "features": ["Asset tracking long-terme", "Géofences multiples", "Alertes sortie de zone", "Rapport d'activité agricole", "Batterie longue durée (années)"],
        "ctaText": "Suivre mes actifs",
        "imagePath": "/industry-truck.png", // Placeholder due to quota
        "type": "detailed",
        "description": ""
    },
    {
        "id": "cold_chain",
        "categoryId": "Conformité",
        "title": "Transport Frigorifique &",
        "highlight": "Chaîne du Froid",
        "hook": "Vos produits frais voyagent sous le chaud soleil sénégalais. Savez-vous à quelle température ils arrivent ?",
        "problem": "Rupture de chaîne du froid non détectée, portes arrière ouvertes trop longtemps, compresseurs défaillants, marchandises perdues ou avariées.",
        "benefits": [
            { "label": "Pertes", "value": "0", "description": "Capteur température avec alerte immédiate si la courroie frigorifique lâche" },
            { "label": "Sécurité", "value": "Cargo", "description": "Alerte à chaque ouverture des portes arrière pour éviter les vols" },
            { "label": "Hygiène", "value": "Garantie", "description": "Rapport de température de bout en bout pour conformité sanitaire" }
        ],
        "features": ["Capteurs Température/Humidité", "Alertes seuils critiques", "Suivi d'ouverture de portes", "Rapport Chaîne du Froid", "Historique des variations"],
        "ctaText": "Protéger mes cargos",
        "imagePath": "/industry-truck.png", // Placeholder
        "type": "detailed",
        "description": ""
    },
    {
        "id": "health",
        "categoryId": "Productivité",
        "title": "Santé, Ambulances &",
        "highlight": "Urgence",
        "hook": "Chaque minute compte. Savez-vous où est votre ambulance en ce moment ?",
        "problem": "Temps de réponse trop longs, véhicules médicaux utilisés à des fins privées, aucune traçabilité pour les rapports du ministère.",
        "benefits": [
            { "label": "Dispatch", "value": "Immédiat", "description": "Affectez toujours l'ambulance la plus proche de l'intervention" },
            { "label": "Conformité", "value": "100%", "description": "Rapport d'intervention automatique (départ, arrivée, temps sur site)" },
            { "label": "Contrôle", "value": "Strict", "description": "Alerte d'utilisation de l'ambulance en dehors des plages de service" }
        ],
        "features": ["Suivi flotte urgences", "Dispatch en temps réel", "Rapports officiels", "Alertes utilisation non autorisée", "Sirène / Statut gyro"],
        "ctaText": "Optimiser le dispatch",
        "imagePath": "/industry-bus.png", // Placeholder
        "type": "detailed",
        "description": ""
    },
    {
        "id": "school",
        "categoryId": "Sécurité",
        "title": "Écoles & Transport",
        "highlight": "d'Enfants",
        "hook": "Les parents vous confient ce qu'ils ont de plus précieux. Méritez cette confiance.",
        "problem": "Parents inquiets, accidents non signalés, chauffeurs imprudents, retards sans explication.",
        "benefits": [
            { "label": "Tranquillité", "value": "Totale", "description": "Notification (optionnelle) à l'arrivée sécurisée à l'établissement" },
            { "label": "Sécurité", "value": "Priorité", "description": "Scoring conducteur agressif configuré spécifiquement pour la sécurité infantile" },
            { "label": "Déviations", "value": "Bloquées", "description": "Alerte au manager si le bus dévie du parcours scolaire prévu" }
        ],
        "features": ["Géofences école/domicile", "Notification parentale", "Scoring sécurité enfants", "Limitation stricte vitesse", "Suivi itinéraire en temps réel"],
        "ctaText": "Voir la démo",
        "imagePath": "/industry-bus.png", // Placeholder
        "type": "detailed",
        "description": ""
    },
    {
        "id": "government",
        "categoryId": "Conformité",
        "title": "Administration & Flottes",
        "highlight": "Gouvernementales",
        "hook": "Les véhicules de l'État appartiennent au peuple. Gérez-les avec transparence.",
        "problem": "Véhicules administratifs utilisés le weekend, parc immense hors contrôle, audits impossibles à chiffrer précisément.",
        "benefits": [
            { "label": "Audit", "value": "1 clic", "description": "Rapport d'utilisation mensuel global par direction administrative" },
            { "label": "Contrôle", "value": "Week-end", "description": "Notifications pour toute mise en route le weekend non autorisée" },
            { "label": "Identité", "value": "Vérifiée", "description": "Clé iButton ou badge RFID obligatoire pour démarrer le véhicule" }
        ],
        "features": ["Planification d'usage weekend", "Rapports ministériels", "Contrôle d'accès chauffeur", "Suivi des dépenses indirectes", "Coupure à distance"],
        "ctaText": "Auditer ma flotte",
        "imagePath": "/sector_vip_transport_1767971076378.png", // Placeholder
        "type": "detailed",
        "description": ""
    },
    {
        "id": "tourism",
        "categoryId": "Productivité",
        "title": "Tourisme, Agences &",
        "highlight": "Safaris",
        "hook": "Vos touristes découvrent le Sénégal. Gérez votre flotte l'esprit tranquille, même en brousse.",
        "problem": "Accidents de chauffeurs en zones rurales (Casamance, Saloum), véhicules injoignables sans réseau, pas de rapport d'incident.",
        "benefits": [
            { "label": "Couverture", "value": "Maximale", "description": "Suivi satellite / 4G étendu avec mémoire interne tampon (Blackbox)" },
            { "label": "Preuves", "value": "Assurance", "description": "Historique précis du comportement du conducteur en cas d'accident" },
            { "label": "Clientèle", "value": "Rassurée", "description": "Possibilité de partager des liens de tracking éphémères aux clients/familles" }
        ],
        "features": ["Module mémoire hors-réseau", "Liens de tracking temporaires", "Analytique de parcours touristique", "Alertes comportement", "Suivi multi-régions"],
        "ctaText": "Protéger mes safaris",
        "imagePath": "/industry-btp.png", // Placeholder
        "type": "detailed",
        "description": ""
    }
];

// Quick translations for EN based on the French content
const sectorsEn = sectorsFr.map(s => {
    const t = { ...s };
    if (s.id === "logistics") {
        t.title = "Logistics & Delivery";
        t.hook = "Your drivers are on the road. But are they on their route?";
        t.features = ["Route optimization", "Delivery points tracking", "Unplanned stop alerts", "Auto driver reports", "Dispatcher mobile app"];
        t.ctaText = "Optimize my routes";
        t.benefits = [
            { label: "Trips", value: "-20%", description: "empty mileage reduction via route planning" },
            { label: "Disputes", value: "0", description: "unresolved client disputes with timestamped proof of delivery" },
            { label: "Reporting", value: "0h", description: "driver reporting time heavily reduced" }
        ];
    } else if (s.id === "public_transport") {
        t.title = "Public Transport & Minibuses";
        t.hook = "Your passengers trust your driver. Do you?";
        t.features = ["Line & stop tracking", "Speed alerts", "Depot geofences", "Trip history", "Driver scoring", "Passenger panel"];
        t.ctaText = "Protect my fleet";
        t.benefits = [
            { label: "Safety", value: "100%", description: "real-time tracking of each bus on its official line" },
            { label: "Accidents", value: "Down", description: "speed alert configured at urban limits" },
            { label: "Punctuality", value: "Reliable", description: "automated punctuality reports" }
        ];
    } else if (s.id === "btp") {
        t.title = "Construction & Mining";
        t.hook = "On a site, an hour of immobilized machinery costs more than a day at the office.";
        t.features = ["Engine hours", "Perimeter geofence", "Generator fuel tracking", "Impact/tilt alerts", "Planned maintenance", "Multi-site tracking"];
        t.ctaText = "Calculate losses";
        t.benefits = [
            { label: "Machine Time", value: "Precise", description: "engine hour tracking for exact billing" },
            { label: "Security", value: "24/7", description: "immediate alert if machinery leaves the perimeter" },
            { label: "Breakdowns", value: "-30%", description: "less unexpected breakdowns with preventive maintenance" }
        ];
    } else if (s.id === "hydrocarbons") {
        t.title = "Fuel & Hydrocarbons";
        t.hook = "Does the fuel you distribute truly reach its destination?";
        t.features = ["Precision tanker sensors", "Delivery route tracking", "Distribution reports", "Unauthorized unloading alerts", "Station geofences"];
        t.ctaText = "Secure distribution";
        t.benefits = [
            { label: "Accuracy", value: "99.5%", description: "Tank level sensor: delivered vs billed volume" },
            { label: "Traceability", value: "Total", description: "for each delivery step" },
            { label: "Security", value: "Alert", description: "Immediate alert in case of abnormal road drainage" }
        ];
    } else if (s.id === "security") {
        t.title = "Security & Patrols";
        t.hook = "Your agents protect clients. Who protects your agents—and reputation?";
        t.features = ["Patrol & checkpoint tracking", "Intervention alerts", "Agent trip history", "Client activity reports", "Panic button"];
        t.ctaText = "View solution";
        t.benefits = [
            { label: "Contracts", value: "Proven", description: "Timestamped proof of each patrol checkpoint" },
            { label: "Response", value: "Tracked", description: "Measurable average intervention time" },
            { label: "Control", value: "100%", description: "Complete traceability of intervention vehicles" }
        ];
    } else if (s.id === "rental") {
        t.title = "Car Rental & Leasing";
        t.hook = "Your vehicle is gone. Will your money come back?";
        t.features = ["Remote engine cut-off", "Contract geofences", "Daily mileage reports", "90-day history", "Speed alerts", "Driver ID"];
        t.ctaText = "Protect my assets";
        t.benefits = [
            { label: "Risk", value: "Neutralized", description: "Remote 1-click immobilization for safe recovery" },
            { label: "Control", value: "Regional", description: "Zone exit alerts if leaving authorized regions" },
            { label: "Billing", value: "Fair", description: "Automated mileage reporting for exact billing" }
        ];
    } else if (s.id === "agriculture") {
        t.title = "Agriculture & Farming";
        t.hook = "Your cattle, machinery, crops—everything valuable deserves protection.";
        t.features = ["Long-term asset tracking", "Multiple geofences", "Zone exit alerts", "Farming activity reports", "Long-life battery"];
        t.ctaText = "Track my assets";
        t.benefits = [
            { label: "Location", value: "Real-time", description: "Discreet collar tracker for remote cattle tracking" },
            { label: "Borders", value: "Secured", description: "Alert if an animal leaves the farm perimeter" },
            { label: "Machines", value: "Monitored", description: "Tractor tracking for exact field hour counts" }
        ];
    } else if (s.id === "cold_chain") {
        t.title = "Cold Chain Logistics";
        t.hook = "Your fresh goods travel under the hot sun. Do you know their arrival temperature?";
        t.features = ["Temp/Humidity sensors", "Critical threshold alerts", "Door opening tracking", "Cold chain reports", "Variation history"];
        t.ctaText = "Protect cargo";
        t.benefits = [
            { label: "Losses", value: "0", description: "Temperature sensor with immediate failure alerts" },
            { label: "Security", value: "Cargo", description: "Alert on each back door opening to prevent theft" },
            { label: "Hygiene", value: "Guaranteed", description: "End-to-end temperature reports for compliance" }
        ];
    } else if (s.id === "health") {
        t.title = "Ambulances & Health";
        t.hook = "Every minute counts. Do you know where your ambulance is right now?";
        t.features = ["Emergency fleet tracking", "Real-time dispatch", "Official reports", "Unauthorized usage alerts", "Siren/Gyro status"];
        t.ctaText = "Optimize dispatch";
        t.benefits = [
            { label: "Dispatch", value: "Instant", description: "Assign the closest ambulance to the scene" },
            { label: "Compliance", value: "100%", description: "Automated intervention reporting" },
            { label: "Control", value: "Strict", description: "Alerts for usage outside service hours" }
        ];
    } else if (s.id === "school") {
        t.title = "School Transport";
        t.hook = "Parents entrust you with their most precious. Earn that trust.";
        t.features = ["School/home geofences", "Parent notifications", "Child-safe driver scores", "Strict speed caps", "Live route tracking"];
        t.ctaText = "View Demo";
        t.benefits = [
            { label: "Peace", value: "Total", description: "Safe arrival notifications for parents" },
            { label: "Safety", value: "Priority", description: "Aggressive driver scoring tailored for child safety" },
            { label: "Deviations", value: "Blocked", description: "Alert if the bus deviates from the planned route" }
        ];
    } else if (s.id === "government") {
        t.title = "Government Fleets";
        t.hook = "State vehicles belong to the people. Manage them transparently.";
        t.features = ["Weekend usage schedules", "Ministry reports", "Driver access control", "Expense tracking", "Remote cut-off"];
        t.ctaText = "Audit My Fleet";
        t.benefits = [
            { label: "Audit", value: "1-Click", description: "Global monthly usage report by department" },
            { label: "Control", value: "Weekend", description: "Alerts for unauthorized weekend engine starts" },
            { label: "Identity", value: "Verified", description: "iButton or RFID badge required to start" }
        ];
    } else if (s.id === "tourism") {
        t.title = "Tourism & Safaris";
        t.hook = "Tourists discover Senegal. You manage your fleet flawlessly, even in the bush.";
        t.features = ["Off-grid memory module", "Temp tracking links", "Tour route analytics", "Behavior alerts", "Multi-region tracking"];
        t.ctaText = "Protect safaris";
        t.benefits = [
            { label: "Coverage", value: "Max", description: "Extended satellite/4G tracking with blackbox buffer" },
            { label: "Proof", value: "Insured", description: "Exact driver history for insurance claims" },
            { label: "Clients", value: "Secure", description: "Share temporary tracking links with families" }
        ];
    }
    return t;
});

function updateJson(filePath: string, newSectors: any[]) {
    const jsonPath = path.join(basePath, 'data', filePath);
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    data.industries.sectors = newSectors;
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
}

try {
    updateJson('content_fr.json', sectorsFr);
    updateJson('content_en.json', sectorsEn);
    updateJson('content.json', sectorsFr);
    console.log("Updated industry JSON/TS efficiently.");
} catch (error) {
    console.error(error);
}
