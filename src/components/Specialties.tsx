"use client";

import { SPECIALTIES } from "@/lib/constants";

export default function Specialties() {
  const items = [...SPECIALTIES.items, ...SPECIALTIES.items];
  // segunda linha começa em outro ponto da lista pra não espelhar a primeira
  const reversed = [
    ...SPECIALTIES.items.slice(5),
    ...SPECIALTIES.items.slice(0, 5),
    ...SPECIALTIES.items.slice(5),
    ...SPECIALTIES.items.slice(0, 5),
  ];

  return (
    <section className="bg-white border-y border-navy/10 py-8 sm:py-12 overflow-hidden">
      <div
        className="relative overflow-hidden flex flex-col gap-4 sm:gap-5"
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
              className="text-sm sm:text-base text-navy/70 whitespace-nowrap"
            >
              {s}
            </li>
          ))}
        </ul>
        <ul
          aria-hidden="true"
          className="flex gap-8 sm:gap-10 w-max animate-scroll-x-fast"
          style={{ animationDirection: "reverse" }}
        >
          {reversed.map((s, i) => (
            <li
              key={i}
              className="text-sm sm:text-base text-navy/70 whitespace-nowrap"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
