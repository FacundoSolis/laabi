"use client";

import { useEffect, useRef } from "react";

/* Cursor circular que sigue al puntero con inercia y crece sobre
   los elementos interactivos. Solo en dispositivos con ratón. */

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.style.opacity = "0";

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;

    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.style.opacity = "1";

      const target = (e.target as HTMLElement | null)?.closest(
        "a, button, [role='button'], input, select, textarea, [data-cursor]",
      );
      el.dataset.active = target ? "1" : "";
      if (target) {
        el.style.width = "78px";
        el.style.height = "78px";
        el.style.margin = "-39px 0 0 -39px";
        el.style.backgroundColor = "rgba(36,28,22,0.9)";
      } else {
        el.style.width = "46px";
        el.style.height = "46px";
        el.style.margin = "-23px 0 0 -23px";
        el.style.backgroundColor = "transparent";
      }
    };

    const leave = () => { el.style.opacity = "0"; };

    const loop = () => {
      x += (tx - x) * 0.17;
      y += (ty - y) * 0.17;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor-dot hidden md:block" aria-hidden="true" />;
}
