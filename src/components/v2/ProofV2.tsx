"use client";

import Image from "next/image";
import { TESTIMONIALS, PRESS } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

/**
 * Prova social profunda. Objetivo: eliminar a dúvida "isso funciona mesmo?"
 * em três camadas: avaliações do Google (nota pública), prints reais de
 * WhatsApp/Instagram (a conversa como ela é) e a matéria de imprensa
 * (validação de terceiros). Três fontes distintas, uma conclusão.
 */
export default function ProofV2() {
  const { ref, className } = useFadeIn<HTMLDivElement>();
  const press = PRESS.items[0];
  const reviews = TESTIMONIALS.googleReviews.slice(0, 3);

  return (
    <section
      id="prova"
      className="scroll-mt-8 border-t border-v2-ink/10 bg-v2-bone py-16 text-v2-ink sm:py-24"
    >
      <div ref={ref} className={`${className} mx-auto max-w-6xl px-6 sm:px-10 lg:px-16`}>
        <p className="v2-eyebrow text-v2-stone">Prova social</p>
        <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-xl text-3xl sm:text-4xl lg:text-5xl">
            {TESTIMONIALS.title}
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-v2-stone sm:text-base">
            {TESTIMONIALS.subtitle}
          </p>
        </div>

        {/* camada 1: avaliações do Google */}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <figure
              key={review.name}
              className="flex flex-col rounded-2xl bg-v2-paper p-6 ring-1 ring-v2-ink/5"
            >
              <StarsRow className="h-3.5 w-auto text-v2-brass" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-v2-ink/85">
                “{review.text}”
              </blockquote>
              <figcaption className="mt-5 border-t border-v2-ink/10 pt-4">
                <p className="text-sm font-semibold">{review.name}</p>
                <p className="mt-0.5 font-v2-mono text-[10px] uppercase tracking-[0.16em] text-v2-stone">
                  {review.meta}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* camada 2: prints reais */}
        <p className="v2-eyebrow mt-14 text-v2-stone">
          Mensagens reais de clientes
        </p>
        <div className="-mx-6 mt-5 flex snap-x gap-4 overflow-x-auto px-6 pb-3 sm:-mx-10 sm:px-10 lg:-mx-16 lg:px-16 [scrollbar-width:thin]">
          {TESTIMONIALS.items.map((item) => (
            <Image
              key={item.src}
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              className="h-56 w-auto shrink-0 snap-start rounded-xl ring-1 ring-v2-ink/10 sm:h-64"
            />
          ))}
        </div>

        {/* camada 3: imprensa */}
        <a
          href={press.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-14 flex flex-col gap-6 rounded-2xl bg-v2-ink p-6 text-v2-bone ring-1 ring-v2-ink transition hover:ring-v2-brass sm:p-8 md:flex-row md:items-center"
        >
          <div className="relative aspect-[3/2] w-full shrink-0 overflow-hidden rounded-xl md:w-64">
            <Image
              src={press.image}
              alt={press.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 256px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="v2-eyebrow text-v2-brass-bright">
              {press.outletKind} · {press.outlet} · {press.date}
            </p>
            <h3 className="mt-3 font-v2-display text-xl leading-snug sm:text-2xl">
              {press.headline}
            </h3>
            <p className="mt-3 inline-flex items-center gap-2 text-sm text-v2-bone/70 transition group-hover:text-v2-bone">
              {press.cta}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </p>
          </div>
        </a>
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
