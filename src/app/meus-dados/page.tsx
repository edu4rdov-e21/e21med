import Link from "next/link";
import LegalLayout from "@/components/LegalLayout";

export const metadata = {
  title: "Meus dados (LGPD) — E21 MED",
  description:
    "Como exercer seus direitos de titular de dados sob a Lei Geral de Proteção de Dados.",
  robots: "index, follow",
};

export default function MeusDados() {
  return (
    <LegalLayout title="Meus dados (LGPD)">
      <h1>Meus dados</h1>
      <p className="updated">
        <strong>Última atualização:</strong> 21 de maio de 2026
      </p>

      <p>
        Esta página existe para que você, titular dos dados pessoais tratados
        pelo E21 Studio, exerça os direitos garantidos pela{" "}
        <strong>Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018)</strong>
        .
      </p>

      <h2>Direitos disponíveis</h2>
      <ul>
        <li>Confirmar se tratamos seus dados</li>
        <li>Acessar uma cópia dos dados que mantemos</li>
        <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
        <li>Solicitar anonimização, bloqueio ou exclusão de dados</li>
        <li>Solicitar portabilidade dos dados a outro fornecedor</li>
        <li>Eliminar dados tratados com base no seu consentimento</li>
        <li>
          Obter informações sobre as entidades com quem compartilhamos seus
          dados
        </li>
        <li>Revogar consentimento a qualquer momento</li>
      </ul>

      <h2>Como exercer</h2>
      <p>
        Para qualquer solicitação relacionada aos seus dados, envie um e-mail
        para nosso Encarregado de Dados:
      </p>
      <p>
        <strong>Eduardo Carvalho</strong>
        <br />
        <a href="mailto:eduardo@e21studio.com">eduardo@e21studio.com</a>
        <br />
        Assunto sugerido: &quot;LGPD — solicitação de [tipo de direito]&quot;
      </p>

      <h2>O que incluir no pedido</h2>
      <ul>
        <li>Nome completo</li>
        <li>E-mail ou WhatsApp usado no contato original (pra localizarmos)</li>
        <li>Descrição clara do direito que deseja exercer</li>
        <li>
          Documento de identidade (apenas se necessário para confirmar
          titularidade)
        </li>
      </ul>

      <h2>Prazo de resposta</h2>
      <p>
        Respondemos solicitações em até <strong>15 dias</strong> contados do
        recebimento do pedido, conforme determina a LGPD.
      </p>

      <h2>Reclamações</h2>
      <p>
        Se você considerar que seus direitos não foram respeitados, pode
        apresentar reclamação à{" "}
        <a
          href="https://www.gov.br/anpd/pt-br"
          target="_blank"
          rel="noopener noreferrer"
        >
          Autoridade Nacional de Proteção de Dados (ANPD)
        </a>
        .
      </p>

      <p>
        Para entender em detalhes como tratamos seus dados, consulte nossa{" "}
        <Link href="/politica-de-privacidade">Política de Privacidade</Link>.
      </p>
    </LegalLayout>
  );
}
