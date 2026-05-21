import Link from "next/link";
import LegalLayout from "@/components/LegalLayout";

export const metadata = {
  title: "Política de Privacidade — E21 MED",
  description:
    "Como o E21 trata seus dados pessoais conforme a Lei Geral de Proteção de Dados (LGPD).",
  robots: "index, follow",
};

export default function PoliticaDePrivacidade() {
  return (
    <LegalLayout title="Política de Privacidade">
      <h1>Política de Privacidade</h1>
      <p className="updated">
        <strong>Última atualização:</strong> 21 de maio de 2026
      </p>

      <p>
        A E21 Studio Ltda (&quot;E21&quot;, &quot;nós&quot;) respeita a
        privacidade dos seus dados pessoais e atua em conformidade com a Lei
        Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD) e demais normas
        aplicáveis. Esta Política explica como tratamos os dados das pessoas
        que interagem com o site e21med.com.
      </p>

      <h2>1. Quem somos</h2>
      <p>
        <strong>Razão Social:</strong> E21 STUDIO LTDA
        <br />
        <strong>CNPJ:</strong> 55.788.849/0001-63
        <br />
        <strong>Endereço:</strong> QS 1, Rua 210, Lote 14, Apartamento 12,
        Areal (Águas Claras), Brasília/DF, CEP 71.950-770
        <br />
        <strong>E-mail:</strong> eduardo@e21studio.com
        <br />
        <strong>Telefone:</strong> (61) 99870-4135
      </p>

      <h2>2. Encarregado de Dados (DPO)</h2>
      <p>
        O Encarregado pelo Tratamento de Dados Pessoais do E21 é{" "}
        <strong>Eduardo Carvalho</strong>, contatável pelo e-mail{" "}
        <strong>eduardo@e21studio.com</strong>.
      </p>

      <h2>3. Quais dados coletamos</h2>
      <p>
        Coletamos os seguintes dados quando você preenche o formulário de
        contato:
      </p>
      <ul>
        <li>Nome completo</li>
        <li>Número de WhatsApp</li>
        <li>Especialidade médica</li>
        <li>Perfil do Instagram</li>
      </ul>
      <p>Também coletamos automaticamente:</p>
      <ul>
        <li>Dados de navegação (páginas visitadas, tempo de permanência)</li>
        <li>Origem de tráfego (UTMs, referenciadores)</li>
        <li>
          Dados técnicos (tipo de dispositivo, navegador, sistema operacional)
        </li>
        <li>Cookies (conforme nossa Política de Cookies)</li>
      </ul>

      <h2>4. Por que coletamos esses dados</h2>
      <p>Tratamos seus dados pessoais para as seguintes finalidades:</p>
      <ul>
        <li>
          Entrar em contato sobre serviços do E21 que você demonstrou
          interesse
        </li>
        <li>Qualificar e gerenciar leads comerciais</li>
        <li>Personalizar nossa comunicação com você</li>
        <li>Cumprir obrigações legais e regulatórias</li>
        <li>Otimizar nossas campanhas de marketing</li>
        <li>Melhorar a experiência do usuário no site</li>
      </ul>

      <h2>5. Bases legais</h2>
      <p>
        O tratamento dos seus dados é fundamentado nas seguintes bases legais
        da LGPD:
      </p>
      <ul>
        <li>
          <strong>Consentimento</strong> (Art. 7º, I): quando você marca a
          opção de consentimento no formulário
        </li>
        <li>
          <strong>Execução de contrato</strong> (Art. 7º, V): quando você se
          torna cliente
        </li>
        <li>
          <strong>Legítimo interesse</strong> (Art. 7º, IX): para finalidades
          comerciais legítimas, sempre balanceadas com seus direitos
        </li>
        <li>
          <strong>Cumprimento de obrigação legal</strong> (Art. 7º, II): para
          atender exigências legais
        </li>
      </ul>

      <h2>6. Com quem compartilhamos seus dados</h2>
      <p>Compartilhamos dados estritamente necessários com:</p>
      <ul>
        <li>
          <strong>Supabase Inc.</strong> — provedor de banco de dados (dados
          armazenados em servidores nos Estados Unidos)
        </li>
        <li>
          <strong>Vercel Inc.</strong> — hospedagem do site
        </li>
        <li>
          <strong>Google LLC</strong> — Google Analytics para análise de uso
          do site
        </li>
        <li>
          <strong>Meta Platforms, Inc.</strong> — Meta Pixel para mensuração
          de campanhas
        </li>
        <li>
          Eventualmente, ferramentas internas de automação comercial (Zapier,
          Make ou similares)
        </li>
      </ul>
      <p>Não vendemos seus dados para terceiros.</p>

      <h2>7. Transferência internacional de dados</h2>
      <p>
        Alguns dos nossos provedores armazenam dados fora do Brasil
        (principalmente Estados Unidos). Essas transferências seguem as
        exigências da LGPD e dos provedores quanto a salvaguardas de segurança
        adequadas.
      </p>

      <h2>8. Por quanto tempo armazenamos seus dados</h2>
      <p>
        Mantemos seus dados pessoais pelo período necessário para cumprir as
        finalidades descritas:
      </p>
      <ul>
        <li>
          <strong>Leads ativos:</strong> durante o relacionamento comercial
        </li>
        <li>
          <strong>Leads inativos:</strong> até 24 meses após o último contato
        </li>
        <li>
          <strong>Clientes:</strong> durante a vigência do contrato + prazos
          legais aplicáveis (geralmente 5 anos para fins fiscais)
        </li>
      </ul>
      <p>Após esses prazos, os dados são anonimizados ou excluídos.</p>

      <h2>9. Seus direitos como titular</h2>
      <p>A LGPD garante a você os seguintes direitos:</p>
      <ul>
        <li>Confirmar a existência de tratamento dos seus dados</li>
        <li>Acessar seus dados</li>
        <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
        <li>Solicitar anonimização, bloqueio ou eliminação</li>
        <li>Solicitar portabilidade dos dados</li>
        <li>Eliminar dados tratados com base no seu consentimento</li>
        <li>Obter informações sobre as entidades com quem compartilhamos</li>
        <li>Revogar consentimento a qualquer momento</li>
        <li>
          Apresentar reclamação à Autoridade Nacional de Proteção de Dados
          (ANPD)
        </li>
      </ul>
      <p>
        Para exercer qualquer um desses direitos, envie sua solicitação para{" "}
        <strong>eduardo@e21studio.com</strong> ou acesse a página{" "}
        <Link href="/meus-dados">Meus dados</Link>. Respondemos em até 15
        dias.
      </p>

      <h2>10. Segurança dos seus dados</h2>
      <p>
        Adotamos medidas técnicas e organizacionais para proteger seus dados,
        incluindo:
      </p>
      <ul>
        <li>Criptografia em trânsito (HTTPS/TLS)</li>
        <li>Criptografia em repouso (banco de dados)</li>
        <li>Controle de acesso interno restrito ao necessário</li>
        <li>Monitoramento de acessos</li>
        <li>Backups regulares</li>
      </ul>
      <p>
        Em caso de incidente de segurança que afete seus dados, notificaremos
        você e a ANPD nos prazos previstos pela LGPD.
      </p>

      <h2>11. Cookies</h2>
      <p>
        Utilizamos cookies no site. Para detalhes sobre quais cookies e como
        gerenciá-los, consulte nossa{" "}
        <Link href="/politica-de-cookies">Política de Cookies</Link>.
      </p>

      <h2>12. Alterações nesta política</h2>
      <p>
        Esta Política pode ser atualizada periodicamente. Quando houver
        mudanças relevantes, notificaremos via site. A data da última
        atualização está no topo do documento.
      </p>

      <h2>13. Contato</h2>
      <p>
        Em caso de dúvidas sobre esta Política ou sobre o tratamento dos seus
        dados:
        <br />
        <strong>eduardo@e21studio.com</strong> | (61) 99870-4135
      </p>
    </LegalLayout>
  );
}
