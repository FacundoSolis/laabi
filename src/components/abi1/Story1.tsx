import { Reveal } from "../Reveal";
import { SlatImage } from "../SlatImage";
import { LogoMark } from "../Logo";
import type { Apartment } from "@/lib/site";

/* ------------------------------------------------------------
   El relato de La Abi 1.
   El mismo bloque que en La Abi, pero espejado: las fotos se
   apilan a la izquierda (una ancha y una alta, no dos gemelas)
   y el texto cae a la derecha con un filo de roble.
   ------------------------------------------------------------ */

export function Story1({ apt }: { apt: Apartment }) {
  const [wide, tall] = [apt.photos[1], apt.photos[2]];

  return (
    <section id="apartamento" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Fotos apiladas a la izquierda */}
          <div className="lg:order-1 lg:col-span-6">
            <SlatImage
              src={wide.src}
              alt={wide.alt}
              className="aspect-[16/11] w-full"
              sizes="(max-width: 1024px) 100vw, 46vw"
            />
            <div className="mt-5 grid grid-cols-5 gap-5 md:mt-7">
              <div className="col-span-2 flex flex-col justify-end pb-2">
                <div className="threads h-[38px] w-full opacity-30" aria-hidden />
                <p className="eyebrow mt-6 text-ink-soft">
                  Planta baja
                  <br />
                  Sin escaleras
                </p>
              </div>
              <SlatImage
                src={tall.src}
                alt={tall.alt}
                className="col-span-3 aspect-[4/5] w-full"
                sizes="(max-width: 1024px) 60vw, 28vw"
              />
            </div>
          </div>

          {/* Texto a la derecha */}
          <div className="lg:order-2 lg:col-span-5 lg:col-start-8">
            <Reveal>
              <p className="eyebrow mb-8 flex items-center gap-3 text-ink-soft">
                <span className="inline-block h-px w-10 bg-oak-deep" />
                El estudio
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="display text-[clamp(2.2rem,4.6vw,3.9rem)]">
                {apt.storyTitle.before}{" "}
                <em className="text-oak-deep">{apt.storyTitle.em}</em>{" "}
                {apt.storyTitle.after}
              </h2>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-8 space-y-5 border-l border-oak/40 pl-6 text-[1rem] leading-relaxed text-ink-soft">
                {apt.story.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-11 flex items-center gap-5 border-t border-ink/10 pt-8">
                <LogoMark className="h-12 w-12 text-oak-deep" strokeWidth={2.2} />
                <p className="serif text-[1.05rem] italic leading-snug text-ink">
                  {apt.quote.map((line, i) => (
                    <span key={line}>
                      {line}
                      {i < apt.quote.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
