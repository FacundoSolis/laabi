import { ApartmentLink } from "./ApartmentLink";
import { otherApartment, type Apartment } from "@/lib/site";
import { Reveal } from "./Reveal";
import { SlatImage } from "./SlatImage";

/* ------------------------------------------------------------
   Franja en mitad de la página que anuncia el otro apartamento.
   Va en arena, el único tono de la paleta que no usa ninguna otra
   sección, para que se note que aquí se cambia de tema.

   Con `mirrored` la foto se va a la derecha: así en La Abi 1, que
   lleva toda la maqueta espejada, este bloque acompaña.
   ------------------------------------------------------------ */

export function OtherApartment({
  apt,
  mirrored = false,
}: {
  apt: Apartment;
  mirrored?: boolean;
}) {
  const other = otherApartment(apt);
  const photo = other.photos[mirrored ? 3 : 1];

  return (
    <section className="on-sand relative overflow-hidden bg-sand py-20 md:py-28">
      {/* Lamas al borde, como guiño al cabecero */}
      <div
        aria-hidden
        className={`slats pointer-events-none absolute top-0 hidden h-full w-[46px] opacity-25 lg:block ${
          mirrored ? "left-0" : "right-0"
        }`}
      />

      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Texto */}
          <div className={mirrored ? "lg:order-2 lg:col-span-6 lg:col-start-7" : "lg:col-span-6"}>
            <Reveal>
              <p className="eyebrow mb-7 flex items-center gap-3 text-walnut">
                <span className="inline-block h-px w-10 bg-walnut" />
                En el mismo portal
              </p>
            </Reveal>

            <Reveal delay={80}>
              <p className="serif text-[1.15rem] italic text-walnut">
                {other.pitch.hook}
              </p>
            </Reveal>

            <Reveal delay={140}>
              <h2 className="display mt-3 text-[clamp(2.4rem,5.4vw,4.4rem)]">
                También está <em className="text-oak-deep">{other.name}</em>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-7 max-w-lg text-[1rem] leading-relaxed text-ink-soft">
                {other.pitch.text}
              </p>
            </Reveal>

            {/* Cifras del otro apartamento */}
            <Reveal delay={260}>
              <ul className="mt-9 flex flex-wrap gap-x-10 gap-y-5 border-t border-ink/15 pt-7">
                {other.facts.slice(0, 3).map((f) => (
                  <li key={f.label} className="flex items-baseline gap-2">
                    <span className="display text-[1.7rem]">{f.value}</span>
                    <span className="eyebrow text-ink-soft">{f.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={320}>
              <ApartmentLink
                href={other.path}
                className="btn btn-dark mt-10 group"
              >
                Ver {other.name}
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-500 group-hover:translate-x-1"
                >
                  →
                </span>
              </ApartmentLink>
            </Reveal>
          </div>

          {/* Foto del otro apartamento */}
          <div className={mirrored ? "lg:order-1 lg:col-span-5" : "lg:col-span-5 lg:col-start-8"}>
            <ApartmentLink href={other.path} className="block" aria-hidden tabIndex={-1}>
              <SlatImage
                src={photo.src}
                alt={photo.alt}
                className="aspect-[4/3] w-full lg:aspect-[4/5]"
                sizes="(max-width: 1024px) 100vw, 38vw"
              />
            </ApartmentLink>
          </div>
        </div>
      </div>
    </section>
  );
}
