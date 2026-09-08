/* ============================================================
   Contenido editable de la web.
   Todo lo que el cliente puede querer cambiar vive aquí.

   ✅ CONFIRMADO  = dato real, sacado del PDF que rellenó Noelia
                    («La Abi - informacion para la web.pdf», 07/09/2026)
   ⚠️ PENDIENTE   = Noelia todavía no lo ha mandado. Provisional.
   ============================================================ */

export const site = {
  name: "La Abi",
  legalName: "La Abi · Apartamentos Turísticos",
  city: "Salamanca",

  /* -------- Contacto — ✅ CONFIRMADO (igual para los dos pisos) -------- */
  phone: "+34 673 73 30 46",
  phoneHref: "+34673733046",
  whatsapp: "34673733046",          // el mismo número tiene WhatsApp
  email: "apartamentoslaabi@gmail.com",

  // ⚠️ PENDIENTE — la cuenta se llama «Apartamentos La Abi»,
  // falta el usuario exacto (@…) para poder enlazarla.
  instagramName: "Apartamentos La Abi",
  instagram: "https://instagram.com/",

  /* -------- Datos legales — ✅ CONFIRMADO -------- */
  owner: "Noelia Yáñez Álvarez",   // titular de los dos apartamentos
  address: "Calle Corregidor Caballero Llanes, 2",
  addressFull: "Calle Corregidor Caballero Llanes, 2 · Salamanca",

  // El mapa se busca por dirección, no por coordenadas: así apunta al
  // portal real. ⚠️ PENDIENTE afinarlo cuando Noelia mande la ubicación.
  mapQuery: "Calle Corregidor Caballero Llanes 2, Salamanca",

  /* -------- Horarios — ✅ CONFIRMADO (igual para los dos) -------- */
  checkIn: "15:00",
  checkOut: "11:00",
} as const;

export const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
  site.mapQuery,
)}&z=16&hl=es&output=embed`;

export const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.mapQuery,
)}`;

/* ============================================================
   Los dos apartamentos
   ============================================================ */

export type Photo = {
  src: string;
  alt: string;
  caption: string;
  index: string;
};

export type Pricing = {
  base: number;
  weekend: number;
  highSeason: number;
  cleaning: number;
  minNights: number;
  maxGuests: number;
  extraGuestFrom: number;
  extraGuestFee: number;
};

export type Apartment = {
  slug: string;
  path: string;
  ref: string;
  name: string;
  tagline: string;
  /** ⚠️ PENDIENTE — nº de registro de la Junta (VUT-SA-…). Obligatorio por ley. */
  registry: string;
  headline: string[];
  emphasis: string;
  intro: string;
  storyTitle: { before: string; em: string; after: string };
  story: string[];
  quote: string[];
  /** Cómo se presenta este apartamento cuando lo anuncia el otro. */
  pitch: { hook: string; text: string };
  facts: { value: string; label: string }[];
  marquee: string[];
  photos: Photo[];
  amenities: { group: string; items: string[] }[];
  faqs: { q: string; a: string }[];
  pricing: Pricing;
  seo: { title: string; description: string };
};

/* ------------------------------------------------------------
   ⚠️ PENDIENTE — TARIFAS INVENTADAS
   Noelia dejó en blanco todo el bloque de precios del PDF:
   precio entre semana, fin de semana, temporada alta, limpieza,
   persona extra y política de cancelación.
   Los números de abajo son de relleno, solo para que se vea cómo
   funciona la calculadora. HAY QUE CAMBIARLOS antes de publicar.
   ------------------------------------------------------------ */
const pricingLaAbi: Pricing = {
  base: 85,          // ⚠️ INVENTADO — € por noche entre semana
  weekend: 98,       // ⚠️ INVENTADO — € por noche viernes y sábado
  highSeason: 1.18,  // ⚠️ INVENTADO — multiplicador de temporada alta
  cleaning: 30,      // ⚠️ INVENTADO — € limpieza final
  minNights: 1,      // ✅ CONFIRMADO — «1»
  maxGuests: 4,      // ✅ CONFIRMADO — «4 y 3» → La Abi: 4
  extraGuestFrom: 3, // ⚠️ INVENTADO
  extraGuestFee: 12, // ⚠️ INVENTADO — € por huésped y noche
};

