"use client";

import { useEffect, useRef } from "react";
import { SlatImage } from "./SlatImage";
import type { Apartment } from "@/lib/site";

export function Hero({ apt }: { apt: Apartment }) {
  const imgWrap = useRef<HTMLDivElement>(null);
  const words = apt.headline;
  const photo = apt.photos[0];

  useEffect(() => {
    const el = imgWrap.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 900);
        el.style.transform = `translate3d(0, ${y * -0.08}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="top" className="relative overflow-hidden pt-[calc(var(--nav-h)+2rem)]">
      {/* Halo cálido de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[70vh] w-[70vh] rounded-full opacity-70 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, rgba(195,154,107,0.30) 0%, rgba(226,211,190,0.12) 45%, transparent 70%)",
        }}
      />
      {/* Lamas decorativas en el margen */}
      <div
        aria-hidden
        className="slats pointer-events-none absolute left-0 top-0 hidden h-full w-[46px] opacity-30 lg:block"
      />

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-end gap-y-12 px-6 pb-10 md:px-10 lg:grid-cols-12 lg:gap-x-10 lg:pb-16">
        {/* Columna de texto */}
        <div className="lg:col-span-7 lg:pb-6">
          <p
            className="eyebrow mb-8 flex items-center gap-3 text-ink-soft opacity-0"
            style={{ animation: "fadeUp .9s cubic-bezier(.16,1,.3,1) .15s forwards" }}
          >
            <span className="inline-block h-px w-10 bg-oak-deep" />
            {apt.tagline}
          </p>

          <h1 className="display text-[clamp(2.9rem,8.4vw,7rem)] leading-[1.02]">
            {words.map((w, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden align-bottom pb-[0.2em] -mb-[0.2em]"
              >
                <span
                  className="inline-block opacity-0"
                  style={{
                    animation: `slideUp 1.15s cubic-bezier(.16,1,.3,1) ${
                      0.22 + i * 0.06
                    }s forwards`,
                  }}
                >
                  {w === apt.emphasis ? <em className="text-oak-deep">{w}</em> : w}
                  &nbsp;
                </span>
              </span>
            ))}
          </h1>

          <p
            className="mt-10 max-w-xl text-[1.02rem] leading-relaxed text-ink-soft opacity-0"
            style={{ animation: "fadeUp 1s cubic-bezier(.16,1,.3,1) .8s forwards" }}
          >
            {apt.intro}
          </p>

          <div
            className="mt-11 flex flex-wrap items-center gap-4 opacity-0"
            style={{ animation: "fadeUp 1s cubic-bezier(.16,1,.3,1) .95s forwards" }}
          >
            <a href="#reservar" className="btn btn-dark">
              Consultar fechas
            </a>
            <a href="#galeria" className="btn btn-ghost">
              Ver el apartamento
            </a>
          </div>
        </div>

        {/* Columna de imagen */}
        <div className="lg:col-span-5">
          <div ref={imgWrap} className="relative will-change-transform">
            <SlatImage
              src={photo.src}
              alt={photo.alt}
              priority
              zoom={false}
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="aspect-[4/5] w-full lg:aspect-[3/4]"
            />
            {/* Tarjeta de precio — ⚠️ PENDIENTE: tarifa provisional */}
            <div className="absolute -bottom-6 left-4 flex items-baseline gap-2 bg-bone px-6 py-5 shadow-[0_18px_50px_-24px_rgba(36,28,22,0.45)] md:-left-8">
              <span className="eyebrow text-ink-soft">Desde</span>
              <span className="display text-[2.1rem]">{apt.pricing.base}€</span>
              <span className="text-[0.78rem] text-ink-soft">/ noche</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cifras */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="rule mt-10" />
        <div className="grid grid-cols-2 md:grid-cols-4">
          {apt.facts.map((f, i) => (
            <div
              key={f.label}
              className={`flex items-baseline gap-3 py-7 ${
                i > 0 ? "md:border-l md:border-ink/10 md:pl-8" : ""
              }`}
            >
              <span className="display text-[2.4rem]">{f.value}</span>
              <span className="eyebrow text-ink-soft">{f.label}</span>
            </div>
          ))}
        </div>
        <div className="rule" />
      </div>
    </section>
  );
}
