// ─── SEO Constants & Helpers — AI-Karangué ───────────────────────────────────
// Centralized SEO configuration for consistent metadata across all pages

export const SITE_URL = "https://aikarangue.artbeaurescence.sn";
export const SITE_NAME = "AI-Karangué";
export const SITE_DESCRIPTION =
  "N°1 de la gestion de flotte connectée au Sénégal. Plateforme Karangué221 : suivi GPS temps réel, ADAS prévention accidents, DSM surveillance conducteur, caméra DualCam embarquée.";

export const BUSINESS = {
  name: "Art'Beau-Rescence | AI-Karangué",
  legalName: "Art'Beau-Rescence SAS",
  url: SITE_URL,
  logo: `${SITE_URL}/logoaikarangue.png`,
  email: "contact@artbeaurescence.sn",
  phone: "+221 78 786 48 48",
  address: {
    street: "Cité El Hadji Malick SY, Lot 187",
    locality: "Ouakam",
    city: "Dakar",
    region: "Dakar",
    country: "SN",
    postalCode: "11700",
  },
  geo: { latitude: 14.7233, longitude: -17.4888 },
  openingHours: ["Mo-Fr 08:00-18:00", "Sa 09:00-13:00"],
  priceRange: "$$",
  socialProfiles: [
    "https://www.linkedin.com/company/ai-karangue",
    "https://www.facebook.com/aikarangue",
    "https://www.instagram.com/aikarangue",
    "https://www.youtube.com/@aikarangue",
  ],
  googleBusinessProfile: "https://maps.app.goo.gl/E96XB2s17LYQKYHu8",
  foundingYear: 2022,
  areaServed: ["Sénégal", "Côte d'Ivoire", "Mali", "Afrique de l'Ouest"],
};

export const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph-image`;

/** Build a canonical URL from a path */
export function canonicalUrl(path: string = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Build OpenGraph metadata object */
export function buildOpenGraph({
  title,
  description,
  url,
  image,
  type = "website",
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: "website" | "article";
}) {
  return {
    title,
    description,
    url,
    siteName: SITE_NAME,
    images: [
      {
        url: image ?? DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    locale: "fr_SN",
    alternateLocale: "en_US",
    type,
  };
}

/** Build Twitter Card metadata */
export function buildTwitter({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image?: string;
}) {
  return {
    card: "summary_large_image" as const,
    title,
    description,
    images: [image ?? DEFAULT_OG_IMAGE],
    creator: "@aikarangue",
    site: "@aikarangue",
  };
}

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: BUSINESS.logo,
      width: 200,
      height: 60,
    },
    description: SITE_DESCRIPTION,
    foundingDate: String(BUSINESS.foundingYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.locality,
      addressRegion: BUSINESS.address.region,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BUSINESS.phone,
      email: BUSINESS.email,
      contactType: "customer service",
      availableLanguage: ["French", "Wolof", "English"],
      areaServed: BUSINESS.areaServed,
    },
    sameAs: BUSINESS.socialProfiles,
    areaServed: BUSINESS.areaServed.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    knowsAbout: [
      "Gestion de flotte",
      "Télématique",
      "GPS tracking",
      "ADAS prévention accidents",
      "DSM surveillance conducteur",
      "Caméra embarquée",
      "Intelligence artificielle transport",
      "Sécurité routière Afrique",
    ],
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: BUSINESS.name,
    url: SITE_URL,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    image: BUSINESS.logo,
    priceRange: BUSINESS.priceRange,
    description:
      "Fournisseur leader de solutions de gestion de flotte connectée, télématique et sécurité routière au Sénégal et en Afrique de l'Ouest.",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.locality,
      addressRegion: BUSINESS.address.region,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    openingHoursSpecification: BUSINESS.openingHours.map((spec) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: spec.split(" ")[0].split("-"),
      opens: spec.split(" ")[1].split("-")[0],
      closes: spec.split(" ")[1].split("-")[1],
    })),
    sameAs: [...BUSINESS.socialProfiles, BUSINESS.googleBusinessProfile],
    hasMap: BUSINESS.googleBusinessProfile,
    currenciesAccepted: "XOF",
    paymentAccepted: "Virement bancaire, Mobile Money, Chèque",
    areaServed: BUSINESS.areaServed,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: ["fr-SN", "en"],
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleSchema({
  title,
  description,
  url,
  image,
  author,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  author: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: title,
    description,
    image: {
      "@type": "ImageObject",
      url: image,
      width: 1200,
      height: 630,
    },
    url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Person",
      name: author,
      url: SITE_URL,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    inLanguage: "fr-SN",
    about: [
      "Gestion de flotte",
      "Télématique",
      "Sécurité routière",
      "Transport Sénégal",
    ],
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function productSchema({
  name,
  description,
  image,
  url,
  category,
}: {
  name: string;
  description: string;
  image: string;
  url: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    url,
    category,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    manufacturer: {
      "@id": `${SITE_URL}/#organization`,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      areaServed: "SN",
      priceCurrency: "XOF",
      seller: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
  };
}
