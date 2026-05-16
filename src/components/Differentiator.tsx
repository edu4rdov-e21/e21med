"use client";

import { DIFFERENTIATOR } from "@/lib/constants";
import PhotoPlaceholder from "./PhotoPlaceholder";
import { useFadeIn } from "@/hooks/useFadeIn";

export default function Differentiator() {
  const { ref, className } = useFadeIn<HTMLDivElement>();

  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div ref={ref} className={className}>
          <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-navy mb-6 sm:mb-8">
              {DIFFERENTIATOR.title}
            </h2>
            <p className="text-lg sm:text-xl text-navy/75 leading-relaxed">
              {DIFFERENTIATOR.body}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {DIFFERENTIATOR.photos.map((desc, idx) => (
              <PhotoPlaceholder key={idx} description={desc} ratio="4:3" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
