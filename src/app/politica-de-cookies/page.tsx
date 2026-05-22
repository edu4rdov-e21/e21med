import LegalLayout from "@/components/LegalLayout";

export const metadata = {
  title: "Política de Cookies · E21 MED",
  description:
    "Quais cookies o site e21med.com utiliza e como você pode gerenciá-los.",
  robots: "index, follow",
};

export default function PoliticaDeCookies() {
  return (
    <LegalLayout title="Política de Cookies">
      <h1>Política de Cookies</h1>
      <p className="updated">
        <strong>Última atualização:</strong> 21 de maio de 2026
      </p>

      <p>
        Esta Política de Cookies explica como o site <strong>e21med.com</strong>
        , de titularidade da <strong>E21 STUDIO LTDA</strong> (CNPJ
        55.788.849/0001-63), utiliza cookies e tecnologias similares.
      </p>

      <h2>1. O que são cookies</h2>
      <p>
        Cookies são pequenos arquivos de texto armazenados no seu dispositivo
        quando você visita um site. Servem para que o site se lembre de você,
        suas preferências e melhore sua experiência de navegação.
      </p>

      <h2>2. Cookies utilizados neste site</h2>

      <h3>Cookies estritamente necessários</h3>
      <p>
        São essenciais para o funcionamento do Site. Não podem ser desativados.
      </p>
      <ul>
        <li>Cookies de sessão</li>
        <li>
          Cookies de preferência de consentimento (lembrar sua escolha sobre
          cookies)
        </li>
        <li>Cookies de segurança</li>
      </ul>

      <h3>Cookies de análise (analytics)</h3>
      <p>Permitem entender como visitantes interagem com o Site.</p>
      <ul>
        <li>
          <strong>Google Analytics</strong>: fornecido por Google LLC
        </li>
        <li>
          Coleta: páginas visitadas, tempo de permanência, origem do tráfego,
          tipo de dispositivo
        </li>
        <li>Finalidade: melhorar o Site e otimizar a experiência</li>
      </ul>

      <h3>Cookies de marketing</h3>
      <p>
        Permitem mensurar a eficiência de campanhas e personalizar anúncios.
      </p>
      <ul>
        <li>
          <strong>Meta Pixel</strong>: fornecido por Meta Platforms, Inc.
        </li>
        <li>
          Coleta: páginas visitadas, ações no Site, características do
          dispositivo
        </li>
        <li>
          Finalidade: remarketing e mensuração de campanhas no Facebook e
          Instagram
        </li>
      </ul>

      <h2>3. Como gerenciar cookies</h2>
      <p>
        Você pode gerenciar suas preferências de cookies a qualquer momento por
        meio do banner exibido no Site ou pelas configurações do seu navegador.
      </p>
      <p>
        Para desativar cookies via navegador, consulte a documentação oficial:
      </p>
      <ul>
        <li>
          <a
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chrome
          </a>
        </li>
        <li>
          <a
            href="https://support.mozilla.org/pt-BR/kb/cookies"
            target="_blank"
            rel="noopener noreferrer"
          >
            Firefox
          </a>
        </li>
        <li>
          <a
            href="https://support.apple.com/pt-br/guide/safari/sfri11471"
            target="_blank"
            rel="noopener noreferrer"
          >
            Safari
          </a>
        </li>
        <li>
          <a
            href="https://support.microsoft.com/pt-br/microsoft-edge/excluir-cookies-no-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
            target="_blank"
            rel="noopener noreferrer"
          >
            Edge
          </a>
        </li>
      </ul>
      <p>
        A desativação de cookies essenciais pode comprometer o funcionamento
        do Site.
      </p>

      <h2>4. Cookies de terceiros</h2>
      <p>
        Alguns cookies são definidos por serviços de terceiros que aparecem
        nas nossas páginas (Google, Meta). Cada um tem suas próprias políticas:
      </p>
      <ul>
        <li>
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Política de Privacidade do Google
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/privacy/policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Política de Privacidade do Meta
          </a>
        </li>
      </ul>

      <h2>5. Atualizações desta política</h2>
      <p>
        Esta Política pode ser atualizada. A data da última atualização está
        no topo do documento.
      </p>

      <h2>6. Contato</h2>
      <p>
        Dúvidas sobre cookies: <strong>eduardo@e21studio.com</strong>
      </p>
    </LegalLayout>
  );
}
