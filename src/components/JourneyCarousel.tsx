"use client";

import { useEffect, useRef, useState } from "react";
import { HOW_IT_WORKS } from "@/lib/constants";
import JourneyCard from "./JourneyCard";

/**
 * Jornada mês a mês no mobile: deck horizontal com swipe nativo
 * (scroll-snap) + chips de navegação que mostram e controlam o mês
 * ativo. Sincronização bidirecional: deslizar atualiza o chip;
 * tocar no chip desliza o deck. Substitui a timeline vertical
 * (a jornada ficava longa demais pra baixo).
 */
export default function JourneyCarousel() {
  const { milestones } = HOW_IT_WORKS;
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLUListElement>(null);
  const chipsScrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLLIElement | null>>([]);
  const chipRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const mountedRef = useRef(false);

  // centraliza um elemento dentro do seu scroll container horizontal
  // sem usar scrollIntoView (que pode arrastar a página verticalmente)
  function centerInScroller(scroller: HTMLElement, el: HTMLElement) {
    const sRect = scroller.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    const left =
      scroller.scrollLeft +
      (eRect.left - sRect.left) -
      (sRect.width - eRect.width) / 2;
    scroller.scrollTo({ left, behavior: "smooth" });
  }

  // swipe -> chip: observa qual card domina a viewport do track
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.indexOf(
              entry.target as HTMLLIElement
            );
            if (idx >= 0) setActive(idx);
          }
        }
      },
      { root: track, threshold: 0.6 }
    );
    cardRefs.current.forEach((c) => c && observer.observe(c));
    return () => observer.disconnect();
  }, []);

  // mantém o chip ativo visível na fileira de chips.
  // Pula o mount: scroll na carga inicial seria movimento indesejado.
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    const scroller = chipsScrollRef.current;
    const chip = chipRefs.current[active];
    if (scroller && chip) centerInScroller(scroller, chip);
  }, [active]);

  function goTo(idx: number) {
    setActive(idx);
    const track = trackRef.current;
    const card = cardRefs.current[idx];
    if (track && card) centerInScroller(track, card);
  }

  return (
    <div className="lg:hidden">
      <div
        ref={chipsScrollRef}
        className="overflow-x-auto -mx-6 px-6 mb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex gap-2 w-max">
          {milestones.map((m, i) => (
            <button
              key={m.monthLabel}
              ref={(el) => {
                chipRefs.current[i] = el;
              }}
              type="button"
              onClick={() => goTo(i)}
              aria-current={i === active}
              className={`shrink-0 min-h-11 px-4 py-2 rounded-full border text-sm font-semibold transition-colors duration-200 active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-navy ${
                i === active
                  ? "bg-navy text-cream border-navy"
                  : "bg-transparent text-navy/70 border-navy/20"
              }`}
            >
              Mês {m.monthLabel}
            </button>
          ))}
        </div>
      </div>

      <ul
        ref={trackRef}
        aria-label="Jornada mês a mês"
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 pb-2 items-start [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {milestones.map((m, i) => (
          <li
            key={m.monthLabel}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="snap-center shrink-0 w-[86%] sm:w-[70%]"
          >
            <JourneyCard milestone={m} index={i} />
          </li>
        ))}
      </ul>

      <p aria-hidden="true" className="text-center text-xs text-navy/50 mt-4">
        {active + 1} / {milestones.length} · deslize pro lado
      </p>
    </div>
  );
}
