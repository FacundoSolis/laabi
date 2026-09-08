"use client";

import Image from "next/image";
import { useReveal } from "./Reveal";
import { useMotionVariant } from "./Motion";

/* ------------------------------------------------------------
   Imagen que se descubre sola al entrar en pantalla.

   · La Abi   ("slat") — franjas verticales, como las lamas de
     madera del cabecero, que caen de arriba abajo.
   · La Abi 1 ("veil") — bandas horizontales que barren de
     izquierda a derecha mientras la foto se asienta desde una
     escala ligeramente mayor.
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
  const variant = useMotionVariant();
  const veil = variant === "veil";

  return (
    <div
      ref={ref}
      data-motion={variant}
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
          style={
            veil
              ? {
                  top: `${(i * 100) / BARS}%`,
                  height: `calc(${100 / BARS}% + 1px)`,
                  transitionDelay: `${i * 70}ms`,
                }
              : {
                  left: `${(i * 100) / BARS}%`,
                  width: `calc(${100 / BARS}% + 1px)`,
                  transitionDelay: `${i * 85}ms`,
                }
          }
        />
      ))}
    </div>
  );
}
