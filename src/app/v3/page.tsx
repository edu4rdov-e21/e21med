import Constellation from "@/components/v3/Constellation";

export default function HomeV3() {
  return (
    <main id="main" className="flex flex-col">
      <section className="relative min-h-screen">
        <Constellation
          variant="hero"
          interactive
          className="absolute inset-0 w-full h-full"
        />
      </section>
    </main>
  );
}
