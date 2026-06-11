"use client";

import Image from "next/image";
import { TEAM } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

export default function TeamV2() {
  const { ref, className } = useFadeIn<HTMLDivElement>();

  return (
    <section className="bg-aged-paper py-16 sm:py-24">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
        <div ref={ref} className={className}>
          <h2 className="font-v2-display text-3xl sm:text-5xl text-ink text-center leading-[1.1] max-w-3xl mx-auto mb-12 sm:mb-16">
            {TEAM.title}
          </h2>

          <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] overflow-hidden rounded-3xl mb-14 sm:mb-20">
            <Image
              src={TEAM.groupPhoto.src}
              alt={TEAM.groupPhoto.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 1280px"
              quality={92}
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
            {TEAM.members.map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-1 ring-warm-taupe">
                  <Image
                    src={member.src}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 96px, 128px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <h3 className="font-v2-sans font-semibold text-sm sm:text-base text-ink leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-sm text-graphite leading-snug">
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
