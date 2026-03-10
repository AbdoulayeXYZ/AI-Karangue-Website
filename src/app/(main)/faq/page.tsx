import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, buildOpenGraph, buildTwitter, faqSchema, breadcrumbSchema } from "@/lib/seo";

// ─── FAQ Data — 15 questions clés (AEO + Google Rich Snippets) ────────────────
export const FAQ_ITEMS = [
  {
    question: "Qu'est-ce que la gestion de flotte connectée ?",
    answer:
      "La gestion de flotte connectée est un système qui permet de suivre, analyser et optimiser en temps réel l'ensemble des véhicules d'une entreprise via GPS, capteurs embarqués et logiciel cloud. Elle regroupe le suivi GPS, la surveillance des conducteurs (DSM), la prévention des accidents (ADAS), l'enregistrement vidéo (DualCam) et le reporting de performance. AI-Karangué propose la plateforme Karangué221 qui centralise toutes ces fonctions pour les flottes au Sénégal et en Afrique de l'Ouest.",
  },
  {
    question: "Comment fonctionne le suivi GPS en temps réel avec Karangué221 ?",
    answer:
      "La balise installé dans chaque véhicule transmet sa position GPS toutes les 10 secondes via réseau 4G/LTE. La plateforme Karangué221 affiche en temps réel la carte de tous vos véhicules, leur vitesse, leur direction et leur statut (moteur allumé/éteint). Vous recevez des alertes instantanées par SMS et email pour les excès de vitesse, sorties de zone (géofencing), arrêts non planifiés et incidents. L'historique complet des trajets est conservé 12 mois.",
  },
  {
    question: "Quelle est la différence entre ADAS et DSM ?",
    answer:
      "L'ADAS (Advanced Driver Assistance System) surveille la route devant le véhicule grâce à une caméra frontale avec IA : il détecte les risques de collision frontale, les franchissements de ligne de marquage et les distances de sécurité insuffisantes. Il protège le véhicule et les tiers. Le DSM (Driver State Monitoring) surveille le conducteur lui-même via une caméra infrarouge orientée vers le visage : il détecte la somnolence, la distraction (téléphone, regard dévié), le non-port de ceinture et la cigarette. AI-Karangué est la seule société au Sénégal à proposer les deux systèmes simultanément sur le même boîtier Teltonika.",
  },
  {
    question: "Combien coûte une solution de gestion de flotte au Sénégal ?",
    answer:
      "Le coût d'une solution AI-Karangué comprend le matériel (boîtier GPS + caméras) et l'abonnement mensuel à la plateforme Karangué221. Le pack Starter est accessible dès les petites flottes de 3 véhicules. Le retour sur investissement moyen constaté chez nos clients est de 3 à 6 mois, principalement grâce à la réduction de la consommation de carburant (15-25%), la baisse des accidents et l'optimisation des trajets. Contactez-nous pour un devis gratuit personnalisé selon la taille de votre flotte.",
  },
  {
    question: "Quels types de véhicules peuvent être équipés par AI-Karangué ?",
    answer:
      "AI-Karangué équipe tous types de véhicules motorisés : camions poids lourds, bus et minibus, berlines et SUV, véhicules utilitaires légers, engins de chantier (BTP), motos de livraison. Le boîtier Teltonika FMC650 est compatible avec tous véhicules 12V et 24V. L'installation prend 2 à 4 heures par véhicule et est réalisée par nos techniciens certifiés à Dakar.",
  },
  {
    question: "Comment réduire la consommation de carburant grâce à la télématique ?",
    answer:
      "La télématique réduit la consommation de carburant de 15 à 25% en moyenne en agissant sur plusieurs leviers : détection et signalement de la conduite agressive (accélérations brutales, freinages brusques, ralenti excessif), optimisation des itinéraires pour réduire les kilomètres parcourus, détection du vol de carburant grâce aux capteurs de niveau, et analyse des heures de ralenti moteur inutile. La plateforme Karangué221 génère des rapports hebdomadaires d'éco-conduite pour chaque chauffeur.",
  },
  {
    question: "L'ADAS peut-il fonctionner sur les routes sénégalaises et africaines ?",
    answer:
      "Oui, le système ADAS embarqué par AI-Karangué est spécifiquement calibré pour les conditions routières africaines : routes sans marquage, présence de motos et piétons, luminosité forte. Le système s'appuie sur l'IA embarquée du boîtier Teltonika, sans nécessiter de marquage au sol pour les alertes de distance. Les seuils d'alerte sont configurables selon le type de route et de véhicule. Nos clients transporteurs sur les axes Dakar-Touba, Dakar-Tambacounda et Dakar-Bamako l'utilisent quotidiennement.",
  },
  {
    question: "Quelle est la durée d'enregistrement vidéo de la DualCam ?",
    answer:
      "La caméra DualCam enregistre en continu en HD (1080p avant, 720p habitacle) sur carte SD locale de 64 Go, soit environ 48 à 72 heures d'enregistrement en boucle selon la qualité configurée. Les événements critiques (accident, freinage d'urgence, alerte ADAS/DSM) sont automatiquement sauvegardés en priorité et envoyés vers le cloud Karangué221 en moins de 30 secondes. L'accès aux vidéos se fait depuis la plateforme web ou l'application mobile, avec téléchargement possible en cas de besoin juridique.",
  },
  {
    question: "Comment le DSM détecte-t-il la somnolence du conducteur ?",
    answer:
      "Le DSM utilise une caméra infrarouge pointée vers le visage du conducteur et un algorithme d'intelligence artificielle qui analyse en temps réel la fréquence de clignement des yeux, l'ouverture des paupières, l'orientation de la tête et les micro-siestes. Lorsqu'une somnolence est détectée, une alarme sonore forte est déclenchée dans la cabine, une notification est envoyée immédiatement au gestionnaire de flotte, et l'événement est enregistré avec timestamp et capture vidéo. Le taux de détection de faux positifs est inférieur à 2%.",
  },
  {
    question: "Quels sont les avantages de Karangué221 par rapport à d'autres plateformes de flotte ?",
    answer:
      "Karangué221 est la seule plateforme de gestion de flotte conçue et optimisée pour le marché sénégalais et ouest-africain : interface disponible en français, support client en français et wolof, serveurs hébergés en Afrique pour réduire la latence, intégration native avec les boîtiers Teltonika FMC650, et modules spécifiques aux contraintes locales (routes non cartographiées, zones 4G partielles). Contrairement aux plateformes internationales génériques, AI-Karangué offre formation complète, installation et maintenance sur site à Dakar.",
  },
  {
    question: "AI-Karangué est-il compatible avec tous les boîtiers GPS Teltonika ?",
    answer:
      "AI-Karangué est partenaire officiel Teltonika et supporte nativement les modèles FMC650 (recommandé, avec ADAS+DSM), FMC130, FMB130, FMT100 et FMB920. La plateforme Karangué221 est basée sur Wialon et supporte également d'autres marques de boîtiers GPS (Galileosky, Queclink, Concox). Si vous avez déjà des boîtiers installés, notre équipe technique peut évaluer la compatibilité gratuitement.",
  },
  {
    question: "Comment obtenir une démonstration de la plateforme AI-Karangué ?",
    answer:
      "Vous pouvez demander une démonstration gratuite en remplissant le formulaire sur aikarangue.artbeaurescence.sn/contact. Notre équipe vous contacte sous 24h pour organiser soit une démo en ligne (45 minutes sur Zoom/Google Meet), soit une visite dans nos bureaux à Ouakam, Dakar, soit un déplacement dans vos locaux pour les flottes de plus de 10 véhicules. La démonstration est entièrement gratuite et sans engagement.",
  },
  {
    question: "Quel est le retour sur investissement moyen d'une solution de flotte connectée ?",
    answer:
      "Le ROI moyen d'une solution AI-Karangué est atteint en 3 à 6 mois. Les économies proviennent de : réduction carburant 15-25% (principale source), baisse des accidents et réparations (-30 à 40%), réduction des primes d'assurance (-10 à 20% avec certains assureurs), optimisation des heures de travail (-10 à 15%), et récupération de véhicules volés (taux de récupération >85% avec notre système). Un transporteur de 20 camions économise en moyenne 3 à 5 millions FCFA par mois.",
  },
  {
    question: "Art'Beau-Rescence assure-t-elle l'installation et la maintenance au Sénégal ?",
    answer:
      "Oui, Art'Beau-Rescence SAS est basée à Ouakam, Dakar et dispose d'une équipe de techniciens certifiés Teltonika pour l'installation, la configuration et la maintenance de tous les équipements AI-Karangué sur l'ensemble du Sénégal. L'installation inclut la pose des boîtiers et caméras, la configuration sur la plateforme Karangué221, la formation de 1 à 2 jours pour vos gestionnaires de flotte, et un support technique réactif 6j/7 par téléphone, WhatsApp et email.",
  },
  {
    question: "Y a-t-il une version d'essai gratuite de la plateforme AI-Karangué ?",
    answer:
      "AI-Karangué propose une période d'évaluation de 30 jours sur 1 à 3 véhicules de votre flotte, avec installation complète du matériel et accès illimité à la plateforme Karangué221. Cette période d'essai vous permet de mesurer concrètement les économies générées avant tout engagement. À l'issue des 30 jours, vous conservez le matériel avec activation de l'abonnement mensuel ou vous nous le retournez sans frais. Contactez-nous pour organiser votre essai gratuit.",
  },
];

