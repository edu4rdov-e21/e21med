import SceneOpening from "@/components/v2/SceneOpening";
import ActDiscover from "@/components/v2/ActDiscover";
import InterludeStudio from "@/components/v2/InterludeStudio";
import ActTrust from "@/components/v2/ActTrust";
import ActDecide from "@/components/v2/ActDecide";
import TurnManifesto from "@/components/v2/TurnManifesto";
import FinalScene from "@/components/v2/FinalScene";
import FooterV2 from "@/components/v2/FooterV2";
import StickyCtaV2 from "@/components/v2/StickyCtaV2";

/**
 * V2 "Na tela dela": a página é uma história em atos contada do ponto de
 * vista da futura paciente. O visitante-médico assiste o funil acontecer
 * na tela dela (descoberta -> confiança -> decisão), vê a máquina que
 * produz tudo isso, e no final troca de lugar: a próxima história é a dele.
 * Teatro escuro contínuo; os assets atuam nos papéis nativos deles.
 */
export default function HomeV2() {
  return (
    <main id="main" className="flex flex-col">
      <SceneOpening />
      <ActDiscover />
      <InterludeStudio />
      <ActTrust />
      <ActDecide />
      <TurnManifesto />
      <FinalScene />
      <FooterV2 />
      <StickyCtaV2 />
    </main>
  );
}
