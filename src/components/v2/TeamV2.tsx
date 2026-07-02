"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { TEAM } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

/**
 * A equipe. Objetivo: gerar confiança mostrando quem cuida do projeto. Os
 * retratos de estúdio são o destaque absoluto: grandes, em galeria, com
 * nameplate editorial embaixo (nada por cima da foto). Fecha com o retrato
 * do time completo, como a página de elenco de uma produção.
 */
export default function TeamV2() {
  const { ref, visible } = useFadeIn<HTMLDivElement>();

  return (
    <section
      id="equipe"
      className="scroll-mt-8 border-t border-v2-ink/10 bg-v2-bone py-16 text-v2-ink sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        <p className="v2-eyebrow text-v2-stone">A equipe</p>
        <h2 className="mt-4 max-w-2xl text-3xl sm:text-4xl lg:text-5xl">
          {TEAM.title}
        </h2>

        <div
          ref={ref}
          className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3 lg:gap-x-8"
          style={{ "--stagger-step": "80ms" } as CSSProperties}
        >
          {TEAM.members.map((member, i) => (
            <figure
              key={member.name}
              className={visible ? "animate-stagger-in" : "opacity-0"}
              style={{ "--stagger-i": i } as CSSProperties}
            >
              <div className="group relative aspect-[3/4] overflow-hidden rounded-xl ring-1 ring-v2-ink/10">
                <Image
                  src={member.src}
                  alt={`${member.name}, ${member.role}`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute left-3 top-3 font-v2-mono text-[10px] tracking-[0.2em] text-white/80 [text-shadow:0_1px_6px_rgba(0,0,0,0.6)]">
                  {String(i + 1).padStart(2, "0")} / {String(TEAM.members.length).padStart(2, "0")}
                </span>
              </div>
              <figcaption className="mt-3 border-b border-v2-ink/10 pb-3">
                <p className="font-v2-display text-lg sm:text-xl">{member.name}</p>
                <p className="mt-0.5 font-v2-mono text-[10px] uppercase tracking-[0.18em] text-v2-stone sm:text-[11px]">
                  {member.role}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* retrato do elenco completo */}
        <figure className="mt-14">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl ring-1 ring-v2-ink/10 sm:aspect-[21/9]">
            <Image
              src={TEAM.groupPhoto.src}
              alt={TEAM.groupPhoto.alt}
              fill
              sizes="(max-width: 1280px) 100vw, 1152px"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 text-center font-v2-display text-sm italic text-v2-stone">
            {TEAM.groupPhoto.alt}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
