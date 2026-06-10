"use client";

import { useState } from "react";
import Image from "next/image";
import { TESTIMONIALS } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";
import TestimonialLightbox from "./TestimonialLightbox";

type Item = (typeof TESTIMONIALS.items)[number];

export default function Testimonials() {
  const { ref, className } = useFadeIn<HTMLDivElement>();
  const [lightbox, setLightbox] = useState<Item | null>(null);
  const items = [...TESTIMONIALS.items, ...TESTIMONIALS.items];

  return (
    <section className="bg-white py-16 sm:py-24 overflow-hidden">
      <div ref={ref} className={className}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-navy text-center">
            {TESTIMONIALS.title}
          </h2>
        </div>

        <div
          className="relative"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
        >
          <ul className="flex gap-6 sm:gap-8 w-max animate-scroll-x items-center hover:[animation-play-state:paused] active:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
            {items.map((item, idx) => (
              <li
                key={`${item.src}-${idx}`}
                className="h-56 sm:h-72 lg:h-80 shrink-0"
              >
                <button
                  type="button"
                  onClick={() => setLightbox(item)}
                  aria-label={`Ampliar: ${item.alt}`}
                  className="h-full rounded-xl active:scale-[0.98] transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    sizes="(max-width: 640px) 600px, (max-width: 1024px) 800px, 1000px"
                    className="h-full w-auto rounded-xl ring-1 ring-navy/10 shadow-md object-contain"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {lightbox && (
        <TestimonialLightbox
          item={lightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
}
