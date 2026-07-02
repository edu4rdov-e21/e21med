"use client";

import { useRef, useState } from "react";
import { SCENARIOS } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

/**
 * Ato 1: a descoberta. Ela para de rolar quando um vídeo não parece com os
 * outros. Os 7 cenários do estúdio aparecem como o que realmente são na vida
 * dela: reels verticais passando na tela. Toca um por vez, como no feed.
 * Objetivo: provar a qualidade do produto no formato nativo dele.
 */
export default function ActDiscover() {
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

  return (
    <section
      id="ato-1"
      className="scroll-mt-8 overflow-hidden border-t border-v2-bone/10 bg-v2-ink py-16 sm:py-24"
    >
      <div ref={ref} className={className}>
        <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
          <p className="v2-eyebrow text-v2-brass-bright">Ato 01 · A descoberta</p>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-2xl text-3xl sm:text-4xl lg:text-5xl">
              Entre mil vídeos iguais,{" "}
              <em className="font-v2-display italic text-v2-brass-bright">
                ela para no seu
              </em>
              .
            </h2>
            <div className="hidden shrink-0 gap-2 lg:flex">
              <button
                type="button"
                onClick={() => scrollerRef.current?.scrollBy({ left: -280, behavior: "smooth" })}
                aria-label="Reels anteriores"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-v2-bone/25 transition hover:border-v2-bone/60 active:scale-95"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scrollerRef.current?.scrollBy({ left: 280, behavior: "smooth" })}
                aria-label="Próximos reels"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-v2-bone/25 transition hover:border-v2-bone/60 active:scale-95"
              >
                →
              </button>
            </div>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-v2-bone/60 sm:text-base">
            {SCENARIOS.subtitle}
          </p>
        </div>

        {/* o feed dela */}
        <div
          ref={scrollerRef}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 sm:px-10 lg:px-16 [scrollbar-width:thin]"
        >
          {SCENARIOS.items.map((item, i) => (
            <figure key={item.src} className="w-[200px] shrink-0 snap-start sm:w-[230px]">
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-label={playing === i ? `Pausar ${item.label}` : `Assistir ${item.label}`}
                className={`group relative block w-full overflow-hidden rounded-[1.7rem] border bg-black p-1.5 transition ${
                  playing === i
                    ? "border-v2-brass-bright shadow-[0_0_60px_-12px_rgba(201,167,107,0.35)]"
                    : "border-v2-bone/15 hover:border-v2-bone/40"
                }`}
              >
                <span className="relative block aspect-[9/17] overflow-hidden rounded-[1.35rem]">
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
                        className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-v2-bone/90 text-v2-ink transition group-hover:scale-105"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-4 w-4">
                          <path d="M8 5.5v13l11-6.5L8 5.5Z" />
                        </svg>
                      </span>
                    </>
                  )}
                </span>
              </button>
              <figcaption className="mt-3 flex items-center justify-between px-1 font-v2-mono text-[10px] uppercase tracking-[0.18em] text-v2-bone/45">
                {item.label}
                {playing === i && <span className="text-v2-brass-bright">● no feed dela</span>}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-6xl px-6 font-v2-display text-lg italic text-v2-bone/55 sm:px-10 lg:px-16">
          Mesmo estúdio, sete cenários. Ela nunca percebe que é o mesmo lugar.
        </p>
      </div>
    </section>
  );
}
