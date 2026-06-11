"use client";

import { useRef, useState } from "react";
import { HERO } from "@/lib/constants";

export default function HeroV2() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  function toggleVideo() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  }

  return (
    <section className="relative min-h-[88vh] flex items-end overflow-hidden">
      {/* mesmo vídeo de bastidores do hero da v1 */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/video/takes-poster.jpg"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={HERO.videoSrc} type="video/mp4" />
      </video>
      {/* overlay escuro warm (~60%) pra manter o headline legível */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(42,43,47,0.82) 0%, rgba(42,43,47,0.55) 45%, rgba(42,43,47,0.35) 100%)",
        }}
      />

      <button
        type="button"
        onClick={toggleVideo}
        aria-label={
          isPlaying
            ? "Pausar vídeo de bastidores"
            : "Reproduzir vídeo de bastidores"
        }
        className="absolute bottom-5 right-5 z-10 inline-flex items-center justify-center w-11 h-11 rounded-full bg-ink/60 text-parchment ring-1 ring-parchment/25 hover:bg-ink/80 transition active:scale-90"
      >
        {isPlaying ? (
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="currentColor"
          >
            <rect x="3" y="2" width="3" height="10" rx="0.5" />
            <rect x="8" y="2" width="3" height="10" rx="0.5" />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="currentColor"
          >
            <path d="M3 2v10l9-5L3 2z" />
          </svg>
        )}
      </button>

      <div className="relative w-full max-w-[1280px] mx-auto px-6 sm:px-10 pb-16 sm:pb-24 pt-40">
        <p className="font-v2-mono text-[11px] uppercase tracking-wide text-parchment/90 mb-5">
          {HERO.badge} · {HERO.subBadgePre.trim()}{" "}
          <a
            href={HERO.subBadgeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-parchment"
          >
            {HERO.subBadgeHandle}
          </a>
        </p>

        <h1 className="font-v2-display text-parchment text-4xl sm:text-6xl lg:text-[80px] leading-[0.95] max-w-4xl">
          {HERO.headlinePre.trimEnd()}{" "}
          <em className="font-light italic">{HERO.headlineHighlight}</em>
          {HERO.headlinePost}
        </h1>

        <p className="mt-6 text-base sm:text-lg font-light leading-relaxed text-parchment/80 max-w-xl">
          {HERO.subheadlinePre}
          <strong className="font-semibold text-parchment">
            {HERO.subheadlineStrong}
          </strong>
          {HERO.subheadlinePost}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href="#formulario-v2"
            className="inline-flex items-center justify-center rounded-[40px] bg-terracotta-seal text-parchment font-semibold text-base px-7 py-3.5 hover:opacity-90 transition active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-parchment focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            {HERO.ctaLabel}
          </a>
          <a
            href="#carta-v2"
            className="inline-flex items-center justify-center rounded-[40px] border-[1.5px] border-parchment/70 text-parchment font-semibold text-base px-7 py-3.5 hover:bg-parchment/10 transition active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-parchment focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Abrir a carta
          </a>
        </div>
      </div>
    </section>
  );
}
