"use client";

import { useState } from "react";
import Image from "next/image";
import type { HOW_IT_WORKS } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

type Milestone = (typeof HOW_IT_WORKS.milestones)[number];

export default function TimelineMilestone({
  milestone,
}: {
  milestone: Milestone;
}) {
  const { ref, className } = useFadeIn<HTMLDivElement>();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li className="relative pl-9 pb-12 last:pb-0">
      {/* dot fora do wrapper de fade: o transform do wrapper viraria
          containing block e desalinharia o absolute */}
      <span
        aria-hidden="true"
        className="absolute left-3 top-1 w-[22px] h-[22px] -translate-x-1/2 rounded-full bg-white ring-2 ring-navy flex items-center justify-center"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-navy" />
      </span>

      <div ref={ref} className={className}>
        <span className="block text-xs font-semibold tracking-[0.2em] uppercase text-navy/70">
          {milestone.phaseLabel}
        </span>
        <h3 className="text-2xl text-navy mt-1 leading-tight">
          <span className="text-navy/70">Mês {milestone.monthLabel}</span>
          <span className="mx-2 text-navy/40">·</span>
          {milestone.title}
        </h3>

        {/* No mobile só o poster: 4 vídeos autoplay empilhados pesam demais */}
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg ring-1 ring-navy/10 bg-photo-placeholder mt-4">
          <Image
            src={milestone.videoPoster}
            alt={milestone.photoDescription}
            fill
            sizes="(max-width: 1024px) 100vw, 0px"
            className="object-cover grayscale"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-navy/30"
          />
        </div>

        <p className="text-base text-navy/70 leading-relaxed mt-4">
          {milestone.summary}
        </p>

        <ul className="space-y-2 mt-3">
          {milestone.shortItems.map((item, i) => (
            <li key={i} className="flex gap-3 text-sm text-navy/70">
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
            <ul className="space-y-3 pt-4 border-t border-navy/10">
              {milestone.detailItems.map((item, i) => {
                const colonIdx = item.indexOf(":");
                if (colonIdx > 0) {
                  return (
                    <li
                      key={i}
                      className="text-sm text-navy/70 leading-snug"
                    >
                      <span className="font-semibold text-navy">
                        {item.slice(0, colonIdx)}
                      </span>
                      <span>{item.slice(colonIdx)}</span>
                    </li>
                  );
                }
                return (
                  <li key={i} className="text-sm text-navy/70 leading-snug">
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <p className="italic text-sm text-navy/70 leading-relaxed border-l-2 border-navy/20 pl-4 mt-4">
          {milestone.closing}
        </p>
      </div>
    </li>
  );
}
