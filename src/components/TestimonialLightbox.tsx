"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type Item = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export default function TestimonialLightbox({
  item,
  onClose,
}: {
  item: Item;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(
      () => closeRef.current?.focus({ preventScroll: true }),
      50
    );

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      // focus trap simples: o único focável da modal é o botão de fechar
      if (e.key === "Tab") {
        e.preventDefault();
        closeRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 animate-fade-in"
    >
      <button
        type="button"
        aria-label="Fechar depoimento"
        onClick={onClose}
        tabIndex={-1}
        className="absolute inset-0 bg-black/85 cursor-default"
      />

      <button
        ref={closeRef}
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <Image
        src={item.src}
        alt={item.alt}
        width={item.width}
        height={item.height}
        sizes="100vw"
        className="relative pointer-events-none w-auto h-auto max-w-full max-h-[85vh] rounded-lg shadow-2xl"
      />
    </div>
  );
}
