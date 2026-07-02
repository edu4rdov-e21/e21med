"use client";

import Image from "next/image";
import { SOCIAL_PROOF, TESTIMONIALS, PRESS } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

/**
 * Faixa de confiança. Objetivo: legitimidade nos primeiros 3 segundos após o
 * hero. Rostos reais de médicos em marquee (pessoas, não logos), nota do
 * Google e a menção de imprensa numa régua única e enxuta.
 */
export default function TrustDeckV2() {
  const { ref, className } = useFadeIn<HTMLDivElement>();
  const press = PRESS.items[0];

  return (
    <section
      id="confianca"
      className="scroll-mt-8 overflow-hidden bg-v2-bone py-14 text-v2-ink sm:py-20"
    >
      <div ref={ref} className={className}>
        <p className="v2-eyebrow px-6 text-center text-v2-stone">
          {SOCIAL_PROOF.label}
        </p>

        {/* marquee de rostos */}
        <div className="relative mt-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[8%] bg-gradient-to-r from-v2-bone to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[8%] bg-gradient-to-l from-v2-bone to-transparent"
          />
          <ul
            className="animate-scroll-x flex w-max gap-10 hover:[animation-play-state:paused] sm:gap-14"
            style={{ transform: "translateZ(0)" }}
          >
            {[0, 1].map((copy) =>
              SOCIAL_PROOF.clients.map((client) => (
                <li
                  key={`${copy}-${client.name}`}
                  aria-hidden={copy === 1}
                  className="group flex w-24 shrink-0 flex-col items-center gap-3 sm:w-32"
                >
                  <div className="relative h-20 w-20 overflow-hidden rounded-full ring-1 ring-v2-ink/15 transition-transform duration-300 group-hover:scale-105 sm:h-28 sm:w-28">
                    <Image
                      src={client.src}
                      alt={copy === 0 ? client.name : ""}
                      fill
                      sizes="(max-width: 640px) 80px, 112px"
                      className="object-cover"
                    />
                  </div>
                  <span className="text-center text-xs font-medium leading-tight text-v2-ink/80">
                    {client.name}
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* régua: Google + imprensa */}
        <div className="mx-auto mt-12 flex max-w-4xl flex-col items-center justify-center gap-4 border-t border-v2-ink/10 px-6 pt-8 text-sm text-v2-stone sm:flex-row sm:gap-10">
          <span className="flex items-center gap-2">
            <StarsInk className="h-3.5 w-auto text-v2-brass" />
            <strong className="font-semibold text-v2-ink">
              {TESTIMONIALS.stats.ratingLabel}
            </strong>
            · {TESTIMONIALS.stats.total} avaliações no Google
          </span>
          <span aria-hidden="true" className="hidden h-4 w-px bg-v2-ink/15 sm:block" />
          <a
            href={press.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 transition hover:text-v2-ink"
          >
            Na imprensa: {press.outlet}
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function StarsInk({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 16" fill="currentColor" aria-hidden="true" className={className}>
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          transform={`translate(${i * 20} 0)`}
          d="M8 .8l2.1 4.6 5 .5-3.7 3.4 1 4.9L8 11.7l-4.4 2.5 1-4.9L.9 5.9l5-.5L8 .8z"
        />
      ))}
    </svg>
  );
}
