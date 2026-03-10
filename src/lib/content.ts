// COMPLETE 100% FAITHFUL content structure for AI-Karangué website
// Every single text element from every component is included here

export interface SiteContent {
    home: {
        hero: {
            mainTitle1: string; // "Tranquillité"
            mainTitle2: string; // "d'esprit."
            videoButtonText: string;
            heroVideoPath: string;
            presentationVideoPath: string;
        };
        manifesto: {
            title: string;
            description: string;
        };
        hardware: {
            sectionLabel: string;
            sectionTitle: string;
            sectionTitleHighlight: string;
            ctaButton: string;
            products: Array<{
                id: string;
                name: string;
                role: string;
                target: string;
                description: string;
                features: string[];
                imagePath: string;
                stats: string[];
            }>;
        };
        software: {
            sectionLabel: string;
            sectionTitle: string;
            sectionTitleHighlight: string;
            bottomHook: string;
            bottomLink: string;
            features: Array<{
                id: string;
                title: string;
                role: string;
                description: string;
                imagePath: string;
                linkText: string;
            }>;
        };
        tripleImpact: {
            sectionLabel: string;
            sectionTitle: string;
            sectionTitleHighlight: string;
            sectionDescription: string;
            pillars: Array<{
                title: string;
                subtitle: string;
                description: string;
                benefits: string[];
                imagePath: string;
            }>;
        };
        roiCalculator: {
            sectionLabel: string;
            sectionTitle: string;
            sectionTitleHighlight: string;
            sectionDescription: string;
            labels: {
                sector: string;
                fleetSize: string;
                fuelCost: string;
                accidents: string;
                maintenanceCost: string;
                calculateButton: string;
                roiEstimated: string;
                netProfit: string;
                annualSavings: string;
                solutionCost: string;
                payback: string;
                emailPrompt: string;
                emailButton: string;
                emailDisclaimer: string;
            };
            sectors: string[];
        };
        offres: {
            sectionLabel: string;
            sectionTitle: string;
            sectionTitleHighlight: string;
            sectionDescription: string;
            ctaButton: string;
            bottomText: string;
            bottomLink: string;
            packs: Array<{
                name: string;
                tagline: string;
                features: string[];
                popular: boolean;
            }>;
        };
        finalCta: {
            title: string;
            description: string;
            ctaPrimary: string;
            ctaSecondary: string;
        };
    };
    solutions: {
        hero: {
            title: string;
            titleHighlight: string;
            subtitle: string;
            subtitleHighlight: string;
            ctaPrimary: string;
            ctaSecondary: string;
            videoPath: string;
        };
        value: {
            sectionLabel: string;
            sectionTitle: string;
            sectionTitleHighlight: string;
            sectionDescription: string;
            sectionDescriptionHighlight: string;
            cards: Array<{
                title: string;
                image: string;
                icon: string;
                problem: string;
                problemHighlight: string;
                solutionLabel: string;
                benefits: string[];
                statValue: string;
                statLabel: string;
            }>;
        };
        capabilities: {
            sectionLabel: string;
            sectionTitle: string;
            sectionTitleHighlight: string;
            sectionDescription: string;
            modules: Array<{
                title: string;
                impact: string;
                features: string[];
            }>;
        };
        hardware: {
            sectionLabel: string;
            sectionTitle: string;
            sectionTitleHighlight: string;
            sectionDescription: string;
            items: Array<{
                id: string; // dsm, adas, dualcam
                label: string;
                title: string;
                description: string;
                highlight1: string; // for bold highlights within description
                highlight2: string; // for bold highlights within description
                benefitsLabel: string;
                benefits: string[];
                ctaText: string;
                imagePath: string;
                deviceImagePath: string;
            }>;
        };
        ecosystem: {
            title: string;
            items: Array<{
                title: string;
                description: string;
            }>;
        };
        platformDetail: {
            sectionLabel: string;
            sectionTitle: string;
            sectionTitleHighlight: string;
            sectionDescription: string;
            features: {
                tracking: {
                    title: string;
                    description: string;
                    statusLabel: string;
                    statusValue: string;
                    tags: string[];
                    imagePath: string;
                };
                dashboard: {
                    title: string;
                    description: string;
                    scoreLabel: string;
                    scoreValue: string;
                    savingsLabel: string;
                    savingsValue: string;
                    imagePath: string;
                };
                video: {
                    title: string;
                    description: string;
                    ctaText: string;
                    imagePath: string;
                };
                geofencing: {
                    title: string;
                    description: string;
                    alertLabel: string;
                    imagePath: string;
                };
            };
        };
        finalCta: {
            title: string;
            titleHighlight: string;
            description: string;
            ctaPrimary: string;
            ctaSecondary: string;
        };
    };
    footer: {
        mission: string;
        description: string;
        address: string;
        phone: string;
        copyright: string;
        trademark: string;
        newsletter: {
            placeholder: string;
            buttonText: string;
        };
        navigation: {
            technology: {
                title: string;
                links: { label: string; href: string }[];
            };
            sectors: {
                title: string;
                links: { label: string; href: string }[];
            };
            company: {
                title: string;
            };
        };
        social: {
            linkedin: string;
            whatsapp: string;
            instagram: string;
            facebook: string;
            youtube: string;
            tiktok: string;
        };
        legal: {
            links: string[];
        };
    };
    meta: {
        title: string;
        description: string;
    };
    contact: {
        hero: {
            label: string;
            title: string;
            description: string;
            features: string[];
        };
        info: {
            phone: { label: string; value: string };
            email: { label: string; value: string };
            address: { label: string; value: string };
        };
        form: {
            title: string;
            description: string;
            labels: {
                firstName: string;
                lastName: string;
                email: string;
                company: string;
                fleetSize: string;
                message: string;
                fleetOptions: string[];
                submit: string;
                sending: string;
                success: string;
                error: string;
                privacy: string;
            };
            placeholders: {
                firstName: string;
                lastName: string;
                email: string;
                company: string;
                message: string;
            };
        };
    };
    navbar: {
        links: Array<{
            name: string;
            href: string;
        }>;
        cta: string;
    };
    industries: {
        hero: {
            label: string;
            title: string;
            titleHighlight: string;
            description: string;
        };
        sectors: Array<{
            id: string; // transport, logistics, btp
            title: string;
            highlight: string;
            hook: string;
            problem: string;
            description: string;
            type: "stats" | "list" | "detailed";
            imagePath: string;
            ctaText: string;
            benefits: Array<{ label: string; value: string; description: string }>;
            features: string[];
            reassurance?: string;
            categoryId?: string;
        }>;
        otherSectors: Array<{
            title: string;
            description: string;
            iconId: string; // users, zap, shield
        }>;
        finalCta: {
            title: string;
            titleHighlight: string;
            description: string;
            ctaPrimary: string;
            ctaSecondary: string;
        };
    };
    offres: {
        hero: {
            label: string;
            title: string;
            highlight: string;
            description: string;
        };
        packs: Array<{
            name: string;
            price: string;
            tagline: string;
            features: string[];
            ctaText: string;
            popular: boolean;
        }>;
        comparison: {
            title: string;
            highlight: string;
            description: string;
            headers: string[]; // [Feature, Basic, Standard, Premium]
            rows: Array<[string, string | boolean, string | boolean, string | boolean]>;
        };
        services: {
            support: {
                title: string;
                description: string;
                label: string;
            };
            installation: {
                title: string;
                description: string;
            };
            updates: {
                title: string;
                description: string;
            };
            training: {
                title: string;
                description: string;
            };
        };
        finalCta: {
            title: string;
            highlight: string;
            description: string;
            ctaPrimary: string;
        };
    };
    blog: {
        hero: {
            label: string;
            title: string;
            highlight: string;
            description: string;
        };
        post: {
            backToBlog: string;
            notFound: string;
            share: string;
            ctaTitle: string;
            ctaSolutions: string;
            ctaContact: string;
        };
    };
    tracking: {
        hero: {
            label: string;
            title: string;
            description: string;
            imagePath: string;
        };
        sama: {
            title: string;
            description: string;
            features: {
                title: string;
                items: Array<{
                    title: string;
                    description: string;
                    icon: string;
                }>;
            };
            images: string[];
        };
        karangue221: {
            title: string;
            description: string;
            features: Array<{
                title: string;
                description: string;
                icon: string;
            }>;
            imagePath: string;
        };
        benefits: {
            title: string;
            items: Array<{
                title: string;
                description: string;
                icon: string;
            }>;
        };
        finalCta: {
            title: string;
            highlight: string;
            description: string;
            ctaPrimary: string;
            imagePath?: string;
        };
        detailedFeatures: Array<{
            id: string;
            title: string;
            description: string;
            posterText: string;
            icon: string;
            image: string;
        }>;
    };
}