const pricingLaAbi1: Pricing = {
  base: 75,          // ⚠️ INVENTADO
  weekend: 86,       // ⚠️ INVENTADO
  highSeason: 1.18,  // ⚠️ INVENTADO
  cleaning: 30,      // ⚠️ INVENTADO
  minNights: 1,      // ✅ CONFIRMADO — «1»
  maxGuests: 3,      // ✅ CONFIRMADO — «4 y 3» → La Abi 1: 3
  extraGuestFrom: 3, // ⚠️ INVENTADO
  extraGuestFee: 12, // ⚠️ INVENTADO
};

/* ------------------------------------------------------------
   Equipamiento — ✅ CONFIRMADO
   Del listado del PDF, lo único que NO hay es HORNO.
   Sí hay: lavadora, lavavajillas, secadora, microondas, cafetera,
   secador, plancha, cuna, aire acondicionado, calefacción y
   Smart TV con Netflix.
   ------------------------------------------------------------ */
function equipment(bed: string): { group: string; items: string[] }[] {
  return [
    {
      group: "Descanso",
      items: [
        bed,
        "Ropa de cama y toallas incluidas",
        "Cuna disponible si la necesitas",
        "Calefacción y aire acondicionado",
      ],
    },
    {
      group: "Cocina",
      items: [
        "Lavavajillas",
        "Microondas",
        "Cafetera",
        "Nevera y menaje completo",
      ],
    },
    {
      group: "Confort",
      items: [
        "Aire acondicionado frío y calor",
        "Wi-Fi rápido en todo el apartamento",
        "Smart TV con Netflix",
        "Secador de pelo",
      ],
    },
    {
      group: "Día a día",
      items: [
        "Lavadora y secadora",
        "Plancha y tabla",
        "Mascotas bienvenidas",
        `Entrada desde las ${site.checkIn}`,
      ],
    },
  ];
}

/* ------------------------------------------------------------
   Preguntas frecuentes — todo ✅ CONFIRMADO salvo lo indicado
   ------------------------------------------------------------ */
function questions(apt: { maxGuests: number; layout: string }): {
  q: string;
  a: string;
}[] {
  return [
    {
      q: "¿A qué hora puedo entrar y salir?",
      a: `La entrada es a partir de las ${site.checkIn} y la salida hasta las ${site.checkOut}. Si tu tren o tu vuelo no encajan, escríbenos: casi siempre encontramos la manera de ajustarlo.`,
    },
    {
      q: "¿Hay estancia mínima?",
      a: "No. Se puede reservar desde una sola noche, cualquier día del año.",
    },
    {
      q: "¿Cuántos cabemos?",
      a: `${apt.layout} Como máximo ${apt.maxGuests} personas.`,
    },
    {
      q: "¿Se admiten mascotas?",
      a: "Sí, las mascotas son bienvenidas. Cuéntanoslo al enviar la solicitud para tenerlo previsto.",
    },
    {
      q: "¿Se puede fumar?",
      a: "No. El apartamento es libre de humo, tanto dentro de la vivienda como en el interior del edificio.",
    },
    {
      q: "¿Hay horno en la cocina?",
      a: "Horno no hay. Sí tienes microondas, lavavajillas, cafetera, nevera y todo el menaje para cocinar y comer sin sacar nada de casa.",
    },
    {
      q: "¿Hay ascensor?",
      a: "El apartamento está en planta baja, así que no hay que subir escaleras ni hace falta ascensor.",
    },
    {
      q: "¿Hay dónde aparcar?",
      a: "El apartamento no tiene plaza propia: se aparca en la calle. Si vienes en coche, dínoslo y te contamos cómo está la zona.",
    },
    {
      q: "¿Pedís fianza?",
      a: "No pedimos fianza. Solo confirmamos la reserva con un anticipo.",
    },
    {
      q: "¿Cómo se confirma la reserva?",
      a: "Envías la solicitud desde esta web y te contestamos el mismo día con la disponibilidad y las instrucciones. La reserva queda cerrada cuando recibimos el anticipo.",
    },
  ];
}

/* ============================================================
   LA ABI — 4 personas · 1 dormitorio · 1 baño · planta baja
   ============================================================ */

