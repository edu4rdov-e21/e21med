import type { ReactNode } from "react";
import Link from "next/link";
import Footer from "./Footer";

export default function LegalLayout({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <>
      <main id="main" className="bg-cream flex-1">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-16 sm:py-24">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-navy/60 hover:text-navy transition-colors mb-12"
          >
            <span aria-hidden="true">←</span>
            <span>Voltar para a página inicial</span>
          </Link>

          <article
            className="prose-legal"
            aria-label={title ?? "Documento legal"}
          >
            {children}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
