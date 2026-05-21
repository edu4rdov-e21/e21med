"use client";

import {
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { LETTER } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

export default function OpenLetter() {
  const { ref, className } = useFadeIn<HTMLDivElement>();
  const [isOpen, setIsOpen] = useState(false);
  const letterRef = useRef<HTMLElement>(null);

  function open() {
    if (isOpen) return;
    setIsOpen(true);
  }

  function handleEnvelopeKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  }

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => letterRef.current?.focus(), 350);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  return (
    <section className="bg-cream py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div
          ref={ref}
          className={`${className} text-center max-w-2xl mx-auto mb-10 sm:mb-14`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy/70 mb-4">
            {LETTER.label}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-navy leading-tight">
            {LETTER.title}
          </h2>
        </div>

        <div className="relative max-w-2xl mx-auto">
          <div
            aria-hidden={isOpen}
            className={`flex flex-col items-center transition-all duration-300 ease-out ${
              isOpen
                ? "opacity-0 -translate-y-3 pointer-events-none absolute inset-x-0 top-0"
                : "opacity-100 translate-y-0"
            }`}
          >
            <div
              role="button"
              tabIndex={isOpen ? -1 : 0}
              aria-expanded={isOpen}
              aria-controls="open-letter-body"
              aria-label="Abrir a carta"
              onClick={open}
              onKeyDown={handleEnvelopeKey}
              className="group relative w-full max-w-md aspect-[3/2] bg-[#F5F2ED] rounded-md cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(26,54,93,0.35)] shadow-[0_12px_40px_-15px_rgba(26,54,93,0.25)] border border-navy/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-4 focus-visible:ring-offset-cream"
            >
              <svg
                aria-hidden="true"
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 300 200"
                preserveAspectRatio="none"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="150"
                  y2="100"
                  stroke="rgba(26,54,93,0.18)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
                <line
                  x1="300"
                  y1="0"
                  x2="150"
                  y2="100"
                  stroke="rgba(26,54,93,0.18)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              <div
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-navy-dark text-cream flex items-center justify-center shadow-[0_6px_20px_-6px_rgba(0,0,0,0.5)] ring-1 ring-cream/10"
              >
                <span className="font-serif text-base sm:text-lg leading-none">
                  E21
                </span>
              </div>
            </div>

            <p className="mt-6 italic text-sm sm:text-base text-navy/70 font-serif">
              {LETTER.envelopeAddress}
            </p>

            <button
              type="button"
              onClick={open}
              tabIndex={isOpen ? -1 : 0}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-cream text-navy border-2 border-navy px-6 py-3 text-sm sm:text-base font-bold hover:bg-navy hover:text-cream transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              {LETTER.openCta}
            </button>
          </div>

          <article
            ref={letterRef}
            id="open-letter-body"
            role="article"
            tabIndex={-1}
            aria-label="Carta aberta da E21"
            className={`relative bg-white rounded-lg shadow-xl border-l-4 border-l-navy p-8 sm:p-12 lg:p-16 transition-all duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-4 focus-visible:ring-offset-cream ${
              isOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6 pointer-events-none"
            }`}
            style={{
              transitionDelay: isOpen ? "200ms" : "0ms",
            }}
          >
            <p className="italic text-navy/70 text-base sm:text-lg font-serif mb-6 sm:mb-8">
              {LETTER.greeting}
            </p>

            <div className="space-y-5 sm:space-y-6">
              {LETTER.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`text-base sm:text-lg leading-relaxed text-navy ${
                    p.emphasis ? "font-semibold" : ""
                  }`}
                >
                  {p.text}
                </p>
              ))}
            </div>

            <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-navy/15">
              <p className="italic text-navy/70 text-sm sm:text-base font-serif mb-1">
                {LETTER.signatureLabel}
              </p>
              <p className="font-serif text-xl sm:text-2xl text-navy">
                {LETTER.signatureName}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
