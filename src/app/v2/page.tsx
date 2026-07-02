import HeroV2 from "@/components/v2/HeroV2";
import TrustDeckV2 from "@/components/v2/TrustDeckV2";
import StatsV2 from "@/components/v2/StatsV2";
import ManifestoV2 from "@/components/v2/ManifestoV2";
import MethodV2 from "@/components/v2/MethodV2";
import StudioV2 from "@/components/v2/StudioV2";
import TeamV2 from "@/components/v2/TeamV2";
import ShowcaseV2 from "@/components/v2/ShowcaseV2";
import ProofV2 from "@/components/v2/ProofV2";
import FinalCtaV2 from "@/components/v2/FinalCtaV2";
import FooterV2 from "@/components/v2/FooterV2";
import StickyCtaV2 from "@/components/v2/StickyCtaV2";

/**
 * V2 "cinema institucional". Ritmo claro/escuro: os momentos
 * cinematográficos (hero, estúdio, vitrine, conversão) acontecem na sala
 * escura; os editoriais (confiança, números, manifesto, método, equipe,
 * prova) no papel claro. Cada seção tem um objetivo único.
 */
export default function HomeV2() {
  return (
    <main id="main" className="flex flex-col">
      <HeroV2 />
      <TrustDeckV2 />
      <StatsV2 />
      <ManifestoV2 />
      <MethodV2 />
      <StudioV2 />
      <TeamV2 />
      <ShowcaseV2 />
      <ProofV2 />
      <FinalCtaV2 />
      <FooterV2 />
      <StickyCtaV2 />
    </main>
  );
}