export const defaultContent: SiteContent = {
    home: {
        hero: {
            mainTitle1: "Tranquillité",
            mainTitle2: "d'esprit.",
            videoButtonText: "Le Film Vision",
            heroVideoPath: "/hero.mp4",
            presentationVideoPath: "https://youtu.be/SnTCsAuo9Kw?si=roT3YLRJi34iIUKO"
        },
        manifesto: {
            title: "Nous transformons votre flotte en <span class=\"text-teal\">actif sécurisé et rentable</span>.",
            description: "Au-delà du simple suivi GPS, AI-Karangué combine IoT et intelligence artificielle pour protéger vos conducteurs, réduire vos coûts et sécuriser vos passagers — en temps réel."
        },
        hardware: {
            sectionLabel: "Hardware Gateway",
            sectionTitle: "Des outils de",
            sectionTitleHighlight: "prévision.",
            ctaButton: "Consulter la fiche complète du manager",
            products: [
                {
                    id: "dsm",
                    name: "L'Œil de l'Expert",
                    role: "Vigilance & Protection Biométrique",
                    target: "Pour le gestionnaire soucieux de sa responsabilité civile et de la santé de ses équipes.",
                    description: "Reprenez le contrôle sur l'imprévisible. Ce module de détection visuelle avancée agit comme un second regard infatigable, identifiant les risques humains avant qu'ils ne deviennent des statistiques coûteuses.",
                    features: [
                        "Alerte immédiate en cas de somnolence critique",
                        "Détection des distractions (Téléphone, Inattention)",
                        "Monitoring du respect des consignes (Ceinture, Tabac)",
                        "Identification précise du conducteur affecté",
                        "Réduction drastique des sinistres évitables"
                    ],
                    imagePath: "/dsm.png",
                    stats: ["IA 99.2%", "0.05s Détection"]
                },
                {
                    id: "adas",
                    name: "La Sentinelle Active",
                    role: "Assistance au Pilotage & Anticipation",
                    target: "Idéal pour sécuriser vos actifs les plus précieux et réduire vos primes d'assurance.",
                    description: "Transformez vos véhicules en forteresses intelligentes. La Sentinelle anticipe les collisions et les sorties de voie, offrant à votre exploitation une marge de manœuvre inédite face aux aléas de la route.",
                    features: [
                        "Avertisseur de collision frontale (FCW)",
                        "Alerte de sortie de voie sans clignotant (LDW)",
                        "Protection proactive des piétons (PCW)",
                        "Surveillance des distances de sécurité (FPW)",
                        "Lecture automatique des limitations de vitesse"
                    ],
                    imagePath: "/adas.png",
                    stats: ["4K Optics", "360° Vision"]
                },
                {
                    id: "dualcam",
                    name: "Le Témoin Capital",
                    role: "Preuve Visuelle & Transparence Totale",
                    target: "L'outil ultime de protection juridique pour les gestionnaires en cas de litige.",
                    description: "Ne laissez plus de place au doute. Documentez chaque seconde critique avec une précision chirurgicale. Une visibilité totale, de l'intérieur comme de l'extérieur, synchronisée directement avec votre cockpit de gestion.",
                    features: [
                        "Double flux HD simultané (Route & Cabine)",
                        "Enregistrement automatique sur choc ou freinage",
                        "Streaming Cloud sécurisé pour levée de doute",
                        "Archive inviolable pré/post évènement",
                        "Vision nocturne infrarouge haute fidélité"
                    ],
                    imagePath: "/dualcam.png",
                    stats: ["2K HDR", "LTE Sync"]
                }
            ]
        },
        software: {
            sectionLabel: "The Silent Guardian",
            sectionTitle: "Dormez tranquille.",
            sectionTitleHighlight: "L'IA veille sur eux.",
            bottomHook: "Le système gère 100% des alertes. Vous ne gérez que les exceptions.",
            bottomLink: "Explorer le système complet",
            features: [
                {
                    id: "tracking",
                    title: "Contrôle Absolu",
                    role: "Visibilité en Temps Réel",
                    description: "Une vue d'aigle sur chaque mouvement. Plus aucune zone d'ombre dans vos opérations, de Dakar à Tambacounda.",
                    imagePath: "/tracking.png",
                    linkText: "Explorer le Module"
                },
                {
                    id: "video",
                    title: "Preuve Irréfutable",
                    role: "Preuve & Action Directe",
                    description: "En cas de litige, vous avez l'image. Désamorcez les conflits et protégez vos chauffeurs instantanément.",
                    imagePath: "/video.png",
                    linkText: "Demander une démo"
                }
            ]
        },
        tripleImpact: {
            sectionLabel: "NOTRE PHILOSOPHIE",
            sectionTitle: "Le Triple Impact :",
            sectionTitleHighlight: "Une révolution tripartite",
            sectionDescription: "Parce qu'une flotte performante repose sur l'équilibre absolu entre sécurité, rentabilité et satisfaction client.",
            pillars: [
                {
                    title: "Pour vos Conducteurs",
                    subtitle: "Sécurité & Accompagnement",
                    description: "Ce ne sont pas des machines. Notre IA les protège comme un copilote bienveillant, réduisant le stress et les risques d'accident.",
                    benefits: ["Anti-Somnolence", "Assistance Conduite", "Protection Juridique"],
                    imagePath: "/driver-peace.png"
                },
                {
                    title: "Pour vos Gestionnaires",
                    subtitle: "Sérénité & Contrôle",
                    description: "Pilotez votre activité sans angle mort. Transformez chaque kilomètre en donnée exploitable pour maximiser la rentabilité.",
                    benefits: ["Économie Carburant", "Maintenance Préventive", "Traçabilité Totale"],
                    imagePath: "/manager-serenity.png"
                },
                {
                    title: "Pour vos Voyageurs",
                    subtitle: "Confiance & Confort",
                    description: "La garantie d'un voyage sûr. Une flotte sécurisée est votre meilleur atout pour fidéliser une clientèle exigeante.",
                    benefits: ["Trajets Sécurisés", "Ponctualité Améliorée", "Service Premium"],
                    imagePath: "/traveler-trust.png"
                }
            ]
        },
        roiCalculator: {
            sectionLabel: "Votre Potentiel de Croissance",
            sectionTitle: "Simulateur de",
            sectionTitleHighlight: "Rentabilité",
            sectionDescription: "Mesurez l'impact financier direct de la digitalisation de votre flotte. Des résultats basés sur des performances réelles.",
            labels: {
                sector: "Secteur d'activité",
                fleetSize: "Taille de la Flotte",
                fuelCost: "Budget Carburant Mensuel (FCFA)",
                accidents: "Sinistres par An",
                maintenanceCost: "Budget Maintenance Mensuel (FCFA)",
                calculateButton: "Calculer mon ROI",
                roiEstimated: "ROI Estimé",
                netProfit: "Profit Net Annuel",
                annualSavings: "Économies annuelles",
                solutionCost: "Coût annuel solution",
                payback: "Amortissement (Payback)",
                emailPrompt: "Recevoir mon rapport officiel",
                emailButton: "Envoyer",
                emailDisclaimer: "En cliquant sur envoyer, vous acceptez de recevoir une étude personnalisée basée sur ces chiffres."
            },
            sectors: [
                "Transport Public",
                "Logistique & Fret",
                "BTP & Construction",
                "Location de Véhicules",
                "Services d'Urgence"
            ]
        },
        offres: {
            sectionLabel: "Tarification Transparente",
            sectionTitle: "Investir dans la",
            sectionTitleHighlight: "certitude.",
            sectionDescription: "Des options claires, sans coûts cachés. Choisissez le niveau de contrôle qui correspond à vos ambitions.",
            ctaButton: "Demander une démo",
            bottomText: "Une flotte de plus de 50 véhicules ?",
            bottomLink: "Discuter d'une solution sur-mesure",
            packs: [
                {
                    name: "Pack Basic",
                    tagline: "L'essentiel pour démarrer",
                    features: [
                        "Géolocalisation",
                        "Gestion de Carburant",
                        "Rapport"
                    ],
                    popular: false
                },
                {
                    name: "Pack Tranquillité",
                    tagline: "L'excellence opérationnelle",
                    features: [
                        "Géolocalisation temps réel",
                        "Gestion de Carburant (FLS)",
                        "Gestion de la maintenance",
                        "Analyse comportementale avancée",
                        "Coaching éco-conduite en temps réel",
                        "Rapport"
                    ],
                    popular: true
                },
                {
                    name: "Pack Standard",
                    tagline: "Le choix équilibré",
                    features: [
                        "Géolocalisation",
                        "Gestion de Carburant",
                        "Gestion de la maintenance",
                        "Rapport"
                    ],
                    popular: false
                }
            ]
        },
        finalCta: {
            title: "Transformez votre flotte <br /> <span class=\"text-teal\">dès aujourd'hui.</span>",
            description: "Rejoignez les gestionnaires qui ont choisi la sérénité opérationnelle avec AI-Karangué.",
            ctaPrimary: "Commencer maintenant",
            ctaSecondary: "Demander un devis"
        }
    },
    solutions: {
        hero: {
            title: "La Plateforme",
            titleHighlight: "Karangué221",
            subtitle: "La solution IoT + IA qui transforme votre flotte en",
            subtitleHighlight: "actif stratégique sécurisé et rentable.",
            ctaPrimary: "Calculer mon ROI",
            ctaSecondary: "Demander une démo",
            videoPath: "/hero.mp4"
        },
        value: {
            sectionLabel: "Votre Réalité Actuelle",
            sectionTitle: "Chaque jour sans",
            sectionTitleHighlight: "Karangué221",
            sectionDescription: "Les gestionnaires de flotte perdent en moyenne",
            sectionDescriptionHighlight: "30% de leur budget",
            cards: [
                {
                    title: "Sauver des Vies",
                    image: "/save-lives.png",
                    icon: "Heart",
                    problem: "Sans AI-Karangué",
                    problemHighlight: "Accidents évitables, fatigue non détectée, comportements à risque invisibles.",
                    solutionLabel: "AVEC KARANGUÉ221",
                    benefits: [
                        "Détection somnolence IA",
                        "Alertes collision imminente",
                        "Scoring comportemental",
                        "Preuves vidéo 360°"
                    ],
                    statValue: "-40%",
                    statLabel: "D'accidents"
                },
                {
                    title: "Gagner du Temps",
                    image: "/save-time.png",
                    icon: "Clock",
                    problem: "Sans AI-Karangué",
                    problemHighlight: "Gestion manuelle, rapports Excel, recherche d'informations, temps perdu.",
                    solutionLabel: "AVEC KARANGUÉ221",
                    benefits: [
                        "Visibilité flotte en 1 clic",
                        "Rapports automatisés",
                        "Alertes instantanées",
                        "Maintenance prédictive"
                    ],
                    statValue: "10h",
                    statLabel: "Économisées / sem"
                },
                {
                    title: "Réduire les Coûts",
                    image: "/save-money.png",
                    icon: "DollarSign",
                    problem: "Sans AI-Karangué",
                    problemHighlight: "Vols de carburant, surconsommation, pannes coûteuses.",
                    solutionLabel: "AVEC KARANGUÉ221",
                    benefits: [
                        "Stop vol carburant (FLS)",
                        "Optimisation consommation",
                        "Réduction maintenance",
                        "Baisse primes assurance"
                    ],
                    statValue: "3.5x",
                    statLabel: "Retour sur Invest."
                }
            ]
        },
        capabilities: {
            sectionLabel: "Plateforme SaaS Complète",
            sectionTitle: "Tout ce dont vous avez besoin.",
            sectionTitleHighlight: "En un seul endroit.",
            sectionDescription: "Karangué221 centralise l'ensemble de vos opérations de flotte dans une interface intuitive et puissante.",
            modules: [
                {
                    title: "Localisation & Tracking",
                    impact: "Optimisation routes, sécurité flotte",
                    features: ["GPS temps réel haute précision", "Historique trajets illimité", "Rapports de parcours détaillés", "Notifications entrée/sortie zones"]
                },
                {
                    title: "Gestion Carburant",
                    impact: "Réduction coûts carburant -15%",
                    features: ["Contrôle niveau FLS (99% précision)", "Monitoring consommation par trajet", "Détection & prévention vols", "Analytics économies carburant"]
                },
                {
                    title: "Maintenance Prédictive",
                    impact: "Contrôle coûts, moins de pannes",
                    features: ["Intervalles service automatiques", "Rapports usure & kilométrage", "Alertes maintenance préventive", "Historique interventions"]
                },
                {
                    title: "Comportement Conducteur",
                    impact: "Conduite sûre, -12% consommation",
                    features: ["Eco-driving scoring personnalisé", "Analytics comportements à risque", "Identification conducteur (iButton/RFID)", "Rapports performance individuels"]
                },
                {
                    title: "Vidéo Intelligence",
                    impact: "Protection juridique, résolution litiges",
                    features: ["Streaming live multi-caméras", "Enregistrements basés événements", "Archive Cloud sécurisée", "Preuves légales horodatées"]
                },
                {
                    title: "Sécurité Cargaison",
                    impact: "Prévention pertes financières",
                    features: ["Tracking marchandises en transit", "Capteurs portes & ouvertures", "Alertes accès non autorisé", "Rapports livraisons"]
                },
                {
                    title: "Monitoring Température",
                    impact: "Qualité préservée, conformité",
                    features: ["Capteurs température en continu", "Rapports conformité chaîne froid", "Alertes dépassement seuils", "Traçabilité produits sensibles"]
                },
                {
                    title: "Contrôle Charge Essieux",
                    impact: "Éviter pertes liées amendes",
                    features: ["Capteurs poids en temps réel", "Rapports charge par essieu", "Alertes surcharge", "Prévention amendes"]
                },
                {
                    title: "Business Intelligence",
                    impact: "Décisions data-driven, efficacité",
                    features: ["Dashboards personnalisables", "Intégration ERP/API", "Rapports automatisés sur-mesure", "Export données (Excel/PDF)"]
                }
            ]
        },
        hardware: {
            sectionLabel: "Immersion Technologique",
            sectionTitle: "La sécurité",
            sectionTitleHighlight: "vue de l'intérieur.",
            sectionDescription: "Découvrez nos trois piliers technologiques Teltonika intégrés nativement à Karangué221 pour une sécurité absolue.",
            items: [
                {
                    id: "dsm",
                    label: "Surveillance Conducteur",
                    title: "DSM",
                    description: "Un système d'intelligence artificielle qui scanne le visage du conducteur en temps réel pour détecter les signes de fatigue et les distractions.",
                    highlight1: "signes de fatigue",
                    highlight2: "distractions",
                    benefitsLabel: "Bénéfices Karangué221",
                    benefits: ["Détection fatigue & somnolence", "Alerte distraction (téléphone)", "Vérification port de ceinture", "Preuve vidéo comportementale"],
                    ctaText: "Voir le DSM en action",
                    imagePath: "/VUEDSM.png",
                    deviceImagePath: "/device-dsm.png"
                },
                {
                    id: "adas",
                    label: "Assistance Route",
                    title: "ADAS",
                    description: "Une caméra savante qui lit la route devant le véhicule. Elle anticipe les dangers et alerte le conducteur via le Coach Conduite avant l'impact.",
                    highlight1: "Coach Conduite",
                    highlight2: "",
                    benefitsLabel: "Bénéfices Karangué221",
                    benefits: ["Alerte collision frontale (FCW)", "Alerte de sortie de voie (LDW)", "Détection piétons & obstacles", "Lecture panneaux vitesse"],
                    ctaText: "Découvrir l'ADAS",
                    imagePath: "/VUEADAS.png",
                    deviceImagePath: "/device-adas.png"
                },
                {
                    id: "dualcam",
                    label: "Preuve Vidéo",
                    title: "DualCam",
                    description: "Un système double objectif connectés qui filme simultanément la route et l'habitacle. Les séquences d'incidents sont automatiquement envoyées sur le cloud Karangué221.",
                    highlight1: "cloud Karangué221",
                    highlight2: "",
                    benefitsLabel: "Bénéfices Karangué221",
                    benefits: ["Preuve irréfutable (fraude/accident)", "Exonération conducteur (non-responsable)", "Formation par l'image", "Protection contre vol marchandise"],
                    ctaText: "Voir les preuves DualCam",
                    imagePath: "/VUEDUALCAM.png",
                    deviceImagePath: "/device-dualcam.png"
                }
            ]
        },
        ecosystem: {
            title: "Un Écosystème Connecté",
            items: [
                { title: "Sécurité Active", description: "Détection des risques avant l'accident (DSM + ADAS)" },
                { title: "Preuve Différée", description: "Documentation vidéo cloud des incidents (DualCam)" },
                { title: "Résultat Mesurable", description: "-50% d'accidents en année 1" }
            ]
        },
        platformDetail: {
            sectionLabel: "Le Cerveau des Opérations",
            sectionTitle: "Pilotez tout depuis",
            sectionTitleHighlight: "une interface unique.",
            sectionDescription: "Finies les multiples plateformes. Retrouvez téléavertissement, vidéo et analyse de performance au même endroit.",
            features: {
                tracking: {
                    title: "Visibilité Totale",
                    description: "Suivez vos véhicules en temps réel sur une carte interactive fluide. Historique de trajet, arrêts, et statuts moteur en un coup d'œil.",
                    statusLabel: "Statut Flotte",
                    statusValue: "54 Véhicules Actifs",
                    tags: ["Position GPS Exacte", "Replay Trajet", "Alertes Sortie de Zone", "Identification Chauffeur"],
                    imagePath: "/tracking.png"
                },
                dashboard: {
                    title: "Décisions Data-Driven",
                    description: "Transformez vos données brutes en actions concrètes. Rapports de consommation, scores d'éco-conduite, et maintenance prédictive.",
                    scoreLabel: "Score Éco-Conduite",
                    scoreValue: "94/100",
                    savingsLabel: "Économie Carburant",
                    savingsValue: "-15%",
                    imagePath: "/dashboard.png"
                },
                video: {
                    title: "Vidéo à la Demande",
                    description: "Accédez aux caméras en direct ou revivez les incidents passés. Preuves HD téléchargeables instantanément.",
                    ctaText: "Demander une démo",
                    imagePath: "/video focus.png"
                },
                geofencing: {
                    title: "Geofencing Intelligent",
                    description: "Définissez des zones autorisées (dépôts, clients) ou interdites. Soyez alerté instantanément par email/SMS.",
                    alertLabel: "Alerte: Sortie de Zone",
                    imagePath: "/geofencing.png"
                }
            }
        },
        finalCta: {
            title: "Prêt à transformer",
            titleHighlight: "votre flotte ?",
            description: "Rejoignez les gestionnaires qui ont choisi la sérénité opérationnelle avec Karangué221.",
            ctaPrimary: "Calculer mon ROI",
            ctaSecondary: "Demander une démo"
        },
    },
    footer: {
        mission: "Bâtir le futur de la <span class=\"text-teal underline underline-offset-[12px] decoration-white/20\">sécurité routière.</span>",
        description: "AI-Karangué est une solution haut de gamme éditée par <span class=\"text-white font-bold\">Art'Beau-Rescence S.A.S.</span>, fusionnant vision par ordinateur et télématique de pointe.",
        address: "Ouakam<br /> Dakar, Sénégal",
        phone: "+221 78 786 48 48",
        copyright: "ALL RIGHTS RESERVED. © 2025 ART'BEAU-RESCENCE S.A.S.",
        trademark: "AI-Karangué et Karangué221 sont des marques déposées.",
        social: {
            linkedin: "https://www.linkedin.com/showcase/ai-karangue/",
            whatsapp: "https://whatsapp.com/channel/0029VbCXzgC7tkjF456PtX0n",
            instagram: "https://www.instagram.com/aikarangue/",
            facebook: "https://www.facebook.com/profile.php?id=61586184256156",
            youtube: "https://www.youtube.com/@AI-KarangueAI-Karangue",
            tiktok: "https://www.tiktok.com/@aikarangue"
        },
        newsletter: {
            placeholder: "votre.email@entreprise.com",
            buttonText: "S'abonner"
        },
        navigation: {
            technology: {
                title: "Technologie",
                links: [
                    { label: "Karangué221", href: "/#hardware" },
                    { label: "Intelligence IA", href: "/#software" },
                    { label: "Suivi Personnel", href: "/tracking" },
                    { label: "Analyse Vidéo", href: "/#software" },
                    { label: "Cloud Dashboard", href: "/#software" },
                    { label: "FAQ", href: "/faq" }
                ]
            },
            sectors: {
                title: "Secteurs",
                links: [
                    { label: "Transport Public", href: "/industries#transport" },
                    { label: "Logistique Pro", href: "/industries#logistics" },
                    { label: "Assurance Connectée", href: "/industries#btp" }
                ]
            },
            company: {
                title: "Art'Beau-Rescence"
            }
        },
        legal: {
            links: ["Confidentialité", "Cookies", "Légal"]
        }
    },
    meta: {
        title: "AI-Karangué | Tranquillité d'Esprit & Gestion de Flotte Intelligente",
        description: "Solution leader de télématique et gestion de flotte au Sénégal. Karangué221 offre la sérénité totale aux conducteurs, managers et voyageurs grâce au Triple Impact."
    },
    contact: {
        hero: {
            label: "Démonstration Personnalisée",
            title: "Passez au niveau supérieur.",
            description: "Découvrez comment AI-Karangué transforme vos données brutes en leviers de rentabilité. Réservez une démo de 30 minutes avec un expert sectoriel.",
            features: [
                "Audit gratuit de votre flotte actuelle",
                "Simulation de ROI en direct",
                "Plan de déploiement sur-mesure"
            ]
        },
        info: {
            phone: { label: "Téléphone", value: "+221 78 786 48 48" },
            email: { label: "Email", value: "contact@aikarangue.com" },
            address: { label: "Siège", value: "Dakar, Sénégal" }
        },
        form: {
            title: "Parlons de votre projet",
            description: "Remplissez ce formulaire, nous vous recontactons sous 24h ouvrées.",
            labels: {
                firstName: "Prénom *",
                lastName: "Nom *",
                email: "Email *",
                company: "Entreprise *",
                fleetSize: "Taille de la flotte",
                message: "Message (Facultatif)",
                fleetOptions: ["1 - 10 véhicules", "11 - 50 véhicules", "51 - 200 véhicules", "200+ véhicules"],
                submit: "Demander une démo",
                sending: "Envoi en cours...",
                success: "Message envoyé !",
                error: "Erreur lors de l'envoi",
                privacy: "En cliquant, vous acceptez notre politique de confidentialité. Vos données sont sécurisées."
            },
            placeholders: {
                firstName: "John",
                lastName: "Doe",
                email: "john@entreprise.com",
                company: "Votre Société",
                message: "Dites-nous en plus sur vos besoins..."
            }
        }
    },
    navbar: {
        links: [
            { name: "Solutions", href: "/solutions" },
            { name: "Industries", href: "/industries" },
            { name: "Nos Offres", href: "/offres" },
            { name: "Suivi Personnel", href: "/tracking" },
            { name: "Blog", href: "/blog" },
            { name: "FAQ", href: "/faq" }
        ],
        cta: "Demander une démo"
    },
    industries: {
        hero: {
            label: "Solutions Sectorielles",
            title: "Des solutions",
            titleHighlight: "sur mesure",
            description: "Chaque industrie a ses règles, ses risques et ses opportunités. Nous avons conçu des solutions natives pour chacune d'elles."
        },
        sectors: [
            {
                id: "logistics",
                categoryId: "Productivité",
                title: "Logistique & Livraison",
                highlight: "Last-Mile",
                hook: "Vos livreurs sont sur la route. Mais sont-ils sur votre route ?",
                problem: "Détours non déclarés sur Dakar-Pikine-Guédiawaye, livraisons non effectuées facturées, vol de colis, consommation carburant incontrôlée.",
                benefits: [
                    { label: "Trajets", value: "-20%", description: "de kilométrage à vide grâce à l'optimisation des tournées" },
                    { label: "Litiges", value: "0", description: "litige client non résolu avec preuve de livraison horodatée" },
                    { label: "Reporting", value: "0h", description: "réduction du temps de reporting par chauffeur de 3h à quasi néant" }
                ],
                features: ["Optimisation de tournées", "Suivi des points de livraison", "Alertes arrêts non planifiés", "Rapport chauffeur automatique", "Application mobile dispatcher"],
                ctaText: "Voir la solution",
                imagePath: "/industry_Logistique-Livraison-Last-Mile.png",
                type: "detailed",
                description: ""
            },
            {
                id: "public_transport",
                categoryId: "Sécurité",
                title: "Transport Public &",
                highlight: "Minibus",
                hook: "Vos passagers font confiance à votre chauffeur. Et vous ?",
                problem: "Excès de vitesse sur la VDN, chauffeurs qui dévient des lignes pour courses personnelles, accidents, pas de visibilité sur les horaires réels.",
                benefits: [
                    { label: "Sécurité", value: "100%", description: "suivi temps réel de chaque car rapide/bus sur sa ligne officielle" },
                    { label: "Accidents", value: "Baisse", description: "alerte excès de vitesse configurée à 60 km/h (limite urbaine Dakar)" },
                    { label: "Ponctualité", value: "Fiable", description: "rapports de ponctualité automatiques pour restaurer la confiance" }
                ],
                features: ["Suivi de lignes et arrêts", "Alertes vitesse", "Géofences de dépôt", "Historique des trajets", "Scoring conducteur", "Panneau passagers (option)"],
                ctaText: "Protéger ma flotte",
                imagePath: "/industry_Transport-Public-Minibus.png",
                type: "detailed",
                description: ""
            },
            {
                id: "btp",
                categoryId: "Productivité",
                title: "BTP, Mines &",
                highlight: "Carrières",
                hook: "Sur un chantier, une heure d'engin immobilisé coûte plus qu'une journée de bureau.",
                problem: "Heures moteur non facturées, engins qui quittent le chantier la nuit, vol de carburant sur groupes électrogènes et engins, maintenance imprévisible.",
                benefits: [
                    { label: "Temps Machine", value: "Précis", description: "suivi des heures moteur à la minute pour une facturation chantier exacte" },
                    { label: "Sécurité", value: "24h/24", description: "alerte immédiate si engin sort du périmètre de chantier après 18h" },
                    { label: "Pannes", value: "-30%", description: "de pannes imprévues grâce à la maintenance préventive planifiée" }
                ],
                features: ["Heures moteur", "Géofence périmétrique", "Suivi carburant groupes électrogènes", "Alertes chocs/basculement", "Maintenance planifiée", "Suivi multi-sites"],
                ctaText: "Calculer mes pertes",
                imagePath: "/industry_BTP-Mines-Carrieres.png",
                type: "detailed",
                description: ""
            },
            {
                id: "hydrocarbons",
                categoryId: "Carburant",
                title: "Hydrocarbures &",
                highlight: "Distribution",
                hook: "Le carburant que vous distribuez arrive-t-il vraiment à destination ?",
                problem: "Détournement de carburant sur les camions-citernes, livraisons partielles non déclarées, routes non respectées entre dépôts et stations.",
                benefits: [
                    { label: "Précision", value: "99,5%", description: "Sonde carburant sur citerne : volume livré vs volume facturé" },
                    { label: "Traçabilité", value: "Totale", description: "de chaque livraison (heure, lieu, volume, temps d'arrêt)" },
                    { label: "Sécurité", value: "Alerte", description: "Alerte immédiate en cas de drainage anormal en route" }
                ],
                features: ["Capteurs précision sur citernes", "Traçage de tournées de livraison", "Rapports de distribution", "Alertes déchargement non autorisé", "Géofences stations"],
                ctaText: "Sécuriser ma distribution",
                imagePath: "/industry_Hydrocabures-Distribution.png",
                type: "detailed",
                description: ""
            },
            {
                id: "security",
                categoryId: "Sécurité",
                title: "Sécurité &",
                highlight: "Gardiennage",
                hook: "Vos agents protègent vos clients. Qui protège vos agents — et votre réputation ?",
                problem: "Agents qui ne font pas leurs rondes, véhicules d'intervention qui n'arrivent pas à temps, aucune preuve de passage terrain, faux rapports.",
                benefits: [
                    { label: "Contrats", value: "Prouvés", description: "Preuve horodatée de chaque point de ronde pour un contrat inattaquable" },
                    { label: "Réactivité", value: "Mesurée", description: "Temps d'intervention moyen mesurable et optimisable" },
                    { label: "Contrôle", value: "100%", description: "Traçabilité complète des véhicules d'intervention 24h/24" }
                ],
                features: ["Suivi rondes et checkpoints", "Alertes intervention", "Historique trajets agents", "Rapport d'activité client", "Bouton panique agent"],
                ctaText: "Voir la solution",
                imagePath: "/industry_Securite-Gardiennage.png",
                type: "detailed",
                description: ""
            },
            {
                id: "rental",
                categoryId: "Sécurité",
                title: "Location de Véhicules &",
                highlight: "Leasing",
                hook: "Votre véhicule est parti. Mais votre argent, lui, revient-il ?",
                problem: "Impayés, véhicules introuvables, utilisation en dehors des conditions du contrat (kilométrage dépassé, zones interdites), dommages non déclarés.",
                benefits: [
                    { label: "Risque", value: "Neutralisé", description: "Immobilisation à distance en 1 clic pour recouvrement sans intervention physique" },
                    { label: "Contrôle", value: "Régional", description: "Alerte de sortie de zone si le véhicule quitte la région non autorisée" },
                    { label: "Facturation", value: "Juste", description: "Rapport kilométrique automatique pour une facturation exacte" }
                ],
                features: ["Coupure moteur à distance", "Géofence forfaitaire", "Rapport KM journalier", "Historique trajets 90 jours", "Alerte vitesse", "Identifiant conducteur (iButton)"],
                ctaText: "Protéger mes actifs",
                imagePath: "/industry_Location-de-Véhicules.png", // Correct new image
                type: "detailed",
                description: ""
            },
            {
                id: "agriculture",
                categoryId: "Sécurité",
                title: "Agriculture, Élevage &",
                highlight: "Asset Management",
                hook: "Votre bétail, vos machines, vos récoltes — tout ce qui a de la valeur mérite d'être protégé.",
                problem: "Vol de bétail fréquent (contexte Sénégal rural), engins agricoles qui quittent l'exploitation, impossibilité de gérer à distance un domaine agricole.",
                benefits: [
                    { label: "Localisation", value: "Temps réel", description: "Tracker discret intégré dans un collier pour suivre le bétail même depuis Dakar" },
                    { label: "Limites", value: "Sécurisées", description: "Alerte immédiate si un animal sort de la géofence du domaine" },
                    { label: "Machines", value: "Suivies", description: "Suivi des tracteurs pour décompte exact des heures par champ" }
                ],
                features: ["Asset tracking long-terme", "Géofences multiples", "Alertes sortie de zone", "Rapport d'activité agricole", "Batterie longue durée (années)"],
                ctaText: "Suivre mes actifs",
                imagePath: "/industry_Agriculture-elevage-Asset-Management.png",
                type: "detailed",
                description: ""
            },
            {
                id: "cold_chain",
                categoryId: "Conformité",
                title: "Transport Frigorifique &",
                highlight: "Chaîne du Froid",
                hook: "Vos produits frais voyagent sous le chaud soleil sénégalais. Savez-vous à quelle température ils arrivent ?",
                problem: "Rupture de chaîne du froid non détectée, portes arrière ouvertes trop longtemps, compresseurs défaillants, marchandises perdues ou avariées.",
                benefits: [
                    { label: "Pertes", value: "0", description: "Capteur température avec alerte immédiate si la courroie frigorifique lâche" },
                    { label: "Sécurité", value: "Cargo", description: "Alerte à chaque ouverture des portes arrière pour éviter les vols" },
                    { label: "Hygiène", value: "Garantie", description: "Rapport de température de bout en bout pour conformité sanitaire" }
                ],
                features: ["Capteurs Température/Humidité", "Alertes seuils critiques", "Suivi d'ouverture de portes", "Rapport Chaîne du Froid", "Historique des variations"],
                ctaText: "Protéger mes cargos",
                imagePath: "/industry_Transport-Frigorifique-Chaine-du-Froid.png",
                type: "detailed",
                description: ""
            },
            {
                id: "health",
                categoryId: "Productivité",
                title: "Santé, Ambulances &",
                highlight: "Urgence",
                hook: "Chaque minute compte. Savez-vous où est votre ambulance en ce moment ?",
                problem: "Temps de réponse trop longs, véhicules médicaux utilisés à des fins privées, aucune traçabilité pour les rapports du ministère.",
                benefits: [
                    { label: "Dispatch", value: "Immédiat", description: "Affectez toujours l'ambulance la plus proche de l'intervention" },
                    { label: "Conformité", value: "100%", description: "Rapport d'intervention automatique (départ, arrivée, temps sur site)" },
                    { label: "Contrôle", value: "Strict", description: "Alerte d'utilisation de l'ambulance en dehors des plages de service" }
                ],
                features: ["Suivi flotte urgences", "Dispatch en temps réel", "Rapports officiels", "Alertes utilisation non autorisée", "Sirène / Statut gyro"],
                ctaText: "Optimiser le dispatch",
                imagePath: "/industry_Sante-Ambulances-Urgence.png",
                type: "detailed",
                description: ""
            },
            {
                id: "school",
                categoryId: "Sécurité",
                title: "Écoles & Transport",
                highlight: "d'Enfants",
                hook: "Les parents vous confient ce qu'ils ont de plus précieux. Méritez cette confiance.",
                problem: "Parents inquiets, accidents non signalés, chauffeurs imprudents, retards sans explication.",
                benefits: [
                    { label: "Tranquillité", value: "Totale", description: "Notification (optionnelle) à l'arrivée sécurisée à l'établissement" },
                    { label: "Sécurité", value: "Priorité", description: "Scoring conducteur agressif configuré spécifiquement pour la sécurité infantile" },
                    { label: "Déviations", value: "Bloquées", description: "Alerte au manager si le bus dévie du parcours scolaire prévu" }
                ],
                features: ["Géofences école/domicile", "Notification parentale", "Scoring sécurité enfants", "Limitation stricte vitesse", "Suivi itinéraire en temps réel"],
                ctaText: "Voir la démo",
                imagePath: "/industry_Transport-Scolaire-Enfants.png",
                type: "detailed",
                description: ""
            },
            {
                id: "government",
                categoryId: "Conformité",
                title: "Administration & Flottes",
                highlight: "Gouvernementales",
                hook: "Les véhicules de l'État appartiennent au peuple. Gérez-les avec transparence.",
                problem: "Véhicules administratifs utilisés le weekend, parc immense hors contrôle, audits impossibles à chiffrer précisément.",
                benefits: [
                    { label: "Audit", value: "1 clic", description: "Rapport d'utilisation mensuel global par direction administrative" },
                    { label: "Contrôle", value: "Week-end", description: "Notifications pour toute mise en route le weekend non autorisée" },
                    { label: "Identité", value: "Vérifiée", description: "Clé iButton ou badge RFID obligatoire pour démarrer le véhicule" }
                ],
                features: ["Planification d'usage weekend", "Rapports ministériels", "Contrôle d'accès chauffeur", "Suivi des dépenses indirectes", "Coupure à distance"],
                ctaText: "Auditer ma flotte",
                imagePath: "/industry_Administration-Publique-Flottes-Gouvernementales.png",
                type: "detailed",
                description: ""
            },
            {
                id: "tourism",
                categoryId: "Productivité",
                title: "Tourisme, Agences &",
                highlight: "Safaris",
                hook: "Vos touristes découvrent le Sénégal. Gérez votre flotte l'esprit tranquille, même en brousse.",
                problem: "Accidents de chauffeurs en zones rurales (Casamance, Saloum), véhicules injoignables sans réseau, pas de rapport d'incident.",
                benefits: [
                    { label: "Couverture", value: "Maximale", description: "Suivi satellite / 4G étendu avec mémoire interne tampon (Blackbox)" },
                    { label: "Preuves", value: "Assurance", description: "Historique précis du comportement du conducteur en cas d'accident" },
                    { label: "Clientèle", value: "Rassurée", description: "Possibilité de partager des liens de tracking éphémères aux clients/familles" }
                ],
                features: ["Module mémoire hors-réseau", "Liens de tracking temporaires", "Analytique de parcours touristique", "Alertes comportement", "Suivi multi-régions"],
                ctaText: "Protéger mes safaris",
                imagePath: "/industry_Tourisme-Safari-Agences-de-Voyage.png",
                type: "detailed",
                description: ""
            }
        ],
        otherSectors: [],
        finalCta: {
            title: "Votre industrie a ses défis.",
            titleHighlight: "Nous avons les réponses.",
            description: "Ne laissez plus l'inconnu gérer vos opérations. Prenez le contrôle avec AI-Karangué.",
            ctaPrimary: "Demander une démo",
            ctaSecondary: "Voir les offres"
        }
    },
    offres: {
        hero: {
            label: "Tarification Transparente",
            title: "Investir dans la",
            highlight: "certitude.",
            description: "Des options claires, sans coûts cachés. Choisissez le niveau de contrôle qui correspond à vos ambitions."
        },
        packs: [
            {
                name: "Pack Basic",
                price: "Sur devis",
                tagline: "L'essentiel pour débuter",
                features: ["Géolocalisation TR", "Coupe-moteur", "Géo-clôtures", "App mobile"],
                ctaText: "Demander une démo",
                popular: false
            },
            {
                name: "Pack Tranquillité",
                price: "Sur devis",
                tagline: "Le Triple Impact complet",
                features: ["Pack Basic +", "Boîtier déconnectable", "Logiciel IA Expert", "Support Prioritaire"],
                ctaText: "Demander une démo",
                popular: true
            },
            {
                name: "Pack Standard",
                price: "Sur devis",
                tagline: "Performance & Analyse",
                features: ["Sonde de carburant", "Rapports ECO-conduite", "Maintenance préventive"],
                ctaText: "Demander une démo",
                popular: false
            }
        ],
        comparison: {
            title: "Comparaison",
            highlight: "Détaillée",
            description: "Une vue d'ensemble pour faire le bon choix.",
            headers: ["Caractéristique", "Basic", "Standard", "Tranquillité"],
            rows: [
                ["Suivi GPS Temps Réel", true, true, true],
                ["Historique des Trajets", "3 Mois", "12 Mois", "Illimité"],
                ["Gestion Carburant (Sondes)", true, true, true],
                ["Alertes Maintenance", false, true, true],
                ["Immobilisation à Distance", false, true, true],
                ["Score Éco-Conduite", false, true, true],
                ["Caméras Embarquées (Dashcam)", false, false, "Option"],
                ["DSM (Fatigue Detect)", false, false, true],
                ["ADAS (Assistance Route)", false, false, true],
                ["Support Prioritaire", false, false, true]
            ]
        },
        services: {
            support: {
                title: "Support Platinum Dédié 24/7.",
                description: "Pas de chatbots frustrants. Une équipe d'ingénieurs basée à Dakar, prête à intervenir sur site ou à distance en moins de 2h.",
                label: "Équipe Locale"
            },
            installation: {
                title: "Installation Express",
                description: "Déploiement de 50+ véhicules en moins d'une semaine. Nos techniciens viennent à vous, partout au Sénégal."
            },
            updates: {
                title: "Mises à jour OTA",
                description: "Votre système s'améliore avec le temps. Mises à jour logicielles à distance incluses dans tous les packs."
            },
            training: {
                title: "Formation Continue Incluse",
                description: "Nous formons vos gestionnaires et vos conducteurs à l'utilisation optimale de Karangué221 pour garantir un ROI immédiat."
            }
        },
        finalCta: {
            title: "Un doute ?",
            highlight: "Testez-nous.",
            description: "Demandez une analyse gratuite de votre flotte et découvrez combien vous pouvez économiser dès le premier mois.",
            ctaPrimary: "Contacter un expert"
        }
    },
    blog: {
        hero: {
            label: "Insights & Vision",
            title: "NOTRE",
            highlight: "PERSPECTIVE.",
            description: "Analyses, innovations et visions sur la transformation de la mobilité en Afrique par l'intelligence artificielle."
        },
        post: {
            backToBlog: "RETOUR AU BLOG",
            notFound: "Article introuvable",
            share: "PARTAGER L'ARTICLE",
            ctaTitle: "PRÊT À RÉVOLUTIONNER <br /> <span class=\"text-teal underline decoration-white/10 underline-offset-8\">VOTRE FLOTTE ?</span>",
            ctaSolutions: "DÉCOUVRIR NOS SOLUTIONS",
            ctaContact: "NOUS CONTACTER"
        }
    },
    tracking: {
        hero: {
            label: "LOGISTIQUE MOBILE",
            title: "Suivi du Personnel pour les Flottes de Livraison",
            description: "Optimisez vos opérations avec Sama Karangué et Karangué221. Une visibilité totale et un contrôle sans précédent sur vos opérations de terrain.",
            imagePath: "/tracking-hero-v2.png"
        },
        sama: {
            title: "Sama Karangué : L’Intelligence Mobile au Service de vos Livreurs",
            description: "Installée sur les smartphones de vos livreurs, elle dote votre personnel d’outils interactifs et sécurisés pour une exécution fluide et transparente des livraisons.",
            features: {
                title: "Fonctionnalités Clés",
                items: [
                    { title: "Localisation GPS de Précision", description: "Chaque smartphone devient un traceur GPS avancé, transmettant en temps réel position, vitesse et parcours.", icon: "MapPin" },
                    { title: "Chat Sécurisé", description: "Coordination fluide entre livreurs et dispatchers avec échange de messages, photos et codes QR.", icon: "MessageSquare" },
                    { title: "Bouton SOS d’Urgence", description: "Envoi rapide de messages d'alarme et appel automatique des secours en cas de situation critique.", icon: "AlertTriangle" },
                    { title: "Preuves de Livraison", description: "Scan de codes QR et envoi de photos horodatées et géolocalisées pour une traçabilité irréfutable.", icon: "Camera" },
                    { title: "Statuts en Temps Réel", description: "Mise à jour immédiate de la disponibilité (Disponible, En Livraison, En Pause).", icon: "UserCheck" },
                    { title: "Boîte Noire", description: "Stockage local des données jusqu'à 30 jours en cas de perte de connexion internet.", icon: "Database" }
                ]
            },
            images: ["/sama-1.png", "/sama-2.png", "/sama-3.png"]
        },
        karangue221: {
            title: "Karangué221 : La Plateforme de Supervision Intelligente",
            description: "Votre centre de commande pour une gestion de flotte de livraison sans effort. Une suite complète d'outils pour la supervision, l'analyse et l'optimisation.",
            features: [
                { title: "Suivi en Temps Réel", description: "Visualisez la position exacte de chaque livreur sur une carte interactive détaillée.", icon: "Eye" },
                { title: "Geofencing Avancé", description: "Créez des zones personnalisées et recevez des alertes instantanées aux entrées et sorties.", icon: "Map" },
                { title: "Notifications Intelligentes", description: "Alertes automatiques pour excès de vitesse, batterie faible, ou messages SOS.", icon: "Bell" },
                { title: "Analytiques Détaillés", description: "Rapports complets sur les trajets, l'éco-conduite et les performances du personnel.", icon: "BarChart3" },
                { title: "Configuration à Distance", description: "Ajustez les paramètres de l'application Sama Karangué sur les smartphones à distance.", icon: "Settings" },
                { title: "Optimisation des Coûts", description: "Analysez les données pour identifier les opportunités d'économies de carburant.", icon: "TrendingDown" }
            ],
            imagePath: "/tracking-cloud-v2.png"
        },
        benefits: {
            title: "Avantages Clés",
            items: [
                { title: "Efficacité Opérationnelle", description: "Optimisez les itinéraires et réduisez les temps d'inactivité.", icon: "Zap" },
                { title: "Sécurité Renforcée", description: "Assurez la sécurité de vos livreurs grâce aux alertes SOS et au suivi temps réel.", icon: "Shield" },
                { title: "Qualité de Service", description: "Fournissez des preuves de livraison fiables et respectez vos délais.", icon: "Star" },
                { title: "Décision Data-Driven", description: "Accédez à des analyses détaillées pour identifier les tendances et améliorer vos processus.", icon: "PieChart" }
            ]
        },
        finalCta: {
            title: "Prêt à moderniser vos",
            highlight: "opérations logistiques ?",
            description: "Rejoignez les entreprises qui font confiance à AI-Karangué pour la gestion de leur personnel mobile.",
            ctaPrimary: "Demander une démo",
            imagePath: "/posters/1.png"
        },
        detailedFeatures: []
    }
};

// Async fetch for content
export const getContent = async (): Promise<SiteContent> => {
    if (typeof window === "undefined") return defaultContent;

    try {
        const res = await fetch("/api/cms/content");
        if (!res.ok) throw new Error("Failed to fetch");
        return await res.json();
    } catch (error) {
        console.error("Error fetching content:", error);
        // Fallback to local storage if API fails temporarily or first load
        const stored = localStorage.getItem("siteContent");
        return stored ? JSON.parse(stored) : defaultContent;
    }
};

// Async save for content
export const saveContent = async (content: SiteContent) => {
    if (typeof window === "undefined") return;

    try {
        const res = await fetch("/api/cms/content", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(content),
        });

        if (!res.ok) throw new Error("Failed to save");

        // Update local storage as backup/cache if needed, but primary is now API
        // actually remove from local storage to avoid confusion/quota issues?
        // Let's keep a minimal sync or just rely on API. 
        // For now, let's CLEAR local storage to free up quota as requested by user.
        localStorage.removeItem("siteContent");

    } catch (error) {
        console.error("Error saving content:", error);
        throw error;
    }
};

export const resetContent = async () => {
    if (typeof window === "undefined") return;
    await saveContent(defaultContent);
};
