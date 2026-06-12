import { STATS } from "@/lib/constants";
import StatItem from "./StatItem";

export default function StatsBar() {
  return (
    <section className="bg-white border-y border-navy/10 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
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
