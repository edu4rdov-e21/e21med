"use client";

import Image from "next/image";
import { BACKSTAGE, PHOTO_DIVIDER_1, SPECIALTIES } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

/**
 * Bastidores + especialidades numa seção única e coesa: a foto vira um
 * frame de câmera gravando (REC pulsando, brackets de viewfinder,
 * legenda de set) e as especialidades entram rotuladas como fichas do
 * estúdio em marquee duplo, tudo sobre navy-dark.
 */
export default function Backstage() {
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
    <section className="bg-navy-dark py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div ref={ref} className={className}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/70 text-center mb-8 sm:mb-10">
            {BACKSTAGE.label}
          </p>

          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-xl ring-1 ring-cream/15 shadow-[0_30px_80px_-25px_rgba(0,0,0,0.6)]">
            <Image
              src={PHOTO_DIVIDER_1.src}
              alt={PHOTO_DIVIDER_1.description}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />

            {/* vinheta sutil pra legenda e cantos respirarem */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-navy-dark/70 via-transparent to-navy-dark/30"
            />

            {/* brackets de viewfinder nos 4 cantos */}
            <span aria-hidden="true" className="absolute top-3 left-3 sm:top-5 sm:left-5 w-5 h-5 sm:w-7 sm:h-7 border-t-2 border-l-2 border-cream/60 rounded-tl-sm" />
            <span aria-hidden="true" className="absolute top-3 right-3 sm:top-5 sm:right-5 w-5 h-5 sm:w-7 sm:h-7 border-t-2 border-r-2 border-cream/60 rounded-tr-sm" />
            <span aria-hidden="true" className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 w-5 h-5 sm:w-7 sm:h-7 border-b-2 border-l-2 border-cream/60 rounded-bl-sm" />
            <span aria-hidden="true" className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 w-5 h-5 sm:w-7 sm:h-7 border-b-2 border-r-2 border-cream/60 rounded-br-sm" />

            {/* badge REC gravando */}
            <div className="absolute top-5 left-5 sm:top-8 sm:left-8 inline-flex items-center gap-2 rounded-full bg-black/55 backdrop-blur-md px-3 py-1.5 ring-1 ring-cream/15">
              <span
                aria-hidden="true"
                className="w-2 h-2 rounded-full bg-red-500 animate-pulse"
              />
              <span className="text-[11px] font-semibold tracking-[0.2em] text-cream">
                REC
              </span>
            </div>

            {/* legenda de set */}
            <p className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8 right-5 sm:right-8 text-sm sm:text-base italic font-serif text-cream/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
              {BACKSTAGE.caption}
            </p>
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/60 text-center mt-14 sm:mt-16 mb-7">
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
