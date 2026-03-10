import type { Metadata } from "next";
import { getServerContent } from "@/lib/content-server";
import SolutionsClient from "@/components/pages/SolutionsClient";
import { SITE_URL, buildOpenGraph, buildTwitter, breadcrumbSchema, productSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Solutions Télématique & Sécurité | GPS, ADAS, DSM, DualCam",
  description:
    "Découvrez les 4 solutions AI-Karangué : suivi GPS flotte Sénégal, ADAS prévention collisions, DSM surveillance somnolence chauffeur, DualCam caméra embarquée. Technologie Teltonika + IA.",
  keywords: [
    "ADAS sécurité routière Sénégal",
    "DSM somnolence chauffeur Dakar",
    "caméra embarquée DualCam flotte",
    "suivi GPS flotte Sénégal",
    "Teltonika FMC650 Dakar",
    "prévention accident transport Sénégal",
    "surveillance comportement conducteur",
    "télématique vidéo Afrique Ouest",
  ],
  alternates: { canonical: `${SITE_URL}/solutions` },
  openGraph: buildOpenGraph({
    title: "Solutions GPS, ADAS, DSM, DualCam | AI-Karangué Sénégal",
    description:
      "4 technologies embarquées pour éliminer les accidents, réduire la consommation et sécuriser vos conducteurs.",
    url: `${SITE_URL}/solutions`,
  }),
  twitter: buildTwitter({
    title: "Solutions GPS, ADAS, DSM, DualCam | AI-Karangué",
    description: "4 technologies pour sécuriser vos flottes au Sénégal.",
  }),
};

export default async function SolutionsPage() {
  const content = await getServerContent();

  const breadcrumb = breadcrumbSchema([
    { name: "Accueil", url: SITE_URL },
    { name: "Solutions", url: `${SITE_URL}/solutions` },
  ]);

  const products = [
    productSchema({
      name: "ADAS — Système d'Aide à la Conduite",
      description:
        "Système ADAS embarqué pour la prévention des collisions frontales, détection de franchissement de ligne, avertissement de distance de sécurité. Compatible tous véhicules de transport au Sénégal.",
      image: `${SITE_URL}/ADAS.png`,
      url: `${SITE_URL}/solutions#adas`,
      category: "Équipement de sécurité routière",
    }),
    productSchema({
      name: "DSM — Surveillance du Comportement Conducteur",
      description:
        "Caméra DSM avec intelligence artificielle pour détecter la somnolence, la distraction et le non-port de la ceinture. Alerte en temps réel gestionnaire de flotte.",
      image: `${SITE_URL}/DSM.png`,
      url: `${SITE_URL}/solutions#dsm`,
      category: "Système de surveillance conducteur",
    }),
    productSchema({
      name: "DualCam — Caméra Embarquée Professionnelle",
      description:
        "Caméra double objectif 4G HD pour enregistrement continu route + habitacle. Stockage cloud sécurisé, accès vidéo en direct depuis Karangué221.",
      image: `${SITE_URL}/DualCam.png`,
      url: `${SITE_URL}/solutions#dualcam`,
      category: "Caméra embarquée véhicule",
    }),
    productSchema({
      name: "Karangué221 — Plateforme GPS Gestion de Flotte",
      description:
        "Logiciel SaaS de gestion de flotte en temps réel basé sur Wialon. Suivi GPS, géofencing, rapports de conduite, alertes incidents, historique trajets.",
      image: `${SITE_URL}/dashboard.png`,
      url: `${SITE_URL}/solutions#gps`,
      category: "Logiciel de gestion de flotte",
    }),
  ];

  return (
    <>
      {[breadcrumb, ...products].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <SolutionsClient content={content} />
    </>
  );
}
