"use client";

import Image from "next/image";
import { TESTIMONIALS } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

export default function Testimonials() {
  const { ref, className } = useFadeIn<HTMLDivElement>();

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        <div ref={ref} className={className}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-navy text-center mb-14 sm:mb-20">
            {TESTIMONIALS.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
            {TESTIMONIALS.items.map((item, idx) => (
              <div
                key={idx}
                className="relative w-full rounded-xl overflow-hidden ring-1 ring-navy/10 shadow-md self-start"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1200}
                  height={800}
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="w-full h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
