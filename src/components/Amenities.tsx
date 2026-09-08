import type { Apartment } from "@/lib/site";
import { Reveal } from "./Reveal";

export function Amenities({ apt }: { apt: Apartment }) {
  return (
    <section id="equipamiento" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow mb-7 flex items-center gap-3 text-ink-soft">
                <span className="inline-block h-px w-10 bg-oak-deep" />
                Equipamiento
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display text-[clamp(2.2rem,4.4vw,3.6rem)]">
                Todo <em className="text-oak-deep">puesto</em>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-7 max-w-sm text-[0.98rem] leading-relaxed text-ink-soft">
                Llegas con la maleta y ya está. Si echas algo en falta, un
                mensaje y lo tienes.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-8">
            {apt.amenities.map((group, gi) => (
              <Reveal key={group.group} delay={gi * 90}>
                <div className="border-t border-ink/12 pt-6">
                  <h3 className="eyebrow mb-6 flex items-baseline gap-3 text-ink">
                    <span className="text-oak-deep opacity-70">
                      0{gi + 1}
                    </span>
                    {group.group}
                  </h3>
                  <ul className="space-y-3">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[0.95rem] leading-relaxed text-ink-soft"
                      >
                        <span
                          aria-hidden
                          className="mt-[0.6em] h-px w-3 shrink-0 bg-oak"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