export const laAbi: Apartment = {
  slug: "la-abi",
  path: "/",
  ref: "LA",
  name: "La Abi",
  tagline: "Apartamentos turísticos en Salamanca",
  registry: "VUT-SA-0000", // ⚠️ PENDIENTE — obligatorio por ley
  headline: ["Una", "casa", "con", "alma", "en", "el", "centro", "de", "Salamanca"],
  emphasis: "alma",
  // ⚠️ PENDIENTE — texto de relleno hasta que Noelia mande el suyo.
  intro:
    "Un apartamento reformado para cuatro personas en el casco antiguo de Salamanca. Roble, luz cálida y silencio: el sitio al que apetece volver después de andar la ciudad.",
  storyTitle: { before: "Se llama", em: "La Abi", after: "por ella" },
  // ⚠️ PENDIENTE — la historia real de la abuela la tiene que escribir Noelia.
  story: [
    "La abuela recibía siempre igual: la casa recogida, la luz encendida y algo caliente esperando en la cocina. Este apartamento es esa idea, reformado de arriba abajo y puesto al día.",
    "Roble natural, blanco roto y latón. Nada sobra y nada falta: una cama que descansa de verdad, una cocina en la que se puede cocinar y un baño que apetece. Todo en una calle tranquila del casco antiguo.",
  ],
  quote: ["«Que estéis como en casa.", "Lo demás ya lo ponemos nosotros.»"],
  pitch: {
    hook: "¿Sois cuatro?",
    text: "La Abi tiene el dormitorio aparte, baño completo y sitio de sobra para cuatro. Mismo portal, misma planta baja.",
  },
  facts: [
    { value: "4", label: "Huéspedes" },   // ✅ CONFIRMADO
    { value: "1", label: "Dormitorio" },  // ✅ CONFIRMADO
    { value: "1", label: "Baño" },        // ✅ CONFIRMADO
    { value: "Bajo", label: "Planta" },   // ✅ CONFIRMADO — «Bajo»
  ],
  marquee: [
    "Planta baja, sin escaleras",
    "Se admiten mascotas",
    "Wi-Fi rápido",
    "Aire acondicionado",
    "Lavadora y secadora",
    "Smart TV con Netflix",
    "Desde una noche",
  ],
  photos: [
    {
      src: "/img/dormitorio.jpg",
      alt: "Dormitorio de La Abi con cabecero de lamas de roble y cama grande vestida en blanco",
      caption: "El dormitorio",
      index: "01",
    },
    {
      src: "/img/comedor.jpg",
      alt: "Comedor de La Abi con mesa de madera, sillas tapizadas y panel de lamas",
      caption: "El comedor",
      index: "02",
    },
    {
      src: "/img/cocina.jpg",
      alt: "Cocina abierta de La Abi en blanco y roble con encimera de madera",
      caption: "La cocina",
      index: "03",
    },
    {
      src: "/img/bano.jpg",
      alt: "Baño de La Abi con espejo ovalado retroiluminado y encimera de madera",
      caption: "El baño",
      index: "04",
    },
    {
      src: "/img/estancia.jpg",
      alt: "Salón comedor de La Abi con mesa redonda de madera",
      caption: "La estancia",
      index: "05",
    },
    {
      src: "/img/dormitorio-detalle.jpg",
      alt: "Detalle del dormitorio de La Abi con mesilla de madera y lámpara cálida",
      caption: "Los detalles",
      index: "06",
    },
  ],
  // ⚠️ PENDIENTE confirmar la cama: Noelia escribió «2x2».
  amenities: equipment("Cama de 2 × 2 m"),
  faqs: questions({
    maxGuests: 4,
    layout: "La Abi tiene un dormitorio y un baño.",
  }),
  pricing: pricingLaAbi,
  seo: {
    title: "La Abi · Apartamento turístico en Salamanca",
    description:
      "Apartamento turístico en el centro de Salamanca para cuatro personas: un dormitorio, un baño y planta baja sin escaleras. Reserva directa, sin intermediarios.",
  },
};

/* ============================================================
   LA ABI 1 — 3 personas · estudio diáfano · 1 baño · planta baja
   ============================================================ */

