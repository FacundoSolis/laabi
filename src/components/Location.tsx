import { nearby, site } from "@/lib/site";
import { Reveal } from "./Reveal";
import { SlatImage } from "./SlatImage";

export function Location() {
  return (
    <section id="ubicacion" className="bg-bone-2 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow mb-7 flex items-center gap-3 text-ink-soft">
                <span className="inline-block h-px w-10 bg-oak-deep" />
                Ubicación
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display text-[clamp(2.2rem,4.6vw,3.9rem)]">
                Salamanca, <em className="text-oak-deep">a pie</em>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-7 max-w-md text-[0.98rem] leading-relaxed text-ink-soft">
                Desde el portal se llega andando a todo lo que importa. No hace
                falta coche: sales por la puerta y ya estás en la ciudad vieja.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <ul className="mt-10">
                {nearby.map((n) => (
                  <li
                    key={n.name}
                    className="group flex items-baseline justify-between gap-6 border-b border-ink/12 py-4"
                  >
                    <span className="serif text-[1.08rem] transition-transform duration-500 group-hover:translate-x-1">
                      {n.name}
                    </span>
                    <span className="eyebrow shrink-0 text-ink-soft">
                      {n.minutes}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={260}>
              <p className="mt-8 text-[0.85rem] leading-relaxed text-ink-soft">
                {site.address}
                <br />
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${site.map.lat},${site.map.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line mt-2 inline-block text-ink"
                >
                  Abrir en Google Maps
                </a>
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <div className="media aspect-[4/3] w-full border border-ink/10">
                <iframe
                  title="Mapa de la ubicación del apartamento en Salamanca"
                  src={`https://maps.google.com/maps?q=${site.map.lat},${site.map.lng}&z=16&hl=es&output=embed`}
                  className="h-full w-full grayscale-[0.28] contrast-[0.97]"
                  loading="lazy"
                />
              </div>
            </Reveal>
            <div className="mt-6">
              <SlatImage
                src="/img/estancia.jpg"
                alt="Salón comedor del apartamento con mesa redonda de madera"
                className="aspect-[16/10] w-full"
                sizes="(max-width: 1024px) 100vw, 46vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
