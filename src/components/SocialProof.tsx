"use client";

import Image from "next/image";
import { SOCIAL_PROOF } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

/**
 * Prova social leve: retratos circulares flutuando direto no cream,
 * deslizando contínuo (pausa no hover). Sem container pesado — a seção
 * é um momento de passagem entre o hero e os números.
 */
export default function SocialProof() {
  const { ref, className } = useFadeIn<HTMLDivElement>();

  return (
    <section className="bg-cream py-8 sm:py-12 overflow-hidden">
      <div ref={ref} className={className}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-10 sm:mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] text-navy/70 uppercase text-center">
            {SOCIAL_PROOF.label}
          </p>
        </div>

        <div className="relative">
          {/* fades estáticos nas bordas (sem mask sobre o track animado) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-[6%] z-10 bg-gradient-to-r from-cream to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-[6%] z-10 bg-gradient-to-l from-cream to-transparent"
          />

          <ul
            className="flex gap-8 sm:gap-12 lg:gap-16 w-max animate-scroll-x hover:[animation-play-state:paused]"
            style={{ transform: "translateZ(0)" }}
          >
            {[0, 1].map((copy) =>
              SOCIAL_PROOF.clients.map((client) => (
                <li
                  key={`${copy}-${client.name}`}
                  aria-hidden={copy === 1}
                  className="group flex flex-col items-center gap-3 sm:gap-4 w-28 sm:w-36 lg:w-40 shrink-0"
                >
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden ring-2 ring-white shadow-[0_12px_30px_-12px_rgba(26,54,93,0.35)] bg-photo-placeholder transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={client.src}
                      alt={copy === 0 ? client.name : ""}
                      fill
                      sizes="(max-width: 640px) 96px, (max-width: 1024px) 128px, 144px"
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xs sm:text-sm text-navy font-semibold text-center leading-tight">
                    {client.name}
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
