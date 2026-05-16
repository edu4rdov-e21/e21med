"use client";

import { HERO } from "@/lib/constants";
import PhotoPlaceholder from "./PhotoPlaceholder";
import { useFadeIn } from "@/hooks/useFadeIn";

export default function Hero() {
  const { ref, className } = useFadeIn<HTMLDivElement>();

  return (
    <section className="bg-cream">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-36">
        <div
          ref={ref}
          className={`${className} grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center`}
        >
          <div className="flex flex-col gap-6 sm:gap-8">
            <span className="inline-flex items-center self-start rounded-full border border-navy/20 px-3 py-1 text-xs font-medium tracking-[0.2em] text-navy uppercase">
              {HERO.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-navy">
              {HERO.headline}
            </h1>
            <p className="text-lg sm:text-xl text-navy/75 max-w-xl leading-relaxed">
              {HERO.subheadline}
            </p>
            <a
              href={HERO.ctaHref}
              className="inline-flex items-center justify-center self-start rounded-full bg-navy text-cream px-8 py-4 text-base font-semibold hover:bg-navy-light transition-colors duration-300"
            >
              {HERO.ctaLabel}
            </a>
          </div>
          <div className="lg:pl-8">
            <PhotoPlaceholder
              description={HERO.imageDescription}
              ratio="4:3"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
