import { FOOTER } from "@/lib/constants";

/**
 * Rodapé institucional. Objetivo: fechar com solidez de empresa real
 * (contato, endereço, CNPJ, links legais), no mesmo tom da sala escura.
 */
export default function FooterV2() {
  return (
    <footer className="border-t border-v2-bone/10 bg-v2-ink py-14 text-v2-bone">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:px-10 md:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-16">
        <div>
          <p className="font-v2-display text-2xl">
            E21 <span className="v2-eyebrow align-middle text-v2-bone/60">MED</span>
          </p>
          <p className="mt-2 text-sm text-v2-brass-bright">{FOOTER.brand.tagline}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-v2-bone/60">
            {FOOTER.brand.description}
          </p>
        </div>

        <div>
          <p className="v2-eyebrow text-v2-bone/45">{FOOTER.contact.label}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {FOOTER.contact.items.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-v2-bone/75 transition hover:text-v2-bone"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
          <address className="mt-4 max-w-xs text-xs not-italic leading-relaxed text-v2-bone/40">
            {FOOTER.contact.address}
          </address>
        </div>

        <div>
          <p className="v2-eyebrow text-v2-bone/45">{FOOTER.institutional.label}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {FOOTER.institutional.items.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-v2-bone/75 transition hover:text-v2-bone"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="v2-eyebrow text-v2-bone/45">{FOOTER.legal.label}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {FOOTER.legal.items.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-v2-bone/75 transition hover:text-v2-bone"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-v2-bone/10 px-6 pt-6 sm:flex-row sm:px-10 lg:px-16">
        <p className="font-v2-mono text-[11px] tracking-[0.08em] text-v2-bone/40">
          {FOOTER.copyright}
        </p>
        {FOOTER.social.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-v2-bone/60 transition hover:text-v2-bone"
          >
            {social.label} ↗
          </a>
        ))}
      </div>
    </footer>
  );
}
