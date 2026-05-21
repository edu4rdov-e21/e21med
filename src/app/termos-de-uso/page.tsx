import Link from "next/link";
import LegalLayout from "@/components/LegalLayout";

export const metadata = {
  title: "Termos de Uso — E21 MED",
  description:
    "Regras de uso do site e21med.com, operado pela E21 Studio Ltda.",
  robots: "index, follow",
};

export default function TermosDeUso() {
  return (
    <LegalLayout title="Termos de Uso">
      <h1>Termos de Uso</h1>
      <p className="updated">
        <strong>Última atualização:</strong> 21 de maio de 2026
      </p>

      <p>
        Estes Termos de Uso (&quot;Termos&quot;) regem o acesso e uso do site{" "}
        <strong>e21med.com</strong> (&quot;Site&quot;), de titularidade da{" "}
        <strong>E21 STUDIO LTDA</strong>, CNPJ 55.788.849/0001-63. Ao acessar
        ou usar o Site, você concorda com estes Termos.
      </p>

      <h2>1. Objeto</h2>
      <p>
        O Site tem por finalidade apresentar os serviços do programa{" "}
        <strong>E21 MED</strong>, voltado à construção de autoridade digital
        de profissionais médicos, e captar interessados em contratar tais
        serviços.
      </p>

      <h2>2. Aceitação</h2>
      <p>
        Ao navegar pelo Site, você declara estar de acordo com estes Termos e
        com nossa{" "}
        <Link href="/politica-de-privacidade">Política de Privacidade</Link>.
        Se não concordar com qualquer disposição, deve cessar imediatamente o
        uso do Site.
      </p>

      <h2>3. Quem pode usar</h2>
      <p>
        O Site destina-se a maiores de 18 anos, com capacidade civil plena. O
        preenchimento de formulários e o contato comercial pressupõem essa
        capacidade.
      </p>

      <h2>4. Cadastro e veracidade das informações</h2>
      <p>
        Ao preencher formulários no Site, você se compromete a fornecer
        informações verdadeiras, atuais e completas. O E21 se reserva o
        direito de desconsiderar candidaturas com dados inverídicos.
      </p>

      <h2>5. Propriedade intelectual</h2>
      <p>
        Todo o conteúdo do Site — incluindo logotipos, marcas, textos,
        imagens, vídeos, áudios, layouts, código, gráficos, fotografias do
        estúdio e dos profissionais — é propriedade da E21 Studio Ltda ou de
        terceiros que autorizaram seu uso, protegido pelas leis de propriedade
        intelectual aplicáveis.
      </p>
      <p>É expressamente proibido:</p>
      <ul>
        <li>
          Copiar, reproduzir, distribuir ou publicar qualquer conteúdo do Site
          sem autorização prévia por escrito
        </li>
        <li>Utilizar o conteúdo para fins comerciais</li>
        <li>
          Realizar engenharia reversa, scraping automatizado ou qualquer
          técnica para extrair conteúdo em massa
        </li>
      </ul>

      <h2>6. Conduta do usuário</h2>
      <p>Ao utilizar o Site, você se compromete a NÃO:</p>
      <ul>
        <li>Usar o Site para fins ilegais ou não autorizados</li>
        <li>
          Tentar acessar áreas restritas ou interferir no funcionamento técnico
        </li>
        <li>Transmitir vírus, malware ou códigos maliciosos</li>
        <li>Praticar engenharia social, phishing ou qualquer fraude</li>
        <li>Violar direitos de terceiros</li>
      </ul>
      <p>O E21 se reserva o direito de bloquear acessos suspeitos.</p>

      <h2>7. Links externos</h2>
      <p>
        O Site pode conter links para sites de terceiros. O E21 não se
        responsabiliza pelo conteúdo, práticas de privacidade ou serviços
        desses sites.
      </p>

      <h2>8. Limitação de responsabilidade</h2>
      <p>
        O E21 envidará esforços razoáveis para manter o Site funcional e
        atualizado, mas não garante:
      </p>
      <ul>
        <li>Disponibilidade ininterrupta ou ausência de falhas</li>
        <li>Que o Site atenderá expectativas específicas</li>
        <li>
          Ausência total de erros ou imprecisões em conteúdo informativo
        </li>
      </ul>
      <p>
        O E21 não se responsabiliza por danos indiretos, lucros cessantes ou
        perdas decorrentes de uso ou impossibilidade de uso do Site, exceto
        nos limites da legislação aplicável.
      </p>

      <h2>9. Modificações nos Termos</h2>
      <p>
        O E21 pode alterar estes Termos a qualquer momento. A versão vigente
        será sempre a publicada no Site, com data da última atualização.
        Recomenda-se revisão periódica.
      </p>

      <h2>10. Comunicação</h2>
      <p>
        Comunicações oficiais devem ser enviadas para{" "}
        <strong>eduardo@e21studio.com</strong>.
      </p>

      <h2>11. Lei aplicável e foro</h2>
      <p>
        Estes Termos são regidos pelas leis brasileiras. Fica eleito o foro da
        Comarca de Brasília/DF para dirimir quaisquer questões oriundas destes
        Termos, com renúncia a qualquer outro, por mais privilegiado que seja.
      </p>

      <h2>12. Contato</h2>
      <p>
        <strong>E21 Studio Ltda</strong> — CNPJ 55.788.849/0001-63
        <br />
        QS 1, Rua 210, Lote 14, Apt. 12, Areal (Águas Claras), Brasília/DF,
        71.950-770
        <br />
        eduardo@e21studio.com | (61) 98130-6278
      </p>
    </LegalLayout>
  );
}
