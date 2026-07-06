import type { Metadata } from "next";
import localFont from "next/font/local";
import { SITE } from "@/lib/constants";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/geist-sans.woff2",
  variable: "--font-geist-sans",
  display: "swap",
  preload: true,
});

const geistMono = localFont({
  src: "./fonts/geist-mono.woff2",
  variable: "--font-geist-mono",
  display: "swap",
  preload: true,
});

const cormorant = localFont({
  src: [
    { path: "./fonts/cormorant.woff2", weight: "300 700", style: "normal" },
    { path: "./fonts/cormorant-italic.woff2", weight: "300 700", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Cédric VTC | Chauffeur privé à Toulouse",
  description:
    "Chauffeur privé à Toulouse en Tesla noire pour transferts aéroport Blagnac, gare Matabiau, trajets business, soirées et longues distances sur réservation.",
  keywords: ["vtc toulouse", "chauffeur prive toulouse", "cedric vtc", "aeroport blagnac", "gare matabiau"],
  metadataBase: new URL(SITE.url),
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    title: "Cédric VTC | Chauffeur privé à Toulouse",
    description:
      "Tesla noire avec chauffeur privé pour Toulouse centre, Blagnac, Matabiau et trajets sur réservation.",
    url: SITE.url,
    siteName: "Cédric VTC",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/media/vtc/tesla-capitole-toulouse-nuit.webp",
        width: 1920,
        height: 1080,
        alt: "Tesla noire Cédric VTC devant Toulouse de nuit",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
