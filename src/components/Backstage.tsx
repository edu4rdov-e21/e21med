"use client";

import Image from "next/image";
import { BACKSTAGE, PHOTO_DIVIDER_1 } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

/**
 * Bastidores: a foto vira um frame de câmera gravando (REC pulsando,
 * brackets de viewfinder, legenda de set) sobre navy-dark. As especialidades
 * saíram daqui pro componente Specialties (ficaram mais acima na página).
 */
export default function Backstage() {
  const { ref, className } = useFadeIn<HTMLDivElement>();

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
        </div>
      </div>
    </section>
  );
}
