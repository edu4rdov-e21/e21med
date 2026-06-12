import { STATS } from "@/lib/constants";
import StatItemV2 from "./StatItemV2";

export default function StatsBarV2() {
  return (
    <section className="bg-aged-paper py-12 sm:py-16">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-3 max-w-3xl mx-auto divide-x divide-warm-taupe">
          {STATS.items.map((s) => (
            <StatItemV2
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
