"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { HERO, TESTIMONIALS } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

/**
 * Ato 3: a decisão. O clímax da história acontece fora da tela dela e
 * dentro da sua: o WhatsApp toca. As notificações caem como caem na vida
 * real, e logo abaixo vem a prova de que isso não é encenação: prints
 * reais e as avaliações públicas no Google. Objetivo: mostrar onde o
 * funil termina (na sua agenda) e provar com material verificável.
 */
export default function ActDecide() {
  const { ref, visible } = useFadeIn<HTMLDivElement>();
  const reviews = TESTIMONIALS.googleReviews.slice(0, 3);

  return (
    <section
      id="ato-3"
      className="scroll-mt-8 border-t border-v2-bone/10 bg-v2-ink py-16 sm:py-24"
    >
      <div ref={ref} className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        <p className="v2-eyebrow text-v2-brass-bright">Ato 03 · A decisão</p>
        <h2 className="mt-4 max-w-2xl text-3xl sm:text-4xl lg:text-5xl">
          E então{" "}
          <em className="font-v2-display italic text-v2-brass-bright">
            o seu WhatsApp toca
          </em>
          .
        </h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* a tela agora é a sua */}
          <div style={{ "--stagger-step": "450ms", "--stagger-start": "200ms" } as CSSProperties}>
            <p className="font-v2-mono text-[11px] uppercase tracking-[0.2em] text-v2-bone/45">
              A tela agora é a sua
            </p>
            <div className="mt-5 flex flex-col gap-3">
              {HERO.notifications.map((notif, i) => (
                <div
                  key={notif.sender}
                  className={`rounded-2xl bg-v2-coal p-4 ring-1 ring-v2-bone/10 ${
                    visible ? "animate-stagger-in" : "opacity-0"
                  }`}
                  style={{ "--stagger-i": i } as CSSProperties}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/90">
                      <svg viewBox="0 0 24 24" fill="white" aria-hidden="true" className="h-5 w-5">
                        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z" />
                      </svg>
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="truncate text-sm font-semibold text-v2-bone">
                          {notif.sender}
                        </p>
                        <span className="shrink-0 text-xs text-v2-bone/40">{notif.time}</span>
                      </div>
                      <p className="mt-0.5 text-sm leading-snug text-v2-bone/70">
                        {notif.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <p
                className={`mt-2 font-v2-display text-base italic text-v2-bone/55 ${
                  visible ? "animate-stagger-in" : "opacity-0"
                }`}
                style={{ "--stagger-i": 2 } as CSSProperties}
              >
                Pacientes que chegam sabendo o seu valor, prontos pra agendar.
              </p>
            </div>
          </div>

          {/* prova verificável */}
          <div>
            <p className="font-v2-mono text-[11px] uppercase tracking-[0.2em] text-v2-bone/45">
              Isso não é encenação · prints reais de clientes
            </p>
            <div className="mt-5 flex snap-x gap-4 overflow-x-auto pb-3 [scrollbar-width:thin]">
              {TESTIMONIALS.items.map((item) => (
                <Image
                  key={item.src}
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  className="h-48 w-auto shrink-0 snap-start rounded-xl ring-1 ring-v2-bone/15 sm:h-56"
                />
              ))}
            </div>
          </div>
        </div>

        {/* ela vira mais uma avaliação */}
        <div className="mt-14">
          <p className="font-v2-mono text-[11px] uppercase tracking-[0.2em] text-v2-bone/45">
            No fim, ela conta pra todo mundo · {TESTIMONIALS.subtitle}
          </p>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {reviews.map((review) => (
              <figure
                key={review.name}
                className="flex flex-col rounded-2xl bg-v2-coal p-6 ring-1 ring-v2-bone/10"
              >
                <StarsRow className="h-3.5 w-auto text-v2-brass-bright" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-v2-bone/80">
                  “{review.text}”
                </blockquote>
                <figcaption className="mt-5 border-t border-v2-bone/10 pt-4">
                  <p className="text-sm font-semibold text-v2-bone">{review.name}</p>
                  <p className="mt-0.5 font-v2-mono text-[10px] uppercase tracking-[0.16em] text-v2-bone/45">
                    {review.meta}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StarsRow({ className }: { className?: string }) {
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
