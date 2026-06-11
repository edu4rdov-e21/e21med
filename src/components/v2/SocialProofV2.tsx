import Image from "next/image";
import { SOCIAL_PROOF } from "@/lib/constants";

export default function SocialProofV2() {
  const clients = [...SOCIAL_PROOF.clients, ...SOCIAL_PROOF.clients];

  return (
    <section className="bg-parchment py-16 sm:py-20 overflow-hidden">
      <p className="font-v2-mono text-[11px] uppercase tracking-wide text-terracotta-seal text-center mb-10">
        {SOCIAL_PROOF.label}
      </p>

      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <ul className="flex gap-10 sm:gap-14 w-max animate-scroll-x items-start">
          {clients.map((c, i) => (
            <li
              key={`${c.name}-${i}`}
              className="flex flex-col items-center gap-3 w-28 sm:w-32 shrink-0"
            >
              <span className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-1 ring-warm-taupe">
                <Image
                  src={c.src}
                  alt={c.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </span>
              <span className="text-sm text-charcoal text-center leading-snug">
                {c.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
