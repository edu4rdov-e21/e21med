"use client";

import { useEffect, useRef } from "react";
import { STATS, BACKSTAGE } from "@/lib/constants";
import { useCountUp } from "@/hooks/useCountUp";

/**
 * Interlúdio: a câmera vira. Enquanto ela assiste, um estúdio inteiro
 * trabalha. O bastidor em tela cheia com REC quebra a quarta parede e os
 * números do ano dizem o tamanho da máquina. Objetivo: tangibilizar a
 * estrutura por trás do que a paciente vê.
 */
export default function InterludeStudio() {
  const videoRef = useRef<HTMLVideoElement>(null);

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

  return (
    <section id="estudio" className="relative scroll-mt-8 overflow-hidden bg-black">
      {/* bastidor em tela cheia */}
      <div className="relative">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          poster="/video/takes-poster.jpg"
          className="h-[62svh] w-full object-cover opacity-75 sm:h-[70svh]"
        >
          <source src="/video/takes.mp4" type="video/mp4" />
        </video>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"
        />

        <div className="absolute inset-x-0 top-0">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 pt-8 sm:px-10 lg:px-16">
            <p className="v2-eyebrow text-v2-bone/70">
              Corta pra cá · o outro lado da tela
            </p>
            <span className="inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 ring-1 ring-v2-bone/15 backdrop-blur-md">
              <span aria-hidden="true" className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
              <span className="font-v2-mono text-[11px] tracking-[0.2em] text-v2-bone">REC</span>
            </span>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 pb-10">
          <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
            <h2 className="max-w-2xl text-3xl text-v2-bone [text-shadow:0_2px_20px_rgba(0,0,0,0.7)] sm:text-4xl lg:text-5xl">
              Enquanto ela assiste,{" "}
              <em className="font-v2-display italic text-v2-brass-bright">
                um estúdio inteiro trabalha
              </em>
              .
            </h2>
            <p className="mt-3 font-v2-display text-sm italic text-v2-bone/70 sm:text-base">
              {BACKSTAGE.caption}
            </p>
          </div>
        </div>
      </div>

      {/* os números da máquina */}
      <div className="border-t border-v2-bone/10 bg-v2-ink">
        <dl className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-3 sm:gap-6 sm:px-10 sm:py-16 lg:px-16">
          {STATS.items.map((item) => (
            <MachineStat
              key={item.label}
              value={item.value}
              prefix={item.prefix}
              label={item.label}
              tag={STATS.tag}
            />
          ))}
        </dl>
      </div>
    </section>
  );
}

function MachineStat({
  value,
  prefix,
  label,
  tag,
}: {
  value: number;
  prefix: string;
  label: string;
  tag: string;
}) {
  const { ref, value: animated } = useCountUp<HTMLDivElement>(value);
  const display =
    value >= 1_000_000
      ? `${(animated / 1_000_000).toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}M`
      : animated.toLocaleString("pt-BR");

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <dd className="font-v2-display text-[clamp(2.8rem,6vw,4.4rem)] leading-none tracking-tight text-v2-brass-bright">
        {prefix}
        {display}
      </dd>
      <dt className="mt-3 font-v2-mono text-[11px] uppercase tracking-[0.28em] text-v2-bone/50">
        {label} · {tag.toLowerCase()}
      </dt>
    </div>
  );
}
