import NavBar from "@/components/v3/NavBar";
import Hero from "@/components/v3/Hero";
import Manifesto from "@/components/v3/Manifesto";
import SocialProof from "@/components/v3/SocialProof";
import Journey from "@/components/v3/Journey";
import Team from "@/components/v3/Team";

export default function HomeV3() {
  return (
    <>
      <NavBar />
      <main id="main" className="flex flex-col">
        <Hero />
        <Manifesto />
        <SocialProof />
        <Journey />
        <Team />
      </main>
    </>
  );
}