export const laAbi1: Apartment = {
  slug: "la-abi-1",
  path: "/la-abi-1",
  ref: "A1",
  name: "La Abi 1",
  tagline: "Estudio en el centro de Salamanca",
  registry: "VUT-SA-0000", // ⚠️ PENDIENTE — obligatorio por ley
  headline: ["Un", "estudio", "claro", "en", "el", "mismo", "portal"],
  emphasis: "claro",
  // ⚠️ PENDIENTE — texto de relleno hasta que Noelia mande el suyo.
  intro:
    "El hermano pequeño de La Abi: un estudio diáfano para tres personas, en planta baja y con la misma cocina, la misma luz y el mismo cuidado. Todo a mano, sin tabiques de por medio.",
  storyTitle: { before: "El mismo", em: "portal", after: "otra casa" },
  // ⚠️ PENDIENTE — la historia real de la abuela la tiene que escribir Noelia.
  story: [
    "La Abi 1 está puerta con puerta con el primero y sale de la misma idea: la casa recogida, la luz encendida y sitio de sobra para dejar la maleta y salir a la calle.",
    "Aquí no hay pasillos ni puertas que sobren. Un solo espacio en el que la cocina, la mesa y la cama conviven sin estorbarse, y un baño completo al lado. Para dos que van sobrados o tres que van cómodos.",
  ],
  quote: ["«Pequeño de metros,", "grande de todo lo demás.»"],
  pitch: {
    hook: "¿Venís tres o dos?",
    text: "La Abi 1 es un estudio diáfano, más recogido y más barato, con la misma cocina y el mismo baño completo. Puerta con puerta.",
  },
  facts: [
    { value: "3", label: "Huéspedes" },   // ✅ CONFIRMADO
    { value: "Estudio", label: "Diáfano" }, // ✅ CONFIRMADO — «Ninguno» dormitorio
    { value: "1", label: "Baño" },        // ✅ CONFIRMADO — «uno»
    { value: "Bajo", label: "Planta" },   // ✅ CONFIRMADO — «Bajo»
  ],
  marquee: [
    "Estudio diáfano",
    "Planta baja, sin escaleras",
    "Se admiten mascotas",
    "Cocina equipada",
    "Wi-Fi rápido",
    "Aire acondicionado",
    "Desde una noche",
  ],
  // ⚠️ PENDIENTE — son las fotos de La Abi. Faltan las de este apartamento.
  photos: [
    {
      src: "/img/estancia.jpg",
      alt: "Estancia principal de La Abi 1 con mesa redonda de madera",
      caption: "El estudio",
      index: "01",
    },
    {
      src: "/img/cocina.jpg",
      alt: "Cocina de La Abi 1 en blanco y roble con encimera de madera",
      caption: "La cocina",
      index: "02",
    },
    {
      src: "/img/dormitorio.jpg",
      alt: "Zona de cama de La Abi 1 con cabecero de lamas de roble",
      caption: "La cama",
      index: "03",
    },
    {
      src: "/img/bano.jpg",
      alt: "Baño de La Abi 1 con espejo ovalado retroiluminado",
      caption: "El baño",
      index: "04",
    },
    {
      src: "/img/comedor.jpg",
      alt: "Zona de comedor de La Abi 1 con mesa de madera y panel de lamas",
      caption: "La mesa",
      index: "05",
    },
    {
      src: "/img/dormitorio-detalle.jpg",
      alt: "Detalle de La Abi 1 con mesilla de madera y lámpara cálida",
      caption: "Los detalles",
      index: "06",
    },
  ],
  // ✅ CONFIRMADO — Noelia escribió «150» para este apartamento.
  amenities: equipment("Cama de 1,50 m"),
  faqs: questions({
    maxGuests: 3,
    layout: "La Abi 1 es un estudio diáfano, sin dormitorio separado, con un baño completo.",
  }),
  pricing: pricingLaAbi1,
  seo: {
    title: "La Abi 1 · Estudio turístico en Salamanca",
    description:
      "Estudio turístico en el centro de Salamanca para tres personas, en planta baja y sin escaleras. Cocina equipada, aire acondicionado y reserva directa.",
  },
};

export const apartments: Apartment[] = [laAbi, laAbi1];

export function otherApartment(apt: Apartment): Apartment {
  return apt.slug === laAbi.slug ? laAbi1 : laAbi;
}

/* ------------------------------------------------------------
   ⚠️ PENDIENTE — Distancias sin comprobar.
   Están calculadas «a ojo» sobre el centro de Salamanca, no sobre
   el portal real. Hay que repasarlas cuando Noelia mande la
   ubicación exacta por WhatsApp.
   ------------------------------------------------------------ */
export const nearby: { name: string; minutes: string }[] = [
  { name: "Plaza Mayor", minutes: "5 min" },
  { name: "Catedral Nueva", minutes: "9 min" },
  { name: "Universidad de Salamanca", minutes: "8 min" },
  { name: "Casa Lis", minutes: "12 min" },
  { name: "Puente Romano", minutes: "14 min" },
  { name: "Estación de tren", minutes: "18 min" },
];
