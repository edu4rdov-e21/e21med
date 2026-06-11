import Link from "next/link";
import { FOOTER } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-16 sm:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-12">
          <div className="space-y-3 sm:col-span-2 lg:col-span-1">
            <p className="text-xl font-extralight text-bone">
              {FOOTER.brand.name}
            </p>
            <p className="v3-eyebrow text-smoke">{FOOTER.brand.tagline}</p>
            <p className="text-sm text-v3-ash leading-relaxed max-w-xs">
              {FOOTER.brand.description}
            </p>
          </div>

          <div className="space-y-3">
            <p className="v3-eyebrow text-bone">{FOOTER.contact.label}</p>
            <ul className="space-y-2">
              {FOOTER.contact.items.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-sm text-v3-ash hover:text-bone transition-colors"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-sm text-smoke leading-relaxed max-w-xs">
              {FOOTER.contact.address}
            </p>
          </div>

          <div className="space-y-3">
            <p className="v3-eyebrow text-bone">
              {FOOTER.institutional.label}
            </p>
            <ul className="space-y-2">
              {FOOTER.institutional.items.map((item) => (
                <li key={item.label}>
                  {item.href.startsWith("mailto:") ? (
                    <a
                      href={item.href}
                      className="text-sm text-v3-ash hover:text-bone transition-colors"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-sm text-v3-ash hover:text-bone transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <p className="v3-eyebrow text-bone">{FOOTER.legal.label}</p>
            <ul className="space-y-2">
              {FOOTER.legal.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-v3-ash hover:text-bone transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-xs text-smoke">{FOOTER.copyright}</p>
          <ul className="flex items-center gap-4">
            {FOOTER.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex items-center justify-center w-11 h-11 rounded-full text-v3-ash hover:text-bone transition active:scale-[0.97]"
                >
                  {s.icon === "instagram" && (
                    <svg
                      aria-hidden="true"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
