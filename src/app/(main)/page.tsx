import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { HomeB2CSections } from "@/components/sections/HomeB2CSections";
import { Offres } from "@/components/sections/Offres";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getServerContent } from "@/lib/content-server";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE, buildOpenGraph, buildTwitter } from "@/lib/seo";

export const metadata: Metadata = {
  title: "AI-Karangué | DASHCAM IA & Protection Conducteur au Sénégal",
  description:
    "Protège-toi sur la route avec la DASHCAM IA Streamax. Alertes somnolence, prévention collision, vidéo HD. Karangué221 — la plateforme de sécurité conducteur N°1 au Sénégal.",
  keywords: [
    "dashcam IA Sénégal",
    "sécurité conducteur Dakar",
    "caméra voiture intelligente Sénégal",
    "ADAS Sénégal",
    "alerte somnolence conducteur",
    "protection route Sénégal",
    "Karangué221",
    "AI-Karangué",
    "suivi GPS personnel Sénégal",
    "abonnement sécurité véhicule",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: buildOpenGraph({
    title: "AI-Karangué | N°1 de la Gestion de Flotte & Télématique au Sénégal",
    description:
      "Plateforme Karangué221 : GPS, ADAS, DSM. Transformez votre flotte en actif sûr et rentable avec l'IA.",
    url: SITE_URL,
    image: DEFAULT_OG_IMAGE,
  }),
  twitter: buildTwitter({
    title: "AI-Karangué | Sécurité & Gestion de Flotte au Sénégal",
    description:
      "Suivi GPS temps réel, ADAS, DSM et DualCam. La technologie au service de la sécurité routière au Sénégal.",
    image: DEFAULT_OG_IMAGE,
  }),
};

const homepageSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: "Karangué221",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, Android, iOS",
  description:
    "Plateforme SaaS de gestion de flotte connectée : suivi GPS temps réel, surveillance conducteur (DSM), assistance conduite (ADAS), caméra embarquée (DualCam), reporting et alertes.",
  url: SITE_URL,
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "XOF",
    availability: "https://schema.org/InStock",
    seller: { "@id": `${SITE_URL}/#organization` },
  },
  featureList: [
    "Suivi GPS temps réel",
    "Surveillance conducteur DSM",
    "Prévention accidents ADAS",
    "Caméra embarquée DualCam",
    "Géofencing et alertes",
    "Rapport consommation carburant",
    "Maintenance prédictive",
    "Dashboard analytique",
  ],
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: ["SN", "CI", "ML"],
  inLanguage: ["fr", "en"],
};

export default async function Home() {
  const content = await getServerContent();

  return (
    <main className="relative min-h-screen selection:bg-teal selection:text-white bg-white overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }}
      />
      <Hero content={content.home.hero} />

      {/* 1. Condensed Direct Manifesto */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div
            className="max-w-5xl mx-auto text-center"
          >
            <h2
              className="text-2xl sm:text-4xl md:text-7xl font-black text-navy-dark leading-[0.95] tracking-tighter mb-8 sm:mb-12"
              dangerouslySetInnerHTML={{ __html: content.home.manifesto.title }}
            />
            <p className="text-xl md:text-2xl text-navy/50 max-w-3xl mx-auto font-medium leading-relaxed">
              {content.home.manifesto.description}
            </p>
          </div>
        </div>
      </section>

      {/* 2. B2C Product Sections — DASHCAM IA, Platform, App, Persona */}
      <HomeB2CSections />

      {/* 3. How It Works */}
      <HowItWorks content={content.home.howItWorks} />

      {/* 4. Pricing */}
      <Offres content={content.home.offres} />

      {/* 6. High-Fashion Final Brand Closing */}
      <FinalCTA />
    </main>
  );
}
