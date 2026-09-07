/* ============================================================
   Contenido editable de la web.
   Todo lo que el cliente puede querer cambiar vive aquí.
   Los valores marcados con  // ⚠️ CONFIRMAR  son provisionales.
   ============================================================ */

export const site = {
  name: "La Abi",
  legalName: "La Abi · Apartamentos Turísticos",
  tagline: "Apartamentos turísticos en Salamanca",
  city: "Salamanca",

  // ⚠️ CONFIRMAR — datos de contacto reales
  phone: "+34 600 000 000",
  phoneHref: "+34600000000",
  whatsapp: "34600000000",
  email: "hola@laabi.es",
  address: "Calle del Ejemplo, 12 · 37002 Salamanca", // ⚠️ CONFIRMAR
  instagram: "https://instagram.com/",                 // ⚠️ CONFIRMAR
  registry: "VUT-SA-0000",                             // ⚠️ CONFIRMAR nº registro de turismo CyL

  // Coordenadas usadas en el mapa (ahora mismo: Plaza Mayor de Salamanca)
  map: { lat: 40.9651, lng: -5.6640 }, // ⚠️ CONFIRMAR

  // ⚠️ CONFIRMAR — tarifas
  pricing: {
    base: 85,          // € por noche entre semana
    weekend: 98,       // € por noche viernes y sábado
    highSeason: 1.18,  // multiplicador jun–sep, Semana Santa y Navidad
    cleaning: 30,      // € limpieza final, un único cargo
    minNights: 2,
    maxGuests: 4,
    extraGuestFrom: 3, // a partir del 3.er huésped
    extraGuestFee: 12, // € por huésped y noche
  },

  facts: [
    { value: "4", label: "Huéspedes" },
    { value: "1", label: "Dormitorio" },
    { value: "1", label: "Baño" },
    { value: "45", label: "m² útiles" },
  ],

  checkIn: "16:00",
  checkOut: "11:00",
} as const;

export type Photo = {
  src: string;
  alt: string;
  caption: string;
  index: string;
};

export const photos: Photo[] = [
  {
    src: "/img/dormitorio.jpg",
    alt: "Dormitorio principal con cabecero de lamas de roble y cama grande vestida en blanco",
    caption: "El dormitorio",
    index: "01",
  },
  {
    src: "/img/comedor.jpg",
    alt: "Comedor con mesa de madera, cuatro sillas tapizadas y panel de lamas de madera",
    caption: "El comedor",
    index: "02",
  },
  {
    src: "/img/cocina.jpg",
    alt: "Cocina abierta en blanco y roble con encimera de madera y placa de inducción",
    caption: "La cocina",
    index: "03",
  },
  {
    src: "/img/bano.jpg",
    alt: "Baño con espejo ovalado retroiluminado, lavabo negro y encimera de madera",
    caption: "El baño",
    index: "04",
  },
  {
    src: "/img/estancia.jpg",
    alt: "Salón comedor con mesa redonda de madera y vistas al dormitorio",
    caption: "La estancia",
    index: "05",
  },
  {
    src: "/img/dormitorio-detalle.jpg",
    alt: "Detalle del dormitorio con mesilla de madera y lámpara de luz cálida",
    caption: "Los detalles",
    index: "06",
  },
];

export const amenities: { group: string; items: string[] }[] = [
  {
    group: "Descanso",
    items: [
      "Cama de 1,50 m con colchón viscoelástico",
      "Ropa de cama y toallas de algodón",
      "Armario abierto y zona de equipaje",
      "Persianas con oscurecimiento total",
    ],
  },
  {
    group: "Cocina",
    items: [
      "Placa de inducción y campana extractora",
      "Microondas, nevera y menaje completo",
      "Cafetera, hervidor y tostadora",
      "Lavadora",
    ],
  },
  {
    group: "Confort",
    items: [
      "Aire acondicionado frío y calor",
      "Wi-Fi de fibra en todo el apartamento",
      "Smart TV",
      "Secador y set de aseo de cortesía",
    ],
  },
  {
    group: "Llegada",
    items: [
      "Check-in autónomo con caja de llaves",
      "Entrada flexible a partir de las 16:00",
      "Guía de la ciudad escrita por la familia",
      "Atención por WhatsApp durante la estancia",
    ],
  },
];

export const nearby: { name: string; minutes: string }[] = [
  { name: "Plaza Mayor", minutes: "5 min" },
  { name: "Catedral Nueva", minutes: "9 min" },
  { name: "Universidad de Salamanca", minutes: "8 min" },
  { name: "Casa Lis", minutes: "12 min" },
  { name: "Puente Romano", minutes: "14 min" },
  { name: "Estación de tren", minutes: "18 min" },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "¿A qué hora puedo entrar y salir?",
    a: `La entrada es a partir de las ${site.checkIn} y la salida hasta las ${site.checkOut}. Si tu tren o tu vuelo no encajan, escríbenos: casi siempre encontramos la manera de ajustarlo.`,
  },
  {
    q: "¿Cómo recojo las llaves?",
    a: "El check-in es autónomo. Un día antes de tu llegada te enviamos el código de la caja de llaves y un vídeo corto explicando cómo llegar al portal.",
  },
  {
    q: "¿Hay dónde aparcar?",
    a: "Hay zona de estacionamiento regulado en la calle y varios parkings públicos a menos de cinco minutos andando. Te indicamos el más cómodo según los días que te quedes.",
  },
  {
    q: "¿Se admiten mascotas?",
    a: "Sí, admitimos mascotas pequeñas avisando antes de la reserva. Cuéntanoslo al enviar tu solicitud.",
  },
  {
    q: "¿Cómo se confirma la reserva?",
    a: "Envías la solicitud desde esta web y te contestamos el mismo día con la disponibilidad y las instrucciones de pago. La reserva queda cerrada cuando recibimos el anticipo.",
  },
];
