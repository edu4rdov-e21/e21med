"use client";

import { HERO } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

export default function Hero() {
  const { ref, className } = useFadeIn<HTMLDivElement>();

  return (
    <section className="relative flex flex-col justify-end overflow-hidden bg-navy-dark pt-[68%] lg:pt-0 lg:min-h-[640px] lg:justify-center">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/video/takes-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source src={HERO.videoSrc} type="video/mp4" />
      </video>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-full h-[65%] lg:hidden"
        style={{
          background:
            "linear-gradient(to top, rgba(15,36,64,0.96) 0%, rgba(15,36,64,0.7) 40%, rgba(15,36,64,0) 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(to right, rgba(15,36,64,0.92) 0%, rgba(15,36,64,0.6) 50%, rgba(15,36,64,0) 100%)",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-10 sm:pb-14 lg:py-20">
        <div
          ref={ref}
          className={`${className} flex flex-col items-center text-center lg:items-start lg:text-left lg:max-w-2xl gap-5 sm:gap-7`}
        >
          <div className="flex flex-col items-center lg:items-start gap-2">
            <span className="inline-flex items-center rounded-full px-3 py-1.5 bg-cream/10 backdrop-blur-md border border-cream/20 text-[10px] sm:text-xs font-semibold tracking-[0.22em] text-cream uppercase">
              {HERO.badge}
            </span>
            <p className="text-[11px] sm:text-xs text-cream/60">
              {HERO.subBadgePre}
              <a
                href={HERO.subBadgeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/80 font-medium hover:text-cream transition-colors"
              >
                {HERO.subBadgeHandle}
              </a>
            </p>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl text-cream leading-[1.2] sm:leading-[1.15]">
            {HERO.headlinePre}
            <em className="italic">{HERO.headlineHighlight}</em>
            {HERO.headlinePost}
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-cream/70 leading-relaxed max-w-xl">
            {HERO.subheadlinePre}
            <strong className="text-cream font-bold">
              {HERO.subheadlineStrong}
            </strong>
            {HERO.subheadlinePost}
          </p>

          <a
            href={HERO.ctaHref}
            className="inline-flex items-center justify-center rounded-full bg-cream text-navy px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold hover:bg-white transition-colors duration-300"
          >
            {HERO.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
