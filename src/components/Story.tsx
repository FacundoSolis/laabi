import { Reveal } from "./Reveal";
import { SlatImage } from "./SlatImage";
import { LogoMark } from "./Logo";

export function Story() {
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
                Se llama <em className="text-oak-deep">La Abi</em> por ella
              </h2>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-8 space-y-5 text-[1rem] leading-relaxed text-ink-soft">
                <p>
                  La abuela recibía siempre igual: la casa recogida, la luz
                  encendida y algo caliente esperando en la cocina. Este
                  apartamento es esa idea, reformado de arriba abajo y puesto al
                  día.
                </p>
                <p>
                  Roble natural, blanco roto y latón. Nada sobra y nada falta:
                  una cama que descansa de verdad, una cocina en la que se puede
                  cocinar y un baño que apetece. Todo en una calle tranquila del
                  casco antiguo, a cinco minutos andando de la Plaza Mayor.
                </p>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-11 flex items-center gap-5 border-t border-ink/10 pt-8">
                <LogoMark className="h-12 w-12 text-oak-deep" strokeWidth={2.2} />
                <p className="serif text-[1.05rem] italic leading-snug text-ink">
                  «Que estéis como en casa.
                  <br />
                  Lo demás ya lo ponemos nosotros.»
                </p>
              </div>
            </Reveal>
          </div>

          {/* Composición de dos imágenes desfasadas */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <SlatImage
                src="/img/comedor.jpg"
                alt="Comedor con mesa de madera y panel de lamas"
                className="aspect-[3/4] w-full"
                sizes="(max-width: 1024px) 45vw, 25vw"
              />
              <SlatImage
                src="/img/cocina.jpg"
                alt="Cocina abierta en blanco y roble"
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
