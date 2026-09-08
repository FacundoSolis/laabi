"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/* ------------------------------------------------------------
   Enlace de un apartamento al otro.

   Por defecto <Link> conserva la posición del scroll mientras la
   página nueva siga siendo visible en el viewport. Como las dos
   páginas miden casi lo mismo, pulsar desde el pie te dejaba en el
   pie de la otra.

   Se sube arriba en el propio clic, no al montar la página: antes de
   que el navegador hidrate, el clic es una navegación normal y el
   navegador ya aterriza arriba solo; después, lo hacemos aquí. Así no
   depende de cuánto tarde en cargar, y la flecha «atrás» del
   navegador sigue devolviéndote donde estabas.

   "instant" salta en seco: el html lleva scroll-behavior: smooth para
   los enlaces internos, y sin esto el salto sería una animación de
   varios miles de píxeles.
   ------------------------------------------------------------ */

export function ApartmentLink({
  href,
  className = "",
  children,
  onNavigate,
  ...rest
}: {
  href: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
} & Omit<React.ComponentProps<typeof Link>, "href" | "onClick" | "scroll">) {
  return (
    <Link
      {...rest}
      href={href}
      scroll={false}
      onClick={() => {
        onNavigate?.();
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }}
      className={className}
    >
      {children}
    </Link>
  );
}
