"use client";

import Image from "next/image";
import PhotoPlaceholder from "./PhotoPlaceholder";
import { useFadeIn } from "@/hooks/useFadeIn";

interface PhotoDividerProps {
  description: string;
  src?: string;
}

export default function PhotoDivider({ description, src }: PhotoDividerProps) {
  const { ref, className } = useFadeIn<HTMLDivElement>();

  return (
    <section className="bg-cream">
      <div ref={ref} className={className}>
        {src ? (
          <div
            className="relative w-full aspect-[16/7] sm:aspect-[3/1] overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)",
            }}
          >
            <Image
              src={src}
              alt={description}
              fill
              sizes="100vw"
              className="object-cover"
              priority={false}
            />
          </div>
        ) : (
          <PhotoPlaceholder description={description} ratio="16:9" />
        )}
      </div>
    </section>
  );
}
