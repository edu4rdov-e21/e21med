"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { HERO, TESTIMONIALS } from "@/lib/constants";

/**
 * Hero "cinema institucional". Objetivo: impacto imediato + posicionamento.
 * O vídeo do estúdio ocupa a tela inteira como um frame de filme em exibição;
 * a tipografia serif gigante assina o posicionamento; o timecode correndo no
 * rodapé é o toque de set de filmagem que diz "aqui se produz de verdade".
 */
export default function HeroV2() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);

  // vídeo de fundo: só toca sem reduced-motion; pausa fora da viewport
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
      { threshold: 0.05 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  // timecode de câmera (24fps) escrito direto no DOM: zero re-render
  useEffect(() => {
    const node = tcRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = performance.now();
    const pad = (n: number) => String(n).padStart(2, "0");
    const id = window.setInterval(() => {
      const el = performance.now() - start;
      const s = Math.floor(el / 1000);
      const f = Math.floor(((el % 1000) / 1000) * 24);
      node.textContent = `${pad(Math.floor(s / 3600))}:${pad(
        Math.floor(s / 60) % 60
      )}:${pad(s % 60)}:${pad(f)}`;
    }, 42);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="hero-v2"
      className="v2-grain relative flex min-h-svh flex-col overflow-hidden bg-v2-ink"
    >
      {/* fundo: vídeo no desktop, still no mobile */}
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src="/video/takes-poster.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40 lg:hidden"
        />
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          poster="/video/takes-poster.jpg"
          className="hidden h-full w-full object-cover opacity-40 lg:block"
        >
          <source src="/video/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* vinheta pra tipografia respirar */}
        <div className="absolute inset-0 bg-gradient-to-b from-v2-ink/70 via-v2-ink/30 to-v2-ink" />
      </div>

      {/* barra superior */}
      <header className="relative z-10 flex items-center justify-between px-6 pt-6 sm:px-10 lg:px-16">
        <div className="flex items-baseline gap-2">
          <span className="font-v2-display text-2xl tracking-tight">E21</span>
          <span className="v2-eyebrow text-v2-bone/60">MED</span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href={HERO.subBadgeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="v2-eyebrow hidden text-v2-bone/50 transition hover:text-v2-bone sm:block"
          >
            {HERO.subBadgeHandle}
          </a>
          <a
            href="#contato"
            className="rounded-full border border-v2-bone/30 px-5 py-2 text-sm font-medium transition hover:border-v2-bone hover:bg-v2-bone hover:text-v2-ink"
          >
            {HERO.ctaLabel}
          </a>
        </div>
      </header>

      {/* conteúdo central */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-20 sm:px-10 lg:px-16">
        <p className="v2-eyebrow animate-stagger-in text-v2-brass-bright" style={{ "--stagger-i": 0 } as React.CSSProperties}>
          Produtora de autoridade digital para médicos
        </p>
        <h1
          className="animate-stagger-in mt-6 max-w-4xl text-[clamp(2.3rem,6vw,4.6rem)] leading-[1.04]"
          style={{ "--stagger-i": 1 } as React.CSSProperties}
        >
          {HERO.headlinePre}
          <em className="font-v2-display italic text-v2-brass-bright">
            {HERO.headlineHighlight}
          </em>
          {HERO.headlinePost}
        </h1>
        <p
          className="animate-stagger-in mt-7 max-w-xl text-base leading-relaxed text-v2-bone/75 sm:text-lg"
          style={{ "--stagger-i": 2 } as React.CSSProperties}
        >
          {HERO.subheadlinePre}
          <strong className="font-semibold text-v2-bone">
            {HERO.subheadlineStrong}
          </strong>
          {HERO.subheadlinePost}
        </p>
        <div
          className="animate-stagger-in mt-10 flex flex-wrap items-center gap-4"
          style={{ "--stagger-i": 3 } as React.CSSProperties}
        >
          <a
            href="#contato"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-v2-brass-bright px-8 py-3.5 text-base font-semibold text-v2-ink transition hover:brightness-110 active:scale-[0.97]"
          >
            {HERO.ctaLabel}
          </a>
          <a
            href="#metodo"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-v2-bone/30 px-8 py-3.5 text-base font-medium text-v2-bone transition hover:border-v2-bone/70 active:scale-[0.97]"
          >
            Conhecer o método
          </a>
        </div>
        <div
          className="animate-stagger-in mt-9 flex items-center gap-2.5 text-sm text-v2-bone/70"
          style={{ "--stagger-i": 4 } as React.CSSProperties}
        >
          <GoogleG className="h-4 w-4 shrink-0" />
          <Stars className="h-3.5 w-auto text-v2-brass-bright" />
          <span>
            <strong className="font-semibold text-v2-bone">
              {TESTIMONIALS.stats.ratingLabel}
            </strong>{" "}
            · {TESTIMONIALS.stats.total} avaliações no Google
          </span>
        </div>
      </div>

      {/* régua inferior de set */}
      <div className="relative z-10 border-t border-v2-bone/15">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 font-v2-mono text-[11px] uppercase tracking-[0.2em] text-v2-bone/50 sm:px-10 lg:px-16">
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
            REC <span ref={tcRef}>00:00:00:00</span>
          </span>
          <span className="hidden sm:block">Estúdio próprio · Brasília</span>
          <a href="#confianca" className="transition hover:text-v2-bone">
            Explorar ↓
          </a>
        </div>
      </div>
    </section>
  );
}

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.26-2.09 3.57-5.16 3.57-8.81Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.93-2.92l-3.87-3c-1.07.72-2.44 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.95H1.29v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.29 14.28a7.2 7.2 0 0 1 0-4.56v-3.1H1.29a12 12 0 0 0 0 10.76l4-3.1Z" />
      <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.6 4.58 1.79l3.44-3.44A11.98 11.98 0 0 0 1.29 6.62l4 3.1C6.23 6.88 8.88 4.77 12 4.77Z" />
    </svg>
  );
}

function Stars({ className }: { className?: string }) {
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
