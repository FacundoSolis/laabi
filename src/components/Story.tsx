import { Reveal } from "./Reveal";
import { SlatImage } from "./SlatImage";
import { LogoMark } from "./Logo";
import type { Apartment } from "@/lib/site";

export function Story({ apt }: { apt: Apartment }) {
  const [a, b] = [apt.photos[1], apt.photos[2]];

  return (
    <section id="apartamento" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow mb-8 flex items-center gap-3 text-ink-soft">
                <span className="inline-block h-px w-10 bg-oak-deep" />
                El apartamento
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
              <div className="mt-8 space-y-5 text-[1rem] leading-relaxed text-ink-soft">
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

          {/* Composición de dos imágenes desfasadas */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <SlatImage
                src={a.src}
                alt={a.alt}
                className="aspect-[3/4] w-full"
                sizes="(max-width: 1024px) 45vw, 25vw"
              />
              <SlatImage
                src={b.src}
                alt={b.alt}
                className="mt-12 aspect-[3/4] w-full md:mt-20"
                sizes="(max-width: 1024px) 45vw, 25vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
