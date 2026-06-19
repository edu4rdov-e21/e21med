"use client";

import { BACKSTAGE, SPECIALTIES } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

/**
 * Especialidades que já gravaram no estúdio, rotuladas como fichas em
 * marquee duplo (sentidos opostos) sobre navy-dark. Saiu do componente
 * Backstage pra ficar logo abaixo da seção "O E21 na mídia".
 */
export default function Specialties() {
  const { ref, className } = useFadeIn<HTMLDivElement>();
  const row = [...SPECIALTIES.items, ...SPECIALTIES.items];
  // segunda linha começa em outro ponto da lista pra não espelhar a primeira
  const rowReversed = [
    ...SPECIALTIES.items.slice(5),
    ...SPECIALTIES.items.slice(0, 5),
    ...SPECIALTIES.items.slice(5),
    ...SPECIALTIES.items.slice(0, 5),
  ];

  return (
    <section className="bg-navy-dark pt-4 pb-16 sm:pt-6 sm:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div ref={ref} className={className}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/60 text-center mb-7">
            {BACKSTAGE.specialtiesLabel}
          </p>
        </div>
      </div>

      <div
        className="relative flex flex-col gap-3 sm:gap-4"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        }}
      >
        <ul className="flex gap-3 sm:gap-4 w-max animate-scroll-x-fast">
          {row.map((s, i) => (
            <li
              key={i}
              className="shrink-0 rounded-full border border-cream/15 bg-cream/5 px-4 py-1.5 text-sm text-cream/80 whitespace-nowrap"
            >
              {s}
            </li>
          ))}
        </ul>
        <ul
          aria-hidden="true"
          className="flex gap-3 sm:gap-4 w-max animate-scroll-x-fast"
          style={{ animationDirection: "reverse" }}
        >
          {rowReversed.map((s, i) => (
            <li
              key={i}
              className="shrink-0 rounded-full border border-cream/15 bg-cream/5 px-4 py-1.5 text-sm text-cream/80 whitespace-nowrap"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
