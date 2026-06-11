import { HERO, NAV_V3 } from "@/lib/constants";
import Constellation from "./Constellation";

// quebras agressivas do headline: cada linha é uma afirmação curta
// (derivado de HERO.headlineHighlight + headlinePost, copy intacta)
function headlineLines(): string[] {
  const words = `${HERO.headlineHighlight}${HERO.headlinePost}`.split(" ");
  return [
    words.slice(0, 2).join(" "),
    words.slice(2, 5).join(" "),
    words.slice(5).join(" "),
  ];
}

export default function Hero() {
  const lines = headlineLines();

  return (
    <section className="relative min-h-screen flex items-end lg:items-center overflow-hidden">
      {/* mobile: constelação é o fundo inteiro; desktop: metade direita.
          variant="symbols": partículas formam DNA -> estetoscópio ->
          seringa -> ECG em loop */}
      <Constellation
        variant="symbols"
        interactive
        className="absolute inset-0 lg:left-[44%] lg:w-[56%] h-full"
      />

      {/* vignette micro-UI: única permitida — notificação como card hairline */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute right-[8%] bottom-[18%] w-[300px] border border-white/10 rounded-3xl px-5 py-4"
      >
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-sm font-semibold text-bone">
            {HERO.notifications[0].sender}
          </span>
          <span className="text-xs text-smoke">
            {HERO.notifications[0].time}
          </span>
        </div>
        <p className="text-sm text-v3-ash leading-relaxed mt-1">
          {HERO.notifications[0].message}
        </p>
      </div>

      <div className="relative w-full max-w-[1200px] mx-auto px-6 pb-20 pt-36 lg:py-32">
        <div className="max-w-xl">
          <p className="v3-eyebrow text-smoke mb-6">
            {HERO.headlinePre.trim()}
          </p>

          <h1 className="text-[44px] sm:text-[64px] xl:text-[96px] leading-[0.9] xl:leading-[0.85]">
            {lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-8 text-base sm:text-lg text-v3-ash leading-relaxed max-w-[48ch]">
            {HERO.subheadlinePre}
            <strong className="font-semibold text-bone">
              {HERO.subheadlineStrong}
            </strong>
            {HERO.subheadlinePost}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={NAV_V3.ctaHref}
              className="inline-flex items-center justify-center rounded-full bg-plum-voltage text-bone font-semibold text-base px-8 py-4 min-h-12 hover:opacity-90 transition active:scale-[0.97]"
            >
              {HERO.ctaLabel}
            </a>
            <a
              href="#jornada"
              className="inline-flex items-center justify-center rounded-full border border-white/30 text-bone font-semibold text-base px-8 py-4 min-h-12 hover:border-white/70 transition active:scale-[0.97]"
            >
              Ver a jornada
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
