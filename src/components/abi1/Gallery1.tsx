"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Apartment, Photo } from "@/lib/site";
import { Reveal } from "../Reveal";
import { SlatImage } from "../SlatImage";

/* ------------------------------------------------------------
   Galería de La Abi 1.
   La Abi la enseña en una retícula uniforme de tres columnas.
   Aquí el ritmo es editorial: una foto ancha que abre, un par
   a media página y un trío para cerrar. El pie aparece encima
   de la foto al pasar el ratón, no debajo.
   ------------------------------------------------------------ */

export function Gallery1({ apt }: { apt: Apartment }) {
  const photos = apt.photos;
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(
    (dir: number) =>
      setOpen((i) => (i === null ? i : (i + dir + photos.length) % photos.length)),
    [photos.length],
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

  const pair = photos.slice(1, 3);
  const trio = photos.slice(3);

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
                Un solo <em className="text-oak-deep">espacio</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <p className="max-w-xs text-[0.92rem] leading-relaxed text-ink-soft">
              Pulsa cualquier fotografía para verla a pantalla completa.
            </p>
          </Reveal>
        </div>

        {/* Apertura a toda anchura */}
        <Tile
          photo={photos[0]}
          onOpen={() => setOpen(0)}
          ratio="aspect-[16/9]"
          sizes="(max-width: 768px) 100vw, 88vw"
        />

        {/* Par a media página */}
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-7 md:gap-7">
          {pair.map((p, k) => (
            <Tile
              key={p.src}
              photo={p}
              onOpen={() => setOpen(k + 1)}
              ratio={k === 1 ? "aspect-[4/5] sm:mt-12" : "aspect-[4/5]"}
              sizes="(max-width: 640px) 100vw, 44vw"
            />
          ))}
        </div>

        {/* Trío de cierre */}
        <div className="mt-5 grid grid-cols-2 gap-5 md:mt-7 md:grid-cols-3 md:gap-7">
          {trio.map((p, k) => (
            <Tile
              key={p.src}
              photo={p}
              onOpen={() => setOpen(k + 3)}
              ratio="aspect-square"
              sizes="(max-width: 768px) 46vw, 29vw"
            />
          ))}
        </div>

        {/* Índice escrito, guiño editorial */}
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-ink/12 pt-6">
          {photos.map((p, i) => (
            <li key={p.src}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="link-line text-[0.85rem] text-ink-soft transition-colors hover:text-ink"
              >
                <span className="eyebrow mr-2 text-[0.6rem] text-oak-deep">
                  {p.index}
                </span>
                {p.caption}
              </button>
            </li>
          ))}
        </ul>
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
              style={{ animation: "unveil .8s cubic-bezier(.16,1,.3,1)" }}
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

/* Cada foto: se amplía al pulsar y enseña el pie al pasar por encima.
   Vive fuera del componente para que no se vuelva a montar —y a
   reproducir el revelado— cada vez que se abre o cierra el visor. */
function Tile({
  photo,
  onOpen,
  ratio,
  sizes,
}: {
  photo: Photo;
  onOpen: () => void;
  ratio: string;
  sizes: string;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block w-full text-left"
      aria-label={`Ampliar: ${photo.caption}`}
    >
      <SlatImage
        src={photo.src}
        alt={photo.alt}
        className={`${ratio} w-full`}
        sizes={sizes}
      />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] flex items-baseline justify-between gap-4 bg-gradient-to-t from-noir/70 to-transparent px-5 pb-4 pt-14 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
        <span className="serif text-[1rem] text-bone">{photo.caption}</span>
        <span className="eyebrow text-[0.6rem] text-bone/70">{photo.index}</span>
      </span>
    </button>
  );
}
