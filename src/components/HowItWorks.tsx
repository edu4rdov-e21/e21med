"use client";

import { useEffect, useRef, useState } from "react";
import { HOW_IT_WORKS } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

type Milestone = (typeof HOW_IT_WORKS)["milestones"][number];

function MilestoneCard({
  milestone,
  visible,
  delay,
}: {
  milestone: Milestone;
  visible: boolean;
  delay: number;
}) {
  const isPhase2 = milestone.phase === 2;
  return (
    <div
      className={`relative p-6 sm:p-7 rounded-xl ${
        isPhase2
          ? "bg-navy text-cream shadow-lg"
          : "bg-white text-navy ring-1 ring-navy/10 shadow-sm"
      } ${visible ? "animate-fade-in-up" : "opacity-0"}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-baseline gap-3 mb-3">
        <span
          className={`font-serif text-3xl sm:text-4xl leading-none ${
            isPhase2 ? "text-cream/85" : "text-navy/60"
          }`}
        >
          {milestone.monthLabel}
        </span>
        <span
          className={`text-[10px] font-semibold tracking-[0.18em] uppercase whitespace-nowrap ${
            isPhase2 ? "text-cream/60" : "text-navy/50"
          }`}
        >
          {milestone.phaseLabel}
        </span>
      </div>
      <h3
        className={`text-lg sm:text-xl mb-4 leading-tight ${
          isPhase2 ? "text-cream" : "text-navy"
        }`}
      >
        {milestone.title}
      </h3>
      <ul className="space-y-2 mb-5">
        {milestone.items.map((item, i) => (
          <li
            key={i}
            className={`text-sm flex gap-2 leading-snug ${
              isPhase2 ? "text-cream/85" : "text-navy/80"
            }`}
          >
            <span
              className={`mt-1.5 inline-block h-1 w-1 rounded-full flex-shrink-0 ${
                isPhase2 ? "bg-cream/60" : "bg-navy/40"
              }`}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p
        className={`italic text-xs sm:text-sm leading-snug ${
          isPhase2 ? "text-cream/70" : "text-navy/65"
        }`}
      >
        &ldquo;{milestone.tom}&rdquo;
      </p>
    </div>
  );
}

function Dot({ phase2 }: { phase2: boolean }) {
  return (
    <span
      className={`block w-4 h-4 rounded-full ring-4 ring-cream relative z-10 ${
        phase2 ? "bg-navy" : "bg-navy"
      }`}
    />
  );
}

export default function HowItWorks() {
  const { ref: headRef, className: headClass } = useFadeIn<HTMLDivElement>();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const node = timelineRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const { milestones, deliverables } = HOW_IT_WORKS;

  return (
    <section className="bg-cream pt-20 sm:pt-28 pb-10 sm:pb-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div ref={headRef} className={`${headClass} text-center mb-14 sm:mb-20 max-w-3xl mx-auto`}>
          <h2 className="text-xl sm:text-2xl lg:text-3xl text-navy mb-5 sm:mb-6 leading-snug">
            {HOW_IT_WORKS.title}
          </h2>
          <p className="text-sm sm:text-base text-navy/70 leading-relaxed">
            {HOW_IT_WORKS.subtitle}
          </p>
        </div>

        <div ref={timelineRef}>
        <div className="hidden lg:block relative">
          <div className="grid grid-cols-4 gap-6 items-end mb-10">
            <MilestoneCard
              milestone={milestones[0]}
              visible={animate}
              delay={0}
            />
            <div />
            <MilestoneCard
              milestone={milestones[2]}
              visible={animate}
              delay={400}
            />
            <div />
          </div>

          <div className="relative">
            <div
              className="absolute left-[12.5%] right-[12.5%] top-1/2 -translate-y-1/2 h-0.5 bg-navy/30"
              aria-hidden="true"
            />
            <div className="absolute left-1/2 top-[calc(50%-24px)] -translate-x-1/2 bg-cream px-3 py-0.5 text-[10px] font-semibold tracking-[0.22em] text-navy/60 uppercase whitespace-nowrap">
              Fase 2 →
            </div>
            <div className="relative grid grid-cols-4 py-3">
              {milestones.map((m, i) => (
                <div key={i} className="flex justify-center">
                  <Dot phase2={m.phase === 2} />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6 items-start mt-10">
            <div />
            <MilestoneCard
              milestone={milestones[1]}
              visible={animate}
              delay={200}
            />
            <div />
            <MilestoneCard
              milestone={milestones[3]}
              visible={animate}
              delay={600}
            />
          </div>
        </div>

        <div className="lg:hidden">
          <ul className="relative">
            {milestones.map((m, i) => (
              <li key={i} className="flex gap-5 pb-10 last:pb-0">
                <div className="flex flex-col items-center pt-2 shrink-0">
                  <Dot phase2={m.phase === 2} />
                  {i < milestones.length - 1 && (
                    <div className="w-0.5 flex-1 bg-navy/30 mt-1" />
                  )}
                </div>
                <div className="flex-1">
                  {i === 2 && (
                    <div className="-mt-1 mb-3 text-[10px] font-semibold tracking-[0.22em] text-navy/60 uppercase">
                      Fase 2 →
                    </div>
                  )}
                  <MilestoneCard
                    milestone={m}
                    visible={animate}
                    delay={i * 150}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
        </div>

        <div className="mt-14 sm:mt-20 bg-photo-placeholder rounded-xl px-6 sm:px-10 py-5 sm:py-6">
          <ul className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 sm:gap-0 text-navy">
            {deliverables.map((item, i) => (
              <li
                key={i}
                className="flex items-center justify-center text-sm sm:text-base font-medium text-center"
              >
                <span>{item}</span>
                {i < deliverables.length - 1 && (
                  <span
                    className="hidden sm:inline-block mx-4 lg:mx-8 text-navy/40"
                    aria-hidden="true"
                  >
                    ·
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
