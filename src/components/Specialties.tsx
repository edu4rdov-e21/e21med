"use client";

import { SPECIALTIES } from "@/lib/constants";

export default function Specialties() {
  const items = [...SPECIALTIES.items, ...SPECIALTIES.items];

  return (
    <section className="bg-white border-y border-navy/10 py-4 sm:py-5 overflow-hidden">
      <div
        className="relative overflow-hidden"
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
    </section>
  );
}
