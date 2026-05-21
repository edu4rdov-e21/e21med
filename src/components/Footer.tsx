import { FOOTER } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-navy-dark py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row justify-between items-center gap-4 text-cream/70">
        <p className="text-sm">{FOOTER.copyright}</p>
        <p className="text-sm">{FOOTER.tagline}</p>
      </div>
    </footer>
  );
}
