"use client";

import { PRICING } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

export default function Pricing() {
  const { ref, className } = useFadeIn<HTMLDivElement>();

  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        <div ref={ref} className={className}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-navy text-center mb-14 sm:mb-20">
            {PRICING.title}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {PRICING.plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-8 sm:p-10 bg-white flex flex-col ${
                  plan.highlighted
                    ? "border-2 border-navy shadow-lg"
                    : "border border-gray-200 shadow-sm"
                }`}
              >
                {plan.highlighted && "badge" in plan && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-navy text-cream text-[10px] font-bold tracking-[0.25em] px-4 py-1.5 rounded-full">
                    {plan.badge}
                  </span>
                )}
                <div className="mb-6">
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-navy/60">
                    {plan.duration}
                  </span>
                  <h3 className="text-3xl sm:text-4xl text-navy mt-2 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-navy/70 text-sm">{plan.description}</p>
                </div>
                <div className="border-t border-gray-200 pt-6 mb-8 flex-1">
                  <p className="text-2xl sm:text-3xl text-navy font-semibold mb-1">
                    {plan.entry}
                  </p>
                  <p className="text-lg text-navy/80 mb-4">
                    {plan.installments}
                  </p>
                  <p className="text-sm text-navy/60 mb-1">{plan.total}</p>
                  <p className="text-sm text-navy/60">{plan.cash}</p>
                </div>
                <a
                  href={plan.ctaHref}
                  className={`block text-center rounded-full py-4 px-6 font-semibold transition-colors duration-300 ${
                    plan.highlighted
                      ? "bg-navy text-cream hover:bg-navy-light"
                      : "bg-white text-navy border-2 border-navy hover:bg-navy hover:text-cream"
                  }`}
                >
                  {plan.ctaLabel}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
