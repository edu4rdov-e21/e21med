"use client";

import Image from "next/image";
import { SOCIAL_PROOF } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

/** Fileira de furos de película — cada célula carrega os seus, então a
    perfuração desliza junto com o filme, como num rolo de verdade. */
function FilmHoles() {
  return (
    <div aria-hidden="true" className="flex justify-around items-center py-2">
      {Array.from({ length: 4 }, (_, i) => (
        <span key={i} className="w-4 h-2.5 rounded-[3px] bg-cream/20" />
      ))}
    </div>
  );
}

/**
 * Prova social como rolo de filme 35mm: cada cliente é um frame do
 * negativo, com perfuração de película e numeração de frame em âmbar
 * (como as marcações de filme fotográfico). O rolo desliza contínuo,
 * pausa no hover e os frames colorem. Fecha a família visual de
 * produtora da página (REC dos bastidores, álbum da equipe, vitrine).
 */
export default function SocialProof() {
  const { ref, className } = useFadeIn<HTMLDivElement>();

  return (
    <section className="bg-cream py-8 sm:py-12 overflow-hidden">
      <div ref={ref} className={className}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-8 sm:mb-10">
          <p className="text-xs font-semibold tracking-[0.2em] text-navy/70 uppercase text-center">
            {SOCIAL_PROOF.label}
          </p>
        </div>

        <div className="relative">
          {/* fades estáticos nas bordas (sem mask sobre o track animado) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-[8%] z-10 bg-gradient-to-r from-cream to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-[8%] z-10 bg-gradient-to-l from-cream to-transparent"
          />

          <div className="bg-navy-dark shadow-[0_18px_50px_-20px_rgba(15,36,64,0.55)]">
            <ul
              className="flex w-max animate-scroll-x hover:[animation-play-state:paused]"
              style={{ transform: "translateZ(0)" }}
            >
              {[0, 1].map((copy) =>
                SOCIAL_PROOF.clients.map((client, idx) => (
                  <li
                    key={`${copy}-${client.name}`}
                    aria-hidden={copy === 1}
                    className="group w-36 sm:w-44 shrink-0 border-r border-cream/10"
                  >
                    <FilmHoles />
                    <div className="px-2">
                      <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-photo-placeholder">
                        <Image
                          src={client.src}
                          alt={copy === 0 ? client.name : ""}
                          fill
                          sizes="(max-width: 640px) 144px, 176px"
                          className="object-cover grayscale-[0.45] group-hover:grayscale-0 transition duration-500"
                        />
                      </div>
                      <div className="flex items-baseline justify-between gap-2 pt-1.5 pb-0.5">
                        <span className="text-[10px] sm:text-[11px] text-cream/80 font-semibold leading-tight truncate">
                          {client.name}
                        </span>
                        <span
                          aria-hidden="true"
                          className="text-[10px] font-semibold tracking-[0.12em] text-amber-300/90 shrink-0"
                        >
                          {String(idx + 1).padStart(2, "0")}A
                        </span>
                      </div>
                    </div>
                    <FilmHoles />
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
