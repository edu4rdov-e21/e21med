import Image from "next/image";
import { SOCIAL_PROOF, TESTIMONIALS } from "@/lib/constants";

/**
 * Prova social na linguagem do void:
 * - Clientes como lista tipográfica (créditos de filme), separador "·" plum.
 *   Sem fotografia — os rostos ficam pra v1/v2.
 * - Exceção documentada do sistema: prints de WhatsApp são a prova mais
 *   forte do e21med e entram como imagem real, contidos em cards hairline,
 *   grayscale com hover restaurando a cor. Trilho com scroll nativo
 *   (snap), pausável por definição e acessível por teclado.
 */
export default function SocialProof() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="v3-eyebrow text-smoke text-center mb-10">
          {SOCIAL_PROOF.label}
        </p>

        <ul className="flex flex-wrap items-baseline justify-center gap-y-3 max-w-4xl mx-auto mb-24">
          {SOCIAL_PROOF.clients.map((c, i) => (
            <li
              key={c.name}
              className="flex items-baseline text-base sm:text-lg font-extralight text-bone"
            >
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="text-plum-voltage px-4 select-none"
                >
                  ·
                </span>
              )}
              {c.name}
            </li>
          ))}
        </ul>

        <h2 className="text-4xl sm:text-5xl leading-[1.05] text-center mb-12">
          {TESTIMONIALS.title}
        </h2>
      </div>

      <div className="max-w-[1200px] mx-auto px-6">
        <ul
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:thin]"
          aria-label="Depoimentos de clientes"
        >
          {TESTIMONIALS.items.map((item) => (
            <li
              key={item.src}
              className="snap-start shrink-0 border border-white/10 rounded-3xl overflow-hidden"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(max-width: 640px) 320px, 480px"
                className="h-56 sm:h-72 w-auto object-contain grayscale-[0.7] hover:grayscale-0 transition duration-500"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
