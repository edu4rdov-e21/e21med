"use client";

import { TESTIMONIALS } from "@/lib/constants";
import PhotoPlaceholder from "./PhotoPlaceholder";
import { useFadeIn } from "@/hooks/useFadeIn";

export default function Testimonials() {
  const { ref, className } = useFadeIn<HTMLDivElement>();

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div ref={ref} className={className}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-navy text-center mb-14 sm:mb-20">
            {TESTIMONIALS.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {TESTIMONIALS.items.map((item, idx) => (
              <div
                key={idx}
                className="bg-cream rounded-xl p-8 border border-gray-200 flex flex-col"
              >
                <p className="text-navy/85 text-base sm:text-lg leading-relaxed italic mb-8 flex-1">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 flex-shrink-0">
                    <PhotoPlaceholder
                      description={item.photoDescription}
                      ratio="1:1"
                      rounded
                    />
                  </div>
                  <div>
                    <p className="text-navy font-semibold">{item.name}</p>
                    <p className="text-navy/60 text-sm">{item.specialty}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
