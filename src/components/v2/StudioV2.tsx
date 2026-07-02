"use client";

import { useEffect, useRef } from "react";
import { BACKSTAGE, SPECIALTIES } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

/**
 * O estúdio, em movimento. Objetivo: tangibilizar a estrutura, provar que
 * existe um lugar físico com câmeras ligadas. O vídeo de bastidor roda num
 * frame de câmera (brackets, REC) dentro da "sala escura"; as especialidades
 * que já gravaram passam como fichas de produção.
 */
export default function StudioV2() {
  const { ref, className } = useFadeIn<HTMLDivElement>();
  const videoRef = useRef<HTMLVideoElement>(null);

  // toca só quando visível e sem reduced-motion
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const row = [...SPECIALTIES.items, ...SPECIALTIES.items];
  const rowReversed = [
    ...SPECIALTIES.items.slice(5),
    ...SPECIALTIES.items.slice(0, 5),
    ...SPECIALTIES.items.slice(5),
    ...SPECIALTIES.items.slice(0, 5),
  ];

  return (
    <section
      id="estudio"
      className="v2-grain scroll-mt-8 overflow-hidden bg-v2-ink py-16 text-v2-bone sm:py-24"
    >
      <div className="relative z-[2]">
        <div ref={ref} className={`${className} mx-auto max-w-6xl px-6 sm:px-10 lg:px-16`}>
          <p className="v2-eyebrow text-v2-brass-bright">{BACKSTAGE.label}</p>
          <h2 className="mt-4 max-w-2xl text-3xl sm:text-4xl lg:text-5xl">
            Por dentro do estúdio E21
          </h2>

          {/* frame de câmera */}
          <div className="relative mt-10 overflow-hidden rounded-xl ring-1 ring-v2-bone/15 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)]">
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="metadata"
              poster="/video/takes-poster.jpg"
              className="aspect-video w-full object-cover sm:aspect-[21/9]"
            >
              <source src="/video/takes.mp4" type="video/mp4" />
            </video>

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-v2-ink/60 via-transparent to-v2-ink/20"
            />

            {/* brackets de viewfinder */}
            <span aria-hidden="true" className="absolute left-4 top-4 h-6 w-6 rounded-tl-sm border-l-2 border-t-2 border-v2-bone/60 sm:left-6 sm:top-6 sm:h-8 sm:w-8" />
            <span aria-hidden="true" className="absolute right-4 top-4 h-6 w-6 rounded-tr-sm border-r-2 border-t-2 border-v2-bone/60 sm:right-6 sm:top-6 sm:h-8 sm:w-8" />
            <span aria-hidden="true" className="absolute bottom-4 left-4 h-6 w-6 rounded-bl-sm border-b-2 border-l-2 border-v2-bone/60 sm:bottom-6 sm:left-6 sm:h-8 sm:w-8" />
            <span aria-hidden="true" className="absolute bottom-4 right-4 h-6 w-6 rounded-br-sm border-b-2 border-r-2 border-v2-bone/60 sm:bottom-6 sm:right-6 sm:h-8 sm:w-8" />

            <div className="absolute left-6 top-6 hidden items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 ring-1 ring-v2-bone/15 backdrop-blur-md sm:inline-flex">
              <span aria-hidden="true" className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
              <span className="font-v2-mono text-[11px] tracking-[0.2em] text-v2-bone">REC</span>
            </div>

            <p className="absolute bottom-5 left-5 right-5 font-v2-display text-sm italic text-v2-bone/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)] sm:bottom-8 sm:left-8 sm:text-base">
              {BACKSTAGE.caption}
            </p>
          </div>

          <p className="v2-eyebrow mt-14 text-center text-v2-bone/50">
            {BACKSTAGE.specialtiesLabel}
          </p>
        </div>

        {/* fichas de produção em marquee duplo */}
        <div
          className="mt-7 flex flex-col gap-3"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
        >
          <ul className="animate-scroll-x-fast flex w-max gap-3">
            {row.map((s, i) => (
              <li
                key={i}
                className="shrink-0 whitespace-nowrap rounded-full border border-v2-bone/15 bg-v2-bone/5 px-4 py-1.5 text-sm text-v2-bone/75"
              >
                {s}
              </li>
            ))}
          </ul>
          <ul
            aria-hidden="true"
            className="animate-scroll-x-fast flex w-max gap-3"
            style={{ animationDirection: "reverse" }}
          >
            {rowReversed.map((s, i) => (
              <li
                key={i}
                className="shrink-0 whitespace-nowrap rounded-full border border-v2-bone/15 bg-v2-bone/5 px-4 py-1.5 text-sm text-v2-bone/75"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
