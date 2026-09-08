import { site, type Apartment } from "@/lib/site";

/* Datos estructurados para Google, uno por apartamento. */
export function JsonLd({ apt }: { apt: Apartment }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Apartment",
    name: `${apt.name} · Apartamentos Turísticos`,
    description: apt.seo.description,
    url: `https://laabi.vercel.app${apt.path}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: site.city,
      addressRegion: "Salamanca",
      addressCountry: "ES",
    },
    numberOfBathroomsTotal: 1,
    numberOfRooms: apt.slug === "la-abi" ? 1 : 0,
    occupancy: {
      "@type": "QuantitativeValue",
      maxValue: apt.pricing.maxGuests,
      unitCode: "C62",
    },
    petsAllowed: true,
    smokingAllowed: false,
    telephone: site.phone,
    email: site.email,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
