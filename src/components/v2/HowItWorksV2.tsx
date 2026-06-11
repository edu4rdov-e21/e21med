"use client";

import Image from "next/image";
import { HOW_IT_WORKS } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

export default function HowItWorksV2() {
  const { ref, className } = useFadeIn<HTMLDivElement>();
  const { milestones, title, subtitle } = HOW_IT_WORKS;

  return (
    <section className="bg-parchment py-16 sm:py-24">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
        <div
          ref={ref}
          className={`${className} text-center max-w-2xl mx-auto mb-12 sm:mb-16`}
        >
          <h2 className="font-v2-display text-3xl sm:text-5xl text-ink leading-[1.1] mb-4">
            {title}
          </h2>
          <p className="text-base text-graphite leading-relaxed">{subtitle}</p>
        </div>

        <ol className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 list-none">
          {milestones.map((m, i) => (
            <li
              key={m.monthLabel}
              className="bg-aged-paper rounded-3xl p-8 sm:p-10 flex flex-col gap-4"
            >
              <span className="font-v2-sans font-semibold text-sm text-terracotta-seal">
                {String(i + 1).padStart(2, "0")} · {m.phaseLabel}
              </span>
              <h3 className="font-v2-display text-3xl text-ink leading-tight">
                Mês {m.monthLabel} ·{" "}
                <em className="font-light italic">{m.title}</em>
              </h3>
              <p className="text-base text-charcoal leading-relaxed">
                {m.summary}
              </p>

              <ul className="flex flex-wrap gap-y-1.5">
                {m.shortItems.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-center text-sm text-charcoal"
                  >
                    {j > 0 && (
                      <span
                        aria-hidden="true"
                        className="text-terracotta-seal px-3 select-none"
                      >
                        ·
                      </span>
                    )}
                    {item}
                  </li>
                ))}
              </ul>

              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl mt-2">
                <Image
                  src={m.videoPoster}
                  alt={m.photoDescription}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                />
              </div>

              <p className="font-v2-display italic font-light text-lg text-charcoal leading-relaxed mt-1">
                {m.closing}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
