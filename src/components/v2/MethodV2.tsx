"use client";

import { useState } from "react";
import { HOW_IT_WORKS } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

/**
 * O método mês a mês. Objetivo: dar clareza total do processo e reduzir a
 * incerteza de quem nunca contratou uma produtora. Navegação por marcos à
 * esquerda (desktop) ou chips (mobile); painel com o vídeo real de bastidor
 * daquela fase ao lado do que acontece nela: o processo se mostra, não se
 * descreve.
 */
export default function MethodV2() {
  const { ref, className } = useFadeIn<HTMLDivElement>();
  const [selected, setSelected] = useState(0);
  const active = HOW_IT_WORKS.milestones[selected];

  return (
    <section
      id="metodo"
      className="scroll-mt-8 border-t border-v2-ink/10 bg-v2-bone py-16 text-v2-ink sm:py-24"
    >
      <div ref={ref} className={`${className} mx-auto max-w-6xl px-6 sm:px-10 lg:px-16`}>
        <p className="v2-eyebrow text-v2-stone">O método</p>
        <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-xl text-3xl sm:text-4xl lg:text-5xl">
            {HOW_IT_WORKS.title}
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-v2-stone sm:text-base">
            {HOW_IT_WORKS.subtitle}
          </p>
        </div>

        {/* chips mobile */}
        <div className="-mx-6 mt-10 flex gap-2 overflow-x-auto px-6 pb-1 lg:hidden">
          {HOW_IT_WORKS.milestones.map((m, i) => (
            <button
              key={m.monthLabel}
              type="button"
              onClick={() => setSelected(i)}
              className={`shrink-0 rounded-full border px-4 py-2 font-v2-mono text-xs tracking-[0.14em] transition ${
                i === selected
                  ? "border-v2-brass bg-v2-brass text-v2-bone"
                  : "border-v2-ink/20 text-v2-stone"
              }`}
            >
              MÊS {m.monthLabel}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-8 lg:mt-12 lg:grid-cols-[320px_1fr] lg:gap-12">
          {/* índice desktop */}
          <ol className="hidden lg:block">
            {HOW_IT_WORKS.milestones.map((m, i) => (
              <li key={m.monthLabel}>
                <button
                  type="button"
                  onClick={() => setSelected(i)}
                  aria-current={i === selected ? "step" : undefined}
                  className={`group flex w-full items-baseline gap-4 border-l-2 py-5 pl-6 text-left transition ${
                    i === selected
                      ? "border-v2-brass"
                      : "border-v2-ink/10 hover:border-v2-ink/30"
                  }`}
                >
                  <span
                    className={`font-v2-mono text-sm tracking-[0.14em] ${
                      i === selected ? "text-v2-brass" : "text-v2-stone"
                    }`}
                  >
                    {m.monthLabel}
                  </span>
                  <span>
                    <span
                      className={`block font-v2-display text-xl transition ${
                        i === selected ? "text-v2-ink" : "text-v2-ink/60 group-hover:text-v2-ink"
                      }`}
                    >
                      {m.title}
                    </span>
                    <span className="mt-1 block text-sm leading-snug text-v2-stone">
                      {m.summary}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ol>

          {/* painel do marco selecionado */}
          <div>
            <div className="relative overflow-hidden rounded-2xl ring-1 ring-v2-ink/10">
              <video
                key={active.videoSrc}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                poster={active.videoPoster}
                className="aspect-video w-full object-cover"
              >
                <source src={active.videoSrc} type="video/mp4" />
              </video>
              <span className="absolute left-4 top-4 rounded-full bg-v2-ink/70 px-3 py-1 font-v2-mono text-[10px] uppercase tracking-[0.2em] text-v2-bone backdrop-blur-sm">
                {active.phaseLabel} · Mês {active.monthLabel}
              </span>
            </div>

            <div className="mt-7">
              <h3 className="font-v2-display text-2xl sm:text-3xl">
                {active.title}
              </h3>
              <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {active.shortItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-v2-ink/85 sm:text-base">
                    <span
                      aria-hidden="true"
                      className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-v2-brass"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-l-2 border-v2-brass pl-4 font-v2-display text-lg italic text-v2-ink/80">
                {active.closing}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
