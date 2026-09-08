"use client";

import { useState } from "react";
import type { Apartment } from "@/lib/site";
import { Reveal } from "./Reveal";

export function Faq({ apt }: { apt: Apartment }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-bone-2 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow mb-7 flex items-center gap-3 text-ink-soft">
                <span className="inline-block h-px w-10 bg-oak-deep" />
                Dudas
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display text-[clamp(2.2rem,4.4vw,3.6rem)]">
                Antes de <em className="text-oak-deep">venir</em>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            {apt.faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={f.q} delay={i * 60}>
                  <div className="border-b border-ink/12">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start justify-between gap-6 py-6 text-left"
                    >
                      <span className="serif text-[1.12rem] leading-snug md:text-[1.25rem]">
                        {f.q}
                      </span>
                      <span
                        aria-hidden
                        className={`relative mt-2 block h-3 w-3 shrink-0 transition-transform duration-500 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      >
                        <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-ink" />
                        <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-ink" />
                      </span>
                    </button>
                    <div
                      className="grid transition-[grid-template-rows] duration-600 ease-out"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-xl pb-7 text-[0.95rem] leading-relaxed text-ink-soft">
                          {f.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
