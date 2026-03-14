import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ─── Règle générale : tous les crawlers web ────────────────────────────
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/qrcode/",
          "/_next/",
          "/catalogue/",
        ],
      },

      // ─── Bots IA de RECHERCHE : accès complet ─────────────────────────────
      // Ces bots indexent le site pour ChatGPT, Claude, Perplexity, Gemini…
      // Les bloquer = être invisible dans les moteurs IA (AEO).
      {
        userAgent: [
          "GPTBot",            // OpenAI : ChatGPT Search & browsing
          "ChatGPT-User",      // ChatGPT : navigation temps réel
          "OAI-SearchBot",     // OpenAI : moteur de recherche
          "anthropic-ai",      // Anthropic : Claude AI
          "Claude-Web",        // Anthropic : Claude web browsing
          "ClaudeBot",         // Anthropic : Claude crawler
          "PerplexityBot",     // Perplexity AI
          "Google-Extended",   // Google : Gemini & AI Overviews
          "Applebot-Extended", // Apple : Apple Intelligence
          "cohere-ai",         // Cohere AI
          "YouBot",            // You.com AI search
        ],
        allow: "/",            // Accès COMPLET au site
        disallow: ["/admin/", "/api/", "/qrcode/"],
      },

      // ─── Scrapers de données d'entraînement UNIQUEMENT ────────────────────
      // Ces bots ne servent pas à la recherche IA — ils collectent des données
      // pour entraîner des modèles. On les bloque pour l'exclusivité du contenu.
      {
        userAgent: [
          "CCBot",       // Common Crawl (datasets d'entraînement)
          "Omgilibot",   // Agrégateur / scraper news
          "FacebookBot", // Meta AI training (≠ facebookexternalhit)
        ],
        disallow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
