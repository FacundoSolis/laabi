import { site } from "./site";

const P = site.pricing;

export type Quote = {
  nights: number;
  nightsTotal: number;
  extraGuests: number;
  cleaning: number;
  total: number;
  average: number;
};

/** Fecha local en formato YYYY-MM-DD, sin depender de la zona horaria. */
export function toISO(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

export function parseISO(s: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

export function today(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

/** Temporada alta: verano completo y las fiestas de Navidad. */
function isHighSeason(d: Date): boolean {
  const month = d.getMonth() + 1;
  const day = d.getDate();
  if (month >= 6 && month <= 9) return true;
  if (month === 12 && day >= 20) return true;
  if (month === 1 && day <= 6) return true;
  return false;
}

function nightPrice(d: Date): number {
  const weekday = d.getDay(); // 0 domingo … 6 sábado
  const base = weekday === 5 || weekday === 6 ? P.weekend : P.base;
  return isHighSeason(d) ? base * P.highSeason : base;
}

export function quote(
  checkIn: string,
  checkOut: string,
  guests: number,
): Quote | null {
  const a = parseISO(checkIn);
  const b = parseISO(checkOut);
  if (!a || !b) return null;

  const nights = Math.round((b.getTime() - a.getTime()) / 86_400_000);
  if (nights <= 0) return null;

  let nightsTotal = 0;
  for (let i = 0; i < nights; i++) nightsTotal += nightPrice(addDays(a, i));
  nightsTotal = Math.round(nightsTotal);

  const extra = Math.max(0, guests - (P.extraGuestFrom - 1));
  const extraGuests = extra * P.extraGuestFee * nights;
  const total = nightsTotal + extraGuests + P.cleaning;

  return {
    nights,
    nightsTotal,
    extraGuests,
    cleaning: P.cleaning,
    total,
    average: Math.round(nightsTotal / nights),
  };
}

export function formatEuro(n: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatDateLong(iso: string): string {
  const d = parseISO(iso);
  if (!d) return "";
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}
