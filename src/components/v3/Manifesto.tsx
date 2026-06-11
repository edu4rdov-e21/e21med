import { LETTER } from "@/lib/constants";
import Constellation from "./Constellation";

/** Envelope geométrico em line-art 1.5px — referência ao envelope da v1,
    redesenhado como origami facetado. Decorativo, lichen. */
function OrigamiEnvelope() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      fill="none"
      stroke="var(--color-lichen)"
      strokeWidth="1.5"
      strokeLinejoin="round"
      className="w-[100px] h-[100px]"
    >
      <path d="M12 32 L50 12 L88 32 L88 74 L12 74 Z" />
      <path d="M12 32 L50 56 L88 32" />
      <path d="M12 74 L42 47" />
      <path d="M88 74 L58 47" />
      <path d="M50 12 L50 30" strokeDasharray="2 4" />
      <circle cx="50" cy="34" r="2.5" />
    </svg>
  );
}

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative py-24 sm:py-32 scroll-mt-16 overflow-hidden"
    >
      <Constellation
        variant="field"
        className="absolute inset-0 w-full h-full"
      />

      <div className="relative max-w-[1200px] mx-auto px-6">
        <div className="max-w-[60ch] mx-auto flex flex-col items-center">
          <OrigamiEnvelope />

          <p className="v3-eyebrow text-smoke mt-10 mb-4">{LETTER.label}</p>
          <h2 className="text-4xl sm:text-5xl leading-[1.05] text-center mb-14">
            {LETTER.title}
          </h2>

          <div className="space-y-7 w-full">
            <p className="text-lg text-smoke leading-relaxed">
              {LETTER.greeting}
            </p>
            {LETTER.paragraphs.map((p, i) =>
              p.emphasis ? (
                <p
                  key={i}
                  className="text-[28px] sm:text-[32px] font-extralight text-bone leading-snug tracking-normal"
                >
                  {p.text}
                </p>
              ) : (
                <p key={i} className="text-lg text-v3-ash leading-relaxed">
                  {p.text}
                </p>
              )
            )}
          </div>

          <div className="w-full mt-14 pt-8 border-t border-white/10">
            <p className="text-lg text-smoke">{LETTER.signatureLabel}</p>
            <p className="text-2xl font-extralight text-bone mt-2">
              {LETTER.signatureName}
            </p>
            <p className="text-sm text-v3-ash mt-1">{LETTER.signatureRole}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
