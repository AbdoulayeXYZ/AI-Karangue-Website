import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI-Karangué | Tranquillité d'Esprit & Gestion de Flotte Intelligente",
  description: "Solution leader de télématique et gestion de flotte au Sénégal. Karangué221 offre la sérénité totale aux conducteurs, managers et voyageurs grâce au Triple Impact.",
  icons: {
    icon: "/logoaikarangue.png",
    shortcut: "/logoaikarangue.png",
    apple: "/logoaikarangue.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
