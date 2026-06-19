"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { PRESS } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

/**
 * "O E21 na mídia": prova de imprensa em formato de recorte editorial sobre
 * navy-dark. Faz a ponte entre os depoimentos (claros) e o formulário (navy),
 * fechando a régua de autoridade logo antes do CTA. PRESS.items é um array,
 * então somar novas matérias depois é só adicionar um objeto.
 */
export default function Press() {
  const { ref, visible } = useFadeIn<HTMLDivElement>();
  const item = PRESS.items[0];

  return (
    <section
      id="na-midia"
      className="bg-navy-dark py-16 sm:py-24 scroll-mt-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/70">
            {PRESS.label}
          </p>
          <p className="mt-4 text-cream/60 text-sm sm:text-base">{PRESS.intro}</p>
        </div>

        <div
          ref={ref}
          className="relative max-w-3xl mx-auto rounded-2xl ring-1 ring-cream/15 bg-cream/5 overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]"
          style={
            {
              "--stagger-step": "90ms",
              "--stagger-start": "120ms",
            } as CSSProperties
          }
        >
          {/* foto da matéria: o print que dá a credibilidade */}
          <figure
            className={visible ? "animate-stagger-in" : "opacity-0"}
            style={{ "--stagger-i": 0 } as CSSProperties}
          >
            <div className="relative aspect-[3/2] w-full">
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy-dark/55 via-transparent to-navy-dark/20"
              />
              {/* badge do veículo, prova da fonte */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/55 backdrop-blur-md px-3 py-1.5 ring-1 ring-cream/20">
                <NewspaperGlyph className="w-3.5 h-3.5 text-cream/85 shrink-0" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cream">
                  {item.outlet}
                </span>
              </div>
            </div>
            <figcaption className="px-7 sm:px-12 pt-3 text-xs italic font-serif text-cream/50">
              {item.imageCaption}
            </figcaption>
          </figure>

          {/* editorial */}
          <div className="px-7 pt-6 pb-9 sm:px-12 sm:pt-7 sm:pb-12">
            <p
              className={`text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/45 ${
                visible ? "animate-stagger-in" : "opacity-0"
              }`}
              style={{ "--stagger-i": 1 } as CSSProperties}
            >
              {item.outletKind} · {item.date}
            </p>

            {/* manchete (linka pra matéria) */}
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block mt-3 ${
                visible ? "animate-stagger-in" : "opacity-0"
              }`}
              style={{ "--stagger-i": 2 } as CSSProperties}
            >
              <h3 className="font-serif text-2xl sm:text-[2rem] leading-[1.15] text-cream transition-colors group-hover:text-white">
                {item.headline}
              </h3>
            </a>

            {/* pull-quote */}
            <p
              className={`mt-5 font-serif italic text-lg sm:text-xl leading-relaxed text-cream/80 ${
                visible ? "animate-stagger-in" : "opacity-0"
              }`}
              style={{ "--stagger-i": 3 } as CSSProperties}
            >
              {item.quote}
            </p>

            {/* CTA */}
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group mt-8 inline-flex items-center gap-2 rounded-full bg-cream text-navy font-bold px-6 py-3 text-sm transition hover:bg-white active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-navy-dark ${
                visible ? "animate-stagger-in" : "opacity-0"
              }`}
              style={{ "--stagger-i": 4 } as CSSProperties}
            >
              {item.cta}
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function NewspaperGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M4 5h13v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Z" />
      <path d="M17 8h3v11a2 2 0 0 1-2 2" />
      <path d="M7 8.5h7M7 12h7M7 15.5h4" />
    </svg>
  );
}

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}
