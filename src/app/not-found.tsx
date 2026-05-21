import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
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
        404
      </p>
      <h1 className="text-3xl sm:text-4xl text-cream text-center max-w-xl leading-tight mb-4">
        Essa página a gente ainda não gravou.
      </h1>
      <p className="text-cream/70 text-base sm:text-lg text-center max-w-md mb-8">
        O link que você abriu não existe ou foi movido.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-full bg-cream text-navy px-6 py-3 text-sm sm:text-base font-bold hover:bg-white transition-colors duration-300"
      >
        Voltar pra home
      </Link>
    </main>
  );
}
