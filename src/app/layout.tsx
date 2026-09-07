import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const url = "https://laabi.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: `${site.name} · Apartamentos turísticos en Salamanca`,
    template: `%s · ${site.name}`,
  },
  description:
    "Apartamento turístico reformado en el centro de Salamanca, a cinco minutos de la Plaza Mayor. Para cuatro personas, con cocina completa y check-in autónomo.",
  keywords: [
    "apartamento turístico Salamanca",
    "alojamiento Salamanca centro",
    "La Abi",
    "apartamento Plaza Mayor Salamanca",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url,
    siteName: site.legalName,
    title: `${site.name} · Apartamentos turísticos en Salamanca`,
    description:
      "Una casa con alma en el centro de Salamanca. Reservas directas, sin intermediarios.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F7F2EA",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Apartment",
    name: site.legalName,
    description:
      "Apartamento turístico reformado en el centro de Salamanca para cuatro personas.",
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.map.lat,
      longitude: site.map.lng,
    },
    numberOfRooms: 1,
    occupancy: { "@type": "QuantitativeValue", maxValue: site.pricing.maxGuests },
    telephone: site.phone,
    email: site.email,
  };

  return (
    <html lang="es" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="grain antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
