"use client";

import { useState } from "react";
import type { HOW_IT_WORKS } from "@/lib/constants";
import Constellation from "./Constellation";

type Milestone = (typeof HOW_IT_WORKS.milestones)[number];

/**
 * Uma fase da jornada: a densidade da constelação cresce com o índice —
 * Mês 01 esparso, Mês 06 cluster denso. A audiência se formando, fase a fase.
 */
export default function JourneyPhase({
  milestone,
  index,
  total,
}: {
  milestone: Milestone;
  index: number;
  total: number;
}) {
  const [open, setOpen] = useState(false);
  const intensity = (index + 1) / total;
  const flip = index % 2 === 1;

  return (
    <li className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div
        className={`relative h-[280px] lg:h-[360px] ${
          flip ? "lg:order-2" : ""
        }`}
      >
        <Constellation
          variant="phase"
          intensity={intensity}
          className="absolute inset-0 w-full h-full"
        />
      </div>

      <div className={flip ? "lg:order-1" : ""}>
        <p className="v3-eyebrow text-plum-voltage mb-4">
          {String(index + 1).padStart(2, "0")} · {milestone.phaseLabel}
        </p>
        <h3 className="text-4xl sm:text-[44px] leading-[1.05]">
          Mês {milestone.monthLabel} · {milestone.title}
        </h3>
        <p className="mt-5 text-base sm:text-lg text-v3-ash leading-relaxed max-w-[48ch]">
          {milestone.summary}
        </p>

        <ul className="mt-5 flex flex-wrap gap-y-1.5 max-w-[52ch]">
          {milestone.shortItems.map((item, j) => (
            <li
              key={j}
              className="flex items-baseline text-sm text-v3-ash"
            >
              {j > 0 && (
                <span
                  aria-hidden="true"
                  className="text-plum-voltage px-3 select-none"
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
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-6 min-h-11 inline-flex items-center gap-2 text-sm font-semibold text-bone hover:text-v3-ash transition active:scale-[0.97] rounded-full"
        >
          <span>{open ? "Ocultar detalhes" : "Ver detalhes"}</span>
          <span
            aria-hidden="true"
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          >
            ↓
          </span>
        </button>

        <div
          className="grid transition-[grid-template-rows] duration-300 ease-out"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <ul className="space-y-3 pt-5">
              {milestone.detailItems.map((item, j) => (
                <li
                  key={j}
                  className="text-sm text-v3-ash leading-relaxed max-w-[52ch]"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-base text-smoke leading-relaxed max-w-[48ch]">
              {milestone.closing}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}
