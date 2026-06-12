"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { TESTIMONIALS } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";
import TestimonialLightbox from "./TestimonialLightbox";

type PrintItem = (typeof TESTIMONIALS.items)[number];
type GoogleReview = (typeof TESTIMONIALS.googleReviews)[number];
type Card =
  | { kind: "google"; review: GoogleReview }
  | { kind: "print"; item: PrintItem };

// mescla avaliações Google e prints de WhatsApp, intercalados;
// o último cartão (depoimento 10) abre a pilha, os demais seguem na ordem
const CARDS: Card[] = (() => {
  const out: Card[] = [];
  const max = Math.max(
    TESTIMONIALS.googleReviews.length,
    TESTIMONIALS.items.length
  );
  for (let i = 0; i < max; i++) {
    if (TESTIMONIALS.googleReviews[i])
      out.push({ kind: "google", review: TESTIMONIALS.googleReviews[i] });
    if (TESTIMONIALS.items[i])
      out.push({ kind: "print", item: TESTIMONIALS.items[i] });
  }
  const last = out.pop();
  if (last) out.unshift(last);
  return out;
})();

// posições fixas da pilha (determinísticas: nada de random no render)
const STACK_POSE = [
  { x: 0, y: 0, r: 0, s: 1, o: 1, z: 40 },
  { x: 10, y: 12, r: 2.5, s: 0.96, o: 1, z: 30 },
  { x: -12, y: 22, r: -3, s: 0.92, o: 1, z: 20 },
  { x: 4, y: 30, r: 1.5, s: 0.88, o: 0.6, z: 10 },
];

export function GoogleLogo() {
  return (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.57 5.57 0 0 1-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29A7.18 7.18 0 0 1 4.89 12c0-.8.14-1.57.38-2.29V6.62H1.29a11.99 11.99 0 0 0 0 10.76l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
      />
    </svg>
  );
}

export function Stars({ size = 18 }: { size?: number }) {
  return (
    <span aria-hidden="true" className="inline-flex gap-0.5 text-amber-400">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </span>
  );
}

