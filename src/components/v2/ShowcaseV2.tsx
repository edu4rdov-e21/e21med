"use client";

import { useRef, useState } from "react";
import { SCENARIOS } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

/**
 * Vitrine de cenários. Objetivo: mostrar a qualidade do produto final que
 * sai do estúdio. Fila de vídeos verticais (o formato real que o médico
 * publica) numa esteira horizontal; aperta o play e o vídeo roda ali,
 * um por vez, como monitores numa sala de edição.
 */
export default function ShowcaseV2() {
  const { ref, className } = useFadeIn<HTMLDivElement>();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef(new Map<number, HTMLVideoElement>());
  const [playing, setPlaying] = useState<number | null>(null);

  function toggle(i: number) {
    const map = videoRefs.current;
    const target = map.get(i);
    if (!target) return;
    if (playing === i) {
      target.pause();
      setPlaying(null);
      return;
    }
    if (playing !== null) map.get(playing)?.pause();
    target.play().catch(() => {});
    setPlaying(i);
  }

  function scrollByCards(dir: 1 | -1) {
    scrollerRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  }

  return (
    <section
      id="cenarios"
      className="v2-grain scroll-mt-8 overflow-hidden border-t border-v2-bone/10 bg-v2-ink py-16 text-v2-bone sm:py-24"
    >
      <div className="relative z-[2]">
        <div ref={ref} className={`${className} mx-auto max-w-6xl px-6 sm:px-10 lg:px-16`}>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="v2-eyebrow text-v2-brass-bright">{SCENARIOS.label}</p>
              <h2 className="mt-4 max-w-xl text-3xl sm:text-4xl lg:text-5xl">
                {SCENARIOS.title}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-v2-bone/65 sm:text-base">
                {SCENARIOS.subtitle}
              </p>
            </div>
            <div className="hidden shrink-0 gap-2 lg:flex">
              <button
                type="button"
                onClick={() => scrollByCards(-1)}
                aria-label="Cenários anteriores"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-v2-bone/25 transition hover:border-v2-bone/60 active:scale-95"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scrollByCards(1)}
                aria-label="Próximos cenários"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-v2-bone/25 transition hover:border-v2-bone/60 active:scale-95"
              >
                →
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 sm:px-10 lg:px-16 [scrollbar-width:thin]"
        >
          {SCENARIOS.items.map((item, i) => (
            <figure key={item.src} className="w-[220px] shrink-0 snap-start sm:w-[250px]">
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-label={
                  playing === i ? `Pausar ${item.label}` : `Assistir ${item.label}`
                }
                className="group relative block aspect-[9/16] w-full overflow-hidden rounded-xl ring-1 ring-v2-bone/15 transition hover:ring-v2-bone/40"
              >
                <video
                  ref={(el) => {
                    if (el) videoRefs.current.set(i, el);
                    else videoRefs.current.delete(i);
                  }}
                  muted
                  loop
                  playsInline
                  preload="none"
                  poster={item.poster}
                  className="absolute inset-0 h-full w-full object-cover"
                >
                  <source src={item.src} type="video/mp4" />
                </video>
                {playing !== i && (
                  <>
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-v2-ink/50 to-transparent"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-v2-bone/90 text-v2-ink shadow-lg transition group-hover:scale-105"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-5 w-5">
                        <path d="M8 5.5v13l11-6.5L8 5.5Z" />
                      </svg>
                    </span>
                  </>
                )}
              </button>
              <figcaption className="mt-3 flex items-center justify-between font-v2-mono text-[10px] uppercase tracking-[0.2em] text-v2-bone/50">
                {item.label}
                {playing === i && <span className="text-v2-brass-bright">● em exibição</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
