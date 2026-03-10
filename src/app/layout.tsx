import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
} from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `${SITE_NAME} | N°1 Gestion de Flotte & Télématique au Sénégal`,
    template: `%s | ${SITE_NAME}`,
  },

  description: SITE_DESCRIPTION,

  keywords: [
    "gestion de flotte Sénégal",
    "suivi GPS Dakar",
    "télématique Afrique de l'Ouest",
    "logiciel gestion transport Sénégal",
    "ADAS sécurité routière Sénégal",
    "DSM somnolence chauffeur",
    "caméra embarquée flotte",
    "DualCam dashcam professionnel",
    "Karangué221",
    "AI-Karangué",
    "gestion flotte connectée",
    "suivi véhicule temps réel Dakar",
    "prévention accidents transport",
    "surveillance conducteur Afrique",
  ],

  authors: [{ name: "Art'Beau-Rescence", url: SITE_URL }],
  creator: "Art'Beau-Rescence SAS",
  publisher: "Art'Beau-Rescence SAS",

  category: "Technologie / Transport / Télématique",

  alternates: {
    canonical: SITE_URL,
    languages: {
      "fr-SN": SITE_URL,
      "en-US": `${SITE_URL}/en`,
    },
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | N°1 Gestion de Flotte & Télématique au Sénégal`,
    description: SITE_DESCRIPTION,
    locale: "fr_SN",
    alternateLocale: ["en_US"],
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "AI-Karangué — Plateforme de gestion de flotte intelligente au Sénégal",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@aikarangue",
    creator: "@aikarangue",
    title: `${SITE_NAME} | N°1 Gestion de Flotte au Sénégal`,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-v2.svg", type: "image/svg+xml" },
    ],
    shortcut: "/logoaikarangue.png",
    apple: [{ url: "/logoaikarangue.png", sizes: "180x180" }],
  },

  manifest: "/manifest.json",

  verification: {
    google: "GOOGLE_SEARCH_CONSOLE_TOKEN",
  },

  other: {
    "og:region": "SN-DK",
    "og:country-name": "Senegal",
    "og:locality": "Dakar",
    "geo.region": "SN-DK",
    "geo.placename": "Dakar, Sénégal",
    "geo.position": "14.7233;-17.4888",
    ICBM: "14.7233, -17.4888",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [
    organizationSchema(),
    localBusinessSchema(),
    websiteSchema(),
  ];

  return (
    <html lang="fr">
      <head>
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vercel-analytics.com" />

        {/* JSON-LD Structured Data */}
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AnalyticsTracker />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
