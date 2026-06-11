import Image from "next/image";
import { NAV_V3, HERO } from "@/lib/constants";

export default function NavBar() {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-void/90 border-b border-white/10">
      <nav
        aria-label="Principal"
        className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between gap-6"
      >
        {/* TODO Eduardo: logo em branco (por ora o SVG navy é invertido via filter) */}
        <a href="#main" aria-label={HERO.badge} className="shrink-0">
          <Image
            src="/logos/e21-med.svg"
            alt={HERO.badge}
            width={1712}
            height={1286}
            priority
            className="w-14 h-auto"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </a>

        <div className="hidden sm:flex items-center gap-8">
          {NAV_V3.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="v3-eyebrow text-smoke hover:text-bone transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href={NAV_V3.ctaHref}
          className="v3-eyebrow inline-flex items-center justify-center rounded-full bg-plum-voltage text-bone px-5 py-3 min-h-11 hover:opacity-90 transition active:scale-[0.97]"
        >
          {NAV_V3.cta}
        </a>
      </nav>
    </header>
  );
}
