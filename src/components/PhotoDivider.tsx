"use client";

import Image from "next/image";
import PhotoPlaceholder from "./PhotoPlaceholder";
import { useFadeIn } from "@/hooks/useFadeIn";

interface PhotoDividerProps {
  description: string;
  src?: string;
  peek?: boolean;
}

const PEEK_MASK =
  "linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)";

export default function PhotoDivider({
  description,
  src,
  peek = false,
}: PhotoDividerProps) {
  const { ref, className } = useFadeIn<HTMLDivElement>();

  return (
    <section className="bg-cream">
      <div ref={ref} className={className}>
        {src ? (
          <div
            className={`relative w-full overflow-hidden ${
              peek ? "aspect-[16/7] sm:aspect-[3/1]" : "aspect-video sm:aspect-[21/9]"
            }`}
            style={
              peek
                ? { maskImage: PEEK_MASK, WebkitMaskImage: PEEK_MASK }
                : undefined
            }
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
