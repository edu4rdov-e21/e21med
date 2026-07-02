"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { LETTER, SOCIAL_PROOF, TEAM, PRESS } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

/**
 * A virada: a história para de ser sobre "ela" e vira sobre você. O
 * manifesto entra como a frase única de destaque (a moral da carta), os
 * médicos que já viveram essa história passam em marquee, a equipe aparece
 * como ficha técnica e a imprensa como selo. Objetivo: conexão + confiança
 * final antes do pedido de ação.
 */
export default function TurnManifesto() {
  const { ref, visible } = useFadeIn<HTMLDivElement>();
  const press = PRESS.items[0];

  return (
    <section
      id="virada"
      className="v2-grain scroll-mt-8 overflow-hidden border-t border-v2-bone/10 bg-v2-ink py-16 sm:py-24"
    >
      <div className="relative z-[2]">
        <div
          ref={ref}
          className="mx-auto max-w-3xl px-6 text-center sm:px-10"
          style={{ "--stagger-step": "140ms" } as CSSProperties}
        >
          <p
            className={`v2-eyebrow text-v2-bone/45 ${visible ? "animate-stagger-in" : "opacity-0"}`}
            style={{ "--stagger-i": 0 } as CSSProperties}
          >
            A virada · troque de lugar
          </p>
          <p
            className={`mt-6 font-v2-display text-xl italic text-v2-bone/80 sm:text-2xl ${
              visible ? "animate-stagger-in" : "opacity-0"
            }`}
            style={{ "--stagger-i": 1 } as CSSProperties}
          >
            Essa paciente existe. Agora mesmo, ela procura a sua especialidade.
          </p>
          <blockquote
            className={`mt-7 font-v2-display text-[clamp(1.6rem,3.8vw,2.6rem)] leading-[1.25] text-v2-bone ${
              visible ? "animate-stagger-in" : "opacity-0"
            }`}
            style={{ "--stagger-i": 2 } as CSSProperties}
          >
            Você merece atender pacientes que chegam até você{" "}
            <em className="italic text-v2-brass-bright">sabendo o seu valor</em>
            , e não brigando por preço.
          </blockquote>
          <div
            className={`mt-8 flex items-center justify-center gap-4 ${
              visible ? "animate-stagger-in" : "opacity-0"
            }`}
            style={{ "--stagger-i": 3 } as CSSProperties}
          >
            <span aria-hidden="true" className="h-px w-10 bg-v2-brass-bright" />
            <p className="text-sm text-v2-bone/55">
              <span className="font-v2-display text-lg italic text-v2-bone">
                {LETTER.signatureName}
              </span>
              {" · "}
              {LETTER.signatureRole}
            </p>
            <span aria-hidden="true" className="h-px w-10 bg-v2-brass-bright" />
          </div>
        </div>

        {/* médicos que já trocaram de lugar */}
        <p className="v2-eyebrow mt-16 text-center text-v2-bone/45">
          {SOCIAL_PROOF.label} · eles já viveram essa história
        </p>
        <div
          className="mt-7"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <ul className="animate-scroll-x flex w-max items-center gap-8 sm:gap-12" style={{ transform: "translateZ(0)" }}>
            {[0, 1].map((copy) =>
              SOCIAL_PROOF.clients.map((client) => (
                <li
                  key={`${copy}-${client.name}`}
                  aria-hidden={copy === 1}
                  className="flex w-24 shrink-0 flex-col items-center gap-2.5 sm:w-28"
                >
                  <span className="relative block h-16 w-16 overflow-hidden rounded-full ring-1 ring-v2-bone/20 sm:h-20 sm:w-20">
                    <Image
                      src={client.src}
                      alt={copy === 0 ? client.name : ""}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </span>
                  <span className="text-center text-[11px] leading-tight text-v2-bone/55">
                    {client.name}
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* ficha técnica + selo de imprensa */}
        <div className="mx-auto mt-16 grid max-w-6xl gap-10 px-6 sm:px-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14 lg:px-16">
          <div>
            <p className="v2-eyebrow text-v2-bone/45">Ficha técnica · quem produz</p>
            <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6">
              {TEAM.members.map((member) => (
                <figure key={member.name} className="text-center">
                  <span className="relative block aspect-[3/4] overflow-hidden rounded-lg ring-1 ring-v2-bone/15">
                    <Image
                      src={member.src}
                      alt={`${member.name}, ${member.role}`}
                      fill
                      sizes="(max-width: 640px) 33vw, 120px"
                      className="object-cover"
                    />
                  </span>
                  <figcaption className="mt-2">
                    <p className="text-xs font-medium text-v2-bone/85">{member.name}</p>
                    <p className="mt-0.5 font-v2-mono text-[8px] uppercase leading-tight tracking-[0.08em] text-v2-bone/40">
                      {member.role}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <a
            href={press.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between rounded-2xl bg-v2-coal p-6 ring-1 ring-v2-bone/10 transition hover:ring-v2-brass-bright/60 sm:p-7"
          >
            <div>
              <p className="v2-eyebrow text-v2-brass-bright">
                Na imprensa · {press.outlet}
              </p>
              <p className="mt-4 font-v2-display text-lg leading-snug text-v2-bone sm:text-xl">
                {press.headline}
              </p>
            </div>
            <p className="mt-5 inline-flex items-center gap-2 text-sm text-v2-bone/60 transition group-hover:text-v2-bone">
              {press.cta}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
