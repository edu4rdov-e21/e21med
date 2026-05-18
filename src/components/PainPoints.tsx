"use client";

import { PAIN_POINTS } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

export default function PainPoints() {
  const { ref, className } = useFadeIn<HTMLDivElement>();

  return (
    <section className="bg-cream pt-10 sm:pt-28 pb-20 sm:pb-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div ref={ref} className={className}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-navy text-center mb-12 sm:mb-16">
            {PAIN_POINTS.title}
          </h2>
          <div className="grid grid-cols-3 gap-2 sm:gap-6 lg:gap-8">
            {PAIN_POINTS.cards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <span className="block text-navy/40 text-[10px] sm:text-sm font-semibold mb-2 sm:mb-4">
                  0{idx + 1}
                </span>
                <p className="text-navy text-xs sm:text-lg leading-snug sm:leading-relaxed">
                  {card}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
