"use client";

import { SPECIALTIES } from "@/lib/constants";

export default function Specialties() {
  const items = [...SPECIALTIES.items, ...SPECIALTIES.items];

  return (
    <section className="bg-white border-y border-navy/10 py-4 sm:py-5 overflow-hidden">
      <div className="flex items-center gap-4 sm:gap-8 lg:gap-12 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <span className="text-[9px] sm:text-[11px] font-semibold tracking-[0.2em] text-navy/50 uppercase whitespace-nowrap shrink-0">
          {SPECIALTIES.label}
        </span>
        <div
          className="flex-1 relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
          }}
        >
          <ul className="flex gap-8 sm:gap-10 w-max animate-scroll-x-fast">
            {items.map((s, i) => (
              <li
                key={i}
                className="text-sm sm:text-base text-navy/75 whitespace-nowrap"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
