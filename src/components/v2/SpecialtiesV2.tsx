import { SPECIALTIES } from "@/lib/constants";

export default function SpecialtiesV2() {
  return (
    <section className="bg-parchment border-y border-warm-taupe py-10 sm:py-12">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
        <ul className="flex flex-wrap items-center justify-center gap-y-2">
          {SPECIALTIES.items.map((s, i) => (
            <li key={s} className="flex items-center text-sm text-charcoal">
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="text-terracotta-seal px-4 select-none"
                >
                  ·
                </span>
              )}
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
