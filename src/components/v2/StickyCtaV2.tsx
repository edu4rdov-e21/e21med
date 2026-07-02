"use client";

import { HERO } from "@/lib/constants";
import { useSectionVisibility } from "@/hooks/useSectionVisibility";

/**
 * CTA persistente. Objetivo: manter o caminho de conversão a um toque em
 * qualquer ponto da página. Barra no mobile, pill no canto no desktop;
 * some no hero (que já tem CTA) e no formulário (destino).
 */
export default function StickyCtaV2() {
  // hero assume visível até a primeira medição (evita flash no load)
  const heroVisible = useSectionVisibility("#hero-v2", true);
  const formVisible = useSectionVisibility("#contato");
  const show = !heroVisible && !formVisible;

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 transition-all duration-300 ease-out lg:inset-x-auto lg:bottom-8 lg:right-8 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <div className="border-t border-v2-bone/10 bg-v2-ink/90 px-4 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-3 backdrop-blur-md lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
        <a
          href="#contato"
          tabIndex={show ? 0 : -1}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-v2-brass-bright px-6 py-3 text-base font-semibold text-v2-ink transition hover:brightness-110 active:scale-[0.97] lg:w-auto lg:px-8 lg:shadow-[0_18px_45px_-12px_rgba(0,0,0,0.65)]"
        >
          {HERO.ctaLabel}
        </a>
      </div>
    </div>
  );
}
