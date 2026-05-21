import Link from "next/link";
import LegalLayout from "@/components/LegalLayout";

export const metadata = {
  title: "Termos de Contratação — E21 MED",
  description:
    "Condições gerais de contratação dos serviços do E21 MED operado pela E21 Studio Ltda.",
  robots: "index, follow",
};

export default function TermosDeContratacao() {
  return (
    <LegalLayout title="Termos de Contratação">
      <h1>Termos de Contratação</h1>
      <p className="updated">
        <strong>Última atualização:</strong> 21 de maio de 2026
      </p>

      <p>
        Estes Termos de Contratação regem a contratação dos serviços
        oferecidos pela <strong>E21 STUDIO LTDA</strong> (CNPJ
        55.788.849/0001-63), doravante denominada <strong>&quot;E21&quot;</strong>
        , por meio do programa <strong>E21 MED</strong>, doravante denominado{" "}
        <strong>&quot;Serviço&quot;</strong>.
      </p>

      <h2>1. Objeto</h2>
      <p>
        O Serviço consiste na prestação de consultoria e produção de conteúdo
        audiovisual para construção de autoridade digital de profissionais
        médicos. O escopo detalhado consta em proposta comercial específica,
        formalizada entre o E21 e o <strong>Contratante</strong>.
      </p>

      <h2>2. Modalidades</h2>
      <p>O Serviço pode ser contratado em duas modalidades:</p>

      <h3>2.1 Aceleração (3 meses)</h3>
      <ul>
        <li>Foco: Fase 1 de construção de fundação</li>
        <li>
          Investimento: R$ 6.000,00 de entrada + 3 parcelas de R$ 4.000,00 ou
          R$ 15.000,00 à vista
        </li>
      </ul>

      <h3>2.2 Jornada Completa (6 meses)</h3>
      <ul>
        <li>Foco: Fase 1 + Fase 2 (construção e exponenciação)</li>
        <li>
          Investimento: R$ 6.000,00 de entrada + 6 parcelas de R$ 4.000,00 ou
          R$ 25.000,00 à vista
        </li>
      </ul>
      <p>
        Valores e condições podem ser ajustados conforme proposta comercial
        específica.
      </p>

      <h2>3. Forma de contratação</h2>
      <p>A contratação efetiva-se pela:</p>
      <ul>
        <li>Aceitação da proposta comercial</li>
        <li>Assinatura de contrato específico</li>
        <li>Pagamento da entrada de implementação</li>
      </ul>
      <p>
        A simples candidatura via formulário do Site não configura
        contratação — é fase de qualificação.
      </p>

      <h2>4. Forma de pagamento</h2>
      <ul>
        <li>
          <strong>Entrada de implementação:</strong> paga no início, antes do
          começo dos trabalhos
        </li>
        <li>
          <strong>Parcelas:</strong> mensais, com vencimento na data acordada
          em contrato
        </li>
        <li>
          <strong>À vista:</strong> desconto conforme tabela vigente
        </li>
        <li>
          Formas de pagamento: PIX, boleto, cartão de crédito (sujeito a
          taxas), conforme combinado
        </li>
      </ul>

      <h2>5. Política de Reembolso</h2>
      <p>
        Em conformidade com o{" "}
        <strong>artigo 49 do Código de Defesa do Consumidor</strong>, o
        Contratante poderá solicitar reembolso total nos seguintes termos:
      </p>

      <h3>5.1 Direito de arrependimento</h3>
      <ul>
        <li>
          Prazo: até <strong>7 (sete) dias corridos</strong> contados do início
          do Serviço
        </li>
        <li>Modalidade: reembolso integral dos valores pagos</li>
        <li>
          Procedimento: solicitação por escrito para{" "}
          <strong>eduardo@e21studio.com</strong>
        </li>
      </ul>

      <h3>5.2 Após o prazo de arrependimento</h3>
      <p>
        Após 7 dias do início do Serviço, não há direito automático a
        reembolso. Eventuais ajustes ou rescisões serão analisados caso a
        caso, considerando entregas realizadas, custos incorridos e cláusulas
        do contrato específico.
      </p>

      <h2>6. Obrigações do E21</h2>
      <p>O E21 se compromete a:</p>
      <ul>
        <li>Executar o Serviço conforme escopo contratado</li>
        <li>Disponibilizar a equipe técnica acordada</li>
        <li>Manter o estúdio em condições adequadas para gravação</li>
        <li>Cumprir prazos pactuados</li>
        <li>
          Tratar dados do Contratante conforme a{" "}
          <Link href="/politica-de-privacidade">
            Política de Privacidade
          </Link>
        </li>
        <li>
          Manter confidencialidade sobre informações sensíveis do Contratante
        </li>
      </ul>

      <h2>7. Obrigações do Contratante</h2>
      <p>O Contratante se compromete a:</p>
      <ul>
        <li>
          Fornecer informações verdadeiras e atualizadas para execução do
          Serviço
        </li>
        <li>
          Participar das gravações e reuniões nas datas agendadas
        </li>
        <li>
          Aprovar ou solicitar ajustes em conteúdos dentro dos prazos acordados
        </li>
        <li>Realizar os pagamentos pontualmente</li>
        <li>
          Não utilizar o Serviço para fins ilegais, antiéticos ou que infrinjam
          normas profissionais
        </li>
      </ul>

      <h2>8. Cessão de imagem</h2>
      <p>Ao contratar o Serviço, o Contratante:</p>
      <ul>
        <li>
          Autoriza o E21 a captar e editar sua imagem, voz e nome para os
          entregáveis do Serviço
        </li>
        <li>
          Autoriza o E21 a usar trechos do material produzido como portfólio
          em redes sociais, propostas comerciais e marketing institucional do
          E21
        </li>
        <li>
          Pode revogar essa última autorização (uso institucional) a qualquer
          momento por escrito, sem efeito retroativo sobre material já
          publicado
        </li>
      </ul>

      <h2>9. Propriedade Intelectual</h2>
      <p>Após o pagamento integral do contrato:</p>
      <ul>
        <li>
          Os conteúdos finais entregues pertencem ao Contratante para uso
          comercial
        </li>
        <li>
          O E21 mantém o direito de uso institucional conforme cláusula 8
        </li>
        <li>
          Templates, metodologias internas e know-how do E21 permanecem de sua
          propriedade exclusiva
        </li>
      </ul>

      <h2>10. Confidencialidade</h2>
      <p>
        O E21 manterá confidencialidade sobre informações sensíveis do
        Contratante. Igualmente, o Contratante se compromete a não divulgar
        metodologias, estratégias e processos internos do E21.
      </p>

      <h2>11. Limitação de responsabilidade</h2>
      <p>
        O E21 garante a execução do Serviço com qualidade técnica e dedicação
        profissional. Entretanto, resultados em construção de audiência
        dependem de múltiplos fatores externos (algoritmos, dedicação do
        Contratante, mercado), não podendo o E21 garantir números específicos
        de seguidores, agendamentos ou faturamento.
      </p>

      <h2>12. Vigência e rescisão</h2>
      <p>
        O contrato vigora pelo prazo da modalidade contratada (3 ou 6 meses).
        A rescisão antecipada pelas partes seguirá as cláusulas do contrato
        específico, observado o disposto na cláusula 5.
      </p>

      <h2>13. Foro</h2>
      <p>
        Fica eleito o foro da Comarca de Brasília/DF para dirimir questões
        oriundas destes Termos, com renúncia a qualquer outro, por mais
        privilegiado que seja.
      </p>

      <h2>14. Contato</h2>
      <p>
        <strong>E21 Studio Ltda</strong> — CNPJ 55.788.849/0001-63
        <br />
        QS 1, Rua 210, Lote 14, Apt. 12, Areal (Águas Claras), Brasília/DF,
        71.950-770
        <br />
        eduardo@e21studio.com | (61) 99870-4135
      </p>
    </LegalLayout>
  );
}
