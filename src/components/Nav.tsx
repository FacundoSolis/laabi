"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { otherApartment, type Apartment } from "@/lib/site";

export function Nav({ apt }: { apt: Apartment }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  const other = otherApartment(apt);
  const isStudio = apt.slug !== "la-abi";

  const links = [
    { href: "#apartamento", label: isStudio ? "El estudio" : "El apartamento" },
    { href: "#galeria", label: "Galería" },
    { href: "#equipamiento", label: "Equipamiento" },
    { href: "#ubicacion", label: "Ubicación" },
  ];

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,box-shadow] duration-700 ${
          solid
            ? "bg-bone/85 backdrop-blur-xl shadow-[0_1px_0_rgba(36,28,22,0.08)]"
            : "bg-transparent"
        }`}
        style={{ height: "var(--nav-h)" }}
      >
        <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6 md:px-10">
          <a href="#top" aria-label={`${apt.name}, inicio`} className="shrink-0">
            <Logo
              markClassName="h-8 w-8 md:h-9 md:w-9"
              label={apt.name.toUpperCase()}
              animate
            />
          </a>

          <nav className="hidden items-center gap-9 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="link-line text-[0.8rem] tracking-[0.06em] text-ink-soft transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            ))}

            {/* Salto al otro apartamento */}
            <span aria-hidden className="h-4 w-px bg-ink/15" />
            <Link
              href={other.path}
              className="group flex items-center gap-2 text-[0.8rem] tracking-[0.06em] text-oak-deep transition-colors hover:text-ink"
            >
              <span className="link-line">{other.name}</span>
              <span
                aria-hidden
                className="inline-block transition-transform duration-500 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <a href="#reservar" className="btn btn-dark hidden sm:inline-flex !px-6 !py-3 !text-[0.7rem]">
              Reservar
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-[6px] lg:hidden"
            >
              <span
                className={`block h-px w-6 bg-ink transition-transform duration-500 ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-6 bg-ink transition-transform duration-500 ${
                  open ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil */}
      <div
        className={`fixed inset-0 z-40 bg-bone transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex h-full flex-col justify-center px-8">
          <nav className="flex flex-col gap-2">
            {[...links, { href: "#reservar", label: "Reservar" }].map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="display block py-2 text-[2.6rem] transition-[transform,opacity] duration-700"
                style={{
                  transitionDelay: open ? `${140 + i * 70}ms` : "0ms",
                  transform: open ? "none" : "translateY(22px)",
                  opacity: open ? 1 : 0,
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Salto al otro apartamento */}
          <div
            className="mt-12 border-t border-ink/12 pt-8 transition-[transform,opacity] duration-700"
            style={{
              transitionDelay: open ? "520ms" : "0ms",
              transform: open ? "none" : "translateY(22px)",
              opacity: open ? 1 : 0,
            }}
          >
            <p className="eyebrow mb-4 text-ink-soft">El otro apartamento</p>
            <Link
              href={other.path}
              onClick={() => setOpen(false)}
              className="serif flex items-baseline gap-3 text-[1.6rem] text-oak-deep"
            >
              {other.name}
              <span aria-hidden>→</span>
            </Link>
            <p className="mt-2 text-[0.85rem] text-ink-soft">{other.tagline}</p>
          </div>
        </div>
      </div>
    </>
  );
}
