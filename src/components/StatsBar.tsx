import { STATS } from "@/lib/constants";
import StatItem from "./StatItem";

export default function StatsBar() {
  return (
    <section className="bg-white border-y border-navy/10 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <p className="flex justify-center mb-8">
          <span className="inline-flex items-center rounded-full border border-navy/15 bg-navy/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-navy/70">
            {STATS.tag}
          </span>
        </p>
        <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto">
          {STATS.items.map((s) => (
            <StatItem
              key={s.label}
              value={s.value}
              prefix={s.prefix}
              suffix={s.suffix}
              label={s.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
