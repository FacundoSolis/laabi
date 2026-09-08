"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { useMotionVariant } from "./Motion";

/* Observador compartido: un único IntersectionObserver para toda la página. */
let observer: IntersectionObserver | null = null;

function getObserver() {
  if (typeof window === "undefined") return null;
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer?.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
  }
  return observer;
}

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = getObserver();
    if (!obs) return;
    obs.observe(el);
    return () => obs.unobserve(el);
  }, []);
  return ref;
}

export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  const variant = useMotionVariant();

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-motion={variant}
      className={className}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {/* En la variante "veil" el telón se aplica a un envoltorio interior,
          nunca al elemento observado: un clip-path que lo recorta a altura
          cero haría que el IntersectionObserver no lo viera nunca y el
          bloque no llegaría a aparecer jamás. */}
      {variant === "veil" ? <span className="veil-inner">{children}</span> : children}
    </Tag>
  );
}
