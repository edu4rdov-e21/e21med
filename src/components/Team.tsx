"use client";

import Image from "next/image";
import { TEAM } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

export default function Team() {
  const { ref, className } = useFadeIn<HTMLDivElement>();

  return (
    <section className="bg-cream py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div ref={ref} className={className}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-navy text-center mb-12 sm:mb-16 max-w-3xl mx-auto leading-tight">
            {TEAM.title}
          </h2>

          <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] overflow-hidden rounded-xl ring-1 ring-navy/10 shadow-lg mb-14 sm:mb-20">
            <Image
              src={TEAM.groupPhoto.src}
              alt={TEAM.groupPhoto.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority={false}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {TEAM.members.map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center text-center gap-3 sm:gap-4"
              >
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden ring-1 ring-navy/10 bg-photo-placeholder">
                  <Image
                    src={member.src}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 112px, (max-width: 1024px) 144px, 160px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-base sm:text-lg text-navy leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-navy/70 leading-snug">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
