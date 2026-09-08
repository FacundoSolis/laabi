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
    "Dos apartamentos turísticos en el centro de Salamanca, en el mismo portal y en planta baja. Reservas directas, sin intermediarios.",
  keywords: [
    "apartamento turístico Salamanca",
    "alojamiento Salamanca centro",
    "La Abi",
    "La Abi 1",
    "estudio turístico Salamanca",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url,
    siteName: site.legalName,
    title: `${site.name} · Apartamentos turísticos en Salamanca`,
    description:
      "Dos casas con alma en el centro de Salamanca. Reservas directas, sin intermediarios.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F7F2EA",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="grain antialiased">{children}</body>
    </html>
  );
}
