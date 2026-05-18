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
          <div className="relative w-full aspect-video overflow-hidden">
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
