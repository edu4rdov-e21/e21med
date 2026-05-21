import Image from "next/image";

type Ratio = "16:9" | "4:3" | "1:1";

interface PhotoPlaceholderProps {
  description: string;
  ratio?: Ratio;
  className?: string;
  rounded?: boolean;
}

const ratioClass: Record<Ratio, string> = {
  "16:9": "aspect-video",
  "4:3": "aspect-[4/3]",
  "1:1": "aspect-square",
};

export default function PhotoPlaceholder({
  description,
  ratio = "16:9",
  className = "",
  rounded = false,
}: PhotoPlaceholderProps) {
  return (
    <div
      className={`relative w-full ${ratioClass[ratio]} bg-photo-placeholder overflow-hidden ${
        rounded ? "rounded-full" : "rounded-lg"
      } ${className}`}
    >
      <Image
        src="/images/placeholder.svg"
        alt={description}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover opacity-0"
        priority={false}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
        <span className="text-navy/70 text-xs sm:text-sm font-semibold text-center font-sans leading-snug tracking-wide">
          {description}
        </span>
      </div>
    </div>
  );
}
