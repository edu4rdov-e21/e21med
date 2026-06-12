"use client";

import { useCountUp } from "@/hooks/useCountUp";

const formatter = new Intl.NumberFormat("pt-BR");
const millionFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// Valores na casa do milhão contam em "M" ("0,40M" -> "5,44M") pra caber
// nas 3 colunas do mobile sem jitter de largura
function formatStat(current: number, target: number): string {
  if (target >= 1_000_000) {
    return `${millionFormatter.format(
      Math.round((current / 1_000_000) * 100) / 100
    )}M`;
  }
  return formatter.format(current);
}

export default function StatItem({
  value,
  label,
  prefix,
  suffix,
}: {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}) {
  const { ref, value: current } = useCountUp<HTMLDivElement>(value);

  return (
    <div ref={ref} className="flex flex-col items-center text-center gap-1.5">
      <span className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy tabular-nums leading-none">
        {prefix}
        {formatStat(current, value)}
        {suffix}
      </span>
      <span className="text-xs sm:text-sm text-navy/70 leading-snug">
        {label}
      </span>
    </div>
  );
}
