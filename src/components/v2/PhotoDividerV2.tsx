"use client";

import Image from "next/image";
import { useFadeIn } from "@/hooks/useFadeIn";

export default function PhotoDividerV2({
  description,
  src,
}: {
  description: string;
  src: string;
}) {
  const { ref, className } = useFadeIn<HTMLDivElement>();

  return (
    <section className="bg-aged-paper py-10 sm:py-16">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
        <div ref={ref} className={className}>
          <div className="relative w-full aspect-[16/7] sm:aspect-[3/1] overflow-hidden rounded-3xl">
            <Image
              src={src}
              alt={description}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover parallax-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
