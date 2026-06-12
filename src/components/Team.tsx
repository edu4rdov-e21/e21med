"use client";

import Image from "next/image";
import { TEAM } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

/**
 * Álbum da equipe: a foto de grupo é a capa; os membros viram retratos
 * de estúdio grandes (3:4, as fotos são 800x1200), com placa de nome
 * sobre gradient navy, numeração de álbum e marca d'água E21 — as fotos
 * profissionais são o destaque, não miniaturas.
 */
export default function Team() {
  const { ref, className, visible } = useFadeIn<HTMLDivElement>();

  return (
    <section id="equipe" className="bg-cream py-16 sm:py-24 scroll-mt-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div ref={ref} className={className}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-navy text-center mb-12 sm:mb-16 max-w-3xl mx-auto leading-tight">
            {TEAM.title}
          </h2>

          <figure className="mb-3">
            <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] overflow-hidden rounded-xl ring-1 ring-navy/10 shadow-[0_30px_70px_-25px_rgba(26,54,93,0.45)]">
              <Image
                src={TEAM.groupPhoto.src}
                alt={TEAM.groupPhoto.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 1280px"
                quality={92}
                className="object-cover"
                priority={false}
              />
            </div>
            <figcaption className="mt-3 mb-14 sm:mb-20 flex items-baseline justify-between text-navy/60">
              <span className="text-xs sm:text-sm italic font-serif">
                {TEAM.groupPhoto.alt}
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                Estúdio E21
              </span>
            </figcaption>
          </figure>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {TEAM.members.map((member, i) => (
              <div
                key={member.name}
                className={`group relative aspect-[3/4] overflow-hidden rounded-xl ring-1 ring-navy/10 shadow-[0_20px_50px_-20px_rgba(26,54,93,0.4)] ${
                  visible ? "animate-stagger-in" : "opacity-0"
                }`}
                style={{ "--stagger-i": i } as React.CSSProperties}
              >
                <Image
                  src={member.src}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 400px"
                  quality={90}
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />

                {/* placa de identificação sobre gradient, estilo galeria */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy-dark/90 via-navy-dark/45 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <h3 className="font-serif text-lg sm:text-2xl text-cream leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-[11px] sm:text-sm text-cream/75 leading-snug mt-0.5">
                    {member.role}
                  </p>
                </div>

                {/* numeração de álbum + marca d'água do estúdio */}
                <span className="absolute top-3 left-3 sm:top-4 sm:left-4 text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-cream/80 [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]">
                  {String(i + 1).padStart(2, "0")} /{" "}
                  {String(TEAM.members.length).padStart(2, "0")}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute top-2.5 right-3 sm:top-3 sm:right-4 font-serif text-sm sm:text-base text-cream/60 [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]"
                >
                  E21
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
