export const BRAND = {
  name: "E21 MED",
  tagline: "Produtora de autoridade digital.",
} as const;

export const HERO = {
  badge: "E21 MED",
  headline:
    "O paciente não escolhe o melhor médico. Escolhe o que ele já conhece.",
  subheadline:
    "A E21 constrói uma audiência composta por pacientes prontos para adquirir seus serviços.",
  ctaLabel: "Quero ser referência na minha especialidade",
  ctaHref: "#formulario",
  imageDescription:
    "FOTO: Médico gravando no estúdio E21 — bastidor com equipe e equipamento",
} as const;

export const PAIN_POINTS = {
  title: "Isso é sobre você?",
  cards: [
    "Você posta nas redes sem estratégia e não vê resultado nenhum.",
    "É excelente no que faz, mas depende de indicação boca a boca pra encher a agenda.",
    "Já passou por uma agência que só fez panfletagem digital — postou bonito, mas não trouxe paciente.",
  ],
} as const;

export const PHOTO_DIVIDER_1 = {
  description:
    "FOTO: Visão geral do estúdio E21 — espaço, luzes, câmeras",
} as const;

export const DIFFERENTIATOR = {
  title: "Aqui, sua imagem é protagonista",
  body: "Nada de artes genéricas e panfletagem digital. Na E21, você grava no nosso estúdio com equipe profissional dedicada. O resultado é conteúdo que constrói autoridade de verdade — porque quem te assiste sente a diferença.",
  photos: [
    "FOTO: Close da gravação",
    "FOTO: Bastidor com iluminação",
    "FOTO: Médico revisando conteúdo com a equipe",
  ],
} as const;

export const HOW_IT_WORKS = {
  title: "Como funciona",
  phases: [
    {
      tag: "Fase 1",
      title: "Aceleração",
      duration: "90 dias",
      items: [
        "Consultoria de branding",
        "Sessão de fotos profissional",
        "Posicionamento + identidade visual do perfil",
        "Roteiros + gravação + edição mensal",
        "Estratégia de conteúdo + calendário editorial",
      ],
    },
    {
      tag: "Fase 2",
      title: "Exponenciação",
      duration: "90 dias",
      items: [
        "Produção mensal contínua",
        "Tráfego pago estratégico",
        "Funil de conversão (stories, CTAs, agendamento)",
        "Episódio de podcast",
      ],
    },
  ],
  photoDescription:
    "FOTO: Sessão de gravação no estúdio — médico com microfone",
} as const;

export const PRICING = {
  title: "Investimento",
  plans: [
    {
      id: "aceleracao",
      name: "Aceleração",
      duration: "3 meses",
      description: "Só a Fase 1",
      entry: "R$6.000 de entrada",
      installments: "+ 3× R$4.000",
      total: "Total: R$18.000",
      cash: "Ou R$15.000 à vista",
      ctaLabel: "Começar com Aceleração",
      ctaHref: "#formulario",
      highlighted: false,
    },
    {
      id: "jornada",
      name: "Jornada Completa",
      duration: "6 meses",
      description: "Fase 1 + Fase 2",
      entry: "R$6.000 de entrada",
      installments: "+ 6× R$4.000",
      total: "Total: R$30.000",
      cash: "Ou R$25.000 à vista",
      ctaLabel: "Quero a Jornada Completa",
      ctaHref: "#formulario",
      highlighted: true,
      badge: "MAIS ESCOLHIDO",
    },
  ],
} as const;

export const TESTIMONIALS = {
  title: "Quem já vive isso",
  items: [
    {
      quote: "SUBSTITUIR POR DEPOIMENTO REAL DO MÉDICO CLIENTE",
      name: "Dr. Nome Sobrenome",
      specialty: "Especialidade",
      photoDescription: "FOTO DO MÉDICO",
    },
    {
      quote: "SUBSTITUIR POR DEPOIMENTO REAL DO MÉDICO CLIENTE",
      name: "Dr. Nome Sobrenome",
      specialty: "Especialidade",
      photoDescription: "FOTO DO MÉDICO",
    },
    {
      quote: "SUBSTITUIR POR DEPOIMENTO REAL DO MÉDICO CLIENTE",
      name: "Dr. Nome Sobrenome",
      specialty: "Especialidade",
      photoDescription: "FOTO DO MÉDICO",
    },
  ],
} as const;

export const PHOTO_DIVIDER_2 = {
  description: "FOTO: Equipe E21 em ação — making of de uma gravação",
} as const;

export const FORM = {
  title: "Candidate-se ao E21 MED",
  subtitle:
    "Preencha abaixo e nossa equipe entra em contato em até 24h.",
  submitLabel: "Enviar candidatura",
  successMessage:
    "Candidatura enviada! Entraremos em contato em até 24h.",
  fields: [
    { name: "nome", label: "Nome completo", type: "text", required: true },
    { name: "whatsapp", label: "WhatsApp", type: "tel", required: true },
    {
      name: "especialidade",
      label: "Especialidade médica",
      type: "text",
      required: true,
    },
    {
      name: "instagram",
      label: "@ do Instagram",
      type: "text",
      required: true,
    },
  ],
} as const;

export const FOOTER = {
  copyright: "E21 Studio © 2026",
  tagline: "Produtora de autoridade digital.",
} as const;
