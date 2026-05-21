"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { HOW_IT_WORKS } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

export default function HowItWorks() {
  const { ref, className } = useFadeIn<HTMLDivElement>();
  const [activeTab, setActiveTab] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const { milestones, title, subtitle } = HOW_IT_WORKS;
  const active = milestones[activeTab];

  function changeTab(i: number) {
    if (i === activeTab) return;
    setActiveTab(i);
    setShowDetails(false);
  }

  function handleTabKey(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const last = milestones.length - 1;
    let next = i;
    if (e.key === "ArrowRight") next = i === last ? 0 : i + 1;
    else if (e.key === "ArrowLeft") next = i === 0 ? last : i - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    changeTab(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div
          ref={ref}
          className={`${className} text-center max-w-2xl mx-auto mb-12 sm:mb-16`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-navy mb-4 sm:mb-5 leading-snug">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-navy/70 leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="overflow-x-auto -mx-6 sm:mx-0 mb-10 sm:mb-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div
            role="tablist"
            aria-label="Etapas da jornada"
            className="flex gap-2 sm:gap-3 px-6 sm:px-0 sm:grid sm:grid-cols-4 snap-x snap-mandatory"
          >
            {milestones.map((m, i) => {
              const isActive = i === activeTab;
              return (
                <button
                  key={i}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${i}`}
                  aria-selected={isActive}
                  aria-controls={`tabpanel-${i}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => changeTab(i)}
                  onKeyDown={(e) => handleTabKey(e, i)}
                  className={`shrink-0 sm:shrink snap-start text-left px-4 py-3 sm:px-5 sm:py-4 rounded-lg border transition-colors duration-200 ${
                    isActive
                      ? "bg-navy text-cream border-navy"
                      : "bg-transparent text-navy border-navy/15 hover:border-navy/40"
                  }`}
                >
                  <span
                    className={`block text-xs font-semibold tracking-[0.2em] uppercase ${
                      isActive ? "text-cream/70" : "text-navy/70"
                    }`}
                  >
                    {m.phaseLabel}
                  </span>
                  <span className="block text-sm sm:text-base font-semibold mt-1 whitespace-nowrap sm:whitespace-normal">
                    <span
                      className={
                        isActive ? "text-cream/70" : "text-navy/70"
                      }
                    >
                      Mês {m.monthLabel}
                    </span>{" "}
                    · {m.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          role="tabpanel"
          id={`tabpanel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start"
        >
          <div
            key={`photo-${activeTab}`}
            className="animate-fade-in lg:sticky lg:top-8"
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg ring-1 ring-navy/10 bg-photo-placeholder">
              <video
                key={active.videoSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={active.videoPoster}
                aria-label={active.photoDescription}
                className="w-full h-full object-cover"
              >
                <source src={active.videoSrc} type="video/mp4" />
              </video>
            </div>
          </div>

          <div
            key={`content-${activeTab}`}
            className="animate-fade-in flex flex-col gap-5"
          >
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-navy/70">
                {active.phaseLabel}
              </span>
              <h3 className="text-3xl sm:text-4xl text-navy mt-2 leading-tight">
                <span className="text-navy/70">Mês {active.monthLabel}</span>
                <span className="mx-2 text-navy/40">·</span>
                {active.title}
              </h3>
            </div>

            <p className="text-base sm:text-lg text-navy/70 leading-relaxed">
              {active.summary}
            </p>

            <ul className="space-y-2.5">
              {active.shortItems.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-sm sm:text-base text-navy/70"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1 w-1 rounded-full bg-navy/40 flex-shrink-0"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setShowDetails((v) => !v)}
              className="self-start inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-navy hover:text-navy-light transition-colors"
            >
              <span>{showDetails ? "Ocultar detalhes" : "Ver detalhes"}</span>
              <span
                aria-hidden="true"
                className={`transition-transform duration-300 ${
                  showDetails ? "rotate-180" : ""
                }`}
              >
                ↓
              </span>
            </button>

            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{
                gridTemplateRows: showDetails ? "1fr" : "0fr",
              }}
            >
              <div className="overflow-hidden">
                <ul className="space-y-3 pt-4 border-t border-navy/10">
                  {active.detailItems.map((item, i) => {
                    const colonIdx = item.indexOf(":");
                    if (colonIdx > 0) {
                      return (
                        <li
                          key={i}
                          className="text-sm sm:text-base text-navy/70 leading-snug"
                        >
                          <span className="font-semibold text-navy">
                            {item.slice(0, colonIdx)}
                          </span>
                          <span>{item.slice(colonIdx)}</span>
                        </li>
                      );
                    }
                    return (
                      <li
                        key={i}
                        className="text-sm sm:text-base text-navy/70 leading-snug"
                      >
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <p className="italic text-sm sm:text-base text-navy/70 leading-relaxed border-l-2 border-navy/20 pl-4 mt-2">
              {active.closing}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
