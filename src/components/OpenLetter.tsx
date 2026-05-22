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
  const { ref: headRef, className: headClass } = useFadeIn<HTMLDivElement>();
  const sectionRef = useRef<HTMLElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const letterRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsSectionVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;

    const measure = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(contentRef.current);

    return () => observer.disconnect();
  }, []);

  function openLetter() {
    if (isOpen) return;
    setIsOpen(true);
  }

  function closeLetter() {
    if (!isOpen) return;
    setIsOpen(false);
  }

  function handleEnvelopeKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLetter();
    }
  }

  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true;
      const t = setTimeout(
        () => letterRef.current?.focus({ preventScroll: true }),
        400
      );
      return () => clearTimeout(t);
    }
    // só devolve foco se a carta já tinha sido aberta antes
    // (evita auto-scroll no carregamento inicial da página)
    if (!wasOpenRef.current) return;
    const t = setTimeout(
      () => openButtonRef.current?.focus({ preventScroll: true }),
      100
    );
    return () => clearTimeout(t);
  }, [isOpen]);

  return (
    <section
      ref={sectionRef}
      className={`bg-cream pt-16 sm:pt-24 ${
        isOpen ? "pb-24 sm:pb-32" : "pb-16 sm:pb-24"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div
          ref={headRef}
          className={`${headClass} text-center max-w-2xl mx-auto mb-10 sm:mb-14`}
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
            className={`flex flex-col items-center transition-all duration-[400ms] ${
              isOpen
                ? "opacity-0 -translate-y-2 scale-[0.98] pointer-events-none absolute inset-x-0 top-0"
                : "opacity-100 translate-y-0 scale-100"
            }`}
            style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
          >
            <div
              role="button"
              tabIndex={isOpen ? -1 : 0}
              aria-expanded={isOpen}
              aria-controls="open-letter-body"
              aria-label="Abrir a carta"
              onClick={openLetter}
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
              ref={openButtonRef}
              type="button"
              onClick={openLetter}
              tabIndex={isOpen ? -1 : 0}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-cream text-navy border-2 border-navy px-6 py-3 text-sm sm:text-base font-bold hover:bg-navy hover:text-cream transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              {LETTER.openCta}
            </button>
          </div>

          <div
            className="overflow-hidden transition-[max-height] duration-[600ms]"
            style={{
              maxHeight: isOpen ? `${contentHeight}px` : "0px",
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            aria-hidden={!isOpen}
          >
            <div ref={contentRef}>
              <article
                ref={letterRef}
                id="open-letter-body"
                role="article"
                tabIndex={-1}
                aria-label="Carta aberta da E21"
                className={`relative bg-white rounded-lg shadow-xl border-l-4 border-l-navy p-8 sm:p-12 lg:p-16 transition-opacity duration-[500ms] focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-4 focus-visible:ring-offset-cream ${
                  isOpen ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  transitionDelay: isOpen ? "150ms" : "0ms",
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
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
                  <p className="text-sm sm:text-base text-navy/70 mt-1">
                    {LETTER.signatureRole}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>

      {isOpen && isSectionVisible && (
        <button
          type="button"
          onClick={closeLetter}
          aria-label="Fechar a carta"
          className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-40 inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full bg-navy text-cream font-semibold text-sm shadow-lg hover:shadow-xl hover:bg-navy-dark transition-all duration-300 animate-fade-in-up focus:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          style={{ animationDelay: "200ms" }}
        >
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          Fechar a carta
        </button>
      )}
    </section>
  );
}
