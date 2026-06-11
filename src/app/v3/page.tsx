import NavBar from "@/components/v3/NavBar";
import Hero from "@/components/v3/Hero";

export default function HomeV3() {
  return (
    <>
      <NavBar />
      <main id="main" className="flex flex-col">
        <Hero />
      </main>
    </>
  );
}
