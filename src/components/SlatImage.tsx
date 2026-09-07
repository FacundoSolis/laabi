"use client";

import Image from "next/image";
import { useReveal } from "./Reveal";

/* ------------------------------------------------------------
   Imagen que se descubre en franjas verticales, como las lamas
   de madera del cabecero del apartamento.
   ------------------------------------------------------------ */

const BARS = 7;

export function SlatImage({
  src,
  alt,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  zoom = true,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  zoom?: boolean;
}) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`slat-reveal media ${zoom ? "media-zoom" : ""} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
      {Array.from({ length: BARS }).map((_, i) => (
        <span
          key={i}
          className="slat-bar"
          style={{
            left: `${(i * 100) / BARS}%`,
            width: `calc(${100 / BARS}% + 1px)`,
            transitionDelay: `${i * 85}ms`,
          }}
        />
      ))}
    </div>
  );
}
