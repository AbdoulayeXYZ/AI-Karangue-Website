import type { Metadata } from "next";
import { OffresClient } from "@/components/pages/OffresClient";
import { getServerContent } from "@/lib/content-server";
import { SITE_URL, buildOpenGraph, buildTwitter, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Tarifs & Offres Gestion de Flotte | AI-Karangué Sénégal",
  description:
    "Découvrez nos offres de gestion de flotte connectée au Sénégal : Starter, Business et Enterprise. Installation Teltonika incluse, formation et support 24/7 en français. Devis gratuit en 24h.",
  keywords: [
    "tarif gestion flotte Sénégal",
    "prix télématique transport Dakar",
    "offre GPS flotte entreprise Sénégal",
    "abonnement Karangué221",
    "pack surveillance flotte Afrique",
    "coût suivi véhicule Sénégal",
  ],
  alternates: { canonical: `${SITE_URL}/offres` },
  openGraph: buildOpenGraph({
    title: "Tarifs & Offres | Gestion de Flotte AI-Karangué Sénégal",
    description:
      "Offres adaptées PME et grandes flottes au Sénégal. Starter, Business, Enterprise. Installation, formation et support inclus.",
    url: `${SITE_URL}/offres`,
  }),
  twitter: buildTwitter({
    title: "Tarifs Gestion de Flotte | AI-Karangué Sénégal",
    description: "Offres flexibles pour toutes les tailles de flotte au Sénégal.",
  }),
};

export default async function OffresPage() {
  const content = await getServerContent();

  const breadcrumb = breadcrumbSchema([
    { name: "Accueil", url: SITE_URL },
    { name: "Tarifs & Offres", url: `${SITE_URL}/offres` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <OffresClient content={content} />
    </>
  );
}
