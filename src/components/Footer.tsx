import { FOOTER } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-navy-dark py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 mb-10 sm:mb-14">
          <div className="space-y-3">
            <p className="text-cream font-semibold text-base">
              {FOOTER.brand.name}
            </p>
            <p className="text-cream/70 text-sm leading-relaxed max-w-xs">
              {FOOTER.brand.description}
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-cream/60 text-xs font-semibold tracking-[0.2em] uppercase">
              {FOOTER.contact.label}
            </p>
            <ul className="space-y-2">
              {FOOTER.contact.items.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream/80 hover:text-cream text-sm transition-colors"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-cream/60 text-xs font-semibold tracking-[0.2em] uppercase">
              {FOOTER.legal.label}
            </p>
            <ul className="space-y-2">
              {FOOTER.legal.items.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-cream/80 hover:text-cream text-sm transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-cream/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-cream/60 text-xs">
          <div className="space-y-1">
            <p>{FOOTER.copyright}</p>
            <p>
              {FOOTER.business.label} · {FOOTER.business.cnpj}
            </p>
          </div>
          <p>{FOOTER.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
