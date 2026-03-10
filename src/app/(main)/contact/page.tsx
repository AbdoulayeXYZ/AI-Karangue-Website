import type { Metadata } from "next";
import { getServerContent } from "@/lib/content-server";
import ContactClient from "@/components/pages/ContactClient";
import { SITE_URL, buildOpenGraph, buildTwitter, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Demander une Démo Gratuite | Contactez AI-Karangué Dakar",
  description:
    "Contactez l'équipe AI-Karangué à Dakar pour une démonstration gratuite de la plateforme Karangué221. Installation rapide, support en français et wolof. Cité El Hadji Malick SY, Ouakam, Dakar.",
  keywords: [
    "contact AI-Karangué Dakar",
    "démonstration gestion flotte Sénégal",
    "devis télématique transport Sénégal",
    "installer GPS flotte Dakar",
    "Art'Beau-Rescence Ouakam Dakar",
  ],
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: buildOpenGraph({
    title: "Demandez une démo gratuite | AI-Karangué Dakar",
    description:
      "Rencontrez notre équipe à Ouakam, Dakar. Démonstration personnalisée de la plateforme Karangué221 pour votre flotte.",
    url: `${SITE_URL}/contact`,
  }),
  twitter: buildTwitter({
    title: "Démo gratuite | AI-Karangué Dakar, Sénégal",
    description: "Contactez notre équipe pour démarrer votre projet de gestion de flotte.",
  }),
};

export default async function ContactPage() {
  const content = await getServerContent();

  const breadcrumb = breadcrumbSchema([
    { name: "Accueil", url: SITE_URL },
    { name: "Contact & Démo", url: `${SITE_URL}/contact` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <ContactClient content={content} />
    </>
  );
}
