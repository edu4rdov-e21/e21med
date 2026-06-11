"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SCENARIOS } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

/**
 * Vitrine teatral de cenários: o vídeo ativo fica no centro do palco,
 * os vizinhos espreitam atrás com escala/opacidade reduzidas, como uma
 * vitrine de loja. Sem rolagem automática: o usuário conduz (setas,
 * clique nos vizinhos, dots). Só o vídeo central toca; os demais são
 * posters. Pausa fora da viewport e respeita prefers-reduced-motion.
 */
export default function ScenarioShowcase() {
  const { ref, className } = useFadeIn<HTMLDivElement>();
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const total = SCENARIOS.items.length;

  // distância circular com sinal: -3..3 pra 7 itens
  function offsetOf(idx: number) {
    const half = Math.floor(total / 2);
    return ((idx - active + total + half) % total) - half;
  }

  function go(delta: number) {
    setActive((a) => (a + delta + total) % total);
  }

  // toca o vídeo ativo só com a seção visível e sem reduced-motion
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(v);
    return () => observer.disconnect();
  }, [active]);

  return (
    <section className="bg-navy-dark py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div
          ref={ref}
          className={`${className} text-center max-w-2xl mx-auto mb-12 sm:mb-16`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/70 mb-4">
            {SCENARIOS.label}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-cream leading-tight mb-4">
            {SCENARIOS.title}
          </h2>
          <p className="text-sm sm:text-base text-cream/70 leading-relaxed">
            {SCENARIOS.subtitle}
          </p>
        </div>

        <div
          role="region"
          aria-label="Vitrine de cenários do estúdio"
          className="relative h-[480px] sm:h-[560px] lg:h-[620px]"
        >
          {SCENARIOS.items.map((item, idx) => {
            const offset = offsetOf(idx);
            const isActive = offset === 0;
            const hidden = Math.abs(offset) > 2;

            return (
              <div
                key={item.src}
                aria-hidden={!isActive}
                className="absolute left-1/2 top-1/2 h-full aspect-[9/16] transition-all duration-500 ease-out"
                style={{
                  transform: `translate(-50%, -50%) translateX(${offset * 58}%) scale(${
                    isActive ? 1 : Math.abs(offset) === 1 ? 0.78 : 0.62
                  })`,
                  zIndex: 30 - Math.abs(offset) * 10,
                  opacity: hidden ? 0 : isActive ? 1 : Math.abs(offset) === 1 ? 0.45 : 0.18,
                  pointerEvents: hidden ? "none" : "auto",
                  filter: isActive ? "none" : "grayscale(0.8)",
                }}
              >
                {isActive ? (
                  <div className="relative w-full h-full rounded-2xl overflow-hidden ring-1 ring-cream/20 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] bg-black">
                    <video
                      ref={videoRef}
                      key={item.src}
                      autoPlay
                      muted={muted}
                      loop
                      playsInline
                      preload="auto"
                      poster={item.poster}
                      aria-label={item.label}
                      className="w-full h-full object-cover"
                    >
                      <source src={item.src} type="video/mp4" />
                    </video>
                    <button
                      type="button"
                      onClick={() => setMuted((m) => !m)}
                      aria-label={muted ? "Ativar som" : "Desativar som"}
                      aria-pressed={!muted}
                      className="absolute bottom-3 right-3 inline-flex items-center justify-center w-11 h-11 rounded-full bg-navy-dark/70 backdrop-blur-md text-cream ring-1 ring-cream/20 hover:bg-navy-dark/90 transition active:scale-90"
                    >
                      {muted ? (
                        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
                          <line x1="23" y1="9" x2="17" y2="15" />
                          <line x1="17" y1="9" x2="23" y2="15" />
                        </svg>
                      ) : (
                        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
                          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                          <path d="M19 5a9 9 0 0 1 0 14" />
                        </svg>
                      )}
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActive(idx)}
                    aria-label={`Ver ${item.label}`}
                    tabIndex={hidden ? -1 : 0}
                    className="relative block w-full h-full rounded-2xl overflow-hidden ring-1 ring-cream/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cream"
                  >
                    <Image
                      src={item.poster}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 40vw, 320px"
                      className="object-cover"
                    />
                  </button>
                )}
              </div>
            );
          })}

          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Cenário anterior"
            className="absolute left-0 sm:left-4 lg:left-16 top-1/2 -translate-y-1/2 z-40 inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-cream/10 text-cream ring-1 ring-cream/20 hover:bg-cream/20 transition active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-cream"
          >
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Próximo cenário"
            className="absolute right-0 sm:right-4 lg:right-16 top-1/2 -translate-y-1/2 z-40 inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-cream/10 text-cream ring-1 ring-cream/20 hover:bg-cream/20 transition active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-cream"
          >
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-center gap-2.5 mt-8">
          {SCENARIOS.items.map((item, idx) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setActive(idx)}
              aria-label={item.label}
              aria-current={idx === active}
              className={`h-3 rounded-full transition-all duration-300 active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-navy-dark ${
                idx === active
                  ? "w-8 bg-cream"
                  : "w-3 bg-cream/30 hover:bg-cream/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
