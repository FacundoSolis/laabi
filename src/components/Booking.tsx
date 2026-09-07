"use client";

import { useMemo, useState } from "react";
import { site } from "@/lib/site";
import {
  addDays,
  formatDateLong,
  formatEuro,
  parseISO,
  quote,
  toISO,
  today,
} from "@/lib/pricing";
import { Reveal } from "./Reveal";
import { SlatImage } from "./SlatImage";

const P = site.pricing;

type Form = {
  checkIn: string;
  checkOut: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

const initial: Form = {
  checkIn: "",
  checkOut: "",
  guests: 2,
  name: "",
  email: "",
  phone: "",
  notes: "",
};

function reference(): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  const y = String(new Date().getFullYear()).slice(2);
  return `LA-${y}${n}`;
}

export function Booking() {
  const [form, setForm] = useState<Form>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [sent, setSent] = useState<{ ref: string; text: string } | null>(null);

  const minIn = toISO(today());
  const minOut = form.checkIn
    ? toISO(addDays(parseISO(form.checkIn) ?? today(), P.minNights))
    : toISO(addDays(today(), P.minNights));

  const q = useMemo(
    () => quote(form.checkIn, form.checkOut, form.guests),
    [form.checkIn, form.checkOut, form.guests],
  );

  const set = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((f) => {
      const next = { ...f, [key]: value };
      // Si la salida deja de ser válida al cambiar la entrada, se reajusta.
      if (key === "checkIn" && next.checkOut) {
        const inD = parseISO(next.checkIn);
        const outD = parseISO(next.checkOut);
        if (inD && outD && outD.getTime() - inD.getTime() < P.minNights * 86_400_000) {
          next.checkOut = toISO(addDays(inD, P.minNights));
        }
      }
      return next;
    });
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof Form, string>> = {};
    if (!form.checkIn) e.checkIn = "Indica la fecha de entrada";
    if (!form.checkOut) e.checkOut = "Indica la fecha de salida";
    if (!q) {
      if (form.checkIn && form.checkOut) e.checkOut = "La salida debe ser posterior a la entrada";
    } else if (q.nights < P.minNights) {
      e.checkOut = `La estancia mínima es de ${P.minNights} noches`;
    }
    if (!form.name.trim()) e.name = "Necesitamos tu nombre";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "Revisa el correo";
    if (form.phone.replace(/\D/g, "").length < 9) e.phone = "Revisa el teléfono";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate() || !q) return;

    const ref = reference();
    const text = [
      `Solicitud de reserva ${ref} — ${site.name}`,
      "",
      `Entrada: ${formatDateLong(form.checkIn)} (desde las ${site.checkIn})`,
      `Salida: ${formatDateLong(form.checkOut)} (hasta las ${site.checkOut})`,
      `Noches: ${q.nights}`,
      `Huéspedes: ${form.guests}`,
      `Total estimado: ${formatEuro(q.total)}`,
      "",
      `Nombre: ${form.name}`,
      `Correo: ${form.email}`,
      `Teléfono: ${form.phone}`,
      form.notes ? `Comentarios: ${form.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    setSent({ ref, text });
    requestAnimationFrame(() =>
      document.getElementById("reservar")?.scrollIntoView({ behavior: "smooth" }),
    );
  };

  const whatsappHref = sent
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(sent.text)}`
    : "#";
  const mailHref = sent
    ? `mailto:${site.email}?subject=${encodeURIComponent(
        `Solicitud de reserva ${sent.ref}`,
      )}&body=${encodeURIComponent(sent.text)}`
    : "#";

  return (
    <section id="reservar" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Encabezado + imagen */}
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow mb-7 flex items-center gap-3 text-ink-soft">
                <span className="inline-block h-px w-10 bg-oak-deep" />
                Reservar
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display text-[clamp(2.2rem,4.6vw,3.9rem)]">
                Elige tus <em className="text-oak-deep">fechas</em>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-7 text-[0.98rem] leading-relaxed text-ink-soft">
                Envíanos la solicitud y te confirmamos la disponibilidad el mismo
                día. No se cobra nada hasta que la reserva está confirmada.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-10 hidden lg:block">
                <SlatImage
                  src="/img/dormitorio-detalle.jpg"
                  alt="Detalle del dormitorio con lámpara de luz cálida"
                  className="aspect-[4/5] w-full"
                  sizes="30vw"
                />
              </div>
            </Reveal>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-8">
            <Reveal>
              <div className="border border-ink/12 bg-bone p-7 md:p-11">
                {sent ? (
                  <div style={{ animation: "fadeUp .8s cubic-bezier(.16,1,.3,1)" }}>
                    <p className="eyebrow text-oak-deep">Solicitud {sent.ref}</p>
                    <h3 className="display mt-5 text-[clamp(1.9rem,3.6vw,2.9rem)]">
                      Recibido. Ahora <em>confírmanoslo</em>
                    </h3>
                    <p className="mt-6 max-w-lg text-[0.98rem] leading-relaxed text-ink-soft">
                      Hemos preparado tu solicitud con todos los datos. Envíanosla
                      por WhatsApp o por correo con un toque y te contestamos hoy
                      mismo con la disponibilidad.
                    </p>

                    <div className="mt-9 flex flex-wrap gap-4">
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-dark"
                      >
                        Enviar por WhatsApp
                      </a>
                      <a href={mailHref} className="btn btn-ghost">
                        Enviar por correo
                      </a>
                    </div>

                    <pre className="mt-9 overflow-x-auto whitespace-pre-wrap border-t border-ink/12 pt-7 font-sans text-[0.85rem] leading-relaxed text-ink-soft">
                      {sent.text}
                    </pre>

                    <button
                      type="button"
                      onClick={() => {
                        setSent(null);
                        setForm(initial);
                      }}
                      className="link-line mt-8 text-[0.85rem] text-ink"
                    >
                      Hacer otra consulta
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submit} noValidate>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-3">
                      <Field label="Entrada" error={errors.checkIn}>
                        <input
                          type="date"
                          className="field"
                          min={minIn}
                          value={form.checkIn}
                          onChange={(e) => set("checkIn", e.target.value)}
                        />
                      </Field>
                      <Field label="Salida" error={errors.checkOut}>
                        <input
                          type="date"
                          className="field"
                          min={minOut}
                          value={form.checkOut}
                          onChange={(e) => set("checkOut", e.target.value)}
                        />
                      </Field>
                      <Field label="Huéspedes">
                        <select
                          className="field"
                          value={form.guests}
                          onChange={(e) => set("guests", Number(e.target.value))}
                        >
                          {Array.from({ length: P.maxGuests }, (_, i) => i + 1).map(
                            (n) => (
                              <option key={n} value={n}>
                                {n} {n === 1 ? "huésped" : "huéspedes"}
                              </option>
                            ),
                          )}
                        </select>
                      </Field>
                    </div>

                    {/* Desglose del precio */}
                    <div
                      className="mt-10 border-t border-ink/12 pt-7"
                      aria-live="polite"
                    >
                      {q && q.nights >= P.minNights ? (
                        <div style={{ animation: "fadeUp .6s cubic-bezier(.16,1,.3,1)" }}>
                          <Row
                            label={`${formatEuro(q.average)} × ${q.nights} ${
                              q.nights === 1 ? "noche" : "noches"
                            }`}
                            value={formatEuro(q.nightsTotal)}
                          />
                          {q.extraGuests > 0 && (
                            <Row
                              label={`Huéspedes adicionales (${
                                form.guests - (P.extraGuestFrom - 1)
                              })`}
                              value={formatEuro(q.extraGuests)}
                            />
                          )}
                          <Row label="Limpieza final" value={formatEuro(q.cleaning)} />
                          <div className="mt-4 flex items-baseline justify-between border-t border-ink/12 pt-5">
                            <span className="eyebrow">Total estimado</span>
                            <span className="display text-[2.1rem]">
                              {formatEuro(q.total)}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-[0.9rem] text-ink-soft">
                          Selecciona tus fechas y te calculamos el precio al
                          instante. Estancia mínima de {P.minNights} noches.
                        </p>
                      )}
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
                      <Field label="Nombre y apellidos" error={errors.name}>
                        <input
                          type="text"
                          autoComplete="name"
                          className="field"
                          placeholder="María García"
                          value={form.name}
                          onChange={(e) => set("name", e.target.value)}
                        />
                      </Field>
                      <Field label="Correo electrónico" error={errors.email}>
                        <input
                          type="email"
                          autoComplete="email"
                          className="field"
                          placeholder="maria@correo.com"
                          value={form.email}
                          onChange={(e) => set("email", e.target.value)}
                        />
                      </Field>
                      <Field label="Teléfono" error={errors.phone}>
                        <input
                          type="tel"
                          autoComplete="tel"
                          className="field"
                          placeholder="600 000 000"
                          value={form.phone}
                          onChange={(e) => set("phone", e.target.value)}
                        />
                      </Field>
                      <Field label="Comentarios (opcional)">
                        <input
                          type="text"
                          className="field"
                          placeholder="Llegamos en tren sobre las 22 h"
                          value={form.notes}
                          onChange={(e) => set("notes", e.target.value)}
                        />
                      </Field>
                    </div>

                    <div className="mt-11 flex flex-wrap items-center gap-6">
                      <button type="submit" className="btn btn-dark">
                        Solicitar reserva
                      </button>
                      <p className="max-w-xs text-[0.78rem] leading-relaxed text-ink-soft">
                        Sin pago online. Te respondemos con la disponibilidad y las
                        instrucciones.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="eyebrow mb-3 block text-ink-soft">{label}</span>
      {children}
      {error && (
        <span className="mt-2 block text-[0.75rem] text-oak-deep">{error}</span>
      )}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between py-2 text-[0.92rem] text-ink-soft">
      <span>{label}</span>
      <span className="text-ink">{value}</span>
    </div>
  );
}
