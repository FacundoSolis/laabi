import type { Apartment } from "@/lib/site";

export function Marquee({
  apt,
  reverse = false,
}: {
  apt: Apartment;
  reverse?: boolean;
}) {
  const line = [...apt.marquee, ...apt.marquee];
  return (
    <section className="overflow-hidden border-y border-ink/10 bg-ink py-6 text-bone">
      <div className={`marquee ${reverse ? "marquee-reverse" : ""}`}>
        {line.map((w, i) => (
          <span
            key={i}
            className="flex items-center whitespace-nowrap px-8 text-[0.78rem] tracking-[0.22em] uppercase"
          >
            <span
              className={`mr-8 inline-block bg-oak ${
                reverse ? "h-px w-5" : "h-1 w-1 rounded-full"
              }`}
            />
            {w}
          </span>
        ))}
      </div>
    </section>
  );
}
