"use client";

import Image from "next/image";
import { HERO } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

export default function Hero() {
  const { ref, className } = useFadeIn<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-navy-dark pt-[68%] lg:pt-20 lg:pb-20 lg:min-h-[720px] flex flex-col justify-end lg:flex-row lg:items-center lg:justify-center lg:gap-12 xl:gap-16 lg:px-10 xl:px-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/e21-studio-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          opacity: 0.22,
          mixBlendMode: "luminosity",
        }}
      />
      <div
        className="
          absolute inset-0
          lg:relative lg:inset-auto lg:order-2
          lg:w-[440px] lg:h-[550px] lg:flex-shrink-0
        "
      >
        <div className="absolute inset-0 lg:rounded-2xl lg:overflow-hidden lg:ring-1 lg:ring-cream/15 lg:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
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

        <Image
          src={HERO.notifications[0].src}
          alt=""
          aria-hidden="true"
          width={HERO.notifications[0].width}
          height={HERO.notifications[0].height}
          className="absolute z-20 pointer-events-none animate-popup top-[8%] left-2 w-[55%] sm:w-[42%] lg:top-6 lg:-left-16 lg:w-[230px] drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
          style={{ animationDelay: "0.8s" }}
        />
        <Image
          src={HERO.notifications[1].src}
          alt=""
          aria-hidden="true"
          width={HERO.notifications[1].width}
          height={HERO.notifications[1].height}
          className="absolute z-20 pointer-events-none animate-popup top-[26%] right-2 w-[52%] sm:w-[40%] lg:top-[40%] lg:-right-20 lg:w-[230px] drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
          style={{ animationDelay: "1.2s" }}
        />
        <Image
          src={HERO.notifications[2].src}
          alt=""
          aria-hidden="true"
          width={HERO.notifications[2].width}
          height={HERO.notifications[2].height}
          className="absolute z-20 pointer-events-none animate-popup hidden sm:block top-[42%] left-4 w-[42%] lg:top-auto lg:bottom-4 lg:-left-20 lg:w-[250px] drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
          style={{ animationDelay: "1.6s" }}
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-full h-[65%] lg:hidden"
        style={{
          background:
            "linear-gradient(to top, rgba(15,36,64,0.96) 0%, rgba(15,36,64,0.7) 40%, rgba(15,36,64,0) 100%)",
        }}
      />

      <div className="relative z-10 lg:order-1 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-10 sm:pb-14 lg:p-0 lg:mx-0 lg:max-w-2xl lg:flex-1">
        <div
          ref={ref}
          className={`${className} flex flex-col items-center text-center lg:items-start lg:text-left gap-5 sm:gap-7`}
        >
          <div className="flex flex-col items-center lg:items-start gap-3">
            <Image
              src="/logos/e21-med.svg"
              alt={HERO.badge}
              width={1712}
              height={1286}
              priority
              className="w-32 sm:w-40 lg:w-44 h-auto"
              style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.3))" }}
            />
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

          <h1
            className="text-lg sm:text-2xl lg:text-3xl text-cream font-bold leading-[1.25] sm:leading-[1.2]"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.35)" }}
          >
            {HERO.headlinePre.trimEnd()}
            <br />
            <span className="marker">{HERO.headlineHighlight}</span>
            {HERO.headlinePost}
          </h1>

          <p
            className="text-sm sm:text-base lg:text-lg text-cream/70 leading-relaxed max-w-xl"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}
          >
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
