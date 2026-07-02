"use client";

import type { CSSProperties } from "react";
import { LETTER } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

/**
 * Interlúdio editorial com o coração da carta aberta. Objetivo: conexão
 * emocional com a dor do médico antes de apresentar o método. Tipografia
 * serif em escala de manchete, sem imagem nenhuma: a palavra é a cena.
 */
export default function ManifestoV2() {
  const { ref, visible } = useFadeIn<HTMLDivElement>();

  return (
    <section className="bg-v2-bone py-20 text-v2-ink sm:py-28">
      <div
        ref={ref}
        className="mx-auto max-w-3xl px-6 sm:px-10"
        style={{ "--stagger-step": "120ms" } as CSSProperties}
      >
        <p
          className={`v2-eyebrow text-v2-stone ${visible ? "animate-stagger-in" : "opacity-0"}`}
          style={{ "--stagger-i": 0 } as CSSProperties}
        >
          {LETTER.title}
        </p>

        <blockquote
          className={`mt-8 font-v2-display text-[clamp(1.7rem,4vw,2.8rem)] leading-[1.25] ${
            visible ? "animate-stagger-in" : "opacity-0"
          }`}
          style={{ "--stagger-i": 1 } as CSSProperties}
        >
          Você merece atender pacientes que chegam até você{" "}
          <em className="italic text-v2-brass">sabendo o seu valor</em>, e não
          brigando por preço.
        </blockquote>

        <p
          className={`mt-8 max-w-xl text-base leading-relaxed text-v2-stone sm:text-lg ${
            visible ? "animate-stagger-in" : "opacity-0"
          }`}
          style={{ "--stagger-i": 2 } as CSSProperties}
        >
          Acreditamos no trabalho sério, bem feito e consistente. Foi isso que
          te trouxe até aqui, não acredite que algo diferente vai te levar
          adiante. O compromisso do E21 é construir essa audiência para você.
        </p>

        <div
          className={`mt-10 flex items-center gap-4 ${visible ? "animate-stagger-in" : "opacity-0"}`}
          style={{ "--stagger-i": 3 } as CSSProperties}
        >
          <span aria-hidden="true" className="h-px w-12 bg-v2-brass" />
          <p className="text-sm text-v2-stone">
            <span className="font-v2-display text-lg italic text-v2-ink">
              {LETTER.signatureName}
            </span>
            {" · "}
            {LETTER.signatureRole}
          </p>
        </div>
      </div>
    </section>
  );
}
