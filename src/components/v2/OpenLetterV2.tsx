"use client";

import { LETTER } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";
import { useSectionVisibility } from "@/hooks/useSectionVisibility";
import SignatureDraw from "../SignatureDraw";

export default function OpenLetterV2() {
  const { ref, className } = useFadeIn<HTMLDivElement>();
  const visible = useSectionVisibility("#carta-v2", false, 0.25);

  return (
    <section id="carta-v2" className="bg-parchment py-16 sm:py-24 scroll-mt-8">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
        <div ref={ref} className={`${className} max-w-3xl mx-auto`}>
          <p className="font-v2-mono text-[11px] uppercase tracking-wide text-terracotta-seal text-center mb-4">
            {LETTER.label}
          </p>
          <h2 className="font-v2-display text-3xl sm:text-5xl text-ink text-center leading-[1.1] mb-12">
            {LETTER.title}
          </h2>

          <article
            aria-label="Carta aberta do E21"
            className="bg-aged-paper rounded-3xl p-8 sm:p-12 lg:p-14"
          >
            <p className="font-v2-display italic font-light text-xl text-charcoal mb-8">
              {LETTER.greeting}
            </p>

            <div className="space-y-5">
              {LETTER.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`text-base leading-relaxed ${
                    p.emphasis
                      ? "font-v2-display italic text-xl text-ink"
                      : "text-charcoal"
                  }`}
                >
                  {p.text}
                </p>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-warm-taupe">
              <p className="font-v2-display italic font-light text-lg text-charcoal mb-2">
                {LETTER.signatureLabel}
              </p>
              <SignatureDraw
                name={LETTER.signatureName}
                play={visible}
                stroke="var(--color-ink)"
              />
              <p className="text-sm text-graphite mt-1">
                {LETTER.signatureRole}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
