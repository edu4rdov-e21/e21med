"use client";

import Image from "next/image";
import { TESTIMONIALS } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

export default function Testimonials() {
  const { ref, className } = useFadeIn<HTMLDivElement>();
  const items = [...TESTIMONIALS.items, ...TESTIMONIALS.items];

  return (
    <section className="bg-white py-20 sm:py-28 overflow-hidden">
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
          <ul className="flex gap-6 sm:gap-8 w-max animate-scroll-x items-center">
            {items.map((item, idx) => (
              <li
                key={`${item.src}-${idx}`}
                className="h-56 sm:h-72 lg:h-80 shrink-0"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(max-width: 640px) 600px, (max-width: 1024px) 800px, 1000px"
                  className="h-full w-auto rounded-xl ring-1 ring-navy/10 shadow-md object-contain"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
