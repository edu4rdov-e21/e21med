"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex-1 flex flex-col items-center justify-center bg-navy-dark text-cream px-6 py-20 min-h-[80vh]">
      <Image
        src="/logos/e21-med.svg"
        alt="E21 MED"
        width={1712}
        height={1286}
        className="w-32 sm:w-40 h-auto mb-10"
        priority
      />
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-cream/60 mb-3">
        Erro 500
      </p>
      <h1 className="text-3xl sm:text-4xl text-cream text-center max-w-xl leading-tight mb-4">
        Algo deu errado aqui.
      </h1>
      <p className="text-cream/70 text-base sm:text-lg text-center max-w-md mb-8">
        Tenta de novo. Se persistir, fala com a equipe pelo WhatsApp.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center rounded-full bg-cream text-navy px-6 py-3 text-sm sm:text-base font-bold hover:bg-white transition-colors duration-300"
        >
          Tentar de novo
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-cream/30 text-cream px-6 py-3 text-sm sm:text-base font-semibold hover:bg-cream/10 transition-colors duration-300"
        >
          Voltar pra home
        </Link>
      </div>
    </main>
  );
}
