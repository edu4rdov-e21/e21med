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
  ctaLabel: "Quero agendar minha reunião",
  ctaHref: "#formulario",
  videoDescription:
    "VÍDEO: Compilado de bastidores E21 — várias gravações acontecendo, equipe em ação, médicos gravando, muita coisa rolando ao mesmo tempo",
  popups: [
    {
      id: "notif-1",
      description:
        "POPUP 1: notificação WhatsApp/iMessage — \"Quero agendar uma consulta\"",
      position: "top-left",
    },
    {
      id: "notif-2",
      description:
        "POPUP 2: notificação Instagram DM — \"Quero agendar uma consulta\"",
      position: "top-right",
    },
    {
      id: "notif-3",
      description:
        "POPUP 3: notificação genérica — \"Quero agendar uma consulta\"",
      position: "bottom-left",
    },
    {
      id: "ig-print",
      description:
        "PRINT: tela do Instagram mostrando crescimento de seguidores (gráfico subindo / contador de seguidores)",
      position: "bottom-right",
    },
  ],
} as const;

export const SOCIAL_PROOF = {
  label: "Quem já está com a E21",
  clients: [
    { name: "Dr. André Moreira", src: "/images/clients/dr-andre-moreira.jpg" },
    { name: "Dra. Carla Fernandes", src: "/images/clients/dra-carla-fernandes.jpg" },
    { name: "Dra. Larissa Nunes", src: "/images/clients/dra-larissa-nunes.jpg" },
    { name: "Dra. Laura Oliveira", src: "/images/clients/dra-laura-oliveira.png" },
    { name: "Dra. Layla Jorge", src: "/images/clients/dra-layla-jorge.png" },
    { name: "Dra. Rebeca Mendes", src: "/images/clients/dra-rebeca-mendes.png" },
    { name: "Dra. Sara Mendes", src: "/images/clients/dra-sara-mendes.jpg" },
    { name: "Dra. Stephanny Melo", src: "/images/clients/dra-stephanny-melo.jpg" },
    { name: "Dra. Wanessa Barbosa", src: "/images/clients/dra-wanessa-barbosa.jpg" },
    { name: "Clínica Haven", src: "/images/clients/clinica-haven.png" },
    { name: "+ mais médicos", src: "/images/clients/mais-medicos.png" },
  ],
} as const;

export const PAIN_POINTS = {
  title: "Isso é sobre você?",
  cards: [
    "Posta sem estratégia e não vê resultado.",
    "Depende apenas do boca a boca.",
    "Já passou por agência que só fez panfletagem digital.",
  ],
} as const;

export const PHOTO_DIVIDER_1 = {
  description: "Visão geral do estúdio E21",
  src: "/images/studio-geral.jpg",
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
  ctaLabel: "Quero entender melhor — agendar reunião",
  ctaHref: "#formulario",
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
  title: "Agende sua reunião",
  subtitle:
    "Preencha abaixo. Nossa equipe entra em contato em até 24h pra marcar sua reunião de diagnóstico.",
  submitLabel: "Quero agendar minha reunião",
  successMessage:
    "Pedido recebido! Entraremos em contato em até 24h pra confirmar.",
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
