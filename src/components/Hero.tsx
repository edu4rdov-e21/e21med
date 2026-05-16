"use client";

import { HERO } from "@/lib/constants";
import PhotoPlaceholder from "./PhotoPlaceholder";
import NotificationPopup from "./NotificationPopup";
import { useFadeIn } from "@/hooks/useFadeIn";

const POPUP_POSITIONS: Record<string, string> = {
  "top-left":
    "top-2 -left-3 sm:-top-5 sm:-left-8 w-40 sm:w-56",
  "top-right":
    "-top-3 right-2 sm:-top-6 sm:-right-6 w-40 sm:w-56",
  "bottom-left":
    "bottom-6 -left-3 sm:bottom-10 sm:-left-10 w-44 sm:w-60",
  "bottom-right":
    "-bottom-4 right-2 sm:-bottom-8 sm:-right-10 w-48 sm:w-64",
};

const POPUP_DELAYS = [0.6, 1.0, 1.4, 1.8];

export default function Hero() {
  const { ref, className } = useFadeIn<HTMLDivElement>();

  return (
    <section className="bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-24 sm:pt-24 sm:pb-32 lg:pt-32 lg:pb-40">
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
            <div className="relative">
              <PhotoPlaceholder
                description={HERO.videoDescription}
                ratio="4:3"
              />
              {HERO.popups.map((popup, idx) => (
                <NotificationPopup
                  key={popup.id}
                  description={popup.description}
                  className={POPUP_POSITIONS[popup.position]}
                  delay={POPUP_DELAYS[idx]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
