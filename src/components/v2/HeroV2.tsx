import Image from "next/image";
import { HERO } from "@/lib/constants";

export default function HeroV2() {
  return (
    <section className="relative min-h-[88vh] flex items-end overflow-hidden">
      <Image
        src="/images/studio-geral.jpg"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* overlay escuro warm (~60%) pra manter o headline legível */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(42,43,47,0.82) 0%, rgba(42,43,47,0.55) 45%, rgba(42,43,47,0.35) 100%)",
        }}
      />

      <div className="relative w-full max-w-[1280px] mx-auto px-6 sm:px-10 pb-16 sm:pb-24 pt-40">
        <p className="font-v2-mono text-[11px] uppercase tracking-wide text-parchment/90 mb-5">
          {HERO.badge} · {HERO.subBadgePre.trim()}{" "}
          <a
            href={HERO.subBadgeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-parchment"
          >
            {HERO.subBadgeHandle}
          </a>
        </p>

        <h1 className="font-v2-display text-parchment text-4xl sm:text-6xl lg:text-[80px] leading-[0.95] max-w-4xl">
          {HERO.headlinePre.trimEnd()}{" "}
          <em className="font-light italic">{HERO.headlineHighlight}</em>
          {HERO.headlinePost}
        </h1>

        <p className="mt-6 text-base sm:text-lg font-light leading-relaxed text-parchment/80 max-w-xl">
          {HERO.subheadlinePre}
          <strong className="font-semibold text-parchment">
            {HERO.subheadlineStrong}
          </strong>
          {HERO.subheadlinePost}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href="#formulario-v2"
            className="inline-flex items-center justify-center rounded-[40px] bg-terracotta-seal text-parchment font-semibold text-base px-7 py-3.5 hover:opacity-90 transition active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-parchment focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            {HERO.ctaLabel}
          </a>
          <a
            href="#carta-v2"
            className="inline-flex items-center justify-center rounded-[40px] border-[1.5px] border-parchment/70 text-parchment font-semibold text-base px-7 py-3.5 hover:bg-parchment/10 transition active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-parchment focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Abrir a carta
          </a>
        </div>
      </div>
    </section>
  );
}
