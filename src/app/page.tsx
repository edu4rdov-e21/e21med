import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import OpenLetter from "@/components/OpenLetter";
import PhotoDivider from "@/components/PhotoDivider";
import Team from "@/components/Team";
import HowItWorks from "@/components/HowItWorks";
import Specialties from "@/components/Specialties";
import ScenarioShowcase from "@/components/ScenarioShowcase";
import Testimonials from "@/components/Testimonials";
import ApplicationForm from "@/components/ApplicationForm";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import StatsBar from "@/components/StatsBar";
import { PHOTO_DIVIDER_1 } from "@/lib/constants";

export default function Home() {
  return (
    <main id="main" className="flex-1 flex flex-col">
      <Hero />
      <SocialProof />
      <StatsBar />
      <OpenLetter />
      <PhotoDivider
        description={PHOTO_DIVIDER_1.description}
        src={PHOTO_DIVIDER_1.src}
        peek
      />
      <Specialties />
      <Team />
      <HowItWorks />
      <ScenarioShowcase />
      <Testimonials />
      <ApplicationForm />
      <Footer />
      <StickyCTA />
    </main>
  );
}
