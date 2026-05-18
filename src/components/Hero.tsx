"use client";

import { HERO } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

export default function Hero() {
  const { ref, className } = useFadeIn<HTMLDivElement>();

  return (
    <section
      className="relative overflow-hidden pt-[68%] lg:pt-20 lg:pb-20 lg:min-h-[720px] flex flex-col justify-end lg:flex-row lg:items-center lg:justify-center lg:gap-12 xl:gap-16 lg:px-10 xl:px-16"
      style={{
        background: `
          radial-gradient(circle at 1px 1px, rgba(250, 250, 250, 0.05) 1px, transparent 0) 0 0 / 28px 28px,
          radial-gradient(ellipse 70% 60% at 75% 40%, rgba(43, 108, 176, 0.22), transparent 60%),
          radial-gradient(ellipse 60% 50% at 15% 85%, rgba(43, 108, 176, 0.15), transparent 65%),
          linear-gradient(135deg, #0F2440 0%, #122B4A 50%, #0A1A30 100%)
        `,
      }}
    >
      <div
        className="
          absolute inset-0
          lg:relative lg:inset-auto lg:order-2
          lg:w-[440px] lg:h-[550px] lg:flex-shrink-0
          lg:rounded-2xl lg:overflow-hidden lg:ring-1 lg:ring-cream/10 lg:shadow-2xl
        "
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/video/takes-poster.jpg"
          className="w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src={HERO.videoSrc} type="video/mp4" />
        </video>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-full h-[65%] lg:hidden"
        style={{
          background:
            "linear-gradient(to top, rgba(15,36,64,0.96) 0%, rgba(15,36,64,0.7) 40%, rgba(15,36,64,0) 100%)",
        }}
      />

      <div className="relative z-10 lg:order-1 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-10 sm:pb-14 lg:p-0 lg:mx-0 lg:max-w-xl lg:flex-1">
        <div
          ref={ref}
          className={`${className} flex flex-col items-center text-center lg:items-start lg:text-left gap-5 sm:gap-7`}
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
