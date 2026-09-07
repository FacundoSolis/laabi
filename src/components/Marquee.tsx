const words = [
  "Plaza Mayor a 5 minutos",
  "Wi-Fi de fibra",
  "Check-in autónomo",
  "Aire acondicionado",
  "Ropa de cama de algodón",
  "Cocina completa",
  "Se admiten mascotas",
];

export function Marquee() {
  const line = [...words, ...words];
  return (
    <section className="overflow-hidden border-y border-ink/10 bg-ink py-6 text-bone">
      <div className="marquee">
        {line.map((w, i) => (
          <span
            key={i}
            className="flex items-center whitespace-nowrap px-8 text-[0.78rem] tracking-[0.22em] uppercase"
          >
            <span className="mr-8 inline-block h-1 w-1 rounded-full bg-oak" />
            {w}
          </span>
        ))}
      </div>
    </section>
  );
}
