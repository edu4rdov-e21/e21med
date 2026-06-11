import HeroV2 from "@/components/v2/HeroV2";
import SocialProofV2 from "@/components/v2/SocialProofV2";
import StatsBarV2 from "@/components/v2/StatsBarV2";
import OpenLetterV2 from "@/components/v2/OpenLetterV2";
import PhotoDividerV2 from "@/components/v2/PhotoDividerV2";
import SpecialtiesV2 from "@/components/v2/SpecialtiesV2";
import TeamV2 from "@/components/v2/TeamV2";
import HowItWorksV2 from "@/components/v2/HowItWorksV2";
import TestimonialsV2 from "@/components/v2/TestimonialsV2";
import ApplicationFormV2 from "@/components/v2/ApplicationFormV2";
import FooterV2 from "@/components/v2/FooterV2";
import { PHOTO_DIVIDER_1 } from "@/lib/constants";

export default function HomeV2() {
  return (
    <main className="flex flex-col">
      <HeroV2 />
      <SocialProofV2 />
      <StatsBarV2 />
      <OpenLetterV2 />
      <PhotoDividerV2
        description={PHOTO_DIVIDER_1.description}
        src={PHOTO_DIVIDER_1.src}
      />
      <SpecialtiesV2 />
      <TeamV2 />
      <HowItWorksV2 />
      <TestimonialsV2 />
      <ApplicationFormV2 />
      <FooterV2 />
    </main>
  );
}
