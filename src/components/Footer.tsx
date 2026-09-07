import { site } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-ink text-bone">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-24">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo markClassName="h-11 w-11" />
            <p className="mt-8 max-w-sm text-[0.95rem] leading-relaxed text-bone/60">
              Apartamento turístico en el centro de {site.city}. Reformado y
              gestionado por la familia, no por una empresa.
            </p>
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
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow mb-6 text-bone/45">Dónde</p>
            <p className="text-[0.95rem] leading-relaxed text-bone/75">
              {site.address}
            </p>
            <p className="mt-5 text-[0.8rem] text-bone/45">
              Entrada {site.checkIn} · Salida {site.checkOut}
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-bone/12 pt-8 text-[0.75rem] text-bone/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName} · Registro de turismo{" "}
            {site.registry}
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
              La Abi · Salamanca ·
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
