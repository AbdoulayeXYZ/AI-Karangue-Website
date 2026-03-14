import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ─── Images ──────────────────────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.vercel.app",
      },
      {
        protocol: "https",
        hostname: "**.artbeaurescence.sn",
      },
    ],
  },

  // ─── Compression ─────────────────────────────────────────────────────────
  compress: true,

  // ─── Security & SEO HTTP Headers ─────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Security
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // SEO hint
          {
            key: "X-Robots-Tag",
            value: "index, follow",
          },
        ],
      },
      // Fichiers IA : toujours servis frais (pas de cache CDN)
      {
        source: "/(llms\\.txt|robots\\.txt|sitemap\\.xml)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
      // Aggressive cache for static assets
      {
        source: "/(.*)\\.(png|jpg|jpeg|svg|gif|ico|webp|avif|woff|woff2|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache for JS/CSS
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Prevent indexing of admin
      {
        source: "/admin/(.*)",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },

  // ─── Redirects ────────────────────────────────────────────────────────────
  async redirects() {
    return [
      // Canonical: redirect www to non-www
      {
        source: "/(.*)",
        has: [{ type: "host", value: "www.aikarangue.artbeaurescence.sn" }],
        destination: "https://aikarangue.artbeaurescence.sn/:path*",
        permanent: true,
      },
    ];
  },

  // ─── Logging ─────────────────────────────────────────────────────────────
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === "development",
    },
  },
};

export default nextConfig;
