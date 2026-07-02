"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import { HERO, SCENARIOS } from "@/lib/constants";
import PhoneFrame from "./PhoneFrame";

/**
 * Abertura. A página não se apresenta: ela começa uma história. Teatro
 * escuro, uma narração curta e a tela dela acendendo com um reel de verdade
 * gravado no estúdio. A tese do E21 entra como a moral da cena, não como
 * slogan. Objetivo: prender em 5 segundos e estabelecer o ponto de vista
 * (você está assistindo a sua futura paciente).
 */
export default function SceneOpening() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.2 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <section id="hero-v2" className="v2-grain relative overflow-hidden bg-v2-ink">
      {/* luz da tela vazando no teatro */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,rgba(201,167,107,0.10),transparent_55%)]"
      />

      {/* barra superior */}
      <header className="relative z-10 flex items-center justify-between px-6 pt-6 sm:px-10 lg:px-16">
        <div className="flex items-baseline gap-2">
          <span className="font-v2-display text-2xl tracking-tight">E21</span>
          <span className="v2-eyebrow text-v2-bone/60">MED</span>
        </div>
        <a
          href="#contato"
          className="rounded-full border border-v2-bone/30 px-5 py-2 text-sm font-medium transition hover:border-v2-bone hover:bg-v2-bone hover:text-v2-ink"
        >
          {HERO.ctaLabel}
        </a>
      </header>

      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-72px)] max-w-6xl items-center gap-12 px-6 py-14 sm:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:px-16">
        {/* narração + tese */}
        <div className="order-2 lg:order-1">
          <p
            className="v2-eyebrow animate-stagger-in text-v2-bone/45"
            style={{ "--stagger-i": 0 } as CSSProperties}
          >
            22h47 · em algum lugar do Brasil
          </p>
          <p
            className="animate-stagger-in mt-5 font-v2-display text-2xl italic text-v2-bone/85 sm:text-3xl"
            style={{ "--stagger-i": 1 } as CSSProperties}
          >
            Uma paciente rola o feed.
          </p>
          <h1
            className="animate-stagger-in mt-7 max-w-2xl text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.08]"
            style={{ "--stagger-i": 2 } as CSSProperties}
          >
            {HERO.headlinePre}
            <em className="font-v2-display italic text-v2-brass-bright">
              {HERO.headlineHighlight}
            </em>
            {HERO.headlinePost}
          </h1>
          <p
            className="animate-stagger-in mt-6 max-w-lg text-base leading-relaxed text-v2-bone/70 sm:text-lg"
            style={{ "--stagger-i": 3 } as CSSProperties}
          >
            Esta página conta a história dela. Porque é na tela dela que a sua
            autoridade nasce, e é o E21 que produz o que ela vê.
          </p>
          <div
            className="animate-stagger-in mt-9 flex flex-wrap items-center gap-4"
            style={{ "--stagger-i": 4 } as CSSProperties}
          >
            <a
              href="#ato-1"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-v2-brass-bright px-8 py-3.5 text-base font-semibold text-v2-ink transition hover:brightness-110 active:scale-[0.97]"
            >
              Assistir à história dela
            </a>
            <a
              href="#contato"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-v2-bone/30 px-8 py-3.5 text-base font-medium transition hover:border-v2-bone/70 active:scale-[0.97]"
            >
              {HERO.ctaLabel}
            </a>
          </div>
        </div>

        {/* a tela dela */}
        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <PhoneFrame className="w-56 sm:w-64 lg:w-72">
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              poster={SCENARIOS.items[0].poster}
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src={SCENARIOS.items[0].src} type="video/mp4" />
            </video>
            {/* cromo mínimo de reel */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-4 left-4 font-v2-mono text-[10px] uppercase tracking-[0.18em] text-white/80"
            >
              ▶ reels
            </span>
          </PhoneFrame>
        </div>
      </div>

      {/* régua de cena */}
      <div className="relative z-10 border-t border-v2-bone/15">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 font-v2-mono text-[11px] uppercase tracking-[0.2em] text-v2-bone/45 sm:px-10 lg:px-16">
          <span>Cena 01 · A tela dela</span>
          <a href="#ato-1" className="transition hover:text-v2-bone">
            Ato 1 ↓
          </a>
        </div>
      </div>
    </section>
  );
}
