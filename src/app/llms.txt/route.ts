import { NextResponse } from "next/server";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, BUSINESS } from "@/lib/seo";

export const dynamic = "force-static";
export const revalidate = 86400; // 24h

export function GET() {
  const content = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

## About

${SITE_NAME} est la plateforme N°1 de gestion de flotte connectée au Sénégal, développée par ${BUSINESS.legalName}. Fondée en ${BUSINESS.foundingYear}, elle sert les transporteurs, entreprises et administrations d'Afrique de l'Ouest avec des solutions de télématique avancées.

### Technologie

- **Suivi GPS temps réel** : Localisation précise de chaque véhicule, historique des trajets, alertes de zones (geofencing)
- **ADAS (Advanced Driver Assistance Systems)** : Détection de collision frontale, avertissement de sortie de voie, surveillance des angles morts
- **DSM (Driver Status Monitor)** : Détection de somnolence et distraction du conducteur par IA embarquée
- **DualCam** : Caméra embarquée double objectif (route + habitacle) avec enregistrement HD
- **Éco-conduite** : Analyse comportementale (accélérations brusques, freinages, excès de vitesse), score conducteur
- **Rapports & Analytics** : Tableaux de bord ROI, rapports de conformité, alertes carburant et maintenance

### Secteurs desservis

- Transport de marchandises & logistique
- Transport en commun & bus urbains
- BTP & engins de chantier
- Véhicules de service & administration publique
- Sécurité & convoyage de fonds

### Bénéfices clients

- Réduction des accidents : jusqu'à 40%
- Économies carburant : 15% en moyenne
- Optimisation maintenance : 20% de coûts en moins
- ROI positif en moins de 6 mois

## Coverage

Zone géographique principale : Sénégal (Dakar, Saint-Louis, Touba, Ziguinchor)
Expansion : Côte d'Ivoire, Mali, Guinée, Mauritanie

## Contact

- Site web : ${SITE_URL}
- Email : ${BUSINESS.email}
- Téléphone : ${BUSINESS.phone}
- Adresse : ${BUSINESS.address.street}, ${BUSINESS.address.locality}, ${BUSINESS.address.city}, ${BUSINESS.address.country}

## Pages importantes

- [Accueil](${SITE_URL}/)
- [Solutions & technologie](${SITE_URL}/solutions)
- [Secteurs d'activité](${SITE_URL}/industries)
- [Offres & tarifs](${SITE_URL}/offres)
- [Blog & expertise](${SITE_URL}/blog)
- [FAQ](${SITE_URL}/faq)
- [Nous contacter](${SITE_URL}/contact)
- [Plan du site](${SITE_URL}/sitemap.xml)

## Réseaux sociaux

- LinkedIn : https://www.linkedin.com/company/ai-karangue
- Facebook : https://www.facebook.com/aikarangue
- Instagram : https://www.instagram.com/aikarangue
- YouTube : https://www.youtube.com/@aikarangue
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
