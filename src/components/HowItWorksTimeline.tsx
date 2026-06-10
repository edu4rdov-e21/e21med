import { HOW_IT_WORKS } from "@/lib/constants";
import TimelineMilestone from "./TimelineMilestone";

/**
 * Versão mobile do HowItWorks: timeline vertical com linha à esquerda
 * que se preenche de navy conforme o scroll (CSS scroll-driven via
 * animation-timeline: view(); sem suporte, a linha fica cheia estática).
 * Semântica de lista + headings — sem roles de tabs no mobile.
 */
export default function HowItWorksTimeline() {
  return (
    <div className="relative lg:hidden">
      <div
        aria-hidden="true"
        className="absolute left-3 top-1 bottom-1 w-px bg-navy/15"
      />
      <div
        aria-hidden="true"
        className="timeline-fill absolute left-3 top-1 bottom-1 w-px bg-navy"
      />
      <ol className="list-none">
        {HOW_IT_WORKS.milestones.map((m) => (
          <TimelineMilestone key={m.monthLabel} milestone={m} />
        ))}
      </ol>
    </div>
  );
}
