import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import OpenLetter from "@/components/OpenLetter";
import Backstage from "@/components/Backstage";
import Specialties from "@/components/Specialties";
import Team from "@/components/Team";
import HowItWorks from "@/components/HowItWorks";
import ScenarioShowcase from "@/components/ScenarioShowcase";
import Testimonials from "@/components/Testimonials";
import Press from "@/components/Press";
import ApplicationForm from "@/components/ApplicationForm";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import StatsBar from "@/components/StatsBar";

export default function Home() {
  return (
    <main id="main" className="flex-1 flex flex-col">
      <Hero />
      <SocialProof />
      <StatsBar />
      <OpenLetter />
      <Press />
      <Specialties />
      <Team />
      <HowItWorks />
      <ScenarioShowcase />
      <Testimonials />
      <Backstage />
      <ApplicationForm />
      <Footer />
      <StickyCTA />
    </main>
  );
}