export default function Testimonials() {
  const { ref, className } = useFadeIn<HTMLDivElement>();
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState<{ idx: number; dir: number } | null>(
    null
  );
  const [lightbox, setLightbox] = useState<PrintItem | null>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ startX: 0, dx: 0, dragging: false });
  const total = CARDS.length;

  function go(dir: number) {
    setLeaving({ idx: active, dir });
    setActive((a) => (a + dir + total) % total);
    setTimeout(() => setLeaving(null), 420);
  }

  function poseOf(idx: number) {
    if (leaving && idx === leaving.idx) {
      return {
        transform: `translate(${leaving.dir * -120}%, -6%) rotate(${
          leaving.dir * -12
        }deg)`,
        opacity: 0,
        zIndex: 50,
      };
    }
    const pos = (idx - active + total) % total;
    const pose = STACK_POSE[Math.min(pos, STACK_POSE.length - 1)];
    return {
      transform: `translate(${pose.x}px, ${pose.y}px) rotate(${pose.r}deg) scale(${pose.s})`,
      opacity: pos > 3 ? 0 : pose.o,
      zIndex: pose.z,
      pointerEvents: pos === 0 ? ("auto" as const) : ("none" as const),
    };
  }

  // arraste no cartão do topo: passa pro lado solto > 70px
  function onPointerDown(e: React.PointerEvent) {
    drag.current = { startX: e.clientX, dx: 0, dragging: true };
    const el = topRef.current;
    if (el) el.style.transition = "none";
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!drag.current.dragging) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.dx = dx;
    const el = topRef.current;
    if (el) {
      el.style.transform = `translate(${dx}px, 0) rotate(${dx * 0.05}deg)`;
    }
  }

  function onPointerUp() {
    if (!drag.current.dragging) return;
    drag.current.dragging = false;
    const el = topRef.current;
    if (el) {
      el.style.transition = "";
      el.style.transform = "";
    }
    const dx = drag.current.dx;
    if (Math.abs(dx) > 70) go(dx < 0 ? 1 : -1);
  }

  function onTopClick(card: Card) {
    // não abre lightbox se foi arraste
    if (Math.abs(drag.current.dx) > 8) return;
    if (card.kind === "print") setLightbox(card.item);
  }

  return (
    <section className="bg-white py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div
          ref={ref}
          className={`${className} text-center max-w-2xl mx-auto mb-10 sm:mb-12`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-navy leading-tight mb-4">
            {TESTIMONIALS.title}
          </h2>
          <p className="text-sm sm:text-base text-navy/70 leading-relaxed mb-6">
            {TESTIMONIALS.subtitle}
          </p>

          <div className="inline-flex items-center gap-3 bg-white rounded-full pl-4 pr-5 py-2.5 ring-1 ring-navy/10 shadow-[0_8px_24px_-8px_rgba(26,54,93,0.2)]">
            <GoogleLogo />
            <Stars />
            <span className="text-sm font-bold text-navy">
              {TESTIMONIALS.stats.ratingLabel}
            </span>
            <span className="text-sm text-navy/70">
              · {TESTIMONIALS.stats.total} avaliações
            </span>
          </div>
        </div>

        <div
          role="region"
          aria-label="Boutique de avaliações"
          className="relative max-w-md mx-auto h-[460px] sm:h-[480px]"
          style={{ touchAction: "pan-y" }}
        >
          {CARDS.map((card, idx) => {
            const isTop = (idx - active + total) % total === 0 && !leaving;
            const isTopVisual = (idx - active + total) % total === 0;
            const style = poseOf(idx);

            return (
              <div
                key={idx}
                ref={isTopVisual ? topRef : undefined}
                aria-hidden={!isTopVisual}
                onPointerDown={isTop ? onPointerDown : undefined}
                onPointerMove={isTop ? onPointerMove : undefined}
                onPointerUp={isTop ? onPointerUp : undefined}
                onPointerCancel={isTop ? onPointerUp : undefined}
                onClick={isTop ? () => onTopClick(card) : undefined}
                className={`absolute inset-0 rounded-2xl bg-white ring-1 ring-navy/10 shadow-[0_24px_60px_-20px_rgba(26,54,93,0.35)] transition-[transform,opacity] duration-[420ms] ease-out select-none ${
                  isTop && card.kind === "print" ? "cursor-zoom-in" : ""
                } ${isTop ? "cursor-grab active:cursor-grabbing" : ""}`}
                style={style}
              >
                {card.kind === "google" ? (
                  <div className="h-full flex flex-col p-6 sm:p-8">
                    <div className="flex items-center justify-between mb-4">
                      <Stars size={20} />
                      <GoogleLogo />
                    </div>
                    <p className="flex-1 text-[15px] sm:text-base text-navy leading-relaxed overflow-y-auto">
                      {card.review.text}
                    </p>
                    <div className="pt-4 mt-4 border-t border-navy/10">
                      <p className="text-sm font-bold text-navy">
                        {card.review.name}
                      </p>
                      <p className="text-xs text-navy/60 mt-0.5">
                        {card.review.meta}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full p-3 flex items-center justify-center bg-cream rounded-2xl">
                    <Image
                      src={card.item.src}
                      alt={card.item.alt}
                      width={card.item.width}
                      height={card.item.height}
                      sizes="420px"
                      draggable={false}
                      className="max-h-full w-auto max-w-full object-contain rounded-lg"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-5 mt-8">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Avaliação anterior"
            className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-navy/5 text-navy ring-1 ring-navy/15 hover:bg-navy/10 transition active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy"
          >
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <span
            aria-live="polite"
            className="text-sm text-navy/60 tabular-nums min-w-14 text-center"
          >
            {active + 1} / {total}
          </span>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Próxima avaliação"
            className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-navy/5 text-navy ring-1 ring-navy/15 hover:bg-navy/10 transition active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy"
          >
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {lightbox && (
        <TestimonialLightbox
          item={lightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
}
