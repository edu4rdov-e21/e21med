"use client";

import Image from "next/image";
import PhotoPlaceholder from "./PhotoPlaceholder";
import { useFadeIn } from "@/hooks/useFadeIn";

interface PhotoDividerProps {
  description: string;
  src?: string;
  peek?: boolean;
}

export default function PhotoDivider({
  description,
  src,
  peek = false,
}: PhotoDividerProps) {
  const { ref, className } = useFadeIn<HTMLDivElement>();

  return (
    <section className="bg-cream py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div ref={ref} className={className}>
          {src ? (
            <div
              className={`relative w-full overflow-hidden rounded-xl ring-1 ring-navy/10 shadow-[0_20px_50px_-12px_rgba(26,54,93,0.25)] ${
                peek
                  ? "aspect-[16/7] sm:aspect-[3/1]"
                  : "aspect-video sm:aspect-[21/9]"
              }`}
            >
              <Image
                src={src}
                alt={description}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
                priority={false}
              />
            </div>
          ) : (
            <PhotoPlaceholder description={description} ratio="16:9" />
          )}
        </div>
      </div>
    </section>
  );
}
