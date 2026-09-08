import Link from "next/link";
import { otherApartment, site, type Apartment } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer({ apt }: { apt: Apartment }) {
  const other = otherApartment(apt);

  return (
    <footer className="bg-ink text-bone">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-24">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo markClassName="h-11 w-11" label={apt.name.toUpperCase()} />
            <p className="mt-8 max-w-sm text-[0.95rem] leading-relaxed text-bone/60">
              Apartamento turístico en el centro de {site.city}. Reformado y
              gestionado por la familia, no por una empresa.
            </p>

            {/* Salto al otro apartamento */}
            <Link
              href={other.path}
              className="group mt-9 inline-flex flex-col gap-1 border-t border-bone/15 pt-6"
            >
              <span className="eyebrow text-bone/45">El otro apartamento</span>
              <span className="serif flex items-baseline gap-3 text-[1.4rem] text-bone">
                {other.name}
                <span
                  aria-hidden
                  className="text-oak transition-transform duration-500 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
              <span className="text-[0.82rem] text-bone/55">{other.tagline}</span>
            </Link>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="eyebrow mb-6 text-bone/45">Contacto</p>
            <ul className="space-y-3 text-[0.95rem]">
              <li>
                <a href={`tel:${site.phoneHref}`} className="link-line">
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="link-line">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line"
                >
                  {site.instagramName}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow mb-6 text-bone/45">Dónde</p>
            <p className="text-[0.95rem] leading-relaxed text-bone/75">
              {site.address}
              <br />
              {site.city}
            </p>
            <p className="mt-5 text-[0.8rem] text-bone/45">
              Entrada {site.checkIn} · Salida {site.checkOut}
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-bone/12 pt-8 text-[0.75rem] text-bone/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName} · Titular:{" "}
            {site.owner} · Registro de turismo {apt.registry}
          </p>
          <p>Salamanca, España</p>
        </div>
      </div>

      {/* Firma tipográfica a sangre */}
      <div className="overflow-hidden border-t border-bone/10">
        <div className="marquee marquee-slow py-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="display whitespace-nowrap px-8 text-[clamp(3.5rem,11vw,9rem)] text-bone/10"
            >
              {apt.name} · Salamanca ·
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
