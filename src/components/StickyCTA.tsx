"use client";

import { useEffect, useState } from "react";
import { HERO } from "@/lib/constants";
import { useSectionVisibility } from "@/hooks/useSectionVisibility";

export default function StickyCTA() {
  // Hero assume visível até a primeira medição (evita a barra piscar no load).
  const heroVisible = useSectionVisibility("#hero", true);
  const formVisible = useSectionVisibility("#formulario");
  const [modalOpen, setModalOpen] = useState(false);

  // A modal do formulário anuncia abertura/fechamento via eventos globais
  // (emitidos pelo ApplicationForm). Mais explícito e estável do que
  // observar side effects como o overflow do body.
  useEffect(() => {
    const onOpen = () => setModalOpen(true);
    const onClose = () => setModalOpen(false);
    window.addEventListener("e21:application-opened", onOpen);
    window.addEventListener("e21:application-closed", onClose);
    return () => {
      window.removeEventListener("e21:application-opened", onOpen);
      window.removeEventListener("e21:application-closed", onClose);
    };
  }, []);

  const show = !heroVisible && !formVisible && !modalOpen;

  return (
    <div
      aria-hidden={!show}
      className={`lg:hidden fixed bottom-0 inset-x-0 z-40 transition-transform duration-300 ease-out ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div
        className="bg-navy-dark/90 backdrop-blur-md border-t border-cream/10 px-4 pt-3"
        style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0.75rem)" }}
      >
        <button
          type="button"
          tabIndex={show ? 0 : -1}
          onClick={() =>
            window.dispatchEvent(new CustomEvent("e21:open-application"))
          }
          className="w-full min-h-12 inline-flex items-center justify-center rounded-full bg-cream text-navy px-6 py-3 text-base font-bold active:scale-[0.97] transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
        >
          {HERO.ctaLabel}
        </button>
      </div>
    </div>
  );
}
