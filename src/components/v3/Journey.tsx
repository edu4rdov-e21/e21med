import { HOW_IT_WORKS } from "@/lib/constants";
import JourneyPhase from "./JourneyPhase";

export default function Journey() {
  const { milestones, title, subtitle } = HOW_IT_WORKS;

  return (
    <section id="jornada" className="py-24 sm:py-32 scroll-mt-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-2xl mb-20">
          <h2 className="text-5xl sm:text-6xl leading-[0.95]">{title}</h2>
          <p className="mt-6 text-base sm:text-lg text-v3-ash leading-relaxed max-w-[52ch]">
            {subtitle}
          </p>
        </div>

        <ol className="list-none flex flex-col gap-24 sm:gap-32">
          {milestones.map((m, i) => (
            <JourneyPhase
              key={m.monthLabel}
              milestone={m}
              index={i}
              total={milestones.length}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
