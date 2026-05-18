"use client";

import Image from "next/image";
import { SOCIAL_PROOF } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

export default function SocialProof() {
  const { ref, className } = useFadeIn<HTMLDivElement>();
  const clients = [...SOCIAL_PROOF.clients, ...SOCIAL_PROOF.clients];

  return (
    <section className="bg-cream py-16 sm:py-20 overflow-hidden">
      <div ref={ref} className={className}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-10 sm:mb-14">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-navy/60 uppercase text-center">
            {SOCIAL_PROOF.label}
          </p>
        </div>

        <div
          className="relative"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
        >
          <ul className="flex gap-8 sm:gap-12 lg:gap-16 w-max animate-scroll-x">
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
                <span className="text-xs sm:text-sm text-navy font-medium text-center leading-tight">
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
