"use client";

import { useCountUp } from "@/hooks/useCountUp";

const formatter = new Intl.NumberFormat("pt-BR");

function formatStat(current: number, target: number): string {
  if (target >= 1_000_000) {
    return `${formatter.format(Math.round((current / 1_000_000) * 10) / 10)}M`;
  }
  return formatter.format(current);
}

export default function StatItemV2({
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
    <div ref={ref} className="flex flex-col items-center text-center gap-2 px-4">
      <span className="font-v2-display text-4xl sm:text-5xl text-ink tabular-nums leading-none">
        {prefix}
        {formatStat(current, value)}
        {suffix}
      </span>
      <span className="text-sm text-graphite leading-snug">{label}</span>
    </div>
  );
}
