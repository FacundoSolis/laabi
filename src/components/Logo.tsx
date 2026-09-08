"use client";

import { useEffect, useRef } from "react";

/* ------------------------------------------------------------
   Marca de La Abi.
   Reinterpretación minimalista del logo original: el perfil de
   la abuela dibujado con una sola línea continua, el moño
   reducido a un círculo y un trazo diagonal que lo remata.
   Al montarse, la línea se dibuja sola.
   ------------------------------------------------------------ */

export function LogoMark({
  className = "",
  animate = false,
  strokeWidth = 2.4,
}: {
  className?: string;
  animate?: boolean;
  strokeWidth?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!animate || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const paths = ref.current.querySelectorAll<SVGGeometryElement>("[data-draw]");
    paths.forEach((p, i) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
      p.style.transition = `stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1) ${i * 190 + 250}ms`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          p.style.strokeDashoffset = "0";
        });
      });
    });
  }, [animate]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Perfil: frente, nariz, labios, barbilla y cuello */}
      <path data-draw d="M48 16C46 9.5 38.5 6.5 30.5 8.2 22.5 10 17 16.5 17.5 24.5c.3 3.5 1.1 4.5 1.1 6.5 0 3-4.6 5.8-4.4 8 .2 1.6 4.4 1 5 2.8.6 1.8-1 2.6 0 4.6 1 2 4.3 2.6 6.3 3.6 3 1.4 4 3.3 4 7.8" />
      {/* Cabello recogido hacia el moño */}
      <path data-draw d="M31.5 9C38 10 43 13 45.6 16.6" />
      {/* Moño */}
      <circle data-draw cx="50.5" cy="21" r="5.8" />
    </svg>
  );
}

export function Logo({
  className = "",
  markClassName = "h-9 w-9",
  animate = false,
  stacked = false,
  label = "LA ABI",
}: {
  className?: string;
  markClassName?: string;
  animate?: boolean;
  stacked?: boolean;
  label?: string;
}) {
  return (
    <span
      className={`inline-flex items-center ${
        stacked ? "flex-col gap-3" : "gap-3"
      } ${className}`}
    >
      <LogoMark className={markClassName} animate={animate} />
      <span className={`flex flex-col ${stacked ? "items-center" : ""} leading-none`}>
        <span
          className="serif text-[1.35rem] font-normal tracking-[0.12em]"
          style={{ fontVariationSettings: '"SOFT" 30, "WONK" 1' }}
        >
          {label}
        </span>
        <span className="eyebrow mt-[6px] text-[0.5rem] opacity-55">
          Salamanca
        </span>
      </span>
    </span>
  );
}
