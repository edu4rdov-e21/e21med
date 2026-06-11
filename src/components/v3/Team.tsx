import { TEAM } from "@/lib/constants";

/** Equipe tipográfica e mínima — sem fotografia, decisão pela pureza
    do void. Os rostos vivem na v1/v2. */
export default function Team() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-4xl sm:text-5xl leading-[1.05] max-w-2xl mb-16">
          {TEAM.title}
        </h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 list-none">
          {TEAM.members.map((member) => (
            <li
              key={member.name}
              className="border-t border-white/10 pt-5"
            >
              <p className="text-2xl font-extralight text-bone">
                {member.name}
              </p>
              <p className="text-sm text-smoke mt-1">{member.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
