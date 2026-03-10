import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { HardwareShowcase } from "@/components/sections/HardwareShowcase";
import { SoftwareShowcase } from "@/components/sections/SoftwareShowcase";
import { TripleImpact } from "@/components/sections/TripleImpact";
import { ROICalculator } from "@/components/sections/ROICalculator";
import { Offres } from "@/components/sections/Offres";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getServerContent } from "@/lib/content-server";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE, buildOpenGraph, buildTwitter } from "@/lib/seo";

export const metadata: Metadata = {
  title: "AI-Karangué | Gestion de Flotte, GPS & Sécurité Routière au Sénégal",
  description:
    "Protégez vos véhicules et conducteurs avec Karangué221. La seule plateforme au Sénégal intégrant suivi GPS, prévention d'accidents ADAS et surveillance DSM par IA.",
  keywords: [
    "gestion de flotte Sénégal",
    "suivi GPS véhicule Dakar",
    "télématique Sénégal",
    "sécurité routière transport Afrique",
    "prévention accidents ADAS",
    "surveillance conducteur DSM",
    "caméra embarquée DualCam",
    "Karangué221",
    "AI-Karangué",
    "optimisation carburant Sénégal",
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
    <main className="relative min-h-screen selection:bg-teal selection:text-white bg-white overflow-hidden">
      <Hero content={content.home.hero} />

      {/* 1. Condensed Direct Manifesto */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div
            className="max-w-5xl mx-auto text-center"
          >
            <h2
              className="text-4xl md:text-7xl font-black text-navy-dark leading-[0.95] tracking-tighter mb-12"
              dangerouslySetInnerHTML={{ __html: content.home.manifesto.title }}
            />
            <p className="text-xl md:text-2xl text-navy/50 max-w-3xl mx-auto font-medium leading-relaxed">
              {content.home.manifesto.description}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Hardware & Cloud - Direct Product Value */}
      <HardwareShowcase content={content.home.hardware} />
      <SoftwareShowcase content={content.home.software} />


      {/* 4. Triple Impact - Detailed Solutions */}
      <TripleImpact content={content.home.tripleImpact} />

      {/* 5. Logic & Conversion (ROI & Pricing) */}
      <ROICalculator content={content.home.roiCalculator} />
      <Offres content={content.home.offres} />

      {/* 6. High-Fashion Final Brand Closing */}
      <section className="py-64 bg-navy-dark text-white text-center rounded-[5rem] mx-4 my-20 overflow-hidden relative">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-teal/30 blur-[150px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-navy/40 blur-[150px] rounded-full" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div
            className="max-w-4xl mx-auto"
          >
            <h2
              className="text-6xl md:text-[8vw] font-black text-white tracking-tighter leading-[0.85] mb-16"
              dangerouslySetInnerHTML={{ __html: content.home.finalCta.title }}
            />
            <p className="text-xl md:text-2xl text-white/40 font-medium mb-16 max-w-xl mx-auto">
              {content.home.finalCta.description}
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <Link href="/contact">
                <Button size="lg" className="h-16 px-8 text-lg bg-teal hover:bg-teal-light text-white rounded-full transition-all shadow-[0_0_40px_-10px_rgba(20,184,166,0.3)] hover:shadow-[0_0_60px_-10px_rgba(20,184,166,0.5)] border border-teal/50 group flex items-center gap-2">
                  {content.home.finalCta.ctaPrimary}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="h-20 px-12 text-xl border-white/10 text-white hover:bg-white hover:text-navy-dark transition-all">
                  {content.home.finalCta.ctaSecondary}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
