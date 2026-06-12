"use client";

import Image from "next/image";
import { SOCIAL_PROOF } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

export default function SocialProof() {
  const { ref, className } = useFadeIn<HTMLDivElement>();
  const clients = [...SOCIAL_PROOF.clients, ...SOCIAL_PROOF.clients];

  return (
    <section className="bg-cream py-8 sm:py-12 overflow-hidden">
      <div ref={ref} className={className}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-10 sm:mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] text-navy/70 uppercase text-center">
            {SOCIAL_PROOF.label}
          </p>
        </div>

        {/* fades nas bordas via overlays estáticos: mask-image sobre o
            track animado re-rasteriza a camada a cada frame e trava */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-[6%] z-10 bg-gradient-to-r from-cream to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-[6%] z-10 bg-gradient-to-l from-cream to-transparent"
          />
          <ul
            className="flex gap-8 sm:gap-12 lg:gap-16 w-max animate-scroll-x"
            style={{ transform: "translateZ(0)" }}
          >
            {clients.map((client, idx) => (
              <li
                key={`${client.name}-${idx}`}
                className="flex flex-col items-center gap-3 sm:gap-4 w-28 sm:w-36 lg:w-40 shrink-0"
              >
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden ring-1 ring-navy/10 bg-photo-placeholder">
                  <Image
                    src={client.src}
                    alt={client.name}
                    fill
                    sizes="(max-width: 640px) 96px, (max-width: 1024px) 128px, 144px"
                    className="object-cover"
                  />
                </div>
                <span className="text-xs sm:text-sm text-navy font-semibold text-center leading-tight">
                  {client.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
