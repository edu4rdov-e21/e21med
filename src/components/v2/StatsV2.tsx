"use client";

import { STATS } from "@/lib/constants";
import { useCountUp } from "@/hooks/useCountUp";

/**
 * Números do ano. Objetivo: provar escala de produção. Numerais serif
 * gigantes em latão, com count-up na entrada; o resto da seção sai da
 * frente pra deixar o número falar.
 */
export default function StatsV2() {
  return (
    <section className="border-t border-v2-ink/10 bg-v2-bone py-16 text-v2-ink sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="h-px flex-1 bg-v2-ink/10" />
          <p className="v2-eyebrow text-v2-stone">{STATS.tag}</p>
          <span aria-hidden="true" className="h-px flex-1 bg-v2-ink/10" />
        </div>

        <dl className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
          {STATS.items.map((item) => (
            <StatV2
              key={item.label}
              value={item.value}
              prefix={item.prefix}
              label={item.label}
            />
          ))}
        </dl>
      </div>
    </section>
  );
}

function StatV2({
  value,
  prefix,
  label,
}: {
  value: number;
  prefix: string;
  label: string;
}) {
  const { ref, value: animated } = useCountUp<HTMLDivElement>(value);

  // >= 1M vira "5,44M"; abaixo, separador de milhar pt-BR
  const display =
    value >= 1_000_000
      ? `${(animated / 1_000_000).toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}M`
      : animated.toLocaleString("pt-BR");

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <dd className="font-v2-display text-[clamp(3.2rem,7vw,5.2rem)] leading-none tracking-tight text-v2-brass">
        {prefix}
        {display}
      </dd>
      <dt className="mt-3 font-v2-mono text-[11px] uppercase tracking-[0.28em] text-v2-stone">
        {label}
      </dt>
    </div>
  );
}