export const metadata: Metadata = {
  title: "FAQ Gestion de Flotte & Télématique au Sénégal",
  description:
    "Toutes les réponses sur la gestion de flotte connectée au Sénégal : coûts, fonctionnement GPS, ADAS vs DSM, installation, ROI, compatibilité Teltonika. 15 questions d'experts.",
  keywords: [
    "faq gestion flotte Sénégal",
    "questions télématique GPS Dakar",
    "ADAS DSM différence explication",
    "coût gestion flotte connectée Sénégal",
    "ROI télématique transport Afrique",
    "installation GPS flotte Dakar",
    "Karangué221 faq",
    "essai gratuit gestion flotte",
  ],
  alternates: { canonical: `${SITE_URL}/faq` },
  openGraph: buildOpenGraph({
    title: "FAQ Gestion de Flotte | AI-Karangué Sénégal",
    description:
      "15 réponses d'experts sur la gestion de flotte connectée, le GPS, l'ADAS, le DSM et la télématique au Sénégal.",
    url: `${SITE_URL}/faq`,
  }),
  twitter: buildTwitter({
    title: "FAQ Gestion de Flotte | AI-Karangué Sénégal",
    description: "Toutes vos questions sur la gestion de flotte au Sénégal.",
  }),
};

export default function FAQPage() {
  const jsonLd = [
    faqSchema(FAQ_ITEMS),
    breadcrumbSchema([
      { name: "Accueil", url: SITE_URL },
      { name: "FAQ", url: `${SITE_URL}/faq` },
    ]),
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main className="min-h-screen bg-white selection:bg-teal selection:text-white">
        {/* Hero */}
        <header className="bg-navy-dark text-white pt-40 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-teal/10 blur-[120px] rounded-full" />
          </div>
          <div className="container mx-auto px-6 relative z-10 max-w-5xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-10 h-px bg-teal" />
              <span className="text-teal text-[10px] font-black uppercase tracking-[0.4em]">Centre d&apos;aide</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-6">
              Questions fréquentes
            </h1>
            <p className="text-xl text-white/50 max-w-2xl font-medium leading-relaxed">
              Tout ce que vous devez savoir sur la gestion de flotte connectée, la télématique
              et les solutions AI-Karangué au Sénégal.
            </p>
          </div>
        </header>

        {/* FAQ Content */}
        <section className="py-24">
          <div className="container mx-auto px-6 max-w-4xl">

            {/* Schema categories */}
            <div className="mb-12 flex flex-wrap gap-3">
              {["GPS & Suivi", "ADAS & DSM", "Tarifs & ROI", "Installation", "Plateforme"].map((cat) => (
                <span
                  key={cat}
                  className="px-4 py-2 rounded-full bg-teal/10 text-teal text-sm font-bold border border-teal/20"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* FAQ Items */}
            <div className="space-y-0 divide-y divide-navy/10">
              {FAQ_ITEMS.map((item, index) => (
                <details
                  key={index}
                  className="group py-8 cursor-pointer"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <summary
                    className="flex items-start justify-between gap-6 list-none cursor-pointer select-none"
                    itemProp="name"
                  >
                    <h2 className="text-xl font-black text-navy leading-snug group-open:text-teal transition-colors pr-4">
                      {item.question}
                    </h2>
                    <span className="mt-1 flex-shrink-0 w-8 h-8 rounded-full border-2 border-navy/20 group-open:border-teal group-open:bg-teal/10 flex items-center justify-center transition-all">
                      <svg
                        className="w-4 h-4 text-navy/50 group-open:text-teal group-open:rotate-45 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </summary>
                  <div
                    className="mt-6 pr-14"
                    itemScope
                    itemType="https://schema.org/Answer"
                    itemProp="acceptedAnswer"
                  >
                    <p
                      className="text-navy/70 text-lg leading-relaxed font-medium"
                      itemProp="text"
                    >
                      {item.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>

            {/* CTA bottom */}
            <div className="mt-20 p-12 rounded-[40px] bg-navy-dark text-white text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal/10 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter">
                  Vous avez d&apos;autres questions ?
                </h2>
                <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
                  Notre équipe répond en moins de 24h. Demandez une démonstration gratuite
                  de la plateforme Karangué221.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="h-14 px-10 bg-teal hover:bg-teal/90 text-white rounded-xl font-black uppercase tracking-[0.15em] text-sm transition-all inline-flex items-center shadow-2xl shadow-teal/30"
                  >
                    Demander une démo gratuite
                  </Link>
                  <a
                    href="https://wa.me/221787864848"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-14 px-10 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-black uppercase tracking-[0.15em] text-sm transition-all inline-flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.836L.057 23.737a.5.5 0 00.606.606l5.88-1.447A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.96 0-3.807-.524-5.4-1.44l-.388-.232-4.025.99.997-3.94-.253-.4A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
