"use client";

import { useEffect, useRef } from "react";
import { SlatImage } from "../SlatImage";
import type { Apartment } from "@/lib/site";

/* ------------------------------------------------------------
   Portada de La Abi 1.
   Misma paleta y misma tipografía que La Abi, pero al revés:
   la foto entra por la izquierda, el titular se levanta detrás
   de un telón en vez de saltar palabra a palabra, y el texto
   llega desde el lado con un desenfoque que se va.
   ------------------------------------------------------------ */

const EASE = "cubic-bezier(.16,1,.3,1)";

export function Hero1({ apt }: { apt: Apartment }) {
  const imgWrap = useRef<HTMLDivElement>(null);
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
        // Al contrario que en La Abi: aquí la foto se queda atrás.
        el.style.transform = `translate3d(0, ${y * 0.06}px, 0)`;
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
      {/* Halo cálido, ahora por la izquierda */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-[-12%] h-[64vh] w-[64vh] rounded-full opacity-70 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, rgba(195,154,107,0.28) 0%, rgba(226,211,190,0.12) 45%, transparent 70%)",
        }}
      />
      {/* Hilos horizontales en vez de lamas verticales */}
      <div
        aria-hidden
        className="threads pointer-events-none absolute right-0 top-0 hidden h-[42px] w-full opacity-25 lg:block"
      />

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-end gap-y-14 px-6 pb-10 md:px-10 lg:grid-cols-12 lg:gap-x-12 lg:pb-16">
        {/* Columna de imagen — ahora a la izquierda */}
        <div className="lg:order-1 lg:col-span-5">
          <div ref={imgWrap} className="relative will-change-transform">
            <SlatImage
              src={photo.src}
              alt={photo.alt}
              priority
              zoom={false}
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="aspect-[4/5] w-full lg:aspect-[3/4]"
            />
            {/* Tarjeta de precio arriba a la derecha — ⚠️ tarifa provisional */}
            <div
              className="absolute -top-5 right-4 flex items-baseline gap-2 bg-bone px-6 py-5 opacity-0 shadow-[0_18px_50px_-24px_rgba(36,28,22,0.45)] md:-right-8"
              style={{ animation: `unveil 1.1s ${EASE} 1.15s forwards` }}
            >
              <span className="eyebrow text-ink-soft">Desde</span>
              <span className="display text-[2.1rem]">{apt.pricing.base}€</span>
              <span className="text-[0.78rem] text-ink-soft">/ noche</span>
            </div>
          </div>
        </div>

        {/* Columna de texto — a la derecha */}
        <div className="lg:order-2 lg:col-span-7 lg:pb-6">
          <p
            className="eyebrow mb-8 flex items-center gap-3 text-ink-soft opacity-0"
            style={{ animation: `unveil .95s ${EASE} .12s forwards` }}
          >
            <span className="inline-block h-px w-10 bg-oak-deep" />
            {apt.tagline}
          </p>

          {/* El titular se levanta entero, detrás de un telón */}
          <h1
            className="display text-[clamp(2.7rem,7.6vw,6.4rem)] leading-[1.04] opacity-0"
            style={{ animation: `curtainUp 1.35s ${EASE} .26s forwards` }}
          >
            {apt.headline.map((w, i) => (
              <span key={i}>
                {w === apt.emphasis ? <em className="text-oak-deep">{w}</em> : w}{" "}
              </span>
            ))}
          </h1>

          <p
            className="mt-10 max-w-xl text-[1.02rem] leading-relaxed text-ink-soft opacity-0"
            style={{ animation: `driftIn 1.05s ${EASE} .78s forwards` }}
          >
            {apt.intro}
          </p>

          <div
            className="mt-11 flex flex-wrap items-center gap-4 opacity-0"
            style={{ animation: `driftIn 1.05s ${EASE} .95s forwards` }}
          >
            <a href="#reservar" className="btn btn-dark">
              Consultar fechas
            </a>
            <a href="#galeria" className="btn btn-ghost">
              Ver el estudio
            </a>
          </div>
        </div>
      </div>

      {/* Cifras — apiladas, no en línea */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="rule mt-10" />
        <div className="grid grid-cols-2 md:grid-cols-4">
          {apt.facts.map((f, i) => (
            <div
              key={f.label}
              className={`flex flex-col gap-1 py-7 ${
                i > 0 ? "md:border-l md:border-ink/10 md:pl-8" : ""
              }`}
            >
              <span className="eyebrow text-oak-deep opacity-70">
                0{i + 1}
              </span>
              <span className="display mt-2 text-[2.2rem]">{f.value}</span>
              <span className="eyebrow text-ink-soft">{f.label}</span>
            </div>
          ))}
        </div>
        <div className="rule" />
      </div>
    </section>
  );
}
