import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import PainPoints from "@/components/PainPoints";
import PhotoDivider from "@/components/PhotoDivider";
import Differentiator from "@/components/Differentiator";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import ApplicationForm from "@/components/ApplicationForm";
import Footer from "@/components/Footer";
import { PHOTO_DIVIDER_1, PHOTO_DIVIDER_2 } from "@/lib/constants";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Hero />
      <SocialProof />
      <PainPoints />
      <PhotoDivider description={PHOTO_DIVIDER_1.description} />
      <Differentiator />
      <HowItWorks />
      <Testimonials />
      <PhotoDivider description={PHOTO_DIVIDER_2.description} />
      <ApplicationForm />
      <Footer />
    </main>
  );
}
