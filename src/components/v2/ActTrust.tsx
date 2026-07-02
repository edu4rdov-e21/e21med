"use client";

import { useState } from "react";
import { HOW_IT_WORKS } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

/**
 * Ato 2: a confiança. Um vídeo não muda nada; presença diária muda tudo.
 * O método dos 6 meses aparece como a programação que cai na tela dela,
 * mês a mês, com o bastidor real de cada fase rodando ao lado. Objetivo:
 * clareza do processo contada de dentro da história, não como tabela.
 */
export default function ActTrust() {
  const { ref, className } = useFadeIn<HTMLDivElement>();
  const [selected, setSelected] = useState(0);
  const active = HOW_IT_WORKS.milestones[selected];

  return (
    <section
      id="ato-2"
      className="scroll-mt-8 border-t border-v2-bone/10 bg-v2-ink py-16 sm:py-24"
    >
      <div ref={ref} className={`${className} mx-auto max-w-6xl px-6 sm:px-10 lg:px-16`}>
        <p className="v2-eyebrow text-v2-brass-bright">Ato 02 · A confiança</p>
        <h2 className="mt-4 max-w-2xl text-3xl sm:text-4xl lg:text-5xl">
          Um vídeo não muda nada.{" "}
          <em className="font-v2-display italic text-v2-brass-bright">
            Presença diária muda tudo.
          </em>
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-v2-bone/60 sm:text-base">
          {HOW_IT_WORKS.subtitle} É isso que ela recebe, sem você parar a
          agenda: o E21 produz, ela acompanha.
        </p>

        {/* a programação, mês a mês */}
        <div className="mt-10 flex gap-2 overflow-x-auto pb-1">
          {HOW_IT_WORKS.milestones.map((m, i) => (
            <button
              key={m.monthLabel}
              type="button"
              onClick={() => setSelected(i)}
              aria-current={i === selected ? "step" : undefined}
              className={`shrink-0 rounded-full border px-4 py-2 font-v2-mono text-xs tracking-[0.14em] transition ${
                i === selected
                  ? "border-v2-brass-bright bg-v2-brass-bright text-v2-ink"
                  : "border-v2-bone/20 text-v2-bone/55 hover:border-v2-bone/45"
              }`}
            >
              MÊS {m.monthLabel}
            </button>
          ))}
        </div>

        <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          <div className="relative overflow-hidden rounded-2xl ring-1 ring-v2-bone/15">
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
            <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 font-v2-mono text-[10px] uppercase tracking-[0.2em] text-v2-bone backdrop-blur-sm">
              bastidor real · {active.phaseLabel}
            </span>
          </div>

          <div>
            <h3 className="font-v2-display text-2xl sm:text-3xl">{active.title}</h3>
            <p className="mt-2 text-sm text-v2-bone/60 sm:text-base">{active.summary}</p>
            <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {active.shortItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-v2-bone/80 sm:text-base">
                  <span
                    aria-hidden="true"
                    className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-v2-brass-bright"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-l-2 border-v2-brass-bright pl-4 font-v2-display text-lg italic text-v2-bone/75">
              {active.closing}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
