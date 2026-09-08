"use client";

import { createContext, useContext, type ReactNode } from "react";

/* ------------------------------------------------------------
   Los dos apartamentos comparten estética pero no movimiento.

   · "slat"  → La Abi. Las imágenes se descubren en franjas
               verticales, como las lamas del cabecero, y los
               bloques suben al entrar en pantalla.
   · "veil"  → La Abi 1. Las imágenes se descubren en bandas
               horizontales que barren de izquierda a derecha, y
               los bloques se revelan con un telón + desenfoque.

   El proveedor es un componente cliente, así que puede envolver
   secciones de servidor: los Reveal y SlatImage que cuelguen por
   debajo leen la variante sin tener que pasarla por props.
   ------------------------------------------------------------ */

export type MotionVariant = "slat" | "veil";

const MotionContext = createContext<MotionVariant>("slat");

export function MotionProvider({
  variant,
  children,
}: {
  variant: MotionVariant;
  children: ReactNode;
}) {
  return (
    <MotionContext.Provider value={variant}>{children}</MotionContext.Provider>
  );
}

export function useMotionVariant(): MotionVariant {
  return useContext(MotionContext);
}
