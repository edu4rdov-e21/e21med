"use client";

import Image from "next/image";
import { HOW_IT_WORKS } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

export default function HowItWorks() {
  const { ref, className } = useFadeIn<HTMLDivElement>();

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div ref={ref} className={className}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-navy text-center mb-14 sm:mb-20">
            {HOW_IT_WORKS.title}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-16 sm:mb-20">
            {HOW_IT_WORKS.phases.map((phase, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-8 sm:p-10 border ${
                  idx === 0
                    ? "bg-cream border-gray-200"
                    : "bg-navy text-cream border-navy"
                }`}
              >
                <div
                  className={`flex items-baseline gap-3 mb-6 ${
                    idx === 0 ? "text-navy" : "text-cream"
                  }`}
                >
                  <span
                    className={`text-xs font-semibold tracking-[0.2em] uppercase ${
                      idx === 0 ? "text-navy/60" : "text-cream/70"
                    }`}
                  >
                    {phase.tag}
                  </span>
                  <span
                    className={`text-xs ${
                      idx === 0 ? "text-navy/40" : "text-cream/50"
                    }`}
                  >
                    · {phase.duration}
                  </span>
                </div>
                <h3
                  className={`text-3xl sm:text-4xl mb-8 ${
                    idx === 0 ? "text-navy" : "text-cream"
                  }`}
                >
                  {phase.title}
                </h3>
                <ul className="space-y-4">
                  {phase.items.map((item, i) => (
                    <li
                      key={i}
                      className={`flex gap-3 text-base sm:text-lg leading-relaxed ${
                        idx === 0 ? "text-navy/85" : "text-cream/90"
                      }`}
                    >
                      <span
                        className={`mt-2 inline-block h-1.5 w-1.5 rounded-full flex-shrink-0 ${
                          idx === 0 ? "bg-navy" : "bg-cream"
                        }`}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="relative w-full aspect-video overflow-hidden rounded-xl ring-1 ring-navy/10">
            <Image
              src={HOW_IT_WORKS.photoSrc}
              alt={HOW_IT_WORKS.photoDescription}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
