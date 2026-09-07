"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { photos } from "@/lib/site";
import { Reveal } from "./Reveal";
import { SlatImage } from "./SlatImage";

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(
    (dir: number) =>
      setOpen((i) => (i === null ? i : (i + dir + photos.length) % photos.length)),
    [],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, go]);

  return (
    <section id="galeria" className="relative bg-bone-2 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <p className="eyebrow mb-7 flex items-center gap-3 text-ink-soft">
                <span className="inline-block h-px w-10 bg-oak-deep" />
                Galería
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display text-[clamp(2.2rem,5vw,4.2rem)]">
                Estancia a <em className="text-oak-deep">estancia</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <p className="max-w-xs text-[0.92rem] leading-relaxed text-ink-soft">
              Pulsa cualquier fotografía para verla a pantalla completa.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => setOpen(i)}
              className="group text-left"
              aria-label={`Ampliar: ${p.caption}`}
            >
              <SlatImage
                src={p.src}
                alt={p.alt}
                className={`aspect-[3/4] w-full ${
                  i % 3 === 1 ? "md:mt-10" : ""
                }`}
                sizes="(max-width: 768px) 46vw, 30vw"
              />
              <div className="mt-3 flex items-baseline justify-between">
                <span className="serif text-[0.98rem]">{p.caption}</span>
                <span className="eyebrow text-[0.6rem] text-ink-soft opacity-60">
                  {p.index}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Visor a pantalla completa */}
      {open !== null && (
        <div
          className="fixed inset-0 z-[80] flex flex-col bg-noir/96 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={photos[open].caption}
        >
          <div className="flex items-center justify-between px-6 py-5 md:px-10">
            <span className="eyebrow text-bone/70">
              {photos[open].index} / {String(photos.length).padStart(2, "0")} ·{" "}
              {photos[open].caption}
            </span>
            <button
              type="button"
              onClick={close}
              className="eyebrow text-bone/70 transition-colors hover:text-bone"
              aria-label="Cerrar"
            >
              Cerrar ✕
            </button>
          </div>

          <div className="relative flex-1 px-4 pb-4 md:px-16 md:pb-10">
            <Image
              key={photos[open].src}
              src={photos[open].src}
              alt={photos[open].alt}
              fill
              sizes="100vw"
              className="object-contain"
              style={{ animation: "fadeUp .7s cubic-bezier(.16,1,.3,1)" }}
            />
          </div>

          <div className="flex items-center justify-center gap-6 pb-8">
            <button
              type="button"
              onClick={() => go(-1)}
              className="eyebrow px-5 py-3 text-bone/70 transition-colors hover:text-bone"
            >
              ← Anterior
            </button>
            <span className="h-6 w-px bg-bone/20" />
            <button
              type="button"
              onClick={() => go(1)}
              className="eyebrow px-5 py-3 text-bone/70 transition-colors hover:text-bone"
            >
              Siguiente →
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
