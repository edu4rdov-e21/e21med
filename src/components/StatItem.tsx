"use client";

import { useCountUp } from "@/hooks/useCountUp";

const formatter = new Intl.NumberFormat("pt-BR");

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
        {formatter.format(current)}
        {suffix}
      </span>
      <span className="text-xs sm:text-sm text-navy/70 leading-snug">
        {label}
      </span>
    </div>
  );
}
