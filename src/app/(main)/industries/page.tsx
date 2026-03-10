import type { Metadata } from "next";
import { IndustriesClient } from "@/components/pages/IndustriesClient";
import { getServerContent } from "@/lib/content-server";
import { SITE_URL, buildOpenGraph, buildTwitter, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Secteurs : Transport, BTP, Logistique, Mines | AI-Karangué",
  description:
    "AI-Karangué accompagne le transport routier, BTP, la logistique et les mines au Sénégal. Gestion de flotte GPS, ADAS et DSM pour chaque secteur. Flotte Dakar-Bamako, Dakar-Abidjan.",
  keywords: [
    "gestion flotte transport Sénégal",
    "suivi véhicule BTP Dakar",
    "télématique logistique Afrique Ouest",
    "transport marchandises GPS Dakar",
    "flotte bus GPS Sénégal",
    "suivi camion Sénégal Bamako Abidjan",
    "gestion flotte mines Sénégal",
  ],
  alternates: { canonical: `${SITE_URL}/industries` },
  openGraph: buildOpenGraph({
    title: "Secteurs Transport, BTP, Logistique | AI-Karangué Sénégal",
    description:
      "Solutions de gestion de flotte adaptées à chaque secteur. Couverture Sénégal et routes sous-régionales Dakar-Bamako, Dakar-Abidjan.",
    url: `${SITE_URL}/industries`,
  }),
  twitter: buildTwitter({
    title: "Secteurs Transport & Logistique | AI-Karangué",
    description: "Gestion de flotte GPS pour transport, BTP, logistique au Sénégal.",
  }),
};

export default async function IndustriesPage() {
  const content = await getServerContent();

  const breadcrumb = breadcrumbSchema([
    { name: "Accueil", url: SITE_URL },
    { name: "Secteurs d'activité", url: `${SITE_URL}/industries` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <IndustriesClient content={content} />
    </>
  );
}
