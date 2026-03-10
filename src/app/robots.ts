import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
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
      // Block AI training scrapers (preserve content exclusivity)
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "CCBot",
          "anthropic-ai",
          "Claude-Web",
          "Omgilibot",
          "FacebookBot",
        ],
        allow: [
          "/blog/",
          "/faq/",
          "/solutions/",
        ],
        disallow: ["/admin/", "/api/", "/qrcode/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
