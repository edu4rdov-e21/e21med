"use client";

import { useEffect, useRef, useState } from "react";
import type { HOW_IT_WORKS } from "@/lib/constants";

type Milestone = (typeof HOW_IT_WORKS.milestones)[number];

/** Card enxuto de um mês da jornada (deck mobile). O vídeo toca só
    enquanto o card está visível (IO cobre a interseção horizontal do
    track também); com prefers-reduced-motion fica no poster. */
export default function JourneyCard({
  milestone,
  index,
}: {
  milestone: Milestone;
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(v);
    return () => observer.disconnect();
  }, []);

  return (
    <article className="h-full bg-white rounded-2xl ring-1 ring-navy/10 shadow-[0_16px_40px_-16px_rgba(26,54,93,0.25)] overflow-hidden">
      <div className="relative w-full aspect-video bg-photo-placeholder">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={milestone.videoPoster}
          aria-label={milestone.photoDescription}
          className="w-full h-full object-cover grayscale"
        >
          <source src={milestone.videoSrc} type="video/mp4" />
        </video>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-navy/30 z-10"
          style={{ transform: "translateZ(0)" }}
        />
        <span className="absolute top-3 left-3 z-20 inline-flex items-center rounded-full bg-navy-dark/80 backdrop-blur-sm text-cream text-xs font-semibold uppercase tracking-[0.15em] px-3 py-1.5">
          {String(index + 1).padStart(2, "0")} · {milestone.phaseLabel}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-2xl text-navy leading-tight">
          <span className="text-navy/70">Mês {milestone.monthLabel}</span>
          <span className="mx-2 text-navy/40">·</span>
          {milestone.title}
        </h3>

        <p className="text-sm text-navy/70 leading-relaxed mt-2">
          {milestone.summary}
        </p>

        <ul className="flex flex-wrap gap-y-1 mt-3">
          {milestone.shortItems.map((item, j) => (
            <li
              key={j}
              className="flex items-baseline text-[13px] text-navy/70"
            >
              {j > 0 && (
                <span
                  aria-hidden="true"
                  className="text-navy/35 px-2 select-none"
                >
                  ·
                </span>
              )}
              {item}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setShowDetails((v) => !v)}
          aria-expanded={showDetails}
          className="mt-3 min-h-11 inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-navy-light active:scale-[0.97] transition-[color,transform] focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
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
          style={{ gridTemplateRows: showDetails ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <ul className="space-y-2.5 pt-3 border-t border-navy/10">
              {milestone.detailItems.map((item, j) => {
                const colonIdx = item.indexOf(":");
                if (colonIdx > 0) {
                  return (
                    <li
                      key={j}
                      className="text-[13px] text-navy/70 leading-snug"
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
                    key={j}
                    className="text-[13px] text-navy/70 leading-snug"
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <p className="italic text-[13px] text-navy/70 leading-relaxed border-l-2 border-navy/20 pl-3 mt-3">
          {milestone.closing}
        </p>
      </div>
    </article>
  );
}
